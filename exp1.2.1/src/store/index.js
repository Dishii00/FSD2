import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/postsSlice';
import platformsReducer from './slices/platformsSlice';
import uiReducer, { logReduxAction } from './slices/uiSlice';

// Custom Middleware to track dispatched Redux actions for the built-in State Inspector
const actionLoggerMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (
    action.type && 
    !action.type.startsWith('ui/logReduxAction') &&
    !action.type.startsWith('ui/addToast') &&
    !action.type.startsWith('ui/removeToast')
  ) {
    store.dispatch(
      logReduxAction({
        type: action.type,
        payload: action.payload,
      })
    );
  }
  return result;
};

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    platforms: platformsReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(actionLoggerMiddleware),
});
