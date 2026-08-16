const DRAFTS_KEY = 'post_composer_drafts_v1';
const HISTORY_KEY = 'post_composer_history_v1';

export function getSavedDrafts() {
  try {
    const data = localStorage.getItem(DRAFTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to load drafts', e);
    return [];
  }
}

export function saveDraft(draft) {
  try {
    const drafts = getSavedDrafts();
    const existingIndex = drafts.findIndex(d => d.id === draft.id);
    
    const draftItem = {
      ...draft,
      id: draft.id || `draft_${Date.now()}`,
      updatedAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      drafts[existingIndex] = draftItem;
    } else {
      drafts.unshift(draftItem);
    }

    localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
    return draftItem;
  } catch (e) {
    console.error('Failed to save draft', e);
    return null;
  }
}

export function deleteDraft(id) {
  try {
    const drafts = getSavedDrafts().filter(d => d.id !== id);
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
  } catch (e) {
    console.error('Failed to delete draft', e);
  }
}

export function getPublishHistory() {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function addPublishRecord(record) {
  try {
    const history = getPublishHistory();
    history.unshift({
      ...record,
      id: `pub_${Date.now()}`,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 20))); // Keep last 20
  } catch (e) {
    console.error('Failed to save publish record', e);
  }
}
