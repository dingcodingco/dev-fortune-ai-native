# 2026 Developer Fortune (개발자 신수대통)

개발자들의 일상 고충을 재미있는 운세로 승화시켜, 자연스러운 공유를 유도하는 **개발자 특화 신년 운세 서비스**

## 🎯 Project Overview

사용자가 **5개의 밈 기반 퀴즈**에 답하면, AI가 **2026년 버그 수, 야근 횟수, 코드리뷰 운, 배포 운세** 등을 Spotify Wrapped 스타일로 생성하고, 공유 가능한 카드로 제공합니다.

### 핵심 가치 제안
- **재미**: 개발자 밈 + 현실적 예측
- **공유 욕구**: "나 버그 234개래 ㅋㅋ 너는?"
- **팀 결속**: 단톡방에서 함께 보는 재미

### MVP 목표
- **런칭 시점**: 2026년 12월 28일
- **타겟 MAU**: 1,000명 (첫 2주)
- **PMF 검증**: 공유율 35%+, 완료율 80%+

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: Zustand
- **AI SDK**: Vercel AI SDK

### Backend
- **Framework**: Spring Boot 3.2
- **Language**: Java 17
- **Build**: Gradle
- **Database**: PostgreSQL (Supabase)
- **ORM**: Spring Data JPA

### Infrastructure
- **Containerization**: Docker + Docker Compose
- **Hosting**: Vercel (Frontend), AWS ECS (Backend)
- **Database**: Supabase PostgreSQL
- **CI/CD**: GitHub Actions
- **IaC**: Terraform

## 📁 Project Structure

```
dev-fortune-ai-native/
├── frontend/              # Next.js 14 Frontend
│   ├── src/
│   │   ├── app/          # App Router pages
│   │   ├── components/   # React components
│   │   └── lib/          # Utilities, stores, types
│   ├── Dockerfile        # Production build
│   ├── Dockerfile.dev    # Development with hot reload
│   └── package.json
├── backend/               # Spring Boot 3.2 Backend
│   ├── src/
│   │   └── main/
│   │       ├── java/     # Java source code
│   │       └── resources/ # Configuration files
│   ├── Dockerfile
│   └── build.gradle
├── terraform/             # AWS Infrastructure as Code
│   ├── modules/
│   └── environments/
├── .github/workflows/     # CI/CD pipelines
├── docker-compose.yml     # Local development setup
├── prd.md                 # Product Requirements Document
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local development)
- Java 17+ (for local development)
- PostgreSQL 16+ (or use Docker)

### 1. Clone Repository
```bash
git clone https://github.com/yourorg/dev-fortune-ai-native.git
cd dev-fortune-ai-native
```

### 2. Environment Variables
```bash
# Frontend
cp frontend/.env.example frontend/.env.local

# Backend
cp backend/.env.example backend/.env
```

### 3. Start with Docker Compose
```bash
# Start all services (Frontend + Backend + PostgreSQL)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### 4. Access Applications
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **Health Check**: http://localhost:8080/api/health
- **PostgreSQL**: localhost:5432

## 📦 Docker Compose Services

### Service Overview
| Service | Port | Description |
|---------|------|-------------|
| **frontend** | 3000 | Next.js dev server with hot reload |
| **backend** | 8080 | Spring Boot API server |
| **postgres** | 5432 | PostgreSQL 16 database |

### Service Commands
```bash
# Start all services
docker-compose up -d

# Start specific service
docker-compose up -d frontend

# Rebuild and start
docker-compose up -d --build

# View logs
docker-compose logs -f [service_name]

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Restart service
docker-compose restart [service_name]
```

## 🔧 Local Development (without Docker)

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
./gradlew bootRun
```

### Database
```bash
docker run --name devfortune-postgres \
  -e POSTGRES_DB=devfortune_dev \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -d postgres:16-alpine
```

## 🧪 Testing

### Frontend
```bash
cd frontend
npm run test
npm run lint
npm run type-check
```

### Backend
```bash
cd backend
./gradlew test
./gradlew build
```

## 📚 API Documentation

### Base URL
- Development: `http://localhost:8080/api`
- Production: `https://api.devfortune.com/api`

### Endpoints (Planned)

#### Fortune API
- **POST** `/fortune/generate` - AI 운세 생성
- **POST** `/fortune/save` - 운세 저장
- **GET** `/fortune/:id` - 운세 조회
- **POST** `/fortune/share-card` - 공유 카드 생성

#### Team API
- **POST** `/team/create` - 팀 생성
- **GET** `/team/:id` - 팀 조회
- **POST** `/team/:id/join` - 팀 참가

#### Health Check
- **GET** `/health` - 서버 상태 확인
- **GET** `/health/ping` - Ping test

## 🚢 Deployment

### Development
```bash
# Deploy to staging
git push origin develop
```

### Production
```bash
# Deploy to production
git push origin main
```

Deployment is automated via GitHub Actions:
1. Build Docker images
2. Push to AWS ECR
3. Update ECS services
4. Run health checks

## 🏗️ Infrastructure

### AWS Resources (via Terraform)
- **VPC**: Custom VPC with public/private subnets
- **ECS Fargate**: Container orchestration
- **ECR**: Container registry
- **RDS PostgreSQL**: Production database
- **ALB**: Application Load Balancer
- **Route53**: DNS management
- **ACM**: SSL certificates

### Terraform Commands
```bash
cd terraform/environments/prod
terraform init
terraform plan
terraform apply
```

## 📊 Monitoring

### Development
- **Frontend**: Browser DevTools
- **Backend**: Console logs
- **Database**: PostgreSQL logs

### Production
- **CloudWatch Logs**: Application logs
- **CloudWatch Metrics**: Performance metrics
- **Vercel Analytics**: Frontend analytics
- **Sentry** (planned): Error tracking

## 🤝 Contributing

### Branch Strategy
- `main`: Production branch
- `develop`: Development branch
- `feature/*`: Feature branches
- `hotfix/*`: Hotfix branches

### Commit Convention
```
feat: Add new feature
fix: Fix bug
docs: Update documentation
refactor: Refactor code
test: Add tests
chore: Update build config
```

## 📝 Documentation

- [PRD](./prd.md) - Product Requirements Document
- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)
- [Jira Board](https://dev-fortune-ai-native.atlassian.net/browse/KAN-4)

## 👥 Team

- **Product Lead**: 현준
- **Engineering**: 현준
- **AI Partner**: Claude

## 📄 License

MIT

## 🔗 Links

- **Live Demo**: https://devfortune.vercel.app (Coming Soon)
- **API Docs**: https://api.devfortune.com/docs (Coming Soon)
- **Jira Board**: https://dev-fortune-ai-native.atlassian.net
