const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const assetsDir = path.join(__dirname, 'assets');

function processSVG(file) {
    if (!file.endsWith('.svg')) return;
    const filePath = path.join(assetsDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Completely remove the glitch class from elements
    content = content.replace(/glitch-layer/g, '');
    
    // Replace the flickers and pulses with solid, continuous high-end glowing equivalents
    // so they are "enhanced" but not glitchy or pulsing.
    
    // 1. Replace neon-flicker with continuous-neon
    content = content.replace(/@keyframes neon-flicker[\s\S]*?opacity: 0\.4; filter: none; \}\s*\}/, 
`@keyframes continuous-neon {
  0% { filter: drop-shadow(0 0 10px rgba(0,223,216,0.6)); }
  100% { filter: drop-shadow(0 0 10px rgba(0,223,216,0.6)); }
}`);
    content = content.replace(/neon-flicker/g, 'continuous-neon');

    // 2. Replace pulse-glow with continuous-glow
    content = content.replace(/@keyframes pulse-glow[\s\S]*?drop-shadow\(0 0 30px rgba\(0,223,216,0\.6\)\); \}\s*\}/, 
`@keyframes continuous-glow {
  0% { filter: drop-shadow(0 0 15px rgba(168,85,247,0.7)); }
  100% { filter: drop-shadow(0 0 15px rgba(168,85,247,0.7)); }
}`);
    content = content.replace(/pulse-glow/g, 'continuous-glow');

    // 3. Keep cyber-scan and particle-drift because they are motion animations, not flashes.
    // However, if particle-drift has opacity fading, let's make it a bit smoother or constant.
    content = content.replace(/@keyframes particle-drift \{[\s\S]*?\}/, 
`@keyframes particle-drift {
  0% { transform: translate(0, 0); opacity: 0; }
  10% { opacity: 0.6; }
  90% { opacity: 0.6; }
  100% { transform: translate(var(--dx), var(--dy)); opacity: 0; }
}`);

    // Clean up empty class attributes left over
    content = content.replace(/class="\s*"/g, '');
    
    fs.writeFileSync(filePath, content);
    console.log('Fixed:', file);
}

const files = fs.readdirSync(assetsDir);
files.forEach(processSVG);
console.log('Targeted fix complete.');
