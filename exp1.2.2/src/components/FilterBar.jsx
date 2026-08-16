import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  setSelectedCategory, 
  setSelectedPlatform, 
  setSortBy, 
  setMinWordCount, 
  resetFilters 
} from '../store/slices/filtersSlice';
import { 
  selectSelectedCategory, 
  selectSelectedPlatform, 
  selectSortBy, 
  selectMinWordCount 
} from '../store/selectors';
import { Filter, ArrowUpDown, RotateCcw, Sliders } from 'lucide-react';

const CATEGORY_OPTIONS = ['All', 'Performance', 'React Architecture', 'Engineering'];
const PLATFORM_OPTIONS = ['All', 'Twitter/X', 'LinkedIn', 'Medium'];

export default function FilterBar() {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(selectSelectedCategory);
  const selectedPlatform = useSelector(selectSelectedPlatform);
  const sortBy = useSelector(selectSortBy);
  const minWordCount = useSelector(selectMinWordCount);

  return (
    <div className="glass-panel" style={{ padding: '0.85rem 1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Category & Platform Filter Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          
          {/* Category Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Filter size={15} style={{ color: 'var(--text-muted)' }} />
            <select
              className="input-field"
              value={selectedCategory}
              onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
              style={{ width: 'auto', padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
            >
              {CATEGORY_OPTIONS.map((cat) => (
                <option key={cat} value={cat} style={{ background: 'var(--bg-dark)' }}>Category: {cat}</option>
              ))}
            </select>
          </div>

          {/* Platform Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'rgba(0,0,0,0.2)', padding: '0.25rem', borderRadius: 'var(--radius-sm)' }}>
            {PLATFORM_OPTIONS.map((plat) => (
              <button
                key={plat}
                onClick={() => dispatch(setSelectedPlatform(plat))}
                style={{
                  background: selectedPlatform === plat ? 'var(--primary)' : 'transparent',
                  color: selectedPlatform === plat ? '#042f2e' : 'var(--text-secondary)',
                  border: 'none',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)'
                }}
              >
                {plat}
              </button>
            ))}
          </div>

          {/* Word Count Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sliders size={15} style={{ color: 'var(--text-muted)' }} />
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Min Words: <strong>{minWordCount}</strong>
            </span>
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={minWordCount}
              onChange={(e) => dispatch(setMinWordCount(parseInt(e.target.value, 10)))}
              style={{ width: '90px', accentColor: 'var(--primary)', cursor: 'pointer' }}
            />
          </div>

        </div>

        {/* Sorting & Reset Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ArrowUpDown size={15} style={{ color: 'var(--text-muted)' }} />
            <select
              className="input-field"
              value={sortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value))}
              style={{ width: 'auto', padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
            >
              <option value="date" style={{ background: 'var(--bg-dark)' }}>Sort: Creation Date</option>
              <option value="likes" style={{ background: 'var(--bg-dark)' }}>Sort: Most Liked</option>
              <option value="title" style={{ background: 'var(--bg-dark)' }}>Sort: Title (A-Z)</option>
              <option value="wordCount" style={{ background: 'var(--bg-dark)' }}>Sort: Word Count</option>
            </select>
          </div>

          <button className="btn btn-secondary btn-icon" onClick={() => dispatch(resetFilters())} title="Reset All Filters">
            <RotateCcw size={16} />
          </button>

        </div>

      </div>
    </div>
  );
}
