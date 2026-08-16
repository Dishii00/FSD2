import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPost } from '../store/slices/postsSlice';
import { togglePostModal } from '../store/slices/perfSlice';
import { X, Save, Plus } from 'lucide-react';

const CATEGORY_OPTIONS = ['Performance', 'React Architecture', 'Engineering', 'General'];
const PLATFORM_OPTIONS = ['Twitter/X', 'LinkedIn', 'Medium'];

export default function PostModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.perf.isPostModalOpen);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Performance');
  const [platform, setPlatform] = useState('Twitter/X');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    dispatch(addPost({ title, content, category, platform }));
    dispatch(togglePostModal(false));

    setTitle('');
    setContent('');
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
        maxWidth: '560px',
        padding: '1.75rem',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Add New Post to Redux Store</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
              Triggers memoized selector update when posts array mutates
            </p>
          </div>
          <button className="btn btn-secondary btn-icon" onClick={() => dispatch(togglePostModal(false))}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Post Title
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. Profiling Selectors with Reselect"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Content
            </label>
            <textarea
              className="input-field"
              rows={4}
              placeholder="Write post content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              style={{ resize: 'vertical', lineHeight: '1.6' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                Category
              </label>
              <select
                className="input-field"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat} style={{ background: 'var(--bg-dark)' }}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                Platform
              </label>
              <select
                className="input-field"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
              >
                {PLATFORM_OPTIONS.map((plat) => (
                  <option key={plat} value={plat} style={{ background: 'var(--bg-dark)' }}>{plat}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => dispatch(togglePostModal(false))}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Save size={16} /> Add Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
