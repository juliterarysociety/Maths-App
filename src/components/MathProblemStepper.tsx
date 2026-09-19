import React, { useState, useEffect, useRef } from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  Flame,
  Zap,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ChevronDown,
  Sparkles,
  RotateCcw,
  Trophy,
  ArrowRight,
  HelpCircle,
  BookOpen,
  Award,
  Check,
  Volume2,
  VolumeX
} from 'lucide-react';
import { ProblemData, ProblemStep } from '../types';
import GeometryCanvas from './GeometryCanvas';
import { playSound } from '../utils/sound';

interface MathProblemStepperProps {
  problemData: ProblemData;
  streak?: number;
  xp?: number;
  onBack?: () => void;
  onComplete?: (earnedXp: number) => void;
  onXpGain?: (gained: number) => void;
}

export const MathProblemStepper: React.FC<MathProblemStepperProps> = ({
  problemData,
  streak = 5,
  xp = 140,
  onBack,
  onComplete,
  onXpGain
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isHintOpen, setIsHintOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [shake, setShake] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [stepAttempts, setStepAttempts] = useState<Record<number, number>>({});
  const [earnedSessionXp, setEarnedSessionXp] = useState(0);
  const [showXpFloat, setShowXpFloat] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);

  const steps = problemData.steps || [];
  const currentStep: ProblemStep | undefined = steps[currentStepIndex];
  const totalSteps = steps.length;

  // Reset inputs when step changes
  useEffect(() => {
    setUserAnswer('');
    setStatus('idle');
    setFeedbackMessage('');
    setIsHintOpen(false);
    setShake(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentStepIndex, problemData.id]);

  // Trigger confetti burst on success
  const triggerCelebration = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#22c55e', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6']
    });
  };

  const triggerGrandCelebration = () => {
    const end = Date.now() + 1200;
    const interval: any = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#22c55e', '#3b82f6', '#eab308', '#6366f1']
      });
    }, 200);
  };

  // Helper to evaluate fractions or decimals safely
  const parseNumericValue = (val: string): number | null => {
    const clean = val.replace(/[^0-9./-]/g, '').trim();
    if (!clean) return null;
    if (clean.includes('/')) {
      const parts = clean.split('/');
      if (parts.length === 2) {
        const num = parseFloat(parts[0]);
        const den = parseFloat(parts[1]);
        if (!isNaN(num) && !isNaN(den) && den !== 0) {
          return num / den;
        }
      }
    }
    const parsed = parseFloat(clean);
    return isNaN(parsed) ? null : parsed;
  };

  // Answer validator with tolerant normalization
  const validateAnswer = (input: string, step: ProblemStep): boolean => {
    if (!input.trim()) return false;

    const cleanInput = input.trim().toLowerCase();
    const expected = Array.isArray(step.expected_answer)
      ? step.expected_answer
      : [step.expected_answer];

    // 1. Direct string match (trimmed, lowercased, ignoring unit spaces)
    const directMatch = expected.some((exp) => {
      const cleanExp = exp.trim().toLowerCase();
      if (cleanInput === cleanExp) return true;
      // Strip common units like cm, °, deg, units
      const strippedInput = cleanInput.replace(/(cm|°|deg|degrees|units|\s)/g, '');
      const strippedExp = cleanExp.replace(/(cm|°|deg|degrees|units|\s)/g, '');
      return strippedInput === strippedExp;
    });

    if (directMatch) return true;

    // 2. Numeric equivalence for fractions and decimals (e.g. 3/5 == 0.6)
    const userNum = parseNumericValue(cleanInput);
    if (userNum !== null) {
      for (const exp of expected) {
        const expNum = parseNumericValue(exp);
        if (expNum !== null && Math.abs(userNum - expNum) < 0.015) {
          return true;
        }
      }
    }

    return false;
  };

  // Handle checking the user's answer
  const handleCheckAnswer = () => {
    if (!currentStep) return;

    if (!userAnswer.trim()) {
      setFeedbackMessage('Please enter your answer before checking!');
      setStatus('error');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    const isCorrect = validateAnswer(userAnswer, currentStep);

    if (isCorrect) {
      setStatus('success');
      setShake(false);
      triggerCelebration();
      if (soundEnabled) playSound('success');

      // Encouraging messages
      const positiveMsgs = [
        'Awesome job! That is completely correct!',
        'Spot on! Your geometric logic is brilliant!',
        'Excellent deduction! Keep this streak going!',
        'Correct! Formula applied with precision!'
      ];
      setFeedbackMessage(
        positiveMsgs[Math.floor(Math.random() * positiveMsgs.length)]
      );

      // Award XP
      const stepXp = 20;
      setEarnedSessionXp((prev) => prev + stepXp);
      setShowXpFloat(true);
      setTimeout(() => setShowXpFloat(false), 1400);
      if (onXpGain) onXpGain(stepXp);

      if (!completedSteps.includes(currentStepIndex)) {
        setCompletedSteps((prev) => [...prev, currentStepIndex]);
      }
    } else {
      setStatus('error');
      setShake(true);
      if (soundEnabled) playSound('error');
      setTimeout(() => setShake(false), 600);

      const attemptCount = (stepAttempts[currentStepIndex] || 0) + 1;
      setStepAttempts((prev) => ({ ...prev, [currentStepIndex]: attemptCount }));

      const errorMsgs = [
        'Not quite right. Double check your calculation!',
        'Almost there! Check the units or try simplifying.',
        'Review the equation above and give it another shot!'
      ];
      setFeedbackMessage(
        errorMsgs[Math.min(attemptCount - 1, errorMsgs.length - 1)]
      );
    }
  };

  // Handle advancing to next step or finishing
  const handleContinue = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
      triggerGrandCelebration();
      if (soundEnabled) playSound('complete');
      if (onComplete) {
        onComplete(earnedSessionXp + 20); // Bonus problem completion XP
      }
    }
  };

  // Handle key press inside input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (status === 'success') {
        handleContinue();
      } else {
        handleCheckAnswer();
      }
    }
  };

  // Append shortcut symbol to input
  const handleInsertShortcut = (symbol: string) => {
    setUserAnswer((prev) => prev + symbol);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Reset / Retry whole problem
  const handleRestart = () => {
    setCurrentStepIndex(0);
    setUserAnswer('');
    setStatus('idle');
    setCompletedSteps([]);
    setIsFinished(false);
    setEarnedSessionXp(0);
  };

  if (!currentStep && !isFinished) {
    return (
      <div className="p-8 text-center text-slate-500">
        No problem steps found.
      </div>
    );
  }

  // Completion screen (Duolingo style)
  if (isFinished) {
    return (
      <div
        id="problem-finished-screen"
        className="max-w-xl mx-auto w-full px-4 py-8 flex flex-col items-center text-center animate-fadeIn"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6 shadow-inner"
        >
          <Trophy className="w-12 h-12" />
        </motion.div>

        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          Lesson Completed!
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-md mb-8">
          You mastered all {totalSteps} micro-steps for{' '}
          <span className="font-semibold text-blue-600">{problemData.title}</span>.
        </p>

        {/* Gamified Stat Grid */}
        <div className="grid grid-cols-3 gap-3 w-full mb-8">
          <div className="bg-amber-50/80 border border-amber-200/70 rounded-2xl p-4 flex flex-col items-center">
            <div className="flex items-center gap-1 text-amber-600 font-bold text-lg sm:text-xl">
              <Zap className="w-5 h-5 fill-amber-500 text-amber-500" />
              <span>+{earnedSessionXp + 20}</span>
            </div>
            <span className="text-xs text-amber-800 font-medium mt-1 uppercase tracking-wider">
              Total XP
            </span>
          </div>

          <div className="bg-orange-50/80 border border-orange-200/70 rounded-2xl p-4 flex flex-col items-center">
            <div className="flex items-center gap-1 text-orange-600 font-bold text-lg sm:text-xl">
              <Flame className="w-5 h-5 fill-orange-500 text-orange-500" />
              <span>{streak + 1}</span>
            </div>
            <span className="text-xs text-orange-800 font-medium mt-1 uppercase tracking-wider">
              Day Streak
            </span>
          </div>

          <div className="bg-emerald-50/80 border border-emerald-200/70 rounded-2xl p-4 flex flex-col items-center">
            <div className="flex items-center gap-1 text-emerald-600 font-bold text-lg sm:text-xl">
              <Award className="w-5 h-5 text-emerald-600" />
              <span>100%</span>
            </div>
            <span className="text-xs text-emerald-800 font-medium mt-1 uppercase tracking-wider">
              Accuracy
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            type="button"
            id="restart-problem-btn"
            onClick={handleRestart}
            className="flex-1 py-3 px-4 rounded-xl border-2 border-slate-200 bg-white text-slate-700 font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
            Practice Again
          </button>
          {onBack && (
            <button
              type="button"
              id="next-lesson-btn"
              onClick={onBack}
              className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 active:translate-y-0.5"
            >
              <span>Back to Topics</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50/50 pb-28">
      {/* 1. TOP BAR (Gamified Header) */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          {/* Back Button */}
          {onBack && (
            <button
              type="button"
              id="stepper-back-btn"
              onClick={onBack}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title="Go Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          {/* Duolingo Segmented Progress Bar */}
          <div className="flex-1 flex items-center gap-1.5 h-3 bg-slate-100 p-1 rounded-full border border-slate-200/60">
            {steps.map((_, idx) => {
              const isDone = completedSteps.includes(idx) || idx < currentStepIndex;
              const isActive = idx === currentStepIndex;
              return (
                <div
                  key={idx}
                  className="flex-1 h-full rounded-full overflow-hidden transition-all duration-300 relative"
                >
                  <div
                    className={`h-full w-full rounded-full transition-all duration-300 ${
                      isDone
                        ? 'bg-emerald-500'
                        : isActive
                        ? 'bg-blue-500 animate-pulse'
                        : 'bg-slate-200'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Badges: Streak & XP */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Streak Badge */}
            <div
              id="streak-badge"
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200/70 text-orange-600 font-bold text-xs shadow-2xs"
            >
              <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
              <span>{streak}</span>
            </div>

            {/* XP Badge with floating animation */}
            <div
              id="xp-badge"
              className="relative flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200/70 text-amber-700 font-bold text-xs shadow-2xs"
            >
              <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{xp + earnedSessionXp}</span>

              {/* Floating +XP toast */}
              <AnimatePresence>
                {showXpFloat && (
                  <motion.span
                    initial={{ opacity: 0, y: 0, scale: 0.8 }}
                    animate={{ opacity: 1, y: -24, scale: 1.1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute -top-1 right-0 font-extrabold text-xs text-amber-600 bg-white px-2 py-0.5 rounded-full shadow-md border border-amber-200 pointer-events-none"
                  >
                    +20 XP!
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Sound Effects Toggle */}
            <button
              type="button"
              id="sound-toggle-btn"
              onClick={() => setSoundEnabled((prev) => !prev)}
              className="p-1.5 rounded-full text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-slate-600" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-3xl mx-auto w-full px-4 py-4 flex-1 flex flex-col gap-4">
        {/* Topic & Step Tracker Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider">
              Step {currentStep.step_number} of {totalSteps}
            </span>
            <span className="text-xs font-medium text-slate-500">
              {problemData.topic}
            </span>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {problemData.grade}
          </span>
        </div>

        {/* 2. DIAGRAM PANEL: GeometryCanvas if diagram_config is present */}
        {problemData.diagram_config && (
          <div id="diagram-section" className="w-full">
            <GeometryCanvas
              diagram_config={problemData.diagram_config}
              interactiveHint="Interactive right-angled triangle diagram"
            />
          </div>
        )}

        {/* 3. INSTRUCTION CARD */}
        <div
          id="instruction-card"
          className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-6 transition-all"
        >
          {/* Step Title */}
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
              {currentStep.step_number}
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {currentStep.title}
            </h3>
          </div>

          {/* Step Instruction Text */}
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
            {currentStep.instruction}
          </p>

          {/* Mathematical Equation rendered natively using BlockMath from react-katex */}
          {currentStep.latex_equation && (
            <div className="my-3 py-3 px-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center overflow-x-auto text-slate-900 shadow-inner">
              <BlockMath math={currentStep.latex_equation} />
            </div>
          )}
        </div>

        {/* 4. STUDENT INTERACTION ZONE */}
        <motion.div
          animate={shake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
          transition={{ duration: 0.4 }}
          id="student-interaction-card"
          className={`bg-white rounded-2xl border p-4 sm:p-5 shadow-xs transition-colors ${
            status === 'error'
              ? 'border-rose-300 bg-rose-50/20'
              : status === 'success'
              ? 'border-emerald-300 bg-emerald-50/20'
              : 'border-slate-200/90'
          }`}
        >
          {/* Task Question Prompt */}
          <div className="flex items-start gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <span className="font-semibold text-slate-800 text-sm sm:text-base">
              {currentStep.student_task}
            </span>
          </div>

          {/* Input & Action Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <input
                ref={inputRef}
                id="math-answer-input"
                type="text"
                value={userAnswer}
                onChange={(e) => {
                  setUserAnswer(e.target.value);
                  if (status !== 'idle') setStatus('idle');
                }}
                onKeyDown={handleKeyDown}
                placeholder={currentStep.unit ? `e.g. 5 or 5 ${currentStep.unit}` : 'Type your answer...'}
                className={`w-full px-4 py-3 text-lg font-semibold rounded-xl border bg-white placeholder:text-slate-400 focus:outline-none transition-all ${
                  status === 'error'
                    ? 'border-rose-400 focus:ring-2 focus:ring-rose-200 text-rose-900'
                    : status === 'success'
                    ? 'border-emerald-400 focus:ring-2 focus:ring-emerald-200 text-emerald-900'
                    : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-slate-900'
                }`}
              />
              {currentStep.unit && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold px-2 py-1 bg-slate-100 rounded text-slate-500 pointer-events-none">
                  {currentStep.unit}
                </span>
              )}
            </div>

            {/* Quick Keypad Helper Chips for Mobile math input */}
            {currentStep.keypad_shortcuts && currentStep.keypad_shortcuts.length > 0 && (
              <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                <span className="text-[11px] font-medium text-slate-400 uppercase mr-1">
                  Insert:
                </span>
                {currentStep.keypad_shortcuts.map((chip, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleInsertShortcut(chip)}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95 transition-transform"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 5. NEED A HINT? Expandable Accordion */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              type="button"
              id="toggle-hint-btn"
              onClick={() => setIsHintOpen((prev) => !prev)}
              className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-800 transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>Need a Hint?</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isHintOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {isHintOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 text-xs sm:text-sm text-amber-900 bg-amber-50/70 border border-amber-200/70 rounded-xl p-3 leading-relaxed overflow-hidden"
                >
                  <span className="font-semibold block mb-1">💡 Coach Tip:</span>
                  <div className="katex-compact">
                    <InlineMath math={currentStep.hint} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Step Explanation Card after success */}
        {status === 'success' && currentStep.explanation && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-xs sm:text-sm text-emerald-900 flex items-start gap-2.5"
          >
            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block mb-0.5">Solution Breakdown:</span>
              <span>{currentStep.explanation}</span>
            </div>
          </motion.div>
        )}
      </main>

      {/* 6. DOCKED ACTION FOOTER (Duolingo Style) */}
      <footer
        id="action-footer"
        className={`fixed bottom-0 left-0 right-0 z-40 border-t transition-colors duration-300 p-4 ${
          status === 'success'
            ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
            : status === 'error'
            ? 'bg-rose-50 border-rose-300 text-rose-900'
            : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Feedback Message Area */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {status === 'success' ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-sm block text-emerald-900">
                    Correct!
                  </span>
                  <span className="text-xs text-emerald-700">
                    {feedbackMessage}
                  </span>
                </div>
              </div>
            ) : status === 'error' ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <XCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-sm block text-rose-900">
                    Not Quite
                  </span>
                  <span className="text-xs text-rose-700">
                    {feedbackMessage}
                  </span>
                </div>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
                <BookOpen className="w-4 h-4 text-slate-400" />
                <span>Enter your answer to verify step progression</span>
              </div>
            )}
          </div>

          {/* Primary Action Button */}
          <div className="w-full sm:w-auto flex items-center gap-2 justify-end">
            {status === 'success' ? (
              <button
                type="button"
                id="continue-step-btn"
                onClick={handleContinue}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-base transition-all shadow-md shadow-emerald-600/25 active:translate-y-0.5 flex items-center justify-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="button"
                id="check-answer-btn"
                onClick={handleCheckAnswer}
                className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-base transition-all shadow-md active:translate-y-0.5 flex items-center justify-center gap-2 ${
                  status === 'error'
                    ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/25'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/25'
                }`}
              >
                <span>{status === 'error' ? 'Try Again' : 'Check Answer'}</span>
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MathProblemStepper;
