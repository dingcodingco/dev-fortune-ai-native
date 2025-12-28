package com.devfortune.backend.service;

import com.devfortune.backend.dto.FortuneRequest;
import com.devfortune.backend.enums.Archetype;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 아키타입 결정 서비스
 */
@Service
@Slf4j
public class ArchetypeService {

    /**
     * 퀴즈 답변을 기반으로 아키타입 결정
     *
     * @param answers 퀴즈 답변 리스트
     * @return 결정된 아키타입
     */
    public Archetype determineArchetype(List<FortuneRequest.QuizAnswer> answers) {
        // 각 아키타입별 점수 계산
        Map<Archetype, Integer> scores = new HashMap<>();
        for (Archetype archetype : Archetype.values()) {
            scores.put(archetype, 0);
        }

        // 각 질문의 답변을 아키타입 점수로 변환
        for (FortuneRequest.QuizAnswer answer : answers) {
            updateScores(scores, answer);
        }

        // 가장 높은 점수의 아키타입 선택
        Archetype selectedArchetype = Archetype.BUG_HUNTER; // 기본값
        int maxScore = 0;

        for (Map.Entry<Archetype, Integer> entry : scores.entrySet()) {
            if (entry.getValue() > maxScore) {
                maxScore = entry.getValue();
                selectedArchetype = entry.getKey();
            }
        }

        log.info("Determined archetype: {} with score: {}", selectedArchetype.getId(), maxScore);
        log.debug("All scores: {}", scores);

        return selectedArchetype;
    }

    /**
     * 답변을 기반으로 아키타입 점수 업데이트
     */
    private void updateScores(Map<Archetype, Integer> scores, FortuneRequest.QuizAnswer answer) {
        String questionId = answer.getQuestionId();
        String optionId = answer.getOptionId();
        int value = answer.getValue();

        // 질문별로 아키타입 매핑
        switch (questionId) {
            case "q1": // 버그 발견 시 행동
                handleBugQuestion(scores, optionId, value);
                break;
            case "q2": // 야근 상황
                handleOvertimeQuestion(scores, optionId, value);
                break;
            case "q3": // 새로운 기술 학습
                handleTechQuestion(scores, optionId, value);
                break;
            case "q4": // 코드 리뷰
                handleCodeReviewQuestion(scores, optionId, value);
                break;
            case "q5": // 개발 도구
                handleToolQuestion(scores, optionId, value);
                break;
            default:
                log.warn("Unknown question id: {}", questionId);
        }
    }

    /**
     * Q1: 버그 발견 시 행동
     */
    private void handleBugQuestion(Map<Archetype, Integer> scores, String optionId, int value) {
        switch (optionId) {
            case "opt1": // 즉시 수정 - BUG_HUNTER
                scores.put(Archetype.BUG_HUNTER, scores.get(Archetype.BUG_HUNTER) + 3);
                break;
            case "opt2": // 이슈 등록 - TEAM_PLAYER
                scores.put(Archetype.TEAM_PLAYER, scores.get(Archetype.TEAM_PLAYER) + 3);
                break;
            case "opt3": // 일단 넘어감 - FIRE_FIGHTER
                scores.put(Archetype.FIRE_FIGHTER, scores.get(Archetype.FIRE_FIGHTER) + 2);
                scores.put(Archetype.PEACEFUL_DEV, scores.get(Archetype.PEACEFUL_DEV) + 1);
                break;
            case "opt4": // 문서화 - TRADITIONAL
                scores.put(Archetype.TRADITIONAL, scores.get(Archetype.TRADITIONAL) + 3);
                break;
        }
    }

