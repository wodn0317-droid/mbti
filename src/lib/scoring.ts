import { questions, type Axis, type Pole } from "./questions";

// answers: 각 질문 id → 선택한 옵션 인덱스(0 또는 1)
export type Answers = Record<string, 0 | 1>;

const AXIS_ORDER: Axis[] = ["EI", "SN", "TF", "JP"];
const AXIS_POLES: Record<Axis, [Pole, Pole]> = {
  EI: ["E", "I"],
  SN: ["S", "N"],
  TF: ["T", "F"],
  JP: ["J", "P"],
};

export interface AxisBreakdown {
  axis: Axis;
  left: Pole; // E, S, T, J
  right: Pole; // I, N, F, P
  leftPct: number; // 왼쪽 극 백분율(0~100)
  rightPct: number;
  winner: Pole;
}

export interface TestResult {
  code: string;
  breakdown: AxisBreakdown[]; // EI, SN, TF, JP 순서
}

/**
 * 응답을 4글자 MBTI 코드 + 축별 백분율로 변환.
 * 축당 문항이 홀수(5개)이므로 동점이 발생하지 않는다.
 */
export function calculateResult(answers: Answers): TestResult {
  const breakdown: AxisBreakdown[] = [];
  let code = "";

  for (const axis of AXIS_ORDER) {
    const [left, right] = AXIS_POLES[axis];
    const axisQuestions = questions.filter((q) => q.axis === axis);
    const total = axisQuestions.length;

    let leftCount = 0;
    for (const q of axisQuestions) {
      const choice = answers[q.id];
      if (choice !== 0 && choice !== 1) continue;
      if (q.options[choice].score === left) leftCount += 1;
    }

    const leftPct = Math.round((leftCount / total) * 100);
    const rightPct = 100 - leftPct;
    const winner = leftCount > total - leftCount ? left : right;

    code += winner;
    breakdown.push({ axis, left, right, leftPct, rightPct, winner });
  }

  return { code, breakdown };
}

// 모든 문항에 응답했는지 확인
export function isComplete(answers: Answers): boolean {
  return questions.every((q) => answers[q.id] === 0 || answers[q.id] === 1);
}
