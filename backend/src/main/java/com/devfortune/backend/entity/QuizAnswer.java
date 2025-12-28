package com.devfortune.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 퀴즈 답변 엔티티
 */
@Entity
@Table(name = "quiz_answers")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 질문 ID (q1, q2, q3, q4, q5)
     */
    @Column(nullable = false, length = 50)
    private String questionId;

    /**
     * 선택한 옵션 ID
     */
    @Column(nullable = false, length = 50)
    private String optionId;

    /**
     * 옵션 점수 (1-4)
     */
    @Column(nullable = false)
    private Integer value;

    /**
     * 연관된 운세
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fortune_id", nullable = false)
    private Fortune fortune;
}
