"use client";

import { useState, useEffect } from "react";
import { projectSteps } from "@/lib/learning/projectPractice";
import {
  markProjectStepCompleted,
  getProjectStepsCompleted,
} from "@/lib/learning/progress";
import { CodePlayground } from "./CodePlayground";
import type { PlaygroundConfig } from "@/lib/learning/types";

const phaseColor = {
  Red: "bg-red-100 text-red-700 border-red-200",
  Green: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Refactor: "bg-blue-100 text-blue-700 border-blue-200",
};

export function ProjectPracticePage() {
  const [activeStep, setActiveStep] = useState(1);
  const [completed, setCompleted] = useState<number[]>([]);

  useEffect(() => {
    setCompleted(getProjectStepsCompleted());
  }, [activeStep]);

  const step = projectSteps.find((s) => s.id === activeStep)!;
  const allDone = completed.length >= projectSteps.length;

  const config: PlaygroundConfig = {
    setupCode: step.setupCode,
    starterCode: step.starterCode,
    solutionCode: step.solutionCode,
    hint: step.hint,
  };

  function handlePass() {
    markProjectStepCompleted(step.id);
    setCompleted(getProjectStepsCompleted());
    if (activeStep < projectSteps.length) {
      setTimeout(() => setActiveStep(activeStep + 1), 800);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">
        🔨 TDD 프로젝트 실습
      </h1>
      <p className="text-slate-500 mb-2">
        Todo 앱을 <strong>TDD(Red → Green → Refactor)</strong>로 처음부터
        만들어봅니다.
      </p>
      <p className="text-sm text-slate-400 mb-8">
        6단계 · 테스트 먼저 작성 → 구현 → 통과 확인
      </p>

      {allDone && (
        <div className="mb-6 px-4 py-3 rounded-xl border border-emerald-300 bg-emerald-50">
          <p className="font-medium text-emerald-800">
            🎉 TDD 프로젝트 완료! &quot;TDD 빌더&quot; 배지를 획득했습니다.
          </p>
        </div>
      )}

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {projectSteps.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveStep(s.id)}
            className={`shrink-0 px-3 py-2 rounded-xl text-xs border transition-all ${
              activeStep === s.id
                ? "border-blue-300 bg-blue-50 font-medium"
                : completed.includes(s.id)
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-slate-200 bg-white"
            }`}
          >
            {completed.includes(s.id) ? "✓ " : ""}
            Step {s.id}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 mb-6 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`text-xs px-2 py-0.5 rounded-full border font-medium ${phaseColor[step.phase]}`}
          >
            {step.phase}
          </span>
          <h2 className="text-lg font-bold text-slate-900">
            Step {step.id}. {step.title}
          </h2>
        </div>
        <p className="text-sm text-slate-600">{step.description}</p>
      </div>

      <CodePlayground
        config={config}
        sectionTitle={`Step ${step.id}`}
        onAllTestsPass={handlePass}
      />
    </div>
  );
}
