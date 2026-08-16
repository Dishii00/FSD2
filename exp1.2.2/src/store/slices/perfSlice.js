import { createSlice } from '@reduxjs/toolkit';

const perfSlice = createSlice({
  name: 'perf',
  initialState: {
    unrelatedStateTick: 0,
    isMemoizedMode: true,
    isRenderHighlightEnabled: true,
    selectorComputations: 0,
    selectorCacheHits: 0,
    isPostModalOpen: false,
    theme: localStorage.getItem('exp1_2_2_theme') || 'dark',
  },
  reducers: {
    triggerUnrelatedStateUpdate(state) {
      state.unrelatedStateTick += 1;
    },
    toggleMemoizedMode(state) {
      state.isMemoizedMode = !state.isMemoizedMode;
      // Reset telemetry metrics on mode switch
      state.selectorComputations = 0;
      state.selectorCacheHits = 0;
    },
    toggleRenderHighlight(state) {
      state.isRenderHighlightEnabled = !state.isRenderHighlightEnabled;
    },
    incrementComputationCount(state) {
      state.selectorComputations += 1;
    },
    incrementCacheHitCount(state) {
      state.selectorCacheHits += 1;
    },
    togglePostModal(state, action) {
      state.isPostModalOpen = typeof action.payload === 'boolean' ? action.payload : !state.isPostModalOpen;
    },
    toggleTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('exp1_2_2_theme', state.theme);
    },
  },
});

export const {
  triggerUnrelatedStateUpdate,
  toggleMemoizedMode,
  toggleRenderHighlight,
  incrementComputationCount,
  incrementCacheHitCount,
  togglePostModal,
  toggleTheme,
} = perfSlice.actions;

export default perfSlice.reducer;
