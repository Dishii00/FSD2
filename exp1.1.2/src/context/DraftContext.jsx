import React, { createContext, useContext, useReducer, useEffect, useState, useCallback } from 'react';
import { mockApi, getApiConfig, updateApiConfig } from '../services/mockApi';

const DraftContext = createContext(null);

// Initial State
const initialState = {
  drafts: [],
  loading: true,
  error: null,
  activeDraft: null, // null = closed, {} = new, draftObj = edit
  isEditorOpen: false,
  saving: false,
  autoSaveStatus: 'idle', // 'idle' | 'modified' | 'saving' | 'saved'
  
  // Filters & Search
  searchQuery: '',
  categoryFilter: 'All',
  statusFilter: 'all', // 'all' | 'draft' | 'archived' | 'published'
  sortBy: 'updatedAt', // 'updatedAt' | 'title' | 'wordCount'
  viewMode: 'grid', // 'grid' | 'list' | 'compact'

  // Modals & Tools
  isMockSettingsOpen: false,
  apiConfig: getApiConfig(),
  confirmModal: null, // { title, message, onConfirm, type }
  toasts: [],
  theme: localStorage.getItem('exp1_1_2_theme') || 'dark',
};

// Reducer
function draftReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, drafts: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };

    case 'OPEN_EDITOR':
      return { 
        ...state, 
        isEditorOpen: true, 
        activeDraft: action.payload || {
          title: '',
          content: '',
          category: 'Engineering',
          tags: [],
          status: 'draft',
          platforms: ['Blog'],
          coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
        },
        autoSaveStatus: 'idle'
      };

    case 'CLOSE_EDITOR':
      return { ...state, isEditorOpen: false, activeDraft: null, autoSaveStatus: 'idle' };

    case 'SET_AUTO_SAVE_STATUS':
      return { ...state, autoSaveStatus: action.payload };

    case 'SAVE_START':
      return { ...state, saving: true };
    case 'SAVE_SUCCESS':
      const existingIdx = state.drafts.findIndex((d) => d.id === action.payload.id);
      let updatedDrafts;
      if (existingIdx > -1) {
        updatedDrafts = [...state.drafts];
        updatedDrafts[existingIdx] = action.payload;
      } else {
        updatedDrafts = [action.payload, ...state.drafts];
      }
      return {
        ...state,
        saving: false,
        drafts: updatedDrafts,
        activeDraft: action.payload,
        autoSaveStatus: 'saved'
      };
    case 'SAVE_ERROR':
      return { ...state, saving: false, autoSaveStatus: 'idle' };

    case 'DELETE_SUCCESS':
      return {
        ...state,
        drafts: state.drafts.filter((d) => d.id !== action.payload),
        isEditorOpen: state.activeDraft?.id === action.payload ? false : state.isEditorOpen,
        activeDraft: state.activeDraft?.id === action.payload ? null : state.activeDraft,
      };

    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_CATEGORY_FILTER':
      return { ...state, categoryFilter: action.payload };
    case 'SET_STATUS_FILTER':
      return { ...state, statusFilter: action.payload };
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload };
    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload };

    case 'TOGGLE_MOCK_SETTINGS':
      return { ...state, isMockSettingsOpen: !state.isMockSettingsOpen };
    case 'UPDATE_API_CONFIG':
      return { ...state, apiConfig: action.payload };

    case 'SET_CONFIRM_MODAL':
      return { ...state, confirmModal: action.payload };

    case 'ADD_TOAST':
      return { ...state, toasts: [...state.toasts, action.payload] };
    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.payload) };

    case 'SET_THEME':
      return { ...state, theme: action.payload };

    default:
      return state;
  }
}

