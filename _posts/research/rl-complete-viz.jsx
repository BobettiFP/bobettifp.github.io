import React, { useState, useEffect, useCallback, useRef } from 'react';

// ==================== SHARED COMPONENTS ====================

// Tooltip Component
const Tooltip = ({ children, content, position = 'top' }) => {
  const [show, setShow] = useState(false);
  const positions = {
    top: { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '8px' },
    bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '8px' },
    left: { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: '8px' },
    right: { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: '8px' },
  };

  return (
    <span
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div style={{
          position: 'absolute',
          zIndex: 1000,
          ...positions[position],
          background: 'rgba(0, 0, 0, 0.95)',
          color: '#fff',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '12px',
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.2)',
          pointerEvents: 'none',
        }}>
          {content}
          <div style={{
            position: 'absolute',
            width: 0,
            height: 0,
            border: '6px solid transparent',
            ...(position === 'top' ? { top: '100%', left: '50%', transform: 'translateX(-50%)', borderTopColor: 'rgba(0,0,0,0.95)' } :
                position === 'bottom' ? { bottom: '100%', left: '50%', transform: 'translateX(-50%)', borderBottomColor: 'rgba(0,0,0,0.95)' } :
                position === 'left' ? { left: '100%', top: '50%', transform: 'translateY(-50%)', borderLeftColor: 'rgba(0,0,0,0.95)' } :
                { right: '100%', top: '50%', transform: 'translateY(-50%)', borderRightColor: 'rgba(0,0,0,0.95)' })
          }} />
        </div>
      )}
    </span>
  );
};

// Callout Component
const Callout = ({ type = 'info', title, children, icon }) => {
  const colors = {
    info: { bg: 'rgba(69,183,209,0.15)', border: '#45B7D1', icon: '💡' },
    tip: { bg: 'rgba(78,205,196,0.15)', border: '#4ECDC4', icon: '💡' },
    warning: { bg: 'rgba(247,220,111,0.15)', border: '#F7DC6F', icon: '⚠️' },
    key: { bg: 'rgba(255,107,107,0.15)', border: '#FF6B6B', icon: '🔑' },
  };
  const style = colors[type] || colors.info;

  return (
    <div style={{
      marginTop: '20px',
      padding: '18px',
      background: style.bg,
      borderRadius: '12px',
      borderLeft: `4px solid ${style.border}`,
      border: `1px solid ${style.border}40`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        <span style={{ fontSize: '18px' }}>{icon || style.icon}</span>
        {title && <h4 style={{ margin: 0, color: style.border, fontSize: '15px', fontWeight: 'bold' }}>{title}</h4>}
      </div>
      <div style={{ fontSize: '14px', lineHeight: '1.8', opacity: 0.95 }}>
        {children}
      </div>
    </div>
  );
};

// Explanation Panel Component
const ExplanationPanel = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div style={{
      marginTop: '20px',
      background: 'rgba(0,0,0,0.3)',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.1)',
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '15px 20px',
          background: isOpen ? 'rgba(255,255,255,0.05)' : 'transparent',
          border: 'none',
          color: '#fff',
          textAlign: 'left',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '14px',
          fontWeight: 'bold',
        }}
      >
        <span>{title}</span>
        <span style={{ fontSize: '18px', transition: 'transform 0.3s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {children}
        </div>
      )}
    </div>
  );
};

