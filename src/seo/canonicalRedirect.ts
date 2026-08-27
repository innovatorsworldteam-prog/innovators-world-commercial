/** Redirect the legacy .in host to the canonical .org host. */
export function shouldRedirectToOrg(host: string): boolean {
  const normalized = host.toLowerCase().split(':')[0];
  return normalized === 'innovatorsworld.in' || normalized === 'www.innovatorsworld.in';
}

export function buildOrgRedirectUrl(originalUrl: string): string {
  const url = new URL(originalUrl);
  url.hostname = 'innovatorsworld.org';
  url.protocol = 'https:';
  return url.toString();
}

export function handleCanonicalRedirect(request: Request): Response | null {
  try {
    const host = request.headers.get('host') || new URL(request.url).hostname;
    if (!shouldRedirectToOrg(host)) return null;
    return Response.redirect(buildOrgRedirectUrl(request.url), 301);
  } catch {
    return null;
  }
}
