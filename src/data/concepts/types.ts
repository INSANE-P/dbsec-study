// ──────────────────────────────────────────────────────────────────────────
// 정리(개념) 섹션 타입 — 문제와 별도로 빠른 암기용 자료
// ──────────────────────────────────────────────────────────────────────────
import type { Scope } from "@/data/types";

/** 약어 카드 */
export type Abbrev = {
  abbr: string;
  full: string;
  meaning: string;
  week: number;
  scope: Scope;
};

/** 비교표 */
export type CompareTable = {
  id: string;
  title: string;
  scope: Scope;
  week: number;
  columns: string[];
  rows: string[][];
  note?: string;
};

/** 서술형 개념 카드 (마크다운 본문) */
export type InfoCard = {
  id: string;
  title: string;
  scope: Scope;
  week: number;
  /** 마크다운: 줄바꿈 \n, **굵게**, 표, ```코드``` 지원 */
  body: string;
};
