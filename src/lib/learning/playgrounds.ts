/** 챕터별 playground setup — 테스트 대상 예시 함수 */

export const chapterSetups: Record<string, string> = {
  basics: `
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) throw new Error("0으로 나눌 수 없습니다");
  return a / b;
}
function sum(numbers) { return numbers.reduce((acc, n) => acc + n, 0); }
`,
  matchers: `
function isValidEmail(email) {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
}
function isValidPassword(password) {
  if (password.length < 8) return false;
  return /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
}
function formatPrice(amount) {
  return amount.toLocaleString("ko-KR") + "원";
}
function truncate(text, max) {
  return text.length <= max ? text : text.slice(0, max) + "...";
}
`,
  "setup-teardown": `
function createCart() {
  const items = [];
  return {
    addItem(item) {
      const existing = items.find(function(i) { return i.id === item.id; });
      if (existing) existing.quantity += item.quantity;
      else items.push({ id: item.id, name: item.name, price: item.price, quantity: item.quantity });
    },
    removeItem(id) {
      for (let i = items.length - 1; i >= 0; i--) {
        if (items[i].id === id) items.splice(i, 1);
      }
    },
    getTotal() { return items.reduce(function(t, i) { return t + i.price * i.quantity; }, 0); },
    getItemCount() { return items.reduce(function(c, i) { return c + i.quantity; }, 0); },
    clear() { items.length = 0; },
  };
}
`,
  async: `
function fetchData() {
  return Promise.resolve({ id: 1, title: "테스트 데이터" });
}
function fetchError() {
  return Promise.reject(new Error("네트워크 오류"));
}
function delay(ms) {
  return new Promise(function(resolve) {
    setTimeout(function() { resolve("완료"); }, ms);
  });
}
`,
  mocking: `
function calculateDiscountedPrice(price, rate) {
  if (rate < 0 || rate > 100) throw new Error("할인율은 0~100 사이여야 합니다");
  return Math.round(price * (1 - rate / 100));
}
function processPayment(amount) {
  return fetch("https://api.payment.example.com/charge", {
    method: "POST",
    body: JSON.stringify({ amount: amount }),
  }).then(function(res) {
    if (!res.ok) return { success: false, error: "결제 실패" };
    return res.json().then(function(data) {
      return { success: true, transactionId: data.transactionId };
    });
  });
}
`,
  spy: `
function createCart() {
  var total = 0;
  return {
    addItem: function(price) { total += price; },
    getTotal: function() { return total; },
  };
}
`,
  "api-mock": `
async function fetchUser(userId) {
  var response = await fetch("https://api.example.com/users/" + userId);
  if (!response.ok) {
    throw new Error("사용자 조회 실패: " + response.status);
  }
  return response.json();
}
`,
  components: `
function createButton(label, onClick) {
  return {
    label: label,
    click: function() { if (onClick) onClick(); },
    isDisabled: false,
  };
}
function validateLogin(email, password) {
  var emailOk = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
  var passOk = password.length >= 8;
  return { valid: emailOk && passOk, emailOk: emailOk, passOk: passOk };
}
`,
  hooks: `
function createCounter(initial) {
  var count = initial || 0;
  var initialValue = initial || 0;
  return {
    getCount: function() { return count; },
    increment: function() { count++; },
    decrement: function() { count--; },
    reset: function() { count = initialValue; },
  };
}
`,
  snapshot: `
function renderUserCard(name, email, role) {
  role = role || "member";
  return '<article data-testid="user-card">' +
    '<h2>' + name + '</h2>' +
    '<p>' + email + '</p>' +
    '<span>' + role + '</span>' +
    '</article>';
}
`,
  e2e: `
function createMockPage() {
  var path = "/";
  return {
    goto: function(url) {
      if (url.indexOf("basics") > -1) path = "/learn/basics";
      else path = "/";
      return Promise.resolve();
    },
    getPath: function() { return path; },
    getHeading: function() {
      if (path === "/") return "Jest 학습 대시보드";
      if (path === "/learn/basics") return "Jest 기초";
      return "";
    },
    clickChapter: function(name) {
      if (name.indexOf("기초") > -1 || name.indexOf("basics") > -1) {
        path = "/learn/basics";
      }
      return Promise.resolve();
    },
  };
}
`,
};

