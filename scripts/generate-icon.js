/**
 * Generate West Score App Icon
 * Ford-style simple elegant typography - "W" on dark navy background
 */

const sharp = require("sharp");
const path = require("path");

// Icon sizes needed for iOS and Android
const sizes = {
  "icon.png": 1024,
  "adaptive-icon.png": 1024,
  "favicon.png": 48,
  "splash-icon.png": 200,
};

// Create SVG for the icon - Ford-style elegant typography
function createIconSVG(size) {
  const cornerRadius = size * 0.22;

  return `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Subtle gradient for depth -->
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e293b"/>
      <stop offset="100%" style="stop-color:#0f172a"/>
    </linearGradient>
    
    <!-- Subtle inner shadow -->
    <filter id="innerShadow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="${
        size * 0.02
      }" result="blur"/>
      <feOffset dx="0" dy="${size * 0.01}"/>
      <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.3 0"/>
      <feBlend mode="normal" in2="SourceGraphic"/>
    </filter>
  </defs>
  
  <!-- Background with rounded corners - deep navy like Ford -->
  <rect width="${size}" height="${size}" rx="${cornerRadius}" fill="url(#bgGradient)"/>
  
  <!-- Elegant "W" typography - script style like Ford -->
  <text 
    x="${size * 0.5}" 
    y="${size * 0.62}" 
    font-family="Georgia, 'Times New Roman', serif" 
    font-size="${size * 0.55}" 
    font-weight="400"
    font-style="italic"
    fill="#ffffff"
    text-anchor="middle"
    letter-spacing="-${size * 0.02}"
  >W</text>
  
  <!-- Subtle decorative underline swoosh -->
  <path 
    d="M ${size * 0.25} ${size * 0.72} 
       Q ${size * 0.35} ${size * 0.75} ${size * 0.5} ${size * 0.73}
       Q ${size * 0.65} ${size * 0.71} ${size * 0.75} ${size * 0.72}" 
    fill="none" 
    stroke="#ffffff" 
    stroke-width="${size * 0.008}" 
    stroke-linecap="round"
    opacity="0.7"/>
</svg>`;
}

async function generateIcons() {
  const assetsDir = path.join(__dirname, "..", "assets");

  for (const [filename, size] of Object.entries(sizes)) {
    const svg = createIconSVG(size);

    await sharp(Buffer.from(svg))
      .resize(size, size)
      .png()
      .toFile(path.join(assetsDir, filename));

    console.log(`✅ Generated ${filename} (${size}x${size})`);
  }

  console.log("\n🎴 All icons generated successfully!");
}

generateIcons().catch(console.error);
