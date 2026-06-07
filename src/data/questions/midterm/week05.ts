// 5주차 — 정보보안 CIA · DB보안 요구사항 · 접근제어 모델 개요 · 암호화
// 문제 추가법은 week01.ts 상단 주석 참고. id 규칙: "mid-w05-qNN"
import type { Question } from "@/data/types";

export const week05: Question[] = [
  {
    id: "mid-w05-q01",
    scope: "midterm",
    week: 5,
    type: "약어정의",
    prompt:
      "정보보안의 3대 목표를 의미하는 약어 CIA의 풀네임과 각 요소의 의미를 작성하시오.",
    modelAnswer:
      "**CIA** = Confidentiality · Integrity · Availability\n\n- **기밀성(Confidentiality)**: 허가된 사용자만 데이터에 접근하도록 보호하는 성질. (갈취·Interception 공격이 침해)\n- **무결성(Integrity)**: 데이터가 중간에 변경되지 않도록 하는 성질. (수정·Modification 공격이 침해, Hash·MAC로 확인)\n- **가용성(Availability)**: 필요할 때 언제나 접근 가능하도록 하는 성질. (서비스 거부·Interruption(DoS) 공격이 침해)\n\n확장 시 **인증(Authentication)**, **부인 방지(Non-Repudiation)**가 추가된다.",
    tags: ["CIA", "기밀성", "무결성", "가용성"],
    grading: {
      must: ["기밀성", "무결성", "가용성"],
      bonus: ["인증", "부인 방지"],
      synonyms: {
        기밀성: ["confidentiality"],
        무결성: ["integrity"],
        가용성: ["availability"],
      },
    },
  },
  {
    id: "mid-w05-q02",
    scope: "midterm",
    week: 5,
    type: "비교서술",
    prompt:
      "보안 4대 공격 유형(Interruption, Interception, Modification, Fabrication)과 각각 침해하는 보안 목표를 짝지으시오.",
    modelAnswer:
      "| 공격 유형 | 한글 | 침해 목표 |\n|---|---|---|\n| Interruption | 서비스 거부(DoS) | 가용성(Availability) |\n| Interception | 갈취 | 기밀성(Confidentiality) |\n| Modification | 수정 | 무결성(Integrity) |\n| Fabrication | 신분 위장 | 인증(Authentication) |\n\n참고: Fabrication Attack = Masquerade Attack(신분 위장 공격)으로도 불린다.",
    tags: ["공격유형", "Interruption", "Interception", "Modification", "Fabrication"],
    grading: {
      must: ["Interruption", "Interception", "Modification", "Fabrication"],
      bonus: ["가용성", "기밀성", "무결성", "인증"],
      synonyms: {
        가용성: ["availability"],
        기밀성: ["confidentiality"],
        무결성: ["integrity"],
        인증: ["authentication"],
      },
    },
  },
  {
    id: "mid-w05-q03",
    scope: "midterm",
    week: 5,
    type: "비교서술",
    prompt:
      "접근제어 모델 DAC/MAC/RBAC/ABAC의 기반(판단 기준)을 한 줄씩 정리하시오.",
    modelAnswer:
      "- **DAC(임의적 접근제어)**: 사용자의 **신분(Identity)** 및 접근 규칙에 기반. (= IBAC)\n- **MAC(강제적 접근제어)**: 주체·객체의 **보안 분류 등급**에 기반. (중앙 집권적 관리)\n- **RBAC(역할 기반 접근제어)**: 주체의 **역할(Role)**에 기반.\n- **ABAC(속성 기반 접근제어)**: 주체·객체의 **속성(Attribute)**과 동적 환경 조건에 기반.\n\nDAC/MAC/RBAC는 고정된 자원에 대한 모델이라 동적 환경에 부적합하고, 이를 보완한 것이 ABAC이다.",
    tags: ["DAC", "MAC", "RBAC", "ABAC"],
    grading: {
      must: ["DAC", "MAC", "RBAC", "ABAC"],
      bonus: ["신분", "보안 등급", "역할", "속성"],
    },
  },
  {
    id: "mid-w05-q04",
    scope: "midterm",
    week: 5,
    type: "보안서술",
    prompt:
      "데이터베이스 보안 위협 유형을 4가지 이상 서술하시오.",
    modelAnswer:
      "**① SW 구성 오류/취약점 악용**\n**② SQL/NoSQL 인젝션**\n**③ 서비스 거부(DoS/DDoS)**\n**④ 백업에 대한 공격**\n**⑤ 내부자(Insider) 위협** — 악의적 내부자 / 태만한 내부자 / 피싱으로 신임정보를 얻은 외부 잠입자\n**⑥ 데이터 유출 위협**\n**⑦ 기타** — 사용자 실수(DB 보안 사고 원인의 약 49%), 멀웨어",
    tags: ["DB보안 위협", "SQL 인젝션", "내부자 위협"],
    grading: {
      must: ["인젝션", "서비스 거부", "내부자", "데이터 유출"],
      bonus: ["백업", "멀웨어", "취약점"],
    },
  },
  {
    id: "mid-w05-q05",
    scope: "midterm",
    week: 5,
    type: "보안서술",
    prompt:
      "VIEW(뷰)를 이용한 접근 통제가 데이터 보안에 주는 장점을 서술하시오.",
    modelAnswer:
      "**뷰(View)**는 하나 이상의 테이블로부터 유도된 가상 테이블이다. 사용자 그룹별로 뷰를 만들어 해당 뷰에만 접근하도록 통제하면:\n\n- 사용자는 허가받은 뷰만 볼 수 있고 **원본 테이블에는 직접 접근할 수 없다.**\n- 특정 행·열만 노출하도록 설정하여 **민감 데이터를 숨길 수 있다.**\n- 결과적으로 필요한 정보만 제공하여 데이터 보안과 논리적 독립성을 동시에 확보한다.",
    tags: ["VIEW", "뷰 기반 접근통제"],
    grading: {
      must: ["뷰", "가상 테이블", "원본 테이블", "민감"],
      bonus: ["논리적 독립성", "행", "열"],
      synonyms: {
        뷰: ["view"],
      },
    },
  },
  {
    id: "mid-w05-q06",
    scope: "midterm",
    week: 5,
    type: "약어정의",
    prompt:
      "DB 보안 분야에서 약어 'MAC'은 두 가지 의미로 쓰인다. 각각을 풀네임과 함께 설명하시오.",
    modelAnswer:
      "**① MAC = Message Authentication Code (메시지 인증 코드)**\n→ 무결성을 보장하기 위한 기술. Hash와 함께 데이터 변경 여부를 확인하는 데 사용된다.\n\n**② MAC = Mandatory Access Control (강제적 접근제어)**\n→ 주체·객체의 보안 등급에 기반해 중앙 집권적으로 접근을 강제 통제하는 접근제어 모델.\n\n(같은 약어지만 문맥에 따라 의미가 완전히 다르므로 주의)",
    tags: ["MAC", "메시지 인증 코드", "강제적 접근제어"],
    grading: {
      must: ["Message Authentication Code", "Mandatory Access Control", "무결성", "보안 등급"],
      bonus: ["Hash", "중앙 집권"],
      synonyms: {
        "Message Authentication Code": ["메시지 인증 코드"],
        "Mandatory Access Control": ["강제적 접근제어"],
        무결성: ["integrity"],
      },
    },
  },
  {
    id: "mid-w05-q07",
    scope: "midterm",
    week: 5,
    type: "보안서술",
    prompt:
      "DB 보안에서 '추론(Inference)'이 무엇인지 설명하고, 운영적 무결성과 의미적 무결성의 차이를 쓰시오.",
    modelAnswer:
      "**추론(Inference)**: 직접 접근이 허용되지 않은 데이터를, 접근 가능한 다른 데이터들의 의미적 연관성을 이용해 알아내는 것. → 추론 방지가 필요하다.\n\n**운영적 무결성**: 트랜잭션의 병행 처리 중 데이터의 논리적 일관성을 보장(로킹 등 병행 제어 기법).\n**의미적 무결성**: 데이터의 허용 값을 통제하여 변경 데이터의 논리적 일관성을 보장(무결성 제약조건 — CHECK 구문 등).",
    tags: ["추론", "운영적 무결성", "의미적 무결성"],
    grading: {
      must: ["추론", "운영적 무결성", "의미적 무결성", "병행"],
      bonus: ["로킹", "제약조건", "CHECK", "허용 값"],
      synonyms: {
        추론: ["inference"],
      },
    },
  },
  {
    id: "mid-w05-q08",
    scope: "midterm",
    week: 5,
    type: "비교서술",
    prompt:
      "보안과 가용성(접근성·성능)은 트레이드오프(Trade-Off) 관계라고 한다. 그 의미를 서술하시오.",
    modelAnswer:
      "접근성·성능·가용성을 확대하면 그만큼 보안 위협에 취약해지고, 반대로 보안을 강화하면 접근성·가용성이 감소한다. 즉 두 가치는 한쪽을 높이면 다른 쪽이 낮아지는 **상충(Trade-Off) 관계**이다. 따라서 조직은 보안 요구사항을 분석하여 두 가치 사이의 적절한 균형점을 찾아 DB를 설계·구현해야 한다.",
    tags: ["트레이드오프", "보안", "가용성"],
    grading: {
      must: ["보안", "가용성", "상충", "균형"],
      bonus: ["접근성", "성능", "트레이드오프"],
      synonyms: {
        가용성: ["availability"],
        상충: ["trade-off", "트레이드오프"],
      },
    },
  },
];
