# 2026 Developer Fortune - Product Requirements Document (PRD)

**문서 버전:** v1.0  
**작성일:** 2024년 12월 24일  
**프로젝트명:** 2026 Developer Fortune (개발자 신수대통)  
**작성자:** Product Team  
**검토자:** Engineering Lead  

---

## 📋 Executive Summary (개요)

### 제품 개요

**2026 Developer Fortune**은 개발자들의 일상 고충을 재미있는 운세로 승화시켜, 자연스러운 공유를 유도하는 **개발자 특화 신년 운세 서비스**입니다. 

사용자가 **5개의 밈 기반 퀴즈**에 답하면, AI가 **2026년 버그 수, 야근 횟수, 코드리뷰 운, 배포 운세** 등을 Spotify Wrapped 스타일로 생성하고, 공유 가능한 카드로 제공합니다.

### 핵심 가치 제안 (Value Proposition)

```
Before: 뻔한 신년 운세 ("올해는 행운이...")
After: 개발자 공감 100% 운세 ("금요일 배포 23회 생존 예상")

- 재미: 개발자 밈 + 현실적 예측
- 공유 욕구: "나 버그 234개래 ㅋㅋ 너는?"
- 팀 결속: 단톡방에서 함께 보는 재미
```

### MVP 목표

- **런칭 시점:** 2026년 12월 28일 라이브 코딩 (2시간 완성)
- **타겟 MAU:** 1,000명 (첫 2주)
- **PMF 검증 기준:** 공유율 35%+, 완료율 80%+

---

## 🎯 Problem Statement (해결하려는 문제)

### Problem 1: 기존 운세 서비스의 무관심

```
현상: 일반 운세는 개발자에게 와닿지 않음
원인: "연애운", "재물운" 같은 일반적 주제
영향: 흥미 없음, 공유 안 함, 즉시 이탈
```

### Problem 2: 신년 시즌 참여 콘텐츠 부재

```
현상: 12월 말 개발자 커뮤니티 활동 감소
원인: 연말 휴가, 특별한 이벤트 없음
영향: 커뮤니티 활성도 저하
```

### Problem 3: AI 활용 데모의 어려움

```
현상: AI 개발을 배우고 싶지만 뭘 만들지 모름
원인: 복잡한 예제는 2시간에 불가능
영향: 학습 포기, 실습 기회 상실
```

**→ 해결책: 개발자가 공감하는 재미있는 운세를 AI로 2시간에 완성**

---

## 👥 Target Users (타겟 사용자)

### Primary Persona 1: "AI 배우고 싶은 중급 개발자" 김개발 (27세)

```
직업: 스타트업 백엔드 개발자 (경력 3년)
기술 스택: Spring Boot, React
연봉: 5,500만원

Pain Points:
- ChatGPT 써봤지만 간단한 것만 물어봄
- 실제 프로젝트에 AI 적용 방법 모름
- "AI 시대에 뒤처지는 건 아닐까?" 불안

Needs:
- 2시간 안에 완성 가능한 실습 프로젝트
- 회사에서 바로 쓸 수 있는 AI 패턴
- 포트폴리오에 추가할 만한 결과물

Value Delivered:
- AI 개발 워크플로우 체득
- 실제 배포된 서비스 1개 확보
- 팀에 공유할 수 있는 노하우
```

### Secondary Persona 2: "재미 찾는 시니어 개발자" 박시니어 (34세)

```
직업: 핀테크 리드 개발자 (경력 10년)
기술 스택: Java, TypeScript, AWS
연봉: 9,000만원

Pain Points:
- 개발이 지루해짐 (반복 업무)
- 팀 분위기 메이커 역할 필요
- 신년 이벤트 아이디어 고민

Needs:
- 팀원들과 함께 즐길 콘텐츠
- 가볍게 웃을 수 있는 개발자 유머
- 빠르게 만들어서 팀에 공유

Value Delivered:
- 팀 단톡방에서 화제
- "시니어님 센스 좋으시네요"
- 개발 재미 회복
```

---

## 📊 Goals & Success Metrics (목표와 성공 지표)

### North Star Metric

**"운세 결과를 공유한 사용자 수"**

