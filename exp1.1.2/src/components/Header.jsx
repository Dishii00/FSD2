import React from 'react';
import { useDrafts } from '../context/DraftContext';
import { 
  FilePlus, 
  Settings, 
  Sun, 
  Moon, 
  Search, 
  Activity, 
  Sparkles,
  Database
} from 'lucide-react';

export default function Header() {
  const { 
    searchQuery, 
    dispatch, 
    openEditor, 
    toggleTheme, 
    theme, 
    apiConfig,
    drafts
  } = useDrafts();

  return (
    <header className="glass-panel" style={{ padding: '1rem 1.5rem', borderRadius: 'var(--radius-lg)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Logo & Info */}
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
            <Sparkles size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0 }}>DraftCraft</h1>
              <span className="badge badge-draft" style={{ fontSize: '0.65rem', padding: '0.15rem 0.45rem' }}>
                EXP 1.1.2
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              Frontend Draft Management & Async API Simulation
            </p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div style={{ flex: '1', maxWidth: '400px', minWidth: '240px', position: 'relative' }}>
          <Search size={17} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="input-field"
            placeholder="Search drafts by title, content, tags..."
            value={searchQuery}
            onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
            style={{ paddingLeft: '2.4rem' }}
          />
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          
          {/* Mock API Config Button */}
          <button
            className="btn btn-secondary"
            onClick={() => dispatch({ type: 'TOGGLE_MOCK_SETTINGS' })}
            title="Configure Async Mock API Latency & Errors"
            style={{ padding: '0.55rem 0.85rem', fontSize: '0.82rem' }}
          >
            <Activity size={16} color={apiConfig.simulateError ? 'var(--accent-rose)' : 'var(--accent-cyan)'} />
            <span>Mock API ({apiConfig.latencyMs}ms)</span>
            {apiConfig.simulateError && (
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-rose)', display: 'inline-block' }} />
            )}
          </button>

          {/* Theme Switcher */}
          <button
            className="btn btn-secondary btn-icon"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* New Draft Primary Action */}
          <button className="btn btn-primary" onClick={() => openEditor()}>
            <FilePlus size={18} />
            <span>New Draft</span>
          </button>

        </div>

      </div>
    </header>
  );
}
