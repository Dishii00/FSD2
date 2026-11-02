# Experiment 3.1.1 — Retry and DLQ
1. Open this folder in VS Code.
2. Terminal: `docker compose up -d`
3. Start app: `mvn spring-boot:run`
4. In another terminal: `curl.exe -X POST "http://localhost:8311/api/events?type=normal&message=hello"`
5. Trigger retries/DLQ: `curl.exe -X POST "http://localhost:8311/api/events?type=fail&message=fail-demo"`
6. Observe retries and DLQ output in app terminal. Stop Kafka: `docker compose down`.
Aim/result: Kafka consumer retries failures with exponential backoff and routes exhausted failures to a DLT handler.
