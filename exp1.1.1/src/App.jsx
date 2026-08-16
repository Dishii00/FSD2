import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import PlatformSelector from './components/PlatformSelector';
import PostEditor from './components/PostEditor';
import MediaUploader from './components/MediaUploader';
import ValidationPanel from './components/ValidationPanel';
import LivePreview from './components/LivePreview';
import AiToolsModal from './components/AiToolsModal';
import TemplateModal from './components/TemplateModal';
import ScheduleModal from './components/ScheduleModal';
import PublishModal from './components/PublishModal';

import { PLATFORMS } from './data/platforms';
import { SAMPLE_MEDIA } from './data/sampleMedia';
import { validateAllPlatforms } from './utils/validator';
import { saveDraft, getSavedDrafts, addPublishRecord } from './utils/storage';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedPlatforms, setSelectedPlatforms] = useState(['twitter', 'linkedin', 'instagram']);
  const [isPremiumTwitter, setIsPremiumTwitter] = useState(false);
  
  // Post content state
  const [text, setText] = useState(
    `🚀 Exciting News! We're thrilled to unveil our new Multi-Platform Post Composer 2.0! 🎉\n\nCraft once, validate constraints in real-time, and preview feed mockups instantly across X, Instagram, and LinkedIn. ⚡\n\nCheck out the demo now! 👇\nhttps://example.com/demo\n\n#SaaS #SocialMedia #WebDev #ReactJS`
  );
  const [platformOverrides, setPlatformOverrides] = useState({});
  const [mediaList, setMediaList] = useState([SAMPLE_MEDIA[0]]);
  const [activeTab, setActiveTab] = useState('all'); // 'all' or platformId

  // Modal states
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  // Draft notification toast
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Real-time validation computation
  const validationSummary = useMemo(() => {
    return validateAllPlatforms({
      text,
      selectedPlatforms,
      platformOverrides,
      media: mediaList,
      isPremiumTwitter,
    });
  }, [text, selectedPlatforms, platformOverrides, mediaList, isPremiumTwitter]);

  // Dark Mode class toggle
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Handlers for platform selector
  const handleTogglePlatform = (id) => {
    if (selectedPlatforms.includes(id)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== id));
    } else {
      setSelectedPlatforms([...selectedPlatforms, id]);
    }
  };

  const handleSelectAllPlatforms = () => {
    setSelectedPlatforms(Object.keys(PLATFORMS));
  };

  const handleDeselectAllPlatforms = () => {
    setSelectedPlatforms([]);
  };

  // Draft operations
  const handleSaveDraft = () => {
    const result = saveDraft({
      text,
      selectedPlatforms,
      platformOverrides,
      mediaList,
      isPremiumTwitter,
    });
    if (result) {
      showToast('Draft saved successfully to Local Storage!');
    }
  };

  const handleSelectTemplate = (tmpl) => {
    setText(tmpl.text);
    if (tmpl.recommendedPlatforms) {
      setSelectedPlatforms(tmpl.recommendedPlatforms);
    }
    showToast(`Loaded template: ${tmpl.title}`);
  };

  const handleConfirmSchedule = (scheduleData) => {
    showToast(`Post scheduled for ${scheduleData.date} at ${scheduleData.time}`);
  };

  const handlePublishComplete = () => {
    addPublishRecord({
      text,
      selectedPlatforms,
      mediaCount: mediaList.length,
    });
  };

  return (
    <div className={`app-root ${darkMode ? 'theme-dark' : 'theme-light'}`}>
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenTemplates={() => setIsTemplateModalOpen(true)}
        onOpenDrafts={() => {
          const drafts = getSavedDrafts();
          if (drafts.length > 0) {
            const latest = drafts[0];
            setText(latest.text || '');
            if (latest.selectedPlatforms) setSelectedPlatforms(latest.selectedPlatforms);
            if (latest.platformOverrides) setPlatformOverrides(latest.platformOverrides);
            showToast('Loaded latest draft!');
          } else {
            showToast('No saved drafts found.');
          }
        }}
        onSaveDraft={handleSaveDraft}
        onOpenAiTools={() => setIsAiModalOpen(true)}
        onOpenSchedule={() => setIsScheduleModalOpen(true)}
        onPublish={() => setIsPublishModalOpen(true)}
        validationSummary={validationSummary}
        selectedPlatformsCount={selectedPlatforms.length}
      />

      <main className="main-content-layout">
        {/* Toast Notification Banner */}
        {toastMessage && (
          <div className="toast-notification glass animate-fade-in">
            <span>{toastMessage}</span>
          </div>
        )}

        <div className="dashboard-layout">
          <section className="top-section">
            <PlatformSelector
            selectedPlatforms={selectedPlatforms}
            onTogglePlatform={handleTogglePlatform}
            onSelectAll={handleSelectAllPlatforms}
            onDeselectAll={handleDeselectAllPlatforms}
            validationResults={validationSummary.platformResults}
            isPremiumTwitter={isPremiumTwitter}
            setIsPremiumTwitter={setIsPremiumTwitter}
           />
          </section>

          <section className="editor-section">
           <PostEditor
            text={text}
            setText={setText}
            selectedPlatforms={selectedPlatforms}
            platformOverrides={platformOverrides}
            setPlatformOverrides={setPlatformOverrides}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            validationResults={validationSummary.platformResults}
            isPremiumTwitter={isPremiumTwitter}
            onOpenAiTools={() => setIsAiModalOpen(true)}
           />
          </section>

        <div className="bottom-grid">
        <div>
        <MediaUploader
         mediaList={mediaList}
         setMediaList={setMediaList}
         selectedPlatforms={selectedPlatforms}
         validationResults={validationSummary.platformResults}
        />

        <ValidationPanel
          selectedPlatforms={selectedPlatforms}
          validationResults={validationSummary.platformResults}
          text={text}
          setText={setText}
          platformOverrides={platformOverrides}
          setPlatformOverrides={setPlatformOverrides}
          activeTab={activeTab}
        />
      </div>

      <div>
        <LivePreview
         selectedPlatforms={selectedPlatforms}
         text={text}
         platformOverrides={platformOverrides}
         mediaList={mediaList}
         validationResults={validationSummary.platformResults}
        />
      </div>
    </div>
  
  </div>
      </main>

      {/* Interactive Modals */}
      <AiToolsModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        text={text}
        setText={setText}
        selectedPlatforms={selectedPlatforms}
        platformOverrides={platformOverrides}
        setPlatformOverrides={setPlatformOverrides}
        activeTab={activeTab}
      />

      <TemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        onSelectTemplate={handleSelectTemplate}
      />

      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        selectedPlatforms={selectedPlatforms}
        onConfirmSchedule={handleConfirmSchedule}
      />

      <PublishModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        selectedPlatforms={selectedPlatforms}
        onPublishComplete={handlePublishComplete}
      />
    </div>
  );
}
