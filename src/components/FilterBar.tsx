import type { QuestionType, Scope } from "@/data/types";
import { WEEKS } from "@/data/weeks";
import { ALL_TYPES, SCOPE_LABEL, TYPE_BADGE } from "@/lib/ui";

export type Filters = {
  scope: Scope | "all";
  week: number | "all";
  type: QuestionType | "all";
};

// 칩 버튼
function Chip({
  active,
  onClick,
  children,
  className = "",
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-sm font-bold transition-colors ${
        active
          ? "bg-brand-blue text-white"
          : "bg-surface-2 text-muted-strong hover:text-brand-blue"
      } ${className}`}
    >
      {children}
    </button>
  );
}

export default function FilterBar({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
}) {
  // 선택된 범위에 맞는 주차만 노출
  const weeks = WEEKS.filter(
    (w) => filters.scope === "all" || w.scope === filters.scope,
  );

  return (
    <div className="card-soft space-y-3 rounded-3xl bg-surface p-5">
      {/* 범위 */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="w-12 text-sm font-bold text-muted">범위</span>
        <Chip active={filters.scope === "all"} onClick={() => onChange({ ...filters, scope: "all", week: "all" })}>
          전체
        </Chip>
        {(["midterm", "final"] as Scope[]).map((s) => (
          <Chip
            key={s}
            active={filters.scope === s}
            onClick={() => onChange({ ...filters, scope: s, week: "all" })}
          >
            {SCOPE_LABEL[s]}고사
          </Chip>
        ))}
      </div>

      {/* 주차 */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="w-12 text-sm font-bold text-muted">주차</span>
        <Chip active={filters.week === "all"} onClick={() => onChange({ ...filters, week: "all" })}>
          전체
        </Chip>
        {weeks.map((w) => (
          <Chip
            key={w.week}
            active={filters.week === w.week}
            onClick={() => onChange({ ...filters, week: w.week })}
          >
            {w.week}주차
          </Chip>
        ))}
      </div>

      {/* 유형 */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="w-12 text-sm font-bold text-muted">유형</span>
        <Chip active={filters.type === "all"} onClick={() => onChange({ ...filters, type: "all" })}>
          전체
        </Chip>
        {ALL_TYPES.map((t) => (
          <button
            key={t}
            onClick={() => onChange({ ...filters, type: t })}
            className={`rounded-full px-3 py-1 text-sm font-semibold transition-colors ${
              filters.type === t
                ? "ring-2 ring-brand-blue ring-offset-1 ring-offset-surface " + TYPE_BADGE[t]
                : TYPE_BADGE[t] + " opacity-70 hover:opacity-100"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
