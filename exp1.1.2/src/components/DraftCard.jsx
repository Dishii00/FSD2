import React from 'react';
import { useDrafts } from '../context/DraftContext';
import { 
  Edit3, 
  Trash2, 
  Copy, 
  Send, 
  Clock, 
  FileText, 
  Tag, 
  Share2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function DraftCard({ draft, viewMode }) {
  const { openEditor, duplicateDraft, deleteDraft, publishDraft, setConfirmModal } = useDrafts();

  const formattedDate = new Date(draft.updatedAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setConfirmModal({
      title: `Delete Draft "${draft.title}"?`,
      message: 'This draft will be permanently removed from frontend state and localStorage persistence.',
      type: 'danger',
      onConfirm: () => deleteDraft(draft.id),
    });
  };

  const handlePublishClick = (e) => {
    e.stopPropagation();
    setConfirmModal({
      title: `Publish Draft "${draft.title}"?`,
      message: 'This will update the post status to Published.',
      type: 'primary',
      onConfirm: () => publishDraft(draft.id),
    });
  };

  const handleDuplicateClick = (e) => {
    e.stopPropagation();
    duplicateDraft(draft.id);
  };

  // Compact View Layout
  if (viewMode === 'compact') {
    return (
      <div 
        className="glass-panel glass-panel-hover" 
        onClick={() => openEditor(draft)}
        style={{ 
          padding: '0.75rem 1.25rem', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          cursor: 'pointer',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flex: 1, minWidth: 0 }}>
          <span className={`badge badge-${draft.status}`}>
            {draft.status}
          </span>
          <span className="category-pill">{draft.category || 'General'}</span>
          <h3 style={{ fontSize: '0.95rem', fontWeight: '600', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
            {draft.title || 'Untitled Draft'}
          </h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexShrink: 0 }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            {draft.wordCount || 0} words • {draft.readTime || 1} min read
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            {formattedDate}
          </span>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }} onClick={(e) => e.stopPropagation()}>
            <button className="btn btn-secondary btn-icon" onClick={() => openEditor(draft)} title="Edit Draft">
              <Edit3 size={15} />
            </button>
            <button className="btn btn-secondary btn-icon" onClick={handleDuplicateClick} title="Duplicate">
              <Copy size={15} />
            </button>
            <button className="btn btn-outline-danger btn-icon" onClick={handleDeleteClick} title="Delete">
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // List View Layout
  if (viewMode === 'list') {
    return (
      <div 
        className="glass-panel glass-panel-hover"
        onClick={() => openEditor(draft)}
        style={{ 
          padding: '1.25rem', 
          display: 'flex', 
          gap: '1.25rem', 
          alignItems: 'center',
          cursor: 'pointer'
        }}
      >
        {draft.coverImage && (
          <img 
            src={draft.coverImage} 
            alt={draft.title} 
            style={{ width: '120px', height: '80px', borderRadius: 'var(--radius-sm)', objectFit: 'cover', flexShrink: 0 }}
          />
        )}
        
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span className={`badge badge-${draft.status}`}>{draft.status}</span>
            <span className="category-pill">{draft.category || 'General'}</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
              <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />
              Updated {formattedDate}
            </span>
          </div>

          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
            {draft.title || 'Untitled Post Draft'}
          </h3>

          <p style={{ 
            fontSize: '0.85rem', 
            color: 'var(--text-secondary)', 
            display: '-webkit-box', 
            WebkitLineClamp: 2, 
            WebkitBoxOrient: 'vertical', 
            overflow: 'hidden',
            marginBottom: '0.65rem'
          }}>
            {draft.content || 'No content drafted yet...'}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {draft.tags && draft.tags.map((t) => (
              <span key={t} className="tag-pill">#{t}</span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexShrink: 0 }} onClick={(e) => e.stopPropagation()}>
          <button className="btn btn-primary" onClick={() => openEditor(draft)} style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}>
            <Edit3 size={15} /> Edit
          </button>
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            <button className="btn btn-secondary btn-icon" onClick={handleDuplicateClick} title="Duplicate">
              <Copy size={15} />
            </button>
            {draft.status !== 'published' && (
              <button className="btn btn-secondary btn-icon" onClick={handlePublishClick} title="Publish">
                <Send size={15} color="var(--accent-emerald)" />
              </button>
            )}
            <button className="btn btn-outline-danger btn-icon" onClick={handleDeleteClick} title="Delete">
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default Grid View Layout
  return (
    <div 
      className="glass-panel glass-panel-hover"
      onClick={() => openEditor(draft)}
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        overflow: 'hidden', 
        cursor: 'pointer',
        height: '100%'
      }}
    >
      {/* Cover Image */}
      {draft.coverImage && (
        <div style={{ position: 'relative', width: '100%', height: '150px', overflow: 'hidden' }}>
          <img 
            src={draft.coverImage} 
            alt={draft.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ 
            position: 'absolute', 
            top: '10px', 
            left: '10px', 
            display: 'flex', 
            gap: '0.5rem' 
          }}>
            <span className={`badge badge-${draft.status}`}>{draft.status}</span>
            <span className="category-pill">{draft.category || 'General'}</span>
          </div>
        </div>
      )}

      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        
        {!draft.coverImage && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span className={`badge badge-${draft.status}`}>{draft.status}</span>
            <span className="category-pill">{draft.category || 'General'}</span>
          </div>
        )}

        <h3 style={{ 
          fontSize: '1.15rem', 
          fontWeight: '700', 
          marginBottom: '0.5rem',
          lineHeight: '1.35',
          color: 'var(--text-primary)'
        }}>
          {draft.title || 'Untitled Post Draft'}
        </h3>

        <p style={{ 
          fontSize: '0.85rem', 
          color: 'var(--text-secondary)', 
          display: '-webkit-box', 
          WebkitLineClamp: 3, 
          WebkitBoxOrient: 'vertical', 
          overflow: 'hidden',
          marginBottom: '1rem',
          flex: 1
        }}>
          {draft.content || 'No text added to draft content yet...'}
        </p>

        {/* Tags */}
        {draft.tags && draft.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
            {draft.tags.map((t) => (
              <span key={t} className="tag-pill">#{t}</span>
            ))}
          </div>
        )}

        {/* Card Footer */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          paddingTop: '0.85rem',
          borderTop: '1px solid var(--border-color)',
          fontSize: '0.78rem',
          color: 'var(--text-muted)'
        }}>
          <span>{draft.wordCount || 0} words • {draft.readTime || 1} min read</span>
          
          {/* Quick Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }} onClick={(e) => e.stopPropagation()}>
            <button className="btn btn-secondary btn-icon" onClick={handleDuplicateClick} title="Duplicate Draft">
              <Copy size={14} />
            </button>
            {draft.status !== 'published' && (
              <button className="btn btn-secondary btn-icon" onClick={handlePublishClick} title="Quick Publish">
                <Send size={14} color="var(--accent-emerald)" />
              </button>
            )}
            <button className="btn btn-outline-danger btn-icon" onClick={handleDeleteClick} title="Delete Draft">
              <Trash2 size={14} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
