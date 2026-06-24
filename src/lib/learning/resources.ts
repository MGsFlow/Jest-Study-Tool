export interface CheatSheetItem {
  category: string;
  title: string;
  code: string;
  description?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  tags: string[];
}

export interface PracticeTip {
  title: string;
  bad?: string;
  good: string;
  why: string;
}

export interface Challenge {
  id: string;
  title: string;
  difficulty: "입문" | "초급" | "중급";
  description: string;
  setupCode: string;
  starterCode: string;
  solutionCode: string;
  hint: string;
  validators: string[]; // helper function names
}

export const cheatSheet: CheatSheetItem[] = [
  {
    category: "기본",
    title: "테스트 구조",
    code: `describe("그룹명", () => {
  it("행동 설명", () => {
    expect(결과).toBe(기대값);
  });
});`,
  },
  {
    category: "기본",
    title: "AAA 패턴",
    code: `it("설명", () => {
  // Arrange — 준비
  const input = 10;
  // Act — 실행
  const result = fn(input);
  // Assert — 검증
  expect(result).toBe(20);
});`,
  },
  {
    category: "Matchers",
    title: "자주 쓰는 Matcher",
    code: `expect(1).toBe(1);              // ===
expect({a:1}).toEqual({a:1});    // 깊은 비교
expect(arr).toContain("x");      // 포함
expect(str).toMatch(/패턴/);     // 정규식
expect(() => fn()).toThrow();    // 에러
expect(n).toBeCloseTo(0.3);      // 부동소수점`,
  },
  {
    category: "Matchers",
    title: "it.each — 반복 테스트",
    code: `it.each([
  [1, 2, 3],
  [0, 0, 0],
])("add(%i, %i) = %i", (a, b, expected) => {
  expect(add(a, b)).toBe(expected);
});`,
  },
  {
    category: "Setup",
    title: "beforeEach / afterEach",
    code: `let cart;
beforeEach(() => { cart = new Cart(); });
afterEach(() => { cart.clear(); });`,
  },
  {
    category: "비동기",
    title: "async/await",
    code: `it("API 호출", async () => {
  const data = await fetchUser(1);
  expect(data.name).toBe("Kim");
});`,
  },
  {
    category: "비동기",
    title: "resolves / rejects",
    code: `return expect(promise).resolves.toEqual({ id: 1 });
return expect(promise).rejects.toThrow("에러");`,
  },
  {
    category: "Mock",
    title: "jest.fn()",
    code: `const mock = jest.fn();
mock("arg");
expect(mock).toHaveBeenCalledWith("arg");
expect(mock).toHaveBeenCalledTimes(1);`,
  },
  {
    category: "Mock",
    title: "fetch mock",
    code: `global.fetch = jest.fn().mockResolvedValueOnce({
  ok: true,
  json: async () => ({ id: 1 }),
});`,
  },
  {
    category: "React",
    title: "Testing Library",
    code: `render(<Button label="클릭" />);
await userEvent.click(screen.getByRole("button"));
expect(screen.getByText("결과")).toBeInTheDocument();`,
  },
  {
    category: "실무",
    title: "유용한 명령어",
    code: `npm test                    # 전체 실행
npm test -- 파일명            # 특정 파일
npm test -- --watch           # watch 모드
npm test -- --coverage        # 커버리지
npm test -- -u                # 스냅샷 업데이트
npm test -- --testNamePattern="키워드"`,
  },
  {
    category: "실무",
    title: "test.only / test.skip",
    code: `it.only("이것만 실행", () => {});  // 디버깅용
it.skip("건너뛰기", () => {});        // 임시 비활성화`,
    description: "only는 남용하지 마세요. 커밋 전 제거 필수!",
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "테스트를 어디서부터 시작해야 하나요?",
    answer:
      "순수 함수(계산, 포맷팅, 유효성 검사)부터 시작하세요. UI보다 빠르고 mock 없이 바로 작성할 수 있어 ROI가 가장 높습니다. 이 프로젝트의 Chapter 1~3이 그 시작점입니다.",
    tags: ["시작", "실무"],
  },
  {
    question: "toBe와 toEqual의 차이는?",
    answer:
      "toBe는 === 참조/원시값 비교입니다. 객체와 배열은 toEqual을 사용하세요. {a:1}과 {a:1}은 toBe로 비교하면 실패합니다(다른 참조).",
    tags: ["matchers"],
  },
  {
    question: "왜 toThrow에 화살표 함수를 넘기나요?",
    answer:
      "expect(divide(1,0)).toThrow()는 함수를 즉시 실행해 버립니다. expect(() => divide(1,0)).toThrow()처럼 감싸야 Jest가 실행 시점을 제어할 수 있습니다.",
    tags: ["matchers", "에러"],
  },
  {
    question: "테스트가 간헐적으로 실패해요 (Flaky test)",
    answer:
      "대부분 테스트 간 상태 공유 문제입니다. beforeEach에서 객체를 새로 만들고, mock은 afterEach에서 clearAllMocks() 하세요. Date.now(), Math.random()은 mock하세요.",
    tags: ["setup", "디버깅"],
  },
  {
    question: "컴포넌트 내부 state를 직접 테스트해야 하나요?",
    answer:
      "아니요. Testing Library 철학은 '사용자가 보는 것/하는 것'을 테스트합니다. state 대신 화면에 표시된 텍스트나 버튼 클릭 결과를 검증하세요.",
    tags: ["react"],
  },
  {
    question: "스냅샷 테스트만으로 충분한가요?",
    answer:
      "아닙니다. 스냅샷은 UI 회귀 감지에 유용하지만, 클릭/입력 같은 행동은 toHaveBeenCalled, toHaveTextContent로 테스트해야 합니다.",
    tags: ["snapshot"],
  },
  {
    question: "커버리지 100%가 목표인가요?",
    answer:
      "아닙니다. 핵심 비즈니스 로직(lib/)은 80%+ 권장, 단순 UI나 설정 파일은 낮아도 됩니다. 숫자보다 '중요한 경로가 테스트되는가'가 더 중요합니다.",
    tags: ["실무", "coverage"],
  },
  {
    question: "E2E(Playwright)와 Jest 중 뭘 먼저?",
    answer:
      "Jest(단위/통합) 먼저입니다. 빠르고 원인 파악이 쉽습니다. E2E는 핵심 사용자 흐름(로그인→결제) 몇 개만 보완적으로 추가하세요.",
    tags: ["실무"],
  },
  {
    question: "PR 전에 뭘 확인해야 하나요?",
    answer:
      "npm test 통과, 새 기능에 테스트 추가, it.only/skip 제거, mock이 실제 API를 호출하지 않는지 확인. CI(GitHub Actions)에서 자동 실행되게 설정하면 더 좋습니다.",
    tags: ["실무", "CI"],
  },
  {
    question: "비동기 테스트가 타임아웃 나요",
    answer:
      "async 함수에 await를 빠뜨렸거나, return expect(promise).resolves를 안 한 경우가 많습니다. it('...', async () => { await ... }) 또는 return expect(p).resolves.toEqual(...)를 사용하세요.",
    tags: ["비동기", "디버깅"],
  },
];

