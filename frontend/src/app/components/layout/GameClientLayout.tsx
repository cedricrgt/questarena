"use client";

import { ReactNode, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import UserProfileSidebar from "../sidebar/UserProfileSidebar";
import FriendsListSidebar from "../sidebar/FriendsListSidebar";
import GlobalStatsSidebar from "../sidebar/GlobalStatsSidebar";
import GuestRightSidebar from "../sidebar/GuestRightSidebar";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";
import { useNavigation } from "@/lib/navigation-context";
import { useAuth } from "@/lib/auth-context";

interface GameClientLayoutProps {
    children: ReactNode;
}

type ViewState = "home" | "login" | "register";

export default function GameClientLayout({ children }: GameClientLayoutProps) {
    const { isLoggedIn, user, logout } = useAuth();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const { viewState, setViewState } = useNavigation();

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
        });

        return () => {
            newSocket.disconnect();
        };
    }, [isLoggedIn, user]);

    const handleLoginSuccess = () => {
        setViewState("home");
    };

    const renderMainContent = () => {
        if (isLoggedIn) return children;

        switch (viewState) {
            case "login":
                return (
                    <div className="flex items-center justify-center min-h-full">
                        <LoginForm
                            onLoginSuccess={handleLoginSuccess}
                            onSwitchToRegister={() => setViewState("register")}
                        />
                    </div>
                );
            case "register":
                return (
                    <div className="flex items-center justify-center min-h-full">
                        <RegisterForm
                            onRegisterSuccess={handleLoginSuccess}
                            onSwitchToLogin={() => setViewState("login")}
                        />
                    </div>
                );
            default:
                return children;
        }
    };

    return (
        <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-[url('/img/bg-texture.png')] bg-cover bg-center">
            {/* Left Sidebar */}
            <aside className="hidden lg:block w-72 h-full flex-shrink-0 z-10">
                {isLoggedIn ? (
                    <UserProfileSidebar />
                ) : (
                    <GlobalStatsSidebar onlineCount={onlineUsers.length} />
                )}
            </aside>

            {/* Main Content */}
            <main className="flex-1 h-full overflow-y-auto relative neon-scrollbar">
                {/* Decorative top bar/border */}
                <div className="sticky top-0 z-20 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-85" />

                <div className="min-h-full p-6 pb-20">
                    {renderMainContent()}
                </div>
            </main>

            {/* Right Sidebar */}
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
        </div>
    );
}
