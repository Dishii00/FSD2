import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { jwtAuthService } from '../services/jwtAuthService';
import BearerRequestTester from './BearerRequestTester';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  Clock, 
  UserCheck, 
  AlertTriangle, 
  Zap, 
  CheckCircle2,
  Sliders,
  Server
} from 'lucide-react';

export default function Dashboard() {
  const { 
    token, 
    decodedUser, 
    forceExpireToken, 
    corruptToken, 
    storageType,
    error 
  } = useAuth();

  const [timeLeftSec, setTimeLeftSec] = useState(0);
  const [adminMetrics, setAdminMetrics] = useState(null);
  const [adminError, setAdminError] = useState(null);

  // Expiration Countdown Timer
  useEffect(() => {
    if (!decodedUser || !decodedUser.exp) return;

    const interval = setInterval(() => {
      const nowSec = Math.floor(Date.now() / 1000);
      const diff = decodedUser.exp - nowSec;
      setTimeLeftSec(diff > 0 ? diff : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [decodedUser]);

  // Fetch Admin Metrics if user claim has role === Admin
  const handleFetchAdminMetrics = async () => {
    setAdminError(null);
    try {
      const data = await jwtAuthService.fetchAdminDashboardMetrics(token);
      setAdminMetrics(data);
    } catch (err) {
      setAdminError(err.message);
    }
  };

  const formatSeconds = (sec) => {
    if (sec <= 0) return 'EXPIRED';
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Welcome Banner */}
      <div className="glass-panel" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(192, 132, 252, 0.15))' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img
              src={decodedUser.avatar}
              alt={decodedUser.name}
              style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary)' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <h2 style={{ fontSize: '1.4rem', margin: 0 }}>Welcome, {decodedUser.name}</h2>
                <span className="badge" style={{ background: 'var(--primary-light)', color: 'var(--primary)', border: '1px solid var(--primary)' }}>
                  Role: {decodedUser.role}
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                Authenticated via JWT Bearer Token stored in <strong>{storageType}</strong>
              </p>
            </div>
          </div>

          {/* Session Expiration Counter */}
          <div className="glass-panel" style={{ padding: '0.75rem 1.25rem', textAlign: 'right', background: 'rgba(0,0,0,0.3)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'flex-end' }}>
              <Clock size={14} color="var(--accent-amber)" /> Session Expiry Countdown
            </div>
            <div style={{
              fontSize: '1.3rem',
              fontWeight: '800',
              fontFamily: 'var(--font-mono)',
              color: timeLeftSec > 300 ? 'var(--jwt-signature)' : 'var(--accent-rose)'
            }}>
              {formatSeconds(timeLeftSec)}
            </div>
          </div>
        </div>
      </div>

      {/* Security Toolkit & Error Banner */}
      {error && (
        <div className="glass-panel" style={{ padding: '1.25rem', borderColor: 'var(--accent-rose)', background: 'rgba(244, 63, 94, 0.12)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--accent-rose)' }}>
            <AlertTriangle size={24} />
            <div>
              <h3 style={{ fontSize: '1.05rem', margin: 0 }}>JWT Token Validation Error</h3>
              <p style={{ fontSize: '0.85rem', margin: 0 }}>{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Grid Section: Decoded Claims & Security Testing */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        
        {/* Card 1: Decoded JWT Claims */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Key size={18} color="var(--jwt-payload)" /> Decoded JWT Claims (Payload)
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Subject (sub):</span>
              <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>{decodedUser.sub}</code>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Email (email):</span>
              <span>{decodedUser.email}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Issued At (iat):</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>{new Date(decodedUser.iat * 1000).toLocaleTimeString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Expiration (exp):</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>{new Date(decodedUser.exp * 1000).toLocaleTimeString()}</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>Permissions:</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {decodedUser.permissions && decodedUser.permissions.map((perm) => (
                  <span key={perm} className="badge" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)' }}>
                    ✓ {perm}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Security & Token Testing Toolkit */}
        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={18} color="var(--accent-amber)" /> JWT Security Testing Tools
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Simulate security breaches or expired token scenarios to test token verification logic
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button className="btn btn-secondary" onClick={forceExpireToken} style={{ fontSize: '0.85rem', justifyContent: 'flex-start' }}>
              <Clock size={16} color="var(--accent-amber)" /> Force Token Expiry (-10s)
            </button>

            <button className="btn btn-secondary" onClick={corruptToken} style={{ fontSize: '0.85rem', justifyContent: 'flex-start' }}>
              <AlertTriangle size={16} color="var(--accent-rose)" /> Corrupt Signature Checksum
            </button>
          </div>
        </div>

      </div>

      {/* Role-Based Access Control (RBAC) Section */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Lock size={20} color="var(--primary)" /> Role-Based Access Control (RBAC) Test
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              Endpoint verifies payload claims for <code>"role": "Admin"</code> requirement
            </p>
          </div>

          <button className="btn btn-primary" onClick={handleFetchAdminMetrics} style={{ fontSize: '0.85rem' }}>
            <Server size={16} /> Request Admin Metrics Endpoint
          </button>
        </div>

        {/* Admin Error */}
        {adminError && (
          <div style={{
            padding: '0.85rem',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(244, 63, 94, 0.12)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            color: 'var(--accent-rose)',
            fontSize: '0.85rem'
          }}>
            ❌ {adminError}
          </div>
        )}

        {/* Admin Metrics Result */}
        {adminMetrics && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            <div className="glass-panel" style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--jwt-signature)' }}>{adminMetrics.activeSessions}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Active Server Sessions</div>
            </div>
            <div className="glass-panel" style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--accent-cyan)' }}>{adminMetrics.jwtTokensIssued}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>JWT Tokens Issued</div>
            </div>
            <div className="glass-panel" style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)' }}>
              <div style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--primary)' }}>{adminMetrics.systemSecurityHealth}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Security Checksum Health</div>
            </div>
          </div>
        )}
      </div>

      {/* HTTP Bearer Request Interceptor Tester */}
      <BearerRequestTester />

    </div>
  );
}
