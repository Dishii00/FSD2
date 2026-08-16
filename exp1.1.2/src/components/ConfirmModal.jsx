import React from 'react';
import { useDrafts } from '../context/DraftContext';
import { AlertTriangle, Info, CheckCircle2, X } from 'lucide-react';

export default function ConfirmModal() {
  const { confirmModal, setConfirmModal } = useDrafts();

  if (!confirmModal) return null;

  const { title, message, type = 'danger', onConfirm } = confirmModal;

  const handleConfirm = () => {
    onConfirm();
    setConfirmModal(null);
  };

  const isDanger = type === 'danger';

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1200,
      background: 'var(--bg-overlay)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '440px',
        padding: '1.5rem',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        borderColor: isDanger ? 'rgba(244, 63, 94, 0.4)' : 'var(--border-color)'
      }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{
            padding: '0.75rem',
            borderRadius: '12px',
            background: isDanger ? 'rgba(244, 63, 94, 0.15)' : 'rgba(99, 102, 241, 0.15)',
            color: isDanger ? 'var(--accent-rose)' : 'var(--primary)',
            height: 'fit-content'
          }}>
            {isDanger ? <AlertTriangle size={24} /> : <Info size={24} />}
          </div>

          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>{title}</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              {message}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
          <button className="btn btn-secondary" onClick={() => setConfirmModal(null)}>
            Cancel
          </button>
          <button
            className={isDanger ? 'btn btn-danger' : 'btn btn-primary'}
            onClick={handleConfirm}
          >
            {isDanger ? 'Yes, Delete' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}
