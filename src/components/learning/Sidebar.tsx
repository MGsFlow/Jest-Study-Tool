"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { chapters } from "@/lib/learning/chapters";
import { getProgress } from "@/lib/learning/progress";
import type { ProgressMap } from "@/lib/learning/types";

export function Sidebar() {
  const pathname = usePathname();
  const [progress, setProgress] = useState<ProgressMap>({});

  useEffect(() => {
    setProgress(getProgress());
    const handler = () => setProgress(getProgress());
    window.addEventListener("storage", handler);
    window.addEventListener("progress-updated", handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("progress-updated", handler);
    };
  }, [pathname]);

  return (
    <aside className="w-64 shrink-0 border-r border-slate-200 bg-white flex flex-col h-full shadow-sm">
      <div className="p-5 border-b border-slate-200">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">🧪</span>
          <div>
            <p className="font-bold text-sm text-slate-800 group-hover:text-blue-600 transition-colors">
              Jest 학습
            </p>
            <p className="text-xs text-slate-500">A to Z 코스</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        <Link
          href="/"
          className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
            pathname === "/"
              ? "bg-blue-50 text-blue-700 font-medium"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          📊 대시보드
        </Link>
        <Link
          href="/quiz"
          className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
            pathname === "/quiz"
              ? "bg-blue-50 text-blue-700 font-medium"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          🏆 종합 퀴즈
        </Link>

        <Link
          href="/scenarios"
          className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
            pathname === "/scenarios"
              ? "bg-blue-50 text-blue-700 font-medium"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          ✅ 실무 시나리오
        </Link>
        <Link
          href="/project"
          className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
            pathname === "/project"
              ? "bg-blue-50 text-blue-700 font-medium"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          🔨 TDD 프로젝트
        </Link>
        <Link
          href="/achievements"
          className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
            pathname === "/achievements"
              ? "bg-blue-50 text-blue-700 font-medium"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          🏅 성취 배지
        </Link>
        <Link
          href="/debugger"
          className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
            pathname === "/debugger"
              ? "bg-blue-50 text-blue-700 font-medium"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          🔍 에러 해석기
        </Link>
        <Link
          href="/challenges"
          className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
            pathname === "/challenges"
              ? "bg-blue-50 text-blue-700 font-medium"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          🎯 도전 과제
        </Link>
        <Link
          href="/cheatsheet"
          className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
            pathname === "/cheatsheet"
              ? "bg-blue-50 text-blue-700 font-medium"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          📋 치트시트
        </Link>
        <Link
          href="/faq"
          className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
            pathname === "/faq"
              ? "bg-blue-50 text-blue-700 font-medium"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          ❓ FAQ & 팁
        </Link>

        <p className="px-3 pt-4 pb-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          챕터
        </p>

        {chapters.map((ch) => {
          const chProgress = progress[ch.id];
          const isActive = pathname === `/learn/${ch.id}`;
          const isDone = chProgress?.completed;

          return (
            <Link
              key={ch.id}
              href={`/learn/${ch.id}`}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <span className="text-base">{ch.emoji}</span>
              <span className="flex-1 truncate">
                {ch.number}. {ch.title}
              </span>
              {isDone && (
                <span className="text-emerald-600 text-xs font-bold">✓</span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
