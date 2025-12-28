'use client';

import { FortuneResponse } from '@/lib/types/fortune';

interface ShareCardProps {
  fortune: FortuneResponse;
}

/**
 * 공유용 카드 컴포넌트 (1280x720px)
 * html2canvas 호환을 위해 inline style 사용 (Tailwind 사용 X)
 */
export function ShareCard({ fortune }: ShareCardProps) {
  return (
    <div
      id="share-card"
      style={{
        position: 'relative',
        width: '1280px',
        height: '720px',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #4c1d95 0%, #1e3a8a 50%, #312e81 100%)',
        padding: '48px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* 배경 패턴 */}
      <div style={{
        position: 'absolute',
        inset: '0',
        opacity: 0.1,
        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }} />

      {/* 콘텐츠 */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}>
        {/* 헤더 */}
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <h1 style={{
            fontSize: '60px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '8px',
          }}>
            2026 개발자 운세
          </h1>
          <p style={{
            fontSize: '24px',
            color: '#e9d5ff',
          }}>
            {fortune.archetypeName}
          </p>
        </div>

        {/* 아키타입 설명 */}
        <div style={{
          marginBottom: '32px',
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '24px',
        }}>
          <p style={{
            textAlign: 'center',
            fontSize: '20px',
            color: 'white',
          }}>
            {fortune.archetypeDescription}
          </p>
        </div>

        {/* 핵심 통계 4개 - 2x2 그리드 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          marginBottom: '32px',
        }}>
          {/* 버그 수 */}
          <div style={{
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '24px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>🐛</div>
            <div style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '8px',
            }}>
              {fortune.bugFortune.totalBugs}개
            </div>
            <div style={{ fontSize: '18px', color: '#e9d5ff' }}>
              예상 버그 수
            </div>
          </div>

          {/* 커밋 수 */}
          <div style={{
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '24px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>💻</div>
            <div style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '8px',
            }}>
              {fortune.gitHubFortune.totalCommits}개
            </div>
            <div style={{ fontSize: '18px', color: '#e9d5ff' }}>
              연간 커밋 수
            </div>
          </div>

          {/* 야근 횟수 */}
          <div style={{
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '24px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>🌙</div>
            <div style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '8px',
            }}>
              {fortune.overtimeFortune.expectedCount}회
            </div>
            <div style={{ fontSize: '18px', color: '#e9d5ff' }}>
              예상 야근
            </div>
          </div>

          {/* 회의 수 */}
          <div style={{
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '24px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>📅</div>
            <div style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '8px',
            }}>
              {fortune.meetingFortune.totalMeetings}회
            </div>
            <div style={{ fontSize: '18px', color: '#e9d5ff' }}>
              연간 회의
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <div style={{ marginTop: 'auto', textAlign: 'center' }}>
          <div style={{
            marginBottom: '8px',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#d8b4fe',
          }}>
            #DevFortune2026
          </div>
          <div style={{ fontSize: '18px', color: '#e9d5ff' }}>
            devfortune.vercel.app
          </div>
        </div>
      </div>
    </div>
  );
}
