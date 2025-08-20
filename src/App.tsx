import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import Layout from './components/shared/Layout';
import AuthForm from './components/auth/AuthForm';
import Dashboard from './components/dashboard/Dashboard';
import TaskBoard from './components/tasks/TaskBoard';
import Sidebar from './components/shared/Sidebar';

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
        return <div className="text-center py-12"><h2 className="text-xl text-gray-600">Projects section coming soon...</h2></div>;
      case 'milestones':
        return <div className="text-center py-12"><h2 className="text-xl text-gray-600">Milestones section coming soon...</h2></div>;
      case 'team':
        return <div className="text-center py-12"><h2 className="text-xl text-gray-600">Team management coming soon...</h2></div>;
      case 'reports':
        return <div className="text-center py-12"><h2 className="text-xl text-gray-600">Reports section coming soon...</h2></div>;
      case 'settings':
        return <div className="text-center py-12"><h2 className="text-xl text-gray-600">Settings coming soon...</h2></div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Layout>
          {renderContent()}
        </Layout>
      </div>
    </div>
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