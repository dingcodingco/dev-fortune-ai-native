import { create } from 'zustand';
import { QuizAnswer, QuestionId, QuizQuestion } from '@/lib/types/quiz';
import { quizQuestions, TOTAL_QUESTIONS } from '@/lib/data/questions';

interface QuizStore {
  // State
  currentQuestion: number;
  answers: QuizAnswer[];
  isComplete: boolean;

  // Actions
  setAnswer: (questionId: QuestionId, optionId: string, value: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  goToQuestion: (index: number) => void;
  completeQuiz: () => void;
  resetQuiz: () => void;

  // Getters
  getCurrentQuestionData: () => QuizQuestion | undefined;
  getAnswer: (questionId: QuestionId) => QuizAnswer | undefined;
  getTotalScore: () => number;
  getProgress: () => number;
}

export const useQuizStore = create<QuizStore>((set, get) => ({
  // Initial state
  currentQuestion: 0,
  answers: [],
  isComplete: false,

  // Actions
  setAnswer: (questionId, optionId, value) => {
    set((state) => {
      const existingAnswerIndex = state.answers.findIndex(
        (a) => a.questionId === questionId
      );

      const newAnswer: QuizAnswer = { questionId, optionId, value };

      if (existingAnswerIndex >= 0) {
        // Update existing answer
        const updatedAnswers = [...state.answers];
        updatedAnswers[existingAnswerIndex] = newAnswer;
        return { answers: updatedAnswers };
      } else {
        // Add new answer
        return { answers: [...state.answers, newAnswer] };
      }
    });
  },

  nextQuestion: () => {
    set((state) => {
      if (state.currentQuestion < TOTAL_QUESTIONS - 1) {
        return { currentQuestion: state.currentQuestion + 1 };
      }
      return state;
    });
  },

  previousQuestion: () => {
    set((state) => {
      if (state.currentQuestion > 0) {
        return { currentQuestion: state.currentQuestion - 1 };
      }
      return state;
    });
  },

  goToQuestion: (index) => {
    set(() => {
      if (index >= 0 && index < TOTAL_QUESTIONS) {
        return { currentQuestion: index };
      }
      return {};
    });
  },

  completeQuiz: () => {
    set({ isComplete: true });
  },

  resetQuiz: () => {
    set({
      currentQuestion: 0,
      answers: [],
      isComplete: false,
    });
  },

  // Getters
  getCurrentQuestionData: () => {
    const state = get();
    return quizQuestions[state.currentQuestion];
  },

  getAnswer: (questionId) => {
    const state = get();
    return state.answers.find((a) => a.questionId === questionId);
  },

  getTotalScore: () => {
    const state = get();
    return state.answers.reduce((total, answer) => total + answer.value, 0);
  },

  getProgress: () => {
    const state = get();
    return Math.round((state.answers.length / TOTAL_QUESTIONS) * 100);
  },
}));
