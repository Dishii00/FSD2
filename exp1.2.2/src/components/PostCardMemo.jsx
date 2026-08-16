import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { likePost, deletePost } from '../store/slices/postsSlice';
import { Heart, Trash2, Clock, FileText, Share2, Sparkles } from 'lucide-react';

function PostCardComponent({ post }) {
  const dispatch = useDispatch();
  const isRenderHighlightEnabled = useSelector((state) => state.perf.isRenderHighlightEnabled);

  // Track rendering counts to visually prove React.memo efficiency
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    if (isRenderHighlightEnabled && renderCountRef.current > 1) {
      setIsFlashing(true);
      const timer = setTimeout(() => setIsFlashing(false), 600);
      return () => clearTimeout(timer);
    }
  }, [post, isRenderHighlightEnabled]);

  const formattedDate = new Date(post.createdAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      className={`glass-panel glass-panel-hover ${isFlashing ? 'rerender-flash' : ''}`}
      style={{
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative'
      }}
    >
      {/* Render Counter Badge */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'rgba(0,0,0,0.5)',
        border: '1px solid var(--border-color)',
        borderRadius: '99px',
        padding: '0.15rem 0.5rem',
        fontSize: '0.7rem',
        fontFamily: 'var(--font-mono)',
        color: 'var(--accent-cyan)'
      }}>
        Renders: {renderCountRef.current}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
        <span className="badge" style={{ background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
          {post.category || 'General'}
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {post.platform}
        </span>
      </div>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', lineHeight: '1.35', color: 'var(--text-primary)' }}>
        {post.title}
      </h3>

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

      {/* Card Footer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '0.85rem',
        borderTop: '1px solid var(--border-color)',
        fontSize: '0.78rem'
      }}>
        <span style={{ color: 'var(--text-muted)' }}>
          {post.wordCount} words • {formattedDate}
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Like Action */}
          <button
            className="btn btn-secondary"
            onClick={() => dispatch(likePost(post.id))}
            style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}
          >
            <Heart size={14} color="var(--accent-rose)" fill="var(--accent-rose)" />
            <span>{post.likes}</span>
          </button>

          {/* Delete Action */}
          <button
            className="btn btn-outline-danger btn-icon"
            onClick={() => dispatch(deletePost(post.id))}
            title="Delete Post"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

    </div>
  );
}

// Memoize Post Card component to prevent re-renders when parent re-evaluates unrelated state!
export const PostCardMemo = React.memo(PostCardComponent);
