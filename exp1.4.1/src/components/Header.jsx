import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  navigateMonth, 
  setCurrentDate, 
  setViewMode, 
  openScheduleModal 
} from '../store/calendarSlice';
import { formatMonthTitle } from '../utils/dateUtils';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  PlusCircle, 
  Grid, 
  Columns, 
  List, 
  Clock, 
  Sparkles 
} from 'lucide-react';

export default function Header() {
  const dispatch = useDispatch();
  const currentDate = useSelector((state) => state.calendar.currentDate);
  const viewMode = useSelector((state) => state.calendar.viewMode);

  const handleTodayClick = () => {
    dispatch(setCurrentDate(new Date().toISOString()));
  };

  return (
    <header className="glass-panel" style={{ padding: '1rem 1.5rem', borderRadius: 'var(--radius-lg)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--primary), var(--accent-cyan))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-glow)',
            color: 'white'
          }}>
            <CalendarIcon size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0 }}>PostCalendar</h1>
              <span className="badge" style={{ background: 'var(--primary-light)', color: 'var(--primary)', border: '1px solid var(--primary)', fontSize: '0.65rem' }}>
                EXP 1.4.1 HCI CALENDAR
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              Temporal Data Visualization & Drag-and-Drop Rescheduling
            </p>
          </div>
        </div>

        {/* Date Navigation (Prev, Today, Next + Title) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'rgba(0,0,0,0.2)', padding: '0.25rem', borderRadius: 'var(--radius-sm)' }}>
            <button className="btn btn-secondary btn-icon" onClick={() => dispatch(navigateMonth(-1))} title="Previous Month">
              <ChevronLeft size={18} />
            </button>

            <button className="btn btn-secondary" onClick={handleTodayClick} style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}>
              Today
            </button>

            <button className="btn btn-secondary btn-icon" onClick={() => dispatch(navigateMonth(1))} title="Next Month">
              <ChevronRight size={18} />
            </button>
          </div>

          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', minWidth: '160px', textAlign: 'center' }}>
            {formatMonthTitle(currentDate)}
          </h2>
        </div>

        {/* View Mode Switcher & Schedule Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          
          {/* View Mode Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'rgba(0,0,0,0.2)', padding: '0.25rem', borderRadius: 'var(--radius-sm)' }}>
            {[
              { id: 'month', label: 'Month', icon: Grid },
              { id: 'week', label: 'Week', icon: Columns },
              { id: 'agenda', label: 'Agenda', icon: List },
            ].map((v) => {
              const IconComp = v.icon;
              const isActive = viewMode === v.id;
              return (
                <button
                  key={v.id}
                  onClick={() => dispatch(setViewMode(v.id))}
                  style={{
                    background: isActive ? 'var(--primary)' : 'transparent',
                    color: isActive ? 'white' : 'var(--text-secondary)',
                    border: 'none',
                    padding: '0.4rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  <IconComp size={14} />
                  {v.label}
                </button>
              );
            })}
          </div>

          {/* Schedule Post Action */}
          <button className="btn btn-primary" onClick={() => dispatch(openScheduleModal())}>
            <PlusCircle size={18} />
            <span>Schedule Post</span>
          </button>

        </div>

      </div>
    </header>
  );
}
