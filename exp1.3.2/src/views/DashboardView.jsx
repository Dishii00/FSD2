import React, { useState } from 'react';
import { useRBAC } from '../context/RBACContext';
import PermissionMatrix from '../components/PermissionMatrix';
import PermissionGuard from '../components/PermissionGuard';
import { PERMISSIONS } from '../config/rbacConfig';
import { 
  ShieldCheck, 
  Lock, 
  Trash2, 
  Edit3, 
  PlusCircle, 
  Sliders, 
  Activity,
  UserCheck,
  AlertOctagon
} from 'lucide-react';

export default function DashboardView() {
  const { activeUser, userPermissions, navigate, accessLogs } = useRBAC();
  const [posts, setPosts] = useState([
    { id: 1, title: 'RBAC Security Matrix & Route Protection Guide', author: 'Sarah Connor' },
    { id: 2, title: 'Dynamic Component Rendering with Permission Guards', author: 'Alex Rivera' },
  ]);

  const handleDeletePost = (id) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Active Persona Banner */}
      <div className="glass-panel" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(56, 189, 248, 0.15))' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img
              src={activeUser.avatar}
              alt={activeUser.name}
              style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary)' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <h2 style={{ fontSize: '1.4rem', margin: 0 }}>{activeUser.name}</h2>
                <span className={`badge role-badge-${activeUser.role}`}>
                  Role: {activeUser.role}
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0' }}>
                {activeUser.description}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-secondary" onClick={() => navigate('editor')} style={{ fontSize: '0.85rem' }}>
              <Edit3 size={16} /> Try Content Studio
            </button>
            <button className="btn btn-primary" onClick={() => navigate('admin')} style={{ fontSize: '0.85rem' }}>
              <Lock size={16} /> Try Admin Console
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Dynamic UI Feature Guard Demo */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.15rem', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sliders size={18} color="var(--accent-cyan)" /> Dynamic UI Adaptation Demo (`PermissionGuard`)
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Notice how Create and Delete buttons dynamically hide/disable based on your active persona ({activeUser.role}).
        </p>

        {/* Post Items List with Permission-Gated Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          
          {/* Header Action Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ fontSize: '0.95rem' }}>Managed Repository Posts</h4>

            {/* PermissionGuard for Post Creation */}
            <PermissionGuard
              requirePermission={PERMISSIONS.POSTS_CREATE}
              fallback={
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  🔒 Create Post button hidden (Requires <code>posts:create</code>)
                </span>
              }
            >
              <button className="btn btn-primary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>
                <PlusCircle size={15} /> Create Post
              </button>
            </PermissionGuard>
          </div>

          {/* Posts List */}
          {posts.map((post) => (
            <div
              key={post.id}
              className="glass-panel"
              style={{
                padding: '0.85rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(0,0,0,0.2)'
              }}
            >
              <div>
                <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{post.title}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Author: {post.author}</div>
              </div>

              {/* PermissionGuard for Post Deletion */}
              <PermissionGuard
                requirePermission={PERMISSIONS.POSTS_DELETE}
                fallback={
                  <span style={{ fontSize: '0.72rem', color: 'var(--role-admin)', opacity: 0.7 }}>
                    🔒 Delete Restricted (Admin Only)
                  </span>
                }
              >
                <button
                  className="btn btn-outline-danger btn-icon"
                  onClick={() => handleDeletePost(post.id)}
                  title="Delete Post (Admin Permission)"
                >
                  <Trash2 size={15} />
                </button>
              </PermissionGuard>
            </div>
          ))}

        </div>
      </div>

      {/* Permission Matrix */}
      <PermissionMatrix />

      {/* Route Access Telemetry Log */}
      <div className="glass-panel" style={{ padding: '1.25rem' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity size={18} color="var(--accent-cyan)" /> Route Navigation Telemetry Log
        </h3>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Records route guard evaluation outcomes (200 OK vs 403 Forbidden redirects)
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '180px', overflowY: 'auto' }}>
          {accessLogs.length === 0 ? (
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>
              No route navigation events logged yet. Try clicking tabs above!
            </div>
          ) : (
            accessLogs.map((log) => (
              <div
                key={log.id}
                style={{
                  padding: '0.6rem 0.85rem',
                  borderRadius: '6px',
                  background: '#05080f',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.78rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{
                    fontWeight: '700',
                    color: log.status.includes('ALLOWED') ? 'var(--role-viewer)' : 'var(--role-admin)'
                  }}>
                    {log.status}
                  </span>
                  <span>User: <strong>{log.user}</strong> ({log.role})</span>
                  <span style={{ color: 'var(--text-muted)' }}>➜ Target: <code>/{log.target}</code></span>
                </div>

                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {log.timestamp}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
