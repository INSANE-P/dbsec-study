// 9주차 — 접근제어 개요 · 식별/인증/인가 · DAC · ACM/ACL/Capability
// 문제 추가법은 week01.ts 상단 주석 참고. id 규칙: "fin-w09-qNN"
import type { Question } from "@/data/types";

export const week09: Question[] = [
  {
    id: "fin-w09-q01",
    scope: "final",
    week: 9,
    type: "약어정의",
    prompt:
      "접근제어 절차 3단계인 식별·인증·인가를 영문 용어와 함께 정의하고, 순서대로 설명하시오.",
    modelAnswer:
      "**① 식별(Identification)**: 시스템에 주체의 식별자(ID)를 제시하는 과정. 식별자는 유일해야 하고 공유되어서는 안 된다.\n\n**② 인증(Authentication)**: 제시된 주체가 본인이 맞는지(정보에 접근할 능력·자격이 있는지) 검증하는 과정.\n\n**③ 인가(Authorization)**: 인증된 주체에게 객체에 대한 사용 권한을 부여하는 과정. 어떤 행위(Action)를 수행할 권한이 있는지 판별한다.\n\n순서: 식별 → 인증 → 인가.",
    tags: ["식별", "인증", "인가", "Identification", "Authentication", "Authorization"],
    grading: {
      must: ["식별", "인증", "인가"],
      synonyms: {
        식별: ["identification"],
        인증: ["authentication"],
        인가: ["authorization", "권한 부여"],
      },
    },
  },
  {
    id: "fin-w09-q02",
    scope: "final",
    week: 9,
    type: "약어정의",
    prompt:
      "접근제어 수행의 3요소를 쓰고 각각을 설명하시오. (주체·객체·접근권한)",
    modelAnswer:
      "**① 주체(Subject; S)**: 객체에 접근할 수 있는 대상. 모든 사용자·시스템·응용 프로그램의 프로세스 등.\n**② 객체(Object; O)**: 주체가 접근·사용하려는 대상. 데이터(DB)·서버·파일·응용 프로그램 등.\n**③ 접근 권한(Access Right)**: 특정 주체가 특정 객체에 접근하는 방법을 지정한 것. 읽기(R)·쓰기(W)·실행(X)·삭제(D)·생성(C) 등.",
    tags: ["주체", "객체", "접근권한"],
  },
  {
    id: "fin-w09-q03",
    scope: "final",
    week: 9,
    type: "약어정의",
    prompt:
      "임의적 접근제어 DAC의 풀네임과 개념을 설명하고, 다른 명칭과 대표적인 취약점을 쓰시오.",
    modelAnswer:
      "**DAC** = Discretionary Access Control (임의적 접근제어)\n\n접근을 요청하는 사용자의 **신분(Identity)** 및 접근 규칙에 기반하는 접근제어. 객체의 소유자가 자신의 판단(Discretion)에 따라 임의로 권한을 부여·회수할 수 있다. 신분에 기반하므로 **IBAC(Identity-Based Access Control)**라고도 한다.\n\n**취약점**: 소유자가 임의로 권한을 줄 수 있어 보안성이 약하고, 신분 도용 시 치명적이다. 특히 응용프로그램에 내장된 **트로이 목마(Trojan Horse)** 공격으로부터 데이터를 보호하지 못한다.",
    tags: ["DAC", "IBAC", "Trojan Horse"],
  },
  {
    id: "fin-w09-q04",
    scope: "final",
    week: 9,
    type: "ACM",
    prompt:
      "아래 접근제어행렬(ACM)을 참고하여 답하시오.\n(1) ACM(접근제어행렬)이 무엇인지 설명\n(2) ACL(접근제어목록)을 설명하고, 객체 File B의 ACL을 작성\n(3) 권한목록(Capability List)을 설명하고, 주체 Alice의 Capability List를 작성",
    table: {
      name: "ACM (행=주체, 열=객체)",
      columns: ["주체＼객체", "File A", "File B", "Program1"],
      rows: [
        ["Alice", "R", "W", "R"],
        ["Bob", "-", "R", "RWX"],
        ["Program1", "R", "W", "-"],
      ],
      note: "R=읽기, W=쓰기, X=실행, -=권한없음",
    },
    modelAnswer:
      "**(1) ACM(Access Control Matrix, 접근제어행렬)**: 모든 주체(행)와 객체(열)에 대한 권한 관계를 2차원 배열(행렬)로 표현한 개념적 모델. 실제 구현 시 ACL 또는 Capability List로 변환한다.\n\n**(2) ACL(Access Control List, 접근제어목록)**: **객체 중심**으로, 한 객체에 접근 가능한 주체들을 (주체, 권한) 리스트로 표현하는 방법.\nFile B의 ACL = [(Alice, W), (Bob, R), (Program1, W)]\n\n**(3) Capability List(권한목록)**: **주체 중심**으로, 한 주체가 접근 가능한 객체들을 (객체, 권한) 리스트로 표현하는 방법.\nAlice의 Capability List = [(File A, R), (File B, W), (Program1, R)]",
    tags: ["ACM", "ACL", "Capability List", "접근제어행렬"],
  },
  {
    id: "fin-w09-q05",
    scope: "final",
    week: 9,
    type: "ACM",
    prompt:
      "위 ACM(week09-q04와 동일)에서 'Bob'과 'Program1'의 관계를 서술하고, 이 ACM이 가진 보안상 문제점과 해결방안을 제시하시오.",
    table: {
      name: "ACM (행=주체, 열=객체)",
      columns: ["주체＼객체", "File A", "File B", "Program1"],
      rows: [
        ["Alice", "R", "W", "R"],
        ["Bob", "-", "R", "RWX"],
        ["Program1", "R", "W", "-"],
      ],
      note: "R=읽기, W=쓰기, X=실행, -=권한없음",
    },
    modelAnswer:
      "**Bob과 Program1의 관계**: Bob은 주체이고 Program1은 객체이며, Bob은 Program1에 대해 읽기·쓰기·실행(RWX) 권한을 모두 가진다.\n\n**보안상 문제점**: Bob은 File A에 아무 권한이 없고 File B에는 읽기 권한만 있다. 그러나 Bob이 Program1에 RWX 권한을 가지고 있고, Program1이 File A를 읽고(R) File B에 쓸 수(W) 있으므로, Bob은 Program1을 통해 **간접적으로** File A를 읽고 File B에 쓸 수 있게 된다(권한 상속/우회 문제).\n\n**해결방안**: 권한 상속을 명시적으로 통제할 수 있는 **역할 기반 접근제어(RBAC)**를 도입하여 해결한다.",
    tags: ["ACM", "권한 상속", "RBAC"],
  },
  {
    id: "fin-w09-q06",
    scope: "final",
    week: 9,
    type: "비교서술",
    prompt:
      "ACL(접근제어목록)과 Capability List(권한목록)의 차이를 중심(기준)과 표현 형식 관점에서 비교하시오.",
    modelAnswer:
      "| 구분 | ACL | Capability List |\n|---|---|---|\n| 중심(기준) | **객체 중심** | **주체 중심** |\n| 표현 | 객체별로 (주체, 권한) 리스트 | 주체별로 (객체, 권한) 리스트 |\n| 단점 | 한 객체에 주체가 많으면 리스트가 길어져 탐색 시간 증가 | 한 주체가 접근할 객체가 많으면 탐색 시간 증가 |\n\n둘 다 ACM(접근제어행렬)을 실제로 구현하는 방법이며, Capability List는 토큰(Token)이라고도 한다.",
    tags: ["ACL", "Capability List"],
  },
  {
    id: "fin-w09-q07",
    scope: "final",
    week: 9,
    type: "보안서술",
    prompt:
      "DAC(임의적 접근제어)의 장점과 단점을 각각 서술하시오.",
    modelAnswer:
      "**장점**\n- 필요에 따라 유연하게 접근제어 가능(융통성)\n- 구현이 용이하고 사용이 간단\n- 객체별로 세분화된 접근제어 가능\n\n**단점**\n- 객체 소유자가 임의로 권한을 허용하므로 보안성이 취약\n- 엄격한 접근제어가 어려움\n- 다른 주체의 신분 도용 시 중대한 결함(권한 탈취 시 소유 객체 전체 접근권 획득). 예) root 권한 탈취 시 시스템 전체 장악.",
    tags: ["DAC", "장단점"],
  },
];
