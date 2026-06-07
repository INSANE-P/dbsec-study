// ──────────────────────────────────────────────────────────────────────────
// localStorage 기반 진행상황 / 셀프채점 관리
// 정적 배포(백엔드 없음)라 모든 학습 상태를 브라우저에 저장한다.
// ──────────────────────────────────────────────────────────────────────────

/** 셀프 채점 결과 */
export type Grade = "correct" | "unsure" | "wrong";

/** 문제별 진행 상태 */
export type Progress = {
  /** 채점 결과 (없으면 아직 안 푼 것) */
  grade?: Grade;
  /** 사용자가 입력한 답 (재방문 시 복원) */
  answer?: string;
  /** 즐겨찾기(별표) 여부 */
  bookmark?: boolean;
  /** 마지막 갱신 시각 (epoch ms) */
  updatedAt: number;
};

type Store = Record<string, Progress>;

const KEY = "dbsec.progress.v1";
const THEME_KEY = "dbsec.theme";

function read(): Store {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Store) : {};
  } catch {
    return {};
  }
}

function write(store: Store) {
  try {
    localStorage.setItem(KEY, JSON.stringify(store));
  } catch {
    /* 용량 초과 등은 무시 */
  }
}

export function getAllProgress(): Store {
  return read();
}

export function getProgress(id: string): Progress | undefined {
  return read()[id];
}

export function setGrade(id: string, grade: Grade) {
  const store = read();
  store[id] = { ...store[id], grade, updatedAt: Date.now() };
  write(store);
}

export function saveAnswer(id: string, answer: string) {
  const store = read();
  store[id] = { ...store[id], answer, updatedAt: Date.now() };
  write(store);
}

export function setBookmark(id: string, bookmark: boolean) {
  const store = read();
  store[id] = { ...store[id], bookmark, updatedAt: Date.now() };
  write(store);
}

/** 한 문제의 진행 상태 초기화 */
export function clearProgress(id: string) {
  const store = read();
  delete store[id];
  write(store);
}

/** 전체 학습 기록 초기화 */
export function resetAll() {
  write({});
}

// ── 테마 ────────────────────────────────────────────────────────────────
export type Theme = "light" | "dark";

export function getTheme(): Theme {
  const t = localStorage.getItem(THEME_KEY);
  if (t === "dark" || t === "light") return t;
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function setTheme(theme: Theme) {
  localStorage.setItem(THEME_KEY, theme);
  document.documentElement.classList.toggle("dark", theme === "dark");
}
