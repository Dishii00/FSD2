import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  closeScheduleModal, 
  addScheduledPost, 
  updateScheduledPost, 
  deleteScheduledPost 
} from '../store/calendarSlice';
import { formatDateString } from '../utils/dateUtils';
import { X, Calendar, Clock, Share2, Save, Trash2, Check } from 'lucide-react';

const PLATFORM_OPTIONS = ['Twitter/X', 'LinkedIn', 'Instagram', 'Medium', 'YouTube'];
const COLOR_PRESETS = ['#3b82f6', '#a855f7', '#10b981', '#f59e0b', '#f43f5e'];

export default function ScheduleModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.calendar.isModalOpen);
  const selectedDateForModal = useSelector((state) => state.calendar.selectedDateForModal);
  const editingPostId = useSelector((state) => state.calendar.editingPostId);
  const scheduledPosts = useSelector((state) => state.calendar.scheduledPosts);

  const existingPost = scheduledPosts.find((p) => p.id === editingPostId);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    platforms: ['Twitter/X', 'LinkedIn'],
    scheduledDate: formatDateString(new Date()),
    scheduledTime: '12:00',
    color: '#3b82f6',
    status: 'scheduled',
  });

  useEffect(() => {
    if (existingPost) {
      setFormData({
        id: existingPost.id,
        title: existingPost.title || '',
        content: existingPost.content || '',
        platforms: existingPost.platforms || ['Twitter/X'],
        scheduledDate: existingPost.scheduledDate || formatDateString(new Date()),
        scheduledTime: existingPost.scheduledTime || '12:00',
        color: existingPost.color || '#3b82f6',
        status: existingPost.status || 'scheduled',
      });
    } else {
      setFormData({
        title: '',
        content: '',
        platforms: ['Twitter/X', 'LinkedIn'],
        scheduledDate: selectedDateForModal || formatDateString(new Date()),
        scheduledTime: '12:00',
        color: '#3b82f6',
        status: 'scheduled',
      });
    }
  }, [existingPost, selectedDateForModal, isOpen]);

  if (!isOpen) return null;

  const togglePlatform = (plat) => {
    setFormData((prev) => {
      const exists = prev.platforms.includes(plat);
      return {
        ...prev,
        platforms: exists ? prev.platforms.filter((p) => p !== plat) : [...prev.platforms, plat],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingPostId) {
      dispatch(updateScheduledPost(formData));
    } else {
      dispatch(addScheduledPost(formData));
    }
    dispatch(closeScheduleModal());
  };

  const handleDelete = () => {
    if (editingPostId) {
      dispatch(deleteScheduledPost(editingPostId));
      dispatch(closeScheduleModal());
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1100,
      background: 'var(--bg-overlay)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      animation: 'fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '580px',
        padding: '1.75rem',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem'
      }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>
              {editingPostId ? 'Edit Scheduled Event' : 'Schedule New Post'}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              Map post to calendar temporal date & time slot
            </p>
          </div>
          <button className="btn btn-secondary btn-icon" onClick={() => dispatch(closeScheduleModal())}>
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Post Title */}
          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Post Title / Summary
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. Q3 Product Release & Feature Highlights"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          {/* Date & Time Slot Selectors */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                <Calendar size={14} /> Scheduled Date
              </label>
              <input
                type="date"
                className="input-field"
                value={formData.scheduledDate}
                onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                <Clock size={14} /> Time Slot
              </label>
              <input
                type="time"
                className="input-field"
                value={formData.scheduledTime}
                onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Content Description */}
          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Post Content
            </label>
            <textarea
              className="input-field"
              rows={3}
              placeholder="Write post content..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              style={{ resize: 'vertical', lineHeight: '1.6' }}
            />
          </div>

          {/* Target Platforms */}
          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
              <Share2 size={14} /> Target Social Platforms
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {PLATFORM_OPTIONS.map((plat) => {
                const selected = formData.platforms.includes(plat);
                return (
                  <button
                    key={plat}
                    type="button"
                    onClick={() => togglePlatform(plat)}
                    style={{
                      padding: '0.35rem 0.75rem',
                      fontSize: '0.78rem',
                      borderRadius: 'var(--radius-full)',
                      border: selected ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                      background: selected ? 'var(--primary-light)' : 'transparent',
                      color: selected ? 'var(--primary)' : 'var(--text-muted)',
                      cursor: 'pointer'
                    }}
                  >
                    {plat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Event Badge Color */}
          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
              Event Color Category
            </label>
            <div style={{ display: 'flex', gap: '0.65rem' }}>
              {COLOR_PRESETS.map((colorHex) => (
                <div
                  key={colorHex}
                  onClick={() => setFormData({ ...formData, color: colorHex })}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: colorHex,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: formData.color === colorHex ? '3px solid white' : 'none',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  {formData.color === colorHex && <Check size={16} color="white" />}
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
            {editingPostId ? (
              <button type="button" className="btn btn-outline-danger" onClick={handleDelete}>
                <Trash2 size={15} /> Delete Event
              </button>
            ) : (
              <div />
            )}

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button type="button" className="btn btn-secondary" onClick={() => dispatch(closeScheduleModal())}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                <Save size={16} /> Save Schedule
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
