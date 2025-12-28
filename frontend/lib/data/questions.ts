import { QuizQuestion } from '@/lib/types/quiz';

/**
 * 개발자 성향 퀴즈 질문 데이터
 * 5개 질문, 각 4개 선택지
 */
export const quizQuestions: QuizQuestion[] = [
  {
    id: 'debugging',
    category: '디버깅 성향',
    question: '🐛 코드 리뷰 중 버그를 발견했을 때 당신의 반응은?',
    options: [
      {
        id: 'A',
        text: '"이게 왜 되지?" 하며 즉시 디버거 켜기',
        emoji: '🔍',
        value: 10,
      },
      {
        id: 'B',
        text: '일단 console.log() 찍어보고 생각하기',
        emoji: '📝',
        value: 7,
      },
      {
        id: 'C',
        text: 'Stack Overflow 검색부터',
        emoji: '🔎',
        value: 5,
      },
      {
        id: 'D',
        text: 'ChatGPT한테 물어보기',
        emoji: '🤖',
        value: 3,
      },
    ],
  },
  {
    id: 'worklife',
    category: '워라밸 성향',
    question: '💼 금요일 오후 5시, PM이 "급한 요청"을 보냈다면?',
    options: [
      {
        id: 'A',
        text: '"월요일에 할게요" (칼퇴근)',
        emoji: '🏃',
        value: 10,
      },
      {
        id: 'B',
        text: '30분만 더 보고 판단하기',
        emoji: '⏰',
        value: 7,
      },
      {
        id: 'C',
        text: '일단 받아들이고 주말에 할지 고민',
        emoji: '😰',
        value: 5,
      },
      {
        id: 'D',
        text: '당연히 바로 시작 (주말 근무 각오)',
        emoji: '💪',
        value: 3,
      },
    ],
  },
  {
    id: 'crisis',
    category: '위기 관리',
    question: '🔥 프로덕션에서 500 에러가 폭주한다면?',
    options: [
      {
        id: 'A',
        text: '침착하게 로그 확인 후 롤백',
        emoji: '🧊',
        value: 10,
      },
      {
        id: 'B',
        text: 'Slack에 헬프 요청하며 동시에 조사',
        emoji: '🆘',
        value: 7,
      },
      {
        id: 'C',
        text: '일단 서버 재시작하고 모니터링',
        emoji: '🔄',
        value: 5,
      },
      {
        id: 'D',
        text: '패닉 상태로 모든 변경사항 되돌리기',
        emoji: '😱',
        value: 3,
      },
    ],
  },
  {
    id: 'review',
    category: '협업 성향',
    question: '👥 코드 리뷰에서 당신의 스타일은?',
    options: [
      {
        id: 'A',
        text: '상세한 피드백과 개선 제안 (장문)',
        emoji: '📚',
        value: 10,
      },
      {
        id: 'B',
        text: '중요한 부분만 콕 집어서 코멘트',
        emoji: '🎯',
        value: 7,
      },
      {
        id: 'C',
        text: '"LGTM" + 이모지 하나',
        emoji: '👍',
        value: 5,
      },
      {
        id: 'D',
        text: '코드 리뷰... 그게 뭐죠?',
        emoji: '🤷',
        value: 3,
      },
    ],
  },
  {
    id: 'ai-tools',
    category: '기술 수용도',
    question: '🤖 AI 코딩 도구 (GitHub Copilot, ChatGPT 등) 사용은?',
    options: [
      {
        id: 'A',
        text: '모든 코드를 AI와 함께 작성',
        emoji: '🚀',
        value: 10,
      },
      {
        id: 'B',
        text: '보일러플레이트나 간단한 로직만',
        emoji: '⚡',
        value: 7,
      },
      {
        id: 'C',
        text: '가끔 막힐 때만 참고',
        emoji: '💡',
        value: 5,
      },
      {
        id: 'D',
        text: '내 손으로 직접 짜야 진짜 실력',
        emoji: '✍️',
        value: 3,
      },
    ],
  },
];

/**
 * 총 질문 수
 */
export const TOTAL_QUESTIONS = quizQuestions.length;

/**
 * 특정 질문 가져오기
 */
export function getQuestion(index: number): QuizQuestion | undefined {
  return quizQuestions[index];
}

/**
 * 질문 ID로 질문 가져오기
 */
export function getQuestionById(id: string): QuizQuestion | undefined {
  return quizQuestions.find((q) => q.id === id);
}
