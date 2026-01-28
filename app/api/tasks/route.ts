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

export async function GET() {
  try {
    const tasks = await readTasks();
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error reading tasks:', error);
    return NextResponse.json(
      { error: 'Failed to read tasks' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, subject, category, status, dueDate } = body;

    if (!title || !title.trim() || !subject || !subject.trim()) {
      return NextResponse.json(
        { error: 'Task title and subject are required' },
        { status: 400 }
      );
    }

    const tasks = await readTasks();
    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description?.trim() || '',
      subject: subject.trim(),
      category: category || 'other',
      status: status || 'pending',
      dueDate: dueDate || undefined,
      createdAt: new Date().toISOString(),
    };

    tasks.unshift(newTask);
    await writeTasks(tasks);

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}
