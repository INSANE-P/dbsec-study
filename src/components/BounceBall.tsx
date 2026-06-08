import { useEffect, useMemo, useRef, useState } from "react";

export type BounceBallApi = { poke: () => void };

// ──────────────────────────────────────────────────────────────────────────
// 인터랙티브 바운스 공 (개발자 소개용) — 우주 컨셉
// - 화면 밖에서 떨어져 통통 튀며 등장 / 탭=점프, 끌어서 놓으면=던지기
// - 움직이면 뒤로 작은 별(별똥별) 트레일이 흩뿌려짐
// - 멈추면 말풍선으로 한마디 (날아다닐 땐 숨김 → 읽기 쉽게)
// - rAF 물리 루프, 쉴 때 정지. reduced-motion이면 정적.
// ──────────────────────────────────────────────────────────────────────────

const GREETING = "재미와 자유를 쫓는 개발자예요. 눌러보거나 던져보세요!";
const LINES = [
  "MBTI는 INFJ랍니다",
  "여행을 정말 좋아해요. 국내든 해외든!",
  "시간과 돈만 있으면 그냥 떠나요",
  "여행 계획 짜는 것도 제 취미예요",
  "계획 세울 때의 그 설렘을 즐겨요",
  "사실 처음엔 낯을 좀 가려요",
  "친해지면 장난도 엄청 많이 쳐요",
  "말을 잘 못 놓아요… 먼저 놓아주실래요?",
  "또 던지셨네요? ㅎㅎ",
  "어질어질… 그래도 재밌어요",
];

const GRAV = 0.7;
const REST = 0.8; // 반발 계수
const FRICT = 0.985;
const N_TRAIL = 24; // 별똥별 입자 수

type Particle = { el: HTMLDivElement; x: number; y: number; life: number };

