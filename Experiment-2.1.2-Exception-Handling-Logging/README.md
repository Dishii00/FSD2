# Experiment 2.1.2 — Global Exception Handling & Logging
Demonstrates `@RestControllerAdvice`, custom exceptions, validation errors, request logging and correlation IDs.

**Run:** `mvn spring-boot:run`
**Port:** 8082

Try `GET /api/posts/999` to see a structured 404 response. Each request receives an `X-Correlation-ID` header.
