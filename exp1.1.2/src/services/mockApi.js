// Mock API Service for Draft Management System (Exp 1.1.2)
// Simulates asynchronous REST backend endpoints with configurable network latency and error injection

const STORAGE_KEY = 'exp1_1_2_drafts_store';
const CONFIG_KEY = 'exp1_1_2_api_config';

const DEFAULT_CONFIG = {
  latencyMs: 500,
  simulateError: false,
  errorRate: 0, // 0 to 1
};

export const INITIAL_SEED_DRAFTS = [
  {
    id: 'draft-101',
    title: 'Building Scalable Frontend Architectures with React & Async State',
    content: `State management in modern web applications requires careful separation of concerns. In this article, we explore how custom hooks combined with useReducer simplify asynchronous data fetching, auto-save persistence, and complex component hierarchies.\n\n### Key Takeaways:\n1. Keep local UI state close to components.\n2. Handle loading, success, and error states gracefully.\n3. Implement optimistic UI updates with rollback capabilities.`,
    category: 'Engineering',
    tags: ['React', 'Architecture', 'JavaScript', 'Frontend'],
    status: 'draft',
    platforms: ['Twitter/X', 'LinkedIn', 'Dev.to'],
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    wordCount: 78,
    readTime: 1,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'draft-102',
    title: 'Mastering Dark Mode Design Systems & Glassmorphism Aesthetics',
    content: `Designing elegant dark mode user interfaces is more than just turning white backgrounds to black. It involves defining subtle HSL color spaces, depth layerings using frosted glass CSS filters, and high-contrast typography.\n\n> "Good design is as little design as possible." – Dieter Rams`,
    category: 'Design',
    tags: ['UI/UX', 'CSS', 'DesignSystem', 'WebDev'],
    status: 'draft',
    platforms: ['Medium', 'Substack'],
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    wordCount: 54,
    readTime: 1,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: 'draft-103',
    title: '5 Productivity Strategies for Senior Software Engineers',
    content: `Focus time is every software engineer's most valuable asset. Here are 5 battle-tested habits to protect your deep focus:\n- Block out 3-hour deep work sessions.\n- Turn off non-urgent notifications during coding blocks.\n- Document decisions early in draft notes.`,
    category: 'Productivity',
    tags: ['Productivity', 'Career', 'Engineering'],
    status: 'archived',
    platforms: ['LinkedIn', 'Twitter/X'],
    coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
    wordCount: 46,
    readTime: 1,
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  }
];

// Utility helper to get current API config
export const getApiConfig = () => {
  try {
    const saved = localStorage.getItem(CONFIG_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
  } catch (err) {
    return DEFAULT_CONFIG;
  }
};

// Save API config
export const updateApiConfig = (newConfig) => {
  const updated = { ...getApiConfig(), ...newConfig };
  localStorage.setItem(CONFIG_KEY, JSON.stringify(updated));
  return updated;
};

// Helper to simulate delay and optional errors
const delay = () => {
  const config = getApiConfig();
  const ms = Math.max(100, parseInt(config.latencyMs) || 500);
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (config.simulateError) {
        reject(new Error('Simulated Backend API Error: Failed to complete request (500 Internal Server Error)'));
      } else {
        resolve();
      }
    }, ms);
  });
};

// Internal storage reader
const getStorageDrafts = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_DRAFTS));
      return INITIAL_SEED_DRAFTS;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Failed reading drafts from localStorage', e);
    return INITIAL_SEED_DRAFTS;
  }
};

// Internal storage writer
const setStorageDrafts = (drafts) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
  } catch (e) {
    console.error('Failed writing drafts to localStorage', e);
  }
};

// API Services
export const mockApi = {
  // GET /api/drafts
  async fetchDrafts() {
    await delay();
    return getStorageDrafts();
  },

  // GET /api/drafts/:id
  async getDraftById(id) {
    await delay();
    const drafts = getStorageDrafts();
    const draft = drafts.find((d) => d.id === id);
    if (!draft) throw new Error(`Draft with ID ${id} not found.`);
    return draft;
  },

  // POST or PUT /api/drafts
  async saveDraft(draftData) {
    await delay();
    const drafts = getStorageDrafts();
    const now = new Date().toISOString();
    
    // Calculate word count & estimated read time
    const text = draftData.content || '';
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    let savedDraft;
    
    if (draftData.id) {
      // Update existing
      const index = drafts.findIndex((d) => d.id === draftData.id);
      if (index === -1) {
        throw new Error(`Draft with ID ${draftData.id} not found.`);
      }
      savedDraft = {
        ...drafts[index],
        ...draftData,
        wordCount,
        readTime,
        updatedAt: now,
      };
      drafts[index] = savedDraft;
    } else {
      // Create new
      savedDraft = {
        id: `draft-${Date.now()}`,
        title: draftData.title || 'Untitled Post Draft',
        content: draftData.content || '',
        category: draftData.category || 'General',
        tags: draftData.tags || [],
        status: draftData.status || 'draft',
        platforms: draftData.platforms || ['Blog'],
        coverImage: draftData.coverImage || 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
        wordCount,
        readTime,
        createdAt: now,
        updatedAt: now,
      };
      drafts.unshift(savedDraft);
    }

    setStorageDrafts(drafts);
    return savedDraft;
  },

  // DELETE /api/drafts/:id
  async deleteDraft(id) {
    await delay();
    let drafts = getStorageDrafts();
    const draftToDelete = drafts.find((d) => d.id === id);
    if (!draftToDelete) throw new Error(`Draft ${id} not found.`);
    
    drafts = drafts.filter((d) => d.id !== id);
    setStorageDrafts(drafts);
    return draftToDelete;
  },

  // POST /api/drafts/:id/duplicate
  async duplicateDraft(id) {
    await delay();
    const drafts = getStorageDrafts();
    const original = drafts.find((d) => d.id === id);
    if (!original) throw new Error(`Draft ${id} not found.`);

    const now = new Date().toISOString();
    const copy = {
      ...original,
      id: `draft-${Date.now()}`,
      title: `${original.title} (Copy)`,
      status: 'draft',
      createdAt: now,
      updatedAt: now,
    };
    drafts.unshift(copy);
    setStorageDrafts(drafts);
    return copy;
  },

  // POST /api/drafts/:id/publish
  async publishDraft(id) {
    await delay();
    const drafts = getStorageDrafts();
    const index = drafts.findIndex((d) => d.id === id);
    if (index === -1) throw new Error(`Draft ${id} not found.`);

    drafts[index] = {
      ...drafts[index],
      status: 'published',
      updatedAt: new Date().toISOString(),
    };
    setStorageDrafts(drafts);
    return drafts[index];
  },

  // POST /api/drafts/bulk-delete
  async bulkDeleteDrafts(ids) {
    await delay();
    let drafts = getStorageDrafts();
    drafts = drafts.filter((d) => !ids.includes(d.id));
    setStorageDrafts(drafts);
    return ids;
  },

  // Reset dataset to initial seed
  async resetSeedData() {
    await delay();
    setStorageDrafts(INITIAL_SEED_DRAFTS);
    return INITIAL_SEED_DRAFTS;
  }
};
