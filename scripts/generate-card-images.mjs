import puppeteer from "puppeteer"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.join(__dirname, "..", "public", "medication")

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })

const cards = [
  {
    id: "aga",
    label: "AGA治療薬",
    en: "AGA TREATMENT",
    icon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="28" r="16" stroke="#C9A84C" stroke-width="1.2"/>
      <path d="M24 28 Q28 18 40 16 Q52 18 56 28" stroke="#C9A84C" stroke-width="1" fill="none"/>
      <path d="M30 50 Q34 42 40 40 Q46 42 50 50" stroke="#C9A84C" stroke-width="1.2" fill="none"/>
      <line x1="20" y1="56" x2="60" y2="56" stroke="#C9A84C" stroke-width="1"/>
      <line x1="26" y1="62" x2="54" y2="62" stroke="#C9A84C" stroke-width="0.8" opacity="0.5"/>
    </svg>`,
  },
  {
    id: "whitening",
    label: "美白・肝斑",
    en: "WHITENING",
    icon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="38" r="20" stroke="#C9A84C" stroke-width="1.2"/>
      <circle cx="40" cy="38" r="12" stroke="#C9A84C" stroke-width="0.8" opacity="0.5"/>
      <line x1="40" y1="12" x2="40" y2="18" stroke="#C9A84C" stroke-width="1.2"/>
      <line x1="40" y1="58" x2="40" y2="64" stroke="#C9A84C" stroke-width="1.2"/>
      <line x1="16" y1="38" x2="22" y2="38" stroke="#C9A84C" stroke-width="1.2"/>
      <line x1="58" y1="38" x2="64" y2="38" stroke="#C9A84C" stroke-width="1.2"/>
      <line x1="23" y1="21" x2="27" y2="25" stroke="#C9A84C" stroke-width="1.2"/>
      <line x1="53" y1="51" x2="57" y2="55" stroke="#C9A84C" stroke-width="1.2"/>
      <line x1="57" y1="21" x2="53" y2="25" stroke="#C9A84C" stroke-width="1.2"/>
      <line x1="27" y1="51" x2="23" y2="55" stroke="#C9A84C" stroke-width="1.2"/>
      <circle cx="40" cy="38" r="5" fill="rgba(201,168,76,0.2)" stroke="#C9A84C" stroke-width="1"/>
    </svg>`,
  },
  {
    id: "acne",
    label: "ニキビ治療",
    en: "ACNE TREATMENT",
    icon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 60 C20 38 30 20 40 16 C50 20 60 38 60 60" stroke="#C9A84C" stroke-width="1.2" fill="none"/>
      <path d="M28 60 C28 44 34 30 40 26 C46 30 52 44 52 60" stroke="#C9A84C" stroke-width="0.8" fill="none" opacity="0.6"/>
      <line x1="18" y1="62" x2="62" y2="62" stroke="#C9A84C" stroke-width="1.2"/>
      <circle cx="40" cy="12" r="3" fill="rgba(201,168,76,0.3)" stroke="#C9A84C" stroke-width="1"/>
      <line x1="32" y1="45" x2="48" y2="45" stroke="#C9A84C" stroke-width="0.8" opacity="0.4"/>
      <line x1="30" y1="52" x2="50" y2="52" stroke="#C9A84C" stroke-width="0.8" opacity="0.4"/>
    </svg>`,
  },
  {
    id: "obesity",
    label: "肥満・ダイエット",
    en: "OBESITY TREATMENT",
    icon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 20 C28 20 20 30 20 40 C20 52 28 62 40 62 C52 62 60 52 60 40 C60 30 52 20 40 20Z" stroke="#C9A84C" stroke-width="1.2" fill="rgba(201,168,76,0.05)"/>
      <path d="M40 28 C34 28 28 33 28 40 C28 47 34 52 40 52 C46 52 52 47 52 40" stroke="#C9A84C" stroke-width="0.8" fill="none" opacity="0.5"/>
      <line x1="40" y1="14" x2="40" y2="20" stroke="#C9A84C" stroke-width="1.2"/>
      <polyline points="34,17 40,14 46,17" stroke="#C9A84C" stroke-width="1" fill="none"/>
      <line x1="36" y1="40" x2="44" y2="40" stroke="#C9A84C" stroke-width="1.2"/>
      <line x1="40" y1="36" x2="40" y2="44" stroke="#C9A84C" stroke-width="1.2"/>
    </svg>`,
  },
  {
    id: "moisturizing",
    label: "保湿・外用薬",
    en: "MOISTURIZING",
    icon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 14 C40 14 22 34 22 48 C22 58 30 66 40 66 C50 66 58 58 58 48 C58 34 40 14 40 14Z" stroke="#C9A84C" stroke-width="1.2" fill="rgba(201,168,76,0.06)"/>
      <path d="M40 28 C40 28 30 42 30 50 C30 56 34.5 60 40 60" stroke="#C9A84C" stroke-width="0.8" opacity="0.5" fill="none"/>
      <circle cx="40" cy="14" r="2" fill="#C9A84C" opacity="0.6"/>
    </svg>`,
  },
]

const html = (card) => `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@200;300;400&family=Noto+Sans+JP:wght@300&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 640px; height: 320px; overflow: hidden; background: #0A0A0A; }
  .card {
    width: 640px; height: 320px;
    background: #0A0A0A;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 48px;
  }
  .card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 500px 300px at 60% 50%, rgba(201,168,76,0.07) 0%, transparent 70%);
  }
  .corner { position: absolute; width: 32px; height: 32px; }
  .tl { top: 20px; left: 20px; border-top: 1px solid rgba(201,168,76,0.35); border-left: 1px solid rgba(201,168,76,0.35); }
  .tr { top: 20px; right: 20px; border-top: 1px solid rgba(201,168,76,0.35); border-right: 1px solid rgba(201,168,76,0.35); }
  .bl { bottom: 20px; left: 20px; border-bottom: 1px solid rgba(201,168,76,0.35); border-left: 1px solid rgba(201,168,76,0.35); }
  .br { bottom: 20px; right: 20px; border-bottom: 1px solid rgba(201,168,76,0.35); border-right: 1px solid rgba(201,168,76,0.35); }
  .icon-wrap {
    width: 120px; height: 120px;
    border: 1px solid rgba(201,168,76,0.25);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    z-index: 1;
  }
  .icon-wrap svg { width: 64px; height: 64px; }
  .text { z-index: 1; }
  .en {
    font-family: 'Noto Sans JP', sans-serif;
    font-size: 11px; letter-spacing: 0.4em;
    color: rgba(201,168,76,0.55); margin-bottom: 10px;
  }
  .jp {
    font-family: 'Noto Serif JP', serif; font-weight: 300;
    font-size: 32px; letter-spacing: 0.2em;
    color: #F5F0E8; margin-bottom: 14px;
  }
  .line { width: 40px; height: 1px; background: rgba(201,168,76,0.4); margin-bottom: 14px; }
  .desc {
    font-family: 'Noto Sans JP', sans-serif; font-weight: 300;
    font-size: 12px; letter-spacing: 0.1em;
    color: rgba(245,240,232,0.35); line-height: 1.8;
  }
