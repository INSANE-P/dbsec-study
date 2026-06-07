// ──────────────────────────────────────────────────────────────────────────
// 문제/개념 데이터 공통 타입 정의
//
// ⚠️ 유지보수 규칙: 콘텐츠(문제·개념)는 전부 src/data 안에서만 관리한다.
//    컴포넌트에 문제 내용을 하드코딩하지 말 것.
// ──────────────────────────────────────────────────────────────────────────

/** 시험 범위 */
export type Scope = "midterm" | "final";

/** 문제 유형 (기출 분석 기반) */
export type QuestionType =
  | "약어정의" // 약어 → 풀네임 + 의미/정의
  | "테이블분석" // 테이블 주고 튜플/도메인/차수 등
  | "관계대수" // 관계대수 식의 결과/작성
  | "쿼리작성" // SELECT/INSERT 등 SQL 작성
  | "권한쿼리" // GRANT/REVOKE/CREATE USER 등 권한 관리
  | "보안서술" // "~한 상황에서 적용할 방법 N가지" 등 서술
  | "비교서술" // DAC/MAC/RBAC/ABAC, TDE 비교 등
  | "ACM"; // 접근제어행렬 → ACL/Capability 변환

/** 테이블 주는 문제용 샘플 테이블 */
export type SampleTable = {
  name: string;
  columns: string[];
  rows: string[][];
  /** 표 아래 설명(기본키/외래키 등 보조 설명) */
  note?: string;
};

export type Question = {
  /** 예: "mid-w03-q02" / "fin-w10-q01" */
  id: string;
  scope: Scope;
  /** 주차 (1~7 중간, 9~14 기말) */
  week: number;
  type: QuestionType;
  /** 문제 발문 */
  prompt: string;
  /** 테이블 주는 문제용 (선택) */
  table?: SampleTable;
  /** 모범답안 (정확하게). 줄바꿈은 \n, 강조는 **굵게**, 코드는 ```로 감싼다 */
  modelAnswer: string;
  /** 검색/태그용 키워드 (예: ["RBAC","ACM"]) */
  tags?: string[];
  /**
   * 보조 채점용 키워드 (선택). 답안 textarea에서 포함 여부를 검사해
   * 체크리스트로 보여준다. 최종 판정은 사용자의 셀프 채점이 한다(자동 확정 X).
   * - must: 정답에 반드시 들어가야 하는 핵심 키워드
   * - bonus: 있으면 가점되는 키워드
   * - synonyms: 키워드별 동의어(영한 혼용 등). 키=대표어, 값=동의어 목록.
   *   예: { "기밀성": ["confidentiality"], "무결성": ["integrity"] }
   */
  grading?: {
    must: string[];
    bonus?: string[];
    synonyms?: Record<string, string[]>;
  };
};

/** 주차 메타데이터 (사이드바/필터 라벨용) */
export type WeekMeta = {
  week: number;
  scope: Scope;
  title: string;
};
