import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    searchQuery: '',
    selectedCategory: 'All',
    selectedPlatform: 'All',
    sortBy: 'date', // 'date' | 'likes' | 'title' | 'wordCount'
    minWordCount: 0,
  },
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setSelectedPlatform(state, action) {
      state.selectedPlatform = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    setMinWordCount(state, action) {
      state.minWordCount = action.payload;
    },
    resetFilters(state) {
      state.searchQuery = '';
      state.selectedCategory = 'All';
      state.selectedPlatform = 'All';
      state.sortBy = 'date';
      state.minWordCount = 0;
    },
  },
});

export const {
  setSearchQuery,
  setSelectedCategory,
  setSelectedPlatform,
  setSortBy,
  setMinWordCount,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
