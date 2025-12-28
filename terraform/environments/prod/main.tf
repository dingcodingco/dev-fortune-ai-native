# Production Environment - Main Configuration

terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # S3 Backend for Terraform State (필수)
  # backend "s3" {
  #   bucket         = "devfortune-terraform-state-prod"
  #   key            = "prod/terraform.tfstate"
  #   region         = "ap-northeast-2"
  #   dynamodb_table = "devfortune-terraform-locks"
  #   encrypt        = true
  # }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Environment = "prod"
      Project     = "dev-fortune"
      ManagedBy   = "Terraform"
    }
  }
}

# Local Variables
locals {
  environment = "prod"
  aws_region  = var.aws_region
}

# VPC Module
module "vpc" {
  source = "../../modules/vpc"

  environment          = local.environment
  vpc_cidr             = var.vpc_cidr
  availability_zones   = var.availability_zones
  public_subnet_cidrs  = var.public_subnet_cidrs
  private_subnet_cidrs = var.private_subnet_cidrs
  enable_nat_gateway   = true
  enable_flow_logs     = true
}

# ECR Module
module "ecr" {
  source = "../../modules/ecr"

  environment              = local.environment
  image_retention_count    = 20
  enable_github_actions_access = true
  github_actions_role_arn  = var.github_actions_role_arn
}

# RDS Module (Production Grade)
module "rds" {
  source = "../../modules/rds"

  environment         = local.environment
  vpc_id              = module.vpc.vpc_id
  private_subnet_ids  = module.vpc.private_subnet_ids
  allowed_security_groups = [module.ecs.ecs_security_group_id]

  database_name     = var.database_name
  database_username = var.database_username
  database_password = var.database_password

  instance_class      = "db.t3.medium"
  allocated_storage   = 100
  postgres_version    = "16.1"
  multi_az            = true
  skip_final_snapshot = false

  backup_retention_period = 14
  monitoring_interval     = 60
  enable_performance_insights = true
  deletion_protection     = true
  auto_minor_version_upgrade = true
}

# ALB Module (HTTPS Enabled)
module "alb" {
  source = "../../modules/alb"

  environment       = local.environment
  vpc_id            = module.vpc.vpc_id
  public_subnet_ids = module.vpc.public_subnet_ids

  enable_https               = true
  acm_certificate_arn        = var.acm_certificate_arn
  enable_deletion_protection = true
}

# ECS Module (Production Scale)
module "ecs" {
  source = "../../modules/ecs"

  environment           = local.environment
  vpc_id                = module.vpc.vpc_id
  private_subnet_ids    = module.vpc.private_subnet_ids
  alb_security_group_id = module.alb.alb_security_group_id
  aws_region            = local.aws_region

  # Frontend
  frontend_image            = module.ecr.frontend_repository_url
  frontend_image_tag        = var.frontend_image_tag
  frontend_cpu              = "512"
  frontend_memory           = "1024"
  frontend_desired_count    = 3
  frontend_min_capacity     = 2
  frontend_max_capacity     = 10
  frontend_target_group_arn = module.alb.frontend_target_group_arn
  api_url                   = "https://${var.domain_name}/api"

  # Backend
  backend_image                 = module.ecr.backend_repository_url
  backend_image_tag             = var.backend_image_tag
  backend_cpu                   = "1024"
  backend_memory                = "2048"
  backend_desired_count         = 3
  backend_min_capacity          = 2
  backend_max_capacity          = 10
  backend_target_group_arn      = module.alb.backend_target_group_arn
  database_url                  = "jdbc:postgresql://${module.rds.db_instance_address}:${module.rds.db_instance_port}/${module.rds.db_name}"
  database_username             = var.database_username
  database_password_secret_arn  = aws_secretsmanager_secret_version.db_password.arn

  # Settings
  enable_container_insights = true
  enable_autoscaling        = true
  enable_execute_command    = false
  log_retention_days        = 30
}

# Secrets Manager for Database Password
resource "aws_secretsmanager_secret" "db_password" {
  name        = "${local.environment}-devfortune-db-password"
  description = "Database password for Dev Fortune Production"

  tags = {
    Name        = "${local.environment}-devfortune-db-password"
    Environment = local.environment
  }
}

resource "aws_secretsmanager_secret_version" "db_password" {
  secret_id     = aws_secretsmanager_secret.db_password.id
  secret_string = var.database_password
}

# IAM Policy for ECS Task Execution to Access Secrets
resource "aws_iam_role_policy" "ecs_secrets_access" {
  name = "${local.environment}-devfortune-ecs-secrets-access"
  role = module.ecs.ecs_task_execution_role_arn

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "secretsmanager:GetSecretValue"
        ]
        Resource = [
          aws_secretsmanager_secret.db_password.arn
        ]
      }
    ]
  })
}
