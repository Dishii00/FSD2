import React, { useState } from 'react';
import { PLATFORMS } from '../data/platforms';
import { 
  Smile, 
  Hash, 
  Link, 
  Trash2, 
  Copy, 
  BookOpen, 
  Check, 
  Sparkles,
  Layers,
  Edit3
} from 'lucide-react';
import { calculateReadability } from '../utils/aiAssistant';

const QUICK_EMOJIS = ['🚀', '✨', '💡', '🔥', '🎉', '📢', '👏', '👇', '🎯', '💯', '📈', '🤝'];

export default function PostEditor({
  text,
  setText,
  selectedPlatforms,
  platformOverrides,
  setPlatformOverrides,
  activeTab,
  setActiveTab,
  validationResults,
  isPremiumTwitter,
  onOpenAiTools,
}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Active platform text to display/edit
  const isSyncMode = activeTab === 'all';
  const currentText = isSyncMode 
    ? text 
    : (platformOverrides[activeTab] !== undefined ? platformOverrides[activeTab] : text);

  const handleTextChange = (e) => {
    const val = e.target.value;
    if (isSyncMode) {
      setText(val);
    } else {
      setPlatformOverrides({
        ...platformOverrides,
        [activeTab]: val,
      });
    }
  };

  const handleInsertEmoji = (emoji) => {
    if (isSyncMode) {
      setText(prev => prev + emoji);
    } else {
      setPlatformOverrides({
        ...platformOverrides,
        [activeTab]: (currentText || '') + emoji,
      });
    }
  };

  const handleClearText = () => {
    if (isSyncMode) {
      setText('');
      setPlatformOverrides({});
    } else {
      setPlatformOverrides({
        ...platformOverrides,
        [activeTab]: '',
      });
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(currentText);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  // Readability calculation
  const readability = calculateReadability(currentText);

  return (
    <div className="post-editor-container card glass">
      {/* Editor Mode Header & Tabs */}
      <div className="editor-tab-bar">
        <button
          className={`tab-item ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          <Layers size={16} />
          <span>All Platforms (Synced)</span>
        </button>

        {selectedPlatforms.map(pId => {
          const plat = PLATFORMS[pId];
          const hasOverride = platformOverrides[pId] !== undefined && platformOverrides[pId] !== text;
          const platVal = validationResults[pId];

          return (
            <button
              key={pId}
              className={`tab-item ${activeTab === pId ? 'active' : ''}`}
              onClick={() => setActiveTab(pId)}
            >
              <span className="tab-brand-dot" style={{ backgroundColor: plat.brandColor }} />
              <span>{plat.shortName}</span>
              {hasOverride && <Edit3 size={12} className="override-indicator" title="Customized text" />}
              {platVal && (
                <span className={`tab-status-dot dot-${platVal.overallStatus}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Override Notice Banner */}
      {!isSyncMode && (
        <div className="override-notice-banner">
          <span>Editing custom copy for <strong>{PLATFORMS[activeTab]?.name}</strong>.</span>
          <button 
            className="btn-text-sm"
            onClick={() => {
              const newOverrides = { ...platformOverrides };
              delete newOverrides[activeTab];
              setPlatformOverrides(newOverrides);
            }}
          >
            Reset to Synced Copy
          </button>
        </div>
      )}

      {/* Primary Text Area */}
      <div className="textarea-wrapper">
        <textarea
          className="composer-textarea"
          value={currentText}
          onChange={handleTextChange}
          placeholder={
            isSyncMode 
              ? "What's on your mind? Compose your post here..." 
              : `Customize your caption specifically for ${PLATFORMS[activeTab]?.name}...`
          }
          rows={7}
        />

        {/* Dynamic Circular Character Meters */}
        <div className="circular-meters-bar">
          {selectedPlatforms.map(pId => {
            const val = validationResults[pId];
            if (!val) return null;
            const plat = PLATFORMS[pId];

            const strokeDash = 100;
            const strokeOffset = strokeDash - (strokeDash * Math.min(100, val.charPercentUsed)) / 100;
            const isError = val.overallStatus === 'error';
            const isWarning = val.overallStatus === 'warning';

            return (
              <div 
                key={pId} 
                className={`circular-meter-item ${isError ? 'meter-error' : isWarning ? 'meter-warning' : ''}`}
                title={`${plat.name}: ${val.weightedLength} / ${val.maxLimit} chars (${val.charsRemaining} remaining)`}
              >
                <svg className="meter-ring" viewBox="0 0 36 36">
                  <path
                    className="ring-bg"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="ring-fill"
                    strokeDasharray="100, 100"
                    strokeDashoffset={strokeOffset}
                    stroke={isError ? '#ef4444' : isWarning ? '#f59e0b' : plat.brandColor}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="meter-label">{plat.shortName}</span>
                <span className="meter-count">{val.charsRemaining}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Editor Toolbar & Utility Controls */}
      <div className="editor-toolbar">
        <div className="toolbar-left">
          <div className="emoji-dropdown-wrapper">
            <button 
              className="toolbar-btn" 
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              title="Add Emoji"
            >
              <Smile size={18} />
              <span>Emoji</span>
            </button>

            {showEmojiPicker && (
              <div className="emoji-quick-picker glass">
                <div className="emoji-grid">
                  {QUICK_EMOJIS.map(emoji => (
                    <button
                      key={emoji}
                      className="emoji-btn"
                      onClick={() => {
                        handleInsertEmoji(emoji);
                        setShowEmojiPicker(false);
                      }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button 
            className="toolbar-btn"
            onClick={onOpenAiTools}
            title="Auto-generate Hashtags"
          >
            <Hash size={18} />
            <span>Hashtags</span>
          </button>

          <button 
            className="toolbar-btn"
            onClick={onOpenAiTools}
            title="AI Content Assist"
          >
            <Sparkles size={18} />
            <span>AI Polish</span>
          </button>
        </div>

        <div className="toolbar-right">
          <button 
            className="toolbar-btn" 
            onClick={handleCopyText} 
            title="Copy post text to clipboard"
          >
            {copiedNotification ? <Check size={16} className="text-success" /> : <Copy size={16} />}
            <span>{copiedNotification ? 'Copied!' : 'Copy'}</span>
          </button>

          <button 
            className="toolbar-btn btn-danger-text" 
            onClick={handleClearText}
            title="Clear composer"
          >
            <Trash2 size={16} />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Live Readability & Metrics Bar */}
      <div className="metrics-bar">
        <div className="metric-chip" title="Flesch Reading Ease Score">
          <BookOpen size={14} />
          <span>Readability: <strong>{readability.score}/100 ({readability.label})</strong></span>
        </div>
        <div className="metric-chip">
          <span>Words: <strong>{readability.words}</strong></span>
        </div>
        <div className="metric-chip">
          <span>Sentences: <strong>{readability.sentences}</strong></span>
        </div>
      </div>
    </div>
  );
}
