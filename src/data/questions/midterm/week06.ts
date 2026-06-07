// 6주차 — DBA · 관리자 계정/권한 · Role · View · 감사(Audit)
// 문제 추가법은 week01.ts 상단 주석 참고. id 규칙: "mid-w06-qNN"
import type { Question } from "@/data/types";

export const week06: Question[] = [
  {
    id: "mid-w06-q01",
    scope: "midterm",
    week: 6,
    type: "비교서술",
    prompt:
      "Oracle의 SYS 계정과 SYSTEM 계정의 차이를 설명하시오.",
    modelAnswer:
      "**SYS**: 모든 권한을 가진 최상위 관리자 계정. 데이터 사전(Data Dictionary)을 소유하며, 설치 시 SYSDBA 권한이 자동 부여된다.\n\n**SYSTEM**: SYS와 거의 유사한 기능을 수행하지만, **백업 및 복구, 데이터베이스 업그레이드는 수행할 수 없다.**\n\n두 계정 모두 DBA Role이 자동 부여되므로 실제 DBA에게만 부여해야 한다.",
    tags: ["SYS", "SYSTEM", "Oracle 계정"],
    grading: {
      must: ["SYS", "SYSTEM", "데이터 사전", "백업", "복구"],
      bonus: ["SYSDBA", "DBA Role", "업그레이드"],
      synonyms: {
        "데이터 사전": ["Data Dictionary"],
      },
    },
  },
  {
    id: "mid-w06-q02",
    scope: "midterm",
    week: 6,
    type: "비교서술",
    prompt:
      "관리자 권한 SYSDBA와 SYSOPER의 차이를 (사용자 데이터 조회, CREATE/DROP DATABASE, 복구 범위) 중심으로 설명하시오.",
    modelAnswer:
      "**SYSDBA**: 가장 강력한 관리자 권한. 사용자 데이터 조회 가능, CREATE/DROP DATABASE 가능, **완전·불완전 복구 모두 가능**. SYS 스키마로 접속.\n\n**SYSOPER**: 기본 운영 작업 권한. 사용자 데이터 조회 **불가**, CREATE/DROP DATABASE **불가**, ALTER DATABASE RECOVER는 **완전 복구만 가능**(UNTIL/TIME/CHANGE/CANCEL 불완전 복구는 SYSDBA만). PUBLIC 스키마로 접속.",
    tags: ["SYSDBA", "SYSOPER", "관리자 권한"],
    grading: {
      must: ["SYSDBA", "SYSOPER", "사용자 데이터", "불완전 복구", "CREATE"],
      bonus: ["완전 복구", "SYS", "PUBLIC", "DROP DATABASE"],
    },
  },
  {
    id: "mid-w06-q03",
    scope: "midterm",
    week: 6,
    type: "권한쿼리",
    prompt:
      "다음 작업을 수행하는 SQL을 작성하시오.\n(1) Oracle에서 사용자 hong을 암호 'DBsec0602#'로 생성하고 로그인 권한 부여\n(2) MySQL에서 localhost의 사용자 kim을 암호 'Secure123!'로 생성",
    modelAnswer:
      "(1) Oracle\n```sql\nCREATE USER hong IDENTIFIED BY \"DBsec0602#\";\nGRANT CREATE SESSION TO hong;\n```\n→ 사용자 생성만으로는 접속 권한이 없으므로 CREATE SESSION 권한을 함께 부여해야 한다.\n\n(2) MySQL\n```sql\nCREATE USER 'kim'@'localhost' IDENTIFIED BY 'Secure123!';\nFLUSH PRIVILEGES;\n```",
    tags: ["CREATE USER", "GRANT", "Oracle", "MySQL"],
  },
  {
    id: "mid-w06-q04",
    scope: "midterm",
    week: 6,
    type: "권한쿼리",
    prompt:
      "역할(Role) 기반 권한 부여의 3단계를 SQL과 함께 쓰고, 각 단계의 수행 주체를 밝히시오.",
    modelAnswer:
      "**① 역할 생성 (DBA 수행)**\n```sql\nCREATE ROLE role_1;\n```\n**② 역할에 권한 부여 (객체 소유자 수행)**\n```sql\nGRANT SELECT, INSERT, DELETE ON 고객 TO role_1;\n```\n**③ 사용자에게 역할 부여**\n```sql\nGRANT role_1 TO Hong, Park, Lee;\n```",
    tags: ["ROLE", "RBAC", "GRANT"],
  },
  {
    id: "mid-w06-q05",
    scope: "midterm",
    week: 6,
    type: "비교서술",
    prompt:
      "변경(INSERT/UPDATE/DELETE)이 불가능한 뷰(View)의 조건 6가지를 쓰시오.",
    modelAnswer:
      "다음 중 하나라도 해당하면 뷰를 통한 변경이 불가능하다.\n**①** 기본 테이블의 **기본키**를 구성하는 속성이 포함되지 않은 뷰\n**②** 기본 테이블에서 **NOT NULL**로 지정된 속성이 포함되지 않은 뷰\n**③** **집계 함수**로 새로 계산된 내용을 포함하는 뷰\n**④** **DISTINCT**를 포함하여 정의한 뷰\n**⑤** **GROUP BY** 절을 포함하여 정의한 뷰\n**⑥** **여러 개의 테이블을 조인**하여 정의한 뷰",
    tags: ["View", "변경 불가능한 뷰"],
    grading: {
      must: ["기본키", "NOT NULL", "집계 함수", "DISTINCT", "GROUP BY", "조인"],
    },
  },
  {
    id: "mid-w06-q06",
    scope: "midterm",
    week: 6,
    type: "비교서술",
    prompt: "뷰(View)의 장점 3가지를 쓰시오.",
    modelAnswer:
      "**① 질의어 간소화**: 복잡한 질의를 뷰로 만들어 간단히 조회할 수 있다.\n**② 데이터 보안**: 사용자에게 필요한 부분만 노출하여 민감 데이터를 보호한다.\n**③ 논리적 데이터 독립성**: 기본 테이블 구조가 바뀌어도 뷰를 통해 일관된 형태로 데이터를 제공할 수 있다.\n\n(단점: 가상 테이블이므로 갱신에 제약이 있고, ALTER로 뷰 정의를 변경할 수 없다.)",
    tags: ["View", "뷰 장점"],
    grading: {
      must: ["질의어 간소화", "데이터 보안", "논리적 데이터 독립성"],
      bonus: ["민감", "노출"],
      synonyms: {
        "질의어 간소화": ["질의 간소화", "복잡한 질의"],
        "논리적 데이터 독립성": ["논리적 독립성"],
      },
    },
  },
  {
    id: "mid-w06-q07",
    scope: "midterm",
    week: 6,
    type: "비교서술",
    prompt:
      "데이터베이스 감사(Auditing)의 3가지 유형을 설명하시오.",
    modelAnswer:
      "**① 로그인 감사(Login Auditing)**: 사용자의 로그인·로그인 시도를 감사.\n**② 행동 감사(Action Auditing)**: 특정 질의문(CREATE, INSERT 등)의 실행을 감사. 권한 검사 성격.\n**③ 객체 감사(Object Auditing)**: 특정 객체에 실행되는 질의문을 감사. 행동 감사와 유사하나 초점이 '행동'이 아닌 '객체'에 있다.\n\n참고: Oracle의 AUDIT_TRAIL 파라미터 값(NONE/DB/OS)으로 감사 기록 위치를 정한다.",
    tags: ["감사", "Auditing", "AUDIT_TRAIL"],
    grading: {
      must: ["로그인 감사", "행동 감사", "객체 감사"],
      bonus: ["질의문", "AUDIT_TRAIL", "권한 검사"],
    },
  },
  {
    id: "mid-w06-q08",
    scope: "midterm",
    week: 6,
    type: "비교서술",
    prompt:
      "감사 옵션 BY SESSION과 BY ACCESS의 차이를 설명하시오.",
    modelAnswer:
      "**BY SESSION**: 한 세션에서 지정한 질의문을 여러 번 실행해도 **한 번만 기록**한다.\n**BY ACCESS**: 감사 대상 문장을 **실행할 때마다 매번 기록**한다.",
    tags: ["감사", "BY SESSION", "BY ACCESS"],
    grading: {
      must: ["BY SESSION", "BY ACCESS", "한 번만", "매번"],
      bonus: ["세션", "실행할 때마다"],
    },
  },
  {
    id: "mid-w06-q09",
    scope: "midterm",
    week: 6,
    type: "권한쿼리",
    prompt:
      "MySQL에서 사용자 'park'@'localhost'에게 kmooc 데이터베이스의 모든 테이블에 대한 모든 권한을 부여하는 SQL을 작성하시오.",
    modelAnswer:
      "```sql\nGRANT ALL PRIVILEGES ON kmooc.* TO 'park'@'localhost';\nFLUSH PRIVILEGES;\n```\n→ `*.*`는 전체 시스템, `kmooc.*`는 kmooc DB의 모든 테이블을 의미한다. MySQL의 ALL PRIVILEGES는 GRANT OPTION을 제외한 모든 권한을 부여한다.",
    tags: ["GRANT", "ALL PRIVILEGES", "MySQL"],
  },
];
