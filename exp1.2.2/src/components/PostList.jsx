import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredPosts, selectAllPosts } from '../store/selectors';
import { PostCardMemo } from './PostCardMemo';
import { FileQuestion, Plus } from 'lucide-react';
import { togglePostModal } from '../store/slices/perfSlice';
import { useDispatch } from 'react-redux';

export default function PostList() {
  const dispatch = useDispatch();
  const filteredPosts = useSelector(selectFilteredPosts);
  const totalPosts = useSelector(selectAllPosts).length;

  if (filteredPosts.length === 0) {
    return (
      <div className="glass-panel" style={{ padding: '3.5rem 2rem', textAlign: 'center' }}>
        <FileQuestion size={42} color="var(--primary)" style={{ marginBottom: '1rem' }} />
        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>
          No Posts Matched Selectors
        </h3>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto 1.5rem', fontSize: '0.88rem' }}>
          Adjust search criteria or reset filters to view memoized derived results.
        </p>
        <button className="btn btn-primary" onClick={() => dispatch(togglePostModal(true))}>
          <Plus size={18} /> Add New Post
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>
          Memoized Post Feed ({filteredPosts.length} of {totalPosts} posts)
        </h3>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Each post card is memoized with <code>React.memo</code>
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
        gap: '1.25rem'
      }}>
        {filteredPosts.map((post) => (
          <PostCardMemo key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
