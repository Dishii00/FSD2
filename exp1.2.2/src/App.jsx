import React from 'react';
import Header from './components/Header';
import PerfDashboard from './components/PerfDashboard';
import DerivedAnalyticsCard from './components/DerivedAnalyticsCard';
import FilterBar from './components/FilterBar';
import PostList from './components/PostList';
import PostModal from './components/PostModal';

export default function App() {
  return (
    <div className="app-container">
      {/* Top Header */}
      <Header />

      {/* Selector & Render Benchmark Dashboard */}
      <PerfDashboard />

      {/* Derived Analytics Cards (createSelector) */}
      <DerivedAnalyticsCard />

      {/* Filter Toolbar */}
      <FilterBar />

      {/* Post List & React.memo Post Cards */}
      <PostList />

      {/* Modal Dialog */}
      <PostModal />
    </div>
  );
}
