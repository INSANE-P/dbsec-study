// UI 표시용 상수 (유형/범위/채점 라벨·색상)
import type { QuestionType, Scope } from "@/data/types";
import type { Grade } from "./storage";

export const SCOPE_LABEL: Record<Scope, string> = {
  midterm: "중간",
  final: "기말",
};

/** 유형별 배지 색상 (Toss 톤: 낮은 채도의 부드러운 틴트) */
export const TYPE_BADGE: Record<QuestionType, string> = {
  약어정의: "bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300",
  테이블분석: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300",
  관계대수: "bg-violet-50 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300",
  쿼리작성: "bg-sky-50 text-sky-600 dark:bg-sky-500/15 dark:text-sky-300",
  권한쿼리: "bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300",
  보안서술: "bg-rose-50 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300",
  비교서술: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300",
  ACM: "bg-teal-50 text-teal-600 dark:bg-teal-500/15 dark:text-teal-300",
};

export const ALL_TYPES: QuestionType[] = [
  "약어정의",
  "테이블분석",
  "관계대수",
  "쿼리작성",
  "권한쿼리",
  "보안서술",
  "비교서술",
  "ACM",
];

export const GRADE_LABEL: Record<Grade, string> = {
  correct: "맞음",
  unsure: "애매",
  wrong: "틀림",
};

export const GRADE_STYLE: Record<Grade, string> = {
  correct: "bg-brand-green text-white border-brand-green",
  unsure: "bg-brand-amber text-white border-brand-amber",
  wrong: "bg-brand-red text-white border-brand-red",
};

export const GRADE_DOT: Record<Grade, string> = {
  correct: "bg-brand-green",
  unsure: "bg-brand-amber",
  wrong: "bg-brand-red",
};
