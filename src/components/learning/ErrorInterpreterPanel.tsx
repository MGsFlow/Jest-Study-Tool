"use client";

import { interpretFailures } from "@/lib/learning/errorInterpreter";
import type { ErrorInterpretation } from "@/lib/learning/errorInterpreter";

interface ErrorInterpreterPanelProps {
  messages: string[];
}

export function ErrorInterpreterPanel({ messages }: ErrorInterpreterPanelProps) {
  if (messages.length === 0) return null;

  const interpretations = interpretFailures(messages);
  if (interpretations.length === 0) return null;

  return (
    <div className="mt-3 space-y-2">
      <p className="text-xs font-semibold text-violet-700 uppercase tracking-wide">
        🔍 에러 해석
      </p>
      {interpretations.map((item: ErrorInterpretation, i: number) => (
        <div
          key={i}
          className="rounded-lg border border-violet-200 bg-violet-50 p-3 text-sm"
        >
          <p className="font-medium text-violet-900">{item.title}</p>
          <p className="text-violet-800 mt-1 text-xs">
            <span className="font-medium">원인:</span> {item.cause}
          </p>
          <p className="text-violet-700 mt-1 text-xs">
            <span className="font-medium">해결:</span> {item.fix}
          </p>
        </div>
      ))}
    </div>
  );
}
