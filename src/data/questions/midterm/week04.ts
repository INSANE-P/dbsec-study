// 4주차 — SQL 상세 · DDL/DML/DCL 문법 · GRANT/REVOKE (권한)
// 문제 추가법은 week01.ts 상단 주석 참고. id 규칙: "mid-w04-qNN"
import type { Question } from "@/data/types";

export const week04: Question[] = [
  {
    id: "mid-w04-q01",
    scope: "midterm",
    week: 4,
    type: "쿼리작성",
    prompt:
      "고객(고객아이디, 고객이름, 나이, 등급, 직업, 적립금) 테이블을 생성하는 CREATE TABLE 문을 작성하시오.\n조건: 고객아이디는 기본키, 고객이름은 NULL 불가, 나이는 20 이상(CHECK).",
    modelAnswer:
      "```sql\nCREATE TABLE 고객 (\n  고객아이디 VARCHAR(20) NOT NULL,\n  고객이름   VARCHAR(20) NOT NULL,\n  나이       INT,\n  등급       VARCHAR(10),\n  직업       VARCHAR(20),\n  적립금     INT DEFAULT 0,\n  PRIMARY KEY(고객아이디),\n  CONSTRAINT CHK_AGE CHECK(나이 >= 20)\n);\n```",
    tags: ["CREATE TABLE", "DDL", "PRIMARY KEY", "CHECK"],
  },
  {
    id: "mid-w04-q02",
    scope: "midterm",
    week: 4,
    type: "쿼리작성",
    prompt:
      "제품(제품번호, 제품명, 재고량, 단가, 제조업체) 테이블에서, 제조업체별로 제품 수와 최고 단가를 구하되 제품이 3개 이상인 제조업체만 조회하는 SQL을 작성하시오.",
    modelAnswer:
      "```sql\nSELECT 제조업체, COUNT(*) AS 제품수, MAX(단가) AS 최고가\nFROM 제품\nGROUP BY 제조업체\nHAVING COUNT(*) >= 3;\n```\n\n포인트: 그룹 조건은 WHERE가 아니라 **HAVING**에 쓴다. 집계 함수(COUNT, MAX)는 WHERE 절에 사용할 수 없다.",
    tags: ["SELECT", "GROUP BY", "HAVING", "집계함수"],
  },
  {
    id: "mid-w04-q03",
    scope: "midterm",
    week: 4,
    type: "권한쿼리",
    prompt:
      "다음 상황에 맞는 권한 관리 SQL을 작성하시오.\n(1) 사용자 Park에게 고객 테이블의 등급·적립금 수정 권한 부여\n(2) Lee에게 고객 테이블 조회 권한을, 재부여 가능하도록 부여\n(3) Hong에게 부여했던 고객 테이블 SELECT 권한을 연쇄 취소",
    modelAnswer:
      "(1) ```sql\nGRANT UPDATE(등급, 적립금) ON 고객 TO Park;\n```\n\n(2) ```sql\nGRANT SELECT ON 고객 TO Lee WITH GRANT OPTION;\n```\n→ WITH GRANT OPTION: 부여받은 권한을 다른 사용자에게 다시 부여 가능.\n\n(3) ```sql\nREVOKE SELECT ON 고객 FROM Hong CASCADE;\n```\n→ CASCADE: Hong이 재부여한 사용자들의 권한까지 연쇄적으로 취소.",
    tags: ["GRANT", "REVOKE", "WITH GRANT OPTION", "CASCADE", "DCL"],
  },
  {
    id: "mid-w04-q04",
    scope: "midterm",
    week: 4,
    type: "비교서술",
    prompt:
      "REVOKE 문의 CASCADE와 RESTRICT 옵션의 차이를 설명하시오. (A→B→C로 권한이 전파된 상황 기준)",
    modelAnswer:
      "권한이 A → B → C로 전파(WITH GRANT OPTION)된 상황에서 A의 권한을 REVOKE 할 때:\n\n- **CASCADE**: A의 권한을 취소하면 그 권한에 의존하는 B, C의 권한까지 **연쇄적으로 모두 취소**된다.\n- **RESTRICT**: 취소하려는 권한이 다른 사용자에게 **전파된 적이 있으면 취소를 거부**한다(전파한 적 없을 때만 취소 가능).",
    tags: ["REVOKE", "CASCADE", "RESTRICT"],
  },
  {
    id: "mid-w04-q05",
    scope: "midterm",
    week: 4,
    type: "권한쿼리",
    prompt:
      "객체 권한 부여와 시스템 권한 부여의 차이를 설명하고, 시스템 권한 부여 SQL 예시를 작성하시오.",
    modelAnswer:
      "**객체 권한 부여**: 테이블·뷰 등 특정 객체에 대한 권한. **객체의 소유자**가 부여.\n예) `GRANT SELECT ON 고객 TO Kim;`\n\n**시스템 권한 부여**: CREATE TABLE 등 시스템 관리 작업 권한. **DBA**가 부여하며 객체를 지정하지 않는다.\n예) ```sql\nGRANT CREATE TABLE TO Song;\n```",
    tags: ["객체 권한", "시스템 권한", "GRANT"],
  },
  {
    id: "mid-w04-q06",
    scope: "midterm",
    week: 4,
    type: "쿼리작성",
    prompt:
      "주문(주문번호, 주문고객, 주문제품, 수량, 주문일자) 테이블에서 주문고객이 'apple'이거나 수량이 15 이상인 주문의 주문제품·수량·주문일자를 조회하는 SQL을 작성하시오.",
    modelAnswer:
      "```sql\nSELECT 주문제품, 수량, 주문일자\nFROM 주문\nWHERE 주문고객 = 'apple' OR 수량 >= 15;\n```",
    tags: ["SELECT", "WHERE", "OR"],
  },
  {
    id: "mid-w04-q07",
    scope: "midterm",
    week: 4,
    type: "쿼리작성",
    prompt:
      "LIKE 키워드의 와일드카드 `%`와 `_`의 차이를 설명하고, '데이터'로 시작하는 문자열을 검색하는 조건을 작성하시오.",
    modelAnswer:
      "**`%`**: 0개 이상의 임의 문자를 대체(문자 개수·내용 무관).\n**`_`**: 정확히 1개의 임의 문자를 대체.\n\n'데이터'로 시작하는 문자열 검색:\n```sql\nWHERE 컬럼 LIKE '데이터%';\n```\n참고: `'데이터___'` 처럼 쓰면 '데이터'로 시작하는 6자 길이 문자열을 의미한다. LIKE는 문자열 조건에만 사용한다.",
    tags: ["LIKE", "와일드카드", "SELECT"],
  },
  {
    id: "mid-w04-q08",
    scope: "midterm",
    week: 4,
    type: "비교서술",
    prompt:
      "집계 함수(Aggregate Function) 사용 시 주의해야 할 점 3가지를 쓰시오.",
    modelAnswer:
      "**① NULL 값은 제외**하고 계산한다.\n**② WHERE 절에는 사용할 수 없다.** SELECT 또는 HAVING 절에서만 사용 가능하다.\n**③ COUNT를 제외**한 SUM/AVG/MAX/MIN은 숫자형 데이터에만 적용된다(COUNT는 모든 타입 가능).",
    tags: ["집계함수", "COUNT", "HAVING"],
  },
  {
    id: "mid-w04-q09",
    scope: "midterm",
    week: 4,
    type: "권한쿼리",
    prompt:
      "역할 기반(RBAC) 권한 부여를 위해 'Sales' 역할을 만들어 주문 테이블의 SELECT·INSERT 권한을 주고, 이를 Choi에게 부여하는 SQL을 작성하시오.",
    modelAnswer:
      "```sql\nCREATE ROLE Sales;\nGRANT SELECT, INSERT ON 주문 TO Sales;\nGRANT Sales TO Choi;\n```\n→ 역할에 권한을 묶어 두고 사용자에게 역할을 부여하면, 여러 권한을 효율적으로 관리할 수 있다.",
    tags: ["ROLE", "RBAC", "GRANT"],
  },
  {
    id: "mid-w04-q10",
    scope: "midterm",
    week: 4,
    type: "비교서술",
    prompt: "PRIMARY KEY와 UNIQUE의 공통점과 차이점을 설명하시오.",
    modelAnswer:
      "**공통점**: 둘 다 각 튜플을 유일하게 식별하며 중복 값을 허용하지 않는다.\n\n**차이점**: \n- PRIMARY KEY(기본키)는 **NULL을 허용하지 않으며** 테이블당 하나만 지정 가능.\n- UNIQUE(대체키)는 **NULL을 허용하며** 여러 개 지정 가능.",
    tags: ["PRIMARY KEY", "UNIQUE", "기본키"],
  },
  {
    id: "mid-w04-q11",
    scope: "midterm",
    week: 4,
    type: "쿼리작성",
    prompt:
      "고객(고객아이디, 고객이름, 나이, 등급, 직업, 적립금) 테이블에 대해 다음 SQL을 작성하시오.\n(1) 새 고객 ('strawberry', '최유경', 30, 'vip', '공무원', 100) 삽입\n(2) 고객아이디가 'apple'인 고객의 등급을 'gold'로 수정\n(3) 적립금이 0인 고객 삭제",
    modelAnswer:
      "(1) ```sql\nINSERT INTO 고객(고객아이디, 고객이름, 나이, 등급, 직업, 적립금)\nVALUES ('strawberry', '최유경', 30, 'vip', '공무원', 100);\n```\n\n(2) ```sql\nUPDATE 고객 SET 등급 = 'gold' WHERE 고객아이디 = 'apple';\n```\n\n(3) ```sql\nDELETE FROM 고객 WHERE 적립금 = 0;\n```\n\n주의: UPDATE·DELETE에서 WHERE를 빠뜨리면 모든 튜플이 수정·삭제된다.",
    tags: ["INSERT", "UPDATE", "DELETE", "DML"],
  },
];
