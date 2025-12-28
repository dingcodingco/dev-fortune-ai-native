import { FortuneResponse } from '@/lib/types/fortune';
import { QuizAnswer } from '@/lib/types/quiz';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export interface FortuneRequest {
  answers: QuizAnswer[];
}

/**
 * 백엔드 API로 운세 생성 요청
 */
export async function generateFortune(answers: QuizAnswer[]): Promise<FortuneResponse> {
  const response = await fetch(`${API_BASE_URL}/fortune`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ answers }),
  });

  if (!response.ok) {
    throw new Error(`Failed to generate fortune: ${response.statusText}`);
  }

  return response.json();
}

/**
 * ID로 운세 조회
 */
export async function getFortune(id: number): Promise<FortuneResponse> {
  const response = await fetch(`${API_BASE_URL}/fortune/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch fortune: ${response.statusText}`);
  }

  return response.json();
}

/**
 * 아키타입별 운세 목록 조회
 */
export async function getFortunesByArchetype(archetypeId: string): Promise<FortuneResponse[]> {
  const response = await fetch(`${API_BASE_URL}/fortune/archetype/${archetypeId}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch fortunes: ${response.statusText}`);
  }

  return response.json();
}

/**
 * API 헬스체크
 */
export async function checkHealth(): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/fortune/health`);

  if (!response.ok) {
    throw new Error(`Health check failed: ${response.statusText}`);
  }

  return response.text();
}
