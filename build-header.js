const fs = require('fs');
const path = require('path');

// Read the user's photo and convert to base64
const imagePath = path.join('..', 'MAportfolio', 'public', 'assets', 'img', 'profile_photo', 'me.png');
let imageBase64 = '';
if (fs.existsSync(imagePath)) {
    const imageBuffer = fs.readFileSync(imagePath);
    imageBase64 = `data:image/png;base64,${imageBuffer.toString('base64')}`;
} else {
    console.error("Image not found at", imagePath);
    // fallback or empty
}

// Generate the SVG
const width = 1200;
const height = 500;

const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background styling -->
    <radialGradient id="bg-glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
      <stop offset="0%" stop-color="#4B0082" stop-opacity="0.8" />
      <stop offset="50%" stop-color="#1E0033" stop-opacity="0.5" />
      <stop offset="100%" stop-color="#050505" stop-opacity="1" />
    </radialGradient>

    <!-- Star particle animations -->
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@700&amp;family=Inter:wght@400;600&amp;display=swap');
      
      .bg { fill: #000000; }
      
      .text-outline {
        font-family: 'Syncopate', sans-serif;
        font-size: 140px;
        font-weight: 700;
        fill: transparent;
        stroke: #ffffff;
        stroke-width: 2px;
        letter-spacing: 15px;
        text-anchor: middle;
      }
      
      .text-solid {
        font-family: 'Syncopate', sans-serif;
        font-size: 150px;
        font-weight: 700;
        fill: #ffffff;
        letter-spacing: 10px;
        text-anchor: middle;
      }
      
      .text-small {
        font-family: 'Inter', sans-serif;
        font-size: 12px;
        font-weight: 600;
        fill: #888888;
        letter-spacing: 8px;
        text-anchor: middle;
      }

      .particle {
        fill: #9d00ff;
        animation: float 10s infinite linear;
        opacity: 0.6;
      }

      @keyframes float {
        0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
        50% { opacity: 0.8; }
        100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
      }
      
      .image-container {
        animation: pulse 4s infinite alternate ease-in-out;
      }
      
      @keyframes pulse {
        0% { filter: drop-shadow(0 0 15px rgba(157, 0, 255, 0.4)); transform: translateY(0px); }
        100% { filter: drop-shadow(0 0 35px rgba(157, 0, 255, 0.8)); transform: translateY(-5px); }
      }
    </style>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" class="bg" />
  <rect width="${width}" height="${height}" fill="url(#bg-glow)" />

  <!-- Particles -->
  ${Array.from({ length: 40 }).map((_, i) => {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const r = Math.random() * 3 + 1;
    const delay = Math.random() * 10;
    const dur = Math.random() * 5 + 5;
    return `<circle cx="${x}" cy="${y}" r="${r}" class="particle" style="animation-delay: -${delay}s; animation-duration: ${dur}s" />`;
  }).join('\\n  ')}

  <!-- Top Text Outline -->
  <text x="${width / 2}" y="220" class="text-outline">MATHISHA</text>

  <!-- Subtitle Top -->
  <text x="${width / 2}" y="60" class="text-small">SOFTWARE ENGINEER (MATHIYA)</text>

  <!-- Center Image -->
  <g class="image-container">
    ${imageBase64 ? `<image href="${imageBase64}" x="${width / 2 - 200}" y="100" width="400" height="400" preserveAspectRatio="xMidYMax slice" />` : ''}
  </g>

  <!-- Bottom Text Solid -->
  <text x="${width / 2}" y="440" class="text-solid">ANGIRASA</text>

  <!-- Subtitle Bottom -->
  <text x="${width / 2}" y="480" class="text-small">BUILDING INTELLIGENT SYSTEMS &amp; SCALABLE ARCHITECTURES</text>

</svg>
`;

fs.writeFileSync('header.svg', svg);
console.log("Created header.svg successfully!");
