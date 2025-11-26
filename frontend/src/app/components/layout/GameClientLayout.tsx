"use client";

import { ReactNode, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import UserProfileSidebar from "../sidebar/UserProfileSidebar";
import FriendsListSidebar from "../sidebar/FriendsListSidebar";
import GlobalStatsSidebar from "../sidebar/GlobalStatsSidebar";
import GuestRightSidebar from "../sidebar/GuestRightSidebar";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";
import Drawer from "../drawer/Drawer";
import BottomNavigation from "../navigation/BottomNavigation";
import { useNavigation } from "@/lib/navigation-context";
import { useAuth } from "@/lib/auth-context";
import CreateChallengeModal from "../createChallengeModal/createChallengeModal";

interface GameClientLayoutProps {
    children: ReactNode;
}



export default function GameClientLayout({ children }: GameClientLayoutProps) {
    const { isLoggedIn, user } = useAuth();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const [onlineCount, setOnlineCount] = useState(0); // Total count including guests
    const { viewState, setViewState } = useNavigation();
    
    // Drawer states for mobile
    const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
    const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);

    // WebSocket Connection
    useEffect(() => {
        // Disconnect previous socket if any
        if (socket) {
            socket.disconnect();
        }

        // If logged in, connect with userId. If not, connect without (or with guest ID if needed)
        // For now, even guests connect to see online count
        const query = isLoggedIn && user ? { userId: user.id } : {};

        const newSocket = io("http://localhost:3000", {
            query,
        });
        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log(`Connected to WebSocket as ${isLoggedIn ? user?.name : "Guest"}`);
        });

        newSocket.on("onlineUsers", (data: { count: number; users: string[] }) => {
            setOnlineUsers(data.users);
            setOnlineCount(data.count); // Store the total count
        });

        return () => {
            newSocket.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn, user]);

    const handleLoginSuccess = () => {
        setViewState("home");
    };

    const renderMainContent = () => {
        if (isLoggedIn) return children;

        switch (viewState) {
            case "login":
                return <LoginForm onLoginSuccess={handleLoginSuccess} onSwitchToRegister={() => setViewState("register")} />;
            case "register":
                return <RegisterForm onRegisterSuccess={handleLoginSuccess} onSwitchToLogin={() => setViewState("login")} />;
            default:
                return children;
        }
    };

    // Count online friends (authenticated users only, not guests)
    const friendsOnlineCount = onlineUsers.length;

    return (
        <div className="flex h-screen overflow-hidden bg-noir text-blanc">
            {/* Left Sidebar - Desktop & Tablet */}
            <aside className="hidden lg:block w-64 h-full flex-shrink-0 z-10">
                {isLoggedIn ? (
                    <UserProfileSidebar />
                ) : (
                    <GlobalStatsSidebar onlineCount={onlineCount} />
                )}
            </aside>

            {/* Left Drawer - Mobile */}
            <Drawer
                isOpen={leftDrawerOpen}
                onClose={() => setLeftDrawerOpen(false)}
                position="left"
            >
                {isLoggedIn ? (
                    <UserProfileSidebar />
                ) : (
                    <GlobalStatsSidebar onlineCount={onlineCount} />
                )}
            </Drawer>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto pb-20 md:pb-0 neon-scrollbar relative">
                {/* Centered neon border decoration */}
                <div className="sticky top-0 left-0 right-0 z-10 flex justify-center pointer-events-none">
                    <div className="w-3/4 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent shadow-[0_0_20px_rgba(169,111,255,0.8),0_0_40px_rgba(169,111,255,0.4)]" />
                </div>
                {renderMainContent()}
            </main>

            {/* Right Sidebar - Desktop */}
            <aside className="hidden xl:block w-64 h-full flex-shrink-0 z-10">
                {isLoggedIn ? (
                    <FriendsListSidebar
                        currentUser={user?.id || "guest"}
                        onlineUsers={onlineUsers}
                    />
                ) : (
                    <GuestRightSidebar
                        onLogin={() => setViewState("login")}
                        onRegister={() => setViewState("register")}
                    />
                )}
            </aside>

            {/* Right Drawer - Mobile & Tablet */}
            <Drawer
                isOpen={rightDrawerOpen}
                onClose={() => setRightDrawerOpen(false)}
                position="right"
            >
                {isLoggedIn ? (
                    <FriendsListSidebar
                        currentUser={user?.id || "guest"}
                        onlineUsers={onlineUsers}
                    />
                ) : (
                    <GuestRightSidebar
                        onLogin={() => setViewState("login")}
                        onRegister={() => setViewState("register")}
                    />
                )}
            </Drawer>

            {/* Bottom Navigation - Mobile only */}
            <BottomNavigation
                onFriendsClick={() => setRightDrawerOpen(true)}
                onCreateClick={() => setCreateModalOpen(true)}
                friendsOnlineCount={friendsOnlineCount}
            />

            {/* Hamburger Menu Button - Mobile & Tablet (Left Sidebar) */}
            <button
                onClick={() => setLeftDrawerOpen(true)}
                className="fixed top-4 left-4 z-20 lg:hidden bg-noir/80 backdrop-blur-sm border border-primary/30 rounded-lg p-2 text-secondary hover:bg-primary/20 transition-colors shadow-lg"
                aria-label="Open menu"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>

            {/* Friends/Login Button - Tablet only (Right Sidebar) */}
            <button
                onClick={() => setRightDrawerOpen(true)}
                className="fixed top-4 right-4 z-20 md:block xl:hidden bg-noir/80 backdrop-blur-sm border border-primary/30 rounded-lg p-2 text-secondary hover:bg-primary/20 transition-colors shadow-lg hidden"
                aria-label="Open friends/login"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                </svg>
                {friendsOnlineCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-cta text-noir text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {friendsOnlineCount}
                    </span>
                )}
            </button>

            {/* Create Challenge Modal */}
            {createModalOpen && (
                <CreateChallengeModal />
            )}
        </div>
    );
}
