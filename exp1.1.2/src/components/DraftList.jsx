import React from 'react';
import { useDrafts } from '../context/DraftContext';
import DraftCard from './DraftCard';
import { FileQuestion, AlertCircle, RefreshCw, Sparkles, FilePlus } from 'lucide-react';

export default function DraftList() {
  const { filteredDrafts, loading, error, viewMode, openEditor, loadDrafts } = useDrafts();

  // Loading State with Skeletons
  if (loading) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(320px, 1fr))' : '1fr',
        gap: '1.25rem'
      }}>
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div key={idx} className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: '220px' }}>
            <div className="skeleton" style={{ width: '40%', height: '20px' }} />
            <div className="skeleton" style={{ width: '85%', height: '28px' }} />
            <div className="skeleton" style={{ width: '100%', height: '60px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
              <div className="skeleton" style={{ width: '30%', height: '16px' }} />
              <div className="skeleton" style={{ width: '20%', height: '16px' }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="glass-panel" style={{ padding: '3rem 2rem', textAlign: 'center', borderColor: 'rgba(244, 63, 94, 0.4)' }}>
        <AlertCircle size={48} color="var(--accent-rose)" style={{ marginBottom: '1rem' }} />
        <h3 style={{ fontSize: '1.3rem', color: 'var(--accent-rose)', marginBottom: '0.5rem' }}>
          Simulated API Server Error
        </h3>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
          {error}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button className="btn btn-primary" onClick={loadDrafts}>
            <RefreshCw size={16} /> Retry Fetch
          </button>
        </div>
      </div>
    );
  }

  // Empty State
  if (filteredDrafts.length === 0) {
    return (
      <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'rgba(99, 102, 241, 0.1)',
          color: 'var(--primary)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.25rem'
        }}>
          <FileQuestion size={32} />
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>
          No Post Drafts Found
        </h3>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '450px', margin: '0 auto 1.5rem', fontSize: '0.9rem' }}>
          Try clearing your search query or filter parameters, or create a brand new draft to get started.
        </p>
        <button className="btn btn-primary" onClick={() => openEditor()}>
          <FilePlus size={18} /> Create Your First Draft
        </button>
      </div>
    );
  }

  // Draft Grid / List View
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(330px, 1fr))' : '1fr',
      gap: '1.25rem'
    }}>
      {filteredDrafts.map((draft) => (
        <DraftCard key={draft.id} draft={draft} viewMode={viewMode} />
      ))}
    </div>
  );
}
