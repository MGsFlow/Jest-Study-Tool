export interface User {
  id: number;
  name: string;
  email: string;
}

const API_BASE = "https://jsonplaceholder.typicode.com";

/** 사용자 ID로 사용자 정보를 가져옵니다 */
export async function fetchUser(userId: number): Promise<User> {
  const response = await fetch(`${API_BASE}/users/${userId}`);

  if (!response.ok) {
    throw new Error(`사용자 조회 실패: ${response.status}`);
  }

  const data = await response.json();
  return {
    id: data.id,
    name: data.name,
    email: data.email,
  };
}

/** 할인가를 계산합니다 */
export function calculateDiscountedPrice(
  price: number,
  discountRate: number
): number {
  if (discountRate < 0 || discountRate > 100) {
    throw new Error("할인율은 0~100 사이여야 합니다");
  }
  return Math.round(price * (1 - discountRate / 100));
}
