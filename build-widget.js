const fs = require("fs");
const path = require("path");

// ---------- 1. Define source and destination ----------
const buildDir = path.resolve(__dirname, "build");
const distDir = path.resolve(__dirname, "dist");

// Recursively copy folder
function copyRecursiveSync(src, dest) {
  const stats = fs.statSync(src);

  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((child) => {
      copyRecursiveSync(path.join(src, child), path.join(dest, child));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Remove old dist folder if exists
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}

// Copy everything from build -> dist
copyRecursiveSync(buildDir, distDir);
console.log("✅ All files and folders copied from build/ to dist/");

// ---------- 2. Copy main widget JS to dist root ----------
const widgetSrc = path.resolve(buildDir, "recycling-game-widget.js");
const widgetDest = path.join(distDir, "recycling-game-widget.js");

if (!fs.existsSync(widgetSrc)) {
  console.error("❌ recycling-game-widget.js not found in build/");
  process.exit(1);
}

fs.copyFileSync(widgetSrc, widgetDest);
console.log("✅ Widget JS copied to dist/recycling-game-widget.js");

// ---------- 3. Rename CSS to a fixed filename ----------
const cssDir = path.join(distDir, "static/css");
if (fs.existsSync(cssDir)) {
  const cssFiles = fs.readdirSync(cssDir);
  cssFiles.forEach((file) => {
    if (file.endsWith(".css")) {
      const oldPath = path.join(cssDir, file);
      const newPath = path.join(cssDir, "recycling-game-widget.css");
      fs.renameSync(oldPath, newPath);
      console.log(`✅ CSS renamed to recycling-game-widget.css`);
    }
  });
}

// ---------- 4. Log instructions ----------
console.log(`
🎉 Build complete!

Include the widget via unpkg/npm:

<link rel="stylesheet" href="https://unpkg.com/recycling-game-widget@${
  process.env.npm_package_version
}/dist/static/css/recycling-game-widget.css" />
<script src="https://unpkg.com/recycling-game-widget@${
  process.env.npm_package_version
}/dist/recycling-game-widget.js"></script>

<recycling-game-widget width="500" height="700"></recycling-game-widget>
`);
