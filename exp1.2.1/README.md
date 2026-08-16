# Experiment 1.2.1: Centralized State Management System using Redux Toolkit

## Aim
To design and implement a centralized state management system using Redux Toolkit for managing posts and platform-related data.

## Course Outcomes (COs) Mapped
- **CO1 - BT1**: Understand global state management concepts and store architecture.
- **CO2 - BT2**: Implement Redux Toolkit slices, normalized state structures (`ids` & `entities`), and React-Redux hooks.
- **CO3 - BT3**: Manage asynchronous data flows using Redux Toolkit `createAsyncThunk`.

## Software Requirements
- Node.js & npm
- React.js 18 + Vite
- Redux Toolkit (`@reduxjs/toolkit`)
- React-Redux (`react-redux`)
- Lucide Icons (`lucide-react`)

## Key Architecture & Features
1. **Redux Store Configuration**: Configured in `src/store/index.js` using `configureStore` with custom action logger middleware.
2. **Normalized State Structure**: Posts slice uses `@reduxjs/toolkit` `createEntityAdapter` to store posts in `{ ids: [...], entities: {...} }` format for `O(1)` access.
3. **Async Thunks (`createAsyncThunk`)**: Simulated async API calls for `fetchPosts`, `addPost`, `updatePost`, `deletePost`, and `togglePlatform`.
4. **Built-in Redux State Inspector UI**: Live interactive panel to inspect store tree slices, view normalized entities map, and observe real-time action dispatches.
5. **Multi-Platform Management**: Platform targets with character limit validation and active connection toggles.

## Project Structure
```
exp1.2.1/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx                # React-Redux Provider wrapper
    ├── App.jsx                 # App layout & platform initialization
    ├── index.css               # Design system & inspector styling
    ├── services/
    │   └── mockPostApi.js      # Async REST simulation with localStorage
    ├── store/
    │   ├── index.js            # Redux store & action logger middleware
    │   └── slices/
    │       ├── postsSlice.js    # Normalized posts slice & async thunks
    │       ├── platformsSlice.js # Connected social platforms slice
    │       └── uiSlice.js       # UI state, modals, search, action history queue
    └── components/
        ├── Header.jsx          # Top navbar with Redux search & inspector toggle
        ├── PlatformDashboard.jsx # Connected platform cards & toggle switches
        ├── PostCard.jsx        # Normalized post card with Redux actions
        ├── PostList.jsx        # Post grid list with loading skeletons & filter tabs
        ├── PostModal.jsx       # Add/Edit post dialog connected via useDispatch & useSelector
        ├── ReduxInspectorDrawer.jsx # Visual Redux store tree & action log history
        └── ToastContainer.jsx  # Notification alerts for Redux dispatches
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
