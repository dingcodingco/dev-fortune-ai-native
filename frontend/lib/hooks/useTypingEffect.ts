import { useState, useEffect } from 'react';

/**
 * 타이핑 효과를 위한 커스텀 훅
 * @param text 표시할 전체 텍스트
 * @param speed 타이핑 속도 (밀리초)
 * @param startDelay 시작 전 지연 시간 (밀리초)
 * @returns 현재까지 표시된 텍스트
 */
export function useTypingEffect(
  text: string,
  speed: number = 30,
  startDelay: number = 0
): string {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex >= text.length) return;

    const timeout = setTimeout(
      () => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      },
      currentIndex === 0 ? startDelay : speed
    );

    return () => clearTimeout(timeout);
  }, [currentIndex, text, speed, startDelay]);

  return displayedText;
}

/**
 * 숫자 카운트업 효과를 위한 커스텀 훅
 * @param end 최종 숫자
 * @param duration 애니메이션 지속 시간 (밀리초)
 * @param startDelay 시작 전 지연 시간 (밀리초)
 * @returns 현재 카운트 숫자
 */
export function useCountUp(
  end: number,
  duration: number = 1000,
  startDelay: number = 0
): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const startTime = Date.now() + startDelay;
    const endTime = startTime + duration;

    const updateCount = () => {
      const now = Date.now();

      if (now < startTime) {
        requestAnimationFrame(updateCount);
        return;
      }

      if (now >= endTime) {
        setCount(end);
        return;
      }

      const progress = (now - startTime) / duration;
      const easeOutQuad = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(end * easeOutQuad));

      requestAnimationFrame(updateCount);
    };

    requestAnimationFrame(updateCount);
  }, [end, duration, startDelay]);

  return count;
}
