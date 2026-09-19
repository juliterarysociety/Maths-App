import React from 'react';
import { motion } from 'framer-motion';
import {
  Crown,
  Star,
  Lock,
  Sparkles,
  ShieldAlert,
  Play,
  Check,
  Award
} from 'lucide-react';
import { LessonNode } from '../data/syllabusData';

interface PathNodeProps {
  node: LessonNode;
  index: number;
  onClick: (node: LessonNode) => void;
}

export const PathNode: React.FC<PathNodeProps> = ({ node, index, onClick }) => {
  const isBoss = node.type === 'boss';
  const isCompleted = node.state === 'completed';
  const isActive = node.state === 'active';
  const isLocked = node.state === 'locked';

  // Base icon determination
  const renderIcon = () => {
    if (isBoss) {
      if (node.bossType === 'castle') {
        return (
          <div className="relative flex items-center justify-center">
            {/* Castle SVG shape */}
            <svg
              className="w-8 h-8 fill-current"
              viewBox="0 0 24 24"
              stroke="none"
            >
              <path d="M2 20h20v2H2v-2zm1-2h18v-8l-2-2v-4h-2v2h-2v-2h-2v2h-2v-2H9v2H7v-2H5v4L3 10v8zm8-2h2v-4h-2v4z" />
            </svg>
            {isCompleted && (
              <span className="absolute -top-2 -right-2 text-yellow-300">
                <Crown className="w-4 h-4 fill-yellow-300" />
              </span>
            )}
          </div>
        );
      }
      // Treasure Chest
      return (
        <div className="relative flex items-center justify-center">
          <svg
            className="w-8 h-8 fill-current"
            viewBox="0 0 24 24"
            stroke="none"
          >
            <path d="M20 7h-4.18C15.4 5.84 14.3 5 13 5h-2c-1.3 0-2.4.84-2.82 2H4c-1.1 0-2 .9-2 2v3c0 .55.45 1 1 1h1v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h1c.55 0 1-.45 1-1V9c0-1.1-.9-2-2-2zm-9 0c0-.55.45-1 1-1h2c.55 0 1 .45 1 1v1h-4V7zm2 9h-2v-2h2v2z" />
          </svg>
          {isCompleted && (
            <span className="absolute -top-2 -right-2 text-yellow-300">
              <Sparkles className="w-4 h-4 fill-yellow-300" />
            </span>
          )}
        </div>
      );
    }

    if (isCompleted) {
      return <Crown className="w-7 h-7 fill-white stroke-amber-200" />;
    }

    if (isActive) {
      return <Play className="w-7 h-7 fill-white text-white ml-0.5" />;
    }

    // Locked state
    return <Lock className="w-6 h-6 stroke-[2.5]" />;
  };

  return (
    <div className="relative flex flex-col items-center justify-center group my-3 select-none">
      {/* Active Node Floating Tooltip / Speech Bubble */}
      {isActive && (
        <motion.div
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: [ -6, -10, -6 ], opacity: 1 }}
          transition={{
            y: { repeat: Infinity, duration: 1.6, ease: 'easeInOut' },
            opacity: { duration: 0.3 }
          }}
          className="absolute -top-11 z-20 flex flex-col items-center pointer-events-none"
        >
          <div className="bg-emerald-600 text-white font-extrabold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md border border-emerald-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 animate-spin" />
            <span>START</span>
          </div>
          <div className="w-2.5 h-2.5 bg-emerald-600 rotate-45 -mt-1.5 shadow-xs" />
        </motion.div>
      )}

      {/* Main Node Button */}
      <motion.button
        type="button"
        id={`node-${node.id}`}
        disabled={isLocked}
        onClick={() => onClick(node)}
        whileHover={!isLocked ? { scale: 1.06 } : {}}
        whileTap={!isLocked ? { scale: 0.92, y: 3 } : {}}
        animate={
          isActive
            ? {
                scale: [1, 1.05, 1],
                boxShadow: [
                  '0 6px 0 #15803d, 0 0 0 0 rgba(34, 197, 94, 0.4)',
                  '0 6px 0 #15803d, 0 0 0 12px rgba(34, 197, 94, 0)',
                  '0 6px 0 #15803d, 0 0 0 0 rgba(34, 197, 94, 0)',
                ],
              }
            : {}
        }
        transition={
          isActive
            ? {
                repeat: Infinity,
                duration: 2,
                ease: 'easeInOut',
              }
            : { type: 'spring', stiffness: 400, damping: 17 }
        }
        className={`relative z-10 flex items-center justify-center transition-all ${
          isBoss
            ? 'w-20 h-20 sm:w-22 sm:h-22 rounded-3xl'
            : isActive
            ? 'w-18 h-18 sm:w-20 sm:h-20 rounded-full'
            : 'w-16 h-16 sm:w-18 sm:h-18 rounded-full'
        } ${
          isCompleted
            ? isBoss
              ? 'bg-gradient-to-b from-amber-400 to-amber-500 text-white shadow-[0_6px_0_#b45309] border-2 border-amber-300'
              : 'bg-gradient-to-b from-amber-400 to-amber-500 text-white shadow-[0_5px_0_#ca8a04] border-2 border-amber-300'
            : isActive
            ? 'bg-gradient-to-b from-emerald-500 to-emerald-600 text-white shadow-[0_6px_0_#15803d] border-3 border-emerald-300 ring-4 ring-emerald-100'
            : isBoss
            ? 'bg-slate-200 text-slate-400 shadow-[0_5px_0_#cbd5e1] border-2 border-slate-300 cursor-not-allowed opacity-90'
            : 'bg-slate-200 text-slate-400 shadow-[0_5px_0_#cbd5e1] border-2 border-slate-300 cursor-not-allowed'
        }`}
      >
        {/* Top Gloss Reflection for 3D tactile button aesthetic */}
        <div className="absolute top-1 left-2 right-2 h-1/3 rounded-t-full bg-white/25 pointer-events-none" />

        {renderIcon()}
      </motion.button>

      {/* Stars beneath completed regular nodes */}
      {isCompleted && !isBoss && (
        <div className="flex items-center gap-1 mt-2">
          {[1, 2, 3].map((s) => (
            <Star
              key={s}
              className="w-3.5 h-3.5 fill-amber-400 text-amber-500 drop-shadow-2xs"
            />
          ))}
        </div>
      )}

      {/* Node Title / Subtitle label on hover or for active/boss */}
      <div
        className={`mt-1.5 text-center max-w-[150px] transition-opacity ${
          isActive ? 'opacity-100' : isCompleted ? 'opacity-90' : 'opacity-60'
        }`}
      >
        <span
          className={`text-xs font-extrabold line-clamp-1 ${
            isActive
              ? 'text-emerald-700'
              : isCompleted
              ? 'text-slate-800'
              : 'text-slate-400'
          }`}
        >
          {node.title}
        </span>
      </div>
    </div>
  );
};

export default PathNode;
