package com.devfortune.backend.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

/**
 * Claude API 설정
 */
@Configuration
@Getter
public class ClaudeConfig {

    @Value("${anthropic.api.key}")
    private String apiKey;

    @Value("${anthropic.api.model:claude-3-5-haiku-20241022}")
    private String model;

    @Value("${anthropic.api.max-tokens:4096}")
    private Integer maxTokens;

    @Value("${anthropic.api.temperature:0.7}")
    private Double temperature;
}
