import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isPostModalOpen: false,
    editingPostId: null,
    isInspectorOpen: false,
    searchQuery: '',
    selectedPlatformFilter: 'all',
    selectedStatusFilter: 'all',
    theme: localStorage.getItem('exp1_2_1_theme') || 'dark',
    actionLog: [], // Redux Action History Inspector Queue
    toasts: [],
  },
  reducers: {
    openPostModal(state, action) {
      state.isPostModalOpen = true;
      state.editingPostId = action.payload || null;
    },
    closePostModal(state) {
      state.isPostModalOpen = false;
      state.editingPostId = null;
    },
    toggleInspector(state) {
      state.isInspectorOpen = !state.isInspectorOpen;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setPlatformFilter(state, action) {
      state.selectedPlatformFilter = action.payload;
    },
    setStatusFilter(state, action) {
      state.selectedStatusFilter = action.payload;
    },
    toggleTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('exp1_2_1_theme', state.theme);
    },
    logReduxAction(state, action) {
      // Record action to actionLog queue for the Redux Inspector UI
      state.actionLog.unshift({
        id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        type: action.payload.type,
        payload: action.payload.payload,
        timestamp: new Date().toLocaleTimeString(),
      });
      if (state.actionLog.length > 50) state.actionLog.pop();
    },
    clearActionLog(state) {
      state.actionLog = [];
    },
    addToast(state, action) {
      state.toasts.push(action.payload);
    },
    removeToast(state, action) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const {
  openPostModal,
  closePostModal,
  toggleInspector,
  setSearchQuery,
  setPlatformFilter,
  setStatusFilter,
  toggleTheme,
  logReduxAction,
  clearActionLog,
  addToast,
  removeToast,
} = uiSlice.actions;

export default uiSlice.reducer;
