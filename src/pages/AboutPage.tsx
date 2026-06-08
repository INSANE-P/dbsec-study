import { useRef } from "react";
import BounceBall, { type BounceBallApi } from "@/components/BounceBall";

// 개발자 정보 (한 곳에서 관리)
const GH_ID = "INSANE-P";
const PROFILE_URL = `https://github.com/${GH_ID}`;
const REPO_URL = `https://github.com/${GH_ID}/dbsec-study`;
const AVATAR_URL = `https://github.com/${GH_ID}.png?size=240`;

const INK = "#2a2a33"; // 카툰 외곽선 (마스코트와 동일 톤)

function Octocat({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.7.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
    </svg>
  );
}

// 통통한 카툰 버튼 (두꺼운 외곽선 + 솔리드 그림자로 눌리는 느낌)
function CartoonBtn({
  as = "button",
  href,
  bg,
  label,
  rotate,
  onClick,
  children,
}: {
  as?: "button" | "a";
  href?: string;
  bg: string;
  label: string;
  rotate: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const cls = `relative inline-flex h-14 w-14 items-center justify-center rounded-full border-[3px] text-[#2a2a33] transition-transform active:translate-y-[3px] ${rotate}`;
  const style = { background: bg, borderColor: INK, boxShadow: `0 5px 0 ${INK}` } as React.CSSProperties;
  const inner = (
    <>
      {/* 광택 하이라이트 */}
      <span className="pointer-events-none absolute left-2.5 top-2 h-2.5 w-4 -rotate-12 rounded-full bg-white/55" />
      {children}
    </>
  );
  return as === "a" ? (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} className={cls} style={style}>
      {inner}
    </a>
  ) : (
    <button type="button" onClick={onClick} aria-label={label} title={label} className={cls} style={style}>
      {inner}
    </button>
  );
}

// 손그림 별 도안
function DoodleStar({ className, fill }: { className?: string; fill: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill={fill} stroke={INK} strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2.5l2.7 6 6.3.7-4.7 4.3 1.3 6.2L12 16.7 6.1 19.7l1.3-6.2L2.7 9.2l6.3-.7z" />
    </svg>
  );
}

export default function AboutPage() {
  const api = useRef<BounceBallApi | null>(null);

  return (
    // 카툰 우주선 선체
    <div
      className="relative flex min-h-[82vh] flex-col gap-3.5 rounded-[2rem] border-[4px] bg-[#d7e0ec] p-3.5 sm:p-5"
      style={{ borderColor: INK, boxShadow: `0 8px 0 rgba(42,42,51,0.18)` }}
    >
      {/* 헤더 */}
      <header className="flex items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2">
          <DoodleStar className="h-6 w-6 -rotate-6" fill="#ffd23f" />
          <h1 className="text-[1.45rem] font-extrabold tracking-tight sm:text-[1.6rem]" style={{ color: INK }}>
            만든 사람
          </h1>
        </div>
        <DoodleStar className="h-4 w-4 rotate-12 opacity-70" fill="#ff7a5c" />
      </header>

      {/* 창문(포트홀) — 우주를 내다봄 */}
      <div
        className="relative flex-1 overflow-hidden rounded-[1.6rem] border-[5px] bg-[#0b1024]"
        style={{ borderColor: INK }}
      >
        <BounceBall avatarUrl={AVATAR_URL} className="h-full" onReady={(a) => (api.current = a)} />
        {/* 만화 유리 광택 (사선 글린트 2줄) */}
        <div className="pointer-events-none absolute inset-0 z-[40]">
          <div className="absolute left-4 top-2 h-20 w-3 -rotate-[33deg] rounded-full bg-white/12" />
          <div className="absolute left-9 top-2 h-12 w-1.5 -rotate-[33deg] rounded-full bg-white/10" />
        </div>
      </div>

      {/* 조작 패널 */}
      <div
        className="flex items-center justify-center gap-5 rounded-[1.4rem] border-[4px] bg-[#c4cee0] px-4 py-4"
        style={{ borderColor: INK }}
      >
        <CartoonBtn label="추진 — 아바타 띄우기" bg="#ff7a5c" rotate="-rotate-3" onClick={() => api.current?.poke()}>
          <svg viewBox="0 0 24 24" className="relative h-6 w-6" fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="m6 13 6-6 6 6" /><path d="m6 18 6-6 6 6" /></svg>
        </CartoonBtn>
        <CartoonBtn as="a" href={PROFILE_URL} label="GitHub 프로필 팔로우" bg="#eef2f8" rotate="rotate-2">
          <Octocat className="relative h-6 w-6" />
        </CartoonBtn>
        <CartoonBtn as="a" href={REPO_URL} label="이 프로젝트에 스타 주기" bg="#ffd23f" rotate="-rotate-2">
          <svg viewBox="0 0 24 24" className="relative h-6 w-6" fill={INK}><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" /></svg>
        </CartoonBtn>
      </div>
    </div>
  );
}
