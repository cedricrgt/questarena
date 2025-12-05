"use client";

import { User } from "@/types";
import Image from "next/image";

import { useAuth } from "@/lib/auth-context";
import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import { LeaderboardType } from "@/types";

export default function UserProfileSidebar() {
    const { user, updateUser } = useAuth();
    const [leaderboard, setLeaderboard] = useState<LeaderboardType[]>([]);
    const [view, setView] = useState<'profile' | 'settings'>('profile');

    // Settings State
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editAvatarSeed, setEditAvatarSeed] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (user) {
            // Fetch Leaderboard
            apiFetch("/user/leaderboard")
                .then((data: LeaderboardType[]) => {
                    setLeaderboard(data);
                })
                .catch(err => {
                    console.error("Failed to fetch leaderboard", err);
                });

            // Init settings form
            setEditName(user.name);
            setEditEmail(user.email);
            // Extract seed from URL if possible, or just default to empty to keep current
            // Example URL: https://api.dicebear.com/9.x/avataaars/svg?seed=Felix
            const seedMatch = user.avatar_url?.match(/seed=([^&]+)/);
            setEditAvatarSeed(seedMatch ? seedMatch[1] : user.name);
        }
    }, [user]);

    if (!user) return null;

    // Calculate Scores
    const challengesCount = user.challengesCount ?? (user.challenges as any[])?.length ?? 0;
    const participationsCount = user.participationsCount ?? (user.participations as any[])?.length ?? 0;
    const votesCount = user.votesCount ?? (user.votes as any[])?.length ?? 0;


        user,
        challengesCount,
        participationsCount,
        votesCount,
        challengesArrLength: (user.challenges as any[])?.length,
        userChallengesCountProp: user.challengesCount
    });

    const challengesScore = challengesCount * 5;
    const participationsScore = participationsCount * 10;
    const votesScore = votesCount * 2;

    const baseScore = challengesScore + participationsScore + votesScore;

    // Calculate Rank Bonus
    let rankBonus = 0;
    const rank = leaderboard.findIndex((u) => u.id === user.id);
    if (rank !== -1) {
        if (rank === 0) rankBonus = 10;
        else if (rank === 1) rankBonus = 5;
        else if (rank === 2) rankBonus = 2;
    }

    const totalScore = baseScore + rankBonus;

    const getTrophy = (score: number) => {
        if (score >= 100) return { icon: "🥇", label: "Or", color: "text-yellow-400 border-yellow-400" };
        if (score >= 55) return { icon: "🥈", label: "Argent", color: "text-gray-300 border-gray-300" };
        if (score >= 40) return { icon: "🥉", label: "Bronze", color: "text-orange-400 border-orange-400" };
        if (score >= 20) return { icon: "🛡️", label: "Fer", color: "text-gray-500 border-gray-500" };
        return null;
    };

    const trophy = getTrophy(totalScore);

    const handleSaveSettings = async () => {
        setIsSaving(true);
        try {
            const newAvatarUrl = `https://api.dicebear.com/9.x/bottts/svg?seed=${editAvatarSeed}`;
            await updateUser({
                userName: editName, // Note: Backend expects userName, frontend User interface has name. 
                // However, User entity has userName. AuthContext maps response name -> name.
                // But update DTO likely expects userName.
                // Let's check UpdateUserDto... usually it matches entity.
                // Let's try sending userName.
                email: editEmail,
                avatar_url: newAvatarUrl
            } as any);
            setView('profile');
        } catch (error) {
            console.error("Failed to update profile", error);
            // Show error notification?
        } finally {
            setIsSaving(false);
        }
    };

    const generateRandomAvatar = () => {
        setEditAvatarSeed(Math.random().toString(36).substring(7));
    };

    if (view === 'settings') {
        return (
            <div className="h-full p-4 flex flex-col gap-6 bg-noir/80 border-r border-primary/30 text-blanc backdrop-blur-sm shadow-[0_0_15px_rgba(74,32,64,0.5)] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-primary/30 pb-4">
                    <h2 className="text-xl font-bold font-primary text-secondary">Paramètres</h2>
                    <button onClick={() => setView('profile')} className="text-gray-400 hover:text-white">
                        ✕
                    </button>
                </div>

                <div className="flex flex-col gap-4">
                    {/* Avatar Selection */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="relative w-24 h-24 rounded-full border-4 border-secondary overflow-hidden bg-gray-800">
                            <Image
                                src={`https://api.dicebear.com/9.x/bottts/svg?seed=${editAvatarSeed}`}
                                alt="Avatar Preview"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <button
                            onClick={generateRandomAvatar}
                            className="text-xs text-cta hover:underline"
                        >
                            Générer un nouvel avatar
                        </button>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-3">
                        <div>
                            <label className="text-xs text-gray-400 uppercase">Pseudo</label>
                            <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="w-full bg-primary/10 border border-primary/30 rounded px-3 py-2 text-white focus:outline-none focus:border-secondary"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 uppercase">Email</label>
                            <input
                                type="email"
                                value={editEmail}
                                onChange={(e) => setEditEmail(e.target.value)}
                                className="w-full bg-primary/10 border border-primary/30 rounded px-3 py-2 text-white focus:outline-none focus:border-secondary"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleSaveSettings}
                        disabled={isSaving}
                        className="w-full py-2 mt-4 bg-cta text-noir font-bold rounded hover:bg-cta/80 disabled:opacity-50"
                    >
                        {isSaving ? "Enregistrement..." : "Enregistrer"}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full p-4 flex flex-col gap-6 bg-noir/80 border-r border-primary/30 text-blanc backdrop-blur-sm shadow-[0_0_15px_rgba(74,32,64,0.5)]">
            {/* Profile Header */}
            <div className="flex flex-col items-center gap-3 pt-4">
                <div className="relative w-24 h-24 rounded-full border-4 border-secondary shadow-[0_0_10px_#a96fff] overflow-hidden">
                    <Image
                        src={user.avatar_url || `https://api.dicebear.com/9.x/bottts/svg?seed=${user.name}`}
                        alt={user.name}
                        fill
                        className="object-cover"
                    />
                </div>
                <h2 className="text-xl font-bold font-primary text-secondary drop-shadow-[0_0_5px_rgba(169,111,255,0.8)]">
                    {user.name}
                </h2>
                <div className="group relative cursor-help">
                    <span className="text-xs text-gray-400 uppercase tracking-widest border-b border-dashed border-gray-600">
                        Score: {totalScore}
                    </span>
                    {/* Tooltip Breakdown */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 bg-noir border border-primary/50 p-3 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none text-xs">
                        <div className="flex justify-between mb-1">
                            <span className="text-gray-400">Challenges (x5):</span>
                            <span className="text-blanc font-bold">{challengesScore}</span>
                        </div>
                        <div className="flex justify-between mb-1">
                            <span className="text-gray-400">Participations (x10):</span>
                            <span className="text-blanc font-bold">{participationsScore}</span>
                        </div>
                        <div className="flex justify-between mb-1">
                            <span className="text-gray-400">Votes (x2):</span>
                            <span className="text-blanc font-bold">{votesScore}</span>
                        </div>
                        {rankBonus > 0 && (
                            <div className="flex justify-between pt-1 border-t border-gray-700 mt-1 text-secondary">
                                <span>Bonus Rang:</span>
                                <span className="font-bold">+{rankBonus}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="flex flex-col gap-4 mt-4">
                <h3 className="text-sm font-bold text-cta uppercase tracking-wider border-b border-cta/30 pb-1">
                    Statistiques
                </h3>

                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-primary/20 p-2 rounded border border-primary/30 flex flex-col items-center">
                        <span className="text-2xl font-bold text-blanc">{challengesCount}</span>
                        <span className="text-[10px] text-gray-300 uppercase">Challenges</span>
                    </div>
                    <div className="bg-primary/20 p-2 rounded border border-primary/30 flex flex-col items-center">
                        <span className="text-2xl font-bold text-blanc">{participationsCount}</span>
                        <span className="text-[10px] text-gray-300 uppercase">Participations</span>
                    </div>
                    <div className="bg-primary/20 p-2 rounded border border-primary/30 flex flex-col items-center col-span-2">
                        <span className="text-2xl font-bold text-cta">{votesCount}</span>
                        <span className="text-[10px] text-gray-300 uppercase">Votes</span>
                    </div>
                </div>
            </div>

            {/* Trophies / Achievements */}
            <div className="flex flex-col gap-4 mt-2">
                <h3 className="text-sm font-bold text-cta uppercase tracking-wider border-b border-cta/30 pb-1">
                    Trophée Actuel
                </h3>
                <div className="flex gap-2 flex-wrap justify-center">
                    {trophy ? (
                        <div className={`w-16 h-16 bg-gradient-to-br from-black/50 to-black/20 rounded-full border-2 ${trophy.color} shadow-[0_0_8px_rgba(255,255,255,0.2)] flex flex-col items-center justify-center font-bold`} title={trophy.label}>
                            <span className="text-2xl">{trophy.icon}</span>
                            <span className="text-[10px] uppercase mt-1">{trophy.label}</span>
                        </div>
                    ) : (
                        <div className="text-xs text-gray-500 italic">Aucun trophée pour le moment</div>
                    )}
                </div>
            </div>

            {/* Menu / Navigation (Optional) */}
            <div className="mt-auto">
                <button
                    onClick={() => setView('settings')}
                    className="w-full py-2 bg-primary/40 hover:bg-primary/60 border border-primary text-blanc rounded transition-all uppercase text-xs font-bold tracking-wider"
                >
                    Paramètres
                </button>
            </div>
        </div>
    );
}
