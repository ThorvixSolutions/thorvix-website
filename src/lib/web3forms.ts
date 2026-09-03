// Web3Forms access key. Client-side by design: it only lets the bearer send
// mail to the inbox that owns the key, so it ships in the bundle.
const ACCESS_KEY = 'be4c31ed-5def-44f3-b238-38fd206a6fc0';

/** Email shown to the user if a send fails, so they always have a way to reach us. */
export const FALLBACK_EMAIL = 'thorvix3@gmail.com';

/**
 * Sends the booking-form submission to Web3Forms.
 *
 * `formData` keys come from the modal field ids in SiteContentContext
 * (name, company, email, interest, message). `botcheck` is the honeypot:
 * Web3Forms drops the submission when it is filled.
 *
 * Throws on network failure or a non-success response.
 */
export async function sendBookingEmail(formData: Record<string, string>, botcheck = '') {
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: ACCESS_KEY,
      botcheck,
      subject: `New booking request from ${formData.name || 'website visitor'}`,
      from_name: 'Thorvix Website',
      replyto: formData.email ?? '',
      name: formData.name ?? '',
      company: formData.company ?? '',
      email: formData.email ?? '',
      interest: formData.interest ?? '',
      message: formData.message?.trim() || '(no message provided)',
      time: new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' }),
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) {
    throw new Error(data.message || `Web3Forms request failed (${res.status})`);
  }
  return data;
}
