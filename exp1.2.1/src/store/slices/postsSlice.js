import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { mockPostApi } from '../../services/mockPostApi';

// Redux Toolkit Entity Adapter for State Normalization
// Normalizes state to: { ids: ['post-201', 'post-202'], entities: { 'post-201': {...}, 'post-202': {...} } }
export const postsAdapter = createEntityAdapter({
  selectId: (post) => post.id,
  sortComparer: (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
});

// Async Thunks using Redux Toolkit createAsyncThunk
export const fetchPostsThunk = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const posts = await mockPostApi.fetchPosts();
      return posts;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addPostThunk = createAsyncThunk(
  'posts/addPost',
  async (postData, { rejectWithValue }) => {
    try {
      const newPost = await mockPostApi.createPost(postData);
      return newPost;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updatePostThunk = createAsyncThunk(
  'posts/updatePost',
  async (postData, { rejectWithValue }) => {
    try {
      const updatedPost = await mockPostApi.updatePost(postData);
      return updatedPost;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deletePostThunk = createAsyncThunk(
  'posts/deletePost',
  async (postId, { rejectWithValue }) => {
    try {
      const deletedId = await mockPostApi.deletePost(postId);
      return deletedId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: postsAdapter.getInitialState({
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    savingStatus: 'idle', // 'idle' | 'saving' | 'saved'
  }),
  reducers: {
    // Synchronous Reducers for local state manipulation
    postAdded: postsAdapter.addOne,
    postUpdated: postsAdapter.updateOne,
    postRemoved: postsAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      // Fetch Posts Async Lifecycle
      .addCase(fetchPostsThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPostsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        postsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchPostsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch posts.';
      })
      
      // Add Post Async Lifecycle
      .addCase(addPostThunk.pending, (state) => {
        state.savingStatus = 'saving';
      })
      .addCase(addPostThunk.fulfilled, (state, action) => {
        state.savingStatus = 'saved';
        postsAdapter.addOne(state, action.payload);
      })
      .addCase(addPostThunk.rejected, (state, action) => {
        state.savingStatus = 'idle';
        state.error = action.payload;
      })

      // Update Post Async Lifecycle
      .addCase(updatePostThunk.pending, (state) => {
        state.savingStatus = 'saving';
      })
      .addCase(updatePostThunk.fulfilled, (state, action) => {
        state.savingStatus = 'saved';
        postsAdapter.upsertOne(state, action.payload);
      })
      .addCase(updatePostThunk.rejected, (state, action) => {
        state.savingStatus = 'idle';
        state.error = action.payload;
      })

      // Delete Post Async Lifecycle
      .addCase(deletePostThunk.fulfilled, (state, action) => {
        postsAdapter.removeOne(state, action.payload);
      });
  },
});

export const { postAdded, postUpdated, postRemoved } = postsSlice.actions;

// Redux Entity Selectors for Normalized Posts
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  selectEntities: selectPostEntities,
} = postsAdapter.getSelectors((state) => state.posts);

export default postsSlice.reducer;
