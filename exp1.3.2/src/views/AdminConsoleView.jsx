import React from 'react';
import { useRBAC } from '../context/RBACContext';
import { Lock, ShieldCheck, Key, Users, Settings, Database, AlertCircle } from 'lucide-react';

export default function AdminConsoleView() {
  const { activeUser } = useRBAC();

  return (
    <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.5rem' }}>
        <div style={{
          padding: '0.75rem',
          borderRadius: '12px',
          background: 'var(--role-admin-bg)',
          color: 'var(--role-admin)'
        }}>
          <Lock size={28} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', margin: 0 }}>Strict Admin Console Route (`/admin-console`)</h2>
            <span className="badge role-badge-Admin">ADMIN ONLY</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
            Authorized Administrator Access Granted to <strong>{activeUser.name}</strong> ({activeUser.role})
          </p>
        </div>
      </div>

      {/* Security Status Box */}
      <div className="glass-panel" style={{ padding: '1.25rem', background: 'rgba(0,0,0,0.2)', marginBottom: '1.5rem', borderColor: 'var(--role-admin)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--role-admin)' }}>
          <ShieldCheck size={24} />
          <div>
            <h3 style={{ fontSize: '1.05rem', margin: 0 }}>Strict Policy Evaluation: Passed</h3>
            <p style={{ fontSize: '0.85rem', margin: 0, color: 'var(--text-secondary)' }}>
              Required claims <code>"role": "Admin"</code> and <code>"admin:access"</code> successfully verified.
            </p>
          </div>
        </div>
      </div>

      {/* Admin Operations Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(244, 63, 94, 0.15)', color: 'var(--role-admin)', width: 'fit-content', marginBottom: '0.75rem' }}>
            <Users size={20} />
          </div>
          <h4 style={{ fontSize: '1rem', marginBottom: '0.35rem' }}>User Role Management</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Promote, demote, or revoke permissions across system accounts.
          </p>
          <button className="btn btn-secondary" style={{ fontSize: '0.8rem', width: '100%' }}>
            Manage 3 Active Users
          </button>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(168, 85, 247, 0.15)', color: 'var(--primary)', width: 'fit-content', marginBottom: '0.75rem' }}>
            <Settings size={20} />
          </div>
          <h4 style={{ fontSize: '1rem', marginBottom: '0.35rem' }}>System Security Matrix</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Configure global RBAC rules and API authorization scopes.
          </p>
          <button className="btn btn-secondary" style={{ fontSize: '0.8rem', width: '100%' }}>
            Configure Matrix
          </button>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)', width: 'fit-content', marginBottom: '0.75rem' }}>
            <Database size={20} />
          </div>
          <h4 style={{ fontSize: '1rem', marginBottom: '0.35rem' }}>Audit Trail Logs</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Inspect full security audit trails and permission escalation logs.
          </p>
          <button className="btn btn-secondary" style={{ fontSize: '0.8rem', width: '100%' }}>
            View Security Logs
          </button>
        </div>

      </div>

    </div>
  );
}
