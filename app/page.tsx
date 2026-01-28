'use client';

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/navbar';
import { TaskForm } from '@/components/task-form';
import { TaskTable } from '@/components/task-table';
import { Task, TaskStatus, TaskCategory } from '@/types/task';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Load tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setIsInitialLoading(true);
      const response = await fetch('/api/tasks');
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setTasks([]);
    } finally {
      setIsInitialLoading(false);
    }
  };

  const handleAddTask = async (
    title: string,
    description: string,
    subject: string,
    category: TaskCategory,
    status: TaskStatus,
    dueDate?: string
  ) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, subject, category, status, dueDate }),
      });

      if (!response.ok) throw new Error('Failed to add task');

      const newTask = await response.json();
      setTasks((prevTasks) => [newTask, ...prevTasks]);
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Failed to add task. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (id: string, status: TaskStatus) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/tasks/[id]?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update task');
      }

      const updatedTask = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (error) {
      console.error('[v0] Error updating task:', error);
      alert('Failed to update task. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/tasks/[id]?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete task');
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('[v0] Error deleting task:', error);
      alert('Failed to delete task. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const completedCount = tasks.filter((task) => task.status === 'completed').length;
  const inProgressCount = tasks.filter((task) => task.status === 'in-progress').length;
  const pendingCount = tasks.filter((task) => task.status === 'pending').length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Your Tasks
          </h2>
          {!isInitialLoading && totalCount > 0 && (
            <p className="text-muted-foreground">
              {completedCount} of {totalCount} tasks completed
            </p>
          )}
        </div>

        {/* Stats Cards */}
        {!isInitialLoading && totalCount > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card border-2 border-border rounded-lg p-4">
              <p className="text-2xl font-bold text-primary">{totalCount}</p>
              <p className="text-sm text-muted-foreground mt-1">Total Tasks</p>
            </div>
            <div className="bg-card border-2 border-border rounded-lg p-4">
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{pendingCount}</p>
              <p className="text-sm text-muted-foreground mt-1">Pending</p>
            </div>
            <div className="bg-card border-2 border-border rounded-lg p-4">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{inProgressCount}</p>
              <p className="text-sm text-muted-foreground mt-1">In Progress</p>
            </div>
            <div className="bg-card border-2 border-border rounded-lg p-4">
              <p className="text-2xl font-bold text-accent">{completedCount}</p>
              <p className="text-sm text-muted-foreground mt-1">Completed</p>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-card border-2 border-border rounded-lg p-6 shadow-sm sticky top-24 h-fit">
              <h3 className="text-xl font-bold text-card-foreground mb-4">
                ➕ New Task
              </h3>
              <TaskForm onAddTask={handleAddTask} isLoading={isLoading} />
            </div>
          </div>

          {/* Task Table Section */}
          <div className="lg:col-span-3">
            {isInitialLoading ? (
              <div className="text-center py-12 bg-card border-2 border-border rounded-lg">
                <div className="text-4xl mb-4 animate-pulse">⏳</div>
                <p className="text-muted-foreground">Loading your tasks...</p>
              </div>
            ) : (
              <TaskTable
                tasks={tasks}
                onToggleStatus={handleToggleStatus}
                onDeleteTask={handleDeleteTask}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
