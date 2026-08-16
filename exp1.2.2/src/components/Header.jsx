import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery } from '../store/slices/filtersSlice';
import { toggleMemoizedMode, toggleTheme, togglePostModal } from '../store/slices/perfSlice';
import { selectSearchQuery } from '../store/selectors';
import { Rocket, Search, Cpu, Sun, Moon, PlusCircle, Zap } from 'lucide-react';

export default function Header() {
  const dispatch = useDispatch();
  const searchQuery = useSelector(selectSearchQuery);
  const isMemoizedMode = useSelector((state) => state.perf.isMemoizedMode);
  const theme = useSelector((state) => state.perf.theme);

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
            color: '#042f2e'
          }}>
            <Rocket size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0 }}>ReselectPerf Lab</h1>
              <span className="badge" style={{
                background: isMemoizedMode ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)',
                color: isMemoizedMode ? 'var(--primary)' : 'var(--accent-rose)',
                border: `1px solid ${isMemoizedMode ? 'rgba(16, 185, 129, 0.4)' : 'rgba(244, 63, 94, 0.4)'}`,
                fontSize: '0.68rem'
              }}>
                {isMemoizedMode ? 'MEMOIZED (createSelector)' : 'UN-MEMOIZED (Plain Selector)'}
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              Memoized State Access, Derived State & Render Optimization (Exp 1.2.2)
            </p>
          </div>
        </div>

        {/* Search Input */}
        <div style={{ flex: '1', maxWidth: '380px', minWidth: '240px', position: 'relative' }}>
          <Search size={17} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="input-field"
            placeholder="Search state with memoized query selector..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            style={{ paddingLeft: '2.4rem' }}
          />
        </div>

        {/* Mode & Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          
          {/* Memoized Mode Switch Button */}
          <button
            className="btn btn-secondary"
            onClick={() => dispatch(toggleMemoizedMode())}
            title="Toggle between Un-memoized vs Memoized createSelector"
            style={{
              borderColor: isMemoizedMode ? 'var(--primary)' : 'var(--accent-rose)',
              color: isMemoizedMode ? 'var(--primary)' : 'var(--accent-rose)'
            }}
          >
            <Cpu size={16} />
            <span>Mode: {isMemoizedMode ? 'Memoized' : 'Un-memoized'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            className="btn btn-secondary btn-icon"
            onClick={() => dispatch(toggleTheme())}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* New Post Action */}
          <button className="btn btn-primary" onClick={() => dispatch(togglePostModal(true))}>
            <PlusCircle size={18} />
            <span>New Post</span>
          </button>

        </div>

      </div>
    </header>
  );
}
