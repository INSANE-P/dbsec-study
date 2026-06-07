import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WEEK_NOTES, type WeekNote } from "@/data/weekNotes";
import type { Scope } from "@/data/types";
import { SCOPE_LABEL } from "@/lib/ui";
import Markdown from "@/components/Markdown";

type ScopeFilter = Scope | "all";

function ScopeTabs({ value, onChange }: { value: ScopeFilter; onChange: (s: ScopeFilter) => void }) {
  return (
    <div className="inline-flex rounded-2xl bg-surface-2 p-1">
      {(["all", "midterm", "final"] as ScopeFilter[]).map((s) => (
        <button
          key={s}
          onClick={() => onChange(s)}
          className={`rounded-xl px-4 py-1.5 text-sm font-bold transition-colors ${
            value === s ? "bg-surface text-brand-blue card-soft" : "text-muted hover:text-muted-strong"
          }`}
        >
          {s === "all" ? "전체" : SCOPE_LABEL[s] + "고사"}
        </button>
      ))}
    </div>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 align-middle" title={`중요도 ${n}/5`}>
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-amber-400" aria-hidden>
          <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
        </svg>
      ))}
    </span>
  );
}

function WeekCard({ note }: { note: WeekNote }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <article className="card-soft overflow-hidden rounded-3xl bg-surface">
      {/* 헤더 (클릭하여 펼침) */}
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-start gap-4 p-5 text-left sm:p-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-blue-bg text-base font-extrabold text-brand-blue dark:bg-brand-blue/20 dark:text-brand-blue-lighter">
          {note.week}주
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[0.7rem] font-bold text-muted-strong">
              {SCOPE_LABEL[note.scope]}고사
            </span>
            <h3 className="text-base font-extrabold text-foreground">{note.title}</h3>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-strong">{note.meta}</p>
        </div>
        <svg
          viewBox="0 0 24 24"
          className={`mt-1 h-5 w-5 shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* 펼친 내용 — 구분선으로 토픽 분리 (중첩 카드 X, 깔끔한 위계) */}
      {open && (
        <div className="animate-fade-up border-t border-border px-5 sm:px-7">
          <div className="divide-y divide-border">
            {note.topics.map((t, i) => (
              <section key={i} className="py-5">
                <h4 className="mb-2.5 flex items-center gap-2.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-brand-blue text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-[1.05rem] font-extrabold leading-snug text-foreground">{t.title}</span>
                  {t.stars ? <span className="ml-auto shrink-0"><Stars n={t.stars} /></span> : null}
                </h4>
                <div className="sm:pl-[2.1rem]">
                  <Markdown content={t.body} />
                </div>
              </section>
            ))}
          </div>

          {/* 키워드 + 문제 풀기 */}
          <div className="space-y-4 border-t border-border py-5">
            <div>
              <div className="mb-2 text-xs font-extrabold text-muted-strong">핵심 키워드</div>
              <div className="flex flex-wrap gap-1.5">
                {note.keywords.map((k) => (
                  <span key={k} className="rounded-full bg-brand-blue-bg px-2.5 py-1 text-xs font-semibold text-brand-blue dark:bg-brand-blue/20 dark:text-brand-blue-lighter">
                    {k}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => navigate(`/study?scope=${note.scope}&week=${note.week}`)}
              className="inline-flex items-center gap-1.5 rounded-2xl bg-foreground px-4 py-2.5 text-sm font-bold text-background transition-opacity hover:opacity-90"
            >
              이 주차 문제 풀기
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

export default function WeekNotesPage() {
  const [scope, setScope] = useState<ScopeFilter>("all");
  const notes = useMemo(() => WEEK_NOTES.filter((n) => scope === "all" || n.scope === scope), [scope]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-[1.7rem] font-extrabold tracking-tight text-foreground">주차별 학습</h1>
        <p className="mt-1.5 text-muted-strong">
          교안 핵심만 골라 흐름 있게 정리했어요. 카드를 눌러 펼치고, 별(⭐)은 시험 중요도예요.
        </p>
      </header>

      <ScopeTabs value={scope} onChange={setScope} />

      <div className="space-y-3.5">
        {notes.map((n) => (
          <WeekCard key={n.week} note={n} />
        ))}
      </div>
    </div>
  );
}
