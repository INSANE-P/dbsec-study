// 등급 엠블럼 — 방패 + 티어 색 그라데이션 + 등급 아이콘(쉐브론→별→왕관)
import { useId } from "react";
import { tierAt } from "@/lib/growth";

const SHIELD = "M20 2 L36 8 V21 C36 32 29 39 20 42 C11 39 4 32 4 21 V8 Z";

function Chevrons({ ys }: { ys: number[] }) {
  return (
    <>
      {ys.map((y, i) => (
        <path key={i} d={`M13 ${y} l7 -5 l7 5`} fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </>
  );
}

function Star({ cx, cy, s = 1 }: { cx: number; cy: number; s?: number }) {
  // 중심(cx,cy) 기준 별 (반지름 ~8*s)
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? 8 * s : 3.4 * s;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return <polygon points={pts.join(" ")} fill="#fff" />;
}

function Icon({ level }: { level: number }) {
  switch (level) {
    case 1:
      return <Chevrons ys={[25]} />;
    case 2:
      return <Chevrons ys={[22, 29]} />;
    case 3:
      return <Chevrons ys={[19, 25, 31]} />;
    case 4:
      return <Star cx={20} cy={22} />;
    case 5:
      return (
        <>
          <Star cx={14} cy={22} s={0.72} />
          <Star cx={26} cy={22} s={0.72} />
        </>
      );
    case 6:
      return <path d="M9 29 L7 15 L14 21 L20 12 L26 21 L33 15 L31 29 Z" fill="#fff" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round" />;
    default:
      return null;
  }
}

export default function TierEmblem({ level, size = 34 }: { level: number; size?: number }) {
  const t = tierAt(level);
  // 인스턴스마다 고유 id — 같은 티어가 여러 번 그려져도 id 충돌(모바일 색 누락) 방지
  const id = "te" + useId().replace(/:/g, "");
  return (
    <svg width={size} height={(size * 44) / 40} viewBox="0 0 40 44" className="shrink-0" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={t.accent} />
          <stop offset="1" stopColor={t.color} />
        </linearGradient>
      </defs>
      <path d={SHIELD} fill={`url(#${id})`} stroke="rgba(15,23,42,0.28)" strokeWidth="2" />
      <Icon level={t.level} />
    </svg>
  );
}
