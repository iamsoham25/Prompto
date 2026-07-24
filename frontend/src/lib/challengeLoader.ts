import { challengeTracks } from "@/data/challengeTracks";

export function getChallenge(track: string, id: number) {
  const challenges = challengeTracks[track];

  if (!challenges) return null;

  return challenges.find(
    (challenge) => challenge.id === id
  );
}