/** 두 수를 더합니다 */
export function add(a: number, b: number): number {
  return a + b;
}

/** 두 수를 뺍니다 */
export function subtract(a: number, b: number): number {
  return a - b;
}

/** 두 수를 곱합니다 */
export function multiply(a: number, b: number): number {
  return a * b;
}

/**
 * a를 b로 나눕니다.
 * 0으로 나누면 에러를 던집니다 — 에러 테스트 학습용
 */
export function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error("0으로 나눌 수 없습니다");
  }
  return a / b;
}

/** 배열의 합계를 구합니다 */
export function sum(numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}
