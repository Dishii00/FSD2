# Experiment 1.3.1: Secure Authentication System using JWT & Session Management

## Aim
To design and implement a secure authentication system using JWT for user login and session management.

## Course Outcomes (COs) Mapped
- **CO1 - BT1**: Understand token-based authentication mechanisms and stateless architecture.
- **CO2 - BT2**: Implement JWT token generation, Base64URL parsing, client storage (`localStorage` / `sessionStorage`), and validation.
- **CO3 - BT3**: Manage user session lifetimes (`exp` claims), automatic expiration handling, and HTTP Bearer token headers.

## Software Requirements
- Node.js & npm
- React.js 18 + Vite
- Lucide Icons (`lucide-react`)

## Key Architecture & Security Features
1. **JWT Architecture (`src/services/jwtAuthService.js`)**:
   - RFC 7519 standard Base64URL encoding/decoding for Header, Payload, and Signature checksum.
   - Preset roles: `Admin`, `Developer`, `Creator` for testing Role-Based Access Control (RBAC).
2. **Visual JWT Inspector (`JWTInspector.jsx`)**:
   - Interactive breakdown displaying Header in Coral, Payload claims in Purple, and HMAC SHA-256 Signature in Emerald.
3. **Storage Modes (`AuthContext.jsx`)**:
   - Switchable token storage strategy between `localStorage`, `sessionStorage`, and in-memory state.
4. **HTTP Bearer Interceptor (`BearerRequestTester.jsx`)**:
   - Simulates attaching `Authorization: Bearer <jwt_token>` header to outbound requests.
5. **Security Testing Tools**:
   - **Force Token Expiry**: Instantly tests 401 Unauthorized handling when a token expires.
   - **Corrupt Signature**: Tests signature checksum verification failure logic.

## Project Structure
```
exp1.3.1/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx                # React DOM entry
    ├── App.jsx                 # App layout & AuthProvider wrapper
    ├── index.css               # Design system & JWT color tokens
    ├── services/
    │   └── jwtAuthService.js   # JWT generator, validator, decoder, and mock APIs
    ├── context/
    │   └── AuthContext.jsx     # React Context for auth state & storage modes
    └── components/
        ├── Header.jsx          # Navbar with storage selector & inspector toggle
        ├── LoginForm.jsx       # Login form with quick-fill account presets
        ├── Dashboard.jsx       # Protected view with decoded claims & session expiry timer
        ├── BearerRequestTester.jsx # HTTP Authorization header interceptor simulator
        └── JWTInspector.jsx    # Visual RFC 7519 Base64URL segment inspector
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
