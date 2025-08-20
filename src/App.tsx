import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import Layout from './components/shared/Layout';
import AuthForm from './components/auth/AuthForm';
import Dashboard from './components/dashboard/Dashboard';
import TaskBoard from './components/tasks/TaskBoard';
import ProjectsPage from './pages/ProjectsPage'; 
import MilestonesPage from './pages/MilestonesPage';
import TeamPage from './pages/TeamPage';
const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');

  if (!user) {
    return <AuthForm />;
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'tasks':
        return <TaskBoard />;
      case 'projects':
        return (
          <ProjectsPage />
        );
      case 'milestones':
        return (
          <MilestonesPage />
        );
      case 'team':
        return (
          <TeamPage />
        );
      // case 'reports':
      //   return (
      //     <div className="text-center py-12">
      //       <h2 className="text-xl text-gray-600">Reports section coming soon...</h2>
      //     </div>
      //   );
      case 'settings':
        return (
          <div className="text-center py-12">
            <h2 className="text-xl text-gray-600">Settings coming soon...</h2>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeSection={activeSection} onSectionChange={setActiveSection}>
      {renderContent()}
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
