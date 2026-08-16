import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closePostModal } from '../store/slices/uiSlice';
import { selectPostById, addPostThunk, updatePostThunk } from '../store/slices/postsSlice';
import { selectAllPlatforms } from '../store/slices/platformsSlice';
import { X, Save, Share2, AlertCircle } from 'lucide-react';

export default function PostModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.isPostModalOpen);
  const editingPostId = useSelector((state) => state.ui.editingPostId);
  const existingPost = useSelector((state) => (editingPostId ? selectPostById(state, editingPostId) : null));
  const platforms = useSelector(selectAllPlatforms);
  const savingStatus = useSelector((state) => state.posts.savingStatus);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    targetPlatforms: ['plat-twitter', 'plat-linkedin'],
    status: 'draft',
    author: 'Alex Dev',
  });

  useEffect(() => {
    if (existingPost) {
      setFormData({
        id: existingPost.id,
        title: existingPost.title || '',
        content: existingPost.content || '',
        targetPlatforms: existingPost.targetPlatforms || ['plat-twitter'],
        status: existingPost.status || 'draft',
        author: existingPost.author || 'Alex Dev',
      });
    } else {
      setFormData({
        title: '',
        content: '',
        targetPlatforms: ['plat-twitter', 'plat-linkedin'],
        status: 'draft',
        author: 'Alex Dev',
      });
    }
  }, [existingPost, isOpen]);

  if (!isOpen) return null;

  const togglePlatform = (platformId) => {
    setFormData((prev) => {
      const exists = prev.targetPlatforms.includes(platformId);
      return {
        ...prev,
        targetPlatforms: exists
          ? prev.targetPlatforms.filter((id) => id !== platformId)
          : [...prev.targetPlatforms, platformId],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    if (editingPostId) {
      dispatch(updatePostThunk(formData)).then(() => dispatch(closePostModal()));
    } else {
      dispatch(addPostThunk(formData)).then(() => dispatch(closePostModal()));
    }
  };

  // Character Limit Validation Check
  const contentLength = formData.content.length;

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
        maxWidth: '640px',
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
              {editingPostId ? 'Edit Post' : 'Create New Multi-Platform Post'}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              Dispatches Async Thunk to Redux Toolkit Store
            </p>
          </div>
          <button className="btn btn-secondary btn-icon" onClick={() => dispatch(closePostModal())}>
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Post Title */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Post Title
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. Redux Toolkit Normalization Strategies"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          {/* Post Content */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                Post Content
              </label>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {contentLength} chars
              </span>
            </div>
            <textarea
              className="input-field"
              rows={5}
              placeholder="Write content to broadcast across social platforms..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              style={{ resize: 'vertical', lineHeight: '1.6' }}
            />
          </div>

          {/* Target Platforms Checkboxes */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
              <Share2 size={15} /> Select Target Platforms
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.5rem' }}>
              {platforms.map((p) => {
                const selected = formData.targetPlatforms.includes(p.id);
                const isOverLimit = contentLength > p.charLimit;

                return (
                  <div
                    key={p.id}
                    onClick={() => togglePlatform(p.id)}
                    style={{
                      padding: '0.6rem 0.85rem',
                      borderRadius: '8px',
                      border: selected ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                      background: selected ? 'var(--primary-light)' : 'rgba(0,0,0,0.15)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'var(--transition-fast)'
                    }}
                  >
                    <div style={{ fontSize: '0.82rem', fontWeight: '600' }}>
                      {p.name}
                    </div>
                    
                    <div style={{ fontSize: '0.7rem', color: isOverLimit ? 'var(--accent-rose)' : 'var(--text-muted)' }}>
                      {p.charLimit} max
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Status Selector */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Publishing Status
            </label>
            <select
              className="input-field"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="draft" style={{ background: 'var(--bg-dark)' }}>Draft</option>
              <option value="scheduled" style={{ background: 'var(--bg-dark)' }}>Scheduled</option>
              <option value="published" style={{ background: 'var(--bg-dark)' }}>Published</option>
            </select>
          </div>

          {/* Footer Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => dispatch(closePostModal())}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={savingStatus === 'saving'}>
              <Save size={16} />
              <span>{savingStatus === 'saving' ? 'Dispatching Thunk...' : editingPostId ? 'Update Post' : 'Create Post'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
