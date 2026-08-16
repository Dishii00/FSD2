import React from 'react';
import { useSelector } from 'react-redux';
import { selectDerivedCategoryStats, selectDerivedPlatformMetrics } from '../store/selectors';
import { BarChart3, Layers, Heart, FileText, Share2, Sparkles } from 'lucide-react';

export default function DerivedAnalyticsCard() {
  const categoryStats = useSelector(selectDerivedCategoryStats);
  const platformMetrics = useSelector(selectDerivedPlatformMetrics);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
      
      {/* Category Analytics Card */}
      <div className="glass-panel" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
          <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(168, 85, 247, 0.15)', color: 'var(--accent-purple)' }}>
            <Layers size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', margin: 0 }}>Derived Category Analytics</h3>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Computed on the fly via <code>createSelector</code>
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {Object.keys(categoryStats.byCategory).map((cat) => {
            const data = categoryStats.byCategory[cat];
            return (
              <div key={cat} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{cat}</span>
                <div style={{ display: 'flex', gap: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: '600' }}>
                  <span>{data.count} posts</span>
                  <span style={{ color: 'var(--accent-rose)' }}>♥ {data.likes}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Aggregate Metrics Card */}
      <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
          <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)' }}>
            <BarChart3 size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', margin: 0 }}>Aggregate State Summaries</h3>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Zero state duplication in Redux store
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '8px' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--accent-cyan)' }}>
              {categoryStats.totalWords.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Draft Words</div>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '8px' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary)' }}>
              {categoryStats.avgWordsPerPost}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Avg Words / Post</div>
          </div>
        </div>
      </div>

      {/* Platform Distribution Card */}
      <div className="glass-panel" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
          <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.15)', color: 'var(--accent-blue)' }}>
            <Share2 size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', margin: 0 }}>Platform Share Distribution</h3>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Calculated from post entity list
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {platformMetrics.map((pm) => (
            <div key={pm.platform}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.2rem' }}>
                <span>{pm.platform}</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>{pm.percentage}% ({pm.count})</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${pm.percentage}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--accent-cyan))' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
