/**
 * Chapter 03: Setup & Teardown (테스트 전후 처리)
 *
 * 학습 목표:
 * - beforeAll / afterAll / beforeEach / afterEach 사용법
 * - 테스트 간 상태 격리의 중요성
 *
 * 실무 예시:
 * - DB 연결/해제 (beforeAll/afterAll)
 * - 각 테스트마다 mock/stub 초기화 (beforeEach/afterEach)
 * - ShoppingCart처럼 상태를 가진 객체는 매 테스트마다 새로 생성
 */

import { ShoppingCart } from "@/lib/cart";

describe("Setup & Teardown", () => {
  let cart: ShoppingCart;

  // 모든 테스트 시작 전 1번 실행
  beforeAll(() => {
    // 예: DB 연결, 글로벌 설정
    // console.log는 테스트 출력을 지저분하게 하므로 주석 처리
  });

  // 모든 테스트 종료 후 1번 실행
  afterAll(() => {
    // 예: DB 연결 해제, 리소스 정리
  });

  // 각 테스트 시작 전마다 실행 — 상태 격리의 핵심!
  beforeEach(() => {
    cart = new ShoppingCart();
  });

  // 각 테스트 종료 후마다 실행
  afterEach(() => {
    cart.clear();
  });

  it("빈 장바구니의 총액은 0이다", () => {
    expect(cart.getTotal()).toBe(0);
  });

  it("상품을 추가하면 총액이 증가한다", () => {
    cart.addItem({ id: "1", name: "노트북", price: 1000000, quantity: 1 });
    expect(cart.getTotal()).toBe(1000000);
  });

  it("같은 상품을 추가하면 수량이 합산된다", () => {
    cart.addItem({ id: "1", name: "노트북", price: 1000000, quantity: 1 });
    cart.addItem({ id: "1", name: "노트북", price: 1000000, quantity: 2 });
    expect(cart.getItemCount()).toBe(3);
  });

  it("상품을 제거하면 총액이 감소한다", () => {
    cart.addItem({ id: "1", name: "노트북", price: 1000000, quantity: 1 });
    cart.addItem({ id: "2", name: "마우스", price: 50000, quantity: 1 });
    cart.removeItem("1");
    expect(cart.getTotal()).toBe(50000);
  });
});

describe("describe 블록별 독립 setup", () => {
  // 이 describe 안에서만 사용하는 setup
  let numbers: number[];

  beforeEach(() => {
    numbers = [1, 2, 3];
  });

  it("배열에 요소를 추가한다", () => {
    numbers.push(4);
    expect(numbers).toHaveLength(4);
  });

  it("이전 테스트의 push가 영향을 주지 않는다", () => {
    // beforeEach 덕분에 numbers는 항상 [1, 2, 3]으로 시작
    expect(numbers).toHaveLength(3);
  });
});
