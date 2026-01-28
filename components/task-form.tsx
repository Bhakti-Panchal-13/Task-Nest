// 'use client';
//
// import React from "react"
//
// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import type { TaskCategory, TaskStatus } from '@/types/task';
//
// interface TaskFormProps {
//   onAddTask: (title: string, description: string, subject: string, category: TaskCategory, status: TaskStatus, dueDate?: string) => Promise<void>;
//   isLoading: boolean;
// }
//
// export function TaskForm({ onAddTask, isLoading }: TaskFormProps) {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [subject, setSubject] = useState('');
//   const [category, setCategory] = useState<TaskCategory>('assignment');
//   const [status, setStatus] = useState<TaskStatus>('pending');
//   const [dueDate, setDueDate] = useState('');
//
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!title.trim() || !subject.trim()) return;
//
//     await onAddTask(title, description, subject, category, status, dueDate || undefined);
//     setTitle('');
//     setDescription('');
//     setSubject('');
//     setCategory('assignment');
//     setStatus('pending');
//     setDueDate('');
//   };
//
//   return (
//     <form onSubmit={handleSubmit} className="space-y-3">
//       <div className="space-y-1.5">
//         <label htmlFor="title" className="text-sm font-semibold text-foreground">
//           Task Title *
//         </label>
//         <Input
//           id="title"
//           placeholder="e.g., Complete Math Homework..."
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           disabled={isLoading}
//           className="border-2 border-input focus:border-primary text-sm"
//         />
//       </div>
//
//       <div className="space-y-1.5">
//         <label htmlFor="subject" className="text-sm font-semibold text-foreground">
//           Subject *
//         </label>
//         <Input
//           id="subject"
//           placeholder="e.g., Mathematics..."
//           value={subject}
//           onChange={(e) => setSubject(e.target.value)}
//           disabled={isLoading}
//           className="border-2 border-input focus:border-primary text-sm"
//         />
//       </div>
//
//       <div className="space-y-1.5">
//         <label htmlFor="category" className="text-sm font-semibold text-foreground">
//           Category
//         </label>
//         <select
//           id="category"
//           value={category}
//           onChange={(e) => setCategory(e.target.value as TaskCategory)}
//           disabled={isLoading}
//           className="w-full px-3 py-2 border-2 border-input rounded-md bg-background text-foreground text-sm focus:border-primary focus:outline-none"
//         >
//           <option value="assignment">Assignment</option>
//           <option value="project">Project</option>
//           <option value="study">Study</option>
//           <option value="exam">Exam</option>
//           <option value="other">Other</option>
//         </select>
//       </div>
//
//       <div className="space-y-1.5">
//         <label htmlFor="status" className="text-sm font-semibold text-foreground">
//           Status
//         </label>
//         <select
//           id="status"
//           value={status}
//           onChange={(e) => setStatus(e.target.value as TaskStatus)}
//           disabled={isLoading}
//           className="w-full px-3 py-2 border-2 border-input rounded-md bg-background text-foreground text-sm focus:border-primary focus:outline-none"
//         >
//           <option value="pending">Pending</option>
//           <option value="in-progress">In Progress</option>
//           <option value="completed">Completed</option>
//         </select>
//       </div>
//
//       <div className="space-y-1.5">
//         <label htmlFor="description" className="text-sm font-semibold text-foreground">
//           Description (Optional)
//         </label>
//         <textarea
//           id="description"
//           placeholder="Add more details about your task..."
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           disabled={isLoading}
//           className="w-full px-3 py-2 border-2 border-input rounded-md bg-background text-foreground text-sm focus:border-primary focus:outline-none resize-none"
//           rows={2}
//         />
//       </div>
//
//       <div className="space-y-1.5">
//         <label htmlFor="dueDate" className="text-sm font-semibold text-foreground">
//           Due Date (Optional)
//         </label>
//         <Input
//           id="dueDate"
//           type="date"
//           value={dueDate}
//           onChange={(e) => setDueDate(e.target.value)}
//           disabled={isLoading}
//           className="border-2 border-input focus:border-primary text-sm"
//         />
//       </div>
//
//       <Button
//         type="submit"
//         disabled={isLoading || !title.trim() || !subject.trim()}
//         className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 rounded-lg transition-all"
//       >
//         {isLoading ? (
//           <span className="flex items-center gap-2">
//             <span className="animate-spin">⏳</span> Adding Task...
//           </span>
//         ) : (
//           <span className="flex items-center gap-2">
//             <span>✨</span> Add Task
//           </span>
//         )}
//       </Button>
//     </form>
//   );
// }
'use client';

import React from "react"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { TaskCategory, TaskStatus } from '@/types/task';

interface TaskFormProps {
  onAddTask: (title: string, description: string, subject: string, category: TaskCategory, status: TaskStatus, dueDate?: string) => Promise<void>;
  isLoading: boolean;
}

export function TaskForm({ onAddTask, isLoading }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<TaskCategory>('assignment');
  const [status, setStatus] = useState<TaskStatus>('pending');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !subject.trim()) return;

    await onAddTask(title, description, subject, category, status, dueDate || undefined);
    setTitle('');
    setDescription('');
    setSubject('');
    setCategory('assignment');
    setStatus('pending');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="space-y-1">
        <label htmlFor="title" className="text-xs font-bold text-gray-700 block">
          Title *
        </label>
        <Input
          id="title"
          placeholder="Task name..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading}
          className="border-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500 text-xs bg-white h-8"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="subject" className="text-xs font-bold text-gray-700 block">
          Subject *
        </label>
        <Input
          id="subject"
          placeholder="Math, Physics..."
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          disabled={isLoading}
          className="border-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500 text-xs bg-white h-8"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <label htmlFor="category" className="text-xs font-bold text-gray-700 block">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as TaskCategory)}
            disabled={isLoading}
            className="w-full px-2 py-1.5 border-2 border-blue-200 rounded-lg bg-white text-gray-700 text-xs focus:border-blue-500 focus:outline-none h-8"
          >
            <option value="assignment">Assignment</option>
            <option value="project">Project</option>
            <option value="study">Study</option>
            <option value="exam">Exam</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="space-y-1">
          <label htmlFor="status" className="text-xs font-bold text-gray-700 block">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
            disabled={isLoading}
            className="w-full px-2 py-1.5 border-2 border-blue-200 rounded-lg bg-white text-gray-700 text-xs focus:border-blue-500 focus:outline-none h-8"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label htmlFor="description" className="text-xs font-bold text-gray-700 block">
          Details
        </label>
        <textarea
          id="description"
          placeholder="Add notes..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
          className="w-full px-2 py-1.5 border-2 border-blue-200 rounded-lg bg-white text-gray-700 text-xs focus:border-blue-500 focus:outline-none resize-none"
          rows={2}
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="dueDate" className="text-xs font-bold text-gray-700 block">
          Due Date
        </label>
        <Input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          disabled={isLoading}
          className="border-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500 text-xs bg-white h-8"
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading || !title.trim() || !subject.trim()}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 rounded-lg transition-all shadow-lg hover:shadow-xl text-sm"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-1 text-xs">
            <span className="animate-spin">⏳</span> Adding...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-1 text-xs">
            <span>✨</span> Add Task
          </span>
        )}
      </Button>
    </form>
  );
}