- 목표: 공유율 35%+ (완료자 중)

### HEART Framework Metrics

| Category | Metric | Target | 측정 방법 |
|----------|--------|--------|-----------|
| **Happiness** | 재미도 평가 | 4.5/5.0 | 결과 확인 후 "재미있었나요?" |
| | 공감도 | 90%+ | "이거 나네 ㅋㅋ" 반응률 |
| **Engagement** | 퀴즈 완료율 | 80%+ | 시작 → 5문제 완료 |
| | 결과 정독 시간 | 2분+ | 스크롤 깊이 |
| **Adoption** | 신규 유입 | 1,000명 | 첫 2주 |
| | 바이럴 계수 | 1.3+ | 초대 링크 클릭/공유 |
| **Retention** | 재방문 (친구 결과) | 15%+ | 7일 내 재접속 |
| | 팀 비교 기능 사용 | 10%+ | 팀 만들기 클릭 |
| **Task Success** | 완료 시간 | 90초 이하 | 시작 → 결과 확인 |
| | 공유 성공률 | 95%+ | 공유 버튼 → 실제 공유 |

---

## 🎯 MVP Feature Specifications (기능 명세)

### User Story 1: 개발자 성향 퀴즈

```
As a 개발자
I want 5개의 재미있는 질문에 답하고 싶다
So that 나의 개발 스타일을 파악할 수 있다
```

**Acceptance Criteria:**

```
AC1: Given 사용자가 랜딩 페이지에 접속했을 때
     When "운세 보러가기" 버튼을 클릭하면
     Then 첫 번째 질문 화면으로 이동한다

AC2: Given 사용자가 질문 화면에 있을 때
     When 선택지 A, B, C, D 중 하나를 클릭하면
     Then 다음 질문으로 자동 넘어간다 (0.3초 transition)

AC3: Given 사용자가 5번째 질문에 답했을 때
     When 마지막 선택을 완료하면
     Then "점치는 중..." 로딩 화면으로 전환된다

AC4: Given 사용자가 질문 도중 뒤로가기를 원할 때
     When 이전 버튼을 클릭하면
     Then 이전 질문으로 돌아가며 기존 답변이 유지된다

AC5: Given 질문이 5개 모두 제시될 때
     When 각 질문마다 개발자 밈 이미지가 표시되고
     Then 선택지마다 적절한 이모지가 포함된다
```

**질문 리스트:**

1. 버그 발견 시 반응 (디버깅 성향)
2. 금요일 PM 요청 (워라밸 성향)
3. 프로덕션 에러 대응 (위기 관리)
4. 코드 리뷰 태도 (협업 성향)
5. AI 도구 사용 (기술 수용도)

---

### User Story 2: AI 운세 생성 (Core Feature)

```
As a 개발자
I want AI가 나의 2026년 개발자 운세를 생성해주길 원한다
So that 재미있고 공감되는 예측을 받을 수 있다
```

**Acceptance Criteria:**

```
AC1: Given 사용자가 5개 질문을 완료했을 때
     When AI 운세 생성이 시작되면
     Then 30초 이내에 전체 운세가 생성 완료된다

AC2: Given AI가 운세를 생성할 때
     When 사용자의 선택지 조합을 분석하여
     Then 6가지 아키타입 중 1개를 배정한다

AC3: Given 운세 데이터가 생성될 때
     When Structured Output (JSON 스키마)을 사용하여
     Then 파싱 에러 없이 정확한 형식으로 반환된다

AC4: Given 운세가 생성될 때
     When 다음 6가지 카테고리를 모두 포함하고
     Then 각 카테고리마다 구체적인 숫자와 조언이 있다
     - 버그 운세 (총 버그 수, 프로덕션 버그 수)
     - 야근 운세 (예상 횟수, 위험 월)
     - 기술 스택 운세 (배울 기술, 습득률)
     - 코드 리뷰 운세 (총 코멘트, LGTM 확률)
     - GitHub 운세 (커밋 수, 최장 스트릭)
     - 회의 운세 (총 회의, 필요한 회의 비율)

AC5: Given 생성된 운세 메시지가 표시될 때
     When 개발자 밈 문구가 포함되고 ("이게 왜 되지?", "금요일 배포" 등)
     Then 현실적이면서도 유머러스한 톤이 유지된다
```

