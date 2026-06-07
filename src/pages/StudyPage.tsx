import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ALL_QUESTIONS } from "@/data/questions";
import { WEEKS } from "@/data/weeks";
import type { Scope } from "@/data/types";
import { useProgress } from "@/lib/progressStore";
import { computeStats } from "@/lib/stats";
import FilterBar, { type Filters } from "@/components/FilterBar";
import QuestionCard from "@/components/QuestionCard";
import ProgressBar from "@/components/ProgressBar";

export default function StudyPage() {
  const { progress } = useProgress();
  const [params] = useSearchParams();
  const urlScope = params.get("scope") as Scope | null;
  const urlWeek = params.get("week");

  // URL에 scope/week가 있으면 바로 목록으로, 아니면 선택 화면부터
  const [entered, setEntered] = useState<boolean>(!!urlScope || !!urlWeek);
  const [filters, setFilters] = useState<Filters>({
    scope: urlScope ?? "all",
    week: urlWeek ? Number(urlWeek) : "all",
    type: "all",
  });
  const [hideAnswered, setHideAnswered] = useState(false);
  const [search, setSearch] = useState("");
  const [bookmarkOnly, setBookmarkOnly] = useState(false);
  const [shuffleSeed, setShuffleSeed] = useState(0); // 0이면 섞기 끔

  function enter(scope: Filters["scope"], week: Filters["week"] = "all") {
    setFilters({ scope, week, type: "all" });
    setHideAnswered(false);
    setEntered(true);
    window.scrollTo({ top: 0 });
  }

  // ── 선택 화면 ─────────────────────────────────────────────
  if (!entered) {
    const scopes: { key: Filters["scope"]; title: string; sub: string }[] = [
      { key: "midterm", title: "중간고사", sub: "1~7주차 · DB 기초 + SQL" },
      { key: "final", title: "기말고사", sub: "9~14주차 · 접근제어 + 암호화 + 빅데이터" },
      { key: "all", title: "전체 문제", sub: "중간 + 기말 모두" },
    ];
    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-[1.7rem] font-extrabold tracking-tight text-foreground">문제 풀이</h1>
          <p className="mt-1.5 text-muted-strong">어떤 범위를 풀어볼까요? 카드를 누르거나 주차를 바로 골라보세요.</p>
        </header>

        <div className="space-y-4">
          {scopes.map((s) => {
            const subset = ALL_QUESTIONS.filter((q) => s.key === "all" || q.scope === s.key);
            const st = computeStats(subset, progress);
            const pct = st.total === 0 ? 0 : Math.round((st.graded / st.total) * 100);
            const weeks = WEEKS.filter((w) => s.key === "all" || w.scope === s.key);
            return (
              <section key={s.key} className="card-soft rounded-3xl bg-surface p-6">
                <button onClick={() => enter(s.key)} className="block w-full text-left">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-extrabold text-foreground">{s.title}</h2>
                      <p className="text-sm font-medium text-muted">{s.sub}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-extrabold text-brand-blue">{pct}%</div>
                      <div className="text-xs font-medium text-muted">{st.graded}/{st.total} · 정답률 {st.accuracy}%</div>
                    </div>
                  </div>
                  <ProgressBar value={st.graded} total={st.total} className="mt-3" />
                </button>

                {/* 주차 바로가기 칩 */}
                {weeks.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {weeks.map((w) => (
                      <button
                        key={w.week}
                        onClick={() => enter(w.scope, w.week)}
                        className="rounded-full bg-surface-2 px-3 py-1.5 text-sm font-bold text-muted-strong transition-colors hover:bg-brand-blue hover:text-white"
                      >
                        {w.week}주차
                      </button>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    );
  }

  // ── 목록 화면 ─────────────────────────────────────────────
  const s = search.trim().toLowerCase();
  let filtered = ALL_QUESTIONS.filter((q) => {
    if (filters.scope !== "all" && q.scope !== filters.scope) return false;
    if (filters.week !== "all" && q.week !== filters.week) return false;
    if (filters.type !== "all" && q.type !== filters.type) return false;
    if (hideAnswered && progress[q.id]?.grade) return false;
    if (bookmarkOnly && !progress[q.id]?.bookmark) return false;
    if (s) {
      const hay = (q.prompt + " " + (q.tags?.join(" ") ?? "") + " " + q.modelAnswer).toLowerCase();
      if (!hay.includes(s)) return false;
    }
    return true;
  });
  if (shuffleSeed) {
    // id가 끝자리만 다른 경우에도 잘 섞이도록 FNV-1a + 아발란치(비선형 혼합) 사용
    const hash = (id: string) => {
      let h = (2166136261 ^ shuffleSeed) >>> 0;
      for (let i = 0; i < id.length; i++) {
        h ^= id.charCodeAt(i);
        h = Math.imul(h, 16777619);
      }
      h ^= h >>> 13;
      h = Math.imul(h, 0x5bd1e995);
      h ^= h >>> 15;
      return h >>> 0;
    };
    filtered = [...filtered].sort((a, b) => hash(a.id) - hash(b.id));
  }
  const stats = computeStats(filtered, progress);
  const bookmarkCount = ALL_QUESTIONS.filter((q) => progress[q.id]?.bookmark).length;

  return (
    <div className="space-y-5">
      <button
        onClick={() => setEntered(false)}
        className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-strong transition-colors hover:text-brand-blue"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
        범위 선택으로
      </button>

      <FilterBar filters={filters} onChange={setFilters} />

      {/* 검색 */}
      <div className="relative">
        <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
        </svg>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="문제·태그·모범답안 검색 (예: GRANT, BLP, 무결성)"
          className="card-soft w-full rounded-2xl bg-surface py-3 pl-11 pr-10 text-sm text-foreground outline-none transition-all placeholder:text-muted focus:ring-2 focus:ring-brand-blue/30"
        />
        {search && (
          <button onClick={() => setSearch("")} aria-label="검색어 지우기" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted hover:text-foreground">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        )}
      </div>

      <div className="card-soft rounded-3xl bg-surface p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold text-foreground">
            {filtered.length}문제 · 푼 {stats.graded} · 정답률 {stats.accuracy}%
          </span>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <button
              onClick={() => setBookmarkOnly((v) => !v)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold transition-colors ${
                bookmarkOnly ? "bg-amber-400 text-white" : "bg-surface-2 text-muted-strong hover:text-amber-500"
              }`}
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" /></svg>
              즐겨찾기 {bookmarkCount > 0 && `(${bookmarkCount})`}
            </button>
            <button
              onClick={() => setShuffleSeed((s) => s + 1)}
              title="누를 때마다 문제 순서를 새로 섞어요"
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold transition-colors ${
                shuffleSeed ? "bg-brand-blue text-white" : "bg-surface-2 text-muted-strong hover:text-brand-blue"
              }`}
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" /></svg>
              {shuffleSeed ? "다시 섞기" : "섞기"}
            </button>
            {shuffleSeed > 0 && (
              <button
                onClick={() => setShuffleSeed(0)}
                className="inline-flex items-center gap-1 rounded-full bg-surface-2 px-3 py-1.5 text-sm font-bold text-muted-strong transition-colors hover:text-foreground"
              >
                원래 순서
              </button>
            )}
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-muted-strong">
              <input
                type="checkbox"
                checked={hideAnswered}
                onChange={(e) => setHideAnswered(e.target.checked)}
                className="h-4 w-4 accent-brand-blue"
              />
              푼 문제 숨기기
            </label>
          </div>
        </div>
        <ProgressBar value={stats.graded} total={filtered.length} />
      </div>

      {filtered.length === 0 ? (
        <div className="card-soft rounded-3xl bg-surface p-12 text-center text-muted">
          조건에 맞는 문제가 없습니다. 필터를 바꿔보세요.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((q, i) => (
            <QuestionCard key={q.id} q={q} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