/** 정답이 starter와 다른 섹션의 solution 오버라이드 */
export const sectionSolutions: Record<string, string> = {
  "basics:1": `describe("math 유틸리티", () => {
  describe("add", () => {
    it("두 양수를 더한다", () => {
      expect(add(2, 3)).toBe(5);
    });
  });
  describe("subtract", () => {
    it("두 수를 뺀다", () => {
      expect(subtract(10, 3)).toBe(7);
    });
  });
  describe("multiply", () => {
    it("두 수를 곱한다", () => {
      expect(multiply(3, 4)).toBe(12);
    });
  });
});`,
  "basics:2": `describe("multiply", () => {
  it("두 양수를 곱하면 올바른 결과를 반환한다", () => {
    expect(multiply(4, 5)).toBe(20);
  });
  it("0을 곱하면 0을 반환한다", () => {
    expect(multiply(100, 0)).toBe(0);
  });
  it("음수 곱셈", () => {
    expect(multiply(-2, 3)).toBe(-6);
  });
});`,
  "basics:3": `describe("expect 연습", () => {
  it("add 결과를 검증한다", () => {
    expect(add(2, 3)).toBe(5);
  });
  it("subtract 결과를 검증한다", () => {
    expect(subtract(10, 3)).toBe(7);
  });
  it("multiply 결과를 검증한다", () => {
    expect(multiply(3, 3)).toBe(9);
  });
});`,
  "e2e:1": `describe("Playwright 개념 — mock page", () => {
  it("홈페이지 제목", async function() {
    var page = createMockPage();
    await page.goto("http://localhost:3000");
    expect(page.getHeading()).toContain("Jest 학습");
  });
});`,
  "e2e:2": `describe("사용자 흐름", () => {
  it("챕터 1로 이동", async function() {
    var page = createMockPage();
    await page.goto("http://localhost:3000");
    await page.clickChapter("Jest 기초");
    expect(page.getPath()).toBe("/learn/basics");
    expect(page.getHeading()).toBe("Jest 기초");
  });
});`,
};

export const sectionStarters: Record<
  string,
  { starterCode: string; solutionCode?: string; hint?: string }
