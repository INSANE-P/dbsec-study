# CLAUDE.md

데이터베이스 보안 과목 시험 공부용 정적 웹앱. 기출 유형 **문제풀이 · 셀프 채점 · 개념/주차 정리**.
백엔드 없이 학습 상태를 `localStorage`에 저장한다.

> **이 프로젝트의 제1원칙 — 콘텐츠와 UI를 분리한다.**
> 문제·개념·정리 텍스트는 **전부 `src/data/`** 안에만 둔다. 컴포넌트에 콘텐츠를 하드코딩하지 않는다.
> 새 기능을 만들 때도 "데이터는 `src/data`, 렌더링은 `components`"를 먼저 지킨다.

## 작업 방식 (이 저장소에서 일할 때)

- **콘텐츠 정확성 최우선**: 문제·정리는 시험 정답이 걸린 내용이다. 사실이 불확실하면 일반지식으로 추측해 채우지 말고 사용자에게 출처를 확인받는다.
- **끝내기 전 검증**: 변경 후 `npm run build`(타입체크 포함)를 돌려 통과를 확인한다. UI 변경은 가능하면 preview로 확인하되, 애니메이션은 검증 한계가 있다(아래 주의점).
- **커밋·푸시는 요청받을 때만** 한다. `main` 푸시는 곧 배포다(아래). 진행률은 푸시해도 초기화되지 않는다(localStorage).
- **언어**: 주석·UI 텍스트·커밋 메시지 모두 한국어.

## 명령어

- `npm run dev` — 개발 서버 (http://localhost:5173)
- `npm run build` — 타입체크(`tsc -b`) 후 프로덕션 빌드
- `npm run typecheck` — 타입체크만
- `npm run preview` — 빌드 결과 미리보기

## 구조

스택: **Vite · React 18 · TypeScript · Tailwind CSS v4 · react-router-dom(BrowserRouter)**. 경로 별칭 `@/` → `src/`.

```
src/
  data/            # ← 모든 콘텐츠는 여기에만
    types.ts                 # Question / Scope / QuestionType / WeekMeta 타입
    weeks.ts                 # 주차 메타데이터(필터 라벨)
    questions/{midterm,final}/weekNN.ts + index.ts   # index가 ALL_QUESTIONS로 합침
    concepts/{abbreviations,comparisons,topics}.ts   # 약어 / 비교표 / 개념카드
    weekNotes.ts             # 주차별 학습 정리(WEEK_NOTES)
  components/      # Layout, QuestionCard, Markdown, FilterBar, SelfGrade, TableView ...
  pages/           # Home(대시보드) · Study · WeekNotes · Concepts · WrongNote · About · NotFound
  lib/             # storage, progressStore(Context), stats, autograde, ui
  styles/index.css # Tailwind + 디자인 토큰
```

- **상태**: 진행상황·셀프채점은 `lib/progressStore.tsx`(Context)가 들고 `lib/storage.ts`가 `localStorage`에 write-through.
- **시험 범위**: 1~7주차 = `scope:"midterm"`, 9~14주차 = `scope:"final"`. (8주차 없음)

## 콘텐츠 추가 (가장 흔한 작업)

**문제** — `src/data/questions/{midterm|final}/weekNN.ts` 배열에 `Question` 객체 push:
```ts
{ id, scope, week, type, prompt, modelAnswer, table?, tags?, grading? }
```
- `id` 규칙 `mid-wNN-qNN` / `fin-wNN-qNN` (중복 금지 — DEV 빌드 콘솔 경고).
- `type`은 8종 중 하나: `약어정의·테이블분석·관계대수·쿼리작성·권한쿼리·보안서술·비교서술·ACM`.
- `table`은 표 제시형 문제용(`{name, columns, rows, note?}`).
- 새 주차 파일은 `questions/index.ts`에 import + spread 추가.

**개념** — `src/data/concepts/`의 `abbreviations`(약어) / `comparisons`(비교표) / `topics`(개념카드) 배열에 push.

**주차 정리** — `src/data/weekNotes.ts`의 해당 주차 `topics`에 `{ title, stars(1~5 중요도), body }` 추가.

**Markdown 본문** (modelAnswer·개념·주차 body 공통, `components/Markdown.tsx`가 렌더):
`**굵게**`, `` `코드` ``, ```` ```코드블록``` ````, `| 표 |`, `- 리스트`, `1. 순서리스트`,
그리고 콜아웃 한 줄: `[정의]` `[암기]` `[시험]` `[주의]` `[팁]`.

**보조 채점**(선택) — 문제에 `grading: { must, bonus?, synonyms? }`를 넣으면 답안의 키워드 포함 여부를
체크리스트로 보여주고 필수 충족 시 "맞음 추천"을 띄운다. **최종 판정은 사용자의 셀프 채점**이며 자동 확정하지 않는다(`lib/autograde.ts`).

## 컨벤션

- **커밋**: `타입: 한 문장` 한 줄 (예: `feat: 약어집 검색 추가`, `fix: 다크모드 표 대비 보정`). 공동저자/자동생성 트레일러 금지.
- 문제 카드에 `id` 같은 영문 식별자를 노출하지 않는다(사용자에겐 Q번호만).

## 디자인

- 쿨그레이 배경 + 흰 카드, 테두리 대신 그림자(`.card-soft`/`.card-hover`), 둥근 모서리, 절제된 색(포인트 brand-blue), 장식 이모지 대신 SVG 아이콘.
- **다크모드 필수**: 표·콜아웃·텍스트가 다크에서도 대비 충분해야. 색은 시맨틱 토큰
  (`background/surface/surface-2/foreground/muted/muted-strong/border`)으로만 쓴다 — 정의는 `styles/index.css`의 `:root`/`.dark`/`@theme`.

## 주의점 (모르면 틀리기 쉬운 것)

- **배포**: `main` push → `.github/workflows/deploy.yml`이 빌드 후 GitHub Pages 자동 배포. 레포명 변경 시 `vite.config.ts`의 `REPO_NAME` 한 곳만 고치면 base 경로가 따라간다.
- **라우팅**: BrowserRouter. 딥링크/새로고침은 `public/404.html` SPA 폴백이 처리(프로젝트 페이지면 `pathSegmentsToKeep=1`). 해시 라우팅으로 바꾸지 말 것.
- **문제 섞기**: 문제 `id`가 끝자리만 다르므로 단순 해시로는 순서가 안 섞인다 — `pages/StudyPage.tsx`의 셔플은 FNV-1a + 아발란치 해시를 쓴다. 건드릴 때 주의.
- **preview 한계**: 헤드리스 preview는 탭이 가려져 rAF·CSS 트랜지션이 멈춘다 → 애니메이션은 검증이 안 된다. 그런 변경은 사용자 브라우저 확인에 맡긴다.
- 배포해도 사용자의 `localStorage` 진행률은 초기화되지 않는다.
