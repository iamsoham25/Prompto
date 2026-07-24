import { codingChallenges } from "./codingChallenges";
// Later we'll add:
// import { jsonChallenges } from "./jsonChallenges";
// import { marketingChallenges } from "./marketingChallenges";
// ...

export const challengeTracks: Record<string, any[]> = {
  coding: codingChallenges,

  // json: jsonChallenges,
  // marketing: marketingChallenges,
  // rag: ragChallenges,
  // enterprise: enterpriseChallenges,
};