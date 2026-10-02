import type { Campaign, Quest } from "./types";

export const mockUser = {
  name: "Alex",
  level: 7,
  title: "Focused Builder",
  xp: 1240,
  xpToNextLevel: 1600,
  streak: 12,
  totalFocusMinutes: 438,
};

export const activeCampaign: Campaign = {
  id: "python-developer",
  title: "Python Developer",
  subtitle: "Skill campaign · Chapter 2",
  description: "Build the practical foundations for writing useful Python programs.",
  level: "Foundations",
  progress: 48,
  completed: 4,
  total: 8,
  color: "from-orange-400 to-amber-200",
};

export const quests: Quest[] = [
  {
    id: "variables",
    title: "Shape your variables",
    description: "Practice naming, assigning, and reusing values in a short exercise.",
    difficulty: "Easy",
    xp: 80,
    duration: 20,
    status: "available",
    focusPrompt: "Create three meaningful variables and use them to describe a small project idea.",
  },
  {
    id: "conditions",
    title: "Route with conditions",
    description: "Use if / elif / else to make a tiny decision-making program.",
    difficulty: "Standard",
    xp: 120,
    duration: 30,
    status: "available",
    focusPrompt: "Write a simple program that gives a different recommendation based on a user’s study time.",
  },
  {
    id: "loops",
    title: "Build a repeatable loop",
    description: "Turn repetitive work into a clean, deliberate for loop.",
    difficulty: "Standard",
    xp: 140,
    duration: 35,
    status: "available",
    focusPrompt: "Use a loop to process five practice tasks and print a useful status message for each one.",
  },
  {
    id: "function-boss",
    title: "Boss: Forge your first function",
    description: "Combine inputs, logic, and a return value in a reusable utility.",
    difficulty: "Boss",
    xp: 300,
    duration: 50,
    status: "locked",
    focusPrompt: "Create a function that accepts a goal and minutes available, then returns a focused next action.",
  },
];

export const getQuest = (id?: string | null) => quests.find((quest) => quest.id === id) ?? quests[0];
