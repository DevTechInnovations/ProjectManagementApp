import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';
import StatsCards from './StatsCards';
import ProjectProgress from './ProjectProgress';
import TaskOverview from './TaskOverview';
import RecentActivity from './RecentActivity';

const Dashboard: React.FC = () => {
  const { state } = useApp();
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600 mt-1">Here's what's happening with your projects today.</p>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProjectProgress />
        <TaskOverview />
      </div>

      <RecentActivity />
    </div>
  );
};

export default Dashboard;