import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Sparkles,
  Trophy,
  CheckCircle,
  Lock,
  ChevronRight,
  ArrowRight,
  Flame,
  Zap,
  Play,
  RotateCcw,
  Target,
  Award,
  Clock,
  ArrowUpRight,
  FileText
} from 'lucide-react';
import { syllabusData, SyllabusUnit, LessonNode } from '../data/syllabusData';
import PathNode from './PathNode';

interface LearnTabProps {
  onStartLesson?: (node: LessonNode) => void;
}

// Staggered horizontal offsets (in px) for winding path (calibrated for 320px+ mobile viewports)
const NODE_OFFSETS = [0, 42, 64, 28, -32];

export const LearnTab: React.FC<LearnTabProps> = ({ onStartLesson }) => {
  const navigate = useNavigate();
  const [selectedNode, setSelectedNode] = useState<LessonNode | null>(null);
  const [showLockedAlert, setShowLockedAlert] = useState<string | null>(null);

  // Close modal on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedNode(null);
      }
    };
    if (selectedNode) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNode]);

  const handleNodeClick = (node: LessonNode) => {
    if (node.state === 'locked') {
      setShowLockedAlert(node.title);
      setTimeout(() => setShowLockedAlert(null), 2400);
      return;
    }
    setSelectedNode(node);
  };

  const handleLaunch = () => {
    if (selectedNode && onStartLesson) {
      onStartLesson(selectedNode);
      setSelectedNode(null);
    }
  };

  return (
    <div id="learn-tab-container" className="w-full pb-20 select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:grid lg:grid-cols-12 lg:gap-8 items-start">
        {/* Left Column: Syllabus Units Vertical Progression */}
        <div className="w-full lg:col-span-8 flex flex-col items-center">
          {syllabusData.map((unit, unitIdx) => {
        const percent = Math.round((unit.completedLessons / unit.totalLessons) * 100);

        // Color theme mapping for unit banner in Abheda styling
        const colorStyles = {
          emerald: {
            bg: 'bg-white border-[#E5E7EB] text-[#333333]',
            border: 'border-[#E5E7EB]',
            light: 'bg-[#FFE757] text-[#333333]',
            progress: 'bg-[#FFE757]',
            barBg: 'bg-[#F8F6EE]',
            pathStroke: '#FFE757'
          },
          blue: {
            bg: 'bg-white border-[#E5E7EB] text-[#333333]',
            border: 'border-[#E5E7EB]',
            light: 'bg-[#FFE757] text-[#333333]',
            progress: 'bg-[#FFE757]',
            barBg: 'bg-[#F8F6EE]',
            pathStroke: '#FFE757'
          },
          purple: {
            bg: 'bg-white border-[#E5E7EB] text-[#333333]',
            border: 'border-[#E5E7EB]',
            light: 'bg-[#FFE757] text-[#333333]',
            progress: 'bg-[#FFE757]',
            barBg: 'bg-[#F8F6EE]',
            pathStroke: '#FFE757'
          },
          amber: {
            bg: 'bg-white border-[#E5E7EB] text-[#333333]',
            border: 'border-[#E5E7EB]',
            light: 'bg-[#FFE757] text-[#333333]',
            progress: 'bg-[#FFE757]',
            barBg: 'bg-[#F8F6EE]',
            pathStroke: '#FFE757'
          }
        }[unit.color] || {
          bg: 'bg-white border-[#E5E7EB] text-[#333333]',
          border: 'border-[#E5E7EB]',
          light: 'bg-[#FFE757] text-[#333333]',
          progress: 'bg-[#FFE757]',
          barBg: 'bg-[#F8F6EE]',
          pathStroke: '#FFE757'
        };

        return (
          <section
            key={unit.id}
            id={`unit-section-${unit.id}`}
            className="mb-8 relative"
          >
            {/* Sticky Unit Header Banner */}
            <div
              className={`sticky top-[60px] z-30 ${colorStyles.bg} rounded-md px-4 py-3.5 shadow-xs border transition-colors`}
            >
              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider bg-[#FFE757] text-[#333333] px-2 py-0.5 rounded-full">
                      {unit.badge}
                    </span>
                    <span className="text-xs font-normal text-[#64748B]">
                      {unit.completedLessons}/{unit.totalLessons} completed
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#333333]">
                    {percent}%
                  </span>
                </div>

                <h2 className="text-base font-bold tracking-tight text-[#333333] mb-0.5">
                  {unit.title}
                </h2>
                <p className="text-xs text-[#64748B] line-clamp-1 mb-2">
                  {unit.description}
                </p>

                {/* Chapter Progress Bar */}
                <div
                  className={`w-full h-2.5 ${colorStyles.barBg} border border-[#E5E7EB] rounded-full overflow-hidden p-0.5`}
                >
                  <div
                    className={`h-full ${colorStyles.progress} rounded-full transition-all duration-500`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* The Winding Path Area */}
            <div className="max-w-md mx-auto relative px-4 py-8 flex flex-col items-center">
              {/* Soft connecting SVG path line behind the nodes */}
              <svg
                className="absolute top-8 bottom-8 w-full h-[calc(100%-64px)] pointer-events-none z-0 overflow-visible"
                preserveAspectRatio="none"
                viewBox="0 0 300 500"
              >
                <path
                  d="M 150 25 C 190 70, 230 110, 230 150 C 230 200, 180 240, 180 280 C 180 320, 110 360, 110 400 C 110 440, 150 460, 150 480"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray="4 8"
                />
              </svg>

              {/* Staggered Circular Nodes */}
              <div className="w-full flex flex-col items-center gap-6 z-10">
                {unit.nodes.map((node, nodeIdx) => {
                  const offset = NODE_OFFSETS[nodeIdx % NODE_OFFSETS.length];

                  return (
                    <div
                      key={node.id}
                      style={{
                        transform: `translateX(${offset}px)`,
                      }}
                      className="transition-transform duration-300"
                    >
                      <PathNode
                        node={node}
                        index={nodeIdx}
                        onClick={handleNodeClick}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}
        </div>

        {/* Right Desktop Dashboard Column (Visible on lg screens) */}
        <div className="hidden lg:flex lg:col-span-4 flex-col gap-5 sticky top-[80px]">
          {/* 1. Daily Quests Card */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-amber-50 text-amber-600">
                  <Flame className="w-5 h-5 fill-amber-500" />
                </span>
                <h3 className="font-extrabold text-base text-slate-900">
                  Daily Quests
                </h3>
              </div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Resets in 6h
              </span>
            </div>

            <div className="space-y-3.5">
              {/* Quest 1 */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className="text-slate-800 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                    Earn 50 XP
                  </span>
                  <span className="text-emerald-600 font-extrabold tabular-nums">95/50 XP</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-full" />
                </div>
              </div>

              {/* Quest 2 */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className="text-slate-800 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-blue-500" />
                    Solve 3 Geometry Steps
                  </span>
                  <span className="text-blue-600 font-extrabold tabular-nums">2/3</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full w-2/3" />
                </div>
              </div>

              {/* Quest 3 */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className="text-slate-800 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                    Clear 1 Boss Challenge
                  </span>
                  <span className="text-slate-500 font-extrabold tabular-nums">0/1</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full w-0" />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Silver League Card */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-[#F8F6EE] text-[#EF3F52]">
                  <Trophy className="w-5 h-5 text-[#EF3F52]" />
                </span>
                <div>
                  <h3 className="font-bold text-sm text-[#333333] leading-tight">
                    Silver League
                  </h3>
                  <span className="text-[11px] text-[#64748B] block leading-tight">
                    Class 10 Weekly Sprint
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#333333] bg-[#FFE757] px-2 py-0.5 rounded-full">
                Rank #3
              </span>
            </div>

            <p className="text-xs text-[#333333] mb-4 leading-relaxed">
              You are in the <strong className="text-[#333333]">Promotion Zone</strong>! Top 3 advance to Gold League in 3 days.
            </p>

            <button
              type="button"
              onClick={() => navigate('/arena')}
              className="w-full h-[41px] rounded-lg bg-[#F8F6EE] hover:bg-[#FFE757] border border-[#E5E7EB] text-[#333333] font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>View Live League Standings</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#EF3F52]" />
            </button>
          </div>

          {/* 3. Board Exam Mock Countdown Card */}
          <div className="bg-[#333333] text-white rounded-lg p-5 shadow-xs">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#FFE757] mb-2">
              <FileText className="w-3.5 h-3.5" />
              <span>CBSE Board Countdown</span>
            </div>
            <h3 className="text-base font-bold mb-1">
              Sample Paper 2026 Ready
            </h3>
            <p className="text-xs text-white/80 leading-relaxed mb-4">
              Full-length 80 marks Standard Math mock with official answer sheet rubric.
            </p>
            <button
              type="button"
              onClick={() => navigate('/papers')}
              className="w-full h-[41px] rounded-[20px] bg-[#FFE757] text-[#EF3F52] hover:bg-[#EF3F52] hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.98]"
            >
              <span>Practice Past Papers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Locked Node Toast Alert */}
      <AnimatePresence>
        {showLockedAlert && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-[#333333] text-white px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 text-xs font-bold border border-[#E5E7EB] pointer-events-none whitespace-nowrap"
          >
            <Lock className="w-4 h-4 text-[#FFE757] shrink-0" />
            <span>Complete previous steps to unlock "{showLockedAlert}"!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Node Details Launch Modal / Sheet */}
      {selectedNode && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedNode(null);
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lesson-modal-title"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white w-full max-w-md rounded-t-xl sm:rounded-lg p-6 shadow-xl border border-[#E5E7EB]"
          >
            {/* Top Handle on mobile */}
            <div className="w-12 h-1.5 rounded-full bg-[#E5E7EB] mx-auto mb-4 sm:hidden" />

            {/* Header Badge & Title */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F8F6EE] text-[#333333] border border-[#E5E7EB]">
                {selectedNode.type === 'boss'
                  ? 'Mastery Challenge'
                  : selectedNode.type === 'quiz'
                  ? 'Concept Check'
                  : 'Micro-Step Lesson'}
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-[#EF3F52] bg-[#F8F6EE] px-2.5 py-0.5 rounded-full border border-[#E5E7EB]">
                <Zap className="w-3.5 h-3.5 fill-[#EF3F52] text-[#EF3F52]" />
                <span>+{selectedNode.xpReward} XP</span>
              </div>
            </div>

            <h3 id="lesson-modal-title" className="text-xl font-bold text-[#333333] mb-1">
              {selectedNode.title}
            </h3>
            <p className="text-sm text-[#64748B] mb-6 leading-relaxed font-light">
              {selectedNode.subtitle}
            </p>

            {/* Gamification Features in Lesson */}
            <div className="bg-[#F8F6EE] border border-[#E5E7EB] rounded-lg p-3.5 mb-6 space-y-2">
              <div className="flex items-center gap-2 text-xs font-normal text-[#333333]">
                <CheckCircle className="w-4 h-4 text-[#EF3F52] shrink-0" />
                <span>Step-by-step interactive math validation</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-normal text-[#333333]">
                <Sparkles className="w-4 h-4 text-[#FFE757] shrink-0" />
                <span>Dynamic JSXGraph coordinate diagrams & KaTeX equations</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSelectedNode(null)}
                className="flex-1 h-[41px] rounded-lg border border-[#E5E7EB] hover:bg-[#F8F6EE] text-[#333333] font-bold text-sm transition-colors"
              >
                Close
              </button>
              <button
                type="button"
                id="start-selected-lesson-btn"
                onClick={handleLaunch}
                className="flex-[2] h-[41px] rounded-[20px] bg-[#FFE757] text-[#EF3F52] hover:bg-[#EF3F52] hover:text-white font-bold text-sm transition-all shadow-xs active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start Lesson</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LearnTab;
