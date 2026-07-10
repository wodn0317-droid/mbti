import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "20문항 MBTI 성격 유형 테스트",
  description:
    "20개의 질문으로 2분 만에 알아보는 나의 MBTI 성격 유형! 축별 성향 백분율과 특징·강점·약점·추천 직업까지 확인하고 결과를 공유해보세요.",
  openGraph: {
    title: "20문항 MBTI 성격 유형 테스트",
    description: "20개의 질문으로 2분 만에 알아보는 나의 MBTI 성격 유형!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
