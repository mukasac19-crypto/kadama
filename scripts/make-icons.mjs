// Generates the PNG app icons from src/app/icon.svg (run once after editing it).
import { readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const svg = readFileSync(new URL("../src/app/icon.svg", import.meta.url));

const apple = await sharp(svg, { density: 300 }).resize(180, 180).png().toBuffer();
writeFileSync(new URL("../src/app/apple-icon.png", import.meta.url), apple);
console.log("apple-icon.png (180x180) written");