// Formula Breakdown Component
const FormulaBreakdown = ({ formula, steps, simpleExplanation }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div style={{
      background: 'rgba(0,0,0,0.4)',
      borderRadius: '10px',
      padding: '15px',
      marginTop: '10px',
    }}>
      {simpleExplanation && (
        <div style={{ marginBottom: '12px', padding: '10px', background: 'rgba(78,205,196,0.2)', borderRadius: '8px', fontSize: '13px' }}>
          <strong style={{ color: '#4ECDC4' }}>In simple terms:</strong> {simpleExplanation}
        </div>
      )}
      <div style={{ fontFamily: 'monospace', fontSize: '13px', marginBottom: '10px' }}>
        {formula}
      </div>
      {steps && steps.length > 0 && (
        <>
          <button
            onClick={() => setShowDetails(!showDetails)}
            style={{
              padding: '6px 12px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '6px',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '11px',
            }}
          >
            {showDetails ? 'Hide' : 'Show'} Step-by-Step
          </button>
          {showDetails && (
            <div style={{ marginTop: '12px', paddingLeft: '15px', borderLeft: '2px solid rgba(78,205,196,0.5)' }}>
              {steps.map((step, i) => (
                <div key={i} style={{ marginBottom: '8px', fontSize: '12px', opacity: 0.9 }}>
                  <strong style={{ color: '#4ECDC4' }}>Step {i + 1}:</strong> {step}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Welcome Screen Component
const WelcomeScreen = ({ onClose, onStartTour }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.9)',
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        maxWidth: '700px',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        borderRadius: '20px',
        padding: '40px',
        border: '2px solid rgba(255,255,255,0.2)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      }}>
        <h1 style={{ fontSize: '32px', marginBottom: '20px', textAlign: 'center' }}>
          🎬 Welcome to RL Algorithm Visualization
        </h1>
        <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '30px', opacity: 0.9 }}>
          This interactive visualization helps you understand Reinforcement Learning algorithms from the ground up.
          Start with <strong>MDP</strong> to learn the basics, then progress through each algorithm to see how they build on each other.
        </p>
        
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#4ECDC4' }}>What you'll learn:</h3>
          <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2' }}>
            <li>📊 <strong>MDP</strong> - The foundation: states, actions, rewards</li>
            <li>🔄 <strong>DP</strong> - Solving when you know the model</li>
            <li>🎲 <strong>MC</strong> - Learning from experience</li>
            <li>⚡ <strong>TD</strong> - Learning step-by-step</li>
            <li>🧠 <strong>Function Approximation</strong> - Scaling to large problems</li>
            <li>🌐 <strong>DQN</strong> - Deep reinforcement learning</li>
            <li>🌳 <strong>MCTS</strong> - Planning with search</li>
            <li>📈 <strong>Policy Gradient</strong> - Direct policy optimization</li>
            <li>🤖 <strong>RLHF</strong> - Training AI with human feedback</li>
          </ul>
        </div>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={onStartTour}
            style={{
              padding: '15px 30px',
              background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
              border: 'none',
              borderRadius: '25px',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            🚀 Start Guided Tour
          </button>
          <button
            onClick={onClose}
            style={{
              padding: '15px 30px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '25px',
              color: '#fff',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Explore on My Own
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== 1. MDP VISUALIZATION ====================
const MDPViz = () => {
  const [currentState, setCurrentState] = useState('S1');
  const [selectedAction, setSelectedAction] = useState(null);
  const [transitionResult, setTransitionResult] = useState(null);
  const [totalReward, setTotalReward] = useState(0);
  const [trajectory, setTrajectory] = useState([]);
  const [showProbabilities, setShowProbabilities] = useState(false);
  
  const states = ['S1', 'S2', 'S3', 'Goal'];
  const gamma = 0.9;
  
  // Transition probabilities P(s'|s,a)
  const transitions = {
    'S1': {
      'a': { 'S1': 0.1, 'S2': 0.7, 'S3': 0.2, 'Goal': 0 },
      'b': { 'S1': 0.3, 'S2': 0.3, 'S3': 0.4, 'Goal': 0 },
    },
    'S2': {
      'a': { 'S1': 0, 'S2': 0.2, 'S3': 0.5, 'Goal': 0.3 },
      'b': { 'S1': 0.2, 'S2': 0.3, 'S3': 0.3, 'Goal': 0.2 },
    },
    'S3': {
      'a': { 'S1': 0, 'S2': 0.1, 'S3': 0.1, 'Goal': 0.8 },
      'b': { 'S1': 0.1, 'S2': 0.2, 'S3': 0.4, 'Goal': 0.3 },
    },
    'Goal': {
      'a': { 'S1': 1, 'S2': 0, 'S3': 0, 'Goal': 0 },
      'b': { 'S1': 1, 'S2': 0, 'S3': 0, 'Goal': 0 },
    },
  };
  
  const rewards = { 'S1': -1, 'S2': 0, 'S3': 2, 'Goal': 10 };

  const takeAction = (action) => {
    setSelectedAction(action);
    const probs = transitions[currentState][action];
    
    // Sample next state
    const rand = Math.random();
    let cumProb = 0;
    let nextState = currentState;
    
    for (const [state, prob] of Object.entries(probs)) {
      cumProb += prob;
      if (rand <= cumProb) {
        nextState = state;
        break;
      }
    }
    
    const reward = rewards[nextState];
    setTransitionResult({ nextState, reward, probs });
    setTotalReward(prev => prev + reward);
    setTrajectory(prev => [...prev.slice(-6), { s: currentState, a: action, r: reward, s_next: nextState }]);
    
    setTimeout(() => {
      setCurrentState(nextState);
      setSelectedAction(null);
      setTransitionResult(null);
    }, 1500);
  };

  const reset = () => {
    setCurrentState('S1');
    setTotalReward(0);
    setTrajectory([]);
    setTransitionResult(null);
  };

  const statePositions = {
    'S1': { x: 100, y: 150 },
    'S2': { x: 250, y: 80 },
    'S3': { x: 250, y: 220 },
    'Goal': { x: 400, y: 150 },
  };

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: '10px',
        background: 'linear-gradient(90deg, #FF6B6B, #FF8E8E)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: '32px',
        fontWeight: 'bold'
      }}>
        1. Markov Decision Process (MDP)
      </h2>
      <p style={{ textAlign: 'center', opacity: 0.8, marginBottom: '20px', fontSize: '15px' }}>
        The foundation: <Tooltip content="A state represents the current situation in the environment">States (S)</Tooltip>, 
        <Tooltip content="Actions are the choices the agent can make">Actions (A)</Tooltip>, 
        <Tooltip content="Transition probabilities tell us how likely we are to end up in each next state">Transition Probabilities P(s'|s,a)</Tooltip>, 
        <Tooltip content="Rewards tell us how good or bad each state is">Rewards (R)</Tooltip>, and 
        <Tooltip content="Discount factor: how much we value future rewards vs immediate ones">Discount Factor (γ)</Tooltip>
      </p>

      <ExplanationPanel title="What is an MDP?" defaultOpen={true}>
        <p style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '15px' }}>
          A <strong>Markov Decision Process</strong> is a mathematical framework for modeling decision-making in situations where outcomes are partly random and partly under the control of a decision maker.
        </p>
        <p style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '15px' }}>
          <strong>Key Components:</strong>
        </p>
        <ul style={{ fontSize: '14px', lineHeight: '1.8', paddingLeft: '20px' }}>
          <li><strong>States (S):</strong> Different situations the agent can be in</li>
          <li><strong>Actions (A):</strong> Choices available to the agent</li>
          <li><strong>Transition Probabilities P(s'|s,a):</strong> How likely each next state is after taking an action</li>
          <li><strong>Rewards R(s):</strong> Immediate value of being in each state</li>
          <li><strong>Discount Factor γ:</strong> How much we value future rewards (0 = only care about now, 1 = future matters equally)</li>
        </ul>
        <p style={{ fontSize: '14px', lineHeight: '1.8', marginTop: '15px' }}>
          <strong>Markov Property:</strong> The future depends only on the current state, not the history of how we got there. This simplifies everything!
        </p>
      </ExplanationPanel>

      <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {/* State Diagram */}
        <div style={{ 
          width: '500px',
          height: '300px',
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '15px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Edges */}
          <svg style={{ position: 'absolute', width: '100%', height: '100%' }}>
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="rgba(255,255,255,0.3)" />
              </marker>
            </defs>
            {/* Draw some edges */}
            <line x1="130" y1="150" x2="220" y2="90" stroke="rgba(255,255,255,0.2)" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <line x1="130" y1="150" x2="220" y2="210" stroke="rgba(255,255,255,0.2)" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <line x1="280" y1="80" x2="370" y2="140" stroke="rgba(255,255,255,0.2)" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <line x1="280" y1="220" x2="370" y2="160" stroke="rgba(255,255,255,0.2)" strokeWidth="2" markerEnd="url(#arrowhead)" />
          </svg>
          
          {/* States */}
          {Object.entries(statePositions).map(([state, pos]) => {
            const isCurrentState = currentState === state;
            const isNextState = transitionResult?.nextState === state;
            const isGoal = state === 'Goal';
            
            return (
              <div
                key={state}
                style={{
                  position: 'absolute',
                  left: pos.x - 40,
                  top: pos.y - 40,
                  width: '80px',
                  height: '80px',
                  borderRadius: isGoal ? '12px' : '50%',
                  background: isGoal 
                    ? 'linear-gradient(135deg, #F7DC6F, #F4D03F)'
                    : isCurrentState 
                      ? 'linear-gradient(135deg, #FF6B6B, #FF8E8E)'
                      : isNextState
                        ? 'rgba(78,205,196,0.7)'
                        : 'rgba(255,255,255,0.15)',
                  border: isCurrentState ? '4px solid #fff' : isNextState ? '3px solid #4ECDC4' : '2px solid rgba(255,255,255,0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.4s ease',
                  boxShadow: isCurrentState 
                    ? '0 0 40px rgba(255,107,107,0.6), 0 0 20px rgba(255,107,107,0.4)' 
                    : isNextState
                      ? '0 0 20px rgba(78,205,196,0.5)'
                      : '0 2px 8px rgba(0,0,0,0.3)',
                  transform: isCurrentState ? 'scale(1.1)' : 'scale(1)',
                }}
              >
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: isGoal ? '#1a1a2e' : '#fff' }}>{state}</span>
                <span style={{ 
                  fontSize: '12px', 
                  opacity: 0.9, 
                  color: isGoal ? '#1a1a2e' : rewards[state] >= 0 ? '#4ECDC4' : '#FF6B6B',
                  fontWeight: 'bold'
                }}>
                  r={rewards[state]}
                </span>
              </div>
            );
          })}
          
          {/* Transition probabilities on hover */}
          {showProbabilities && currentState !== 'Goal' && (
            <div style={{
              position: 'absolute',
              right: '10px',
              top: '10px',
              background: 'rgba(0,0,0,0.8)',
              padding: '10px',
              borderRadius: '8px',
              fontSize: '11px'
            }}>
              <div style={{ marginBottom: '5px', opacity: 0.7 }}>P(s'|{currentState}, a):</div>
              {Object.entries(transitions[currentState]['a']).map(([s, p]) => (
                p > 0 && <div key={s}>→{s}: {(p*100).toFixed(0)}%</div>
              ))}
            </div>
          )}
        </div>

        {/* Control Panel */}
        <div style={{ minWidth: '300px' }}>
          <div style={{ 
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '15px',
            padding: '20px',
            marginBottom: '15px'
          }}>
            <div style={{ fontSize: '14px', marginBottom: '15px' }}>
              현재 상태: <strong style={{ color: '#FF6B6B', fontSize: '18px' }}>{currentState}</strong>
            </div>
            
            {currentState !== 'Goal' ? (
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => takeAction('a')}
                  disabled={selectedAction !== null}
                  style={{
                    flex: 1,
                    padding: '15px',
                    background: selectedAction === 'a' ? '#4ECDC4' : 'linear-gradient(135deg, #4ECDC4, #44A08D)',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#fff',
                    cursor: selectedAction ? 'not-allowed' : 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  Action A
                </button>
                <button
                  onClick={() => takeAction('b')}
                  disabled={selectedAction !== null}
                  style={{
                    flex: 1,
                    padding: '15px',
                    background: selectedAction === 'b' ? '#667eea' : 'linear-gradient(135deg, #667eea, #764ba2)',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#fff',
                    cursor: selectedAction ? 'not-allowed' : 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  Action B
                </button>
              </div>
            ) : (
              <button onClick={reset} style={{
                width: '100%',
                padding: '15px',
                background: 'linear-gradient(135deg, #F7DC6F, #F4D03F)',
                border: 'none',
                borderRadius: '10px',
                color: '#1a1a2e',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}>
                🎉 Goal 도달! 다시 시작
              </button>
            )}
          </div>

          {/* Transition Result */}
          {transitionResult && (
            <div style={{
              background: 'rgba(78,205,196,0.2)',
              borderRadius: '10px',
              padding: '15px',
              marginBottom: '15px',
              animation: 'fadeIn 0.3s ease'
            }}>
              <div style={{ fontSize: '13px', marginBottom: '10px' }}>전이 결과:</div>
              <div style={{ fontFamily: 'monospace', fontSize: '12px', lineHeight: '1.8' }}>
                P({transitionResult.nextState}|{currentState}, {selectedAction})
                {Object.entries(transitionResult.probs).map(([s, p]) => (
                  p > 0 && <div key={s} style={{ 
                    color: s === transitionResult.nextState ? '#4ECDC4' : 'inherit',
                    fontWeight: s === transitionResult.nextState ? 'bold' : 'normal'
                  }}>
                    → {s}: {(p*100).toFixed(0)}% {s === transitionResult.nextState && '✓'}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ 
            background: 'rgba(255,107,107,0.15)',
            borderRadius: '12px',
            padding: '18px',
            border: '2px solid rgba(255,107,107,0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>Cumulative Reward:</span>
              <span style={{ fontWeight: 'bold', color: totalReward >= 0 ? '#4ECDC4' : '#FF6B6B', fontSize: '24px' }}>
                {totalReward > 0 ? '+' : ''}{totalReward}
              </span>
            </div>
            <FormulaBreakdown
              formula={`Goal: max E[Σ γᵗ rₜ] where γ = ${gamma}`}
              simpleExplanation="We want to maximize the sum of all future rewards, with future rewards discounted by γ."
            />
          </div>
        </div>
      </div>

      {/* Trajectory */}
      {trajectory.length > 0 && (
        <div style={{ 
          marginTop: '20px',
          padding: '15px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '10px'
        }}>
          <div style={{ fontSize: '12px', opacity: 0.6, marginBottom: '10px' }}>Trajectory (s, a, r, s'):</div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {trajectory.map((t, i) => (
              <span key={i} style={{
                background: 'rgba(255,107,107,0.2)',
                padding: '5px 10px',
                borderRadius: '5px',
                fontSize: '12px'
              }}>
                ({t.s}, {t.a}, {t.r}, {t.s_next})
              </span>
            ))}
          </div>
        </div>
      )}

      <Callout type="key" title="Key Concepts" icon="🔑">
        <div style={{ marginBottom: '15px' }}>
          <strong>Markov Property:</strong> The future depends only on the current state, not how we got there. This simplifies everything!
      </div>
        <div style={{ marginBottom: '15px' }}>
          <strong>Components:</strong> S (States), A (Actions), P (Transition Probabilities), R (Rewards), γ (Discount Factor)
        </div>
        <div style={{ marginBottom: '15px' }}>
          <strong>Goal:</strong> Find the optimal policy π* that maximizes expected cumulative reward
        </div>
        <FormulaBreakdown
          formula="Expected Return = E[Σ γᵗ Rₜ]"
          simpleExplanation="We want to maximize the sum of all future rewards, but we value immediate rewards more than distant ones (controlled by γ)."
          steps={[
            "Start from current state",
            "Take actions according to policy π",
            "Receive rewards Rₜ at each step t",
            "Discount future rewards by γᵗ",
            "Sum everything up"
          ]}
        />
        <div style={{ marginTop: '15px', padding: '12px', background: 'rgba(255,107,107,0.2)', borderRadius: '8px' }}>
          <strong>Limitation:</strong> MDP only <em>defines</em> the problem. We need algorithms to <em>solve</em> it! → Next: Dynamic Programming
        </div>
      </Callout>
    </div>
  );
};

// ==================== 2. DP VISUALIZATION ====================
const DPViz = () => {
  const [grid, setGrid] = useState(() => Array(4).fill(null).map(() => Array(4).fill(0)));
  const [policy, setPolicy] = useState(() => Array(4).fill(null).map(() => Array(4).fill('→')));
  const [iteration, setIteration] = useState(0);
  const [phase, setPhase] = useState('evaluation'); // evaluation or improvement
  const [highlightCell, setHighlightCell] = useState(null);
  const [showCalculation, setShowCalculation] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const gamma = 0.9;
  const goalPos = { row: 3, col: 3 };
  
  const actions = [
    { name: '↑', dr: -1, dc: 0 },
    { name: '↓', dr: 1, dc: 0 },
    { name: '←', dr: 0, dc: -1 },
    { name: '→', dr: 0, dc: 1 },
  ];

  const getNextState = (r, c, action) => {
    const nr = Math.max(0, Math.min(3, r + action.dr));
    const nc = Math.max(0, Math.min(3, c + action.dc));
    return { nr, nc };
  };

  const runPolicyEvaluation = useCallback(async () => {
    setIsAnimating(true);
    setPhase('evaluation');
    const newGrid = grid.map(row => [...row]);
    
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (r === goalPos.row && c === goalPos.col) continue;
        
        setHighlightCell({ r, c });
        
        // Find current policy action
        const currentAction = actions.find(a => a.name === policy[r][c]);
        const { nr, nc } = getNextState(r, c, currentAction);
        const reward = (nr === goalPos.row && nc === goalPos.col) ? 0 : -1;
        const newValue = reward + gamma * grid[nr][nc];
        
        setShowCalculation({
          r, c,
          action: currentAction.name,
          nextState: `(${nr},${nc})`,
          reward,
          nextValue: grid[nr][nc],
          newValue,
          formula: `V(s) = R + γV(s') = ${reward} + ${gamma}×${grid[nr][nc].toFixed(1)} = ${newValue.toFixed(2)}`
        });
        
        await new Promise(resolve => setTimeout(resolve, 300));
        newGrid[r][c] = newValue;
      }
    }
    
    setGrid(newGrid);
    setHighlightCell(null);
    setShowCalculation(null);
    setIsAnimating(false);
  }, [grid, policy, gamma, goalPos.row, goalPos.col, actions]);

  const runPolicyImprovement = useCallback(async () => {
    setIsAnimating(true);
    setPhase('improvement');
    const newPolicy = policy.map(row => [...row]);
    let policyChanged = false;
    
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (r === goalPos.row && c === goalPos.col) continue;
        
        setHighlightCell({ r, c });
        
        let bestAction = actions[0];
        let bestValue = -Infinity;
        const actionValues = [];
        
        for (const action of actions) {
          const { nr, nc } = getNextState(r, c, action);
          const reward = (nr === goalPos.row && nc === goalPos.col) ? 0 : -1;
          const value = reward + gamma * grid[nr][nc];
          actionValues.push({ action: action.name, value });
          if (value > bestValue) {
            bestValue = value;
            bestAction = action;
          }
        }
        
        setShowCalculation({
          r, c,
          actionValues,
          bestAction: bestAction.name,
          oldAction: policy[r][c]
        });
        
        await new Promise(resolve => setTimeout(resolve, 300));
        
        if (newPolicy[r][c] !== bestAction.name) {
          policyChanged = true;
          newPolicy[r][c] = bestAction.name;
        }
      }
    }
    
    setPolicy(newPolicy);
    setIteration(i => i + 1);
    setHighlightCell(null);
    setShowCalculation(null);
    setIsAnimating(false);
    
    return policyChanged;
  }, [grid, policy, gamma, goalPos.row, goalPos.col, actions]);

  const reset = () => {
    setGrid(Array(4).fill(null).map(() => Array(4).fill(0)));
    setPolicy(Array(4).fill(null).map(() => Array(4).fill('→')));
    setIteration(0);
    setPhase('evaluation');
    setHighlightCell(null);
    setShowCalculation(null);
  };

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: '10px',
        background: 'linear-gradient(90deg, #4ECDC4, #44A08D)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: '32px',
        fontWeight: 'bold'
      }}>
        2. Dynamic Programming: Policy Iteration
      </h2>
      <p style={{ textAlign: 'center', opacity: 0.8, marginBottom: '20px', fontSize: '15px' }}>
        When we know the model (P, R): Iterate between <Tooltip content="Calculate how good each state is under the current policy">Policy Evaluation</Tooltip> → 
        <Tooltip content="Update the policy to choose better actions">Policy Improvement</Tooltip>
      </p>

      <ExplanationPanel title="What is Dynamic Programming?" defaultOpen={true}>
        <p style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '15px' }}>
          <strong>Dynamic Programming</strong> solves MDPs when we know the complete model (transition probabilities P and rewards R).
        </p>
        <p style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '15px' }}>
          <strong>Policy Iteration</strong> works in two steps:
        </p>
        <ol style={{ fontSize: '14px', lineHeight: '1.8', paddingLeft: '20px' }}>
          <li><strong>Policy Evaluation:</strong> Given a policy π, calculate how good each state is (V(s))</li>
          <li><strong>Policy Improvement:</strong> Update the policy to choose the best action in each state</li>
        </ol>
        <p style={{ fontSize: '14px', lineHeight: '1.8', marginTop: '15px' }}>
          We repeat these steps until the policy stops changing - then we've found the optimal policy!
        </p>
      </ExplanationPanel>

      {/* Phase indicator */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '25px' }}>
        <div style={{
          padding: '10px 25px',
          borderRadius: '25px',
          background: phase === 'evaluation' ? 'rgba(78,205,196,0.4)' : 'rgba(255,255,255,0.05)',
          border: phase === 'evaluation' ? '2px solid #4ECDC4' : '1px solid rgba(255,255,255,0.1)',
        }}>
          1. Policy Evaluation (V 계산)
        </div>
        <div style={{
          padding: '10px 25px',
          borderRadius: '25px',
          background: phase === 'improvement' ? 'rgba(247,220,111,0.4)' : 'rgba(255,255,255,0.05)',
          border: phase === 'improvement' ? '2px solid #F7DC6F' : '1px solid rgba(255,255,255,0.1)',
        }}>
          2. Policy Improvement (π 개선)
        </div>
      </div>

      <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {/* Value Grid */}
        <div>
          <div style={{ fontSize: '14px', marginBottom: '10px', textAlign: 'center', color: '#4ECDC4' }}>
            Value Function V(s)
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 75px)',
            gap: '4px',
            background: 'rgba(0,0,0,0.3)',
            padding: '15px',
            borderRadius: '15px'
          }}>
            {grid.map((row, r) => 
              row.map((value, c) => {
                const isGoal = r === goalPos.row && c === goalPos.col;
                const isHighlighted = highlightCell?.r === r && highlightCell?.c === c;
                
                return (
                  <div key={`${r}-${c}`} style={{
                    width: '75px',
                    height: '75px',
                    background: isGoal 
                      ? 'linear-gradient(135deg, #F7DC6F, #F4D03F)'
                      : isHighlighted
                        ? 'rgba(255, 107, 107, 0.6)'
                        : `rgba(78, 205, 196, ${Math.min(0.8, Math.abs(value) / 15)})`,
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: isHighlighted ? '3px solid #FF6B6B' : '2px solid rgba(255,255,255,0.1)',
                    transition: 'all 0.3s ease',
                  }}>
                    <span style={{ fontSize: '10px', opacity: 0.6 }}>({r},{c})</span>
                    <span style={{ fontSize: '16px', fontWeight: 'bold', color: isGoal ? '#1a1a2e' : '#fff' }}>
                      {isGoal ? 'GOAL' : value.toFixed(1)}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Policy Grid */}
        <div>
          <div style={{ fontSize: '14px', marginBottom: '10px', textAlign: 'center', color: '#F7DC6F' }}>
            Policy π(s)
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 75px)',
            gap: '4px',
            background: 'rgba(0,0,0,0.3)',
            padding: '15px',
            borderRadius: '15px'
          }}>
            {policy.map((row, r) => 
              row.map((action, c) => {
                const isGoal = r === goalPos.row && c === goalPos.col;
                const isHighlighted = highlightCell?.r === r && highlightCell?.c === c && phase === 'improvement';
                
                return (
                  <div key={`${r}-${c}`} style={{
                    width: '75px',
                    height: '75px',
                    background: isGoal 
                      ? 'linear-gradient(135deg, #F7DC6F, #F4D03F)'
                      : isHighlighted
                        ? 'rgba(247, 220, 111, 0.6)'
                        : 'rgba(255,255,255,0.1)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: isHighlighted ? '3px solid #F7DC6F' : '2px solid rgba(255,255,255,0.1)',
                    fontSize: '28px',
                    transition: 'all 0.3s ease',
                  }}>
                    {isGoal ? '🎯' : action}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Calculation Panel */}
        <div style={{ 
          minWidth: '280px',
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '15px',
          padding: '20px',
        }}>
          <h3 style={{ marginBottom: '15px', color: phase === 'evaluation' ? '#4ECDC4' : '#F7DC6F', fontSize: '14px' }}>
            {phase === 'evaluation' ? 'Bellman Expectation' : 'Policy Improvement'}
          </h3>
          
          {showCalculation ? (
            phase === 'evaluation' ? (
              <div style={{ fontSize: '13px' }}>
                <div style={{ marginBottom: '10px', opacity: 0.7 }}>
                  셀 ({showCalculation.r}, {showCalculation.c}), π={showCalculation.action}
                </div>
                <div style={{ 
                  background: 'rgba(78,205,196,0.2)',
                  padding: '12px',
                  borderRadius: '8px',
                  fontFamily: 'monospace',
                  lineHeight: '1.8'
                }}>
                  V(s) = R(s,π(s)) + γV(s')<br/>
                  = {showCalculation.reward} + {gamma}×{showCalculation.nextValue.toFixed(2)}<br/>
                  <strong style={{ color: '#4ECDC4' }}>= {showCalculation.newValue.toFixed(2)}</strong>
                </div>
              </div>
            ) : (
              <div style={{ fontSize: '13px' }}>
                <div style={{ marginBottom: '10px', opacity: 0.7 }}>
                  셀 ({showCalculation.r}, {showCalculation.c})
                </div>
                {showCalculation.actionValues?.map((av, i) => (
                  <div key={i} style={{
                    background: av.action === showCalculation.bestAction ? 'rgba(247,220,111,0.3)' : 'rgba(255,255,255,0.05)',
                    padding: '8px',
                    borderRadius: '5px',
                    marginBottom: '5px',
                    border: av.action === showCalculation.bestAction ? '1px solid #F7DC6F' : 'none'
                  }}>
                    {av.action}: {av.value.toFixed(2)} {av.action === showCalculation.bestAction && '✓'}
                  </div>
                ))}
                {showCalculation.oldAction !== showCalculation.bestAction && (
                  <div style={{ marginTop: '10px', color: '#F7DC6F' }}>
                    π 변경: {showCalculation.oldAction} → {showCalculation.bestAction}
                  </div>
                )}
              </div>
            )
          ) : (
            <div style={{ opacity: 0.5, textAlign: 'center', padding: '30px 0' }}>
              버튼을 눌러 실행
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '25px', flexWrap: 'wrap' }}>
        <button onClick={runPolicyEvaluation} disabled={isAnimating} style={{
          padding: '12px 25px',
          background: isAnimating ? '#666' : 'linear-gradient(135deg, #4ECDC4, #44A08D)',
          border: 'none', borderRadius: '25px', color: '#fff', cursor: isAnimating ? 'not-allowed' : 'pointer',
          fontWeight: 'bold'
        }}>
          Policy Evaluation
        </button>
        <button onClick={runPolicyImprovement} disabled={isAnimating} style={{
          padding: '12px 25px',
          background: isAnimating ? '#666' : 'linear-gradient(135deg, #F7DC6F, #F4D03F)',
          border: 'none', borderRadius: '25px', color: '#1a1a2e', cursor: isAnimating ? 'not-allowed' : 'pointer',
          fontWeight: 'bold'
        }}>
          Policy Improvement
        </button>
        <button onClick={reset} style={{
          padding: '12px 25px',
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '25px', color: '#fff', cursor: 'pointer'
        }}>
          Reset
        </button>
      </div>

      <div style={{ textAlign: 'center', marginTop: '15px', opacity: 0.7 }}>
        Iteration: {iteration}
      </div>

      <Callout type="tip" title="Policy Iteration Key Points" icon="💡">
        <div style={{ marginBottom: '15px' }}>
          <strong>Policy Evaluation:</strong> Calculate V(s) for current policy using Bellman expectation equation
      </div>
        <FormulaBreakdown
          formula="V(s) = R(s,π(s)) + γ Σ P(s'|s,π(s)) V(s')"
          simpleExplanation="The value of a state equals the immediate reward plus the discounted expected value of the next state."
          steps={[
            "Start with current policy π",
            "For each state s, calculate V(s) using the formula above",
            "Repeat until values converge"
          ]}
        />
        <div style={{ marginTop: '15px', marginBottom: '15px' }}>
          <strong>Policy Improvement:</strong> Update policy to choose the best action (greedy) in each state
        </div>
        <div style={{ marginBottom: '15px' }}>
          <strong>Convergence:</strong> When policy stops changing, we've found the optimal policy!
        </div>
        <div style={{ padding: '12px', background: 'rgba(255,107,107,0.2)', borderRadius: '8px', marginTop: '15px' }}>
          <strong>Limitation:</strong> Requires knowing P(s'|s,a) and R. If we don't know the model → Use <strong>Monte Carlo</strong> or <strong>Temporal Difference</strong> methods!
        </div>
      </Callout>
    </div>
  );
};

// ==================== 3. MC VISUALIZATION ====================
const MCViz = ({ onShowComparison }) => {
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [stateReturns, setStateReturns] = useState({});
  const [stateValues, setStateValues] = useState({});
  const [phase, setPhase] = useState('idle');
  const [highlightStep, setHighlightStep] = useState(-1);
  
  const gamma = 0.9;
  const goalPos = { row: 3, col: 3 };

  const generateEpisode = useCallback(async () => {
    setPhase('generating');
    const episode = [];
    let pos = { row: 0, col: 0 };
    
    while (!(pos.row === goalPos.row && pos.col === goalPos.col) && episode.length < 12) {
      const dr = Math.random() > 0.4 ? 1 : (Math.random() > 0.5 ? 0 : -1);
      const dc = Math.random() > 0.4 ? 1 : (Math.random() > 0.5 ? 0 : -1);
      
      const newRow = Math.max(0, Math.min(3, pos.row + dr));
      const newCol = Math.max(0, Math.min(3, pos.col + dc));
      const reward = (newRow === goalPos.row && newCol === goalPos.col) ? 10 : -1;
      
      episode.push({
        state: `(${pos.row},${pos.col})`,
        row: pos.row,
        col: pos.col,
        reward,
        returnValue: null
      });
      
      pos = { row: newRow, col: newCol };
      setCurrentEpisode([...episode]);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    episode.push({
      state: `(${pos.row},${pos.col})`,
      row: pos.row,
      col: pos.col,
      reward: 0,
      returnValue: 0
    });
    
    setCurrentEpisode([...episode]);
    return episode;
  }, [goalPos.row, goalPos.col]);

  const calculateReturns = useCallback(async (episode) => {
    setPhase('calculating');
    const updated = [...episode];
    let G = 0;
    
    for (let t = episode.length - 1; t >= 0; t--) {
      G = episode[t].reward + gamma * G;
      updated[t].returnValue = G;
      setHighlightStep(t);
      setCurrentEpisode([...updated]);
      await new Promise(resolve => setTimeout(resolve, 400));
    }
    
    return updated;
  }, [gamma]);

  const updateAverages = useCallback(async (episode) => {
    setPhase('averaging');
    const newReturns = { ...stateReturns };
    const newValues = { ...stateValues };
    const visited = new Set();
    
    for (let t = 0; t < episode.length - 1; t++) {
      const state = episode[t].state;
      if (!visited.has(state)) {
        visited.add(state);
        if (!newReturns[state]) newReturns[state] = [];
        newReturns[state].push(episode[t].returnValue);
        newValues[state] = newReturns[state].reduce((a, b) => a + b, 0) / newReturns[state].length;
        
        setHighlightStep(t);
        setStateReturns({ ...newReturns });
        setStateValues({ ...newValues });
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }
    
    setEpisodes(prev => [...prev, episode]);
    setHighlightStep(-1);
    setPhase('idle');
  }, [stateReturns, stateValues]);

  const runEpisode = async () => {
    const episode = await generateEpisode();
    const withReturns = await calculateReturns(episode);
    await updateAverages(withReturns);
  };

  const reset = () => {
    setEpisodes([]);
    setCurrentEpisode(null);
    setStateReturns({});
    setStateValues({});
    setPhase('idle');
    setHighlightStep(-1);
  };

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: '10px',
        background: 'linear-gradient(90deg, #45B7D1, #2980B9)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: '32px',
        fontWeight: 'bold'
      }}>
        3. Monte Carlo Methods
      </h2>
      <p style={{ textAlign: 'center', opacity: 0.8, marginBottom: '20px', fontSize: '15px' }}>
        <Tooltip content="We don't need to know the model - we learn by interacting with the environment">Model-free</Tooltip> learning from episodes: 
        Episode → Calculate Return → Average to estimate V(s)
      </p>

      <ExplanationPanel title="What is Monte Carlo?" defaultOpen={true}>
        <p style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '15px' }}>
          <strong>Monte Carlo</strong> methods learn from complete episodes of experience, without needing to know the environment's dynamics.
        </p>
        <p style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '15px' }}>
          <strong>Key Steps:</strong>
        </p>
        <ol style={{ fontSize: '14px', lineHeight: '1.8', paddingLeft: '20px' }}>
          <li><strong>Generate Episode:</strong> Interact with environment until episode ends</li>
          <li><strong>Calculate Return:</strong> Work backwards, computing G_t = R_t + γR_{t+1} + γ²R_{t+2} + ...</li>
          <li><strong>Update Values:</strong> Average the returns for each state to estimate V(s)</li>
        </ol>
        <p style={{ fontSize: '14px', lineHeight: '1.8', marginTop: '15px' }}>
          <strong>Advantage:</strong> No model needed! Just interact and learn.<br/>
          <strong>Disadvantage:</strong> Must wait for episode to end before updating. High variance.
        </p>
      </ExplanationPanel>

      {/* Phase indicator */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '25px', flexWrap: 'wrap' }}>
        {[
          { id: 'generating', label: '1. Episode 생성', color: '#45B7D1' },
          { id: 'calculating', label: '2. Return G_t 계산 (역방향)', color: '#F7DC6F' },
          { id: 'averaging', label: '3. V(s) = 평균(G)', color: '#4ECDC4' }
        ].map(p => (
          <div key={p.id} style={{
            padding: '8px 20px',
            borderRadius: '20px',
            background: phase === p.id ? `${p.color}40` : 'rgba(255,255,255,0.05)',
            border: phase === p.id ? `2px solid ${p.color}` : '1px solid rgba(255,255,255,0.1)',
            fontSize: '13px'
          }}>
            {p.label}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '25px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {/* Grid */}
        <div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 70px)',
            gap: '4px',
            background: 'rgba(0,0,0,0.3)',
            padding: '15px',
            borderRadius: '15px'
          }}>
            {Array(4).fill(null).map((_, r) =>
              Array(4).fill(null).map((_, c) => {
                const isGoal = r === goalPos.row && c === goalPos.col;
                const state = `(${r},${c})`;
                const value = stateValues[state];
                const visits = stateReturns[state]?.length || 0;
                const isInPath = currentEpisode?.some(step => step.row === r && step.col === c);
                const stepIdx = currentEpisode?.findIndex(step => step.row === r && step.col === c);
                const isHighlighted = highlightStep >= 0 && stepIdx === highlightStep;
                
                return (
                  <div key={`${r}-${c}`} style={{
                    width: '70px',
                    height: '70px',
                    background: isGoal 
                      ? 'linear-gradient(135deg, #F7DC6F, #F4D03F)'
                      : isHighlighted ? 'rgba(255,107,107,0.6)'
                      : isInPath ? 'rgba(69,183,209,0.4)'
                      : visits > 0 ? `rgba(69,183,209,${Math.min(0.7, visits * 0.15)})` : 'rgba(255,255,255,0.05)',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: isHighlighted ? '3px solid #FF6B6B' : '2px solid rgba(255,255,255,0.1)',
                    transition: 'all 0.2s ease',
                  }}>
                    <span style={{ fontSize: '10px', opacity: 0.6 }}>({r},{c})</span>
                    <span style={{ fontSize: '14px', fontWeight: 'bold', color: isGoal ? '#1a1a2e' : '#fff' }}>
                      {isGoal ? 'G' : value?.toFixed(1) ?? '?'}
                    </span>
                    {visits > 0 && !isGoal && (
                      <span style={{ fontSize: '9px', opacity: 0.5 }}>n={visits}</span>
                    )}
                  </div>
                );
              })
            )}
          </div>
          <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '13px', opacity: 0.7 }}>
            Episodes: {episodes.length}
          </div>
        </div>

        {/* Episode detail */}
        <div style={{ 
          minWidth: '350px',
          maxWidth: '400px',
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '15px',
          padding: '20px',
          maxHeight: '400px',
          overflow: 'auto'
        }}>
          <h3 style={{ marginBottom: '15px', color: '#45B7D1', fontSize: '14px' }}>
            Current Episode
          </h3>
          
          {currentEpisode ? (
            <div>
              {/* Trajectory line */}
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap',
                gap: '5px',
                marginBottom: '15px',
                padding: '10px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '8px'
              }}>
                {currentEpisode.map((step, i) => (
                  <React.Fragment key={i}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: highlightStep === i ? 'rgba(255,107,107,0.5)' : 'rgba(69,183,209,0.3)',
                      fontSize: '11px',
                      border: highlightStep === i ? '2px solid #FF6B6B' : 'none'
                    }}>
                      {step.state}
                    </span>
                    {i < currentEpisode.length - 1 && <span style={{ opacity: 0.5 }}>→</span>}
                  </React.Fragment>
                ))}
              </div>

              {/* Step table */}
              <div style={{ fontSize: '12px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '5px', marginBottom: '8px', fontWeight: 'bold', opacity: 0.6 }}>
                  <span>State</span>
                  <span>R_t</span>
                  <span>G_t</span>
                </div>
                {currentEpisode.map((step, i) => (
                  <div key={i} style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: '5px',
                    padding: '6px',
                    background: highlightStep === i ? 'rgba(255,107,107,0.3)' : 'rgba(255,255,255,0.03)',
                    borderRadius: '4px',
                    marginBottom: '2px'
                  }}>
                    <span>{step.state}</span>
                    <span>{step.reward}</span>
                    <span style={{ color: step.returnValue !== null ? '#4ECDC4' : 'inherit', fontWeight: step.returnValue !== null ? 'bold' : 'normal' }}>
                      {step.returnValue !== null ? step.returnValue.toFixed(2) : '...'}
                    </span>
                  </div>
                ))}
              </div>

              {phase === 'calculating' && highlightStep >= 0 && highlightStep < currentEpisode.length - 1 && (
                <div style={{
                  marginTop: '15px',
                  padding: '10px',
                  background: 'rgba(247,220,111,0.2)',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontFamily: 'monospace'
                }}>
                  G_{highlightStep} = R_{highlightStep} + γ·G_{highlightStep+1}<br/>
                  = {currentEpisode[highlightStep].reward} + {gamma}×{currentEpisode[highlightStep+1]?.returnValue?.toFixed(2)}<br/>
                  <strong style={{ color: '#F7DC6F' }}>= {currentEpisode[highlightStep].returnValue?.toFixed(2)}</strong>
                </div>
              )}
            </div>
          ) : (
            <div style={{ opacity: 0.5, textAlign: 'center', padding: '30px 0' }}>
              Episode를 실행하세요
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '25px', flexWrap: 'wrap' }}>
        <button onClick={runEpisode} disabled={phase !== 'idle'} style={{
          padding: '12px 25px',
          background: phase !== 'idle' ? '#666' : 'linear-gradient(135deg, #45B7D1, #2980B9)',
          border: 'none', borderRadius: '25px', color: '#fff', 
          cursor: phase !== 'idle' ? 'not-allowed' : 'pointer', fontWeight: 'bold'
        }}>
          Run Episode
        </button>
        <button onClick={reset} style={{
          padding: '12px 25px',
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '25px', color: '#fff', cursor: 'pointer'
        }}>
          Reset
        </button>
        {onShowComparison && (
          <button onClick={() => onShowComparison('MC', 'TD')} style={{
            padding: '12px 25px',
            background: 'rgba(150,206,180,0.2)',
            border: '1px solid #96CEB4',
            borderRadius: '25px', color: '#96CEB4', cursor: 'pointer', fontWeight: 'bold'
          }}>
            🔍 Compare MC vs TD
          </button>
        )}
      </div>

      <Callout type="tip" title="Monte Carlo Key Points" icon="💡">
        <div style={{ marginBottom: '15px' }}>
          <strong>Model-free:</strong> Learn by interacting with the environment - no need to know P(s'|s,a)!
      </div>
        <FormulaBreakdown
          formula="G_t = R_t + γR_{t+1} + γ²R_{t+2} + ..."
          simpleExplanation="The return is the actual cumulative reward we experienced from time t onwards, with future rewards discounted."
          steps={[
            "Start from the end of the episode",
            "Work backwards: G_t = R_t + γ·G_{t+1}",
            "Each G_t is the actual return we got"
          ]}
        />
        <div style={{ marginTop: '15px', marginBottom: '15px' }}>
          <strong>First-visit MC:</strong> Only use the return from the first time we visit each state in an episode
        </div>
        <div style={{ padding: '12px', background: 'rgba(255,107,107,0.2)', borderRadius: '8px', marginTop: '15px' }}>
          <strong>Limitation:</strong> Must wait for episode to <em>end</em> before updating. High variance. → Next: <strong>Temporal Difference</strong> for online learning!
        </div>
      </Callout>
    </div>
  );
};

