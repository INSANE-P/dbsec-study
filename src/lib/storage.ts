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
const IDENTITY_KEY = "dbsec.identity.v1";
const SEEN_LEVEL_KEY = "dbsec.seenLevel.v1";

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

/** 여러 문제에서 '입력한 답'만 비운다 (채점·즐겨찾기는 유지) */
export function clearAnswers(ids: string[]) {
  const store = read();
  let changed = false;
  for (const id of ids) {
    const p = store[id];
    if (p && p.answer) {
      store[id] = { ...p, answer: "", updatedAt: Date.now() };
      changed = true;
    }
  }
  if (changed) write(store);
}

/** 전체 학습 기록 초기화 (성장 레벨 기록도 함께 초기화) */
export function resetAll() {
  write({});
  try {
    localStorage.removeItem(SEEN_LEVEL_KEY);
  } catch {
    /* 무시 */
  }
}

// ── 트레이너 아이덴티티 / 성장 ─────────────────────────────────────────────
// 캐릭터를 꾸미는 닉네임·아바타. 학습 기록(progress)과 별도 키라 진행률을
// 초기화해도 닉네임은 남는다.

/** 트레이너(사용자) 정보. avatarUrl 우선, 없으면 github 아이디로 아바타 생성 */
export type Identity = { name?: string; github?: string; avatarUrl?: string };

export function getIdentity(): Identity {
  try {
    const raw = localStorage.getItem(IDENTITY_KEY);
    return raw ? (JSON.parse(raw) as Identity) : {};
  } catch {
    return {};
  }
}

export function setIdentity(id: Identity) {
  try {
    localStorage.setItem(IDENTITY_KEY, JSON.stringify(id));
  } catch {
    /* 무시 */
  }
}

/** 마지막으로 사용자에게 보여준 레벨(레벨업 축하를 한 번만 띄우기 위함) */
export function getSeenLevel(): number {
  const v = Number(localStorage.getItem(SEEN_LEVEL_KEY));
  return Number.isFinite(v) && v > 0 ? v : 0;
}

export function setSeenLevel(level: number) {
  try {
    localStorage.setItem(SEEN_LEVEL_KEY, String(level));
  } catch {
    /* 무시 */
  }
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
