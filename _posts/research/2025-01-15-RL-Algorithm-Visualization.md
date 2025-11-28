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
    
    // Modify the component code to make it work with Babel Standalone
    // 1. Remove all import statements (React is already loaded globally)
    let modifiedCode = componentCode.replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, '');
    
    // 2. Replace export default with regular function declaration
    modifiedCode = modifiedCode
      .replace(/export\s+default\s+function\s+RLCompleteVisualization/g, 'function RLCompleteVisualization')
      .replace(/export\s+default\s+RLCompleteVisualization/g, 'RLCompleteVisualization');
    
    // 3. Remove any other export statements
    modifiedCode = modifiedCode.replace(/^export\s+/gm, '');
    
    // 4. Extract React hooks to make them available (since import was removed)
    // Add polyfill at the top to destructure hooks from React
    const hookPolyfill = `
// Extract React hooks (since we removed the import)
const { useState, useEffect, useCallback, useRef, useMemo, useContext, useReducer } = React;
`;
    
    // 5. Also ensure it's available on window (add at the end)
    const finalCode = hookPolyfill + modifiedCode + '\n\nif (typeof RLCompleteVisualization !== "undefined") {\n  window.RLCompleteVisualization = RLCompleteVisualization;\n  console.log("RLCompleteVisualization assigned to window");\n} else {\n  console.error("RLCompleteVisualization function not found after processing");\n}';
    
    console.log('Code modifications applied. Final code length:', finalCode.length);
    console.log('First 500 chars of modified code:', finalCode.substring(0, 500));
    
    console.log('Modified component code, creating script element...');
    
    // Create a script element with the modified component code
    const componentScript = document.createElement('script');
    componentScript.type = 'text/babel';
    componentScript.text = finalCode;
    
    // Add error handler to catch Babel compilation errors
    componentScript.onerror = (error) => {
      console.error('Script execution error:', error);
      showError('Script execution error', 'There was an error executing the component code. Check console for details.');
    };
    
    // Wrap in try-catch for immediate errors
    try {
      document.body.appendChild(componentScript);
      console.log('Script element created, waiting for Babel to process...');
    } catch (error) {
      console.error('Error appending script:', error);
      showError('Error loading script', error.message);
      return;
    }
    
    // Also listen for any unhandled errors that might occur during Babel processing
    const originalErrorHandler = window.onerror;
    window.onerror = (msg, url, line, col, error) => {
      if (url && url.includes('Babel') || msg.includes('Babel') || msg.includes('RLComplete')) {
        console.error('Babel/Component error:', msg, 'at', url, line, col, error);
        showError('Component compilation error', msg + ' (Check console for details)');
      }
      if (originalErrorHandler) {
        return originalErrorHandler(msg, url, line, col, error);
      }
      return false;
    };
    
    // Function to check if component is available and mount it
    let attempts = 0;
    const maxAttempts = 100; // 10 seconds max (100 * 100ms)
    
    const checkAndMount = () => {
      attempts++;
      const Component = window.RLCompleteVisualization || (typeof RLCompleteVisualization !== 'undefined' ? RLCompleteVisualization : null);
      
      if (Component) {
        console.log('Component found, mounting...', Component);
        try {
          const root = ReactDOM.createRoot(container);
          root.render(React.createElement(Component));
          console.log('Component mounted successfully!');
        } catch (renderError) {
          console.error('Error rendering component:', renderError);
          showError('Error rendering component', renderError.message + '\n' + renderError.stack);
        }
      } else if (attempts < maxAttempts) {
        if (attempts % 10 === 0) {
          console.log(`Still waiting for component... (attempt ${attempts}/${maxAttempts})`);
          console.log('Available window properties:', Object.keys(window).filter(k => 
            k.includes('RL') || k.includes('Complete') || k.includes('React') || k.includes('Viz')
          ));
        }
        setTimeout(checkAndMount, 100);
      } else {
        console.error('Component not found after all attempts');
        console.log('Final check - Available window properties:', Object.keys(window).filter(k => 
          k.includes('RL') || k.includes('Complete') || k.includes('React') || k.includes('Viz')
        ));
        showError('Component not found after processing', 
          'RLCompleteVisualization was not defined after ' + maxAttempts + ' attempts. ' +
          'The component code may have syntax errors. Check the browser console for Babel errors.');
      }
    };
    
    // Start checking after Babel processes (Babel processes when script is added to DOM)
    // Give it a moment to process
    setTimeout(checkAndMount, 200);
    
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

