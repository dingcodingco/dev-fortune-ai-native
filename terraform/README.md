# Dev Fortune - Terraform Infrastructure

AWS 인프라를 Terraform으로 관리하는 IaC (Infrastructure as Code) 구성입니다.

## 📁 디렉토리 구조

```
terraform/
├── modules/           # 재사용 가능한 Terraform 모듈
│   ├── vpc/          # VPC, Subnets, NAT Gateway
│   ├── ecr/          # Container Registry
│   ├── rds/          # PostgreSQL Database
│   ├── alb/          # Application Load Balancer
│   └── ecs/          # ECS Fargate Services
├── environments/      # 환경별 설정
│   ├── dev/          # 개발 환경
│   ├── staging/      # 스테이징 환경
│   └── prod/         # 프로덕션 환경
└── README.md         # 이 파일
```

## 🏗️ 인프라 아키텍처

```
┌─────────────────────────────────────────────────────────────┐
│                         Internet                             │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
              ┌──────────────┐
              │ Route53 + ACM│ (DNS + SSL)
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │     ALB      │ (Load Balancer)
              └──────┬───────┘
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
  ┌──────────┐            ┌──────────┐
  │ Frontend │            │ Backend  │
  │   ECS    │            │   ECS    │
  │ (Fargate)│            │ (Fargate)│
  └──────────┘            └────┬─────┘
                               │
                               ▼
                        ┌──────────────┐
                        │     RDS      │
                        │ (PostgreSQL) │
                        └──────────────┘
```

### AWS 리소스

- **VPC**: 네트워크 격리 (Public/Private Subnets, NAT Gateway)
- **ECR**: Docker 이미지 저장소
- **RDS**: PostgreSQL 데이터베이스 (Multi-AZ in prod)
- **ALB**: 트래픽 라우팅 (HTTP/HTTPS)
- **ECS Fargate**: 컨테이너 실행 (Frontend, Backend)
- **CloudWatch**: 로그 및 모니터링
- **Secrets Manager**: 민감한 정보 관리

## 🚀 시작하기

### 사전 요구사항

1. **Terraform 설치** (v1.0 이상)
   ```bash
   brew install terraform
   ```

2. **AWS CLI 설치 및 구성**
   ```bash
   brew install awscli
   aws configure
   ```

3. **AWS 자격 증명 설정**
   ```bash
   export AWS_ACCESS_KEY_ID="your_access_key"
   export AWS_SECRET_ACCESS_KEY="your_secret_key"
   ```

### 배포 단계

#### 1. 환경 선택

원하는 환경으로 이동:
```bash
# 개발 환경
cd terraform/environments/dev

# 스테이징 환경
cd terraform/environments/staging

# 프로덕션 환경
cd terraform/environments/prod
```

#### 2. 변수 설정

`terraform.tfvars.example`을 복사하여 `terraform.tfvars` 생성:
```bash
cp terraform.tfvars.example terraform.tfvars
```

필수 변수 설정:
```hcl
# terraform.tfvars

aws_region = "ap-northeast-2"

# Database 비밀번호 (강력한 비밀번호 사용)
database_password = "your_strong_password_here"

# Production only (HTTPS 필요 시)
domain_name         = "your-domain.com"
acm_certificate_arn = "arn:aws:acm:..."
```

#### 3. Terraform 초기화

```bash
terraform init
```

#### 4. 계획 확인

```bash
terraform plan
```

변경 사항을 검토하고 예상 비용을 확인하세요.

#### 5. 인프라 배포

```bash
terraform apply
```

확인 프롬프트에 `yes` 입력.

#### 6. 배포 결과 확인

```bash
terraform output
```

출력 예시:
```
alb_url = "http://dev-devfortune-alb-123456789.ap-northeast-2.elb.amazonaws.com"
frontend_repository_url = "123456789.dkr.ecr.ap-northeast-2.amazonaws.com/dev-devfortune-frontend"
backend_repository_url = "123456789.dkr.ecr.ap-northeast-2.amazonaws.com/dev-devfortune-backend"
database_endpoint = "dev-devfortune-db.xxxxx.ap-northeast-2.rds.amazonaws.com:5432"
```

## 🐳 Docker 이미지 배포

### 1. ECR 로그인

```bash
aws ecr get-login-password --region ap-northeast-2 | \
  docker login --username AWS --password-stdin \
  $(terraform output -raw frontend_repository_url | cut -d'/' -f1)
```

### 2. Frontend 이미지 빌드 및 푸시

```bash
# 프로젝트 루트로 이동
cd /path/to/dev-fortune-ai-native

# Frontend 이미지 빌드
docker build -t $(terraform output -raw frontend_repository_url):latest ./frontend

# ECR에 푸시
docker push $(terraform output -raw frontend_repository_url):latest
```

