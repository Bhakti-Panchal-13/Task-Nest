import { promises as fs } from 'fs';
import { join } from 'path';
import { NextRequest, NextResponse } from 'next/server';

const DATA_DIR = process.cwd();
const TASKS_FILE = join(DATA_DIR, 'data', 'tasks.json');

interface Task {
  id: string;
  title: string;
  description: string;
  subject: string;
  category: 'assignment' | 'project' | 'study' | 'exam' | 'other';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate?: string;
  createdAt: string;
}

async function ensureDataDir() {
  try {
    await fs.access(join(DATA_DIR, 'data'));
  } catch {
    await fs.mkdir(join(DATA_DIR, 'data'), { recursive: true });
  }
}

async function readTasks(): Promise<Task[]> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(TASKS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeTasks(tasks: Task[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2), 'utf-8');
}

export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
    }

    const body = await request.json();
    const tasks = await readTasks();

    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    if (body.status !== undefined) {
      tasks[taskIndex].status = body.status;
    }
    if (body.title !== undefined) {
      tasks[taskIndex].title = body.title.trim();
    }
    if (body.description !== undefined) {
      tasks[taskIndex].description = body.description.trim();
    }
    if (body.subject !== undefined) {
      tasks[taskIndex].subject = body.subject.trim();
    }
    if (body.category !== undefined) {
      tasks[taskIndex].category = body.category;
    }
    if (body.dueDate !== undefined) {
      tasks[taskIndex].dueDate = body.dueDate;
    }

    await writeTasks(tasks);
    return NextResponse.json(tasks[taskIndex]);
  } catch (error) {
    console.error('[v0] Error updating task:', error);
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
    }

    let tasks = await readTasks();

    const initialLength = tasks.length;
    tasks = tasks.filter((task) => task.id !== id);

    if (tasks.length === initialLength) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    await writeTasks(tasks);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[v0] Error deleting task:', error);
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}
