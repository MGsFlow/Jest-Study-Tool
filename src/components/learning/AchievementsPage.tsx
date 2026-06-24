"use client";

import { useEffect, useState } from "react";
import { AchievementBadges } from "./AchievementBadges";
import { achievements } from "@/lib/learning/achievements";
import { getUnlockedAchievements } from "@/lib/learning/progress";

export function AchievementsPage() {
  const [unlocked, setUnlocked] = useState<string[]>([]);

  useEffect(() => {
    setUnlocked(getUnlockedAchievements());
    const handler = () => setUnlocked(getUnlockedAchievements());
    window.addEventListener("progress-updated", handler);
    return () => window.removeEventListener("progress-updated", handler);
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">🏅 성취 배지</h1>
      <p className="text-slate-500 mb-2">
        학습 진행에 따라 배지를 모아보세요. {unlocked.length}/{achievements.length}{" "}
        획득
      </p>
      <p className="text-sm text-slate-400 mb-8">
        챕터 완료, 도전 과제, TDD 프로젝트, 종합 퀴즈 등으로 배지가 해제됩니다.
      </p>

      <AchievementBadges />

      <h2 className="text-lg font-bold text-slate-900 mt-10 mb-4">배지 목록</h2>
      <div className="space-y-2">
        {achievements.map((badge) => {
          const isUnlocked = unlocked.includes(badge.id);
          return (
            <div
              key={badge.id}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl border ${
                isUnlocked
                  ? "border-amber-200 bg-amber-50"
                  : "border-slate-200 bg-white opacity-60"
              }`}
            >
              <span className="text-2xl">{isUnlocked ? badge.emoji : "🔒"}</span>
              <div className="flex-1">
                <p className="font-medium text-slate-800">{badge.title}</p>
                <p className="text-xs text-slate-500">{badge.description}</p>
              </div>
              <span className="text-xs text-slate-400">{badge.condition}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
