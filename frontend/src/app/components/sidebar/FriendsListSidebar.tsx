"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Friend = {
    id: string;
    userName: string;
    avatar_url: string;
    status: "online" | "offline" | "ingame";
};

// Mock users for testing
const USERS = {
    alice: {
        id: "alice",
        userName: "Alice",
        avatar_url: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    bob: {
        id: "bob",
        userName: "Bob",
        avatar_url: "https://randomuser.me/api/portraits/men/75.jpg",
    },
};

interface FriendsListSidebarProps {
    currentUser: "alice" | "bob";
    onlineUsers: string[];
}

export default function FriendsListSidebar({ currentUser, onlineUsers }: FriendsListSidebarProps) {
    const [friends, setFriends] = useState<Friend[]>([]);

    // Initialize friends list based on current user
    useEffect(() => {
        const otherUserKey = currentUser === "alice" ? "bob" : "alice";
        const otherUser = USERS[otherUserKey];

        setFriends([
            {
                id: otherUser.id,
                userName: otherUser.userName,
                avatar_url: otherUser.avatar_url,
                status: "offline", // Default status
            },
        ]);
    }, [currentUser]);

    // Update friends status when onlineUsers changes
    useEffect(() => {
        setFriends((prevFriends) =>
            prevFriends.map((friend) => ({
                ...friend,
                status: onlineUsers.includes(friend.id) ? "online" : "offline",
            }))
        );
    }, [onlineUsers]);

    return (
        <div className="h-full flex flex-col bg-noir/80 border-l border-primary/30 text-blanc backdrop-blur-sm shadow-[0_0_15px_rgba(74,32,64,0.5)]">
            {/* Header */}
            <div className="p-4 border-b border-primary/30 flex justify-between items-center">
                <h3 className="text-sm font-bold text-cta uppercase tracking-wider">
                    Liste d'amis
                </h3>
                <span className="text-xs text-gray-400">
                    {friends.filter(f => f.status === "online").length} / {friends.length}
                </span>
            </div>

            {/* Friends List */}
            <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-2">
                {friends.map((friend) => (
                    <div
                        key={friend.id}
                        className="group flex items-center gap-3 p-2 rounded hover:bg-primary/20 transition-colors cursor-pointer"
                    >
                        <div className="relative w-10 h-10">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-600 group-hover:border-secondary transition-colors">
                                <Image
                                    src={friend.avatar_url}
                                    alt={friend.userName}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {/* Status Indicator */}
                            <div
                                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-noir ${friend.status === "online"
                                        ? "bg-green-500 shadow-[0_0_5px_#22c55e]"
                                        : friend.status === "ingame"
                                            ? "bg-blue-500 shadow-[0_0_5px_#3b82f6]"
                                            : "bg-gray-500"
                                    }`}
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-200 group-hover:text-secondary transition-colors">
                                {friend.userName}
                            </span>
                            <span className="text-[10px] text-gray-500 uppercase">
                                {friend.status === "online"
                                    ? "En ligne"
                                    : friend.status === "ingame"
                                        ? "En jeu"
                                        : "Hors ligne"}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search / Add Friend */}
            <div className="p-4 border-t border-primary/30">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        className="w-full bg-noir border border-primary/50 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-secondary transition-colors"
                    />
                    <span className="absolute right-3 top-2 text-gray-500 text-xs">🔍</span>
                </div>
            </div>
        </div>
    );
}
