package com.devfortune.backend.controller;

import com.devfortune.backend.dto.FortuneRequest;
import com.devfortune.backend.dto.FortuneResponse;
import com.devfortune.backend.entity.Fortune;
import com.devfortune.backend.service.FortuneService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * 운세 생성 API 컨트롤러
 */
@RestController
@RequestMapping("/fortune")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "${cors.allowed-origins:http://localhost:3000}")
public class FortuneController {

    private final FortuneService fortuneService;

    /**
     * 퀴즈 답변을 기반으로 운세 생성 및 저장
     *
     * @param request 퀴즈 답변 정보
     * @return 생성된 운세 데이터
     */
    @PostMapping
    public ResponseEntity<FortuneResponse> generateFortune(@Valid @RequestBody FortuneRequest request) {
        try {
            log.info("Received fortune generation request with {} answers", request.getAnswers().size());

            FortuneResponse fortune = fortuneService.generateAndSaveFortune(request);

            log.info("Successfully generated and saved fortune for archetype: {}", fortune.getArchetype());
            return ResponseEntity.ok(fortune);

        } catch (Exception e) {
            log.error("Error generating fortune", e);
            throw new RuntimeException("Failed to generate fortune: " + e.getMessage());
        }
    }

    /**
     * ID로 운세 조회
     */
    @GetMapping("/{id}")
    public ResponseEntity<Fortune> getFortuneById(@PathVariable Long id) {
        try {
            Fortune fortune = fortuneService.getFortuneById(id);
            return ResponseEntity.ok(fortune);
        } catch (Exception e) {
            log.error("Error getting fortune by id: {}", id, e);
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * 아키타입별 운세 목록 조회
     */
    @GetMapping("/archetype/{archetypeId}")
    public ResponseEntity<Iterable<Fortune>> getFortunesByArchetype(@PathVariable String archetypeId) {
        try {
            Iterable<Fortune> fortunes = fortuneService.getFortunesByArchetype(archetypeId);
            return ResponseEntity.ok(fortunes);
        } catch (Exception e) {
            log.error("Error getting fortunes by archetype: {}", archetypeId, e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * 헬스체크 엔드포인트
     */
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Fortune API is running");
    }
}
