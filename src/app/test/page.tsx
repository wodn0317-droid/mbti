"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { questions, type Option, type Pole } from "@/lib/questions";
import { calculateResult, type Answers } from "@/lib/scoring";
import ProgressBar from "@/components/ProgressBar";

export default function TestPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [name, setName] = useState("");
  const [mounted, setMounted] = useState(false);
  // 문항별 선택지 표시 순서 (초기엔 원본 순서 → 마운트 후 랜덤 셔플)
  const [orders, setOrders] = useState<Option[][]>(() =>
    questions.map((q) => [...q.options])
  );

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setName(p.get("name") || "");
    // 선택지 순서를 문항마다 50% 확률로 뒤집어, 위/아래 위치로 결과를 조작할 수 없게 함
    setOrders(
      questions.map((q) =>
        Math.random() < 0.5
          ? [q.options[0], q.options[1]]
          : [q.options[1], q.options[0]]
      )
    );
    setMounted(true);
  }, []);

  const total = questions.length;
  const q = questions[index];
  const opts = orders[index];
  const selectedPole = answers[q.id];

  function choose(pole: Pole) {
    const next: Answers = { ...answers, [q.id]: pole };
    setAnswers(next);

    if (index === total - 1) {
      const { code, breakdown } = calculateResult(next);
      const query = new URLSearchParams({
        e: String(breakdown[0].leftPct),
        s: String(breakdown[1].leftPct),
        t: String(breakdown[2].leftPct),
        j: String(breakdown[3].leftPct),
      });
      if (name) query.set("name", name);
      router.push(`/result/${code}?${query.toString()}`);
    } else {
      setTimeout(() => setIndex((i) => i + 1), 180);
    }
  }

  function goBack() {
    if (index > 0) setIndex((i) => i - 1);
  }

  // 마운트 전에는 셔플 결과가 없으므로 로딩 표시 (하이드레이션 불일치/깜빡임 방지)
  if (!mounted) {
    return (
      <main className="flex-1 flex items-center justify-center px-6 py-8">
        <p className="text-slate-400">불러오는 중...</p>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col items-center px-6 py-8">
      <div className="w-full max-w-md">
        <ProgressBar current={index + 1} total={total} />

        <div className="mt-10 min-h-[7rem]">
          <p className="text-sm font-semibold text-blue-500">Q{index + 1}</p>
          <h2 className="mt-2 text-2xl font-bold leading-snug">{q.text}</h2>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          {opts.map((opt) => {
            const active = selectedPole === opt.score;
            return (
              <button
                key={opt.score}
                onClick={() => choose(opt.score)}
                className={`w-full rounded-2xl border-2 px-5 py-4 text-left text-lg font-medium transition active:scale-[0.99] ${
                  active
                    ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/40"
                    : "border-slate-200 bg-white text-slate-800 hover:border-blue-400 hover:bg-blue-50/40"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8">
          {index > 0 && (
            <button
              onClick={goBack}
              className="text-sm font-medium text-slate-400 hover:text-slate-600"
            >
              ← 이전 질문
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
