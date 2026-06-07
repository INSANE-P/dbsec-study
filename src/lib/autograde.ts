// ──────────────────────────────────────────────────────────────────────────
// 보조 채점 (하이브리드) — 키워드 매칭
// 사용자가 작성한 답안 텍스트에서 정답 키워드(필수/가점) 포함 여부를 검사한다.
// ⚠️ 최종 판정은 사용자의 셀프 채점이 한다. 이 결과는 '근거/힌트'일 뿐 자동 확정하지 않는다.
// ──────────────────────────────────────────────────────────────────────────
import type { Question } from "@/data/types";

export type KeywordHit = {
  /** 표시용 대표 키워드 */
  label: string;
  hit: boolean;
};

export type GradeResult = {
  must: KeywordHit[];
  bonus: KeywordHit[];
  /** 필수 키워드 충족 개수 / 전체 */
  mustHit: number;
  mustTotal: number;
  /** 필수를 모두 포함했는가 → "맞음 추천" 판단 근거 */
  allMust: boolean;
  /** 필수 포함률(%) */
  coverage: number;
};

/** 비교용 정규화: 소문자화 + 공백/문장부호 제거 */
function normalize(s: string): string {
  return s.toLowerCase().replace(/[\s.,;:'"`()\[\]{}/\\\-_]/g, "");
}

/** answer 안에 keyword(또는 동의어)가 포함됐는지 */
function contains(normAnswer: string, keyword: string, synonyms?: string[]): boolean {
  const candidates = [keyword, ...(synonyms ?? [])];
  return candidates.some((c) => {
    const n = normalize(c);
    return n.length > 0 && normAnswer.includes(n);
  });
}

export function gradeAnswer(q: Question, answer: string): GradeResult | null {
  if (!q.grading) return null;
  const norm = normalize(answer);
  const syn = q.grading.synonyms ?? {};

  const must: KeywordHit[] = q.grading.must.map((k) => ({
    label: k,
    hit: contains(norm, k, syn[k]),
  }));
  const bonus: KeywordHit[] = (q.grading.bonus ?? []).map((k) => ({
    label: k,
    hit: contains(norm, k, syn[k]),
  }));

  const mustHit = must.filter((m) => m.hit).length;
  const mustTotal = must.length;
  return {
    must,
    bonus,
    mustHit,
    mustTotal,
    allMust: mustTotal > 0 && mustHit === mustTotal,
    coverage: mustTotal === 0 ? 0 : Math.round((mustHit / mustTotal) * 100),
  };
}
