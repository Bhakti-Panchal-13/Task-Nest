'use client';

import { Task, TaskStatus } from '@/types/task';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface TaskTableProps {
  tasks: Task[];
  onToggleStatus: (id: string, status: TaskStatus) => Promise<void>;
  onDeleteTask: (id: string) => Promise<void>;
  isLoading: boolean;
}

export function TaskTable({
  tasks,
  onToggleStatus,
  onDeleteTask,
  isLoading,
}: TaskTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      assignment: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      project: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      study: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      exam: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      other: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
    };
    return colors[category] || colors.other;
  };

  const getStatusColor = (status: TaskStatus) => {
    const colors: Record<TaskStatus, string> = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    };
    return colors[status];
  };

  const getStatusLabel = (status: TaskStatus) => {
    const labels: Record<TaskStatus, string> = {
      pending: 'Pending',
      'in-progress': 'In Progress',
      completed: 'Completed',
    };
    return labels[status];
  };

  const getNextStatus = (status: TaskStatus): TaskStatus => {
    const cycle: Record<TaskStatus, TaskStatus> = {
      pending: 'in-progress',
      'in-progress': 'completed',
      completed: 'pending',
    };
    return cycle[status];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (tasks.length === 0) {
    return (
      <div className="bg-card border-2 border-border rounded-lg p-12 text-center">
        <div className="text-4xl mb-3">📋</div>
        <p className="text-muted-foreground">No tasks yet. Create your first task above!</p>
      </div>
    );
  }

  return (
    <div className="bg-card border-2 border-border rounded-lg overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b-2 border-border">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                Task
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                Subject
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                Category
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                Due Date
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {tasks.map((task) => (
              <tr
                key={task.id}
                className="hover:bg-muted/30 transition-colors"
              >
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium text-foreground line-clamp-1">
                      {task.title}
                    </p>
                    {task.description && (
                      <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                        {task.description}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm font-medium text-foreground">
                    {task.subject}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
                      task.category
                    )}`}
                  >
                    {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all hover:shadow-sm ${getStatusColor(
                      task.status
                    )}`}
                    onClick={() => !isLoading && onToggleStatus(task.id, getNextStatus(task.status))}
                  >
                    {getStatusLabel(task.status)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm text-muted-foreground">
                    {task.dueDate ? formatDate(task.dueDate) : '—'}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setExpandedId(expandedId === task.id ? null : task.id)
                      }
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {expandedId === task.id ? '▲' : '▼'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => !isLoading && onDeleteTask(task.id)}
                      disabled={isLoading}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      ✕
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
