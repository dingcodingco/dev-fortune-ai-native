# Development Dockerfile for Spring Boot with Hot Reload
FROM gradle:8.5-jdk17 AS builder

WORKDIR /app

# Copy Gradle files
COPY build.gradle settings.gradle ./
COPY gradle ./gradle

# Download dependencies (for better caching)
RUN gradle dependencies --no-daemon || true

# Copy source code
COPY src ./src

# Build application
RUN gradle bootJar --no-daemon

# Runtime image
FROM eclipse-temurin:17-jre

WORKDIR /app

# Copy JAR from builder (exclude plain jar)
COPY --from=builder /app/build/libs/backend-0.0.1-SNAPSHOT.jar app.jar

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/api/health || exit 1

# Run application
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
