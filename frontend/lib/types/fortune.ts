/**
 * 운세 응답 타입 (백엔드 FortuneResponse와 동일)
 */
export interface FortuneResponse {
  archetype: string;
  archetypeName: string;
  archetypeDescription: string;
  bugFortune: BugFortune;
  overtimeFortune: OvertimeFortune;
  techStackFortune: TechStackFortune;
  codeReviewFortune: CodeReviewFortune;
  gitHubFortune: GitHubFortune;
  meetingFortune: MeetingFortune;
}

/**
 * 버그 운세
 */
export interface BugFortune {
  totalBugs: number;
  productionBugs: number;
  advice: string;
  memeMessage: string;
}

/**
 * 야근 운세
 */
export interface OvertimeFortune {
  expectedCount: number;
  riskMonth: string;
  advice: string;
  memeMessage: string;
}

/**
 * 기술 스택 운세
 */
export interface TechStackFortune {
  techToLearn: string;
  masteryPercentage: number;
  advice: string;
  memeMessage: string;
}

/**
 * 코드 리뷰 운세
 */
export interface CodeReviewFortune {
  totalComments: number;
  lgtmProbability: number;
  advice: string;
  memeMessage: string;
}

/**
 * GitHub 운세
 */
export interface GitHubFortune {
  totalCommits: number;
  longestStreak: number;
  advice: string;
  memeMessage: string;
}

/**
 * 회의 운세
 */
export interface MeetingFortune {
  totalMeetings: number;
  necessaryPercentage: number;
  advice: string;
  memeMessage: string;
}
