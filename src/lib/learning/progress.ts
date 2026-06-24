"use client";

import type { ProgressMap, ChapterProgress } from "./types";
import { chapters } from "./chapters";
import { challenges } from "./resources";
import { projectSteps } from "./projectPractice";
import { achievements } from "./achievements";

const PROGRESS_KEY = "jest-learning-progress";
const CHALLENGES_KEY = "jest-challenges-done";
const PROJECT_KEY = "jest-project-steps";
const ACHIEVEMENTS_KEY = "jest-achievements";

const defaultProgress = (): ChapterProgress => ({
  completed: false,
  quizScore: null,
  quizAttempts: 0,
  lastVisited: null,
});

export function getProgress(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    return {};
  }
}

function saveProgressMap(progress: ProgressMap): void {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

export function getChapterProgress(chapterId: string): ChapterProgress {
  return getProgress()[chapterId] ?? defaultProgress();
}

export function getChallengesCompleted(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CHALLENGES_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function markChallengeCompleted(challengeId: string): void {
  const done = getChallengesCompleted();
  if (!done.includes(challengeId)) {
    done.push(challengeId);
    localStorage.setItem(CHALLENGES_KEY, JSON.stringify(done));
    checkAchievements();
    window.dispatchEvent(new Event("progress-updated"));
  }
}

export function getProjectStepsCompleted(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(PROJECT_KEY);
    return raw ? (JSON.parse(raw) as number[]) : [];
  } catch {
    return [];
  }
}

export function markProjectStepCompleted(stepId: number): void {
  const done = getProjectStepsCompleted();
  if (!done.includes(stepId)) {
    done.push(stepId);
    localStorage.setItem(PROJECT_KEY, JSON.stringify(done));
    checkAchievements();
    window.dispatchEvent(new Event("progress-updated"));
  }
}

export function getUnlockedAchievements(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ACHIEVEMENTS_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function unlockAchievement(id: string): boolean {
  const unlocked = getUnlockedAchievements();
  if (unlocked.includes(id)) return false;
  unlocked.push(id);
  localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(unlocked));
  return true;
}

export function checkAchievements(): string[] {
  const newlyUnlocked: string[] = [];
  const progress = getProgress();
  const chapterIds = chapters.map((c) => c.id);
  const challengesDone = getChallengesCompleted();
  const projectDone = getProjectStepsCompleted();

  const tryUnlock = (id: string) => {
    if (unlockAchievement(id)) newlyUnlocked.push(id);
  };

  // 첫 챕터 방문
  if (chapterIds.some((id) => progress[id]?.lastVisited)) {
    tryUnlock("first-step");
  }

  if (progress.basics?.completed) tryUnlock("basics-clear");
  if (progress.mocking?.completed) tryUnlock("mock-master");
  if (progress.async?.completed) tryUnlock("async-hero");
  if (progress["e2e"]?.completed) tryUnlock("e2e-explorer");

  if (
    Object.values(progress).some(
      (p) => p?.quizScore !== null && p?.quizScore === 100
    )
  ) {
    tryUnlock("quiz-perfect");
  }

  if (challengesDone.length >= 3) tryUnlock("challenge-3");
  if (challengesDone.length >= challenges.length) tryUnlock("challenge-all");

  if (projectDone.length >= projectSteps.length) tryUnlock("tdd-builder");

  if (chapterIds.every((id) => progress[id]?.completed)) {
    tryUnlock("all-chapters");
  }

  if (
    progress["final-quiz"]?.quizScore !== null &&
    progress["final-quiz"]?.quizScore !== undefined &&
    progress["final-quiz"].quizScore >= 80
  ) {
    tryUnlock("grandmaster");
  }

  if (newlyUnlocked.length > 0) {
    window.dispatchEvent(
      new CustomEvent("achievement-unlocked", { detail: newlyUnlocked })
    );
  }

  return newlyUnlocked;
}

export function markChapterVisited(chapterId: string): void {
  const all = getProgress();
  all[chapterId] = {
    ...(all[chapterId] ?? defaultProgress()),
    lastVisited: new Date().toISOString(),
  };
  saveProgressMap(all);
  checkAchievements();
}

export function saveQuizResult(
  chapterId: string,
  score: number,
  total: number
): void {
  const all = getProgress();
  const prev = all[chapterId] ?? defaultProgress();
  const percent = Math.round((score / total) * 100);
  all[chapterId] = {
    ...prev,
    quizScore: percent,
    quizAttempts: prev.quizAttempts + 1,
    completed: percent >= 70,
    lastVisited: new Date().toISOString(),
  };
  saveProgressMap(all);
  checkAchievements();
  window.dispatchEvent(new Event("progress-updated"));
}

export function getOverallProgress(chapterIds: string[]): {
  completedCount: number;
  totalCount: number;
  averageScore: number | null;
} {
  const all = getProgress();
  const completedCount = chapterIds.filter((id) => all[id]?.completed).length;
  const scores = chapterIds
    .map((id) => all[id]?.quizScore)
    .filter((s): s is number => s !== null && s !== undefined);
  const averageScore =
    scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : null;
  return { completedCount, totalCount: chapterIds.length, averageScore };
}

export function resetProgress(): void {
  localStorage.removeItem(PROGRESS_KEY);
  localStorage.removeItem(CHALLENGES_KEY);
  localStorage.removeItem(PROJECT_KEY);
  localStorage.removeItem(ACHIEVEMENTS_KEY);
}

export function getAchievementStats() {
  const unlocked = getUnlockedAchievements();
  return {
    unlocked,
    total: achievements.length,
    unlockedCount: unlocked.length,
  };
}
