# Experiment 1.1.2: Frontend Draft Management System

## Aim
To implement a draft management system that allows users to save, retrieve, and manage post drafts within the frontend, with optional simulation of backend interactions.

## Course Outcomes (COs) Mapped
- **CO2 - BT2**: Understand and apply state management techniques (useState, useReducer, React Context) for UI components.
- **CO3 - BT3**: Implement asynchronous workflows, CRUD operations, auto-saving, and simulated backend communication.

## Objectives Achieved
1. **Frontend State Management**: Centralized store using `useReducer` and React Context (`DraftContext.jsx`).
2. **CRUD Operations**: Full Create, Read, Update, Delete, Duplicate, and Publish capabilities for post drafts.
3. **Asynchronous Workflows**: Simulated REST API layer (`mockApi.js`) with configurable network latency and error injection.
4. **Browser Persistence**: Automatic sync with `localStorage` so drafts persist across page refreshes.
5. **UX & Feedback States**: Loading skeletons, auto-save status indicator (debounce 2s), confirm modal, and toast notifications.

## Software Requirements
- Node.js (v18+ recommended)
- npm
- React.js 18 + Vite
- Lucide Icons (`lucide-react`)

## Project Structure
```
exp1.1.2/
├── index.html                  # Entry HTML with Google Fonts (Outfit & Plus Jakarta Sans)
├── package.json                # Dependencies & Vite scripts
├── vite.config.js              # Vite configuration
├── README.md                   # Experiment documentation
└── src/
    ├── main.jsx                # React DOM mount point
    ├── App.jsx                 # Main layout & provider assembly
    ├── index.css               # Design system tokens, glassmorphic UI, animations
    ├── services/
    │   └── mockApi.js          # Async backend simulation service with latency & localStorage
    ├── context/
    │   └── DraftContext.jsx    # React Context & useReducer state management
    └── components/
        ├── Header.jsx          # Top navbar, global search, API status badge & theme toggle
        ├── StatsBar.jsx        # Summary cards (Total drafts, Active, Words drafted, Sync status)
        ├── FilterBar.jsx       # Category filter, status tabs, sort dropdown, view toggle, import/export
        ├── DraftCard.jsx       # Individual draft display (Grid, List, Compact views)
        ├── DraftList.jsx       # Draft grid list with skeleton loader and error handling
        ├── DraftEditor.jsx     # Rich markdown editor with auto-save, platform & tag selector, preview
        ├── MockApiSettingsModal.jsx # Control latency, simulate HTTP 500 errors, inspect storage
        ├── ConfirmModal.jsx    # Accessible deletion/publish confirm dialog
        └── ToastContainer.jsx  # Notification toasts (success, warning, error, info)
```

## Running the Application
To launch the development server:
```bash
npm install
npm run dev
```

To build for production:
```bash
npm run build
```
