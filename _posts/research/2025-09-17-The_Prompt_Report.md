---
title: "Existing Prompting Methods"
layout: single
date: 2025-09-17 10:00:00 -0400
categories: [Paper Review]
tags: [prompt engineering, survey]
author_profile: true
---

서베이 논문들에 나온 프롬프트 기법들을 모아서 정리해보자.
인용 논문:
1. The Prompt Report: A Systematic Survey of Prompt Engineering Techniques
2. 

# 1. Text-based Prompt

## 1.1. Zero Shot

A. Emotion Prompting
예시:
- Input
- Output
원리:

B. Role Prompting
C. Style Prompting
D. S2A
E. SimToM
F. RaR
G. RE2
H. Self-Ask

## 1.2. Few Shot
*여기는 종류가 아니라 응용 방법

A. KNN
B. Vote-K
C. Self-Generated ICL
D. Prompt Mining
E. LENS
F. UDR
G. Active Example Selection

## 1.3. CoT

### 1.3.1. Zero-Shot CoT
A. Analogical Prompting
B. Step-Back Prompting
C. Thread-of-Thought
D. Tab-CoT

### 1.3.2. Few-Shot CoT
A. Contrastive CoT
B. Uncertainty-Routed CoT
C. Complexity-based Prompting
D. Active Prompting
E. Memory-of-Thought Prompting
F. Auto-CoT

## 1.4. Decomposition
복잡한 문제를 divide and conquer하는 방식

A. Least-to-Most Prompting
B. Decomposed Prompting(DECOMP)
C. Plan-and-Solve Prompting
D. Tree-of-Thought
E. Recursion-of-Thought
F. Program-of-Thoughts
G. Faithful Chatin-of-Thought
H. Skeleton-of-Thought
I. Metacognitive Prompting

## 1.5. Ensembling
여러 프롬프트로 같은 문제를 해결하고, 결과를 병합하여 하나의 output을 도출하는 방식

A. Demonstration Ensembling(DENSE)
B. Mixture of Reasoning Experts (MoRE)
C. Max Mutual Information Method
D. Self-Consistency
E. Universal Self-Consistency
F. Meta-Reasoning over Multiple CoTs
G. DiVeRSe
H. Consistency-based Self-adaptive Prompting (COSP)
I. Universal Self-Adaptive Prompting(USP)
J. Prompt Paraphrasing

## 1.6. Self-Criticism
1차적으로 생성한 답변을 스스로 평가한 뒤 최종 Output을 출력
A. Self-Calibration
B. Self-Refine
C. Reversing Chain-of-Thought (RCoT)
D. Self-Verification
E. Chain-of-Verification(COVE)
F. Cumulative Reasoning

## 1.7. Prompt Engineering
프롬프트 작성과는 다르게 자동으로 프롬프트를 최적화하기 위한 방법론. 실전에 더 근접하고, 기존의 프롬프트 방법론을 조합, 변형하여 최적 Output을 도출하는 상대적으로 실험적 접근들.

A. Meta Prompting
B. AutoPrompt
C. Automatic Prompt Engineer(APE)
D. Gradientfree Instructional Prompt Search (GrIPS)
E. Prompt Optimization with Textual Gradients (ProTeGi)
F. RLPrompt
G. Dialogue-comprised Policy-gradient-based Discrete Prompt Optimization (DP2O)

## 1.8. Answer Engineering
LLM Output을 Diverge하지 않고, 정확하게 원하는 형태로 출력하도록 지정하는 것. 

A. Answer Shape
B. Answer Space
C. Answer Extractor
- Verbalizer
- Regex
- Separate LLM

# 2. Multilingual Prompting
특정 태스크에 더 적합한 언어, 또는 더 낮은 resource를 사용하여 유사한 결과물을 가져올 수 있는 언어가 있다. 이러한 경우 굳이 영어에 국한되지 않고, 적합한 언어를 사용할 수 있도록 한다.

## 2.1. Basic Method

A. Translate First Prompting

## 2.2. CoT
A. XLT (Cross-Lingual Thought) Prompting
B. CLSP (Cross-Lingual Self Consistant) Prompting

## 2.3. ICL

A. X-InSTA Prompting
B. In-CLT

### 2.3.1. In-Context Example Selection

A. Prompts Augmented by Retrieval Cross-lingually (PARC)

## 2.4. Prompt Template Language Selection

A. English Prompt Template
B. Task Language Prompt Template

## 2.5. Prompting for Machine Translation

A. Multi-Aspect Prompting and Selection (MAPS)
B. Chain-of-Dictionary (CoD)
C. Dictionary-baesd Prompting for Machine Translation (DiPMT)
D. Decomposed Prompting for MT (DecoMT)

## 2.6. Human-in-the-Loop
A. Interactive Chain Prompting (ICP)
B. Iterative Prompting

# 3. Multimodal Prompting

## 3.1. Image Prompting
A. Prompt Modifiers
B. Negative Prompting

### 3.1.1. Multimodal ICL
A. Paired-Image Prompting
B. Image-as-Text Prompting

### 3.1.2. Multimodal CoT
A. Duty Distinct Chain-of-Thought (DDCoT)
B. Multimodal Graph-of-Thought
C. Chain-of-Images (CoI)

# 4. Extension of Prompting

## 4.1. Tool Use Agents
A. Modular Reasoning, Knowledge and Language (MRKL) System
B. Self-Correcting with Tool-Interactive Critiquing (CRITIC)
## 4.2. Code-Generation Agents
A. Program-aided Language Model (PAL)
B. Tool-Integrated Reasoning Agent (ToRA)
C. Taskweaver
## 4.3. Observation-based Agents
A. Reasoning and Acting (ReAct)
B. Reflexion
## 4.4. Lifelong Learninig Agents
A. Voyager
B. Ghost in the Minecraft

## 4.5. RAG
A. Verify-and-Edit
B. Demonstrate-Search-Predict
C. Interleaved Retrieval guided by CoT(IRCoT)
D. Iterative Retrieval Augmentation

