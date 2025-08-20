import React from 'react';
import { Calendar, User, AlertCircle } from 'lucide-react';
import { Task } from '../../types';
import { useApp } from '../../contexts/AppContext';

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: Task['status']) => void;
  onClick: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onStatusChange, onClick }) => {
  const { state } = useApp();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getUserName = (userId: string) => {
    const user = state.users.find(u => u.id === userId);
    return user?.name || 'Unassigned';
  };

  const getProjectName = (projectId: string) => {
    const project = state.projects.find(p => p.id === projectId);
    return project?.name || 'Unknown Project';
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && task.status !== 'completed';
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 text-sm leading-tight">{task.title}</h3>
          <p className="text-xs text-gray-600 mt-1">{getProjectName(task.projectId)}</p>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>

      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
        <div className="flex items-center">
          <User className="h-3 w-3 mr-1" />
          {getUserName(task.assigneeId || '')}
        </div>
        <div className={`flex items-center ${isOverdue(task.dueDate) ? 'text-red-600' : ''}`}>
          <Calendar className="h-3 w-3 mr-1" />
          {new Date(task.dueDate).toLocaleDateString()}
          {isOverdue(task.dueDate) && <AlertCircle className="h-3 w-3 ml-1" />}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium text-gray-900">{task.progress}%</span>
        </div>
        <div className="bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${task.progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;