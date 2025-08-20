import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, Task, User, Milestone, AppState } from '../types';

const AppContext = createContext<{
  state: AppState;
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  addMilestone: (milestone: Omit<Milestone, 'id' | 'createdAt'>) => void;
  updateMilestone: (id: string, updates: Partial<Milestone>) => void;
} | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Mock data initialization
const initializeMockData = () => {
  const existingProjects = localStorage.getItem('projects');
  const existingTasks = localStorage.getItem('tasks');
  const existingUsers = localStorage.getItem('users');
  const existingMilestones = localStorage.getItem('milestones');

  if (!existingUsers) {
    const mockUsers = [
      { id: '1', name: 'John Manager', email: 'john@example.com', role: 'manager' as const, password: 'password' },
      { id: '2', name: 'Alice Developer', email: 'alice@example.com', role: 'member' as const, password: 'password' },
      { id: '3', name: 'Bob Designer', email: 'bob@example.com', role: 'member' as const, password: 'password' }
    ];
    localStorage.setItem('users', JSON.stringify(mockUsers));
  }

  if (!existingProjects) {
    const mockProjects: Project[] = [
      {
        id: '1',
        name: 'Website Redesign',
        description: 'Complete overhaul of company website',
        status: 'in-progress',
        startDate: '2024-01-15',
        endDate: '2024-03-30',
        progress: 65,
        managerId: '1',
        teamMembers: ['2', '3'],
        createdAt: '2024-01-15',
        updatedAt: '2024-02-01'
      }
    ];
    localStorage.setItem('projects', JSON.stringify(mockProjects));
  }

  if (!existingTasks) {
    const mockTasks: Task[] = [
      {
        id: '1',
        title: 'Design Homepage',
        description: 'Create new homepage design mockups',
        status: 'completed',
        priority: 'high',
        projectId: '1',
        assigneeId: '3',
        parentTaskId: undefined,
        subtasks: [],
        startDate: '2024-01-15',
        dueDate: '2024-01-30',
        progress: 100,
        createdAt: '2024-01-15',
        updatedAt: '2024-01-30'
      },
      {
        id: '2',
        title: 'Frontend Development',
        description: 'Implement new homepage design',
        status: 'in-progress',
        priority: 'high',
        projectId: '1',
        assigneeId: '2',
        parentTaskId: undefined,
        subtasks: [],
        startDate: '2024-02-01',
        dueDate: '2024-02-28',
        progress: 45,
        createdAt: '2024-02-01',
        updatedAt: '2024-02-15'
      }
    ];
    localStorage.setItem('tasks', JSON.stringify(mockTasks));
  }

  if (!existingMilestones) {
    const mockMilestones: Milestone[] = [
      {
        id: '1',
        title: 'Design Phase Complete',
        description: 'All design mockups approved',
        projectId: '1',
        dueDate: '2024-02-01',
        completed: true,
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        title: 'Development Phase Complete',
        description: 'Frontend development finished',
        projectId: '1',
        dueDate: '2024-03-01',
        completed: false,
        createdAt: '2024-01-15'
      }
    ];
    localStorage.setItem('milestones', JSON.stringify(mockMilestones));
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    projects: [],
    tasks: [],
    users: [],
    milestones: []
  });

  useEffect(() => {
    initializeMockData();
    setState({
      projects: JSON.parse(localStorage.getItem('projects') || '[]'),
      tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
      users: JSON.parse(localStorage.getItem('users') || '[]'),
      milestones: JSON.parse(localStorage.getItem('milestones') || '[]')
    });
  }, []);

  const saveToStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const addProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedProjects = [...state.projects, newProject];
    setState(prev => ({ ...prev, projects: updatedProjects }));
    saveToStorage('projects', updatedProjects);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    const updatedProjects = state.projects.map(project =>
      project.id === id ? { ...project, ...updates, updatedAt: new Date().toISOString() } : project
    );
    setState(prev => ({ ...prev, projects: updatedProjects }));
    saveToStorage('projects', updatedProjects);
  };

  const deleteProject = (id: string) => {
    const updatedProjects = state.projects.filter(project => project.id !== id);
    setState(prev => ({ ...prev, projects: updatedProjects }));
    saveToStorage('projects', updatedProjects);
  };

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedTasks = [...state.tasks, newTask];
    setState(prev => ({ ...prev, tasks: updatedTasks }));
    saveToStorage('tasks', updatedTasks);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    const updatedTasks = state.tasks.map(task =>
      task.id === id ? { ...task, ...updates, updatedAt: new Date().toISOString() } : task
    );
    setState(prev => ({ ...prev, tasks: updatedTasks }));
    saveToStorage('tasks', updatedTasks);
  };

  const deleteTask = (id: string) => {
    const updatedTasks = state.tasks.filter(task => task.id !== id);
    setState(prev => ({ ...prev, tasks: updatedTasks }));
    saveToStorage('tasks', updatedTasks);
  };

  const addMilestone = (milestoneData: Omit<Milestone, 'id' | 'createdAt'>) => {
    const newMilestone: Milestone = {
      ...milestoneData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    const updatedMilestones = [...state.milestones, newMilestone];
    setState(prev => ({ ...prev, milestones: updatedMilestones }));
    saveToStorage('milestones', updatedMilestones);
  };

  const updateMilestone = (id: string, updates: Partial<Milestone>) => {
    const updatedMilestones = state.milestones.map(milestone =>
      milestone.id === id ? { ...milestone, ...updates } : milestone
    );
    setState(prev => ({ ...prev, milestones: updatedMilestones }));
    saveToStorage('milestones', updatedMilestones);
  };

  return (
    <AppContext.Provider value={{
      state,
      addProject,
      updateProject,
      deleteProject,
      addTask,
      updateTask,
      deleteTask,
      addMilestone,
      updateMilestone
    }}>
      {children}
    </AppContext.Provider>
  );
};