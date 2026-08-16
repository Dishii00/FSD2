import React from 'react';
import { useRBAC } from '../context/RBACContext';
import { PRESET_PERSONAS } from '../config/rbacConfig';
import { ShieldAlert, ArrowLeft, KeyRound, Shield, AlertTriangle } from 'lucide-react';

export default function UnauthorizedView() {
  const { activeUser, unauthorizedAttempt, navigate, switchPersona } = useRBAC();

  const attempt = unauthorizedAttempt || {
    targetTab: 'admin',
    requiredPermission: 'admin:access',
    requiredRole: 'Admin',
    userRole: activeUser.role,
  };

  return (
    <div className="glass-panel" style={{ padding: '3rem 2rem', textAlign: 'center', borderColor: 'var(--role-admin)', maxWidth: '640px', margin: '1rem auto' }}>
      
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: 'rgba(244, 63, 94, 0.15)',
        color: 'var(--role-admin)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.25rem'
      }}>
        <ShieldAlert size={36} />
      </div>

      <h2 style={{ fontSize: '1.6rem', color: 'var(--role-admin)', marginBottom: '0.35rem' }}>
        403 Forbidden: Access Denied
      </h2>

      <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
        Your active role <strong>({activeUser.role})</strong> does not possess the required permission claims to access the protected route <code>/{attempt.targetTab}</code>.
      </p>

      {/* Required Permission Info Box */}
      <div className="glass-panel" style={{ padding: '1rem', textAlign: 'left', background: 'rgba(0,0,0,0.2)', marginBottom: '1.75rem', fontSize: '0.85rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Target Route:</span>
          <code style={{ color: 'var(--accent-cyan)' }}>/{attempt.targetTab}</code>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Required Claim:</span>
          <code style={{ color: 'var(--role-admin)' }}>{attempt.requiredPermission}</code>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Current User:</span>
          <span>{activeUser.name} (<span className={`badge role-badge-${activeUser.role}`}>{activeUser.role}</span>)</span>
        </div>
      </div>

      {/* Quick Role Elevation Helper */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '0.65rem' }}>
          💡 Switch to an Authorized Role Persona to Unlock Access:
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
          {PRESET_PERSONAS.filter((p) => p.role !== activeUser.role).map((p) => (
            <button
              key={p.id}
              className="btn btn-secondary"
              onClick={() => {
                switchPersona(p.id);
                navigate(attempt.targetTab);
              }}
              style={{ fontSize: '0.8rem' }}
            >
              <KeyRound size={14} color="var(--primary)" /> Impersonate {p.name} ({p.role})
            </button>
          ))}
        </div>
      </div>

      <button className="btn btn-primary" onClick={() => navigate('dashboard')}>
        <ArrowLeft size={16} /> Return to Public Dashboard
      </button>

    </div>
  );
}
