import React from 'react';
import { User, Flame, Gem, Trophy, Shield, Settings, Sparkles, Award, Target, BookOpen, CheckCircle } from 'lucide-react';

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
    { title: 'Speed Solver', desc: 'Solved 5 duel steps in under 3 minutes', icon: Sparkles, unlocked: true },
    { title: 'Board Ready', desc: 'Score 90%+ on full sample mock', icon: Target, unlocked: false },
  ];

  return (
    <div id="profile-tab-view" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Student Profile & Stats */}
        <div className="lg:col-span-5 space-y-5">
          {/* Student Profile Card */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 shadow-xs text-center">
            <div className="relative w-24 h-24 rounded-full bg-[#333333] text-[#FFE757] flex items-center justify-center mx-auto mb-3 shadow-xs border-2 border-[#E5E7EB]">
              <User className="w-12 h-12" />
              <span className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#FFE757] border-2 border-white flex items-center justify-center text-xs font-bold text-[#333333] shadow-xs">
                10
              </span>
            </div>

            <h2 className="text-xl font-bold text-[#333333] mb-0.5">Rohan Patel</h2>
            <p className="text-xs font-medium text-[#64748B] mb-5">{course}</p>

            {/* Counters Summary */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-[#F8F6EE] border border-[#E5E7EB] rounded-lg p-3.5 flex items-center justify-center gap-2.5">
                <Flame className="w-6 h-6 fill-[#EF3F52] text-[#EF3F52] shrink-0" />
                <div className="text-left">
                  <div className="text-lg font-bold text-[#333333] tabular-nums">{streak} Days</div>
                  <div className="text-[10px] font-bold text-[#64748B] uppercase">Streak</div>
                </div>
              </div>

              <div className="bg-[#F8F6EE] border border-[#E5E7EB] rounded-lg p-3.5 flex items-center justify-center gap-2.5">
                <Gem className="w-6 h-6 fill-[#FFE757] text-[#EF3F52] shrink-0" />
                <div className="text-left">
                  <div className="text-lg font-bold text-[#333333] tabular-nums">{xp} XP</div>
                  <div className="text-[10px] font-bold text-[#64748B] uppercase">Total XP</div>
                </div>
              </div>
            </div>

            {/* Additional Quick Stats */}
            <div className="grid grid-cols-2 gap-2 text-left pt-4 border-t border-[#E5E7EB] text-xs">
              <div className="p-2.5 rounded-md bg-[#F8F6EE] border border-[#E5E7EB]">
                <span className="text-[#64748B] font-medium block text-[10px] uppercase">Accuracy</span>
                <span className="text-[#333333] font-bold text-sm tabular-nums">88.4%</span>
              </div>
              <div className="p-2.5 rounded-md bg-[#F8F6EE] border border-[#E5E7EB]">
                <span className="text-[#64748B] font-medium block text-[10px] uppercase">Solved</span>
                <span className="text-[#333333] font-bold text-sm tabular-nums">142 Steps</span>
              </div>
            </div>
          </div>

          {/* Practice Settings / Goals Card */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-[#64748B]" />
                <h3 className="font-bold text-sm text-[#333333]">Study Preferences</h3>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-md bg-[#F8F6EE] border border-[#E5E7EB]">
                <span className="font-bold text-[#333333]">Daily Goal Target</span>
                <span className="font-bold text-[#333333] bg-[#FFE757] px-2 py-0.5 rounded-full border border-[#E5E7EB]">50 XP / Day</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-md bg-[#F8F6EE] border border-[#E5E7EB]">
                <span className="font-bold text-[#333333]">Board Syllabus</span>
                <span className="font-medium text-[#64748B]">CBSE Class 10 (2026)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-md bg-[#F8F6EE] border border-[#E5E7EB]">
                <span className="font-bold text-[#333333]">Sound Effects & Haptics</span>
                <span className="font-bold text-[#EF3F52]">Enabled</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Badges & Syllabus Milestones */}
        <div className="lg:col-span-7 space-y-5">
          {/* Badges / Achievements */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-[#333333]">
                  Badges & Achievements
                </h3>
                <p className="text-xs text-[#64748B]">5 of 6 badges earned</p>
              </div>
              <span className="text-xs font-bold text-[#333333] bg-[#FFE757] px-2.5 py-1 rounded-full border border-[#E5E7EB]">
                83% Unlocked
              </span>
            </div>

            {/* Badges Grid (2 columns on md/lg screens) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {achievements.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className={`p-3.5 rounded-lg flex items-center gap-3.5 border transition-all ${
                      item.unlocked
                        ? 'bg-[#F8F6EE] border-[#E5E7EB] hover:border-[#EF3F52]'
                        : 'bg-white border-[#E5E7EB] opacity-50'
                    }`}
                  >
                    <div
                      className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 shadow-2xs ${
                        item.unlocked
                          ? 'bg-[#FFE757] text-[#EF3F52]'
                          : 'bg-[#E5E7EB] text-[#AAAAAA]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-[#333333] flex items-center gap-1.5">
                        <span>{item.title}</span>
                        {item.unlocked && (
                          <CheckCircle className="w-3.5 h-3.5 text-[#EF3F52] shrink-0" />
                        )}
                      </div>
                      <div className="text-[11px] text-[#64748B] truncate font-light">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Syllabus Milestones Summary */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-[#333333]">
                Curriculum Progression
              </h3>
              <span className="text-xs font-bold text-[#EF3F52]">Overall 65% Completed</span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className="text-[#333333]">Unit 1: Real Numbers & Quadratic Equations</span>
                  <span className="text-[#EF3F52] tabular-nums font-bold">100% Complete</span>
                </div>
                <div className="w-full h-2.5 bg-[#F8F6EE] border border-[#E5E7EB] rounded-full overflow-hidden">
                  <div className="h-full bg-[#FFE757] rounded-full w-full" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className="text-[#333333]">Unit 2: Trigonometry & Triangles</span>
                  <span className="text-[#333333] tabular-nums font-bold">40% In Progress</span>
                </div>
                <div className="w-full h-2.5 bg-[#F8F6EE] border border-[#E5E7EB] rounded-full overflow-hidden">
                  <div className="h-full bg-[#FFE757] rounded-full w-2/5" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className="text-[#333333]">Unit 3: Coordinate Geometry & Circles</span>
                  <span className="text-[#AAAAAA] tabular-nums font-medium">Locked</span>
                </div>
                <div className="w-full h-2.5 bg-[#F8F6EE] border border-[#E5E7EB] rounded-full overflow-hidden">
                  <div className="h-full bg-[#E5E7EB] rounded-full w-0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;

