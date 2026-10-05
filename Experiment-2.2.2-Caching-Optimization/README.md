# Experiment 2.2.2 — Caching & Query Optimization
Demonstrates Caffeine caching, `@Cacheable`, `@CacheEvict`, native SQL and reduced repeated database access.

**Run:** `mvn spring-boot:run`
**Port:** 8084

- `GET /api/posts/{id}` → cached after first database lookup
- `PUT /api/posts/{id}` → updates database and evicts that cached item
- `GET /api/posts/{id}/native` → native SQL example

For performance testing, use Postman or Apache JMeter and compare repeated GET requests.
