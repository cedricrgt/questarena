"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { apiFetch } from "@/lib/api";
import UserProfileModal from "../modal/UserProfileModal";

type Friend = {
  id: string;
  userName: string;
  avatar_url: string;
  status: "online" | "offline" | "ingame";
};

interface FriendsListSidebarProps {
  currentUser: string;
  onlineUsers: string[];
}

export default function FriendsListSidebar({
  currentUser,
  onlineUsers,
}: FriendsListSidebarProps) {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Friend[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Fetch friends list
  const fetchFriends = async () => {
    try {
      const friendsData = await apiFetch("/friend");
      setFriends(friendsData);
    } catch (error) {
      // User is not authenticated or error fetching friends
      console.error("Failed to fetch friends:", error);
      setFriends([]);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  // Update friends status when onlineUsers changes
  useEffect(() => {
    setFriends((prevFriends) =>
      prevFriends.map((friend) => ({
        ...friend,
        status: onlineUsers.includes(friend.id) ? "online" : "offline",
      }))
    );
  }, [onlineUsers]);

  // Search users
  useEffect(() => {
    const searchUsers = async () => {
      if (searchQuery.trim().length === 0) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        const results = await apiFetch(`/user/search?q=${encodeURIComponent(searchQuery)}`);
        setSearchResults(
          results.map((user: any) => ({
            ...user,
            status: onlineUsers.includes(user.id) ? "online" : "offline",
          }))
        );
      } catch (error) {
        console.error("Failed to search users:", error);
        setSearchResults([]);
        // If search fails, user might not be authenticated or there's a server error
        // We'll just show empty results instead of crashing
      }
    };

    const debounceTimer = setTimeout(searchUsers, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, onlineUsers]);

  const displayList = isSearching ? searchResults : friends;

  return (
    <>
      <div className="h-full flex flex-col bg-noir/80 border-l border-primary/30 text-blanc backdrop-blur-sm shadow-[0_0_15px_rgba(74,32,64,0.5)]">
        {/* Header */}
        <div className="p-4 border-b border-primary/30 flex justify-between items-center">
          <h3 className="text-sm font-bold text-cta uppercase tracking-wider">
            {isSearching ? "Recherche" : "Liste d'amis"}
          </h3>
          {!isSearching && (
            <span className="text-xs text-gray-400">
              {friends.filter((f) => f.status === "online").length} /{" "}
              {friends.length}
            </span>
          )}
        </div>

        {/* Search Input */}
        <div className="p-4 border-b border-primary/30">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-noir border border-primary/50 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-secondary transition-colors"
            />
            <span className="absolute right-3 top-2 text-gray-500 text-xs">
              🔍
            </span>
          </div>
        </div>

        {/* Friends/Search Results List */}
        <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-2">
          {displayList.length === 0 ? (
            <div className="text-center text-gray-400 text-xs mt-4">
              {isSearching
                ? "Aucun utilisateur trouvé"
                : "Aucun ami pour le moment"}
            </div>
          ) : (
            displayList.map((user) => (
              <div
                key={user.id}
                onClick={() => setSelectedUserId(user.id)}
                className="group flex items-center gap-3 p-2 rounded hover:bg-primary/20 transition-colors cursor-pointer"
              >
                <div className="relative w-10 h-10">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-600 group-hover:border-secondary transition-colors">
                    <Image
                      src={user.avatar_url}
                      alt={user.userName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Status Indicator */}
                  <div
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-noir ${
                      user.status === "online"
                        ? "bg-green-500 shadow-[0_0_5px_#22c55e]"
                        : user.status === "ingame"
                        ? "bg-blue-500 shadow-[0_0_5px_#3b82f6]"
                        : "bg-gray-500"
                    }`}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-200 group-hover:text-secondary transition-colors">
                    {user.userName}
                  </span>
                  <span className="text-[10px] text-gray-500 uppercase">
                    {user.status === "online"
                      ? "En ligne"
                      : user.status === "ingame"
                      ? "En jeu"
                      : "Hors ligne"}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* User Profile Modal */}
      {selectedUserId && (
        <UserProfileModal
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
          onFriendStatusChange={() => {
            fetchFriends();
            setSelectedUserId(null);
          }}
        />
      )}
    </>
  );
}
