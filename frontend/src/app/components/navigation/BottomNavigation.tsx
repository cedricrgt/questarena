"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

interface BottomNavigationProps {
  onFriendsClick: () => void;
  onCreateClick: () => void;
  friendsOnlineCount?: number;
}

export default function BottomNavigation({
  onFriendsClick,
  onCreateClick,
  friendsOnlineCount = 0,
}: BottomNavigationProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const navItems = [
    {
      id: "home",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      label: "Home",
      onClick: () => router.push("/"),
      active: pathname === "/",
    },
    {
      id: "leaderboard",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      ),
      label: "Classement",
      onClick: () => router.push("/leaderboard"),
      active: pathname === "/leaderboard",
    },
    {
      id: "create",
      icon: null, // FAB handled separately
      label: "",
      onClick: onCreateClick,
      active: false,
      isFAB: true,
    },
    {
      id: "friends",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      label: "Amis",
      onClick: onFriendsClick,
      active: false,
      badge: isLoggedIn && friendsOnlineCount > 0 ? friendsOnlineCount : undefined,
    },
    {
      id: "profile",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      label: "Profil",
      onClick: () => router.push(isLoggedIn ? "/account/dashboard" : "/"),
      active: pathname === "/account/dashboard",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-noir/95 backdrop-blur-md border-t border-primary/30 z-30 md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          if (item.isFAB) {
            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className="relative -mt-8 w-14 h-14 bg-gradient-to-br from-cta to-cta/80 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(233,184,114,0.6)] hover:scale-110 transition-transform"
                aria-label="Créer un défi"
              >
                <svg
                  className="w-7 h-7 text-noir"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={item.onClick}
              className={`relative flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                item.active
                  ? "text-secondary"
                  : "text-gray-400 hover:text-white"
              }`}
              aria-label={item.label}
            >
              {item.badge !== undefined && (
                <span className="absolute top-1 right-1/4 bg-cta text-noir text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
              {item.icon}
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