</style>
</head>
<body>
<div class="card">
  <div class="corner tl"></div><div class="corner tr"></div>
  <div class="corner bl"></div><div class="corner br"></div>
  <div class="icon-wrap">${card.icon}</div>
  <div class="text">
    <div class="en">${card.en}</div>
    <div class="jp">${card.label}</div>
    <div class="line"></div>
    <div class="desc">処方薬の効能・用法・注意事項</div>
  </div>
</div>
</body>
</html>`

console.log("🖼  カード画像を生成中...\n")
const browser = await puppeteer.launch({ headless: true })

for (const card of cards) {
  const page = await browser.newPage()
  await page.setViewport({ width: 640, height: 320, deviceScaleFactor: 2 })
  const tmpPath = path.join(__dirname, `_tmp_${card.id}.html`)
  fs.writeFileSync(tmpPath, html(card))
  await page.goto(`file://${tmpPath}`, { waitUntil: "networkidle0" })
  await new Promise(r => setTimeout(r, 1000))
  const outPath = path.join(OUT_DIR, `${card.id}.png`)
  await page.screenshot({ path: outPath, type: "png" })
  await page.close()
  fs.unlinkSync(tmpPath)
  console.log(`  ✅ ${card.label} → public/medication/${card.id}.png`)
}

await browser.close()
console.log("\n🎉 全カード画像生成完了！")
