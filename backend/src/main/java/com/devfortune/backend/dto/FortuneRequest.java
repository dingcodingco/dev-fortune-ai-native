package com.devfortune.backend.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * 운세 생성 요청 DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FortuneRequest {

    /**
     * 퀴즈 답변 목록 (5개)
     */
    @NotNull(message = "Answers are required")
    @Size(min = 5, max = 5, message = "Exactly 5 answers are required")
    private List<QuizAnswer> answers;

    /**
     * 퀴즈 답변
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuizAnswer {
        /**
         * 질문 ID (debugging, worklife, crisis, review, ai-tools)
         */
        @NotNull(message = "Question ID is required")
        private String questionId;

        /**
         * 선택한 옵션 ID (A, B, C, D)
         */
        @NotNull(message = "Option ID is required")
        private String optionId;

        /**
         * 답변 점수 (3, 5, 7, 10)
         */
        @NotNull(message = "Value is required")
        private Integer value;
    }
}
