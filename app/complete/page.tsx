"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo } from "react";
import { ForgeNav } from "../../components/ForgeNav";
import { XPBar } from "../../components/XPBar";
import { useForge } from "../../components/ForgeProvider";
import { getQuest, mockUser } from "../../lib/mockUser";

export default function CompletePage() {
  return (
    <Suspense fallback={<CompletionLoading />}>
      <Completion />
    </Suspense>
  );
}

function Completion() {
  const params = useSearchParams();
  const quest = useMemo(() => getQuest(params.get("quest")), [params]);
  const { xp, completeQuest, completedQuestIds } = useForge();
  const previouslyCompleted = completedQuestIds.includes(quest.id);

  useEffect(() => { completeQuest(quest.id, quest.xp); }, [completeQuest, quest.id, quest.xp]);

  return (
    <main className="min-h-screen pb-12"><ForgeNav /><div className="mx-auto flex max-w-3xl justify-center px-5 py-14 sm:px-8 sm:py-20"><section className="w-full overflow-hidden rounded-3xl border border-orange-500/22 bg-linear-to-b from-orange-500/12 via-[#14110e] to-[#0f0f0f] p-7 text-center shadow-2xl shadow-orange-950/20 sm:p-12"><div className="mx-auto grid size-16 place-items-center rounded-2xl bg-orange-500 text-3xl text-stone-950 shadow-lg shadow-orange-900/40">✓</div><p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">Quest complete</p><h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Well forged.</h1><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-400">You completed <span className="font-medium text-stone-200">{quest.title}</span>. Momentum compounds—choose the next useful action while it&apos;s warm.</p><div className="mx-auto mt-9 max-w-md rounded-2xl border border-orange-400/15 bg-orange-500/8 p-5"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-200">XP earned</p><p className="mt-2 text-5xl font-semibold tracking-tight text-orange-300">+{previouslyCompleted ? 0 : quest.xp}</p><p className="mt-2 text-xs text-stone-500">{previouslyCompleted ? "This quest was already banked." : "Added to your builder progress."}</p></div><div className="mx-auto mt-7 max-w-md rounded-2xl border border-white/7 bg-black/15 p-4 text-left"><div className="mb-3 flex items-center justify-between"><span className="text-sm font-semibold text-white">Level {mockUser.level} progress</span><span className="text-xs text-stone-500">{xp.toLocaleString()} XP</span></div><XPBar current={xp} goal={mockUser.xpToNextLevel} compact /></div><div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/dashboard" className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-stone-950 transition hover:bg-orange-400">See your progress</Link><Link href="/campaign" className="rounded-xl border border-white/12 px-5 py-3 text-sm font-semibold text-stone-200 transition hover:bg-white/6">Choose another quest</Link></div></section></div></main>
  );
}

function CompletionLoading() {
  return <main className="grid min-h-screen place-items-center text-sm text-stone-500">Finalizing your progress…</main>;
}
