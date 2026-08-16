import React from 'react';
import { useRBAC } from '../context/RBACContext';
import { Edit3, CheckCircle2, FileText, Send, Sparkles } from 'lucide-react';

export default function EditorStudioView() {
  const { activeUser } = useRBAC();

  return (
    <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.5rem' }}>
        <div style={{
          padding: '0.75rem',
          borderRadius: '12px',
          background: 'var(--role-editor-bg)',
          color: 'var(--role-editor)'
        }}>
          <Edit3 size={28} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', margin: 0 }}>Protected Content Studio Route (`/editor-studio`)</h2>
            <span className="badge role-badge-Editor">PROTECTED ROUTE</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
            Authorized Access Granted to <strong>{activeUser.name}</strong> ({activeUser.role})
          </p>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.2)', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--accent-cyan)' }}>
          ✓ Authorization Verified: <code>studio:access</code>
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          This route is guarded by the <code>ProtectedRoute</code> wrapper. Only users assigned the <strong>Editor</strong> or <strong>Admin</strong> role can view this workspace. Viewers attempting to navigate here are redirected to the 403 Unauthorized Access Denied screen.
        </p>
      </div>

      {/* Editor Mock Workspace */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          className="input-field"
          placeholder="Article Title..."
          defaultValue="Advanced Authorization Patterns in React & Redux"
          style={{ fontSize: '1.2rem', fontWeight: '700' }}
        />

        <textarea
          className="input-field"
          rows={6}
          placeholder="Draft content..."
          defaultValue="Role-based authorization enforces fine-grained access control across web applications..."
          style={{ lineHeight: '1.7', resize: 'vertical' }}
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button className="btn btn-secondary">Save Draft</button>
          <button className="btn btn-primary">
            <Send size={16} /> Publish Post
          </button>
        </div>
      </div>
    </div>
  );
}
