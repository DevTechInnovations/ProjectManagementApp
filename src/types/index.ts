export interface User {
  id: string;
  name: string;
  email: string;
  role: 'manager' | 'member';
  avatar?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  startDate: string;
  endDate: string;
  progress: number;
  managerId: string;
  teamMembers: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  projectId: string;
  assigneeId?: string;
  parentTaskId?: string;
  subtasks: string[];
  startDate: string;
  dueDate: string;
  progress: number;
  createdAt: string;
  updatedAt: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  projectId: string;
  dueDate: string;
  completed: boolean;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: 'manager' | 'member') => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
}

export interface AppState {
  projects: Project[];
  tasks: Task[];
  users: User[];
  milestones: Milestone[];
}