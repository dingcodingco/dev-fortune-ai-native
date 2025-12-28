package com.devfortune.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 운세 생성 응답 DTO
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FortuneResponse {

    /**
     * 아키타입 (bug-hunter, peaceful-dev, fire-fighter, team-player, ai-native, traditional)
     */
    private String archetype;

    /**
     * 아키타입 이름
     */
    private String archetypeName;

    /**
     * 아키타입 설명
     */
    private String archetypeDescription;

    /**
     * 버그 운세
     */
    private BugFortune bugFortune;

    /**
     * 야근 운세
     */
    private OvertimeFortune overtimeFortune;

    /**
     * 기술 스택 운세
     */
    private TechStackFortune techStackFortune;

    /**
     * 코드 리뷰 운세
     */
    private CodeReviewFortune codeReviewFortune;

    /**
     * GitHub 운세
     */
    private GitHubFortune gitHubFortune;

    /**
     * 회의 운세
     */
    private MeetingFortune meetingFortune;

    /**
     * 버그 운세 상세
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BugFortune {
        private Integer totalBugs;
        private Integer productionBugs;
        private String advice;
        private String memeMessage;
    }

    /**
     * 야근 운세 상세
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OvertimeFortune {
        private Integer expectedCount;
        private String riskMonth;
        private String advice;
        private String memeMessage;
    }

    /**
     * 기술 스택 운세 상세
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TechStackFortune {
        private String techToLearn;
        private Integer masteryPercentage;
        private String advice;
        private String memeMessage;
    }

    /**
     * 코드 리뷰 운세 상세
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CodeReviewFortune {
        private Integer totalComments;
        private Integer lgtmProbability;
        private String advice;
        private String memeMessage;
    }

    /**
     * GitHub 운세 상세
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class GitHubFortune {
        private Integer totalCommits;
        private Integer longestStreak;
        private String advice;
        private String memeMessage;
    }

    /**
     * 회의 운세 상세
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MeetingFortune {
        private Integer totalMeetings;
        private Integer necessaryPercentage;
        private String advice;
        private String memeMessage;
    }
}
