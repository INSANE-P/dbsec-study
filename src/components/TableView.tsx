import type { SampleTable } from "@/data/types";

// 문제에 딸린 샘플 테이블 렌더 (테이블분석/관계대수/ACM 문제용)
export default function TableView({ table }: { table: SampleTable }) {
  return (
    <div className="my-3">
      <div className="mb-1.5 text-sm font-bold text-brand-ink dark:text-brand-blue-lighter">
        [{table.name}]
      </div>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              {table.columns.map((c, i) => (
                <th
                  key={i}
                  className="border-b-2 border-border bg-brand-blue-bg px-3 py-2 text-left font-bold whitespace-nowrap text-brand-ink dark:bg-brand-blue/20 dark:text-brand-blue-lighter"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, r) => (
              <tr key={r} className="odd:bg-surface even:bg-surface-2/60">
                {row.map((cell, i) => (
                  <td
                    key={i}
                    className="border-t border-border px-3 py-2 whitespace-nowrap font-mono text-[0.85rem] text-foreground"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.note && (
        <p className="mt-1.5 text-xs text-muted">※ {table.note}</p>
      )}
    </div>
  );
}
