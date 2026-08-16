import React from 'react';
import { DraftProvider, useDrafts } from './context/DraftContext';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import FilterBar from './components/FilterBar';
import DraftList from './components/DraftList';
import DraftEditor from './components/DraftEditor';
import MockApiSettingsModal from './components/MockApiSettingsModal';
import ConfirmModal from './components/ConfirmModal';
import ToastContainer from './components/ToastContainer';

function MainAppContent() {
  const { isEditorOpen } = useDrafts();

  return (
    <div className="app-container">
      {/* Top Header */}
      <Header />

      {/* Statistics Cards */}
      <StatsBar />

      {/* Filter & Action Toolbar */}
      <FilterBar />

      {/* Draft List / Grid / Skeletons */}
      <DraftList />

      {/* Modals & Overlays */}
      {isEditorOpen && <DraftEditor />}
      <MockApiSettingsModal />
      <ConfirmModal />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <DraftProvider>
      <MainAppContent />
    </DraftProvider>
  );
}