**6가지 아키타입 (실제 구현 — `Archetype` enum 기준):**

`ArchetypeService`가 5개 질문(q1~q5) 답변 점수를 합산해 아래 6개 중 하나를 배정합니다.
응답의 `archetype` 필드에는 enum의 `id`(케밥케이스 문자열)가, `archetypeName`/`archetypeDescription`에는 한국어 표기가 들어갑니다.

| enum 상수 | id (`archetype`) | 표시 이름 (`archetypeName`) | 설명 |
|-----------|------------------|------------------------------|------|
| `BUG_HUNTER` | `bug-hunter` | 버그 헌터 | 버그를 찾는 데 탁월한 개발자 |
| `PEACEFUL_DEV` | `peaceful-dev` | 평화주의 개발자 | 워라밸을 중시하는 개발자 |
| `FIRE_FIGHTER` | `fire-fighter` | 소방관 | 긴급 상황에 강한 개발자 |
| `TEAM_PLAYER` | `team-player` | 팀 플레이어 | 협업을 중시하는 개발자 |
| `AI_NATIVE` | `ai-native` | AI 네이티브 | AI 도구를 적극 활용하는 개발자 |
| `TRADITIONAL` | `traditional` | 전통주의자 | 검증된 방식을 선호하는 개발자 |

> 친근한 별칭(예: "금요일 배포 생존자", "Vibe Coder")을 노출하고 싶다면, 위 6개 enum에 1:1로 매핑되는
> 디스플레이 레이어로 추가하세요. 별도의 상충하는 아키타입 집합을 새로 만들지 않습니다.

---

### User Story 3: 운세 결과 Streaming UI

```
As a 사용자
I want 운세가 실시간으로 타이핑되는 걸 보고 싶다
So that 점쟁이가 말하는 듯한 몰입감을 느낄 수 있다
```

**Acceptance Criteria:**

```
AC1: Given AI가 운세를 생성할 때
     When Streaming API를 사용하여
     Then 텍스트가 실시간으로 한 글자씩 표시된다

AC2: Given 로딩 중일 때
     When 재미있는 로딩 메시지가 랜덤으로 표시되고
     Then 매 2초마다 메시지가 변경된다
     예: "세미콜론 개수 세는 중...", "커피 소비량 예측 중..."

AC3: Given 각 카테고리 운세가 표시될 때
     When 프로그레스 바 애니메이션이 함께 표시되고
     Then 숫자가 0에서 최종값까지 카운트업 된다

AC4: Given 운세 생성이 완료되면
     When 전체 내용이 한 화면에 정리되고
     Then 스크롤하여 모든 카테고리를 확인할 수 있다
```

---

### User Story 4: 공유 기능

```
As a 사용자
I want 내 운세 결과를 친구들에게 공유하고 싶다
So that 함께 비교하며 즐길 수 있다
```

**Acceptance Criteria:**

```
AC1: Given 운세 결과 화면에서
     When "공유하기" 버튼을 클릭하면
     Then 공유 카드 이미지가 자동 생성된다 (Canvas API)

AC2: Given 공유 카드가 생성될 때
     When 다음 정보가 포함되고
     Then 1280×720px 이미지로 다운로드 가능하다
     - 아키타입 이름
     - 핵심 통계 4개 (커피, 버그, 커밋, 금요일 생존)
     - 한 줄 조언
     - #DevFortune2026 해시태그

AC3: Given 사용자가 공유 옵션을 선택할 때
     When 트위터, 카카오톡, 이미지 다운로드 중 선택하면
     Then 각 플랫폼에 최적화된 공유가 실행된다

AC4: Given 공유 링크를 통해 접속한 새 사용자가 있을 때
     When 원본 사용자의 운세 결과를 미리보기로 보여주고
     Then "나도 해보기" CTA 버튼을 명확히 표시한다
```

---

### User Story 5: 팀 비교 기능 (Out of Scope — Phase 2)