// ==================== 4. TD VISUALIZATION ====================
const TDViz = ({ onShowComparison }) => {
  const [grid, setGrid] = useState(() => {
    const g = {};
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) g[`${r},${c}`] = 0;
    return g;
  });
  const [agentPos, setAgentPos] = useState({ row: 0, col: 0 });
  const [stepCount, setStepCount] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [trajectory, setTrajectory] = useState([]);
  
  const alpha = 0.1;
  const gamma = 0.9;
  const goalPos = { row: 3, col: 3 };

  const takeStep = useCallback(() => {
    const { row, col } = agentPos;
    
    if (row === goalPos.row && col === goalPos.col) {
      setAgentPos({ row: 0, col: 0 });
      setTrajectory([]);
      return;
    }

    const actions = [{ dr: -1, dc: 0, name: '↑' }, { dr: 1, dc: 0, name: '↓' }, { dr: 0, dc: -1, name: '←' }, { dr: 0, dc: 1, name: '→' }];
    const action = actions[Math.floor(Math.random() * 4)];
    
    const newRow = Math.max(0, Math.min(3, row + action.dr));
    const newCol = Math.max(0, Math.min(3, col + action.dc));
    const reward = (newRow === goalPos.row && newCol === goalPos.col) ? 10 : -1;
    
    const currentKey = `${row},${col}`;
    const nextKey = `${newRow},${newCol}`;
    const oldValue = grid[currentKey];
    const nextValue = grid[nextKey];
    const tdError = reward + gamma * nextValue - oldValue;
    const newValue = oldValue + alpha * tdError;
    
    setLastUpdate({
      state: `(${row},${col})`, nextState: `(${newRow},${newCol})`,
      action: action.name, reward, oldValue, nextValue, tdError, newValue,
    });
    
    setGrid(prev => ({ ...prev, [currentKey]: newValue }));
    setTrajectory(prev => [...prev.slice(-8), { row, col, action: action.name }]);
    setAgentPos({ row: newRow, col: newCol });
    setStepCount(s => s + 1);
  }, [agentPos, grid, alpha, gamma, goalPos.row, goalPos.col]);

  useEffect(() => {
    if (isRunning) {
      const timer = setTimeout(takeStep, 600);
      return () => clearTimeout(timer);
    }
  }, [isRunning, takeStep]);

  const reset = () => {
    const g = {};
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) g[`${r},${c}`] = 0;
    setGrid(g);
    setAgentPos({ row: 0, col: 0 });
    setStepCount(0);
    setLastUpdate(null);
    setIsRunning(false);
    setTrajectory([]);
  };

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: '10px',
        background: 'linear-gradient(90deg, #96CEB4, #88D8B0)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: '32px',
        fontWeight: 'bold'
      }}>
        4. Temporal-Difference Learning
      </h2>
      <p style={{ textAlign: 'center', opacity: 0.8, marginBottom: '20px', fontSize: '15px' }}>
        Update immediately at each step using <Tooltip content="TD Error: the difference between predicted and actual value">TD Error</Tooltip> 
        (<Tooltip content="Using our current estimate instead of waiting for actual return">Bootstrap</Tooltip>)
      </p>

      <ExplanationPanel title="What is Temporal Difference Learning?" defaultOpen={true}>
        <p style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '15px' }}>
          <strong>Temporal Difference (TD)</strong> learning combines the best of both worlds: model-free like Monte Carlo, but updates online like Dynamic Programming.
        </p>
        <p style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '15px' }}>
          <strong>Key Difference from MC:</strong> Instead of waiting for the actual return G_t, we use our current estimate V(s') to bootstrap.
        </p>
        <p style={{ fontSize: '14px', lineHeight: '1.8', marginTop: '15px' }}>
          <strong>Advantage:</strong> Can update after every step, not just at episode end. Lower variance than MC.<br/>
          <strong>Trade-off:</strong> Slightly biased (uses estimates), but much faster learning.
        </p>
      </ExplanationPanel>

      <div style={{ display: 'flex', gap: '25px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {/* Grid */}
        <div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 70px)',
            gap: '4px',
            background: 'rgba(0,0,0,0.3)',
            padding: '15px',
            borderRadius: '15px'
          }}>
            {Array(4).fill(null).map((_, r) =>
              Array(4).fill(null).map((_, c) => {
                const isGoal = r === goalPos.row && c === goalPos.col;
                const isAgent = r === agentPos.row && c === agentPos.col;
                const value = grid[`${r},${c}`] || 0;
                const isLastUpdated = lastUpdate?.state === `(${r},${c})`;
                
                return (
                  <div key={`${r}-${c}`} style={{
                    width: '70px',
                    height: '70px',
                    background: isGoal 
                      ? 'linear-gradient(135deg, #F7DC6F, #F4D03F)'
                      : isLastUpdated ? 'rgba(255,107,107,0.5)'
                      : `rgba(150,206,180,${Math.min(0.8, Math.abs(value) / 15)})`,
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: isLastUpdated ? '3px solid #FF6B6B' : '2px solid rgba(255,255,255,0.1)',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                  }}>
                    {isAgent && (
                      <div style={{
                        position: 'absolute',
                        width: '25px',
                        height: '25px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        border: '2px solid #fff',
                        boxShadow: '0 0 15px rgba(102,126,234,0.8)',
                        zIndex: 10,
                      }} />
                    )}
                    {!isAgent && (
                      <>
                        <span style={{ fontSize: '10px', opacity: 0.6 }}>({r},{c})</span>
                        <span style={{ fontSize: '14px', fontWeight: 'bold', color: isGoal ? '#1a1a2e' : '#fff' }}>
                          {isGoal ? 'G' : value.toFixed(1)}
                        </span>
                      </>
                    )}
                  </div>
                );
              })
            )}
          </div>
          <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '13px', opacity: 0.7 }}>
            Steps: {stepCount}
          </div>
        </div>

        {/* TD Update Panel */}
        <div style={{ 
          minWidth: '320px',
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '15px',
          padding: '20px'
        }}>
          <h3 style={{ marginBottom: '15px', color: '#96CEB4', fontSize: '14px' }}>
            TD(0) Update
          </h3>
          
          {lastUpdate ? (
            <div style={{ fontSize: '13px' }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px',
                marginBottom: '20px', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', opacity: 0.6 }}>State</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{lastUpdate.state}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px' }}>{lastUpdate.action}</div>
                  <div style={{ fontSize: '10px', opacity: 0.6 }}>r={lastUpdate.reward}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', opacity: 0.6 }}>Next</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{lastUpdate.nextState}</div>
                </div>
              </div>

              <div style={{ background: 'rgba(150,206,180,0.15)', padding: '15px', borderRadius: '10px', marginBottom: '15px' }}>
                <div style={{ marginBottom: '8px', opacity: 0.7, fontSize: '12px' }}>TD Error (δ):</div>
                <div style={{ fontFamily: 'monospace', fontSize: '12px', lineHeight: '1.8' }}>
                  δ = R + γ·V(s') - V(s)<br/>
                  δ = {lastUpdate.reward} + {gamma}×{lastUpdate.nextValue.toFixed(2)} - {lastUpdate.oldValue.toFixed(2)}<br/>
                  <span style={{ color: lastUpdate.tdError > 0 ? '#4ECDC4' : '#E74C3C', fontWeight: 'bold', fontSize: '15px' }}>
                    δ = {lastUpdate.tdError.toFixed(3)}
                  </span>
                </div>
              </div>

              <div style={{ background: 'rgba(78,205,196,0.2)', padding: '15px', borderRadius: '10px' }}>
                <div style={{ marginBottom: '8px', opacity: 0.7, fontSize: '12px' }}>Value Update:</div>
                <div style={{ fontFamily: 'monospace', fontSize: '12px', lineHeight: '1.8' }}>
                  V(s) ← V(s) + α·δ<br/>
                  V{lastUpdate.state} ← {lastUpdate.oldValue.toFixed(2)} + {alpha}×{lastUpdate.tdError.toFixed(3)}<br/>
                  <span style={{ fontWeight: 'bold', color: '#4ECDC4', fontSize: '15px' }}>
                    V{lastUpdate.state} = {lastUpdate.newValue.toFixed(3)}
                  </span>
                </div>
              </div>

              <div style={{
                marginTop: '12px', padding: '10px', borderRadius: '6px', fontSize: '11px',
                background: lastUpdate.tdError > 0 ? 'rgba(78,205,196,0.1)' : 'rgba(231,76,60,0.1)',
                borderLeft: `3px solid ${lastUpdate.tdError > 0 ? '#4ECDC4' : '#E74C3C'}`
              }}>
                {lastUpdate.tdError > 0 ? '📈 예상보다 좋음 → 가치 상향' : '📉 예상보다 나쁨 → 가치 하향'}
              </div>
            </div>
          ) : (
            <div style={{ opacity: 0.5, textAlign: 'center', padding: '30px 0' }}>
              Step을 실행하세요
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '25px', flexWrap: 'wrap' }}>
        <button onClick={takeStep} disabled={isRunning} style={{
          padding: '12px 25px',
          background: 'linear-gradient(135deg, #96CEB4, #88D8B0)',
          border: 'none', borderRadius: '25px', color: '#1a1a2e', fontWeight: 'bold', cursor: 'pointer'
        }}>
          Take Step
        </button>
        <button onClick={() => setIsRunning(!isRunning)} style={{
          padding: '12px 25px',
          background: isRunning ? '#E74C3C' : 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '25px', color: '#fff', cursor: 'pointer'
        }}>
          {isRunning ? 'Stop' : 'Auto Run'}
        </button>
        <button onClick={reset} style={{
          padding: '12px 25px',
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '25px', color: '#fff', cursor: 'pointer'
        }}>
          Reset
        </button>
        {onShowComparison && (
          <button onClick={() => onShowComparison('MC', 'TD')} style={{
            padding: '12px 25px',
            background: 'rgba(69,183,209,0.2)',
            border: '1px solid #45B7D1',
            borderRadius: '25px', color: '#45B7D1', cursor: 'pointer', fontWeight: 'bold'
          }}>
            🔍 Compare MC vs TD
          </button>
        )}
      </div>

      <Callout type="tip" title="TD vs MC: Key Differences" icon="💡">
        <div style={{ marginBottom: '15px' }}>
          <strong>Bootstrap:</strong> Use current estimate V(s') instead of waiting for actual return G_t
      </div>
        <FormulaBreakdown
          formula="TD Error: δ = R + γV(s') - V(s)"
          simpleExplanation="The TD error measures how wrong our current estimate is. If positive, we underestimated; if negative, we overestimated."
          steps={[
            "Observe reward R and next state s'",
            "Calculate target: R + γV(s')",
            "Compare with current estimate V(s)",
            "Update: V(s) ← V(s) + α·δ"
          ]}
        />
        <div style={{ marginTop: '15px', marginBottom: '15px' }}>
          <strong>Online:</strong> Update immediately at each step, no need to wait for episode end
        </div>
        <div style={{ marginBottom: '15px', padding: '10px', background: 'rgba(78,205,196,0.2)', borderRadius: '8px' }}>
          <strong>Bias-Variance Trade-off:</strong><br/>
          • MC: Unbiased but high variance (uses actual returns)<br/>
          • TD: Slightly biased but low variance (uses estimates)
        </div>
        <div style={{ padding: '12px', background: 'rgba(255,107,107,0.2)', borderRadius: '8px', marginTop: '15px' }}>
          <strong>Limitation:</strong> Tabular method - can't scale to large state spaces → Next: <strong>Function Approximation</strong>!
        </div>
      </Callout>
    </div>
  );
};

