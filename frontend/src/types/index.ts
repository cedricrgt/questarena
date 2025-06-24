export type Participation = {
  id: string;
  video_url: string;
  title: string;
  votes: number;
  challenge: Challenge;
  challenge_id: string;
  user_id: number;
  validated: boolean;
  created_at: string;
  description: string;
  nb_votes: number;
};

export type Challenge = {
  id: string;
  title: string;
  description: string;
  rules: string;
  game: string;
  difficulty: string;
  user_id: string;
  validated: boolean;
  created_at: string;
  image_url: string | null;
  votes: any[];
  participations: Participation[];
};

// export type LeaderboardEntry = {
//   imageUser: string;
//   username: string;
//   score: number;
// };
