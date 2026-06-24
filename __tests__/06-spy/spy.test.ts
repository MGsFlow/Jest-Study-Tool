/**
 * Chapter 06: Spy (실제 함수 감시)
 *
 * 학습 목표:
 * - jest.spyOn()으로 기존 함수/메서드를 감시하면서도 실제 동작 유지
 * - mock과 spy의 차이 이해
 *
 * 실무 예시:
 * - console.error가 호출됐는지 확인 (에러 로깅)
 * - localStorage.setItem 호출 검증
 * - 원본 구현은 유지하되 호출 여부만 확인할 때
 */

import { ShoppingCart } from "@/lib/cart";

describe("jest.spyOn()", () => {
  afterEach(() => {
    jest.restoreAllMocks(); // spy를 원래대로 복원
  });

  it("console.log 호출을 감시한다", () => {
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});

    console.log("테스트 메시지");

    expect(spy).toHaveBeenCalledWith("테스트 메시지");
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("Math.random을 고정값으로 spy", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.5);

    expect(Math.random()).toBe(0.5);
    expect(Math.random()).toBe(0.5);
  });

  it("객체 메서드를 spy하면서 원본 동작도 유지", () => {
    const cart = new ShoppingCart();
    const addItemSpy = jest.spyOn(cart, "addItem");

    cart.addItem({ id: "1", name: "테스트", price: 1000, quantity: 1 });

    expect(addItemSpy).toHaveBeenCalledWith({
      id: "1",
      name: "테스트",
      price: 1000,
      quantity: 1,
    });
    expect(cart.getTotal()).toBe(1000); // 원본 동작 유지
  });

  it("localStorage를 spy", () => {
    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

    localStorage.setItem("token", "abc123");

    expect(setItemSpy).toHaveBeenCalledWith("token", "abc123");
  });
});

describe("Mock vs Spy 차이", () => {
  it("mock(fn) — 완전히 가짜 함수 생성", () => {
    const mockFn = jest.fn();
    mockFn("hello");
    expect(mockFn).toHaveBeenCalledWith("hello");
    // mockFn은 원본 함수가 없음 — 처음부터 가짜
  });

  it("spyOn — 기존 함수를 감시 + 선택적으로 mock", () => {
    const originalParse = JSON.parse;
    const spy = jest.spyOn(JSON, "parse");

    JSON.parse('{"a":1}');
    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
    expect(JSON.parse).toBe(originalParse);
  });
});
