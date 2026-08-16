import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openPostModal } from '../store/slices/uiSlice';
import { deletePostThunk, updatePostThunk } from '../store/slices/postsSlice';
import { selectAllPlatforms } from '../store/slices/platformsSlice';
import { Edit3, Trash2, Send, Clock, AlertCircle, Share2, Check } from 'lucide-react';

export default function PostCard({ post }) {
  const dispatch = useDispatch();
  const platforms = useSelector(selectAllPlatforms);

  const formattedDate = new Date(post.updatedAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleDelete = () => {
    if (window.confirm(`Delete post "${post.title}" from Redux store?`)) {
      dispatch(deletePostThunk(post.id));
    }
  };

  const handlePublishToggle = () => {
    const nextStatus = post.status === 'published' ? 'draft' : 'published';
    dispatch(updatePostThunk({ id: post.id, status: nextStatus }));
  };

  // Find target platform objects
  const targetPlatformObjs = platforms.filter((p) => post.targetPlatforms && post.targetPlatforms.includes(p.id));

  // Check character overflow for target platforms
  const contentLength = post.content.length;
  const overflowPlatforms = targetPlatformObjs.filter((p) => contentLength > p.charLimit);

  return (
    <div className="glass-panel glass-panel-hover" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <span className={`badge badge-${post.status}`}>
          {post.status}
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />
          {formattedDate}
        </span>
      </div>

      {/* Title */}
      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
        {post.title}
      </h3>

      {/* Content */}
      <p style={{
        fontSize: '0.88rem',
        color: 'var(--text-secondary)',
        lineHeight: '1.6',
        marginBottom: '1rem',
        flex: 1,
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
        {post.content}
      </p>

      {/* Character Limit Warning */}
      {overflowPlatforms.length > 0 && (
        <div style={{
          fontSize: '0.75rem',
          color: 'var(--accent-rose)',
          background: 'rgba(244, 63, 94, 0.1)',
          padding: '0.35rem 0.6rem',
          borderRadius: '6px',
          marginBottom: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem'
        }}>
          <AlertCircle size={14} />
          Exceeds character limit for: {overflowPlatforms.map((p) => p.name).join(', ')} ({contentLength} chars)
        </div>
      )}

      {/* Target Platforms */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
        {targetPlatformObjs.map((p) => (
          <span key={p.id} className={`platform-pill platform-${p.name.toLowerCase().split('/')[0]}`}>
            <Share2 size={11} /> {p.name}
          </span>
        ))}
      </div>

      {/* Card Footer Actions */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '0.85rem',
        borderTop: '1px solid var(--border-color)'
      }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {contentLength} chars • By {post.author || 'User'}
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <button className="btn btn-secondary btn-icon" onClick={() => dispatch(openPostModal(post.id))} title="Edit Post">
            <Edit3 size={15} />
          </button>
          
          <button
            className="btn btn-secondary btn-icon"
            onClick={handlePublishToggle}
            title={post.status === 'published' ? 'Unpublish to Draft' : 'Publish Post'}
          >
            {post.status === 'published' ? <Check size={15} color="var(--accent-emerald)" /> : <Send size={15} color="var(--accent-cyan)" />}
          </button>

          <button className="btn btn-outline-danger btn-icon" onClick={handleDelete} title="Delete Post">
            <Trash2 size={15} />
          </button>
        </div>
      </div>

    </div>
  );
}
