const fs = require('fs');
const https = require('https');

// URL of the exact photo used in the portfolio
const imageUrl = 'https://pub-5f6d2fdae69b4366a0b8ce890c20cb8d.r2.dev/assets/assets/img/profile_photo/me.png';

https.get(imageUrl, (res) => {
    const data = [];
    res.on('data', (chunk) => data.push(chunk));
    res.on('end', () => {
        const imageBuffer = Buffer.concat(data);
        const imageBase64 = `data:image/png;base64,${imageBuffer.toString('base64')}`;

        const width = 1600;
        const height = 900;

        // Generate cosmic dust and star particles
        const stars = Array.from({ length: 240 }).map((_, i) => {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const r = Math.random() * 1.8 + 0.3;
            const op = (Math.random() * 0.7 + 0.2).toFixed(2);
            const dur = (Math.random() * 6 + 4).toFixed(1);
            const delay = (Math.random() * 8).toFixed(1);
            const color = Math.random() > 0.6 ? '#D8B4FE' : (Math.random() > 0.3 ? '#818CF8' : '#FFFFFF');
            return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${color}" opacity="${op}">
        <animate attributeName="opacity" values="${op};${(op * 0.2).toFixed(2)};${op}" dur="${dur}s" begin="-${delay}s" repeatCount="indefinite" />
      </circle>`;
        }).join('\n      ');

        const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Deep Space Void & Vibrant Cosmic Nebula Gradients -->
    <radialGradient id="nebula-purple-core" cx="50%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#9333EA" stop-opacity="0.65" />
      <stop offset="25%" stop-color="#7E22CE" stop-opacity="0.45" />
      <stop offset="55%" stop-color="#4C1D95" stop-opacity="0.25" />
      <stop offset="80%" stop-color="#1E1B4B" stop-opacity="0.1" />
      <stop offset="100%" stop-color="transparent" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="nebula-blue-glow" cx="60%" cy="48%" r="42%">
      <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.45" />
      <stop offset="50%" stop-color="#1D4ED8" stop-opacity="0.2" />
      <stop offset="100%" stop-color="transparent" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="nebula-pink-burst" cx="40%" cy="50%" r="45%">
      <stop offset="0%" stop-color="#D946EF" stop-opacity="0.45" />
      <stop offset="50%" stop-color="#A21CAF" stop-opacity="0.2" />
      <stop offset="100%" stop-color="transparent" stop-opacity="0" />
    </radialGradient>

    <style>
      .bg-void {
        fill: #030408;
      }
      
      .top-meta {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        font-size: 13px;
        font-weight: 500;
        fill: #94A3B8;
        letter-spacing: 7px;
        text-anchor: middle;
      }

      .text-outline-mathisha {
        font-family: 'Arial Black', -apple-system, Impact, sans-serif;
        font-size: 245px;
        font-weight: 900;
        fill: transparent;
        stroke: #F1F5F9;
        stroke-width: 2.5px;
        letter-spacing: 2px;
        text-anchor: middle;
      }

      .text-solid-angirasa {
        font-family: 'Arial Black', -apple-system, Impact, sans-serif;
        font-size: 285px;
        font-weight: 900;
        fill: #FFFFFF;
        letter-spacing: -4px;
        text-anchor: middle;
        filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.95));
      }

      .bottom-meta {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        font-size: 14px;
        font-weight: 600;
        fill: #94A3B8;
        letter-spacing: 7px;
        text-anchor: middle;
      }

      .photo-glow {
        filter: drop-shadow(0 0 60px rgba(147, 51, 234, 0.5)) drop-shadow(0 25px 50px rgba(0, 0, 0, 0.9));
      }

      .nebula-pulse {
        animation: nebulaBreathe 8s ease-in-out infinite alternate;
      }

      @keyframes nebulaBreathe {
        0% { transform: scale(0.96) rotate(0deg); opacity: 0.85; }
        50% { transform: scale(1.04) rotate(1deg); opacity: 1.0; }
        100% { transform: scale(0.96) rotate(0deg); opacity: 0.85; }
      }
    </style>
  </defs>

  <!-- Deep Obsidian Background Void -->
  <rect width="${width}" height="${height}" class="bg-void" />

  <!-- Cosmic Particle Starfield -->
  <g>
    ${stars}
  </g>

  <!-- Swirling Nebula Cloud Center (Behind Photo) -->
  <g transform="translate(${width / 2}, 420)" class="nebula-pulse" style="transform-origin: center;">
    <ellipse cx="0" cy="0" rx="720" ry="360" fill="url(#nebula-purple-core)" />
    <ellipse cx="140" cy="-30" rx="460" ry="240" fill="url(#nebula-blue-glow)" />
    <ellipse cx="-140" cy="40" rx="500" ry="260" fill="url(#nebula-pink-burst)" />
  </g>

  <!-- Top Metadata Bar -->
  <g transform="translate(${width / 2}, 55)">
    <line x1="-380" y1="-5" x2="-230" y2="-5" stroke="#475569" stroke-width="1.2" />
    <text x="0" y="0" class="top-meta">SOFTWARE ENGINEER (MATHIYA)</text>
    <line x1="230" y1="-5" x2="380" y2="-5" stroke="#475569" stroke-width="1.2" />
  </g>

  <!-- Layer 1: Outlined "MATHISHA" (Upper Background Behind Avatar) -->
  <text x="${width / 2}" y="280" class="text-outline-mathisha">MATHISHA</text>

  <!-- Layer 2: Mathisha Portrait Photo in Suit (Scaled for perfect proportion) -->
  <g class="photo-glow">
    <image href="${imageBase64}" x="${width / 2 - 280}" y="190" width="560" height="610" preserveAspectRatio="xMidYMid slice" />
  </g>

  <!-- Layer 3: Solid "ANGIRASA" (Foreground Bold Typography Overlapping Torso) -->
  <text x="${width / 2}" y="775" class="text-solid-angirasa">ANGIRASA</text>

  <!-- Layer 4: Bottom Subtitle -->
  <text x="${width / 2}" y="855" class="bottom-meta">SOFTWARE ENGINEER &amp; AI SYSTEMS ARCHITECT</text>

</svg>
        `;

        fs.writeFileSync('header.svg', svg);
        console.log("Updated header.svg with scaled portrait and rich nebula!");
    });
});
