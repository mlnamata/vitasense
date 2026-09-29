/*
 * Renders the storefront imagery from the catalogue with headless Chromium:
 * one studio packshot per product, the transparent hero still life, the
 * social preview and the Apple touch icon.
 *
 *   npm run images        (first time: npx playwright install chromium)
 *
 * The app only knows the output paths, so real photography can replace any
 * file later without touching code.
 */
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { products } from "../lib/data/mock.ts";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT_PRODUCTS = path.join(ROOT, "public/images/products");
const FONT_DIR = path.join(ROOT, "node_modules/@fontsource-variable/plus-jakarta-sans/files");

/* ---------- colour helpers ---------- */

const rgb = (hex) => hex.replace("#", "").match(/../g).map((part) => parseInt(part, 16));
const mix = (a, b, amount) =>
  "#" +
  rgb(a)
    .map((value, i) => Math.round(value + (rgb(b)[i] - value) * amount))
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("");

const escape = (text) =>
  text.replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char]);

/* ---------- shared stylesheet ---------- */

async function fontFaces() {
  const faces = [];
  for (const subset of ["latin", "latin-ext"]) {
    const data = await readFile(path.join(FONT_DIR, `plus-jakarta-sans-${subset}-wght-normal.woff2`));
    faces.push(
      `@font-face{font-family:Jakarta;font-weight:200 800;src:url(data:font/woff2;base64,${data.toString("base64")}) format("woff2");}`
    );
  }
  return faces.join("\n");
}

const NOISE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>"
  );

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:transparent}
body{font-family:Jakarta,sans-serif;-webkit-font-smoothing:antialiased}
.scene{position:relative;overflow:hidden}
.abs{position:absolute}
.noise{position:absolute;inset:0;background-image:url("${NOISE}");opacity:.07;mix-blend-mode:overlay;pointer-events:none}

