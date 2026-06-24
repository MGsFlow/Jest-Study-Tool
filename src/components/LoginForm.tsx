"use client";

import { useState, FormEvent } from "react";
import { isValidEmail, isValidPassword } from "@/lib/validators";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!isValidEmail(email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다";
    }
    if (!isValidPassword(password)) {
      newErrors.password = "비밀번호는 8자 이상, 영문+숫자를 포함해야 합니다";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit(email, password);
  }

  return (
    <form onSubmit={handleSubmit} aria-label="로그인 폼" noValidate>
      <div>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" role="alert">
            {errors.email}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-describedby={errors.password ? "password-error" : undefined}
        />
        {errors.password && (
          <p id="password-error" role="alert">
            {errors.password}
          </p>
        )}
      </div>
      <button type="submit">로그인</button>
    </form>
  );
}
