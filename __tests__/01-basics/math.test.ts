/**
 * Chapter 01: Jest 기초
 *
 * 학습 목표:
 * - describe / it / test 로 테스트 그룹과 케이스 작성
 * - expect().toBe() 로 값 검증
 * - 에러가 발생하는 경우 toThrow() 사용
 *
 * 실무 예시:
 * - 할인 계산, 수량 합산 같은 순수 함수는 테스트하기 가장 쉽고 ROI가 높음
 */

import { add, subtract, multiply, divide, sum } from "@/lib/math";

describe("math 유틸리티", () => {
  // describe: 관련 테스트를 하나의 그룹으로 묶음
  describe("add", () => {
    // it 또는 test: 개별 테스트 케이스 (둘은 동일)
    it("두 양수를 더하면 올바른 결과를 반환한다", () => {
      // Arrange(준비) → Act(실행) → Assert(검증) 패턴
      const result = add(2, 3);
      expect(result).toBe(5);
    });

    it("음수와 양수를 더할 수 있다", () => {
      expect(add(-1, 5)).toBe(4);
    });
  });

  describe("subtract", () => {
    it("두 수를 뺀다", () => {
      expect(subtract(10, 3)).toBe(7);
    });
  });

  describe("multiply", () => {
    it("두 수를 곱한다", () => {
      expect(multiply(4, 5)).toBe(20);
    });
  });

  describe("divide", () => {
    it("두 수를 나눈다", () => {
      expect(divide(10, 2)).toBe(5);
    });

    // 실무에서 자주 테스트하는 케이스: 예외 상황
    it("0으로 나누면 에러를 던진다", () => {
      // 함수가 에러를 던지는지 검증
      expect(() => divide(10, 0)).toThrow("0으로 나눌 수 없습니다");
    });
  });

  describe("sum", () => {
    it("빈 배열의 합은 0이다", () => {
      expect(sum([])).toBe(0);
    });

    it("숫자 배열의 합을 계산한다", () => {
      expect(sum([1, 2, 3, 4])).toBe(10);
    });
  });
});
