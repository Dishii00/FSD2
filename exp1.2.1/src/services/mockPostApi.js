// Mock REST API Service for Redux Post Management (Exp 1.2.1)
const STORAGE_KEY_POSTS = 'exp1_2_1_redux_posts';
const STORAGE_KEY_PLATFORMS = 'exp1_2_1_redux_platforms';

export const INITIAL_PLATFORMS = [
  { id: 'plat-twitter', name: 'Twitter/X', icon: 'Twitter', charLimit: 280, connected: true, postCount: 2, status: 'active', color: '#1d9bf0' },
  { id: 'plat-linkedin', name: 'LinkedIn', icon: 'Linkedin', charLimit: 3000, connected: true, postCount: 2, status: 'active', color: '#0a66c2' },
  { id: 'plat-instagram', name: 'Instagram', icon: 'Instagram', charLimit: 2200, connected: true, postCount: 1, status: 'active', color: '#e1306c' },
  { id: 'plat-medium', name: 'Medium', icon: 'BookOpen', charLimit: 10000, connected: false, postCount: 1, status: 'inactive', color: '#ffffff' },
  { id: 'plat-youtube', name: 'YouTube Community', icon: 'Youtube', charLimit: 5000, connected: false, postCount: 0, status: 'inactive', color: '#ff0000' },
];

export const INITIAL_POSTS = [
  {
    id: 'post-201',
    title: 'Scaling Redux State Management in Large Scale React Apps',
    content: 'Redux Toolkit simplifies global state architecture by eliminating boilerplate and introducing slice reducers. Combined with normalized state patterns, it offers O(1) entity lookups.',
    targetPlatforms: ['plat-twitter', 'plat-linkedin'],
    status: 'published',
    author: 'Alex Dev',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'post-202',
    title: 'UI Design System Best Practices for 2026',
    content: 'A robust design system standardizes CSS tokens, HSL color ramps, and glassmorphism depth. Normalize your design tokens just like your Redux store entities!',
    targetPlatforms: ['plat-instagram', 'plat-linkedin', 'plat-medium'],
    status: 'scheduled',
    author: 'Sarah Designer',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 'post-203',
    title: '5 Tips for Async Thunks & Redux Middleware',
    content: 'Async thunks provide clean lifecycle states: pending, fulfilled, and rejected. Learn how to pair them with optimistic UI updates.',
    targetPlatforms: ['plat-twitter'],
    status: 'draft',
    author: 'Alex Dev',
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  }
];

const delay = (ms = 400) => new Promise((res) => setTimeout(res, ms));

const getStored = (key, fallback) => {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch (e) {
    return fallback;
  }
};

const setStored = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {}
};

export const mockPostApi = {
  // Fetch All Posts
  async fetchPosts() {
    await delay(450);
    const posts = getStored(STORAGE_KEY_POSTS, INITIAL_POSTS);
    setStored(STORAGE_KEY_POSTS, posts);
    return posts;
  },

  // Create Post
  async createPost(postData) {
    await delay(500);
    const posts = getStored(STORAGE_KEY_POSTS, INITIAL_POSTS);
    const now = new Date().toISOString();
    const newPost = {
      id: `post-${Date.now()}`,
      title: postData.title || 'Untitled Post',
      content: postData.content || '',
      targetPlatforms: postData.targetPlatforms || ['plat-twitter'],
      status: postData.status || 'draft',
      author: postData.author || 'Current User',
      createdAt: now,
      updatedAt: now,
    };
    posts.unshift(newPost);
    setStored(STORAGE_KEY_POSTS, posts);
    return newPost;
  },

  // Update Post
  async updatePost(postData) {
    await delay(400);
    const posts = getStored(STORAGE_KEY_POSTS, INITIAL_POSTS);
    const idx = posts.findIndex((p) => p.id === postData.id);
    if (idx === -1) throw new Error(`Post with ID ${postData.id} not found.`);
    
    const updatedPost = {
      ...posts[idx],
      ...postData,
      updatedAt: new Date().toISOString(),
    };
    posts[idx] = updatedPost;
    setStored(STORAGE_KEY_POSTS, posts);
    return updatedPost;
  },

  // Delete Post
  async deletePost(id) {
    await delay(350);
    let posts = getStored(STORAGE_KEY_POSTS, INITIAL_POSTS);
    posts = posts.filter((p) => p.id !== id);
    setStored(STORAGE_KEY_POSTS, posts);
    return id;
  },

  // Fetch Platforms
  async fetchPlatforms() {
    await delay(300);
    const platforms = getStored(STORAGE_KEY_PLATFORMS, INITIAL_PLATFORMS);
    setStored(STORAGE_KEY_PLATFORMS, platforms);
    return platforms;
  },

  // Toggle Platform Active State
  async togglePlatform(platformId) {
    await delay(250);
    const platforms = getStored(STORAGE_KEY_PLATFORMS, INITIAL_PLATFORMS);
    const idx = platforms.findIndex((p) => p.id === platformId);
    if (idx !== -1) {
      platforms[idx].connected = !platforms[idx].connected;
      platforms[idx].status = platforms[idx].connected ? 'active' : 'inactive';
      setStored(STORAGE_KEY_PLATFORMS, platforms);
      return platforms[idx];
    }
    throw new Error('Platform not found');
  }
};
