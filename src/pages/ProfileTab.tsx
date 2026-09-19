import React from 'react';
import { User, Flame, Gem, Trophy, Shield, Settings, Sparkles, Award } from 'lucide-react';

interface ProfileTabProps {
  streak?: number;
  xp?: number;
  course?: string;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  streak = 12,
  xp = 450,
  course = 'Class 10 Math (CBSE)',
}) => {
  const achievements = [
    { title: 'Pythagoras Master', desc: 'Solved 10 right triangle proofs', icon: Trophy, unlocked: true },
    { title: 'Quadratic Knight', desc: 'Conquered Unit 1 Castle Challenge', icon: Shield, unlocked: true },
    { title: 'Trig Explorer', desc: 'Calculated 15 sine/cosine ratios', icon: Award, unlocked: true },
    { title: 'Perfect Week', desc: 'Maintained a 7-day practice streak', icon: Flame, unlocked: true },
    { title: 'Board Ready', desc: 'Score 90%+ on full sample mock', icon: Sparkles, unlocked: false },
  ];

  return (
    <div id="profile-tab-view" className="max-w-md mx-auto px-4 py-6">
      {/* Student Profile Card */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-2xs mb-6 text-center">
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-emerald-500 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
          <User className="w-10 h-10" />
          <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-900">
            10
          </span>
        </div>

        <h2 className="text-lg font-extrabold text-slate-900">Rohan Patel</h2>
        <p className="text-xs font-semibold text-blue-600 mb-4">{course}</p>

        {/* Counters Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-orange-50/80 border border-orange-200/70 rounded-2xl p-3 flex items-center justify-center gap-2">
            <Flame className="w-5 h-5 fill-orange-500 text-orange-500" />
            <div className="text-left">
              <div className="text-base font-black text-orange-600">{streak} Days</div>
              <div className="text-[10px] font-bold text-orange-700 uppercase">Streak</div>
            </div>
          </div>

          <div className="bg-blue-50/80 border border-blue-200/70 rounded-2xl p-3 flex items-center justify-center gap-2">
            <Gem className="w-5 h-5 fill-blue-500 text-blue-500" />
            <div className="text-left">
              <div className="text-base font-black text-blue-600">{xp} XP</div>
              <div className="text-[10px] font-bold text-blue-700 uppercase">Total XP</div>
            </div>
          </div>
        </div>
      </div>

      {/* Badges / Achievements */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-2xs">
        <h3 className="font-extrabold text-base text-slate-900 mb-3">
          Badges & Achievements
        </h3>

        <div className="space-y-3">
          {achievements.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`p-3 rounded-2xl flex items-center gap-3 border ${
                  item.unlocked
                    ? 'bg-slate-50 border-slate-200/80'
                    : 'bg-slate-100/60 border-slate-200 opacity-60'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    item.unlocked
                      ? 'bg-amber-100 text-amber-600'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-extrabold text-slate-900">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    {item.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
