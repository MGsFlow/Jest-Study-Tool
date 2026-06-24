"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  practicalScenarios,
  scenarioWritingOrder,
  type PracticalScenario,
  type ScenarioTestItem,
} from "@/lib/learning/scenarios";

const STORAGE_KEY = "jest-scenario-checklist";

function getChecked(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

function saveChecked(checked: Record<string, boolean>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
}

const priorityStyle = {
  필수: "bg-red-100 text-red-700 border-red-200",
  권장: "bg-amber-100 text-amber-700 border-amber-200",
  선택: "bg-slate-100 text-slate-600 border-slate-200",
};

function ScenarioCard({
  scenario,
  checked,
  onToggle,
}: {
  scenario: PracticalScenario;
  checked: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  const done = scenario.checklist.filter((c) => checked[c.id]).length;
  const total = scenario.checklist.length;
  const required = scenario.checklist.filter((c) => c.priority === "필수");
  const requiredDone = required.filter((c) => checked[c.id]).length;

  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden mb-8">
      <div className="px-5 py-4 bg-slate-50 border-b border-slate-100">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{scenario.emoji}</span>
              <h2 className="text-xl font-bold text-slate-900">
                {scenario.title}
              </h2>
            </div>
            <p className="text-sm text-slate-500">{scenario.subtitle}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-sm font-medium text-blue-600">
              {done}/{total}
            </p>
            <p className="text-xs text-slate-400">
              필수 {requiredDone}/{required.length}
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 py-4 grid sm:grid-cols-3 gap-3 text-sm border-b border-slate-100">
        <div className="rounded-lg bg-blue-50 border border-blue-100 p-3">
          <p className="text-xs font-semibold text-blue-700 mb-1">언제 테스트?</p>
          <p className="text-xs text-blue-900/80 leading-relaxed">
            {scenario.whenToTest}
          </p>
        </div>
        <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-3">
          <p className="text-xs font-semibold text-emerald-700 mb-1">
            먼저 쓸 테스트
          </p>
          <p className="text-xs text-emerald-900/80 leading-relaxed">
            {scenario.testFirst}
          </p>
        </div>
        <div className="rounded-lg bg-slate-50 border border-slate-100 p-3">
          <p className="text-xs font-semibold text-slate-600 mb-1">나중에 / 생략</p>
          <p className="text-xs text-slate-600 leading-relaxed">
            {scenario.skipOrDefer}
          </p>
        </div>
      </div>

      <div className="px-5 py-3 flex flex-wrap gap-3 text-xs border-b border-slate-100">
        <Link
          href={scenario.relatedChapterPath}
          className="text-blue-600 hover:underline"
        >
          📖 {scenario.relatedChapter}
        </Link>
        {scenario.terminalExample && (
          <code className="px-2 py-0.5 rounded bg-slate-900 text-emerald-400 font-mono">
            {scenario.terminalExample}
          </code>
        )}
      </div>

      <ul className="divide-y divide-slate-100">
        {scenario.checklist.map((item) => (
          <ChecklistItem
            key={item.id}
            item={item}
            isChecked={!!checked[item.id]}
            onToggle={() => onToggle(item.id)}
          />
        ))}
      </ul>
    </section>
  );
}

function ChecklistItem({
  item,
  isChecked,
  onToggle,
}: {
  item: ScenarioTestItem;
  isChecked: boolean;
  onToggle: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <li className={`px-5 py-3 ${isChecked ? "bg-emerald-50/50" : ""}`}>
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onToggle}
          className="mt-1 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`font-medium text-sm ${
                isChecked ? "text-slate-500 line-through" : "text-slate-800"
              }`}
            >
              {item.title}
            </span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full border font-medium ${priorityStyle[item.priority]}`}
            >
              {item.priority}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
            {item.description}
          </p>
          {item.codeHint && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setExpanded(!expanded);
              }}
              className="text-xs text-violet-600 hover:underline mt-1"
            >
              {expanded ? "코드 힌트 닫기" : "코드 힌트 보기"}
            </button>
          )}
          {expanded && item.codeHint && (
            <pre className="mt-2 p-3 rounded-lg bg-slate-900 text-emerald-400 text-xs font-mono overflow-x-auto">
              {item.codeHint}
            </pre>
          )}
        </div>
      </label>
    </li>
  );
}

export function ScenariosPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [activeId, setActiveId] = useState<string | "all">("all");

  useEffect(() => {
    setChecked(getChecked());
  }, []);

  function handleToggle(id: string) {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      saveChecked(next);
      return next;
    });
  }

  function handleReset() {
    setChecked({});
    localStorage.removeItem(STORAGE_KEY);
  }

  const visible =
    activeId === "all"
      ? practicalScenarios
      : practicalScenarios.filter((s) => s.id === activeId);

  const totalItems = practicalScenarios.flatMap((s) => s.checklist).length;
  const doneCount = Object.values(checked).filter(Boolean).length;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">
        ✅ 실무 시나리오 체크리스트
      </h1>
      <p className="text-slate-500 mb-2">
        로그인 API, 장바구니, 폼, Hook, Next.js 페이지 — 각각{" "}
        <strong>어떤 테스트를 먼저 쓰면 되는지</strong> 순서대로 정리했습니다.
      </p>
      <p className="text-sm text-emerald-600 font-medium mb-8">
        진행률: {doneCount}/{totalItems} 항목 완료
      </p>

      <div className="rounded-xl border border-violet-200 bg-violet-50 p-4 mb-8">
        <p className="text-sm font-semibold text-violet-900 mb-2">
          📌 실무 테스트 작성 순서 (공통)
        </p>
        <ol className="space-y-1">
          {scenarioWritingOrder.map((line) => (
            <li key={line} className="text-xs text-violet-800">
              {line}
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveId("all")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            activeId === "all"
              ? "bg-blue-600 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          전체
        </button>
        {practicalScenarios.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveId(s.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeId === s.id
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {s.emoji} {s.title}
          </button>
        ))}
        <button
          onClick={handleReset}
          className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-slate-600 ml-auto"
        >
          체크 초기화
        </button>
      </div>

      {visible.map((scenario) => (
        <ScenarioCard
          key={scenario.id}
          scenario={scenario}
          checked={checked}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
}
