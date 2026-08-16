import React, { useState } from 'react';
import { 
  Sparkles, 
  Wand2, 
  Hash, 
  Scissors, 
  Check, 
  X,
  Volume2
} from 'lucide-react';
import { rewriteTone, shortenText, suggestHashtags } from '../utils/aiAssistant';

export default function AiToolsModal({
  isOpen,
  onClose,
  text,
  setText,
  selectedPlatforms,
  platformOverrides,
  setPlatformOverrides,
  activeTab,
}) {
  const [selectedTone, setSelectedTone] = useState('professional');
  const [generatedHashtags, setGeneratedHashtags] = useState([]);
  const [activeTabSub, setActiveTabSub] = useState('rewrite'); // 'rewrite', 'hashtags', 'summarize'

  if (!isOpen) return null;

  const currentText = activeTab === 'all' 
    ? text 
    : (platformOverrides[activeTab] !== undefined ? platformOverrides[activeTab] : text);

  const handleApplyTone = (tone) => {
    const rewritten = rewriteTone(currentText, tone);
    if (activeTab === 'all') {
      setText(rewritten);
    } else {
      setPlatformOverrides({
        ...platformOverrides,
        [activeTab]: rewritten,
      });
    }
  };

  const handleGenerateHashtags = () => {
    const tags = suggestHashtags(currentText);
    setGeneratedHashtags(tags);
  };

  const handleAppendHashtags = (tagsToAdd) => {
    const tagString = '\n\n' + tagsToAdd.join(' ');
    if (activeTab === 'all') {
      setText(prev => prev + tagString);
    } else {
      setPlatformOverrides({
        ...platformOverrides,
        [activeTab]: (currentText || '') + tagString,
      });
    }
  };

  const handleSummarizeToFit = (maxChars) => {
    const shortened = shortenText(currentText, maxChars);
    if (activeTab === 'all') {
      setText(shortened);
    } else {
      setPlatformOverrides({
        ...platformOverrides,
        [activeTab]: shortened,
      });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-lg glass animate-fade-in">
        <div className="modal-header">
          <div className="title-with-icon">
            <Sparkles className="icon-ai" size={20} />
            <h3>AI Post Assistant</h3>
          </div>
          <button className="btn-close" onClick={onClose}><X size={18} /></button>
        </div>

        {/* Modal Sub-Tabs */}
        <div className="modal-tabs">
          <button 
            className={`modal-tab-btn ${activeTabSub === 'rewrite' ? 'active' : ''}`}
            onClick={() => setActiveTabSub('rewrite')}
          >
            <Wand2 size={16} />
            <span>Tone Adjuster</span>
          </button>
          <button 
            className={`modal-tab-btn ${activeTabSub === 'hashtags' ? 'active' : ''}`}
            onClick={() => {
              setActiveTabSub('hashtags');
              handleGenerateHashtags();
            }}
          >
            <Hash size={16} />
            <span>Hashtag Generator</span>
          </button>
          <button 
            className={`modal-tab-btn ${activeTabSub === 'summarize' ? 'active' : ''}`}
            onClick={() => setActiveTabSub('summarize')}
          >
            <Scissors size={16} />
            <span>Length Shortener</span>
          </button>
        </div>

        {/* Tab 1: Tone Adjuster */}
        {activeTabSub === 'rewrite' && (
          <div className="modal-body-section">
            <p className="section-desc">Select a tone to automatically rewrite and optimize your post style:</p>
            <div className="tone-grid">
              {[
                { id: 'professional', label: '💼 Professional', desc: 'Refined, authoritative corporate tone' },
                { id: 'casual', label: '💬 Casual & Friendly', desc: 'Approachable, conversational social tone' },
                { id: 'hype', label: '🔥 High-Energy Hype', desc: 'Exciting product announcement with emojis' },
                { id: 'concise', label: '⚡ Ultra-Concise', desc: 'Direct, bulleted summary' },
              ].map((tone) => (
                <div 
                  key={tone.id} 
                  className={`tone-card glass ${selectedTone === tone.id ? 'active' : ''}`}
                  onClick={() => setSelectedTone(tone.id)}
                >
                  <h4>{tone.label}</h4>
                  <p>{tone.desc}</p>
                  <button 
                    className="btn btn-secondary btn-sm mt-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApplyTone(tone.id);
                    }}
                  >
                    Apply Tone
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Hashtag Generator */}
        {activeTabSub === 'hashtags' && (
          <div className="modal-body-section">
            <p className="section-desc">Smart AI-extracted hashtags based on your current draft content:</p>
            <div className="hashtags-result-box glass">
              <div className="tags-cloud">
                {generatedHashtags.map((tag) => (
                  <span key={tag} className="tag-chip">{tag}</span>
                ))}
              </div>
              <button 
                className="btn btn-primary btn-sm mt-3"
                onClick={() => handleAppendHashtags(generatedHashtags)}
              >
                Append All Hashtags to Draft
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Length Shortener */}
        {activeTabSub === 'summarize' && (
          <div className="modal-body-section">
            <p className="section-desc">Instantly compress text to fit strict platform character limits:</p>
            <div className="shorten-options">
              <div className="shorten-card glass">
                <h4>Shorten for X (Twitter)</h4>
                <p>Compress content to fit within 280 characters.</p>
                <button className="btn btn-secondary btn-sm" onClick={() => handleSummarizeToFit(280)}>
                  Shorten to 280 Chars
                </button>
              </div>
              <div className="shorten-card glass">
                <h4>Shorten for Bluesky / Threads</h4>
                <p>Compress content to fit within 300 - 500 characters.</p>
                <button className="btn btn-secondary btn-sm" onClick={() => handleSummarizeToFit(300)}>
                  Shorten to 300 Chars
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
