import React from 'react';
import { useAuth } from '../context/AuthContext';
import { KeyRound, ShieldCheck, LogOut, Code, HardDrive, Cpu, Sun, Moon } from 'lucide-react';

export default function Header() {
  const { 
    token, 
    decodedUser, 
    isAuthenticated, 
    logout, 
    storageType, 
    updateStorageType,
    isInspectorOpen,
    setIsInspectorOpen 
  } = useAuth();

  return (
    <header className="glass-panel" style={{ padding: '1rem 1.5rem', borderRadius: 'var(--radius-lg)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--primary), var(--jwt-payload))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-glow)',
            color: 'white'
          }}>
            <KeyRound size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0 }}>JWT AuthGuard</h1>
              <span className="badge" style={{
                background: isAuthenticated ? 'rgba(52, 211, 153, 0.15)' : 'rgba(251, 113, 133, 0.15)',
                color: isAuthenticated ? 'var(--jwt-signature)' : 'var(--jwt-header)',
                border: `1px solid ${isAuthenticated ? 'rgba(52, 211, 153, 0.3)' : 'rgba(251, 113, 133, 0.3)'}`,
                fontSize: '0.65rem'
              }}>
                {isAuthenticated ? 'STATELLES AUTHENTICATED' : 'UNAUTHENTICATED'}
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              Token-based Authentication & Session Storage (Exp 1.3.1)
            </p>
          </div>
        </div>

        {/* Auth Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          
          {/* Storage Mechanism Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(0,0,0,0.2)', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>
            <HardDrive size={15} style={{ color: 'var(--text-muted)' }} />
            <select
              className="input-field"
              value={storageType}
              onChange={(e) => updateStorageType(e.target.value)}
              style={{ width: 'auto', padding: '0.35rem 0.65rem', fontSize: '0.8rem', border: 'none' }}
            >
              <option value="localStorage" style={{ background: 'var(--bg-dark)' }}>Storage: localStorage</option>
              <option value="sessionStorage" style={{ background: 'var(--bg-dark)' }}>Storage: sessionStorage</option>
              <option value="memory" style={{ background: 'var(--bg-dark)' }}>Storage: Memory (State)</option>
            </select>
          </div>

          {/* Visual JWT Inspector Drawer Button */}
          {token && (
            <button
              className="btn btn-secondary"
              onClick={() => setIsInspectorOpen(!isInspectorOpen)}
              title="Inspect Base64URL JWT Header, Payload & Signature"
              style={{
                borderColor: isInspectorOpen ? 'var(--jwt-payload)' : 'var(--border-color)',
                color: isInspectorOpen ? 'var(--jwt-payload)' : undefined
              }}
            >
              <Code size={16} />
              <span>Visual JWT Inspector</span>
            </button>
          )}

          {/* User Status & Logout */}
          {isAuthenticated && decodedUser && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderLeft: '1px solid var(--border-color)', paddingLeft: '0.75rem' }}>
              <img
                src={decodedUser.avatar}
                alt={decodedUser.name}
                style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)' }}
              />
              <div style={{ fontSize: '0.82rem' }}>
                <div style={{ fontWeight: '700', lineHeight: 1.2 }}>{decodedUser.name}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)' }}>{decodedUser.role}</div>
              </div>

              <button className="btn btn-secondary btn-icon" onClick={logout} title="Sign Out">
                <LogOut size={16} color="var(--accent-rose)" />
              </button>
            </div>
          )}

        </div>

      </div>
    </header>
  );
}
