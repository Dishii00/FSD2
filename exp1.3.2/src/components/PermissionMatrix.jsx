import React from 'react';
import { useRBAC } from '../context/RBACContext';
import { ROLE_PERMISSIONS_MAP, ROLES, PERMISSIONS } from '../config/rbacConfig';
import { Check, X, Shield, Lock, CheckCircle2, AlertCircle } from 'lucide-react';

const PERMISSION_DESCRIPTIONS = [
  { key: PERMISSIONS.POSTS_READ, label: 'View & Read Posts', desc: 'Read-only access to published and draft post content' },
  { key: PERMISSIONS.POSTS_CREATE, label: 'Create New Posts', desc: 'Ability to author new draft posts' },
  { key: PERMISSIONS.POSTS_EDIT, label: 'Edit & Update Posts', desc: 'Modify existing post content and metadata' },
  { key: PERMISSIONS.POSTS_DELETE, label: 'Delete Posts', desc: 'Permanently remove posts from repository' },
  { key: PERMISSIONS.STUDIO_ACCESS, label: 'Content Studio Access', desc: 'Access to protected Content Studio route (/editor-studio)' },
  { key: PERMISSIONS.ADMIN_ACCESS, label: 'Admin Console Access', desc: 'Access to strictly guarded Admin Console route (/admin-console)' },
  { key: PERMISSIONS.SYSTEM_CONFIGURE, label: 'System Configuration', desc: 'Configure security policies and global RBAC matrices' },
  { key: PERMISSIONS.USERS_MANAGE, label: 'Manage Users & Roles', desc: 'Promote or demote user roles across system' },
];

export default function PermissionMatrix() {
  const { activeUser } = useRBAC();

  return (
    <div className="glass-panel" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Shield size={20} color="var(--primary)" /> Role-Based Access Control (RBAC) Permission Matrix
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
            Active Persona: <strong>{activeUser.name}</strong> (<span className={`badge role-badge-${activeUser.role}`}>{activeUser.role}</span>)
          </p>
        </div>
      </div>

      {/* Matrix Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
              <th style={{ padding: '0.85rem', color: 'var(--text-secondary)', minWidth: '220px' }}>Permission Claim</th>
              <th style={{ padding: '0.85rem', color: 'var(--text-secondary)' }}>Description</th>
              {[ROLES.VIEWER, ROLES.EDITOR, ROLES.ADMIN].map((role) => (
                <th
                  key={role}
                  style={{
                    padding: '0.85rem',
                    textAlign: 'center',
                    background: activeUser.role === role ? 'rgba(168, 85, 247, 0.12)' : 'transparent',
                    borderLeft: '1px solid var(--border-color)',
                    minWidth: '100px'
                  }}
                >
                  <span className={`badge role-badge-${role}`}>{role}</span>
                  {activeUser.role === role && (
                    <div style={{ fontSize: '0.68rem', color: 'var(--primary)', marginTop: '0.2rem' }}>[Active]</div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PERMISSION_DESCRIPTIONS.map((item) => (
              <tr key={item.key} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.85rem', fontWeight: '600', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--accent-cyan)' }}>
                  {item.key}
                </td>
                <td style={{ padding: '0.85rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                  {item.desc}
                </td>

                {[ROLES.VIEWER, ROLES.EDITOR, ROLES.ADMIN].map((role) => {
                  const isGranted = (ROLE_PERMISSIONS_MAP[role] || []).includes(item.key);
                  const isActiveRole = activeUser.role === role;

                  return (
                    <td
                      key={role}
                      style={{
                        padding: '0.85rem',
                        textAlign: 'center',
                        borderLeft: '1px solid var(--border-color)',
                        background: isActiveRole ? 'rgba(168, 85, 247, 0.06)' : 'transparent'
                      }}
                    >
                      {isGranted ? (
                        <span style={{ color: 'var(--role-viewer)', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                          <Check size={16} /> Granted
                        </span>
                      ) : (
                        <span style={{ color: 'var(--role-admin)', opacity: 0.6, display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                          <X size={16} /> Denied
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
