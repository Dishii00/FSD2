# CampusHub REST API quick reference

Base URL: `http://localhost:5000/api`

## Authentication
`POST /auth/register` JSON: `{ "name":"A Student", "email":"student@example.com", "password":"Password123", "department":"CSE" }`

`POST /auth/login` JSON: `{ "email":"student@example.com", "password":"Password123" }`

Both return `{ token, user }`. Send `Authorization: Bearer <token>` for protected routes.

## Examples
- `GET /dashboard` – counts for projects, assigned tasks, skills, certifications and submissions.
- `GET /projects` – list projects.
- `POST /projects` (faculty/admin) – `{ "title":"Campus App", "description":"Build a campus app", "domain":"Web Development", "deadline":"2026-12-10" }`.
- `POST /projects/:id/submissions` (student) – `{ "submission_url":"https://github.com/user/repo", "description":"Final implementation" }`.
- `PATCH /submissions/:id/review` (faculty/admin) – `{ "status":"approved", "faculty_feedback":"Good work", "grade":90 }`.
- `POST /tasks` (faculty/admin) – `{ "title":"Prepare report", "description":"Write the report", "assigned_to":1, "priority":"high" }`.
- `PATCH /tasks/:id/status` (assigned student) – `{ "status":"in_progress" }`.
- `POST /skills` – `{ "name":"React", "level":"intermediate", "proof_url":"https://..." }`.
- `PATCH /skills/:id/verify` (faculty/admin) – `{ "verified":true }`.
- `POST /certifications` – `{ "title":"Cloud Fundamentals", "issuer":"Provider", "issue_date":"2026-08-01", "credential_url":"https://..." }`.
- `POST /feedback` – `{ "to_user":2, "rating":5, "comments":"Helpful collaboration" }`.

## Security / access rules
Passwords are hashed with bcrypt. JWTs are verified by authentication middleware. RBAC middleware restricts project/task creation and review operations to faculty/admin; students manage their own skills, certifications, submissions and assigned task status. MySQL foreign keys enforce relational integrity.
