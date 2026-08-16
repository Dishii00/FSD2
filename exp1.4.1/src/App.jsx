import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearToast } from './store/calendarSlice';
import Header from './components/Header';
import CalendarMonthView from './components/CalendarMonthView';
import CalendarWeekView from './components/CalendarWeekView';
import CalendarAgendaView from './components/CalendarAgendaView';
import ScheduleModal from './components/ScheduleModal';
import { Sparkles, CheckCircle2 } from 'lucide-react';

function MainAppContent() {
  const dispatch = useDispatch();
  const viewMode = useSelector((state) => state.calendar.viewMode);
  const toastMessage = useSelector((state) => state.calendar.toastMessage);

  // Auto-dismiss toast
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => dispatch(clearToast()), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, dispatch]);

  return (
    <div className="app-container">
      {/* Navigation Header */}
      <Header />

      {/* Dynamic View Layout */}
      <main>
        {viewMode === 'month' && <CalendarMonthView />}
        {viewMode === 'week' && <CalendarWeekView />}
        {viewMode === 'agenda' && <CalendarAgendaView />}
      </main>

      {/* Modal Dialog */}
      <ScheduleModal />

      {/* Toast Notification Alert for Drag & Drop / Reschedule */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 1300,
          background: 'var(--bg-card)',
          borderLeft: '4px solid var(--accent-cyan)',
          padding: '0.85rem 1.25rem',
          borderRadius: 'var(--radius-sm)',
          boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          animation: 'fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          border: '1px solid var(--border-color)',
          borderLeftColor: 'var(--primary)'
        }}>
          <CheckCircle2 size={18} color="var(--primary)" />
          <span style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--text-primary)' }}>
            {toastMessage}
          </span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return <MainAppContent />;
}