> **상태: 미구현 (Phase 2로 연기).** 현재 저장소에는 `teams`/`team_members` 테이블도,
> 팀 관련 컨트롤러/엔드포인트도 존재하지 않습니다. 아래 명세는 향후 Phase 2 설계 초안으로만 남겨둡니다.

```
As a 개발자
I want 우리 팀원들 운세를 모아서 비교하고 싶다
So that 팀 단톡방에서 함께 즐길 수 있다
```

**Acceptance Criteria:**

```
AC1: Given 결과 화면에서
     When "팀 비교하기" 버튼을 클릭하면
     Then 팀 생성 화면으로 이동한다

AC2: Given 팀을 생성할 때
     When 팀 이름을 입력하고 초대 링크를 생성하면
     Then 고유한 팀 URL이 발급된다

AC3: Given 팀원들이 각자 운세를 확인했을 때
     When 팀 페이지에 접속하면
     Then 팀원별 운세를 비교할 수 있는 대시보드가 표시된다
     - 누가 버그를 제일 많이 만들까?
     - 누가 야근을 제일 많이 할까?
     - 평균 대비 본인 위치

AC4: Given 팀 비교 결과가 표시될 때
     When 재미있는 순위와 코멘트가 자동 생성되고
     Then 팀 전체 공유 카드도 생성 가능하다
```

---

## 🏗️ Technical Architecture (기술 아키텍처)

> **참고:** 이 섹션은 실제 구현(as-built)에 맞춰 기술합니다. 프론트엔드(Next.js)와 백엔드(Spring Boot REST API)는 **분리된 별도 애플리케이션**이며, 백엔드가 직접 Anthropic Claude API를 호출하고 PostgreSQL에 저장합니다.

### Tech Stack

```
Frontend (frontend/):
- Framework: Next.js 16 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- State: Zustand (경량 상태 관리)
- Canvas: html2canvas (공유 카드 생성)
- 백엔드 연동: REST 호출 (NEXT_PUBLIC_API_URL, 기본 http://localhost:8080/api)

Backend (backend/):
- Framework: Spring Boot 3.2.12 (Java 17), Gradle
- Web: spring-boot-starter-web + spring-boot-starter-webflux(WebClient)
- 영속성: Spring Data JPA (Hibernate, PostgreSQL dialect)
- 스키마 관리: JPA ddl-auto (dev=create-drop, prod=validate, 기본=update)
  · db/migration/V1__Initial_Schema.sql 파일이 저장소에 포함되어 있으나,
    현재 Flyway 의존성은 빌드에 포함되어 있지 않아 자동 실행되지 않음(Phase 2 도입 검토)
- Database: PostgreSQL
- AI: Anthropic Claude API (claude-3-5-haiku-20241022), Messages API 직접 호출

Infrastructure (terraform/, .github/):
- 배포: AWS ECS(Fargate) + ALB + ECR, RDS(PostgreSQL), VPC (Terraform 모듈)
- CI/CD: GitHub Actions
- 환경: dev / staging / prod

Optional (Phase 2):
- Sentry (에러 트래킹)
- Langfuse (AI 비용 모니터링)
```

### System Architecture

```
[Client - Next.js (frontend/)]
      │  REST (POST /api/fortune 등)
      ▼
[Backend - Spring Boot REST API (backend/)]
  ├─ FortuneController → FortuneService
  │     ├─ ArchetypeService (퀴즈 답변 → 아키타입 결정)
  │     └─ ClaudeService    → [Anthropic Claude API]
  └─ Spring Data JPA
        ▼
[PostgreSQL]
  ├─ fortunes (운세 + 6개 카테고리 결과)
  └─ quiz_answers (퀴즈 답변, fortunes FK)
```

**아키텍처 선택 이유:**

- 분리된 Spring Boot 백엔드: 도메인 로직(아키타입 결정·운세 저장)을 Java로 명확히 관리, Next.js는 UI에 집중
- JPA ddl-auto: 단일 데이터 모델을 코드(엔티티) 기준으로 관리, 2시간 라이브에서 마이그레이션 도구 셋업 생략
- Claude Haiku: 빠른 응답(1-2초), 저렴한 비용
- AWS ECS + Terraform: 프론트/백엔드 컨테이너를 IaC로 일관되게 배포

