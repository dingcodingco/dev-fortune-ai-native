# 2026 Developer Fortune - Backend

개발자 신수대통 백엔드 API 서버 (Spring Boot 3.2)

## 🛠️ Tech Stack

- **Framework**: Spring Boot 3.2.12
- **Language**: Java 17
- **Build Tool**: Gradle
- **Database**: PostgreSQL (Supabase)
- **ORM**: Spring Data JPA
- **Libraries**: Lombok, Validation

## 📁 Project Structure

```
src/
├── main/
│   ├── java/com/devfortune/backend/
│   │   ├── DevFortuneApplication.java   # Main Application
│   │   ├── controller/                   # REST Controllers
│   │   │   └── HealthController.java
│   │   ├── service/                      # Business Logic
│   │   ├── domain/                       # JPA Entities
│   │   └── config/                       # Configuration
│   │       └── WebConfig.java           # CORS Settings
│   └── resources/
│       ├── application.yml              # Main Config
│       ├── application-dev.yml          # Dev Profile
│       └── application-prod.yml         # Prod Profile
└── test/                                # Test Files
```

## 🚀 Getting Started

### 1. 환경 변수 설정

`.env.example`을 복사하여 `.env` 파일을 생성하세요.

```bash
cp .env.example .env
```

### 2. PostgreSQL 데이터베이스 준비

로컬 개발 환경:
```bash
# Docker를 사용하는 경우
docker run --name devfortune-postgres \
  -e POSTGRES_DB=devfortune_dev \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -d postgres:16-alpine
```

또는 Supabase 프로젝트 생성 후 연결 정보를 `.env`에 설정하세요.

### 3. 빌드 및 실행

```bash
# Gradle Wrapper 생성 (최초 1회)
gradle wrapper

# 프로젝트 빌드
./gradlew build

# 개발 서버 실행
./gradlew bootRun

# 또는 특정 프로파일로 실행
./gradlew bootRun --args='--spring.profiles.active=dev'
```

서버가 실행되면 http://localhost:8080/api에서 접근 가능합니다.

## 📦 Available Scripts

```bash
./gradlew build          # 프로젝트 빌드
./gradlew bootRun        # 개발 서버 실행
./gradlew test           # 테스트 실행
./gradlew clean          # 빌드 파일 정리
./gradlew bootJar        # 실행 가능한 JAR 생성
```

## 🔌 API Endpoints

### Health Check

**GET** `/api/health`

응답 예시:
```json
{
  "status": "UP",
  "service": "dev-fortune-backend",
  "timestamp": "2026-12-27T14:30:00",
  "version": "0.0.1-SNAPSHOT"
}
```

**GET** `/api/health/ping`

응답: `pong`

### Fortune API (구현 예정)

- **POST** `/api/fortune/generate` - AI 운세 생성
- **POST** `/api/fortune/save` - 운세 저장
- **GET** `/api/fortune/:id` - 운세 조회
- **POST** `/api/fortune/share-card` - 공유 카드 생성

### Team API (구현 예정)

- **POST** `/api/team/create` - 팀 생성
- **GET** `/api/team/:id` - 팀 조회
- **POST** `/api/team/:id/join` - 팀 참가

## 🔑 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DATABASE_URL` | PostgreSQL 연결 URL | Yes | jdbc:postgresql://localhost:5432/devfortune |
| `DATABASE_USERNAME` | DB 사용자명 | Yes | postgres |
| `DATABASE_PASSWORD` | DB 비밀번호 | Yes | postgres |
| `PORT` | 서버 포트 | No | 8080 |
| `SPRING_PROFILES_ACTIVE` | 활성 프로파일 (dev/prod) | No | dev |
| `SHOW_SQL` | SQL 로그 출력 여부 | No | true |

## 📋 Configuration Profiles

### Development (dev)
- DDL Auto: `create-drop` (테이블 자동 생성/삭제)
- SQL Logging: Enabled
- Database: `devfortune_dev`

### Production (prod)
- DDL Auto: `validate` (스키마 검증만)
- SQL Logging: Disabled
- Database: Supabase PostgreSQL

## 🔧 CORS Configuration

현재 허용된 Origin:
- `http://localhost:3000` (Next.js dev)
- `http://localhost:3001`
- `https://devfortune.vercel.app` (Production)

추가 Origin이 필요한 경우 `src/main/java/com/devfortune/backend/config/WebConfig.java`를 수정하세요.

## 🗄️ Database Schema

### Tables (구현 예정)

```sql
-- fortunes: 운세 데이터
CREATE TABLE fortunes (
  id UUID PRIMARY KEY,
  user_id UUID,
  answers JSONB NOT NULL,
  archetype VARCHAR(50) NOT NULL,
  stats JSONB NOT NULL,
  fortunes JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- teams: 팀 정보
CREATE TABLE teams (
  id UUID PRIMARY KEY,
  team_name VARCHAR(100) NOT NULL,
  invite_code VARCHAR(10) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- team_members: 팀 멤버십
CREATE TABLE team_members (
  team_id UUID REFERENCES teams(id),
  fortune_id UUID REFERENCES fortunes(id),
  joined_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (team_id, fortune_id)
);
```

## 🧪 Testing

```bash
# 모든 테스트 실행
./gradlew test

# 특정 테스트 클래스 실행
./gradlew test --tests HealthControllerTest

# 테스트 리포트 확인
open build/reports/tests/test/index.html
```

## 📝 Development Guidelines

### Code Style
- Java 17 features 사용
- Lombok으로 보일러플레이트 코드 최소화
- RESTful API 설계 원칙 준수
- 명확한 예외 처리 및 에러 응답

### Commit Convention
```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
refactor: 코드 리팩토링
test: 테스트 코드 추가/수정
chore: 빌드 설정 등 기타 변경
```

## 🔗 Related

- [Frontend Repository](../frontend)
- [PRD Document](../prd.md)
- [Jira Epic](https://dev-fortune-ai-native.atlassian.net/browse/KAN-4)

## 📝 License

MIT
