# Experiment 1.4.2: Rendering Performance Optimization & Unit Testing Suite

## Aim
To optimize rendering performance and implement testing strategies for interactive UI components.

## Course Outcomes (COs) Mapped
- **CO4 - BT4**: Analyze performance bottlenecks, implement `useMemo` & `useCallback` optimization hooks, and apply `React.memo` component memoization.
- **CO5 - BT5**: Design and execute automated unit testing suites (Vitest) verifying memoization reference retention and component interactions.

## Software Requirements
- Node.js & npm
- React.js 18 + Vite
- Vitest (`vitest`)
- Lucide Icons (`lucide-react`)

## Key Architecture & Features
1. **Rendering Optimization Engine**:
   - `useMemo`: Caches expensive month matrix calculations (`getMonthMatrix`) and post-by-date lookup maps.
   - `useCallback`: Maintains stable function references across renders for cell click and drag handlers.
   - `React.memo`: Wraps `CalendarCellMemo` to skip re-rendering when cell props remain unchanged.
2. **Visual Re-render Counter Badges & Flash Animations**:
   - Each calendar day cell displays an individual `Renders: X` count badge and flashes green when rendered.
   - Switch between **Optimized Mode** (`React.memo` active) vs **Unoptimized Mode** to visually compare re-render counts when clicking *Trigger Parent Re-render*.
3. **In-Browser Vitest Unit Test Suite Runner (`UnitTestRunnerModal.jsx`)**:
   - Runs 5 automated unit test assertions live in the UI verifying `useMemo` caching, `useCallback` reference retention, `React.memo` prop checks, drag-and-drop state mutation, and modal handlers.

## Project Structure
```
exp1.4.2/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx                # React DOM entry point
    ├── App.jsx                 # Main layout & state manager
    ├── index.css               # Design system & cell re-render flash animations
    ├── utils/
    │   └── dateUtils.js        # Date matrix generator & formatters
    ├── tests/
    │   └── componentTests.test.js # Vitest unit test suite
    └── components/
        ├── Header.jsx          # Mode toggle & Trigger Parent Re-render controls
        ├── PerfTestingDashboard.jsx # Live telemetry metrics panel
        ├── CalendarCellMemo.jsx # React.memo component with Renders counter
        ├── OptimizedCalendarGrid.jsx # Grid applying useMemo & useCallback
        └── UnitTestRunnerModal.jsx # In-browser Vitest runner modal
```

## Running the Application & Unit Tests
```bash
npm install
npm run dev
```

Run Vitest unit tests via CLI:
```bash
npm test
```

Build for production:
```bash
npm run build
```