/* jar */
.jar{position:absolute;display:flex;flex-direction:column;align-items:center;width:100em}
.lid{position:relative;width:86em;height:24em;border-radius:6em 6em 2em 2em;overflow:hidden;box-shadow:0 1em 2em rgba(0,0,0,.18)}
.rib{position:absolute;inset:0;background:repeating-linear-gradient(90deg,rgba(255,255,255,.11) 0 1.1em,rgba(0,0,0,.07) 1.1em 2.2em,transparent 2.2em 3.3em)}
.cyl{position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.36) 0%,rgba(0,0,0,.06) 16%,rgba(255,255,255,.24) 33%,rgba(255,255,255,.04) 50%,rgba(0,0,0,.08) 72%,rgba(0,0,0,.42) 100%)}
.gloss{position:absolute;left:0;right:0;top:0;height:3.5em;background:linear-gradient(180deg,rgba(255,255,255,.4),transparent)}
.collar{width:80em;height:4em;background:linear-gradient(90deg,#c9c1b3,#efebe4 36%,#e0d9cc 62%,#b9b0a1)}
.body{position:relative;width:100em;height:118em;border-radius:12em 12em 10em 10em;background:#faf8f4;overflow:hidden}
.paper{position:absolute;inset:0;background:linear-gradient(90deg,rgba(40,34,28,.30) 0%,rgba(40,34,28,.07) 13%,rgba(255,255,255,0) 25%,rgba(255,255,255,.7) 37%,rgba(255,255,255,0) 51%,rgba(40,34,28,.05) 72%,rgba(40,34,28,.32) 100%)}
.spec{position:absolute;top:8em;bottom:10em;left:31em;width:5em;border-radius:3em;background:rgba(255,255,255,.75);filter:blur(1.5em)}
.label{position:absolute;left:0;right:0;top:20em;bottom:0;display:flex;flex-direction:column;align-items:center;text-align:center;background:#fffdf9}
/* text sizes its own font, so everything in it is measured in --u (1% of pack width) */
.brand{margin-top:calc(var(--u)*11);font-size:calc(var(--u)*5.2);font-weight:700;letter-spacing:.32em;color:#64748b;padding-left:.32em}
.rule{width:15em;height:.9em;border-radius:1em;margin-top:4em}
.name{margin-top:calc(var(--u)*5);padding:0 9%;font-size:calc(var(--u)*11);font-weight:800;line-height:1.04;letter-spacing:-.025em;color:#1e293b;text-wrap:balance}
.unit{margin-top:calc(var(--u)*5);font-size:calc(var(--u)*5.4);font-weight:500;color:#64748b}
.band{position:absolute;left:0;right:0;bottom:0;height:15em;display:flex;align-items:center;justify-content:center}
.band span{color:#fff;font-size:calc(var(--u)*4.2);font-weight:700;letter-spacing:.28em;padding-left:.28em}

/* dropper */
.dropper{position:absolute;display:flex;flex-direction:column;align-items:center;width:100em}
.bulb{position:relative;width:32em;height:42em;border-radius:16em 16em 5em 5em;background:#2a2d3d;overflow:hidden}
.cap{position:relative;width:54em;height:26em;margin-top:-1em;border-radius:4em;background:#23263a;overflow:hidden}
.neck{width:44em;height:5em}
.glass{position:relative;width:100em;height:150em;border-radius:34em 34em 12em 12em;overflow:hidden}
.glass-shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.42) 0%,rgba(0,0,0,.08) 15%,rgba(255,255,255,.34) 27%,rgba(255,255,255,0) 42%,rgba(0,0,0,.06) 70%,rgba(0,0,0,.48) 100%)}
.glass .label{left:9em;right:9em;top:46em;bottom:18em;border-radius:3em}
.glass .brand{margin-top:calc(var(--u)*12);font-size:calc(var(--u)*6.6)}
.glass .rule{margin-top:5em;width:18em;height:1.1em}
.glass .name{margin-top:calc(var(--u)*6);font-size:calc(var(--u)*14.5);padding:0 6%}
.glass .unit{margin-top:calc(var(--u)*6);font-size:calc(var(--u)*6.8)}

/* props */
.capsule{position:absolute;border-radius:999px}
.softgel{position:absolute;border-radius:50%}
.contact{position:absolute;border-radius:50%;background:radial-gradient(closest-side,rgba(38,30,22,.42),rgba(38,30,22,.18) 55%,transparent)}

/* podium */
.podium{position:absolute}
.podium .side{position:absolute;left:0;width:100%}
.podium .top{position:absolute;left:0;top:0;width:100%;border-radius:50%}
`;

/* ---------- building blocks ---------- */

function jar(product, { x, y, width }) {
  const { accent } = product.category;
  const height = width * 1.46;
  return `
  <div class="jar" style="font-size:${width / 100}px;--u:${width / 100}px;left:${x - width / 2}px;top:${y - height}px">
    <div class="lid" style="background:${accent}"><i class="rib"></i><i class="cyl"></i><i class="gloss"></i></div>
    <div class="collar"></div>
    <div class="body">
      <div class="label">
        <div class="brand">VITASENSE</div>
        <div class="rule" style="background:${accent}"></div>
        <div class="name">${escape(product.name)}</div>
        <div class="unit">${escape(product.unit)}</div>
        <div class="band" style="background:${accent}"><span>DOPLNĚK STRAVY</span></div>
      </div>
      <i class="paper"></i><i class="spec"></i>
    </div>
  </div>`;
}

function dropper(product, { x, y, width }) {
  const { accent } = product.category;
  const height = width * 2.22;
  return `
  <div class="dropper" style="font-size:${width / 100}px;--u:${width / 100}px;left:${x - width / 2}px;top:${y - height}px">
    <div class="bulb"><i class="cyl"></i><i class="gloss"></i></div>
    <div class="cap"><i class="rib"></i><i class="cyl"></i></div>
    <div class="neck" style="background:${mix(accent, "#000000", 0.45)}"></div>
    <div class="glass" style="background:linear-gradient(180deg,${mix(accent, "#000000", 0.12)},${mix(accent, "#000000", 0.38)})">
      <div class="label">
        <div class="brand">VITASENSE</div>
        <div class="rule" style="background:${accent}"></div>
        <div class="name">${escape(product.name)}</div>
        <div class="unit">${escape(product.unit)}</div>
      </div>
      <i class="glass-shade"></i><i class="spec" style="left:24em;width:6em;top:14em;bottom:12em"></i>
    </div>
  </div>`;
}

const pack = (product, placement) =>
  product.format === "drops" ? dropper(product, placement) : jar(product, placement);

function contact(x, y, width) {
  const height = width * 0.16;
  return `<div class="contact" style="left:${x - width / 2}px;top:${y - height / 2}px;width:${width}px;height:${height}px"></div>`;
}

function capsule(x, y, length, rotate, accent) {
  const height = length * 0.4;
  return `<div class="capsule" style="left:${x}px;top:${y}px;width:${length}px;height:${height}px;transform:rotate(${rotate}deg);
    background:linear-gradient(180deg,rgba(255,255,255,.6),rgba(255,255,255,0) 42%,rgba(0,0,0,.14)),linear-gradient(90deg,${accent} 0 50%,#f1ece3 50% 100%);
    box-shadow:0 ${length * 0.12}px ${length * 0.22}px rgba(40,30,20,.28)"></div>`;
}

function softgel(x, y, length, rotate) {
  return `<div class="softgel" style="left:${x}px;top:${y}px;width:${length}px;height:${length * 0.56}px;transform:rotate(${rotate}deg);
    background:radial-gradient(circle at 34% 30%,rgba(255,255,255,.9) 0 7%,rgba(255,221,140,.95) 20%,#d4951f 64%,#8a5a12 100%);
    box-shadow:0 ${length * 0.12}px ${length * 0.24}px rgba(80,50,10,.3)"></div>`;
}

function drop(x, y, size, accent) {
  return `<div class="abs" style="left:${x}px;top:${y}px;width:${size}px;height:${size}px;border-radius:0 50% 50% 50%;transform:rotate(45deg);
    background:radial-gradient(circle at 35% 35%,rgba(255,255,255,.85) 0 10%,${mix(accent, "#ffffff", 0.15)} 30%,${mix(accent, "#000000", 0.3)} 100%);
    box-shadow:0 ${size * 0.15}px ${size * 0.3}px rgba(60,40,10,.3)"></div>`;
}

function powder(x, y, width) {
  return `<div class="abs" style="left:${x}px;top:${y}px;width:${width}px;height:${width * 0.34}px;border-radius:50% 50% 46% 46%/80% 80% 20% 20%;
    background:radial-gradient(ellipse at 45% 30%,#fbf5ea,#e8dcc6 60%,#cdbd9f);box-shadow:0 ${width * 0.05}px ${width * 0.08}px rgba(60,45,25,.25)"></div>`;
}

/** Scattered props on the podium top, chosen by what the product is. */
function props(product, cx, cy, scale) {
  const { accent } = product.category;
  const s = scale;
  if (product.format === "drops") {
    return drop(cx - 215 * s, cy - 6 * s, 30 * s, accent) + drop(cx + 180 * s, cy + 14 * s, 22 * s, accent);
  }
  if (product.format === "powder") {
    return powder(cx - 280 * s, cy - 10 * s, 150 * s);
  }
  if (/omega|koenzym/.test(product.slug)) {
    return softgel(cx - 250 * s, cy - 8 * s, 64 * s, -18) + softgel(cx + 180 * s, cy + 6 * s, 58 * s, 24) + softgel(cx - 190 * s, cy + 28 * s, 54 * s, 8);
  }
  return (
    capsule(cx - 262 * s, cy - 4 * s, 78 * s, -22, accent) +
    capsule(cx + 176 * s, cy + 8 * s, 72 * s, 28, accent) +
    capsule(cx - 196 * s, cy + 30 * s, 66 * s, 6, accent)
  );
}

function podium({ x, y, width, top, side, tint }) {
  const light = mix(tint, "#fbf8f2", 0.72);
  const mid = mix(tint, "#e9e1d3", 0.62);
  const dark = mix(tint, "#cfc4b1", 0.58);
  return `
  <div class="podium" style="left:${x - width / 2}px;top:${y - top / 2}px;width:${width}px;height:${top / 2 + side}px">
    <div class="side" style="top:${top / 2}px;height:${side}px;border-radius:0 0 50% 50%/0 0 ${top / 2}px ${top / 2}px;
      background:linear-gradient(90deg,${dark},${mid} 24%,${light} 44%,${mid} 70%,${dark})"></div>
    <div class="top" style="height:${top}px;background:radial-gradient(ellipse at 46% 38%,${light},${mid} 72%,${dark})"></div>
  </div>`;
}

/** Soft shadow of palm fronds falling across the wall. */
function fronds(width, height, opacity) {
  const frond = (x, y, angle, length) => {
    let leaves = "";
    for (let i = 1; i <= 12; i++) {
      const t = i / 13;
      const reach = Math.sin(Math.PI * t) * length * 0.26 + length * 0.05;
      for (const side of [-1, 1]) {
        // Leaflets droop more towards the tip, like a real frond.
        const tilt = side * (30 + 26 * t) + (i % 3) * 3;
        leaves += `<ellipse cx="${reach}" cy="0" rx="${reach}" ry="${length * (0.011 + 0.006 * Math.sin(Math.PI * t))}" transform="translate(${t * length} 0) rotate(${tilt})"/>`;
      }
    }
    return `<g transform="translate(${x} ${y}) rotate(${angle})"><rect x="0" y="-3" width="${length}" height="6" rx="3"/>${leaves}</g>`;
  };
  return `<svg class="abs" style="inset:0;filter:blur(${width * 0.005}px);opacity:${opacity};mix-blend-mode:multiply" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="#26312a">
    ${frond(-width * 0.18, height * 0.02, 24, width * 0.92)}
    ${frond(width * 1.06, -height * 0.12, 118, width * 0.52)}
  </svg>`;
}

function wall(tint) {
  return `background:
    radial-gradient(70% 55% at 32% 22%,rgba(255,255,255,.55),transparent 70%),
    linear-gradient(180deg,${mix(tint, "#ffffff", 0.5)} 0%,${tint} 66%,${mix(tint, "#6b5a45", 0.1)} 100%)`;
}

const page = (faces, width, height, body, transparent = false) => `<!doctype html><html><head><meta charset="utf-8">
<style>${faces}${CSS}</style></head>
<body style="width:${width}px;height:${height}px${transparent ? ";background:transparent" : ""}">${body}</body></html>`;

/* ---------- scenes ---------- */

function productScene(product) {
  const W = 900;
  const H = 1125;
  const { tint } = product.category;
  const cx = W / 2;
  const topY = 820;
  const width = product.format === "drops" ? 225 : 320;

  return {
    width: W,
    height: H,
    html: `<div class="scene" style="width:${W}px;height:${H}px;${wall(tint)}">
      ${fronds(W, H, 0.09)}
      <div class="abs" style="left:0;right:0;top:${H * 0.8}px;bottom:0;background:linear-gradient(180deg,${mix(tint, "#6b5a45", 0.06)},${mix(tint, "#6b5a45", 0.12)})"></div>
      ${podium({ x: cx, y: topY, width: 640, top: 140, side: 260, tint })}
      ${contact(cx, topY + 4, width * 1.35)}
      ${props(product, cx, topY - 8, 1)}
      ${pack(product, { x: cx, y: topY + 6, width })}
      <div class="noise"></div>
    </div>`,
  };
}

function heroScene(main, side) {
  const W = 1200;
  const H = 1200;
  const topY = 880;
  const podiumX = 500;
  const tint = "#e3eade";

  return {
    width: W,
    height: H,
    transparent: true,
    html: `<div class="scene" style="width:${W}px;height:${H}px">
      ${podium({ x: podiumX, y: topY, width: 820, top: 170, side: 190, tint })}
      ${contact(podiumX - 60, topY + 4, 480)}
      ${contact(podiumX + 205, topY + 34, 300)}
      ${capsule(podiumX - 390, topY - 6, 96, -22, main.category.accent)}
      ${capsule(podiumX - 300, topY + 36, 84, 8, main.category.accent)}
      ${drop(podiumX + 330, topY + 10, 34, side.category.accent)}
      ${pack(main, { x: podiumX - 60, y: topY + 8, width: 350 })}
      ${pack(side, { x: podiumX + 205, y: topY + 40, width: 205 })}
    </div>`,
  };
}

function ogScene(items) {
  const W = 1200;
  const H = 630;
  const tint = "#ece6db";
  const cx = 880;
  const topY = 520;
  const [back, main, side] = items;

  return {
    width: W,
    height: H,
    html: `<div class="scene" style="width:${W}px;height:${H}px;${wall(tint)}">
      ${fronds(W, H, 0.08)}
      <div class="abs" style="left:80px;top:150px;width:520px">
        <div style="font-size:40px;font-weight:800;letter-spacing:-.03em;color:#0f172a">Vita<span style="color:#56704e">Sense</span></div>
        <div style="margin-top:34px;font-size:76px;font-weight:800;line-height:1.02;letter-spacing:-.045em;color:#0f172a">Zdraví, které <span style="color:#56704e">dává smysl.</span></div>
        <div style="margin-top:28px;font-size:26px;line-height:1.4;color:#475569">Prémiové doplňky stravy a chytrý ekosystém pro vaše tělo.</div>
      </div>
      ${podium({ x: cx, y: topY, width: 560, top: 110, side: 200, tint })}
      ${contact(cx - 185, topY - 10, 210)}
      ${contact(cx + 15, topY + 4, 280)}
      ${contact(cx + 190, topY + 24, 170)}
      ${pack(back, { x: cx - 185, y: topY - 8, width: 150 })}
      ${pack(main, { x: cx + 15, y: topY + 8, width: 200 })}
      ${pack(side, { x: cx + 190, y: topY + 28, width: 118 })}
      <div class="noise"></div>
    </div>`,
  };
}

function appleIconScene() {
  const S = 180;
  return {
    width: S,
    height: S,
    html: `<div class="scene" style="width:${S}px;height:${S}px;background:linear-gradient(160deg,#6d8a63,#465b40)">
      <svg class="abs" style="left:38px;top:38px" width="104" height="104" viewBox="0 0 24 24" fill="none" stroke="#f9f8f6" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
      </svg>
    </div>`,
  };
}

/* ---------- render ---------- */

async function render(browser, faces, scene, file, type) {
  const tab = await browser.newPage({ viewport: { width: scene.width, height: scene.height } });
  await tab.setContent(page(faces, scene.width, scene.height, scene.html, scene.transparent));
  await tab.evaluate(() => document.fonts.ready);
  await tab.screenshot({
    path: file,
    type,
    ...(type === "jpeg" ? { quality: 88 } : {}),
    omitBackground: Boolean(scene.transparent),
  });
  await tab.close();
  console.log("✓", path.relative(ROOT, file));
}

const bySlug = (slug) => {
  const product = products.find((item) => item.slug === slug);
  if (!product) throw new Error(`Unknown product ${slug}`);
  return product;
};

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const faces = await fontFaces();
await mkdir(OUT_PRODUCTS, { recursive: true });

const only = process.argv[2];

for (const product of products.filter((item) => !only || item.slug === only)) {
  await render(browser, faces, productScene(product), path.join(OUT_PRODUCTS, `${product.slug}.jpg`), "jpeg");
}
if (!only) {
await render(
  browser,
  faces,
  heroScene(bySlug("magnesium-complex"), bySlug("vitamin-d3-k2")),
  path.join(ROOT, "public/images/hero.png"),
  "png"
);
await render(
  browser,
  faces,
  ogScene([bySlug("ashwagandha-ksm-66"), bySlug("magnesium-complex"), bySlug("vitamin-d3-k2")]),
  path.join(ROOT, "app/opengraph-image.jpg"),
  "jpeg"
);
await render(browser, faces, appleIconScene(), path.join(ROOT, "app/apple-icon.png"), "png");
}

await browser.close();
