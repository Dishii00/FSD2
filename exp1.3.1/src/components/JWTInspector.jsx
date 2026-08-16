import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Copy, Check, Code, ShieldCheck, Eye } from 'lucide-react';

export default function JWTInspector() {
  const { token, decodedHeader, decodedUser, rawTokenParts, isInspectorOpen, setIsInspectorOpen } = useAuth();
  const [copied, setCopied] = useState(false);

  if (!isInspectorOpen || !token || !rawTokenParts) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      maxWidth: '560px',
      zIndex: 1200,
      background: 'rgba(8, 12, 20, 0.95)',
      backdropFilter: 'blur(20px)',
      borderLeft: '1px solid var(--border-glow)',
      boxShadow: '-10px 0 40px rgba(0,0,0,0.6)',
      display: 'flex',
      flexDirection: 'column',
      animation: 'fadeIn 0.25s ease-out'
    }}>
      
      {/* Header */}
      <div style={{
        padding: '1.25rem 1.5rem',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(0,0,0,0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(192, 132, 252, 0.15)', color: 'var(--jwt-payload)' }}>
            <Code size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Visual JWT Inspector</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
              RFC 7519 Base64URL Segment Breakdown
            </p>
          </div>
        </div>

        <button className="btn btn-secondary btn-icon" onClick={() => setIsInspectorOpen(false)}>
          <X size={18} />
        </button>
      </div>

      {/* Content Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        
        {/* Raw Encoded JWT Token String with Colors */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
              Raw JWT String (Header.Payload.Signature)
            </label>
            <button className="btn btn-secondary" onClick={handleCopy} style={{ fontSize: '0.75rem', padding: '0.2rem 0.55rem' }}>
              {copied ? <Check size={13} color="var(--jwt-signature)" /> : <Copy size={13} />}
              <span>{copied ? 'Copied!' : 'Copy Token'}</span>
            </button>
          </div>

          <div style={{
            background: '#05080f',
            padding: '0.85rem',
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            wordBreak: 'break-all',
            border: '1px solid var(--border-color)',
            lineHeight: '1.7'
          }}>
            <span style={{ color: 'var(--jwt-header)', fontWeight: '700' }}>{rawTokenParts.headerB64}</span>
            <span style={{ color: 'var(--text-muted)' }}>.</span>
            <span style={{ color: 'var(--jwt-payload)', fontWeight: '700' }}>{rawTokenParts.payloadB64}</span>
            <span style={{ color: 'var(--text-muted)' }}>.</span>
            <span style={{ color: 'var(--jwt-signature)', fontWeight: '700' }}>{rawTokenParts.signatureB64}</span>
          </div>
        </div>

        {/* Section 1: Header */}
        <div style={{ borderLeft: '4px solid var(--jwt-header)', paddingLeft: '0.85rem' }}>
          <div style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--jwt-header)', marginBottom: '0.35rem' }}>
            1. HEADER (Algorithm & Token Type)
          </div>
          <pre style={{
            background: '#05080f',
            padding: '0.75rem',
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--jwt-header)',
            border: '1px solid var(--border-color)'
          }}>
            {JSON.stringify(decodedHeader, null, 2)}
          </pre>
        </div>

        {/* Section 2: Payload */}
        <div style={{ borderLeft: '4px solid var(--jwt-payload)', paddingLeft: '0.85rem' }}>
          <div style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--jwt-payload)', marginBottom: '0.35rem' }}>
            2. PAYLOAD (User Claims & Expiration)
          </div>
          <pre style={{
            background: '#05080f',
            padding: '0.75rem',
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--jwt-payload)',
            border: '1px solid var(--border-color)'
          }}>
            {JSON.stringify(decodedUser, null, 2)}
          </pre>
        </div>

        {/* Section 3: Signature */}
        <div style={{ borderLeft: '4px solid var(--jwt-signature)', paddingLeft: '0.85rem' }}>
          <div style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--jwt-signature)', marginBottom: '0.35rem' }}>
            3. VERIFY SIGNATURE (HMAC SHA-256 Checksum)
          </div>
          <div style={{
            background: '#05080f',
            padding: '0.75rem',
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--jwt-signature)',
            border: '1px solid var(--border-color)'
          }}>
            HMACSHA256(<br />
            &nbsp;&nbsp;base64UrlEncode(header) + "." +<br />
            &nbsp;&nbsp;base64UrlEncode(payload),<br />
            &nbsp;&nbsp;<span style={{ color: 'var(--accent-amber)' }}>super_secret_jwt_hmac_key</span><br />
            )
          </div>
        </div>

      </div>
    </div>
  );
}
