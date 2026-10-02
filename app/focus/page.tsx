"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useMemo } from "react";
import { FocusTimer } from "../../components/FocusTimer";
import { ForgeNav } from "../../components/ForgeNav";
import { getQuest } from "../../lib/mockUser";

export default function FocusPage() {
  return (
    <Suspense fallback={<FocusLoading />}>
      <FocusSession />
    </Suspense>
  );
}

function FocusSession() {
  const params = useSearchParams();
  const router = useRouter();
  const quest = useMemo(() => getQuest(params.get("quest")), [params]);
  const finishSession = useCallback(() => router.push(`/complete?quest=${quest.id}`), [quest.id, router]);

  return (
    <main className="min-h-screen pb-12"><ForgeNav /><div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12"><Link href="/campaign" className="inline-flex items-center gap-2 text-sm text-stone-500 transition hover:text-stone-200">← Back to campaign</Link><section className="mt-8 overflow-hidden rounded-3xl border border-white/8 bg-[#11100f] p-6 sm:p-10"><div className="mx-auto max-w-xl text-center"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">Focused quest</p><h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{quest.title}</h1><p className="mt-3 text-sm leading-6 text-stone-400">{quest.focusPrompt}</p></div><div className="mt-10"><FocusTimer key={quest.id} minutes={quest.duration} onComplete={finishSession} /></div><div className="mx-auto mt-10 max-w-md rounded-2xl border border-white/7 bg-white/3 p-4 text-center"><p className="text-xs leading-5 text-stone-500">Need to wrap early? You can bank your progress whenever you&apos;re ready.</p><button onClick={finishSession} className="mt-3 text-sm font-semibold text-orange-300 transition hover:text-orange-200">Complete this quest now →</button></div></section></div></main>
  );
}

function FocusLoading() {
  return <main className="grid min-h-screen place-items-center text-sm text-stone-500">Preparing your focus session…</main>;
}
