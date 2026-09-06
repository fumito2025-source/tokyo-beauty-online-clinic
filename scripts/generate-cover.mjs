import puppeteer from "puppeteer"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const htmlPath = path.join(__dirname, "cover-render.html")
const outPath = path.join(__dirname, "cover.png")

console.log("🖼  カバー画像を生成中...")
const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.setViewport({ width: 1080, height: 878, deviceScaleFactor: 1 })
await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle0" })
await new Promise(r => setTimeout(r, 1500))
await page.screenshot({ path: outPath, type: "png" })
await browser.close()
console.log(`✅ 完了: ${outPath}`)
