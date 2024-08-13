export function isExpired(expiresAt?: string) {
  const now = Date.now();

  return (expiresAt && now >= parseInt(expiresAt)) || false;
}
