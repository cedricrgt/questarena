"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { apiFetch } from "@/lib/api";

interface User {
  id: string;
  userName: string;
  email: string;
  avatar_url: string;
  role: "USER" | "ADMIN";
  is_blocked: boolean;
  created_at: string;
  _count?: {
    challenges: number;
    participations: number;
  };
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  game: string;
  difficulty: string;
  created_at: string;
  creator?: { userName: string };
  _count?: { participations: number; votes: number };
}

interface PasswordResetRequest {
  id: string;
  user_id: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  created_at: string;
  user: {
    id: string;
    userName: string;
    email: string;
    avatar_url: string;
  };
}

type TabType = "users" | "challenges" | "password-requests";

export default function AdminPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("users");
  const [users, setUsers] = useState<User[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [passwordRequests, setPasswordRequests] = useState<PasswordResetRequest[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Create admin form
  const [showCreateAdmin, setShowCreateAdmin] = useState(false);
  const [newAdminData, setNewAdminData] = useState({ userName: "", email: "", password: "" });

  // Password reset modal
  const [resetPasswordModal, setResetPasswordModal] = useState<{ userId: string; userName: string } | null>(null);
  const [newPassword, setNewPassword] = useState("");

  // Approve request modal
  const [approveModal, setApproveModal] = useState<PasswordResetRequest | null>(null);
  const [approvePassword, setApprovePassword] = useState("");

  // Check if user is admin
  useEffect(() => {
    if (!isLoading && (!user || user.role !== "ADMIN")) {
      router.replace("/");
    }
  }, [user, isLoading, router]);

  // Load data based on active tab
  useEffect(() => {
    if (!user || user.role !== "ADMIN") return;

    const loadData = async () => {
      setLoadingData(true);
      try {
        if (activeTab === "users") {
          const data = await apiFetch("/admin/users");
          setUsers(data);
        } else if (activeTab === "challenges") {
          const data = await apiFetch("/admin/challenges");
          setChallenges(data);
        } else if (activeTab === "password-requests") {
          const data = await apiFetch("/admin/password-requests");
          setPasswordRequests(data);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoadingData(false);
      }
    };

    loadData();
  }, [activeTab, user]);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  // User actions
  const handleBlockUser = async (userId: string, isBlocked: boolean) => {
    try {
      const endpoint = isBlocked ? `/admin/users/${userId}/unblock` : `/admin/users/${userId}/block`;
      await apiFetch(endpoint, { method: "PATCH" });
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, is_blocked: !isBlocked } : u))
      );
      showMessage("success", isBlocked ? "Utilisateur débloqué" : "Utilisateur bloqué");
    } catch (error) {
      showMessage("error", "Erreur lors de l'opération");
    }
  };

  const handleResetPassword = async () => {
    if (!resetPasswordModal || !newPassword) return;
    try {
      await apiFetch(`/admin/users/${resetPasswordModal.userId}/reset-password`, {
        method: "PATCH",
        body: JSON.stringify({ newPassword }),
      });
      showMessage("success", "Mot de passe réinitialisé");
      setResetPasswordModal(null);
      setNewPassword("");
    } catch (error) {
      showMessage("error", "Erreur lors de la réinitialisation");
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newAdmin = await apiFetch("/admin/users", {
        method: "POST",
        body: JSON.stringify(newAdminData),
      });
      setUsers((prev) => [newAdmin, ...prev]);
      setNewAdminData({ userName: "", email: "", password: "" });
      setShowCreateAdmin(false);
      showMessage("success", "Compte admin créé");
    } catch (error) {
      showMessage("error", "Erreur lors de la création");
    }
  };

  // Challenge actions
  const handleDeleteChallenge = async (challengeId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce challenge ?")) return;
    try {
      await apiFetch(`/admin/challenges/${challengeId}`, { method: "DELETE" });
      setChallenges((prev) => prev.filter((c) => c.id !== challengeId));
      showMessage("success", "Challenge supprimé");
    } catch (error) {
      showMessage("error", "Erreur lors de la suppression");
    }
  };

  // Password request actions
  const handleApproveRequest = async () => {
    if (!approveModal || !approvePassword) return;
    try {
      await apiFetch(`/admin/password-requests/${approveModal.id}/approve`, {
        method: "PATCH",
        body: JSON.stringify({ newPassword: approvePassword }),
      });
      setPasswordRequests((prev) => prev.filter((r) => r.id !== approveModal.id));
      showMessage("success", "Demande approuvée");
      setApproveModal(null);
      setApprovePassword("");
    } catch (error) {
      showMessage("error", "Erreur lors de l'approbation");
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      await apiFetch(`/admin/password-requests/${requestId}/reject`, { method: "PATCH" });
      setPasswordRequests((prev) => prev.filter((r) => r.id !== requestId));
      showMessage("success", "Demande rejetée");
    } catch (error) {
      showMessage("error", "Erreur lors du rejet");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-noir">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }

  if (!user || user.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="min-h-screen bg-noir pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white font-primary drop-shadow-[0_0_10px_rgba(169,111,255,0.8)]">
            Tableau de bord Admin
          </h1>
          <p className="text-gray-400 mt-2">Gérez les utilisateurs, challenges et demandes</p>
        </div>

        {/* Message toast */}
        {message && (
          <div
            className={`fixed top-24 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
              message.type === "success"
                ? "bg-green-500/90 text-white"
                : "bg-red-500/90 text-white"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: "users" as TabType, label: "Utilisateurs", icon: "👥" },
            { id: "challenges" as TabType, label: "Challenges", icon: "🎮" },
            { id: "password-requests" as TabType, label: "Demandes MDP", icon: "🔐" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-secondary text-white shadow-[0_0_15px_rgba(169,111,255,0.5)]"
                  : "bg-primary/20 text-gray-300 hover:bg-primary/40"
              }`}
            >
              {tab.icon} {tab.label}
              {tab.id === "password-requests" && passwordRequests.length > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {passwordRequests.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
          {loadingData ? (
            <div className="text-center py-8 text-gray-400">Chargement...</div>
          ) : (
            <>
              {/* Users Tab */}
              {activeTab === "users" && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">Gestion des utilisateurs</h2>
                    <button
                      onClick={() => setShowCreateAdmin(!showCreateAdmin)}
                      className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition"
                    >
                      {showCreateAdmin ? "Annuler" : "➕ Créer un admin"}
                    </button>
                  </div>

                  {/* Create admin form */}
                  {showCreateAdmin && (
                    <form
                      onSubmit={handleCreateAdmin}
                      className="bg-noir/50 p-4 rounded-lg mb-4 flex flex-wrap gap-4"
                    >
                      <input
                        type="text"
                        placeholder="Pseudo"
                        value={newAdminData.userName}
                        onChange={(e) =>
                          setNewAdminData({ ...newAdminData, userName: e.target.value })
                        }
                        className="flex-1 min-w-[150px] bg-primary/20 border border-primary/30 rounded px-4 py-2 text-white"
                        required
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={newAdminData.email}
                        onChange={(e) =>
                          setNewAdminData({ ...newAdminData, email: e.target.value })
                        }
                        className="flex-1 min-w-[200px] bg-primary/20 border border-primary/30 rounded px-4 py-2 text-white"
                        required
                      />
                      <input
                        type="password"
                        placeholder="Mot de passe"
                        value={newAdminData.password}
                        onChange={(e) =>
                          setNewAdminData({ ...newAdminData, password: e.target.value })
                        }
                        className="flex-1 min-w-[150px] bg-primary/20 border border-primary/30 rounded px-4 py-2 text-white"
                        required
                      />
                      <button
                        type="submit"
                        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                      >
                        Créer
                      </button>
                    </form>
                  )}

                  {/* Users table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-primary/30 text-gray-400">
                          <th className="py-3 px-4">Utilisateur</th>
                          <th className="py-3 px-4">Email</th>
                          <th className="py-3 px-4">Rôle</th>
                          <th className="py-3 px-4">Statut</th>
                          <th className="py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((u) => (
                          <tr
                            key={u.id}
                            className="border-b border-primary/10 hover:bg-primary/5"
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={u.avatar_url}
                                  alt={u.userName}
                                  className="w-8 h-8 rounded-full"
                                />
                                <span className="text-white">{u.userName}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-300">{u.email}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-1 rounded text-xs ${
                                  u.role === "ADMIN"
                                    ? "bg-secondary/30 text-secondary"
                                    : "bg-blue-500/30 text-blue-300"
                                }`}
                              >
                                {u.role}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-1 rounded text-xs ${
                                  u.is_blocked
                                    ? "bg-red-500/30 text-red-300"
                                    : "bg-green-500/30 text-green-300"
                                }`}
                              >
                                {u.is_blocked ? "Bloqué" : "Actif"}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                {u.role !== "ADMIN" && (
                                  <button
                                    onClick={() => handleBlockUser(u.id, u.is_blocked)}
                                    className={`px-3 py-1 text-xs rounded ${
                                      u.is_blocked
                                        ? "bg-green-500/30 text-green-300 hover:bg-green-500/50"
                                        : "bg-red-500/30 text-red-300 hover:bg-red-500/50"
                                    }`}
                                  >
                                    {u.is_blocked ? "Débloquer" : "Bloquer"}
                                  </button>
                                )}
                                <button
                                  onClick={() =>
                                    setResetPasswordModal({ userId: u.id, userName: u.userName })
                                  }
                                  className="px-3 py-1 text-xs rounded bg-yellow-500/30 text-yellow-300 hover:bg-yellow-500/50"
                                >
                                  Reset MDP
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Challenges Tab */}
              {activeTab === "challenges" && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">Gestion des challenges</h2>
                  <div className="grid gap-4">
                    {challenges.map((challenge) => (
                      <div
                        key={challenge.id}
                        className="bg-noir/50 p-4 rounded-lg flex justify-between items-center"
                      >
                        <div>
                          <h3 className="text-white font-semibold">{challenge.title}</h3>
                          <p className="text-gray-400 text-sm">
                            {challenge.game} • {challenge.difficulty} • Par{" "}
                            {challenge.creator?.userName || "Inconnu"}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {challenge._count?.participations || 0} participations •{" "}
                            {challenge._count?.votes || 0} votes
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <a
                            href={`/details/${challenge.id}`}
                            className="px-4 py-2 bg-blue-500/30 text-blue-300 rounded hover:bg-blue-500/50 transition"
                          >
                            Voir
                          </a>
                          <button
                            onClick={() => handleDeleteChallenge(challenge.id)}
                            className="px-4 py-2 bg-red-500/30 text-red-300 rounded hover:bg-red-500/50 transition"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    ))}
                    {challenges.length === 0 && (
                      <p className="text-center text-gray-400 py-8">Aucun challenge</p>
                    )}
                  </div>
                </div>
              )}

              {/* Password Requests Tab */}
              {activeTab === "password-requests" && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">
                    Demandes de réinitialisation de mot de passe
                  </h2>
                  <div className="grid gap-4">
                    {passwordRequests.map((request) => (
                      <div
                        key={request.id}
                        className="bg-noir/50 p-4 rounded-lg flex justify-between items-center"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={request.user.avatar_url}
                            alt={request.user.userName}
                            className="w-12 h-12 rounded-full"
                          />
                          <div>
                            <h3 className="text-white font-semibold">{request.user.userName}</h3>
                            <p className="text-gray-400 text-sm">{request.user.email}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              Demandé le {new Date(request.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setApproveModal(request)}
                            className="px-4 py-2 bg-green-500/30 text-green-300 rounded hover:bg-green-500/50 transition"
                          >
                            Approuver
                          </button>
                          <button
                            onClick={() => handleRejectRequest(request.id)}
                            className="px-4 py-2 bg-red-500/30 text-red-300 rounded hover:bg-red-500/50 transition"
                          >
                            Rejeter
                          </button>
                        </div>
                      </div>
                    ))}
                    {passwordRequests.length === 0 && (
                      <p className="text-center text-gray-400 py-8">
                        Aucune demande en attente
                      </p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Reset Password Modal */}
      {resetPasswordModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-noir border border-primary/30 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">
              Réinitialiser le mot de passe de {resetPasswordModal.userName}
            </h3>
            <input
              type="password"
              placeholder="Nouveau mot de passe"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-primary/20 border border-primary/30 rounded px-4 py-3 text-white mb-4"
            />
            <div className="flex gap-4">
              <button
                onClick={handleResetPassword}
                className="flex-1 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition"
              >
                Confirmer
              </button>
              <button
                onClick={() => {
                  setResetPasswordModal(null);
                  setNewPassword("");
                }}
                className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Approve Request Modal */}
      {approveModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-noir border border-primary/30 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">
              Définir le nouveau mot de passe pour {approveModal.user.userName}
            </h3>
            <input
              type="password"
              placeholder="Nouveau mot de passe"
              value={approvePassword}
              onChange={(e) => setApprovePassword(e.target.value)}
              className="w-full bg-primary/20 border border-primary/30 rounded px-4 py-3 text-white mb-4"
            />
            <div className="flex gap-4">
              <button
                onClick={handleApproveRequest}
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Approuver et définir
              </button>
              <button
                onClick={() => {
                  setApproveModal(null);
                  setApprovePassword("");
                }}
                className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
