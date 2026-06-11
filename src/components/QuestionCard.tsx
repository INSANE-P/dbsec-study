import { useState } from "react";
import type { Question } from "@/data/types";
import { useProgress } from "@/lib/progressStore";
import { SCOPE_LABEL, TYPE_BADGE, GRADE_DOT, GRADE_LABEL } from "@/lib/ui";
import { gradeAnswer } from "@/lib/autograde";
import Markdown from "./Markdown";
import TableView from "./TableView";
import SelfGrade from "./SelfGrade";

// 문제 한 개 카드: 발문 → 답안 입력 → '답 확인' → 모범답안 펼침 → 셀프 채점
export default function QuestionCard({ q, index }: { q: Question; index?: number }) {
  const { progress, grade, saveAnswer, toggleBookmark } = useProgress();
  const p = progress[q.id];
  const [revealed, setRevealed] = useState(false);
  const [answer, setAnswer] = useState(p?.answer ?? "");

  // 보조 채점 (답 확인 시에만, grading 데이터가 있는 문제만)
  const grade_ = revealed ? gradeAnswer(q, answer) : null;

  return (
    <article
      id={q.id}
      className="card-soft scroll-mt-24 rounded-3xl bg-surface p-6 sm:p-7"
    >
      {/* 헤더: 번호 + 배지 + 채점 상태 */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {typeof index === "number" && (
          <span className="text-sm font-extrabold text-brand-blue">
            Q{index + 1}
          </span>
        )}
        <span className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-bold text-muted-strong">
          {SCOPE_LABEL[q.scope]} · {q.week}주차
        </span>
        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${TYPE_BADGE[q.type]}`}>
          {q.type}
        </span>
        <div className="ml-auto flex items-center gap-2.5">
          {p?.grade && (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-strong">
              <span className={`h-2 w-2 rounded-full ${GRADE_DOT[p.grade]}`} />
              {GRADE_LABEL[p.grade]}
            </span>
          )}
          <button
            onClick={() => toggleBookmark(q.id)}
            aria-label={p?.bookmark ? "즐겨찾기 해제" : "즐겨찾기 추가"}
            aria-pressed={!!p?.bookmark}
            className={`-m-1 rounded-lg p-1 transition-colors ${
              p?.bookmark ? "text-amber-400" : "text-muted hover:text-amber-400"
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill={p?.bookmark ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
            </svg>
          </button>
        </div>
      </div>

      {/* 발문 */}
      <div className="text-[1.02rem] leading-relaxed font-semibold whitespace-pre-line text-foreground">
        {q.prompt}
      </div>

      {/* 샘플 테이블 */}
      {q.table && <TableView table={q.table} />}

      {/* 답안 입력 */}
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onBlur={() => answer !== (p?.answer ?? "") && saveAnswer(q.id, answer)}
        placeholder="여기에 답을 작성해 보세요 · 자동 저장됩니다"
        rows={4}
        className="mt-4 w-full resize-y rounded-2xl bg-surface-2 px-4 py-3.5 text-[0.95rem] leading-relaxed text-foreground outline-none transition-all placeholder:text-muted focus:bg-surface focus:ring-2 focus:ring-brand-blue/30"
      />

      {/* 답 확인 버튼 */}
      <div className="mt-3.5 flex flex-wrap items-center gap-3">
        <button
          onClick={() => setRevealed((v) => !v)}
          className="inline-flex items-center gap-2 rounded-2xl bg-brand-blue px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-brand-blue-light active:scale-[0.98]"
        >
          {revealed ? "답 접기" : "답 확인하기"}
        </button>
        {/* 내가 쓴 답칸만 비우기 (채점·즐겨찾기는 유지) */}
        {answer.trim() && (
          <button
            onClick={() => {
              setAnswer("");
              saveAnswer(q.id, "");
            }}
            className="inline-flex items-center gap-1.5 rounded-2xl bg-surface-2 px-4 py-2.5 text-sm font-bold text-muted-strong transition-all hover:text-brand-red active:scale-[0.98]"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m2 0v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6" /></svg>
            답 지우기
          </button>
        )}
        {revealed && <SelfGrade value={p?.grade} onChange={(g) => grade(q.id, g)} />}
      </div>

      {/* 보조 채점 — 키워드 체크리스트 (참고용, 확정은 셀프 채점) */}
      {revealed && grade_ && answer.trim() && (
        <div className="animate-fade-up mt-4 rounded-2xl bg-surface-2 p-4">
          <div className="mb-2.5 flex flex-wrap items-center gap-2">
            <span className="text-xs font-extrabold text-muted-strong">
              키워드 체크 (참고용)
            </span>
            <span className="text-xs font-bold text-muted">
              필수 {grade_.mustHit}/{grade_.mustTotal}
            </span>
            {grade_.allMust && (
              <span className="rounded-full bg-brand-green px-2 py-0.5 text-[0.7rem] font-extrabold text-white">
                맞음 추천
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {grade_.must.map((k) => (
              <span
                key={k.label}
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                  k.hit
                    ? "bg-brand-green-bg text-brand-green dark:bg-brand-green/15"
                    : "bg-brand-red-bg text-brand-red dark:bg-brand-red/15"
                }`}
              >
                {k.hit ? "✓" : "✗"} {k.label}
              </span>
            ))}
            {grade_.bonus.filter((b) => b.hit).map((k) => (
              <span
                key={k.label}
                className="inline-flex items-center gap-1 rounded-full bg-brand-blue-bg px-2.5 py-1 text-xs font-bold text-brand-blue dark:bg-brand-blue/15 dark:text-brand-blue-lighter"
              >
                ＋ {k.label}
              </span>
            ))}
          </div>
          <p className="mt-2 text-[0.7rem] text-muted">
            * 키워드 포함만 본 참고 결과예요. 서술 내용은 모범답안과 비교해 직접 채점하세요.
          </p>
        </div>
      )}

      {/* 모범답안 */}
      {revealed && (
        <div className="animate-fade-up mt-4 rounded-2xl bg-brand-blue-bg/50 p-5 dark:bg-brand-blue/10">
          <div className="mb-2.5 flex items-center gap-1.5 text-xs font-extrabold tracking-wide text-brand-blue">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            모범답안
          </div>
          <Markdown content={q.modelAnswer} />
          {q.tags && q.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border/60 pt-3">
              {q.tags.map((t) => (
                <span key={t} className="text-xs font-medium text-muted">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
}
