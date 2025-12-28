# ECR 모듈 변수 정의

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
}

variable "image_retention_count" {
  description = "Number of images to retain in ECR"
  type        = number
  default     = 10
}

variable "enable_github_actions_access" {
  description = "Enable GitHub Actions to push images to ECR"
  type        = bool
  default     = false
}

variable "github_actions_role_arn" {
  description = "ARN of the IAM role used by GitHub Actions"
  type        = string
  default     = ""
}
