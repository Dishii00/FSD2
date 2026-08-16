import React from 'react';
import { PLATFORMS } from '../data/platforms';
import { 
  ShieldCheck, 
  AlertTriangle, 
  XCircle, 
  CheckCircle2, 
  Wand2, 
  Scissors, 
  Info,
  ChevronRight
} from 'lucide-react';
import { shortenText } from '../utils/aiAssistant';

export default function ValidationPanel({
  selectedPlatforms,
  validationResults,
  text,
  setText,
  platformOverrides,
  setPlatformOverrides,
  activeTab,
}) {
  if (selectedPlatforms.length === 0) {
    return (
      <div className="validation-panel card glass empty-state">
        <ShieldCheck size={32} className="text-muted" />
        <h4>No Platforms Selected</h4>
        <p>Select one or more platforms above to view real-time constraint validation.</p>
      </div>
    );
  }

  const handleAutoFixCharLimit = (platformId, maxLimit) => {
    const isSyncMode = activeTab === 'all' || activeTab === platformId;
    const currentText = platformOverrides[platformId] !== undefined ? platformOverrides[platformId] : text;
    const shortened = shortenText(currentText, maxLimit);

    if (isSyncMode && activeTab === 'all') {
      // Create override for that specific platform so other platforms aren't shortened
      setPlatformOverrides({
        ...platformOverrides,
        [platformId]: shortened,
      });
    } else {
      setPlatformOverrides({
        ...platformOverrides,
        [platformId]: shortened,
      });
    }
  };

  return (
    <div className="validation-panel card glass">
      <div className="card-header-sm">
        <div className="title-with-icon">
          <ShieldCheck size={18} className="icon-shield" />
          <h3>Real-Time Constraint Validation Matrix</h3>
        </div>
      </div>

      <div className="validation-matrix-list">
        {selectedPlatforms.map(pId => {
          const plat = PLATFORMS[pId];
          const val = validationResults[pId];
          if (!val) return null;

          const isError = val.overallStatus === 'error';
          const isWarning = val.overallStatus === 'warning';

          return (
            <div key={pId} className={`validation-row-card ${val.overallStatus}`}>
              <div className="row-header">
                <div className="platform-meta">
                  <span className="brand-badge-dot" style={{ backgroundColor: plat.brandColor }} />
                  <h4>{plat.name}</h4>
                  <span className="char-badge">
                    {val.weightedLength} / {val.maxLimit} chars
                  </span>
                </div>

                <div className="row-status">
                  {val.overallStatus === 'error' && (
                    <span className="status-badge badge-error">
                      <XCircle size={14} /> Failed ({val.errorCount} Error{val.errorCount > 1 ? 's' : ''})
                    </span>
                  )}
                  {val.overallStatus === 'warning' && (
                    <span className="status-badge badge-warning">
                      <AlertTriangle size={14} /> Warning ({val.warningCount})
                    </span>
                  )}
                  {val.overallStatus === 'valid' && (
                    <span className="status-badge badge-pass">
                      <CheckCircle2 size={14} /> Compliant
                    </span>
                  )}
                </div>
              </div>

              {/* Progress bar for character usage */}
              <div className="row-progress-container">
                <div 
                  className={`row-progress-fill status-${val.overallStatus}`}
                  style={{ width: `${Math.min(100, val.charPercentUsed)}%` }}
                />
              </div>

              {/* Detailed Issues & Rule List */}
              {val.issues.length > 0 && (
                <div className="row-issues-list">
                  {val.issues.map((issue, idx) => (
                    <div key={idx} className={`issue-item issue-${issue.type}`}>
                      <div className="issue-icon">
                        {issue.type === 'error' && <XCircle size={14} />}
                        {issue.type === 'warning' && <AlertTriangle size={14} />}
                        {issue.type === 'info' && <Info size={14} />}
                      </div>

                      <div className="issue-content">
                        <strong>{issue.title}:</strong> {issue.message}
                      </div>

                      {/* Quick Auto-Fix Action for Char Limit */}
                      {issue.code === 'CHAR_LIMIT_EXCEEDED' && (
                        <button 
                          className="btn-autofix"
                          onClick={() => handleAutoFixCharLimit(pId, val.maxLimit)}
                          title="Auto-truncate text to fit limit"
                        >
                          <Scissors size={12} />
                          <span>Fix with AI</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
