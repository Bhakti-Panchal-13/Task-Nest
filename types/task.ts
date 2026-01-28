export type TaskStatus = 'pending' | 'in-progress' | 'completed';
export type TaskCategory = 'assignment' | 'project' | 'study' | 'exam' | 'other';

export interface Task {
  id: string;
  title: string;
  description: string;
  subject: string;
  category: TaskCategory;
  status: TaskStatus;
  dueDate?: string;
  createdAt: string;
}
