# Experiment 2.3.1 - JWT Authentication and RBAC

Aim: To implement secure backend APIs using JWT authentication and role-based authorization.

Features: Spring Security, JWT generation/validation, stateless authentication, JWT filter, RBAC, `@PreAuthorize`.

Requirements: JDK 17+, Maven, VS Code/IntelliJ/Eclipse, Postman.

Run: `mvn spring-boot:run`
Server: `http://localhost:8085`

Open the server URL in a browser to use the interactive login and API-testing page. You can also use Postman or another API client.

Demo users:
- USER: `user` / `user123`
- ADMIN: `admin` / `admin123`

Postman:
1. POST `/auth/login` with JSON `{ "username":"user", "password":"user123" }` and copy `token`.
2. GET `/api/profile` with `Authorization: Bearer <token>`.
3. GET `/api/admin` with USER token -> 403.
4. Login as admin and call `/api/admin` -> `ADMIN access granted`.
