# Experiment 2.2.1 — Pagination & Sorting
Uses Spring Data `Pageable` to retrieve large datasets in smaller pages and sort them efficiently.

**Run:** `mvn spring-boot:run`
**Port:** 8083

Examples:
- `GET /api/posts?page=0&size=5`
- `GET /api/posts?page=1&size=5`
- `GET /api/posts?page=0&size=5&sort=title,asc`
- `GET /api/posts?page=0&size=5&sort=id,desc`
