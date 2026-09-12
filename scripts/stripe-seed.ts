/**
 * Stripeに全プランをProducts + Recurring Pricesとして登録するスクリプト
 * 実行: npx ts-node -e "require('dotenv').config({path:'.env.local'})" scripts/stripe-seed.ts
 * または: npx tsx scripts/stripe-seed.ts
 */

import Stripe from "stripe"
// .env.local は tsx 実行前に手動で読み込む（dotenv不要）

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

interface PlanDef {
  id: string
  name: string
  nameEn: string
  price: number
  description: string
  category: "skincare" | "acne" | "mens"
}

interface AddonDef {
  id: string
  name: string
  price: number
}

const PLANS: PlanDef[] = [
  // 美白ライン
  {
    id: "S1",
    name: "美肌ベーシック",
    nameEn: "Skin Basic",
    price: 3980,
    description: "シナール＋ハイチオール配合。日常の美肌ケアに最適な入門プランです。",
    category: "skincare",
  },
  {
    id: "S2",
    name: "美肌スタンダード",
    nameEn: "Skin Standard",
    price: 4980,
    description: "シナール＋ハイチオール＋ノイロビタン。栄養面からも肌をサポートします。",
    category: "skincare",
  },
  {
    id: "S3",
    name: "美白ベーシック",
    nameEn: "Whitening Basic",
    price: 6980,
    description: "S2にトラネキサム酸を追加。シミ・くすみの予防に効果的なプランです。",
    category: "skincare",
  },
  {
    id: "S4",
    name: "美白プレミアム",
    nameEn: "Whitening Premium",
    price: 8480,
    description: "S3にユベラ（ビタミンE）を追加。抗酸化作用で透明感のある肌を目指します。",
    category: "skincare",
  },
  {
    id: "S5",
    name: "白玉プレミアム",
    nameEn: "Shiratama Premium",
    price: 11800,
    description: "S4にグルタチオンを追加。全身の美白効果が期待できる人気のプランです。",
    category: "skincare",
  },
  {
    id: "S6",
    name: "白玉パーフェクト",
    nameEn: "Shiratama Perfect",
    price: 14800,
    description: "S5にハイドロキノン外用薬を追加。シミへのダイレクトアプローチが可能です。",
    category: "skincare",
  },
  {
    id: "S7",
    name: "トータルケア",
    nameEn: "Total Care",
    price: 16800,
    description: "S6にトレチノイン外用薬を追加。肌のターンオーバーを促進する最上位プランです。",
    category: "skincare",
  },
  // ニキビライン
  {
    id: "N1",
    name: "ニキビ外用ライト",
    nameEn: "Acne Light",
    price: 3480,
    description: "軽度のニキビ・吹き出物に対応した外用薬プランです。",
    category: "acne",
  },
  {
    id: "N2",
    name: "ニキビ標準",
    nameEn: "Acne Standard",
    price: 6980,
    description: "中等度のニキビに対応。内服＋外用薬の組み合わせで改善を目指します。",
    category: "acne",
  },
  {
    id: "N3",
    name: "ニキビ重症",
    nameEn: "Acne Severe",
    price: 9800,
    description: "重症ニキビ向けの強力プラン。医師の診察に基づき最適な処方を行います。",
    category: "acne",
  },
  {
    id: "N4",
    name: "ニキビ最重症",
    nameEn: "Acne Intense",
    price: 11800,
    description: "最重症のニキビ・嚢腫性ニキビに対応する最上位プランです。",
    category: "acne",
  },
  // 男性/AGAライン
  {
    id: "M1",
    name: "AGA予防",
    nameEn: "AGA Prevention",
    price: 3980,
    description: "薄毛の予防・初期対策に。フィナステリドによるDHT抑制プランです。",
    category: "mens",
  },
  {
    id: "M2",
    name: "AGA発毛",
    nameEn: "AGA Growth",
    price: 7980,
    description: "発毛を目指すプラン。フィナステリド＋ミノキシジルの組み合わせです。",
    category: "mens",
  },
  {
    id: "M3",
    name: "AGA＋美肌",
    nameEn: "AGA & Skin",
    price: 7980,
    description: "AGAケアに美肌ケアをプラス。髪と肌を同時にアプローチします。",
    category: "mens",
  },
  {
    id: "M4",
    name: "トータル2.5",
    nameEn: "Total 2.5",
    price: 19800,
    description: "ミノキシジル2.5mgを含む総合的なAGAプランです。",
    category: "mens",
  },
  {
    id: "M5",
    name: "トータル5.0",
    nameEn: "Total 5.0",
    price: 29800,
    description: "ミノキシジル5.0mgを含む最上位AGAプラン。本格的な発毛を目指す方向けです。",
    category: "mens",
  },
]

const ADDONS: AddonDef[] = [
  { id: "ADDON_LASH", name: "まつ毛ケア", price: 2000 },
  { id: "ADDON_MOIST", name: "保湿ケア", price: 1500 },
  { id: "ADDON_GUT", name: "腸活", price: 1200 },
  { id: "ADDON_SLIM", name: "むくみケア", price: 1800 },
]

async function seed() {
  console.log("🚀 Stripe シード開始...\n")

  const results: Record<string, { productId: string; priceId: string }> = {}

  for (const plan of PLANS) {
    console.log(`📦 [${plan.id}] ${plan.name} (¥${plan.price.toLocaleString()}/月)`)

    const product = await stripe.products.create({
      name: `[${plan.id}] ${plan.name}`,
      description: plan.description,
      metadata: {
        plan_id: plan.id,
        plan_name_en: plan.nameEn,
        category: plan.category,
      },
    })

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: plan.price,
      currency: "jpy",
      recurring: { interval: "month" },
      metadata: { plan_id: plan.id },
    })

    results[plan.id] = { productId: product.id, priceId: price.id }
    console.log(`   ✅ product: ${product.id}`)
    console.log(`   ✅ price:   ${price.id}\n`)
  }

  console.log("🔧 アドオン登録中...")
  for (const addon of ADDONS) {
    console.log(`📦 [${addon.id}] ${addon.name} (+¥${addon.price.toLocaleString()}/月)`)

    const product = await stripe.products.create({
      name: addon.name,
      metadata: { addon_id: addon.id, type: "addon" },
    })

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: addon.price,
      currency: "jpy",
      recurring: { interval: "month" },
      metadata: { addon_id: addon.id },
    })

    results[addon.id] = { productId: product.id, priceId: price.id }
    console.log(`   ✅ product: ${product.id}`)
    console.log(`   ✅ price:   ${price.id}\n`)
  }

  console.log("✨ シード完了！\n")
  console.log("=== .env.local に追加する Price IDs ===")
  for (const [id, { priceId }] of Object.entries(results)) {
    console.log(`STRIPE_PRICE_${id}=${priceId}`)
  }
}

seed().catch((err) => {
  console.error("❌ エラー:", err.message)
  process.exit(1)
})
