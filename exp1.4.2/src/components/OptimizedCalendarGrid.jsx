import React, { useMemo, useCallback, useState } from 'react';
import { getMonthMatrix, WEEKDAY_NAMES, formatDateString } from '../utils/dateUtils';
import { CalendarCellMemo } from './CalendarCellMemo';
import { Plus } from 'lucide-react';

export default function OptimizedCalendarGrid({ 
  currentDate, 
  scheduledPosts, 
  setScheduledPosts, 
  onOpenScheduleModal, 
  isOptimized 
}) {
  const d = new Date(currentDate);

  // 1. MEMOIZATION: useMemo for expensive month matrix calculation
  const monthMatrix = useMemo(() => {
    return getMonthMatrix(d.getFullYear(), d.getMonth());
  }, [d.getFullYear(), d.getMonth()]);

  // 2. MEMOIZATION: useMemo for post lookup dictionary by dateString
  const postsByDateMap = useMemo(() => {
    const map = {};
    scheduledPosts.forEach((post) => {
      if (!map[post.scheduledDate]) map[post.scheduledDate] = [];
      map[post.scheduledDate].push(post);
    });
    return map;
  }, [scheduledPosts]);

  // Drag state
  const [draggedPostId, setDraggedPostId] = useState(null);
  const [dragOverDate, setDragOverDate] = useState(null);

  // 3. MEMOIZATION: useCallback for stable event handlers
  const handleDragStart = useCallback((e, postId) => {
    e.dataTransfer.setData('text/plain', postId);
    setDraggedPostId(postId);
  }, []);

  const handleDragOver = useCallback((e, dateString) => {
    e.preventDefault();
    if (dragOverDate !== dateString) {
      setDragOverDate(dateString);
    }
  }, [dragOverDate]);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragOverDate(null);
  }, []);

  const handleDrop = useCallback((e, targetDateString) => {
    e.preventDefault();
    const postId = e.dataTransfer.getData('text/plain') || draggedPostId;
    if (postId) {
      setScheduledPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, scheduledDate: targetDateString } : p))
      );
    }
    setDraggedPostId(null);
    setDragOverDate(null);
  }, [draggedPostId, setScheduledPosts]);

  const handleCellClick = useCallback((target) => {
    onOpenScheduleModal(target);
  }, [onOpenScheduleModal]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      
      {/* Weekday Row Header */}
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
          const dayPosts = postsByDateMap[cell.dateString] || [];

          return (
            <CalendarCellMemo
              key={cell.dateString}
              cell={cell}
              dayPosts={dayPosts}
              onCellClick={handleCellClick}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onDragStart={handleDragStart}
              isOptimized={isOptimized}
            />
          );
        })}
      </div>

    </div>
  );
}
