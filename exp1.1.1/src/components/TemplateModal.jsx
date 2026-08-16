import React from 'react';
import { SAMPLE_TEMPLATES } from '../data/templates';
import { FileText, X, Check, ArrowRight } from 'lucide-react';

export default function TemplateModal({
  isOpen,
  onClose,
  onSelectTemplate,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-lg glass animate-fade-in">
        <div className="modal-header">
          <div className="title-with-icon">
            <FileText size={20} />
            <h3>Post Template Library</h3>
          </div>
          <button className="btn-close" onClick={onClose}><X size={18} /></button>
        </div>

        <p className="modal-subtext">Choose a pre-formatted post template tailored for multi-platform engagement:</p>

        <div className="templates-grid">
          {SAMPLE_TEMPLATES.map((tmpl) => (
            <div key={tmpl.id} className="template-card glass">
              <div className="template-meta">
                <span className="category-tag">{tmpl.category}</span>
                <h4>{tmpl.title}</h4>
              </div>

              <div className="template-preview-text">
                {tmpl.text}
              </div>

              <div className="template-footer">
                <span className="recommended-label">Optimal for: {tmpl.recommendedPlatforms.join(', ')}</span>
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    onSelectTemplate(tmpl);
                    onClose();
                  }}
                >
                  <span>Use Template</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
