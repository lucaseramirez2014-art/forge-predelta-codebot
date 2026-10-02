"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { activeCampaign, mockUser } from "../lib/mockUser";

type ForgeState = {
  xp: number;
  completedQuestIds: string[];
  completeQuest: (questId: string, reward: number) => void;
  resetProgress: () => void;
};

const ForgeContext = createContext<ForgeState | null>(null);
export function ForgeProvider({ children }: { children: React.ReactNode }) {
  const [xp, setXp] = useState(mockUser.xp);
  const [completedQuestIds, setCompletedQuestIds] = useState<string[]>([]);

  const value = useMemo(() => ({
    xp,
    completedQuestIds,
    completeQuest: (questId: string, reward: number) => {
      if (completedQuestIds.includes(questId)) return;
      setCompletedQuestIds((current) => [...current, questId]);
      setXp((current) => current + reward);
    },
    resetProgress: () => {
      setXp(mockUser.xp);
      setCompletedQuestIds([]);
    },
  }), [xp, completedQuestIds]);

  return <ForgeContext.Provider value={value}>{children}</ForgeContext.Provider>;
}

export function useForge() {
  const context = useContext(ForgeContext);
  if (!context) throw new Error("useForge must be used inside ForgeProvider");
  return context;
}

export const campaignProgress = (completedQuestIds: string[]) =>
  Math.min(100, activeCampaign.progress + Math.round((completedQuestIds.length / activeCampaign.total) * 100));
