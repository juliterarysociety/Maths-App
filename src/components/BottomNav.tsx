import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Map, FileText, PieChart, Trophy, User } from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { path: '/learn', label: 'Learn', icon: Map },
  { path: '/papers', label: 'Papers', icon: FileText },
  { path: '/analytics', label: 'Analytics', icon: PieChart },
  { path: '/arena', label: 'Arena', icon: Trophy },
  { path: '/profile', label: 'Profile', icon: User },
];

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Match / or /learn
  const currentPath = location.pathname === '/' ? '/learn' : location.pathname;

  return (
    <nav
      id="bottom-navigation"
      className="fixed bottom-0 left-0 right-0 h-[70px] z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_16px_rgba(0,0,0,0.03)] px-2"
    >
      <div className="max-w-md mx-auto h-full flex items-center justify-around">
        {NAV_ITEMS.map((item) => {
          const isActive = currentPath === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              id={`nav-${item.label.toLowerCase()}-btn`}
              type="button"
              onClick={() => navigate(item.path)}
              className="relative flex flex-col items-center justify-center flex-1 h-full py-1.5 focus:outline-none select-none transition-colors"
            >
              {/* Soft Pill background for Active tab with spring bounce */}
              <motion.div
                whileTap={{ scale: 0.84 }}
                transition={{ type: 'spring', stiffness: 450, damping: 18 }}
                className={`relative px-3.5 py-1.5 rounded-2xl flex flex-col items-center gap-1 transition-all ${
                  isActive
                    ? 'bg-blue-50/90 text-blue-600'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {/* Active Indicator Ring or Glow */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-blue-100/70 rounded-2xl -z-10 border border-blue-200/60 shadow-2xs"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}

                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.5]' : 'stroke-2'
                  }`}
                />

                {/* Hide text labels on smaller screens to keep it ultra-clean on mobile */}
                <span
                  className={`text-[10px] font-bold tracking-tight hidden sm:block ${
                    isActive ? 'text-blue-600' : 'text-slate-400'
                  }`}
                >
                  {item.label}
                </span>

                {/* Active dot indicator on mobile screens */}
                {isActive && (
                  <span className="sm:hidden w-1 h-1 rounded-full bg-blue-600" />
                )}
              </motion.div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
