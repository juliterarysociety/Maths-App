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
      return <Play className="w-7 h-7 fill-[#EF3F52] text-[#EF3F52] ml-0.5" />;
    }

    // Locked state
    return <Lock className="w-6 h-6 text-[#AAAAAA] stroke-[2.5]" />;
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
          <div className="bg-[#FFE757] text-[#EF3F52] font-bold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md border border-[#E5E7EB] flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#EF3F52]" />
            <span>START</span>
          </div>
          <div className="w-2.5 h-2.5 bg-[#FFE757] border-r border-b border-[#E5E7EB] rotate-45 -mt-1.5 shadow-xs" />
        </motion.div>
      )}

      {/* Main Node Button */}
      <motion.button
        type="button"
        id={`node-${node.id}`}
        disabled={isLocked}
        onClick={() => onClick(node)}
        aria-label={`${node.title} - ${
          isBoss
            ? 'Boss Challenge'
            : isActive
            ? 'Active lesson to play'
            : isCompleted
            ? 'Completed lesson'
            : 'Locked lesson'
        } (${node.xpReward} XP)`}
        whileHover={!isLocked ? { scale: 1.04 } : {}}
        whileTap={!isLocked ? { scale: 0.96, y: 2 } : {}}
        animate={
          isActive
            ? {
                scale: [1, 1.03, 1],
              }
            : {}
        }
        transition={
          isActive
            ? {
                repeat: Infinity,
                duration: 2.4,
                ease: 'easeInOut',
              }
            : { type: 'spring', stiffness: 400, damping: 17 }
        }
        className={`relative z-10 flex items-center justify-center focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FFE757] focus-visible:ring-offset-2 transition-colors ${
          isBoss
            ? 'w-20 h-20 sm:w-22 sm:h-22 rounded-2xl'
            : isActive
            ? 'w-18 h-18 sm:w-20 sm:h-20 rounded-full'
            : 'w-16 h-16 sm:w-18 sm:h-18 rounded-full'
        } ${
          isCompleted
            ? isBoss
              ? 'bg-[#FFE757] text-[#333333] shadow-[0_6px_0_#D97706] border-2 border-[#FFE757]'
              : 'bg-[#FFE757] text-[#333333] shadow-[0_5px_0_#D97706] border-2 border-[#FFE757]'
            : isActive
            ? 'bg-[#FFE757] text-[#EF3F52] shadow-[0_6px_0_#D97706] border-3 border-white ring-4 ring-[#FFE757]/40'
            : isBoss
            ? 'bg-[#E5E7EB] text-[#AAAAAA] shadow-[0_5px_0_#cbd5e1] border-2 border-[#E5E7EB] cursor-not-allowed opacity-90'
            : 'bg-[#E5E7EB] text-[#AAAAAA] shadow-[0_5px_0_#cbd5e1] border-2 border-[#E5E7EB] cursor-not-allowed'
        }`}
      >
        {/* Compositor-accelerated pulsing beacon ring for active node */}
        {isActive && (
          <motion.span
            aria-hidden="true"
            initial={{ scale: 1, opacity: 0.65 }}
            animate={{ scale: 1.25, opacity: 0 }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute inset-0 rounded-full bg-[#FFE757] -z-10 pointer-events-none"
          />
        )}

        {/* Top Gloss Reflection for 3D tactile button aesthetic */}
        <div className="absolute top-1 left-2 right-2 h-1/3 rounded-t-full bg-white/30 pointer-events-none" />

        {renderIcon()}
      </motion.button>

      {/* Stars beneath completed regular nodes */}
      {isCompleted && !isBoss && (
        <div className="flex items-center gap-1 mt-2">
          {[1, 2, 3].map((s) => (
            <Star
              key={s}
              className="w-3.5 h-3.5 fill-[#FFE757] text-[#D97706] drop-shadow-2xs"
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
          className={`text-xs font-bold line-clamp-1 ${
            isActive
              ? 'text-[#EF3F52]'
              : isCompleted
              ? 'text-[#333333]'
              : 'text-[#64748B]'
          }`}
        >
          {node.title}
        </span>
      </div>
    </div>
  );
};

export default PathNode;
