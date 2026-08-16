import { createSlice } from '@reduxjs/toolkit';
import { formatDateString } from '../utils/dateUtils';

// Seed Initial Scheduled Posts
const INITIAL_SCHEDULED_POSTS = [
  {
    id: 'evt-1',
    title: 'Launching New React 18 & Redux Toolkit Course',
    content: 'Excited to announce our new deep dive module covering memoized selectors and temporal calendar layouts!',
    platforms: ['Twitter/X', 'LinkedIn'],
    scheduledDate: formatDateString(new Date()), // Today
    scheduledTime: '10:00',
    color: '#3b82f6', // Primary Blue
    status: 'scheduled',
  },
  {
    id: 'evt-2',
    title: 'Top 5 HCI Principles for Calendar UI Design',
    content: 'Temporal data visualizers must support seamless drag-and-drop and intuitive view transitions.',
    platforms: ['Medium', 'LinkedIn'],
    scheduledDate: formatDateString(new Date(Date.now() + 86400000 * 2)), // 2 days later
    scheduledTime: '14:30',
    color: '#a855f7', // Purple
    status: 'scheduled',
  },
  {
    id: 'evt-3',
    title: 'HTML5 Drag & Drop Rescheduling Benchmark',
    content: 'Testing temporal slot updates with optimistic state dispatches.',
    platforms: ['Twitter/X', 'YouTube'],
    scheduledDate: formatDateString(new Date(Date.now() - 86400000 * 3)), // 3 days ago
    scheduledTime: '09:15',
    color: '#10b981', // Emerald
    status: 'published',
  },
];

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    currentDate: new Date().toISOString(),
    viewMode: 'month', // 'month' | 'week' | 'day' | 'agenda'
    scheduledPosts: INITIAL_SCHEDULED_POSTS,
    isModalOpen: false,
    selectedDateForModal: null,
    editingPostId: null,
    toastMessage: null,
  },
  reducers: {
    setCurrentDate(state, action) {
      state.currentDate = action.payload;
    },
    navigateMonth(state, action) {
      const d = new Date(state.currentDate);
      d.setMonth(d.getMonth() + action.payload);
      state.currentDate = d.toISOString();
    },
    setViewMode(state, action) {
      state.viewMode = action.payload;
    },
    openScheduleModal(state, action) {
      state.isModalOpen = true;
      if (typeof action.payload === 'string') {
        state.selectedDateForModal = action.payload;
        state.editingPostId = null;
      } else if (action.payload?.id) {
        state.editingPostId = action.payload.id;
        state.selectedDateForModal = action.payload.scheduledDate;
      } else {
        state.selectedDateForModal = formatDateString(new Date());
        state.editingPostId = null;
      }
    },
    closeScheduleModal(state) {
      state.isModalOpen = false;
      state.editingPostId = null;
      state.selectedDateForModal = null;
    },
    addScheduledPost(state, action) {
      const newPost = {
        id: `evt-${Date.now()}`,
        title: action.payload.title || 'Untitled Post',
        content: action.payload.content || '',
        platforms: action.payload.platforms || ['Twitter/X'],
        scheduledDate: action.payload.scheduledDate || formatDateString(new Date()),
        scheduledTime: action.payload.scheduledTime || '12:00',
        color: action.payload.color || '#3b82f6',
        status: action.payload.status || 'scheduled',
      };
      state.scheduledPosts.push(newPost);
      state.toastMessage = `Scheduled post for ${newPost.scheduledDate} at ${newPost.scheduledTime}`;
    },
    updateScheduledPost(state, action) {
      const idx = state.scheduledPosts.findIndex((p) => p.id === action.payload.id);
      if (idx !== -1) {
        state.scheduledPosts[idx] = { ...state.scheduledPosts[idx], ...action.payload };
        state.toastMessage = `Updated post "${action.payload.title}"`;
      }
    },
    deleteScheduledPost(state, action) {
      state.scheduledPosts = state.scheduledPosts.filter((p) => p.id !== action.payload);
      state.toastMessage = 'Deleted post event from schedule';
    },
    // Drag-and-Drop Reschedule Action
    reschedulePost(state, action) {
      const { id, newDate, newTime } = action.payload;
      const post = state.scheduledPosts.find((p) => p.id === id);
      if (post) {
        post.scheduledDate = newDate;
        if (newTime) post.scheduledTime = newTime;
        state.toastMessage = `Rescheduled "${post.title}" to ${newDate}${newTime ? ` at ${newTime}` : ''}`;
      }
    },
    clearToast(state) {
      state.toastMessage = null;
    },
  },
});

export const {
  setCurrentDate,
  navigateMonth,
  setViewMode,
  openScheduleModal,
  closeScheduleModal,
  addScheduledPost,
  updateScheduledPost,
  deleteScheduledPost,
  reschedulePost,
  clearToast,
} = calendarSlice.actions;

export default calendarSlice.reducer;
