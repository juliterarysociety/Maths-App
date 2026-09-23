import React from 'react';
import { Trophy, Swords, Zap, Crown, Flame, Users, Sparkles, Shield, ArrowRight, Play } from 'lucide-react';

export const ArenaTab: React.FC = () => {
  const leaderboard = [
    { rank: 1, name: 'Aarav Sharma', xp: 2450, streak: 28, badge: 'Gold League' },
    { rank: 2, name: 'Ananya Verma', xp: 2180, streak: 21, badge: 'Gold League' },
    { rank: 3, name: 'Rohan Patel (You)', xp: 1850, streak: 12, badge: 'Silver League' },
    { rank: 4, name: 'Diya Mukherjee', xp: 1620, streak: 9, badge: 'Silver League' },
    { rank: 5, name: 'Kavya Nair', xp: 1490, streak: 14, badge: 'Silver League' },
    { rank: 6, name: 'Arjun Das', xp: 1320, streak: 7, badge: 'Silver League' },
    { rank: 7, name: 'Pooja Reddy', xp: 1180, streak: 11, badge: 'Silver League' },
  ];

  const duelModes = [
    {
      title: 'Trig Lightning',
      desc: '5 rapid angle & identity steps',
      reward: '+30 XP',
      color: 'from-amber-500 to-orange-600',
    },
    {
      title: 'Geometry Blitz',
      desc: 'Pythagorean & circle tangent speedrun',
      reward: '+35 XP',
      color: 'from-blue-600 to-indigo-600',
    },
    {
      title: 'Algebra Sprint',
      desc: 'Quadratic roots & discriminant duel',
      reward: '+25 XP',
      color: 'from-emerald-600 to-teal-600',
    },
  ];

  return (
    <div id="arena-tab-view" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Matchmaking & Arena Modes */}
        <div className="lg:col-span-5 space-y-5">
          {/* 1v1 Battle Banner */}
          <div className="bg-[#333333] text-white rounded-lg p-6 shadow-xs border border-[#E5E7EB]">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFE757] mb-2">
              <Swords className="w-4 h-4 text-[#FFE757]" />
              <span>Real-time Math Duel</span>
            </div>
            <h2 className="text-2xl font-bold mb-1 tracking-tight">
              Speed Duel Arena
            </h2>
            <p className="text-xs text-white/80 leading-relaxed mb-5 font-light">
              Solve 5 rapid Class 10 trigonometry & algebra micro-steps against a live opponent! Earn trophies and climb the leaderboards.
            </p>

            <button
              type="button"
              aria-label="Find real-time match in speed duel arena"
              className="w-full h-[41px] px-[35px] rounded-[20px] bg-[#FFE757] text-[#EF3F52] font-bold text-sm shadow-xs hover:bg-[#EF3F52] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFE757] active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Find Match (Fast Queue)</span>
            </button>
          </div>

          {/* Quick Duel Modes */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-[#333333]">
                Specialized Duel Arenas
              </h3>
              <span className="text-[11px] font-bold text-[#64748B]">Class 10 CBSE</span>
            </div>

            <div className="space-y-2.5">
              {duelModes.map((mode) => (
                <div
                  key={mode.title}
                  className="p-3 rounded-md bg-[#F8F6EE] border border-[#E5E7EB] hover:border-[#EF3F52] transition-colors flex items-center justify-between gap-3"
                >
                  <div>
                    <h4 className="text-xs font-bold text-[#333333]">{mode.title}</h4>
                    <p className="text-[11px] text-[#64748B] font-light">{mode.desc}</p>
                  </div>
                  <span className="text-xs font-bold text-[#333333] bg-[#FFE757] border border-[#E5E7EB] px-2 py-0.5 rounded-full shrink-0 tabular-nums">
                    {mode.reward}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Weekly Leaderboard & League Standings */}
        <div className="lg:col-span-7 space-y-5">
          {/* Weekly Leaderboard */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 shadow-xs">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-lg bg-[#F8F6EE] text-[#EF3F52]">
                  <Trophy className="w-5 h-5 text-[#EF3F52]" />
                </span>
                <div>
                  <h3 className="font-bold text-base text-[#333333] leading-tight">
                    Class 10 Weekly League
                  </h3>
                  <p className="text-xs text-[#64748B]">Season ends Sunday midnight</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#333333] bg-[#FFE757] px-2.5 py-1 rounded-full border border-[#E5E7EB]">
                Top 3 Advance
              </span>
            </div>

            {/* Podium Highlights for Top 3 */}
            <div className="grid grid-cols-3 gap-2.5 mb-5 p-3 rounded-lg bg-[#F8F6EE] border border-[#E5E7EB] text-center">
              {/* 2nd place */}
              <div className="flex flex-col items-center justify-end">
                <div className="w-10 h-10 rounded-full bg-white text-[#333333] font-bold flex items-center justify-center text-sm border border-[#E5E7EB] mb-1">
                  2
                </div>
                <div className="text-xs font-bold text-[#333333] truncate w-full">Ananya</div>
                <div className="text-[11px] font-bold text-[#64748B] tabular-nums">2,180 XP</div>
              </div>

              {/* 1st place */}
              <div className="flex flex-col items-center justify-end -mt-2">
                <Crown className="w-5 h-5 text-[#EF3F52] mb-0.5 fill-[#EF3F52]" />
                <div className="w-12 h-12 rounded-full bg-[#FFE757] text-[#333333] font-bold flex items-center justify-center text-base border-2 border-white shadow-xs mb-1">
                  1
                </div>
                <div className="text-xs font-bold text-[#333333] truncate w-full">Aarav</div>
                <div className="text-[11px] font-bold text-[#EF3F52] tabular-nums">2,450 XP</div>
              </div>

              {/* 3rd place */}
              <div className="flex flex-col items-center justify-end">
                <div className="w-10 h-10 rounded-full bg-white text-[#333333] font-bold flex items-center justify-center text-sm border border-[#E5E7EB] mb-1">
                  3
                </div>
                <div className="text-xs font-bold text-[#333333] truncate w-full">Rohan (You)</div>
                <div className="text-[11px] font-bold text-[#EF3F52] tabular-nums">1,850 XP</div>
              </div>
            </div>

            {/* Full Competitors List */}
            <div className="space-y-2">
              {leaderboard.map((user) => (
                <div
                  key={user.rank}
                  className={`p-3.5 rounded-lg flex items-center justify-between gap-3 transition-colors ${
                    user.name.includes('(You)')
                      ? 'bg-[#F8F6EE] border border-[#FFE757] text-[#333333] font-bold shadow-xs'
                      : 'bg-white border border-[#E5E7EB] hover:bg-[#F8F6EE] text-[#333333]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        user.rank === 1
                          ? 'bg-[#FFE757] text-[#333333] shadow-xs'
                          : user.rank === 2
                          ? 'bg-white border border-[#E5E7EB] text-[#333333]'
                          : user.rank === 3
                          ? 'bg-white border border-[#E5E7EB] text-[#333333]'
                          : 'bg-[#F8F6EE] text-[#64748B]'
                      }`}
                    >
                      {user.rank}
                    </span>
                    <div>
                      <div className="text-xs sm:text-sm font-bold flex items-center gap-1.5 text-[#333333]">
                        <span>{user.name}</span>
                        {user.name.includes('(You)') && (
                          <span className="text-[9px] uppercase px-1.5 py-0.2 rounded-full bg-[#FFE757] text-[#333333] font-bold">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-[#64748B]">
                        <span className="flex items-center gap-0.5 text-[#EF3F52] font-semibold tabular-nums">
                          <Flame className="w-3 h-3 fill-[#EF3F52]" />
                          {user.streak}d streak
                        </span>
                        <span>•</span>
                        <span>{user.badge}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs sm:text-sm font-bold text-[#333333] tabular-nums">
                      {user.xp} XP
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArenaTab;

