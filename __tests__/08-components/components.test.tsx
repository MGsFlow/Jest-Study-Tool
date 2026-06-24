/**
 * Chapter 08: React 컴포넌트 테스트
 *
 * 학습 목표:
 * - @testing-library/react로 컴포넌트 렌더링
 * - screen으로 DOM 요소 찾기
 * - userEvent로 사용자 상호작용 시뮬레이션
 *
 * 실무 예시:
 * - 버튼 클릭 시 콜백 호출 확인
 * - 폼 유효성 검사 에러 메시지 표시
 * - disabled 상태, 접근성(aria-label) 검증
 */

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/Button";
import { Counter } from "@/components/Counter";
import { LoginForm } from "@/components/LoginForm";

describe("Button 컴포넌트", () => {
  it("라벨 텍스트를 렌더링한다", () => {
    render(<Button label="클릭하세요" />);
    expect(screen.getByRole("button", { name: "클릭하세요" })).toBeInTheDocument();
  });

  it("클릭 시 onClick 콜백을 호출한다", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button label="클릭" onClick={handleClick} />);
    await user.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("disabled 상태에서는 클릭되지 않는다", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button label="비활성" onClick={handleClick} disabled />);
    await user.click(screen.getByRole("button"));

    expect(handleClick).not.toHaveBeenCalled();
  });
});

describe("Counter 컴포넌트", () => {
  it("초기값을 표시한다", () => {
    render(<Counter initialCount={5} />);
    expect(screen.getByTestId("count-display")).toHaveTextContent("현재 값: 5");
  });

  it("+ 버튼 클릭 시 값이 증가한다", async () => {
    const user = userEvent.setup();
    render(<Counter initialCount={0} />);

    await user.click(screen.getByRole("button", { name: "+" }));
    expect(screen.getByTestId("count-display")).toHaveTextContent("현재 값: 1");
  });

  it("- 버튼 클릭 시 값이 감소한다", async () => {
    const user = userEvent.setup();
    render(<Counter initialCount={10} step={2} />);

    await user.click(screen.getByRole("button", { name: "-" }));
    expect(screen.getByTestId("count-display")).toHaveTextContent("현재 값: 8");
  });

  it("리셋 버튼으로 초기값으로 돌아간다", async () => {
    const user = userEvent.setup();
    render(<Counter initialCount={3} />);

    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "리셋" }));

    expect(screen.getByTestId("count-display")).toHaveTextContent("현재 값: 3");
  });
});

describe("LoginForm 컴포넌트", () => {
  it("유효하지 않은 이메일 입력 시 에러 메시지를 표시한다", async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();

    render(<LoginForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText("이메일"), "invalid-email");
    await user.type(screen.getByLabelText("비밀번호"), "short");
    await user.click(screen.getByRole("button", { name: "로그인" }));

    await waitFor(() => {
      expect(screen.getByText("올바른 이메일 형식이 아닙니다")).toBeInTheDocument();
    });
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("유효한 입력 시 onSubmit을 호출한다", async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();

    render(<LoginForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText("이메일"), "user@example.com");
    await user.type(screen.getByLabelText("비밀번호"), "password123");
    await user.click(screen.getByRole("button", { name: "로그인" }));

    expect(handleSubmit).toHaveBeenCalledWith("user@example.com", "password123");
  });
});