### 3. Backend 이미지 빌드 및 푸시

```bash
# Backend 이미지 빌드
docker build -t $(terraform output -raw backend_repository_url):latest ./backend

# ECR에 푸시
docker push $(terraform output -raw backend_repository_url):latest
```

### 4. ECS 서비스 업데이트

```bash
# Frontend 서비스 강제 업데이트
aws ecs update-service \
  --cluster $(terraform output -raw ecs_cluster_name) \
  --service $(terraform output -raw frontend_service_name) \
  --force-new-deployment \
  --region ap-northeast-2

# Backend 서비스 강제 업데이트
aws ecs update-service \
  --cluster $(terraform output -raw ecs_cluster_name) \
  --service $(terraform output -raw backend_service_name) \
  --force-new-deployment \
  --region ap-northeast-2
```

## 🔄 GitHub Actions CI/CD

### Secrets 설정

GitHub Repository Settings → Secrets and variables → Actions에서 다음 추가:

```
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
```

### 자동 배포 워크플로우

- **`main` 브랜치 push** → Production 환경 자동 배포
- **`develop` 브랜치 push** → Dev 환경 자동 배포
- **Manual dispatch** → 환경 선택 후 수동 배포

## 📊 환경별 설정 비교

| 항목 | Dev | Staging | Production |
|------|-----|---------|------------|
| RDS Instance | db.t3.micro | db.t3.small | db.t3.medium |
| RDS Multi-AZ | No | No | Yes |
| RDS Backup (days) | 3 | 7 | 14 |
| Frontend Tasks | 1 | 2 | 3 |
| Backend Tasks | 1 | 2 | 3 |
| Auto Scaling | No | Yes | Yes |
| Container Insights | No | Yes | Yes |
| HTTPS | No | Optional | Yes |
| Deletion Protection | No | No | Yes |

## 🛠️ 유용한 명령어

### 인프라 상태 확인

```bash
# 현재 상태 확인
terraform show

# 특정 리소스 확인
terraform state show module.ecs.aws_ecs_cluster.main

# 리소스 목록
terraform state list
```

### 인프라 업데이트

```bash
# 변경사항 적용
terraform apply

# 특정 리소스만 업데이트
terraform apply -target=module.ecs
```

### 로그 확인

```bash
# ECS 서비스 로그
aws logs tail /ecs/dev-devfortune-frontend --follow

# RDS 이벤트
aws rds describe-events --source-type db-instance
```

### 디버깅

```bash
# ECS 태스크 실행 확인
aws ecs describe-services \
  --cluster dev-devfortune-cluster \
  --services dev-devfortune-frontend

# 태스크 로그 확인
aws ecs describe-tasks \
  --cluster dev-devfortune-cluster \
  --tasks <task-id>
```

## 🗑️ 인프라 제거

**주의**: 이 명령은 모든 리소스를 삭제합니다!

```bash
terraform destroy
```

Production 환경은 `deletion_protection=true`로 설정되어 있어 추가 확인이 필요합니다.

## 📝 주요 참고사항

### 비용 최적화

- **Dev 환경**: NAT Gateway 1개만 사용 (비용 절감)
- **Staging**: 필요 시만 실행 (Stop ECS tasks when not in use)
- **Prod**: Reserved Instances 고려

### 보안

- **Database 비밀번호**: Secrets Manager에 저장
- **IAM 역할**: 최소 권한 원칙
- **Security Groups**: 필요한 포트만 개방
- **VPC Flow Logs**: Production 환경에서 활성화

### 모니터링

- **CloudWatch Alarms**: CPU, Memory, Storage 알림 설정
- **Container Insights**: ECS 성능 모니터링
- **RDS Enhanced Monitoring**: 데이터베이스 성능 추적

## 🆘 트러블슈팅

### 문제: Task가 시작되지 않음

```bash
# Task 상태 확인
aws ecs describe-tasks --cluster <cluster-name> --tasks <task-arn>

# 로그 확인
aws logs tail /ecs/<environment>-devfortune-frontend --since 10m
```

### 문제: RDS 연결 실패

1. Security Group 확인
2. Database Endpoint 확인
3. Secrets Manager 비밀번호 확인

### 문제: ALB Health Check 실패

1. Target Group Health Check 경로 확인 (`/` for frontend, `/actuator/health` for backend)
2. Security Group 설정 확인
3. 컨테이너 포트 확인

## 📚 추가 리소스

- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [AWS ECS Best Practices](https://docs.aws.amazon.com/AmazonECS/latest/bestpracticesguide/intro.html)
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)

## 💬 지원

문제가 발생하면 GitHub Issues에 등록해주세요.
