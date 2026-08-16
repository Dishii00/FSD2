import { createSelector } from '@reduxjs/toolkit';

// ==========================================
// 1. BASIC INPUT SELECTORS (Plain Accessors)
// ==========================================
export const selectAllPosts = (state) => state.posts.items;
export const selectSearchQuery = (state) => state.filters.searchQuery;
export const selectSelectedCategory = (state) => state.filters.selectedCategory;
export const selectSelectedPlatform = (state) => state.filters.selectedPlatform;
export const selectSortBy = (state) => state.filters.sortBy;
export const selectMinWordCount = (state) => state.filters.minWordCount;

// Telemetry & Config Accessors
export const selectUnrelatedTick = (state) => state.perf.unrelatedStateTick;
export const selectIsMemoizedMode = (state) => state.perf.isMemoizedMode;

// Telemetry tracker state (module-level counters for live stats display)
export let computationTracker = {
  memoizedRuns: 0,
  unmemoizedRuns: 0,
};

// ==========================================
// 2. UN-MEMOIZED SELECTOR (Recomputes on EVERY state change)
// ==========================================
export const selectFilteredPostsUnmemoized = (state) => {
  // Increment un-memoized execution counter
  computationTracker.unmemoizedRuns += 1;

  const posts = selectAllPosts(state);
  const q = selectSearchQuery(state).toLowerCase().trim();
  const category = selectSelectedCategory(state);
  const platform = selectSelectedPlatform(state);
  const sortBy = selectSortBy(state);
  const minWords = selectMinWordCount(state);

  return posts
    .filter((post) => {
      if (category !== 'All' && post.category !== category) return false;
      if (platform !== 'All' && post.platform !== platform) return false;
      if (minWords > 0 && (post.wordCount || 0) < minWords) return false;
      if (q) {
        const titleMatch = post.title.toLowerCase().includes(q);
        const contentMatch = post.content.toLowerCase().includes(q);
        return titleMatch || contentMatch;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'likes') return b.likes - a.likes;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'wordCount') return (b.wordCount || 0) - (a.wordCount || 0);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
};

// ==========================================
// 3. MEMOIZED SELECTOR (createSelector / Reselect)
// Only recomputes when input dependencies change!
// ==========================================
export const selectFilteredPostsMemoized = createSelector(
  [
    selectAllPosts,
    selectSearchQuery,
    selectSelectedCategory,
    selectSelectedPlatform,
    selectSortBy,
    selectMinWordCount,
  ],
  (posts, searchQuery, category, platform, sortBy, minWords) => {
    // Increment memoized execution counter ONLY when actual inputs change!
    computationTracker.memoizedRuns += 1;

    const q = searchQuery.toLowerCase().trim();

    return posts
      .filter((post) => {
        if (category !== 'All' && post.category !== category) return false;
        if (platform !== 'All' && post.platform !== platform) return false;
        if (minWords > 0 && (post.wordCount || 0) < minWords) return false;
        if (q) {
          const titleMatch = post.title.toLowerCase().includes(q);
          const contentMatch = post.content.toLowerCase().includes(q);
          return titleMatch || contentMatch;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'likes') return b.likes - a.likes;
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        if (sortBy === 'wordCount') return (b.wordCount || 0) - (a.wordCount || 0);
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  }
);

// Dynamic Selector Switcher based on Mode
export const selectFilteredPosts = (state) => {
  return state.perf.isMemoizedMode
    ? selectFilteredPostsMemoized(state)
    : selectFilteredPostsUnmemoized(state);
};

// ==========================================
// 4. DERIVED STATE SELECTOR (Category Analytics)
// Computes aggregated statistics derived from posts
// ==========================================
export const selectDerivedCategoryStats = createSelector(
  [selectFilteredPosts],
  (filteredPosts) => {
    const stats = {};
    let totalLikes = 0;
    let totalWords = 0;

    filteredPosts.forEach((post) => {
      const cat = post.category || 'General';
      if (!stats[cat]) {
        stats[cat] = { count: 0, likes: 0, wordCount: 0 };
      }
      stats[cat].count += 1;
      stats[cat].likes += post.likes || 0;
      stats[cat].wordCount += post.wordCount || 0;

      totalLikes += post.likes || 0;
      totalWords += post.wordCount || 0;
    });

    return {
      byCategory: stats,
      totalPosts: filteredPosts.length,
      totalLikes,
      totalWords,
      avgWordsPerPost: filteredPosts.length ? Math.round(totalWords / filteredPosts.length) : 0,
    };
  }
);

// ==========================================
// 5. DERIVED STATE SELECTOR (Platform Reach Analytics)
// ==========================================
export const selectDerivedPlatformMetrics = createSelector(
  [selectAllPosts],
  (posts) => {
    const platformCounts = {};
    posts.forEach((p) => {
      const plat = p.platform || 'General';
      platformCounts[plat] = (platformCounts[plat] || 0) + 1;
    });

    return Object.keys(platformCounts).map((plat) => ({
      platform: plat,
      count: platformCounts[plat],
      percentage: Math.round((platformCounts[plat] / posts.length) * 100),
    }));
  }
);