// ==================== 5. FUNCTION APPROXIMATION ====================
const FAViz = () => {
  const [weights, setWeights] = useState([0.5, 0.5]);
  const [samples, setSamples] = useState([]);
  const [iteration, setIteration] = useState(0);
  const [currentSample, setCurrentSample] = useState(null);
  const [loss, setLoss] = useState(0);
  
  const alpha = 0.01;
  const trueW = [2, 0.8]; // True weights

  const trueValue = (s) => trueW[0] + trueW[1] * s;
  const predictValue = (s, w) => w[0] + w[1] * s;
  const features = (s) => [1, s];

  useEffect(() => {
    const newSamples = [];
    for (let s = 0; s <= 10; s++) {
      newSamples.push({
        state: s,
        target: trueValue(s) + (Math.random() - 0.5) * 2, // True + noise
        prediction: predictValue(s, weights)
      });
    }
    setSamples(newSamples);
    
    const mse = newSamples.reduce((sum, s) => sum + Math.pow(s.target - s.prediction, 2), 0) / newSamples.length;
    setLoss(mse);
  }, [weights]);

  const gradientStep = () => {
    const sample = samples[Math.floor(Math.random() * samples.length)];
    setCurrentSample(sample);
    
    const error = sample.target - predictValue(sample.state, weights);
    const feat = features(sample.state);
    
    setWeights(prev => [
      prev[0] + alpha * error * feat[0],
      prev[1] + alpha * error * feat[1]
    ]);
    setIteration(i => i + 1);
  };

  const runMany = () => {
    for (let i = 0; i < 50; i++) {
      setTimeout(() => gradientStep(), i * 50);
    }
  };

  const reset = () => {
    setWeights([0.5, 0.5]);
    setIteration(0);
    setCurrentSample(null);
  };

  const maxY = Math.max(...samples.map(s => Math.max(s.target, s.prediction))) + 1;

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: '10px',
        background: 'linear-gradient(90deg, #FFEAA7, #FDCB6E)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: '32px',
        fontWeight: 'bold'
      }}>
        5. Function Approximation
      </h2>
      <p style={{ textAlign: 'center', opacity: 0.8, marginBottom: '20px', fontSize: '15px' }}>
        V(s) ≈ w·φ(s) — Generalize with parameters, learn with <Tooltip content="Optimization method that finds the best parameters">Gradient Descent</Tooltip>
      </p>

      <ExplanationPanel title="What is Function Approximation?" defaultOpen={true}>
        <p style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '15px' }}>
          When state spaces are huge (or infinite), we can't store a value for every state. Instead, we use a <strong>function approximator</strong> to generalize.
        </p>
        <p style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '15px' }}>
          <strong>Key Idea:</strong> Similar states should have similar values. We learn parameters w that map states to values.
        </p>
        <p style={{ fontSize: '14px', lineHeight: '1.8', marginTop: '15px' }}>
          <strong>Benefits:</strong> Can handle large/continuous state spaces, generalizes to unseen states<br/>
          <strong>Challenge:</strong> Combining with bootstrapping and off-policy learning can be unstable (Deadly Triad)
        </p>
      </ExplanationPanel>

      <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {/* Graph */}
        <div style={{ 
          width: '450px',
          height: '280px',
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '15px',
          padding: '20px',
          position: 'relative'
        }}>
          {/* Y axis */}
          <div style={{ position: 'absolute', left: '30px', top: '20px', bottom: '40px', width: '2px', background: 'rgba(255,255,255,0.3)' }} />
          {/* X axis */}
          <div style={{ position: 'absolute', left: '30px', right: '20px', bottom: '40px', height: '2px', background: 'rgba(255,255,255,0.3)' }} />
          
          {/* Target points */}
          {samples.map((s, i) => (
            <div key={`target-${i}`} style={{
              position: 'absolute',
              left: `${35 + s.state * 38}px`,
              bottom: `${45 + (s.target / maxY) * 180}px`,
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: currentSample?.state === s.state ? '#FF6B6B' : '#4ECDC4',
              transform: 'translate(-50%, 50%)',
              border: currentSample?.state === s.state ? '2px solid #fff' : 'none',
              transition: 'all 0.2s'
            }} />
          ))}
          
          {/* Prediction line */}
          <svg style={{ position: 'absolute', left: '35px', bottom: '45px', width: '400px', height: '200px' }}>
            <line
              x1="0"
              y1={200 - (predictValue(0, weights) / maxY) * 180}
              x2="380"
              y2={200 - (predictValue(10, weights) / maxY) * 180}
              stroke="#FFEAA7"
              strokeWidth="3"
              style={{ filter: 'drop-shadow(0 0 5px rgba(255,234,167,0.5))' }}
            />
          </svg>
          
          {/* Legend */}
          <div style={{ position: 'absolute', top: '10px', right: '15px', fontSize: '11px' }}>
            <span style={{ color: '#4ECDC4' }}>● Target</span>
            <span style={{ color: '#FFEAA7', marginLeft: '10px' }}>— V_w(s)</span>
          </div>
          
          {/* Axes labels */}
          <div style={{ position: 'absolute', bottom: '15px', left: '50%', transform: 'translateX(-50%)', fontSize: '12px', opacity: 0.6 }}>State s</div>
          <div style={{ position: 'absolute', left: '5px', top: '50%', transform: 'rotate(-90deg)', fontSize: '12px', opacity: 0.6 }}>V(s)</div>
        </div>

        {/* Parameters Panel */}
        <div style={{ minWidth: '280px' }}>
          <div style={{ 
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '15px',
            padding: '20px',
            marginBottom: '15px'
          }}>
            <h3 style={{ marginBottom: '15px', color: '#FFEAA7', fontSize: '14px' }}>Parameters</h3>
            
            <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '12px', opacity: 0.6 }}>w₀ (bias)</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FFEAA7' }}>{weights[0].toFixed(3)}</div>
                <div style={{ fontSize: '10px', opacity: 0.5 }}>true: {trueW[0]}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '12px', opacity: 0.6 }}>w₁ (slope)</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FFEAA7' }}>{weights[1].toFixed(3)}</div>
                <div style={{ fontSize: '10px', opacity: 0.5 }}>true: {trueW[1]}</div>
              </div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '12px', opacity: 0.6 }}>MSE Loss</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#E74C3C' }}>{loss.toFixed(3)}</div>
            </div>
          </div>

          {currentSample && (
            <div style={{ 
              background: 'rgba(255,234,167,0.15)',
              borderRadius: '10px',
              padding: '15px',
              fontSize: '12px',
              fontFamily: 'monospace'
            }}>
              <div style={{ marginBottom: '8px', opacity: 0.7 }}>Last Update (s={currentSample.state}):</div>
              error = target - V_w(s)<br/>
              = {currentSample.target.toFixed(2)} - {currentSample.prediction.toFixed(2)}<br/>
              w ← w + α·error·φ(s)
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '25px' }}>
        <button onClick={gradientStep} style={{
          padding: '12px 25px',
          background: 'linear-gradient(135deg, #FFEAA7, #FDCB6E)',
          border: 'none', borderRadius: '25px', color: '#1a1a2e', fontWeight: 'bold', cursor: 'pointer'
        }}>
          Gradient Step
        </button>
        <button onClick={runMany} style={{
          padding: '12px 25px',
          background: 'linear-gradient(135deg, #F7DC6F, #F4D03F)',
          border: 'none', borderRadius: '25px', color: '#1a1a2e', fontWeight: 'bold', cursor: 'pointer'
        }}>
          Run 50 Steps
        </button>
        <button onClick={reset} style={{
          padding: '12px 25px',
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '25px', color: '#fff', cursor: 'pointer'
        }}>
          Reset
        </button>
      </div>
      <div style={{ textAlign: 'center', marginTop: '10px', opacity: 0.6, fontSize: '13px' }}>
        Iterations: {iteration}
      </div>

      <Callout type="tip" title="Function Approximation Key Points" icon="💡">
        <div style={{ marginBottom: '15px' }}>
          <strong>Generalization:</strong> Use V_w(s) = w·φ(s) instead of a table → similar states share values
      </div>
        <FormulaBreakdown
          formula="V_w(s) = w₀·φ₀(s) + w₁·φ₁(s) + ... = w·φ(s)"
          simpleExplanation="We represent the value function as a weighted combination of features. The weights w are what we learn."
          steps={[
            "Define features φ(s) that describe the state",
            "Initialize weights w randomly",
            "For each sample (s, target):",
            "  - Predict: V_w(s) = w·φ(s)",
            "  - Calculate error: (target - V_w(s))²",
            "  - Update: w ← w + α·error·φ(s)"
          ]}
        />
        <div style={{ marginTop: '15px', marginBottom: '15px' }}>
          <strong>Target:</strong> Use G_t for MC, or r + γV_w(s') for TD
        </div>
        <div style={{ padding: '12px', background: 'rgba(255,107,107,0.2)', borderRadius: '8px', marginTop: '15px' }}>
          <strong>Deadly Triad:</strong> Bootstrap + Function Approximation + Off-policy = Risk of divergence!<br/>
          → Next: <strong>DQN</strong> uses tricks (replay buffer, target network) to stabilize learning!
        </div>
      </Callout>
    </div>
  );
};

