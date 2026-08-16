import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/postsSlice';
import filtersReducer from './slices/filtersSlice';
import perfReducer from './slices/perfSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    filters: filtersReducer,
    perf: perfReducer,
  },
});
