import { challengeTracks } from "@/data/challengeTracks";

export type ChallengeTrack = keyof typeof challengeTracks;

export type Challenge = {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  xp: number;
  time: string;
  passScore: number;
  bonusScore: number;
  bonusXP: number;
};

export function getChallenge(
  track: string,
  id: number
): Challenge | undefined {
  if (!(track in challengeTracks)) {
    return undefined;
  }

  const typedTrack = track as ChallengeTrack;

  const challenges = challengeTracks[typedTrack] as Challenge[];

  return challenges.find(
    (challenge: Challenge) => challenge.id === id
  );
}


// Optional alias so both names work
export function getChallengeById(
  track: string,
  id: number
): Challenge | undefined {
  return getChallenge(track, id);
}