export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
}

export interface PlaygroundConfig {
  setupCode?: string;
  starterCode: string;
  solutionCode?: string;
  hint?: string;
  helpers?: string[];
}

export interface PlaygroundResult {
  passed: number;
  failed: number;
  total: number;
  logs: PlaygroundLog[];
  error?: string;
}

export interface PlaygroundLog {
  type: "pass" | "fail" | "group" | "info";
  name: string;
  message?: string;
  indent: number;
}

export interface LessonSection {
  title: string;
  content: string;
  code?: string;
  tip?: string;
  playground?: PlaygroundConfig;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  emoji: string;
  duration: string;
  testFolder: string;
  summary: string;
  whyItMatters: string;
  realWorldExamples: string[];
  sections: LessonSection[];
  quiz: QuizQuestion[];
  practiceCommand: string;
  /** 챕터 공통 playground setup (함수 정의 등) */
  playgroundSetup?: string;
}

export interface ChapterProgress {
  completed: boolean;
  quizScore: number | null;
  quizAttempts: number;
  lastVisited: string | null;
}

export type ProgressMap = Record<string, ChapterProgress>;
