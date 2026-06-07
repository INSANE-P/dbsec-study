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
  const filtered = ALL_QUESTIONS.filter((q) => {
    if (filters.scope !== "all" && q.scope !== filters.scope) return false;
    if (filters.week !== "all" && q.week !== filters.week) return false;
    if (filters.type !== "all" && q.type !== filters.type) return false;
    if (hideAnswered && progress[q.id]?.grade) return false;
    return true;
  });
  const stats = computeStats(filtered, progress);

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

      <div className="card-soft rounded-3xl bg-surface p-5">
        <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm font-bold text-foreground">
            {filtered.length}문제 · 푼 {stats.graded} · 정답률 {stats.accuracy}%
          </span>
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
