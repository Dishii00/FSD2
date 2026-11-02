# CampusHub – Student Project, Skill & Task Management System

A full-stack academic collaboration portal built with **React + Redux Toolkit**, **Node.js/Express REST APIs**, **MySQL**, **JWT authentication**, and **role-based access control (RBAC)**.

## Features
- JWT register/login with bcrypt password hashing and protected routes.
- Roles: `student`, `faculty`, `admin`; role-aware navigation and API authorization.
- Student profiles and skill CRUD; faculty/admin can verify skills.
- Project CRUD, student submissions (URL/description), faculty review and feedback.
- Academic task CRUD, assignment, status tracking and feedback.
- Certification CRUD for students; faculty/admin can review verification status.
- Dashboard summary endpoints and relational MySQL schema with foreign keys.

## Requirements
- Node.js 18+ and npm
- MySQL 8+

## 1. Database setup
Create the database and tables:
```bash
mysql -u root -p < database/schema.sql
```
Optional SQL notes and sample content are in `database/seed.sql`. Register accounts through the UI; registrations default to the Student role. To create faculty/admin users, update the role directly in MySQL after registration (see the seed file).

## 2. Backend setup
```bash
cd server
cp .env.example .env
# Edit .env with your MySQL credentials and a long JWT_SECRET
npm install
npm run dev
```
API runs at `http://localhost:5000`; health check: `GET /api/health`.

## 3. Frontend setup
Open another terminal:
```bash
cd client
npm install
npm run dev
```
Open the Vite URL (normally `http://localhost:5173`). The Vite dev server proxies `/api` to port 5000.

## API overview
| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/auth/register`, `/api/auth/login` | Public |
| GET | `/api/auth/me` | Authenticated |
| GET/POST | `/api/projects` | Authenticated / faculty+admin for create |
| GET/PUT/DELETE | `/api/projects/:id` | Authenticated / owner or faculty+admin |
| POST | `/api/projects/:id/submissions` | Student |
| GET | `/api/projects/:id/submissions` | Faculty+admin or project owner |
| PATCH | `/api/submissions/:id/review` | Faculty+admin |
| GET/POST | `/api/tasks` | Authenticated / faculty+admin for create |
| PATCH | `/api/tasks/:id/status` | Assigned student |
| GET/POST | `/api/skills` | Authenticated |
| PATCH | `/api/skills/:id/verify` | Faculty+admin |
| GET/POST | `/api/certifications` | Student |
| PATCH | `/api/certifications/:id/verify` | Faculty+admin |
| GET/POST | `/api/feedback` | Authenticated |
| GET | `/api/dashboard` | Authenticated |

All protected endpoints require `Authorization: Bearer <token>`. See `docs/API.md` for request examples.

## Project structure
```text
CampusHub/
├── client/                 # React + Redux Toolkit + Vite
├── server/                 # Express REST API + JWT + RBAC
├── database/               # MySQL schema and demo seed
├── docs/API.md
└── Original_Project_Report.docx  # Report from supplied starter ZIP
```

## Notes
- This is a development-ready academic project scaffold. Configure your own database credentials and JWT secret before running.
- The demo seed uses bcrypt hashes for the demo password `Campus@123`.
- File uploads are represented as submission URLs/descriptions; integrate cloud/local storage if binary upload is required.
