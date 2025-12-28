package com.devfortune.backend.service;

import com.devfortune.backend.dto.FortuneRequest;
import com.devfortune.backend.dto.FortuneResponse;
import com.devfortune.backend.entity.Fortune;
import com.devfortune.backend.entity.QuizAnswer;
import com.devfortune.backend.enums.Archetype;
import com.devfortune.backend.repository.FortuneRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 운세 종합 서비스
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class FortuneService {

    private final ClaudeService claudeService;
    private final ArchetypeService archetypeService;
    private final FortuneRepository fortuneRepository;

    /**
     * 운세 생성 및 저장
     *
     * @param request 퀴즈 답변
     * @return 생성된 운세
     */
    @Transactional
    public FortuneResponse generateAndSaveFortune(FortuneRequest request) {
        try {
            log.info("Starting fortune generation process with {} answers", request.getAnswers().size());

            // 1. 아키타입 결정
            Archetype archetype = archetypeService.determineArchetype(request.getAnswers());
            log.info("Determined archetype: {}", archetype.getId());

            // 2. Claude API로 운세 생성
            FortuneResponse fortuneResponse = claudeService.generateFortune(request);
            log.info("Fortune generated successfully");

            // 3. 데이터베이스에 저장
            Fortune fortune = convertToEntity(fortuneResponse, request, archetype);
            Fortune savedFortune = fortuneRepository.save(fortune);
            log.info("Fortune saved to database with id: {}", savedFortune.getId());

            // 4. 응답 반환
            return fortuneResponse;

        } catch (Exception e) {
            log.error("Error in fortune generation process", e);
            throw new RuntimeException("Failed to generate and save fortune: " + e.getMessage(), e);
        }
    }

    /**
     * FortuneResponse를 Fortune 엔티티로 변환
     */
    private Fortune convertToEntity(FortuneResponse response, FortuneRequest request, Archetype archetype) {
        Fortune fortune = Fortune.builder()
                .archetype(response.getArchetype())
                .archetypeName(response.getArchetypeName())
                .archetypeDescription(response.getArchetypeDescription())
                .build();

        // 버그 운세
        if (response.getBugFortune() != null) {
            fortune.setBugTotalBugs(response.getBugFortune().getTotalBugs());
            fortune.setBugProductionBugs(response.getBugFortune().getProductionBugs());
            fortune.setBugAdvice(response.getBugFortune().getAdvice());
            fortune.setBugMemeMessage(response.getBugFortune().getMemeMessage());
        }

        // 야근 운세
        if (response.getOvertimeFortune() != null) {
            fortune.setOvertimeExpectedCount(response.getOvertimeFortune().getExpectedCount());
            fortune.setOvertimeRiskMonth(response.getOvertimeFortune().getRiskMonth());
            fortune.setOvertimeAdvice(response.getOvertimeFortune().getAdvice());
            fortune.setOvertimeMemeMessage(response.getOvertimeFortune().getMemeMessage());
        }

        // 기술 스택 운세
        if (response.getTechStackFortune() != null) {
            fortune.setTechStackToLearn(response.getTechStackFortune().getTechToLearn());
            fortune.setTechMasteryPercentage(response.getTechStackFortune().getMasteryPercentage());
            fortune.setTechAdvice(response.getTechStackFortune().getAdvice());
            fortune.setTechMemeMessage(response.getTechStackFortune().getMemeMessage());
        }

        // 코드 리뷰 운세
        if (response.getCodeReviewFortune() != null) {
            fortune.setCodeReviewTotalComments(response.getCodeReviewFortune().getTotalComments());
            fortune.setCodeReviewLgtmProbability(response.getCodeReviewFortune().getLgtmProbability());
            fortune.setCodeReviewAdvice(response.getCodeReviewFortune().getAdvice());
            fortune.setCodeReviewMemeMessage(response.getCodeReviewFortune().getMemeMessage());
        }

        // GitHub 운세
        if (response.getGitHubFortune() != null) {
            fortune.setGithubTotalCommits(response.getGitHubFortune().getTotalCommits());
            fortune.setGithubLongestStreak(response.getGitHubFortune().getLongestStreak());
            fortune.setGithubAdvice(response.getGitHubFortune().getAdvice());
            fortune.setGithubMemeMessage(response.getGitHubFortune().getMemeMessage());
        }

        // 회의 운세
        if (response.getMeetingFortune() != null) {
            fortune.setMeetingTotalMeetings(response.getMeetingFortune().getTotalMeetings());
            fortune.setMeetingNecessaryPercentage(response.getMeetingFortune().getNecessaryPercentage());
            fortune.setMeetingAdvice(response.getMeetingFortune().getAdvice());
            fortune.setMeetingMemeMessage(response.getMeetingFortune().getMemeMessage());
        }

        // 퀴즈 답변 저장
        for (FortuneRequest.QuizAnswer answer : request.getAnswers()) {
            QuizAnswer quizAnswer = QuizAnswer.builder()
                    .questionId(answer.getQuestionId())
                    .optionId(answer.getOptionId())
                    .value(answer.getValue())
                    .build();
            fortune.addQuizAnswer(quizAnswer);
        }

        return fortune;
    }

    /**
     * ID로 운세 조회
     */
    @Transactional(readOnly = true)
    public Fortune getFortuneById(Long id) {
        return fortuneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fortune not found with id: " + id));
    }

    /**
     * 아키타입별 운세 목록 조회
     */
    @Transactional(readOnly = true)
    public Iterable<Fortune> getFortunesByArchetype(String archetypeId) {
        return fortuneRepository.findByArchetype(archetypeId);
    }
}
