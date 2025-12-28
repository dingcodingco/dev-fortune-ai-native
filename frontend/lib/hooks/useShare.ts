'use client';

import { useState } from 'react';
import { toPng } from 'html-to-image';

interface ShareOptions {
  title: string;
  text: string;
  url: string;
}

export function useShare() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [shareImageUrl, setShareImageUrl] = useState<string | null>(null);

  /**
   * HTML 요소를 이미지로 변환
   * html-to-image 라이브러리 사용 (Tailwind CSS 4 lab() 지원)
   */
  const generateShareImage = async (elementId: string = 'share-card'): Promise<string> => {
    setIsGenerating(true);

    try {
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error('Share card element not found');
      }

      // html-to-image로 PNG 데이터 URL 생성
      const dataUrl = await toPng(element, {
        cacheBust: true, // 캐시 방지
        pixelRatio: 2, // 고해상도
      });

      setShareImageUrl(dataUrl);
      return dataUrl;
    } catch (error) {
      console.error('Failed to generate share image:', error);
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  /**
   * 이미지 다운로드
   */
  const downloadImage = async (elementId?: string) => {
    try {
      const url = shareImageUrl || await generateShareImage(elementId);

      const link = document.createElement('a');
      link.href = url;
      link.download = `dev-fortune-2026-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to download image:', error);
      alert('이미지 다운로드에 실패했습니다.');
    }
  };

  /**
   * 트위터 공유
   */
  const shareToTwitter = (options: ShareOptions) => {
    const text = encodeURIComponent(`${options.text}\n\n${options.url}`);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&hashtags=DevFortune2026`;
    window.open(twitterUrl, '_blank');
  };

  /**
   * 카카오톡 공유
   */
  const shareToKakao = async (options: ShareOptions, imageUrl?: string) => {
    // 카카오 SDK 체크
    if (typeof window === 'undefined' || !(window as any).Kakao) {
      alert('카카오톡 공유 기능을 사용할 수 없습니다.');
      return;
    }

    try {
      const finalImageUrl = imageUrl || shareImageUrl;

      (window as any).Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: options.title,
          description: options.text,
          imageUrl: finalImageUrl || 'https://devfortune.vercel.app/og-image.png',
          link: {
            mobileWebUrl: options.url,
            webUrl: options.url,
          },
        },
        buttons: [
          {
            title: '나도 해보기',
            link: {
              mobileWebUrl: options.url,
              webUrl: options.url,
            },
          },
        ],
      });
    } catch (error) {
      console.error('Failed to share to Kakao:', error);
      alert('카카오톡 공유에 실패했습니다.');
    }
  };

  /**
   * 네이티브 공유 API (모바일)
   */
  const shareNative = async (options: ShareOptions, blob?: Blob) => {
    if (!navigator.share) {
      alert('이 브라우저는 공유 기능을 지원하지 않습니다.');
      return;
    }

    try {
      const shareData: ShareData = {
        title: options.title,
        text: options.text,
        url: options.url,
      };

      // 이미지가 있으면 추가
      if (blob) {
        const file = new File([blob], 'dev-fortune-2026.png', { type: 'image/png' });
        shareData.files = [file];
      }

      await navigator.share(shareData);
    } catch (error) {
      console.error('Failed to share natively:', error);
      alert('공유에 실패했습니다.');
    }
  };

  /**
   * 링크 복사
   */
  const copyLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      alert('링크가 복사되었습니다!');
    } catch (error) {
      console.error('Failed to copy link:', error);
      alert('링크 복사에 실패했습니다.');
    }
  };

  return {
    isGenerating,
    shareImageUrl,
    generateShareImage,
    downloadImage,
    shareToTwitter,
    shareToKakao,
    shareNative,
    copyLink,
  };
}
