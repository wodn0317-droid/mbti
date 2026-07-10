import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getType, allTypeCodes } from "@/lib/types";
import ResultView from "@/components/ResultView";

export function generateStaticParams() {
  return allTypeCodes.map((type) => ({ type }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  const data = getType(type);
  if (!data) return { title: "결과를 찾을 수 없어요" };
  return {
    title: `내 MBTI는 ${data.code} · ${data.nickname}`,
    description: data.summary,
    openGraph: {
      title: `내 MBTI는 ${data.code} · ${data.nickname}`,
      description: data.summary,
    },
  };
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const data = getType(type);
  if (!data) notFound();

  return <ResultView type={data} />;
}
