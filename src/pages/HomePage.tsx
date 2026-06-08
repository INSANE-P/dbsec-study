import { Link } from "react-router-dom";
import { ALL_QUESTIONS } from "@/data/questions";
import { useProgress } from "@/lib/progressStore";
import { byScope, computeStats, type Stats } from "@/lib/stats";
import { ALL_TYPES } from "@/lib/ui";
import ProgressBar from "@/components/ProgressBar";
import GrowthWidget from "@/components/GrowthWidget";

function StatCard({ title, sub, stats, to }: { title: string; sub: string; stats: Stats; to: string }) {
  const pct = stats.total === 0 ? 0 : Math.round((stats.graded / stats.total) * 100);
  return (
    <Link to={to} className="card-soft card-hover block rounded-3xl bg-surface p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-extrabold text-foreground">{title}</h3>
          <p className="text-xs font-medium text-muted">{sub}</p>
        </div>
        <span className="text-sm font-bold text-muted-strong">{stats.graded}/{stats.total}</span>
      </div>
      <div className="my-3.5 flex items-baseline gap-2">
        <span className="text-3xl font-extrabold text-brand-blue">{pct}%</span>
        <span className="text-sm font-semibold text-brand-green">정답률 {stats.accuracy}%</span>
      </div>
      <ProgressBar value={stats.graded} total={stats.total} />
      <div className="mt-3 flex gap-3 text-xs font-medium text-muted">
        <span>맞음 {stats.correct}</span>
        <span>애매 {stats.unsure}</span>
        <span>틀림 {stats.wrong}</span>
      </div>
    </Link>
  );
}

function QuickLink({ to, title, desc }: { to: string; title: string; desc: string }) {
  return (
    <Link to={to} className="card-soft card-hover flex items-center gap-3 rounded-2xl bg-surface p-4">
      <div className="min-w-0">
        <div className="text-sm font-extrabold text-foreground">{title}</div>
        <div className="truncate text-xs font-medium text-muted">{desc}</div>
      </div>
      <svg viewBox="0 0 24 24" className="ml-auto h-5 w-5 shrink-0 text-muted" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
    </Link>
  );
}

export default function HomePage() {
  const { progress, resetAll } = useProgress();
  const all = computeStats(ALL_QUESTIONS, progress);
  const mid = computeStats(byScope(ALL_QUESTIONS, "midterm"), progress);
  const fin = computeStats(byScope(ALL_QUESTIONS, "final"), progress);
  const wrongCount = all.wrong + all.unsure;
  const pct = all.total === 0 ? 0 : Math.round((all.graded / all.total) * 100);

  // 유형별 정답률 (채점한 문제가 있는 유형만, 정답률 낮은 순)
  const typeStats = ALL_TYPES.map((type) => ({
    type,
    ...computeStats(ALL_QUESTIONS.filter((q) => q.type === type), progress),
  }))
    .filter((t) => t.graded > 0)
    .sort((a, b) => a.accuracy - b.accuracy);

  return (
    <div className="space-y-7">
      {/* 인사 */}
      <header>
        <h1 className="text-[1.7rem] font-extrabold leading-tight tracking-tight text-foreground sm:text-3xl">
          데이터베이스 보안 시험 공부
        </h1>
        <p className="mt-1 text-muted-strong">기출 유형으로 풀고, 답을 확인하고, 스스로 채점해요.</p>
      </header>

      {/* 성장 캐릭터 */}
      <GrowthWidget />

      {/* 전체 진행률 */}
      <section className="card-soft rounded-3xl bg-surface p-6 sm:p-7">
        <div className="mb-3.5 flex items-end justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-foreground">전체 진행률</h2>
            <p className="text-sm font-medium text-muted">{all.graded} / {all.total} 문제 풀이</p>
          </div>
          <div className="text-4xl font-extrabold text-brand-blue">{pct}%</div>
        </div>
        <ProgressBar value={all.graded} total={all.total} />
        <div className="mt-5 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-2xl bg-brand-green-bg py-4 dark:bg-brand-green/10">
            <div className="text-2xl font-extrabold text-brand-green">{all.correct}</div>
            <div className="text-xs font-bold text-muted-strong">맞음</div>
          </div>
          <div className="rounded-2xl bg-brand-amber-bg py-4 dark:bg-brand-amber/10">
            <div className="text-2xl font-extrabold text-brand-amber">{all.unsure}</div>
            <div className="text-xs font-bold text-muted-strong">애매</div>
          </div>
          <div className="rounded-2xl bg-brand-red-bg py-4 dark:bg-brand-red/10">
            <div className="text-2xl font-extrabold text-brand-red">{all.wrong}</div>
            <div className="text-xs font-bold text-muted-strong">틀림</div>
          </div>
        </div>
      </section>

      {/* 범위별 */}
      <section className="grid gap-4 sm:grid-cols-2">
        <StatCard title="중간고사" sub="1~7주차 · DB 기초 + SQL" stats={mid} to="/study?scope=midterm" />
        <StatCard title="기말고사" sub="9~14주차 · 접근제어 + 암호화 + 빅데이터" stats={fin} to="/study?scope=final" />
      </section>

      {/* 바로가기 */}
      <section className="grid gap-3 sm:grid-cols-3">
        <QuickLink to="/weeks" title="주차별 학습" desc="흐름으로 핵심 정리" />
        <QuickLink to="/concepts" title="개념 정리" desc="약어 · 비교표 암기" />
        <QuickLink to="/wrong" title={`오답노트 (${wrongCount})`} desc="틀림 · 애매 모아보기" />
      </section>

      {/* 유형별 약점 분석 */}
      {typeStats.length > 0 && (
        <section className="card-soft rounded-3xl bg-surface p-6">
          <h2 className="text-lg font-extrabold text-foreground">유형별 정답률</h2>
          <p className="mb-4 text-sm text-muted">채점한 문제 기준 · 정답률이 낮은 유형부터</p>
          <div className="space-y-3">
            {typeStats.map((t) => {
              const weak = t.accuracy < 60;
              return (
                <div key={t.type} className="flex items-center gap-3">
                  <span className="w-20 shrink-0 text-sm font-bold text-foreground">{t.type}</span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-border">
                    <div
                      className={`h-full rounded-full transition-[width] duration-500 ${weak ? "bg-brand-red" : "bg-brand-green"}`}
                      style={{ width: `${t.accuracy}%` }}
                    />
                  </div>
                  <span className={`w-24 shrink-0 text-right text-sm font-bold ${weak ? "text-brand-red" : "text-muted-strong"}`}>
                    {t.accuracy}% <span className="font-medium text-muted">({t.correct}/{t.graded})</span>
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 초기화 */}
      <section className="flex justify-end">
        <button
          onClick={() => {
            if (confirm("모든 학습 기록(셀프 채점·작성한 답)을 초기화할까요?")) resetAll();
          }}
          className="text-sm font-semibold text-muted underline-offset-4 hover:text-brand-red hover:underline"
        >
          학습 기록 전체 초기화
        </button>
      </section>
    </div>
  );
}
