# Experiment 3.1.2 — Idempotency
1. `docker compose up -d`
2. `mvn spring-boot:run`
3. Send: `curl.exe -X POST "http://localhost:8312/api/payments?eventId=PAY-101&amount=500"`
4. Send the exact same command again. First delivery prints PAYMENT PROCESSED ONCE; repeat prints DUPLICATE IGNORED.
5. Try another ID. Stop Kafka using `docker compose down`.
Note: IDs are held in memory for this lab. Production systems should persist keys in a database.
