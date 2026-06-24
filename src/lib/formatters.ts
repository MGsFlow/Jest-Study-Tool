/** 가격을 한국 원화 형식으로 포맷합니다 */
export function formatPrice(amount: number): string {
  return `${amount.toLocaleString("ko-KR")}원`;
}

/** ISO 날짜 문자열을 YYYY-MM-DD 형식으로 변환합니다 */
export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** 문자열을 지정된 길이로 자르고 말줄임표를 붙입니다 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}
