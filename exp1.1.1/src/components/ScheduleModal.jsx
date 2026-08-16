import React, { useState } from 'react';
import { PLATFORMS } from '../data/platforms';
import { Calendar, Clock, X, Check, Sparkles } from 'lucide-react';

export default function ScheduleModal({
  isOpen,
  onClose,
  selectedPlatforms,
  onConfirmSchedule
}) {
  const [scheduleDate, setScheduleDate] = useState('2026-08-14');
  const [scheduleTime, setScheduleTime] = useState('09:00');
  const [autoOptimize, setAutoOptimize] = useState(true);

  if (!isOpen) return null;

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    onConfirmSchedule({
      date: scheduleDate,
      time: scheduleTime,
      autoOptimize,
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass animate-fade-in">
        <div className="modal-header">
          <div className="title-with-icon">
            <Calendar size={20} />
            <h3>Schedule Multi-Platform Post</h3>
          </div>
          <button className="btn-close" onClick={onClose}><X size={18} /></button>
        </div>

        <form onSubmit={handleScheduleSubmit} className="schedule-form">
          <div className="form-group">
            <label>Publication Date</label>
            <input 
              type="date" 
              className="form-input" 
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Publication Time</label>
            <input 
              type="time" 
              className="form-input" 
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
              required
            />
          </div>

          {/* Optimal Posting Times Insights per Platform */}
          <div className="optimal-times-box glass">
            <div className="box-title">
              <Sparkles size={14} className="icon-gold" />
              <span>Recommended Engagement Times:</span>
            </div>
            <div className="times-list">
              {selectedPlatforms.map(pId => {
                const plat = PLATFORMS[pId];
                if (!plat) return null;
                return (
                  <div key={pId} className="time-item">
                    <span className="plat-name">{plat.name}:</span>
                    <span className="plat-time">{plat.bestTime}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="modal-actions mt-4">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">
              <Clock size={16} />
              <span>Schedule Post</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
