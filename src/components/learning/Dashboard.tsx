"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { chapters } from "@/lib/learning/chapters";
import {
  getOverallProgress,
  getProgress,
  resetProgress,
} from "@/lib/learning/progress";
import type { ProgressMap } from "@/lib/learning/types";
import { AchievementBadges } from "@/components/learning/AchievementBadges";

export function Dashboard() {
  const [progress, setProgress] = useState<ProgressMap>({});

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const chapterIds = chapters.map((c) => c.id);
  const { completedCount, totalCount, averageScore } =
    getOverallProgress(chapterIds);
  const progressPercent = Math.round((completedCount / totalCount) * 100);
  const nextChapter =
    chapters.find((c) => !progress[c.id]?.completed) ?? chapters[0];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2 text-slate-900">
          Jest 학습 대시보드
        </h1>
        <p className="text-slate-500">
          11개 챕터를 순서대로 학습하고, 에디터에서 코드를 직접 실행해보세요.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500 mb-1">학습 진행률</p>
          <p className="text-3xl font-bold text-blue-600">{progressPercent}%</p>
          <div className="mt-3 w-full bg-slate-100 rounded-full h-2">
            <div
              className="h-2 rounded-full bg-blue-500 transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-2">
            {completedCount} / {totalCount} 챕터 완료
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500 mb-1">평균 퀴즈 점수</p>
          <p className="text-3xl font-bold text-emerald-600">
            {averageScore !== null ? `${averageScore}%` : "—"}
          </p>
          <p className="text-xs text-slate-400 mt-2">퀴즈를 풀면 표시됩니다</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500 mb-1">다음 추천</p>
          {completedCount < totalCount ? (
            <>
              <p className="text-lg font-bold text-slate-800">
                {nextChapter.emoji} {nextChapter.title}
              </p>
              <Link
                href={`/learn/${nextChapter.id}`}
                className="inline-block mt-2 text-sm text-blue-600 hover:underline"
              >
                학습 시작 →
              </Link>
            </>
          ) : (
            <>
              <p className="text-lg font-bold text-slate-800">
                🏆 모든 챕터 완료!
              </p>
              <Link
                href="/quiz"
                className="inline-block mt-2 text-sm text-blue-600 hover:underline"
              >
                종합 퀴즈 도전 →
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 mb-10 shadow-sm">
        <h2 className="text-xl font-bold mb-3 text-slate-900">Jest란?</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          JavaScript/TypeScript 코드가{" "}
          <strong>의도한 대로 동작하는지</strong> 자동으로 확인하는 테스트
          프레임워크입니다.{" "}
          <code className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-sm font-mono">
            npm test
          </code>{" "}
          한 번으로 수십 개의 검증을 실행할 수 있습니다.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          {[
            ["🐛", "버그 조기 발견", "배포 전에 문제를 잡습니다"],
            ["🛡️", "리팩토링 안전망", "코드 변경 후에도 동작 보장"],
            ["⌨️", "실습 에디터", "브라우저에서 바로 테스트 실행"],
            ["🔄", "CI 자동화", "PR마다 자동 테스트 실행"],
          ].map(([emoji, title, desc]) => (
            <div
              key={title as string}
              className="flex gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100"
            >
              <span>{emoji}</span>
              <div>
                <p className="font-medium text-slate-800">{title as string}</p>
                <p className="text-slate-500 text-xs">{desc as string}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4 text-slate-900">추가 학습 자료</h2>
      <div className="grid sm:grid-cols-2 gap-3 mb-10">
        {[
          {
            href: "/scenarios",
            emoji: "✅",
            title: "실무 시나리오",
            desc: "5가지 실무 케이스 테스트 체크리스트",
          },
          {
            href: "/project",
            emoji: "🔨",
            title: "TDD 프로젝트",
            desc: "Todo 앱 TDD 6단계 실습",
          },
          {
            href: "/challenges",
            emoji: "🎯",
            title: "도전 과제",
            desc: "6개 실전 코딩 챌린지 + 정답",
          },
          {
            href: "/achievements",
            emoji: "🏅",
            title: "성취 배지",
            desc: "학습하며 배지 모으기",
          },
          {
            href: "/debugger",
            emoji: "🔍",
            title: "에러 해석기",
            desc: "Jest 실패 메시지 분석",
          },
          {
            href: "/cheatsheet",
            emoji: "📋",
            title: "치트시트",
            desc: "Jest 문법 빠른 참고",
          },
          {
            href: "/faq",
            emoji: "❓",
            title: "FAQ & 팁",
            desc: "TDD, CI, 좋은 vs 나쁜 테스트",
          },
          {
            href: "/quiz",
            emoji: "🏆",
            title: "종합 퀴즈",
            desc: "11챕터 종합 객관식",
          },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex gap-3 p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-sm transition-all"
          >
            <span className="text-2xl">{item.emoji}</span>
            <div>
              <p className="font-medium text-slate-800">{item.title}</p>
              <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4 text-slate-900">🏅 성취 배지</h2>
      <div className="mb-10">
        <AchievementBadges />
        <Link
          href="/achievements"
          className="inline-block mt-3 text-sm text-blue-600 hover:underline"
        >
          전체 배지 보기 →
        </Link>
      </div>

      <h2 className="text-xl font-bold mb-4 text-slate-900">학습 챕터</h2>
      <div className="space-y-3">
        {chapters.map((ch) => {
          const chProgress = progress[ch.id];
          const isDone = chProgress?.completed;
          const score = chProgress?.quizScore;

          return (
            <Link
              key={ch.id}
              href={`/learn/${ch.id}`}
              className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-sm transition-all group"
            >
              <span className="text-2xl">{ch.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                    Chapter {ch.number}. {ch.title}
                  </p>
                  {isDone && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">
                      완료
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500 truncate">{ch.subtitle}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-slate-400">{ch.duration}</p>
                {score !== null && score !== undefined && (
                  <p className="text-sm font-medium text-slate-600">{score}%</p>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 flex gap-3">
        <Link
          href="/learn/basics"
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors shadow-sm"
        >
          🌱 Chapter 1부터 시작
        </Link>
        <button
          onClick={() => {
            resetProgress();
            setProgress({});
          }}
          className="px-6 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm text-slate-500 transition-colors"
        >
          진행률 초기화
        </button>
      </div>
    </div>
  );
}
