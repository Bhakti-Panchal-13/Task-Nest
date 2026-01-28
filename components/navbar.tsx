'use client';

import Image from 'next/image';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-primary to-secondary shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image
                src="/task-hub-logo.jpg"
                alt="TaskNest Logo"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary-foreground">
                TaskNest
              </h1>
              <p className="text-xs text-primary-foreground/80">
                Student Task Manager
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-primary-foreground/90">
            <span className="text-sm">📚 Organize • Complete • Succeed</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
