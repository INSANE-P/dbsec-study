// 13주차 — 빅데이터 개념 · 유형(정형/반정형/비정형) · 3~7V · 생명주기 · 저장/처리 기술
// 문제 추가법은 week01.ts 상단 주석 참고. id 규칙: "fin-w13-qNN"
import type { Question } from "@/data/types";

export const week13: Question[] = [
  {
    id: "fin-w13-q01",
    scope: "final",
    week: 13,
    type: "약어정의",
    prompt: "★ 빅데이터의 3V 속성을 full name과 함께 설명하시오.",
    modelAnswer:
      "**① Volume (규모/크기)**: 단순 저장되는 물리적 데이터의 양. 빅데이터의 가장 기본적 특징으로, 테라바이트(TB) 단위 이상의 대량 데이터.\n\n**② Velocity (속도)**: 데이터의 고도화된 실시간 처리. 수집→저장→분석→시각화를 정해진 시간 내에 처리하는 것.\n\n**③ Variety (다양성)**: 다양한 형태의 데이터를 포함하는 것. 정형·반정형·비정형 데이터를 모두 포함.\n\n(확장: 4V Veracity, 5V Value, 6V Variability, 7V Visualization)",
    tags: ["3V", "Volume", "Velocity", "Variety", "빅데이터"],
    grading: {
      must: ["Volume", "Velocity", "Variety"],
      bonus: ["규모", "속도", "다양성"],
    },
  },
  {
    id: "fin-w13-q02",
    scope: "final",
    week: 13,
    type: "비교서술",
    prompt:
      "★ 정형·반정형·비정형 데이터의 개념과 예시를 각각 설명하시오.",
    modelAnswer:
      "**① 정형 데이터(Structured)**: 미리 정해진 형식·구조에 따라 저장된 데이터. 검색·갱신·삭제 연산이 쉽다. 예) RDB 테이블, 스프레드시트, CSV.\n\n**② 반정형 데이터(Semi-Structured)**: 형식·구조가 변경될 수 있고, 구조 정보를 데이터와 함께 제공하는 파일 형식. 구조 정보를 바탕으로 정형 데이터로 변환 가능. 예) HTML, XML, RDF, JSON.\n\n**③ 비정형 데이터(Unstructured)**: 정의된 구조가 없는 데이터. 전처리(특징 추출)가 필요하며 가장 큰 비중을 차지. 예) 동영상, 오디오, 사진, 문서, 메일 본문.",
    tags: ["정형", "반정형", "비정형", "JSON", "XML"],
    grading: {
      must: ["정형", "반정형", "비정형"],
      bonus: ["JSON", "XML", "CSV", "전처리"],
    },
  },
  {
    id: "fin-w13-q03",
    scope: "final",
    week: 13,
    type: "약어정의",
    prompt: "★ 반정형 데이터(Semi-Structured Data)를 정의하고 예시를 쓰시오.",
    modelAnswer:
      "**반정형 데이터(Semi-Structured Data)**\n- 데이터의 형식과 구조가 변경될 수 있는 데이터\n- 데이터와 함께 구조 정보를 제공하는 파일 형식\n- 구조 정보를 바탕으로 DB 스키마로 변환·매핑하여 정형 데이터로 변환 가능 (예: JSON 데이터를 CSV나 테이블 형태로 변환)\n\n예시: **HTML, XML, RDF, JSON**\n\n장점: 스키마 수정이 쉽고 파일 단위로 전송·공유가 용이.\n단점: 질의 처리가 어려워 분석 시 정형 데이터로 변환하여 사용.",
    tags: ["반정형 데이터", "JSON", "XML", "HTML"],
  },
  {
    id: "fin-w13-q04",
    scope: "final",
    week: 13,
    type: "보안서술",
    prompt:
      "빅데이터 처리 생명주기(Life Cycle) 단계를 순서대로 쓰고 각 단계를 간단히 설명하시오.",
    modelAnswer:
      "**생성 → 수집 → 저장 → 처리 → 분석 → 표현 & 활용 → 폐기**\n\n- 생성/수집: 데이터 소스에서 분석 대상 데이터를 만들고 모음\n- 저장: 데이터 형태(정형/반정형/비정형)에 맞게 저장\n- 처리: 정제·전처리(추출·재배치, 오류 데이터 제거)\n- 분석: 통계·AI(딥러닝/머신러닝)로 숨겨진 정보를 도출\n- 표현 & 활용: 시각화하여 표현하고 제3자에게 공개·공유\n- 폐기: 사용 기한이 지난 데이터를 안전하게 폐기",
    tags: ["빅데이터 생명주기", "처리 과정"],
  },
  {
    id: "fin-w13-q05",
    scope: "final",
    week: 13,
    type: "비교서술",
    prompt:
      "빅데이터 저장 접근 방법 4가지를 대표 솔루션과 함께 정리하시오.",
    modelAnswer:
      "| 방법 | 정의 | 대표 솔루션 |\n|---|---|---|\n| 분산 파일 시스템 | 네트워크로 공유하는 여러 호스트의 파일에 접근 | GFS, HDFS, 아마존 S3 |\n| NoSQL | 데이터 모델을 단순화, 관계 모델·SQL 미사용 | HBase, Cassandra, MongoDB |\n| 병렬 DBMS | 다수 프로세서로 질의·입출력 동시 수행 | SAP HANA, Vertica, VoltDB |\n| 네트워크 구성 저장 | 여러 저장장치를 한 서버에 연결해 총괄 관리 | SAN, NAS |",
    tags: ["빅데이터 저장", "HDFS", "NoSQL", "병렬 DBMS", "SAN", "NAS"],
  },
  {
    id: "fin-w13-q06",
    scope: "final",
    week: 13,
    type: "비교서술",
    prompt:
      "NoSQL과 Hadoop을 비교 설명하시오.",
    modelAnswer:
      "**NoSQL** = Not Only SQL\n- 관계 데이터 모델·SQL을 사용하지 않는 DBMS/저장장치\n- 일관성보다 **가용성·확장성에 중점**, 비정형 데이터에 적합\n- 예) HBase, Cassandra, MongoDB, CouchDB\n\n**Hadoop**\n- 대용량 데이터 분산 처리가 가능한 **자바 기반 오픈소스 프레임워크**\n- **HDFS(저장) + 맵리듀스(처리)** 구조\n- 기존 DB보다 저렴하고, 여러 서버에 분산 저장해 처리 속도가 빠름",
    tags: ["NoSQL", "Hadoop", "HDFS", "맵리듀스"],
  },
  {
    id: "fin-w13-q07",
    scope: "final",
    week: 13,
    type: "약어정의",
    prompt:
      "다음 약어의 풀네임과 의미를 작성하시오.\n(1) ETL  (2) HDFS  (3) ICT",
    modelAnswer:
      "(1) **ETL** = Extraction, Transformation and Loading (추출·변환·적재)\n→ 여러 소스의 데이터를 추출·공통 형식으로 변환하여 데이터 웨어하우스에 적재하는 과정.\n\n(2) **HDFS** = Hadoop Distributed File System (하둡 분산 파일 시스템)\n→ Hadoop에서 데이터를 분산 저장하는 파일 시스템.\n\n(3) **ICT** = Information and Communication Technology (정보통신기술)",
    tags: ["ETL", "HDFS", "ICT", "약어"],
  },
];