export function DraftProvider({ children }) {
  const [state, dispatch] = useReducer(draftReducer, initialState);

  // Sync HTML Theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('exp1_1_2_theme', state.theme);
  }, [state.theme]);

  // Toast Helper
  const addToast = useCallback((message, type = 'info', duration = 3500) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    dispatch({ type: 'ADD_TOAST', payload: { id, message, type } });
    setTimeout(() => {
      dispatch({ type: 'REMOVE_TOAST', payload: id });
    }, duration);
  }, []);

  // Fetch Initial Drafts
  const loadDrafts = useCallback(async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const data = await mockApi.fetchDrafts();
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: err.message });
      addToast(`Error loading drafts: ${err.message}`, 'error');
    }
  }, [addToast]);

  useEffect(() => {
    loadDrafts();
  }, [loadDrafts]);

  // Actions
  const openEditor = (draft = null) => {
    dispatch({ type: 'OPEN_EDITOR', payload: draft });
  };

  const closeEditor = () => {
    dispatch({ type: 'CLOSE_EDITOR' });
  };

  const saveDraft = async (draftData, isAutoSave = false) => {
    if (!isAutoSave) dispatch({ type: 'SAVE_START' });
    dispatch({ type: 'SET_AUTO_SAVE_STATUS', payload: 'saving' });

    try {
      const saved = await mockApi.saveDraft(draftData);
      dispatch({ type: 'SAVE_SUCCESS', payload: saved });
      if (!isAutoSave) {
        addToast(`Draft "${saved.title}" saved successfully!`, 'success');
      }
      return saved;
    } catch (err) {
      dispatch({ type: 'SAVE_ERROR' });
      addToast(`Save failed: ${err.message}`, 'error');
      throw err;
    }
  };

  const deleteDraft = async (id) => {
    try {
      const deleted = await mockApi.deleteDraft(id);
      dispatch({ type: 'DELETE_SUCCESS', payload: id });
      addToast(`Draft "${deleted.title}" deleted.`, 'warning');
    } catch (err) {
      addToast(`Delete failed: ${err.message}`, 'error');
    }
  };

  const duplicateDraft = async (id) => {
    try {
      const copy = await mockApi.duplicateDraft(id);
      dispatch({ type: 'FETCH_SUCCESS', payload: await mockApi.fetchDrafts() });
      addToast(`Duplicated as "${copy.title}"`, 'success');
    } catch (err) {
      addToast(`Duplicate failed: ${err.message}`, 'error');
    }
  };

  const publishDraft = async (id) => {
    try {
      const published = await mockApi.publishDraft(id);
      dispatch({ type: 'FETCH_SUCCESS', payload: await mockApi.fetchDrafts() });
      addToast(`Draft "${published.title}" is now Published! 🎉`, 'success');
    } catch (err) {
      addToast(`Publish failed: ${err.message}`, 'error');
    }
  };

  const resetData = async () => {
    try {
      const resetList = await mockApi.resetSeedData();
      dispatch({ type: 'FETCH_SUCCESS', payload: resetList });
      addToast('Reset drafts to sample seed data.', 'info');
    } catch (err) {
      addToast(`Reset failed: ${err.message}`, 'error');
    }
  };

  const updateConfig = (newConfig) => {
    const updated = updateApiConfig(newConfig);
    dispatch({ type: 'UPDATE_API_CONFIG', payload: updated });
    addToast('Updated mock API parameters.', 'info');
  };

  const toggleTheme = () => {
    dispatch({ type: 'SET_THEME', payload: state.theme === 'dark' ? 'light' : 'dark' });
  };

  const setConfirmModal = (modalConfig) => {
    dispatch({ type: 'SET_CONFIRM_MODAL', payload: modalConfig });
  };

  // Filter & Search Logic
  const filteredDrafts = state.drafts
    .filter((draft) => {
      // Status filter
      if (state.statusFilter !== 'all' && draft.status !== state.statusFilter) return false;
      // Category filter
      if (state.categoryFilter !== 'All' && draft.category !== state.categoryFilter) return false;
      // Search query
      if (state.searchQuery.trim()) {
        const q = state.searchQuery.toLowerCase();
        const matchesTitle = draft.title.toLowerCase().includes(q);
        const matchesContent = draft.content.toLowerCase().includes(q);
        const matchesTags = draft.tags.some((t) => t.toLowerCase().includes(q));
        return matchesTitle || matchesContent || matchesTags;
      }
      return true;
    })
    .sort((a, b) => {
      if (state.sortBy === 'title') return a.title.localeCompare(b.title);
      if (state.sortBy === 'wordCount') return b.wordCount - a.wordCount;
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

  const value = {
    ...state,
    filteredDrafts,
    dispatch,
    loadDrafts,
    openEditor,
    closeEditor,
    saveDraft,
    deleteDraft,
    duplicateDraft,
    publishDraft,
    resetData,
    updateConfig,
    toggleTheme,
    setConfirmModal,
    addToast,
  };

  return <DraftContext.Provider value={value}>{children}</DraftContext.Provider>;
}

export function useDrafts() {
  const context = useContext(DraftContext);
  if (!context) {
    throw new Error('useDrafts must be used within a DraftProvider');
  }
  return context;
}