---

## 🔌 API Specifications (API 명세)

> 모든 경로에는 서버 context-path `/api`가 적용됩니다 (`server.servlet.context-path: /api`).
> 아래 명세는 실제 `FortuneController` / `HealthController` 구현 기준입니다.

### API 1: 운세 생성 및 저장 (Core)

```
POST /api/fortune

설명: 퀴즈 답변을 받아 (1) 아키타입을 결정하고 (2) Claude API로 운세를 생성한 뒤
      (3) PostgreSQL에 저장하고 (4) 생성된 운세를 응답으로 반환한다.
      (스트리밍이 아닌 단일 JSON 응답)

Request (FortuneRequest):
{
  "answers": [
    { "questionId": "q1", "optionId": "opt1", "value": 3 },
    { "questionId": "q2", "optionId": "opt2", "value": 2 },
    { "questionId": "q3", "optionId": "opt1", "value": 4 },
    { "questionId": "q4", "optionId": "opt3", "value": 1 },
    { "questionId": "q5", "optionId": "opt1", "value": 4 }
  ]
}

Response (FortuneResponse) — 아키타입 + 6개 카테고리:
{
  "archetype": "ai-native",
  "archetypeName": "AI 네이티브",
  "archetypeDescription": "AI 도구를 적극 활용하는 개발자",
  "bugFortune":        { "totalBugs": 234, "productionBugs": 3,  "advice": "...", "memeMessage": "이게 왜 되지?" },
  "overtimeFortune":   { "expectedCount": 12, "riskMonth": "3월", "advice": "...", "memeMessage": "..." },
  "techStackFortune":  { "techToLearn": "TypeScript", "masteryPercentage": 70, "advice": "...", "memeMessage": "..." },
  "codeReviewFortune": { "totalComments": 120, "lgtmProbability": 80, "advice": "...", "memeMessage": "LGTM (눈감고)" },
  "gitHubFortune":     { "totalCommits": 673, "longestStreak": 37, "advice": "...", "memeMessage": "..." },
  "meetingFortune":    { "totalMeetings": 90, "necessaryPercentage": 40, "advice": "...", "memeMessage": "..." }
}
```

### API 2: 운세 조회

```
GET  /api/fortune/{id}                  # ID로 단일 운세 조회 (Fortune 엔티티 반환)
GET  /api/fortune/archetype/{archetypeId}  # 아키타입 ID(bug-hunter 등)별 운세 목록
GET  /api/fortune/health                # 운세 API 헬스체크 → "Fortune API is running"
```

### API 3: 서비스 헬스체크

```
GET  /api/health        # { status: "UP", service, timestamp, version }
GET  /api/health/ping   # "pong"
```

> **참고:** 별도의 운세 저장 엔드포인트(`/save`)는 없습니다 — 저장은 `POST /api/fortune` 내부에서 함께 처리됩니다.
> 공유 카드 생성은 프론트엔드(html2canvas)에서 수행되며 서버 엔드포인트가 없습니다.
> 팀 생성/조회 API는 현재 구현되어 있지 않습니다 (아래 User Story 5 및 Out of Scope 참조).

---

## 💾 Data Model (데이터 모델)

> 실제 스키마는 JPA 엔티티(`Fortune`, `QuizAnswer`)로 정의되며, `db/migration/V1__Initial_Schema.sql`에
> 동일한 PostgreSQL DDL이 포함되어 있습니다. 아래는 그 PostgreSQL DDL입니다 (PostgreSQL 문법:
> 인덱스는 `CREATE INDEX`를 **별도 문장**으로 분리, MySQL식 인라인 `INDEX ...`를 쓰지 않습니다).

### Table: fortunes

운세 결과를 저장합니다. 6개 카테고리는 JSONB가 아니라 카테고리별 **평탄화된 컬럼**으로 저장됩니다.

