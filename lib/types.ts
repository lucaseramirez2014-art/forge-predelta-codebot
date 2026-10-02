export type QuestDifficulty = "Easy" | "Standard" | "Hard" | "Boss";

export type Quest = {
  id: string;
  title: string;
  description: string;
  difficulty: QuestDifficulty;
  xp: number;
  duration: number;
  status: "available" | "locked";
  focusPrompt: string;
};

export type Campaign = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  level: string;
  progress: number;
  completed: number;
  total: number;
  color: string;
};