// ==================== 6. DQN VISUALIZATION ====================
const DQNViz = () => {
  const [replayBuffer, setReplayBuffer] = useState([]);
  const [qNetwork, setQNetwork] = useState({ w: [1, 1, 1] });
  const [targetNetwork, setTargetNetwork] = useState({ w: [1, 1, 1] });
  const [syncStep, setSyncStep] = useState(0);
  const [step, setStep] = useState(0);
  const [lastLoss, setLastLoss] = useState(null);
  const [epsilon, setEpsilon] = useState(1.0);

  const getQValues = (state, network) => {
    return [
      network.w[0] + state * 0.5,
      network.w[1] + state * 0.3,
      network.w[2] + state * 0.4
    ];
  };

  const addExperience = () => {
    const state = Math.floor(Math.random() * 5);
    const action = Math.random() < epsilon 
      ? Math.floor(Math.random() * 3) 
      : getQValues(state, qNetwork).indexOf(Math.max(...getQValues(state, qNetwork)));
    const reward = Math.random() * 10 - 2;
    const nextState = Math.min(4, state + (Math.random() > 0.5 ? 1 : 0));
    const done = nextState === 4;
    
    setReplayBuffer(prev => [...prev.slice(-11), { state, action, reward, nextState, done, id: Date.now() }]);
    setStep(s => s + 1);
    setEpsilon(prev => Math.max(0.1, prev * 0.99));
  };

  const trainStep = () => {
    if (replayBuffer.length < 4) return;
    
    // Sample mini-batch
    const batch = [];
    for (let i = 0; i < 4; i++) {
      batch.push(replayBuffer[Math.floor(Math.random() * replayBuffer.length)]);
    }
    
    let totalLoss = 0;
    const newW = [...qNetwork.w];
    
    batch.forEach(exp => {
      const targetQs = getQValues(exp.nextState, targetNetwork);
      const maxNextQ = exp.done ? 0 : Math.max(...targetQs);
      const target = exp.reward + 0.9 * maxNextQ;
      
      const currentQ = getQValues(exp.state, qNetwork)[exp.action];
      const loss = Math.pow(target - currentQ, 2);
      totalLoss += loss;
      
      // Simple gradient update
      newW[exp.action] += 0.01 * (target - currentQ);
    });
    
    setQNetwork({ w: newW });
    setLastLoss(totalLoss / batch.length);
  };

  const syncTarget = () => {
    setTargetNetwork({ w: [...qNetwork.w] });
    setSyncStep(step);
  };

  const reset = () => {
    setReplayBuffer([]);
    setQNetwork({ w: [1, 1, 1] });
    setTargetNetwork({ w: [1, 1, 1] });
    setStep(0);
    setSyncStep(0);
    setEpsilon(1.0);
    setLastLoss(null);
  };

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: '10px',
        background: 'linear-gradient(90deg, #DDA0DD, #BA68C8)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: '32px',
        fontWeight: 'bold'
      }}>
        6. Deep Q-Network (DQN)
      </h2>
      <p style={{ textAlign: 'center', opacity: 0.8, marginBottom: '20px', fontSize: '15px' }}>
        Stabilizing Deep RL with <Tooltip content="Stores past experiences for replay">Replay Buffer</Tooltip> + 
        <Tooltip content="Separate network for stable target values">Target Network</Tooltip>
      </p>

      <ExplanationPanel title="What is DQN?" defaultOpen={true}>
        <p style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '15px' }}>
          <strong>Deep Q-Network (DQN)</strong> combines Q-learning with deep neural networks to handle complex, high-dimensional state spaces.
        </p>
        <p style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '15px' }}>
          <strong>Two Key Innovations:</strong>
        </p>
        <ol style={{ fontSize: '14px', lineHeight: '1.8', paddingLeft: '20px' }}>
          <li><strong>Experience Replay:</strong> Store experiences in a buffer, sample randomly to break correlations</li>
          <li><strong>Target Network:</strong> Use a separate, slowly-updated network for stable target values</li>
        </ol>
        <p style={{ fontSize: '14px', lineHeight: '1.8', marginTop: '15px' }}>
          These tricks solve the "Deadly Triad" problem, making deep RL stable and practical!
        </p>
      </ExplanationPanel>

      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {/* Networks */}
        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ 
            background: 'rgba(221,160,221,0.2)',
            borderRadius: '15px',
            padding: '20px',
            minWidth: '160px'
          }}>
            <h3 style={{ marginBottom: '15px', color: '#DDA0DD', fontSize: '14px' }}>Q-Network (θ)</h3>
            {qNetwork.w.map((w, i) => (
              <div key={i} style={{ marginBottom: '8px', fontSize: '13px' }}>
                w[a{i}]: <span style={{ color: '#DDA0DD', fontWeight: 'bold' }}>{w.toFixed(3)}</span>
              </div>
            ))}
            <div style={{ marginTop: '15px', fontSize: '11px', opacity: 0.6 }}>
              ε = {epsilon.toFixed(3)}
            </div>
          </div>
          
          <div style={{ 
            background: 'rgba(150,206,180,0.2)',
            borderRadius: '15px',
            padding: '20px',
            minWidth: '160px'
          }}>
            <h3 style={{ marginBottom: '15px', color: '#96CEB4', fontSize: '14px' }}>Target Network (θ⁻)</h3>
            {targetNetwork.w.map((w, i) => (
              <div key={i} style={{ marginBottom: '8px', fontSize: '13px' }}>
                w[a{i}]: <span style={{ color: '#96CEB4', fontWeight: 'bold' }}>{w.toFixed(3)}</span>
              </div>
            ))}
            <div style={{ marginTop: '15px', fontSize: '11px', opacity: 0.6 }}>
              Synced at: {syncStep}
            </div>
          </div>
        </div>

        {/* Replay Buffer */}
        <div style={{ 
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '15px',
          padding: '20px',
          minWidth: '350px'
        }}>
          <h3 style={{ marginBottom: '15px', color: '#fff', fontSize: '14px' }}>
            Replay Buffer ({replayBuffer.length}/12)
          </h3>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '5px',
            maxHeight: '150px',
            overflow: 'auto'
          }}>
            {replayBuffer.map((exp, i) => (
              <div key={exp.id} style={{
                background: 'rgba(221,160,221,0.3)',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '10px'
              }}>
                (s{exp.state}, a{exp.action}, {exp.reward.toFixed(1)}, s{exp.nextState})
              </div>
            ))}
          </div>
          
          {lastLoss !== null && (
            <div style={{ marginTop: '15px', fontSize: '13px' }}>
              Last Batch Loss: <span style={{ color: '#E74C3C', fontWeight: 'bold' }}>{lastLoss.toFixed(4)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '25px', flexWrap: 'wrap' }}>
        <button onClick={addExperience} style={{
          padding: '10px 20px',
          background: 'linear-gradient(135deg, #DDA0DD, #BA68C8)',
          border: 'none', borderRadius: '20px', color: '#fff', cursor: 'pointer', fontWeight: 'bold'
        }}>
          Add Experience
        </button>
        <button onClick={trainStep} disabled={replayBuffer.length < 4} style={{
          padding: '10px 20px',
          background: replayBuffer.length < 4 ? '#666' : 'linear-gradient(135deg, #667eea, #764ba2)',
          border: 'none', borderRadius: '20px', color: '#fff', 
          cursor: replayBuffer.length < 4 ? 'not-allowed' : 'pointer', fontWeight: 'bold'
        }}>
          Train (Sample Batch)
        </button>
        <button onClick={syncTarget} style={{
          padding: '10px 20px',
          background: 'linear-gradient(135deg, #96CEB4, #88D8B0)',
          border: 'none', borderRadius: '20px', color: '#1a1a2e', cursor: 'pointer', fontWeight: 'bold'
        }}>
          Sync Target θ⁻ ← θ
        </button>
        <button onClick={reset} style={{
          padding: '10px 20px',
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '20px', color: '#fff', cursor: 'pointer'
        }}>
          Reset
        </button>
      </div>
      <div style={{ textAlign: 'center', marginTop: '10px', opacity: 0.6, fontSize: '13px' }}>
        Step: {step}
      </div>

      <Callout type="tip" title="DQN's Two Key Tricks" icon="💡">
        <div style={{ marginBottom: '15px' }}>
          <strong>1. Experience Replay:</strong> Store experiences in buffer, sample randomly → breaks data correlations
      </div>
        <div style={{ marginBottom: '15px' }}>
          <strong>2. Target Network:</strong> Use slowly-updated θ⁻ for target calculation → stabilizes learning
        </div>
        <FormulaBreakdown
          formula="Q(s,a) ← Q(s,a) + α[r + γ max_{a'} Q_target(s',a') - Q(s,a)]"
          simpleExplanation="We update Q-values using a target network to prevent the moving target problem."
        />
        <div style={{ marginBottom: '15px' }}>
          <strong>ε-greedy:</strong> Balance exploration (random) vs exploitation (greedy)
        </div>
        <div style={{ padding: '12px', background: 'rgba(255,107,107,0.2)', borderRadius: '8px', marginTop: '15px' }}>
          <strong>Limitation:</strong> Model-free = sample inefficient, discrete actions only → Combine with <strong>Planning (MCTS)</strong>?
        </div>
      </Callout>
    </div>
  );
};

