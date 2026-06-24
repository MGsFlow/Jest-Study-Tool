import type { Chapter } from "./types";

export const chapters: Chapter[] = [
  {
    id: "basics",
    number: 1,
    title: "Jest 기초",
    subtitle: "describe, it, expect — 테스트의 ABC",
    emoji: "🌱",
    duration: "15분",
    testFolder: "01-basics",
    summary:
      "Jest 테스트의 가장 기본적인 구조인 describe, it, expect를 배웁니다. 모든 테스트는 여기서 시작합니다.",
    whyItMatters:
      "실무에서 새 기능을 만들 때, 가장 먼저 작성하는 것이 바로 이런 기본 단위 테스트입니다. 할인 계산, 날짜 변환 같은 순수 함수부터 테스트하면 버그를 빠르게 잡을 수 있습니다.",
    realWorldExamples: [
      "쇼핑몰 할인율 계산 함수가 10% 할인 시 올바른 금액을 반환하는지",
      "회원 등급별 포인트 적립률 계산이 정확한지",
      "0으로 나누기 같은 예외 상황에서 에러를 던지는지",
    ],
    sections: [
      {
        title: "테스트란?",
        content:
          "테스트는 코드가 **의도한 대로 동작하는지 자동으로 확인**하는 코드입니다. 매번 수동으로 브라우저를 열어 확인할 필요 없이, `npm test` 한 번으로 수십·수백 개의 검증을 실행할 수 있습니다.",
      },
      {
        title: "describe — 테스트 그룹",
        content:
          "`describe`는 관련된 테스트들을 하나의 그룹으로 묶습니다. 파일 하나에 여러 함수를 테스트할 때, 함수별로 describe를 나누면 결과가 읽기 쉬워집니다.",
        code: `describe("math 유틸리티", () => {
  describe("add", () => {
    // add 관련 테스트들...
  });
  describe("divide", () => {
    // divide 관련 테스트들...
  });
});`,
      },
      {
        title: "it / test — 개별 테스트",
        content:
          "`it`(또는 `test`)은 하나의 테스트 케이스입니다. 설명은 **행동 중심**으로 작성하세요. 'add 테스트' ❌ → '두 양수를 더하면 올바른 결과를 반환한다' ✅",
        code: `it("두 양수를 더하면 올바른 결과를 반환한다", () => {
  const result = add(2, 3);
  expect(result).toBe(5);
});`,
      },
      {
        title: "expect — 결과 검증",
        content:
          "`expect(실제값).toBe(기대값)`으로 결과를 검증합니다. 이것을 **Assertion(어설션)** 이라고 부릅니다.",
        code: `expect(add(2, 3)).toBe(5);
expect(subtract(10, 3)).toBe(7);`,
      },
      {
        title: "에러 테스트 — toThrow",
        content:
          "함수가 특정 상황에서 에러를 던져야 할 때는 `toThrow`를 사용합니다. 실무에서 입력 유효성 검사, 0으로 나누기 등을 테스트할 때 필수입니다.",
        code: `it("0으로 나누면 에러를 던진다", () => {
  expect(() => divide(10, 0)).toThrow("0으로 나눌 수 없습니다");
});`,
        tip: "toThrow는 함수 자체가 아니라, 함수를 **호출하는 화살표 함수**를 인자로 넘겨야 합니다.",
      },
      {
        title: "AAA 패턴",
        content:
          "모든 테스트는 **Arrange(준비) → Act(실행) → Assert(검증)** 순서로 작성하면 읽기 쉽습니다.",
        code: `it("숫자 배열의 합을 계산한다", () => {
  // Arrange: 테스트 데이터 준비
  const numbers = [1, 2, 3, 4];
  // Act: 테스트 대상 실행
  const result = sum(numbers);
  // Assert: 결과 검증
  expect(result).toBe(10);
});`,
      },
    ],
    quiz: [
      {
        id: "b1",
        question: "Jest에서 관련 테스트를 그룹으로 묶는 함수는?",
        options: [
          { id: "a", text: "group()" },
          { id: "b", text: "describe()" },
          { id: "c", text: "context()" },
          { id: "d", text: "suite()" },
        ],
        correctOptionId: "b",
        explanation:
          "describe()는 관련 테스트를 하나의 블록으로 묶습니다. it()과 함께 가장 많이 쓰는 Jest API입니다.",
      },
      {
        id: "b2",
        question: "expect(add(2, 3)).toBe(5)에서 toBe는 어떤 비교를 하나요?",
        options: [
          { id: "a", text: "객체의 깊은 비교 (값까지)" },
          { id: "b", text: "=== 엄격 동등 비교 (원시값)" },
          { id: "c", text: "대소문자 무시 문자열 비교" },
          { id: "d", text: "배열 원소 포함 여부" },
        ],
        correctOptionId: "b",
        explanation:
          "toBe는 === 연산자와 같은 엄격 동등 비교입니다. 객체/배열 비교에는 toEqual을 사용합니다.",
      },
      {
        id: "b3",
        question: "함수가 에러를 던지는지 테스트하려면?",
        options: [
          { id: "a", text: "expect(fn()).toError()" },
          { id: "b", text: "expect(() => fn()).toThrow()" },
          { id: "c", text: "expect(fn).toReject()" },
          { id: "d", text: "expect(fn()).toFail()" },
        ],
        correctOptionId: "b",
        explanation:
          "toThrow는 함수를 즉시 실행하지 않도록 화살표 함수로 감싸서 전달해야 합니다.",
      },
      {
        id: "b4",
        question: "테스트 이름을 작성할 때 가장 좋은 방식은?",
        options: [
          { id: "a", text: "'add 함수 테스트'" },
          { id: "b", text: "'test1'" },
          { id: "c", text: "'두 양수를 더하면 올바른 결과를 반환한다'" },
          { id: "d", text: "'add()'" },
        ],
        correctOptionId: "c",
        explanation:
          "테스트 이름은 행동과 기대 결과를 설명해야 합니다. 실패했을 때 무엇이 잘못됐는지 바로 알 수 있습니다.",
      },
    ],
    practiceCommand: "npm test -- 01-basics",
  },
  {
    id: "matchers",
    number: 2,
    title: "Matchers",
    subtitle: "다양한 검증 도구 마스터하기",
    emoji: "🎯",
    duration: "20분",
    testFolder: "02-matchers",
    summary:
      "toBe, toEqual, toContain, toMatch 등 Jest의 다양한 Matcher로 값을 검증하는 방법을 배웁니다.",
    whyItMatters:
      "실무에서는 API 응답 객체, 필터링된 배열, 포맷된 문자열 등 다양한 형태의 데이터를 검증해야 합니다. 상황에 맞는 Matcher를 알면 테스트 코드가 명확해집니다.",
    realWorldExamples: [
      "API 응답에 { success: true, data: {...} } 구조가 맞는지 toEqual/toHaveProperty로 검증",
      "검색 결과 배열에 특정 상품명이 포함되는지 toContain으로 확인",
      "가격 포맷 '1,000원'이 정규식 패턴과 맞는지 toMatch로 검증",
    ],
    sections: [
      {
        title: "toBe vs toEqual",
        content:
          "**toBe**: 원시값(number, string, boolean) 비교 — `===` 사용\n\n**toEqual**: 객체/배열의 **값** 비교 — 참조가 달라도 내용이 같으면 통과",
        code: `expect(1 + 1).toBe(2);                    // 원시값
expect({ name: "Kim" }).toEqual({ name: "Kim" }); // 객체`,
      },
      {
        title: "Truthy / Falsy",
        content:
          "값이 truthy/falsy인지 확인할 때 사용합니다. boolean 반환 함수 테스트에 유용합니다.",
        code: `expect(isValidEmail("a@b.com")).toBeTruthy();
expect(isValidEmail("invalid")).toBeFalsy();`,
      },
      {
        title: "숫자 Matchers",
        content: "부등호 비교와 부동소수점 비교를 위한 Matcher들입니다.",
        code: `expect(10).toBeGreaterThan(5);
expect(3).toBeLessThanOrEqual(3);
expect(0.1 + 0.2).toBeCloseTo(0.3); // 부동소수점`,
      },
      {
        title: "문자열 / 배열 Matchers",
        content: "문자열 포함, 정규식 매칭, 배열 원소/길이 검증에 사용합니다.",
        code: `expect("Hello World").toContain("World");
expect("1,000원").toMatch(/\\d+,\\d+원/);
expect(["사과", "바나나"]).toContain("사과");
expect([1, 2, 3]).toHaveLength(3);`,
      },
      {
        title: "it.each — 데이터 주도 테스트",
        content:
          "같은 로직을 여러 입력값으로 반복 테스트할 때 코드 중복을 줄여줍니다. 실무에서 유효성 검사 테스트에 매우 유용합니다.",
        code: `it.each([
  ["user@example.com", true],
  ["invalid", false],
])("isValidEmail('%s') → %s", (email, expected) => {
  expect(isValidEmail(email)).toBe(expected);
});`,
        tip: "it.each는 테스트 케이스가 3개 이상일 때 특히 빛을 발합니다.",
      },
    ],
    quiz: [
      {
        id: "m1",
        question: "객체 { a: 1 }과 { a: 1 }을 비교할 때 올바른 Matcher는?",
        options: [
          { id: "a", text: "toBe" },
          { id: "b", text: "toEqual" },
          { id: "c", text: "toContain" },
          { id: "d", text: "toMatch" },
        ],
        correctOptionId: "b",
        explanation: "toBe는 참조 비교이므로 다른 객체는 실패합니다. toEqual은 값을 비교합니다.",
      },
      {
        id: "m2",
        question: "0.1 + 0.2 === 0.3이 false인 이유를 테스트할 때 사용하는 Matcher는?",
        options: [
          { id: "a", text: "toBe" },
          { id: "b", text: "toBeCloseTo" },
          { id: "c", text: "toEqual" },
          { id: "d", text: "toBeApprox" },
        ],
        correctOptionId: "b",
        explanation: "부동소소점 연산 오차를 허용하려면 toBeCloseTo를 사용합니다.",
      },
      {
        id: "m3",
        question: "배열에 특정 원소가 포함되어 있는지 확인하려면?",
        options: [
          { id: "a", text: "toHaveProperty" },
          { id: "b", text: "toInclude" },
          { id: "c", text: "toContain" },
          { id: "d", text: "toHaveElement" },
        ],
        correctOptionId: "c",
        explanation: "toContain은 배열과 문자열 모두에서 부분 포함을 검증합니다.",
      },
      {
        id: "m4",
        question: "it.each의 주된 장점은?",
        options: [
          { id: "a", text: "테스트 실행 속도 향상" },
          { id: "b", text: "여러 입력값 테스트 코드 중복 제거" },
          { id: "c", text: "비동기 테스트 자동 처리" },
          { id: "d", text: "Mock 자동 생성" },
        ],
        correctOptionId: "b",
        explanation: "it.each는 표 형태의 데이터로 같은 로직을 반복 테스트합니다.",
      },
    ],
    practiceCommand: "npm test -- 02-matchers",
  },
  {
    id: "setup-teardown",
    number: 3,
    title: "Setup & Teardown",
    subtitle: "테스트 전후 초기화 — 상태 격리",
    emoji: "🔄",
    duration: "15분",
    testFolder: "03-setup-teardown",
    summary:
      "beforeEach, afterEach 등으로 테스트 간 상태를 격리하는 방법을 배웁니다.",
    whyItMatters:
      "장바구니, DB 연결, mock 함수처럼 **상태를 가진 객체**는 테스트 간 공유되면 결과가 불안정해집니다. beforeEach에서 매번 새로 만들어야 합니다.",
    realWorldExamples: [
      "장바구니 테스트 — 매 테스트마다 빈 cart 생성",
      "DB 테스트 — beforeAll에서 연결, afterAll에서 해제",
      "Mock 초기화 — afterEach에서 jest.clearAllMocks()",
    ],
    sections: [
      {
        title: "왜 상태 격리가 필요한가?",
        content:
          "테스트 A에서 장바구니에 상품을 담으면, 테스트 B도 그 상태를 이어받습니다. B는 빈 장바구니를 기대하지만 실패합니다. **각 테스트는 독립적**이어야 합니다.",
      },
      {
        title: "beforeEach / afterEach",
        content:
          "**beforeEach**: 각 테스트 **시작 전** 실행\n\n**afterEach**: 각 테스트 **종료 후** 실행\n\n상태를 가진 객체는 beforeEach에서 새로 생성하는 것이 정석입니다.",
        code: `let cart: ShoppingCart;

beforeEach(() => {
  cart = new ShoppingCart(); // 매 테스트마다 새 장바구니
});

it("빈 장바구니 총액은 0", () => {
  expect(cart.getTotal()).toBe(0);
});`,
      },
      {
        title: "beforeAll / afterAll",
        content:
          "**beforeAll**: 모든 테스트 **시작 전 1번**\n\n**afterAll**: 모든 테스트 **종료 후 1번**\n\nDB 연결, 파일 생성 등 비용이 큰 작업에 사용합니다.",
        code: `beforeAll(async () => {
  await db.connect(); // 한 번만 연결
});

afterAll(async () => {
  await db.disconnect(); // 마지막에 해제
});`,
        tip: "대부분의 경우 beforeEach면 충분합니다. beforeAll은 정말 비용이 클 때만 사용하세요.",
      },
    ],
    quiz: [
      {
        id: "s1",
        question: "매 테스트마다 새 ShoppingCart를 만들려면?",
        options: [
          { id: "a", text: "beforeAll에서 생성" },
          { id: "b", text: "beforeEach에서 생성" },
          { id: "c", text: "afterAll에서 생성" },
          { id: "d", text: "describe 밖에서 생성" },
        ],
        correctOptionId: "b",
        explanation: "beforeEach는 각 it() 실행 전마다 호출되어 상태 격리를 보장합니다.",
      },
      {
        id: "s2",
        question: "DB 연결처럼 비용이 큰 작업은 어디서?",
        options: [
          { id: "a", text: "beforeEach" },
          { id: "b", text: "beforeAll" },
          { id: "c", text: "afterEach" },
          { id: "d", text: "it 안에서" },
        ],
        correctOptionId: "b",
        explanation: "beforeAll/afterAll은 전체 describe 블록에서 1번만 실행됩니다.",
      },
      {
        id: "s3",
        question: "테스트 간 상태 공유로 발생하는 문제는?",
        options: [
          { id: "a", text: "테스트 실행 속도 향상" },
          { id: "b", text: "Flaky test (간헐적 실패)" },
          { id: "c", text: "커버리지 증가" },
          { id: "d", text: "Mock 자동 생성" },
        ],
        correctOptionId: "b",
        explanation: "상태가 공유되면 테스트 순서에 따라 결과가 달라져 간헐적으로 실패합니다.",
      },
    ],
    practiceCommand: "npm test -- 03-setup-teardown",
  },
  {
    id: "async",
    number: 4,
    title: "비동기 테스트",
    subtitle: "Promise, async/await 테스트",
    emoji: "⏳",
    duration: "20분",
    testFolder: "04-async",
    summary:
      "API 호출, DB 쿼리 등 비동기 코드를 테스트하는 방법을 배웁니다.",
    whyItMatters:
      "실무 코드의 대부분은 비동기입니다. fetch, DB, setTimeout 등을 테스트하지 못하면 핵심 로직의 절반을 놓치게 됩니다.",
    realWorldExamples: [
      "사용자 정보 API 호출 후 데이터 파싱 검증",
      "결제 API 실패 시 에러 처리 확인",
      "debounce/throttle 함수의 지연 동작 테스트",
    ],
    sections: [
      {
        title: "async/await 방식 (권장)",
        content: "가장 읽기 쉽고 권장되는 방식입니다. 테스트 함수에 async를 붙이고 await로 결과를 기다립니다.",
        code: `it("데이터를 가져온다", async () => {
  const data = await fetchData();
  expect(data.id).toBe(1);
});`,
      },
      {
        title: "resolves / rejects",
        content:
          "Promise의 성공/실패를 검증합니다. return을 잊지 마세요 — Jest가 Promise 완료를 기다리려면 return이 필요합니다.",
        code: `it("성공 Promise", () => {
  return expect(fetchData()).resolves.toEqual({ id: 1 });
});

it("실패 Promise", () => {
  return expect(fetchError()).rejects.toThrow("네트워크 오류");
});`,
        tip: "async/await와 rejects/resolves를 혼용할 수 있습니다: await expect(p).rejects.toThrow()",
      },
    ],
    quiz: [
      {
        id: "a1",
        question: "비동기 테스트에서 가장 권장되는 방식은?",
        options: [
          { id: "a", text: "setTimeout으로 기다리기" },
          { id: "b", text: "async/await" },
          { id: "c", text: "테스트를 동기 함수로 작성" },
          { id: "d", text: "done() 콜백만 사용" },
        ],
        correctOptionId: "b",
        explanation: "async/await가 가장 읽기 쉽고 현대적인 방식입니다.",
      },
      {
        id: "a2",
        question: "Promise가 reject될 것을 기대할 때 사용하는 Matcher는?",
        options: [
          { id: "a", text: "toResolve" },
          { id: "b", text: "rejects" },
          { id: "c", text: "toFail" },
          { id: "d", text: "toCatch" },
        ],
        correctOptionId: "b",
        explanation: "expect(promise).rejects.toThrow()로 실패 Promise를 검증합니다.",
      },
      {
        id: "a3",
        question: "resolves/rejects 사용 시 주의할 점은?",
        options: [
          { id: "a", text: "async 키워드 필수" },
          { id: "b", text: "return으로 Promise를 반환해야 Jest가 대기" },
          { id: "c", text: "try/catch 필수" },
          { id: "d", text: "setTimeout 필수" },
        ],
        correctOptionId: "b",
        explanation: "return 없이 resolves/rejects를 쓰면 Jest가 Promise 완료 전에 테스트를 종료할 수 있습니다.",
      },
    ],
    practiceCommand: "npm test -- 04-async",
  },
  {
    id: "mocking",
    number: 5,
    title: "Mocking",
    subtitle: "jest.fn, jest.mock — 가짜 함수와 모듈",
    emoji: "🎭",
    duration: "25분",
    testFolder: "05-mocking",
    summary:
      "외부 의존성을 가짜로 대체해서 독립적인 테스트를 작성하는 방법을 배웁니다.",
    whyItMatters:
      "결제 API, 이메일 발송, 외부 서비스를 실제로 호출하면 비용이 들고 테스트가 불안정해집니다. Mock으로 대체하면 빠르고 안정적인 테스트가 가능합니다.",
    realWorldExamples: [
      "결제 API(processPayment)를 mock해서 성공/실패 시나리오 테스트",
      "onClick 콜백이 올바른 인자로 호출됐는지 jest.fn()으로 검증",
      "이메일 발송 모듈 mock — 실제 이메일 안 보내고 호출 여부만 확인",
    ],
    sections: [
      {
        title: "jest.fn() — Mock 함수",
        content:
          "가짜 함수를 만들고, **호출 횟수와 인자**를 추적할 수 있습니다. 콜백 함수 테스트에 필수입니다.",
        code: `const mockCallback = jest.fn();
mockCallback("hello", 42);

expect(mockCallback).toHaveBeenCalled();
expect(mockCallback).toHaveBeenCalledWith("hello", 42);
expect(mockCallback).toHaveBeenCalledTimes(1);`,
      },
      {
        title: "mockReturnValue / mockResolvedValue",
        content: "Mock 함수의 반환값을 고정할 수 있습니다.",
        code: `const mockFn = jest.fn().mockReturnValue(42);
const asyncMock = jest.fn().mockResolvedValue({ success: true });`,
      },
      {
        title: "jest.mock() — 모듈 Mock",
        content:
          "모듈 전체를 가짜로 교체합니다. Jest가 파일 최상단으로 hoisting하므로 import 전에 작성합니다.",
        code: `jest.mock("@/lib/payment", () => ({
  processPayment: jest.fn().mockResolvedValue({
    success: true,
    transactionId: "tx-123",
  }),
}));`,
        tip: "각 테스트 전 jest.clearAllMocks()로 호출 기록을 초기화하세요.",
      },
    ],
    quiz: [
      {
        id: "mk1",
        question: "jest.fn()의 주요 용도는?",
        options: [
          { id: "a", text: "CSS 스타일 테스트" },
          { id: "b", text: "함수 호출 추적 및 가짜 구현" },
          { id: "c", text: "DOM 렌더링" },
          { id: "d", text: "파일 시스템 접근" },
        ],
        correctOptionId: "b",
        explanation: "jest.fn()은 mock 함수를 만들고 toHaveBeenCalled 등으로 호출을 검증합니다.",
      },
      {
        id: "mk2",
        question: "jest.mock()은 무엇을 대체하나요?",
        options: [
          { id: "a", text: "CSS 클래스" },
          { id: "b", text: "모듈 전체" },
          { id: "c", text: "HTML 요소" },
          { id: "d", text: "테스트 파일" },
        ],
        correctOptionId: "b",
        explanation: "jest.mock()은 import하는 모듈 전체를 mock 구현으로 교체합니다.",
      },
      {
        id: "mk3",
        question: "mock 함수 호출 기록을 초기화하려면?",
        options: [
          { id: "a", text: "jest.resetAll()" },
          { id: "b", text: "jest.clearAllMocks()" },
          { id: "c", text: "mockFn.delete()" },
          { id: "d", text: "jest.clean()" },
        ],
        correctOptionId: "b",
        explanation: "beforeEach에서 jest.clearAllMocks()를 호출하면 테스트 간 mock 상태가 격리됩니다.",
      },
    ],
    practiceCommand: "npm test -- 05-mocking",
  },
  {
    id: "spy",
    number: 6,
    title: "Spy",
    subtitle: "jest.spyOn — 원본 유지하며 감시",
    emoji: "👁️",
    duration: "15분",
    testFolder: "06-spy",
    summary: "Mock과 Spy의 차이를 이해하고, jest.spyOn으로 기존 함수를 감시합니다.",
    whyItMatters:
      "원본 동작은 유지하면서 '호출됐는지'만 확인하고 싶을 때 Spy를 사용합니다. console.error 로깅, localStorage 저장 등에 활용합니다.",
    realWorldExamples: [
      "에러 발생 시 console.error가 호출됐는지 확인",
      "localStorage.setItem('token', ...) 호출 검증",
      "Math.random을 고정값으로 spy해서 랜덤 로직 테스트",
    ],
    sections: [
      {
        title: "Mock vs Spy",
        content:
          "**Mock (jest.fn)**: 처음부터 가짜 함수 — 원본 없음\n\n**Spy (jest.spyOn)**: 기존 함수/메서드를 감시 — 원본 동작 유지 + 호출 추적 가능",
        code: `// Mock: 완전히 가짜
const mockFn = jest.fn();

// Spy: console.log를 감시 (원본 동작 유지)
const spy = jest.spyOn(console, "log");
console.log("hello"); // 실제로 출력됨
expect(spy).toHaveBeenCalledWith("hello");`,
      },
      {
        title: "spy + mockReturnValue",
        content: "Spy하면서 반환값만 바꿀 수도 있습니다.",
        code: `jest.spyOn(Math, "random").mockReturnValue(0.5);
expect(Math.random()).toBe(0.5);

// 테스트 후 반드시 복원
jest.restoreAllMocks();`,
        tip: "afterEach에서 jest.restoreAllMocks()를 호출해 다른 테스트에 영향을 주지 마세요.",
      },
    ],
    quiz: [
      {
        id: "sp1",
        question: "Spy와 Mock의 핵심 차이는?",
        options: [
          { id: "a", text: "Spy는 원본 함수 동작을 유지한다" },
          { id: "b", text: "Mock이 더 빠르다" },
          { id: "c", text: "Spy는 비동기만 가능" },
          { id: "d", text: "차이 없다" },
        ],
        correctOptionId: "a",
        explanation: "Spy는 기존 구현을 감시하고, Mock은 처음부터 가짜 함수입니다.",
      },
      {
        id: "sp2",
        question: "Spy 사용 후 다른 테스트에 영향을 주지 않으려면?",
        options: [
          { id: "a", text: "jest.clearAllMocks()" },
          { id: "b", text: "jest.restoreAllMocks()" },
          { id: "c", text: "spy.delete()" },
          { id: "d", text: "아무것도 안 해도 됨" },
        ],
        correctOptionId: "b",
        explanation: "restoreAllMocks()는 spy를 원래 함수로 복원합니다.",
      },
    ],
    practiceCommand: "npm test -- 06-spy",
  },
  {
    id: "api-mock",
    number: 7,
    title: "API Mock",
    subtitle: "fetch를 가짜로 — 네트work 없이 API 테스트",
    emoji: "🌐",
    duration: "20분",
    testFolder: "07-api",
    summary: "global.fetch를 mock해서 REST API 클라이언트 함수를 테스트합니다.",
    whyItMatters:
      "실제 API 서버 없이 CI에서 테스트할 수 있습니다. 404, 500 등 에러 시나리오도 쉽게 재현할 수 있습니다.",
    realWorldExamples: [
      "fetchUser(1) 성공 시 { id, name, email } 반환 검증",
      "404 응답 시 '사용자 조회 실패' 에러 throw 확인",
      "네트워크 장애 시 reject 처리 검증",
    ],
    sections: [
      {
        title: "global.fetch Mock",
        content:
          "테스트에서 global.fetch를 jest.fn()으로 교체하고, 원하는 응답을 반환하도록 설정합니다.",
        code: `beforeEach(() => {
  global.fetch = jest.fn();
});

it("사용자 정보를 가져온다", async () => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => ({ id: 1, name: "Kim", email: "kim@test.com" }),
  });

  const user = await fetchUser(1);
  expect(user.name).toBe("Kim");
});`,
      },
      {
        title: "에러 응답 테스트",
        content: "ok: false인 응답이나 네트워크 에러도 쉽게 시뮬레이션할 수 있습니다.",
        code: `(global.fetch as jest.Mock).mockResolvedValueOnce({
  ok: false,
  status: 404,
});

await expect(fetchUser(999)).rejects.toThrow("404");`,
      },
    ],
    quiz: [
      {
        id: "api1",
        question: "fetch를 mock하는 주된 이유는?",
        options: [
          { id: "a", text: "테스트 속도를 늦추기 위해" },
          { id: "b", text: "실제 API 없이 안정적으로 테스트" },
          { id: "c", text: "fetch API를 제거하기 위해" },
          { id: "d", text: "CORS 문제 해결" },
        ],
        correctOptionId: "b",
        explanation: "Mock으로 네트work 의존성을 제거하면 CI에서 빠르고 안정적으로 테스트할 수 있습니다.",
      },
      {
        id: "api2",
        question: "mockResolvedValueOnce의 Once는 무엇을 의미?",
        options: [
          { id: "a", text: "한 번만 mock 적용, 다음 호출은 기본값" },
          { id: "b", text: "한 번만 fetch 호출 가능" },
          { id: "c", text: "첫 번째 테스트에서만 동작" },
          { id: "d", text: "1ms 후 만료" },
        ],
        correctOptionId: "a",
        explanation: "Once는 해당 mock이 다음 1회 호출에만 적용됨을 의미합니다.",
      },
    ],
    practiceCommand: "npm test -- 07-api",
  },
  {
    id: "components",
    number: 8,
    title: "React 컴포넌트 테스트",
    subtitle: "Testing Library로 UI 테스트",
    emoji: "⚛️",
    duration: "30분",
    testFolder: "08-components",
    summary:
      "render, screen, userEvent로 React 컴포넌트를 사용자 관점에서 테스트합니다.",
    whyItMatters:
      "버튼 클릭, 폼 제출, 에러 메시지 표시 등 **사용자가 실제로 경험하는 동작**을 자동으로 검증할 수 있습니다.",
    realWorldExamples: [
      "로그인 버튼 클릭 → onSubmit 콜백 호출 확인",
      "잘못된 이메일 입력 → 에러 메시지 표시",
      "disabled 버튼은 클릭해도 콜백 미호출",
    ],
    sections: [
      {
        title: "render & screen",
        content:
          "컴포넌트를 테스트 DOM에 렌더링하고, screen으로 요소를 찾습니다. **접근성 기준**(role, label)으로 찾는 것이 권장됩니다.",
        code: `import { render, screen } from "@testing-library/react";

render(<Button label="클릭" />);
expect(screen.getByRole("button", { name: "클릭" })).toBeInTheDocument();`,
      },
      {
        title: "userEvent — 사용자 상호작용",
        content:
          "클릭, 타이핑 등 사용자 행동을 시뮬레이션합니다. fireEvent보다 **userEvent를 권장**합니다.",
        code: `import userEvent from "@testing-library/user-event";

const user = userEvent.setup();
await user.click(screen.getByRole("button"));
await user.type(screen.getByLabelText("이메일"), "test@example.com");`,
      },
      {
        title: "Testing Library 철학",
        content:
          "구현 세부사항(className, state)이 아니라 **사용자가 보고/하는 것**을 테스트하세요.\n\n- getByRole, getByLabelText ✅\n- container.querySelector('.btn-primary') ❌",
        tip: "toBeInTheDocument(), toHaveTextContent()는 jest-dom에서 제공하는 매처입니다.",
      },
    ],
    quiz: [
      {
        id: "c1",
        question: "Testing Library에서 버튼을 찾는 권장 방법은?",
        options: [
          { id: "a", text: "container.querySelector('.btn')" },
          { id: "b", text: "screen.getByRole('button', { name: '클릭' })" },
          { id: "c", text: "document.getElementById('btn')" },
          { id: "d", text: "screen.getByClassName('btn')" },
        ],
        correctOptionId: "b",
        explanation: "getByRole은 접근성 트리 기준으로 요소를 찾아 사용자 관점과 일치합니다.",
      },
      {
        id: "c2",
        question: "toBeInTheDocument()는 어디서 제공?",
        options: [
          { id: "a", text: "Jest 코어" },
          { id: "b", text: "@testing-library/jest-dom" },
          { id: "c", text: "React" },
          { id: "d", text: "Next.js" },
        ],
        correctOptionId: "b",
        explanation: "jest.setup.ts에서 @testing-library/jest-dom을 import하면 사용할 수 있습니다.",
      },
      {
        id: "c3",
        question: "사용자 클릭 시뮬레이션에 권장되는 도구는?",
        options: [
          { id: "a", text: "fireEvent만 사용" },
          { id: "b", text: "userEvent" },
          { id: "c", text: "dispatchEvent 직접 호출" },
          { id: "d", text: "click() DOM API" },
        ],
        correctOptionId: "b",
        explanation: "userEvent는 실제 사용자 행동에 더 가깝게 시뮬레이션합니다.",
      },
    ],
    practiceCommand: "npm test -- 08-components",
  },
  {
    id: "hooks",
    number: 9,
    title: "Custom Hook 테스트",
    subtitle: "renderHook + act",
    emoji: "🪝",
    duration: "20분",
    testFolder: "09-hooks",
    summary: "컴포넌트 없이 React Hook의 로직만 독립적으로 테스트합니다.",
    whyItMatters:
      "useCounter, useFetch, useLocalStorage 등 재사용 Hook은 UI와 분리해서 테스트하면 더 빠르고 명확합니다.",
    realWorldExamples: [
      "useCounter — increment/decrement/reset 동작 검증",
      "useFetch — 로딩/성공/에러 상태 전환",
      "useDebounce — 입력 후 delay ms 뒤 값 변경",
    ],
    sections: [
      {
        title: "renderHook",
        content: "Hook을 테스트 환경에서 실행하고 result.current로 반환값에 접근합니다.",
        code: `import { renderHook, act } from "@testing-library/react";

const { result } = renderHook(() => useCounter(0));
expect(result.current.count).toBe(0);`,
      },
      {
        title: "act() — 상태 업데이트",
        content:
          "Hook 내부 state를 변경하는 함수 호출은 act()로 감싸야 React 경고 없이 테스트됩니다.",
        code: `act(() => {
  result.current.increment();
});
expect(result.current.count).toBe(1);`,
      },
      {
        title: "rerender — props 변경",
        content: "initialProps를 변경하며 Hook을 다시 렌더링할 수 있습니다.",
        code: `const { result, rerender } = renderHook(
  ({ initial }) => useCounter(initial),
  { initialProps: { initial: 0 } }
);
rerender({ initial: 100 });`,
      },
    ],
    quiz: [
      {
        id: "h1",
        question: "Hook 테스트에 사용하는 함수는?",
        options: [
          { id: "a", text: "render" },
          { id: "b", text: "renderHook" },
          { id: "c", text: "mountHook" },
          { id: "d", text: "testHook" },
        ],
        correctOptionId: "b",
        explanation: "@testing-library/react의 renderHook으로 Hook을 독립 테스트합니다.",
      },
      {
        id: "h2",
        question: "Hook state 변경 함수 호출 시 필요한 것은?",
        options: [
          { id: "a", text: "waitFor" },
          { id: "b", text: "act()" },
          { id: "c", text: "flushSync" },
          { id: "d", text: "setTimeout" },
        ],
        correctOptionId: "b",
        explanation: "act()는 React state 업데이트를 테스트 환경에서 올바르게 처리합니다.",
      },
    ],
    practiceCommand: "npm test -- 09-hooks",
  },
  {
    id: "snapshot",
    number: 10,
    title: "Snapshot 테스트",
    subtitle: "UI 변경 감지 — toMatchSnapshot",
    emoji: "📸",
    duration: "15분",
    testFolder: "10-snapshot",
    summary:
      "컴포넌트 렌더링 결과를 스냅샷으로 저장하고, 의도치 않은 UI 변경을 감지합니다.",
    whyItMatters:
      "UI 컴포넌트의 구조가 의도치 않게 바뀌면 스냅샷 테스트가 실패합니다. 다만 행동 테스트와 함께 사용해야 합니다.",
    realWorldExamples: [
      "UserCard 컴포넌트 UI 구조 변경 감지",
      "디자인 시스템 컴포넌트 회귀 테스트",
      "⚠️ 스냅샷만으로는 클릭/입력 동작 검증 불가",
    ],
    sections: [
      {
        title: "toMatchSnapshot",
        content:
          "렌더링된 HTML을 파일로 저장하고, 이후 테스트에서 같은지 비교합니다.",
        code: `const { container } = render(
  <UserCard name="김철수" email="kim@test.com" />
);
expect(container.firstChild).toMatchSnapshot();`,
      },
      {
        title: "스냅샷 업데이트",
        content:
          "UI를 **의도적으로** 변경했다면 스냅샷을 업데이트해야 합니다.",
        code: `# 스냅샷 업데이트
npm test -- -u`,
        tip: "스냅샷 남용 금지! toHaveTextContent, toHaveBeenCalled 같은 행동 테스트가 더 가치 있습니다.",
      },
    ],
    quiz: [
      {
        id: "sn1",
        question: "Snapshot 테스트의 주된 용도는?",
        options: [
          { id: "a", text: "클릭 이벤트 검증" },
          { id: "b", text: "UI 구조의 의도치 않은 변경 감지" },
          { id: "c", text: "API 호출 검증" },
          { id: "d", text: "성능 측정" },
        ],
        correctOptionId: "b",
        explanation: "스냅샷은 렌더링 결과 HTML을 저장해 회귀를 감지합니다.",
      },
      {
        id: "sn2",
        question: "스냅샷을 의도적으로 업데이트하려면?",
        options: [
          { id: "a", text: "npm test -- -u" },
          { id: "b", text: "npm test -- --update" },
          { id: "c", text: "jest --refresh" },
          { id: "d", text: "스냅샷 파일 수동 삭제만" },
        ],
        correctOptionId: "a",
        explanation: "-u (--updateSnapshot) 플래그로 실패한 스냅샷을 새 결과로 갱신합니다.",
      },
    ],
    practiceCommand: "npm test -- 10-snapshot",
  },
  {
    id: "e2e",
    number: 11,
    title: "E2E 테스트",
    subtitle: "Playwright — 브라우저에서 전체 흐름 테스트",
    emoji: "🌍",
    duration: "25분",
    testFolder: "11-e2e",
    summary:
      "Jest(단위/통합)와 E2E(End-to-End)의 차이를 이해하고, Playwright로 실제 사용자 흐름을 테스트하는 방법을 배웁니다.",
    whyItMatters:
      "단위 테스트가 통과해도 '로그인 → 장바구니 → 결제' 흐름에서 버그가 날 수 있습니다. E2E는 배포 전 핵심 사용자 시나리오를 브라우저에서 자동 검증합니다.",
    realWorldExamples: [
      "회원가입 → 이메일 인증 → 로그인 전체 흐름",
      "상품 검색 → 장바구니 담기 → 결제 완료",
      "모바일 반응형 UI에서 메뉴 클릭 동작",
    ],
    sections: [
      {
        title: "Jest vs E2E — 언제 뭘 쓰나?",
        content:
          "**Jest + Testing Library**: 함수, Hook, 컴포넌트 단위 — 빠르고 원인 파악 쉬움\n\n**Playwright/Cypress**: 실제 브라우저에서 전체 앱 흐름 — 느리지만 사용자 관점에서 가장 확실\n\n**실무 비율**: 단위 테스트 많이 + E2E는 핵심 시나리오 5~10개",
      },
      {
        title: "Playwright 기본 구조",
        content:
          "Playwright는 실제 Chromium/Firefox/WebKit 브라우저를 띄워 테스트합니다.",
        code: `import { test, expect } from "@playwright/test";

test("홈페이지에 제목이 보인다", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page.getByRole("heading", { name: "Jest 학습" })).toBeVisible();
});`,
      },
      {
        title: "사용자 흐름 테스트",
        content:
          "클릭, 입력, 페이지 이동을 연속으로 테스트합니다.",
        code: `test("챕터 1로 이동", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.getByRole("link", { name: /Chapter 1/ }).click();
  await expect(page.getByText("Jest 기초")).toBeVisible();
});`,
      },
      {
        title: "터미널에서 실행",
        content:
          "이 프로젝트에 Playwright 예제가 포함되어 있습니다.",
        code: `# Playwright 브라우저 설치 (최초 1회)
npx playwright install

# E2E 테스트 실행 (dev 서버 필요)
npm run dev   # 다른 터미널
npm run test:e2e`,
        tip: "E2E는 CI에서도 실행되지만 시간이 오래 걸려 핵심 시나리오만 선별하세요.",
      },
    ],
    quiz: [
      {
        id: "e2e1",
        question: "E2E 테스트의 주된 목적은?",
        options: [
          { id: "a", text: "함수 단위 로직 검증" },
          { id: "b", text: "실제 브라우저에서 사용자 흐름 검증" },
          { id: "c", text: "CSS 성능 측정" },
          { id: "d", text: "타입 체크" },
        ],
        correctOptionId: "b",
        explanation: "E2E는 End-to-End, 즉 전체 앱 흐름을 실제 브라우저에서 테스트합니다.",
      },
      {
        id: "e2e2",
        question: "실무에서 E2E 테스트 개수는?",
        options: [
          { id: "a", text: "모든 기능마다 100개+" },
          { id: "b", text: "핵심 시나리오 5~10개 선별" },
          { id: "c", text: "E2E만 사용, 단위 테스트 없음" },
          { id: "d", text: "0개가 이상적" },
        ],
        correctOptionId: "b",
        explanation: "E2E는 느리고 유지보수 비용이 높아 핵심 흐름만 테스트합니다.",
      },
      {
        id: "e2e3",
        question: "Playwright 테스트에서 page.goto()는?",
        options: [
          { id: "a", text: "페이지를 닫는다" },
          { id: "b", text: "URL로 이동한다" },
          { id: "c", text: "스크린샷을 찍는다" },
          { id: "d", text: "폼을 제출한다" },
        ],
        correctOptionId: "b",
        explanation: "page.goto(url)로 브라우저가 해당 URL로 이동합니다.",
      },
    ],
    practiceCommand: "npm run test:e2e",
  },
];

export function getChapterById(id: string): Chapter | undefined {
  return chapters.find((c) => c.id === id);
}

export function getNextChapter(id: string): Chapter | undefined {
  const idx = chapters.findIndex((c) => c.id === id);
  return idx >= 0 && idx < chapters.length - 1 ? chapters[idx + 1] : undefined;
}

export function getPrevChapter(id: string): Chapter | undefined {
  const idx = chapters.findIndex((c) => c.id === id);
  return idx > 0 ? chapters[idx - 1] : undefined;
}
