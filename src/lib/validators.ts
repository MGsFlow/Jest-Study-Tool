/** 이메일 형식이 유효한지 검사합니다 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 비밀번호 강도를 검사합니다.
 * - 8자 이상
 * - 영문 + 숫자 포함
 */
export function isValidPassword(password: string): boolean {
  if (password.length < 8) return false;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  return hasLetter && hasNumber;
}

/** 할인율이 유효한 범위(0~100)인지 검사합니다 */
export function isValidDiscountRate(rate: number): boolean {
  return rate >= 0 && rate <= 100;
}
