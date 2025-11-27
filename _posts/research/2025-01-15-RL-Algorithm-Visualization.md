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
  // Wait for React and ReactDOM to be available
  if (typeof React === 'undefined' || typeof ReactDOM === 'undefined') {
    console.error('React or ReactDOM not loaded');
    return;
  }

  const container = document.getElementById('rl-viz-container');
  if (!container) {
    console.error('Container not found');
    return;
  }

  const showError = (message, details = '') => {
    console.error('RL Visualization Error:', message, details);
    container.innerHTML = `
      <div style="color: #fff; padding: 20px; background: rgba(255,0,0,0.1); border-radius: 8px; text-align: center;">
        <p><strong>Error loading visualization</strong></p>
        <p style="font-size: 0.9em; opacity: 0.8;">${message}</p>
        ${details ? `<p style="font-size: 0.8em; opacity: 0.6;">${details}</p>` : ''}
        <p style="font-size: 0.8em; opacity: 0.6; margin-top: 10px;">Check browser console (F12) for more details.</p>
      </div>
    `;
  };

  try {
    // Determine base path - try multiple strategies
    const getBasePath = () => {
      const pathname = window.location.pathname;
      // Remove the post path to get base
      const pathParts = pathname.split('/').filter(p => p);
      // Remove last 2 parts (research and post-name)
      const baseParts = pathParts.slice(0, -2);
      return baseParts.length > 0 ? '/' + baseParts.join('/') : '';
    };

    const basePath = getBasePath();
    const possiblePaths = [
      basePath + '/assets/js/rl-complete-viz.js',
      '/assets/js/rl-complete-viz.js',
      window.location.origin + '/assets/js/rl-complete-viz.js',
      basePath + '/bobettifp.github.io/assets/js/rl-complete-viz.js',
      // Fallback to .jsx
      basePath + '/assets/js/rl-complete-viz.jsx',
      '/assets/js/rl-complete-viz.jsx'
    ];

    console.log('Trying paths:', possiblePaths);
    
    let response;
    let successfulPath;
    for (const path of possiblePaths) {
      try {
        response = await fetch(path);
        console.log(`Tried ${path}:`, response.status, response.ok);
        if (response.ok) {
          successfulPath = path;
          break;
        }
      } catch (e) {
        console.log(`Failed to fetch ${path}:`, e.message);
        continue;
      }
    }
    
    if (!response || !response.ok) {
      throw new Error(`Failed to load component from any path. Last status: ${response?.status || 'no response'}`);
    }

    console.log('Successfully loaded from:', successfulPath);
    const componentCode = await response.text();
    
    if (!componentCode || componentCode.length < 100) {
      throw new Error('Component code appears to be empty or invalid');
    }

    console.log('Component code loaded, length:', componentCode.length);
    
    // Create a script element with the component code
    const script = document.createElement('script');
    script.type = 'text/babel';
    script.text = componentCode;
    document.body.appendChild(script);
    
    console.log('Script element created, waiting for Babel to process...');
    
    // Modify the component code to make it globally available
    // Replace export default with window assignment
    const modifiedCode = componentCode
      .replace(/export\s+default\s+function\s+RLCompleteVisualization/g, 'function RLCompleteVisualization')
      .replace(/export\s+default\s+RLCompleteVisualization/g, 'RLCompleteVisualization');
    
    // Also ensure it's available on window
    const finalCode = modifiedCode + '\n\nwindow.RLCompleteVisualization = RLCompleteVisualization;';
    
    console.log('Modified component code, creating script element...');
    
    // Create a script element with the modified component code
    const script = document.createElement('script');
    script.type = 'text/babel';
    script.text = finalCode;
    document.body.appendChild(script);
    
    console.log('Script element created, waiting for Babel to process...');
    
    // Wait for Babel to process and component to be available
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds max
    
    const mountComponent = () => {
      attempts++;
      const Component = window.RLCompleteVisualization || (typeof RLCompleteVisualization !== 'undefined' ? RLCompleteVisualization : null);
      
      if (Component) {
        console.log('Component found, mounting...');
        try {
          const root = ReactDOM.createRoot(container);
          root.render(React.createElement(Component));
          console.log('Component mounted successfully!');
        } catch (renderError) {
          console.error('Error rendering component:', renderError);
          showError('Error rendering component', renderError.message);
        }
      } else if (attempts < maxAttempts) {
        setTimeout(mountComponent, 100);
      } else {
        console.error('Available globals:', Object.keys(window).filter(k => k.includes('RL') || k.includes('Complete')));
        showError('Component not found after processing', 'RLCompleteVisualization was not defined. Check if the component code is valid JSX.');
      }
    };
    
    // Start trying to mount after a short delay
    setTimeout(mountComponent, 300);
    
  } catch (error) {
    showError(error.message, error.stack);
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

