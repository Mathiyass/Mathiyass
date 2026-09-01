const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const assetsDir = path.join(__dirname, 'assets');

const GLOBAL_STYLES = `
/* EXTREME HYPER ANIMATIONS (SAFE) */
@keyframes neon-flicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; filter: drop-shadow(0 0 8px rgba(0,223,216,0.8)) drop-shadow(0 0 15px rgba(0,223,216,0.6)); }
  20%, 24%, 55% { opacity: 0.4; filter: none; }
}
@keyframes cyber-scan {
  0% { transform: translateY(-100%); opacity: 0; }
  10% { opacity: 0.8; }
  90% { opacity: 0.8; }
  100% { transform: translateY(1000%); opacity: 0; }
}
@keyframes pulse-glow {
  0%, 100% { filter: drop-shadow(0 0 5px rgba(168,85,247,0.5)) drop-shadow(0 0 20px rgba(168,85,247,0.3)); }
  50% { filter: drop-shadow(0 0 15px rgba(0,223,216,0.9)) drop-shadow(0 0 30px rgba(0,223,216,0.6)); }
}
@keyframes particle-drift {
  0% { transform: translate(0, 0); opacity: 0; }
  10% { opacity: 0.8; }
  90% { opacity: 0.8; }
  100% { transform: translate(var(--dx), var(--dy)); opacity: 0; }
}
@keyframes dash-flow {
  to { stroke-dashoffset: -100; }
}
@keyframes rgb-shift {
  0% { fill: #00DFD8; }
  33% { fill: #A855F7; }
  66% { fill: #FF007F; }
  100% { fill: #00DFD8; }
}
@keyframes border-run {
  0% { stroke-dashoffset: 1000; }
  100% { stroke-dashoffset: 0; }
}

.neon-text { animation: neon-flicker 4s infinite alternate; }
.cyber-scanner { animation: cyber-scan 3s cubic-bezier(0.1, 0.8, 0.9, 0.2) infinite; }
.hyper-glow { animation: pulse-glow 2s ease-in-out infinite; }
.dash-flow { stroke-dasharray: 10, 5; animation: dash-flow 2s linear infinite; }
.rgb-text { animation: rgb-shift 6s linear infinite; }
.border-run { stroke-dasharray: 100 200; animation: border-run 5s linear infinite; }
`;

function generateBackgroundEffects(width, height) {
    let html = `<g class="hyper-background-effects" opacity="0.6" style="pointer-events: none;">
        <!-- Grid -->
        <pattern id="hyperGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 223, 216, 0.05)" stroke-width="1" class="dash-flow"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#hyperGrid)" />
        `;
    
    // Particles
    for(let i=0; i<30; i++) {
        const cx = Math.random() * width;
        const cy = Math.random() * height;
        const r = Math.random() * 2 + 0.5;
        const dx = (Math.random() - 0.5) * 150;
        const dy = (Math.random() - 0.5) * 150;
        const dur = 3 + Math.random() * 5;
        const delay = Math.random() * 5;
        const color = Math.random() > 0.5 ? '#00DFD8' : '#A855F7';
        html += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" style="--dx:${dx}px; --dy:${dy}px; animation: particle-drift ${dur}s ease-in-out ${delay}s infinite; opacity: 0; filter: blur(1px);" />`;
    }

    // Rotating background gyros (using SMIL for safe transforms)
    html += `<g>
        <animateTransform attributeName="transform" type="rotate" values="0 ${width/2} ${height/2}; 360 ${width/2} ${height/2}" dur="20s" repeatCount="indefinite" />
        <circle cx="${width/2}" cy="${height/2}" r="${width/3}" fill="none" stroke="rgba(168,85,247,0.1)" stroke-width="2" stroke-dasharray="15 30" class="dash-flow"/>
        <circle cx="${width/2}" cy="${height/2}" r="${width/3 + 20}" fill="none" stroke="rgba(0,223,216,0.1)" stroke-width="1" stroke-dasharray="50 100" class="dash-flow"/>
    </g>`;

    html += `</g>`;
    return html;
}

