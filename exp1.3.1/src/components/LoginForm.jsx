import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MOCK_USERS } from '../services/jwtAuthService';
import { KeyRound, Mail, Lock, Eye, EyeOff, ShieldAlert, ArrowRight, Sparkles, UserCheck } from 'lucide-react';

export default function LoginForm() {
  const { login, loading, error } = useAuth();
  
  const [email, setEmail] = useState('admin@platform.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {}
  };

  const handleQuickFill = (user) => {
    setEmail(user.email);
    setPassword(user.password);
  };

  return (
    <div style={{ maxWidth: '460px', margin: '2rem auto', width: '100%' }}>
      <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, var(--primary), var(--jwt-payload))',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            marginBottom: '1rem',
            boxShadow: 'var(--shadow-glow)'
          }}>
            <KeyRound size={28} />
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.35rem' }}>Sign In with JWT</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Enter credentials to obtain a signed JWT session token
          </p>
        </div>

        {/* Quick Fill Preset Accounts */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            ⚡ Quick-fill Preset Accounts:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
            {MOCK_USERS.map((u) => (
              <button
                key={u.id}
                type="button"
                className="btn btn-secondary"
                onClick={() => handleQuickFill(u)}
                style={{
                  fontSize: '0.75rem',
                  padding: '0.4rem 0.25rem',
                  flexDirection: 'column',
                  gap: '0.2rem',
                  borderColor: email === u.email ? 'var(--primary)' : 'var(--border-color)'
                }}
              >
                <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{u.role}</span>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{u.email.split('@')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{
            padding: '0.85rem',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(244, 63, 94, 0.12)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            color: 'var(--accent-rose)',
            fontSize: '0.85rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <ShieldAlert size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Email */}
          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="email"
                className="input-field"
                placeholder="user@platform.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ paddingLeft: '2.4rem' }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                className="input-field"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ paddingLeft: '2.4rem', paddingRight: '2.4rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ padding: '0.75rem', marginTop: '0.5rem' }}>
            <span>{loading ? 'Authenticating & Signing JWT...' : 'Generate JWT Session Token'}</span>
            <ArrowRight size={16} />
          </button>

        </form>

      </div>
    </div>
  );
}
