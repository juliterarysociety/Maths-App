import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Map,
  FileText,
  PieChart,
  Trophy,
  User,
  Sparkles,
  Flame,
  Gem,
  BookOpen,
  ChevronRight,
  GraduationCap,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';

interface DesktopSidebarProps {
  streak?: number;
  xp?: number;
  currentCourse?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const NAV_ITEMS = [
  { path: '/learn', label: 'Learn Path', description: 'Curriculum & nodes', icon: Map },
  { path: '/papers', label: 'Board Mocks', description: 'Sample & past papers', icon: FileText },
  { path: '/analytics', label: 'Analytics', description: 'XP chart & mastery', icon: PieChart },
  { path: '/arena', label: '1v1 Arena', description: 'Speed math duels', icon: Trophy },
  { path: '/profile', label: 'Profile', description: 'Badges & stats', icon: User },
];

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  streak = 12,
  xp = 450,
  currentCourse = 'Class 10 Math (CBSE)',
  isCollapsed = false,
  onToggleCollapse
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname === '/' ? '/learn' : location.pathname;

  return (
    <aside
      id="desktop-sidebar"
      aria-label="Sidebar Navigation"
      className={`hidden md:flex flex-col justify-between ${
        isCollapsed ? 'w-20' : 'w-64'
      } fixed top-0 bottom-0 left-0 z-40 bg-white border-r border-[#E5E7EB] shadow-xs select-none transition-all duration-300 ease-in-out`}
    >
      {/* Top Section: Brand & Syllabus Badge */}
      <div>
        {/* Brand Logo & Collapse Toggle */}
        <div
          className={`h-[60px] flex items-center border-b border-[#E5E7EB] transition-all ${
            isCollapsed ? 'px-3 justify-center' : 'px-4 justify-between'
          }`}
        >
          {!isCollapsed ? (
            <>
              <div
                className="flex items-center gap-2.5 cursor-pointer"
                onClick={() => navigate('/learn')}
                title="Go to Learn Path"
              >
                <div className="w-9 h-9 rounded-lg bg-[#FFE757] text-[#333333] flex items-center justify-center shadow-xs shrink-0 font-bold border border-[#E5E7EB]">
                  <GraduationCap className="w-5 h-5 text-[#EF3F52]" />
                </div>
                <div className="overflow-hidden whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-lg text-[#333333] tracking-tight leading-none">
                      MathStep
                    </span>
                    <span className="bg-[#FFE757] text-[#EF3F52] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      PRO
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-[#64748B] block mt-0.5 leading-none">
                    CBSE & ICSE Math
                  </span>
                </div>
              </div>

              {/* Single Collapse Button in Sidebar Header */}
              {onToggleCollapse && (
                <button
                  type="button"
                  onClick={onToggleCollapse}
                  title="Collapse sidebar (Ctrl+B)"
                  aria-label="Collapse sidebar"
                  className="p-2 rounded-md text-[#333333] hover:bg-[#F8F6EE] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFE757] shrink-0"
                >
                  <PanelLeftClose className="w-4 h-4" />
                </button>
              )}
            </>
          ) : (
            /* Collapsed Header: Expand Toggle Button with Tooltip */
            onToggleCollapse && (
              <button
                type="button"
                onClick={onToggleCollapse}
                title="Expand sidebar (Ctrl+B)"
                aria-label="Expand sidebar"
                className="w-11 h-11 rounded-lg bg-[#F8F6EE] hover:bg-[#FFE757] text-[#333333] flex items-center justify-center transition-all border border-[#E5E7EB] shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFE757]"
              >
                <PanelLeftOpen className="w-5 h-5" />
              </button>
            )
          )}
        </div>

        {/* Current Target Course Card */}
        <div className="px-3 mt-3">
          {isCollapsed ? (
            <div
              title={`Target Exam: ${currentCourse}`}
              className="p-2.5 rounded-lg bg-[#F8F6EE] border border-[#E5E7EB] flex items-center justify-center text-[#EF3F52] hover:bg-[#FFE757]/30 transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
            </div>
          ) : (
            <div className="p-3 rounded-lg bg-[#F8F6EE] border border-[#E5E7EB] flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <BookOpen className="w-4 h-4 text-[#EF3F52] shrink-0" />
                <div className="truncate">
                  <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">
                    Target Exam
                  </span>
                  <span className="text-xs font-bold text-[#333333] truncate block">
                    {currentCourse}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="px-3 mt-4 space-y-1.5" aria-label="Desktop Main Navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPath === item.path;
            const Icon = item.icon;

            return (
              <button
                key={item.path}
                type="button"
                onClick={() => navigate(item.path)}
                aria-current={isActive ? 'page' : undefined}
                title={isCollapsed ? `${item.label} (${item.description})` : undefined}
                className={`w-full flex items-center ${
                  isCollapsed ? 'justify-center p-3' : 'justify-between px-3 py-2.5'
                } rounded-lg font-bold text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFE757] ${
                  isActive
                    ? 'bg-[#FFE757] text-[#333333] shadow-xs'
                    : 'text-[#333333] hover:bg-[#F8F6EE]'
                }`}
              >
                <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
                  <Icon
                    className={`w-5 h-5 shrink-0 ${
                      isActive ? 'text-[#EF3F52]' : 'text-[#64748B]'
                    }`}
                  />
                  {!isCollapsed && (
                    <div className="text-left overflow-hidden whitespace-nowrap">
                      <span className="block leading-tight font-bold">{item.label}</span>
                      <span
                        className={`text-[10px] block leading-tight mt-0.5 ${
                          isActive ? 'text-[#333333]/80' : 'text-[#64748B]'
                        }`}
                      >
                        {item.description}
                      </span>
                    </div>
                  )}
                </div>

                {!isCollapsed && isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EF3F52] shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Card with Streak & XP */}
      <div className="p-3 border-t border-[#E5E7EB] bg-[#F8F6EE]">
        {isCollapsed ? (
          <div className="flex flex-col items-center gap-2.5">
            {/* Collapsed Streak Indicator */}
            <div
              title={`${streak} Days Streak`}
              className="w-10 h-10 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center text-[#EF3F52] shadow-xs cursor-pointer"
            >
              <Flame className="w-5 h-5 fill-[#EF3F52] text-[#EF3F52]" />
            </div>

            {/* Collapsed XP Indicator */}
            <div
              title={`${xp} Diamonds`}
              className="w-10 h-10 rounded-lg bg-[#FFE757] border border-[#FFE757] flex items-center justify-center text-[#333333] shadow-xs cursor-pointer"
            >
              <Gem className="w-5 h-5 fill-[#EF3F52] text-[#EF3F52]" />
            </div>

            {/* Collapsed Profile Button */}
            <button
              type="button"
              onClick={() => navigate('/profile')}
              title="Rohan Patel - Silver League #3"
              className="w-10 h-10 rounded-full bg-[#FFE757] text-[#333333] font-bold text-xs flex items-center justify-center shadow-xs border border-[#E5E7EB] hover:ring-2 hover:ring-[#EF3F52] transition-all focus:outline-none"
            >
              RP
            </button>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-white border border-[#E5E7EB] rounded-lg p-2 flex items-center gap-1.5 shadow-xs">
                <Flame className="w-4 h-4 fill-[#EF3F52] text-[#EF3F52] shrink-0" />
                <div>
                  <span className="text-xs font-bold text-[#333333] block leading-tight tabular-nums">
                    {streak} Days
                  </span>
                  <span className="text-[9px] uppercase font-bold text-[#64748B] block leading-tight">
                    Streak
                  </span>
                </div>
              </div>

              <div className="bg-[#FFE757] border border-[#FFE757] rounded-lg p-2 flex items-center gap-1.5 shadow-xs">
                <Gem className="w-4 h-4 fill-[#EF3F52] text-[#EF3F52] shrink-0" />
                <div>
                  <span className="text-xs font-bold text-[#333333] block leading-tight tabular-nums">
                    {xp} XP
                  </span>
                  <span className="text-[9px] uppercase font-bold text-[#333333]/80 block leading-tight">
                    Diamonds
                  </span>
                </div>
              </div>
            </div>

            {/* User Profile Mini Bar */}
            <div
              onClick={() => navigate('/profile')}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-white cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FFE757] text-[#333333] font-bold text-xs flex items-center justify-center border border-[#E5E7EB]">
                  RP
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-[#333333] block leading-tight">
                    Rohan Patel
                  </span>
                  <span className="text-[10px] text-[#EF3F52] font-bold block leading-tight">
                    Silver League #3
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#64748B]" />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default DesktopSidebar;