// ==================== 7. MCTS VISUALIZATION ====================
const MCTSViz = () => {
  const [tree, setTree] = useState({
    id: 'root', visits: 1, value: 0, children: [], expanded: true
  });
  const [selectedPath, setSelectedPath] = useState(['root']);
  const [phase, setPhase] = useState('select');

  const ucb = (node, parent) => {
    if (node.visits === 0) return Infinity;
    const c = Math.sqrt(2);
    return (node.value / node.visits) + c * Math.sqrt(Math.log(parent.visits) / node.visits);
  };

  const runMCTSStep = async () => {
    setTree(prev => {
      const newTree = JSON.parse(JSON.stringify(prev));
      
      // Selection
      setPhase('select');
      let node = newTree;
      const path = ['root'];
      
      while (node.children.length > 0) {
        let bestChild = node.children[0];
        let bestUCB = -Infinity;
        
        for (const child of node.children) {
          const u = ucb(child, node);
          if (u > bestUCB) {
            bestUCB = u;
            bestChild = child;
          }
        }
        node = bestChild;
        path.push(node.id);
      }
      
      // Expansion
      if (node.visits > 0 && path.length < 4) {
        setPhase('expand');
        node.children = [
          { id: `${node.id}-L`, visits: 0, value: 0, children: [] },
          { id: `${node.id}-R`, visits: 0, value: 0, children: [] }
        ];
        node = node.children[Math.random() > 0.5 ? 1 : 0];
        path.push(node.id);
      }
      
      // Simulation & Backpropagation
      setPhase('simulate');
      const reward = Math.random();
      
      setPhase('backprop');
      let backNode = newTree;
      for (const id of path) {
        if (id === 'root') {
          backNode.visits++;
          backNode.value += reward;
        } else {
          const child = backNode.children.find(c => c.id === id);
          if (child) {
            child.visits++;
            child.value += reward;
            backNode = child;
          }
        }
      }
      
      setSelectedPath(path);
      return newTree;
    });
  };

  const reset = () => {
    setTree({ id: 'root', visits: 1, value: 0, children: [], expanded: true });
    setSelectedPath(['root']);
    setPhase('select');
  };

  const renderNode = (node, depth = 0) => {
    const isSelected = selectedPath.includes(node.id);
    const avgValue = node.visits > 0 ? (node.value / node.visits) : 0;
    
    return (
      <div key={node.id} style={{ textAlign: 'center', marginBottom: '10px' }}>
        <div style={{
          display: 'inline-block',
          padding: '8px 15px',
          borderRadius: '10px',
          background: isSelected ? 'rgba(152,216,200,0.5)' : 'rgba(255,255,255,0.1)',
          border: isSelected ? '2px solid #98D8C8' : '1px solid rgba(255,255,255,0.2)',
          transition: 'all 0.3s'
        }}>
          <div style={{ fontSize: '10px', opacity: 0.6 }}>N={node.visits}</div>
          <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Q={avgValue.toFixed(2)}</div>
          {node.visits > 0 && (
            <div style={{ fontSize: '9px', opacity: 0.5 }}>
              UCB≈{node.id === 'root' ? '-' : '∞'}
            </div>
          )}
        </div>
        {node.children.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '10px' }}>
            {node.children.map(child => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: '10px',
        background: 'linear-gradient(90deg, #98D8C8, #7DC8B8)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: '32px',
        fontWeight: 'bold'
      }}>
        7. MCTS / AlphaZero / MuZero
      </h2>
      <p style={{ textAlign: 'center', opacity: 0.8, marginBottom: '20px', fontSize: '15px' }}>
        Model-based <Tooltip content="Planning ahead by simulating possible futures">Planning</Tooltip>: 
        Selection → Expansion → Simulation → Backpropagation
      </p>

      <ExplanationPanel title="What is MCTS?" defaultOpen={true}>
        <p style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '15px' }}>
          <strong>Monte Carlo Tree Search (MCTS)</strong> builds a search tree to plan ahead, balancing exploration and exploitation using UCB.
        </p>
        <p style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '15px' }}>
          <strong>Four Steps:</strong>
        </p>
        <ol style={{ fontSize: '14px', lineHeight: '1.8', paddingLeft: '20px' }}>
          <li><strong>Selection:</strong> Navigate tree using UCB to balance exploration/exploitation</li>
          <li><strong>Expansion:</strong> Add new node to tree</li>
          <li><strong>Simulation:</strong> Play out random game to get outcome</li>
          <li><strong>Backpropagation:</strong> Update values up the tree</li>
        </ol>
        <p style={{ fontSize: '14px', lineHeight: '1.8', marginTop: '15px' }}>
          <strong>AlphaZero/MuZero:</strong> Combine MCTS with neural networks for superhuman performance in games!
        </p>
      </ExplanationPanel>

      {/* Phase indicator */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '25px', flexWrap: 'wrap' }}>
        {['select', 'expand', 'simulate', 'backprop'].map(p => (
          <div key={p} style={{
            padding: '6px 15px',
            borderRadius: '15px',
            background: phase === p ? 'rgba(152,216,200,0.4)' : 'rgba(255,255,255,0.05)',
            border: phase === p ? '2px solid #98D8C8' : '1px solid rgba(255,255,255,0.1)',
            fontSize: '12px'
          }}>
            {p === 'select' && '1. Selection (UCB)'}
            {p === 'expand' && '2. Expansion'}
            {p === 'simulate' && '3. Simulation'}
            {p === 'backprop' && '4. Backprop'}
          </div>
        ))}
      </div>

      {/* Tree */}
      <div style={{ 
        background: 'rgba(0,0,0,0.3)',
        borderRadius: '15px',
        padding: '25px',
        minHeight: '200px',
        marginBottom: '20px'
      }}>
        {renderNode(tree)}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
        <button onClick={runMCTSStep} style={{
          padding: '12px 25px',
          background: 'linear-gradient(135deg, #98D8C8, #7DC8B8)',
          border: 'none', borderRadius: '25px', color: '#1a1a2e', fontWeight: 'bold', cursor: 'pointer'
        }}>
          MCTS Step ({tree.visits - 1} iterations)
        </button>
        <button onClick={reset} style={{
          padding: '12px 25px',
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '25px', color: '#fff', cursor: 'pointer'
        }}>
          Reset
        </button>
      </div>

      <Callout type="tip" title="MCTS & AlphaZero/MuZero" icon="💡">
        <div style={{ marginBottom: '15px' }}>
          <strong>MCTS:</strong> UCB balances exploration/exploitation, expands tree, backpropagates simulation results
      </div>
        <FormulaBreakdown
          formula="UCB = Q/N + c·√(log(P)/N)"
          simpleExplanation="UCB formula balances exploitation (Q/N = average value) with exploration (second term favors less-visited nodes)."
        />
        <div style={{ marginTop: '15px', marginBottom: '15px' }}>
          <strong>AlphaZero:</strong> Policy/Value Network + MCTS + Self-play → conquered Go, Chess, Shogi!
        </div>
        <div style={{ marginBottom: '15px' }}>
          <strong>MuZero:</strong> Learns dynamics in latent space → planning without environment model!
        </div>
        <div style={{ padding: '12px', background: 'rgba(255,107,107,0.2)', borderRadius: '8px', marginTop: '15px' }}>
          <strong>Next:</strong> What about optimizing policy directly with gradients? → <strong>Policy Gradient</strong>!
        </div>
      </Callout>
    </div>
  );
};

