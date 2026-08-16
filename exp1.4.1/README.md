# Experiment 1.4.1: Interactive Calendar Interface for Post Scheduling

## Aim
To design and implement an interactive calendar interface for scheduling and managing posts.

## Course Outcomes (COs) Mapped
- **CO3 - BT3**: Temporal data visualization, calendar scheduling interfaces, HTML5 drag-and-drop interaction, and Redux state synchronization.

## Software Requirements
- Node.js & npm
- React.js 18 + Vite
- Redux Toolkit (`@reduxjs/toolkit`)
- React-Redux (`react-redux`)
- Lucide Icons (`lucide-react`)

## Key Architecture & Features
1. **Temporal Multi-View Engine**:
   - **Month View**: 7x5 day matrix with date cells, today highlights, and draggable post cards.
   - **Week View**: 7-day hourly grid mapping scheduled events to specific time slots.
   - **Agenda View**: Chronological list of upcoming post events.
2. **HTML5 Drag-and-Drop Rescheduling**:
   - Drag scheduled post cards across calendar cells or time slots.
   - Dispatches `reschedulePost({ id, newDate, newTime })` to update the Redux store instantly with visual dropzone highlights and feedback toasts.
3. **Redux Calendar Store (`src/store/calendarSlice.js`)**:
   - Centralized temporal state management tracking `currentDate`, `viewMode`, and `scheduledPosts`.
4. **Interactive Scheduling Modal (`ScheduleModal.jsx`)**:
   - Click any date cell to open pre-filled scheduling dialog.

## Project Structure
```
exp1.4.1/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx                # React-Redux Provider mount
    ├── App.jsx                 # App layout & view router
    ├── index.css               # Design system & drag-and-drop dropzone styles
    ├── utils/
    │   └── dateUtils.js        # Month matrix generator, week days, date formatting
    ├── store/
    │   ├── index.js            # Redux store configuration
    │   └── calendarSlice.js    # Temporal state slice & drag-and-drop rescheduling reducers
    └── components/
        ├── Header.jsx          # Date navigation & view mode switcher
        ├── CalendarMonthView.jsx # Month grid with HTML5 drag-and-drop dropzones
        ├── CalendarWeekView.jsx  # Hourly week grid with dropzone time slots
        ├── CalendarAgendaView.jsx# Chronological agenda event view
        └── ScheduleModal.jsx   # Interactive event creation & editing dialog
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
