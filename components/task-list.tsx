'use client';

import { Task } from '@/types/task';
import { Button } from '@/components/ui/button';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string, completed: boolean) => Promise<void>;
  onDeleteTask: (id: string) => Promise<void>;
  isLoading: boolean;
}

export function TaskList({
  tasks,
  onToggleTask,
  onDeleteTask,
  isLoading,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">🎉</div>
        <p className="text-xl font-semibold text-foreground mb-2">
          No tasks yet!
        </p>
        <p className="text-muted-foreground">
          Add your first task above to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-card border-2 border-border rounded-lg p-4 hover:shadow-md transition-all"
        >
          <div className="flex items-start gap-4">
            <button
              onClick={() => onToggleTask(task.id, !task.completed)}
              disabled={isLoading}
              className="mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center hover:bg-primary/10 transition-colors"
              aria-label={`Toggle task: ${task.title}`}
            >
              {task.completed ? (
                <span className="text-primary text-lg">✓</span>
              ) : null}
            </button>

            <div className="flex-1 min-w-0">
              <p
                className={`font-semibold break-words ${
                  task.completed
                    ? 'line-through text-muted-foreground'
                    : 'text-card-foreground'
                }`}
              >
                {task.title}
              </p>
              {task.description && (
                <p
                  className={`text-sm mt-1 break-words ${
                    task.completed
                      ? 'text-muted-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  {task.description}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                {new Date(task.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>

            <Button
              onClick={() => onDeleteTask(task.id)}
              disabled={isLoading}
              variant="ghost"
              size="sm"
              className="text-destructive hover:bg-destructive/10 flex-shrink-0"
            >
              🗑
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
