type PaymentEnv = {
  DB: D1Database;
  RAZORPAY_KEY_ID?: string;
  RAZORPAY_KEY_SECRET?: string;
};

type JsonObject = Record<string, unknown>;
type IWDAResultRow = { id:string; attempt_id:string; participant_id:string|null; innovation_readiness_index:number|null; traits:string|null; result_data:string|null };

const json = (data: unknown, status = 200) => Response.json(data, { status });
const fail = (message: string, status = 400) => json({ error: message }, { status });
const text = (value: unknown): string => typeof value === "string" ? value.trim() : "";

const PREMIUM_AMOUNT = 1995;
const PREMIUM_CURRENCY = "USD";
const PREMIUM_PRODUCT = "complete_innovation_profile";

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

async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest)).map(byte => byte.toString(16).padStart(2, "0")).join("");
}

function parseResultData(result: IWDAResultRow): Record<string, unknown> {
  try {
    const parsed = result.result_data ? JSON.parse(result.result_data) : {};
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed as Record<string, unknown> : {};
  } catch {
    return {};
  }
}

function buildCompleteInnovationProfile(result: IWDAResultRow): Record<string, unknown> {
  const data = parseResultData(result);
  const dimensions = Array.isArray(data.dimensions) ? data.dimensions : [];
  const strengths = [data.primary_strength, data.secondary_strength].filter(Boolean);
  const growth = data.growth_dimension || "Improve";
  const traits = Array.isArray(data.traits) ? data.traits : [];

  return {
    product: PREMIUM_PRODUCT,
    version: "1.0",
    assessment: "IWDA",
    title: "Complete Innovation Profile",
    innovation_readiness_index: result.innovation_readiness_index,
    level: data.level || "Emerging",
    traits,
    strengths,
    growth_dimension: growth,
    dimensions,
    analysis: {
      observe: "Your profile shows how effectively you notice details, patterns and opportunities in your environment.",
      question: "Your Question dimension indicates how actively you challenge assumptions and seek better explanations.",
      imagine: "Your Imagine dimension reflects your ability to explore possibilities beyond the immediately visible solution.",
      create: "Your Create dimension reflects your tendency to turn ideas into concrete possibilities and outputs.",
      test: "Your Test dimension highlights how consistently you validate ideas through evidence, experiments and feedback.",
      improve: "Your Improve dimension reflects how naturally you iterate, learn from outcomes and refine your work."
    },
    development_focus: `Your current development focus is ${String(growth)}. Deliberately practise this dimension through small, repeatable innovation challenges.`,
    recommended_next_steps: [
      "Choose one everyday problem and observe it without proposing a solution for five minutes.",
      "Write three alternative questions that challenge the obvious interpretation of the problem.",
      `Run one small experiment focused on improving your ${String(growth)} capability.`,
      "Record what changed after testing and identify one improvement for the next iteration."
    ],
    generated_from: { iwda_result_id: result.id, attempt_id: result.attempt_id }
  };
}

export async function createRazorpayOrder(request: Request, env: PaymentEnv): Promise<Response> {
  try {
    const body = await parseBody(request);
    const attemptId = text(body.attempt_id);
    const requestedAmount = Number(body.amount ?? PREMIUM_AMOUNT);
    const currency = text(body.currency) || PREMIUM_CURRENCY;
    const suppliedReceipt = text(body.receipt);
    const receipt = suppliedReceipt || `iwda_${crypto.randomUUID().replace(/-/g, "").slice(0, 34)}`;
    if (!attemptId) return fail("attempt_id is required.");
    if (!Number.isInteger(requestedAmount) || requestedAmount < 100) return fail("amount must be at least 100 paise.");
    if (requestedAmount !== PREMIUM_AMOUNT || currency !== PREMIUM_CURRENCY) return fail("Complete Innovation Profile orders must be $19.95 USD.", 400);
    if (receipt.length < 1 || receipt.length > 40) return fail("Invalid receipt.");
    const result = await env.DB.prepare("SELECT id FROM iwda_results WHERE attempt_id=? LIMIT 1").bind(attemptId).first<{ id: string }>();
    if (!result) return fail("A completed IWDA result is required before purchase.", 404);
    let auth: string;
    try { auth = razorpayAuth(env); } catch (error) { console.error("Razorpay credential configuration error", error); return fail("Razorpay server credentials are not configured.", 500); }
    let response: Response;
    try { response = await fetch("https://api.razorpay.com/v1/orders", { method: "POST", headers: { "Authorization": auth, "Content-Type": "application/json" }, body: JSON.stringify({ amount: requestedAmount, currency, receipt }) }); } catch (error) { console.error("Razorpay order request failed", error); return fail("Unable to reach Razorpay.", 502); }
    if (response.status === 401) return fail("Razorpay authentication failed.", 401);
    if (!response.ok) { let detail = "Razorpay rejected the order."; try { const data = await response.json() as { error?: { description?: string } }; detail = data.error?.description || detail; } catch {} console.error("Razorpay order rejected", response.status, detail); return fail(detail, 500); }
    const order = await response.json() as { id?: string; amount?: number; currency?: string };
    if (!order.id) return fail("Razorpay returned an invalid order.", 500);
    return json({ order_id: order.id, amount: order.amount ?? requestedAmount, currency: order.currency ?? currency, key_id: env.RAZORPAY_KEY_ID?.trim(), attempt_id: attemptId });
  } catch (error) { console.error("Create Razorpay order failed", error); return fail(error instanceof Error ? error.message : "Unable to create order.", 500); }
}

