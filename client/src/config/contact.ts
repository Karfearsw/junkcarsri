export const PHONE_NUMBER = import.meta.env.VITE_PHONE_NUMBER ?? "954-770-6438";
const digits = (s: string) => s.replace(/\D/g, "");
export const PHONE_LINK = import.meta.env.VITE_PHONE_E164
  ? `tel:${digits(import.meta.env.VITE_PHONE_E164 as string)}`
  : `tel:${digits(PHONE_NUMBER)}`;
export const EMAIL = import.meta.env.VITE_CONTACT_EMAIL ?? "fanningleanna@gmail.com";
export const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT ?? "https://formspree.io/f/mdkbyobe";
