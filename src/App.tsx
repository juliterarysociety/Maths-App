import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import TopHeader from './components/TopHeader';
import BottomNav from './components/BottomNav';
import DesktopSidebar from './components/DesktopSidebar';
import LearnTab from './components/LearnTab';
import PapersTab from './pages/PapersTab';
import AnalyticsTab from './pages/AnalyticsTab';
import ArenaTab from './pages/ArenaTab';
import ProfileTab from './pages/ProfileTab';
import MathProblemStepper from './components/MathProblemStepper';
import { getProblemById, defaultProblem } from './data/problemBank';
import { LessonNode } from './data/syllabusData';
import { ProblemData } from './types';

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

function AppContent() {
  const location = useLocation();
  const [streak, setStreak] = useState(12);
  const [xp, setXp] = useState(450);
  const [course, setCourse] = useState('Class 10 Math (CBSE)');
  const [activeProblem, setActiveProblem] = useState<ProblemData | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    try {
      return localStorage.getItem('mathstep_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('mathstep_sidebar_collapsed', String(next));
      } catch {}
      return next;
    });
  };

  // Keyboard shortcut Ctrl+B or Cmd+B to toggle sidebar on desktop
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleStartLesson = (node: LessonNode) => {
    // Dynamically match problem from problemBank using node.problemId
    const matched = getProblemById(node.problemId) || defaultProblem;
    setActiveProblem(matched);
  };

  const handleLessonComplete = (completionBonus: number = 20) => {
    setXp((prev) => prev + completionBonus);
    setStreak((prev) => prev + 1);
  };

  const handleXpGain = (gained: number) => {
    setXp((prev) => prev + gained);
  };

  // If activeProblem is running, show the full-screen interactive math stepper with smooth fade/scale
  if (activeProblem) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 bg-white overflow-y-auto"
      >
        <MathProblemStepper
          problemData={activeProblem}
          streak={streak}
          xp={xp}
          onBack={() => setActiveProblem(null)}
          onComplete={(earned) => {
            handleLessonComplete(earned);
          }}
          onXpGain={handleXpGain}
        />
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F6EE] text-[#333333] flex flex-col font-sans antialiased select-none">
      {/* Desktop Left Sidebar (Visible on md and larger screens) */}
      <DesktopSidebar
        streak={streak}
        xp={xp}
        currentCourse={course}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebar}
      />

      {/* 1. Fixed TopHeader (Height: ~60px, offset by left sidebar on desktop) */}
      <TopHeader
        streak={streak}
        xp={xp}
        currentCourse={course}
        onCourseChange={(newCourse) => setCourse(newCourse)}
        isSidebarCollapsed={isSidebarCollapsed}
      />

      {/* 2. Scrollable main ContentArea taking up remaining height */}
      <main
        id="main-content-area"
        className={`flex-1 w-full pt-[60px] pb-[70px] md:pb-12 ${
          isSidebarCollapsed ? 'md:pl-20' : 'md:pl-64'
        } transition-all duration-300 ease-in-out overflow-y-auto bg-[#F8F6EE] min-h-screen`}
      >
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Navigate to="/learn" replace />} />
            <Route
              path="/learn"
              element={
                <PageTransition>
                  <LearnTab onStartLesson={handleStartLesson} />
                </PageTransition>
              }
            />
            <Route
              path="/papers"
              element={
                <PageTransition>
                  <PapersTab />
                </PageTransition>
              }
            />
            <Route
              path="/analytics"
              element={
                <PageTransition>
                  <AnalyticsTab />
                </PageTransition>
              }
            />
            <Route
              path="/arena"
              element={
                <PageTransition>
                  <ArenaTab />
                </PageTransition>
              }
            />
            <Route
              path="/profile"
              element={
                <PageTransition>
                  <ProfileTab streak={streak} xp={xp} course={course} />
                </PageTransition>
              }
            />
            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/learn" replace />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* 3. Fixed BottomNavigation (Height: ~70px) pinned to bottom */}
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
