# 데이터베이스 보안 시험 공부 사이트

데이터베이스 보안 과목의 **기출 유형 문제풀이 · 셀프 채점 · 개념 정리** 정적 웹앱.
백엔드 없이 모든 학습 상태를 `localStorage`에 저장한다. **콘텐츠(문제·개념)와 UI를
철저히 분리**하는 것이 이 프로젝트의 핵심 원칙이다 — 컴포넌트에 콘텐츠를 하드코딩하지 않는다.

## 명령어

- `npm run dev` — 개발 서버 (http://localhost:5173)
- `npm run build` — 타입체크(`tsc -b`) 후 프로덕션 빌드
- `npm run preview` — 빌드 결과 로컬 미리보기
- `npm run typecheck` — 타입체크만 수행

## 아키텍처

- **스택**: Vite · React 18 · TypeScript · Tailwind CSS v4 · react-router-dom(BrowserRouter).
- **경로 별칭**: `@/` → `src/`.
- **상태 관리**: 진행상황·셀프채점은 `lib/progressStore.tsx`(Context)가 들고, `lib/storage.ts`가 `localStorage`에 write-through.
- **시험 범위**: 1~7주차 = 중간(`scope: "midterm"`), 9~14주차 = 기말(`scope: "final"`).

```
src/
  data/                         # ← 모든 콘텐츠는 여기에만 둔다
    types.ts                    # Question 등 콘텐츠 타입
    weeks.ts                    # 주차 메타데이터
    questions/{midterm,final}/weekNN.ts, index.ts   # 문제 (index가 ALL_QUESTIONS로 합침)
    concepts/{abbreviations,comparisons,topics}.ts  # 개념 정리
    weekNotes.ts                # 주차별 학습 정리
  components/                   # Layout, QuestionCard, Markdown, FilterBar, SelfGrade ...
  pages/                        # Home, WeekNotes, Study, Concepts, WrongNote
  lib/                          # storage, progressStore, stats, ui, autograde
  styles/index.css              # Tailwind + 디자인 토큰
```

## 콘텐츠 추가

- **문제**: `src/data/questions/{midterm|final}/weekNN.ts` 배열에 `Question` 객체를 push.
  - id 규칙 `mid-wNN-qNN` / `fin-wNN-qNN` (중복 금지 — DEV 빌드에서 콘솔 경고).
  - 새 주차 파일은 `questions/index.ts`에 import + spread 추가.
- **개념**: `src/data/concepts/`의 `abbreviations`(약어) / `comparisons`(비교표) / `topics`(개념 카드) 배열에 push.
- **주차 정리**: `src/data/weekNotes.ts`의 `topics`에 `{ title, stars(1~5 중요도), body }` 추가.
- **Markdown 본문 문법** (modelAnswer·개념·주차 body 공통, `components/Markdown.tsx`가 렌더):
  `**굵게**`, `` `코드` ``, ```` ```코드블록``` ````, `| 표 |`, `- 리스트`, `1. 순서리스트`,
  그리고 콜아웃 한 줄: `[정의]` `[암기]` `[시험]` `[주의]` `[팁]`.
- **보조 채점**(선택): 문제에 `grading: { must, bonus?, synonyms? }`를 넣으면 답안에서 키워드
  포함 여부를 체크리스트(✓/✗)로 보여주고 필수 전부 포함 시 "맞음 추천"을 띄운다. 최종 판정은
  사용자의 셀프 채점이며 자동 확정하지 않는다 (`lib/autograde.ts`).

## 컨벤션

- **커밋**: `타입: 한 문장` 한 줄로 작성한다 (예: `feat: 약어집 검색 추가`, `fix: 다크모드 표 대비 보정`).
  공동저자/자동생성 트레일러는 넣지 않는다.
- 주석과 UI 텍스트는 한국어로 쓴다.
- 문제 카드에 문제 id 같은 영문 식별자는 노출하지 않는다(사용자에겐 Q번호만 보인다).

## 디자인

- 쿨그레이 배경 + 흰 카드, 테두리 대신 그림자(`.card-soft` / `.card-hover`), 둥근 모서리,
  절제된 색(포인트는 brand-blue), 장식용 이모지 미사용(SVG 아이콘 사용).
- **다크모드 필수**: 표·콜아웃·텍스트가 다크에서도 대비가 충분해야 한다. 색은 시맨틱 토큰
  (`background/surface/surface-2/foreground/muted/muted-strong/border`)으로 쓰고,
  정의는 `src/styles/index.css`의 `:root` / `.dark` / `@theme`에 있다.

## 배포

- `main` push 시 `.github/workflows/deploy.yml`이 빌드 후 GitHub Pages로 자동 배포한다.
- 레포명을 바꾸면 `vite.config.ts`의 `REPO_NAME` 한 곳만 수정한다(base 경로 자동 반영).
- 라우팅은 BrowserRouter이며, GitHub Pages 딥링크/새로고침은 `public/404.html` SPA 폴백이 처리한다
  (프로젝트 페이지 배포면 `pathSegmentsToKeep = 1`).
