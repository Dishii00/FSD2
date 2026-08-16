import React, { useRef } from 'react';
import { useDrafts } from '../context/DraftContext';
import { 
  LayoutGrid, 
  List, 
  AlignJustify, 
  Filter, 
  ArrowUpDown, 
  Download, 
  Upload, 
  RotateCcw 
} from 'lucide-react';
import { mockApi } from '../services/mockApi';

export default function FilterBar() {
  const {
    statusFilter,
    categoryFilter,
    sortBy,
    viewMode,
    dispatch,
    drafts,
    filteredDrafts,
    resetData,
    addToast,
    loadDrafts
  } = useDrafts();

  const fileInputRef = useRef(null);

  // Extract unique categories from drafts
  const categories = ['All', ...new Set(drafts.map((d) => d.category || 'General'))];

  // Export JSON functionality
  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(drafts, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `draftcraft_export_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    addToast(`Exported ${drafts.length} drafts as JSON.`, 'success');
  };

  // Import JSON functionality
  const handleImportClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        if (Array.isArray(importedData)) {
          // Save imported drafts
          for (const d of importedData) {
            await mockApi.saveDraft(d);
          }
          await loadDrafts();
          addToast(`Successfully imported ${importedData.length} drafts!`, 'success');
        } else {
          addToast('Invalid JSON file format. Must be an array of drafts.', 'error');
        }
      } catch (err) {
        addToast(`Import failed: ${err.message}`, 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="glass-panel" style={{ padding: '0.85rem 1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Status Filter Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(0,0,0,0.2)', padding: '0.25rem', borderRadius: 'var(--radius-sm)' }}>
          {[
            { id: 'all', label: 'All Drafts' },
            { id: 'draft', label: 'Active Drafts' },
            { id: 'archived', label: 'Archived' },
            { id: 'published', label: 'Published' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => dispatch({ type: 'SET_STATUS_FILTER', payload: tab.id })}
              style={{
                background: statusFilter === tab.id ? 'var(--primary)' : 'transparent',
                color: statusFilter === tab.id ? 'white' : 'var(--text-secondary)',
                border: 'none',
                padding: '0.4rem 0.85rem',
                borderRadius: '6px',
                fontSize: '0.82rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'var(--transition-fast)'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Category & Sorting Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          
          {/* Category Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Filter size={15} style={{ color: 'var(--text-muted)' }} />
            <select
              className="input-field"
              value={categoryFilter}
              onChange={(e) => dispatch({ type: 'SET_CATEGORY_FILTER', payload: e.target.value })}
              style={{ width: 'auto', padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} style={{ background: 'var(--bg-dark)' }}>
                  Category: {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ArrowUpDown size={15} style={{ color: 'var(--text-muted)' }} />
            <select
              className="input-field"
              value={sortBy}
              onChange={(e) => dispatch({ type: 'SET_SORT_BY', payload: e.target.value })}
              style={{ width: 'auto', padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
            >
              <option value="updatedAt" style={{ background: 'var(--bg-dark)' }}>Sort: Recently Modified</option>
              <option value="title" style={{ background: 'var(--bg-dark)' }}>Sort: Title (A-Z)</option>
              <option value="wordCount" style={{ background: 'var(--bg-dark)' }}>Sort: Word Count</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', background: 'rgba(0,0,0,0.2)', padding: '0.2rem', borderRadius: 'var(--radius-sm)' }}>
            {[
              { id: 'grid', icon: LayoutGrid, title: 'Grid View' },
              { id: 'list', icon: List, title: 'List View' },
              { id: 'compact', icon: AlignJustify, title: 'Compact View' },
            ].map((v) => {
              const IconComp = v.icon;
              return (
                <button
                  key={v.id}
                  onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: v.id })}
                  title={v.title}
                  style={{
                    background: viewMode === v.id ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                    color: viewMode === v.id ? 'var(--primary)' : 'var(--text-muted)',
                    border: 'none',
                    padding: '0.35rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <IconComp size={16} />
                </button>
              );
            })}
          </div>

          {/* Export / Import & Seed Reset */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', borderLeft: '1px solid var(--border-color)', paddingLeft: '0.75rem' }}>
            <button className="btn btn-secondary btn-icon" onClick={handleExport} title="Export Drafts as JSON">
              <Download size={16} />
            </button>
            
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".json" style={{ display: 'none' }} />
            <button className="btn btn-secondary btn-icon" onClick={handleImportClick} title="Import Drafts from JSON">
              <Upload size={16} />
            </button>

            <button className="btn btn-secondary btn-icon" onClick={resetData} title="Reset to Default Seed Data">
              <RotateCcw size={16} />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