async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
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
    const result = await env.DB.prepare("SELECT id,attempt_id,participant_id,innovation_readiness_index,traits,result_data FROM iwda_results WHERE attempt_id=? LIMIT 1").bind(attemptId).first<IWDAResultRow>();
    if (!result) return fail("IWDA result not found.", 404);
    const secret = env.RAZORPAY_KEY_SECRET?.trim();
    if (!secret) return fail("Razorpay server credentials are not configured.", 500);
    const expected = await hmacSha256Hex(secret, `${orderId}|${paymentId}`);
    if (!timingSafeEqualHex(expected, signature)) return fail("Payment signature verification failed.", 400);
    const existing = await env.DB.prepare("SELECT id,access_token_hash FROM innovation_profile_entitlements WHERE attempt_id=? LIMIT 1").bind(attemptId).first<{id:string;access_token_hash:string}>();
    if (existing) {
      const profile = await env.DB.prepare("SELECT id,profile_data,created_at FROM complete_innovation_profiles WHERE attempt_id=? LIMIT 1").bind(attemptId).first<{id:string;profile_data:string;created_at:string}>();
      let profileData: unknown = null; try { profileData = profile?.profile_data ? JSON.parse(profile.profile_data) : null; } catch {}
      return json({ status:"ok", verified:true, product:PREMIUM_PRODUCT, razorpay_payment_id:paymentId, razorpay_order_id:orderId, attempt_id:attemptId, profile_ready:Boolean(profile), profile_id:profile?.id ?? null, profile:profileData });
    }
    const entitlementId = crypto.randomUUID();
    const accessToken = crypto.randomUUID() + crypto.randomUUID();
    const accessTokenHash = await sha256Hex(accessToken);
    const profileId = crypto.randomUUID();
    const profileData = buildCompleteInnovationProfile(result);
    const now = new Date().toISOString();
    await env.DB.prepare(`INSERT INTO innovation_profile_entitlements (id,attempt_id,payment_order_id,payment_id,participant_id,product_code,amount_paise,currency,status,access_token_hash,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)`).bind(entitlementId,attemptId,orderId,paymentId,result.participant_id,PREMIUM_PRODUCT,PREMIUM_AMOUNT,PREMIUM_CURRENCY,"paid",accessTokenHash,now).run();
    await env.DB.prepare(`INSERT INTO complete_innovation_profiles (id,attempt_id,entitlement_id,participant_id,profile_data,created_at) VALUES (?,?,?,?,?,?)`).bind(profileId,attemptId,entitlementId,result.participant_id,JSON.stringify(profileData),now).run();
    return json({ status:"ok", verified:true, product:PREMIUM_PRODUCT, razorpay_payment_id:paymentId, razorpay_order_id:orderId, attempt_id:attemptId, profile_ready:true, profile_id:profileId, access_token:accessToken, profile:profileData });
  } catch (error) { console.error("Verify Razorpay payment failed", error); return fail(error instanceof Error ? error.message : "Unable to verify payment.", 500); }
}

export async function getCompleteInnovationProfile(request: Request, env: PaymentEnv): Promise<Response> {
  try {
    const url = new URL(request.url);
    const attemptId = text(url.searchParams.get("attempt_id"));
    const accessToken = text(url.searchParams.get("access_token"));
    if (!attemptId || !accessToken) return fail("attempt_id and access_token are required.", 401);
    const tokenHash = await sha256Hex(accessToken);
    const row = await env.DB.prepare(`SELECT e.id entitlement_id,e.status,e.product_code,p.id profile_id,p.profile_data,p.created_at FROM innovation_profile_entitlements e JOIN complete_innovation_profiles p ON p.entitlement_id=e.id WHERE e.attempt_id=? AND e.access_token_hash=? AND e.status='paid' LIMIT 1`).bind(attemptId,tokenHash).first<{entitlement_id:string;status:string;product_code:string;profile_id:string;profile_data:string;created_at:string}>();
    if (!row) return fail("Premium profile not found or access token is invalid.",404);
    let profile: unknown = null; try { profile = JSON.parse(row.profile_data); } catch { return fail("Premium profile data is invalid.",500); }
    return json({ status:"ok", entitlement_id:row.entitlement_id, product:row.product_code, profile_id:row.profile_id, profile, created_at:row.created_at });
  } catch (error) { console.error("Get complete innovation profile failed", error); return fail("Unable to retrieve premium profile.",500); }
}

