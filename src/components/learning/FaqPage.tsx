"use client";

import { useState } from "react";
import { faqItems, practiceTips, workflowSteps, ciExample } from "@/lib/learning/resources";

export function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [tag, setTag] = useState<string>("전체");

  const tags = ["전체", ...new Set(faqItems.flatMap((f) => f.tags))];

  const filtered =
    tag === "전체" ? faqItems : faqItems.filter((f) => f.tags.includes(tag));

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">❓ FAQ & 실무 팁</h1>
      <p className="text-slate-500 mb-8">
        자주 묻는 질문, 좋은 테스트 vs 나쁜 테스트, TDD·CI 가이드
      </p>

      {/* TDD */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-4">🔴🟢 TDD 워크플로</h2>
        <div className="grid gap-3">
          {workflowSteps.map((w) => (
            <div
              key={w.step}
              className="flex gap-4 p-4 rounded-xl border border-slate-200 bg-white shadow-sm"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm shrink-0">
                {w.step}
              </span>
              <div>
                <p className="font-medium text-slate-800">{w.title}</p>
                <p className="text-sm text-slate-500 mt-1">{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Good vs Bad */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          ✅ 좋은 테스트 vs ❌ 나쁜 테스트
        </h2>
        <div className="space-y-4">
          {practiceTips.map((tip, i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm"
            >
              <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100">
                <h3 className="font-medium text-slate-800">{tip.title}</h3>
              </div>
              <div className="p-4 space-y-3">
                {tip.bad && (
                  <div>
                    <p className="text-xs font-semibold text-red-600 mb-1">❌ 나쁜 예</p>
                    <pre className="text-xs font-mono bg-red-50 border border-red-100 rounded-lg p-3 text-red-800 overflow-x-auto">
                      {tip.bad}
                    </pre>
                  </div>
                )}
                <div>
                  <p className="text-xs font-semibold text-emerald-600 mb-1">✅ 좋은 예</p>
                  <pre className="text-xs font-mono bg-emerald-50 border border-emerald-100 rounded-lg p-3 text-emerald-800 overflow-x-auto">
                    {tip.good}
                  </pre>
                </div>
                <p className="text-xs text-slate-500">💡 {tip.why}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CI */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-4">🔄 CI 자동화 예시</h2>
        <p className="text-sm text-slate-500 mb-3">
          GitHub Actions에서 PR마다 자동으로 테스트를 실행하는 설정 예시입니다.
        </p>
        <pre className="rounded-xl border border-slate-200 bg-slate-900 p-4 overflow-x-auto text-sm">
          <code className="font-mono text-emerald-400 leading-relaxed">{ciExample}</code>
        </pre>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-4">자주 묻는 질문</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                tag === t
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {filtered.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-4 py-3.5 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <span className="font-medium text-slate-800 text-sm pr-4">
                  {item.question}
                </span>
                <span className="text-slate-400 shrink-0">
                  {openIndex === i ? "−" : "+"}
                </span>
              </button>
              {openIndex === i && (
                <div className="px-4 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {item.answer}
                  <div className="flex gap-1.5 mt-2">
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
