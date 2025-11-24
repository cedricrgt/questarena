"use client";

interface GlobalStatsSidebarProps {
    onlineCount: number;
}

export default function GlobalStatsSidebar({ onlineCount }: GlobalStatsSidebarProps) {
    return (
        <div className="h-full p-4 flex flex-col gap-6 bg-noir/80 border-r border-primary/30 text-blanc backdrop-blur-sm shadow-[0_0_15px_rgba(74,32,64,0.5)]">
            {/* Header */}
            <div className="flex flex-col items-center gap-3 pt-4">
                <h2 className="text-xl font-bold font-primary text-secondary drop-shadow-[0_0_5px_rgba(169,111,255,0.8)] text-center">
                    Gamer Challenges
                </h2>
                <span className="text-xs text-gray-400 uppercase tracking-widest text-center">
                    Rejoins l'arène
                </span>
            </div>

            {/* Stats */}
            <div className="flex flex-col gap-4 mt-4">
                <h3 className="text-sm font-bold text-cta uppercase tracking-wider border-b border-cta/30 pb-1">
                    Statistiques Globales
                </h3>

                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-primary/20 p-2 rounded border border-primary/30 flex flex-col items-center">
                        <span className="text-2xl font-bold text-blanc">124</span>
                        <span className="text-[10px] text-gray-300 uppercase">Challenges</span>
                    </div>
                    <div className="bg-primary/20 p-2 rounded border border-primary/30 flex flex-col items-center">
                        <span className="text-2xl font-bold text-blanc">856</span>
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
                <div className="bg-gradient-to-br from-primary/40 to-noir border border-primary/50 rounded p-3 shadow-lg">
                    <h4 className="font-bold text-secondary text-sm mb-1">Speedrun Any%</h4>
                    <p className="text-xs text-gray-300 mb-2">Terminer le jeu en moins de 10min sans glitch.</p>
                    <div className="flex justify-between items-center text-[10px] text-gray-400">
                        <span>Par: SpeedDemon</span>
                        <span>Il y a 2h</span>
                    </div>
                </div>
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
