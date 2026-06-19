package com.devfortune.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

/**
 * 애플리케이션 컨텍스트 로드 스모크 테스트.
 *
 * <p>외부 PostgreSQL 없이 동작하도록 'test' 프로파일에서 인메모리 H2(PostgreSQL 호환 모드)와
 * 더미 Anthropic API 키를 사용한다. 실제 외부 API 호출은 발생하지 않으며, 모든 빈이 정상적으로
 * 생성되고 컨텍스트가 부팅되는지만 검증한다.</p>
 */
@SpringBootTest
@ActiveProfiles("test")
class DevFortuneApplicationTests {

    @Test
    void contextLoads() {
        // Spring 컨텍스트가 정상적으로 로드되면 통과
    }
}
