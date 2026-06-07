// 7주차 — 사용자 인증 · 접근통제(뷰/SQL) · 취약점 분석·점검
// 문제 추가법은 week01.ts 상단 주석 참고. id 규칙: "mid-w07-qNN"
import type { Question } from "@/data/types";

export const week07: Question[] = [
  {
    id: "mid-w07-q01",
    scope: "midterm",
    week: 7,
    type: "비교서술",
    prompt:
      "사용자 인증의 4가지 요소를 'What you ~' 표현, 개념, 예시와 함께 정리하시오.",
    modelAnswer:
      "| 인증 요소 | 표어 | 예시 |\n|---|---|---|\n| 지식 기반(Knowledge) | What you know | 패스워드, PIN, 캡차(CAPTCHA) |\n| 소유 기반(Possession) | What you have | OTP, 보안카드, 토큰, 열쇠 |\n| 존재 기반(Inherence) | What you are | 지문, 홍채, 얼굴, DNA |\n| 행위 기반(Behavior) | What you do | 서명, 음성, 걸음걸이, 키 입력 속도 |\n\n두 개 이상의 요소를 함께 쓰면 **다중 인증(MFA, Multi-Factor Authentication)**이다.",
    tags: ["인증", "지식기반", "소유기반", "존재기반", "행위기반", "MFA"],
    grading: {
      must: ["지식", "소유", "존재", "행위"],
      bonus: ["What you know", "패스워드", "OTP", "지문", "MFA"],
    },
  },
  {
    id: "mid-w07-q02",
    scope: "midterm",
    week: 7,
    type: "약어정의",
    prompt:
      "다음 약어의 풀네임과 의미를 작성하시오.\n(1) MFA  (2) OTP  (3) CAPTCHA",
    modelAnswer:
      "(1) **MFA** = Multi-Factor Authentication (다중 인증 요소 기반 인증)\n→ 인증 요소를 두 개 이상 사용하여 보안성을 높이는 방식.\n\n(2) **OTP** = One-Time Password (일회용 비밀번호)\n→ 소유 기반 인증 수단으로, 매번 새로운 일회성 패스워드를 사용.\n\n(3) **CAPTCHA** = Completely Automated Public Turing test to tell Computers and Humans Apart\n→ 사람과 봇을 구별하기 위한 지식 기반 인증 수단.",
    tags: ["MFA", "OTP", "CAPTCHA", "약어"],
  },
  {
    id: "mid-w07-q03",
    scope: "midterm",
    week: 7,
    type: "비교서술",
    prompt:
      "위협(Threat)과 취약점(Vulnerability)의 차이를 설명하고, 각각을 어떻게 다루어야 하는지 서술하시오.",
    modelAnswer:
      "**위협(Threat)**: 자산(DB)에 손실을 발생시킬 수 있는 모든 원인이나 행위. → **100% 제거가 불가능**하므로 최소화하는 것이 최선이다.\n\n**취약점(Vulnerability)**: 위협이 손실을 입히기 위해 이용하는, 자산이 가진 약점. → **제거가 가능**하므로 분석·점검을 통해 제거하는 과정이 필수이다.",
    tags: ["위협", "취약점", "Threat", "Vulnerability"],
  },
  {
    id: "mid-w07-q04",
    scope: "midterm",
    week: 7,
    type: "보안서술",
    prompt:
      "데이터베이스 취약점 분석의 3단계를 순서대로 설명하시오.",
    modelAnswer:
      "**① 취약점 분석**: 분석 설계(분석 대상 DB 선정·조사하여 수행 범위 결정 — 가장 기초적·중요) + 분석 구축(점검 항목·방법 결정, 내부 보안 감사 또는 모의 해킹 선택).\n\n**② 취약점 점검**: 선정한 범위·방법대로 실제 점검을 수행하고 분석 보고서를 통해 보안 조치.\n\n**③ 취약점 발견 및 제거**: 점검에서 발견된 취약점을 제거한다.",
    tags: ["취약점 분석", "분석 설계", "분석 구축"],
  },
  {
    id: "mid-w07-q05",
    scope: "midterm",
    week: 7,
    type: "비교서술",
    prompt:
      "취약점 분석 구축의 두 방향인 모의 해킹과 내부 보안 감사의 차이를 설명하시오.",
    modelAnswer:
      "**모의 해킹(Penetration Test)**: **외부 사용자**의 침해 공격을 시뮬레이션하여 취약점·공격 경로를 검출. 예) 버퍼 오버플로, DoS, Password Attack, TNS Attack.\n\n**내부 보안 감사(Security Auditing)**: DB가 보안상 안전하게 운영되는지 **내부 관점**에서 점검. 잘 알려진 취약점 존재 여부, 사용자 역할·권한·패스워드 구성의 적절성 검토.",
    tags: ["모의 해킹", "내부 보안 감사", "Penetration Test"],
  },
  {
    id: "mid-w07-q06",
    scope: "midterm",
    week: 7,
    type: "권한쿼리",
    prompt:
      "특정 컬럼만 권한을 제어하는 다음 상황의 SQL을 작성하시오.\n(1) Lee가 고객 테이블에서 나이·등급·직업·적립금만 조회 가능(고객이름·고객아이디는 불가)\n(2) Lee가 나이·등급·고객아이디 조회 + 등급 수정 가능",
    modelAnswer:
      "(1) ```sql\nGRANT SELECT(나이, 등급, 직업, 적립금) ON 고객 TO Lee;\n```\n(2) ```sql\nGRANT SELECT(나이, 등급, 고객아이디), UPDATE(등급) ON 고객 TO Lee;\n```\n→ GRANT는 컬럼 단위로 SELECT/UPDATE 권한을 세분화해 부여할 수 있다.",
    tags: ["GRANT", "컬럼 권한", "SELECT", "UPDATE"],
  },
  {
    id: "mid-w07-q07",
    scope: "midterm",
    week: 7,
    type: "쿼리작성",
    prompt:
      "주문 테이블에서 주문일자가 2022-01-01 ~ 2022-03-30 사이이면서 수량이 20 이상인 주문의 주문고객·주문제품·배송지를 보여주는 뷰 '고객감사이벤트'를 생성하시오. (조건 위반 데이터 삽입 방지 포함)",
    modelAnswer:
      "```sql\nCREATE VIEW 고객감사이벤트\nAS SELECT 주문고객, 주문제품, 배송지\nFROM 주문\nWHERE 주문일자 BETWEEN '2022-01-01' AND '2022-03-30'\n  AND 수량 >= 20\nWITH CHECK OPTION;\n```\n→ **WITH CHECK OPTION**: 뷰를 통한 INSERT/UPDATE 시 WHERE 조건을 위반하는 데이터의 삽입·수정을 막는다.",
    tags: ["CREATE VIEW", "WITH CHECK OPTION", "BETWEEN"],
  },
  {
    id: "mid-w07-q08",
    scope: "midterm",
    week: 7,
    type: "비교서술",
    prompt:
      "DBMS 사용자 인증 방식 3가지(패스워드/OS/네트워크 인증)를 간단히 설명하시오.",
    modelAnswer:
      "**① 패스워드 기반 인증**: 지식 기반 인증으로 모든 DBMS가 기본 제공.\n**② OS 인증**: 운영체제의 사용자 정보를 통해 인증(Oracle, MSSQL 제공).\n**③ 네트워크 인증**: 네트워크 서버 접속 시 인증 정보의 유효성을 판단. 대표 예가 **커버로스(Kerberos)** 인증으로, 사용 가능한 서비스 정보를 담은 토큰을 이용한다(Oracle, MySQL 지원).",
    tags: ["DBMS 인증", "OS 인증", "네트워크 인증", "Kerberos"],
  },
];
