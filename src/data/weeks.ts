import type { WeekMeta } from "./types";

// 주차별 메타데이터 (사이드바/필터 라벨)
// 1~7주차 = 중간고사 범위, 9~14주차 = 기말고사 범위
export const WEEKS: WeekMeta[] = [
  { week: 1, scope: "midterm", title: "DB 기초 · 추상화 · 관계형 모델" },
  { week: 2, scope: "midterm", title: "DBMS 환경 · SQL 분류 · 발전사" },
  { week: 3, scope: "midterm", title: "관계형 DB · 키 · 무결성 · 관계대수" },
  { week: 4, scope: "midterm", title: "SQL 상세 · DDL/DML/DCL · 권한" },
  { week: 5, scope: "midterm", title: "정보보안 CIA · DB보안 요구사항" },
  { week: 6, scope: "midterm", title: "DBA · 계정/권한 · Role · View · 감사" },
  { week: 7, scope: "midterm", title: "인증 · 접근통제 · 취약점 분석" },
  { week: 9, scope: "final", title: "접근제어 개요 · DAC · ACM/ACL/Capability" },
  { week: 10, scope: "final", title: "MAC(BLP/Biba) · RBAC · ABAC" },
  { week: 11, scope: "final", title: "암호화 기초 · 대칭/비대칭 · DB암호화 방식" },
  { week: 12, scope: "final", title: "DB암호화 생명주기 · TDE · HSM · 블록모드" },
  { week: 13, scope: "final", title: "빅데이터 개념 · 유형 · 3~7V · 생명주기" },
  { week: 14, scope: "final", title: "빅데이터 프라이버시 5단계 · 비식별화" },
];

export function weekTitle(week: number): string {
  return WEEKS.find((w) => w.week === week)?.title ?? `${week}주차`;
}

export function weekScope(week: number): "midterm" | "final" {
  return WEEKS.find((w) => w.week === week)?.scope ?? "midterm";
}