export const practiceTips: PracticeTip[] = [
  {
    title: "테스트 이름",
    bad: `it("add 테스트", () => {})`,
    good: `it("두 양수를 더하면 올바른 결과를 반환한다", () => {})`,
    why: "실패 시 무엇이 잘못됐는지 바로 알 수 있습니다.",
  },
  {
    title: "한 테스트에 한 가지",
    bad: `it("add와 subtract", () => {
  expect(add(1,2)).toBe(3);
  expect(subtract(5,2)).toBe(3);
});`,
    good: `it("두 수를 더한다", () => expect(add(1,2)).toBe(3));
it("두 수를 뺀다", () => expect(subtract(5,2)).toBe(3));`,
    why: "첫 번째 실패 후 두 번째 검증이 실행되지 않아 원인 파악이 어렵습니다.",
  },
  {
    title: "구현이 아닌 행동 테스트",
    bad: `expect(component.state.count).toBe(1);`,
    good: `expect(screen.getByText("현재 값: 1")).toBeInTheDocument();`,
    why: "리팩토링 시 내부 구현이 바뀌어도 테스트가 유지됩니다.",
  },
  {
    title: "DOM 쿼리",
    bad: `container.querySelector(".btn-primary")`,
    good: `screen.getByRole("button", { name: "저장" })`,
    why: "접근성 기준 쿼리는 사용자 경험과 일치하고 유지보수가 쉽습니다.",
  },
  {
    title: "Mock 남용",
    bad: "모든 모듈을 jest.mock()으로 대체",
    good: "외부 API, 결제, 이메일 등 비용/부작용 있는 것만 mock",
    why: "과도한 mock은 '실제로 동작하는지' 신뢰를 떨어뜨립니다.",
  },
];

