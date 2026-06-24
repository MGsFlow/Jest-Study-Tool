/**
 * Chapter 02: Jest Matchers (검증 도구)
 *
 * 학습 목표:
 * - 다양한 expect 매처로 값을 검증하는 방법
 *
 * 실무 예시:
 * - API 응답 객체 구조 검증 (toEqual, toHaveProperty)
 * - 폼 유효성 검사 결과 (toBeTruthy, toBeFalsy)
 * - 배열/문자열 필터링 결과 (toContain, toMatch)
 */

import {
  isValidEmail,
  isValidPassword,
  isValidDiscountRate,
} from "@/lib/validators";
import { formatPrice, formatDate, truncate } from "@/lib/formatters";

describe("Jest Matchers 모음", () => {
  describe("동등성 비교", () => {
    it("toBe — 원시값(primitive) 비교에 사용", () => {
      expect(1 + 1).toBe(2);
      expect("hello").toBe("hello");
      // toBe는 === 비교 (객체는 참조 비교)
    });

    it("toEqual — 객체/배열의 값 비교에 사용", () => {
      const user = { name: "김철수", age: 30 };
      expect(user).toEqual({ name: "김철수", age: 30 });
    });

    it("not — 결과를 반전", () => {
      expect(1 + 1).not.toBe(3);
    });
  });

  describe("Truthy / Falsy", () => {
    it("toBeTruthy / toBeFalsy", () => {
      expect(isValidEmail("test@example.com")).toBeTruthy();
      expect(isValidEmail("invalid")).toBeFalsy();
    });
  });

  describe("숫자 비교", () => {
    it("toBeGreaterThan / toBeLessThan", () => {
      expect(10).toBeGreaterThan(5);
      expect(3).toBeLessThan(5);
    });

    it("toBeCloseTo — 부동소수점 비교", () => {
      expect(0.1 + 0.2).toBeCloseTo(0.3);
    });
  });

  describe("문자열", () => {
    it("toMatch — 정규식 매칭", () => {
      expect(formatPrice(1000)).toMatch(/1,000원/);
    });

    it("toContain — 부분 문자열 포함", () => {
      expect(truncate("Hello World", 5)).toContain("Hello");
    });
  });

  describe("배열", () => {
    it("toContain — 배열 원소 포함", () => {
      const fruits = ["사과", "바나나", "오렌지"];
      expect(fruits).toContain("바나나");
    });

    it("toHaveLength — 길이 검증", () => {
      expect(["a", "b", "c"]).toHaveLength(3);
    });
  });

  describe("객체", () => {
    it("toHaveProperty — 특정 속성 존재", () => {
      const result = { success: true, message: "OK" };
      expect(result).toHaveProperty("success");
      expect(result).toHaveProperty("success", true);
    });
  });

  describe("실무 유효성 검사 예시", () => {
    it.each([
      ["user@example.com", true],
      ["invalid-email", false],
      ["@missing.com", false],
    ])("isValidEmail('%s') → %s", (email, expected) => {
      expect(isValidEmail(email)).toBe(expected);
    });

    it.each([
      ["abc12345", true],
      ["short", false],
      ["onlyletters", false],
    ])("isValidPassword('%s') → %s", (password, expected) => {
      expect(isValidPassword(password)).toBe(expected);
    });

    it("할인율 범위 검증", () => {
      expect(isValidDiscountRate(50)).toBe(true);
      expect(isValidDiscountRate(-1)).toBe(false);
      expect(isValidDiscountRate(101)).toBe(false);
    });
  });

  describe("날짜 포맷", () => {
    it("formatDate가 YYYY-MM-DD 형식을 반환한다", () => {
      const result = formatDate("2024-03-15T10:30:00.000Z");
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });
});
