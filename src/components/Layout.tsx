import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

// public/ 자산은 base 경로를 붙여 참조 (GH Pages 서브경로 대응)
const LOGO = `${import.meta.env.BASE_URL}db-logo.png`;

const NAV = [
  { to: "/", label: "대시보드", end: true, icon: "home" },
  { to: "/weeks", label: "주차별 학습", icon: "layers" },
  { to: "/study", label: "문제 풀이", icon: "pencil" },
  { to: "/concepts", label: "개념 정리", icon: "book" },
  { to: "/wrong", label: "오답노트", icon: "flag" },
];

function Icon({ name }: { name: string }) {
  const c = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-[18px] w-[18px]",
  };
  switch (name) {
    case "home":
      return <svg {...c}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></svg>;
    case "layers":
      return <svg {...c}><path d="m12 2 9 5-9 5-9-5 9-5z" /><path d="m3 12 9 5 9-5" /><path d="m3 17 9 5 9-5" /></svg>;
    case "pencil":
      return <svg {...c}><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></svg>;
    case "book":
      return <svg {...c}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>;
    case "flag":
      return <svg {...c}><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><path d="M4 22v-7" /></svg>;
    default:
      return null;
  }
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-2xl px-4 py-3 text-[0.95rem] font-bold transition-colors ${
              isActive
                ? "bg-brand-blue text-white"
                : "text-muted-strong hover:bg-surface-2"
            }`
          }
        >
          <Icon name={item.icon} />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

function Brand({ compact = false, onClick }: { compact?: boolean; onClick?: () => void }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="대시보드로 이동"
      className="flex items-center gap-3 rounded-xl transition-opacity hover:opacity-80"
    >
      <img
        src={LOGO}
        alt="DB 마스코트"
        className={compact ? "h-9 w-9" : "h-11 w-11"}
        draggable={false}
      />
      <div className="leading-tight">
        <div className="text-[0.95rem] font-extrabold text-foreground">데이터베이스 보안</div>
        <div className="text-xs font-medium text-muted">시험 공부 노트</div>
      </div>
    </Link>
  );
}

export default function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* 데스크톱 사이드바 */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-surface px-4 py-5 lg:flex">
        <div className="px-2 pb-5">
          <Brand />
        </div>
        <div className="flex-1">
          <NavList />
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-surface-2 px-4 py-3">
          <span className="text-sm font-semibold text-muted-strong">테마</span>
          <ThemeToggle />
        </div>
      </aside>

      {/* 모바일 상단바 */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-surface/90 px-4 py-3 backdrop-blur lg:hidden">
        <Brand compact />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setOpen(true)}
            aria-label="메뉴 열기"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2 text-muted-strong"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          </button>
        </div>
      </header>

      {/* 모바일 드로어 (항상 마운트 + 슬라이드 트랜지션) */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        {/* 백드롭: 페이드 */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* 패널: 왼쪽에서 슬라이드 */}
        <div
          className={`absolute inset-y-0 left-0 w-72 bg-surface p-4 shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-5 flex items-center justify-between px-2 py-1">
            <Brand compact onClick={() => setOpen(false)} />
            <button onClick={() => setOpen(false)} aria-label="메뉴 닫기" className="text-muted">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
          </div>
          <NavList onNavigate={() => setOpen(false)} />
        </div>
      </div>

      {/* 본문 */}
      <main className="lg:pl-64">
        <div className="mx-auto w-full max-w-4xl px-4 py-7 sm:px-8 sm:py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