// ==================== 8. POLICY GRADIENT ====================
const PGViz = () => {
  const [policy, setPolicy] = useState([0.33, 0.33, 0.34]);
  const [trajectories, setTrajectories] = useState([]);
  const [currentTraj, setCurrentTraj] = useState(null);
  const [baseline, setBaseline] = useState(0);
  
  const rewards = [1, 3, 2]; // Expected reward for each action

  const sampleTrajectory = () => {
    const traj = [];
    let totalReturn = 0;
    
    for (let t = 0; t < 3; t++) {
      // Sample action from policy
      const rand = Math.random();
      let cumProb = 0;
      let action = 0;
      for (let a = 0; a < 3; a++) {
        cumProb += policy[a];
        if (rand <= cumProb) {
          action = a;
          break;
        }
      }
      
      const reward = rewards[action] + (Math.random() - 0.5) * 2;
      traj.push({ action, reward, logProb: Math.log(policy[action]) });
      totalReturn += reward;
    }
    
    traj.totalReturn = totalReturn;
    setCurrentTraj(traj);
    setTrajectories(prev => [...prev.slice(-4), traj]);
    
    // Update baseline (running average)
    setBaseline(prev => prev * 0.9 + totalReturn * 0.1);
  };

  const updatePolicy = () => {
    if (!currentTraj) return;
    
    const alpha = 0.1;
    const advantage = currentTraj.totalReturn - baseline;
    
    const newPolicy = [...policy];
    currentTraj.forEach(step => {
      // REINFORCE: increase prob of actions that led to high return
      newPolicy[step.action] += alpha * advantage * policy[step.action];
    });
    
    // Normalize
    const sum = newPolicy.reduce((a, b) => Math.max(0.01, a) + Math.max(0.01, b), 0);
    setPolicy(newPolicy.map(p => Math.max(0.01, p) / sum));
  };

  const reset = () => {
    setPolicy([0.33, 0.33, 0.34]);
    setTrajectories([]);
    setCurrentTraj(null);
    setBaseline(0);
  };

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: '10px',
        background: 'linear-gradient(90deg, #F7DC6F, #F4D03F)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: '32px',
        fontWeight: 'bold'
      }}>
        8. Policy Gradient (REINFORCE)
      </h2>
      <p style={{ textAlign: 'center', opacity: 0.8, marginBottom: '20px', fontSize: '15px' }}>
        Directly parameterize policy π_θ and optimize expected return with <Tooltip content="Method to find the direction that increases reward">gradients</Tooltip>
      </p>

      <ExplanationPanel title="What is Policy Gradient?" defaultOpen={true}>
        <p style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '15px' }}>
          Instead of learning Q-values and then deriving a policy, <strong>Policy Gradient</strong> methods directly learn the policy.
        </p>
        <p style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '15px' }}>
          <strong>REINFORCE:</strong> Sample trajectories, calculate returns, then increase probability of actions that led to high returns.
        </p>
        <p style={{ fontSize: '14px', lineHeight: '1.8', marginTop: '15px' }}>
          <strong>Advantage:</strong> Works with continuous actions, can learn stochastic policies<br/>
          <strong>Challenge:</strong> High variance. Use baseline (like V(s)) to reduce variance!
        </p>
      </ExplanationPanel>

      <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {/* Policy visualization */}
        <div style={{ 
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '15px',
          padding: '25px',
          minWidth: '300px'
        }}>
          <h3 style={{ marginBottom: '20px', color: '#F7DC6F', fontSize: '14px', textAlign: 'center' }}>
            Policy π(a|s)
          </h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'flex-end', height: '150px' }}>
            {policy.map((prob, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '60px',
                  height: `${prob * 140}px`,
                  background: `linear-gradient(180deg, ${['#FF6B6B', '#4ECDC4', '#45B7D1'][i]}, ${['#FF6B6B', '#4ECDC4', '#45B7D1'][i]}88)`,
                  borderRadius: '8px 8px 0 0',
                  transition: 'height 0.3s ease',
                  marginBottom: '10px'
                }} />
                <div style={{ fontSize: '14px', fontWeight: 'bold' }}>a{i}</div>
                <div style={{ fontSize: '12px', opacity: 0.7 }}>{(prob * 100).toFixed(1)}%</div>
                <div style={{ fontSize: '10px', opacity: 0.5 }}>E[r]≈{rewards[i]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trajectory info */}
        <div style={{ 
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '15px',
          padding: '20px',
          minWidth: '280px'
        }}>
          <h3 style={{ marginBottom: '15px', color: '#F7DC6F', fontSize: '14px' }}>
            Current Trajectory
          </h3>
          
          {currentTraj ? (
            <div style={{ fontSize: '13px' }}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', justifyContent: 'center' }}>
                {currentTraj.map((step, i) => (
                  <div key={i} style={{
                    padding: '8px 15px',
                    background: `${['rgba(255,107,107,0.3)', 'rgba(78,205,196,0.3)', 'rgba(69,183,209,0.3)'][step.action]}`,
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontWeight: 'bold' }}>a{step.action}</div>
                    <div style={{ fontSize: '11px', opacity: 0.7 }}>r={step.reward.toFixed(1)}</div>
                  </div>
                ))}
              </div>
              
              <div style={{ 
                background: 'rgba(247,220,111,0.2)',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '15px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span>Total Return G:</span>
                  <span style={{ fontWeight: 'bold', color: '#F7DC6F' }}>{currentTraj.totalReturn.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span>Baseline b:</span>
                  <span>{baseline.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Advantage (G-b):</span>
                  <span style={{ 
                    fontWeight: 'bold',
                    color: currentTraj.totalReturn - baseline > 0 ? '#4ECDC4' : '#E74C3C'
                  }}>
                    {(currentTraj.totalReturn - baseline).toFixed(2)}
                  </span>
                </div>
              </div>
              
              <div style={{ fontSize: '11px', fontFamily: 'monospace', opacity: 0.8 }}>
                ∇J ≈ (G-b) · Σ∇log π(a_t|s_t)<br/>
                {currentTraj.totalReturn - baseline > 0 
                  ? '→ 선택한 행동들의 확률 ↑' 
                  : '→ 선택한 행동들의 확률 ↓'}
              </div>
            </div>
          ) : (
            <div style={{ opacity: 0.5, textAlign: 'center', padding: '30px 0' }}>
              Trajectory를 샘플링하세요
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '25px' }}>
        <button onClick={sampleTrajectory} style={{
          padding: '12px 25px',
          background: 'linear-gradient(135deg, #F7DC6F, #F4D03F)',
          border: 'none', borderRadius: '25px', color: '#1a1a2e', fontWeight: 'bold', cursor: 'pointer'
        }}>
          Sample Trajectory
        </button>
        <button onClick={updatePolicy} disabled={!currentTraj} style={{
          padding: '12px 25px',
          background: !currentTraj ? '#666' : 'linear-gradient(135deg, #667eea, #764ba2)',
          border: 'none', borderRadius: '25px', color: '#fff', 
          cursor: !currentTraj ? 'not-allowed' : 'pointer', fontWeight: 'bold'
        }}>
          Update Policy
        </button>
        <button onClick={reset} style={{
          padding: '12px 25px',
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '25px', color: '#fff', cursor: 'pointer'
        }}>
          Reset
        </button>
      </div>

      <Callout type="tip" title="Policy Gradient Key Points" icon="💡">
        <FormulaBreakdown
          formula="∇J(θ) = E[G_t · ∇log π_θ(a_t|s_t)]"
          simpleExplanation="The gradient tells us: if return G_t is high, increase the probability of action a_t. If low, decrease it."
          steps={[
            "Sample trajectory following current policy",
            "Calculate return G_t for each step",
            "For each (s_t, a_t, G_t):",
            "  - Calculate gradient: ∇log π_θ(a_t|s_t)",
            "  - Weight by return: G_t · ∇log π_θ(a_t|s_t)",
            "  - Update: θ ← θ + α · G_t · ∇log π_θ(a_t|s_t)"
          ]}
        />
        <div style={{ marginTop: '15px', marginBottom: '15px' }}>
          <strong>Baseline:</strong> Use Advantage = G - b to reduce variance (b is often V(s))
      </div>
        <div style={{ marginBottom: '15px' }}>
          <strong>Actor-Critic:</strong> Use learned V(s) as baseline → more efficient!
        </div>
        <div style={{ padding: '12px', background: 'rgba(78,205,196,0.2)', borderRadius: '8px', marginTop: '15px' }}>
          <strong>AlphaZero Connection:</strong> Distill MCTS policy π^MCTS into policy network
        </div>
      </Callout>
    </div>
  );
};

// ==================== 9. RLHF VISUALIZATION ====================
const RLHFViz = () => {
  const [responses, setResponses] = useState([
    { id: 0, text: '응답 A: 친절하고 안전한 답변', reward: 0.8, prob: 0.33 },
    { id: 1, text: '응답 B: 도움이 되지만 약간 위험', reward: 0.4, prob: 0.33 },
    { id: 2, text: '응답 C: 불친절하지만 정확한 답변', reward: 0.2, prob: 0.34 },
  ]);
  const [refProbs] = useState([0.33, 0.33, 0.34]);
  const [beta, setBeta] = useState(0.1);
  const [step, setStep] = useState(0);

  const computeKL = () => {
    return responses.reduce((sum, r, i) => {
      const p = r.prob;
      const q = refProbs[i];
      return sum + (p > 0.001 ? p * Math.log(p / q) : 0);
    }, 0);
  };

  const computeObjective = () => {
    const expectedReward = responses.reduce((sum, r) => sum + r.prob * r.reward, 0);
    return expectedReward - beta * computeKL();
  };

  const rlhfStep = () => {
    const newResponses = [...responses];
    
    // Gradient of: E[r] - β*KL
    // ∝ r(y) - β*log(π/π_ref)
    newResponses.forEach((r, i) => {
      const gradient = r.reward - beta * (1 + Math.log(r.prob / refProbs[i]));
      r.prob = Math.max(0.01, r.prob + 0.05 * gradient);
    });
    
    // Normalize
    const sum = newResponses.reduce((s, r) => s + r.prob, 0);
    newResponses.forEach(r => r.prob = r.prob / sum);
    
    setResponses(newResponses);
    setStep(s => s + 1);
  };

  const reset = () => {
    setResponses([
      { id: 0, text: '응답 A: 친절하고 안전한 답변', reward: 0.8, prob: 0.33 },
      { id: 1, text: '응답 B: 도움이 되지만 약간 위험', reward: 0.4, prob: 0.33 },
      { id: 2, text: '응답 C: 불친절하지만 정확한 답변', reward: 0.2, prob: 0.34 },
    ]);
    setStep(0);
  };

  const kl = computeKL();
  const objective = computeObjective();

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: '10px',
        background: 'linear-gradient(90deg, #BB8FCE, #9B59B6)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: '32px',
        fontWeight: 'bold'
      }}>
        9. RLHF (Reinforcement Learning from Human Feedback)
      </h2>
      <p style={{ textAlign: 'center', opacity: 0.8, marginBottom: '20px', fontSize: '15px' }}>
        LLM as policy, human feedback as reward — max E[r(y)] - β·<Tooltip content="Measures how different current policy is from reference">KL(π||π_ref)</Tooltip>
      </p>

      <ExplanationPanel title="What is RLHF?" defaultOpen={true}>
        <p style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '15px' }}>
          <strong>Reinforcement Learning from Human Feedback (RLHF)</strong> is how modern LLMs like ChatGPT are trained to be helpful, harmless, and honest.
        </p>
        <p style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '15px' }}>
          <strong>Key Components:</strong>
        </p>
        <ol style={{ fontSize: '14px', lineHeight: '1.8', paddingLeft: '20px' }}>
          <li><strong>LLM as Policy:</strong> π_θ(y|x) generates response y given prompt x</li>
          <li><strong>Reward Model:</strong> r_φ(x,y) learned from human preference data</li>
          <li><strong>KL Constraint:</strong> Keep policy close to reference to maintain stability</li>
          <li><strong>PPO:</strong> Policy gradient with clipping for stable updates</li>
        </ol>
        <p style={{ fontSize: '14px', lineHeight: '1.8', marginTop: '15px' }}>
          This is the core training method behind ChatGPT, Claude, and other modern AI assistants!
        </p>
      </ExplanationPanel>

      <div style={{ display: 'flex', gap: '25px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {/* Response probabilities */}
        <div style={{ 
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '15px',
          padding: '20px',
          minWidth: '350px'
        }}>
          <h3 style={{ marginBottom: '15px', color: '#BB8FCE', fontSize: '14px' }}>
            Policy π(y|x) — Response Probabilities
          </h3>
          
          {responses.map((r, i) => (
            <div key={r.id} style={{
              marginBottom: '15px',
              padding: '15px',
              background: `rgba(187,143,206,${r.prob})`,
              borderRadius: '10px',
              border: '1px solid rgba(187,143,206,0.5)',
              transition: 'all 0.3s'
            }}>
              <div style={{ fontSize: '13px', marginBottom: '8px' }}>{r.text}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span>Reward r(y): <strong style={{ color: '#4ECDC4' }}>{r.reward.toFixed(2)}</strong></span>
                <span>π(y|x): <strong>{(r.prob * 100).toFixed(1)}%</strong></span>
              </div>
              <div style={{ fontSize: '11px', opacity: 0.6, marginTop: '5px' }}>
                π_ref: {(refProbs[i] * 100).toFixed(1)}% | log(π/π_ref): {Math.log(r.prob / refProbs[i]).toFixed(3)}
              </div>
            </div>
          ))}
        </div>

        {/* Metrics */}
        <div style={{ minWidth: '250px' }}>
          <div style={{ 
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '15px',
            padding: '20px',
            marginBottom: '15px'
          }}>
            <h3 style={{ marginBottom: '15px', color: '#BB8FCE', fontSize: '14px' }}>
              RLHF Objective
            </h3>
            
            <div style={{ marginBottom: '15px' }}>
              <div style={{ fontSize: '12px', opacity: 0.6 }}>E[r(y)]</div>
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#4ECDC4' }}>
                {responses.reduce((s, r) => s + r.prob * r.reward, 0).toFixed(4)}
              </div>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <div style={{ fontSize: '12px', opacity: 0.6 }}>KL(π || π_ref)</div>
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: kl > 0.5 ? '#E74C3C' : '#F7DC6F' }}>
                {kl.toFixed(4)}
              </div>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <div style={{ fontSize: '12px', opacity: 0.6 }}>β (KL penalty)</div>
              <input 
                type="range" 
                min="0.01" 
                max="0.5" 
                step="0.01"
                value={beta}
                onChange={(e) => setBeta(parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
              <div style={{ textAlign: 'center', fontSize: '14px' }}>{beta.toFixed(2)}</div>
            </div>
            
            <div style={{ 
              padding: '12px',
              background: 'rgba(187,143,206,0.2)',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '11px', opacity: 0.6 }}>Total Objective</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#BB8FCE' }}>
                {objective.toFixed(4)}
              </div>
            </div>
          </div>

          <div style={{ fontSize: '12px', fontFamily: 'monospace', opacity: 0.7, padding: '10px' }}>
            max E[r(y)] - β·KL(π||π_ref)<br/>
            = max Σ π(y)·r(y) - β·Σ π(y)·log(π/π_ref)
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '25px' }}>
        <button onClick={rlhfStep} style={{
          padding: '12px 25px',
          background: 'linear-gradient(135deg, #BB8FCE, #9B59B6)',
          border: 'none', borderRadius: '25px', color: '#fff', fontWeight: 'bold', cursor: 'pointer'
        }}>
          PPO-style Update Step
        </button>
        <button onClick={reset} style={{
          padding: '12px 25px',
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '25px', color: '#fff', cursor: 'pointer'
        }}>
          Reset
        </button>
      </div>
      <div style={{ textAlign: 'center', marginTop: '10px', opacity: 0.6, fontSize: '13px' }}>
        Step: {step}
      </div>

      <Callout type="key" title="RLHF: The Complete Picture" icon="🔑">
        <div style={{ marginBottom: '15px' }}>
          <strong>LLM as Policy:</strong> π_θ(y|x) generates response y given prompt x
        </div>
        <div style={{ marginBottom: '15px' }}>
          <strong>Reward Model:</strong> r_φ(x,y) learned from human preference data
        </div>
        <FormulaBreakdown
          formula="Objective: max E[r(y)] - β·KL(π||π_ref)"
          simpleExplanation="Maximize expected reward while staying close to the reference policy. β controls the trade-off."
          steps={[
            "Generate responses from current policy π_θ",
            "Get rewards from reward model r_φ",
            "Calculate KL divergence from reference policy π_ref",
            "Update policy to maximize: E[r(y)] - β·KL(π||π_ref)",
            "Use PPO (clipped policy gradient) for stable updates"
          ]}
        />
        <div style={{ marginTop: '15px', padding: '12px', background: 'rgba(78,205,196,0.2)', borderRadius: '8px' }}>
          <strong>This is the core training method behind ChatGPT, Claude, and other modern AI assistants!</strong>
        </div>
      </Callout>
    </div>
  );
};

