/**
 * Chapter 07: API Mock (fetch 가짜 응답)
 *
 * 학습 목표:
 * - global.fetch를 mock해서 외부 API 없이 테스트
 *
 * 실무 예시:
 * - REST API 클라이언트 함수 테스트
 * - 서버가 없어도 CI에서 테스트 가능
 * - 에러 응답(404, 500) 시나리오 테스트
 */

import { fetchUser } from "@/lib/api";

describe("fetchUser API", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("사용자 정보를 성공적으로 가져온다", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 1,
        name: "Leanne Graham",
        email: "leanne@example.com",
      }),
    });

    const user = await fetchUser(1);

    expect(user).toEqual({
      id: 1,
      name: "Leanne Graham",
      email: "leanne@example.com",
    });
    expect(global.fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/users/1"
    );
  });

  it("404 응답 시 에러를 던진다", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(fetchUser(999)).rejects.toThrow("사용자 조회 실패: 404");
  });

  it("네트워크 에러 시 rejects", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network Error")
    );

    await expect(fetchUser(1)).rejects.toThrow("Network Error");
  });
});
