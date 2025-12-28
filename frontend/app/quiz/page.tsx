'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/lib/store/quiz-store';
import { TOTAL_QUESTIONS } from '@/lib/data/questions';
import { QuizOption } from '@/lib/types/quiz';

export default function QuizPage() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const {
    currentQuestion,
    answers,
    isComplete,
    setAnswer,
    nextQuestion,
    previousQuestion,
    completeQuiz,
    getCurrentQuestionData,
    getAnswer,
    getProgress,
  } = useQuizStore();

  const questionData = getCurrentQuestionData();
  const currentAnswer = questionData ? getAnswer(questionData.id) : undefined;
  const progress = getProgress();

  // Handle option selection
  const handleOptionSelect = (optionId: string, value: number) => {
    if (!questionData || isTransitioning) return;

    // Set answer
    setAnswer(questionData.id, optionId, value);

    // Show transition animation
    setIsTransitioning(true);

    // Auto-navigate to next question after 0.3s
    setTimeout(() => {
      if (currentQuestion < TOTAL_QUESTIONS - 1) {
        nextQuestion();
      } else {
        // Quiz completed
        completeQuiz();
      }
      setIsTransitioning(false);
    }, 300);
  };

  // Navigate to result page when quiz is completed
  useEffect(() => {
    if (isComplete) {
      router.push('/result');
    }
  }, [isComplete, router]);

  if (!questionData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            질문을 불러오는 중...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700">
        <div
          className="h-2 bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          {/* Question Counter */}
          <div className="mb-4 text-center">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {currentQuestion + 1} / {TOTAL_QUESTIONS}
            </span>
          </div>

          {/* Category Badge */}
          <div className="mb-6 text-center">
            <span className="inline-block rounded-full bg-purple-100 px-4 py-1 text-sm font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              {questionData.category}
            </span>
          </div>

          {/* Question */}
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
            {questionData.question}
          </h2>

          {/* Options */}
          <div className="space-y-4">
            {questionData.options.map((option: QuizOption) => {
              const isSelected = currentAnswer?.optionId === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id, option.value)}
                  disabled={isTransitioning}
                  className={`w-full rounded-lg border-2 p-4 text-left transition-all duration-200 ${
                    isSelected
                      ? 'border-purple-500 bg-purple-50 dark:border-purple-400 dark:bg-purple-900/30'
                      : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-purple-700 dark:hover:bg-purple-900/20'
                  } ${isTransitioning ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{option.emoji}</span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {option.text}
                      </p>
                    </div>
                    {isSelected && (
                      <svg
                        className="h-6 w-6 text-purple-600 dark:text-purple-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              className="rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              ← 이전
            </button>

            {currentAnswer && (
              <button
                onClick={() => {
                  if (currentQuestion < TOTAL_QUESTIONS - 1) {
                    nextQuestion();
                  } else {
                    completeQuiz();
                  }
                }}
                className="rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-3 font-medium text-white transition-all hover:scale-105 hover:shadow-lg"
              >
                {currentQuestion < TOTAL_QUESTIONS - 1 ? '다음 →' : '완료 ✨'}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
