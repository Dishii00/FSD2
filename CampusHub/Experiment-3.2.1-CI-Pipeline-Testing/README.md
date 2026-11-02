# Experiment 3.2.1 — CI Pipeline and Testing
Includes JUnit 5 + MockMvc API tests, a Pact consumer contract test, a Testcontainers Kafka startup test and GitHub Actions CI.
1. Ensure Docker Desktop says Engine running.
2. Run `mvn clean verify` (Testcontainers requires Docker and downloads its Kafka image).
3. Start API using `mvn spring-boot:run`.
4. Test `http://localhost:8321/api/health` and `http://localhost:8321/api/greeting?name=Student`.
Push to GitHub main branch to trigger `.github/workflows/ci.yml`.
