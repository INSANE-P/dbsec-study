import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ALL_QUESTIONS } from "@/data/questions";
import { useProgress } from "@/lib/progressStore";
import type { Grade } from "@/lib/storage";
import QuestionCard from "@/components/QuestionCard";

type Tab = "all" | "wrong" | "unsure";

export default function WrongNotePage() {
  const { progress } = useProgress();
  const [tab, setTab] = useState<Tab>("all");

  const items = useMemo(() => {
    return ALL_QUESTIONS.filter((q) => {
      const g = progress[q.id]?.grade as Grade | undefined;
      if (!g) return false;
      if (tab === "all") return g === "wrong" || g === "unsure";
      return g === tab;
    });
  }, [progress, tab]);

  const wrongCount = ALL_QUESTIONS.filter((q) => progress[q.id]?.grade === "wrong").length;
  const unsureCount = ALL_QUESTIONS.filter((q) => progress[q.id]?.grade === "unsure").length;

  const TABS: { key: Tab; label: string }[] = [
    { key: "all", label: `전체 (${wrongCount + unsureCount})` },
    { key: "wrong", label: `틀림 (${wrongCount})` },
    { key: "unsure", label: `애매 (${unsureCount})` },
  ];

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-[1.7rem] font-extrabold tracking-tight text-foreground">오답노트</h1>
        <p className="mt-1.5 text-muted-strong">틀림·애매로 표시한 문제만 모았어요. 다시 풀고 채점을 갱신하세요.</p>
      </header>

      <div className="inline-flex rounded-2xl bg-surface-2 p-1">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-xl px-4 py-1.5 text-sm font-bold transition-colors ${
              tab === t.key ? "bg-surface text-brand-blue card-soft" : "text-muted hover:text-muted-strong"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="card-soft rounded-3xl bg-surface p-12 text-center">
          <p className="font-semibold text-muted-strong">표시된 오답이 없어요.</p>
          <Link to="/study" className="mt-3 inline-block text-sm font-bold text-brand-blue hover:underline">
            문제 풀러 가기
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((q, i) => (
            <QuestionCard key={q.id} q={q} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
