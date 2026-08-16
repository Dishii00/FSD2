import React, { useState } from 'react';
import { PLATFORMS } from '../data/platforms';
import { 
  Heart, 
  MessageCircle, 
  Repeat, 
  Share, 
  Bookmark, 
  MoreHorizontal, 
  CheckCircle, 
  ThumbsUp, 
  Send,
  Eye,
  Globe,
  Grid,
  Maximize2
} from 'lucide-react';

export default function LivePreview({
  selectedPlatforms,
  text,
  platformOverrides,
  mediaList,
  validationResults,
}) {
  const [activePreviewPlatform, setActivePreviewPlatform] = useState(
    selectedPlatforms[0] || 'twitter'
  );
  const [viewMode, setViewMode] = useState('single'); // 'single' or 'grid'
  const [expandedFolds, setExpandedFolds] = useState({});

  if (selectedPlatforms.length === 0) {
    return (
      <div className="preview-container card glass empty-state">
        <Eye size={32} className="text-muted" />
        <h4>Live Feed Preview</h4>
        <p>Select platforms above to see pixel-perfect feed mockups.</p>
      </div>
    );
  }

  const currentPlatformId = selectedPlatforms.includes(activePreviewPlatform) 
    ? activePreviewPlatform 
    : selectedPlatforms[0];

  const toggleFold = (platId) => {
    setExpandedFolds(prev => ({ ...prev, [platId]: !prev[platId] }));
  };

  const renderTextWithHighlights = (content) => {
    if (!content) return <span className="text-placeholder">Your post copy will appear here in real-time...</span>;

    // Split text into tokens to highlight hashtags & URLs
    const parts = content.split(/(\s+)/);
    return parts.map((part, idx) => {
      if (part.startsWith('#')) {
        return <span key={idx} className="preview-hashtag">{part}</span>;
      }
      if (part.startsWith('http://') || part.startsWith('https://')) {
        return <span key={idx} className="preview-link">{part}</span>;
      }
      if (part.startsWith('@')) {
        return <span key={idx} className="preview-mention">{part}</span>;
      }
      return part;
    });
  };

  const renderPlatformCard = (platformId) => {
    const plat = PLATFORMS[platformId];
    if (!plat) return null;

    const content = platformOverrides[platformId] !== undefined 
      ? platformOverrides[platformId] 
      : text;

    const isFolded = plat.foldCutoff && content.length > plat.foldCutoff && !expandedFolds[platformId];
    const displayText = isFolded ? content.substring(0, plat.foldCutoff) : content;

    return (
      <div key={platformId} className={`social-card-mockup mockup-${platformId}`}>
        {/* Mockup Header */}
        <div className="mockup-header">
          <div className="user-profile">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
              alt="Profile" 
              aria-label="Profile Avatar"
              className="user-avatar"
            />
            <div className="user-details">
              <div className="user-name-row">
                <span className="user-name">Alex Rivera</span>
                <CheckCircle size={14} className="verified-badge" />
                {platformId === 'twitter' && <span className="user-handle">@alexrivera_tech</span>}
                {platformId === 'bluesky' && <span className="user-handle">@alex.bsky.social</span>}
              </div>
              <div className="post-meta-sub">
                {platformId === 'linkedin' && <span className="user-bio">Product Strategist & Tech Lead • 2h</span>}
                {platformId === 'facebook' && <span className="user-bio">2 hrs • <Globe size={11} /></span>}
                {(platformId === 'twitter' || platformId === 'threads' || platformId === 'instagram') && <span className="post-time">2h</span>}
              </div>
            </div>
          </div>
          <button className="mockup-more-btn"><MoreHorizontal size={16} /></button>
        </div>

        {/* Mockup Post Text Content */}
        <div className="mockup-content">
          <div className="post-body-text">
            {renderTextWithHighlights(displayText)}
            {isFolded && (
              <span className="see-more-btn" onClick={() => toggleFold(platformId)}>
                ...see more
              </span>
            )}
          </div>
        </div>

        {/* Mockup Media Display */}
        {mediaList.length > 0 && (
          <div className={`mockup-media-container media-count-${Math.min(4, mediaList.length)}`}>
            {mediaList.slice(0, 4).map((media, idx) => (
              <div key={media.id} className="media-item-box">
                {media.type === 'video' ? (
                  <video src={media.url} controls className="mockup-img" />
                ) : (
                  <img src={media.url} alt={media.alt || 'Post media'} className="mockup-img" />
                )}
                {idx === 3 && mediaList.length > 4 && (
                  <div className="media-more-overlay">+{mediaList.length - 4}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Mockup Engagement Footer */}
        <div className="mockup-footer">
          {platformId === 'twitter' && (
            <div className="twitter-actions">
              <span><MessageCircle size={16} /> 12</span>
              <span><Repeat size={16} /> 4</span>
              <span><Heart size={16} /> 48</span>
              <span><Share size={16} /></span>
            </div>
          )}

          {platformId === 'instagram' && (
            <div className="instagram-actions">
              <div className="action-row">
                <div className="left-icons">
                  <Heart size={20} />
                  <MessageCircle size={20} />
                  <Send size={20} />
                </div>
                <Bookmark size={20} />
              </div>
              <div className="likes-count">Liked by <strong>dev_community</strong> and <strong>142 others</strong></div>
            </div>
          )}

          {platformId === 'linkedin' && (
            <div className="linkedin-actions">
              <div className="reaction-summary">👍 💡 ❤️ 84 comments</div>
              <div className="action-buttons-row">
                <button><ThumbsUp size={16} /> Like</button>
                <button><MessageCircle size={16} /> Comment</button>
                <button><Repeat size={16} /> Repost</button>
                <button><Send size={16} /> Send</button>
              </div>
            </div>
          )}

          {platformId === 'facebook' && (
            <div className="facebook-actions">
              <div className="fb-stats">👍❤️ 32 comments • 5 shares</div>
              <div className="action-buttons-row">
                <button><ThumbsUp size={16} /> Like</button>
                <button><MessageCircle size={16} /> Comment</button>
                <button><Share size={16} /> Share</button>
              </div>
            </div>
          )}

          {platformId === 'threads' && (
            <div className="threads-actions">
              <Heart size={18} />
              <MessageCircle size={18} />
              <Repeat size={18} />
              <Send size={18} />
            </div>
          )}

          {platformId === 'bluesky' && (
            <div className="bluesky-actions">
              <span><MessageCircle size={16} /> 8</span>
              <span><Repeat size={16} /> 3</span>
              <span><Heart size={16} /> 29</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="live-preview-section card glass">
      <div className="preview-header">
        <div className="title-group">
          <Eye size={18} />
          <h3>Live Feed Preview</h3>
        </div>

        <div className="preview-controls">
          <div className="view-toggle-btns">
            <button 
              className={`btn-icon-toggle ${viewMode === 'single' ? 'active' : ''}`}
              onClick={() => setViewMode('single')}
              title="Single Card View"
            >
              <Maximize2 size={15} />
            </button>
            <button 
              className={`btn-icon-toggle ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Side-by-Side Comparison Grid"
            >
              <Grid size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Platform Selector Tabs for Single View Mode */}
      {viewMode === 'single' && (
        <div className="preview-platform-tabs">
          {selectedPlatforms.map(pId => {
            const plat = PLATFORMS[pId];
            return (
              <button
                key={pId}
                className={`preview-tab ${currentPlatformId === pId ? 'active' : ''}`}
                onClick={() => setActivePreviewPlatform(pId)}
                style={{
                  '--brand-color': plat.brandColor,
                }}
              >
                <span>{plat.name}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Preview Display Body */}
      <div className={`preview-display-body mode-${viewMode}`}>
        {viewMode === 'single' ? (
          renderPlatformCard(currentPlatformId)
        ) : (
          <div className="preview-grid-container">
            {selectedPlatforms.map(pId => renderPlatformCard(pId))}
          </div>
        )}
      </div>
    </div>
  );
}
