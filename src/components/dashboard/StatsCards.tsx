import React from 'react';
import { FolderOpen, CheckSquare, Users, TrendingUp } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const StatsCards: React.FC = () => {
  const { state } = useApp();

  const stats = [
    {
      label: 'Active Projects',
      value: state.projects.filter(p => p.status === 'in-progress').length,
      total: state.projects.length,
      icon: FolderOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Completed Tasks',
      value: state.tasks.filter(t => t.status === 'completed').length,
      total: state.tasks.length,
      icon: CheckSquare,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      label: 'Team Members',
      value: state.users.filter(u => u.role === 'member').length,
      total: state.users.length,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      label: 'Overall Progress',
      value: Math.round(state.projects.reduce((acc, p) => acc + p.progress, 0) / state.projects.length) || 0,
      total: 100,
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      isPercentage: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}{stat.isPercentage ? '%' : ''}
                </div>
                <div className="text-sm text-gray-600">
                  of {stat.total}{stat.isPercentage ? '%' : ''}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-sm font-medium text-gray-900">{stat.label}</div>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    stat.color === 'text-blue-600' ? 'bg-blue-500' :
                    stat.color === 'text-emerald-600' ? 'bg-emerald-500' :
                    stat.color === 'text-purple-600' ? 'bg-purple-500' :
                    'bg-orange-500'
                  }`}
                  style={{ width: `${(stat.value / stat.total) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;