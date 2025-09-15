---
title: "Leveraging Large Language Models (LLMs) for Process Mining (Technical Report)"
layout: single
date: 2025-08-22 10:00:00 -0400
categories: [Literature-Review]
tags: [process mining, llm, direct answering prompt, multi-prompt answering, database query generation]
author_profile: true
---

## TL;DR
이 기술보고서는 **프로세스 마이닝 산출물(DFG, 이벤트 로그, 프로세스 모델 등)을 텍스트로 추상화**해 LLM이 이해·추론하도록 하고, **직답(Direct), 다중 프롬프트(Multi-prompt), DB 쿼리 생성** 세 전략으로 질의·검증하는 방법을 실험한다. GPT-4와 Bard는 **절차적/선언적 모델을 꽤 잘 해석**했고, **오브젝트 중심 프로세스 마이닝**에서도 강점을 보였으며, **공정성(fairness) 평가**에도 잠재력이 확인됐다.

## 서지 정보
- APA: Berti, A., & Qafari, M. S. (2023). Leveraging large language models (LLMs) for process mining (Technical Report). arXiv preprint arXiv:2307.12701.
- Bibtex: @article{berti2023leveraging,
  title={Leveraging large language models (LLMs) for process mining (Technical Report)},
  author={Berti, Alessandro and Qafari, Mahnaz Sadat},
  journal={arXiv preprint arXiv:2307.12701},
  year={2023}
}

## Abstract 분해
This technical report describes the intersection of process mining and large language models (LLMs), specifically focusing on the abstraction of **traditional and object-centric process mining** artifacts into textual format. 

- Traditional Process Mining: 이벤트 로그에서 “하나의 케이스(case id)”를 중심으로 활동(activity)·타임스탬프·속성으로 프로세스를 분석(발견·적합도검증·성능분석)하는 고전적 패러다임.

    - 이벤트 로그 스키마: event_id, case_id, activity, timestamp, resource, cost, …(case/event attributes) 
    
    - 주요 산출물(모델/뷰):

        ![procedural](/assets/img/procedural_process_model.PNG)
    
        - DFG (Directly-Follows Graph): A→B 엣지(빈도/시간)로 “직후(직접선행)” 관계를 요약. 병목(높은 평균 소요시간), 주경로(최빈 엣지) 파악에 유용. 
        
        - A --> B --> C --> D 꼴로 나타나는 프로세스는 Traditional Process Mining에 속함

        
- Object-centric Process Mining (OCPM): 전체 네트워크에서 각 Obejct가 어떤 식으로 상호작용하고 있는지를 파악하기 위해 사용.

더 자세히... [OCPM 설명]({% post_url 2025-08-23-OCPM-Explanation %})

We introduce and explore various prompting strategies: 

**direct answering**, where the large language model directly addresses user queries; 

- Direct Answering Prompting: 딱 답만 말하도록 LLM을 유도하는 것.

예시)

Prompt:
"다음 이벤트 로그를 기반으로 가장 병목이 심한 활동(Activity)을 한 줄로 답하세요:
[이벤트 로그 JSON 입력]"

→ GPT-4 답변:
"주요 병목은 '결제 승인(Approve Payment)' 단계에서 발생했습니다."


**multi-prompt answering**, which allows the model to incrementally build on the knowledge obtained through a series of prompts; 

- Multi-prompt Answering: 중간 결과를 모두 출력하도록 하는 프롬프팅 방법. LLM을 여러 차례 호출해야 한다는 단점. COT 할 때, 중간중간 결과물을 출력하는 방식과 유사하지만, COT는 일회성 프롬프트라는 차이. 

예시)

Prompt 1:
"다음 이벤트 로그에서 각 활동의 평균 처리 시간을 계산하세요."
→ 중간 결과 출력

Prompt 2:
"이 중 평균 처리 시간이 가장 긴 활동을 선택하세요."
→ 중간 결과 출력

Prompt 3:
"선택된 활동이 병목 구간인 이유를 설명하세요."
→ 최종 답변 출력

and the **generation of database queries**, 

- Database Query Generation:

facilitating the validation of hypotheses against the original event log. 

Our assessment considers two large language models, GPT-4 and Google’s Bard, under various contextual scenarios across all prompting strategies. 

Results indicate that these models exhibit a robust understanding of **key process mining abstractions**, 

- key process mining abstractions에는 무엇이 있는가?:

with notable proficiency in interpreting both **declarative** and **procedural process models**. 

- Procedural Process Model (절차적)
    - **정의**: 활동 간의 **순서/흐름**을 **명시적으로** 모델링한다. 모델이 허용한 경로만 유효하다.
    - **논문 서술 맥락**: DFG로 직접선행 관계를 요약하고, Petri net/BPMN 같은 절차적 모델로 흐름을 표현한다.
    - **예시(간단)**: `주문 접수 → 결제 처리 → 포장 준비 → 배송 시작`  
    ← 이 경로(순서)가 모델에 정의돼 있어야 실행(trace)이 적합하다.

- Declarative Process Model (선언적)
    - **정의**: 경로를 나열하지 않고 **지켜야 할 제약(규칙)**만 명시한다. 제약을 만족하는 한 **여러 경로**가 허용된다.
    - **논문 서술 맥락**: DECLARE 템플릿(Precedence, Response 등)로 제약을 기술한다.
    - **예시(간단)**: `Response(주문 접수, 결제 처리)`  
    - 의미: “**주문 접수**가 발생하면 **언젠가 결제 처리**가 뒤따라야 한다.”  
    - 만족 예: `주문 접수 → 재고 확인 → 결제 처리 → 포장 준비`  
    - 위반 예: `주문 접수 → 포장 준비 → 배송 시작` (결제가 뒤따르지 않음)

In addition, we find that both models demonstrate strong performance in the object-centric setting, which could significantly propel the advancement of the object-centric process mining discipline.Additionally, these models display a noteworthy capacity to evaluate various concepts of fairness in process mining. 

- Process Mining에서 Fairness란?

This opens the door to more rapid and efficient assessments of the fairness of process mining event logs, which has significant implications for the field.


## 링크
- arXiv: https://arxiv.org/abs/2307.12701