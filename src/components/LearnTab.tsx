import React, { useState } from 'react';
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
  RotateCcw
} from 'lucide-react';
import { syllabusData, SyllabusUnit, LessonNode } from '../data/syllabusData';
import PathNode from './PathNode';

interface LearnTabProps {
  onStartLesson?: (node: LessonNode) => void;
}

// Staggered horizontal offsets (in px) for winding path
const NODE_OFFSETS = [0, 48, 80, 36, -36];

export const LearnTab: React.FC<LearnTabProps> = ({ onStartLesson }) => {
  const [selectedNode, setSelectedNode] = useState<LessonNode | null>(null);
  const [showLockedAlert, setShowLockedAlert] = useState<string | null>(null);

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
      {/* Syllabus Units Vertical Progression */}
      {syllabusData.map((unit, unitIdx) => {
        const percent = Math.round((unit.completedLessons / unit.totalLessons) * 100);

        // Color theme mapping for sticky unit banner
        const colorStyles = {
          emerald: {
            bg: 'bg-emerald-600',
            border: 'border-emerald-700',
            light: 'bg-emerald-50 text-emerald-700',
            progress: 'bg-emerald-400',
            barBg: 'bg-emerald-800/40',
            pathStroke: '#a7f3d0'
          },
          blue: {
            bg: 'bg-blue-600',
            border: 'border-blue-700',
            light: 'bg-blue-50 text-blue-700',
            progress: 'bg-blue-400',
            barBg: 'bg-blue-800/40',
            pathStroke: '#bae6fd'
          },
          purple: {
            bg: 'bg-indigo-600',
            border: 'border-indigo-700',
            light: 'bg-indigo-50 text-indigo-700',
            progress: 'bg-indigo-400',
            barBg: 'bg-indigo-800/40',
            pathStroke: '#ddd6fe'
          },
          amber: {
            bg: 'bg-amber-600',
            border: 'border-amber-700',
            light: 'bg-amber-50 text-amber-700',
            progress: 'bg-amber-400',
            barBg: 'bg-amber-800/40',
            pathStroke: '#fde68a'
          }
        }[unit.color] || {
          bg: 'bg-blue-600',
          border: 'border-blue-700',
          light: 'bg-blue-50 text-blue-700',
          progress: 'bg-blue-400',
          barBg: 'bg-blue-800/40',
          pathStroke: '#e2e8f0'
        };

        return (
          <section
            key={unit.id}
            id={`unit-section-${unit.id}`}
            className="mb-8 relative"
          >
            {/* Sticky Unit Header Banner */}
            <div
              className={`sticky top-[60px] z-30 ${colorStyles.bg} text-white px-4 py-3.5 shadow-md border-b ${colorStyles.border} transition-colors`}
            >
              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-md">
                      {unit.badge}
                    </span>
                    <span className="text-xs font-medium text-white/80">
                      {unit.completedLessons}/{unit.totalLessons} completed
                    </span>
                  </div>
                  <span className="text-xs font-extrabold text-white">
                    {percent}%
                  </span>
                </div>

                <h2 className="text-base font-extrabold tracking-tight text-white mb-0.5">
                  {unit.title}
                </h2>
                <p className="text-xs text-white/85 line-clamp-1 mb-2">
                  {unit.description}
                </p>

                {/* Chapter Progress Bar */}
                <div
                  className={`w-full h-2 ${colorStyles.barBg} rounded-full overflow-hidden p-0.5`}
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

      {/* Locked Node Toast Alert */}
      <AnimatePresence>
        {showLockedAlert && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 backdrop-blur-md text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold border border-slate-700/80 pointer-events-none whitespace-nowrap"
          >
            <Lock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Complete previous steps to unlock "{showLockedAlert}"!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Node Details Launch Modal / Sheet */}
      {selectedNode && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border border-slate-200"
          >
            {/* Top Handle on mobile */}
            <div className="w-12 h-1.5 rounded-full bg-slate-200 mx-auto mb-4 sm:hidden" />

            {/* Header Badge & Title */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-700">
                {selectedNode.type === 'boss'
                  ? 'Mastery Challenge'
                  : selectedNode.type === 'quiz'
                  ? 'Concept Check'
                  : 'Micro-Step Lesson'}
              </span>
              <div className="flex items-center gap-1 text-xs font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>+{selectedNode.xpReward} XP</span>
              </div>
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 mb-1">
              {selectedNode.title}
            </h3>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              {selectedNode.subtitle}
            </p>

            {/* Gamification Features in Lesson */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 mb-6 space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Step-by-step interactive math validation</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <Sparkles className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Dynamic JSXGraph coordinate diagrams & KaTeX equations</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSelectedNode(null)}
                className="flex-1 py-3.5 rounded-2xl border-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-extrabold text-sm transition-colors"
              >
                Close
              </button>
              <button
                type="button"
                id="start-selected-lesson-btn"
                onClick={handleLaunch}
                className="flex-[2] py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm transition-all shadow-md shadow-emerald-600/25 active:translate-y-0.5 flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
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
