import React, { useState, useEffect } from 'react';
import { PLATFORMS } from '../data/platforms';
import { CheckCircle2, Loader2, Send, X, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PublishModal({
  isOpen,
  onClose,
  selectedPlatforms,
  onPublishComplete
}) {
  const [publishingProgress, setPublishingProgress] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (isOpen && selectedPlatforms.length > 0) {
      setIsFinished(false);
      const initialProgress = {};
      selectedPlatforms.forEach(id => {
        initialProgress[id] = 'pending'; // 'pending', 'publishing', 'success'
      });
      setPublishingProgress(initialProgress);

      // Simulate sequential API publishing to channels
      selectedPlatforms.forEach((id, index) => {
        setTimeout(() => {
          setPublishingProgress(prev => ({ ...prev, [id]: 'publishing' }));
        }, index * 800 + 400);

        setTimeout(() => {
          setPublishingProgress(prev => ({ ...prev, [id]: 'success' }));
          
          // Last one finished
          if (index === selectedPlatforms.length - 1) {
            setIsFinished(true);
            try {
              confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
              });
            } catch (e) {
              console.log('Confetti triggered');
            }
            onPublishComplete();
          }
        }, index * 800 + 1500);
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content glass animate-fade-in">
        <div className="modal-header">
          <div className="title-with-icon">
            <Send size={20} className="icon-send" />
            <h3>Publishing Content Across Channels</h3>
          </div>
          {isFinished && <button className="btn-close" onClick={onClose}><X size={18} /></button>}
        </div>

        <div className="publishing-list">
          {selectedPlatforms.map((pId) => {
            const plat = PLATFORMS[pId];
            const status = publishingProgress[pId] || 'pending';

            return (
              <div key={pId} className="publishing-channel-row glass">
                <div className="channel-meta">
                  <span className="brand-dot" style={{ backgroundColor: plat.brandColor }} />
                  <span className="channel-name">{plat.name}</span>
                </div>

                <div className="channel-status">
                  {status === 'pending' && <span className="status-text text-muted">Queued...</span>}
                  {status === 'publishing' && (
                    <span className="status-text text-active">
                      <Loader2 size={16} className="spin" /> Publishing...
                    </span>
                  )}
                  {status === 'success' && (
                    <span className="status-text text-success">
                      <CheckCircle2 size={16} /> Published Live
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {isFinished && (
          <div className="publish-success-banner glass animate-bounce-in">
            <h4>🎉 Post Successfully Published to All Channels!</h4>
            <p>Your multi-platform post has passed all constraint validations and is now live.</p>
            <button className="btn btn-primary mt-3" onClick={onClose}>
              Done & Start New Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
