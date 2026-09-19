import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import TopHeader from './components/TopHeader';
import BottomNav from './components/BottomNav';
import LearnTab from './components/LearnTab';
import PapersTab from './pages/PapersTab';
import AnalyticsTab from './pages/AnalyticsTab';
import ArenaTab from './pages/ArenaTab';
import ProfileTab from './pages/ProfileTab';
import MathProblemStepper from './components/MathProblemStepper';
import { mockProblem, sampleProblems } from './data/mockProblem.js';
import { LessonNode } from './data/syllabusData';
import { ProblemData } from './types';

function AppContent() {
  const [streak, setStreak] = useState(12);
  const [xp, setXp] = useState(450);
  const [course, setCourse] = useState('Class 10 Math (CBSE)');
  const [activeProblem, setActiveProblem] = useState<ProblemData | null>(null);

  const handleStartLesson = (node: LessonNode) => {
    // Match problem from mock data if available
    const matched =
      sampleProblems.find((p) => p.id === node.problemId) || mockProblem;
    setActiveProblem(matched);
  };

  const handleLessonComplete = (earnedXp: number) => {
    setXp((prev) => prev + earnedXp);
    setStreak((prev) => prev + 1);
  };

  const handleXpGain = (gained: number) => {
    setXp((prev) => prev + gained);
  };

  // If activeProblem is running, show the full-screen interactive math stepper
  if (activeProblem) {
    return (
      <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased select-none">
      {/* 1. Fixed TopHeader (Height: ~60px) */}
      <TopHeader
        streak={streak}
        xp={xp}
        currentCourse={course}
        onCourseChange={(newCourse) => setCourse(newCourse)}
      />

      {/* 2. Scrollable main ContentArea taking up remaining height */}
      <main
        id="main-content-area"
        className="flex-1 w-full pt-[60px] pb-[70px] overflow-y-auto bg-slate-50 min-h-screen"
      >
        <Routes>
          <Route path="/" element={<Navigate to="/learn" replace />} />
          <Route
            path="/learn"
            element={<LearnTab onStartLesson={handleStartLesson} />}
          />
          <Route path="/papers" element={<PapersTab />} />
          <Route path="/analytics" element={<AnalyticsTab />} />
          <Route path="/arena" element={<ArenaTab />} />
          <Route
            path="/profile"
            element={
              <ProfileTab streak={streak} xp={xp} course={course} />
            }
          />
          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/learn" replace />} />
        </Routes>
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
