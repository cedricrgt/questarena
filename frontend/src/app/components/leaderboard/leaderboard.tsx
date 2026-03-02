'use client';

import { useState } from "react";
import LeaderboardItem from "./leaderboardItem";
import UserProfileModal from "../modal/UserProfileModal";

type LeaderboardEntry = {
  id: string;
  avatar_url: string;
  userName: string;
  score: number;
};

type LeaderboardProps = {
  leaderboard: LeaderboardEntry[];
  color: string;
  backgroundColor: string;
  centered: boolean;
};

const Leaderboard = ({ leaderboard, color, backgroundColor, centered }: LeaderboardProps) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  return (
    <>
      <div className={` rounded-lg overflow-hidden ${
          centered ? 'max-w-4xl mx-auto' : ''
        } ${backgroundColor} mt-4`}>
        <div className="overflow-x-auto">
          <table className="w-full ">
            <thead>
            </thead>
            <tbody className={`divide-y divide-gray-200 ${color}`}>
              {leaderboard.map(({ id, avatar_url, userName, score }, index) => (
                <LeaderboardItem
                  key={id}
                  imageUser={avatar_url}
                  username={userName}
                  score={score}
                  index={index}
                  userId={id}
                  onUserClick={setSelectedUserId}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Profile Modal */}
      {selectedUserId && (
        <UserProfileModal
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
        />
      )}
    </>
  );
};

export default Leaderboard;