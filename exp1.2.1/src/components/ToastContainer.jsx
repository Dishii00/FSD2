import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeToast } from '../store/slices/uiSlice';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const dispatch = useDispatch();
  const toasts = useSelector((state) => state.ui.toasts);

  if (!toasts || toasts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      zIndex: 1400,
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
              toast.type === 'error' ? 'var(--accent-rose)' : 'var(--accent-cyan)'
            }`
          }}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 size={18} color="var(--accent-emerald)" />
          ) : (
            <Info size={18} color="var(--accent-cyan)" />
          )}
          
          <span style={{ fontSize: '0.88rem', fontWeight: '500', flex: 1, color: 'var(--text-primary)' }}>
            {toast.message}
          </span>

          <button
            onClick={() => dispatch(removeToast(toast.id))}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex' }}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
