const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PASSWORD_REGEX = /^[a-zA-Z0-9]{8}$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value.trim());
}

export function isValidPassword(value: string): boolean {
  return PASSWORD_REGEX.test(value);
}

export const PASSWORD_HINT = "8 caracteres, apenas letras e números";
