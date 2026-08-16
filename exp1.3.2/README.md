# Experiment 1.3.2: Role-Based Access Control (RBAC) & Protected Routes

## Aim
To implement role-based access control and secure application routes based on user permissions.

## Course Outcomes (COs) Mapped
- **CO2 - BT2**: Implement RBAC matrices, persona switches, and permission evaluation algorithms.
- **CO3 - BT3**: Guard application routes, dynamically adapt UI elements, and handle 403 Forbidden redirects.

## Software Requirements
- Node.js & npm
- React.js 18 + Vite
- Lucide Icons (`lucide-react`)

## Key Architecture & Features
1. **RBAC Matrix (`src/config/rbacConfig.js`)**:
   - Roles: `Admin`, `Editor`, `Viewer`.
   - Permissions: `posts:read`, `posts:create`, `posts:edit`, `posts:delete`, `studio:access`, `admin:access`, `system:configure`.
2. **Protected Route Navigation Guard (`src/context/RBACContext.jsx`)**:
   - Evaluates active user claims before navigating to protected routes (`/editor-studio`, `/admin-console`).
   - Automatically redirects unauthorized attempts to 403 Forbidden page and logs access telemetry.
3. **Dynamic Permission Guard (`PermissionGuard.jsx`)**:
   - Conditionally renders or hides UI elements (e.g. Create & Delete buttons) based on active permission claims.
4. **Interactive Persona Switcher**:
   - Top navbar dropdown to switch instantly between `Admin`, `Editor`, and `Viewer` personas for testing.

## Project Structure
```
exp1.3.2/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx                # React DOM entry point
    ├── App.jsx                 # App layout & RBACProvider
    ├── index.css               # Design system & role badge colors
    ├── config/
    │   └── rbacConfig.js       # Role definitions, permission scopes & preset personas
    ├── context/
    │   └── RBACContext.jsx     # Context for active role, route guard & telemetry logs
    ├── components/
    │   ├── Header.jsx          # Navbar with active tabs & persona switcher
    │   ├── PermissionGuard.jsx # Wrapper component for conditional feature rendering
    │   └── PermissionMatrix.jsx# Table displaying permission claims across roles
    └── views/
        ├── DashboardView.jsx   # Public/General dashboard with dynamic UI demo
        ├── EditorStudioView.jsx# Protected Content Studio (Requires Editor or Admin)
        ├── AdminConsoleView.jsx # Strictly protected Admin Console (Requires Admin)
        └── UnauthorizedView.jsx# 403 Forbidden Access Denied redirection page
```

## Running the Application
```bash
npm install
npm run dev
```

Build for production:
```bash
npm run build
```
