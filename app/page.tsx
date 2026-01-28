'use client';

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-foreground mb-2">
            Welcome back! 👋
          </h2>
          {!isInitialLoading && totalCount > 0 && (
            <p className="text-muted-foreground text-lg">
              You have <span className="font-bold text-primary">{totalCount}</span> tasks • <span className="font-bold text-orange-500">{pendingCount}</span> pending • <span className="font-bold text-green-500">{completedCount}</span> completed
            </p>
          )}
        </div>

        {/* Stats Cards */}
        {!isInitialLoading && totalCount > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-500/70 to-blue-600/70 rounded-2xl p-6 text-white shadow-lg backdrop-blur-sm">
              <p className="text-3xl font-bold">{totalCount}</p>
              <p className="text-sm text-white/80 mt-2">Total Tasks</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-400/70 to-orange-500/70 rounded-2xl p-6 text-white shadow-lg backdrop-blur-sm">
              <p className="text-3xl font-bold">{pendingCount}</p>
              <p className="text-sm text-white/80 mt-2">Pending</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/70 to-pink-500/70 rounded-2xl p-6 text-white shadow-lg backdrop-blur-sm">
              <p className="text-3xl font-bold">{inProgressCount}</p>
              <p className="text-sm text-white/80 mt-2">In Progress</p>
            </div>
            <div className="bg-gradient-to-br from-green-500/70 to-emerald-600/70 rounded-2xl p-6 text-white shadow-lg backdrop-blur-sm">
              <p className="text-3xl font-bold">{completedCount}</p>
              <p className="text-sm text-white/80 mt-2">Completed</p>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-3">
          {/* Sidebar */}
          <div className="lg:col-span-2">
            <Sidebar />
          </div>

          {/* Form Section - Smaller */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-br from-white/80 to-blue-50/80 border-2 border-blue-100/50 rounded-3xl p-6 shadow-lg backdrop-blur-sm sticky top-24 h-fit">
              <h3 className="text-lg font-bold text-foreground mb-4">
                ➕ New Task
              </h3>
              <TaskForm onAddTask={handleAddTask} isLoading={isLoading} />
            </div>
          </div>

          {/* Task Table Section - Larger */}
          <div className="lg:col-span-7">
            <div className="bg-white/85 rounded-3xl shadow-lg overflow-hidden border-2 border-gray-100/50 backdrop-blur-sm">
              {isInitialLoading ? (
                <div className="text-center py-16">
                  <div className="text-5xl mb-4 animate-pulse">⏳</div>
                  <p className="text-muted-foreground text-lg">Loading your tasks...</p>
                </div>
              ) : totalCount === 0 ? (
                <div className="text-center py-16">
                  <div className="text-5xl mb-4">📝</div>
                  <p className="text-muted-foreground text-lg font-semibold">No tasks yet. Create your first task to get started!</p>
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
        </div>
      </main>
    </div>
  );
}

// 'use client';
//
// import { useEffect, useState } from 'react';
// import { Navbar } from '@/components/navbar';
// import { TaskForm } from '@/components/task-form';
// import { TaskTable } from '@/components/task-table';
// import { Task, TaskStatus, TaskCategory } from '@/types/task';
//
// export default function Home() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isInitialLoading, setIsInitialLoading] = useState(true);
//
//   // Load tasks on component mount
//   useEffect(() => {
//     fetchTasks();
//   }, []);
//
//   const fetchTasks = async () => {
//     try {
//       setIsInitialLoading(true);
//       const response = await fetch('/api/tasks');
//       if (!response.ok) throw new Error('Failed to fetch tasks');
//       const data = await response.json();
//       setTasks(data);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//       setTasks([]);
//     } finally {
//       setIsInitialLoading(false);
//     }
//   };
//
//   const handleAddTask = async (
//     title: string,
//     description: string,
//     subject: string,
//     category: TaskCategory,
//     status: TaskStatus,
//     dueDate?: string
//   ) => {
//     try {
//       setIsLoading(true);
//       const response = await fetch('/api/tasks', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ title, description, subject, category, status, dueDate }),
//       });
//
//       if (!response.ok) throw new Error('Failed to add task');
//
//       const newTask = await response.json();
//       setTasks((prevTasks) => [newTask, ...prevTasks]);
//     } catch (error) {
//       console.error('Error adding task:', error);
//       alert('Failed to add task. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };
//
//   const handleToggleStatus = async (id: string, status: TaskStatus) => {
//     try {
//       setIsLoading(true);
//       const response = await fetch(`/api/tasks/[id]?id=${id}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ status }),
//       });
//
//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.error || 'Failed to update task');
//       }
//
//       const updatedTask = await response.json();
//       setTasks((prevTasks) =>
//         prevTasks.map((task) => (task.id === id ? updatedTask : task))
//       );
//     } catch (error) {
//       console.error('[v0] Error updating task:', error);
//       alert('Failed to update task. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };
//
//   const handleDeleteTask = async (id: string) => {
//     try {
//       setIsLoading(true);
//       const response = await fetch(`/api/tasks/[id]?id=${id}`, {
//         method: 'DELETE',
//       });
//
//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.error || 'Failed to delete task');
//       }
//
//       setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
//     } catch (error) {
//       console.error('[v0] Error deleting task:', error);
//       alert('Failed to delete task. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };
//
//   const completedCount = tasks.filter((task) => task.status === 'completed').length;
//   const inProgressCount = tasks.filter((task) => task.status === 'in-progress').length;
//   const pendingCount = tasks.filter((task) => task.status === 'pending').length;
//   const totalCount = tasks.length;
//
//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//
//       <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="mb-8">
//           <h2 className="text-3xl font-bold text-foreground mb-2">
//             Your Tasks
//           </h2>
//           {!isInitialLoading && totalCount > 0 && (
//             <p className="text-muted-foreground">
//               {completedCount} of {totalCount} tasks completed
//             </p>
//           )}
//         </div>
//
//         {/* Stats Cards */}
//         {!isInitialLoading && totalCount > 0 && (
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//             <div className="bg-card border-2 border-border rounded-lg p-4">
//               <p className="text-2xl font-bold text-primary">{totalCount}</p>
//               <p className="text-sm text-muted-foreground mt-1">Total Tasks</p>
//             </div>
//             <div className="bg-card border-2 border-border rounded-lg p-4">
//               <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{pendingCount}</p>
//               <p className="text-sm text-muted-foreground mt-1">Pending</p>
//             </div>
//             <div className="bg-card border-2 border-border rounded-lg p-4">
//               <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{inProgressCount}</p>
//               <p className="text-sm text-muted-foreground mt-1">In Progress</p>
//             </div>
//             <div className="bg-card border-2 border-border rounded-lg p-4">
//               <p className="text-2xl font-bold text-accent">{completedCount}</p>
//               <p className="text-sm text-muted-foreground mt-1">Completed</p>
//             </div>
//           </div>
//         )}
//
//         <div className="grid lg:grid-cols-4 gap-8">
//           {/* Form Section */}
//           <div className="lg:col-span-1">
//             <div className="bg-card border-2 border-border rounded-lg p-6 shadow-sm sticky top-24 h-fit">
//               <h3 className="text-xl font-bold text-card-foreground mb-4">
//                 ➕ New Task
//               </h3>
//               <TaskForm onAddTask={handleAddTask} isLoading={isLoading} />
//             </div>
//           </div>
//
//           {/* Task Table Section */}
//           <div className="lg:col-span-3">
//             {isInitialLoading ? (
//               <div className="text-center py-12 bg-card border-2 border-border rounded-lg">
//                 <div className="text-4xl mb-4 animate-pulse">⏳</div>
//                 <p className="text-muted-foreground">Loading your tasks...</p>
//               </div>
//             ) : (
//               <TaskTable
//                 tasks={tasks}
//                 onToggleStatus={handleToggleStatus}
//                 onDeleteTask={handleDeleteTask}
//                 isLoading={isLoading}
//               />
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
