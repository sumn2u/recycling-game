const fs = require("fs");
const path = require("path");

// Source and destination
const src = path.resolve(__dirname, "build/recycling-game-widget.js");
const destDir = path.resolve(__dirname, "dist");
const dest = path.join(destDir, "recycling-game-widget.js");

// Ensure destination folder exists
fs.mkdirSync(destDir, { recursive: true });

// Copy the JS file
if (!fs.existsSync(src)) {
  console.error("Error: recycling-game-widget.js not found in build/");
  process.exit(1);
}

fs.copyFileSync(src, dest);
console.log("Widget JS copied to dist/recycling-game-widget.js ✅");
