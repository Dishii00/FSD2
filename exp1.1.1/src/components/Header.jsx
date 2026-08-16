import React from 'react';
import { 
  Sparkles, 
  FolderOpen, 
  Save, 
  Calendar, 
  Send, 
  Moon, 
  Sun, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  Wand2
} from 'lucide-react';

export default function Header({
  darkMode,
  setDarkMode,
  onOpenTemplates,
  onOpenDrafts,
  onSaveDraft,
  onOpenAiTools,
  onOpenSchedule,
  onPublish,
  validationSummary,
  selectedPlatformsCount
}) {
  const { canPublish, totalErrors, totalWarnings } = validationSummary;

  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="logo-icon-wrapper">
          <Sparkles className="logo-icon" />
        </div>
        <div className="brand-text">
          <h1>SocialPulse <span className="badge-beta">Composer</span></h1>
          <p>Multi-Platform Content Composer & Rule Engine</p>
        </div>
      </div>

      <div className="header-status">
        {selectedPlatformsCount === 0 ? (
          <div className="status-pill status-neutral">
            <span>Select platforms to begin</span>
          </div>
        ) : canPublish ? (
          <div className="status-pill status-success">
            <CheckCircle2 size={16} />
            <span>Ready to Publish ({selectedPlatformsCount} channels)</span>
          </div>
        ) : totalErrors > 0 ? (
          <div className="status-pill status-error">
            <XCircle size={16} />
            <span>{totalErrors} Constraint Violation{totalErrors > 1 ? 's' : ''}</span>
          </div>
        ) : (
          <div className="status-pill status-warning">
            <AlertTriangle size={16} />
            <span>{totalWarnings} Warning{totalWarnings > 1 ? 's' : ''}</span>
          </div>
        )}
      </div>

      <div className="header-actions">
        <button 
          className="btn btn-secondary btn-icon-text" 
          onClick={onOpenTemplates}
          title="Browse pre-built templates"
        >
          <FileText size={16} />
          <span>Templates</span>
        </button>

        <button 
          className="btn btn-secondary btn-icon-text" 
          onClick={onOpenDrafts}
          title="Load saved drafts"
        >
          <FolderOpen size={16} />
          <span>Drafts</span>
        </button>

        <button 
          className="btn btn-secondary btn-icon-text" 
          onClick={onSaveDraft}
          title="Save current post as draft"
        >
          <Save size={16} />
          <span>Save</span>
        </button>

        <button 
          className="btn btn-ai btn-icon-text" 
          onClick={onOpenAiTools}
          title="AI Assistant (Rewrite, Hashtags, Summarize)"
        >
          <Wand2 size={16} />
          <span>AI Assist</span>
        </button>

        <button 
          className="btn btn-secondary btn-icon-text" 
          onClick={onOpenSchedule}
          title="Schedule post for optimal times"
        >
          <Calendar size={16} />
          <span>Schedule</span>
        </button>

        <button 
          className={`btn btn-primary btn-publish ${!canPublish ? 'disabled' : ''}`}
          onClick={onPublish}
          disabled={!canPublish}
        >
          <Send size={16} />
          <span>Publish Now</span>
        </button>

        <button 
          className="btn-theme-toggle" 
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
