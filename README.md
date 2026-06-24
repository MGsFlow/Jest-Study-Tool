# Jest 학습 프로젝트 (Next.js)

Jest를 처음 배우는 분을 위한 **단계별 실습 프로젝트**입니다.  
각 챕터의 테스트 파일에 주석으로 개념과 실무 예시가 포함되어 있습니다.

---

## 목차

1. [Jest란? 언제, 왜 쓰는가?](#1-jest란-언제-왜-쓰는가)
2. [실무에서 언제 테스트를 작성해야 하는가?](#2-실무에서-언제-테스트를-작성해야-하는가)
3. [빠른 시작](#3-빠른-시작)
4. [프로젝트 구조](#4-프로젝트-구조)
5. [A to Z 학습 로드맵](#5-a-to-z-학습-로드맵)
6. [핵심 개념 치트시트](#6-핵심-개념-치트시트)
7. [실무 팁](#7-실무-팁)

---

## 1. Jest란? 언제, 왜 쓰는가?

### Jest란?

**Jest**는 Facebook(Meta)이 만든 JavaScript **테스트 프레임워크**입니다.

- 테스트 실행, assertion(검증), mock(가짜 함수), 커버리지 리포트를 **한 곳에서** 제공
- React, Next.js, Node.js 프로젝트에서 가장 널리 쓰임
- **Testing Library**와 함께 React 컴포넌트 테스트에 사용

### 왜 테스트를 작성하는가?

| 이유 | 설명 |
|------|------|
| **버그 조기 발견** | 배포 전에 문제를 찾음 |
| **리팩토링 안전망** | 코드를 바꿔도 기존 동작이 유지되는지 확인 |
| **문서 역할** | 테스트 코드가 "이 함수는 이렇게 동작해야 한다"는 살아있는 문서 |
| **CI/CD 연동** | PR마다 자동으로 테스트 → 머지 전 품질 보장 |
| **자신감** | "이 코드는 테스트 통과했으니 괜찮다"는 확신 |

### Jest vs 다른 도구

| 도구 | 용도 |
|------|------|
| **Jest** | 단위/통합 테스트 (함수, 컴포넌트, API) |
| **Playwright / Cypress** | E2E 테스트 (브라우저에서 실제 사용자 흐름) |
| **Storybook** | UI 컴포넌트 카탈로그 (테스트와는 별개) |

> Jest는 **코드 단위** 테스트, E2E는 **전체 앱 흐름** 테스트. 둘 다 필요하지만 Jest부터 시작하는 것이 좋습니다.

---

## 2. 실무에서 언제 테스트를 작성해야 하는가?

### ✅ 꼭 테스트해야 하는 것 (ROI 높음)

#### 1) 순수 함수 (Pure Function)

```typescript
// src/lib/math.ts
export function add(a: number, b: number) { return a + b; }
export function calculateDiscount(price: number, rate: number) { ... }
```

- **언제**: 계산, 포맷팅, 유효성 검사 로직
- **왜**: 입력 → 출력이 명확하고, mock 없이 바로 테스트 가능
- **예시**: 할인 계산, 날짜 포맷, 이메일 검증

#### 2) 비즈니스 핵심 로직

```typescript
// src/lib/cart.ts — 장바구니 총액, 수량 합산
```

- **언제**: 돈, 권한, 재고 등 **잘못되면 큰 문제**가 되는 로직
- **예시**: 결제 금액, 쿠폰 적용, 재고 차감

#### 3) API 클라이언트 함수

```typescript
// src/lib/api.ts — fetchUser()
```

- **언제**: 외부 API 호출을 감싼 함수
- **왜**: fetch를 mock하면 네트워크 없이 404/500 에러 케이스도 테스트
- **예시**: 로그인 API, 사용자 조회

#### 4) 폼 유효성 검사 & 사용자 입력

```typescript
// src/components/LoginForm.tsx
```

- **언제**: 잘못된 입력 시 에러 메시지, 올바른 입력 시 submit
- **예시**: 회원가입, 결제 폼, 검색 필터

#### 5) Custom Hook

```typescript
// src/hooks/useCounter.ts
```

- **언제**: 여러 컴포넌트에서 재사용하는 상태 로직
- **왜**: UI 없이 Hook만 독립적으로 테스트 가능

### ⚠️ 선택적으로 테스트

- **단순 UI 컴포넌트** (스타일만 있는 Button) → 스냅샷 또는 생략
- **Next.js 페이지** → E2E로 대체하는 경우 많음
- **서버 컴포넌트** → 클라이언트 로직을 lib로 분리 후 테스트

### ❌ 테스트하지 않아도 되는 것

- CSS/스타일 세부사항
- Next.js/ React 내부 동작
- 타rivial한 getter/setter

### 실무 시나리오 예시

```
시나리오 1: 쿠폰 할인 기능 추가
→ calculateDiscountedPrice() 단위 테스트 작성
→ LoginForm처럼 UI 연동 시 컴포넌트 테스트 추가

시나리오 2: API 스펙 변경 (응답 필드 추가)
→ fetchUser mock 테스트 업데이트
→ 404/500 에러 케이스도 함께 확인

시나리오 3: 장바구니 버그 ("같은 상품 두 번 담으면 수량 이상")
→ ShoppingCart 테스트 추가 후 버그 수정
→ beforeEach로 매 테스트마다 cart 초기화 (03-setup-teardown 참고)

시나리오 4: PR 리뷰 전
→ npm test && npm run test:coverage
→ CI(GitHub Actions)에서 자동 실행
```

---

## 3. 빠른 시작

```bash
# 의존성 설치 (이미 되어 있다면 생략)
npm install

# 전체 테스트 실행
npm test

# watch 모드 — 파일 저장할 때마다 자동 재실행 (개발 중 추천)
npm run test:watch

# 커버리지 리포트
npm run test:coverage

# 특정 챕터만 실행
npm test -- 01-basics
npm test -- 08-components

# 스냅샷 업데이트 (UI 의도적으로 변경했을 때)
npm test -- -u
```

---

## 4. 프로젝트 구조

```
jesttest/
├── jest.config.ts          # Jest 설정 (Next.js 연동)
├── jest.setup.ts           # @testing-library/jest-dom 로드
├── __tests__/              # 📚 학습용 테스트 (챕터별)
│   ├── 01-basics/          # describe, it, expect
│   ├── 02-matchers/        # toBe, toEqual, it.each ...
│   ├── 03-setup-teardown/  # beforeEach, afterEach
│   ├── 04-async/           # async/await, resolves/rejects
│   ├── 05-mocking/         # jest.fn, jest.mock
│   ├── 06-spy/             # jest.spyOn
│   ├── 07-api/             # fetch mock
│   ├── 08-components/      # React Testing Library
│   ├── 09-hooks/           # renderHook
│   └── 10-snapshot/        # toMatchSnapshot
└── src/
    ├── lib/                # 테스트 대상 순수 함수
    ├── components/         # 테스트 대상 React 컴포넌트
    └── hooks/              # 테스트 대상 Custom Hook
```

**학습 순서**: `01` → `02` → ... → `10` 순서대로 읽고, 각 파일의 주석을 따라가세요.

---

## 5. A to Z 학습 로드맵

### A — Arrange, Act, Assert (AAA 패턴)

모든 테스트의 기본 구조:

```typescript
it("두 수를 더한다", () => {
  // Arrange: 테스트 데이터 준비
  const a = 2, b = 3;
  // Act: 테스트 대상 실행
  const result = add(a, b);
  // Assert: 결과 검증
  expect(result).toBe(5);
});
```

### B — beforeEach / beforeAll

테스트 전 초기화. 상태를 가진 객체(장바구니 등)는 **반드시** beforeEach에서 새로 생성.

### C — Coverage (커버리지)

`npm run test:coverage` → 어떤 코드가 테스트됐는지 %. 100%가 목표는 아니지만, 핵심 lib은 80%+ 권장.

### D — describe

관련 테스트를 그룹으로 묶음. `describe("add", () => { ... })`

### E — expect

검증의 시작. `expect(값).toBe(기대값)`

### F — fetch Mock

외부 API 없이 테스트. `global.fetch = jest.fn()`

### G — getByRole, getByLabelText

Testing Library로 DOM 요소 찾기. **접근성 기준**으로 찾는 것이 권장됨.

### H — Hook 테스트

`renderHook(() => useCounter())` + `act(() => ...)`

### I — it / test

개별 테스트 케이스. `it("설명", () => {})` — 설명은 **한국어로 행동**을 적으면 좋음.

### J — jest.mock()

모듈 전체를 가짜로 교체. 결제 API, 이메일 발송 등.

### K — jest.fn()

가짜 함수 생성 + 호출 횟수/인자 추적.

### L — Matchers

toBe, toEqual, toContain, toThrow, toHaveBeenCalled... (02-matchers 참고)

### M — Mock vs Spy

- **Mock**: 처음부터 가짜 (`jest.fn()`)
- **Spy**: 원본 유지 + 감시 (`jest.spyOn()`)

### N — not

결과 반전. `expect(x).not.toBe(y)`

### O — only / skip

- `it.only` — 이 테스트만 실행 (디버깅용)
- `it.skip` — 이 테스트 건너뛰기

### P — Promise

비동기 테스트: `async/await` 또는 `expect(promise).resolves.toEqual(...)`

### Q — Query (Testing Library)

getBy*, queryBy*, findBy* — [공식 가이드](https://testing-library.com/docs/queries/about)

### R — render / renderHook

컴포넌트 또는 Hook을 테스트 환경에 렌더링.

### S — Snapshot

UI HTML 스냅샷 저장. 의도치 않은 UI 변경 감지. `-u`로 업데이트.

### T — toThrow

함수가 에러를 던지는지: `expect(() => divide(1,0)).toThrow()`

### U — userEvent

사용자 클릭/타입 시뮬레이션. `fireEvent`보다 **userEvent 권장**.

### V — Validators

유효성 검사 함수 — 테스트하기 쉬운 대표 예시.

### W — watch 모드

`npm run test:watch` — TDD(테스트 먼저 작성)에 유용.

### X — eXclude

특정 파일 제외: `testPathIgnorePatterns` in jest.config

### Y — Your first test

`__tests__/01-basics/math.test.ts`부터 시작!

### Z — Zero external deps

순수 함수 테스트는 mock 없이, **가장 먼저** 작성하기 좋음.

---

## 6. 핵심 개념 치트시트

```typescript
// 기본
expect(value).toBe(expected);
expect(obj).toEqual({ a: 1 });
expect(() => fn()).toThrow("에러 메시지");

// Mock
const mockFn = jest.fn();
mockFn.mockReturnValue(42);
expect(mockFn).toHaveBeenCalledWith(arg);

// Module Mock
jest.mock("@/lib/payment");
(processPayment as jest.Mock).mockResolvedValue({ success: true });

// Spy
jest.spyOn(console, "log").mockImplementation(() => {});

// Async
await expect(fetchData()).resolves.toEqual({ id: 1 });
await expect(fetchError()).rejects.toThrow();

// React
render(<Button label="클릭" />);
await userEvent.click(screen.getByRole("button"));

// Hook
const { result } = renderHook(() => useCounter(0));
act(() => result.current.increment());
```

---

## 7. 실무 팁

1. **테스트 이름은 행동 중심으로**: `"add 함수 테스트"` ❌ → `"두 양수를 더하면 올바른 결과를 반환한다"` ✅
2. **한 테스트에 한 가지만**: 실패 시 원인 파악이 쉬움
3. **순수 함수부터**: mock 학습 전에 01~03 챕터부터 익히기
4. **Testing Library 철학**: "구현 세부사항"이 아니라 "사용자가 보는/하는 것"을 테스트
5. **CI에 연동**: GitHub Actions에서 `npm test` 자동 실행
6. **스냅샷 남용 금지**: 행동 테스트(toHaveTextContent, toHaveBeenCalled)가 더 가치 있음

---

## 다음 단계

- [Jest 공식 문서](https://jestjs.io/docs/getting-started)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Next.js Testing 가이드](https://nextjs.org/docs/app/building-your-application/testing/jest)

Happy Testing! 🧪
