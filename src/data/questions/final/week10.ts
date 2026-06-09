// 10주차 — MAC(BLP/Biba) · RBAC · ABAC + 4대 접근제어 모델 비교
// 문제 추가법은 week01.ts 상단 주석 참고. id 규칙: "fin-w10-qNN"
import type { Question } from "@/data/types";

export const week10: Question[] = [
  {
    id: "fin-w10-q01",
    scope: "final",
    week: 10,
    type: "비교서술",
    prompt:
      "★ 접근제어 모델 DAC / MAC / RBAC / ABAC를 비교 설명하시오. (개념·판단 기준·장점·단점 포함, 4개 비교표 필수)",
    modelAnswer:
      "| 모델 | 판단 기준 | 개념 | 장점 | 단점 |\n|---|---|---|---|---|\n| **DAC** (임의적) | 사용자 신분(Identity) | 객체 소유자가 임의로 권한 부여 | 구현 용이, 유연함, 세분화 가능 | 보안성 취약, 신분 도용/트로이목마에 취약 |\n| **MAC** (강제적) | 주체·객체의 보안 등급 | 중앙 관리자가 등급 기반으로 강제 통제 | 높은 보안성, 중앙 집중 관리 | 구현 어려움, 사용자 기능 제한, 관리 부담, 상업 환경 부적합 |\n| **RBAC** (역할 기반) | 주체의 역할(Role) | 역할에 권한을 묶어 사용자에게 부여 | 효율적 권한 관리, 정교함·유연성 | 역할 폭발(Role Explosion) 발생 가능 |\n| **ABAC** (속성 기반) | 주체·객체의 속성 + 환경 | 속성 조건으로 동적으로 접근 결정 | 세밀·동적 제어, 분산/변화 환경 적합 | 속성 관리 부담, 인가 결정 비용 높음 |\n\n핵심 차이: DAC=신분, MAC=보안등급, RBAC=역할, ABAC=속성. DAC/MAC/RBAC는 고정 자원 모델이고 ABAC는 동적 환경에 적합하다.",
    tags: ["DAC", "MAC", "RBAC", "ABAC", "비교"],
    grading: {
      must: ["신분", "보안 등급", "역할", "속성"],
      bonus: ["DAC", "MAC", "RBAC", "ABAC"],
      synonyms: { "보안 등급": ["보안등급", "등급"] },
    },
  },
  {
    id: "fin-w10-q02",
    scope: "final",
    week: 10,
    type: "약어정의",
    prompt:
      "★ RBAC, ABAC 접근제어 모델의 full name과 장단점을 설명하시오.",
    modelAnswer:
      "**RBAC** = Role-Based Access Control (역할 기반 접근 제어)\n→ 사용자가 속한 역할에 따라 접근 권한을 결정하는 방식.\n- 장점: 역할에 권한을 묶어 부여/회수하므로 효율적인 권한 관리가 가능하다.\n- 단점: 역할의 수가 많아지면 **역할 폭발(Role Explosion)** 현상이 발생하여 세밀한 접근 제어가 어려워질 수 있다.\n\n**ABAC** = Attribute-Based Access Control (속성 기반 접근 제어)\n→ 객체(자원)와 주체의 속성에 대한 조건을 토대로 접근제어를 수행하며 동적인 환경 조건을 가진다.\n- 장점: 객체·주체 속성을 고려한 세밀한 접근 제어가 가능하다.\n- 단점: 속성의 주기적·개별적 관리가 필요하고, 인가 여부 결정 과정에서 높은 성능 비용이 발생할 수 있다.",
    tags: ["RBAC", "ABAC", "역할 폭발"],
    grading: {
      must: ["Role-Based Access Control", "Attribute-Based Access Control", "역할", "속성"],
      bonus: ["역할 폭발", "세밀"],
      synonyms: {
        "역할 폭발": ["role explosion", "역할폭발"],
      },
    },
  },
  {
    id: "fin-w10-q03",
    scope: "final",
    week: 10,
    type: "비교서술",
    prompt:
      "MAC의 대표 모델인 BLP 모델과 Biba 모델을 비교하시오. (중점·읽기/쓰기 규칙 포함)",
    modelAnswer:
      "| 구분 | BLP 모델 | Biba 모델 |\n|---|---|---|\n| 중점 | **기밀성**(Confidentiality) | **무결성**(Integrity) |\n| 개발 | 1973, Bell & LaPadula | 1975, Biba |\n| 단순 속성(읽기) | **No Read Up** — 주체 등급 ≥ 객체 등급일 때 읽기 가능 | **No Read Down** — 주체 등급 ≤ 객체 등급일 때 읽기 가능 |\n| 성형(★) 속성(쓰기) | **No Write Down** — 주체 등급 ≤ 객체 등급일 때 쓰기 가능 | **No Write Up** — 주체 등급 ≥ 객체 등급일 때 쓰기 가능 |\n| 주 사용처 | 군·국방 | 금융권 |\n\n핵심: BLP는 'No Read Up / No Write Down'(기밀성), Biba는 그 반대인 'No Read Down / No Write Up'(무결성)이다. 부등호 방향이 정반대.",
    tags: ["BLP", "Biba", "MAC", "No Read Up", "No Write Down"],
    grading: {
      must: ["기밀성", "무결성", "No Read Up", "No Write Down", "No Read Down", "No Write Up"],
      synonyms: {
        "No Read Up": ["nru", "상위 읽기 금지"],
        "No Write Down": ["nwd", "하위 쓰기 금지"],
        "No Read Down": ["nrd", "하위 읽기 금지"],
        "No Write Up": ["nwu", "상위 쓰기 금지"],
      },
    },
  },
  {
    id: "fin-w10-q04",
    scope: "final",
    week: 10,
    type: "약어정의",
    prompt:
      "강제적 접근제어 MAC의 개념과 주요 특징을 설명하고, 다른 명칭을 쓰시오.",
    modelAnswer:
      "**MAC** = Mandatory Access Control (강제적 접근제어)\n\n주체·객체의 보안 분류 등급에 기반하여, 미리 정해진 정책에 따라 주체의 접근 권한과 객체의 허용 등급을 비교하여 접근을 제어한다. 중앙 집권적 관리자가 등급을 강제로 부여하며, 낮은 등급 주체가 높은 등급 객체에 접근하는 것을 제한한다. **규칙 기반 접근제어(Rule-Based Access Control)**라고도 한다.\n\n특징: 보안 등급 기반, 접근 규칙 수가 적어 통제 용이, 등급/규칙은 관리자만 수정 가능, 기밀성이 강조되는 조직에서 사용.",
    tags: ["MAC", "강제적 접근제어", "규칙 기반"],
    grading: {
      must: ["Mandatory Access Control", "보안 등급", "강제", "Rule-Based Access Control"],
      bonus: ["중앙", "관리자", "기밀성"],
      synonyms: {
        "보안 등급": ["보안등급", "등급"],
        강제: ["강제적"],
      },
    },
  },
  {
    id: "fin-w10-q05",
    scope: "final",
    week: 10,
    type: "보안서술",
    prompt:
      "RBAC의 '역할 폭발(Role Explosion)'이 무엇이며 왜 발생하는지 설명하시오.",
    modelAnswer:
      "**역할 폭발(Role Explosion)**: 조직·시스템이 커지면서 역할의 수가 기하급수적으로 증가하여 역할 관리가 사실상 불가능해지는 상태.\n\n발생 원인: 역할 단위로 권한을 부여하다 보면, 기존 역할과 권한이 약간만 다른 새로운 요구가 생길 때마다 역할을 새로 정의해야 한다. (예: Role1과 90% 권한이 같지만 그대로 쓰면 10%의 과도한 권한이 부여되므로 역할을 재정의) 이런 미세한 차이마다 역할이 늘어나 폭발적으로 증가한다.",
    tags: ["RBAC", "역할 폭발", "Role Explosion"],
    grading: {
      must: ["역할", "수", "증가", "관리"],
      bonus: ["기하급수", "재정의", "세밀"],
      synonyms: {
        역할: ["role"],
        증가: ["폭발", "늘어"],
      },
    },
  },
  {
    id: "fin-w10-q06",
    scope: "final",
    week: 10,
    type: "비교서술",
    prompt:
      "임무분리(SoD)는 두 종류로 나뉜다. 각각의 명칭(약어)을 쓰고, 둘의 차이를 설명하시오.",
    modelAnswer:
      "**SoD** = Separation of Duty (임무분리)\n\n- **SSD(Static Separation of Duty, 정적 임무분리)**: 한 사용자가 상호 배타적인 두 개 이상의 역할에 **아예 배정되지 못하도록** 막는다. (예: 출납과 회계 역할을 동시에 가질 수 없음)\n- **DSD(Dynamic Separation of Duty, 동적 임무분리)**: 두 역할에 배정은 **가능하지만**, 한 세션에서 **동시에 활성화(사용)할 수 없도록** 막는다.",
    tags: ["SoD", "SSD", "DSD", "임무분리"],
    grading: {
      must: ["Separation of Duty", "정적", "동적", "배정", "활성화"],
      bonus: ["SSD", "DSD", "세션", "배타적"],
      synonyms: {
        정적: ["static", "ssd"],
        동적: ["dynamic", "dsd"],
        활성화: ["사용"],
      },
    },
  },
  {
    id: "fin-w10-q07",
    scope: "final",
    week: 10,
    type: "비교서술",
    prompt:
      "RBAC와 ABAC를 비교하여, ABAC가 RBAC보다 우수한 점을 설명하시오.",
    modelAnswer:
      "**RBAC**: 역할 기반으로 큰 틀의 접근제어. 특정 시간·요일에만 접근하도록 설정하기 어렵고, 환경에 따라 역할을 동적으로 변화시키기 어렵다.\n\n**ABAC**: 속성과 환경 조건 기반으로 세밀한 접근제어. 특정 시간·요일에만 접근 허용(예: 09~18시), 분산·빠르게 변화하는 환경에 동적으로 적응 가능하다.\n\n→ 실무에서는 RBAC(큰 틀)에 ABAC(세부 제어)를 조합해 사용하기도 한다. ABAC는 XACML(eXtensible Access Control Markup Language)을 통해 다양한 응용에서 활용된다.",
    tags: ["RBAC", "ABAC", "XACML"],
    grading: {
      must: ["역할", "속성", "환경", "동적"],
      bonus: ["시간", "분산", "세밀", "XACML"],
      synonyms: {
        역할: ["role"],
        속성: ["attribute"],
        환경: ["환경 조건"],
      },
    },
  },
  {
    id: "fin-w10-q08",
    scope: "final",
    week: 10,
    type: "보안서술",
    prompt:
      "ABAC의 핵심 요소를 쓰고 각각을 설명한 뒤, 병원 의료정보 접근 예시를 들어 동작을 서술하시오.",
    modelAnswer:
      "**ABAC 요소**: 주체(Subject), 객체(Object=자원), 속성(Attribute, 핵심 요소), 환경 조건(시간·장소 등 동적 요소).\n\n**예시**: \"내과 소속이며 환자 A의 담당의인 주체가, 09~18시 사이에 A10호에 있을 때, 내과 환자 A의 의료정보를 읽을 수 있다\"는 정책에서\n- 주체 속성: 의사 = {내과, 환자 A 담당의}\n- 객체 속성: 의료정보 = {내과, 환자 A}\n- 환경 조건: 현재 11:10, 장소 A10호\n→ 모든 속성·조건이 정책을 만족하므로 접근 허용된다.",
    tags: ["ABAC", "속성", "환경 조건"],
    grading: {
      must: ["주체", "객체", "속성", "환경 조건"],
      bonus: ["시간", "장소", "동적", "정책"],
      synonyms: {
        주체: ["subject"],
        객체: ["object", "자원"],
        속성: ["attribute"],
        "환경 조건": ["환경", "environment"],
      },
    },
  },
];
