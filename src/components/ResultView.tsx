"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { toPng } from "html-to-image";
import { getType, type MbtiType } from "@/lib/types";

interface AxisMeta {
  key: "e" | "s" | "t" | "j";
  left: { letter: string; name: string };
  right: { letter: string; name: string };
}

const AXES: AxisMeta[] = [
  { key: "e", left: { letter: "E", name: "외향" }, right: { letter: "I", name: "내향" } },
  { key: "s", left: { letter: "S", name: "감각" }, right: { letter: "N", name: "직관" } },
  { key: "t", left: { letter: "T", name: "사고" }, right: { letter: "F", name: "감정" } },
  { key: "j", left: { letter: "J", name: "판단" }, right: { letter: "P", name: "인식" } },
];

export default function ResultView({ type }: { type: MbtiType }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [pct, setPct] = useState<Record<string, number> | null>(null);
  const [name, setName] = useState("");

  // 쿼리스트링에서 이름 + 축별 백분율 읽기 (e/s/t/j = 왼쪽 극 %)
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setName(p.get("name") || "");
    const keys = ["e", "s", "t", "j"] as const;
    if (keys.every((k) => p.has(k))) {
      const obj: Record<string, number> = {};
      keys.forEach((k) => {
        const v = Number(p.get(k));
        obj[k] = Number.isFinite(v) ? Math.min(100, Math.max(0, v)) : 50;
      });
      setPct(obj);
    }
  }, []);

  function flash(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  }

  async function saveImage() {
    if (!cardRef.current) return;
    setBusy(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#ffffff",
      });
      const link = document.createElement("a");
      link.download = `mbti-${type.code}.png`;
      link.href = dataUrl;
      link.click();
      flash("이미지를 저장했어요 📥");
    } catch {
      flash("저장에 실패했어요. 다시 시도해주세요.");
    } finally {
      setBusy(false);
    }
  }

  async function share() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const who = name ? `${name}님의` : "나의";
    const shareData = {
      title: `${who} MBTI는 ${type.code} · ${type.nickname}`,
      text: `${who} MBTI 유형은 ${type.code}(${type.nickname})! 너도 테스트 해봐 👇`,
      url,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(url);
        flash("링크를 복사했어요 🔗");
      }
    } catch {
      /* 사용자가 공유를 취소한 경우 무시 */
    }
  }

  return (
    <main className="flex-1 flex flex-col items-center px-6 py-10">
      <div className="w-full max-w-md">
        {/* ── 캡처 대상 결과 카드 ── */}
        <div
          ref={cardRef}
          className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-blue-700 p-8 text-white shadow-lg shadow-blue-600/20"
        >
          <div className="text-center">
            {name && (
              <p className="mb-1 text-base font-bold opacity-95">
                {name}님의 성격 유형은
              </p>
            )}
            <div className="mb-3 select-none text-6xl">{type.emoji}</div>
            <p className="text-sm font-semibold tracking-widest opacity-90">
              {type.nickname}
            </p>
            <h1 className="mt-1 text-5xl font-black tracking-tight">
              {type.code}
            </h1>
            <p className="mt-4 text-base leading-relaxed opacity-95">
              {type.summary}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {type.traits.map((t) => (
              <span
                key={t}
                className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium"
              >
                #{t}
              </span>
            ))}
          </div>

          <p className="mt-6 text-center text-xs opacity-70">
            20문항 MBTI 성격 유형 테스트
          </p>
        </div>

        {/* ── 축별 성향 백분율 ── */}
        {pct && (
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-5 font-bold text-slate-800">📊 나의 성향 분석</h3>
            <div className="space-y-5">
              {AXES.map((ax) => {
                const leftPct = pct[ax.key];
                const rightPct = 100 - leftPct;
                const leftWin = leftPct >= rightPct;
                return (
                  <div key={ax.key}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span
                        className={
                          leftWin
                            ? "font-bold text-blue-600"
                            : "font-medium text-slate-400"
                        }
                      >
                        {ax.left.name}({ax.left.letter}) {leftPct}%
                      </span>
                      <span
                        className={
                          !leftWin
                            ? "font-bold text-blue-600"
                            : "font-medium text-slate-400"
                        }
                      >
                        {rightPct}% {ax.right.name}({ax.right.letter})
                      </span>
                    </div>
                    <div className="flex h-2.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={leftWin ? "bg-blue-600" : "bg-blue-200"}
                        style={{ width: `${leftPct}%` }}
                      />
                      <div
                        className={!leftWin ? "bg-blue-600" : "bg-blue-200"}
                        style={{ width: `${rightPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ── 상세 섹션 ── */}
        <section className="mt-6 space-y-5">
          <DetailBlock title="💪 강점" items={type.strengths} />
          <DetailBlock title="⚠️ 약점" items={type.weaknesses} />
          <DetailBlock title="💼 추천 직업" items={type.jobs} />

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-1 font-bold text-slate-800">🤝 나와 잘 맞는 유형</h3>
            <p className="mb-4 text-sm text-slate-400">
              이런 성향의 사람과 특히 잘 어울려요
            </p>
            <div className="space-y-3">
              {type.goodMatch.map((m) => {
                const t = getType(m.code);
                return (
                  <div
                    key={m.code}
                    className="rounded-xl bg-blue-50 p-4"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{t?.emoji}</span>
                      <span className="font-extrabold text-blue-700">
                        {m.code}
                      </span>
                      <span className="text-sm font-semibold text-slate-600">
                        {t?.nickname}
                      </span>
                    </div>
                    {t?.summary && (
                      <p className="mt-1.5 text-sm text-slate-500">
                        “{t.summary}”
                      </p>
                    )}
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      {m.reason}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 액션 버튼 ── */}
        <button
          onClick={share}
          className="mt-8 flex w-full items-center justify-center rounded-2xl bg-blue-600 px-4 py-4 text-lg font-bold text-white shadow-lg shadow-blue-600/40 transition active:scale-[0.98] hover:bg-blue-700"
        >
          🔗 결과 공유하기
        </button>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <button
            onClick={saveImage}
            disabled={busy}
            className="rounded-2xl border-2 border-blue-600 px-4 py-3.5 font-bold text-blue-600 transition active:scale-[0.98] hover:bg-blue-50 disabled:opacity-60"
          >
            {busy ? "저장 중..." : "📥 이미지 저장"}
          </button>
          <Link
            href="/"
            className="rounded-2xl bg-blue-50 px-4 py-3.5 text-center font-bold text-blue-700 transition active:scale-[0.98] hover:bg-blue-100"
          >
            🔄 다시하기
          </Link>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      )}
    </main>
  );
}

function DetailBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-3 font-bold text-slate-800">{title}</h3>
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2 text-slate-600">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
