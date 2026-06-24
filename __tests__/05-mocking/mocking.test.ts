/**
 * Chapter 05: Mocking (가짜 함수/모듈)
 *
 * 학습 목표:
 * - jest.fn() — 함수 호출 추적 및 가짜 구현
 * - jest.mock() — 모듈 전체를 가짜로 대체
 *
 * 실무 예시:
 * - 외부 API 호출을 mock해서 네트워크 없이 테스트
 * - 결제 API, 이메일 발송 등 비용/부작용 있는 함수 mock
 * - 콜백 함수가 올바르게 호출됐는지 검증
 */

import { calculateDiscountedPrice } from "@/lib/api";

// 외부 결제 모듈을 가짜로 대체 (jest.mock은 상대 경로 사용)
jest.mock("../../src/lib/payment", () => ({
  processPayment: jest.fn().mockResolvedValue({
    success: true,
    transactionId: "tx-123",
  }),
}));

import { processPayment } from "../../src/lib/payment";

describe("jest.fn() — Mock 함수", () => {
  it("mock 함수가 호출됐는지 검증한다", () => {
    const mockCallback = jest.fn();

    mockCallback("hello");
    mockCallback("world");

    expect(mockCallback).toHaveBeenCalled();
    expect(mockCallback).toHaveBeenCalledTimes(2);
    expect(mockCallback).toHaveBeenCalledWith("hello");
    expect(mockCallback).toHaveBeenLastCalledWith("world");
  });

  it("mock 함수에 반환값을 지정할 수 있다", () => {
    const mockAdd = jest.fn((a: number, b: number) => a + b);

    expect(mockAdd(2, 3)).toBe(5);
    expect(mockAdd).toHaveBeenCalledWith(2, 3);
  });

  it("mockReturnValue로 고정값 반환", () => {
    const mockFn = jest.fn().mockReturnValue(42);
    expect(mockFn()).toBe(42);
    expect(mockFn()).toBe(42); // 항상 42
  });

  it("mockImplementation으로 커스텀 로직", () => {
    const mockFn = jest.fn().mockImplementation((name: string) => `안녕, ${name}!`);
    expect(mockFn("철수")).toBe("안녕, 철수!");
  });
});

describe("jest.mock() — 모듈 Mock", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // 각 테스트 전 mock 호출 기록 초기화
  });

  it("mock된 결제 함수가 성공 응답을 반환한다", async () => {
    const result = await processPayment(10000);

    expect(result.success).toBe(true);
    expect(result.transactionId).toBe("tx-123");
    expect(processPayment).toHaveBeenCalledWith(10000);
  });

  it("테스트마다 다른 mock 응답을 설정할 수 있다", async () => {
    (processPayment as jest.Mock).mockResolvedValueOnce({
      success: false,
      error: "잔액 부족",
    });

    const result = await processPayment(999999);
    expect(result.success).toBe(false);
  });
});

describe("할인 계산 (순수 함수 — mock 불필요)", () => {
  it("10% 할인을 적용한다", () => {
    expect(calculateDiscountedPrice(10000, 10)).toBe(9000);
  });

  it("잘못된 할인율이면 에러", () => {
    expect(() => calculateDiscountedPrice(10000, -5)).toThrow();
    expect(() => calculateDiscountedPrice(10000, 150)).toThrow();
  });
});
