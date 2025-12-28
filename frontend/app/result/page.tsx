'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useQuizStore } from '@/lib/store/quiz-store';
import { generateFortune } from '@/lib/api/fortune';
import { FortuneResponse } from '@/lib/types/fortune';
import { useTypingEffect, useCountUp } from '@/lib/hooks/useTypingEffect';
import { ShareModal } from '@/lib/components/ShareModal';

// Typewriter Text Component
function TypewriterText({ text, speed = 30, delay = 0 }: { text: string; speed?: number; delay?: number }) {
  const displayedText = useTypingEffect(text, speed, delay);
  return <span>{displayedText}</span>;
}

// Count Up Number Component
function CountUpNumber({ value, duration = 1000, delay = 0 }: { value: number; duration?: number; delay?: number }) {
  const count = useCountUp(value, duration, delay);
  return <span>{count}</span>;
}

export default function ResultPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [fortune, setFortune] = useState<FortuneResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { answers, getTotalScore, resetQuiz } = useQuizStore();

  // Random loading messages
  const loadingMessages = [
    '세미콜론 개수 세는 중...',
    '커피 소비량 예측 중...',
    '버그 발생 확률 계산 중...',
    '깃헙 잔디 색상 분석 중...',
    '야근 패턴 분석 중...',
    '코드 리뷰 멘탈 측정 중...',
    '스택오버플로우 의존도 체크 중...',
    'AI에게 물어보는 횟수 카운팅 중...',
  ];

  // Rotate loading messages every 2 seconds
  useEffect(() => {
    if (isLoading) {
      setLoadingMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
      const interval = setInterval(() => {
        setLoadingMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  // Check if quiz is completed and fetch fortune
  useEffect(() => {
    if (answers.length === 0) {
      // No answers, redirect to home
      router.push('/');
      return;
    }

    // Fetch fortune from backend
    const fetchFortune = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const fortuneData = await generateFortune(answers);
        setFortune(fortuneData);
      } catch (err) {
        console.error('Failed to generate fortune:', err);
        setError(err instanceof Error ? err.message : '운세 생성에 실패했습니다');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFortune();
  }, [answers, router]);

  const totalScore = getTotalScore();

  // Loading screen
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          {/* Crystal Ball Animation */}
          <div className="mb-8 animate-bounce">
            <span className="text-8xl">🔮</span>
          </div>

          {/* Loading Text */}
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            점치는 중...
          </h2>

          {/* Random Loading Message */}
          <p className="mb-4 text-lg text-gray-600 dark:text-gray-400 min-h-[28px] transition-opacity duration-300">
            {loadingMessage}
          </p>

          {/* Loading Dots */}
          <div className="mt-8 flex justify-center gap-2">
            <div className="h-3 w-3 animate-pulse rounded-full bg-purple-600" style={{ animationDelay: '0s' }} />
            <div className="h-3 w-3 animate-pulse rounded-full bg-purple-600" style={{ animationDelay: '0.2s' }} />
            <div className="h-3 w-3 animate-pulse rounded-full bg-purple-600" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
    );
  }

  // Error screen
  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 px-6 py-12 dark:from-gray-900 dark:to-gray-800">
        <div className="w-full max-w-2xl text-center">
          <div className="mb-8">
            <span className="text-8xl">😢</span>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            운세 생성 실패
          </h1>
          <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
            {error}
          </p>
          <button
            onClick={() => {
              resetQuiz();
              router.push('/');
            }}
            className="rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-3 font-medium text-white transition-all hover:scale-105 hover:shadow-lg"
          >
            처음으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  // Result screen
  if (!fortune) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 px-6 py-12 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto w-full max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4">
            <span className="text-6xl">✨</span>
          </div>
          <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
            <TypewriterText text={fortune.archetypeName} speed={100} delay={0} />
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            <TypewriterText text={fortune.archetypeDescription} speed={40} delay={500} />
          </p>
        </div>

        {/* Fortune Categories */}
        <div className="space-y-6">
          {/* Bug Fortune */}
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              🐛 버그 운세
            </h3>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">총 버그 수</p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  <CountUpNumber value={fortune.bugFortune.totalBugs} duration={1500} delay={200} />개
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">프로덕션 버그</p>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                  <CountUpNumber value={fortune.bugFortune.productionBugs} duration={1500} delay={400} />개
                </p>
              </div>
            </div>
            <p className="mb-2 text-gray-700 dark:text-gray-300">
              <TypewriterText text={fortune.bugFortune.advice} speed={20} delay={600} />
            </p>
            <p className="italic text-gray-600 dark:text-gray-400">
              "<TypewriterText text={fortune.bugFortune.memeMessage} speed={30} delay={1000} />"
            </p>
          </div>

          {/* Overtime Fortune */}
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              🌙 야근 운세
            </h3>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">예상 야근 횟수</p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  <CountUpNumber value={fortune.overtimeFortune.expectedCount} duration={1500} delay={200} />번
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">위험 월</p>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                  <TypewriterText text={fortune.overtimeFortune.riskMonth} speed={50} delay={400} />
                </p>
              </div>
            </div>
            <p className="mb-2 text-gray-700 dark:text-gray-300">
              <TypewriterText text={fortune.overtimeFortune.advice} speed={20} delay={600} />
            </p>
            <p className="italic text-gray-600 dark:text-gray-400">
              "<TypewriterText text={fortune.overtimeFortune.memeMessage} speed={30} delay={1000} />"
            </p>
          </div>

          {/* Tech Stack Fortune */}
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              🚀 기술 스택 운세
            </h3>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">배울 기술</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  <TypewriterText text={fortune.techStackFortune.techToLearn} speed={50} delay={200} />
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">숙련도</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  <CountUpNumber value={fortune.techStackFortune.masteryPercentage} duration={1500} delay={400} />%
                </p>
              </div>
            </div>
            <p className="mb-2 text-gray-700 dark:text-gray-300">
              <TypewriterText text={fortune.techStackFortune.advice} speed={20} delay={600} />
            </p>
            <p className="italic text-gray-600 dark:text-gray-400">
              "<TypewriterText text={fortune.techStackFortune.memeMessage} speed={30} delay={1000} />"
            </p>
          </div>

          {/* Code Review Fortune */}
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              👀 코드 리뷰 운세
            </h3>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">총 코멘트 수</p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  <CountUpNumber value={fortune.codeReviewFortune.totalComments} duration={1500} delay={200} />개
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">LGTM 확률</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  <CountUpNumber value={fortune.codeReviewFortune.lgtmProbability} duration={1500} delay={400} />%
                </p>
              </div>
            </div>
            <p className="mb-2 text-gray-700 dark:text-gray-300">
              <TypewriterText text={fortune.codeReviewFortune.advice} speed={20} delay={600} />
            </p>
            <p className="italic text-gray-600 dark:text-gray-400">
              "<TypewriterText text={fortune.codeReviewFortune.memeMessage} speed={30} delay={1000} />"
            </p>
          </div>

          {/* GitHub Fortune */}
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              💻 GitHub 운세
            </h3>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">총 커밋 수</p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  <CountUpNumber value={fortune.gitHubFortune.totalCommits} duration={1500} delay={200} />개
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">최장 연속 일수</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  <CountUpNumber value={fortune.gitHubFortune.longestStreak} duration={1500} delay={400} />일
                </p>
              </div>
            </div>
            <p className="mb-2 text-gray-700 dark:text-gray-300">
              <TypewriterText text={fortune.gitHubFortune.advice} speed={20} delay={600} />
            </p>
            <p className="italic text-gray-600 dark:text-gray-400">
              "<TypewriterText text={fortune.gitHubFortune.memeMessage} speed={30} delay={1000} />"
            </p>
          </div>

          {/* Meeting Fortune */}
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              📅 회의 운세
            </h3>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">총 회의 수</p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  <CountUpNumber value={fortune.meetingFortune.totalMeetings} duration={1500} delay={200} />번
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">필요한 회의 비율</p>
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                  <CountUpNumber value={fortune.meetingFortune.necessaryPercentage} duration={1500} delay={400} />%
                </p>
              </div>
            </div>
            <p className="mb-2 text-gray-700 dark:text-gray-300">
              <TypewriterText text={fortune.meetingFortune.advice} speed={20} delay={600} />
            </p>
            <p className="italic text-gray-600 dark:text-gray-400">
              "<TypewriterText text={fortune.meetingFortune.memeMessage} speed={30} delay={1000} />"
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-3 font-medium text-white transition-all hover:scale-105 hover:shadow-lg"
          >
            공유하기 📤
          </button>

          <button
            onClick={() => {
              resetQuiz();
              router.push('/quiz');
            }}
            className="rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-3 font-medium text-white transition-all hover:scale-105 hover:shadow-lg"
          >
            다시 하기 🔄
          </button>

          <Link
            href="/"
            className="rounded-lg border-2 border-purple-600 bg-white px-6 py-3 font-medium text-purple-600 transition-all hover:bg-purple-50 dark:border-purple-400 dark:bg-gray-800 dark:text-purple-400 dark:hover:bg-gray-700"
          >
            홈으로 🏠
          </Link>
        </div>

        {/* Share Modal */}
        <ShareModal
          fortune={fortune}
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
        />
      </div>
    </div>
  );
}
