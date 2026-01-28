// 'use client';
//
// import { Task, TaskStatus } from '@/types/task';
// import { Button } from '@/components/ui/button';
// import { useState } from 'react';
//
// interface TaskTableProps {
//   tasks: Task[];
//   onToggleStatus: (id: string, status: TaskStatus) => Promise<void>;
//   onDeleteTask: (id: string) => Promise<void>;
//   isLoading: boolean;
// }
//
// export function TaskTable({
//   tasks,
//   onToggleStatus,
//   onDeleteTask,
//   isLoading,
// }: TaskTableProps) {
//   const [expandedId, setExpandedId] = useState<string | null>(null);
//
//   const getCategoryColor = (category: string) => {
//     const colors: Record<string, string> = {
//       assignment: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
//       project: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
//       study: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
//       exam: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
//       other: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
//     };
//     return colors[category] || colors.other;
//   };
//
//   const getStatusColor = (status: TaskStatus) => {
//     const colors: Record<TaskStatus, string> = {
//       pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
//       'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
//       completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
//     };
//     return colors[status];
//   };
//
//   const getStatusLabel = (status: TaskStatus) => {
//     const labels: Record<TaskStatus, string> = {
//       pending: 'Pending',
//       'in-progress': 'In Progress',
//       completed: 'Completed',
//     };
//     return labels[status];
//   };
//
//   const getNextStatus = (status: TaskStatus): TaskStatus => {
//     const cycle: Record<TaskStatus, TaskStatus> = {
//       pending: 'in-progress',
//       'in-progress': 'completed',
//       completed: 'pending',
//     };
//     return cycle[status];
//   };
//
//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric',
//     });
//   };
//
//   if (tasks.length === 0) {
//     return (
//       <div className="bg-card border-2 border-border rounded-lg p-12 text-center">
//         <div className="text-4xl mb-3">📋</div>
//         <p className="text-muted-foreground">No tasks yet. Create your first task above!</p>
//       </div>
//     );
//   }
//
//   return (
//     <div className="bg-card border-2 border-border rounded-lg overflow-hidden shadow-sm">
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-muted/50 border-b-2 border-border">
//             <tr>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
//                 Task
//               </th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
//                 Subject
//               </th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
//                 Category
//               </th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
//                 Status
//               </th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
//                 Due Date
//               </th>
//               <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-border">
//             {tasks.map((task) => (
//               <tr
//                 key={task.id}
//                 className="hover:bg-muted/30 transition-colors"
//               >
//                 <td className="px-4 py-3">
//                   <div>
//                     <p className="font-medium text-foreground line-clamp-1">
//                       {task.title}
//                     </p>
//                     {task.description && (
//                       <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
//                         {task.description}
//                       </p>
//                     )}
//                   </div>
//                 </td>
//                 <td className="px-4 py-3">
//                   <p className="text-sm font-medium text-foreground">
//                     {task.subject}
//                   </p>
//                 </td>
//                 <td className="px-4 py-3">
//                   <span
//                     className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
//                       task.category
//                     )}`}
//                   >
//                     {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
//                   </span>
//                 </td>
//                 <td className="px-4 py-3">
//                   <span
//                     className={`inline-block px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all hover:shadow-sm ${getStatusColor(
//                       task.status
//                     )}`}
//                     onClick={() => !isLoading && onToggleStatus(task.id, getNextStatus(task.status))}
//                   >
//                     {getStatusLabel(task.status)}
//                   </span>
//                 </td>
//                 <td className="px-4 py-3">
//                   <p className="text-sm text-muted-foreground">
//                     {task.dueDate ? formatDate(task.dueDate) : '—'}
//                   </p>
//                 </td>
//                 <td className="px-4 py-3">
//                   <div className="flex items-center justify-center gap-2">
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() =>
//                         setExpandedId(expandedId === task.id ? null : task.id)
//                       }
//                       className="text-muted-foreground hover:text-foreground"
//                     >
//                       {expandedId === task.id ? '▲' : '▼'}
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => !isLoading && onDeleteTask(task.id)}
//                       disabled={isLoading}
//                       className="text-destructive hover:text-destructive hover:bg-destructive/10"
//                     >
//                       ✕
//                     </Button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
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
      assignment: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
      project: 'bg-gradient-to-r from-purple-500 to-pink-600 text-white',
      study: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white',
      exam: 'bg-gradient-to-r from-red-500 to-orange-600 text-white',
      other: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white',
    };
    return colors[category] || colors.other;
  };

  const getStatusColor = (status: TaskStatus) => {
    const colors: Record<TaskStatus, string> = {
      pending: 'bg-yellow-500 text-white hover:bg-yellow-600',
      'in-progress': 'bg-blue-500 text-white hover:bg-blue-600',
      completed: 'bg-green-500 text-white hover:bg-green-600',
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
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-blue-50 to-purple-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                Task
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                Subject
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                Category
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                Due Date
              </th>
              <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tasks.map((task) => (
              <tr
                key={task.id}
                className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all"
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold text-gray-800 line-clamp-1">
                      {task.title}
                    </p>
                    {task.description && (
                      <p className="text-sm text-gray-500 line-clamp-1 mt-1">
                        {task.description}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-gray-700">
                    {task.subject}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold ${getCategoryColor(
                      task.category
                    )}`}
                  >
                    {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${getStatusColor(
                      task.status
                    )}`}
                    onClick={() => !isLoading && onToggleStatus(task.id, getNextStatus(task.status))}
                    disabled={isLoading}
                  >
                    {getStatusLabel(task.status)}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-600 font-medium">
                    {task.dueDate ? formatDate(task.dueDate) : '—'}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() =>
                        setExpandedId(expandedId === task.id ? null : task.id)
                      }
                      className="p-2 hover:bg-gray-200 rounded-lg transition-all text-gray-600"
                    >
                      {expandedId === task.id ? '▲' : '▼'}
                    </button>
                    <button
                      onClick={() => !isLoading && onDeleteTask(task.id)}
                      disabled={isLoading}
                      className="p-2 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-lg transition-all font-bold"
                    >
                      ✕
                    </button>
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

