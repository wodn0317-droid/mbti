"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [name, setName] = useState("");
  const router = useRouter();

  function start() {
    const n = name.trim();
    if (!n) return;
    router.push(`/test?name=${encodeURIComponent(n)}`);
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-b from-blue-50 via-white to-white">
      <div className="w-full max-w-md text-center">
        <div className="text-6xl mb-6 select-none">🧭</div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 leading-snug">
          나의 성격 유형은?
          <br />
          <span className="text-blue-600">20문항 MBTI 테스트</span>
        </h1>

        <p className="text-base text-slate-500 mb-2">
          20개의 질문으로 알아보는 나의 진짜 성격
        </p>
        <p className="text-sm text-slate-400 mb-8">
          ⏱️ 약 2분 소요 · 📝 20문항 · 🔓 로그인 불필요
        </p>

        {/* 이름 입력 */}
        <div className="mb-4 text-left">
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm font-semibold text-slate-600"
          >
            이름을 입력해 주세요
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && start()}
            placeholder="예) 홍길동"
            maxLength={20}
            className="w-full rounded-2xl border-2 border-slate-200 bg-white px-5 py-3.5 text-lg outline-none transition focus:border-blue-500"
          />
        </div>

        <button
          onClick={start}
          disabled={!name.trim()}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-blue-600/40 transition active:scale-[0.98] hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
        >
          테스트 시작하기
        </button>

        <p className="mt-8 text-xs text-slate-400">
          ※ 본 테스트는 재미와 자기 이해를 위한 비공식 간이 테스트입니다.
        </p>
      </div>
    </main>
  );
}
