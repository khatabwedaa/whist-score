/**
 * Convert SVG icons to PNG
 * Requires: npm install sharp
 */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const assetsDir = path.join(__dirname, "..", "assets");

// Icon configurations
const icons = [
  { svg: "icon.svg", png: "icon.png", size: 1024 },
  { svg: "adaptive-icon.svg", png: "adaptive-icon.png", size: 1024 },
  { svg: "favicon.svg", png: "favicon.png", size: 48 },
  { svg: "splash-icon.svg", png: "splash-icon.png", size: 200 },
];

async function convertIcons() {
  console.log("🔄 Converting SVG icons to PNG...\n");

  for (const { svg, png, size } of icons) {
    const svgPath = path.join(assetsDir, svg);
    const pngPath = path.join(assetsDir, png);

    if (!fs.existsSync(svgPath)) {
      console.log(`⚠️  Skipping ${svg} - file not found`);
      continue;
    }

    try {
      await sharp(svgPath).resize(size, size).png().toFile(pngPath);

      console.log(`✅ ${svg} → ${png} (${size}x${size})`);
    } catch (error) {
      console.error(`❌ Error converting ${svg}:`, error.message);
    }
  }

  console.log("\n🎉 Icon conversion complete!");
  console.log("   Run `npx expo run:ios --device` to rebuild with new icons.");
}

convertIcons();
