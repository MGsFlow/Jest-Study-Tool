"use client";

import { useState } from "react";
import { chapters } from "@/lib/learning/chapters";
import type { QuizQuestion } from "@/lib/learning/types";
import { QuizRunner } from "./QuizRunner";

const finalQuiz: QuizQuestion[] = chapters
  .map((ch) => ch.quiz[0])
  .filter(Boolean);

export function FinalQuizPage() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="text-6xl mb-6">🏆</div>
        <h1 className="text-3xl font-bold mb-3 text-slate-900">종합 퀴즈</h1>
        <p className="text-slate-500 mb-8 leading-relaxed">
          11개 챕터에서 배운 내용을 종합적으로 확인합니다.
          <br />
          각 챕터에서 1문제씩, 총 {finalQuiz.length}문제입니다.
        </p>
        <div className="rounded-xl border border-slate-200 bg-white p-6 mb-8 text-left shadow-sm">
          <h3 className="font-semibold mb-3 text-slate-800">📋 규칙</h3>
          <ul className="space-y-2 text-sm text-slate-500">
            <li>• 객관식 4지선다</li>
            <li>• 정답 선택 후 해설 확인</li>
            <li>• 80% 이상이면 Jest 마스터 🎓</li>
            <li>• 틀린 문제는 해당 챕터를 다시 학습하세요</li>
          </ul>
        </div>
        <button
          onClick={() => setStarted(true)}
          className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors shadow-sm"
        >
          퀴즈 시작
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-slate-900">🏆 종합 퀴즈</h1>
      <QuizRunner chapterId="final-quiz" questions={finalQuiz} />
    </div>
  );
}
