export type Challenge = {
  game: string;
  title: string;
  participations: Participation[];
};

export type Participation = {
  video_url: string;
  title: string;
  votes: number;
  challenge: Challenge;
  user_id: number;
};

// export type LeaderboardEntry = {
//   imageUser: string;
//   username: string;
//   score: number;
// };