    /**
     * Q2: 야근 상황
     */
    private void handleOvertimeQuestion(Map<Archetype, Integer> scores, String optionId, int value) {
        switch (optionId) {
            case "opt1": // 끝까지 - FIRE_FIGHTER
                scores.put(Archetype.FIRE_FIGHTER, scores.get(Archetype.FIRE_FIGHTER) + 3);
                break;
            case "opt2": // 정시 퇴근 - PEACEFUL_DEV
                scores.put(Archetype.PEACEFUL_DEV, scores.get(Archetype.PEACEFUL_DEV) + 3);
                break;
            case "opt3": // 팀과 상의 - TEAM_PLAYER
                scores.put(Archetype.TEAM_PLAYER, scores.get(Archetype.TEAM_PLAYER) + 3);
                break;
            case "opt4": // 프로세스 개선 - TRADITIONAL
                scores.put(Archetype.TRADITIONAL, scores.get(Archetype.TRADITIONAL) + 2);
                scores.put(Archetype.BUG_HUNTER, scores.get(Archetype.BUG_HUNTER) + 1);
                break;
        }
    }

    /**
     * Q3: 새로운 기술 학습
     */
    private void handleTechQuestion(Map<Archetype, Integer> scores, String optionId, int value) {
        switch (optionId) {
            case "opt1": // 바로 도입 - AI_NATIVE
                scores.put(Archetype.AI_NATIVE, scores.get(Archetype.AI_NATIVE) + 3);
                break;
            case "opt2": // 검토 후 도입 - TRADITIONAL
                scores.put(Archetype.TRADITIONAL, scores.get(Archetype.TRADITIONAL) + 2);
                scores.put(Archetype.TEAM_PLAYER, scores.get(Archetype.TEAM_PLAYER) + 1);
                break;
            case "opt3": // 필요시만 - PEACEFUL_DEV
                scores.put(Archetype.PEACEFUL_DEV, scores.get(Archetype.PEACEFUL_DEV) + 2);
                scores.put(Archetype.FIRE_FIGHTER, scores.get(Archetype.FIRE_FIGHTER) + 1);
                break;
            case "opt4": // 기존 기술 선호 - TRADITIONAL
                scores.put(Archetype.TRADITIONAL, scores.get(Archetype.TRADITIONAL) + 3);
                break;
        }
    }

    /**
     * Q4: 코드 리뷰
     */
    private void handleCodeReviewQuestion(Map<Archetype, Integer> scores, String optionId, int value) {
        switch (optionId) {
            case "opt1": // 꼼꼼히 리뷰 - BUG_HUNTER
                scores.put(Archetype.BUG_HUNTER, scores.get(Archetype.BUG_HUNTER) + 3);
                break;
            case "opt2": // 빠르게 승인 - FIRE_FIGHTER
                scores.put(Archetype.FIRE_FIGHTER, scores.get(Archetype.FIRE_FIGHTER) + 2);
                scores.put(Archetype.PEACEFUL_DEV, scores.get(Archetype.PEACEFUL_DEV) + 1);
                break;
            case "opt3": // 팀 논의 - TEAM_PLAYER
                scores.put(Archetype.TEAM_PLAYER, scores.get(Archetype.TEAM_PLAYER) + 3);
                break;
            case "opt4": // 가이드라인 확인 - TRADITIONAL
                scores.put(Archetype.TRADITIONAL, scores.get(Archetype.TRADITIONAL) + 3);
                break;
        }
    }

    /**
     * Q5: 개발 도구
     */
    private void handleToolQuestion(Map<Archetype, Integer> scores, String optionId, int value) {
        switch (optionId) {
            case "opt1": // AI 도구 적극 사용 - AI_NATIVE
                scores.put(Archetype.AI_NATIVE, scores.get(Archetype.AI_NATIVE) + 3);
                break;
            case "opt2": // 필요시만 AI 사용 - TRADITIONAL
                scores.put(Archetype.TRADITIONAL, scores.get(Archetype.TRADITIONAL) + 1);
                scores.put(Archetype.PEACEFUL_DEV, scores.get(Archetype.PEACEFUL_DEV) + 1);
                break;
            case "opt3": // 전통적 도구 - TRADITIONAL
                scores.put(Archetype.TRADITIONAL, scores.get(Archetype.TRADITIONAL) + 3);
                break;
            case "opt4": // 팀 표준 - TEAM_PLAYER
                scores.put(Archetype.TEAM_PLAYER, scores.get(Archetype.TEAM_PLAYER) + 2);
                scores.put(Archetype.TRADITIONAL, scores.get(Archetype.TRADITIONAL) + 1);
                break;
        }
    }
}