export default function BounceBall({
  avatarUrl,
  size = 96,
  className = "",
  onReady,
}: {
  avatarUrl: string;
  size?: number;
  className?: string;
  onReady?: (api: BounceBallApi) => void;
}) {
  const areaRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const particles = useRef<Particle[]>([]);
  const cursor = useRef(0);
  const lineIdx = useRef(0);
  const [imgError, setImgError] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgKey, setMsgKey] = useState(0);
  const [typed, setTyped] = useState(""); // 타자기 효과로 한 글자씩

  // 말풍선 타자기 효과
  useEffect(() => {
    if (!msg) { setTyped(""); return; }
    if (s.current.reduce) { setTyped(msg); return; }
    setTyped("");
    let i = 0;
    const id = window.setInterval(() => {
      i++;
      setTyped(msg.slice(0, i));
      if (i >= msg.length) window.clearInterval(id);
    }, 40);
    return () => window.clearInterval(id);
  }, [msg, msgKey]);

  // 배경 별 (한 번 생성) — 깊이 레이어: 먼 별(작고 흐림) → 중간 → 밝은 별(글로우)
  const stars = useMemo(() => {
    const mk = (n: number, sMin: number, sMax: number, oMin: number, oMax: number, hero = false) =>
      Array.from({ length: n }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: sMin + Math.random() * (sMax - sMin),
        op: oMin + Math.random() * (oMax - oMin),
        dur: 2.6 + Math.random() * 4,
        delay: Math.random() * 5,
        tw: Math.random() < (hero ? 0.9 : 0.32),
        hero,
      }));
    return [
      ...mk(66, 0.6, 1.4, 0.16, 0.46),
      ...mk(26, 1.4, 2.2, 0.45, 0.85),
      ...mk(6, 2.4, 3.2, 0.85, 1, true),
    ];
  }, []);

  function talk(text?: string) {
    const t = text ?? LINES[lineIdx.current++ % LINES.length];
    setMsg(t);
    setMsgKey((k) => k + 1);
  }

  // 외부(조종석 THRUST 키)에서 공을 띄우기
  function poke() {
    const st = s.current;
    st.vy = -16;
    st.vx = (Math.random() - 0.5) * 8;
    setMsg("");
    if (st.reduce) talk();
    else { st.pending = "line"; start(); }
  }

  function render() {
    const area = areaRef.current, ball = ballRef.current, glow = glowRef.current;
    if (!area || !ball) return;
    const st = s.current;
    ball.style.transform = `translate(${st.x}px, ${st.y}px) scaleX(${1 + st.squash * 0.6}) scaleY(${1 - st.squash})`;
    if (glow) glow.style.transform = `translate(${st.x + size / 2}px, ${st.y + size / 2}px) translate(-50%, -50%)`;
    const bub = bubbleRef.current;
    if (bub) {
      const W = area.clientWidth;
      const bx = Math.max(46, Math.min(st.x + size / 2, W - 46));
      bub.style.transform = `translate(${bx}px, ${st.y - 6}px) translate(-50%, -100%)`;
    }
  }

  const s = useRef({
    x: 0, y: -size, vx: 1.2, vy: 2, squash: 0,
    dragging: false, grabX: 0, grabY: 0,
    lastX: 0, lastY: 0, lastT: 0, vtx: 0, vty: 0, moved: 0,
    raf: 0, running: false, reduce: false,
    pending: null as null | "greet" | "line",
  });

  function step() {
    const area = areaRef.current;
    if (!area) return;
    const st = s.current;
    const W = area.clientWidth, H = area.clientHeight;
    const floorY = H - size;
    if (!st.dragging) {
      st.vy += GRAV;
      st.x += st.vx;
      st.y += st.vy;
      if (st.x < 0) { st.x = 0; st.vx = -st.vx * REST; st.squash = Math.min(0.45, Math.abs(st.vx) * 0.03); }
      else if (st.x > W - size) { st.x = W - size; st.vx = -st.vx * REST; st.squash = Math.min(0.45, Math.abs(st.vx) * 0.03); }
      if (st.y > floorY) {
        st.y = floorY;
        if (Math.abs(st.vy) > 1) st.squash = Math.min(0.55, Math.abs(st.vy) * 0.04);
        st.vy = -st.vy * REST;
        st.vx *= FRICT;
        if (Math.abs(st.vy) < 1.3) st.vy = 0;
        if (Math.abs(st.vx) < 0.25) st.vx = 0;
      }
    }
    st.squash *= 0.85;

    // 별똥별 트레일
    const ps = particles.current;
    const speed = Math.hypot(st.vx, st.vy);
    if (ps.length && !st.dragging && speed > 1.6) {
      const p = ps[cursor.current++ % ps.length];
      p.x = st.x + size / 2 + (Math.random() - 0.5) * size * 0.5;
      p.y = st.y + size / 2 + (Math.random() - 0.5) * size * 0.5;
      p.life = 1;
    }
    let trailAlive = false;
    for (const p of ps) {
      if (p.life > 0) {
        p.life -= 0.045;
        const l = Math.max(0, p.life);
        if (l > 0) trailAlive = true;
        p.el.style.opacity = String(l * 0.95);
        p.el.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%) scale(${0.4 + l * 0.9})`;
      }
    }

    render();
    const physRest = !st.dragging && st.vy === 0 && Math.abs(st.vx) < 0.05 && st.y >= floorY - 0.5 && st.squash < 0.01;
    if (physRest && st.pending) {
      const p = st.pending;
      st.pending = null;
      talk(p === "greet" ? GREETING : undefined);
    }
    if (physRest && !trailAlive) { st.running = false; return; }
    st.raf = requestAnimationFrame(step);
  }

  function start() {
    const st = s.current;
    if (st.running || st.reduce) return;
    st.running = true;
    st.raf = requestAnimationFrame(step);
  }

  // 초기화
  useEffect(() => {
    const area = areaRef.current;
    if (!area) return;
    const st = s.current;
    st.reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    onReady?.({ poke });
    const W = area.clientWidth, H = area.clientHeight;

    // 트레일 입자 풀 생성
    const trail = trailRef.current;
    if (trail) {
      trail.innerHTML = "";
      const arr: Particle[] = [];
      for (let i = 0; i < N_TRAIL; i++) {
        const el = document.createElement("div");
        const tint = i % 3 === 0 ? "rgba(160,195,255,.95)" : i % 3 === 1 ? "rgba(255,255,255,.95)" : "rgba(255,235,170,.95)";
        el.style.cssText = `position:absolute;left:0;top:0;width:6px;height:6px;border-radius:9999px;background:#fff;box-shadow:0 0 7px 1px ${tint};opacity:0;will-change:transform,opacity;`;
        trail.appendChild(el);
        arr.push({ el, x: 0, y: 0, life: 0 });
      }
      particles.current = arr;
    }

    let greet = 0;
    if (st.reduce) {
      st.x = (W - size) / 2;
      st.y = H - size;
      st.vx = 0; st.vy = 0;
      render();
      greet = window.setTimeout(() => { talk(GREETING); render(); }, 700);
    } else {
      st.x = (W - size) / 2 + (Math.random() - 0.5) * 60;
      st.y = -size - 20;
      st.vx = (Math.random() - 0.5) * 3;
      st.vy = 3;
      st.pending = "greet";
      render();
      start();
    }
    const ro = new ResizeObserver(() => {
      const a = areaRef.current; if (!a) return;
      st.x = Math.max(0, Math.min(st.x, a.clientWidth - size));
      if (!st.running && st.y > a.clientHeight - size) st.y = a.clientHeight - size;
      render();
    });
    ro.observe(area);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(st.raf);
      window.clearTimeout(greet);
      st.running = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  // 포인터 핸들러
  function onDown(e: React.PointerEvent) {
    const area = areaRef.current; if (!area) return;
    const st = s.current;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    const r = area.getBoundingClientRect();
    st.dragging = true;
    st.moved = 0;
    st.grabX = e.clientX - r.left - st.x;
    st.grabY = e.clientY - r.top - st.y;
    st.lastX = e.clientX; st.lastY = e.clientY; st.lastT = e.timeStamp;
    st.vx = 0; st.vy = 0;
    setMsg("");
    if (!st.reduce) start();
  }
  function onMove(e: React.PointerEvent) {
    const st = s.current;
    if (!st.dragging) return;
    const area = areaRef.current; if (!area) return;
    const r = area.getBoundingClientRect();
    st.moved += Math.abs(e.clientX - st.lastX) + Math.abs(e.clientY - st.lastY);
    const dt = Math.max(8, e.timeStamp - st.lastT);
    st.vtx = ((e.clientX - st.lastX) / dt) * 15;
    st.vty = ((e.clientY - st.lastY) / dt) * 15;
    st.lastX = e.clientX; st.lastY = e.clientY; st.lastT = e.timeStamp;
    st.x = Math.max(0, Math.min(e.clientX - r.left - st.grabX, area.clientWidth - size));
    st.y = e.clientY - r.top - st.grabY;
    if (st.reduce) render();
  }
  function onUp() {
    const st = s.current;
    if (!st.dragging) return;
    st.dragging = false;
    const clamp = (v: number) => Math.max(-30, Math.min(30, v));
    if (st.moved < 6) {
      st.vy = -15 - Math.random() * 4;
      st.vx = (Math.random() - 0.5) * 8;
    } else {
      st.vx = clamp(st.vtx);
      st.vy = clamp(st.vty);
    }
    if (st.reduce) talk();
    else { st.pending = "line"; start(); }
  }

  return (
    <div className={`flex min-h-0 flex-col ${className}`}>
      <div
        ref={areaRef}
        className="relative min-h-[22rem] w-full flex-1 touch-none select-none overflow-hidden rounded-3xl bg-[#070b18] ring-1 ring-white/10"
      >
        {/* 배경 별 (깊이 레이어) */}
        <div className="pointer-events-none absolute inset-0 z-0">
          {stars.map((st, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                top: `${st.top}%`,
                left: `${st.left}%`,
                width: st.size,
                height: st.size,
                opacity: st.op,
                boxShadow: st.hero ? `0 0 ${st.size * 2.4}px ${st.size * 0.7}px rgba(195,212,255,0.9)` : undefined,
                animation: st.tw ? `twinkle ${st.dur}s ease-in-out ${st.delay}s infinite` : undefined,
              }}
            />
          ))}
        </div>

        {/* 미세 비네팅 (가장자리 어둡게 → 깊이감, 모노톤이라 AI 그라데이션 느낌 X) */}
        <div className="pointer-events-none absolute inset-0 z-[1] shadow-[inset_0_0_150px_55px_rgba(0,0,0,0.7)]" />

        {/* 별똥별 트레일 (입자는 JS로 추가) */}
        <div ref={trailRef} className="pointer-events-none absolute inset-0 z-[5]" />

        {/* 말풍선 (공을 따라다님) */}
        <div ref={bubbleRef} className="pointer-events-none absolute left-0 top-0 z-30 will-change-transform">
          <div
            key={msgKey}
            className={`relative w-max max-w-[16rem] rounded-2xl border-[3px] border-[#2a2a33] bg-white px-4 py-2.5 text-center text-[0.92rem] font-extrabold leading-snug text-[#1f2430] shadow-[0_4px_0_rgba(42,42,51,0.9)] transition-opacity duration-200 ${
              msg ? "dev-bubble-pop opacity-100" : "opacity-0"
            }`}
          >
            {msg ? (
              <>
                {typed}
                {typed.length < msg.length && <span className="ml-0.5 animate-pulse text-[#1f2430]/50">▌</span>}
              </>
            ) : (
              " "
            )}
            <span className="absolute -bottom-[9px] left-1/2 h-3.5 w-3.5 -translate-x-1/2 rotate-45 border-b-[3px] border-r-[3px] border-[#2a2a33] bg-white" />
          </div>
        </div>

        {/* 공 주변 광채 */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute left-0 top-0 z-[8] rounded-full bg-brand-blue-light/40 blur-2xl will-change-transform"
          style={{ width: size * 1.4, height: size * 1.4 }}
        />

        {/* 공(아바타) */}
        <div
          ref={ballRef}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          role="button"
          tabIndex={0}
          aria-label="아바타 공 — 누르면 통통 튀어요"
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); poke(); } }}
          className="absolute left-0 top-0 z-10 cursor-grab overflow-hidden rounded-full bg-surface shadow-[0_0_26px_rgba(150,180,255,0.55)] ring-2 ring-white/70 will-change-transform active:cursor-grabbing"
          style={{ width: size, height: size, transformOrigin: "bottom center" }}
        >
          {imgError ? (
            <svg viewBox="0 0 24 24" className="h-full w-full p-5 text-foreground" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.7.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" /></svg>
          ) : (
            <img src={avatarUrl} alt="아바타" draggable={false} onError={() => setImgError(true)} className="pointer-events-none h-full w-full object-cover" />
          )}
        </div>
      </div>
    </div>
  );
}
