import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  getMonthMatrix, 
  WEEKDAY_NAMES, 
  formatDateString 
} from '../utils/dateUtils';
import { 
  openScheduleModal, 
  reschedulePost 
} from '../store/calendarSlice';
import { Clock, Plus, Share2 } from 'lucide-react';

export default function CalendarMonthView() {
  const dispatch = useDispatch();
  const currentDate = useSelector((state) => state.calendar.currentDate);
  const scheduledPosts = useSelector((state) => state.calendar.scheduledPosts);

  const [draggedPostId, setDraggedPostId] = useState(null);
  const [dragOverDate, setDragOverDate] = useState(null);

  const d = new Date(currentDate);
  const monthMatrix = getMonthMatrix(d.getFullYear(), d.getMonth());

  // Drag & Drop Handlers
  const handleDragStart = (e, postId) => {
    e.dataTransfer.setData('text/plain', postId);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedPostId(postId);
  };

  const handleDragOver = (e, dateString) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverDate !== dateString) {
      setDragOverDate(dateString);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOverDate(null);
  };

  const handleDrop = (e, targetDateString) => {
    e.preventDefault();
    const postId = e.dataTransfer.getData('text/plain') || draggedPostId;
    if (postId) {
      dispatch(reschedulePost({ id: postId, newDate: targetDateString }));
    }
    setDraggedPostId(null);
    setDragOverDate(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      
      {/* Weekday Header Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', textAlign: 'center' }}>
        {WEEKDAY_NAMES.map((day) => (
          <div key={day} style={{ padding: '0.65rem', fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {day}
          </div>
        ))}
      </div>

      {/* Month Days Grid */}
      <div className="month-grid">
        {monthMatrix.map((cell) => {
          // Filter posts scheduled for this day
          const dayPosts = scheduledPosts.filter((p) => p.scheduledDate === cell.dateString);
          const isDragOver = dragOverDate === cell.dateString;

          return (
            <div
              key={cell.dateString}
              className={`month-day-cell ${!cell.isCurrentMonth ? 'other-month' : ''} ${cell.isToday ? 'today' : ''} ${isDragOver ? 'drag-over' : ''}`}
              onDragOver={(e) => handleDragOver(e, cell.dateString)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, cell.dateString)}
              onClick={() => dispatch(openScheduleModal(cell.dateString))}
            >
              {/* Day Number Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <span style={{
                  fontSize: '0.85rem',
                  fontWeight: cell.isToday ? '800' : '600',
                  color: cell.isToday ? 'var(--primary)' : cell.isCurrentMonth ? 'var(--text-primary)' : 'var(--text-muted)'
                }}>
                  {cell.dayNumber}
                </span>

                <button
                  className="btn btn-secondary btn-icon"
                  style={{ width: '20px', height: '20px', padding: 0, opacity: 0.5 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(openScheduleModal(cell.dateString));
                  }}
                  title="Schedule post on this date"
                >
                  <Plus size={12} />
                </button>
              </div>

              {/* Scheduled Posts Events */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', overflowY: 'auto', flex: 1 }}>
                {dayPosts.map((post) => (
                  <div
                    key={post.id}
                    className="draggable-event"
                    draggable
                    onDragStart={(e) => handleDragStart(e, post.id)}
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(openScheduleModal(post));
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
                      <div style={{ display: 'flex', gap: '0.2rem' }}>
                        {post.platforms && post.platforms.slice(0, 2).map((plat) => (
                          <span key={plat} style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>
                            #{plat.slice(0, 2)}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      color: 'var(--text-primary)'
                    }}>
                      {post.title}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
