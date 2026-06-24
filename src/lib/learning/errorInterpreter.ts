export interface ErrorInterpretation {
  pattern: RegExp;
  title: string;
  cause: string;
  fix: string;
}

export const errorPatterns: ErrorInterpretation[] = [
  {
    pattern: /Expected .* received/i,
    title: "값 불일치 (Assertion Error)",
    cause: "expect(실제값)이 기대값과 다릅니다.",
    fix: "실제 반환값을 console.log로 확인하고, 올바른 Matcher(toBe/toEqual)를 사용했는지 확인하세요.",
  },
  {
    pattern: /is not a function/i,
    title: "함수를 찾을 수 없음",
    cause: "존재하지 않는 함수를 호출했거나, import/스코프 문제입니다.",
    fix: "함수 이름 철자를 확인하세요. 실습 에디터 상단 '사용 가능한 함수' 목록을 참고하세요.",
  },
  {
    pattern: /Expected function to throw/i,
    title: "에러가 발생하지 않음",
    cause: "toThrow()를 썼지만 함수가 에러를 던지지 않았습니다.",
    fix: "에러 조건이 맞는 입력인지 확인하세요. toThrow에는 () => fn() 형태로 전달해야 합니다.",
  },
  {
    pattern: /toThrow.*expected function/i,
    title: "toThrow 사용법 오류",
    cause: "toThrow에 함수가 아닌 값을 넘겼습니다.",
    fix: "expect(fn()).toThrow() ❌ → expect(() => fn()).toThrow() ✅",
  },
  {
    pattern: /Expected mock to have been called/i,
    title: "Mock이 호출되지 않음",
    cause: "jest.fn()으로 만든 mock이 예상대로 호출되지 않았습니다.",
    fix: "함수가 실제로 호출되는지, mock을 올바른 인자로 전달했는지 확인하세요.",
  },
  {
    pattern: /Expected mock to have been called with/i,
    title: "Mock 호출 인자 불일치",
    cause: "mock이 호출됐지만 인자가 다릅니다.",
    fix: "mock.mock.calls를 확인하거나, toHaveBeenCalledWith 인자를 수정하세요.",
  },
  {
    pattern: /비동기 테스트는 브라우저/i,
    title: "브라우저 비동기 제한",
    cause: "이 실습 환경은 async 테스트를 지원합니다. 문법 오류일 수 있습니다.",
    fix: "it('...', async function() { await ... }) 형태인지 확인하세요.",
  },
  {
    pattern: /Expected promise to reject/i,
    title: "Promise가 reject되지 않음",
    cause: "rejects.toThrow()를 썼지만 Promise가 성공했습니다.",
    fix: "에러를 던지는 비동기 함수인지 확인하세요.",
  },
  {
    pattern: /toEqual.*object/i,
    title: "객체 비교 실패",
    cause: "toBe 대신 toEqual이 필요하거나, 객체 속성이 다릅니다.",
    fix: "객체/배열 비교는 toEqual을 사용하세요.",
  },
  {
    pattern: /toHaveLength/i,
    title: "길이 불일치",
    cause: "배열이나 문자열의 length가 기대와 다릅니다.",
    fix: "beforeEach로 상태가 초기화됐는지, 이전 테스트 영향은 없는지 확인하세요.",
  },
  {
    pattern: /Network|fetch/i,
    title: "네트워크 / fetch 오류",
    cause: "fetch가 mock되지 않았거나 mock 응답 형식이 잘못됐습니다.",
    fix: "beforeEach에서 globalThis.fetch = jest.fn() 설정 후 mockResolvedValueOnce를 사용하세요.",
  },
  {
    pattern: /SyntaxError|Unexpected token/i,
    title: "문법 오류",
    cause: "JavaScript 문법이 잘못됐습니다.",
    fix: "괄호, 세미콜론, 따옴표 짝이 맞는지 확인하세요.",
  },
];

export function interpretError(message: string): ErrorInterpretation | null {
  for (const item of errorPatterns) {
    if (item.pattern.test(message)) return item;
  }
  return null;
}

export function interpretFailures(
  messages: string[]
): ErrorInterpretation[] {
  const seen = new Set<string>();
  const results: ErrorInterpretation[] = [];
  for (const msg of messages) {
    const interp = interpretError(msg);
    if (interp && !seen.has(interp.title)) {
      seen.add(interp.title);
      results.push(interp);
    }
  }
  return results;
}
