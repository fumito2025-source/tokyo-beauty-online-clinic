/**
 * LINE Rich Menu 自動設定スクリプト
 * 実行: node scripts/setup-richmenu.mjs
 */

import puppeteer from "puppeteer"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { createReadStream } from "fs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")

// .env.localから環境変数を読み込む
const envPath = path.join(ROOT, ".env.local")
const envContent = fs.readFileSync(envPath, "utf-8")
for (const line of envContent.split("\n")) {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith("#")) continue
  const idx = trimmed.indexOf("=")
  if (idx === -1) continue
  const key = trimmed.slice(0, idx).trim()
  const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "")
  process.env[key] = val
}

const LINE_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN
if (!LINE_TOKEN) {
  console.error("❌ LINE_CHANNEL_ACCESS_TOKEN が .env.local に設定されていません")
  process.exit(1)
}

const LINE_API = "https://api.line.me/v2/bot"
const HEADERS = {
  Authorization: `Bearer ${LINE_TOKEN}`,
  "Content-Type": "application/json",
}

// リッチメニュー定義（2500x1686px、3列×2行）
const RICH_MENU = {
  size: { width: 2500, height: 1686 },
  selected: true,
  name: "Tokyo Beauty Main Menu",
  chatBarText: "メニュー",
  areas: [
    // 上段左：ご予約
    {
      bounds: { x: 0, y: 0, width: 833, height: 843 },
      action: { type: "uri", uri: "https://tokyo-beauty-online-clinic.vercel.app/reservation" },
    },
    // 上段中：プラン・料金
    {
      bounds: { x: 833, y: 0, width: 834, height: 843 },
      action: { type: "uri", uri: "https://tokyo-beauty-online-clinic.vercel.app/plans" },
    },
    // 上段右：薬の説明
    {
      bounds: { x: 1667, y: 0, width: 833, height: 843 },
      action: { type: "message", text: "薬の説明" },
    },
    // 下段左：経過・ご相談
    {
      bounds: { x: 0, y: 843, width: 833, height: 843 },
      action: { type: "message", text: "経過・ご相談" },
    },
    // 下段中：よくある質問
    {
      bounds: { x: 833, y: 843, width: 834, height: 843 },
      action: { type: "uri", uri: "https://tokyo-beauty-online-clinic.vercel.app/faq" },
    },
    // 下段右：お問い合わせ
    {
      bounds: { x: 1667, y: 843, width: 833, height: 843 },
      action: { type: "message", text: "お問い合わせ" },
    },
  ],
}

async function captureRichMenuImage() {
  const htmlPath = path.join(ROOT, "scripts", "richmenu-render.html")
  const outPath = path.join(ROOT, "scripts", "richmenu.png")

  console.log("🖼  Puppeteerでリッチメニュー画像を生成中...")
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.setViewport({ width: 2500, height: 1686, deviceScaleFactor: 1 })
  await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle0" })
  await new Promise(r => setTimeout(r, 1500))

  // リッチメニュー要素だけをキャプチャ
  const element = await page.$(".richmenu")
  if (!element) {
    await browser.close()
    throw new Error(".richmenu 要素が見つかりません")
  }
  await element.screenshot({ path: outPath, type: "png" })
  await browser.close()
  console.log(`✅ 画像生成完了: ${outPath}`)
  return outPath
}

async function createRichMenu() {
  console.log("📋 LINEにリッチメニューを登録中...")
  const res = await fetch(`${LINE_API}/richmenu`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(RICH_MENU),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(`リッチメニュー作成失敗: ${JSON.stringify(data)}`)
  console.log(`✅ リッチメニュー作成: ${data.richMenuId}`)
  return data.richMenuId
}

async function uploadImage(richMenuId, imagePath) {
  console.log("📤 画像をアップロード中...")
  const imageData = fs.readFileSync(imagePath)
  const res = await fetch(`https://api-data.line.me/v2/bot/richmenu/${richMenuId}/content`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LINE_TOKEN}`,
      "Content-Type": "image/png",
    },
    body: imageData,
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`画像アップロード失敗: ${err}`)
  }
  console.log("✅ 画像アップロード完了")
}

async function setDefaultRichMenu(richMenuId) {
  console.log("🔧 デフォルトリッチメニューに設定中...")
  const res = await fetch(`${LINE_API}/user/all/richmenu/${richMenuId}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${LINE_TOKEN}` },
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`デフォルト設定失敗: ${err}`)
  }
  console.log("✅ デフォルトリッチメニューに設定完了")
}

async function deleteExistingMenus() {
  console.log("🗑  既存のリッチメニューを確認中...")
  const res = await fetch(`${LINE_API}/richmenu/list`, { headers: HEADERS })
  const data = await res.json()
  const list = data.richmenus ?? []
  if (list.length === 0) {
    console.log("   既存メニューなし")
    return
  }
  for (const menu of list) {
    await fetch(`${LINE_API}/richmenu/${menu.richMenuId}`, {
      method: "DELETE",
      headers: HEADERS,
    })
    console.log(`   削除: ${menu.richMenuId} (${menu.name})`)
  }
}

async function captureChatBackground() {
  const htmlPath = path.join(ROOT, "scripts", "chat-bg-render.html")
  const outPath = path.join(ROOT, "scripts", "chat-bg.png")

  console.log("🖼  チャット背景画像を生成中...")
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 })
  await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle0" })
  await new Promise(r => setTimeout(r, 1500))
  await page.screenshot({ path: outPath, type: "png" })
  await browser.close()
  console.log(`✅ 背景画像生成完了: ${outPath}`)
  return outPath
}

// ─── メイン ───────────────────────────────────────────────
async function main() {
  console.log("\n🚀 LINE Rich Menu 自動設定を開始します\n")
  try {
    await deleteExistingMenus()
    const imagePath = await captureRichMenuImage()
    const richMenuId = await createRichMenu()
    await uploadImage(richMenuId, imagePath)
    await setDefaultRichMenu(richMenuId)
    await captureChatBackground()
    console.log("\n🎉 完了！")
    console.log("   ✅ リッチメニュー → LINEに自動設定済み")
    console.log("   📁 背景画像 → scripts/chat-bg.png を手動でLINEにアップロード\n")
  } catch (err) {
    console.error("\n❌ エラー:", err.message)
    process.exit(1)
  }
}

main()
