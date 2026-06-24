"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { Chapter } from "@/lib/learning/types";
import { getNextChapter, getPrevChapter } from "@/lib/learning/chapters";
import { getSectionPlayground } from "@/lib/learning/playgrounds";
import { markChapterVisited } from "@/lib/learning/progress";
import { CodeBlock } from "./CodeBlock";
import { CodePlayground } from "./CodePlayground";
import { TipBox, InfoBox, RealWorldBox } from "./InfoBox";
import { QuizRunner } from "./QuizRunner";

interface ChapterLessonProps {
  chapter: Chapter;
}

export function ChapterLesson({ chapter }: ChapterLessonProps) {
  const prev = getPrevChapter(chapter.id);
  const next = getNextChapter(chapter.id);

  useEffect(() => {
    markChapterVisited(chapter.id);
    window.dispatchEvent(new Event("progress-updated"));
  }, [chapter.id]);

  function handleQuizComplete() {
    window.dispatchEvent(new Event("progress-updated"));
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{chapter.emoji}</span>
          <div>
            <p className="text-sm text-blue-600 font-medium">
              Chapter {chapter.number} · {chapter.duration}
            </p>
            <h1 className="text-3xl font-bold text-slate-900">{chapter.title}</h1>
          </div>
        </div>
        <p className="text-lg text-slate-500">{chapter.subtitle}</p>
      </div>

      <InfoBox title="📖 이 챕터에서 배울 것">{chapter.summary}</InfoBox>
      <InfoBox title="❓ 왜 중요한가?">{chapter.whyItMatters}</InfoBox>
      <RealWorldBox examples={chapter.realWorldExamples} />

      <div className="space-y-10 mt-10">
        {chapter.sections.map((section, i) => {
          const playground =
            section.playground ??
            getSectionPlayground(chapter.id, i, section.code);

          return (
            <section key={i}>
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2 text-slate-900">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 text-xs text-blue-700 font-semibold">
                  {i + 1}
                </span>
                {section.title}
              </h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line mb-4">
                {section.content.split("**").map((part, j) =>
                  j % 2 === 1 ? (
                    <strong key={j} className="text-slate-900 font-semibold">
                      {part}
                    </strong>
                  ) : (
                    part
                  )
                )}
              </p>
              {section.code && <CodeBlock code={section.code} />}
              {playground && (
                <CodePlayground
                  config={playground}
                  sectionTitle={section.title}
                />
              )}
              {section.tip && <TipBox>{section.tip}</TipBox>}
            </section>
          );
        })}
      </div>

      <div className="mt-12 p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
        <h3 className="font-semibold mb-2 flex items-center gap-2 text-slate-800">
          <span>🖥️</span> 터미널에서도 실습하기
        </h3>
        <p className="text-sm text-slate-500 mb-3">
          실제 Jest 프로젝트 테스트 파일을 터미널에서 실행해보세요.
        </p>
        <code className="block px-4 py-3 rounded-lg bg-slate-900 text-emerald-400 font-mono text-sm">
          {chapter.practiceCommand}
        </code>
        <p className="text-xs text-slate-400 mt-2">
          테스트 파일: __tests__/{chapter.testFolder}/
        </p>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-slate-900">
          <span>📝</span> 챕터 퀴즈
        </h2>
        <p className="text-slate-500 text-sm mb-6">
          {chapter.quiz.length}문제 · 70% 이상이면 챕터 완료
        </p>
        <QuizRunner
          chapterId={chapter.id}
          questions={chapter.quiz}
          onComplete={handleQuizComplete}
        />
      </div>

      <div className="mt-12 flex justify-between gap-4 pb-12">
        {prev ? (
          <Link
            href={`/learn/${prev.id}`}
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors shadow-sm"
          >
            <p className="text-xs text-slate-400 mb-1">← 이전</p>
            <p className="text-sm font-medium text-slate-800">
              {prev.emoji} {prev.title}
            </p>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {next ? (
          <Link
            href={`/learn/${next.id}`}
            className="flex-1 px-4 py-3 rounded-xl border border-blue-200 bg-blue-50 hover:border-blue-300 transition-colors text-right shadow-sm"
          >
            <p className="text-xs text-slate-400 mb-1">다음 →</p>
            <p className="text-sm font-medium text-blue-800">
              {next.emoji} {next.title}
            </p>
          </Link>
        ) : (
          <Link
            href="/quiz"
            className="flex-1 px-4 py-3 rounded-xl border border-emerald-200 bg-emerald-50 transition-colors text-right shadow-sm"
          >
            <p className="text-xs text-slate-400 mb-1">완료! →</p>
            <p className="text-sm font-medium text-emerald-800">
              🏆 종합 퀴즈 도전
            </p>
          </Link>
        )}
      </div>
    </div>
  );
}
