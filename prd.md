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

- **런칭 시점:** 2025년 12월 28일 라이브 코딩 (2시간 완성)
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

### User Story 5: 팀 비교 기능 (선택)

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

### Tech Stack

```
Frontend:
- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS + shadcn/ui
- State: Zustand (경량 상태 관리)
- AI SDK: Vercel AI SDK (Streaming)
- Canvas: html2canvas (공유 카드 생성)

Backend:
- Framework: Spring Boot 3.2 (Java 17)
- Database: Supabase PostgreSQL
- Authentication: Supabase Auth (소셜 로그인)
- Storage: Supabase Storage (공유 이미지)
- AI: Anthropic Claude 3.5 Haiku API

Infrastructure:
- Hosting: Vercel (Frontend + API Routes)
- Database: Supabase (Managed PostgreSQL)
- CDN: Vercel Edge Network
- Monitoring: Vercel Analytics (기본)

Optional (Phase 2):
- Sentry (에러 트래킹)
- Langfuse (AI 비용 모니터링)
```

### System Architecture

```
[Client - Next.js]
      ↓
[API Routes - Next.js]
      ↓
[Claude API] ← Streaming
      ↓
[Supabase]
  ├─ Auth (소셜 로그인)
  ├─ PostgreSQL (운세 저장)
  └─ Storage (공유 이미지)
```

**아키텍처 선택 이유:**

- Next.js API Routes: 별도 백엔드 없이 풀스택 구현 (2시간 제약)
- Supabase: BaaS로 빠른 개발, 무료 티어 충분
- Claude Haiku: 빠른 응답(1-2초), 저렴한 비용($0.25/MTok)
- Vercel: Git push만으로 자동 배포

---

## 🔌 API Specifications (API 명세)

### API 1: 운세 생성 (Core)

```
POST /api/fortune/generate

Request:
{
  "answers": [
    { "questionId": 1, "choice": "A" },
    { "questionId": 2, "choice": "B" },
    ...
  ],
  "name": "김개발",
  "experience": "mid-level",
  "primaryLanguage": "TypeScript"
}

Response (Streaming):
{
  "archetype": {
    "id": "friday-survivor",
    "name": "금요일 배포 생존자",
    "description": "세상이 불타도 git push하는 용감한 전사...",
    "emoji": "⚠️"
  },
  "stats": {
    "coffee": 847,
    "bugsFound": 234,
    "bugsCreated": 235,
    "linesOfCode": 52847,
    "fridayDeploys": { "survived": 12, "total": 23 },
    "debugPhrase": 47,
    "commits": 673,
    "longestStreak": 37
  },
  "fortunes": {
    "bug": {
      "total": 234,
      "production": 3,
      "debugHours": 127,
      "dangerDates": ["2026-03-15", "2026-06-23"],
      "advice": "세미콜론을 두 번 확인하세요..."
    },
    "deploy": {
      "fridayRisk": 87,
      "safeTime": "화요일 오전 10시",
      "hotfixCount": 23,
      "advice": "금요일 오후 5시 merge 버튼..."
    },
    // ... 나머지 카테고리
  },
  "luckyItems": {
    "coffee": "아메리카노 (샷 추가)",
    "keyboard": "기계식 (청축)",
    "commitMessage": "feat: 진짜 마지막",
    "bgm": "Lo-fi Hip Hop Radio"
  },
  "advice": "이게 되네...? 라는 말을 들을 때가..."
}

Error Response:
{
  "error": "GENERATION_FAILED",
  "message": "운세 생성 중 오류가 발생했습니다",
  "retryAfter": 3
}
```

### API 2: 운세 저장

```
POST /api/fortune/save

Request:
{
  "fortuneData": { ... }, // 생성된 전체 운세
  "userId": "uuid" // optional
}

Response:
{
  "fortuneId": "f7x9k2m",
  "shareUrl": "https://devfortune.vercel.app/share/f7x9k2m",
  "createdAt": "2026-01-01T00:00:00Z"
}
```

### API 3: 공유 카드 생성

```
POST /api/fortune/share-card

Request:
{
  "fortuneId": "f7x9k2m"
}

Response:
{
  "imageUrl": "https://supabase-storage.../cards/f7x9k2m.png",
  "expiresAt": "2026-01-08T00:00:00Z"
}
```

### API 4: 팀 생성

```
POST /api/team/create

Request:
{
  "teamName": "Backend Team",
  "creatorFortuneId": "f7x9k2m"
}

Response:
{
  "teamId": "t3a8b9c",
  "inviteUrl": "https://devfortune.vercel.app/team/t3a8b9c",
  "inviteCode": "DEV2026"
}
```

---

## 💾 Data Model (데이터 모델)

### Table: fortunes

```sql
CREATE TABLE fortunes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id), -- nullable
  
  -- 입력 데이터
  answers JSONB NOT NULL, -- 퀴즈 답변
  name VARCHAR(50),
  experience VARCHAR(20), -- junior/mid/senior
  primary_language VARCHAR(30),
  
  -- 생성 결과
  archetype VARCHAR(50) NOT NULL,
  stats JSONB NOT NULL,
  fortunes JSONB NOT NULL,
  lucky_items JSONB,
  advice TEXT,
  
  -- 메타데이터
  created_at TIMESTAMP DEFAULT NOW(),
  shared_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  
  -- 인덱스
  INDEX idx_created (created_at DESC),
  INDEX idx_archetype (archetype)
);
```

### Table: teams

```sql
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_name VARCHAR(100) NOT NULL,
  invite_code VARCHAR(10) UNIQUE NOT NULL,
  creator_id UUID REFERENCES auth.users(id),
  
  created_at TIMESTAMP DEFAULT NOW(),
  member_count INTEGER DEFAULT 0,
  
  INDEX idx_invite_code (invite_code)
);
```

### Table: team_members

```sql
CREATE TABLE team_members (
  team_id UUID REFERENCES teams(id),
  fortune_id UUID REFERENCES fortunes(id),
  joined_at TIMESTAMP DEFAULT NOW(),
  
  PRIMARY KEY (team_id, fortune_id)
);
```

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

```
MVP (0-1K users):
- Vercel Free Tier
- Supabase Free Tier
- 비용: $0

Growth (1K-10K users):
- Vercel Pro ($20/월)
- Supabase Pro ($25/월)
- Claude API ($50/월 예상)
- 비용: $95/월
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
00:10 - 00:30 | Next.js 프로젝트 생성 + Supabase 연동
00:30 - 00:50 | Claude API 연동 + Prompt Engineering
00:50 - 01:00 | 휴식 + Q&A

01:00 - 01:25 | 퀴즈 UI + Streaming 구현
01:25 - 01:40 | 결과 화면 + 공유 기능
01:40 - 01:50 | Vercel 배포 + 실제 테스트
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
Repository: https://github.com/yourname/dev-fortune-2026

Quick Start:
npm create next-app@latest dev-fortune
cd dev-fortune
npm install @anthropic-ai/sdk ai zustand
npm install -D tailwindcss

Environment Variables (.env.local):
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
ANTHROPIC_API_KEY=
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