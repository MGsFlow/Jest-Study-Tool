/**
 * payment.ts — 외부 결제 API (mocking 학습용)
 * 실제로는 PG사 API를 호출하지만, 테스트에서는 jest.mock()으로 대체
 */

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}

export async function processPayment(amount: number): Promise<PaymentResult> {
  const response = await fetch("https://api.payment.example.com/charge", {
    method: "POST",
    body: JSON.stringify({ amount }),
  });

  if (!response.ok) {
    return { success: false, error: "결제 실패" };
  }

  const data = await response.json();
  return { success: true, transactionId: data.transactionId };
}
