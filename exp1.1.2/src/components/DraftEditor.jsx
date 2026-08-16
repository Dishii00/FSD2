import React, { useState, useEffect, useRef } from 'react';
import { useDrafts } from '../context/DraftContext';
import { 
  X, 
  Save, 
  Send, 
  Image, 
  Tag, 
  Layers, 
  Globe, 
  Bold, 
  Italic, 
  Heading, 
  List, 
  Code, 
  Quote, 
  Eye, 
  FileEdit,
  Check,
  AlertCircle,
  RefreshCw,
  Sparkles
} from 'lucide-react';

const COVER_PRESETS = [
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
];

const PLATFORM_OPTIONS = ['Blog', 'Twitter/X', 'LinkedIn', 'Medium', 'Substack', 'Dev.to'];
const CATEGORY_OPTIONS = ['Engineering', 'Design', 'Productivity', 'Marketing', 'Personal', 'General'];

export default function DraftEditor() {
  const { activeDraft, closeEditor, saveDraft, saving, autoSaveStatus, addToast, publishDraft } = useDrafts();

  // Form State
  const [formData, setFormData] = useState({
    id: activeDraft?.id || null,
    title: activeDraft?.title || '',
    content: activeDraft?.content || '',
    category: activeDraft?.category || 'Engineering',
    tags: activeDraft?.tags || [],
    status: activeDraft?.status || 'draft',
    platforms: activeDraft?.platforms || ['Blog'],
    coverImage: activeDraft?.coverImage || COVER_PRESETS[0],
  });

  const [tagInput, setTagInput] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const autoSaveTimerRef = useRef(null);
  const isInitialMount = useRef(true);

  // Sync state if activeDraft changes externally
  useEffect(() => {
    if (activeDraft) {
      setFormData({
        id: activeDraft.id || null,
        title: activeDraft.title || '',
        content: activeDraft.content || '',
        category: activeDraft.category || 'Engineering',
        tags: activeDraft.tags || [],
        status: activeDraft.status || 'draft',
        platforms: activeDraft.platforms || ['Blog'],
        coverImage: activeDraft.coverImage || COVER_PRESETS[0],
      });
    }
  }, [activeDraft]);

  // Debounced Auto-Save
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);

    autoSaveTimerRef.current = setTimeout(() => {
      if (formData.title.trim() || formData.content.trim()) {
        saveDraft(formData, true).catch(() => {});
      }
    }, 2000); // 2 second auto-save debounce

    return () => {
      if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    };
  }, [formData]);

  // Calculations
  const text = formData.content.trim();
  const wordCount = text ? text.split(/\s+/).length : 0;
  const charCount = formData.content.length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  // Handlers
  const handleTagKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().replace(/^#/, '');
      if (!formData.tags.includes(newTag)) {
        setFormData((prev) => ({ ...prev, tags: [...prev.tags, newTag] }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tagToRemove) }));
  };

  const togglePlatform = (platform) => {
    setFormData((prev) => {
      const exists = prev.platforms.includes(platform);
      return {
        ...prev,
        platforms: exists ? prev.platforms.filter((p) => p !== platform) : [...prev.platforms, platform],
      };
    });
  };

  const insertMarkdown = (syntaxBefore, syntaxAfter = '') => {
    const textarea = document.getElementById('draft-textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end);
    const replacement = syntaxBefore + (selectedText || 'text') + syntaxAfter;

    const newContent = formData.content.substring(0, start) + replacement + formData.content.substring(end);
    setFormData((prev) => ({ ...prev, content: newContent }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + syntaxBefore.length, start + syntaxBefore.length + (selectedText.length || 4));
    }, 50);
  };

  const handleManualSave = async (e) => {
    e.preventDefault();
    try {
      await saveDraft(formData, false);
      closeEditor();
    } catch (err) {}
  };

  const handlePublishNow = async () => {
    try {
      const saved = await saveDraft({ ...formData, status: 'published' }, false);
      addToast(`Draft "${saved.title}" published! 🎉`, 'success');
      closeEditor();
    } catch (err) {}
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
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
        maxWidth: '1050px',
        maxHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6)'
      }}>
        
        {/* Editor Top Bar */}
        <div style={{
          padding: '1rem 1.5rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(0, 0, 0, 0.2)'
        }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'var(--primary-light)',
              color: 'var(--primary)'
            }}>
              <FileEdit size={18} />
            </span>

            <div>
              <h2 style={{ fontSize: '1.1rem', margin: 0 }}>
                {formData.id ? 'Edit Post Draft' : 'Create New Post Draft'}
              </h2>
              
              {/* Auto Save Indicator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {autoSaveStatus === 'saving' && (
                  <>
                    <RefreshCw size={12} className="animate-spin" color="var(--accent-amber)" />
                    <span>Auto-saving draft...</span>
                  </>
                )}
                {autoSaveStatus === 'saved' && (
                  <>
                    <Check size={12} color="var(--accent-emerald)" />
                    <span style={{ color: 'var(--accent-emerald)' }}>Saved to local state</span>
                  </>
                )}
                {autoSaveStatus === 'idle' && (
                  <span>Auto-saves 2s after typing stops</span>
                )}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* View Mode Switcher */}
            <button
              className="btn btn-secondary"
              onClick={() => setIsPreview(!isPreview)}
              style={{ fontSize: '0.82rem', padding: '0.45rem 0.85rem' }}
            >
              {isPreview ? <FileEdit size={15} /> : <Eye size={15} />}
              <span>{isPreview ? 'Write Mode' : 'Preview'}</span>
            </button>

            {/* Save Button */}
            <button
              className="btn btn-secondary"
              onClick={handleManualSave}
              disabled={saving}
              style={{ fontSize: '0.82rem', padding: '0.45rem 0.85rem' }}
            >
              <Save size={15} />
              <span>{saving ? 'Saving...' : 'Save Draft'}</span>
            </button>

            {/* Publish Button */}
            <button
              className="btn btn-primary"
              onClick={handlePublishNow}
              disabled={saving}
              style={{ fontSize: '0.82rem', padding: '0.45rem 0.85rem' }}
            >
              <Send size={15} />
              <span>Publish Now</span>
            </button>

            {/* Close Button */}
            <button className="btn btn-secondary btn-icon" onClick={closeEditor} title="Close Editor">
              <X size={18} />
            </button>
          </div>

        </div>

        {/* Editor Body Area */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', flex: 1, overflow: 'hidden' }}>
          
          {/* Main Editing Column */}
          <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', borderRight: '1px solid var(--border-color)' }}>
            
            {/* Title Input */}
            <input
              type="text"
              className="input-field"
              placeholder="Post Title..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                padding: '0.75rem 1rem',
                border: 'none',
                background: 'rgba(0,0,0,0.15)',
                fontFamily: 'var(--font-heading)'
              }}
            />

            {/* Formatting Toolbar */}
            {!isPreview && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.35rem 0.65rem',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)'
              }}>
                <button className="btn btn-secondary btn-icon" onClick={() => insertMarkdown('**', '**')} title="Bold">
                  <Bold size={15} />
                </button>
                <button className="btn btn-secondary btn-icon" onClick={() => insertMarkdown('*', '*')} title="Italic">
                  <Italic size={15} />
                </button>
                <button className="btn btn-secondary btn-icon" onClick={() => insertMarkdown('### ')} title="Heading">
                  <Heading size={15} />
                </button>
                <button className="btn btn-secondary btn-icon" onClick={() => insertMarkdown('\n- ')} title="Bullet List">
                  <List size={15} />
                </button>
                <button className="btn btn-secondary btn-icon" onClick={() => insertMarkdown('`', '`')} title="Inline Code">
                  <Code size={15} />
                </button>
                <button className="btn btn-secondary btn-icon" onClick={() => insertMarkdown('\n> ')} title="Quote">
                  <Quote size={15} />
                </button>

                <div style={{ marginLeft: 'auto', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {wordCount} words • {charCount} chars • ~{readTime} min read
                </div>
              </div>
            )}

            {/* Editor Content Area / Preview Mode */}
            {isPreview ? (
              <div style={{
                flex: 1,
                padding: '1rem',
                background: 'rgba(0,0,0,0.15)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                lineHeight: '1.7',
                whiteSpace: 'pre-wrap',
                fontFamily: 'var(--font-body)'
              }}>
                <h1 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>{formData.title || 'Untitled Post'}</h1>
                {formData.content || <p style={{ color: 'var(--text-muted)' }}>No preview available yet...</p>}
              </div>
            ) : (
              <textarea
                id="draft-textarea"
                className="input-field"
                placeholder="Write your post content here... Markdown is supported!"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                style={{
                  flex: 1,
                  minHeight: '320px',
                  resize: 'none',
                  fontSize: '0.95rem',
                  lineHeight: '1.7',
                  fontFamily: 'var(--font-body)',
                  border: '1px solid var(--border-color)'
                }}
              />
            )}

          </div>

          {/* Sidebar Properties & Metadata Column */}
          <div style={{ padding: '1.25rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem', background: 'rgba(0,0,0,0.15)' }}>
            
            {/* Category Selector */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                <Layers size={14} /> Category
              </label>
              <select
                className="input-field"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                style={{ fontSize: '0.85rem', padding: '0.5rem' }}
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat} style={{ background: 'var(--bg-dark)' }}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Status Selector */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
                Draft Status
              </label>
              <select
                className="input-field"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                style={{ fontSize: '0.85rem', padding: '0.5rem' }}
              >
                <option value="draft" style={{ background: 'var(--bg-dark)' }}>Draft</option>
                <option value="archived" style={{ background: 'var(--bg-dark)' }}>Archived</option>
                <option value="published" style={{ background: 'var(--bg-dark)' }}>Published</option>
              </select>
            </div>

            {/* Target Platforms */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                <Globe size={14} /> Target Platforms
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {PLATFORM_OPTIONS.map((platform) => {
                  const selected = formData.platforms.includes(platform);
                  return (
                    <button
                      key={platform}
                      type="button"
                      onClick={() => togglePlatform(platform)}
                      style={{
                        padding: '0.25rem 0.6rem',
                        fontSize: '0.75rem',
                        borderRadius: 'var(--radius-full)',
                        border: selected ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                        background: selected ? 'var(--primary-light)' : 'transparent',
                        color: selected ? 'var(--primary)' : 'var(--text-muted)',
                        cursor: 'pointer'
                      }}
                    >
                      {platform}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tags Input */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                <Tag size={14} /> Tags (Press Enter)
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="Add tag and hit Enter..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                style={{ fontSize: '0.85rem', padding: '0.5rem', marginBottom: '0.5rem' }}
              />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {formData.tags.map((tag) => (
                  <span key={tag} className="tag-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    #{tag}
                    <X size={12} style={{ cursor: 'pointer' }} onClick={() => removeTag(tag)} />
                  </span>
                ))}
              </div>
            </div>

            {/* Cover Image Preset */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                <Image size={14} /> Cover Image
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
                {COVER_PRESETS.map((imgUrl, idx) => (
                  <img
                    key={idx}
                    src={imgUrl}
                    alt="Preset"
                    onClick={() => setFormData({ ...formData, coverImage: imgUrl })}
                    style={{
                      width: '100%',
                      height: '55px',
                      objectFit: 'cover',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      border: formData.coverImage === imgUrl ? '2px solid var(--primary)' : '1px solid transparent'
                    }}
                  />
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
