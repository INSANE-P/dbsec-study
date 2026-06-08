// ──────────────────────────────────────────────────────────────────────────
// 캐릭터 놀이터 — 캐릭터를 쓰다듬으면 통통 튀고 스파클과 함께 응원 한마디.
// 받침대 그림자 + 등급 테마 배경 + 정돈된 말풍선으로 차분하고 깔끔하게.
// ──────────────────────────────────────────────────────────────────────────
import { useRef, useState } from "react";
import { getIdentity, type Identity } from "@/lib/storage";
import { useGrowth } from "./GrowthProvider";
import GrowthAvatar from "./GrowthAvatar";
import TierEmblem from "./TierEmblem";

const LINES = [
  "오늘도 한 문제씩, 같이 가보자",
  "틀려도 괜찮아 — 경험치는 쌓이니까",
  "조금만 더 풀면 진화가 코앞이야",
  "데이터베이스 보안, 우리가 정복한다",
  "잠깐 쉬어도 좋아, 무리하지 말고",
  "오, 방금 좀 더 똑똑해진 듯?",
  "한 문제만 더 풀어볼래?",
  "쓰다듬어 줘서 고마워",
];

const CSS = `
@keyframes cs-bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
@keyframes cs-pop { 0%{transform:scale(1)} 28%{transform:scale(1.1)} 60%{transform:scale(.96)} 100%{transform:scale(1)} }
@keyframes cs-spark { 0%{opacity:0;transform:translate(var(--dx),0) scale(.3) rotate(0)} 18%{opacity:1} 100%{opacity:0;transform:translate(var(--dx),-118px) scale(1) rotate(var(--rot))} }
@keyframes cs-bubble { 0%{opacity:0;transform:translateY(6px) scale(.96)} 14%{opacity:1;transform:translateY(0) scale(1)} 86%{opacity:1} 100%{opacity:0} }
`;

function avatarSrc(id: Identity): string | null {
  if (id.avatarUrl) return id.avatarUrl;
  if (id.github) return `https://github.com/${id.github}.png?size=200`;
  return null;
}
function displayName(id: Identity): string {
  return id.name?.trim() || id.github?.trim() || "내 캐릭터";
}

type Spark = { id: number; dx: number; size: number; rot: number; color: string };

export default function CharacterStage() {
  const g = useGrowth();
  const id = getIdentity();
  const src = avatarSrc(id);
  const name = displayName(id);
  const initial = name.charAt(0).toUpperCase();

  const [sparks, setSparks] = useState<Spark[]>([]);
  const [bubble, setBubble] = useState<string | null>(null);
  const [pokeKey, setPokeKey] = useState(0);
  const seq = useRef(0);
  const bubbleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function poke() {
    setPokeKey((k) => k + 1);
    const n = 5 + Math.floor(Math.random() * 3);
    const fresh: Spark[] = Array.from({ length: n }, () => ({
      id: ++seq.current,
      dx: Math.round((Math.random() - 0.5) * 120),
      size: 8 + Math.round(Math.random() * 12),
      rot: Math.round((Math.random() - 0.5) * 180),
      color: Math.random() > 0.5 ? g.tier.accent : "#ffffff",
    }));
    setSparks((p) => [...p, ...fresh]);
    fresh.forEach((f) => setTimeout(() => setSparks((p) => p.filter((x) => x.id !== f.id)), 1150));

    setBubble(LINES[Math.floor(Math.random() * LINES.length)]);
    if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
    bubbleTimer.current = setTimeout(() => setBubble(null), 2400);
  }

  return (
    <section
      className="card-soft relative overflow-hidden rounded-3xl p-6"
      style={{ background: `radial-gradient(120% 90% at 50% 0%, ${g.tier.color}1f, transparent 60%)` }}
    >
      <style>{CSS}</style>

      <div className="flex flex-col items-center">
        {/* 말풍선 */}
        <div className="flex h-14 items-end">
          {bubble && (
            <div
              key={pokeKey}
              className="relative rounded-2xl border border-border bg-surface px-4 py-2 text-sm font-bold text-foreground shadow-md"
              style={{ animation: "cs-bubble 2.4s ease-out forwards" }}
            >
              {bubble}
              <span className="absolute -bottom-[7px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-border bg-surface" />
            </div>
          )}
        </div>

        {/* 캐릭터 무대 */}
        <div className="relative mt-2" style={{ width: 220, height: 210 }}>
          {/* 받침대 그림자 */}
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{ bottom: 8, width: 132, height: 24, borderRadius: "50%", background: `radial-gradient(closest-side, ${g.tier.color}55, transparent)`, filter: "blur(2px)" }}
            aria-hidden="true"
          />
          {/* 캐릭터(클릭=쓰다듬기) */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2" style={{ animation: "cs-bob 3s ease-in-out infinite" }}>
            <button type="button" onClick={poke} aria-label="캐릭터 쓰다듬기" className="relative block cursor-pointer rounded-full outline-none">
              <div key={pokeKey} style={{ animation: pokeKey ? "cs-pop 0.6s ease-out" : undefined }}>
                <GrowthAvatar src={src} initial={initial} level={g.level} size={172} />
              </div>
              {/* 스파클 */}
              <div className="pointer-events-none absolute inset-0">
                {sparks.map((s) => (
                  <svg
                    key={s.id}
                    viewBox="0 0 24 24"
                    className="absolute left-1/2 top-1/2"
                    width={s.size}
                    height={s.size}
                    fill={s.color}
                    style={{ ["--dx" as string]: `${s.dx}px`, ["--rot" as string]: `${s.rot}deg`, animation: "cs-spark 1.15s ease-out forwards" }}
                  >
                    <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
                  </svg>
                ))}
              </div>
            </button>
          </div>
        </div>

        {/* 이름 / 등급 */}
        <div className="mt-1 flex items-center gap-2">
          <TierEmblem level={g.level} size={22} />
          <span className="text-lg font-extrabold text-foreground">{name}</span>
          <span className="rounded-full px-2 py-0.5 text-xs font-bold text-white" style={{ background: g.tier.color }}>
            Lv{g.level} · {g.tier.name}
          </span>
        </div>

        {/* 상호작용 버튼 */}
        <button
          onClick={poke}
          className="mt-4 inline-flex items-center gap-1.5 rounded-2xl border border-border bg-surface px-5 py-2.5 text-sm font-bold text-foreground shadow-sm transition hover:border-transparent hover:text-white active:translate-y-0.5"
          style={{ ["--hb" as string]: g.tier.color }}
          onMouseEnter={(e) => (e.currentTarget.style.background = g.tier.color)}
          onMouseLeave={(e) => (e.currentTarget.style.background = "")}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor" aria-hidden="true">
            <path d="M12 21s-7-4.5-9.3-9C1 8.7 2.6 5.5 5.8 5.5c1.9 0 3.2 1.1 4.2 2.4 1-1.3 2.3-2.4 4.2-2.4 3.2 0 4.8 3.2 3.1 6.5C19 16.5 12 21 12 21z" />
          </svg>
          쓰다듬기
        </button>
      </div>
    </section>
  );
}
