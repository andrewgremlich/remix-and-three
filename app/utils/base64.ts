export function base64UrlEncode(input: string) {
  const encoded = btoa(input); // Base64 encode
  return encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); // Make URL-safe
}

export function base64UrlDecode(input: string) {
  const padded = input.padEnd(
    input.length + ((4 - (input.length % 4)) % 4),
    "="
  ); // Add padding
  return atob(padded.replace(/-/g, "+").replace(/_/g, "/")); // Replace URL-safe characters
}
