import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPosts, fetchPostsThunk } from '../store/slices/postsSlice';
import { setStatusFilter, openPostModal } from '../store/slices/uiSlice';
import PostCard from './PostCard';
import { FileText, Plus, RefreshCw, Filter } from 'lucide-react';

export default function PostList() {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);
  
  const searchQuery = useSelector((state) => state.ui.searchQuery);
  const platformFilter = useSelector((state) => state.ui.selectedPlatformFilter);
  const statusFilter = useSelector((state) => state.ui.selectedStatusFilter);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPostsThunk());
    }
  }, [status, dispatch]);

  // Filter Posts
  const filteredPosts = posts.filter((post) => {
    // Status Filter
    if (statusFilter !== 'all' && post.status !== statusFilter) return false;
    // Platform Filter
    if (platformFilter !== 'all' && (!post.targetPlatforms || !post.targetPlatforms.includes(platformFilter))) return false;
    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesTitle = post.title.toLowerCase().includes(q);
      const matchesContent = post.content.toLowerCase().includes(q);
      return matchesTitle || matchesContent;
    }
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* List Toolbar & Status Tabs */}
      <div className="glass-panel" style={{ padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Status Filter Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(0,0,0,0.2)', padding: '0.25rem', borderRadius: 'var(--radius-sm)' }}>
          {[
            { id: 'all', label: 'All Status' },
            { id: 'draft', label: 'Drafts' },
            { id: 'scheduled', label: 'Scheduled' },
            { id: 'published', label: 'Published' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => dispatch(setStatusFilter(tab.id))}
              style={{
                background: statusFilter === tab.id ? 'var(--primary)' : 'transparent',
                color: statusFilter === tab.id ? 'white' : 'var(--text-secondary)',
                border: 'none',
                padding: '0.4rem 0.85rem',
                borderRadius: '6px',
                fontSize: '0.82rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'var(--transition-fast)'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Showing <strong>{filteredPosts.length}</strong> of {posts.length} posts
          </span>

          <button
            className="btn btn-secondary btn-icon"
            onClick={() => dispatch(fetchPostsThunk())}
            title="Refetch Posts from Async Thunk"
          >
            <RefreshCw size={15} className={status === 'loading' ? 'animate-spin' : ''} />
          </button>
        </div>

      </div>

      {/* Loading Skeletons */}
      {status === 'loading' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {[1, 2, 3].map((idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '1.25rem', height: '220px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="skeleton" style={{ width: '30%', height: '20px' }} />
              <div className="skeleton" style={{ width: '80%', height: '24px' }} />
              <div className="skeleton" style={{ width: '100%', height: '60px' }} />
            </div>
          ))}
        </div>
      )}

      {/* Error Message */}
      {status === 'failed' && (
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', borderColor: 'var(--accent-rose)' }}>
          <p style={{ color: 'var(--accent-rose)', marginBottom: '1rem' }}>{error}</p>
          <button className="btn btn-primary" onClick={() => dispatch(fetchPostsThunk())}>
            Retry Fetching
          </button>
        </div>
      )}

      {/* Empty State */}
      {status === 'succeeded' && filteredPosts.length === 0 && (
        <div className="glass-panel" style={{ padding: '3.5rem 2rem', textAlign: 'center' }}>
          <FileText size={42} color="var(--primary)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No Posts Match Filters</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
            Try resetting your search query or platform filters.
          </p>
          <button className="btn btn-primary" onClick={() => dispatch(openPostModal(null))}>
            <Plus size={16} /> Create New Post
          </button>
        </div>
      )}

      {/* Post Grid */}
      {status === 'succeeded' && filteredPosts.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))', gap: '1.25rem' }}>
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

    </div>
  );
}
