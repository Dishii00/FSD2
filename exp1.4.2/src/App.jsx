import React, { useState } from 'react';
import Header from './components/Header';
import PerfTestingDashboard from './components/PerfTestingDashboard';
import OptimizedCalendarGrid from './components/OptimizedCalendarGrid';
import UnitTestRunnerModal from './components/UnitTestRunnerModal';
import { formatDateString } from './utils/dateUtils';
import { CheckCircle2, X, Calendar, Clock, Save, Share2 } from 'lucide-react';

const INITIAL_POSTS = [
  {
    id: 'evt-1',
    title: 'Optimizing React.memo & useCallback References',
    content: 'Testing cell render count retention when parent re-renders.',
    scheduledDate: formatDateString(new Date()),
    scheduledTime: '10:00',
    color: '#10b981',
  },
  {
    id: 'evt-2',
    title: 'Benchmarking Vitest Unit Test Assertions',
    content: 'Validating useMemo date matrix calculation reference equality.',
    scheduledDate: formatDateString(new Date(Date.now() + 86400000 * 2)),
    scheduledTime: '14:30',
    color: '#06b6d4',
  },
];

export default function App() {
  const [isOptimized, setIsOptimized] = useState(true);
  const [parentTick, setParentTick] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString());
  const [scheduledPosts, setScheduledPosts] = useState(INITIAL_POSTS);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('exp1_4_2_theme') || 'dark');

  // Simple modal state for post scheduling
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(formatDateString(new Date()));
  const [titleInput, setTitleInput] = useState('');

  const handleOpenScheduleModal = (target) => {
    if (typeof target === 'string') {
      setSelectedDate(target);
      setTitleInput('');
    } else if (target?.scheduledDate) {
      setSelectedDate(target.scheduledDate);
      setTitleInput(target.title);
    }
    setIsScheduleModalOpen(true);
  };

  const handleSavePost = (e) => {
    e.preventDefault();
    if (!titleInput.trim()) return;

    const newPost = {
      id: `evt-${Date.now()}`,
      title: titleInput,
      content: 'Scheduled via performance lab UI',
      scheduledDate: selectedDate,
      scheduledTime: '12:00',
      color: '#10b981',
    };
    setScheduledPosts((prev) => [newPost, ...prev]);
    setIsScheduleModalOpen(false);
    setTitleInput('');
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Header
        isOptimized={isOptimized}
        setIsOptimized={setIsOptimized}
        parentTick={parentTick}
        setParentTick={setParentTick}
        onOpenTestModal={() => setIsTestModalOpen(true)}
        theme={theme}
        setTheme={setTheme}
        onOpenScheduleModal={() => handleOpenScheduleModal(formatDateString(new Date()))}
      />

      {/* Rendering & Testing Telemetry Dashboard */}
      <PerfTestingDashboard
        isOptimized={isOptimized}
        parentTick={parentTick}
        onOpenTestModal={() => setIsTestModalOpen(true)}
      />

      {/* Optimized Calendar Grid */}
      <main>
        <OptimizedCalendarGrid
          currentDate={currentDate}
          scheduledPosts={scheduledPosts}
          setScheduledPosts={setScheduledPosts}
          onOpenScheduleModal={handleOpenScheduleModal}
          isOptimized={isOptimized}
        />
      </main>

      {/* Unit Test Suite Runner Modal */}
      <UnitTestRunnerModal
        isOpen={isTestModalOpen}
        onClose={() => setIsTestModalOpen(false)}
      />

      {/* Scheduling Dialog Modal */}
      {isScheduleModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 1100,
          background: 'var(--bg-overlay)',
          backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '480px', padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.15rem', margin: 0 }}>Schedule Event ({selectedDate})</h3>
              <button className="btn btn-secondary btn-icon" onClick={() => setIsScheduleModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSavePost} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                  Post Title
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Performance Profiling Demo"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsScheduleModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Save size={16} /> Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
