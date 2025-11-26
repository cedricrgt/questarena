import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Challenge } from "@/types";

interface GlobalStatsSidebarProps {
    onlineCount: number;
}

export default function GlobalStatsSidebar({ onlineCount }: GlobalStatsSidebarProps) {
    const [stats, setStats] = useState({ challenges: 0, participants: 0 });
    const [lastChallenge, setLastChallenge] = useState<Challenge | null>(null);

    useEffect(() => {
        apiFetch("/challenge")
            .then(async (data: Challenge[]) => {
                const totalChallenges = data.length;
                const totalParticipants = data.reduce((acc, curr) => acc + (curr.participations?.length || 0), 0);
                setStats({ challenges: totalChallenges, participants: totalParticipants });

                if (data.length > 0) {
                    // Sort by createdAt descending to get the latest
                    const sorted = [...data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                    const latest = sorted[0];
                    
                    // If creator is null, fetch user data
                    if (!latest.creator && latest.user_id) {
                        try {
                            const userData = await apiFetch(`/user/${latest.user_id}`);
                            latest.creator = userData.userName || 'Inconnu';
                        } catch (err) {
                            console.error("Failed to fetch user data", err);
                            latest.creator = 'Inconnu';
                        }
                    }
                    
                    setLastChallenge(latest);
                }
            })
            .catch(err => console.error("Failed to fetch global stats", err));
    }, []);

    const timeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        let interval = seconds / 31536000;
        if (interval > 1) return "Il y a " + Math.floor(interval) + " an" + (Math.floor(interval) > 1 ? "s" : "");
        interval = seconds / 2592000;
        if (interval > 1) return "Il y a " + Math.floor(interval) + " mois";
        interval = seconds / 86400;
        if (interval > 1) return "Il y a " + Math.floor(interval) + " jour" + (Math.floor(interval) > 1 ? "s" : "");
        interval = seconds / 3600;
        if (interval > 1) return "Il y a " + Math.floor(interval) + " h";
        interval = seconds / 60;
        if (interval > 1) return "Il y a " + Math.floor(interval) + " min";
        return "À l'instant";
    };

    return (
        <div className="h-full p-4 flex flex-col gap-6 bg-noir/80 border-r border-primary/30 text-blanc backdrop-blur-sm shadow-[0_0_15px_rgba(74,32,64,0.5)]">
            {/* Header */}
            <header className="flex flex-col items-center gap-3 pt-4">
                <h1 className="text-secondary text-3xl font-bold font-logo">
                    GamerChallenges
                </h1>
                <p className="text-xs text-white text-shadow-secondary text-shadow-lg uppercase tracking-widest text-center">
                    Rejoins l'arène
                </p>
            </header>

            {/* Stats */}
            <div className="flex flex-col gap-4 mt-4">
                <h3 className="text-sm font-bold text-cta uppercase tracking-wider border-b border-cta/30 pb-1">
                    Statistiques Globales
                </h3>

                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-primary/20 p-2 rounded border border-primary/30 flex flex-col items-center">
                        <span className="text-2xl font-bold text-blanc">{stats.challenges}</span>
                        <span className="text-[10px] text-gray-300 uppercase">Challenges</span>
                    </div>
                    <div className="bg-primary/20 p-2 rounded border border-primary/30 flex flex-col items-center">
                        <span className="text-2xl font-bold text-blanc">{stats.participants}</span>
                        <span className="text-[10px] text-gray-300 uppercase">Participants</span>
                    </div>
                    <div className="bg-primary/20 p-2 rounded border border-primary/30 flex flex-col items-center col-span-2">
                        <span className="text-2xl font-bold text-cta">{onlineCount}</span>
                        <span className="text-[10px] text-gray-300 uppercase">En ligne</span>
                    </div>
                </div>
            </div>

            {/* Last Challenge */}
            <div className="flex flex-col gap-4 mt-2">
                <h3 className="text-sm font-bold text-cta uppercase tracking-wider border-b border-cta/30 pb-1">
                    Dernier Défi
                </h3>
                {lastChallenge ? (
                    <div className="bg-gradient-to-br from-primary/40 to-noir border border-primary/50 rounded p-3 shadow-lg">
                        <div className="flex gap-3">
                            <div className="flex-1">
                                <h4 className="font-bold text-secondary text-sm mb-1 line-clamp-1">{lastChallenge.title}</h4>
                                <p className="text-xs text-gray-300 mb-1 line-clamp-2">{lastChallenge.description}</p>
                                <p className="text-[10px] text-cta mb-2 italic">Jeu: {lastChallenge.game}</p>
                                <div className="text-[10px] text-gray-400">
                                    <span>Par: {typeof lastChallenge.creator === 'string' ? lastChallenge.creator : lastChallenge.creator?.userName || 'Inconnu'}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end justify-between">
                                {lastChallenge.image_url && (
                                    <img 
                                        src={lastChallenge.image_url} 
                                        alt={lastChallenge.title}
                                        className="w-16 h-16 rounded object-cover border border-secondary/30"
                                    />
                                )}
                                <span className="text-[10px] text-gray-400 mt-auto">{timeAgo(lastChallenge.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-xs text-gray-400 text-center italic">Aucun défi pour le moment</div>
                )}
            </div>

            {/* CTA */}
            <div className="mt-auto">
                <div className="p-4 bg-primary/10 border border-primary/30 rounded text-center">
                    <p className="text-xs text-gray-300 mb-2">Connecte-toi pour suivre ta progression et défier tes amis !</p>
                </div>
            </div>
        </div>
    );
}
