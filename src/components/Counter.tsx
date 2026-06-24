"use client";

import { useState } from "react";
import { Button } from "./Button";

interface CounterProps {
  initialCount?: number;
  step?: number;
}

export function Counter({ initialCount = 0, step = 1 }: CounterProps) {
  const [count, setCount] = useState(initialCount);

  return (
    <div data-testid="counter">
      <p data-testid="count-display">현재 값: {count}</p>
      <div className="flex gap-2">
        <Button
          label="-"
          variant="secondary"
          onClick={() => setCount((c) => c - step)}
        />
        <Button
          label="+"
          onClick={() => setCount((c) => c + step)}
        />
        <Button
          label="리셋"
          variant="secondary"
          onClick={() => setCount(initialCount)}
        />
      </div>
    </div>
  );
}
