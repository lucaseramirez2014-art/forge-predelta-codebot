"use client";

import { CampaignCard } from "../../components/CampaignCard";
import { ForgeNav } from "../../components/ForgeNav";
import { QuestCard } from "../../components/QuestCard";
import { campaignProgress, useForge } from "../../components/ForgeProvider";
import { activeCampaign, quests } from "../../lib/mockUser";

export default function CampaignPage() {
  const { completedQuestIds } = useForge();
  const standardQuests = quests.filter((quest) => quest.difficulty !== "Boss");
  const bossQuest = quests.find((quest) => quest.difficulty === "Boss");

  return (
    <main className="min-h-screen pb-14"><ForgeNav /><div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12"><div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">Campaign map</p><h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Python Developer</h1><p className="mt-3 text-stone-400">A focused path through the concepts that turn curiosity into useful code.</p></div><div className="mt-8"><CampaignCard campaign={activeCampaign} progress={campaignProgress(completedQuestIds)} /></div><section className="mt-12"><div className="flex items-center gap-3"><span className="grid size-7 place-items-center rounded-full bg-orange-500 text-xs font-bold text-stone-950">2</span><div><p className="text-sm font-semibold text-white">Chapter 2: Core control</p><p className="text-xs text-stone-500">Complete these quests to unlock your next build.</p></div></div><div className="mt-5 grid gap-4 md:grid-cols-3">{standardQuests.map((quest) => <QuestCard key={quest.id} quest={quest} completed={completedQuestIds.includes(quest.id)} />)}</div></section>{bossQuest && <section className="mt-10"><div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-orange-300"><span className="size-1.5 rounded-full bg-orange-400" /> Boss quest</div><QuestCard quest={bossQuest} completed={completedQuestIds.includes(bossQuest.id)} featured /></section>}</div></main>
  );
}