export async function createValidationRazorpayOrder(request: Request, env: PaymentEnv): Promise<Response> {
  try {
    const body = await parseBody(request);
    const attemptId = text(body.attempt_id);
    const receipt = text(body.receipt) || `iwva_${crypto.randomUUID().replace(/-/g, "").slice(0, 34)}`;
    const amount = Number(body.amount ?? 49900);
    const currency = text(body.currency) || "INR";
    if (!attemptId) return fail("attempt_id is required.");
    if (amount !== 49900 || currency !== "INR") return fail("Validation report checkout is currently configured for the India validation cohort at ₹499.",400);
    if (receipt.length < 1 || receipt.length > 40) return fail("Invalid receipt.");
    const result = await env.DB.prepare("SELECT id FROM iwda_results WHERE attempt_id=? LIMIT 1").bind(attemptId).first<{id:string}>();
    if (!result) return fail("A completed IWDA result is required before purchase.",404);
    const auth = razorpayAuth(env);
    const response = await fetch("https://api.razorpay.com/v1/orders", { method:"POST", headers:{"Authorization":auth,"Content-Type":"application/json"}, body:JSON.stringify({amount,currency,receipt,notes:{product:"validation_report",validation:true}}) });
    if (response.status===401) return fail("Razorpay authentication failed.",401);
    if (!response.ok) { let detail="Razorpay rejected the validation order."; try { const data=await response.json() as {error?:{description?:string}}; detail=data.error?.description||detail; } catch {} return fail(detail,500); }
    const order=await response.json() as {id?:string;amount?:number;currency?:string};
    if (!order.id) return fail("Razorpay returned an invalid order.",500);
    return json({order_id:order.id,amount:order.amount??amount,currency:order.currency??currency,key_id:env.RAZORPAY_KEY_ID?.trim(),attempt_id:attemptId,product:"validation_report"});
  } catch(error) { console.error("Create validation Razorpay order failed",error); return fail(error instanceof Error?error.message:"Unable to create validation order.",500); }
}

export async function verifyValidationRazorpayPayment(request: Request, env: PaymentEnv): Promise<Response> {
  try {
    const body = await parseBody(request);
    const paymentId=text(body.razorpay_payment_id), orderId=text(body.razorpay_order_id), signature=text(body.razorpay_signature), attemptId=text(body.attempt_id);
    if(!paymentId||!orderId||!signature||!attemptId) return fail("razorpay_payment_id, razorpay_order_id, razorpay_signature and attempt_id are required.");
    const result=await env.DB.prepare("SELECT id,attempt_id,participant_id,innovation_readiness_index,traits,result_data FROM iwda_results WHERE attempt_id=? LIMIT 1").bind(attemptId).first<IWDAResultRow>();
    if(!result) return fail("IWDA result not found.",404);
    const secret=env.RAZORPAY_KEY_SECRET?.trim(); if(!secret) return fail("Razorpay server credentials are not configured.",500);
    const expected=await hmacSha256Hex(secret,`${orderId}|${paymentId}`); if(!timingSafeEqualHex(expected,signature)) return fail("Payment signature verification failed.",400);
    const existing=await env.DB.prepare("SELECT id,access_token_hash,product_code,amount_paise,currency FROM innovation_profile_entitlements WHERE attempt_id=? LIMIT 1").bind(attemptId).first<{id:string;access_token_hash:string;product_code:string;amount_paise:number;currency:string}>();
    if(existing) return json({status:"ok",verified:true,product:existing.product_code,attempt_id:attemptId,profile_ready:true});
    const entitlementId=crypto.randomUUID(), profileId=crypto.randomUUID(), accessToken=crypto.randomUUID()+crypto.randomUUID(), accessTokenHash=await sha256Hex(accessToken), now=new Date().toISOString();
    const profileData={...buildCompleteInnovationProfile(result),product:"validation_report",title:"Personalised Innovation & Career Discovery Report",validation_configuration:{amount_paise:49900,currency:"INR"},career_recommendations_status:"pending_canonical_305_source"};
    await env.DB.prepare(`INSERT INTO innovation_profile_entitlements (id,attempt_id,payment_order_id,payment_id,participant_id,product_code,amount_paise,currency,status,access_token_hash,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)`).bind(entitlementId,attemptId,orderId,paymentId,result.participant_id,"validation_report",49900,"INR","paid",accessTokenHash,now).run();
    await env.DB.prepare(`INSERT INTO complete_innovation_profiles (id,attempt_id,entitlement_id,participant_id,profile_data,created_at) VALUES (?,?,?,?,?,?)`).bind(profileId,attemptId,entitlementId,result.participant_id,JSON.stringify(profileData),now).run();
    return json({status:"ok",verified:true,product:"validation_report",attempt_id:attemptId,profile_ready:true,profile_id:profileId,access_token:accessToken,profile:profileData});
  } catch(error) { console.error("Verify validation Razorpay payment failed",error); return fail(error instanceof Error?error.message:"Unable to verify validation payment.",500); }
}
