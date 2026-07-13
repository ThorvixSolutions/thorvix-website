import emailjs from '@emailjs/browser';

// EmailJS credentials. These are client-side keys and are exposed in the
// built bundle by design (EmailJS is a browser-side service).
const PUBLIC_KEY = 'T8CAPiTs0sGFJn8nW';
const SERVICE_ID = 'service_31nq1ce';
const TEMPLATE_ID = 'template_c10awjm';

/** Email shown to the user if a send fails, so they always have a way to reach us. */
export const FALLBACK_EMAIL = 'thorvix3@gmail.com';

/**
 * Sends the booking-form submission through EmailJS.
 *
 * `formData` keys come from the modal field ids in SiteContentContext
 * (name, company, email, interest, message) and are mapped to the
 * template variables the EmailJS template expects.
 */
export async function sendBookingEmail(formData: Record<string, string>) {
  const templateParams = {
    name: formData.name ?? '',
    company: formData.company ?? '',
    email: formData.email ?? '',
    interest: formData.interest ?? '',
    message: formData.message?.trim() || '(no message provided)',
    time: new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' }),
  };

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
    publicKey: PUBLIC_KEY,
  });
}
