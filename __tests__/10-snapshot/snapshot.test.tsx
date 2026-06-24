/**
 * Chapter 10: Snapshot 테스트
 *
 * 학습 목표:
 * - toMatchSnapshot()으로 UI 구조 변경 감지
 * - 스냅샷 업데이트 방법
 *
 * 실무 예시:
 * - UI 컴포넌트의 의도치 않은 변경 감지
 * - ⚠️ 스냅샷만으로는 충분하지 않음 — 행동 테스트와 함께 사용
 *
 * 스냅샷 업데이트: npm test -- -u
 */

import { render } from "@testing-library/react";
import { UserCard } from "@/components/UserCard";

describe("UserCard Snapshot", () => {
  it("기본 props로 렌더링된 UI가 일치한다", () => {
    const { container } = render(
      <UserCard name="김철수" email="kim@example.com" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("role prop이 포함된 UI", () => {
    const { container } = render(
      <UserCard name="이영희" email="lee@example.com" role="admin" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
