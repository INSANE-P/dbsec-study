// ──────────────────────────────────────────────────────────────────────────
// 주차별 학습 내용 (시험 대비 핵심 정리)
//
// 각 주차 = 여러 topic. topic.body 는 Markdown(표·리스트·코드 + 콜아웃)으로 작성.
// 콜아웃 문법(한 줄): [정의] ... / [암기] ... / [시험] ... / [주의] ... / [팁] ...
// stars(1~5): 시험 중요도. meta: 카드 접힘 상태의 한 줄 요약.
//
// 추가/수정법: 해당 주차의 topics 배열을 고친다. PPT 비핵심 내용은 빼고
//   시험에 나올 핵심만 흐름 있게 담는 것이 원칙.
// ──────────────────────────────────────────────────────────────────────────
import type { Scope } from "./types";

export type WeekTopic = {
  title: string;
  /** 시험 중요도 1~5 (별 개수) */
  stars?: number;
  /** Markdown 본문 */
  body: string;
};

export type WeekNote = {
  week: number;
  scope: Scope;
  title: string;
  /** 카드 접힘 상태 한 줄 요약(다룬 주제들) */
  meta: string;
  topics: WeekTopic[];
  /** 하단 핵심 키워드 칩 */
  keywords: string[];
};

export const WEEK_NOTES: WeekNote[] = [
  // ════════════════════ 1주차 ════════════════════
  {
    week: 1,
    scope: "midterm",
    title: "데이터베이스 기초 개념",
    meta: "데이터/정보/DB · 보안 분류 · 파일시스템 vs DBMS · 스키마/인스턴스 · ANSI-SPARC · E-R",
    keywords: ["통·저·공·운", "ANSI-SPARC 3계층", "스키마/인스턴스", "차수/카디널리티", "E-R 변환 5규칙"],
    topics: [
      {
        title: "데이터 · 정보 · 데이터베이스",
        body:
          "| 용어 | 정의 | 예시 |\n|---|---|---|\n| **데이터** | 관찰·측정으로 수집된 원시 자료 | 점수: 85, 90, 70 |\n| **정보** | 데이터를 의사결정에 유용하게 가공한 결과 | 평균: 81.7점 |\n| **데이터베이스** | 공유 목적으로 통합·저장한 운영 데이터 | 학생 성적 DB |",
      },
      {
        title: "데이터베이스 정의 — 4대 성격",
        stars: 4,
        body:
          "[정의] \"특정 조직의 여러 사용자가 데이터를 공유하여 사용하도록 통합해 저장한 **운영 데이터의 집합**\"\n\n| 성격 | 의미 |\n|---|---|\n| 통합 (Integrated) | 데이터 중복 최소화 |\n| 저장 (Stored) | 컴퓨터 저장 매체에 저장 |\n| 공유 (Shared) | 여러 사용자가 함께 이용 |\n| 운영 (Operational) | 조직의 목적 달성을 위함 |\n\n[암기] 통·저·공·운",
      },
      {
        title: "데이터베이스 보안 분류 3가지",
        stars: 3,
        body:
          "[정의] 허가된 사용자만 DB에 접근 → **데이터 유출 방지 + 무결성 훼손 방지**\n\n**DB 정의 ↔ 보안 필요 이유**\n| DB 정의 | 보안 필요 이유 |\n|---|---|\n| 공유 | 허가된 사용자만 접근 통제 |\n| 운영 | 유출·무결성 훼손 방지 |\n| 저장 | 물리적 손실 방지 |\n\n**보안 분류 3가지**\n| 분류 | 내용 | 기법 |\n|---|---|---|\n| ① 물리적 환경 보안 | 물리적 손실 방지 | 백업 시스템 |\n| ② 권한 관리 보안 | 허가 범위 내 사용 | 접근 제어 |\n| ③ 운영 관리 보안 | 사용 중 무결성 | 제약조건, 해시·MAC |\n\n[시험] 인증(Authentication)=\"너 누구야?\"(사용자 확인) vs 권한부여(Authorization)=\"어디까지 돼?\"(접근 범위)",
      },
      {
        title: "파일 시스템 vs DBMS",
        stars: 3,
        body:
          "| 구분 | 파일 시스템 | DBMS |\n|---|---|---|\n| 데이터 정의 | 응용 프로그램 | DBMS 내 정의 |\n| 접근 방식 | 파일 직접 접근 | DBMS에 요청(인증·인가) |\n| 언어 | Java, C++ | 고급언어 + **SQL** |\n| 중복 | 중복 가능 | 낮은 중복 |\n| 일관성 | 결여 | 유지 |\n| 독립성 | 불가능 | **가능** |\n\n[주의] 파일시스템의 핵심 문제 두 가지 = **데이터 종속성 + 데이터 중복성**",
      },
      {
        title: "스키마 vs 인스턴스",
        stars: 3,
        body:
          "| | 스키마(Schema) | 인스턴스(Instance) |\n|---|---|---|\n| 정의 | 데이터 **구조 + 제약조건** | 스키마에 따른 **실제 값** |\n| 예시 | 고객(번호 INT, 이름 CHAR(10)) | (001, 김현준) |\n| 성격 | 틀/양식 (정적) | 값 (동적) |",
      },
      {
        title: "ANSI-SPARC 3계층",
        stars: 4,
        body:
          "```\n외부 스키마 (External)   ← 여러 개 (사용자 관점)\n        ↕\n개념 스키마 (Conceptual) ← 하나 (전체 구조, 보안 정책!)\n        ↕\n내부 스키마 (Internal)   ← 하나 (물리적 저장)\n```\n| 단계 | 별칭 | 특징 |\n|---|---|---|\n| 외부 | 뷰 레벨 / 서브 스키마 | 여러 개, 사용자별 |\n| 개념 | 논리 레벨 / 아키텍처 | 하나, **보안 정책·접근 권한 정의** |\n| 내부 | 물리 레벨 / 저장 스키마 | 하나, 레코드 구조 |\n\n[팁] 집 비유 — 외부=집주인, 개념=관리인, 내부=건설업체\n[시험] **개념 단계에 보안 정책이 정의**된다!",
      },
      {
        title: "관계형 모델 용어 + 차수/카디널리티",
        body:
          "| 용어 | 정의 |\n|---|---|\n| 도메인(Domain) | 속성이 가질 수 있는 값의 집합 |\n| NULL | 값이 없거나 아직 모르는 상태 |\n| 차수(Degree) | 속성(열)의 개수 |\n| 카디널리티(Cardinality) | 튜플(행)의 개수 |\n\n[팁] 학생(학번, 이름, 학년, 신장, 학과) 4명 → **차수=5, 카디=4**",
      },
      {
        title: "E-R → 릴레이션 변환 5규칙",
        stars: 4,
        body:
          "1. **개체 → 릴레이션**\n2. **N:M 관계 → 새 릴레이션 생성** (양쪽 PK를 FK로)\n3. **1:N 관계 → 외래키** (N쪽에 FK)\n4. **1:1 관계 → 외래키**\n5. **다중값 속성 → 별도 릴레이션**\n\n[암기] N:M은 새 릴레이션, 1:N·1:1은 FK, 다중값은 분리\n[팁] DB 설계 5단계: 요구사항분석 → 개념적(E-R) → 논리적(릴레이션) → 물리적 → 구현",
      },
    ],
  },

  // ════════════════════ 2주차 ════════════════════
  {
    week: 2,
    scope: "midterm",
    title: "DBMS 환경 & SQL 3종",
    meta: "DBMS 구성 6모듈 · 사용자 3종 · DDL/DML/DCL 11개 명령어 · DBMS 발전사",
    keywords: ["트랜잭션 관리자(보안)", "데이터 사전=메타데이터", "DDL/DML/DCL", "CAD·SIUD·GRCR", "NoSQL/NewSQL"],
    topics: [
      {
        title: "사용자 3종과 접근 경로",
        stars: 3,
        body:
          "| 사용자 | 사용 언어 | 처리 모듈 |\n|---|---|---|\n| **DBA** | DDL | DDL 컴파일러 |\n| **최종 사용자** | DML | DML 컴파일러 |\n| **응용 프로그래머** | 응용 프로그램(DML 삽입) | DML 프리컴파일러 |",
      },
      {
        title: "DBMS 구성 6모듈",
        stars: 3,
        body:
          "| 모듈 | 기능 |\n|---|---|\n| ① DDL 컴파일러 | 스키마 정의 해석 → 데이터 사전 저장 |\n| ② DML 프리컴파일러 | 응용 프로그램의 DML 추출 |\n| ③ DML 컴파일러 | 삽입·삭제·수정·검색 분석 |\n| ④ 런타임 DB 처리기 | DB에 실제 실행 |\n| ⑤ **트랜잭션 관리자** | **접근 권한 검사 + 무결성 검사 (보안!)** |\n| ⑥ 저장 데이터 관리자 | 디스크 DB·데이터 사전 관리(OS 도움) |\n\n[시험] 보안과 직접 연결되는 모듈 = **트랜잭션 관리자**(권한·무결성 검사)\n[정의] 데이터 사전 = 시스템 카탈로그 = **메타데이터**(데이터에 대한 데이터)",
      },
      {
        title: "SQL 3종 — 11개 명령어",
        stars: 5,
        body:
          "**DDL (스키마)**: CREATE(생성) · ALTER(수정) · DROP(삭제)\n\n**DML (데이터)**\n| 명령어 | 구문 |\n|---|---|\n| SELECT | `SELECT * FROM ...` |\n| INSERT | `INSERT INTO ... VALUES` |\n| UPDATE | `UPDATE ... SET ... WHERE` |\n| DELETE | `DELETE FROM ... WHERE` |\n\n**DCL (제어·보안)**: GRANT(부여) · REVOKE(취소) · COMMIT(완료저장) · ROLLBACK(복구)\n\n[암기] DDL=**CAD** / DML=**SIUD** / DCL=**GRCR**\n[시험] DCL은 DBMS 4특성 **무결성·보안·회복·동시성**을 보장",
      },
      {
        title: "DBMS 종류와 발전사",
        body:
          "| DBMS | 특징 |\n|---|---|\n| Oracle | 상용, 엔터프라이즈 표준 |\n| MySQL | 오픈소스, 웹 서비스 |\n| MS-SQL Server | Microsoft, T-SQL |\n| NoSQL | 비정형(MongoDB, Cassandra) |\n| NewSQL | 정형+비정형, ACID+확장성 |\n\n발전: 1세대 네트워크(IDS)·계층(IMS) → 2세대 관계 → 3세대 객체지향 → 4세대 NoSQL·NewSQL",
      },
    ],
  },

  // ════════════════════ 3주차 ════════════════════
  {
    week: 3,
    scope: "midterm",
    title: "관계형 DB & 관계 대수",
    meta: "E.F.Codd · 키 5종 · 무결성 3종 · 관계 대수 8연산자(순수관계 4 + 일반집합 4)",
    keywords: ["슈퍼키 vs 후보키=최소성", "개체 무결성 NULL 불가", "셀프조디·합교차카", "차집합 교환법칙 X", "×는 차수합·카디곱"],
    topics: [
      {
        title: "RDB 개요",
        body:
          "[정의] **RDB** = 1970년대 IBM의 **에드거 F. 커드(E.F.Codd)**가 제안한 관계형 모델. 수학적 논리 관계로 행·열의 표로 정의.\n\n[팁] 상용: Oracle·MS-SQL·DB2 / 프리웨어: MariaDB·PostgreSQL·SQLite",
      },
      {
        title: "키의 종류 5가지",
        stars: 4,
        body:
          "| 키 | 정의 | 유일성 | 최소성 | NULL |\n|---|---|---|---|---|\n| 슈퍼키 | 유일 식별 속성(들) | O | X | - |\n| 후보키 | 슈퍼키 중 최소성 O | O | O | - |\n| 기본키 | 후보키 중 선택(1개) | O | O | **불가** |\n| 대체키 | 기본키 못 된 후보키 | O | O | 허용 |\n| 외래키 | 다른 릴레이션 PK 참조 | - | - | **허용** |\n\n[시험] 슈퍼키 vs 후보키 차이 = **최소성**! (학번)·(학번,이름) 둘 다 슈퍼키지만 (학번,이름)은 최소성 X → 후보키 아님",
      },
      {
        title: "무결성 제약조건 3가지",
        stars: 4,
        body:
          "| 구분 | 도메인 | 개체 | 참조 |\n|---|---|---|---|\n| 제약 대상 | 속성 | 튜플 | 속성+튜플 |\n| 같은 용어 | 도메인 제약 | 기본키 제약 | 외래키 제약 |\n| **NULL** | 허용 | **불가** | 허용 |\n| 개수 | 속성 수 | 1개 | 0~여러 개 |\n\n[시험] NULL 허용 — 도메인 O / **개체 X** / 참조 O (최빈출!)\n[주의] 참조 무결성: 외래키 값은 부모 PK에 존재하거나 NULL이어야 함 (없는 값 → 위반)",
      },
      {
        title: "관계 대수 8개 연산자",
        stars: 4,
        body:
          "**특징 3가지**: 절차 언어 / 연산자들의 모임 / **폐쇄 특성**(피연산자·결과 모두 릴레이션)\n\n**순수 관계 연산자 (4)**\n| 연산자 | 기호 | 특징 |\n|---|---|---|\n| Select | σ | 조건 만족 튜플(수평적) |\n| Project | π | 속성 선택(수직적), 중복 자동 제거 |\n| Join | ⋈ | 공통 속성 결합(동등 조인) |\n| Division | ÷ | \"모든 ~에 대해\" |\n\n**일반 집합 연산자 (4)** — 교환·결합 법칙\n| 연산자 | 기호 | 교환/결합 |\n|---|---|---|\n| Union | ∪ | O |\n| Intersection | ∩ | O |\n| **Difference** | − | **X** |\n| Cartesian | × | O |\n\n[암기] 순수관계=\"셀프조디\", 일반집합=\"합교차카\"\n[시험] **차집합(−)만 교환·결합 법칙 X** (A−B ≠ B−A) / **×는 차수=합, 카디=곱**",
      },
    ],
  },

  // ════════════════════ 4주차 ════════════════════
  {
    week: 4,
    scope: "midterm",
    title: "SQL 실전 구문",
    meta: "데이터 타입 · 제약조건 SQL · SELECT 완전형식 · 집계함수 · GRANT/REVOKE",
    keywords: ["CHAR 고정/VARCHAR 가변", "S-F-W-G-H-O", "WHERE에 집계함수 X", "WITH GRANT OPTION", "CASCADE/RESTRICT"],
    topics: [
      {
        title: "제약조건 키워드 ↔ 무결성",
        stars: 3,
        body:
          "| 키워드 | 용도 | 무결성 |\n|---|---|---|\n| PRIMARY KEY | 기본키 | 개체 |\n| UNIQUE | 대체키(NULL 허용) | - |\n| FOREIGN KEY...REFERENCES | 외래키 | 참조 |\n| NOT NULL | NULL 금지 | 개체 보조 |\n| CHECK | 조건 검사 | 도메인 |\n| DEFAULT | 기본값 | - |\n\n```sql\nCREATE TABLE 학생 (\n  학번 INT PRIMARY KEY,\n  이름 VARCHAR(20) NOT NULL,\n  나이 INT CHECK (나이 >= 0),\n  학과코드 VARCHAR(10),\n  FOREIGN KEY (학과코드) REFERENCES 학과(코드)\n);\n```",
      },
      {
        title: "SELECT 완전 형식",
        stars: 5,
        body:
          "```sql\nSELECT [ALL|DISTINCT] 속성\nFROM 테이블\n[WHERE 조건]\n[GROUP BY 속성 [HAVING 조건]]\n[ORDER BY 속성 [ASC|DESC]];\n```\n[암기] 작성 순서 **S-F-W-G-H-O**\n\n**WHERE vs HAVING**\n| | WHERE | HAVING |\n|---|---|---|\n| 대상 | 튜플 단위 | 그룹 단위 |\n| 집계함수 | **불가** | **가능** |\n| 시점 | GROUP BY 전 | GROUP BY 후 |\n\n[주의] 집계함수(COUNT/MAX/MIN/SUM/AVG) — ① NULL 제외 ② **WHERE 사용 불가** ③ SELECT·HAVING만",
      },
      {
        title: "LIKE 와일드카드",
        body:
          "| 패턴 | 의미 |\n|---|---|\n| `%` | 0개 이상 문자 |\n| `_` | 정확히 1개 문자 |\n| `'데이터%'` | 데이터로 시작 |\n| `'%데이터'` | 데이터로 끝 |\n| `'_____'` | 정확히 5자 |",
      },
      {
        title: "GRANT / REVOKE",
        stars: 4,
        body:
          "```sql\nGRANT 권한 ON 객체 TO 사용자 [WITH GRANT OPTION];\nREVOKE 권한 ON 객체 FROM 사용자 [CASCADE | RESTRICT];\n```\n[정의] **WITH GRANT OPTION** = 받은 권한을 남에게 재부여 가능\n\n| 옵션 | 의미 |\n|---|---|\n| CASCADE | 연쇄 취소(부여한 권한도 모두) |\n| RESTRICT | 하위 부여가 있으면 거부 |\n\n**객체 vs 시스템 권한**\n| | 객체 권한 | 시스템 권한 |\n|---|---|---|\n| 부여자 | 객체 소유자 | DBA |\n| 예 | SELECT, INSERT | CREATE TABLE, CREATE USER |",
      },
    ],
  },

  // ════════════════════ 5주차 ════════════════════
  {
    week: 5,
    scope: "midterm",
    title: "정보보안 & DB 보안",
    meta: "CIA 삼각형 · 공격 4유형 ↔ CIA · DB 보안 요구사항 · 접근제어 4모델 개요 · Trade-Off",
    keywords: ["CIA", "공격↔CIA 매칭", "운영적/의미적 무결성", "추론(Inference)", "DAC/MAC/RBAC/ABAC"],
    topics: [
      {
        title: "CIA 삼각형",
        stars: 4,
        body:
          "| 요소 | 의미 | 침해 공격 |\n|---|---|---|\n| **Confidentiality(기밀성)** | 내용을 모르게 | 가로채기(Interception) |\n| **Integrity(무결성)** | 변경 안 되게 | 변조(Modification) |\n| **Availability(가용성)** | 정상 서비스 | 차단(Interruption, DoS) |\n\n[팁] 확장 목표: **인증(Authentication), 부인방지(Non-Repudiation)**",
      },
      {
        title: "보안 공격 4유형 ↔ CIA",
        stars: 5,
        body:
          "| 공격 | 설명 | 침해 |\n|---|---|---|\n| 가로채기(Interception) | 비인가자 자원 접근 | 기밀성 |\n| 변조(Modification) | 비인가 변경 | 무결성 |\n| 차단(Interruption) | 자원 사용 불가(DoS) | 가용성 |\n| 위조(Fabrication) | 가짜 객체 삽입 | 무결성+인증 |\n\n[시험] 공격 유형 ↔ CIA 매칭은 **거의 100% 출제**. 반드시 외우기!",
      },
      {
        title: "DB 보안 요구사항 + 무결성 2종",
        stars: 3,
        body:
          "**요구사항 6가지**: ① 접근제어&인증 ② 데이터 보호(암호화) ③ **추론 방지** ④ DB 무결성 보장 ⑤ 감사·모니터링 ⑥ 기타\n\n[정의] **추론(Inference)** = 접근 가능한 데이터들의 연관성으로 비인가 데이터를 알아내는 것\n\n| DB 무결성 | 목적 | 기법 |\n|---|---|---|\n| 운영적 | 병행처리 일관성 | 로킹(Locking) |\n| 의미적 | 허용값 통제 | Constraint-Check |",
      },
      {
        title: "DB 보안 위협 7가지",
        body:
          "1. SW 구성 오류·취약점 악용\n2. **SQL/NoSQL 인젝션** (DB 특화)\n3. DoS / DDoS\n4. 백업 공격\n5. **내부자 위협** (악의적/태만/잠입자)\n6. 데이터 유출\n7. 사용자 실수(약 49%), 멀웨어\n\n[시험] 보안 vs 가용성(접근성·성능)은 **Trade-Off** — 한쪽↑ 다른쪽↓, 적절한 균형 필요",
      },
      {
        title: "접근제어 4모델 (개요)",
        stars: 4,
        body:
          "| 모델 | 영문 | 기준 |\n|---|---|---|\n| ① 임의적 DAC | Discretionary AC | 신분(=IBAC) |\n| ② 강제적 MAC | Mandatory AC | 보안 등급(규칙) |\n| ③ 역할기반 RBAC | Role-Based AC | 역할 |\n| ④ 속성기반 ABAC | Attribute-Based AC | 속성 |\n\n- DAC 대표: **ACM, Capability List, ACL** / MAC 대표: **BLP, Biba**\n[팁] 상세는 9·10주차. 여기선 4모델의 기준 매칭만 잡아두기.",
      },
    ],
  },

  // ════════════════════ 6주차 ════════════════════
  {
    week: 6,
    scope: "midterm",
    title: "권한 관리 실무",
    meta: "Oracle 계정 6종 · SYSDBA vs SYSOPER · Oracle vs MySQL · Role 3단계 · VIEW 6조건 · AUDIT",
    keywords: ["SYSDBA vs SYSOPER", "Role 3단계(주체 다름)", "변경불가 뷰 기·낫·집·디·그·조", "AUDIT_TRAIL NONE/DB/OS", "SESSION/ACCESS"],
    topics: [
      {
        title: "Oracle 관리자 계정 6종",
        stars: 3,
        body:
          "| 계정 | 역할 |\n|---|---|\n| **SYS** | 모든 권한 + 데이터 사전 소유 |\n| SYSTEM | SYS 유사(백업·복구·업그레이드 X) |\n| SYSBACKUP | 백업·복구 전담 |\n| SYSDG | Data Guard |\n| SYSKM | TDE 암호화 키 관리 |\n| SYSRAC | RAC 클러스터 |",
      },
      {
        title: "SYSDBA vs SYSOPER",
        stars: 5,
        body:
          "| 권한 | SYSDBA | SYSOPER |\n|---|---|---|\n| CREATE/DROP DATABASE | O | **X** |\n| Character Set 변경 | O | X |\n| 완전 복구 | O | O |\n| **불완전 복구** | O | **X** |\n| 사용자 데이터 조회 | O | **X** |\n| 기본 스키마 | SYS | PUBLIC |\n\n[시험] SYSDBA=전권 / SYSOPER=운영자(DB 생성·사용자 데이터 조회·불완전 복구 **X**)",
      },
      {
        title: "Role 권한 부여 3단계",
        stars: 5,
        body:
          "```sql\n① CREATE ROLE 롤이름;            (DBA)\n② GRANT 권한 ON 객체 TO 롤이름;   (객체 소유자)\n③ GRANT 롤이름 TO 사용자;         (DBA)\n```\n[암기] **\"만들고(DBA) → 채우고(소유자) → 나눠준다(DBA)\"** — 단계마다 수행자가 다른 게 포인트!",
      },
      {
        title: "VIEW와 변경 불가능한 뷰",
        stars: 5,
        body:
          "[정의] VIEW = 하나 이상의 테이블을 합한 **가상 테이블**\n\n장점 3: 질의어 간소화 / 데이터 보안 / 논리적 데이터 독립성 (단점: ALTER 불가 → DROP 후 재생성)\n\n**변경 불가능한 뷰 6조건**\n1. 기본키 미포함\n2. NOT NULL 속성 미포함\n3. 집계 함수 계산 포함\n4. DISTINCT 포함\n5. GROUP BY 포함\n6. 여러 테이블 조인\n\n[암기] **기·낫·집·디·그·조**\n[정의] WITH CHECK OPTION = 뷰 정의 조건 위반 삽입·수정 차단",
      },
      {
        title: "AUDIT 감사",
        stars: 4,
        body:
          "| 유형 | 키워드 | 대상 |\n|---|---|---|\n| 로그인 감사 | `AUDIT SESSION` | 로그인 시도 |\n| 행동 감사 | `AUDIT action BY user` | 질의문 실행 |\n| 객체 감사 | `AUDIT action ON object` | 특정 객체 |\n\n**AUDIT_TRAIL**: NONE(기본,안함) / DB(`sys.audit$`) / OS(파일시스템)\n[시험] **SESSION** = 세션당 1번만 / **ACCESS** = 실행할 때마다",
      },
    ],
  },

  // ════════════════════ 7주차 ════════════════════
  {
    week: 7,
    scope: "midterm",
    title: "인증 & 취약점 점검",
    meta: "인증 4요소 · MFA · 뷰/SQL 기반 접근통제 · 위협 vs 취약점 · 모의해킹 vs 내부감사",
    keywords: ["Know-Have-Are-Do", "MFA", "위협 최소화/취약점 제거", "모의해킹(외부)/내부감사", "OS_ROLES FALSE"],
    topics: [
      {
        title: "사용자 인증 4요소",
        stars: 4,
        body:
          "[정의] \"사용자 신분(Identity)을 검증(Validation)하여 적합한 사용자인지 판단\"\n\n| 요소 | 영문 | 예시 |\n|---|---|---|\n| 지식 기반 | What you know | 패스워드, CAPTCHA |\n| 소유 기반 | What you have | 토큰, 보안카드, OTP |\n| 존재 기반 | What you are | 지문, 홍채, DNA |\n| 행위 기반 | What you do | 서명, 음성, 걸음걸이 |\n\n[암기] **Know-Have-Are-Do**\n[주의] 존재 기반: 복제 어렵지만 **유출 시 재발행 불가!**",
      },
      {
        title: "다중 인증(MFA) & DBMS 인증",
        stars: 4,
        body:
          "[정의] **MFA** = 인증 요소를 두 개 이상 사용. 예) 지식(패스워드)+소유(인증서)\n\n- 기본: 패스워드(지식)\n- OS 인증: Oracle, MSSQL\n- 네트워크 인증: Oracle, MySQL — 대표 **커버로스(Kerberos)**",
      },
      {
        title: "위협 vs 취약점",
        stars: 4,
        body:
          "| | 위협(Threat) | 취약점(Vulnerability) |\n|---|---|---|\n| 정의 | 손실 발생 원인·행위 | 자산이 가진 약점 |\n| 관리 | **100% 제거 불가 → 최소화** | **제거 가능 → 분석·제거** |\n\n[시험] \"취약점은 위협이 자산에 손실을 입히기 위해 이용하는 수단\"",
      },
      {
        title: "모의해킹 vs 내부감사",
        stars: 4,
        body:
          "취약점 분석 3단계: ① 분석 설계(대상·경로) → ② 분석 구축(모의해킹 or 내부감사) → ③ 취약점 점검·조치\n\n| 구분 | 모의해킹 | 내부감사 |\n|---|---|---|\n| 대상 | **외부 사용자** | **내부 사용자** |\n| 방식 | 공격 시뮬레이션 | 안전 운영 점검 |\n| 항목 | TNS, DoS, Password | Auth/Audit/Network/OS/Patch/Backup |\n\n[팁] Oracle 안전 파라미터 — OS_ROLES / REMOTE_OS_AUTHENTICATION / REMOTE_OS_ROLES 는 **FALSE**가 안전",
      },
    ],
  },

  // ════════════════════ 9주차 ════════════════════
  {
    week: 9,
    scope: "final",
    title: "접근제어 개요 & DAC",
    meta: "접근제어 3요소·3절차 · DAC(=IBAC) · ACM → ACL/Capability 변환 · 트로이목마",
    keywords: ["식별·인증·인가", "주체/객체/접근권한", "DAC=IBAC", "ACL=객체중심/Capability=주체중심", "트로이목마"],
    topics: [
      {
        title: "접근제어 3요소 & 3절차",
        stars: 4,
        body:
          "**3요소**: 주체(Subject) · 객체(Object) · 접근권한(Access Right: R/W/X/D/C)\n\n**3절차**\n| 절차 | 영문 | 의미 |\n|---|---|---|\n| 식별 | Identification | ID 제시(유일·공유 금지) |\n| 인증 | Authentication | 본인 검증 |\n| 인가 | Authorization | 권한 부여·행위 판별 |\n\n[암기] 식별 → 인증 → 인가 (순서 주의)",
      },
      {
        title: "DAC (임의적 접근제어)",
        stars: 4,
        body:
          "[정의] **DAC** = 사용자의 **신분(Identity)** 및 접근 규칙 기반. 객체 소유자가 임의로 권한 부여·회수. 신분 기반이라 **IBAC**라고도 함.\n\n**장점**: 구현 용이·유연·세분화\n**단점**: 보안성 취약, 신분 도용에 치명적, **트로이목마(Trojan Horse)**를 막지 못함\n\n[주의] DAC 대표 구현 3가지 = ACM(가상화 모델) / ACL / Capability List",
      },
      {
        title: "ACM → ACL / Capability List 변환",
        stars: 5,
        body:
          "[정의] **ACM(접근제어행렬)** = 행(주체)×열(객체) 권한을 2차원 배열로 표현한 개념 모델\n\n예시 ACM\n| 주체＼객체 | File A | File B | Prog1 |\n|---|---|---|---|\n| Alice | R | W | R |\n| Bob | - | R | RWX |\n\n**ACL(객체 중심, 열을 읽음)**: File B → [(Alice, W), (Bob, R)]\n**Capability(주체 중심, 행을 읽음)**: Alice → [(File A, R), (File B, W), (Prog1, R)]\n\n[암기] **ACL=열(객체), Capability=행(주체)**\n[시험] ACM 주고 ACL/Capability 열거 + 취약점·해결(RBAC) 서술이 기말 단골",
      },
    ],
  },

  // ════════════════════ 10주차 ════════════════════
  {
    week: 10,
    scope: "final",
    title: "MAC(BLP/Biba) · RBAC · ABAC",
    meta: "MAC=규칙기반 · BLP(기밀성) vs Biba(무결성) · RBAC 역할폭발·SoD · ABAC · 4모델 비교",
    keywords: ["MAC=규칙기반", "No Read Up/No Write Down", "역할폭발", "SoD(SSD/DSD)", "ABAC=속성+환경/XACML"],
    topics: [
      {
        title: "MAC (강제적 접근제어)",
        stars: 4,
        body:
          "[정의] **MAC** = 주체·객체의 **보안 분류 등급** 기반. 중앙 관리자가 등급을 강제 부여, 낮은 등급 주체가 높은 등급 객체 접근 제한. **규칙 기반(Rule-Based)**이라고도 함.\n\n특징: 보안성 높음, 군·국방, 기밀성 강조. 단점: 구현 어려움·기능 제한·관리 부담.",
      },
      {
        title: "BLP vs Biba",
        stars: 5,
        body:
          "| 구분 | BLP | Biba |\n|---|---|---|\n| 중점 | **기밀성** | **무결성** |\n| 개발 | 1973 Bell·LaPadula | 1975 Biba |\n| 읽기 | **No Read Up** (주체≥객체) | **No Read Down** (주체≤객체) |\n| 쓰기 | **No Write Down** (주체≤객체) | **No Write Up** (주체≥객체) |\n| 사용처 | 군·국방 | 금융권 |\n\n[시험] BLP = NRU·NWD(기밀성), Biba = 정반대 NRD·NWU(무결성). 부등호 방향이 반대!",
      },
      {
        title: "RBAC — 역할 폭발 & 임무분리",
        stars: 4,
        body:
          "[정의] **RBAC** = 주체의 **역할(Role)**에 따라 권한 결정. 역할에 권한을 묶어 부여/회수 → 효율적 관리.\n\n[주의] **역할 폭발(Role Explosion)** = 역할 수가 기하급수적으로 늘어 관리 불가\n\n**임무분리(SoD)**\n| | 의미 |\n|---|---|\n| SSD(정적) | 상호배타 역할에 **아예 배정 금지** |\n| DSD(동적) | 배정 가능, 한 세션 **동시 활성화 금지** |",
      },
      {
        title: "ABAC & 4모델 종합",
        stars: 5,
        body:
          "[정의] **ABAC** = 주체·객체의 **속성 + 환경 조건**으로 동적 접근 결정. 가장 유연. 활용 언어 **XACML**.\n\n| 모델 | 기준 | 장점 | 단점 |\n|---|---|---|---|\n| DAC | 신분 | 유연·간단 | 보안 취약 |\n| MAC | 보안등급 | 높은 보안 | 구현 어려움 |\n| RBAC | 역할 | 효율적 관리 | 역할 폭발 |\n| ABAC | 속성+환경 | 세밀·동적 | 관리 부담·비용 |\n\n[시험] ★ 4모델 비교표 + RBAC·ABAC full name·장단점은 기말 최빈출",
      },
    ],
  },

  // ════════════════════ 11주차 ════════════════════
  {
    week: 11,
    scope: "final",
    title: "암호화 기초 & DB 암호화 방식",
    meta: "대칭/비대칭 · DES/AES/RSA · 키 분배 · 공개키 3용도 · DB 암호화 5방식",
    keywords: ["대칭=빠름/키분배문제", "비대칭=공개·개인키", "키 n(n-1)/2", "디지털서명 방향 반대", "DB암호화 5방식"],
    topics: [
      {
        title: "대칭 vs 비대칭 암호",
        stars: 4,
        body:
          "| | 대칭 | 비대칭(공개키) |\n|---|---|---|\n| 키 | 암호화=복호화 키 동일 | 공개키 ≠ 개인키 |\n| 속도 | 빠름 | 느림 |\n| 키 분배 | **문제 있음** | 해결 |\n| 대표 | DES, 3DES, AES | RSA, DH, ECC, DSS |\n\n[정의] 비대칭은 1976년 Diffie·Hellman·Merkle이 제안",
      },
      {
        title: "DES / AES / RSA",
        stars: 3,
        body:
          "| | 풀네임 | 스펙 |\n|---|---|---|\n| DES | Data Encryption Standard | 64블록·56키·16라운드(폐기) |\n| AES | Advanced Encryption Standard | 128블록·키 128/192/256(라운드 10/12/14) |\n| RSA | Rivest·Shamir·Adleman | 대표 비대칭, 키 전송·전자서명 |\n\n[팁] AES는 Rijndael이 선정됨. DES는 전사공격에 취약해 AES로 대체.",
      },
      {
        title: "키 분배 & 공개키 3용도",
        stars: 4,
        body:
          "[주의] 대칭 암호 키 분배 문제 — n명 통신 시 **n(n-1)/2개** 키 필요, 각자 (n-1)개 보관\n해결: 키 사전공유 / KDC / Diffie-Hellman / 공개키 암호\n\n**공개키 3용도 (키 방향 주의)**\n- 암호화: 수신자 공개키 암호화 → 수신자 개인키 복호화\n- **디지털 서명**: 송신자 개인키 서명 → 송신자 공개키 검증 (**방향 반대!**)\n- 키 분배: 세션키를 수신자 공개키로 암호화",
      },
      {
        title: "DB 암호화 5방식",
        stars: 4,
        body:
          "**DB 서버 내부 (3)**\n- DB 서버 암호화 (플러그인)\n- DBMS 자체 암호화 (**TDE**, 커널)\n- DBMS 암호화 기능 호출 (API)\n\n**DB 서버 외부 (2)**\n- 응용 프로그램 자체 암호화 (API 라이브러리)\n- 운영체제 암호화 (OS 입출력, DB 파일 암호화)\n\n[시험] 응용프로그램 수정 불필요 = DB서버/DBMS자체/OS 암호화 / 색인검색 불가 = DBMS 암호화 기능 호출",
      },
    ],
  },

  // ════════════════════ 12주차 ════════════════════
  {
    week: 12,
    scope: "final",
    title: "DB 암호화 생명주기 · TDE · HSM",
    meta: "설계→구축→운영 · 마스터키·HSM·KMS · TDE(Oracle vs MySQL) · 블록 암호 모드 5종",
    keywords: ["TDE 정의", "HSM 정의", "마스터키", "Oracle vs MySQL TDE", "ECB/CBC/CFB/OFB/CTR"],
    topics: [
      {
        title: "TDE & HSM (정의 단골)",
        stars: 5,
        body:
          "[정의] **TDE**(Transparent Data Encryption) = DB 레벨(커널)에서 자동 암복호화 → **응용 프로그램 수정 불필요**. 응용 입장에서 안 보여서 '투명'. (Oracle 10gR2~, MSSQL 2008~)\n\n[정의] **HSM**(Hardware Security Module) = 마스터키를 포함한 암호 키를 생성·저장·보호하는 보안 장치. 내부 생성 키는 외부 유출 불가, **공격 감지 시 키 자동 파기**.",
      },
      {
        title: "키 관리 — 마스터키·KMS",
        stars: 4,
        body:
          "[정의] **마스터 키** = 데이터 키(실제 암호화 키)를 다시 암호화하는 키 → 데이터 키가 저장돼도 안전, 마스터키만 관리\n\n**키 관리가 필요한 3이유 → 대응(KMS)**\n1. 키 미변경 사용 → 여러 키 사용\n2. 단일 키 유출 → 주기적 키 변경\n3. 키 분실 → 키 백업\n\n[정의] **KMS** = 키 생성·폐기·재발급을 통합 수행하는 시스템",
      },
      {
        title: "Oracle vs MySQL TDE",
        stars: 5,
        body:
          "| 구분 | Oracle | MySQL |\n|---|---|---|\n| 명칭 | TDE | Data-at-Rest Encryption |\n| 컬럼 암호화 | **O** | **X** |\n| 알고리즘 | AES·DES 등 다양 | **AES256만** |\n| 키 관리 | 마스터키로 데이터키 암호화 | 키를 테이블에 저장 |\n| 블록 모드 | 다양 | **ECB만** |\n\n[시험] ★ 이 표는 기말 단골. Oracle=컬럼O·다양·마스터키 / MySQL=컬럼X·AES256·ECB",
      },
      {
        title: "블록 암호 운용 모드 5종",
        stars: 3,
        body:
          "| 모드 | 풀네임 | 특징 |\n|---|---|---|\n| ECB | Electronic CodeBook | 블록 독립, 병렬 O, 약함 |\n| CBC | Cipher Block Chaining | 앞 암호문과 XOR, 병렬 X |\n| CFB | Cipher FeedBack | 앞 암호문 입력, 첫 블록 IV |\n| OFB | Output FeedBack | 출력과 XOR |\n| CTR | CounTeR | 카운터 암호화, 병렬 O |\n\n[팁] 병렬 가능 = ECB·CTR / 불가 = CBC·CFB·OFB",
      },
    ],
  },

  // ════════════════════ 13주차 ════════════════════
  {
    week: 13,
    scope: "final",
    title: "빅데이터 개념 · 유형 · 생명주기",
    meta: "빅데이터 정의 · 정형/반정형/비정형 · 3~7V · 생명주기 · NoSQL/Hadoop",
    keywords: ["정형/반정형/비정형", "3V(Volume/Velocity/Variety)", "반정형=JSON/XML", "NoSQL", "Hadoop=HDFS+맵리듀스"],
    topics: [
      {
        title: "데이터 유형 3종",
        stars: 5,
        body:
          "| 유형 | 정의 | 예시 |\n|---|---|---|\n| 정형 | 미리 정한 형식·구조 | RDB 테이블, CSV |\n| **반정형** | 구조 변경 가능, 구조 정보 함께 제공 | **HTML, XML, RDF, JSON** |\n| 비정형 | 정의된 구조 없음, 전처리 필요 | 동영상, 사진, 문서 |\n\n[시험] 반정형 정의·예시(JSON/XML)는 기말 단골. JSON을 CSV/테이블로 변환 가능.",
      },
      {
        title: "빅데이터 속성 3V → 7V",
        stars: 4,
        body:
          "[정의] **3V** — Volume(규모), Velocity(속도), Variety(다양성)\n\n확장: +Veracity(진실성) +Value(가치) +Variability(가변성) +Visualization(시각화) = 7V\n\n[시험] ★ 3V full name과 의미는 기말 단골",
      },
      {
        title: "생명주기 & 저장·처리 기술",
        stars: 3,
        body:
          "생명주기: 생성 → 수집 → 저장 → 처리 → 분석 → 표현&활용 → 폐기\n\n**저장 4방법**: 분산파일(GFS/HDFS/S3) · NoSQL(HBase/Cassandra) · 병렬DBMS · 네트워크저장(SAN/NAS)\n\n| | NoSQL | Hadoop |\n|---|---|---|\n| 특징 | 관계모델·SQL 미사용, 가용성·확장성 | 자바 오픈소스 |\n| 구조 | - | **HDFS(저장)+맵리듀스(처리)** |",
      },
    ],
  },

  // ════════════════════ 14주차 ════════════════════
  {
    week: 14,
    scope: "final",
    title: "빅데이터 프라이버시 5단계 & 비식별화",
    meta: "5단계(수집~폐기) 위협·대응 · 비식별화 5기법 · K-익명성/l-다양성/T-근접성 · 옵트인/아웃",
    keywords: ["5단계(수집~폐기)", "동형암호/PPDC", "비식별화 5기법", "K-익명성→l-다양성→T-근접성", "오버라이팅/디가우싱"],
    topics: [
      {
        title: "프라이버시 5단계 (위협 ↔ 대응)",
        stars: 5,
        body:
          "| 단계 | 문제 | 해결 |\n|---|---|---|\n| 수집 | 과도 수집·무동의 | 옵트인, 동형암호(PPDC) |\n| 저장 | 무결성·유출·가용성 | 접근제어, 분산화, 감사 |\n| 분석 | 개인 식별 가능성 | 비식별화, PPDM |\n| 활용 | 재식별 | K-익명성/l-다양성/T-근접성 |\n| 폐기 | 데이터 잔존 | 오버라이팅, 디가우싱 |\n\n[시험] ★ 5단계 각 문제+해결 서술이 기말 최빈출",
      },
      {
        title: "프라이버시 보호 모델 발전",
        stars: 5,
        body:
          "[정의] **K-익명성** — 같은 준식별자 값이 최소 K개 이상 → 연결공격 방어\n→ 한계: 동질성·배경지식 공격\n\n[정의] **l-다양성** — 그룹 내 민감정보가 최소 l개 이상 서로 다름 → 동질성 방어\n→ 한계: 쏠림·유사성 공격\n\n[정의] **T-근접성** — 그룹 분포가 전체 분포와 T 이하 차이 → 쏠림·유사성 방어\n\n[암기] K-익명성 → l-다양성 → T-근접성 (뒤가 앞의 한계를 보완)",
      },
      {
        title: "비식별화 5기법 & 폐기",
        stars: 4,
        body:
          "| 기법 | 예시 |\n|---|---|\n| 가명처리 | 홍길동 35세 → 임꺽정 30대 |\n| 총계처리 | 키 → 평균 165cm |\n| 데이터 삭제 | 901206-1234567 → 90년대생 남자 |\n| 범주화 | 홍길동 35세 → 홍씨 30~40세 |\n| 마스킹 | 홍길동 → 홍OO |\n\n**옵트인 vs 옵트아웃**: 옵트인=사전 동의 必(국내 의무) / 옵트아웃=거부 안 하면 동의 간주\n**폐기**: 오버라이팅(재사용 O, 클라우드 적합) / 디가우싱(재사용 X, 클라우드 부적합)",
      },
    ],
  },
];
