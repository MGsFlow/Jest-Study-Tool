export interface ScenarioTestItem {
  id: string;
  title: string;
  description: string;
  priority: "필수" | "권장" | "선택";
  codeHint?: string;
}

export interface PracticalScenario {
  id: string;
  title: string;
  emoji: string;
  subtitle: string;
  whenToTest: string;
  testFirst: string;
  skipOrDefer: string;
  relatedChapter: string;
  relatedChapterPath: string;
  terminalExample?: string;
  checklist: ScenarioTestItem[];
}

export const practicalScenarios: PracticalScenario[] = [
  {
    id: "login-api",
    title: "로그인 API",
    emoji: "🔐",
    subtitle: "fetchUser, login, token 발급 등 인증 API 클라이언트",
    whenToTest:
      "외부 API를 호출하는 함수를 감쌀 때. 네트워크 없이 CI에서 돌리고, 401/404/500 시나리오를 재현하려면 mock이 필수입니다.",
    testFirst:
      "API 클라이언트 함수(순수 async)부터. UI·페이지 테스트는 나중에.",
    skipOrDefer:
      "실제 서버 호출, axios 인스턴스 내부 설정, CSS/리다이렉트 UI 세부사항.",
    relatedChapter: "Chapter 7 — API Mock",
    relatedChapterPath: "/learn/api-mock",
    terminalExample: "npm test -- 07-api",
    checklist: [
      {
        id: "login-1",
        title: "성공 응답 파싱",
        description:
          "fetch mock으로 200 + { token, user } 반환 시, 함수가 올바른 객체를 리턴하는지",
        priority: "필수",
        codeHint: `global.fetch = jest.fn().mockResolvedValueOnce({
  ok: true,
  json: async () => ({ token: "abc", user: { id: 1 } }),
});
const result = await login("user@test.com", "pass");
expect(result.token).toBe("abc");`,
      },
      {
        id: "login-2",
        title: "401 Unauthorized",
        description: "잘못된 비밀번호 시 에러 throw 또는 { success: false } 반환",
        priority: "필수",
        codeHint: `mockResolvedValueOnce({ ok: false, status: 401 });
await expect(login(...)).rejects.toThrow("401");`,
      },
      {
        id: "login-3",
        title: "네트워크 장애",
        description: "fetch가 reject될 때 앱이 크래시하지 않는지",
        priority: "필수",
        codeHint: `(global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));`,
      },
      {
        id: "login-4",
        title: "요청 URL·메서드·body",
        description: "올바른 endpoint로 POST했는지 (선택적으로 headers)",
        priority: "권장",
        codeHint: `expect(global.fetch).toHaveBeenCalledWith(
  "/api/auth/login",
  expect.objectContaining({ method: "POST" })
);`,
      },
      {
        id: "login-5",
        title: "빈 이메일/비밀번호 사전 검증",
        description: "API 호출 전 클라이언트 단 validation (있다면)",
        priority: "권장",
      },
      {
        id: "login-6",
        title: "LoginForm UI — 잘못된 입력",
        description: "에러 메시지 표시, onSubmit 미호출 (Chapter 8 참고)",
        priority: "권장",
      },
      {
        id: "login-7",
        title: "LoginForm UI — 올바른 입력",
        description: "onSubmit이 email, password로 호출되는지",
        priority: "권장",
      },
      {
        id: "login-8",
        title: "E2E 로그인 흐름",
        description: "실제 브라우저에서 폼 입력 → 대시보드 이동 (Playwright)",
        priority: "선택",
      },
    ],
  },
  {
    id: "shopping-cart",
    title: "장바구니",
    emoji: "🛒",
    subtitle: "상품 추가/제거, 수량 합산, 총액 계산",
    whenToTest:
      "돈·수량·재고처럼 **잘못되면 바로 사고** 나는 비즈니스 로직. 순수 클래스/함수로 분리하면 테스트가 매우 쉽습니다.",
    testFirst:
      "ShoppingCart 클래스 또는 calculateTotal 같은 **순수 로직**부터. React 컴포넌트는 나중.",
    skipOrDefer:
      "스타일, 애니메이션, localStorage 동기화 세부 구현(별도 Hook 테스트로 분리).",
    relatedChapter: "Chapter 3 — Setup & Teardown",
    relatedChapterPath: "/learn/setup-teardown",
    terminalExample: "npm test -- 03-setup-teardown",
    checklist: [
      {
        id: "cart-1",
        title: "빈 장바구니 총액 0",
        description: "초기 상태 검증 — 가장 먼저 작성하는 테스트",
        priority: "필수",
        codeHint: `beforeEach(() => { cart = new ShoppingCart(); });
expect(cart.getTotal()).toBe(0);`,
      },
      {
        id: "cart-2",
        title: "상품 1개 추가",
        description: "price × quantity 반영",
        priority: "필수",
        codeHint: `cart.addItem({ id: "1", price: 1000, quantity: 2 });
expect(cart.getTotal()).toBe(2000);`,
      },
      {
        id: "cart-3",
        title: "같은 상품 수량 합산",
        description: "동일 id 재추가 시 quantity merge",
        priority: "필수",
      },
      {
        id: "cart-4",
        title: "상품 제거",
        description: "removeItem 후 총액·개수 감소",
        priority: "필수",
      },
      {
        id: "cart-5",
        title: "0원 / 음수 가격 예외",
        description: "잘못된 입력 시 throw 또는 무시",
        priority: "권장",
      },
      {
        id: "cart-6",
        title: "쿠폰/할인 적용",
        description: "calculateDiscountedPrice와 조합 (Chapter 5 참고)",
        priority: "권장",
      },
      {
        id: "cart-7",
        title: "테스트 간 상태 격리",
        description: "beforeEach로 cart 새로 생성 — flaky 방지",
        priority: "필수",
      },
      {
        id: "cart-8",
        title: "장바구니 UI 버튼",
        description: "담기 클릭 → 개수 표시 변경 (Testing Library)",
        priority: "선택",
      },
    ],
  },
  {
    id: "form",
    title: "폼 (Form)",
    emoji: "📝",
    subtitle: "회원가입, 로그인, 결제 폼 유효성 검사",
    whenToTest:
      "사용자 입력 검증 + submit 동작. **사용자가 보는 에러 메시지**와 **콜백 호출 여부**를 검증합니다.",
    testFirst:
      "validators.ts 같은 **순수 검증 함수** → 그다음 **폼 컴포넌트** (에러 표시, submit).",
    skipOrDefer:
      "input className, placeholder 문구, 브라우저 기본 HTML5 validation(커스텀 검증 쓸 때 noValidate).",
    relatedChapter: "Chapter 8 — React 컴포넌트",
    relatedChapterPath: "/learn/components",
    terminalExample: "npm test -- 08-components",
    checklist: [
      {
        id: "form-1",
        title: "isValidEmail 단위 테스트",
        description: "유효/무효 이메일 케이스 — it.each 권장",
        priority: "필수",
        codeHint: `it.each([
  ["user@test.com", true],
  ["invalid", false],
])("isValidEmail(%s)", (email, ok) => {
  expect(isValidEmail(email)).toBe(ok);
});`,
      },
      {
        id: "form-2",
        title: "isValidPassword 단위 테스트",
        description: "8자+, 영문+숫자 등 규칙",
        priority: "필수",
      },
      {
        id: "form-3",
        title: "잘못된 이메일 → 에러 메시지",
        description: "getByRole('alert') 또는 getByText로 에러 표시 확인",
        priority: "필수",
        codeHint: `await user.type(screen.getByLabelText("이메일"), "bad");
await user.click(screen.getByRole("button", { name: "로그인" }));
expect(screen.getByText(/올바른 이메일/)).toBeInTheDocument();`,
      },
      {
        id: "form-4",
        title: "잘못된 입력 → onSubmit 미호출",
        description: "mock fn이 호출되지 않았는지",
        priority: "필수",
        codeHint: `expect(handleSubmit).not.toHaveBeenCalled();`,
      },
      {
        id: "form-5",
        title: "올바른 입력 → onSubmit 호출",
        description: "올바른 인자로 1회 호출",
        priority: "필수",
      },
      {
        id: "form-6",
        title: "disabled submit 버튼",
        description: "로딩 중/비활성 시 클릭 불가",
        priority: "권장",
      },
      {
        id: "form-7",
        title: "필드별 에러 독립",
        description: "이메일만 틀렸을 때 비밀번호 에러 안 뜨는지",
        priority: "권장",
      },
      {
        id: "form-8",
        title: "접근성 — label 연결",
        description: "getByLabelText로 찾을 수 있는지",
        priority: "권장",
      },
    ],
  },
  {
    id: "hook",
    title: "Custom Hook",
    emoji: "🪝",
    subtitle: "useCounter, useFetch, useLocalStorage 등",
    whenToTest:
      "여러 컴포넌트에서 재사용하는 **상태 로직**. UI 없이 Hook만 독립 테스트하면 빠르고 명확합니다.",
    testFirst:
      "renderHook + act로 상태 변화 검증. API Hook은 fetch mock과 함께.",
    skipOrDefer:
      "Hook 내부의 styled-components, DOM 직접 접근.",
    relatedChapter: "Chapter 9 — Custom Hook",
    relatedChapterPath: "/learn/hooks",
    terminalExample: "npm test -- 09-hooks",
    checklist: [
      {
        id: "hook-1",
        title: "초기값 반환",
        description: "renderHook(() => useCounter(10)) → count 10",
        priority: "필수",
        codeHint: `const { result } = renderHook(() => useCounter(10));
expect(result.current.count).toBe(10);`,
      },
      {
        id: "hook-2",
        title: "increment / decrement",
        description: "act()로 감싸서 상태 업데이트",
        priority: "필수",
        codeHint: `act(() => { result.current.increment(); });
expect(result.current.count).toBe(11);`,
      },
      {
        id: "hook-3",
        title: "reset",
        description: "초기값으로 복원",
        priority: "필수",
      },
      {
        id: "hook-4",
        title: "rerender — props 변경",
        description: "initialValue 바뀌면 reset 동작 확인",
        priority: "권장",
        codeHint: `const { rerender } = renderHook(({ n }) => useCounter(n), {
  initialProps: { n: 0 },
});
rerender({ n: 100 });`,
      },
      {
        id: "hook-5",
        title: "useFetch — 로딩 → 성공",
        description: "loading true → data 설정 → loading false",
        priority: "권장",
      },
      {
        id: "hook-6",
        title: "useFetch — 에러 상태",
        description: "fetch reject 시 error 메시지",
        priority: "권장",
      },
      {
        id: "hook-7",
        title: "useEffect cleanup",
        description: "unmount 시 타이머/구독 해제 (필요 시)",
        priority: "선택",
      },
      {
        id: "hook-8",
        title: "Hook을 쓰는 컴포넌트 스모크",
        description: "Counter가 +/- 클릭에 반응하는지 (통합)",
        priority: "선택",
      },
    ],
  },
  {
    id: "nextjs-page",
    title: "Next.js 페이지",
    emoji: "⚛️",
    subtitle: "app/page.tsx, 라우트, Server/Client Component",
    whenToTest:
      "페이지 전체 E2E는 Playwright. **Jest로는 페이지에 섞인 로직을 lib/Hook으로 분리**해 테스트하는 전략이 실무 표준입니다.",
    testFirst:
      "페이지 파일 직접 테스트 ❌ → 페이지가 쓰는 **함수·Hook·컴포넌트**를 먼저 테스트 ✅",
    skipOrDefer:
      "next/navigation, next/image 내부 동작, Server Component 전체 렌더(별도 전략 필요).",
    relatedChapter: "Chapter 11 — E2E",
    relatedChapterPath: "/learn/e2e",
    terminalExample: "npm run test:e2e",
    checklist: [
      {
        id: "page-1",
        title: "비즈니스 로직을 lib/로 분리",
        description: "페이지에 계산·검증 로직 넣지 않기 — 테스트 가능 구조",
        priority: "필수",
      },
      {
        id: "page-2",
        title: "lib 함수 단위 테스트",
        description: "formatPrice, getChapterProgress 등 순수 함수",
        priority: "필수",
      },
      {
        id: "page-3",
        title: "Client Component 단위 테스트",
        description: "Dashboard, LoginForm 등 'use client' 컴포넌트",
        priority: "필수",
      },
      {
        id: "page-4",
        title: "데이터 fetching Hook mock",
        description: "useSWR/React Query 사용 시 mock 응답",
        priority: "권장",
      },
      {
        id: "page-5",
        title: "next/navigation mock",
        description: "useRouter, redirect 테스트 필요 시 jest.mock",
        priority: "권장",
        codeHint: `jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));`,
      },
      {
        id: "page-6",
        title: "Route Handler (API Route) 테스트",
        description: "app/api/.../route.ts — Request mock 후 Response 검증",
        priority: "권장",
      },
      {
        id: "page-7",
        title: "페이지 스모크 — 핵심 UI",
        description: "제목, 주요 버튼이 렌더되는지 (과도한 스냅샷 X)",
        priority: "선택",
      },
      {
        id: "page-8",
        title: "Playwright E2E",
        description: "홈 → 챕터 이동, 폼 제출 등 핵심 사용자 흐름 1~3개",
        priority: "권장",
        codeHint: `await page.goto("/");
await expect(page.getByRole("heading")).toBeVisible();`,
      },
    ],
  },
];

export const scenarioWritingOrder = [
  "1. 순수 함수 / 클래스 (lib/) — mock 없이, 가장 빠른 ROI",
  "2. API 클라이언트 — fetch mock",
  "3. Custom Hook — renderHook",
  "4. Client Component — Testing Library + userEvent",
  "5. E2E (Playwright) — 핵심 흐름만 1~3개",
];
