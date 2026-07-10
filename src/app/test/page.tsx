"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/lib/questions";
import { calculateResult, type Answers } from "@/lib/scoring";
import ProgressBar from "@/components/ProgressBar";

export default function TestPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [name, setName] = useState("");

  // 시작 화면에서 넘어온 이름 읽기
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setName(p.get("name") || "");
  }, []);

  const total = questions.length;
  const q = questions[index];
  const selected = answers[q.id];

  function choose(choice: 0 | 1) {
    const next: Answers = { ...answers, [q.id]: choice };
    setAnswers(next);

    // 마지막 문항이면 결과 계산 후 이동, 아니면 다음 문항
    if (index === total - 1) {
      const { code, breakdown } = calculateResult(next);
      // 축별 백분율(왼쪽 극 기준)을 쿼리로 전달: e/s/t/j
      const q = new URLSearchParams({
        e: String(breakdown[0].leftPct),
        s: String(breakdown[1].leftPct),
        t: String(breakdown[2].leftPct),
        j: String(breakdown[3].leftPct),
      });
      if (name) q.set("name", name);
      router.push(`/result/${code}?${q.toString()}`);
    } else {
      // 짧은 딜레이로 선택 피드백을 보여준 뒤 전환
      setTimeout(() => setIndex((i) => i + 1), 180);
    }
  }

  function goBack() {
    if (index > 0) setIndex((i) => i - 1);
  }

  return (
    <main className="flex-1 flex flex-col items-center px-6 py-8">
      <div className="w-full max-w-md">
        <ProgressBar current={index + 1} total={total} />

        <div className="mt-10 min-h-[7rem]">
          <p className="text-sm font-semibold text-blue-500">
            Q{index + 1}
          </p>
          <h2 className="mt-2 text-2xl font-bold leading-snug">{q.text}</h2>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          {q.options.map((opt, i) => {
            const active = selected === i;
            return (
              <button
                key={i}
                onClick={() => choose(i as 0 | 1)}
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
              className="text-sm font-medium text-foreground/50 hover:text-foreground/80"
            >
              ← 이전 질문
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
