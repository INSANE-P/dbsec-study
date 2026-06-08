// 서술형 개념 카드 — 변환 설명·단계 정리 등 (빠른 암기용)
import type { InfoCard } from "./types";

export const TOPICS: InfoCard[] = [
  {
    id: "topic-acm-convert",
    title: "ACM → ACL / Capability List 변환",
    scope: "final",
    week: 9,
    body:
      "**ACM(접근제어행렬)**: 행=주체, 열=객체로 권한을 2차원 배열로 표현한 개념 모델. 실제 구현은 ACL 또는 Capability List로 한다.\n\n예시 ACM:\n\n| 주체＼객체 | File A | File B | Program1 |\n|---|---|---|---|\n| Alice | R | W | R |\n| Bob | - | R | RWX |\n\n**→ ACL (객체 중심, 열을 읽는다)**\n- File A: [(Alice, R), (Bob, -)]\n- File B: [(Alice, W), (Bob, R)]\n- Program1: [(Alice, R), (Bob, RWX)]\n\n**→ Capability List (주체 중심, 행을 읽는다)**\n- Alice: [(File A, R), (File B, W), (Program1, R)]\n- Bob: [(File A, -), (File B, R), (Program1, RWX)]\n\n암기 팁: **ACL=열(객체)**, **Capability=행(주체)**.",
  },
  {
    id: "topic-bigdata-5step",
    title: "★ 빅데이터 프라이버시 5단계 (수집→저장→분석→활용→폐기)",
    scope: "final",
    week: 14,
    body:
      "| 단계 | 문제 | 해결방안 |\n|---|---|---|\n| 1. 수집 | 무분별/과도 수집, 동의 없는 수집 | 옵트-인 동의, 동형 암호 등 PPDC |\n| 2. 저장 | 무결성 훼손, 내부자 유출, 가용성 위협 | 접근제어, 시스템 분산화, 보안 감사 |\n| 3. 분석 | 개인 식별 가능성 | 비식별화, 프라이버시 보존형 데이터 마이닝(PPDM) |\n| 4. 활용 | 재식별 위험 | K-익명성, l-다양성, T-근접성 |\n| 5. 폐기 | 데이터 잔존으로 유출 | 오버라이팅, 디가우싱 |",
  },
  {
    id: "topic-privacy-models",
    title: "K-익명성 → l-다양성 → T-근접성",
    scope: "final",
    week: 14,
    body:
      "**K-익명성**: 같은 준식별자 값을 가진 레코드가 최소 K개 이상 존재하도록 익명화 → 연결 공격(Linking) 방어.\n· 한계: 동질성 공격, 배경지식 공격\n\n**l-다양성**: 함께 익명화된 그룹이 최소 l개 이상 서로 다른 민감 정보를 갖도록 함 → 동질성 공격 방어.\n· 한계: 쏠림 공격, 유사성 공격\n\n**T-근접성**: 각 그룹의 민감 정보 분포가 전체 분포와 T 이하의 차이를 갖도록 → 쏠림·유사성 공격 방어.",
  },
  {
    id: "topic-deidentify",
    title: "비식별화 처리 기법 5가지",
    scope: "final",
    week: 14,
    body:
      "| 기법 | 예시 |\n|---|---|\n| 가명처리 | 홍길동 35세 → 임꺽정 30대 |\n| 총계처리 | 키 → 합 660cm, 평균 165cm |\n| 데이터 삭제 | 901206-1234567 → 90년대생 남자 |\n| 데이터 범주화 | 홍길동 35세 → 홍씨 30~40세 |\n| 데이터 마스킹 | 홍길동 → 홍OO, 한국대 → OO대학 |",
  },
  {
    id: "topic-grant-revoke",
    title: "SQL 권한 관리 — CREATE USER / GRANT / REVOKE",
    scope: "final",
    week: 12,
    body:
      "기말 단골 권한 관리 SQL 예시:\n\n```sql\n-- 사용자 생성\nCREATE USER user1 IDENTIFIED BY '1234';\n\n-- 권한 부여\nGRANT SELECT, INSERT ON student TO user1;\n\n-- 권한 회수\nREVOKE INSERT ON student FROM user1;\n```\n\n- **객체 권한**: `GRANT 권한 ON 객체 TO 사용자 [WITH GRANT OPTION]` — 객체 소유자가 부여\n- **시스템 권한**: `GRANT 권한 TO 사용자 [WITH ADMIN OPTION]` — DBA가 부여\n- **REVOKE CASCADE**: 전파된 권한까지 연쇄 취소 / **RESTRICT**: 전파된 적 있으면 거부",
  },
  {
    id: "topic-cia",
    title: "정보보안 3대 목표 CIA (+ 확장)",
    scope: "midterm",
    week: 5,
    body:
      "- **기밀성(Confidentiality)**: 허가된 사용자만 접근 (갈취 공격이 침해)\n- **무결성(Integrity)**: 데이터가 변경되지 않음 (수정 공격이 침해, Hash·MAC로 확인)\n- **가용성(Availability)**: 필요할 때 접근 가능 (DoS 공격이 침해)\n\n확장: **인증(Authentication)**, **부인 방지(Non-Repudiation)** 추가.",
  },
  {
    id: "topic-idauth",
    title: "식별 · 인증 · 인가 (접근제어 3절차)",
    scope: "final",
    week: 9,
    body:
      "- **식별(Identification)**: 시스템에 ID 제시 (유일·공유 금지)\n- **인증(Authentication)**: 제시한 주체가 본인이 맞는지 검증\n- **인가(Authorization)**: 인증된 주체에게 권한 부여, 어떤 행위를 할 수 있는지 판별\n\n[암기] 순서 = 식별 → 인증 → 인가",
  },
  {
    id: "topic-dac-trojan",
    title: "DAC의 트로이목마 취약점",
    scope: "final",
    week: 9,
    body:
      "[정의] DAC는 객체 소유자가 임의로 권한을 부여 → 신분 도용·**트로이목마(Trojan Horse)**에 취약\n\n응용프로그램에 숨은 악성코드(트로이목마)가 사용자 권한으로 실행되면, 사용자가 가진 권한 범위 내에서 데이터를 몰래 복사·유출할 수 있다. DAC는 이를 막지 못한다.\n[시험] 보완책 = 보안 등급으로 정보 흐름을 강제 통제하는 **MAC** 도입",
  },
  {
    id: "topic-pubkey",
    title: "공개키 암호 3용도 (키 방향)",
    scope: "final",
    week: 11,
    body:
      "| 용도 | 암호화 키 | 복호화 키 |\n|---|---|---|\n| 암호화/복호화 | 수신자 공개키 | 수신자 개인키 |\n| 디지털 서명 | 송신자 개인키 | 송신자 공개키 |\n| 키 분배 | 수신자 공개키 | 수신자 개인키 |\n\n[시험] **디지털 서명만 방향이 반대**(개인키로 서명 → 공개키로 검증)\n[정의] 대칭키 분배 문제: n명 → **n(n-1)/2개** 키 필요",
  },
  {
    id: "topic-keys",
    title: "키(Key)의 종류 5가지",
    scope: "midterm",
    week: 3,
    body:
      "- **슈퍼키**: 유일성만 만족\n- **후보키**: 유일성 + 최소성 만족\n- **기본키**: 후보키 중 대표로 선택 (NULL 불가, 중복 불가)\n- **대체키**: 기본키로 선택되지 못한 후보키\n- **외래키**: 다른 릴레이션의 기본키를 참조\n\n핵심: 슈퍼키 ⊃ 후보키. 차이는 **최소성**.",
  },
];
