import React from 'react';
import { PLATFORMS } from '../data/platforms';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Crown 
} from 'lucide-react';
import { 
  TwitterIcon, 
  InstagramIcon, 
  LinkedinIcon, 
  FacebookIcon, 
  ThreadsIcon, 
  BlueskyIcon 
} from './BrandIcons';

const ICON_MAP = {
  Twitter: TwitterIcon,
  Instagram: InstagramIcon,
  Linkedin: LinkedinIcon,
  Facebook: FacebookIcon,
  AtSign: ThreadsIcon,
  Cloud: BlueskyIcon,
};

export default function PlatformSelector({
  selectedPlatforms,
  onTogglePlatform,
  onSelectAll,
  onDeselectAll,
  validationResults,
  isPremiumTwitter,
  setIsPremiumTwitter,
}) {
  return (
    <div className="platform-selector-container card glass">
      <div className="selector-header">
        <div className="title-group">
          <h3>Target Platforms</h3>
          <span className="platform-count-badge">
            {selectedPlatforms.length} / {Object.keys(PLATFORMS).length} Selected
          </span>
        </div>
        <div className="selector-actions">
          <button className="btn-text-sm" onClick={onSelectAll}>Select All</button>
          <span className="divider">|</span>
          <button className="btn-text-sm" onClick={onDeselectAll}>Clear</button>
        </div>
      </div>

      <div className="platform-pills-grid">
        {Object.values(PLATFORMS).map((platform) => {
          const isSelected = selectedPlatforms.includes(platform.id);
          const validation = validationResults[platform.id];
          const IconComponent = ICON_MAP[platform.icon] || ThreadsIcon;

          return (
            <div
              key={platform.id}
              className={`platform-pill ${isSelected ? 'active' : ''} ${validation ? `status-${validation.overallStatus}` : ''}`}
              style={{
                '--brand-color': platform.brandColor,
                '--brand-gradient': platform.gradient,
              }}
              onClick={() => onTogglePlatform(platform.id)}
            >
              <div className="pill-content">
                <div className="pill-icon-wrapper">
                  <IconComponent size={18} />
                </div>
                <span className="pill-label">{platform.name}</span>

                {isSelected && validation && (
                  <div className="pill-validation-badge" title={validation.overallStatus}>
                    {validation.overallStatus === 'error' && <XCircle size={14} className="badge-error" />}
                    {validation.overallStatus === 'warning' && <AlertTriangle size={14} className="badge-warning" />}
                    {validation.overallStatus === 'valid' && <CheckCircle2 size={14} className="badge-pass" />}
                  </div>
                )}
              </div>

              {isSelected && validation && (
                <div className="pill-char-meter">
                  <div 
                    className={`meter-bar ${validation.charPercentUsed > 100 ? 'over-limit' : ''}`}
                    style={{ width: `${Math.min(100, validation.charPercentUsed)}%` }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Twitter Premium Toggle Option */}
      {selectedPlatforms.includes('twitter') && (
        <div className="premium-toggle-banner">
          <div className="banner-left">
            <Crown size={16} className="crown-icon" />
            <span>X (Twitter) Premium Account</span>
            <span className="sub-text">(Unlocks 25,000 character limit)</span>
          </div>
          <label className="switch-toggle">
            <input 
              type="checkbox" 
              checked={isPremiumTwitter}
              onChange={(e) => setIsPremiumTwitter(e.target.checked)}
            />
            <span className="slider round"></span>
          </label>
        </div>
      )}
    </div>
  );
}
