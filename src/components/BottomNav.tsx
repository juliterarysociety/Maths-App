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
      className="md:hidden fixed bottom-0 left-0 right-0 h-[70px] z-40 bg-white/95 backdrop-blur-md border-t border-[#E5E7EB] shadow-[0_-4px_16px_rgba(170,170,170,0.15)] px-2"
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
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              className="relative flex flex-col items-center justify-center flex-1 h-full py-1.5 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFE757] rounded-full select-none transition-colors"
            >
              {/* Soft Pill background for Active tab with spring bounce */}
              <motion.div
                whileTap={{ scale: 0.88 }}
                transition={{ type: 'spring', stiffness: 450, damping: 18 }}
                className={`relative px-3.5 py-1.5 rounded-full flex flex-col items-center gap-1 transition-all ${
                  isActive
                    ? 'bg-[#FFE757] text-[#333333]'
                    : 'text-[#64748B] hover:text-[#333333]'
                }`}
              >
                {/* Active Indicator Ring */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-[#FFE757] rounded-full -z-10 border border-[#E5E7EB] shadow-xs"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}

                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.5] text-[#EF3F52]' : 'stroke-2 text-[#64748B]'
                  }`}
                />

                {/* Text labels */}
                <span
                  className={`text-[10px] font-bold tracking-tight hidden sm:block ${
                    isActive ? 'text-[#333333]' : 'text-[#64748B]'
                  }`}
                >
                  {item.label}
                </span>

                {/* Active dot indicator on mobile screens */}
                {isActive && (
                  <span className="sm:hidden w-1 h-1 rounded-full bg-[#EF3F52]" />
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
