// JWT Authentication Service (Exp 1.3.1)
// Implements token generation, Base64URL encoding/decoding, expiration validation, and RBAC

const SECRET_KEY = 'super_secret_jwt_hmac_key_2026';

// Preset Accounts for testing
export const MOCK_USERS = [
  {
    id: 'usr-admin-1',
    name: 'Sarah Connor',
    email: 'admin@platform.com',
    password: 'admin123',
    role: 'Admin',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    permissions: ['read', 'write', 'delete', 'admin_access', 'audit_logs'],
  },
  {
    id: 'usr-dev-2',
    name: 'Alex Rivera',
    email: 'developer@platform.com',
    password: 'dev123',
    role: 'Developer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    permissions: ['read', 'write', 'deploy_code'],
  },
  {
    id: 'usr-creator-3',
    name: 'Elena Rostova',
    email: 'creator@platform.com',
    password: 'creator123',
    role: 'Creator',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    permissions: ['read', 'write', 'publish_posts'],
  },
];

// Helper: UTF-8 Base64URL Encoder
export function base64UrlEncode(obj) {
  const jsonStr = typeof obj === 'string' ? obj : JSON.stringify(obj);
  const base64 = btoa(unescape(encodeURIComponent(jsonStr)));
  return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

// Helper: Base64URL Decoder
export function base64UrlDecode(base64UrlStr) {
  try {
    let base64 = base64UrlStr.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const jsonStr = decodeURIComponent(escape(atob(base64)));
    return JSON.parse(jsonStr);
  } catch (err) {
    throw new Error('Malformed Base64URL JWT segment');
  }
}

// Helper: Pseudo Signature Checksum
function generateSignature(headerB64, payloadB64, secret) {
  let hash = 0;
  const str = `${headerB64}.${payloadB64}.${secret}`;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return base64UrlEncode({ sig: Math.abs(hash).toString(36), algorithm: 'HMAC-SHA256' });
}

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export const jwtAuthService = {
  // Generate JWT Token
  createJWT(user, expiresInSeconds = 3600) {
    const nowSec = Math.floor(Date.now() / 1000);
    
    const header = {
      alg: 'HS256',
      typ: 'JWT',
    };

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
      permissions: user.permissions,
      iat: nowSec,
      exp: nowSec + expiresInSeconds,
    };

    const headerB64 = base64UrlEncode(header);
    const payloadB64 = base64UrlEncode(payload);
    const signatureB64 = generateSignature(headerB64, payloadB64, SECRET_KEY);

    return `${headerB64}.${payloadB64}.${signatureB64}`;
  },

  // Verify and Decode JWT Token
  verifyAndDecodeToken(token) {
    if (!token) throw new Error('No Authorization token provided.');
    
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format. Token must contain 3 segments (Header.Payload.Signature).');
    }

    const [headerB64, payloadB64, signatureB64] = parts;

    // 1. Decode Header & Payload
    const header = base64UrlDecode(headerB64);
    const payload = base64UrlDecode(payloadB64);

    // 2. Validate Signature Checksum
    const expectedSig = generateSignature(headerB64, payloadB64, SECRET_KEY);
    if (signatureB64 !== expectedSig) {
      throw new Error('JWT Signature Verification Failed! Token has been tampered with or corrupted.');
    }

    // 3. Expiration Check
    const nowSec = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < nowSec) {
      throw new Error('JWT Session Token Expired. Please log in again.');
    }

    return { header, payload, parts: { headerB64, payloadB64, signatureB64 } };
  },

  // Simulated Login API
  async login(email, password) {
    await delay(500);
    const user = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password credentials.');
    }

    // Issue JWT Token valid for 1 hour (3600 seconds)
    const token = this.createJWT(user, 3600);
    return { token, user };
  },

  // Simulated Protected Request with Bearer Token Header
  async fetchProtectedResource(token) {
    await delay(350);
    const { payload } = this.verifyAndDecodeToken(token);
    
    return {
      message: `Access Granted! Welcome to Protected Server Resource, ${payload.name}.`,
      claims: payload,
      serverTimestamp: new Date().toISOString(),
    };
  },

  // Simulated Admin Only Endpoint (RBAC Test)
  async fetchAdminDashboardMetrics(token) {
    await delay(400);
    const { payload } = this.verifyAndDecodeToken(token);

    if (payload.role !== 'Admin') {
      throw new Error(`403 Forbidden: Role "${payload.role}" does not have Admin permission claims.`);
    }

    return {
      activeSessions: 142,
      jwtTokensIssued: 1289,
      systemSecurityHealth: 'Optimal (HMAC SHA-256 Validated)',
      serverUptime: '99.99%',
    };
  }
};
