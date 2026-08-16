import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { triggerUnrelatedStateUpdate, toggleMemoizedMode, toggleRenderHighlight } from '../store/slices/perfSlice';
import { selectUnrelatedTick, computationTracker } from '../store/selectors';
import { 
  Zap, 
  Activity, 
  Cpu, 
  RefreshCw, 
  Eye, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

export default function PerfDashboard() {
  const dispatch = useDispatch();
  const tick = useSelector(selectUnrelatedTick);
  const isMemoizedMode = useSelector((state) => state.perf.isMemoizedMode);
  const isRenderHighlight = useSelector((state) => state.perf.isRenderHighlightEnabled);

  // Read counters from computation tracker
  const computationRuns = isMemoizedMode 
    ? computationTracker.memoizedRuns 
    : computationTracker.unmemoizedRuns;

  return (
    <div className="glass-panel" style={{ padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-lg)', borderColor: isMemoizedMode ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ padding: '0.5rem', borderRadius: '10px', background: isMemoizedMode ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)', color: isMemoizedMode ? 'var(--primary)' : 'var(--accent-rose)' }}>
            <Activity size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.15rem', margin: 0 }}>Selector & Rendering Telemetry Dashboard</h2>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
              Benchmarking derived state computation & cache hit rates
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          
          {/* Unrelated State Trigger Button */}
          <button
            className="btn btn-primary"
            onClick={() => dispatch(triggerUnrelatedStateUpdate())}
            title="Updates unrelated state in Redux. In Memoized mode, selectors will NOT recompute!"
            style={{ fontSize: '0.85rem' }}
          >
            <Zap size={16} />
            <span>Trigger Unrelated State Update</span>
            <span style={{ background: 'rgba(0,0,0,0.2)', padding: '0.1rem 0.45rem', borderRadius: '99px', fontFamily: 'var(--font-mono)' }}>
              Tick: {tick}
            </span>
          </button>

          {/* Render Highlight Flash Toggle */}
          <button
            className="btn btn-secondary"
            onClick={() => dispatch(toggleRenderHighlight())}
            title="Toggle component re-render pulse glow animation"
            style={{ fontSize: '0.82rem' }}
          >
            <Eye size={15} color={isRenderHighlight ? 'var(--primary)' : 'var(--text-muted)'} />
            <span>Visual Re-render Flash: {isRenderHighlight ? 'ON' : 'OFF'}</span>
          </button>

        </div>
      </div>

      {/* Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        
        {/* Metric 1: Selector Executions */}
        <div className="glass-panel" style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ padding: '0.6rem', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)' }}>
            <Cpu size={20} />
          </div>
          <div>
            <div style={{ fontSize: '1.3rem', fontWeight: '800', fontFamily: 'var(--font-mono)', lineHeight: 1.2 }}>
              {computationRuns}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Selector Logic Executions
            </div>
          </div>
        </div>

        {/* Metric 2: Cache Efficiency Status */}
        <div className="glass-panel" style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ padding: '0.6rem', borderRadius: '10px', background: isMemoizedMode ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)', color: isMemoizedMode ? 'var(--primary)' : 'var(--accent-rose)' }}>
            {isMemoizedMode ? <CheckCircle2 size={20} /> : <AlertTriangle size={20} />}
          </div>
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: '700', lineHeight: 1.2, color: isMemoizedMode ? 'var(--primary)' : 'var(--accent-rose)' }}>
              {isMemoizedMode ? '100% Cache Active' : '0% Cache (Bypassed)'}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              {isMemoizedMode ? 'Reselect input memoization active' : 'Recomputes on every tick'}
            </div>
          </div>
        </div>

        {/* Metric 3: Live Explanation */}
        <div className="glass-panel" style={{ padding: '0.85rem 1rem', background: 'rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
            🧪 Experiment Test Protocol:
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Click <strong>Trigger Unrelated State Update</strong>. In <strong>Memoized Mode</strong>, notice that the computation counter does <em>not</em> increase when unrelated state updates!
          </div>
        </div>

      </div>

    </div>
  );
}
