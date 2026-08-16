import React, { useEffect } from 'react';
import { useRBAC } from '../context/RBACContext';
import { PRESET_PERSONAS } from '../config/rbacConfig';
import { ShieldAlert, LayoutDashboard, Edit3, Lock, Users, Sun, Moon, Sparkles } from 'lucide-react';

export default function Header() {
  const { activeUser, activeTab, navigate, switchPersona, theme, toggleTheme } = useRBAC();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <header className="glass-panel" style={{ padding: '1rem 1.5rem', borderRadius: 'var(--radius-lg)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--primary), var(--accent-cyan))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-glow)',
            color: 'white'
          }}>
            <ShieldAlert size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0 }}>RBAC Studio</h1>
              <span className={`badge role-badge-${activeUser.role}`} style={{ fontSize: '0.65rem', padding: '0.15rem 0.45rem' }}>
                {activeUser.role.toUpperCase()} ACTIVE
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              Role-Based Access Control & Protected Routes (Exp 1.3.2)
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(0,0,0,0.25)', padding: '0.3rem', borderRadius: 'var(--radius-sm)' }}>
          <button
            className="btn"
            onClick={() => navigate('dashboard')}
            style={{
              background: activeTab === 'dashboard' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'dashboard' ? 'white' : 'var(--text-secondary)',
              fontSize: '0.82rem',
              padding: '0.4rem 0.85rem'
            }}
          >
            <LayoutDashboard size={15} /> Dashboard
          </button>

          <button
            className="btn"
            onClick={() => navigate('editor')}
            style={{
              background: activeTab === 'editor' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'editor' ? 'white' : 'var(--text-secondary)',
              fontSize: '0.82rem',
              padding: '0.4rem 0.85rem'
            }}
          >
            <Edit3 size={15} /> Content Studio (Protected)
          </button>

          <button
            className="btn"
            onClick={() => navigate('admin')}
            style={{
              background: activeTab === 'admin' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'admin' ? 'white' : 'var(--text-secondary)',
              fontSize: '0.82rem',
              padding: '0.4rem 0.85rem'
            }}
          >
            <Lock size={15} /> Admin Console (Strict)
          </button>
        </div>

        {/* Persona Role Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,0,0,0.2)', padding: '0.3rem 0.65rem', borderRadius: 'var(--radius-sm)' }}>
            <Users size={16} style={{ color: 'var(--text-muted)' }} />
            <select
              className="input-field"
              value={activeUser.id}
              onChange={(e) => switchPersona(e.target.value)}
              style={{ width: 'auto', padding: '0.35rem 0.65rem', fontSize: '0.82rem', border: 'none' }}
            >
              {PRESET_PERSONAS.map((p) => (
                <option key={p.id} value={p.id} style={{ background: 'var(--bg-dark)' }}>
                  Impersonate: {p.name} ({p.role})
                </option>
              ))}
            </select>
          </div>

          <button className="btn btn-secondary btn-icon" onClick={toggleTheme} title="Toggle Theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

        </div>

      </div>
    </header>
  );
}
