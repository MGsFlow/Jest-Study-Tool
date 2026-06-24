"use client";

import { useEffect, useState } from "react";
import { achievements } from "@/lib/learning/achievements";
import { getUnlockedAchievements } from "@/lib/learning/progress";

export function AchievementBadges({ compact = false }: { compact?: boolean }) {
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [newBadge, setNewBadge] = useState<string | null>(null);

  useEffect(() => {
    setUnlocked(getUnlockedAchievements());

    const onUpdate = () => setUnlocked(getUnlockedAchievements());
    const onAchievement = (e: Event) => {
      const detail = (e as CustomEvent<string[]>).detail;
      if (detail?.[0]) {
        setNewBadge(detail[0]);
        setTimeout(() => setNewBadge(null), 4000);
      }
      setUnlocked(getUnlockedAchievements());
    };

    window.addEventListener("progress-updated", onUpdate);
    window.addEventListener("achievement-unlocked", onAchievement);
    return () => {
      window.removeEventListener("progress-updated", onUpdate);
      window.removeEventListener("achievement-unlocked", onAchievement);
    };
  }, []);

  const newAchievement = newBadge
    ? achievements.find((a) => a.id === newBadge)
    : null;

  if (compact) {
    return (
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-slate-500">
          🏅 {unlocked.length}/{achievements.length}
        </span>
      </div>
    );
  }

  return (
    <div>
      {newAchievement && (
        <div className="mb-4 px-4 py-3 rounded-xl border border-amber-300 bg-amber-50 animate-pulse">
          <p className="text-sm font-medium text-amber-900">
            🎉 배지 획득! {newAchievement.emoji} {newAchievement.title}
          </p>
          <p className="text-xs text-amber-700 mt-0.5">
            {newAchievement.description}
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {achievements.map((badge) => {
          const isUnlocked = unlocked.includes(badge.id);
          return (
            <div
              key={badge.id}
              className={`p-3 rounded-xl border text-center transition-all ${
                isUnlocked
                  ? "border-amber-200 bg-amber-50 shadow-sm"
                  : "border-slate-200 bg-slate-50 opacity-50 grayscale"
              }`}
              title={badge.condition}
            >
              <span className="text-2xl">{badge.emoji}</span>
              <p className="text-xs font-medium text-slate-800 mt-1">
                {badge.title}
              </p>
              {!isUnlocked && (
                <p className="text-[10px] text-slate-400 mt-0.5">🔒</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
