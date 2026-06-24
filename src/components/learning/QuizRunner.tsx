"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/lib/learning/types";
import { saveQuizResult } from "@/lib/learning/progress";

interface QuizRunnerProps {
  chapterId: string;
  questions: QuizQuestion[];
  onComplete?: (score: number, total: number) => void;
}

export function QuizRunner({ chapterId, questions, onComplete }: QuizRunnerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<
    { questionId: string; correct: boolean }[]
  >([]);

  const current = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  function handleSelect(optionId: string) {
    if (showExplanation) return;
    setSelectedId(optionId);
    setShowExplanation(true);
    const isCorrect = optionId === current.correctOptionId;
    setAnswers((prev) => [
      ...prev,
      { questionId: current.id, correct: isCorrect },
    ]);
  }

  function finishQuiz(finalAnswers: typeof answers) {
    const correctCount = finalAnswers.filter((a) => a.correct).length;
    saveQuizResult(chapterId, correctCount, questions.length);
    setFinished(true);
    onComplete?.(correctCount, questions.length);
  }

  function handleNext() {
    if (isLast) {
      finishQuiz(answers);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedId(null);
      setShowExplanation(false);
    }
  }

  function resetQuiz() {
    setCurrentIndex(0);
    setSelectedId(null);
    setShowExplanation(false);
    setFinished(false);
    setAnswers([]);
  }

  if (finished) {
    const correctCount = answers.filter((a) => a.correct).length;
    const percent = Math.round((correctCount / questions.length) * 100);
    const passed = percent >= 70;

    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="text-5xl mb-4">{passed ? "🎉" : "📚"}</div>
        <h3 className="text-2xl font-bold mb-2 text-slate-900">
          {passed ? "퀴즈 통과!" : "다시 도전해보세요!"}
        </h3>
        <p className="text-slate-500 mb-6">
          {correctCount} / {questions.length} 정답 ({percent}%)
        </p>
        <div className="w-full bg-slate-100 rounded-full h-3 mb-6">
          <div
            className={`h-3 rounded-full transition-all ${
              passed ? "bg-emerald-500" : "bg-amber-500"
            }`}
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="text-sm text-slate-500 mb-6">
          {passed
            ? "70% 이상이면 챕터 완료! 다음 챕터로 넘어가세요."
            : "70% 이상 필요합니다. 내용을 다시 읽고 재도전하세요."}
        </p>
        <button
          onClick={resetQuiz}
          className="px-6 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-sm font-medium text-slate-700 transition-colors"
        >
          다시 풀기
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">
          퀴즈 {currentIndex + 1} / {questions.length}
        </span>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i < currentIndex
                  ? "bg-emerald-500"
                  : i === currentIndex
                    ? "bg-blue-500"
                    : "bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold mb-6 leading-relaxed text-slate-900">
          {current.question}
        </h3>

        <div className="space-y-3">
          {current.options.map((option) => {
            let style =
              "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white text-slate-700";
            if (showExplanation) {
              if (option.id === current.correctOptionId) {
                style = "border-emerald-300 bg-emerald-50 text-emerald-900";
              } else if (option.id === selectedId) {
                style = "border-red-300 bg-red-50 text-red-900";
              } else {
                style = "border-slate-100 bg-slate-50 opacity-50 text-slate-500";
              }
            } else if (selectedId === option.id) {
              style = "border-blue-300 bg-blue-50 text-blue-900";
            }

            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                disabled={showExplanation}
                className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${style}`}
              >
                <span className="text-sm">{option.text}</span>
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div
            className={`mt-5 p-4 rounded-xl text-sm leading-relaxed ${
              selectedId === current.correctOptionId
                ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                : "bg-red-50 border border-red-200 text-red-800"
            }`}
          >
            <p className="font-medium mb-1">
              {selectedId === current.correctOptionId ? "✅ 정답!" : "❌ 오답"}
            </p>
            <p>{current.explanation}</p>
          </div>
        )}

        {showExplanation && (
          <button
            onClick={handleNext}
            className="mt-5 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors"
          >
            {isLast ? "결과 보기" : "다음 문제 →"}
          </button>
        )}
      </div>
    </div>
  );
}
