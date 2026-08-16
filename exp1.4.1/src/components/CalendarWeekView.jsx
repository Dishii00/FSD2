import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getWeekDays, formatDateString } from '../utils/dateUtils';
import { openScheduleModal, reschedulePost } from '../store/calendarSlice';
import { Clock, Plus } from 'lucide-react';

const HOURS = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];

export default function CalendarWeekView() {
  const dispatch = useDispatch();
  const currentDate = useSelector((state) => state.calendar.currentDate);
  const scheduledPosts = useSelector((state) => state.calendar.scheduledPosts);

  const weekDays = getWeekDays(currentDate);

  const [draggedPostId, setDraggedPostId] = useState(null);
  const [dragOverCell, setDragOverCell] = useState(null); // 'dateString-hour'

  const handleDragStart = (e, postId) => {
    e.dataTransfer.setData('text/plain', postId);
    setDraggedPostId(postId);
  };

  const handleDrop = (e, targetDateString, targetHour) => {
    e.preventDefault();
    const postId = e.dataTransfer.getData('text/plain') || draggedPostId;
    if (postId) {
      dispatch(reschedulePost({ id: postId, newDate: targetDateString, newTime: targetHour }));
    }
    setDraggedPostId(null);
    setDragOverCell(null);
  };

  return (
    <div className="glass-panel" style={{ padding: '1rem', overflowX: 'auto' }}>
      
      {/* Week Table Grid */}
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
            <th style={{ padding: '0.75rem', width: '80px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>Time</th>
            {weekDays.map((wd) => (
              <th
                key={wd.dateString}
                style={{
                  padding: '0.75rem',
                  textAlign: 'center',
                  background: wd.isToday ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                  borderLeft: '1px solid var(--border-color)'
                }}
              >
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{wd.dayName}</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '800', color: wd.isToday ? 'var(--primary)' : 'var(--text-primary)' }}>
                  {wd.dayNumber}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {HOURS.map((hour) => (
            <tr key={hour} style={{ borderBottom: '1px solid var(--border-color)' }}>
              {/* Time Column */}
              <td style={{ padding: '0.75rem 0.5rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textAlign: 'center' }}>
                {hour}
              </td>

              {/* Days Columns */}
              {weekDays.map((wd) => {
                const cellKey = `${wd.dateString}-${hour}`;
                const cellPosts = scheduledPosts.filter(
                  (p) => p.scheduledDate === wd.dateString && p.scheduledTime.slice(0, 2) === hour.slice(0, 2)
                );
                const isDragOver = dragOverCell === cellKey;

                return (
                  <td
                    key={wd.dateString}
                    style={{
                      padding: '0.4rem',
                      height: '85px',
                      verticalAlign: 'top',
                      borderLeft: '1px solid var(--border-color)',
                      background: isDragOver ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                      transition: 'var(--transition-fast)'
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      if (dragOverCell !== cellKey) setDragOverCell(cellKey);
                    }}
                    onDragLeave={() => setDragOverCell(null)}
                    onDrop={(e) => handleDrop(e, wd.dateString, hour)}
                    onClick={() => dispatch(openScheduleModal(wd.dateString))}
                  >
                    {cellPosts.map((post) => (
                      <div
                        key={post.id}
                        className="draggable-event"
                        draggable
                        onDragStart={(e) => handleDragStart(e, post.id)}
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(openScheduleModal(post));
                        }}
                        style={{ borderLeft: `3px solid ${post.color || 'var(--primary)'}` }}
                      >
                        <div style={{ fontSize: '0.7rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                          {post.title}
                        </div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                          {post.scheduledTime}
                        </div>
                      </div>
                    ))}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
