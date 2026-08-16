import React from 'react';
import { useDrafts } from '../context/DraftContext';
import { FileText, Archive, CheckCircle2, Clock, HardDrive, RefreshCw } from 'lucide-react';

export default function StatsBar() {
  const { drafts, resetData, loadDrafts, loading } = useDrafts();

  const total = drafts.length;
  const activeCount = drafts.filter((d) => d.status === 'draft').length;
  const archivedCount = drafts.filter((d) => d.status === 'archived').length;
  const publishedCount = drafts.filter((d) => d.status === 'published').length;
  const totalWords = drafts.reduce((acc, curr) => acc + (curr.wordCount || 0), 0);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
      
      {/* Stat Card 1 */}
      <div className="glass-panel" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <div style={{ padding: '0.6rem', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary)' }}>
          <FileText size={20} />
        </div>
        <div>
          <div style={{ fontSize: '1.25rem', fontWeight: '700', lineHeight: 1.2 }}>{total}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Total Post Drafts</div>
        </div>
      </div>

      {/* Stat Card 2 */}
      <div className="glass-panel" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <div style={{ padding: '0.6rem', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)' }}>
          <Clock size={20} />
        </div>
        <div>
          <div style={{ fontSize: '1.25rem', fontWeight: '700', lineHeight: 1.2 }}>{activeCount} Active</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{archivedCount} Archived • {publishedCount} Published</div>
        </div>
      </div>

      {/* Stat Card 3 */}
      <div className="glass-panel" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <div style={{ padding: '0.6rem', borderRadius: '10px', background: 'rgba(168, 85, 247, 0.15)', color: 'var(--accent-purple)' }}>
          <HardDrive size={20} />
        </div>
        <div>
          <div style={{ fontSize: '1.25rem', fontWeight: '700', lineHeight: 1.2 }}>{totalWords.toLocaleString()}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Total Drafted Words</div>
        </div>
      </div>

      {/* Stat Card 4 - Quick Refresh / Reset */}
      <div className="glass-panel" style={{ padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)' }}>
            <CheckCircle2 size={18} />
          </div>
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: '600' }}>localStorage Sync</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Frontend State Persisted</div>
          </div>
        </div>
        
        <button
          className="btn btn-secondary btn-icon"
          onClick={loadDrafts}
          disabled={loading}
          title="Reload drafts from Mock API"
        >
          <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

    </div>
  );
}
