import React, { useState } from 'react';
import { Plus, Filter, Search } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Task } from '../../types';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';

const TaskBoard: React.FC = () => {
  const { state, updateTask } = useApp();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProject, setFilterProject] = useState('all');

  const statusColumns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-50 border-gray-200' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-50 border-blue-200' },
    { id: 'review', title: 'Review', color: 'bg-yellow-50 border-yellow-200' },
    { id: 'completed', title: 'Completed', color: 'bg-emerald-50 border-emerald-200' }
  ];

  const filteredTasks = state.tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = filterProject === 'all' || task.projectId === filterProject;
    return matchesSearch && matchesProject;
  });

  const getTasksByStatus = (status: string) => {
    return filteredTasks.filter(task => task.status === status);
  };

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    updateTask(taskId, { status: newStatus });
  };

  const openTaskModal = (task?: Task) => {
    setSelectedTask(task || null);
    setIsModalOpen(true);
  };

  const closeTaskModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Task Board</h1>
          <button
            onClick={() => openTaskModal()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Task</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filterProject}
              onChange={(e) => setFilterProject(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Projects</option>
              {state.projects.map(project => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-0">
        {statusColumns.map(column => (
          <div key={column.id} className={`rounded-lg border-2 border-dashed p-4 ${column.color} flex flex-col`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">{column.title}</h2>
              <span className="bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-600">
                {getTasksByStatus(column.id).length}
              </span>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto">
              {getTasksByStatus(column.id).map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onStatusChange={handleStatusChange}
                  onClick={() => openTaskModal(task)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={closeTaskModal}
        task={selectedTask}
      />
    </div>
  );
};

export default TaskBoard;