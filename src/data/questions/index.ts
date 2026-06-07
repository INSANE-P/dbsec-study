// ──────────────────────────────────────────────────────────────────────────
// 전체 문제 모음 (모든 주차 파일을 합친다)
//
// 📌 새 주차 파일을 추가하면: import 후 아래 ALL_QUESTIONS 배열에 spread 한 줄 추가.
// ──────────────────────────────────────────────────────────────────────────
import type { Question } from "@/data/types";

import { week01 } from "./midterm/week01";
import { week02 } from "./midterm/week02";
import { week03 } from "./midterm/week03";
import { week04 } from "./midterm/week04";
import { week05 } from "./midterm/week05";
import { week06 } from "./midterm/week06";
import { week07 } from "./midterm/week07";

import { week09 } from "./final/week09";
import { week10 } from "./final/week10";
import { week11 } from "./final/week11";
import { week12 } from "./final/week12";
import { week13 } from "./final/week13";
import { week14 } from "./final/week14";

export const ALL_QUESTIONS: Question[] = [
  ...week01,
  ...week02,
  ...week03,
  ...week04,
  ...week05,
  ...week06,
  ...week07,
  ...week09,
  ...week10,
  ...week11,
  ...week12,
  ...week13,
  ...week14,
];

// 개발 중 id 중복 검사 (중복 시 콘솔 경고)
if (import.meta.env?.DEV) {
  const seen = new Set<string>();
  for (const q of ALL_QUESTIONS) {
    if (seen.has(q.id)) console.warn(`[questions] 중복된 id: ${q.id}`);
    seen.add(q.id);
  }
}
