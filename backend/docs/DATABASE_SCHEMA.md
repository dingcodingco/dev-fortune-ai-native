# Database Schema Documentation

## Overview
개발자 운세 애플리케이션의 데이터베이스 스키마 설계 문서입니다.

## Entity Relationship Diagram

```
┌─────────────────┐
│    fortunes     │
│─────────────────│
│ id (PK)         │
│ archetype       │
│ archetype_name  │
│ archetype_desc  │
│ ...fortune data │
│ created_at      │
│ updated_at      │
└─────────────────┘
         │
         │ 1:N
         │
         ▼
┌─────────────────┐
│  quiz_answers   │
│─────────────────│
│ id (PK)         │
│ question_id     │
│ option_id       │
│ value           │
│ fortune_id (FK) │
└─────────────────┘
```

## Tables

### fortunes
운세 데이터를 저장하는 메인 테이블

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| id | BIGSERIAL | NO | Primary Key |
| archetype | VARCHAR(50) | NO | 아키타입 ID (bug-hunter, peaceful-dev, fire-fighter, team-player, ai-native, traditional) |
| archetype_name | VARCHAR(100) | NO | 아키타입 이름 (한글) |
| archetype_description | TEXT | NO | 아키타입 설명 |
| bug_total_bugs | INTEGER | YES | 버그 운세: 총 버그 수 |
| bug_production_bugs | INTEGER | YES | 버그 운세: 프로덕션 버그 수 |
| bug_advice | TEXT | YES | 버그 운세: 조언 |
| bug_meme_message | VARCHAR(500) | YES | 버그 운세: 밈 메시지 |
| overtime_expected_count | INTEGER | YES | 야근 운세: 예상 횟수 |
| overtime_risk_month | VARCHAR(50) | YES | 야근 운세: 위험 월 |
| overtime_advice | TEXT | YES | 야근 운세: 조언 |
| overtime_meme_message | VARCHAR(500) | YES | 야근 운세: 밈 메시지 |
| tech_stack_to_learn | VARCHAR(200) | YES | 기술 스택 운세: 배울 기술 |
| tech_mastery_percentage | INTEGER | YES | 기술 스택 운세: 숙련도 % |
| tech_advice | TEXT | YES | 기술 스택 운세: 조언 |
| tech_meme_message | VARCHAR(500) | YES | 기술 스택 운세: 밈 메시지 |
| code_review_total_comments | INTEGER | YES | 코드 리뷰 운세: 총 코멘트 수 |
| code_review_lgtm_probability | INTEGER | YES | 코드 리뷰 운세: LGTM 확률 % |
| code_review_advice | TEXT | YES | 코드 리뷰 운세: 조언 |
| code_review_meme_message | VARCHAR(500) | YES | 코드 리뷰 운세: 밈 메시지 |
| github_total_commits | INTEGER | YES | GitHub 운세: 총 커밋 수 |
| github_longest_streak | INTEGER | YES | GitHub 운세: 최장 연속 일수 |
| github_advice | TEXT | YES | GitHub 운세: 조언 |
| github_meme_message | VARCHAR(500) | YES | GitHub 운세: 밈 메시지 |
| meeting_total_meetings | INTEGER | YES | 회의 운세: 총 회의 수 |
| meeting_necessary_percentage | INTEGER | YES | 회의 운세: 필요한 회의 비율 % |
| meeting_advice | TEXT | YES | 회의 운세: 조언 |
| meeting_meme_message | VARCHAR(500) | YES | 회의 운세: 밈 메시지 |
| created_at | TIMESTAMP | NO | 생성 일시 |
| updated_at | TIMESTAMP | NO | 수정 일시 |

### quiz_answers
퀴즈 답변을 저장하는 테이블

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| id | BIGSERIAL | NO | Primary Key |
| question_id | VARCHAR(50) | NO | 질문 ID (q1, q2, q3, q4, q5) |
| option_id | VARCHAR(50) | NO | 선택한 옵션 ID |
| value | INTEGER | NO | 옵션 점수 (1-4) |
| fortune_id | BIGINT | NO | Foreign Key → fortunes.id |

