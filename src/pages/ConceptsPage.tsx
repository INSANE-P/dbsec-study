import { useMemo, useState } from "react";
import { ABBREVIATIONS, COMPARISONS, TOPICS } from "@/data/concepts";
import type { Scope } from "@/data/types";
import { SCOPE_LABEL } from "@/lib/ui";
import Markdown from "@/components/Markdown";

type Tab = "abbr" | "compare" | "topic";
type ScopeFilter = Scope | "all";

function ScopeChips({
  value,
  onChange,
}: {
  value: ScopeFilter;
  onChange: (s: ScopeFilter) => void;
}) {
  return (
    <div className="flex gap-2">
      {(["all", "midterm", "final"] as ScopeFilter[]).map((s) => (
        <button
          key={s}
          onClick={() => onChange(s)}
          className={`rounded-full px-3.5 py-1.5 text-sm font-bold transition-colors ${
            value === s ? "bg-brand-blue text-white" : "bg-surface-2 text-muted-strong hover:text-brand-blue"
          }`}
        >
          {s === "all" ? "전체" : SCOPE_LABEL[s] + "고사"}
        </button>
      ))}
    </div>
  );
}

export default function ConceptsPage() {
  const [tab, setTab] = useState<Tab>("abbr");
  const [scope, setScope] = useState<ScopeFilter>("all");

  const abbrevs = useMemo(
    () => ABBREVIATIONS.filter((a) => scope === "all" || a.scope === scope),
    [scope],
  );
  const compares = useMemo(
    () => COMPARISONS.filter((c) => scope === "all" || c.scope === scope),
    [scope],
  );
  const topics = useMemo(
    () => TOPICS.filter((t) => scope === "all" || t.scope === scope),
    [scope],
  );

  const TABS: { key: Tab; label: string; count: number }[] = [
    { key: "abbr", label: "약어집", count: abbrevs.length },
    { key: "compare", label: "비교표", count: compares.length },
    { key: "topic", label: "개념 카드", count: topics.length },
  ];

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-[1.7rem] font-extrabold tracking-tight text-foreground">개념 정리</h1>
        <p className="mt-1.5 text-muted-strong">시험 직전 빠른 암기용. 약어·비교표·핵심 개념을 모았어요.</p>
      </header>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-2xl bg-surface-2 p-1">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-xl px-4 py-1.5 text-sm font-bold transition-colors ${
                tab === t.key ? "bg-surface text-brand-blue card-soft" : "text-muted hover:text-muted-strong"
              }`}
            >
              {t.label} ({t.count})
            </button>
          ))}
        </div>
        <ScopeChips value={scope} onChange={setScope} />
      </div>

      {/* 약어집 */}
      {tab === "abbr" && (
        <div className="grid gap-3 sm:grid-cols-2">
          {abbrevs.map((a) => (
            <div key={a.abbr + a.week} className="card-soft animate-fade-up rounded-2xl bg-surface p-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-lg font-extrabold text-brand-blue">{a.abbr}</span>
                <span className="rounded-full bg-surface-2 px-2 py-0.5 text-xs font-semibold text-muted">
                  {SCOPE_LABEL[a.scope]}·{a.week}주
                </span>
              </div>
              <div className="mt-1.5 text-sm font-bold text-foreground">{a.full}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-strong">{a.meaning}</p>
            </div>
          ))}
        </div>
      )}

      {/* 비교표 */}
      {tab === "compare" && (
        <div className="space-y-5">
          {compares.map((c) => (
            <section key={c.id} className="card-soft animate-fade-up rounded-3xl bg-surface p-6">
              <div className="mb-1 flex items-center gap-2">
                <h2 className="text-base font-extrabold text-foreground">{c.title}</h2>
                <span className="rounded-md bg-background px-1.5 py-0.5 text-xs text-muted">
                  {SCOPE_LABEL[c.scope]}·{c.week}주
                </span>
              </div>
              <Markdown
                content={
                  "| " +
                  c.columns.join(" | ") +
                  " |\n| " +
                  c.columns.map(() => "---").join(" | ") +
                  " |\n" +
                  c.rows.map((r) => "| " + r.join(" | ") + " |").join("\n")
                }
              />
              {c.note && <p className="mt-1 text-sm text-muted">💡 {c.note}</p>}
            </section>
          ))}
        </div>
      )}

      {/* 개념 카드 */}
      {tab === "topic" && (
        <div className="space-y-4">
          {topics.map((t) => (
            <section key={t.id} className="card-soft animate-fade-up rounded-3xl bg-surface p-6">
              <div className="mb-2 flex items-center gap-2">
                <h2 className="text-base font-extrabold text-foreground">{t.title}</h2>
                <span className="rounded-md bg-background px-1.5 py-0.5 text-xs text-muted">
                  {SCOPE_LABEL[t.scope]}·{t.week}주
                </span>
              </div>
              <Markdown content={t.body} />
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
