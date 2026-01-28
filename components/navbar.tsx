'use client';

import Image from 'next/image';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 bg-white rounded-xl p-1 shadow-md">
              <Image
                src="/task-hub-logo.jpg"
                alt="TaskNest Logo"
                fill
                className="object-contain p-1"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                TaskNest
              </h1>
              <p className="text-xs text-white/90 font-medium">
                Your Learning Companion
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-white/95">
            <span className="text-md font-semibold"> Stay Organized • Stay Focused • Succeed</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

// 'use client';
//
// import Image from 'next/image';
//
// export function Navbar() {
//   return (
//     <nav className="sticky top-0 z-50 bg-gradient-to-r from-primary to-secondary shadow-lg">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex items-center gap-3">
//             <div className="relative w-10 h-10">
//               <Image
//                 src="/task-hub-logo.jpg"
//                 alt="TaskNest Logo"
//                 fill
//                 className="object-contain"
//               />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold text-primary-foreground">
//                 TaskNest
//               </h1>
//               <p className="text-xs text-primary-foreground/80">
//                 Student Task Manager
//               </p>
//             </div>
//           </div>
//           <div className="hidden sm:flex items-center gap-1 text-primary-foreground/90">
//             <span className="text-sm">📚 Organize • Complete • Succeed</span>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }
