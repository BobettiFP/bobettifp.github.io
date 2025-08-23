title: "OCPM vs Traditional Process Mining"
layout: single
date: 2025-08-23 10:00:00 -0400
categories: [Dictionary]
tags: [process mining]
author_profile: true

## Overview

Object Centric Process Mining (OCPM)과 Traditional Process Mining (DFG, Petri Net 등)의 차이는 무엇일까?

{% raw %}
<div id="process-mining-root"></div>

<!-- Tailwind (CDN, 간편용) -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- React 18 (UMD) + Babel Standalone (브라우저에서 JSX 변환) -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

<script type="text/babel">
  const { useState } = React;

  // ✅ lucide-react 대신 이모지/간단 아이콘으로 치환 (번들러 없이 동작)
  const Emoji = ({ children, className }) => (
    <span className={className} aria-hidden="true">{children}</span>
  );

  function ProcessMiningComparison() {
    const [activeView, setActiveView] = useState('traditional');
    const [animationStep, setAnimationStep] = useState(0);

    // 전통적 프로세스 마이닝 데이터
    const traditionalProcess = [
      { id: 1, activity: '주문 접수', time: '09:00' },
      { id: 2, activity: '결제 처리', time: '09:15' },
      { id: 3, activity: '재고 확인', time: '09:30' },
      { id: 4, activity: '포장 준비', time: '10:00' },
      { id: 5, activity: '배송 시작', time: '11:00' }
    ];

    // OCPM 데이터 - 여러 객체 타입
    const ocpmObjects = {
      order: { id: 'O001', color: 'bg-blue-500', name: '주문' },
      customer: { id: 'C123', color: 'bg-green-500', name: '고객' },
      product: { id: 'P456', color: 'bg-purple-500', name: '제품' },
      payment: { id: 'PAY789', color: 'bg-yellow-500', name: '결제' },
      delivery: { id: 'D012', color: 'bg-red-500', name: '배송' }
    };

    const ocpmEvents = [
      { time: '09:00', activity: '주문 생성', objects: ['order', 'customer'] },
      { time: '09:05', activity: '제품 선택', objects: ['product', 'customer'] },
      { time: '09:10', activity: '주문에 제품 추가', objects: ['order', 'product'] },
      { time: '09:15', activity: '결제 처리', objects: ['order', 'payment', 'customer'] },
      { time: '09:30', activity: '재고 확인', objects: ['product'] },
      { time: '10:00', activity: '포장 준비', objects: ['order', 'product'] },
      { time: '11:00', activity: '배송 할당', objects: ['order', 'delivery'] },
      { time: '11:30', activity: '배송 시작', objects: ['delivery', 'customer'] }
    ];

    const startAnimation = () => {
      setAnimationStep(0);
      const maxSteps = activeView === 'traditional' ? traditionalProcess.length : ocpmEvents.length;
      const interval = setInterval(() => {
        setAnimationStep(prev => {
          if (prev >= maxSteps - 1) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    };

    const resetAnimation = () => setAnimationStep(0);

    return (
      <div className="max-w-6xl mx-auto p-6 bg-white">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            프로세스 마이닝 비교: Traditional vs OCPM
          </h1>

          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => {setActiveView('traditional'); resetAnimation();}}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeView === 'traditional'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              전통적 프로세스 마이닝
            </button>
            <button
              onClick={() => {setActiveView('ocpm'); resetAnimation();}}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeView === 'ocpm'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              OCPM (Object-Centric)
            </button>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={startAnimation}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Emoji>▶</Emoji>
              애니메이션 시작
            </button>
            <button
              onClick={resetAnimation}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              초기화
            </button>
          </div>
        </div>

        {activeView === 'traditional' && (
          <div className="bg-blue-50 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
              <Emoji className="text-xl">📦</Emoji>
              전통적 프로세스 마이닝
            </h2>
            <p className="text-gray-600 mb-6">
              케이스 ID(주문 ID) 중심으로 단일 프로세스 흐름을 추적합니다.
            </p>

            <div className="bg-white p-4 rounded-lg mb-4">
              <h3 className="font-semibold mb-2">케이스 ID: ORDER-001</h3>
              <div className="flex items-center gap-4 overflow-x-auto">
                {traditionalProcess.map((step, index) => (
                  <div key={step.id} className="flex items-center gap-2">
                    <div className={
                      `px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-500
                       ${index <= animationStep ? 'bg-blue-500 text-white shadow-lg transform scale-105' : 'bg-gray-200 text-gray-500'}`
                    }>
                      <div>{step.activity}</div>
                      <div className="text-xs opacity-75">{step.time}</div>
                    </div>
                    {index < traditionalProcess.length - 1 && (
                      <span className={`transition-all duration-500 ${index < animationStep ? 'text-blue-500' : 'text-gray-300'}`}>
                        →
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-yellow-100 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">특징:</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• 하나의 케이스 ID만 추적</li>
                <li>• 선형적인 프로세스 흐름</li>
                <li>• 단순하지만 객체 간 상호작용 놓침</li>
                <li>• 복잡한 비즈니스 프로세스 표현에 한계</li>
              </ul>
            </div>
          </div>
        )}

        {activeView === 'ocpm' && (
          <div className="bg-purple-50 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
              <Emoji className="text-xl">👤</Emoji>
              OCPM (Object-Centric Process Mining)
            </h2>
            <p className="text-gray-600 mb-6">
              여러 객체 타입을 동시에 추적하여 복잡한 상호작용을 모델링합니다.
            </p>

            {/* 객체 범례 */}
            <div className="bg-white p-4 rounded-lg mb-4">
              <h3 className="font-semibold mb-3">추적 중인 객체들:</h3>
              <div className="flex flex-wrap gap-3">
                {Object.entries(ocpmObjects).map(([key, obj]) => (
                  <div key={key} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded ${obj.color}`}></div>
                    <span className="text-sm font-medium">{obj.name} ({obj.id})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 이벤트 타임라인 */}
            <div className="bg-white p-4 rounded-lg mb-4">
              <h3 className="font-semibold mb-3">이벤트 타임라인:</h3>
              <div className="space-y-3">
                {ocpmEvents.map((event, index) => (
                  <div key={index} className={
                    `p-3 rounded-lg border-l-4 transition-all duration-500
                     ${index <= animationStep ? 'border-purple-500 bg-purple-100 shadow-md transform scale-105' : 'border-gray-300 bg-gray-50'}`
                  }>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{event.activity}</span>
                      <span className="text-sm text-gray-500">{event.time}</span>
                    </div>
                    <div className="flex gap-2">
                      {event.objects.map(objKey => (
                        <span key={objKey}
                          className={`px-2 py-1 rounded text-xs font-medium text-white ${ocpmObjects[objKey].color}`}>
                          {ocpmObjects[objKey].name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 객체 관계 네트워크 */}
            <div className="bg-white p-4 rounded-lg mb-4">
              <h3 className="font-semibold mb-3">객체 간 상호작용 네트워크:</h3>
              <div className="flex justify-center">
                <div className="relative w-80 h-60">
                  {/* 중앙 주문 */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-medium">
                      주문 (O001)
                    </div>
                  </div>
                  {/* 주변 노드들 */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-medium">
                      고객 (C123)
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                    <div className="bg-purple-500 text-white px-3 py-2 rounded-lg text-sm font-medium">
                      제품 (P456)
                    </div>
                  </div>
                  <div className="absolute top-1/2 left-4 -translate-y-1/2">
                    <div className="bg-yellow-500 text-white px-3 py-2 rounded-lg text-sm font-medium">
                      결제 (PAY789)
                    </div>
                  </div>
                  <div className="absolute top-1/2 right-4 -translate-y-1/2">
                    <div className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm font-medium">
                      배송 (D012)
                    </div>
                  </div>
                  {/* 연결선들 */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <line x1="160" y1="60" x2="160" y2="110" stroke="#6B7280" strokeWidth="2" />
                    <line x1="160" y1="150" x2="160" y2="200" stroke="#6B7280" strokeWidth="2" />
                    <line x1="110" y1="130" x2="60" y2="130" stroke="#6B7280" strokeWidth="2" />
                    <line x1="210" y1="130" x2="260" y2="130" stroke="#6B7280" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-green-100 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">OCPM의 장점:</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• 여러 객체 타입 동시 추적</li>
                <li>• 객체 간 복잡한 상호작용 모델링</li>
                <li>• 현실적인 비즈니스 프로세스 표현</li>
                <li>• 통합적인 프로세스 분석 가능</li>
                <li>• Many-to-many 관계 처리 가능</li>
              </ul>
            </div>
          </div>
        )}

        {/* 비교 요약 */}
        <div className="mt-8 bg-gray-50 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-gray-800 mb-4">핵심 차이점 요약</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-100 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">전통적 프로세스 마이닝</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• 단일 케이스 ID 기반</li>
                <li>• 1:1 관계만 처리</li>
                <li>• 간단한 선형 프로세스</li>
                <li>• 구현이 쉬움</li>
              </ul>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">OCPM</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• 다중 객체 타입 기반</li>
                <li>• Many-to-many 관계 처리</li>
                <li>• 복잡한 상호작용 모델링</li>
                <li>• 현실적이지만 복잡함</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const root = ReactDOM.createRoot(document.getElementById('process-mining-root'));
  root.render(<ProcessMiningComparison />);
</script>
{% endraw %}


### Traditional Process Mining


### OCPM