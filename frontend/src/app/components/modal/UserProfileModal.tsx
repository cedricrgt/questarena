"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { apiFetch } from "@/lib/api";
import { User } from "@/types";

interface UserProfileModalProps {
  userId: string;
  onClose: () => void;
  onFriendStatusChange?: () => void;
}

export default function UserProfileModal({
  userId,
  onClose,
  onFriendStatusChange,
}: UserProfileModalProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isFriend, setIsFriend] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userData = await apiFetch(`/user/${userId}`);
        setUser(userData);
        
        // Only check friendship status if user is authenticated
        try {
          const friendshipStatus = await apiFetch(`/friend/status/${userId}`);
          setIsFriend(friendshipStatus.isFriend);
        } catch (error) {
          // User is not authenticated, friendship status is false
          setIsFriend(false);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleFriendAction = async () => {
    try {
      setActionLoading(true);
      if (isFriend) {
        await apiFetch(`/friend/${userId}`, { method: "DELETE" });
        setIsFriend(false);
      } else {
        await apiFetch(`/friend/${userId}`, { method: "POST" });
        setIsFriend(true);
      }
      onFriendStatusChange?.();
    } catch (error: any) {
      console.error("Failed to update friend status:", error);
      // Show error message to user if needed
      if (error.message?.includes("401") || error.message?.includes("Unauthorized")) {
        alert("Vous devez être connecté pour gérer vos amis");
      }
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-noir border border-primary/50 rounded-lg p-8 max-w-md w-full mx-4">
          <div className="text-center text-white">Chargement...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-noir via-primary/20 to-noir border border-secondary/50 rounded-lg p-6 max-w-md w-full mx-4 shadow-[0_0_30px_rgba(169,111,255,0.3)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>

        {/* User Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-24 h-24 mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-secondary shadow-[0_0_20px_rgba(169,111,255,0.5)]">
              <Image
                src={user.avatar_url}
                alt={user.userName}
                fill
                className="object-cover"
              />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-secondary mb-1 font-primary">
            {user.userName}
          </h2>
          <p className="text-xs text-gray-400">
            Membre depuis {new Date(user.created_at).toLocaleDateString("fr-FR")}
          </p>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-primary/20 p-3 rounded border border-primary/30 text-center">
            <div className="text-xl font-bold text-cta">
              {user.challenges?.length || 0}
            </div>
            <div className="text-[10px] text-gray-300 uppercase">Défis</div>
          </div>
          <div className="bg-primary/20 p-3 rounded border border-primary/30 text-center">
            <div className="text-xl font-bold text-cta">
              {user.participations?.length || 0}
            </div>
            <div className="text-[10px] text-gray-300 uppercase">Participations</div>
          </div>
          <div className="bg-primary/20 p-3 rounded border border-primary/30 text-center">
            <div className="text-xl font-bold text-cta">
              {user.votes?.length || 0}
            </div>
            <div className="text-[10px] text-gray-300 uppercase">Votes</div>
          </div>
        </div>

        {/* Friend Action Button */}
        <button
          onClick={handleFriendAction}
          disabled={actionLoading}
          className={`w-full py-3 rounded font-bold uppercase tracking-wider transition-all duration-300 ${
            isFriend
              ? "bg-gray-600 text-white hover:bg-gray-700 hover:shadow-[0_0_15px_rgba(107,114,128,0.5)]"
              : "bg-cta text-noir hover:bg-cta/80 hover:shadow-[0_0_15px_rgba(233,184,114,0.6)] hover:scale-105"
          } ${actionLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {actionLoading
            ? "Chargement..."
            : isFriend
            ? "Retirer de la liste d'amis"
            : "Ajouter en ami"}
        </button>
      </div>
    </div>
  );
}
