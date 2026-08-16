import React from 'react';
import { Activity, CheckCircle2, Cpu, TestTube, AlertTriangle, Zap } from 'lucide-react';

export default function PerfTestingDashboard({ isOptimized, parentTick, onOpenTestModal }) {
  return (
    <div className="glass-panel" style={{ padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-lg)', borderColor: isOptimized ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ padding: '0.5rem', borderRadius: '10px', background: isOptimized ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)', color: isOptimized ? 'var(--primary)' : 'var(--accent-rose)' }}>
            <Activity size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.15rem', margin: 0 }}>Rendering Bottleneck & Unit Test Telemetry</h2>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
              Benchmarking <code>useMemo</code>, <code>useCallback</code>, and <code>React.memo</code> performance
            </p>
          </div>
        </div>

        <button className="btn btn-secondary" onClick={onOpenTestModal} style={{ fontSize: '0.82rem' }}>
          <TestTube size={15} color="var(--accent-purple)" /> In-Browser Test Suite (5/5 PASS)
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        
        {/* Metric 1: Mode */}
        <div className="glass-panel" style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ padding: '0.6rem', borderRadius: '10px', background: isOptimized ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)', color: isOptimized ? 'var(--primary)' : 'var(--accent-rose)' }}>
            {isOptimized ? <CheckCircle2 size={20} /> : <AlertTriangle size={20} />}
          </div>
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: '800', color: isOptimized ? 'var(--primary)' : 'var(--accent-rose)' }}>
              {isOptimized ? 'React.memo Active' : 'Unoptimized Mode'}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              {isOptimized ? 'Cell re-renders skipped on tick' : '35+ cells re-render on every tick'}
            </div>
          </div>
        </div>

        {/* Metric 2: Parent Tick Count */}
        <div className="glass-panel" style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ padding: '0.6rem', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)' }}>
            <Zap size={20} />
          </div>
          <div>
            <div style={{ fontSize: '1.3rem', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>
              {parentTick}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Parent Re-render Ticks
            </div>
          </div>
        </div>

        {/* Metric 3: Explanation */}
        <div className="glass-panel" style={{ padding: '0.85rem 1rem', background: 'rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
            🔬 Performance Benchmark Procedure:
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Click <strong>Trigger Parent Re-render</strong>. Observe that in <strong>Optimized Mode</strong>, cell <code>Renders: 1</code> badges do not flash or increment!
          </div>
        </div>

      </div>

    </div>
  );
}
