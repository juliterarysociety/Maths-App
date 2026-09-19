import React from 'react';
import { Trophy, Swords, Zap, Crown, Flame, Users, Sparkles } from 'lucide-react';

export const ArenaTab: React.FC = () => {
  const leaderboard = [
    { rank: 1, name: 'Aarav Sharma', xp: 2450, streak: 28, badge: 'Gold League' },
    { rank: 2, name: 'Ananya Verma', xp: 2180, streak: 21, badge: 'Gold League' },
    { rank: 3, name: 'Rohan Patel (You)', xp: 1850, streak: 12, badge: 'Silver League' },
    { rank: 4, name: 'Diya Mukherjee', xp: 1620, streak: 9, badge: 'Silver League' },
    { rank: 5, name: 'Kavya Nair', xp: 1490, streak: 14, badge: 'Silver League' },
  ];

  return (
    <div id="arena-tab-view" className="max-w-md mx-auto px-4 py-6">
      {/* 1v1 Battle Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white rounded-3xl p-5 mb-6 shadow-md shadow-orange-500/20">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-100 mb-1">
          <Swords className="w-4 h-4" />
          <span>Real-time Math Duel</span>
        </div>
        <h2 className="text-xl font-extrabold mb-1">Speed Duel Arena</h2>
        <p className="text-xs text-amber-50 leading-relaxed mb-4">
          Solve 5 rapid Class 10 trigonometry & algebra micro-steps against a live opponent!
        </p>

        <button
          type="button"
          className="w-full py-3 rounded-2xl bg-white text-orange-600 font-extrabold text-sm shadow-md hover:bg-amber-50 active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4 fill-orange-500 text-orange-500" />
          <span>Find Match (Fast Queue)</span>
        </button>
      </div>

      {/* Weekly Leaderboard */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h3 className="font-extrabold text-base text-slate-900">
              Class 10 Weekly League
            </h3>
          </div>
          <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
            Top 3 Advance
          </span>
        </div>

        <div className="space-y-2">
          {leaderboard.map((user) => (
            <div
              key={user.rank}
              className={`p-3 rounded-2xl flex items-center justify-between gap-3 ${
                user.name.includes('(You)')
                  ? 'bg-blue-50 border border-blue-200 text-blue-950 font-bold'
                  : 'bg-slate-50 border border-slate-100 text-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 ${
                    user.rank === 1
                      ? 'bg-amber-400 text-white'
                      : user.rank === 2
                      ? 'bg-slate-300 text-slate-700'
                      : user.rank === 3
                      ? 'bg-amber-700 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {user.rank}
                </span>
                <div>
                  <div className="text-xs font-extrabold">{user.name}</div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500">
                    <span className="flex items-center gap-0.5 text-orange-600 font-semibold">
                      <Flame className="w-2.5 h-2.5 fill-orange-500" />
                      {user.streak}d
                    </span>
                    <span>•</span>
                    <span>{user.badge}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-black text-amber-600">
                  {user.xp} XP
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArenaTab;
