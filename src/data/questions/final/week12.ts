// 12주차 — DB암호화 생명주기 · TDE · HSM · 마스터키 · 블록 암호 모드
//          ★ Oracle TDE vs MySQL TDE 비교 (기말 단골)
// 문제 추가법은 week01.ts 상단 주석 참고. id 규칙: "fin-w12-qNN"
import type { Question } from "@/data/types";

export const week12: Question[] = [
  {
    id: "fin-w12-q01",
    scope: "final",
    week: 12,
    type: "약어정의",
    prompt: "★ TDE의 풀네임과 정의를 작성하시오. (왜 'Transparent'인지 포함)",
    modelAnswer:
      "**TDE** = Transparent Data Encryption (투명 데이터 암호화)\n\n데이터베이스에서 데이터를 자동으로 암호화하는 기술로, 파일 단위 또는 테이블스페이스(컬럼) 단위에서 암호화가 수행된다. **데이터베이스 레벨(커널 수준)에서 암·복호화가 이루어지므로 응용 프로그램을 수정할 필요가 없다.** 응용 프로그램 입장에서 암호화 과정이 보이지 않아 '투명(Transparent)'하다고 한다.\n\n(Oracle은 10gR2부터, MSSQL은 2008부터 지원)",
    tags: ["TDE", "투명 데이터 암호화", "약어"],
    grading: {
      must: ["Transparent Data Encryption", "응용 프로그램", "수정"],
      bonus: ["테이블스페이스", "커널", "자동"],
      synonyms: { "응용 프로그램": ["애플리케이션", "application"] },
    },
  },
  {
    id: "fin-w12-q02",
    scope: "final",
    week: 12,
    type: "약어정의",
    prompt: "★ HSM의 풀네임과 정의를 작성하시오.",
    modelAnswer:
      "**HSM** = Hardware Security Module (하드웨어 보안 모듈)\n\n마스터 키를 포함한 암호 키를 보호하기 위해 등장한 보안 장치로, 암호 키를 직접 생성·저장하는 역할을 한다. **내부에서 생성된 암호 키는 외부로 유출될 수 없도록 설계**되어 있으며, 악의적인 공격이나 비정상적인 접근이 감지되면 **암호 키를 자동으로 파기**하여 중요 정보의 유출을 막고 보안을 강화한다. 자체 OS·SW를 사용해 네트워크 공격으로부터도 키를 보호한다.",
    tags: ["HSM", "하드웨어 보안 모듈", "마스터키", "약어"],
    grading: {
      must: ["Hardware Security Module", "암호 키", "유출"],
      bonus: ["파기", "마스터 키", "생성", "저장"],
      synonyms: { 유출: ["외부로", "노출"], 파기: ["삭제", "폐기"] },
    },
  },
  {
    id: "fin-w12-q03",
    scope: "final",
    week: 12,
    type: "비교서술",
    prompt:
      "★ Oracle과 MySQL의 TDE를 비교 설명하시오. (지원 암호화 방식·암호화 알고리즘·암호화 키 관리·컬럼 암호화·블록 모드 포함)",
    modelAnswer:
      "| 구분 | Oracle | MySQL |\n|---|---|---|\n| 명칭 | TDE (Transparent Data Encryption) | Data-at-Rest Encryption (저장 단계에서 수행) |\n| 컬럼 암호화 | **지원** | **지원 안 함** |\n| 암호화 알고리즘 | AES, DES 등 **다양한 알고리즘** 지원 | **AES256만** 지원 |\n| 암호화 키 관리 | 데이터 키를 마스터 키로 암호화하여 저장, **마스터 키만 관리** | DB를 암호화한 암호화 키를 **테이블에 저장** |\n| 블록 암호 모드 | **다양한 블록 모드** 지원 | **ECB 모드만** 지원 |\n\n핵심 차이: Oracle은 컬럼 암호화 지원·다양한 알고리즘/모드·마스터키 방식인 반면, MySQL은 컬럼 암호화 미지원·AES256만·ECB만 지원하며 키를 테이블에 저장한다.",
    tags: ["Oracle TDE", "MySQL TDE", "비교", "마스터키"],
    grading: {
      must: ["컬럼", "AES256", "마스터", "ECB"],
      bonus: ["Data-at-Rest", "테이블"],
      synonyms: { 컬럼: ["column", "열"], 마스터: ["master"] },
    },
  },
  {
    id: "fin-w12-q04",
    scope: "final",
    week: 12,
    type: "약어정의",
    prompt:
      "마스터 키(Master Key)의 개념을 설명하고, TDE에서 마스터 키 방식이 안전한 이유를 쓰시오.",
    modelAnswer:
      "**마스터 키(Master Key)**: 실제 DB를 암호화한 암호 키(데이터 키)를 **다시 한 번 암호화**하는 키.\n\n**안전한 이유**: 실제 데이터를 암호화하는 데이터 키가 마스터 키로 암호화되어 있으므로, 데이터 키가 테이블 등에 저장되어 있어도 암호화된 상태라 상대적으로 안전하다. 관리자는 **마스터 키만 안전하게 관리**하면 된다(Oracle, MySQL TDE에서 채택). 단점은 안전한 마스터 키 관리 방안이 별도로 필요하다는 점이다.",
    tags: ["마스터키", "TDE", "데이터키"],
  },
  {
    id: "fin-w12-q05",
    scope: "final",
    week: 12,
    type: "비교서술",
    prompt:
      "블록 암호 운용 모드 5가지(ECB/CBC/CFB/OFB/CTR)의 풀네임과 핵심 특징을 정리하시오.",
    modelAnswer:
      "| 모드 | 풀네임 | 핵심 특징 |\n|---|---|---|\n| ECB | Electronic CodeBook | 블록별 독립 암호화. 병렬처리 가능·빠름 / 키 값 유추 가능, 낮은 안전성 |\n| CBC | Cipher Block Chaining | 앞 암호문 블록과 평문을 XOR 후 암호화(체인). 병렬처리 어려움 |\n| CFB | Cipher FeedBack | 앞 암호문 블록을 알고리즘 입력으로 사용. 첫 블록은 IV 사용 |\n| OFB | Output FeedBack | 평문과 알고리즘 '출력'을 XOR. XOR 전 블록을 다음에 전달 |\n| CTR | CounTeR | 1씩 증가하는 카운터를 암호화해 키 스트림 생성. ECB처럼 병렬처리 가능 |\n\n병렬처리 가능: ECB, CTR / 어려움: CBC, CFB, OFB.",
    tags: ["블록 암호 모드", "ECB", "CBC", "CFB", "OFB", "CTR"],
  },
  {
    id: "fin-w12-q06",
    scope: "final",
    week: 12,
    type: "보안서술",
    prompt:
      "데이터베이스 암호화에서 'DB 암호화 키 관리'가 가장 중요한 이유와, 키 관리가 필요한 3가지 이유 및 대응책을 설명하시오.",
    modelAnswer:
      "**가장 중요한 이유**: 키 관리가 허술하면 공격자가 암호 키를 취득해 복호화로 원본 데이터를 얻을 수 있어, 아무리 강력한 암호화 기술을 적용해도 무력화되기 때문이다.\n\n**키 관리가 필요한 3가지 이유 → 대응책**\n1. 키를 변경 없이 계속 사용 → 보안 사고 가능성↑ ⇒ 여러 암호 키 사용\n2. 하나의 키로 모든 암호화 → 유출 시 큰 피해 ⇒ 주기적인 암호 키 변경(재발급)\n3. 암호 키 분실 → 복호화 불가로 데이터 손실 ⇒ 암호 키 백업\n\n⇒ 이 세 가지를 통합 수행하는 것이 **키 관리 시스템(KMS)**이다.",
    tags: ["키 관리", "KMS", "마스터키"],
  },
  {
    id: "fin-w12-q07",
    scope: "final",
    week: 12,
    type: "비교서술",
    prompt:
      "컬럼 암호화와 데이터베이스 전체 암호화의 장단점을 비교하시오.",
    modelAnswer:
      "**컬럼 암호화 (Column-Level Encryption)**\n- 일부 민감 컬럼(주민번호·카드번호 등)만 암호화\n- 장점: 사용자별 적절한 암호화 가능(의료분야에서 널리 사용)\n- 단점: 암호화된 컬럼이 인덱스를 가지면 인덱스 활용 불가 → DBMS 부하·응답 저하\n\n**DB 전체 암호화 (테이블스페이스/파일 단위)**\n- 장점: 구현 간단, 민감 컬럼 식별 불필요, 높은 안전성\n- 단점: 빈번한 암·복호화로 DBMS 부하, 사용자 식별 불가로 사용자 관리 어려움",
    tags: ["컬럼 암호화", "전체 암호화", "테이블스페이스"],
  },
];
