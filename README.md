# 데이터베이스 보안 시험 공부 사이트

데이터베이스 보안 과목의 **기출 유형 문제풀이 + 셀프 채점 + 개념 정리** 웹앱입니다.
중간고사(1~7주차)와 기말고사(9~14주차) 범위를 주차·유형별로 연습할 수 있습니다.

## ✨ 기능

- **문제 풀이**: 발문 → 답안 작성(textarea, 자동 저장) → `답 확인`으로 모범답안 펼침 → 맞음/애매/틀림 셀프 채점
- **필터**: 중간/기말 · 주차별 · 유형별(약어정의·테이블분석·관계대수·쿼리작성·권한쿼리·보안서술·비교서술·ACM)
- **오답노트**: 틀림/애매로 표시한 문제만 모아보기
- **진행률·정답률**: 대시보드에서 전체/중간/기말 진행 상황 확인
- **개념 정리**: 약어집 · 비교표(DAC/MAC/RBAC/ABAC, Oracle vs MySQL TDE 등) · 핵심 개념 카드
- **다크 모드**, 모바일 대응, 모든 기록은 브라우저(localStorage)에 저장 (백엔드 불필요)

## 🚀 로컬 실행

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 프로덕션 빌드 (dist/)
npm run preview  # 빌드 결과 미리보기
```

요구사항: Node.js 20 이상.

## 📦 배포 (GitHub Pages + Actions)

1. 이 프로젝트를 GitHub 저장소로 push 한다 (기본 브랜치 `main`).
2. 저장소 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 설정.
3. `main`에 push 하면 `.github/workflows/deploy.yml`이 자동으로 빌드 후 배포한다.
4. 배포 주소: `https://<유저명>.github.io/<레포명>/`

### ⚙️ 레포 이름을 바꿀 때 (중요)

`vite.config.ts` 상단의 **`REPO_NAME` 한 곳만** 실제 저장소 이름으로 수정하면 됩니다.

```ts
const REPO_NAME = "dbsec-study"; // ← 저장소 이름에 맞게 변경
```

> 로컬 개발(`npm run dev`)에서는 base가 `/`, GitHub Actions 빌드에서는 `/<REPO_NAME>/`로
> 자동 설정됩니다(`GITHUB_ACTIONS` 환경변수 기준). 사용자 페이지 루트(`<유저명>.github.io`)에
> 배포한다면 base를 `/`로 두면 됩니다.

## 🛠 문제/개념 추가하기

콘텐츠는 모두 `src/data/` 안에서만 관리합니다. 자세한 규칙은 [CLAUDE.md](./CLAUDE.md) 참고.

- 문제 추가: `src/data/questions/midterm|final/weekNN.ts` 배열에 객체 하나 추가
- 개념 추가: `src/data/concepts/abbreviations.ts | comparisons.ts | topics.ts`

## 📁 구조

자세한 폴더 구조와 데이터 스키마는 [CLAUDE.md](./CLAUDE.md)에 정리되어 있습니다.

## 🧱 기술 스택

Vite · React · TypeScript · Tailwind CSS v4 · React Router · Pretendard
