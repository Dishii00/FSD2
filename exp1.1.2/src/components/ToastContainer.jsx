import React from 'react';
import { useDrafts } from '../context/DraftContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, dispatch } = useDrafts();

  if (!toasts || toasts.length === 0) return null;

  const getToastIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={18} color="var(--accent-emerald)" />;
      case 'warning':
        return <AlertTriangle size={18} color="var(--accent-amber)" />;
      case 'error':
        return <AlertCircle size={18} color="var(--accent-rose)" />;
      default:
        return <Info size={18} color="var(--accent-cyan)" />;
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      zIndex: 1300,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.65rem',
      maxWidth: '380px',
      pointerEvents: 'none'
    }}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="glass-panel"
          style={{
            pointerEvents: 'auto',
            padding: '0.85rem 1.1rem',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
            animation: 'fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            background: 'var(--bg-card)',
            borderLeft: `4px solid ${
              toast.type === 'success' ? 'var(--accent-emerald)' :
              toast.type === 'error' ? 'var(--accent-rose)' :
              toast.type === 'warning' ? 'var(--accent-amber)' : 'var(--accent-cyan)'
            }`
          }}
        >
          {getToastIcon(toast.type)}
          <span style={{ fontSize: '0.88rem', fontWeight: '500', flex: 1, color: 'var(--text-primary)' }}>
            {toast.message}
          </span>
          <button
            onClick={() => dispatch({ type: 'REMOVE_TOAST', payload: toast.id })}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              padding: '0.2rem'
            }}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
