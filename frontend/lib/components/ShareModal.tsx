'use client';

import { useEffect, useState } from 'react';
import { FortuneResponse } from '@/lib/types/fortune';
import { useShare } from '@/lib/hooks/useShare';
import { ShareCard } from './ShareCard';

interface ShareModalProps {
  fortune: FortuneResponse;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 공유 모달 컴포넌트
 * 공유 카드 미리보기 및 공유 옵션 제공
 */
export function ShareModal({ fortune, isOpen, onClose }: ShareModalProps) {
  const {
    isGenerating,
    shareImageUrl,
    generateShareImage,
    downloadImage,
    shareToTwitter,
    shareToKakao,
    copyLink,
  } = useShare();

  const [isImageReady, setIsImageReady] = useState(false);

  // 모달이 열릴 때 이미지 생성
  useEffect(() => {
    if (isOpen && !shareImageUrl) {
      // 약간의 지연 후 이미지 생성 (DOM 렌더링 완료 대기)
      setTimeout(() => {
        generateShareImage().then(() => {
          setIsImageReady(true);
        });
      }, 100);
    }
  }, [isOpen, shareImageUrl, generateShareImage]);

  if (!isOpen) return null;

  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://devfortune.vercel.app';
  const shareText = `나의 2026 개발자 운세: ${fortune.archetypeName}\n버그 ${fortune.bugFortune.totalBugs}개, 커밋 ${fortune.gitHubFortune.totalCommits}개 예상!`;

  return (
    <>
      {/* ShareCard - 화면 밖에 숨김 (html2canvas용) */}
      {/* Tailwind 클래스 사용 금지 - html2canvas가 lab() 색상 함수를 지원하지 않음 */}
      <div
        style={{
          position: 'fixed',
          left: '-9999px',
          top: '0',
          margin: '0',
          padding: '0',
          border: 'none',
          background: 'transparent',
        }}
      >
        <ShareCard fortune={fortune} />
      </div>

      {/* 오버레이 */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 모달 */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-gray-900 p-6 shadow-2xl">
          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-3xl text-gray-400 hover:text-white"
            aria-label="닫기"
          >
            ×
          </button>

          {/* 제목 */}
          <h2 className="mb-6 text-3xl font-bold text-white">
            운세 결과 공유하기
          </h2>

          {/* 공유 카드 미리보기 */}
          <div className="mb-8">
            <div className="mb-4 text-sm text-gray-400">
              공유 카드 미리보기
            </div>

            {/* 이미지 미리보기 또는 로딩 */}
            <div className="overflow-hidden rounded-lg shadow-xl">
              {isGenerating ? (
                <div className="flex h-[360px] items-center justify-center bg-gray-800">
                  <div className="text-center">
                    <div className="mb-4 text-4xl">🎨</div>
                    <div className="text-gray-400">이미지 생성 중...</div>
                  </div>
                </div>
              ) : shareImageUrl ? (
                <img
                  src={shareImageUrl}
                  alt="공유 카드 미리보기"
                  className="w-full"
                />
              ) : (
                <div className="flex h-[360px] items-center justify-center bg-gray-800">
                  <div className="text-gray-400">미리보기 준비 중...</div>
                </div>
              )}
            </div>
          </div>

          {/* 공유 옵션 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* 이미지 다운로드 */}
            <button
              onClick={() => downloadImage()}
              disabled={isGenerating || !isImageReady}
              className="flex items-center justify-center gap-3 rounded-lg bg-purple-600 px-6 py-4 text-lg font-semibold text-white transition-colors hover:bg-purple-700 disabled:opacity-50"
            >
              <span className="text-2xl">📥</span>
              <span>이미지 다운로드</span>
            </button>

            {/* 트위터 공유 */}
            <button
              onClick={() => shareToTwitter({
                title: '2026 개발자 운세',
                text: shareText,
                url: shareUrl,
              })}
              className="flex items-center justify-center gap-3 rounded-lg bg-sky-500 px-6 py-4 text-lg font-semibold text-white transition-colors hover:bg-sky-600"
            >
              <span className="text-2xl">🐦</span>
              <span>트위터 공유</span>
            </button>

            {/* 카카오톡 공유 */}
            <button
              onClick={() => shareToKakao({
                title: '2026 개발자 운세',
                text: shareText,
                url: shareUrl,
              }, shareImageUrl || undefined)}
              className="flex items-center justify-center gap-3 rounded-lg bg-yellow-500 px-6 py-4 text-lg font-semibold text-gray-900 transition-colors hover:bg-yellow-600"
            >
              <span className="text-2xl">💬</span>
              <span>카카오톡 공유</span>
            </button>

            {/* 링크 복사 */}
            <button
              onClick={() => copyLink(shareUrl)}
              className="flex items-center justify-center gap-3 rounded-lg bg-gray-700 px-6 py-4 text-lg font-semibold text-white transition-colors hover:bg-gray-600"
            >
              <span className="text-2xl">🔗</span>
              <span>링크 복사</span>
            </button>
          </div>

          {/* 안내 문구 */}
          <div className="mt-6 rounded-lg bg-blue-900/30 p-4 text-center text-sm text-blue-200">
            💡 친구들과 운세를 비교해보세요! #DevFortune2026
          </div>
        </div>
      </div>
    </>
  );
}