// ==================== COMPARISON VIEW ====================
const ComparisonView = ({ algorithm1, algorithm2, onClose }) => {
  const comparisons = {
    'MC vs TD': {
      title: 'Monte Carlo vs Temporal Difference',
      mc: {
        name: 'Monte Carlo',
        color: '#45B7D1',
        pros: [
          'Unbiased (uses actual returns)',
          'Simple to understand',
          'Works well with function approximation'
        ],
        cons: [
          'High variance',
          'Must wait for episode end',
          'Only works with episodic tasks'
        ],
        update: 'V(s) ← average of G_t (actual returns)',
        when: 'Use when episodes are short and you want unbiased estimates'
      },
      td: {
        name: 'Temporal Difference',
        color: '#96CEB4',
        pros: [
          'Low variance',
          'Online learning (update every step)',
          'Works with continuing tasks',
          'Faster learning'
        ],
        cons: [
          'Slightly biased (uses estimates)',
          'More complex',
          'Can be unstable with function approximation'
        ],
        update: 'V(s) ← V(s) + α[r + γV(s\') - V(s)]',
        when: 'Use when you want fast, online learning'
      }
    },
    'DP vs MC': {
      title: 'Dynamic Programming vs Monte Carlo',
      dp: {
        name: 'Dynamic Programming',
        color: '#4ECDC4',
        pros: [
          'Exact solution (if model known)',
          'Fast convergence',
          'No sampling variance'
        ],
        cons: [
          'Requires complete model P(s\'|s,a)',
          'Doesn\'t work without model',
          'Computationally expensive for large states'
        ],
        update: 'V(s) ← R + γΣP(s\'|s,a)V(s\')',
        when: 'Use when you know the environment model'
      },
      mc: {
        name: 'Monte Carlo',
        color: '#45B7D1',
        pros: [
          'No model needed',
          'Learn from experience',
          'Works with unknown environments'
        ],
        cons: [
          'High variance',
          'Slow learning',
          'Only episodic tasks'
        ],
        update: 'V(s) ← average of G_t',
        when: 'Use when model is unknown or hard to learn'
      }
    }
  };

  const comp = comparisons[`${algorithm1} vs ${algorithm2}`] || comparisons['MC vs TD'];
  const alg1 = comp[algorithm1.toLowerCase().replace(' ', '')] || comp.mc;
  const alg2 = comp[algorithm2.toLowerCase().replace(' ', '')] || comp.td;

  return (
      <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.9)',
      zIndex: 10002,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
        padding: '20px',
    }}>
      <div style={{
        maxWidth: '1000px',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        borderRadius: '20px',
        padding: '40px',
        border: '2px solid rgba(255,255,255,0.2)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        maxHeight: '90vh',
        overflow: 'auto',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '28px', margin: 0 }}>{comp.title}</h2>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '20px',
            }}
          >
            ×
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          {/* Algorithm 1 */}
          <div style={{
            background: alg1.color === '#45B7D1' ? 'rgba(69,183,209,0.1)' : alg1.color === '#96CEB4' ? 'rgba(150,206,180,0.1)' : alg1.color === '#4ECDC4' ? 'rgba(78,205,196,0.1)' : 'rgba(255,255,255,0.05)',
            borderRadius: '15px',
            padding: '25px',
            border: `2px solid ${alg1.color}`,
          }}>
            <h3 style={{ color: alg1.color, fontSize: '22px', marginBottom: '20px' }}>
              {alg1.name}
            </h3>
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '14px', opacity: 0.8, marginBottom: '10px' }}>✅ Advantages</h4>
              <ul style={{ fontSize: '13px', lineHeight: '1.8', paddingLeft: '20px' }}>
                {alg1.pros.map((pro, i) => (
                  <li key={i}>{pro}</li>
                ))}
              </ul>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '14px', opacity: 0.8, marginBottom: '10px' }}>❌ Disadvantages</h4>
              <ul style={{ fontSize: '13px', lineHeight: '1.8', paddingLeft: '20px' }}>
                {alg1.cons.map((con, i) => (
                  <li key={i}>{con}</li>
                ))}
              </ul>
            </div>
            <div style={{
              background: 'rgba(0,0,0,0.3)',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '12px',
              fontFamily: 'monospace',
              marginBottom: '15px'
            }}>
              <strong>Update:</strong> {alg1.update}
            </div>
            <div style={{
              background: alg1.color === '#45B7D1' ? 'rgba(69,183,209,0.2)' : alg1.color === '#96CEB4' ? 'rgba(150,206,180,0.2)' : alg1.color === '#4ECDC4' ? 'rgba(78,205,196,0.2)' : 'rgba(255,255,255,0.1)',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '12px',
            }}>
              <strong>When to use:</strong> {alg1.when}
            </div>
          </div>

          {/* Algorithm 2 */}
          <div style={{
            background: alg2.color === '#45B7D1' ? 'rgba(69,183,209,0.1)' : alg2.color === '#96CEB4' ? 'rgba(150,206,180,0.1)' : alg2.color === '#4ECDC4' ? 'rgba(78,205,196,0.1)' : 'rgba(255,255,255,0.05)',
            borderRadius: '15px',
            padding: '25px',
            border: `2px solid ${alg2.color}`,
          }}>
            <h3 style={{ color: alg2.color, fontSize: '22px', marginBottom: '20px' }}>
              {alg2.name}
            </h3>
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '14px', opacity: 0.8, marginBottom: '10px' }}>✅ Advantages</h4>
              <ul style={{ fontSize: '13px', lineHeight: '1.8', paddingLeft: '20px' }}>
                {alg2.pros.map((pro, i) => (
                  <li key={i}>{pro}</li>
                ))}
              </ul>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '14px', opacity: 0.8, marginBottom: '10px' }}>❌ Disadvantages</h4>
              <ul style={{ fontSize: '13px', lineHeight: '1.8', paddingLeft: '20px' }}>
                {alg2.cons.map((con, i) => (
                  <li key={i}>{con}</li>
                ))}
              </ul>
            </div>
            <div style={{
              background: 'rgba(0,0,0,0.3)',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '12px',
              fontFamily: 'monospace',
              marginBottom: '15px'
            }}>
              <strong>Update:</strong> {alg2.update}
            </div>
            <div style={{
              background: alg2.color === '#45B7D1' ? 'rgba(69,183,209,0.2)' : alg2.color === '#96CEB4' ? 'rgba(150,206,180,0.2)' : alg2.color === '#4ECDC4' ? 'rgba(78,205,196,0.2)' : 'rgba(255,255,255,0.1)',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '12px',
            }}>
              <strong>When to use:</strong> {alg2.when}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== GUIDED TOUR ====================
const GuidedTour = ({ currentStep, onNext, onPrev, onClose, totalSteps }) => {
  const steps = [
    { title: "Welcome!", content: "This visualization teaches RL algorithms step by step. Use the tabs at the top to navigate." },
    { title: "MDP - The Foundation", content: "Start here! Learn about states, actions, rewards, and the Markov property." },
    { title: "DP - When You Know the Model", content: "If you know how the environment works, use Dynamic Programming." },
    { title: "MC - Learning from Experience", content: "No model? No problem! Learn from complete episodes." },
    { title: "TD - Online Learning", content: "Update after every step using bootstrapping - faster than MC!" },
    { title: "Function Approximation", content: "Scale to large problems by generalizing with parameters." },
    { title: "DQN - Deep RL", content: "Combine deep learning with RL using replay buffers and target networks." },
    { title: "MCTS - Planning", content: "Plan ahead by building a search tree - used in AlphaZero!" },
    { title: "Policy Gradient", content: "Directly optimize the policy using gradients." },
    { title: "RLHF - Modern AI", content: "How ChatGPT and Claude are trained - RL with human feedback!" },
  ];

  if (currentStep < 0 || currentStep >= totalSteps) return null;

  const step = steps[Math.min(currentStep, steps.length - 1)];

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
      borderRadius: '15px',
      padding: '25px',
      border: '2px solid #4ECDC4',
      boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
      zIndex: 10001,
      maxWidth: '350px',
      color: '#fff',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 style={{ margin: 0, color: '#4ECDC4', fontSize: '18px' }}>{step.title}</h3>
        <button
          onClick={onClose}
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          ×
        </button>
      </div>
      <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '20px', opacity: 0.9 }}>
        {step.content}
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '12px', opacity: 0.7 }}>
          Step {currentStep + 1} of {totalSteps}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {currentStep > 0 && (
            <button
              onClick={onPrev}
              style={{
                padding: '8px 16px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '8px',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              ← Prev
            </button>
          )}
          {currentStep < totalSteps - 1 ? (
            <button
              onClick={onNext}
              style={{
                padding: '8px 16px',
                background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 'bold',
              }}
            >
              Next →
            </button>
          ) : (
            <button
              onClick={onClose}
              style={{
                padding: '8px 16px',
                background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 'bold',
              }}
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN APP ====================
export default function RLCompleteVisualization() {
  const [activeTab, setActiveTab] = useState(1);
  const [showWelcome, setShowWelcome] = useState(() => {
    const hasSeen = localStorage.getItem('rl-viz-welcome-seen');
    return !hasSeen;
  });
  const [showTour, setShowTour] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [visitedTabs, setVisitedTabs] = useState(() => {
    const saved = localStorage.getItem('rl-viz-visited');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (!visitedTabs.includes(activeTab)) {
      setVisitedTabs(prev => {
        const newVisited = [...prev, activeTab];
        localStorage.setItem('rl-viz-visited', JSON.stringify(newVisited));
        return newVisited;
      });
    }
  }, [activeTab, visitedTabs]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft' && activeTab > 1) {
        setActiveTab(activeTab - 1);
      } else if (e.key === 'ArrowRight' && activeTab < 9) {
        setActiveTab(activeTab + 1);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeTab]);

  const handleStartTour = () => {
    setShowWelcome(false);
    setShowTour(true);
    setTourStep(0);
    setActiveTab(1);
    localStorage.setItem('rl-viz-welcome-seen', 'true');
  };

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('rl-viz-welcome-seen', 'true');
  };

  const handleTourNext = () => {
    if (tourStep < 9) {
      const nextStep = tourStep + 1;
      setTourStep(nextStep);
      setActiveTab(nextStep + 1);
    } else {
      setShowTour(false);
    }
  };

  const handleTourPrev = () => {
    if (tourStep > 0) {
      const prevStep = tourStep - 1;
      setTourStep(prevStep);
      setActiveTab(prevStep + 1);
    }
  };

  const tabs = [
    { id: 1, label: 'MDP', color: '#FF6B6B' },
    { id: 2, label: 'DP', color: '#4ECDC4' },
    { id: 3, label: 'MC', color: '#45B7D1' },
    { id: 4, label: 'TD', color: '#96CEB4' },
    { id: 5, label: 'Func Approx', color: '#FFEAA7' },
    { id: 6, label: 'DQN', color: '#DDA0DD' },
    { id: 7, label: 'MCTS', color: '#98D8C8' },
    { id: 8, label: 'Policy Grad', color: '#F7DC6F' },
    { id: 9, label: 'RLHF', color: '#BB8FCE' },
  ];

  const [showComparison, setShowComparison] = useState(null);

  const renderContent = () => {
    switch (activeTab) {
      case 1: return <MDPViz />;
      case 2: return <DPViz />;
      case 3: return <MCViz onShowComparison={(a1, a2) => setShowComparison({ a1, a2 })} />;
      case 4: return <TDViz onShowComparison={(a1, a2) => setShowComparison({ a1, a2 })} />;
      case 5: return <FAViz />;
      case 6: return <DQNViz />;
      case 7: return <MCTSViz />;
      case 8: return <PGViz />;
      case 9: return <RLHFViz />;
      default: return null;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)',
      color: '#fff',
      fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
    }}>
      {showWelcome && (
        <WelcomeScreen onClose={handleCloseWelcome} onStartTour={handleStartTour} />
      )}
      {showTour && (
        <GuidedTour
          currentStep={tourStep}
          onNext={handleTourNext}
          onPrev={handleTourPrev}
          onClose={() => setShowTour(false)}
          totalSteps={10}
        />
      )}
      {showComparison && (
        <ComparisonView
          algorithm1={showComparison.a1}
          algorithm2={showComparison.a2}
          onClose={() => setShowComparison(null)}
        />
      )}
      
      {/* Header */}
      <div style={{ 
        textAlign: 'center', 
        padding: '25px 20px 15px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        position: 'relative'
      }}>
        <button
          onClick={() => setShowTour(true)}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '8px 16px',
            background: 'rgba(78,205,196,0.2)',
            border: '1px solid #4ECDC4',
            borderRadius: '20px',
            color: '#4ECDC4',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 'bold',
          }}
        >
          🎓 Start Tour
        </button>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', opacity: 0.95 }}>
          🎬 Complete RL Algorithm Visualization
        </h1>
        <p style={{ opacity: 0.7, fontSize: '14px', marginBottom: '10px' }}>
          MDP → DP → MC → TD → FA → DQN → MCTS → PG → RLHF
        </p>
        <div style={{ fontSize: '11px', opacity: 0.5 }}>
          Use ← → arrow keys to navigate | {visitedTabs.length}/9 algorithms explored
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '5px',
        padding: '15px 10px',
        flexWrap: 'wrap',
        background: 'rgba(0,0,0,0.2)'
      }}>
        {tabs.map((tab, i) => (
          <React.Fragment key={tab.id}>
            <button
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 16px',
                background: activeTab === tab.id 
                  ? `linear-gradient(135deg, ${tab.color}, ${tab.color}88)` 
                  : visitedTabs.includes(tab.id)
                    ? 'rgba(255,255,255,0.08)'
                  : 'rgba(255,255,255,0.03)',
                border: activeTab === tab.id 
                  ? `2px solid ${tab.color}` 
                  : visitedTabs.includes(tab.id)
                    ? '1px solid rgba(255,255,255,0.2)'
                    : '1px solid rgba(255,255,255,0.1)',
                borderRadius: '20px',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                transition: 'all 0.2s ease',
                position: 'relative',
              }}
            >
              {tab.id}. {tab.label}
              {visitedTabs.includes(tab.id) && activeTab !== tab.id && (
                <span style={{ 
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  width: '8px',
                  height: '8px',
                  background: '#4ECDC4',
                  borderRadius: '50%',
                  border: '2px solid #1a1a2e'
                }} />
              )}
            </button>
            {i < tabs.length - 1 && (
              <span style={{ alignSelf: 'center', opacity: 0.3, fontSize: '12px' }}>→</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Content */}
      <div style={{ paddingBottom: '40px' }}>
        {renderContent()}
      </div>

      {/* Navigation */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '20px',
        padding: '20px',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        {activeTab > 1 && (
          <button onClick={() => setActiveTab(activeTab - 1)} style={{
            padding: '10px 20px',
            background: 'rgba(255,255,255,0.1)',
            border: 'none', borderRadius: '20px', color: '#fff', cursor: 'pointer', fontSize: '13px'
          }}>
            ← {tabs[activeTab - 2].label}
          </button>
        )}
        {activeTab < 9 && (
          <button onClick={() => setActiveTab(activeTab + 1)} style={{
            padding: '10px 20px',
            background: `linear-gradient(135deg, ${tabs[activeTab].color}44, ${tabs[activeTab].color}22)`,
            border: `1px solid ${tabs[activeTab].color}`,
            borderRadius: '20px', color: '#fff', cursor: 'pointer', fontSize: '13px'
          }}>
            {tabs[activeTab].label} →
          </button>
        )}
      </div>
    </div>
  );
}
