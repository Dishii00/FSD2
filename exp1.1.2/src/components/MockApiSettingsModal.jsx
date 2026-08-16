import React, { useState } from 'react';
import { useDrafts } from '../context/DraftContext';
import { X, Activity, AlertTriangle, RotateCcw, Database, Check } from 'lucide-react';

export default function MockApiSettingsModal() {
  const { isMockSettingsOpen, dispatch, apiConfig, updateConfig, resetData, addToast } = useDrafts();

  const [latency, setLatency] = useState(apiConfig.latencyMs || 500);
  const [simulateError, setSimulateError] = useState(apiConfig.simulateError || false);
  const [showRawStore, setShowRawStore] = useState(false);

  if (!isMockSettingsOpen) return null;

  const handleSaveConfig = () => {
    updateConfig({
      latencyMs: parseInt(latency, 10),
      simulateError,
    });
    dispatch({ type: 'TOGGLE_MOCK_SETTINGS' });
  };

  const rawData = localStorage.getItem('exp1_1_2_drafts_store') || '[]';

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1100,
      background: 'var(--bg-overlay)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      animation: 'fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '560px',
        padding: '1.75rem',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
      }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.6rem', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)' }}>
              <Activity size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Async Mock API Simulator</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
                Configure frontend backend simulation parameters
              </p>
            </div>
          </div>

          <button className="btn btn-secondary btn-icon" onClick={() => dispatch({ type: 'TOGGLE_MOCK_SETTINGS' })}>
            <X size={18} />
          </button>
        </div>

        {/* Form Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Latency Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '600' }}>Simulated Network Latency</label>
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>
                {latency} ms
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="2500"
              step="50"
              value={latency}
              onChange={(e) => setLatency(e.target.value)}
              style={{ width: '100%', accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              <span>Fast (100ms)</span>
              <span>Medium (500ms)</span>
              <span>Slow 3G (2500ms)</span>
            </div>
          </div>

          {/* Simulate Network Error Toggle */}
          <div className="glass-panel" style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <AlertTriangle size={20} color={simulateError ? 'var(--accent-rose)' : 'var(--text-muted)'} />
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: '600' }}>Simulate API Server Errors</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Inject HTTP 500 exceptions to test error feedback UI</div>
              </div>
            </div>

            <input
              type="checkbox"
              checked={simulateError}
              onChange={(e) => setSimulateError(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: 'var(--accent-rose)', cursor: 'pointer' }}
            />
          </div>

          {/* Reset Seed Button */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-secondary" onClick={resetData} style={{ flex: 1, fontSize: '0.85rem' }}>
              <RotateCcw size={15} /> Reset Seed Drafts
            </button>
            <button className="btn btn-secondary" onClick={() => setShowRawStore(!showRawStore)} style={{ flex: 1, fontSize: '0.85rem' }}>
              <Database size={15} /> {showRawStore ? 'Hide Storage' : 'Inspect Store'}
            </button>
          </div>

          {/* Raw Storage Inspection */}
          {showRawStore && (
            <div style={{ marginTop: '0.5rem' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                localStorage Key: <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>exp1_1_2_drafts_store</code>
              </div>
              <pre style={{
                maxHeight: '160px',
                overflowY: 'auto',
                background: '#05080f',
                padding: '0.75rem',
                borderRadius: '8px',
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                color: '#34d399',
                border: '1px solid var(--border-color)'
              }}>
                {rawData}
              </pre>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div style={{ marginTop: '1.75rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={() => dispatch({ type: 'TOGGLE_MOCK_SETTINGS' })}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSaveConfig}>
            <Check size={16} /> Save API Config
          </button>
        </div>

      </div>
    </div>
  );
}
