import React, { useState } from 'react';
import {
  TrendingUp,
  CheckCircle,
  Target,
  ArrowUpRight,
  Flame,
  Zap,
  Calendar,
  Sparkles,
  BarChart3,
  Award
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  ReferenceLine
} from 'recharts';

interface DailyXpPoint {
  day: string;
  fullDate: string;
  xp: number;
  goal: number;
  completed: boolean;
  isToday?: boolean;
}

const WEEKLY_XP_DATA: DailyXpPoint[] = [
  { day: 'Wed', fullDate: 'Sep 16', xp: 45, goal: 50, completed: false },
  { day: 'Thu', fullDate: 'Sep 17', xp: 70, goal: 50, completed: true },
  { day: 'Fri', fullDate: 'Sep 18', xp: 60, goal: 50, completed: true },
  { day: 'Sat', fullDate: 'Sep 19', xp: 85, goal: 50, completed: true },
  { day: 'Sun', fullDate: 'Sep 20', xp: 40, goal: 50, completed: false },
  { day: 'Mon', fullDate: 'Sep 21', xp: 75, goal: 50, completed: true },
  { day: 'Today', fullDate: 'Sep 22', xp: 95, goal: 50, completed: true, isToday: true },
];

const DAILY_GOAL = 50;

// Custom Gamified Tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data: DailyXpPoint = payload[0].payload;
    const isGoalMet = data.xp >= data.goal;

    return (
      <div className="bg-[#333333] text-white px-3 py-2 rounded-md shadow-md border border-[#E5E7EB] text-xs">
        <div className="flex items-center justify-between gap-3 mb-1">
          <span className="font-bold text-white">
            {data.day} ({data.fullDate})
          </span>
          {data.isToday && (
            <span className="bg-[#FFE757] text-[#333333] text-[10px] font-bold px-1.5 py-0.5 rounded">
              Today
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-[#FFE757] font-bold text-sm mb-1">
          <Zap className="w-4 h-4 fill-[#FFE757] text-[#FFE757]" />
          <span>{data.xp} XP Earned</span>
        </div>
        <div className="text-[11px] font-normal text-white/80 flex items-center gap-1">
          {isGoalMet ? (
            <>
              <CheckCircle className="w-3 h-3 text-[#FFE757]" />
              <span className="text-[#FFE757]">Daily goal achieved!</span>
            </>
          ) : (
            <>
              <span className="text-white/70">
                {data.goal - data.xp} XP away from goal ({data.goal} XP)
              </span>
            </>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export const AnalyticsTab: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | string | null>(null);

  const totalWeeklyXp = WEEKLY_XP_DATA.reduce((acc, curr) => acc + curr.xp, 0);
  const avgDailyXp = Math.round(totalWeeklyXp / WEEKLY_XP_DATA.length);
  const daysGoalMet = WEEKLY_XP_DATA.filter((d) => d.xp >= d.goal).length;

  const topics = [
    { name: 'Quadratic Equations & Polynomials', weightage: '12 Marks in Board', mastery: 96, state: 'Mastered' },
    { name: 'Triangles & Trigonometry', weightage: '14 Marks in Board', mastery: 72, state: 'In Progress' },
    { name: 'Circles & Tangents', weightage: '9 Marks in Board', mastery: 45, state: 'Needs Practice' },
    { name: 'Coordinate Geometry', weightage: '6 Marks in Board', mastery: 30, state: 'Beginning' },
  ];

  return (
    <div id="analytics-tab-view" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Overview Cards (2 cols on mobile, 4 cols on desktop) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 shadow-xs">
          <div className="flex items-center justify-between text-[#64748B] text-xs font-bold mb-1">
            <span>Overall Accuracy</span>
            <Target className="w-4 h-4 text-[#EF3F52]" />
          </div>
          <div className="text-2xl font-bold text-[#333333] tabular-nums">88.4%</div>
          <span className="text-[11px] text-[#EF3F52] font-semibold flex items-center gap-0.5 mt-0.5">
            <ArrowUpRight className="w-3 h-3" /> +4.2% this week
          </span>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 shadow-xs">
          <div className="flex items-center justify-between text-[#64748B] text-xs font-bold mb-1">
            <span>Problems Solved</span>
            <CheckCircle className="w-4 h-4 text-[#EF3F52]" />
          </div>
          <div className="text-2xl font-bold text-[#333333] tabular-nums">142</div>
          <span className="text-[11px] text-[#333333] font-semibold flex items-center gap-0.5 mt-0.5">
            Class 10 CBSE Target
          </span>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 shadow-xs">
          <div className="flex items-center justify-between text-[#64748B] text-xs font-bold mb-1">
            <span>Weekly Study Time</span>
            <Flame className="w-4 h-4 text-[#EF3F52]" />
          </div>
          <div className="text-2xl font-bold text-[#333333] tabular-nums">4.8 Hrs</div>
          <span className="text-[11px] text-[#64748B] font-semibold flex items-center gap-0.5 mt-0.5">
            Consistent Pace
          </span>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 shadow-xs">
          <div className="flex items-center justify-between text-[#64748B] text-xs font-bold mb-1">
            <span>Daily Streak</span>
            <Zap className="w-4 h-4 text-[#EF3F52]" />
          </div>
          <div className="text-2xl font-bold text-[#333333] tabular-nums">12 Days</div>
          <span className="text-[11px] text-[#EF3F52] font-semibold flex items-center gap-0.5 mt-0.5">
            Personal Record 🔥
          </span>
        </div>
      </div>

      {/* Main Charts & Breakdown Section (Stacked on mobile, 2 cols on lg screens) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Weekly Activity Chart Card (Recharts) */}
        <div
          id="weekly-activity-chart-card"
          className="lg:col-span-7 bg-white border border-[#E5E7EB] rounded-lg p-5 shadow-xs"
        >
        {/* Card Header with Stats */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-[#F8F6EE] text-[#EF3F52]">
                <BarChart3 className="w-4 h-4" />
              </span>
              <h3 className="font-bold text-base text-[#333333]">
                Weekly XP Activity
              </h3>
            </div>
            <p className="text-xs text-[#64748B]">
              Daily experience points gained over the last 7 days
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold text-[#333333] bg-[#FFE757] px-2.5 py-0.5 rounded-full border border-[#E5E7EB]">
              {daysGoalMet}/7 Goals Met
            </span>
          </div>
        </div>

        {/* Quick Micro-Metrics */}
        <div className="grid grid-cols-3 gap-2 mb-4 p-2.5 rounded-lg bg-[#F8F6EE] border border-[#E5E7EB] text-center">
          <div>
            <div className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider">
              Total XP
            </div>
            <div className="text-sm font-bold text-[#333333] flex items-center justify-center gap-0.5 mt-0.5">
              <Zap className="w-3.5 h-3.5 fill-[#EF3F52] text-[#EF3F52]" />
              {totalWeeklyXp}
            </div>
          </div>
          <div className="border-x border-[#E5E7EB]">
            <div className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider">
              Daily Avg
            </div>
            <div className="text-sm font-bold text-[#333333] mt-0.5">
              {avgDailyXp} XP
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider">
              Daily Goal
            </div>
            <div className="text-sm font-bold text-[#333333] mt-0.5">
              {DAILY_GOAL} XP
            </div>
          </div>
        </div>

        {/* Recharts BarChart Visualization */}
        <div className="w-full h-48 select-none">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={WEEKLY_XP_DATA}
              margin={{ top: 12, right: 8, left: -24, bottom: 0 }}
              onMouseMove={(state) => {
                if (state.activeTooltipIndex !== undefined) {
                  setHoveredIndex(state.activeTooltipIndex);
                }
              }}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E5E7EB"
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#AAAAAA' }}
                domain={[0, 110]}
                ticks={[0, 25, 50, 75, 100]}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: 'rgba(248, 246, 238, 0.7)' }}
              />
              {/* Daily Target Goal line */}
              <ReferenceLine
                y={DAILY_GOAL}
                stroke="#EF3F52"
                strokeDasharray="4 4"
                strokeWidth={1.5}
                label={{
                  value: 'Goal (50)',
                  position: 'insideTopRight',
                  fill: '#EF3F52',
                  fontSize: 10,
                  fontWeight: 700,
                }}
              />
              <Bar
                dataKey="xp"
                radius={[4, 4, 0, 0]}
                maxBarSize={34}
              >
                {WEEKLY_XP_DATA.map((entry, index) => {
                  const isHovered = hoveredIndex === index || hoveredIndex === String(index);
                  let fillColor = '#E5E7EB';
                  if (entry.isToday) {
                    fillColor = isHovered ? '#D92D20' : '#EF3F52';
                  } else if (entry.xp >= entry.goal) {
                    fillColor = isHovered ? '#FCD34D' : '#FFE757';
                  } else {
                    fillColor = isHovered ? '#AAAAAA' : '#E5E7EB';
                  }

                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={fillColor}
                      className="transition-colors duration-200 cursor-pointer"
                    />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend / Status Helper */}
        <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-[#E5E7EB] text-[11px] font-semibold text-[#64748B]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#FFE757] border border-[#E5E7EB]" />
            <span>Goal Met (≥50 XP)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#EF3F52]" />
            <span>Today</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#E5E7EB]" />
            <span>Under Goal</span>
          </div>
        </div>
      </div>

      {/* Chapter Breakdown */}
      <div className="lg:col-span-5 bg-white border border-[#E5E7EB] rounded-lg p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-[#333333]">
            Syllabus Mastery Breakdown
          </h3>
          <span className="text-xs text-[#64748B] font-semibold">4 Units</span>
        </div>

        <div className="space-y-4">
          {topics.map((t) => (
            <div key={t.name} className="space-y-1.5 p-2 rounded-lg hover:bg-[#F8F6EE] transition-colors">
              <div className="flex items-center justify-between text-xs font-bold gap-2">
                <span className="text-[#333333] truncate">{t.name}</span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-mono font-bold text-[#333333] bg-[#F8F6EE] px-1.5 py-0.5 rounded border border-[#E5E7EB] tabular-nums">
                    {t.weightage}
                  </span>
                  <span className="text-[#333333] font-bold tabular-nums w-10 text-right">{t.mastery}%</span>
                </div>
              </div>
              <div className="w-full h-2.5 bg-[#F8F6EE] border border-[#E5E7EB] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 bg-[#FFE757]"
                  style={{ width: `${t.mastery}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="p-3.5 rounded-lg bg-[#F8F6EE] border border-[#E5E7EB] mt-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#333333] mb-1">
            <Zap className="w-4 h-4 fill-[#EF3F52] text-[#EF3F52]" />
            <span>Recommended Focus Area</span>
          </div>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Practice <strong className="text-[#333333]">Coordinate Geometry</strong> & <strong className="text-[#333333]">Circles</strong> to boost your overall board exam readiness above 90%.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AnalyticsTab;
