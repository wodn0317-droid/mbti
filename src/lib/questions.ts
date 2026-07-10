// MBTI 축: E/I, S/N, T/F, J/P — 축당 5문항, 총 20문항
export type Axis = "EI" | "SN" | "TF" | "JP";
export type Pole = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export interface Option {
  label: string;
  score: Pole;
}

export interface Question {
  id: string;
  axis: Axis;
  text: string;
  options: [Option, Option];
}

export const questions: Question[] = [
  // ── E / I ──
  {
    id: "q1",
    axis: "EI",
    text: "여러 사람이 모인 자리에 있을 때 나는...",
    options: [
      { label: "사람들과 어울릴수록 에너지가 난다", score: "E" },
      { label: "시간이 지날수록 기운이 빠진다", score: "I" },
    ],
  },
  {
    id: "q2",
    axis: "EI",
    text: "처음 보는 사람과 함께 있을 때 나는...",
    options: [
      { label: "먼저 다가가 말을 건다", score: "E" },
      { label: "상대가 다가오길 기다리는 편이다", score: "I" },
    ],
  },
  {
    id: "q3",
    axis: "EI",
    text: "쉬는 주말, 더 끌리는 쪽은...",
    options: [
      { label: "밖에서 사람들과 약속을 잡는다", score: "E" },
      { label: "집에서 혼자 조용히 쉰다", score: "I" },
    ],
  },
  {
    id: "q4",
    axis: "EI",
    text: "새로운 환경에 가면 나는...",
    options: [
      { label: "금방 여러 사람과 친해진다", score: "E" },
      { label: "소수와 천천히 가까워진다", score: "I" },
    ],
  },
  {
    id: "q5",
    axis: "EI",
    text: "생각이 많아질 때 나는...",
    options: [
      { label: "누군가와 이야기하며 정리한다", score: "E" },
      { label: "혼자 곰곰이 정리한다", score: "I" },
    ],
  },
  // ── S / N ──
  {
    id: "q6",
    axis: "SN",
    text: "어떤 일을 바라볼 때 나는...",
    options: [
      { label: "실제 경험과 사실에 집중한다", score: "S" },
      { label: "숨은 의미와 가능성을 상상한다", score: "N" },
    ],
  },
  {
    id: "q7",
    axis: "SN",
    text: "설명을 들을 때 더 잘 와닿는 것은...",
    options: [
      { label: "구체적이고 현실적인 예시", score: "S" },
      { label: "전체적인 개념과 큰 그림", score: "N" },
    ],
  },
  {
    id: "q8",
    axis: "SN",
    text: "새로운 것을 배울 때 나는...",
    options: [
      { label: "검증된 방법을 차근차근 따른다", score: "S" },
      { label: "나만의 방식으로 새롭게 시도한다", score: "N" },
    ],
  },
  {
    id: "q9",
    axis: "SN",
    text: "나는 주로...",
    options: [
      { label: "지금의 현실에 집중하는 편이다", score: "S" },
      { label: "미래의 가능성을 상상하는 편이다", score: "N" },
    ],
  },
  {
    id: "q10",
    axis: "SN",
    text: "대화할 때 나는...",
    options: [
      { label: "사실 위주로 이야기한다", score: "S" },
      { label: "비유나 상상을 자주 곁들인다", score: "N" },
    ],
  },
  // ── T / F ──
  {
    id: "q11",
    axis: "TF",
    text: "중요한 결정을 내릴 때 나는...",
    options: [
      { label: "논리와 객관적 사실을 우선한다", score: "T" },
      { label: "사람들의 감정과 관계를 우선한다", score: "F" },
    ],
  },
  {
    id: "q12",
    axis: "TF",
    text: "친구가 고민을 털어놓을 때 나는...",
    options: [
      { label: "현실적인 해결책을 먼저 제시한다", score: "T" },
      { label: "먼저 공감하고 마음을 다독인다", score: "F" },
    ],
  },
  {
    id: "q13",
    axis: "TF",
    text: "갈등 상황에서 더 중요한 것은...",
    options: [
      { label: "무엇이 옳고 그른지 따지는 것", score: "T" },
      { label: "서로의 마음이 상하지 않는 것", score: "F" },
    ],
  },
  {
    id: "q14",
    axis: "TF",
    text: "무언가를 평가할 때 나는...",
    options: [
      { label: "냉정하고 객관적으로 판단한다", score: "T" },
      { label: "상대의 입장을 먼저 헤아린다", score: "F" },
    ],
  },
  {
    id: "q15",
    axis: "TF",
    text: "누군가 나에게 조언을 구하면 나는...",
    options: [
      { label: "문제의 핵심을 짚어준다", score: "T" },
      { label: "감정을 먼저 알아주려 한다", score: "F" },
    ],
  },
  // ── J / P ──
  {
    id: "q16",
    axis: "JP",
    text: "일을 처리할 때 나는...",
    options: [
      { label: "계획을 세우고 순서대로 진행한다", score: "J" },
      { label: "상황에 따라 유연하게 대처한다", score: "P" },
    ],
  },
  {
    id: "q17",
    axis: "JP",
    text: "여행을 떠날 때 나는...",
    options: [
      { label: "일정을 미리 꼼꼼히 짜둔다", score: "J" },
      { label: "그때그때 즉흥적으로 움직인다", score: "P" },
    ],
  },
  {
    id: "q18",
    axis: "JP",
    text: "마감이 다가올 때 나는...",
    options: [
      { label: "미리미리 여유 있게 끝내둔다", score: "J" },
      { label: "막판에 집중해서 몰아서 한다", score: "P" },
    ],
  },
  {
    id: "q19",
    axis: "JP",
    text: "내 방이나 책상은 주로...",
    options: [
      { label: "깔끔하게 정돈되어 있다", score: "J" },
      { label: "필요한 게 널려 있는 편이다", score: "P" },
    ],
  },
  {
    id: "q20",
    axis: "JP",
    text: "약속을 잡을 때 나는...",
    options: [
      { label: "미리 정해두는 것이 편하다", score: "J" },
      { label: "그때 정하는 것이 편하다", score: "P" },
    ],
  },
];
