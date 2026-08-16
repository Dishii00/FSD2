import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockPostApi } from '../../services/mockPostApi';

export const fetchPlatformsThunk = createAsyncThunk(
  'platforms/fetchPlatforms',
  async (_, { rejectWithValue }) => {
    try {
      return await mockPostApi.fetchPlatforms();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const togglePlatformThunk = createAsyncThunk(
  'platforms/togglePlatform',
  async (platformId, { rejectWithValue }) => {
    try {
      return await mockPostApi.togglePlatform(platformId);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const platformsSlice = createSlice({
  name: 'platforms',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    togglePlatformConnection(state, action) {
      const platform = state.list.find((p) => p.id === action.payload);
      if (platform) {
        platform.connected = !platform.connected;
        platform.status = platform.connected ? 'active' : 'inactive';
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlatformsThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlatformsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchPlatformsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(togglePlatformThunk.fulfilled, (state, action) => {
        const idx = state.list.findIndex((p) => p.id === action.payload.id);
        if (idx !== -1) {
          state.list[idx] = action.payload;
        }
      });
  },
});

export const { togglePlatformConnection } = platformsSlice.actions;

export const selectAllPlatforms = (state) => state.platforms.list;
export const selectActivePlatforms = (state) => state.platforms.list.filter((p) => p.connected);

export default platformsSlice.reducer;
