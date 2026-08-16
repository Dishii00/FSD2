import { createSlice } from '@reduxjs/toolkit';

const INITIAL_POSTS = [
  {
    id: 'p-1',
    title: 'Optimizing Redux Selectors with Reselect for High Performance',
    content: 'Derived state calculations can become bottleneck points if unmemoized. Using createSelector caches intermediate computation results and avoids unnecessary re-evaluation.',
    category: 'Performance',
    platform: 'Twitter/X',
    wordCount: 28,
    likes: 142,
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 'p-2',
    title: 'React.memo & Shallow Equal Component Rendering',
    content: 'React.memo wraps functional components to perform shallow prop comparisons, preventing re-renders when parent components update unrelated state.',
    category: 'React Architecture',
    platform: 'LinkedIn',
    wordCount: 24,
    likes: 98,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'p-3',
    title: 'Building Normalized Redux Stores vs Deeply Nested State Trees',
    content: 'Normalization flattens relational data. Combined with memoized selectors, derived collections can be computed on the fly with minimum computational complexity.',
    category: 'Performance',
    platform: 'Medium',
    wordCount: 25,
    likes: 215,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: 'p-4',
    title: '5 Micro-Optimization Benchmarks for Large Scale SPAs',
    content: 'Benchmarking selector execution speed, memoization hit rates, and component re-render counters provides visual proof of frontend efficiency.',
    category: 'Engineering',
    platform: 'Twitter/X',
    wordCount: 22,
    likes: 180,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'p-5',
    title: 'Understanding Javascript Immutability & Structural Sharing',
    content: 'Redux relies on structural sharing to ensure references remain identical when sub-trees of state do not change, powering memoized selector cache checks.',
    category: 'Engineering',
    platform: 'LinkedIn',
    wordCount: 26,
    likes: 310,
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
  }
];

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: INITIAL_POSTS,
  },
  reducers: {
    addPost(state, action) {
      const newPost = {
        id: `p-${Date.now()}`,
        title: action.payload.title,
        content: action.payload.content,
        category: action.payload.category || 'General',
        platform: action.payload.platform || 'Twitter/X',
        wordCount: action.payload.content ? action.payload.content.trim().split(/\s+/).length : 0,
        likes: 0,
        createdAt: new Date().toISOString(),
      };
      state.items.unshift(newPost);
    },
    updatePost(state, action) {
      const idx = state.items.findIndex((p) => p.id === action.payload.id);
      if (idx !== -1) {
        state.items[idx] = { ...state.items[idx], ...action.payload };
      }
    },
    deletePost(state, action) {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },
    likePost(state, action) {
      const post = state.items.find((p) => p.id === action.payload);
      if (post) {
        post.likes += 1;
      }
    },
  },
});

export const { addPost, updatePost, deletePost, likePost } = postsSlice.actions;

export default postsSlice.reducer;