```sql
CREATE TABLE IF NOT EXISTS fortunes (
    id BIGSERIAL PRIMARY KEY,
    archetype VARCHAR(50) NOT NULL,
    archetype_name VARCHAR(100) NOT NULL,
    archetype_description TEXT NOT NULL,

    -- 버그 운세
    bug_total_bugs INTEGER,
    bug_production_bugs INTEGER,
    bug_advice TEXT,
    bug_meme_message VARCHAR(500),

    -- 야근 운세
    overtime_expected_count INTEGER,
    overtime_risk_month VARCHAR(50),
    overtime_advice TEXT,
    overtime_meme_message VARCHAR(500),

    -- 기술 스택 운세
    tech_stack_to_learn VARCHAR(200),
    tech_mastery_percentage INTEGER,
    tech_advice TEXT,
    tech_meme_message VARCHAR(500),

    -- 코드 리뷰 운세
    code_review_total_comments INTEGER,
    code_review_lgtm_probability INTEGER,
    code_review_advice TEXT,
    code_review_meme_message VARCHAR(500),

    -- GitHub 운세
    github_total_commits INTEGER,
    github_longest_streak INTEGER,
    github_advice TEXT,
    github_meme_message VARCHAR(500),

    -- 회의 운세
    meeting_total_meetings INTEGER,
    meeting_necessary_percentage INTEGER,
    meeting_advice TEXT,
    meeting_meme_message VARCHAR(500),

    -- 메타데이터
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_fortunes_archetype ON fortunes (archetype);
CREATE INDEX idx_fortunes_created_at ON fortunes (created_at);
```

### Table: quiz_answers

퀴즈 답변을 운세(`fortunes`)와 1:N으로 연결합니다.

```sql
CREATE TABLE IF NOT EXISTS quiz_answers (
    id BIGSERIAL PRIMARY KEY,
    question_id VARCHAR(50) NOT NULL,
    option_id VARCHAR(50) NOT NULL,
    value INTEGER NOT NULL,
    fortune_id BIGINT NOT NULL,

    CONSTRAINT fk_fortune
        FOREIGN KEY (fortune_id)
        REFERENCES fortunes(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_quiz_answers_fortune_id ON quiz_answers (fortune_id);
```

### Table: teams / team_members (Out of Scope — Phase 2)

> **미구현.** 팀 비교 기능(User Story 5)은 Phase 2로 연기되어 있으며, 해당 테이블은 아직 만들어지지 않았습니다.
> 향후 도입 시 위와 동일한 PostgreSQL 문법(인덱스는 별도 `CREATE INDEX` 문장)을 따릅니다.

---

## 🎨 UI/UX Specifications

### 디자인 시스템

```
Colors:
- Background: #0F1824 (다크 네이비)
- Primary: #00F5FF (일렉트릭 시안) - AI
- Secondary: #FFD700 (골드) - 운세
- Accent: #FF6B35 (오렌지) - 강조
- Text: #FFFFFF (흰색)
- Muted: #888888 (회색)

Typography:
- Headings: Pretendard ExtraBold
- Body: Pretendard Regular
- Code/Stats: JetBrains Mono

Components (shadcn/ui):
- Button, Card, Progress, Badge
- Dialog (공유 모달)
- Tabs (카테고리 전환)
```

### 화면 구성

```
1. Landing Page
   - "2026 개발자 신수대통" 타이틀
   - "운세 보러가기" CTA
   - 이미 N명 확인 (Social Proof)

2. Quiz Page (5 screens)
   - 질문 + 밈 이미지
   - 4개 선택지
   - 진행률 표시 (1/5, 2/5...)

3. Loading Page
   - 터미널 스타일 로딩
   - 재미있는 메시지 랜덤 표시
   - 프로그레스 바

4. Result Page
   - 아키타입 카드
   - 통계 (Spotify Wrapped 스타일)
   - 6개 카테고리 운세
   - 행운 아이템
   - 올해의 조언

5. Share Page
   - 공유 카드 프리뷰
   - 트위터/카톡/다운로드 버튼
   - 팀 비교 CTA
```

---

## ⚙️ Non-Functional Requirements (비기능 요구사항)

### NFR-1: 성능

```
응답 시간:
- 퀴즈 페이지 로드: < 1초
- AI 운세 생성 시작: < 2초
- 전체 완료: < 30초

처리량:
- 동시 사용자: 100명 (MVP)
- API 요청: 10 req/sec

최적화:
- Next.js Image Optimization
- Supabase Connection Pooling
- Claude API Response Caching (동일 답변 조합)
```

