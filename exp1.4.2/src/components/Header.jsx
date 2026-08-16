import React from 'react';
import { 
  Zap, 
  Cpu, 
  TestTube, 
  RefreshCw, 
  Sun, 
  Moon, 
  PlusCircle, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function Header({ 
  isOptimized, 
  setIsOptimized, 
  parentTick, 
  setParentTick, 
  onOpenTestModal, 
  theme, 
  setTheme,
  onOpenScheduleModal 
}) {
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('exp1_4_2_theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  return (
    <header className="glass-panel" style={{ padding: '1rem 1.5rem', borderRadius: 'var(--radius-lg)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Brand */}
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
            <Cpu size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0 }}>PerfTesting Studio</h1>
              <span className="badge" style={{
                background: isOptimized ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)',
                color: isOptimized ? 'var(--primary)' : 'var(--accent-rose)',
                border: `1px solid ${isOptimized ? 'rgba(16, 185, 129, 0.4)' : 'rgba(244, 63, 94, 0.4)'}`,
                fontSize: '0.65rem'
              }}>
                {isOptimized ? 'OPTIMIZED (React.memo + useMemo)' : 'UNOPTIMIZED (Full Re-renders)'}
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              Rendering Optimization & Component Unit Testing (Exp 1.4.2)
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          
          {/* Trigger Parent Re-render Demo Button */}
          <button
            className="btn btn-primary"
            onClick={() => setParentTick((prev) => prev + 1)}
            title="Triggers parent component re-render. In Optimized mode, memoized cells will NOT re-render!"
            style={{ fontSize: '0.85rem' }}
          >
            <Zap size={16} />
            <span>Trigger Parent Re-render</span>
            <span style={{ background: 'rgba(0,0,0,0.2)', padding: '0.1rem 0.45rem', borderRadius: '99px', fontFamily: 'var(--font-mono)' }}>
              Tick: {parentTick}
            </span>
          </button>

          {/* Mode Switcher */}
          <button
            className="btn btn-secondary"
            onClick={() => setIsOptimized(!isOptimized)}
            title="Toggle between Unoptimized vs Optimized React.memo"
            style={{
              borderColor: isOptimized ? 'var(--primary)' : 'var(--accent-rose)',
              color: isOptimized ? 'var(--primary)' : 'var(--accent-rose)'
            }}
          >
            <Cpu size={16} />
            <span>Mode: {isOptimized ? 'Optimized' : 'Unoptimized'}</span>
          </button>

          {/* Run Unit Test Suite Button */}
          <button className="btn btn-secondary" onClick={onOpenTestModal} style={{ fontSize: '0.85rem' }}>
            <TestTube size={16} color="var(--accent-purple)" />
            <span>Run Unit Test Suite</span>
          </button>

          {/* Theme Toggle */}
          <button className="btn btn-secondary btn-icon" onClick={toggleTheme} title="Toggle Theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Schedule Post Action */}
          <button className="btn btn-primary" onClick={onOpenScheduleModal}>
            <PlusCircle size={18} />
            <span>Schedule Post</span>
          </button>

        </div>

      </div>
    </header>
  );
}
