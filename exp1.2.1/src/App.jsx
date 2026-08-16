import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPlatformsThunk } from './store/slices/platformsSlice';
import Header from './components/Header';
import PlatformDashboard from './components/PlatformDashboard';
import PostList from './components/PostList';
import PostModal from './components/PostModal';
import ReduxInspectorDrawer from './components/ReduxInspectorDrawer';
import ToastContainer from './components/ToastContainer';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlatformsThunk());
  }, [dispatch]);

  return (
    <div className="app-container">
      {/* Top Header connected to Redux */}
      <Header />

      {/* Connected Social Platforms Dashboard */}
      <PlatformDashboard />

      {/* Normalized Post List & Filters */}
      <PostList />

      {/* Modals & State Inspector Drawers */}
      <PostModal />
      <ReduxInspectorDrawer />
      <ToastContainer />
    </div>
  );
}
