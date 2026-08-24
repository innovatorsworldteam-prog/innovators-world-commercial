type PaymentEnv = {
  DB: D1Database;
  RAZORPAY_KEY_ID?: string;
  RAZORPAY_KEY_SECRET?: string;
};

type JsonObject = Record<string, unknown>;

const json = (data: unknown, status = 200) => Response.json(data, { status });
const fail = (message: string, status = 400) => json({ error: message }, status);
const text = (value: unknown): string => typeof value === "string" ? value.trim() : "";

const PREMIUM_AMOUNT = 149900;
const PREMIUM_CURRENCY = "INR";

async function parseBody(request: Request): Promise<JsonObject> {
  try {
    const value: unknown = await request.json();
    if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error();
    return value as JsonObject;
  } catch {
    throw new Error("Request body must be a JSON object");
  }
}

function razorpayAuth(env: PaymentEnv): string {
  const key = env.RAZORPAY_KEY_ID?.trim();
  const secret = env.RAZORPAY_KEY_SECRET?.trim();
  if (!key || !secret) throw new Error("Razorpay server credentials are not configured");
  return `Basic ${btoa(`${key}:${secret}`)}`;
}

export async function createRazorpayOrder(request: Request, env: PaymentEnv): Promise<Response> {
  try {
    const body = await parseBody(request);
    const attemptId = text(body.attempt_id);
    const requestedAmount = Number(body.amount ?? PREMIUM_AMOUNT);
    const currency = text(body.currency) || PREMIUM_CURRENCY;
    const receipt = text(body.receipt) || `iwda_${attemptId || crypto.randomUUID()}`;

    if (!attemptId) return fail("attempt_id is required.");
    if (!Number.isInteger(requestedAmount) || requestedAmount < 100) return fail("amount must be at least 100 paise.");
    if (requestedAmount !== PREMIUM_AMOUNT || currency !== PREMIUM_CURRENCY) {
      return fail("Complete Innovation Profile orders must be ₹1,499 INR.", 400);
    }
    if (receipt.length < 1 || receipt.length > 40) return fail("Invalid receipt.");

    const result = await env.DB.prepare("SELECT id FROM iwda_results WHERE attempt_id=? LIMIT 1")
      .bind(attemptId).first<{ id: string }>();
    if (!result) return fail("A completed IWDA result is required before purchase.", 404);

    let response: Response;
    try {
      response = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          "Authorization": razorpayAuth(env),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: requestedAmount,
          currency,
          receipt,
        }),
      });
    } catch (error) {
      console.error("Razorpay order request failed", error);
      return fail("Unable to reach Razorpay.", 500);
    }

    if (response.status === 401) return fail("Razorpay authentication failed.", 401);
    if (!response.ok) {
      let detail = "Razorpay rejected the order.";
      try {
        const data = await response.json() as { error?: { description?: string } };
        detail = data.error?.description || detail;
      } catch {}
      console.error("Razorpay order rejected", response.status, detail);
      return fail(detail, 500);
    }

    const order = await response.json() as { id?: string; amount?: number; currency?: string };
    if (!order.id) return fail("Razorpay returned an invalid order.", 500);

    return json({
      order_id: order.id,
      amount: order.amount ?? requestedAmount,
      currency: order.currency ?? currency,
      key_id: env.RAZORPAY_KEY_ID?.trim(),
      attempt_id: attemptId,
    });
  } catch (error) {
    console.error("Create Razorpay order failed", error);
    return fail(error instanceof Error ? error.message : "Unable to create order.", 500);
  }
}

async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return Array.from(new Uint8Array(signature)).map(byte => byte.toString(16).padStart(2, "0")).join("");
}

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function verifyRazorpayPayment(request: Request, env: PaymentEnv): Promise<Response> {
  try {
    const body = await parseBody(request);
    const paymentId = text(body.razorpay_payment_id);
    const orderId = text(body.razorpay_order_id);
    const signature = text(body.razorpay_signature);
    const attemptId = text(body.attempt_id);

    if (!paymentId || !orderId || !signature || !attemptId) return fail("razorpay_payment_id, razorpay_order_id, razorpay_signature and attempt_id are required.");

    const result = await env.DB.prepare("SELECT id FROM iwda_results WHERE attempt_id=? LIMIT 1")
      .bind(attemptId).first<{ id: string }>();
    if (!result) return fail("IWDA result not found.", 404);

    const secret = env.RAZORPAY_KEY_SECRET?.trim();
    if (!secret) return fail("Razorpay server credentials are not configured.", 500);

    const expected = await hmacSha256Hex(secret, `${orderId}|${paymentId}`);
    if (!timingSafeEqualHex(expected, signature)) return fail("Payment signature verification failed.", 400);

    return json({
      status: "ok",
      verified: true,
      razorpay_payment_id: paymentId,
      razorpay_order_id: orderId,
      attempt_id: attemptId,
    });
  } catch (error) {
    console.error("Verify Razorpay payment failed", error);
    return fail(error instanceof Error ? error.message : "Unable to verify payment.", 500);
  }
}
