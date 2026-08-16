# Experiment 1.2.2: Optimizing State Access with Memoized Selectors (Reselect)

## Aim
To optimize state access and improve application performance using memoized selectors and efficient rendering strategies.

## Course Outcomes (COs) Mapped
- **CO1 - BT1**: Understand derived state concepts and cache hit mechanisms.
- **CO2 - BT2**: Implement memoized selectors using `createSelector` (Reselect / Redux Toolkit).
- **CO3 - BT3**: Eliminate unnecessary component re-renders using `React.memo` and input reference checks.
- **CO4 - BT4**: Analyze re-render performance drag using live telemetry counters.
- **CO5 - BT5**: Evaluate memoized vs un-memoized selector execution trade-offs.
- **CO6 - BT6**: Design scalable, high-performance frontend state architecture.

## Software Requirements
- Node.js & npm
- React.js 18 + Vite
- Redux Toolkit (`@reduxjs/toolkit`)
- Reselect (`reselect`)
- React-Redux (`react-redux`)
- Lucide Icons (`lucide-react`)

## Key Architecture & Performance Techniques
1. **Memoized Selectors (`src/store/selectors.js`)**:
   - `selectFilteredPosts`: Built with `createSelector` to cache result computations. When unrelated state mutates, input reference check passes and returns cached result instantly without re-filtering array items!
   - `selectDerivedCategoryStats` & `selectDerivedPlatformMetrics`: Derived state computed dynamically without data duplication in store.
2. **Benchmark Mode Switcher**:
   - Toggle between **Un-memoized Mode** and **Memoized Mode**.
   - Click **"Trigger Unrelated State Update"** to observe that in Memoized mode, selector computation counter remains unchanged!
3. **Rendering Optimization**:
   - Post items wrapped in `React.memo` ([`PostCardMemo.jsx`](file:///c:/Users/ASUS/.gemini/antigravity-ide/scratch/FSD/exp1.2.2/src/components/PostCardMemo.jsx)) with render flash visual cues.

## Project Structure
```
exp1.2.2/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx                # React-Redux Provider mount
    ├── App.jsx                 # Performance lab layout
    ├── index.css               # Design system & re-render flash animations
    ├── store/
    │   ├── index.js            # Store setup with posts, filters, perf slices
    │   ├── selectors.js        # Basic input selectors & createSelector memoized selectors
    │   └── slices/
    │       ├── postsSlice.js    # Posts collection & actions
    │       ├── filtersSlice.js  # Filter parameters (search, category, platform, minWords)
    │       └── perfSlice.js     # Telemetry ticks, computation counters & mode toggles
    └── components/
        ├── Header.jsx          # Navbar with memoization mode switcher & search query
        ├── PerfDashboard.jsx   # Live telemetry dashboard & "Trigger Unrelated Update" button
        ├── DerivedAnalyticsCard.jsx # Derived state analytics cards (createSelector)
        ├── FilterBar.jsx       # Category, platform, and sorting controls
        ├── PostCardMemo.jsx    # React.memo memoized post card with re-render counter
        ├── PostList.jsx        # Post feed connected to memoized selectors
        └── PostModal.jsx       # Post creation modal to test selector recomputation
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