> = {
  "basics:0": {
    hint: "첫 테스트! expect(1 + 1).toBe(2)를 직접 실행해보세요.",
    starterCode: `it("1 + 1은 2이다", () => {
  expect(1 + 1).toBe(2);
});

it("add 함수 사용", () => {
  expect(add(2, 3)).toBe(5);
});`,
  },
  "basics:1": {
    hint: "describe 안에 multiply 그룹을 추가하고 테스트를 작성해보세요.",
    starterCode: `describe("math 유틸리티", () => {
  describe("add", () => {
    it("두 양수를 더한다", () => {
      expect(add(2, 3)).toBe(5);
    });
  });

  describe("subtract", () => {
    it("두 수를 뺀다", () => {
      expect(subtract(10, 3)).toBe(7);
    });
  });
});`,
  },
  "basics:2": {
    hint: "multiply 테스트를 하나 더 추가해보세요.",
    starterCode: `describe("multiply", () => {
  it("두 양수를 곱하면 올바른 결과를 반환한다", () => {
    expect(multiply(4, 5)).toBe(20);
  });

  it("0을 곱하면 0을 반환한다", () => {
    expect(multiply(100, 0)).toBe(0);
  });
});`,
  },
  "basics:3": {
    hint: "multiply(3, 3) 테스트를 추가해보세요.",
    starterCode: `describe("expect 연습", () => {
  it("add 결과를 검증한다", () => {
    expect(add(2, 3)).toBe(5);
  });

  it("subtract 결과를 검증한다", () => {
    expect(subtract(10, 3)).toBe(7);
  });
});`,
  },
  "basics:4": {
    hint: "toThrow에 에러 메시지 문자열을 넣어보세요.",
    starterCode: `describe("divide", () => {
  it("0으로 나누면 에러를 던진다", () => {
    expect(function() { divide(10, 0); }).toThrow("0으로 나눌 수 없습니다");
  });

  it("정상 나눗셈", () => {
    expect(divide(10, 2)).toBe(5);
  });
});`,
  },
  "basics:5": {
    hint: "sum([5, 5]) 테스트를 AAA 패턴으로 작성해보세요.",
    starterCode: `it("숫자 배열의 합을 계산한다", () => {
  var numbers = [1, 2, 3, 4];
  var result = sum(numbers);
  expect(result).toBe(10);
});

it("빈 배열의 합은 0이다", () => {
  expect(sum([])).toBe(0);
});`,
  },
  "matchers:0": {
    starterCode: `describe("동등성", () => {
  it("toBe — 원시값", () => {
    expect(1 + 1).toBe(2);
  });

  it("toEqual — 객체", () => {
    expect({ name: "Kim" }).toEqual({ name: "Kim" });
  });
});`,
  },
  "matchers:1": {
    starterCode: `describe("Truthy/Falsy", () => {
  it("유효한 이메일", () => {
    expect(isValidEmail("test@example.com")).toBeTruthy();
  });

  it("잘못된 이메일", () => {
    expect(isValidEmail("invalid")).toBeFalsy();
  });
});`,
  },
  "matchers:2": {
    starterCode: `describe("숫자", () => {
  it("toBeGreaterThan", () => {
    expect(10).toBeGreaterThan(5);
  });

  it("toBeCloseTo — 부동소수점", () => {
    expect(0.1 + 0.2).toBeCloseTo(0.3);
  });
});`,
  },
  "matchers:3": {
    starterCode: `describe("문자열/배열", () => {
  it("toContain — 배열", () => {
    expect(["사과", "바나나"]).toContain("바나나");
  });

  it("toMatch — formatPrice", () => {
    expect(formatPrice(1000)).toMatch(/1,000원/);
  });

  it("truncate", () => {
    expect(truncate("Hello World", 5)).toContain("Hello");
  });
});`,
  },
  "matchers:4": {
    hint: "isValidPassword 테스트를 추가해보세요.",
    starterCode: `describe("isValidEmail", () => {
  it("올바른 이메일", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
  });

  it("잘못된 이메일", () => {
    expect(isValidEmail("invalid")).toBe(false);
  });
});

describe("isValidPassword", () => {
  it("8자 이상 영문+숫자", () => {
    expect(isValidPassword("abc12345")).toBe(true);
  });

  it("너무 짧으면 false", () => {
    expect(isValidPassword("short")).toBe(false);
  });
});`,
  },
  "setup-teardown:1": {
    hint: "beforeEach로 cart를 매번 새로 만드는 패턴입니다.",
    starterCode: `describe("ShoppingCart", () => {
  var cart;

  beforeEach(function() {
    cart = createCart();
  });

  it("빈 장바구니 총액은 0", () => {
    expect(cart.getTotal()).toBe(0);
  });

  it("상품 추가 시 총액 증가", () => {
    cart.addItem({ id: "1", name: "노트북", price: 1000000, quantity: 1 });
    expect(cart.getTotal()).toBe(1000000);
  });

  it("같은 상품 수량 합산", () => {
    cart.addItem({ id: "1", name: "노트북", price: 1000, quantity: 1 });
    cart.addItem({ id: "1", name: "노트북", price: 1000, quantity: 2 });
    expect(cart.getItemCount()).toBe(3);
  });
});`,
  },
  "setup-teardown:2": {
    starterCode: `describe("beforeEach 격리", () => {
  var numbers;

  beforeEach(function() {
    numbers = [1, 2, 3];
  });

  it("push 후 길이 4", () => {
    numbers.push(4);
    expect(numbers).toHaveLength(4);
  });

  it("이전 테스트 영향 없음 — 길이 3", () => {
    expect(numbers).toHaveLength(3);
  });
});`,
  },
  "async:0": {
    hint: "async/await로 fetchData() 결과를 검증합니다.",
    starterCode: `it("데이터를 가져온다", async function() {
  var data = await fetchData();
  expect(data.id).toBe(1);
  expect(data.title).toBe("테스트 데이터");
});`,
  },
  "async:1": {
    hint: "return expect(...).resolves / .rejects 패턴을 실행해보세요.",
    starterCode: `it("성공 Promise — resolves", function() {
  return expect(fetchData()).resolves.toEqual({ id: 1, title: "테스트 데이터" });
});

it("실패 Promise — rejects", function() {
  return expect(fetchError()).rejects.toThrow("네트워크 오류");
});`,
  },
  "mocking:0": {
    starterCode: `describe("jest.fn()", () => {
  it("mock 함수 호출 추적", () => {
    var mockFn = jest.fn();
    mockFn("hello", 42);

    expect(mockFn).toHaveBeenCalled();
    expect(mockFn).toHaveBeenCalledWith("hello", 42);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});`,
  },
  "mocking:1": {
    starterCode: `describe("mockReturnValue", () => {
  it("고정값 반환", () => {
    var mockFn = jest.fn().mockReturnValue(42);
    expect(mockFn()).toBe(42);
  });

  it("mockResolvedValue — 비동기", async function() {
    var asyncMock = jest.fn().mockResolvedValue({ success: true });
    var result = await asyncMock(10000);
    expect(result).toEqual({ success: true });
    expect(asyncMock).toHaveBeenCalledWith(10000);
  });
});`,
  },
  "mocking:2": {
    hint: "processPayment를 fetch mock과 함께 테스트해보세요.",
    starterCode: `describe("할인 계산", () => {
  it("10% 할인", () => {
    expect(calculateDiscountedPrice(10000, 10)).toBe(9000);
  });

  it("잘못된 할인율", () => {
    expect(function() { calculateDiscountedPrice(10000, -5); }).toThrow();
  });
});

describe("결제 mock", () => {
  it("fetch mock으로 결제 성공", async function() {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: function() { return Promise.resolve({ transactionId: "tx-123" }); },
    });

    var result = await processPayment(10000);
    expect(result.success).toBe(true);
    expect(result.transactionId).toBe("tx-123");
  });
});`,
  },
  "spy:0": {
    starterCode: `describe("Mock vs Spy", () => {
  it("jest.fn — 가짜 함수", () => {
    var mockFn = jest.fn();
    mockFn("hello");
    expect(mockFn).toHaveBeenCalledWith("hello");
  });

  it("cart addItem 동작 + spy", () => {
    var cart = createCart();
    var spy = jest.fn(cart.addItem.bind(cart));
    spy(1000);
    expect(spy).toHaveBeenCalledWith(1000);
    expect(cart.getTotal()).toBe(1000);
  });
});`,
  },
  "spy:1": {
    hint: "jest.spyOn(Math, 'random')으로 고정값을 반환해보세요.",
    starterCode: `it("Math.random을 고정값으로 spy", () => {
  var spy = jest.spyOn(Math, "random").mockReturnValue(0.5);
  expect(Math.random()).toBe(0.5);
  expect(Math.random()).toBe(0.5);
  jest.restoreAllMocks();
});`,
  },
  "api-mock:0": {
    hint: "beforeEach에서 fetch를 jest.fn()으로 교체합니다.",
    starterCode: `beforeEach(function() {
  globalThis.fetch = jest.fn();
});

it("사용자 정보를 가져온다", async function() {
  globalThis.fetch.mockResolvedValueOnce({
    ok: true,
    json: async function() {
      return { id: 1, name: "Kim", email: "kim@test.com" };
    },
  });

  var user = await fetchUser(1);
  expect(user.name).toBe("Kim");
  expect(user.email).toBe("kim@test.com");
});`,
  },
  "api-mock:1": {
    starterCode: `it("404 응답 시 에러", async function() {
  globalThis.fetch = jest.fn().mockResolvedValueOnce({
    ok: false,
    status: 404,
  });

  var errorThrown = false;
  try {
    await fetchUser(999);
  } catch (e) {
    errorThrown = true;
    expect(String(e)).toContain("404");
  }
  expect(errorThrown).toBe(true);
});`,
  },
  "components:0": {
    starterCode: `describe("Button 동작", () => {
  it("클릭 시 콜백 호출", () => {
    var handleClick = jest.fn();
    var btn = createButton("클릭", handleClick);
    btn.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("라벨 확인", () => {
    var btn = createButton("로그인", null);
    expect(btn.label).toBe("로그인");
  });
});`,
  },
  "components:1": {
    starterCode: `describe("LoginForm 유효성", () => {
  it("올바른 입력", () => {
    var result = validateLogin("user@example.com", "password123");
    expect(result.valid).toBe(true);
  });

  it("잘못된 이메일", () => {
    var result = validateLogin("invalid", "password123");
    expect(result.valid).toBe(false);
    expect(result.emailOk).toBe(false);
  });

  it("짧은 비밀번호", () => {
    var result = validateLogin("user@example.com", "short");
    expect(result.passOk).toBe(false);
  });
});`,
  },
  "hooks:0": {
    starterCode: `describe("createCounter", () => {
  it("초기값", () => {
    var counter = createCounter(10);
    expect(counter.getCount()).toBe(10);
  });

  it("increment", () => {
    var counter = createCounter(0);
    counter.increment();
    expect(counter.getCount()).toBe(1);
  });
});`,
  },
  "hooks:1": {
    starterCode: `describe("createCounter — reset", () => {
  it("reset으로 초기값 복원", () => {
    var counter = createCounter(5);
    counter.increment();
    counter.increment();
    expect(counter.getCount()).toBe(7);
    counter.reset();
    expect(counter.getCount()).toBe(5);
  });

  it("decrement", () => {
    var counter = createCounter(10);
    counter.decrement();
    expect(counter.getCount()).toBe(9);
  });
});`,
  },
  "snapshot:0": {
    hint: "renderUserCard 결과 HTML에 name/email이 포함되는지 검증합니다.",
    starterCode: `describe("UserCard 렌더", () => {
  it("이름과 이메일 포함", () => {
    var html = renderUserCard("김철수", "kim@test.com");
    expect(html).toContain("김철수");
    expect(html).toContain("kim@test.com");
    expect(html).toContain('data-testid="user-card"');
  });

  it("role 기본값 member", () => {
    var html = renderUserCard("이영희", "lee@test.com");
    expect(html).toContain("member");
  });
});`,
  },
  "snapshot:1": {
    starterCode: `it("admin role 렌더", () => {
  var html = renderUserCard("관리자", "admin@test.com", "admin");
  expect(html).toContain("admin");
  expect(html).toContain("<h2>관리자</h2>");
});`,
  },
  "e2e:1": {
    hint: "createMockPage()로 E2E 흐름을 시뮬레이션합니다.",
    starterCode: `describe("Playwright 개념", () => {
  it("홈페이지 제목 확인", async function() {
    var page = createMockPage();
    await page.goto("http://localhost:3000");
    // TODO: expect(page.getHeading()).toContain("Jest");
  });
});`,
  },
  "e2e:2": {
    hint: "clickChapter 후 path와 heading을 검증하세요.",
    starterCode: `describe("사용자 흐름", () => {
  it("챕터 1로 이동", async function() {
    var page = createMockPage();
    await page.goto("http://localhost:3000");
    // TODO: await page.clickChapter("Jest 기초");
    // expect(page.getPath()).toBe("/learn/basics");
  });
});`,
  },
};

import { extractHelperNames } from "./testRunner";

export function getSectionPlayground(
  chapterId: string,
  sectionIndex: number,
  sectionCode?: string
) {
  const key = `${chapterId}:${sectionIndex}`;
  const custom = sectionStarters[key];
  const setup = chapterSetups[chapterId] ?? "";
  const helpers = extractHelperNames(setup);

  if (custom) {
    return {
      setupCode: setup,
      starterCode: custom.starterCode,
      solutionCode:
        custom.solutionCode ??
        sectionSolutions[key] ??
        custom.starterCode,
      hint: custom.hint,
      helpers,
    };
  }

  if (sectionCode) {
    return {
      setupCode: setup,
      starterCode: sectionCode,
      solutionCode: sectionSolutions[key] ?? sectionCode,
      hint: "코드를 수정한 뒤 ▶ 실행 버튼을 눌러보세요. 💡 정답 보기를 활용하세요.",
      helpers,
    };
  }

  return null;
}
