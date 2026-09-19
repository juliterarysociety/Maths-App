import React from 'react';
import { PieChart, TrendingUp, CheckCircle, Target, Award, ArrowUpRight } from 'lucide-react';

export const AnalyticsTab: React.FC = () => {
  const topics = [
    { name: 'Quadratic Equations', mastery: 96, state: 'Mastered', color: 'emerald' },
    { name: 'Triangles & Trigonometry', mastery: 72, state: 'In Progress', color: 'blue' },
    { name: 'Circles & Tangents', mastery: 45, state: 'Needs Practice', color: 'amber' },
    { name: 'Coordinate Geometry', mastery: 30, state: 'Beginning', color: 'purple' },
  ];

  return (
    <div id="analytics-tab-view" className="max-w-md mx-auto px-4 py-6">
      {/* Top Overview Cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-1">
            <span>Overall Accuracy</span>
            <Target className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">88.4%</div>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-0.5">
            <ArrowUpRight className="w-3 h-3" /> +4.2% this week
          </span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-1">
            <span>Problems Solved</span>
            <CheckCircle className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">142</div>
          <span className="text-[11px] text-blue-600 font-semibold flex items-center gap-0.5 mt-0.5">
            Class 10 CBSE Target
          </span>
        </div>
      </div>

      {/* Chapter Breakdown */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-extrabold text-base text-slate-900">
            Syllabus Mastery Breakdown
          </h3>
          <span className="text-xs text-slate-400 font-semibold">4 Units</span>
        </div>

        <div className="space-y-4">
          {topics.map((t) => (
            <div key={t.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-800">{t.name}</span>
                <span className="text-slate-600">{t.mastery}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    t.color === 'emerald'
                      ? 'bg-emerald-500'
                      : t.color === 'blue'
                      ? 'bg-blue-500'
                      : t.color === 'amber'
                      ? 'bg-amber-500'
                      : 'bg-indigo-500'
                  }`}
                  style={{ width: `${t.mastery}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;
