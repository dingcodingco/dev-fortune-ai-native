# Production Environment Variables

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-northeast-2"
}

# VPC Configuration
variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.1.0.0/16"
}

variable "availability_zones" {
  description = "List of availability zones"
  type        = list(string)
  default     = ["ap-northeast-2a", "ap-northeast-2c"]
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets"
  type        = list(string)
  default     = ["10.1.1.0/24", "10.1.2.0/24"]
}

variable "private_subnet_cidrs" {
  description = "CIDR blocks for private subnets"
  type        = list(string)
  default     = ["10.1.11.0/24", "10.1.12.0/24"]
}

# Database Configuration
variable "database_name" {
  description = "Name of the database"
  type        = string
  default     = "devfortune"
}

variable "database_username" {
  description = "Master username for the database"
  type        = string
  default     = "devfortune_admin"
  sensitive   = true
}

variable "database_password" {
  description = "Master password for the database"
  type        = string
  sensitive   = true
}

# Container Image Tags
variable "frontend_image_tag" {
  description = "Frontend Docker image tag"
  type        = string
  default     = "latest"
}

variable "backend_image_tag" {
  description = "Backend Docker image tag"
  type        = string
  default     = "latest"
}

# Domain & SSL
variable "domain_name" {
  description = "Domain name for the application"
  type        = string
}

variable "acm_certificate_arn" {
  description = "ARN of ACM certificate for HTTPS"
  type        = string
}

# GitHub Actions
variable "github_actions_role_arn" {
  description = "ARN of the IAM role used by GitHub Actions"
  type        = string
  default     = ""
}
