export type Challenge = {
  game: string;
  title: string;
  image_url: string;
  participations: Participation[];
};

export type Participation = {
  video_url: string;
  title: string;
  votes: number;
  challenge: Challenge;
  user_id: number;
};

export type LeaderboardType = {
   userName: string;
   avatar_url: string;
   score: number;
 };