package com.devfortune.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * 운세 엔티티
 */
@Entity
@Table(name = "fortunes")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Fortune {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 아키타입 (bug-hunter, peaceful-dev, fire-fighter, team-player, ai-native, traditional)
     */
    @Column(nullable = false, length = 50)
    private String archetype;

    /**
     * 아키타입 이름
     */
    @Column(nullable = false, length = 100)
    private String archetypeName;

    /**
     * 아키타입 설명
     */
    @Column(nullable = false, columnDefinition = "TEXT")
    private String archetypeDescription;

    /**
     * 버그 운세 - 총 버그 수
     */
    @Column(name = "bug_total_bugs")
    private Integer bugTotalBugs;

    @Column(name = "bug_production_bugs")
    private Integer bugProductionBugs;

    @Column(name = "bug_advice", columnDefinition = "TEXT")
    private String bugAdvice;

    @Column(name = "bug_meme_message", length = 500)
    private String bugMemeMessage;

    /**
     * 야근 운세
     */
    @Column(name = "overtime_expected_count")
    private Integer overtimeExpectedCount;

    @Column(name = "overtime_risk_month", length = 50)
    private String overtimeRiskMonth;

    @Column(name = "overtime_advice", columnDefinition = "TEXT")
    private String overtimeAdvice;

    @Column(name = "overtime_meme_message", length = 500)
    private String overtimeMemeMessage;

    /**
     * 기술 스택 운세
     */
    @Column(name = "tech_stack_to_learn", length = 200)
    private String techStackToLearn;

    @Column(name = "tech_mastery_percentage")
    private Integer techMasteryPercentage;

    @Column(name = "tech_advice", columnDefinition = "TEXT")
    private String techAdvice;

    @Column(name = "tech_meme_message", length = 500)
    private String techMemeMessage;

    /**
     * 코드 리뷰 운세
     */
    @Column(name = "code_review_total_comments")
    private Integer codeReviewTotalComments;

    @Column(name = "code_review_lgtm_probability")
    private Integer codeReviewLgtmProbability;

    @Column(name = "code_review_advice", columnDefinition = "TEXT")
    private String codeReviewAdvice;

    @Column(name = "code_review_meme_message", length = 500)
    private String codeReviewMemeMessage;

    /**
     * GitHub 운세
     */
    @Column(name = "github_total_commits")
    private Integer githubTotalCommits;

    @Column(name = "github_longest_streak")
    private Integer githubLongestStreak;

    @Column(name = "github_advice", columnDefinition = "TEXT")
    private String githubAdvice;

    @Column(name = "github_meme_message", length = 500)
    private String githubMemeMessage;

    /**
     * 회의 운세
     */
    @Column(name = "meeting_total_meetings")
    private Integer meetingTotalMeetings;

    @Column(name = "meeting_necessary_percentage")
    private Integer meetingNecessaryPercentage;

    @Column(name = "meeting_advice", columnDefinition = "TEXT")
    private String meetingAdvice;

    @Column(name = "meeting_meme_message", length = 500)
    private String meetingMemeMessage;

    /**
     * 퀴즈 결과
     */
    @OneToMany(mappedBy = "fortune", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<QuizAnswer> quizAnswers = new ArrayList<>();

    /**
     * 생성 일시
     */
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    /**
     * 수정 일시
     */
    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    /**
     * 퀴즈 답변 추가
     */
    public void addQuizAnswer(QuizAnswer quizAnswer) {
        quizAnswers.add(quizAnswer);
        quizAnswer.setFortune(this);
    }

    /**
     * 퀴즈 답변 제거
     */
    public void removeQuizAnswer(QuizAnswer quizAnswer) {
        quizAnswers.remove(quizAnswer);
        quizAnswer.setFortune(null);
    }
}
