---
title: "Complete RL Algorithm Visualization"
layout: single
date: 2025-01-15 10:00:00 -0400
categories: [Research]
tags: [reinforcement learning, visualization, interactive]
author_profile: true
---

# Complete RL Algorithm Visualization

This interactive visualization helps you understand Reinforcement Learning algorithms from the ground up. Start with **MDP** to learn the basics, then progress through each algorithm to see how they build on each other.

## What you'll learn:

- 📊 **MDP** - The foundation: states, actions, rewards
- 🔄 **DP** - Solving when you know the model
- 🎲 **MC** - Learning from experience
- ⚡ **TD** - Learning step-by-step
- 🧠 **Function Approximation** - Scaling to large problems
- 🌐 **DQN** - Deep reinforcement learning
- 🌳 **MCTS** - Planning with search
- 📈 **Policy Gradient** - Direct policy optimization
- 🤖 **RLHF** - Training AI with human feedback

<div id="rl-viz-container" style="width: 100%; min-height: 600px; margin: 20px 0;"></div>

<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

<script type="text/babel">
// Load and render the RL visualization component
(async function() {
  try {
    // Load the component code
    // Try different possible paths
    const possiblePaths = [
      '/assets/js/rl-complete-viz.jsx',
      '/bobettifp.github.io/assets/js/rl-complete-viz.jsx',
      window.location.pathname.split('/').slice(0, -2).join('/') + '/assets/js/rl-complete-viz.jsx'
    ];
    
    let response;
    for (const path of possiblePaths) {
      try {
        response = await fetch(path);
        if (response.ok) break;
      } catch (e) {
        continue;
      }
    }
    
    if (!response || !response.ok) {
      throw new Error('Failed to load component');
    }
    const componentCode = await response.text();
    
    // Create a script element with the component code
    const script = document.createElement('script');
    script.type = 'text/babel';
    script.text = componentCode;
    document.body.appendChild(script);
    
    // Wait a bit for Babel to process, then mount
    setTimeout(() => {
      const container = document.getElementById('rl-viz-container');
      if (container && typeof RLCompleteVisualization !== 'undefined') {
        const root = ReactDOM.createRoot(container);
        root.render(React.createElement(RLCompleteVisualization));
      } else {
        console.error('Component not found or container not available');
        container.innerHTML = '<p style="color: #fff; padding: 20px; background: rgba(255,0,0,0.1); border-radius: 8px;">Error loading visualization. Please check the console for details.</p>';
      }
    }, 100);
  } catch (error) {
    console.error('Error loading RL visualization:', error);
    const container = document.getElementById('rl-viz-container');
    if (container) {
      container.innerHTML = '<p style="color: #fff; padding: 20px; background: rgba(255,0,0,0.1); border-radius: 8px;">Error loading visualization. Please check the console for details.</p>';
    }
  }
})();
</script>

<style>
#rl-viz-container {
  width: 100%;
  min-height: 600px;
  margin: 20px 0;
  overflow-x: auto;
}
</style>

