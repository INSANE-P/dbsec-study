// 2주차 — DBMS 환경 · 사용자 유형 · SQL 분류(DDL/DML/DCL) · DBMS 발전사
// 문제 추가법은 week01.ts 상단 주석 참고. id 규칙: "mid-w02-qNN"
import type { Question } from "@/data/types";

export const week02: Question[] = [
  {
    id: "mid-w02-q01",
    scope: "midterm",
    week: 2,
    type: "약어정의",
    prompt:
      "다음 약어의 풀네임과 의미를 작성하시오.\n(1) DBA  (2) IDS  (3) IMS  (4) NoSQL",
    modelAnswer:
      "(1) **DBA** = Database Administrator (데이터베이스 관리자)\n→ DB 운영·관리 책임자. 스키마 정의, 권한 부여, 백업, 감사 담당.\n\n(2) **IDS** = Integrated Data Store\n→ 대표적인 1세대 네트워크 DBMS.\n\n(3) **IMS** = Information Management System\n→ 대표적인 1세대 계층(트리형) DBMS.\n\n(4) **NoSQL** = Not Only SQL\n→ 4세대 DBMS. 데이터 구조를 미리 정하지 않아 비정형 데이터 처리에 적합하고 확장성이 뛰어남(MongoDB, HBase, Cassandra 등).",
    tags: ["DBA", "IDS", "IMS", "NoSQL", "약어"],
  },
  {
    id: "mid-w02-q02",
    scope: "midterm",
    week: 2,
    type: "비교서술",
    prompt:
      "SQL의 3대 분류(DDL/DML/DCL)를 각각의 용도와 대표 명령어와 함께 표로 정리하시오.",
    modelAnswer:
      "| 분류 | 풀네임 | 용도 | 명령어 |\n|---|---|---|---|\n| DDL | Data Definition Language | 스키마/테이블 정의·수정·삭제 | CREATE, ALTER, DROP |\n| DML | Data Manipulation Language | 데이터 삽입·삭제·수정·검색 | SELECT, INSERT, UPDATE, DELETE |\n| DCL | Data Control Language | 보안·권한·복구 제어 | GRANT, REVOKE, COMMIT, ROLLBACK |\n\nDCL은 DBMS의 4가지 특성(**무결성·보안·회복·동시성**)을 보장하기 위해 사용된다.",
    tags: ["SQL", "DDL", "DML", "DCL"],
  },
  {
    id: "mid-w02-q03",
    scope: "midterm",
    week: 2,
    type: "약어정의",
    prompt:
      "데이터 사전(Data Dictionary)이 무엇인지 설명하고, 다른 명칭 한 가지를 쓰시오.",
    modelAnswer:
      "**데이터 사전(Data Dictionary)**: 데이터베이스에 저장되는 데이터에 관한 정보(스키마, 스키마 간 매핑 정보, 제약조건 등)를 저장하는 공간. 즉 '데이터에 대한 데이터'인 **메타데이터(Metadata)**이다.\n\n다른 명칭: **시스템 카탈로그(System Catalog)**.",
    tags: ["데이터 사전", "시스템 카탈로그", "메타데이터"],
  },
  {
    id: "mid-w02-q04",
    scope: "midterm",
    week: 2,
    type: "비교서술",
    prompt:
      "데이터베이스 사용자 3유형(DBA, 최종 사용자, 응용 프로그래머)의 역할과 주로 사용하는 언어를 설명하시오.",
    modelAnswer:
      "**① DBA(데이터베이스 관리자)**: DB 시스템 운영·관리. 스키마 정의, 권한 부여, 백업·회복, 보안 정책 수립. 주로 DDL 사용.\n\n**② 최종 사용자(End User)**: DB에 접근해 데이터를 조작(삽입·삭제·수정·검색). 주로 DML 사용.\n- 캐주얼 사용자: 이론 지식 보유, 직접 DML 작성\n- 초보(Naive) 사용자: 메뉴·GUI 응용 프로그램을 통해 사용\n\n**③ 응용 프로그래머**: C·Java 등으로 응용 프로그램을 작성하며 데이터 조작어를 삽입. 주로 DML 사용(DDL도 가능).",
    tags: ["DBA", "최종 사용자", "응용 프로그래머"],
  },
  {
    id: "mid-w02-q05",
    scope: "midterm",
    week: 2,
    type: "비교서술",
    prompt: "DBMS의 장점과 단점을 각각 3가지 이상 서술하시오.",
    modelAnswer:
      "**장점**\n- 데이터 중복 통제 → 저장공간 절약·일관성 유지\n- 데이터 독립성 확보\n- 데이터 동시 공유(동시성 제어)\n- 데이터 보안 향상(중앙 집중식 접근 제어)\n- 데이터 무결성 유지\n- 표준화, 장애 시 회복 가능\n\n**단점**\n- 많은 비용 발생(별도 설치·라이선스)\n- 백업과 회복이 복잡함\n- 중앙 집중 관리로 인한 취약점(장애 시 전체 업무 중단)",
    tags: ["DBMS 장단점"],
  },
  {
    id: "mid-w02-q06",
    scope: "midterm",
    week: 2,
    type: "비교서술",
    prompt:
      "DBMS의 세대별 발전 과정을 데이터 모델·대표 제품과 함께 정리하시오.",
    modelAnswer:
      "| 세대 | 종류 | 데이터 모델 | 대표 제품 |\n|---|---|---|---|\n| 1세대 | 네트워크 DBMS | 그래프(네트워크) | IDS |\n| 1세대 | 계층 DBMS | 트리 | IMS |\n| 2세대 | 관계 DBMS | 테이블(관계) | Oracle, MySQL, MS-SQL |\n| 3세대 | 객체지향/객체관계 DBMS | 객체지향(+관계) | O2, ONTOS, GemStone |\n| 4세대 | NoSQL | 미리 정하지 않음 | MongoDB, HBase, Cassandra |\n| 4세대 | NewSQL | — | 구글 Spanner, VoltDB, NuoDB |",
    tags: ["DBMS 발전사", "관계DBMS", "NoSQL", "NewSQL"],
  },
  {
    id: "mid-w02-q07",
    scope: "midterm",
    week: 2,
    type: "비교서술",
    prompt:
      "대표 관계형 DBMS인 Oracle, MySQL, MS-SQL의 특징(유형·장점·단점)을 비교하시오.",
    modelAnswer:
      "| 구분 | Oracle | MySQL | MS-SQL |\n|---|---|---|---|\n| 유형 | 상용 관계형 DBMS | 오픈 소스 RDBMS | 상용 관계형 DBMS |\n| 장점 | 강력한 보안, 대용량 처리, 풍부한 기술 지원 | 무료, 사용 간편, 낮은 사양으로 구동 | 강력한 기술 지원·풍부한 문서 |\n| 단점 | 많은 비용, 높은 하드웨어 사양 | 기술 지원 어려움, 낮은 확장성, 일부 표준 SQL 미지원 | 많은 비용, Windows/Linux에서만 동작 |\n\nMS-SQL은 T-SQL(Transact-SQL)을 사용한다. MySQL 소유권은 오픈소스 → Sun → Oracle 순으로 이전되었다.",
    tags: ["Oracle", "MySQL", "MS-SQL"],
  },
  {
    id: "mid-w02-q08",
    scope: "midterm",
    week: 2,
    type: "약어정의",
    prompt:
      "SQL이 '데이터 부속어(Data Sublanguage)'라고 불리는 이유를 설명하시오.",
    modelAnswer:
      "SQL은 Java·C 같은 완전한 프로그래밍 언어가 아니라, 데이터의 **생성 및 처리 문법만** 가지고 있어 DBMS와 통신하는 수단으로만 쓰인다. 독립적으로 모든 문제를 해결하는 범용 언어가 아니라 데이터 처리에 부속되는 언어이므로 **데이터 부속어(Data Sublanguage)**라고 한다.",
    tags: ["SQL", "데이터 부속어"],
  },
];
