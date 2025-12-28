# Dev Environment Outputs

# VPC Outputs
output "vpc_id" {
  description = "ID of the VPC"
  value       = module.vpc.vpc_id
}

output "public_subnet_ids" {
  description = "IDs of public subnets"
  value       = module.vpc.public_subnet_ids
}

output "private_subnet_ids" {
  description = "IDs of private subnets"
  value       = module.vpc.private_subnet_ids
}

# ECR Outputs
output "frontend_repository_url" {
  description = "URL of the frontend ECR repository"
  value       = module.ecr.frontend_repository_url
}

output "backend_repository_url" {
  description = "URL of the backend ECR repository"
  value       = module.ecr.backend_repository_url
}

# RDS Outputs
output "database_endpoint" {
  description = "Connection endpoint for the database"
  value       = module.rds.db_instance_endpoint
}

output "database_name" {
  description = "Name of the database"
  value       = module.rds.db_name
}

# ALB Outputs
output "alb_dns_name" {
  description = "DNS name of the Application Load Balancer"
  value       = module.alb.alb_dns_name
}

output "alb_url" {
  description = "URL of the application"
  value       = "http://${module.alb.alb_dns_name}"
}

# ECS Outputs
output "ecs_cluster_name" {
  description = "Name of the ECS cluster"
  value       = module.ecs.cluster_name
}

output "frontend_service_name" {
  description = "Name of the frontend ECS service"
  value       = module.ecs.frontend_service_name
}

output "backend_service_name" {
  description = "Name of the backend ECS service"
  value       = module.ecs.backend_service_name
}

# Deployment Commands
output "deployment_commands" {
  description = "Useful deployment commands"
  value = <<-EOT
    # Push Docker images to ECR:
    aws ecr get-login-password --region ${var.aws_region} | docker login --username AWS --password-stdin ${split("/", module.ecr.frontend_repository_url)[0]}

    # Frontend:
    docker build -t ${module.ecr.frontend_repository_url}:latest ./frontend
    docker push ${module.ecr.frontend_repository_url}:latest

    # Backend:
    docker build -t ${module.ecr.backend_repository_url}:latest ./backend
    docker push ${module.ecr.backend_repository_url}:latest

    # Force ECS service update:
    aws ecs update-service --cluster ${module.ecs.cluster_name} --service ${module.ecs.frontend_service_name} --force-new-deployment --region ${var.aws_region}
    aws ecs update-service --cluster ${module.ecs.cluster_name} --service ${module.ecs.backend_service_name} --force-new-deployment --region ${var.aws_region}

    # Access application:
    echo "Frontend: http://${module.alb.alb_dns_name}"
    echo "Backend API: http://${module.alb.alb_dns_name}/api"
    echo "Health Check: http://${module.alb.alb_dns_name}/actuator/health"
  EOT
}
