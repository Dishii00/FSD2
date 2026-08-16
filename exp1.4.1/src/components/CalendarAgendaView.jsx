import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openScheduleModal, deleteScheduledPost } from '../store/calendarSlice';
import { Clock, Calendar, Edit3, Trash2, Share2, Send } from 'lucide-react';

export default function CalendarAgendaView() {
  const dispatch = useDispatch();
  const scheduledPosts = useSelector((state) => state.calendar.scheduledPosts);

  // Sort events chronologically
  const sortedPosts = [...scheduledPosts].sort((a, b) => {
    return new Date(`${a.scheduledDate}T${a.scheduledTime}`) - new Date(`${b.scheduledDate}T${b.scheduledTime}`);
  });

  if (sortedPosts.length === 0) {
    return (
      <div className="glass-panel" style={{ padding: '3.5rem 2rem', textAlign: 'center' }}>
        <Calendar size={42} color="var(--primary)" style={{ marginBottom: '1rem' }} />
        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No Scheduled Posts in Agenda</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
          Schedule new post events using the calendar or click the button below.
        </p>
        <button className="btn btn-primary" onClick={() => dispatch(openScheduleModal())}>
          Schedule Your First Post
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: '700' }}>
          Chronological Agenda ({sortedPosts.length} Scheduled Events)
        </h3>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          Ordered by publish timestamp
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {sortedPosts.map((post) => (
          <div
            key={post.id}
            className="glass-panel glass-panel-hover"
            style={{
              padding: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.25rem',
              borderLeft: `4px solid ${post.color || 'var(--primary)'}`
            }}
          >
            {/* Left Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flex: 1, minWidth: 0 }}>
              
              {/* Date & Time Badge */}
              <div style={{
                background: 'rgba(0,0,0,0.3)',
                padding: '0.65rem 1rem',
                borderRadius: 'var(--radius-sm)',
                textAlign: 'center',
                minWidth: '110px'
              }}>
                <div style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--primary)' }}>
                  {post.scheduledDate}
                </div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>
                  {post.scheduledTime}
                </div>
              </div>

              {/* Title & Details */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '700', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', margin: 0 }}>
                    {post.title}
                  </h4>
                  <span className="badge" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)' }}>
                    {post.status}
                  </span>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', margin: 0 }}>
                  {post.content}
                </p>
              </div>
            </div>

            {/* Target Platforms & Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexShrink: 0 }}>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                {post.platforms && post.platforms.map((plat) => (
                  <span key={plat} style={{ fontSize: '0.72rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                    {plat}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.35rem' }}>
                <button className="btn btn-secondary btn-icon" onClick={() => dispatch(openScheduleModal(post))} title="Edit Event">
                  <Edit3 size={15} />
                </button>
                <button className="btn btn-outline-danger btn-icon" onClick={() => dispatch(deleteScheduledPost(post.id))} title="Delete Event">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
