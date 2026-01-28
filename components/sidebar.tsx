'use client';

export function Sidebar() {
  return (
    <aside className="w-full bg-gradient-to-b from-blue-600/70 to-blue-700/70 rounded-3xl p-6 h-fit sticky top-24 backdrop-blur-sm border border-blue-400/30 shadow-lg">
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
          <h3 className="text-white font-bold text-base mb-3">Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/80 text-xs font-medium">Focus Today</span>
              <span className="text-white font-bold text-sm">3/5</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-1.5">
              <div className="bg-orange-400 h-1.5 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          <div className="bg-white/20 rounded-xl p-2.5 text-white font-semibold text-xs cursor-pointer hover:bg-white/30 transition-all">
            📋 All Tasks
          </div>
          <div className="bg-white/10 rounded-xl p-2.5 text-white/80 font-medium text-xs cursor-pointer hover:bg-white/20 transition-all">
            ⚡ In Progress
          </div>
          <div className="bg-white/10 rounded-xl p-2.5 text-white/80 font-medium text-xs cursor-pointer hover:bg-white/20 transition-all">
            ✅ Completed
          </div>
          <div className="bg-white/10 rounded-xl p-2.5 text-white/80 font-medium text-xs cursor-pointer hover:bg-white/20 transition-all">
            📌 Pending
          </div>
        </nav>

        {/* Motivational Card */}
        <div className="bg-gradient-to-br from-orange-400/60 to-pink-500/60 rounded-2xl p-4 text-white backdrop-blur-sm border border-orange-300/30">
          <p className="text-xs font-semibold mb-2">Tip of the Day</p>
          <p className="text-xs leading-relaxed text-white/90">Start with the hardest task first!</p>
        </div>
      </div>
    </aside>
  );
}
