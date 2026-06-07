// 진행상황 통계 계산 헬퍼
import type { Question, Scope } from "@/data/types";
import type { Grade } from "./storage";

type Store = Record<string, { grade?: Grade }>;

export type Stats = {
  total: number;
  graded: number; // 채점한 문제 수 (= 푼 문제)
  correct: number;
  unsure: number;
  wrong: number;
  /** 정답률 = correct / graded (채점한 것 기준) */
  accuracy: number;
};

export function computeStats(questions: Question[], store: Store): Stats {
  let graded = 0,
    correct = 0,
    unsure = 0,
    wrong = 0;
  for (const q of questions) {
    const g = store[q.id]?.grade;
    if (!g) continue;
    graded++;
    if (g === "correct") correct++;
    else if (g === "unsure") unsure++;
    else if (g === "wrong") wrong++;
  }
  return {
    total: questions.length,
    graded,
    correct,
    unsure,
    wrong,
    accuracy: graded === 0 ? 0 : Math.round((correct / graded) * 100),
  };
}

export function byScope(questions: Question[], scope: Scope): Question[] {
  return questions.filter((q) => q.scope === scope);
}
