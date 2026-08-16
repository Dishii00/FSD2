import React, { useRef, useEffect, useState } from 'react';
import { Plus } from 'lucide-react';

function CalendarCellComponent({ 
  cell, 
  dayPosts, 
  onCellClick, 
  onDragOver, 
  onDragLeave, 
  onDrop, 
  onDragStart,
  isOptimized 
}) {
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    if (renderCountRef.current > 1) {
      setIsFlashing(true);
      const timer = setTimeout(() => setIsFlashing(false), 500);
      return () => clearTimeout(timer);
    }
  }, [cell, dayPosts]);

  return (
    <div
      className={`month-day-cell ${!cell.isCurrentMonth ? 'other-month' : ''} ${cell.isToday ? 'today' : ''} ${isFlashing ? 'cell-rerender-flash' : ''}`}
      onDragOver={(e) => onDragOver(e, cell.dateString)}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, cell.dateString)}
      onClick={() => onCellClick(cell.dateString)}
    >
      {/* Day Header & Render Counter Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
        <span style={{
          fontSize: '0.85rem',
          fontWeight: cell.isToday ? '800' : '600',
          color: cell.isToday ? 'var(--primary)' : cell.isCurrentMonth ? 'var(--text-primary)' : 'var(--text-muted)'
        }}>
          {cell.dayNumber}
        </span>

        <span style={{
          fontSize: '0.65rem',
          fontFamily: 'var(--font-mono)',
          background: 'rgba(0,0,0,0.4)',
          padding: '0.1rem 0.4rem',
          borderRadius: '99px',
          color: isOptimized ? 'var(--primary)' : 'var(--accent-rose)',
          border: '1px solid var(--border-color)'
        }}>
          Renders: {renderCountRef.current}
        </span>
      </div>

      {/* Scheduled Events List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', overflowY: 'auto', flex: 1 }}>
        {dayPosts.map((post) => (
          <div
            key={post.id}
            className="draggable-event"
            draggable
            onDragStart={(e) => onDragStart(e, post.id)}
            onClick={(e) => {
              e.stopPropagation();
              onCellClick(post);
            }}
            style={{
              borderLeft: `3px solid ${post.color || 'var(--primary)'}`,
              background: 'rgba(255, 255, 255, 0.07)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                {post.scheduledTime}
              </span>
            </div>
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {post.title}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

// Custom Comparison for React.memo optimization
function areEqual(prevProps, nextProps) {
  // If optimization is disabled, always re-render to demonstrate bottleneck
  if (!nextProps.isOptimized) return false;

  return (
    prevProps.cell.dateString === nextProps.cell.dateString &&
    prevProps.cell.isCurrentMonth === nextProps.cell.isCurrentMonth &&
    prevProps.cell.isToday === nextProps.cell.isToday &&
    prevProps.dayPosts === nextProps.dayPosts &&
    prevProps.onCellClick === nextProps.onCellClick &&
    prevProps.onDrop === nextProps.onDrop
  );
}

export const CalendarCellMemo = React.memo(CalendarCellComponent, areEqual);