export const challenges: Challenge[] = [
  {
    id: "discount",
    title: "할인 함수 테스트 작성",
    difficulty: "입문",
    description:
      "applyDiscount 함수가 10% 할인 시 9000원을 반환하는지 테스트를 작성하세요.",
    setupCode: `
function applyDiscount(price, percent) {
  if (percent < 0 || percent > 100) throw new Error("할인율 오류");
  return Math.round(price * (1 - percent / 100));
}
`,
    starterCode: `// TODO: applyDiscount 테스트를 작성하세요
describe("applyDiscount", () => {
  it("10% 할인", () => {
    // expect(...).toBe(...)
  });
});`,
    solutionCode: `describe("applyDiscount", () => {
  it("10% 할인", () => {
    expect(applyDiscount(10000, 10)).toBe(9000);
  });

  it("0% 할인", () => {
    expect(applyDiscount(5000, 0)).toBe(5000);
  });

  it("잘못된 할인율", () => {
    expect(function() { applyDiscount(1000, -1); }).toThrow("할인율 오류");
  });
});`,
    hint: "applyDiscount(10000, 10)의 결과가 9000인지 expect(...).toBe(9000)으로 검증하세요.",
    validators: ["applyDiscount"],
  },
  {
    id: "email-validator",
    title: "이메일 검증 함수",
    difficulty: "입문",
    description:
      "isEmailValid 함수에 대해 유효/무효 케이스를 각각 테스트하세요.",
    setupCode: `
function isEmailValid(email) {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
}
`,
    starterCode: `describe("isEmailValid", () => {
  it("유효한 이메일", () => {
    // TODO
  });

  it("무효한 이메일", () => {
    // TODO
  });
});`,
    solutionCode: `describe("isEmailValid", () => {
  it("유효한 이메일", () => {
    expect(isEmailValid("user@example.com")).toBe(true);
  });

  it("무효한 이메일", () => {
    expect(isEmailValid("not-an-email")).toBe(false);
  });

  it("@ 없는 이메일", () => {
    expect(isEmailValid("missing.com")).toBe(false);
  });
});`,
    hint: "toBe(true) / toBe(false) 또는 toBeTruthy() / toBeFalsy()를 사용하세요.",
    validators: ["isEmailValid"],
  },
  {
    id: "cart-total",
    title: "장바구니 총액 계산",
    difficulty: "초급",
    description:
      "beforeEach로 cart를 초기화하고, 상품 추가 후 getTotal()을 검증하세요.",
    setupCode: `
function createCart() {
  var items = [];
  return {
    add: function(name, price) { items.push({ name: name, price: price }); },
    getTotal: function() {
      return items.reduce(function(sum, i) { return sum + i.price; }, 0);
    },
    getCount: function() { return items.length; },
  };
}
`,
    starterCode: `describe("Cart", () => {
  var cart;

  beforeEach(function() {
    // TODO: cart 초기화
  });

  it("빈 장바구니", () => {
    // TODO
  });

  it("상품 2개 추가", () => {
    // TODO
  });
});`,
    solutionCode: `describe("Cart", () => {
  var cart;

  beforeEach(function() {
    cart = createCart();
  });

  it("빈 장바구니", () => {
    expect(cart.getTotal()).toBe(0);
    expect(cart.getCount()).toBe(0);
  });

  it("상품 2개 추가", () => {
    cart.add("노트북", 1000000);
    cart.add("마우스", 50000);
    expect(cart.getTotal()).toBe(1050000);
    expect(cart.getCount()).toBe(2);
  });
});`,
    hint: "beforeEach에서 cart = createCart()를 호출하세요.",
    validators: ["createCart"],
  },
  {
    id: "mock-callback",
    title: "콜백 Mock 검증",
    difficulty: "초급",
    description:
      "onSubmit 콜백이 올바른 인자로 호출되는지 jest.fn()으로 검증하세요.",
    setupCode: `
function submitForm(email, password, onSubmit) {
  if (!email || !password) return false;
  onSubmit(email, password);
  return true;
}
`,
    starterCode: `it("onSubmit이 올바른 인자로 호출된다", () => {
  var onSubmit = jest.fn();
  // TODO: submitForm 호출 후 mock 검증
});`,
    solutionCode: `it("onSubmit이 올바른 인자로 호출된다", () => {
  var onSubmit = jest.fn();
  var result = submitForm("user@test.com", "pass1234", onSubmit);

  expect(result).toBe(true);
  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenCalledWith("user@test.com", "pass1234");
});

it("빈 입력 시 false", () => {
  var onSubmit = jest.fn();
  expect(submitForm("", "pass", onSubmit)).toBe(false);
  expect(onSubmit).not.toHaveBeenCalled();
});`,
    hint: "toHaveBeenCalledWith(email, password)를 사용하세요.",
    validators: ["submitForm"],
  },
  {
    id: "async-fetch",
    title: "비동기 API 테스트",
    difficulty: "중급",
    description:
      "fetch를 mock하고 getUserName이 올바른 이름을 반환하는지 async 테스트를 작성하세요.",
    setupCode: `
async function getUserName(userId) {
  var res = await fetch("/api/users/" + userId);
  var data = await res.json();
  return data.name;
}
`,
    starterCode: `it("사용자 이름을 가져온다", async function() {
  // TODO: fetch mock 설정
  // var name = await getUserName(1);
  // expect(name).toBe("김철수");
});`,
    solutionCode: `it("사용자 이름을 가져온다", async function() {
  globalThis.fetch = jest.fn().mockResolvedValueOnce({
    ok: true,
    json: async function() { return { name: "김철수" }; },
  });

  var name = await getUserName(1);
  expect(name).toBe("김철수");
});`,
    hint: "globalThis.fetch = jest.fn().mockResolvedValueOnce({ ok: true, json: async () => ({...}) })",
    validators: ["getUserName"],
  },
  {
    id: "tdd-practice",
    title: "TDD — 테스트 먼저 작성",
    difficulty: "중급",
    description:
      "아직 구현되지 않은 isPalindrome(회문 검사) 함수의 테스트를 먼저 작성하세요. (함수는 이미 제공됨)",
    setupCode: `
function isPalindrome(str) {
  var cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === cleaned.split("").reverse().join("");
}
`,
    starterCode: `describe("isPalindrome — TDD", () => {
  it("회문이면 true", () => {
    // "level", "A man a plan a canal Panama" 등
  });

  it("회문이 아니면 false", () => {
    // "hello"
  });
});`,
    solutionCode: `describe("isPalindrome — TDD", () => {
  it("간단한 회문", () => {
    expect(isPalindrome("level")).toBe(true);
  });

  it("대소문자 무시", () => {
    expect(isPalindrome("Racecar")).toBe(true);
  });

  it("회문이 아님", () => {
    expect(isPalindrome("hello")).toBe(false);
  });
});`,
    hint: "TDD 순서: 1) 실패하는 테스트 작성 → 2) 최소 구현 → 3) 리팩토링",
    validators: ["isPalindrome"],
  },
];

export const workflowSteps = [
  {
    step: 1,
    title: "실패하는 테스트 작성 (Red)",
    desc: "아직 없는 기능의 기대 동작을 테스트로 먼저 정의합니다.",
  },
  {
    step: 2,
    title: "테스트 통과시키기 (Green)",
    desc: "최소한의 코드로 테스트를 통과시킵니다. 완벽함보다 통과가 우선.",
  },
  {
    step: 3,
    title: "리팩토링 (Refactor)",
    desc: "테스트가 통과하는 상태를 유지하며 코드를 개선합니다.",
  },
];

export const ciExample = `# .github/workflows/test.yml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test
      - run: npm run test:coverage`;
