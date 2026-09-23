import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Sparkles, Gem, ChevronDown, Check, BookOpen } from 'lucide-react';

interface TopHeaderProps {
  streak?: number;
  xp?: number;
  currentCourse?: string;
  onCourseChange?: (course: string) => void;
  isSidebarCollapsed?: boolean;
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
  isSidebarCollapsed = false,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Close dropdown on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dropdownOpen]);

  return (
    <header
      id="top-header"
      className={`fixed top-0 left-0 right-0 h-[60px] z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] shadow-xs px-4 ${
        isSidebarCollapsed ? 'md:left-20' : 'md:left-64'
      } md:px-8 transition-all duration-300 ease-in-out`}
      role="banner"
    >
      <div className="max-w-md md:max-w-6xl mx-auto h-full flex items-center justify-between gap-4">
        {/* Left Side: Course Selector Dropdown / Pill */}
        <div className="relative">
          <button
            type="button"
            id="course-selector-pill"
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
            aria-label="Select target syllabus course"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#E5E7EB] hover:border-[#333333] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFE757] bg-[#F8F6EE] active:scale-95 text-xs sm:text-sm font-bold text-[#333333] transition-all shadow-xs"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#EF3F52]" />
            <span className="truncate max-w-[120px] sm:max-w-[160px]">
              {currentCourse}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-[#333333] transition-transform duration-200 ${
                dropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Dropdown Menu with AnimatePresence */}
          <AnimatePresence>
            {dropdownOpen && (
              <>
                {/* Backdrop dismiss */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setDropdownOpen(false)}
                  aria-hidden="true"
                />

                <motion.div
                  id="course-dropdown-menu"
                  role="listbox"
                  aria-label="Target Syllabus Options"
                  initial={{ opacity: 0, scale: 0.95, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -4 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 top-full mt-2 w-56 bg-white rounded-lg border border-[#E5E7EB] shadow-lg p-2 z-50 origin-top-left"
                >
                  <div className="px-2 py-1 text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                    Target Syllabus
                  </div>
                  <div className="space-y-1 mt-1">
                    {COURSES.map((course) => {
                      const isSelected = currentCourse.includes(course.split(' ')[0]) && currentCourse.includes(course.split(' ')[1]);
                      return (
                        <button
                          key={course}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => {
                            if (onCourseChange) onCourseChange(course);
                            setDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-md text-xs font-bold transition-colors flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFE757] ${
                            isSelected
                              ? 'bg-[#FFE757] text-[#333333]'
                              : 'text-[#333333] hover:bg-[#F8F6EE]'
                          }`}
                        >
                          <span>{course}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#EF3F52]" />}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Two Gamified Counters */}
        <div className="flex items-center gap-2">
          {/* Daily Streak Counter */}
          <motion.div
            id="header-streak-badge"
            role="status"
            aria-label={`Daily streak: ${streak} days`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 450, damping: 18 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F8F6EE] border border-[#E5E7EB] text-[#333333] font-bold text-xs sm:text-sm shadow-xs hover:border-[#EF3F52] transition-colors cursor-pointer"
            title="Current Day Streak"
          >
            <Flame className="w-4 h-4 fill-[#EF3F52] text-[#EF3F52] animate-pulse" />
            <span className="tabular-nums">{streak}</span>
          </motion.div>

          {/* XP / Gems Counter */}
          <motion.div
            id="header-xp-badge"
            role="status"
            aria-label={`Experience Points: ${xp} XP`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 450, damping: 18 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFE757] border border-[#FFE757] text-[#333333] font-bold text-xs sm:text-sm shadow-xs hover:bg-[#FFE757]/90 transition-colors cursor-pointer"
            title="Total XP Diamonds"
          >
            <Gem className="w-4 h-4 fill-[#EF3F52] text-[#EF3F52]" />
            <span className="tabular-nums text-[#333333]">{xp}</span>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
