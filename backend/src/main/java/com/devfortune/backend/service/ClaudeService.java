package com.devfortune.backend.service;

import com.devfortune.backend.config.ClaudeConfig;
import com.devfortune.backend.dto.FortuneRequest;
import com.devfortune.backend.dto.FortuneResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Claude API 서비스
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class ClaudeService {

    private final ClaudeConfig claudeConfig;
    private final ObjectMapper objectMapper;

    private static final String ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
    private static final String ANTHROPIC_VERSION = "2023-06-01";

    /**
     * 운세 생성 프롬프트 생성
     */
    private String buildFortunePrompt(FortuneRequest request) {
        // 답변 정보 수집
        int totalScore = request.getAnswers().stream()
                .mapToInt(FortuneRequest.QuizAnswer::getValue)
                .sum();

        StringBuilder prompt = new StringBuilder();
        prompt.append("당신은 개발자들의 2026년 운세를 재미있고 공감 가게 생성하는 AI 점쟁이입니다.\n\n");
        prompt.append("다음은 개발자가 선택한 5가지 질문의 답변입니다:\n\n");

        for (FortuneRequest.QuizAnswer answer : request.getAnswers()) {
            prompt.append(String.format("- %s: 옵션 %s (점수: %d)\n",
                    answer.getQuestionId(), answer.getOptionId(), answer.getValue()));
        }

        prompt.append(String.format("\n총점: %d점\n\n", totalScore));
        prompt.append("이 개발자의 성향을 분석하여 2026년 운세를 JSON 형식으로 생성해주세요.\n\n");
        prompt.append("다음 6가지 카테고리를 포함해야 합니다:\n");
        prompt.append("1. 버그 운세 (totalBugs, productionBugs, advice, memeMessage)\n");
        prompt.append("2. 야근 운세 (expectedCount, riskMonth, advice, memeMessage)\n");
        prompt.append("3. 기술 스택 운세 (techToLearn, masteryPercentage, advice, memeMessage)\n");
        prompt.append("4. 코드 리뷰 운세 (totalComments, lgtmProbability, advice, memeMessage)\n");
        prompt.append("5. GitHub 운세 (totalCommits, longestStreak, advice, memeMessage)\n");
        prompt.append("6. 회의 운세 (totalMeetings, necessaryPercentage, advice, memeMessage)\n\n");
        prompt.append("각 카테고리의 memeMessage는 개발자 밈 문구를 포함해야 합니다 ");
        prompt.append("(예: \"이게 왜 되지?\", \"금요일 배포는 위험해요\", \"로컬에서는 잘 됐는데...\" 등)\n\n");
        prompt.append("응답은 반드시 다음 JSON 형식이어야 합니다:\n");
        prompt.append("```json\n");
        prompt.append("{\n");
        prompt.append("  \"archetype\": \"아키타입 ID\",\n");
        prompt.append("  \"archetypeName\": \"아키타입 이름\",\n");
        prompt.append("  \"archetypeDescription\": \"아키타입 설명\",\n");
        prompt.append("  \"bugFortune\": {\n");
        prompt.append("    \"totalBugs\": 숫자,\n");
        prompt.append("    \"productionBugs\": 숫자,\n");
        prompt.append("    \"advice\": \"조언 문자열\",\n");
        prompt.append("    \"memeMessage\": \"밈 메시지 문자열\"\n");
        prompt.append("  },\n");
        prompt.append("  \"overtimeFortune\": {\n");
        prompt.append("    \"expectedCount\": 숫자,\n");
        prompt.append("    \"riskMonth\": \"월 이름 문자열 (예: 3월)\",\n");
        prompt.append("    \"advice\": \"조언 문자열\",\n");
        prompt.append("    \"memeMessage\": \"밈 메시지 문자열\"\n");
        prompt.append("  },\n");
        prompt.append("  \"techStackFortune\": {\n");
        prompt.append("    \"techToLearn\": \"기술 이름 문자열 (예: TypeScript)\",\n");
        prompt.append("    \"masteryPercentage\": 숫자,\n");
        prompt.append("    \"advice\": \"조언 문자열\",\n");
        prompt.append("    \"memeMessage\": \"밈 메시지 문자열\"\n");
        prompt.append("  },\n");
        prompt.append("  \"codeReviewFortune\": {\n");
        prompt.append("    \"totalComments\": 숫자,\n");
        prompt.append("    \"lgtmProbability\": 숫자,\n");
        prompt.append("    \"advice\": \"조언 문자열\",\n");
        prompt.append("    \"memeMessage\": \"밈 메시지 문자열\"\n");
        prompt.append("  },\n");
        prompt.append("  \"gitHubFortune\": {\n");
        prompt.append("    \"totalCommits\": 숫자,\n");
        prompt.append("    \"longestStreak\": 숫자,\n");
        prompt.append("    \"advice\": \"조언 문자열\",\n");
        prompt.append("    \"memeMessage\": \"밈 메시지 문자열\"\n");
        prompt.append("  },\n");
        prompt.append("  \"meetingFortune\": {\n");
        prompt.append("    \"totalMeetings\": 숫자,\n");
        prompt.append("    \"necessaryPercentage\": 숫자,\n");
        prompt.append("    \"advice\": \"조언 문자열\",\n");
        prompt.append("    \"memeMessage\": \"밈 메시지 문자열\"\n");
        prompt.append("  }\n");
        prompt.append("}\n");
        prompt.append("```\n\n");
        prompt.append("중요: techToLearn은 반드시 문자열이어야 합니다 (배열 아님). 예: \"TypeScript\", \"React\", \"Kubernetes\" 등");

        return prompt.toString();
    }

    /**
     * Claude API를 사용하여 운세 생성
     */
    public FortuneResponse generateFortune(FortuneRequest request) {
        try {
            log.info("Generating fortune with Claude API");

            String prompt = buildFortunePrompt(request);

            // API 요청 본문 생성
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", claudeConfig.getModel());
            requestBody.put("max_tokens", claudeConfig.getMaxTokens());
            requestBody.put("temperature", claudeConfig.getTemperature());
            requestBody.put("messages", List.of(
                    Map.of("role", "user", "content", prompt)
            ));

            // WebClient로 API 호출
            WebClient webClient = WebClient.builder()
                    .baseUrl(ANTHROPIC_API_URL)
                    .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                    .defaultHeader("x-api-key", claudeConfig.getApiKey())
                    .defaultHeader("anthropic-version", ANTHROPIC_VERSION)
                    .build();

            String response = webClient.post()
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            log.debug("Claude API response: {}", response);

            // 응답 파싱
            JsonNode jsonResponse = objectMapper.readTree(response);
            JsonNode content = jsonResponse.get("content").get(0).get("text");
            String fortuneJson = content.asText();

            // JSON 코드 블록 제거 (```json ... ``` 형식)
            if (fortuneJson.contains("```json")) {
                fortuneJson = fortuneJson.substring(
                        fortuneJson.indexOf("```json") + 7,
                        fortuneJson.lastIndexOf("```")
                ).trim();
            } else if (fortuneJson.contains("```")) {
                fortuneJson = fortuneJson.substring(
                        fortuneJson.indexOf("```") + 3,
                        fortuneJson.lastIndexOf("```")
                ).trim();
            }

            // FortuneResponse로 변환
            FortuneResponse fortune = objectMapper.readValue(fortuneJson, FortuneResponse.class);

            log.info("Fortune generated successfully for archetype: {}", fortune.getArchetype());
            return fortune;

        } catch (Exception e) {
            log.error("Error generating fortune with Claude API", e);
            throw new RuntimeException("Failed to generate fortune: " + e.getMessage(), e);
        }
    }
}
