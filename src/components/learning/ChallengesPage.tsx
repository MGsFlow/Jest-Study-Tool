"use client";

import { useState } from "react";
import { challenges } from "@/lib/learning/resources";
import { markChallengeCompleted } from "@/lib/learning/progress";
import { CodePlayground } from "./CodePlayground";
import type { PlaygroundConfig } from "@/lib/learning/types";

const difficultyColor = {
  입문: "bg-green-100 text-green-700",
  초급: "bg-blue-100 text-blue-700",
  중급: "bg-violet-100 text-violet-700",
};

export function ChallengesPage() {
  const [activeId, setActiveId] = useState(challenges[0].id);

  const challenge = challenges.find((c) => c.id === activeId)!;

  const config: PlaygroundConfig = {
    setupCode: challenge.setupCode,
    starterCode: challenge.starterCode,
    solutionCode: challenge.solutionCode,
    hint: challenge.hint,
    helpers: challenge.validators,
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">🎯 도전 과제</h1>
      <p className="text-slate-500 mb-8">
        직접 테스트를 작성하는 실전 연습입니다. 막히면 힌트와 정답을 확인하세요.
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {challenges.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveId(c.id)}
            className={`px-3 py-2 rounded-xl text-sm border transition-all ${
              activeId === c.id
                ? "border-blue-300 bg-blue-50 text-blue-800 font-medium shadow-sm"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
            }`}
          >
            {c.title}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 mb-6 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-bold text-slate-900">{challenge.title}</h2>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${difficultyColor[challenge.difficulty]}`}
          >
            {challenge.difficulty}
          </span>
        </div>
        <p className="text-sm text-slate-600">{challenge.description}</p>
      </div>

      <CodePlayground
        config={config}
        sectionTitle={challenge.title}
        onAllTestsPass={() => markChallengeCompleted(challenge.id)}
      />
    </div>
  );
}
