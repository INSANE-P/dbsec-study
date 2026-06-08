// ──────────────────────────────────────────────────────────────────────────
// 캐릭터 육성 — 학습 행동을 경험치(XP)로 환산해 등급(티어)을 계산한다.
//
// 설계 원칙
//  - XP 획득 방법을 명확히 정의해 사용자가 "무엇을 하면 얼마"인지 바로 안다.
//  - 전부 진행상황(store)에서 결정론적으로 재계산 → 조작·중복 적립이 없고,
//    틀림→맞음으로 고치면 자연히 XP가 오른다.
//  - 핵심 학습 루프(풀기·채점)에 가장 큰 보상, 완주(주차·범위)에 보너스.
// ──────────────────────────────────────────────────────────────────────────
import type { Question } from "@/data/types";
import type { Grade } from "./storage";

type Store = Record<string, { grade?: Grade; answer?: string }>;

/** 답안으로 인정하는 최소 글자 수 */
export const ANSWER_MIN = 10;

/** XP 획득량 정의 */
export const XP = {
  answer: 5, // 답안 직접 작성(문제당 1회)
  correct: 20, // 채점: 맞음
  unsure: 12, // 채점: 애매
  wrong: 8, // 채점: 틀림(시도도 보상)
  weekClear: 40, // 한 주차 전 문제 채점
  scopeClear: 150, // 중간/기말 범위 전체 채점
} as const;

export type Tier = {
  level: number;
  name: string;
  minXp: number;
  /** 메인 색 */
  color: string;
  /** 밝은 보조 색(그라데이션) */
  accent: string;
  blurb: string;
};

export const TIERS: Tier[] = [
  { level: 1, name: "루키", minXp: 0, color: "#64748b", accent: "#94a3b8", blurb: "이제 막 모험을 시작했어요" },
  { level: 2, name: "챌린저", minXp: 80, color: "#16a34a", accent: "#4ade80", blurb: "본격적으로 달리는 중" },
  { level: 3, name: "엘리트", minXp: 280, color: "#0ea5e9", accent: "#38bdf8", blurb: "실력이 단단해졌어요" },
  { level: 4, name: "마스터", minXp: 650, color: "#8b5cf6", accent: "#c4b5fd", blurb: "웬만한 문제는 거뜬해요" },
  { level: 5, name: "그랜드마스터", minXp: 1200, color: "#f97316", accent: "#fb923c", blurb: "시험이 두렵지 않아요" },
  { level: 6, name: "레전드", minXp: 2200, color: "#f59e0b", accent: "#fde047", blurb: "데이터베이스 보안 정복!" },
];

export function tierAt(level: number): Tier {
  const lv = Math.min(6, Math.max(1, Math.round(level)));
  return TIERS.find((t) => t.level === lv) ?? TIERS[0];
}

export type XpSource = { label: string; detail: string; xp: number };

export type Growth = {
  xp: number;
  level: number;
  tier: Tier;
  nextTier?: Tier;
  toNext: number;
  pctInStage: number;
  isMax: boolean;
  counts: {
    answers: number;
    correct: number;
    unsure: number;
    wrong: number;
    graded: number;
    weeksDone: number;
    scopesDone: number;
  };
  sources: XpSource[];
};

export function computeGrowth(questions: Question[], store: Store): Growth {
  let correct = 0,
    unsure = 0,
    wrong = 0,
    answers = 0,
    graded = 0;

  const weeks = new Map<string, { tot: number; done: number }>();
  const scopes = new Map<string, { tot: number; done: number }>();

  for (const q of questions) {
    const p = store[q.id];
    const wk = `${q.scope}:${q.week}`;
    const w = weeks.get(wk) ?? { tot: 0, done: 0 };
    const s = scopes.get(q.scope) ?? { tot: 0, done: 0 };
    w.tot++;
    s.tot++;

    if ((p?.answer?.trim().length ?? 0) >= ANSWER_MIN) answers++;

    const g = p?.grade;
    if (g) {
      graded++;
      w.done++;
      s.done++;
      if (g === "correct") correct++;
      else if (g === "unsure") unsure++;
      else wrong++;
    }
    weeks.set(wk, w);
    scopes.set(q.scope, s);
  }

  let weeksDone = 0;
  weeks.forEach((w) => {
    if (w.tot > 0 && w.done === w.tot) weeksDone++;
  });
  let scopesDone = 0;
  scopes.forEach((s) => {
    if (s.tot > 0 && s.done === s.tot) scopesDone++;
  });

  const xp =
    answers * XP.answer +
    correct * XP.correct +
    unsure * XP.unsure +
    wrong * XP.wrong +
    weeksDone * XP.weekClear +
    scopesDone * XP.scopeClear;

  let idx = 0;
  for (let i = 0; i < TIERS.length; i++) if (xp >= TIERS[i].minXp) idx = i;
  const tier = TIERS[idx];
  const nextTier = TIERS[idx + 1];

  const sources: XpSource[] = [
    { label: "답안 직접 작성", detail: `${answers} × ${XP.answer}`, xp: answers * XP.answer },
    { label: "채점 · 맞음", detail: `${correct} × ${XP.correct}`, xp: correct * XP.correct },
    { label: "채점 · 애매", detail: `${unsure} × ${XP.unsure}`, xp: unsure * XP.unsure },
    { label: "채점 · 틀림", detail: `${wrong} × ${XP.wrong}`, xp: wrong * XP.wrong },
    { label: "주차 정복", detail: `${weeksDone} × ${XP.weekClear}`, xp: weeksDone * XP.weekClear },
    { label: "시험 범위 정복", detail: `${scopesDone} × ${XP.scopeClear}`, xp: scopesDone * XP.scopeClear },
  ];

  const counts = { answers, correct, unsure, wrong, graded, weeksDone, scopesDone };

  if (!nextTier) {
    return { xp, level: tier.level, tier, nextTier: undefined, toNext: 0, pctInStage: 100, isMax: true, counts, sources };
  }
  const span = nextTier.minXp - tier.minXp;
  const into = xp - tier.minXp;
  return {
    xp,
    level: tier.level,
    tier,
    nextTier,
    toNext: nextTier.minXp - xp,
    pctInStage: Math.max(0, Math.min(100, Math.round((into / span) * 100))),
    isMax: false,
    counts,
    sources,
  };
}
