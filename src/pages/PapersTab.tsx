import React from 'react';
import { FileText, Download, Clock, Award, CheckCircle2, ChevronRight } from 'lucide-react';

export const PapersTab: React.FC = () => {
  const [activeFilter, setActiveFilter] = React.useState('All');

  const samplePapers = [
    {
      id: 'cbse-2026-std',
      title: 'CBSE Class 10 Mathematics (Standard) 2026',
      year: '2026 Sample Paper',
      duration: '3 Hours',
      marks: '80 Marks',
      status: 'Ready to Practice',
      tag: 'Official Board Pattern',
      category: 'CBSE Standard',
      sections: 'Sec A (20×1M) · Sec B (5×2M) · Sec C (6×3M) · Sec D (4×5M)'
    },
    {
      id: 'cbse-2025-pyq',
      title: 'CBSE Class 10 Board Exam Paper 2025',
      year: 'Previous Year',
      duration: '3 Hours',
      marks: '80 Marks',
      status: 'Includes Solutions',
      tag: 'All India Set 1',
      category: 'CBSE Standard',
      sections: 'Sec A (20×1M) · Sec B (5×2M) · Sec C (6×3M) · Sec D (4×5M)'
    },
    {
      id: 'icse-2026-spec',
      title: 'ICSE Class 10 Mathematics Specimen Paper',
      year: '2026 Specimen',
      duration: '2.5 Hours',
      marks: '80 Marks',
      status: 'Step-by-step solutions',
      tag: 'ICSE Council',
      category: 'ICSE',
      sections: 'Sec A (40M Compulsory) · Sec B (40M Any 4 of 7)'
    },
    {
      id: 'cbse-basic-2025',
      title: 'CBSE Class 10 Mathematics (Basic) 2025',
      year: 'Previous Year',
      duration: '3 Hours',
      marks: '80 Marks',
      status: 'Completed (Score: 78/80)',
      tag: 'Set 2',
      category: 'CBSE Basic',
      sections: 'Sec A (20×1M) · Sec B (5×2M) · Sec C (6×3M) · Sec D (4×5M)'
    }
  ];

  const filteredPapers = samplePapers.filter((p) => {
    if (activeFilter === 'All') return true;
    return p.category === activeFilter;
  });

  return (
    <div id="papers-tab-view" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-[#333333] text-white rounded-lg p-6 sm:p-8 shadow-xs border border-[#E5E7EB] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFE757] mb-2">
            <FileText className="w-4 h-4 text-[#FFE757]" />
            <span>Board Examination Repository</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight">
            Official Past Papers & Mocks
          </h2>
          <p className="text-sm text-white/80 leading-relaxed font-light">
            Full-length CBSE & ICSE papers with automated grading, time-limits, and marking scheme rubrics.
          </p>
        </div>

        {/* Exam Countdown Box */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 shrink-0 text-center w-full md:w-auto">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#FFE757]">
            CBSE 2026 Countdown
          </div>
          <div className="text-2xl font-bold text-white tabular-nums my-0.5">
            140 Days
          </div>
          <span className="text-xs text-white/80 font-normal">
            4 Mocks Available
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['All', 'CBSE Standard', 'CBSE Basic', 'ICSE'].map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-xs font-bold active:scale-[0.96] transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFE757] ${
              activeFilter === filter
                ? 'bg-[#FFE757] text-[#333333] shadow-xs'
                : 'bg-white border border-[#E5E7EB] text-[#64748B] hover:text-[#333333] hover:bg-[#F8F6EE]'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Papers Grid (2 columns on md/lg screens) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPapers.map((paper) => (
          <div
            key={paper.id}
            className="bg-white border border-[#E5E7EB] rounded-lg p-5 shadow-xs hover:border-[#EF3F52] transition-all flex flex-col justify-between gap-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full bg-[#F8F6EE] text-[#333333] border border-[#E5E7EB]">
                  {paper.tag}
                </span>
                <span className="text-xs text-[#64748B] font-medium">
                  {paper.year}
                </span>
              </div>
              <h3 className="text-base font-bold text-[#333333] mb-1.5">
                {paper.title}
              </h3>
              
              {/* Board Marking Scheme Rubric Breakdown */}
              <div className="mb-3 px-2.5 py-1.5 rounded-md bg-[#F8F6EE] border border-[#E5E7EB] text-[11px] font-mono text-[#333333] flex items-center gap-1.5">
                <span className="font-bold text-[#EF3F52]">Rubric:</span>
                <span className="truncate">{paper.sections}</span>
              </div>

              <div className="flex items-center gap-4 text-xs text-[#64748B]">
                <span className="flex items-center gap-1.5 tabular-nums">
                  <Clock className="w-4 h-4 text-[#AAAAAA]" />
                  {paper.duration}
                </span>
                <span className="flex items-center gap-1.5 tabular-nums">
                  <Award className="w-4 h-4 text-[#AAAAAA]" />
                  {paper.marks}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
              <span className="text-xs font-semibold text-[#EF3F52] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {paper.status}
              </span>
              <button
                type="button"
                className="h-[41px] px-[20px] rounded-[20px] bg-[#FFE757] text-[#EF3F52] hover:bg-[#EF3F52] hover:text-white font-bold text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFE757] active:scale-[0.98] transition-all flex items-center gap-1.5 shadow-xs"
                title={`Open ${paper.title}`}
                aria-label={`Open ${paper.title}`}
              >
                <span>Practice Paper</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PapersTab;
