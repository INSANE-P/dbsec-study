// ──────────────────────────────────────────────────────────────────────────
// 진행상황 전역 스토어 (React Context)
// localStorage 는 반응형이 아니므로, 메모리 상태로 들고 있다가 변경 시
// localStorage 에 write-through 한다. 모든 컴포넌트가 같은 상태를 공유.
// ──────────────────────────────────────────────────────────────────────────
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getAllProgress,
  setGrade as persistGrade,
  saveAnswer as persistAnswer,
  setBookmark as persistBookmark,
  clearProgress as persistClear,
  resetAll as persistResetAll,
  type Grade,
  type Progress,
} from "./storage";

type Store = Record<string, Progress>;

type Ctx = {
  progress: Store;
  grade: (id: string, g: Grade) => void;
  saveAnswer: (id: string, a: string) => void;
  toggleBookmark: (id: string) => void;
  clearOne: (id: string) => void;
  resetAll: () => void;
};

const ProgressContext = createContext<Ctx | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Store>(() => getAllProgress());

  const grade = useCallback((id: string, g: Grade) => {
    persistGrade(id, g);
    setProgress((prev) => ({
      ...prev,
      [id]: { ...prev[id], grade: g, updatedAt: Date.now() },
    }));
  }, []);

  const saveAnswer = useCallback((id: string, a: string) => {
    persistAnswer(id, a);
    setProgress((prev) => ({
      ...prev,
      [id]: { ...prev[id], answer: a, updatedAt: Date.now() },
    }));
  }, []);

  const toggleBookmark = useCallback((id: string) => {
    setProgress((prev) => {
      const next = !prev[id]?.bookmark;
      persistBookmark(id, next);
      return { ...prev, [id]: { ...prev[id], bookmark: next, updatedAt: Date.now() } };
    });
  }, []);

  const clearOne = useCallback((id: string) => {
    persistClear(id);
    setProgress((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    persistResetAll();
    setProgress({});
  }, []);

  const value = useMemo(
    () => ({ progress, grade, saveAnswer, toggleBookmark, clearOne, resetAll }),
    [progress, grade, saveAnswer, toggleBookmark, clearOne, resetAll],
  );

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress(): Ctx {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
