import React from 'react';
import { FileText, Download, Clock, Award, CheckCircle2, ChevronRight } from 'lucide-react';

export const PapersTab: React.FC = () => {
  const samplePapers = [
    {
      id: 'cbse-2026-std',
      title: 'CBSE Class 10 Mathematics (Standard) 2026',
      year: '2026 Sample Paper',
      duration: '3 Hours',
      marks: '80 Marks',
      status: 'Ready to Practice',
      tag: 'Official Board Pattern'
    },
    {
      id: 'cbse-2025-pyq',
      title: 'CBSE Class 10 Board Exam Paper 2025',
      year: 'Previous Year',
      duration: '3 Hours',
      marks: '80 Marks',
      status: 'Includes Solutions',
      tag: 'All India Set 1'
    },
    {
      id: 'icse-2026-spec',
      title: 'ICSE Class 10 Mathematics Specimen Paper',
      year: '2026 Specimen',
      duration: '2.5 Hours',
      marks: '80 Marks',
      status: 'Step-by-step solutions',
      tag: 'ICSE Council'
    },
    {
      id: 'cbse-basic-2025',
      title: 'CBSE Class 10 Mathematics (Basic) 2025',
      year: 'Previous Year',
      duration: '3 Hours',
      marks: '80 Marks',
      status: 'Completed (Score: 78/80)',
      tag: 'Set 2'
    }
  ];

  return (
    <div id="papers-tab-view" className="max-w-md mx-auto px-4 py-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-5 mb-6 shadow-md shadow-blue-500/15">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-200 mb-1">
          <FileText className="w-4 h-4" />
          <span>Board Examination Prep</span>
        </div>
        <h2 className="text-xl font-extrabold mb-1">Past Papers & Mocks</h2>
        <p className="text-xs text-blue-100 leading-relaxed">
          Full-length CBSE & ICSE papers with automated grading, time-limits, and marking schemes.
        </p>
      </div>

      {/* Papers List */}
      <div className="space-y-3">
        {samplePapers.map((paper) => (
          <div
            key={paper.id}
            className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs hover:border-blue-300 transition-colors flex items-center justify-between gap-3"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                  {paper.tag}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {paper.year}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 truncate">
                {paper.title}
              </h3>
              <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {paper.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Award className="w-3 h-3 text-slate-400" />
                  {paper.marks}
                </span>
              </div>
            </div>

            <button
              type="button"
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-colors shrink-0"
              title="Open Paper"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PapersTab;
