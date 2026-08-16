import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleInspector, clearActionLog } from '../store/slices/uiSlice';
import { selectPostEntities, selectPostIds } from '../store/slices/postsSlice';
import { X, Terminal, Database, Activity, Trash2, Code, Layers } from 'lucide-react';

export default function ReduxInspectorDrawer() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.isInspectorOpen);
  const actionLog = useSelector((state) => state.ui.actionLog);
  const fullState = useSelector((state) => state);
  const postIds = useSelector(selectPostIds);
  const postEntities = useSelector(selectPostEntities);

  const [activeTab, setActiveTab] = useState('tree'); // 'tree' | 'actions' | 'normalized'

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      maxWidth: '520px',
      zIndex: 1200,
      background: 'rgba(10, 14, 23, 0.95)',
      backdropFilter: 'blur(20px)',
      borderLeft: '1px solid var(--border-glow)',
      boxShadow: '-10px 0 40px rgba(0,0,0,0.6)',
      display: 'flex',
      flexDirection: 'column',
      animation: 'slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      
      {/* Drawer Header */}
      <div style={{
        padding: '1.25rem 1.5rem',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(0,0,0,0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'var(--primary-light)', color: 'var(--primary)' }}>
            <Terminal size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Redux DevTools Inspector</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
              Live Store Tree & Action Dispatch Log
            </p>
          </div>
        </div>

        <button className="btn btn-secondary btn-icon" onClick={() => dispatch(toggleInspector())}>
          <X size={18} />
        </button>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem 1.5rem',
        borderBottom: '1px solid var(--border-color)',
        gap: '0.5rem',
        background: 'rgba(0,0,0,0.15)'
      }}>
        {[
          { id: 'tree', label: 'State Tree', icon: Database },
          { id: 'normalized', label: 'Normalized Entities', icon: Layers },
          { id: 'actions', label: `Action Log (${actionLog.length})`, icon: Activity },
        ].map((t) => {
          const IconComp = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                background: isActive ? 'var(--primary)' : 'transparent',
                color: isActive ? 'white' : 'var(--text-secondary)',
                border: 'none',
                padding: '0.4rem 0.75rem',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <IconComp size={14} />
              {t.label}
            </button>
          );
        })}

        {activeTab === 'actions' && (
          <button
            className="btn btn-secondary btn-icon"
            onClick={() => dispatch(clearActionLog())}
            title="Clear Action History"
            style={{ marginLeft: 'auto', padding: '0.25rem' }}
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>

      {/* Drawer Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem' }}>
        
        {/* Tab 1: Full State Tree */}
        {activeTab === 'tree' && (
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Root Redux State Object (<code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>store.getState()</code>)
            </div>
            <pre style={{
              background: '#05080f',
              padding: '1rem',
              borderRadius: '10px',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              color: '#38bdf8',
              overflowX: 'auto',
              border: '1px solid var(--border-color)',
              lineHeight: '1.5'
            }}>
              {JSON.stringify(fullState, null, 2)}
            </pre>
          </div>
        )}

        {/* Tab 2: Normalized Post Entities */}
        {activeTab === 'normalized' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              padding: '0.85rem',
              background: 'rgba(139, 92, 246, 0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(139, 92, 246, 0.25)',
              fontSize: '0.82rem',
              color: 'var(--text-secondary)'
            }}>
              💡 <strong>Normalized State Pattern:</strong> Data is split into an array of primary keys (<code>ids</code>) and a hash map dictionary (<code>entities</code>), enabling <code>O(1)</code> lookup performance.
            </div>

            <div>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '0.4rem', color: 'var(--accent-cyan)' }}>
                1. Post IDs Array (ids: {JSON.stringify(postIds)})
              </h4>
              <pre style={{
                background: '#05080f',
                padding: '0.75rem',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                color: '#f59e0b',
                border: '1px solid var(--border-color)'
              }}>
                {JSON.stringify(postIds, null, 2)}
              </pre>
            </div>

            <div>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '0.4rem', color: 'var(--accent-emerald)' }}>
                2. Post Entities Dictionary (entities map)
              </h4>
              <pre style={{
                background: '#05080f',
                padding: '0.75rem',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                color: '#34d399',
                border: '1px solid var(--border-color)',
                overflowX: 'auto'
              }}>
                {JSON.stringify(postEntities, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 3: Action History Log */}
        {activeTab === 'actions' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {actionLog.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', textAlign: 'center', marginTop: '2rem' }}>
                No Redux actions dispatched yet. Try creating or editing a post!
              </p>
            ) : (
              actionLog.map((log) => (
                <div
                  key={log.id}
                  style={{
                    padding: '0.75rem 1rem',
                    background: '#05080f',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.82rem',
                      fontWeight: '700',
                      color: log.type.includes('fulfilled') ? 'var(--accent-emerald)' :
                             log.type.includes('rejected') ? 'var(--accent-rose)' :
                             log.type.includes('pending') ? 'var(--accent-amber)' : 'var(--primary)'
                    }}>
                      {log.type}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {log.timestamp}
                    </span>
                  </div>

                  {log.payload !== undefined && (
                    <pre style={{
                      fontSize: '0.7rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-secondary)',
                      overflowX: 'auto',
                      maxHeight: '80px'
                    }}>
                      Payload: {JSON.stringify(log.payload)}
                    </pre>
                  )}
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}