### NFR-2: 보안

```
데이터 보호:
- HTTPS 필수 (Vercel 기본)
- Supabase Row Level Security
- API Rate Limiting (IP당 10회/분)

개인정보:
- 이름: 선택사항
- 저장 기간: 30일 후 자동 삭제
- 사용자 동의 없이 외부 공유 금지
```

### NFR-3: 확장성

> as-built 인프라는 AWS ECS(Fargate) + ALB + RDS(PostgreSQL) (Terraform `dev/staging/prod`)입니다.
> 아래 비용 수치는 초기 기획 단계의 추정치로, 실제 AWS 비용 모델과 다를 수 있습니다.

```
MVP (0-1K users):
- AWS ECS Fargate (최소 태스크) + RDS(PostgreSQL) 소형 인스턴스
- Claude API: 사용량 기반

Growth (1K-10K users):
- ECS 태스크 오토스케일링 + RDS 인스턴스 상향
- Claude API ($50/월 예상)
```

### NFR-4: 모니터링

```
필수:
- Vercel Analytics (기본 트래픽)
- Error Boundary (프론트 에러 캐치)
- Console.log (개발 단계)

선택 (Phase 2):
- Sentry (에러 트래킹)
- Langfuse (AI 비용/성능)
- PostHog (사용자 행동 분석)
```

---

## 🚫 Out of Scope (MVP 범위 밖)

### Phase 2 이후 개발

```
❌ 로그인/회원가입 (MVP는 익명 사용)
❌ 운세 히스토리 (본인 과거 운세 조회)
❌ 커뮤니티 기능 (댓글, 좋아요)
❌ 유료 프리미엄 (상세 분석, 일일 운세)
❌ 푸시 알림 ("오늘의 개발운" 알림)
❌ 다국어 지원 (MVP는 한국어만)
❌ 모바일 앱 (웹만)
❌ 실시간 채팅 (운세 상담)
❌ 개인화 (과거 코딩 패턴 기반 분석)
```

### 의도적 제외 사유

```
이유 1: 2시간 MVP 집중
- 코어 기능(운세 생성 + 공유)만 완벽하게
- 부가 기능은 검증 후 추가

이유 2: 리소스 제약
- 라이브 코딩: 2시간
- 개발자: 1명 (+ AI)
- 예산: $0

이유 3: 빠른 검증
- "개발자들이 재미있어 할까?" 먼저 확인
- PMF 달성 후 확장
```

---

## ⚠️ Risks & Constraints (리스크 및 제약사항)

### 리스크 1: AI API 비용 폭발

```
문제:
- 사용자 1,000명 × $0.01 = $10/일
- 월 $300 예상

대응:
- Claude Haiku 사용 (Sonnet 대비 1/10 비용)
- Prompt Caching (90% 비용 절감)
- 동일 답변 조합 결과 캐싱 (24시간)
- Rate Limiting (IP당 10회/일)
```

### 리스크 2: 운세 품질 (재미 없음)

```
문제:
- AI가 뻔한 운세 생성
- 개발자 공감 못함
- 공유 안 함

대응:
- System Prompt에 개발자 밈 100개 포함
- Few-shot Learning (좋은 예시 5개)
- 현실적 숫자 범위 제한 (버그 100-500개)
- 사람이 직접 검증 후 런칭
```

### 리스크 3: 2시간 시간 초과

```
문제:
- 라이브 중 에러 발생
- 예상보다 구현 복잡
- 시간 부족

대응:
- 사전 리허설 3회
- 각 단계별 완성 코드 백업 (Git 브랜치)
- 핵심 기능 우선 (팀 비교는 시간 남으면)
- 보일러플레이트 미리 준비
```

### 리스크 4: 바이럴 실패

```
문제:
- 아무도 공유 안 함
- 단톡방에서 반응 없음

대응:
- 공유 장벽 최소화 (클릭 1번)
- 공유 문구 자동 생성 ("나는 버그 234개래 ㅋㅋ")
- 팀 비교 기능으로 2차 확산
- 라이브 참가자들이 1차 시드 유저
```