function generateOverlayEffects(width, height) {
    return `
    <g class="hyper-overlay-effects" style="pointer-events: none;">
        <!-- Scanning laser -->
        <rect x="0" y="0" width="100%" height="2" fill="#00DFD8" opacity="0.7" class="cyber-scanner" filter="drop-shadow(0 0 8px #00DFD8)">
            <animate attributeName="opacity" values="0.7;1;0.7" dur="1s" repeatCount="indefinite" />
        </rect>
        <rect x="0" y="-20" width="100%" height="40" fill="#FFFFFF" opacity="0.1" class="cyber-scanner" style="animation-delay: -0.1s" />
        
        <!-- Vignette / Border flare -->
        <rect x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)" fill="none" stroke="rgba(0,223,216,0.3)" stroke-width="1" class="border-run" />
    </g>
    `;
}

function processSVG(file) {
    if (!file.endsWith('.svg')) return;
    const filePath = path.join(assetsDir, file);
    console.log('Processing:', file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    const $ = cheerio.load(content, { xmlMode: true, decodeEntities: false });
    
    // Add Global Styles
    if ($('style').length === 0) {
        $('svg').prepend('<style></style>');
    }
    const currentStyle = $('style').first().html() || '';
    if (!currentStyle.includes('EXTREME HYPER ANIMATIONS (SAFE)')) {
        $('style').first().html(currentStyle + '\n' + GLOBAL_STYLES);
    }

    const viewBox = $('svg').attr('viewBox');
    let width = parseInt($('svg').attr('width')) || 800;
    let height = parseInt($('svg').attr('height')) || 400;
    if (viewBox) {
        const parts = viewBox.split(' ').map(Number);
        if(!isNaN(parts[2])) width = parts[2];
        if(!isNaN(parts[3])) height = parts[3];
    }

    // Inject Effects safely
    if ($('.hyper-background-effects').length === 0) {
        $('svg').prepend(generateBackgroundEffects(width, height));
    }
    if ($('.hyper-overlay-effects').length === 0) {
        $('svg').append(generateOverlayEffects(width, height));
    }

    // Smart random class assignments (NO TRANSFORMS)
    $('text').each((i, el) => {
        const txt = $(el);
        // Only apply glow to text so we don't break colors if they rely on it, wait user wants much animation
        if (Math.random() > 0.5) txt.addClass('hyper-glow');
    });

    $('path, line, polyline, polygon').each((i, el) => {
        const shape = $(el);
        if(!shape.attr('class') || !shape.attr('class').includes('dash-flow')) {
            if (Math.random() > 0.6 && !shape.attr('stroke-dasharray')) {
                 shape.addClass('dash-flow hyper-glow');
            }
        }
    });

    $('circle, ellipse').each((i, el) => {
        const shape = $(el);
        shape.addClass('hyper-glow');
    });

    // ADD SMIL FLOATING INSTEAD OF CSS TO ALL GROUPS SAFELY
    $('g').not('.hyper-background-effects').not('.hyper-overlay-effects').each((i, el) => {
        const g = $(el);
        // Inject an additive animateTransform for safe floating!
        if (Math.random() > 0.3 && g.children('animateTransform[type="translate"]').length === 0) {
            const dur = (Math.random() * 2 + 2).toFixed(1);
            g.append(`<animateTransform attributeName="transform" type="translate" values="0,0; 0,-4; 0,0" dur="${dur}s" additive="sum" repeatCount="indefinite" />`);
        }
    });

    fs.writeFileSync(filePath, $.html());
    console.log('Enhanced:', file);
}

const files = fs.readdirSync(assetsDir);
files.forEach(processSVG);
console.log('SAFE HYPER ANIMATION COMPLETE.');
