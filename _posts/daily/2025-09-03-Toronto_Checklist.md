---
title: "토론토 유학 체크리스트 (구매처별 정리)"
layout: single
date: 2025-09-03 10:00:00 -0400
categories: [Canada Life]
tags: [Canada, Toronto, UofT, Packing, PhD]
author_profile: true
classes: wide
---

{% raw %}
<style>
  body .packing-root {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 20px 0;
      background-color: #f8f9fa;
  }
  .packing-root .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      overflow: hidden;
  }
  .packing-root .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
      text-align: center;
  }
  .packing-root .header h1 {
      margin: 0;
      font-size: 24px;
  }
  .packing-root .subtitle {
      margin: 5px 0 0 0;
      opacity: 0.9;
      font-size: 14px;
  }
  .packing-root .section { margin: 20px; }
  .packing-root .section-title {
      font-size: 18px; font-weight: bold; margin-bottom: 15px;
      padding: 10px 15px; border-radius: 5px; color: white;
  }
  .packing-root .documents { background: linear-gradient(135deg, #ff6b6b, #ee5a52); }
  .packing-root .daiso { background: linear-gradient(135deg, #4ecdc4, #44a08d); }
  .packing-root .coupang { background: linear-gradient(135deg, #45b7d1, #3498db); }
  .packing-root .home { background: linear-gradient(135deg, #96ceb4, #74b49b); }
  .packing-root .communication { background: linear-gradient(135deg, #feca57, #ff9ff3); }
  .packing-root .carry-on { background: linear-gradient(135deg, #fd79a8, #e84393); }
  .packing-root .item-grid { display: grid; gap: 10px; margin-bottom: 30px; }
  .packing-root .item-card {
      background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px;
      padding: 15px; transition: all 0.3s ease; cursor: pointer;
  }
  .packing-root .item-card:hover {
      background: #e9ecef; transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  .packing-root .item-card.completed { background: #d4edda; border-color: #c3e6cb; }
  .packing-root .item-header { display: flex; align-items: center; margin-bottom: 8px; }
  .packing-root .checkbox { transform: scale(1.3); margin-right: 12px; cursor: pointer; }
  .packing-root .item-name { font-weight: 600; font-size: 16px; color: #333; flex: 1; }
  .packing-root .item-details { margin-left: 30px; color: #666; font-size: 14px; line-height: 1.4; }
  .packing-root .item-note { margin-left: 30px; margin-top: 5px; font-style: italic; color: #888; font-size: 13px; }
  .packing-root .progress-section {
      margin: 20px; padding: 20px; background: #f8f9fa;
      border-radius: 8px; border: 1px solid #e9ecef;
  }
  .packing-root .progress-bar {
      background-color: #e0e0e0; border-radius: 10px; overflow: hidden; margin-bottom: 15px;
  }
  .packing-root .progress-fill {
      height: 25px; background: linear-gradient(90deg, #4caf50, #8bc34a);
      width: 0%; transition: width 0.3s ease; display: flex; align-items: center;
      justify-content: center; color: white; font-size: 14px; font-weight: bold;
  }
  .packing-root .stats { display: flex; justify-content: space-around; text-align: center; }
  .packing-root .stat-item { flex: 1; }
  .packing-root .stat-number { font-size: 24px; font-weight: bold; color: #1976d2; }
  .packing-root .stat-label { font-size: 12px; color: #666; margin-top: 5px; }
</style>

<div class="packing-root">
  <div class="container">
    <div class="header">
      <h1>토론토 유학 패킹 체크리스트</h1>
      <p class="subtitle">구매처별 정리 · 출국 6일 전 기준</p>
    </div>

    <div class="progress-section">
      <div class="progress-bar">
        <div class="progress-fill" id="progressFill">0% 완료</div>
      </div>
      <div class="stats">
        <div class="stat-item">
          <div class="stat-number" id="completedCount">0</div>
          <div class="stat-label">완료</div>
        </div>
        <div class="stat-item">
          <div class="stat-number" id="totalCount">—</div>
          <div class="stat-label">전체</div>
        </div>
        <div class="stat-item">
          <div class="stat-number" id="remainingCount">—</div>
          <div class="stat-label">남은 항목</div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title documents">📋 준비할 서류</div>
      <div class="item-grid">
        <div class="item-card" onclick="toggleItem(this)">
          <div class="item-header">
            <input type="checkbox" class="checkbox" onchange="updateProgress()">
            <div class="item-name">여권 / Study Permit / UofT Admission Letter / Full Funding 증명서</div>
          </div>
          <div class="item-details">출력 & 기내 보관</div>
          <div class="item-note">입국 심사 및 계좌 개설 필수</div>
        </div>

        <div class="item-card" onclick="toggleItem(this)">
          <div class="item-header">
            <input type="checkbox" class="checkbox" onchange="updateProgress()">
            <div class="item-name">여권사진</div>
          </div>
          <div class="item-details">10장 / 사진관 or 쿠팡</div>
          <div class="item-note">학생증, 비자 연장용</div>
        </div>

        <div class="item-card" onclick="toggleItem(this)">
          <div class="item-header">
            <input type="checkbox" class="checkbox" onchange="updateProgress()">
            <div class="item-name">비상용 서류 스캔본</div>
          </div>
          <div class="item-details">구글드라이브 업로드</div>
          <div class="item-note">여권, 보험, 증명서 포함</div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title daiso">🛒 다이소에서 살 것</div>
      <div class="item-grid">
        <div class="item-card" onclick="toggleItem(this)">
          <div class="item-header">
            <input type="checkbox" class="checkbox" onchange="updateProgress()">
            <div class="item-name">핫팩</div>
          </div>
          <div class="item-details">3~4개</div>
          <div class="item-note">첫 겨울 대비</div>
        </div>

        <div class="item-card" onclick="toggleItem(this)">
          <div class="item-header">
            <input type="checkbox" class="checkbox" onchange="updateProgress()">
            <div class="item-name">멀티탭, 변환 플러그</div>
          </div>
          <div class="item-details">110V 호환 확인 필요</div>
          <div class="item-note">전자기기 연결용</div>
        </div>

        <div class="item-card" onclick="toggleItem(this)">
          <div class="item-header">
            <input type="checkbox" class="checkbox" onchange="updateProgress()">
            <div class="item-name">젓가락·숟가락 세트, 장바구니</div>
          </div>
          <div class="item-details">초기 생존용</div>
          <div class="item-note">현지 장보기 & 식사용</div>
        </div>

        <div class="item-card" onclick="toggleItem(this)">
          <div class="item-header">
            <input type="checkbox" class="checkbox" onchange="updateProgress()">
            <div class="item-name">손톱깎이·귀이개 세트</div>
          </div>
          <div class="item-details">개인 위생용품</div>
          <div class="item-note">현지 구하기 어려운 품목</div>
        </div>

        <div class="item-card" onclick="toggleItem(this)">
          <div class="item-header">
            <input type="checkbox" class="checkbox" onchange="updateProgress()">
            <div class="item-name">휴대용 우산, 압축팩</div>
          </div>
          <div class="item-details">기본 생활용품</div>
          <div class="item-note">우산 & 캐리어 정리용</div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title coupang">📦 쿠팡에서 살 것</div>
      <div class="item-grid">
        <div class="item-card" onclick="toggleItem(this)">
          <div class="item-header">
            <input type="checkbox" class="checkbox" onchange="updateProgress()">
            <div class="item-name">각종 진통제·소화제·알러지약</div>
          </div>
          <div class="item-details">당장 쓸 만큼만 소량 구매</div>
          <div class="item-note">원래 포장 유지, 영문 처방전 함께 보관</div>
        </div>

        <div class="item-card" onclick="toggleItem(this)">
          <div class="item-header">
            <input type="checkbox" class="checkbox" onchange="updateProgress()">
            <div class="item-name">롱패딩, 방한부츠</div>
          </div>
          <div class="item-details">압축팩 사용해서 패킹</div>
          <div class="item-note">첫 학기 생존 필수템</div>
        </div>

        <div class="item-card" onclick="toggleItem(this)">
          <div class="item-header">
            <input type="checkbox" class="checkbox" onchange="updateProgress()">
            <div class="item-name">히트텍, 장갑, 목도리, 귀마개</div>
          </div>
          <div class="item-details">겨울 방한용품</div>
          <div class="item-note">토론토 겨울 필수템</div>
        </div>

        <div class="item-card" onclick="toggleItem(this)">
          <div class="item-header">
            <input type="checkbox" class="checkbox" onchange="updateProgress()">
            <div class="item-name">HDMI 케이블, USB-C 젠더, USB 메모리</div>
          </div>
          <div class="item-details">전자기기 액세서리</div>
          <div class="item-note">연구·발표 준비용</div>
        </div>

        <div class="item-card" onclick="toggleItem(this)">
          <div class="item-header">
            <input type="checkbox" class="checkbox" onchange="updateProgress()">
            <div class="item-name">라면, 고추장 미니튜브</div>
          </div>
          <div class="item-details">초기 2주 생존용</div>
          <div class="item-note">한국 음식 그리울 때</div>
        </div>

        <div class="item-card" onclick="toggleItem(this)">
          <div class="item-header">
            <input type="checkbox" class="checkbox" onchange="updateProgress()">
            <div class="item-name">텀블러, 전자저울</div>
          </div>
          <div class="item-details">생활 편의용품</div>
          <div class="item-note">음료수 절약 & 우편물 계량</div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title home">🏠 집에서 챙길 것</div>
      <div class="item-grid">
        <div class="item-card" onclick="toggleItem(this)">
          <div class="item-header">
            <input type="checkbox" class="checkbox" onchange="updateProgress()">
            <div class="item-name">노트북, 태블릿, 충전기</div>
          </div>
          <div class="item-details">기존 사용 중인 전자기기</div>
          <div class="item-note">연구·수업 필수템</div>
        </div>

        <div class="item-card" onclick="toggleItem(this)">
          <div class="item-header">
            <input type="checkbox" class="checkbox" onchange="updateProgress()">
            <div class="item-name">자켓, 셔츠 2벌, 슬랙스 1벌</div>
          </div>
          <div class="item-details">집에 있는 세미포멀 옷 + 부족한 것만 쿠팡</div>
          <div class="item-note">세미나·랩미팅 대비</div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title communication">📱 통신 관련</div>
      <div class="item-grid">
        <div class="item-card" onclick="toggleItem(this)">
          <div class="item-header">
            <input type="checkbox" class="checkbox" onchange="updateProgress()">
            <div class="item-name">eSIM 설정</div>
          </div>
          <div class="item-details">Airalo 등에서 캐나다 eSIM 구매</div>
          <div class="item-note">초기엔 eSIM 사용</div>
        </div>

        <div class="item-card" onclick="toggleItem(this)">
          <div class="item-header">
            <input type="checkbox" class="checkbox" onchange="updateProgress()">
            <div class="item-name">캐나다 현지 번호 알아보기</div>
          </div>
          <div class="item-details">Fido/Koodo 학생 프로모션 조사</div>
          <div class="item-note">현지 도착 후 요금제 전환 계획</div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title carry-on">✈️ 기내 가방 (절대 위탁 금지!)</div>
      <div class="item-grid">
        <div class="item-card" onclick="toggleItem(this)">
          <div class="item-header">
            <input type="checkbox" class="checkbox" onchange="updateProgress()">
            <div class="item-name">노트북, 태블릿</div>
          </div>
          <div class="item-details">기내 휴대 필수</div>
          <div class="item-note">귀중품 & 업무용</div>
        </div>

        <div class="item-card" onclick="toggleItem(this)">
          <div class="item-header">
            <input type="checkbox" class="checkbox" onchange="updateProgress()">
            <div class="item-name">입국 서류 일체</div>
          </div>
          <div class="item-details">여권, Study Permit, Admission Letter, Full Funding 증명서</div>
          <div class="item-note">입국 심사 때 바로 꺼낼 수 있게 정리</div>
        </div>

        <div class="item-card" onclick="toggleItem(this)">
          <div class="item-header">
            <input type="checkbox" class="checkbox" onchange="updateProgress()">
            <div class="item-name">트래블월릿, 하루치 약, 증명사진 2~3장</div>
          </div>
          <div class="item-details">현금, 카드, 필수 약품, 여분 사진</div>
          <div class="item-note">도착 직후 바로 필요한 것들</div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  function toggleItem(card) {
    const checkbox = card.querySelector('.checkbox');
    checkbox.checked = !checkbox.checked;
    if (checkbox.checked) card.classList.add('completed');
    else card.classList.remove('completed');
    updateProgress();
  }

  function updateProgress() {
    const root = document.querySelector('.packing-root');
    const checkboxes = root.querySelectorAll('.checkbox');
    const totalCount = checkboxes.length;
    const completedCount = root.querySelectorAll('.checkbox:checked').length;
    const remainingCount = totalCount - completedCount;
    const percentage = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;

    // 진행률 바
    const progressFill = root.querySelector('#progressFill');
    progressFill.style.width = percentage + '%';
    progressFill.textContent = percentage + '% 완료';

    // 통계
    root.querySelector('#completedCount').textContent = completedCount;
    root.querySelector('#totalCount').textContent = totalCount;
    root.querySelector('#remainingCount').textContent = remainingCount;

    // 카드 스타일 동기화
    root.querySelectorAll('.item-card').forEach(card => {
      const box = card.querySelector('.checkbox');
      if (box.checked) card.classList.add('completed');
      else card.classList.remove('completed');
    });
  }

  document.addEventListener('DOMContentLoaded', updateProgress);
</script>
{% endraw %}