---

## 📅 Development Timeline (2시간 라이브 일정)

```
00:00 - 00:10 | 인트로 & 완성 데모
00:10 - 00:30 | Spring Boot 백엔드 + PostgreSQL(JPA) 연동
00:30 - 00:50 | Claude API 연동 + Prompt Engineering
00:50 - 01:00 | 휴식 + Q&A

01:00 - 01:25 | 퀴즈 UI + Streaming 구현
01:25 - 01:40 | 결과 화면 + 공유 기능
01:40 - 01:50 | AWS ECS 배포 (GitHub Actions) + 실제 테스트
01:50 - 02:00 | 마무리 + GitHub 공개
```

---

## ✅ MVP Success Criteria (성공 기준)

```
런칭 후 2주 내 달성 목표:

필수 (MUST):
✅ MAU 1,000명
✅ 완료율 80%+ (시작 → 결과 확인)
✅ 공유율 35%+
✅ 재미도 평가 4.5/5.0

중요 (SHOULD):
✅ 팀 비교 사용 10%+
✅ 에러율 < 1%
✅ 평균 완료 시간 90초 이하

추가 (NICE):
✅ 바이럴 계수 1.3+
✅ 개발자 커뮤니티 입소문
✅ "10x AI Native Developer" 강의 전환 5%+
```

---

## 📚 Appendix (부록)

### A. Prompt Engineering 가이드

```
System Prompt 구조:

## Role
당신은 20년 경력의 개발자 운세 전문가입니다.

## Context
- 대상: 1년 이상 경력 개발자
- 목적: 2026년 신년 운세 제공
- 톤: 현실적 + 유머러스 + 위트

## Rules
1. 지나치게 낙관적이지 않음
2. 구체적 숫자 포함 (버그 수, 커밋 수)
3. 개발자 밈 적절히 활용
4. "열심히 하세요" 같은 뻔한 조언 금지

## Output Format
JSON 스키마 준수 (Structured Output)
```

### B. 개발자 밈 데이터베이스

```
버그 관련:
- "이게 왜 되지...?"
- "Works on my machine"
- "It's not a bug, it's a feature"

배포 관련:
- "금요일 배포"
- "Hotfix at 2AM"
- "Never deploy on Friday"

코드 리뷰:
- "LGTM (눈감고)"
- "Nitpick: ..."
- "Already merged"

AI 관련:
- "Vibe Coding"
- "ChatGPT가 제 시니어"
- "3번째 시도에 성공"
```

### C. 개발 환경 세팅

```
Repository: https://github.com/dingcodingco/dev-fortune-ai-native

Quick Start (모노레포 — 백엔드 + 프론트엔드 분리):

# Backend (Spring Boot)
cd backend
export ANTHROPIC_API_KEY=...        # Claude API 키
export DATABASE_URL=jdbc:postgresql://localhost:5432/devfortune
./gradlew bootRun                   # http://localhost:8080/api

# Frontend (Next.js)
cd frontend
npm install
npm run dev                          # http://localhost:3000

Frontend env (frontend/.env.local):
NEXT_PUBLIC_API_URL=http://localhost:8080/api   # 백엔드 REST 베이스 URL

Backend env:
ANTHROPIC_API_KEY=                   # Claude API 키 (필수)
ANTHROPIC_MODEL=claude-3-5-haiku-20241022  # 기본값
DATABASE_URL=                        # PostgreSQL JDBC URL
DATABASE_USERNAME= / DATABASE_PASSWORD=
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

---

## ✅ Approval (승인)

| 역할 | 이름 | 날짜 |
|------|------|------|
| Product Lead | 현준 | 2024-12-24 |
| Engineering | 현준 | 2024-12-24 |
| AI Partner | Claude | 2024-12-24 |

---

**이 PRD는 2시간 라이브 코딩에서 즉시 구현 가능한 수준으로 작성되었습니다.**

**다음 액션:**
1. 이 PRD 기반으로 Jira 티켓 생성
2. 라이브 리허설 (2회)
3. 12월 28일 라이브 진행 🚀