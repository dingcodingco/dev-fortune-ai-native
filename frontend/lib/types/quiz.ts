/**
 * Quiz Types for Developer Fortune Quiz
 */

export type QuestionId = 'debugging' | 'worklife' | 'crisis' | 'review' | 'ai-tools';

export interface QuizOption {
  id: string;
  text: string;
  emoji: string;
  value: number; // Score value for archetype calculation
}

export interface QuizQuestion {
  id: QuestionId;
  question: string;
  category: string;
  image?: string; // Developer meme image URL
  options: QuizOption[];
}

export interface QuizAnswer {
  questionId: QuestionId;
  optionId: string;
  value: number;
}

export interface QuizState {
  currentQuestion: number;
  answers: QuizAnswer[];
  isComplete: boolean;
}

// Archetype types (6 types based on quiz results)
export type ArchetypeId =
  | 'bug-hunter'      // 버그 헌터
  | 'peaceful-dev'    // 평화주의자
  | 'fire-fighter'    // 불끄기 전문가
  | 'team-player'     // 팀 플레이어
  | 'ai-native'       // AI 네이티브
  | 'traditional';    // 전통주의자
