"use client";

import { useEffect, useRef, useState } from "react";

type FocusTimerProps = {
  minutes: number;
  onComplete: () => void;
};

export function FocusTimer({ minutes, onComplete }: FocusTimerProps) {
  const initialSeconds = minutes * 60;
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [running, setRunning] = useState(false);
  const completed = useRef(false);

  useEffect(() => {
    if (!running || secondsLeft <= 0) return;
    const interval = window.setInterval(() => setSecondsLeft((seconds) => seconds - 1), 1000);
    return () => window.clearInterval(interval);
  }, [running, secondsLeft]);

  useEffect(() => {
    if (secondsLeft === 0 && !completed.current) {
      completed.current = true;
      onComplete();
    }
  }, [secondsLeft, onComplete]);

  const elapsed = initialSeconds - secondsLeft;
  const percentage = Math.min(100, (elapsed / initialSeconds) * 100);
  const display = `${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:${String(secondsLeft % 60).padStart(2, "0")}`;

  return (
    <div className="text-center">
      <div className="relative mx-auto grid size-60 place-items-center rounded-full sm:size-72" style={{ background: `conic-gradient(#fb923c ${percentage * 3.6}deg, rgba(255,255,255,.07) ${percentage * 3.6}deg)` }}>
        <div className="grid size-[calc(100%-12px)] place-items-center rounded-full bg-[#11100f] shadow-inner shadow-black/80">
          <div>
            <p className="font-mono text-5xl font-semibold tracking-tight text-white sm:text-6xl">{display}</p>
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-stone-500">focus remaining</p>
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-center gap-3">
        <button disabled={secondsLeft === 0} onClick={() => setRunning((current) => !current)} className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60">
          {running ? "Pause session" : secondsLeft === 0 ? "Session complete" : "Begin focus"}
        </button>
        <button onClick={() => { completed.current = false; setRunning(false); setSecondsLeft(initialSeconds); }} className="rounded-xl border border-white/12 px-5 py-3 text-sm font-medium text-stone-300 transition hover:bg-white/6">Reset</button>
      </div>
    </div>
  );
}
