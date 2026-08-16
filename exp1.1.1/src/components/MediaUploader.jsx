import React, { useState } from 'react';
import { SAMPLE_MEDIA } from '../data/sampleMedia';
import { 
  Image as ImageIcon, 
  Upload, 
  Trash2, 
  FileText, 
  Sparkles, 
  AlertCircle,
  Plus
} from 'lucide-react';

export default function MediaUploader({
  mediaList,
  setMediaList,
  selectedPlatforms,
  validationResults
}) {
  const [editingAltId, setEditingAltId] = useState(null);
  const [altTextInput, setAltTextInput] = useState('');
  const [showStockPicker, setShowStockPicker] = useState(false);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newMediaItems = files.map((file, idx) => {
      const url = URL.createObjectURL(file);
      const isVideo = file.type.startsWith('video');
      return {
        id: `file_${Date.now()}_${idx}`,
        name: file.name,
        url,
        type: isVideo ? 'video' : 'image',
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        aspectRatio: '1:1',
        alt: file.name.replace(/\.[^/.]+$/, ""),
      };
    });

    setMediaList([...mediaList, ...newMediaItems]);
  };

  const handleAddStockMedia = (stockItem) => {
    if (mediaList.some(m => m.id === stockItem.id)) return;
    setMediaList([...mediaList, stockItem]);
  };

  const handleRemoveMedia = (id) => {
    setMediaList(mediaList.filter(m => m.id !== id));
  };

  const handleSaveAltText = (id) => {
    setMediaList(mediaList.map(m => m.id === id ? { ...m, alt: altTextInput } : m));
    setEditingAltId(null);
  };

  return (
    <div className="media-uploader-container card glass">
      <div className="card-header-sm">
        <div className="title-with-badge">
          <ImageIcon size={18} />
          <h3>Media Attachments</h3>
          <span className="count-pill">{mediaList.length} items</span>
        </div>
        
        <button 
          className="btn-text-sm"
          onClick={() => setShowStockPicker(!showStockPicker)}
        >
          <Sparkles size={14} />
          <span>{showStockPicker ? 'Hide Stock Picker' : 'Sample Library'}</span>
        </button>
      </div>

      {/* Stock Library Picker */}
      {showStockPicker && (
        <div className="stock-picker-tray glass">
          <div className="tray-title">Select Sample Stock Images:</div>
          <div className="stock-grid">
            {SAMPLE_MEDIA.map((item) => {
              const isAdded = mediaList.some(m => m.id === item.id);
              return (
                <div 
                  key={item.id} 
                  className={`stock-item ${isAdded ? 'added' : ''}`}
                  onClick={() => handleAddStockMedia(item)}
                >
                  <img src={item.url} alt={item.alt} />
                  <span className="stock-ratio-badge">{item.aspectRatio}</span>
                  {isAdded && <div className="added-overlay">Attached</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Drop Zone & Grid */}
      <div className="media-dropzone-wrapper">
        <label className="upload-dropzone">
          <input 
            type="file" 
            multiple 
            accept="image/*,video/*"
            onChange={handleFileUpload} 
            className="hidden-file-input"
          />
          <div className="dropzone-content">
            <Upload size={24} className="upload-icon" />
            <p className="primary-text">Drag & drop photos/videos, or <span>Browse</span></p>
            <p className="sub-text">Supports JPG, PNG, MP4, WebM (Max 10 items)</p>
          </div>
        </label>

        {/* Attached Thumbnails Grid */}
        {mediaList.length > 0 && (
          <div className="attached-media-grid">
            {mediaList.map((item, index) => (
              <div key={item.id} className="media-thumb-card glass">
                <div className="thumb-preview">
                  {item.type === 'video' ? (
                    <video src={item.url} className="media-element" />
                  ) : (
                    <img src={item.url} alt={item.alt} className="media-element" />
                  )}
                  <span className="index-tag">#{index + 1}</span>
                  <span className="ratio-tag">{item.aspectRatio}</span>
                </div>

                <div className="thumb-info">
                  <span className="thumb-name" title={item.name}>{item.name}</span>
                  <span className="thumb-alt-text">
                    ALT: {item.alt || 'No ALT text added'}
                  </span>
                </div>

                <div className="thumb-actions">
                  <button 
                    className="btn-icon-sm"
                    onClick={() => {
                      setEditingAltId(item.id);
                      setAltTextInput(item.alt || '');
                    }}
                    title="Edit Alt Text for Accessibility"
                  >
                    <FileText size={14} />
                  </button>

                  <button 
                    className="btn-icon-sm btn-danger"
                    onClick={() => handleRemoveMedia(item.id)}
                    title="Remove attachment"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Alt Text Modal */}
      {editingAltId && (
        <div className="modal-overlay">
          <div className="modal-content glass">
            <h3>Image Alt Text (Accessibility)</h3>
            <p className="modal-subtext">Provide a concise description of this image for screen readers and search engines.</p>
            <textarea
              className="form-textarea"
              rows={3}
              value={altTextInput}
              onChange={(e) => setAltTextInput(e.target.value)}
              placeholder="Describe what is visible in the image..."
            />
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setEditingAltId(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => handleSaveAltText(editingAltId)}>Save Alt Text</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