## Indexes

- `idx_fortunes_archetype`: 아키타입별 조회 최적화
- `idx_fortunes_created_at`: 생성일시 기준 정렬 최적화
- `idx_quiz_answers_fortune_id`: 운세별 퀴즈 답변 조회 최적화

## Constraints

- `fk_fortune`: quiz_answers.fortune_id → fortunes.id (CASCADE DELETE)

## Triggers

- `update_fortunes_updated_at`: fortunes 테이블 업데이트 시 updated_at 자동 갱신

## Design Decisions

### 1. Denormalized Fortune Categories
각 운세 카테고리(버그, 야근, 기술스택 등)를 별도 테이블로 분리하지 않고 fortunes 테이블에 포함시킨 이유:
- **성능**: JOIN 없이 한 번의 쿼리로 모든 운세 데이터 조회 가능
- **단순성**: 운세는 항상 6개 카테고리를 모두 포함하므로 정규화의 이점이 적음
- **유지보수**: 스키마 구조가 단순하여 이해와 관리가 용이

### 2. Separate quiz_answers Table
퀴즈 답변을 별도 테이블로 분리한 이유:
- **정규화**: 5개의 답변을 반복적으로 저장하는 것보다 효율적
- **확장성**: 향후 질문 개수 변경 시 스키마 수정 불필요
- **분석**: 답변 패턴 분석 및 통계 조회 용이

### 3. Archetype as String
아키타입을 enum 대신 문자열로 저장한 이유:
- **유연성**: 새로운 아키타입 추가 시 데이터베이스 마이그레이션 불필요
- **호환성**: API 응답과 데이터베이스 스키마 일관성 유지

## Migration Strategy

### Development
- JPA의 `ddl-auto: update` 사용하여 자동 스키마 생성
- 개발 환경에서는 스키마 변경 시 자동 반영

### Production
- Flyway 또는 Liquibase를 사용한 버전 관리형 마이그레이션
- `V1__Initial_Schema.sql` 파일을 시작점으로 사용

## Example Queries

### 운세 저장
```sql
INSERT INTO fortunes (
    archetype, archetype_name, archetype_description,
    bug_total_bugs, bug_production_bugs, bug_advice, bug_meme_message,
    -- ... other fields
    created_at, updated_at
) VALUES (
    'bug-hunter', '버그 헌터', '버그를 찾는 데 탁월한 개발자',
    100, 20, '테스트 코드를 작성하세요', '이게 왜 되지?',
    -- ... other values
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
);
```

### 퀴즈 답변 저장
```sql
INSERT INTO quiz_answers (question_id, option_id, value, fortune_id)
VALUES
    ('q1', 'opt1', 1, 1),
    ('q2', 'opt3', 3, 1),
    ('q3', 'opt2', 2, 1),
    ('q4', 'opt4', 4, 1),
    ('q5', 'opt1', 1, 1);
```

### 운세 조회 (퀴즈 답변 포함)
```sql
SELECT f.*, qa.question_id, qa.option_id, qa.value
FROM fortunes f
LEFT JOIN quiz_answers qa ON f.id = qa.fortune_id
WHERE f.id = 1;
```

### 아키타입별 통계
```sql
SELECT archetype, COUNT(*) as count
FROM fortunes
GROUP BY archetype
ORDER BY count DESC;
```

## Future Enhancements

1. **User Authentication**: 사용자 테이블 추가 및 운세-사용자 연관
2. **Sharing**: 운세 공유 기능을 위한 share_tokens 테이블
3. **Analytics**: 답변 패턴 분석을 위한 statistics 테이블
4. **Versioning**: 운세 버전 관리를 위한 fortune_versions 테이블
