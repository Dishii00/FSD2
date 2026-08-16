import React from 'react';
import { RBACProvider, useRBAC } from './context/RBACContext';
import Header from './components/Header';
import DashboardView from './views/DashboardView';
import EditorStudioView from './views/EditorStudioView';
import AdminConsoleView from './views/AdminConsoleView';
import UnauthorizedView from './views/UnauthorizedView';

function MainAppContent() {
  const { activeTab } = useRBAC();

  return (
    <div className="app-container">
      {/* Top Header */}
      <Header />

      {/* Dynamic View Router */}
      <main>
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'editor' && <EditorStudioView />}
        {activeTab === 'admin' && <AdminConsoleView />}
        {activeTab === 'unauthorized' && <UnauthorizedView />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <RBACProvider>
      <MainAppContent />
    </RBACProvider>
  );
}
