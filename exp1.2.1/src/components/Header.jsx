import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  openPostModal, 
  toggleInspector, 
  setSearchQuery, 
  toggleTheme 
} from '../store/slices/uiSlice';
import { 
  Layers, 
  PlusCircle, 
  Search, 
  Sun, 
  Moon, 
  Terminal, 
  Zap 
} from 'lucide-react';

export default function Header() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.ui.searchQuery);
  const theme = useSelector((state) => state.ui.theme);
  const actionLog = useSelector((state) => state.ui.actionLog);
  const isInspectorOpen = useSelector((state) => state.ui.isInspectorOpen);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <header className="glass-panel" style={{ padding: '1rem 1.5rem', borderRadius: 'var(--radius-lg)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Brand Logo & Lab Title */}
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
            <Zap size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0 }}>ReduxPostCraft</h1>
              <span className="badge badge-scheduled" style={{ fontSize: '0.65rem', padding: '0.15rem 0.45rem' }}>
                EXP 1.2.1 REDUX TOOLKIT
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              Centralized Store, Normalized State & Async Thunks
            </p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div style={{ flex: '1', maxWidth: '380px', minWidth: '240px', position: 'relative' }}>
          <Search size={17} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="input-field"
            placeholder="Search normalized posts store..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            style={{ paddingLeft: '2.4rem' }}
          />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          
          {/* Redux State Inspector Drawer Toggle */}
          <button
            className="btn btn-secondary"
            onClick={() => dispatch(toggleInspector())}
            title="Inspect Live Redux Store & Action History"
            style={{ 
              borderColor: isInspectorOpen ? 'var(--primary)' : 'var(--border-color)',
              background: isInspectorOpen ? 'var(--primary-light)' : undefined,
              color: isInspectorOpen ? 'var(--primary)' : undefined
            }}
          >
            <Terminal size={16} />
            <span>Redux Inspector</span>
            <span style={{
              background: 'rgba(255, 255, 255, 0.15)',
              padding: '0.1rem 0.45rem',
              borderRadius: '99px',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)'
            }}>
              {actionLog.length}
            </span>
          </button>

          {/* Theme Toggle */}
          <button
            className="btn btn-secondary btn-icon"
            onClick={() => dispatch(toggleTheme())}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Create Post Action */}
          <button className="btn btn-primary" onClick={() => dispatch(openPostModal(null))}>
            <PlusCircle size={18} />
            <span>Create Post</span>
          </button>

        </div>

      </div>
    </header>
  );
}
