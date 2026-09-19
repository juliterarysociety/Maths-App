import React, { useState } from 'react';
import { Flame, Sparkles, Gem, ChevronDown, Check, BookOpen } from 'lucide-react';

interface TopHeaderProps {
  streak?: number;
  xp?: number;
  currentCourse?: string;
  onCourseChange?: (course: string) => void;
}

const COURSES = [
  'Class 10 Math (CBSE)',
  'Class 10 Math (ICSE)',
  'Class 11 Math (CBSE)',
  'Class 12 Math (CBSE)',
];

export const TopHeader: React.FC<TopHeaderProps> = ({
  streak = 12,
  xp = 450,
  currentCourse = 'Class 10 Math',
  onCourseChange,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header
      id="top-header"
      className="fixed top-0 left-0 right-0 h-[60px] z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs px-4"
    >
      <div className="max-w-md mx-auto h-full flex items-center justify-between gap-2">
        {/* Left Side: Course Selector Dropdown / Pill */}
        <div className="relative">
          <button
            type="button"
            id="course-selector-pill"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-slate-200 hover:border-blue-400 bg-slate-50 active:scale-95 text-xs sm:text-sm font-extrabold text-slate-800 transition-all shadow-xs"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span className="truncate max-w-[120px] sm:max-w-[160px]">
              {currentCourse}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${
                dropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <>
              {/* Backdrop dismiss */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setDropdownOpen(false)}
              />

              <div
                id="course-dropdown-menu"
                className="absolute left-0 top-full mt-2 w-56 bg-white rounded-2xl border border-slate-200 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="px-2 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Target Syllabus
                </div>
                <div className="space-y-1 mt-1">
                  {COURSES.map((course) => {
                    const isSelected = currentCourse.includes(course.split(' ')[0]) && currentCourse.includes(course.split(' ')[1]);
                    return (
                      <button
                        key={course}
                        type="button"
                        onClick={() => {
                          if (onCourseChange) onCourseChange(course);
                          setDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-between ${
                          isSelected
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{course}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-blue-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Side: Two Gamified Counters */}
        <div className="flex items-center gap-2">
          {/* Daily Streak Counter */}
          <div
            id="header-streak-badge"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-600 font-extrabold text-xs sm:text-sm shadow-2xs hover:bg-orange-100/60 transition-colors cursor-pointer"
            title="Current Day Streak"
          >
            <Flame className="w-4 h-4 fill-orange-500 text-orange-500 animate-pulse" />
            <span>{streak}</span>
          </div>

          {/* XP / Gems Counter */}
          <div
            id="header-xp-badge"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-600 font-extrabold text-xs sm:text-sm shadow-2xs hover:bg-blue-100/60 transition-colors cursor-pointer"
            title="Total XP Diamonds"
          >
            <Gem className="w-4 h-4 fill-blue-500 text-blue-500" />
            <span>{xp}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
