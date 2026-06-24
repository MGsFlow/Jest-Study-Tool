/**
 * Chapter 04: 비동기(Async) 테스트
 *
 * 학습 목표:
 * - Promise, async/await 테스트 방법
 * - resolves / rejects 매처 사용
 *
 * 실무 예시:
 * - API 호출 함수 테스트
 * - DB 쿼리, 파일 읽기 등 비동기 작업
 */

// 비동기 함수 예시 (실제 API 대신 Promise 사용)
function fetchData(): Promise<{ id: number; title: string }> {
  return Promise.resolve({ id: 1, title: "테스트 데이터" });
}

function fetchWithError(): Promise<never> {
  return Promise.reject(new Error("네트워크 오류"));
}

function delay(ms: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve("완료"), ms);
  });
}

describe("비동기 테스트", () => {
  // 방법 1: async/await (가장 권장)
  it("async/await로 Promise 결과를 검증한다", async () => {
    const data = await fetchData();
    expect(data.id).toBe(1);
    expect(data.title).toBe("테스트 데이터");
  });

  // 방법 2: resolves 매처
  it("resolves로 성공 Promise를 검증한다", () => {
    return expect(fetchData()).resolves.toEqual({
      id: 1,
      title: "테스트 데이터",
    });
  });

  // 방법 3: rejects 매처 — 에러 케이스
  it("rejects로 실패 Promise를 검증한다", () => {
    return expect(fetchWithError()).rejects.toThrow("네트워크 오류");
  });

  // 방법 4: async/await + try/catch (덜 권장)
  it("에러를 async/await로 잡을 수 있다", async () => {
    await expect(fetchWithError()).rejects.toThrow("네트워크 오류");
  });

  it("지연된 Promise를 테스트한다", async () => {
    const result = await delay(100);
    expect(result).toBe("완료");
  });
});

describe("Promise.all 패턴", () => {
  it("여러 비동기 작업을 병렬로 테스트한다", async () => {
    const results = await Promise.all([
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3),
    ]);
    expect(results).toEqual([1, 2, 3]);
  });
});
