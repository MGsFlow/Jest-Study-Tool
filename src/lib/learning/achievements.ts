export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  /** 달성 조건 설명 */
  condition: string;
}

export const achievements: Achievement[] = [
  {
    id: "first-step",
    title: "첫 걸음",
    description: "첫 챕터 학습을 시작했습니다",
    emoji: "🌱",
    condition: "아무 챕터나 방문",
  },
  {
    id: "basics-clear",
    title: "기초 마스터",
    description: "Jest 기초 챕터 퀴즈 통과",
    emoji: "📗",
    condition: "Chapter 1 퀴즈 70%+",
  },
  {
    id: "mock-master",
    title: "Mock 마스터",
    description: "Mocking 챕터를 정복했습니다",
    emoji: "🎭",
    condition: "Chapter 5 퀴즈 70%+",
  },
  {
    id: "async-hero",
    title: "비동기 해결사",
    description: "비동기 테스트 챕터 완료",
    emoji: "⏳",
    condition: "Chapter 4 퀴즈 70%+",
  },
  {
    id: "quiz-perfect",
    title: "만점 도전자",
    description: "챕터 퀴즈에서 100%를 받았습니다",
    emoji: "💯",
    condition: "아무 챕터 퀴즈 100%",
  },
  {
    id: "challenge-3",
    title: "도전자",
    description: "도전 과제 3개 완료",
    emoji: "🎯",
    condition: "도전 과제 3개 통과",
  },
  {
    id: "challenge-all",
    title: "챌린지 히어로",
    description: "모든 도전 과제 완료",
    emoji: "🏅",
    condition: "도전 과제 6개 전부",
  },
  {
    id: "tdd-builder",
    title: "TDD 빌더",
    description: "프로젝트 실습을 완료했습니다",
    emoji: "🔨",
    condition: "TDD 프로젝트 실습 완료",
  },
  {
    id: "all-chapters",
    title: "Jest 정복",
    description: "11개 챕터를 모두 완료했습니다",
    emoji: "👑",
    condition: "전체 챕터 퀴즈 70%+",
  },
  {
    id: "e2e-explorer",
    title: "E2E 탐험가",
    description: "E2E 테스트 챕터 완료",
    emoji: "🌍",
    condition: "Chapter 11 퀴즈 70%+",
  },
  {
    id: "grandmaster",
    title: "Jest 그랜드마스터",
    description: "종합 퀴즈 80% 이상",
    emoji: "🏆",
    condition: "종합 퀴즈 80%+",
  },
];

export function getAchievementById(id: string): Achievement | undefined {
  return achievements.find((a) => a.id === id);
}
