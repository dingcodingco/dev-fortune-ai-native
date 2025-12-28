import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <main className="flex max-w-4xl flex-col items-center justify-center px-6 py-16 text-center">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-gray-900 dark:text-white md:text-6xl">
            개발자 운세 🔮
          </h1>
          <p className="mb-2 text-xl text-gray-700 dark:text-gray-300 md:text-2xl">
            당신의 개발자 성향을 알아보세요
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            5가지 질문으로 당신의 코딩 스타일과 개발 철학을 진단합니다
          </p>
        </div>

        {/* Features */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <div className="mb-3 text-4xl">🐛</div>
            <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
              디버깅 성향
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              버그를 마주했을 때 당신의 해결 방식은?
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <div className="mb-3 text-4xl">💼</div>
            <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
              워라밸 성향
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              일과 삶의 균형을 어떻게 유지하나요?
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <div className="mb-3 text-4xl">🤖</div>
            <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
              AI 도구 활용
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              AI 코딩 도구를 어떻게 사용하시나요?
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href="/quiz"
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-purple-600 to-blue-500 px-8 py-4 text-lg font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          <span className="relative">운세 보러가기 ✨</span>
        </Link>

        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          소요 시간: 약 2분 | 5개 질문
        </p>
      </main>
    </div>
  );
}
