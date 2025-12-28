# ECS 모듈 변수 정의

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
}

variable "vpc_id" {
  description = "VPC ID"
  type        = string
}

variable "private_subnet_ids" {
  description = "List of private subnet IDs for ECS tasks"
  type        = list(string)
}

variable "alb_security_group_id" {
  description = "Security group ID of the ALB"
  type        = string
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-northeast-2"
}

# Cluster Configuration
variable "enable_container_insights" {
  description = "Enable CloudWatch Container Insights"
  type        = bool
  default     = false
}

variable "log_retention_days" {
  description = "Log retention period in days"
  type        = number
  default     = 7
}

# Frontend Configuration
variable "frontend_image" {
  description = "Frontend Docker image URL"
  type        = string
}

variable "frontend_image_tag" {
  description = "Frontend Docker image tag"
  type        = string
  default     = "latest"
}

variable "frontend_cpu" {
  description = "Frontend task CPU (256, 512, 1024, 2048, 4096)"
  type        = string
  default     = "256"
}

variable "frontend_memory" {
  description = "Frontend task memory in MB"
  type        = string
  default     = "512"
}

variable "frontend_desired_count" {
  description = "Desired number of frontend tasks"
  type        = number
  default     = 1
}

variable "frontend_target_group_arn" {
  description = "ARN of the frontend target group"
  type        = string
}

variable "frontend_environment_variables" {
  description = "Environment variables for frontend"
  type = list(object({
    name  = string
    value = string
  }))
  default = []
}

variable "api_url" {
  description = "Backend API URL for frontend"
  type        = string
  default     = ""
}

# Backend Configuration
variable "backend_image" {
  description = "Backend Docker image URL"
  type        = string
}

variable "backend_image_tag" {
  description = "Backend Docker image tag"
  type        = string
  default     = "latest"
}

variable "backend_cpu" {
  description = "Backend task CPU (256, 512, 1024, 2048, 4096)"
  type        = string
  default     = "512"
}

variable "backend_memory" {
  description = "Backend task memory in MB"
  type        = string
  default     = "1024"
}

variable "backend_desired_count" {
  description = "Desired number of backend tasks"
  type        = number
  default     = 1
}

variable "backend_target_group_arn" {
  description = "ARN of the backend target group"
  type        = string
}

variable "backend_environment_variables" {
  description = "Environment variables for backend"
  type = list(object({
    name  = string
    value = string
  }))
  default = []
}

# Database Configuration
variable "database_url" {
  description = "Database connection URL"
  type        = string
}

variable "database_username" {
  description = "Database username"
  type        = string
  sensitive   = true
}

variable "database_password_secret_arn" {
  description = "ARN of the secret containing database password"
  type        = string
  sensitive   = true
}

# Auto Scaling
variable "enable_autoscaling" {
  description = "Enable auto scaling for ECS services"
  type        = bool
  default     = false
}

variable "frontend_min_capacity" {
  description = "Minimum number of frontend tasks"
  type        = number
  default     = 1
}

variable "frontend_max_capacity" {
  description = "Maximum number of frontend tasks"
  type        = number
  default     = 4
}

variable "backend_min_capacity" {
  description = "Minimum number of backend tasks"
  type        = number
  default     = 1
}

variable "backend_max_capacity" {
  description = "Maximum number of backend tasks"
  type        = number
  default     = 4
}

# ECS Exec
variable "enable_execute_command" {
  description = "Enable ECS Exec for debugging"
  type        = bool
  default     = false
}
