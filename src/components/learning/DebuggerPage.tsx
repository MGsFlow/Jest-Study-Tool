"use client";

import { useState } from "react";
import { interpretError, errorPatterns } from "@/lib/learning/errorInterpreter";

const sampleErrors = [
  'Expected 5, received 4',
  'add is not a function',
  'Expected function to throw',
  'Expected mock to have been called',
  'expect(...).toThrow is not a function',
];

export function DebuggerPage() {
  const [input, setInput] = useState(sampleErrors[0]);
  const result = interpretError(input);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">
        🔍 에러 메시지 해석기
      </h1>
      <p className="text-slate-500 mb-8">
        Jest 테스트 실패 메시지를 붙여넣으면 원인과 해결 방법을 알려드립니다.
      </p>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        placeholder="에러 메시지를 붙여넣으세요..."
        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-violet-500/30 mb-4"
      />

      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-xs text-slate-500">예시:</span>
        {sampleErrors.map((sample) => (
          <button
            key={sample}
            onClick={() => setInput(sample)}
            className="text-xs px-2 py-1 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
          >
            {sample.slice(0, 30)}...
          </button>
        ))}
      </div>

      {result ? (
        <div className="rounded-xl border border-violet-200 bg-violet-50 p-5">
          <h3 className="font-bold text-violet-900 text-lg">{result.title}</h3>
          <p className="text-sm text-violet-800 mt-3">
            <span className="font-medium">원인:</span> {result.cause}
          </p>
          <p className="text-sm text-violet-700 mt-2">
            <span className="font-medium">해결:</span> {result.fix}
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-500">
          일치하는 패턴이 없습니다. 에러 메시지 전체를 붙여넣어보세요.
        </div>
      )}

      <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">
        지원하는 에러 패턴
      </h2>
      <div className="grid gap-2">
        {errorPatterns.map((p, i) => (
          <button
            key={i}
            onClick={() => setInput(p.cause)}
            className="text-left px-4 py-3 rounded-xl border border-slate-200 bg-white hover:border-violet-200 transition-colors"
          >
            <p className="font-medium text-slate-800 text-sm">{p.title}</p>
            <p className="text-xs text-slate-500 mt-0.5">{p.cause}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
