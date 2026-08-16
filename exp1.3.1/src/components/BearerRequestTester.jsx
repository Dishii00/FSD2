import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { jwtAuthService } from '../services/jwtAuthService';
import { Send, Server, CheckCircle2, AlertCircle, Code } from 'lucide-react';

export default function BearerRequestTester() {
  const { token } = useAuth();
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSendRequest = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const res = await jwtAuthService.fetchProtectedResource(token);
      setResponse(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Server size={18} color="var(--accent-cyan)" /> HTTP Authorization Header Interceptor
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
            Simulates attaching <code>Authorization: Bearer &lt;jwt_token&gt;</code> to HTTP requests
          </p>
        </div>

        <button className="btn btn-primary" onClick={handleSendRequest} disabled={loading} style={{ fontSize: '0.85rem' }}>
          <Send size={15} /> Send Bearer Token Request
        </button>
      </div>

      {/* Request Inspection Snippet */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
          Simulated Outbound HTTP Request Headers:
        </div>
        <pre style={{
          background: '#05080f',
          padding: '0.75rem',
          borderRadius: '8px',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-mono)',
          color: '#38bdf8',
          border: '1px solid var(--border-color)',
          overflowX: 'auto'
        }}>
{`GET /api/v1/protected/resource HTTP/1.1
Host: api.platform.com
Authorization: Bearer ${token ? `${token.slice(0, 25)}...${token.slice(-15)}` : 'None'}`}
        </pre>
      </div>

      {/* Response Box */}
      {error && (
        <div style={{
          padding: '0.85rem',
          borderRadius: 'var(--radius-sm)',
          background: 'rgba(244, 63, 94, 0.12)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          color: 'var(--accent-rose)',
          fontSize: '0.85rem'
        }}>
          ❌ HTTP 401 Unauthorized: {error}
        </div>
      )}

      {response && (
        <div style={{
          padding: '0.85rem',
          borderRadius: 'var(--radius-sm)',
          background: 'rgba(16, 185, 129, 0.12)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          fontSize: '0.85rem'
        }}>
          <div style={{ color: 'var(--jwt-signature)', fontWeight: '700', marginBottom: '0.35rem' }}>
            ✓ HTTP 200 OK Response Received
          </div>
          <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-primary)' }}>
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
