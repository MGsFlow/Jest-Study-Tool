/**
 * Chapter 09: Custom Hook 테스트
 *
 * 학습 목표:
 * - renderHook으로 React Hook 테스트
 * - act()로 상태 업데이트 래핑
 *
 * 실무 예시:
 * - useCounter, useFetch, useLocalStorage 등
 * - 컴포넌트 없이 Hook 로직만 독립적으로 테스트
 */

import { renderHook, act } from "@testing-library/react";
import { useCounter } from "@/hooks/useCounter";

describe("useCounter Hook", () => {
  it("초기값을 반환한다", () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });

  it("increment로 값을 1 증가시킨다", () => {
    const { result } = renderHook(() => useCounter(0));

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it("decrement로 값을 1 감소시킨다", () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(4);
  });

  it("reset으로 초기값으로 돌아간다", () => {
    const { result } = renderHook(() => useCounter(0));

    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.increment();
    });
    expect(result.current.count).toBe(3);

    act(() => {
      result.current.reset();
    });
    expect(result.current.count).toBe(0);
  });

  it("initialValue가 변경되면 reset이 새 값으로 돌아간다", () => {
    const { result, rerender } = renderHook(
      ({ initial }) => useCounter(initial),
      { initialProps: { initial: 0 } }
    );

    act(() => result.current.increment());
    expect(result.current.count).toBe(1);

    rerender({ initial: 100 });
    act(() => result.current.reset());
    expect(result.current.count).toBe(100);
  });
});
