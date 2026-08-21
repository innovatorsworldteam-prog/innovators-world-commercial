const VERIFICATION_TTL_MINUTES = 30;
const MAX_VERIFICATION_ATTEMPTS = 5;

export type EmailSender = {
  send(message: {
    to: string;
    from: string;
    subject: string;
    html: string;
    text: string;
  }): Promise<{ messageId?: string }>;
};

export function normalizeEmail(value: unknown): string {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function hashToken(token: string): Promise<string> {
  const bytes = new TextEncoder().encode(token);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function createVerificationToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function verificationExpiry(): string {
  return new Date(Date.now() + VERIFICATION_TTL_MINUTES * 60_000).toISOString();
}

export function verificationUrl(request: Request, token: string): string {
  const url = new URL(request.url);
  return `${url.origin}/verify-email?token=${encodeURIComponent(token)}`;
}

export function verificationEmailHtml(name: string, url: string): string {
  const safeName = name.replace(/[&<>\"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c] ?? c));
  return `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#172033"><h2>Verify your Innovators World email</h2><p>Hello ${safeName},</p><p>Use the button below to verify your email address and continue to IWDA.</p><p><a href="${url}" style="display:inline-block;padding:12px 20px;background:#d6aa4a;color:#071b3a;text-decoration:none;border-radius:24px;font-weight:700">Verify email</a></p><p>This link expires in ${VERIFICATION_TTL_MINUTES} minutes and can be used once.</p><p>If you did not request IWDA, you can ignore this email.</p></body></html>`;
}

export function verificationEmailText(name: string, url: string): string {
  return `Hello ${name},\n\nVerify your Innovators World email address to continue to IWDA:\n${url}\n\nThis link expires in ${VERIFICATION_TTL_MINUTES} minutes and can be used once.\n\nIf you did not request IWDA, ignore this email.`;
}

export const MAX_ATTEMPTS = MAX_VERIFICATION_ATTEMPTS;
