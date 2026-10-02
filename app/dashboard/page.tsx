"use client";

import Link from "next/link";
import { CampaignCard } from "../../components/CampaignCard";
import { ForgeNav } from "../../components/ForgeNav";
import { QuestCard } from "../../components/QuestCard";
import { StatCard } from "../../components/StatCard";
import { XPBar } from "../../components/XPBar";
import { campaignProgress, useForge } from "../../components/ForgeProvider";
import { activeCampaign, mockUser, quests } from "../../lib/mockUser";

export default function DashboardPage() {
  const { xp, completedQuestIds } = useForge();
  const activeQuest = quests.find((quest) => !completedQuestIds.includes(quest.id)) ?? quests[0];
  const progress = campaignProgress(completedQuestIds);

  return (
    <main className="min-h-screen pb-12">
      <ForgeNav />
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        <section className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div><p className="text-sm text-stone-500">Thursday, October 1</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Good evening, {mockUser.name}.</h1><p className="mt-2 text-stone-400">Your next focused block is waiting to be forged.</p></div>
          <div className="w-full rounded-2xl border border-white/8 bg-white/3 p-4 md:w-80"><div className="mb-3 flex items-center justify-between"><span className="text-sm font-semibold text-stone-200">Level {mockUser.level}</span><span className="text-xs font-medium text-orange-300">{mockUser.title}</span></div><XPBar current={xp} goal={mockUser.xpToNextLevel} compact /></div>
        </section>

        <section className="mt-8 grid gap-3 sm:grid-cols-3">
          <StatCard label="Current streak" value={`${mockUser.streak} days`} detail="Your longest is 16 days" icon="⚡" accent />
          <StatCard label="Focus logged" value={`${mockUser.totalFocusMinutes + completedQuestIds.length * 30}m`} detail="A deliberate week so far" icon="◷" />
          <StatCard label="Quests cleared" value={completedQuestIds.length} detail="Keep the chain moving" icon="✓" />
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1.08fr_.92fr]">
          <CampaignCard campaign={activeCampaign} progress={progress} />
          <article className="flex flex-col rounded-3xl border border-white/8 bg-white/3 p-6"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">Next up</p><h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">{activeQuest.title}</h2><p className="mt-3 text-sm leading-6 text-stone-400">{activeQuest.description}</p><div className="mt-6 flex items-center gap-4 text-sm"><span className="text-stone-500">{activeQuest.duration} min</span><span className="h-4 border-l border-white/12" /><span className="font-medium text-orange-300">+{activeQuest.xp} XP</span></div><Link href={`/focus?quest=${activeQuest.id}`} className="mt-auto pt-8"><span className="inline-flex w-full items-center justify-center rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-stone-950 transition hover:bg-orange-400">Start focus session <span className="ml-2">→</span></span></Link></article>
        </section>

        <section className="mt-12"><div className="flex items-end justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Quest board</p><h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Continue your campaign</h2></div><Link href="/campaign" className="text-sm font-medium text-orange-300 hover:text-orange-200">View all quests →</Link></div><div className="mt-5 grid gap-4 md:grid-cols-3">{quests.slice(0, 3).map((quest) => <QuestCard key={quest.id} quest={quest} completed={completedQuestIds.includes(quest.id)} />)}</div></section>
      </div>
    </main>
  );
}
