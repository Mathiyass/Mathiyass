const fs = require('fs');

let content = fs.readFileSync('build-header.js', 'utf-8');

// 1. Remove text glitch
content = content.replace(/animation: glitch 4\.5s infinite alternate ease-in-out;/g, '');
content = content.replace(/@keyframes glitch \{[\s\S]*?100% \{ stroke-dashoffset: 0; transform: translate\(0, 0\); \}\s*\}/g, '');

// 2. Fix text pulse to continuous glow
content = content.replace(/@keyframes textGlowPulse \{[\s\S]*?100% \{ filter: drop-shadow\(0px 25px 50px rgba\(0, 0, 0, 0\.95\)\) drop-shadow\(0px 0px 30px rgba\(56, 189, 248, 0\.6\)\); \}\s*\}/g,
`@keyframes textGlowPulse {
  0% { filter: drop-shadow(0px 25px 50px rgba(0, 0, 0, 0.95)) drop-shadow(0px 0px 40px rgba(0, 223, 216, 0.7)); }
  100% { filter: drop-shadow(0px 25px 50px rgba(0, 0, 0, 0.95)) drop-shadow(0px 0px 40px rgba(0, 223, 216, 0.7)); }
}`);

// 3. Fix shockwaves (which look like a pulse) -> remove entirely
content = content.replace(/<circle cx="\$\{width \/ 2\}" cy="420" r="50" fill="none" stroke="[^"]+" class="sonar-shockwave"[^>]*>\s*/g, '');

// 4. Change general pulse to continuous glow
content = content.replace(/@keyframes pulse \{[\s\S]*?100% \{ opacity: 0\.25; \}\s*\}/g,
`@keyframes pulse {
  0% { opacity: 0.8; }
  100% { opacity: 0.8; }
}`);

// 5. Enhance animation of laser cable (rename pulse to stream just so we're clean)
content = content.replace(/cablePulse/g, 'cableStream');

fs.writeFileSync('build-header.js', content);
