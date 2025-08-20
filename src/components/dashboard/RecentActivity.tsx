import React from 'react';
import { Clock, User, CheckCircle, FolderOpen } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const RecentActivity: React.FC = () => {
  const { state } = useApp();

  const getUserName = (userId: string) => {
    const user = state.users.find(u => u.id === userId);
    return user?.name || 'Unknown User';
  };

  const getProjectName = (projectId: string) => {
    const project = state.projects.find(p => p.id === projectId);
    return project?.name || 'Unknown Project';
  };

  // Mock activity data - in real app this would come from an activity log
  const activities = [
    {
      id: '1',
      type: 'task_completed',
      userId: '3',
      taskTitle: 'Design Homepage',
      projectId: '1',
      timestamp: new Date().toISOString(),
      icon: CheckCircle,
      iconColor: 'text-emerald-500'
    },
    {
      id: '2',
      type: 'project_updated',
      userId: '1',
      projectId: '1',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      icon: FolderOpen,
      iconColor: 'text-blue-500'
    },
    {
      id: '3',
      type: 'task_assigned',
      userId: '1',
      assigneeId: '2',
      taskTitle: 'Frontend Development',
      projectId: '1',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      icon: User,
      iconColor: 'text-purple-500'
    }
  ];

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getActivityText = (activity: any) => {
    switch (activity.type) {
      case 'task_completed':
        return (
          <span>
            <strong>{getUserName(activity.userId)}</strong> completed task "{activity.taskTitle}" in{' '}
            <strong>{getProjectName(activity.projectId)}</strong>
          </span>
        );
      case 'project_updated':
        return (
          <span>
            <strong>{getUserName(activity.userId)}</strong> updated project{' '}
            <strong>{getProjectName(activity.projectId)}</strong>
          </span>
        );
      case 'task_assigned':
        return (
          <span>
            <strong>{getUserName(activity.userId)}</strong> assigned "{activity.taskTitle}" to{' '}
            <strong>{getUserName(activity.assigneeId)}</strong>
          </span>
        );
      default:
        return 'Unknown activity';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All
        </button>
      </div>

      <div className="flow-root">
        <ul className="-mb-8">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <li key={activity.id}>
                <div className="relative pb-8">
                  {index !== activities.length - 1 && (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  )}
                  <div className="relative flex items-start space-x-3">
                    <div className={`relative px-1`}>
                      <div className="h-8 w-8 bg-white rounded-full ring-8 ring-white flex items-center justify-center">
                        <Icon className={`h-4 w-4 ${activity.iconColor}`} />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <div className="text-sm text-gray-900">
                          {getActivityText(activity)}
                        </div>
                        <div className="mt-1 flex items-center space-x-2">
                          <Clock className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {formatTimeAgo(activity.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default RecentActivity;