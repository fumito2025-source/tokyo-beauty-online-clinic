"use client"
import { useState } from "react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

// Stripe Price IDs（stripe-seed.ts実行後に .env.local から自動取得予定）
// 開発中はハードコード、本番は環境変数に移行
const PLAN_PRICE_ENV: Record<string, string> = {
  S1: process.env.NEXT_PUBLIC_STRIPE_PRICE_S1 ?? "",
  S2: process.env.NEXT_PUBLIC_STRIPE_PRICE_S2 ?? "",
  S3: process.env.NEXT_PUBLIC_STRIPE_PRICE_S3 ?? "",
  S4: process.env.NEXT_PUBLIC_STRIPE_PRICE_S4 ?? "",
  S5: process.env.NEXT_PUBLIC_STRIPE_PRICE_S5 ?? "",
  S6: process.env.NEXT_PUBLIC_STRIPE_PRICE_S6 ?? "",
  S7: process.env.NEXT_PUBLIC_STRIPE_PRICE_S7 ?? "",
  N1: process.env.NEXT_PUBLIC_STRIPE_PRICE_N1 ?? "",
  N2: process.env.NEXT_PUBLIC_STRIPE_PRICE_N2 ?? "",
  N3: process.env.NEXT_PUBLIC_STRIPE_PRICE_N3 ?? "",
  N4: process.env.NEXT_PUBLIC_STRIPE_PRICE_N4 ?? "",
  M1: process.env.NEXT_PUBLIC_STRIPE_PRICE_M1 ?? "",
  M2: process.env.NEXT_PUBLIC_STRIPE_PRICE_M2 ?? "",
  M3: process.env.NEXT_PUBLIC_STRIPE_PRICE_M3 ?? "",
  M4: process.env.NEXT_PUBLIC_STRIPE_PRICE_M4 ?? "",
  M5: process.env.NEXT_PUBLIC_STRIPE_PRICE_M5 ?? "",
  ADDON_LASH: process.env.NEXT_PUBLIC_STRIPE_PRICE_ADDON_LASH ?? "",
  ADDON_MOIST: process.env.NEXT_PUBLIC_STRIPE_PRICE_ADDON_MOIST ?? "",
  ADDON_GUT: process.env.NEXT_PUBLIC_STRIPE_PRICE_ADDON_GUT ?? "",
  ADDON_SLIM: process.env.NEXT_PUBLIC_STRIPE_PRICE_ADDON_SLIM ?? "",
}

interface Plan {
  id: string
  name: string
  price: number
  ingredients: string[]
  badge?: string
}

interface AddonPlan {
  id: string
  name: string
  price: number
}

const SKINCARE_PLANS: Plan[] = [
  { id: "S1", name: "美肌ベーシック", price: 3980, ingredients: ["シナール", "ハイチオール"] },
  { id: "S2", name: "美肌スタンダード", price: 4980, ingredients: ["シナール", "ハイチオール", "ノイロビタン"] },
  { id: "S3", name: "美白ベーシック", price: 6980, ingredients: ["シナール", "ハイチオール", "ノイロビタン", "トラネキサム酸"] },
  { id: "S4", name: "美白プレミアム", price: 8480, ingredients: ["上記 + ユベラ（Vit.E）"] },
  { id: "S5", name: "白玉プレミアム", price: 11800, ingredients: ["上記 + グルタチオン"], badge: "人気" },
  { id: "S6", name: "白玉パーフェクト", price: 14800, ingredients: ["上記 + ハイドロキノン（外用）"] },
  { id: "S7", name: "トータルケア", price: 16800, ingredients: ["上記 + トレチノイン（外用）"], badge: "最上位" },
]

const ACNE_PLANS: Plan[] = [
  { id: "N1", name: "ニキビ外用ライト", price: 3480, ingredients: ["外用薬（軽度対応）"] },
  { id: "N2", name: "ニキビ標準", price: 6980, ingredients: ["内服薬 + 外用薬（中等度）"] },
  { id: "N3", name: "ニキビ重症", price: 9800, ingredients: ["強力内服 + 外用（重症対応）"] },
  { id: "N4", name: "ニキビ最重症", price: 11800, ingredients: ["最大処方（嚢腫性対応）"], badge: "最上位" },
]

const MENS_PLANS: Plan[] = [
  { id: "M1", name: "AGA予防", price: 3980, ingredients: ["フィナステリド"] },
  { id: "M2", name: "AGA発毛", price: 7980, ingredients: ["フィナステリド + ミノキシジル"] },
  { id: "M3", name: "AGA＋美肌", price: 7980, ingredients: ["AGA処方 + 美肌サポート"] },
  { id: "M4", name: "トータル2.5", price: 19800, ingredients: ["ミノキシジル2.5mg総合プラン"] },
  { id: "M5", name: "トータル5.0", price: 29800, ingredients: ["ミノキシジル5.0mg最上位プラン"], badge: "最上位" },
]

const ADDONS: AddonPlan[] = [
  { id: "ADDON_LASH", name: "まつ毛ケア", price: 2000 },
  { id: "ADDON_MOIST", name: "保湿ケア", price: 1500 },
  { id: "ADDON_GUT", name: "腸活", price: 1200 },
  { id: "ADDON_SLIM", name: "むくみケア", price: 1800 },
]

type Tab = "skincare" | "acne" | "mens"

export default function PlansPage() {
  const [activeTab, setActiveTab] = useState<Tab>("skincare")
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const currentPlans =
    activeTab === "skincare" ? SKINCARE_PLANS : activeTab === "acne" ? ACNE_PLANS : MENS_PLANS

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]))
  }

  const totalPrice =
    (selectedPlan?.price ?? 0) +
    selectedAddons.reduce((sum, id) => {
      const addon = ADDONS.find((a) => a.id === id)
      return sum + (addon?.price ?? 0)
    }, 0)

  const handleCheckout = async () => {
    if (!selectedPlan) return
    setLoading(true)
    try {
      const priceId = PLAN_PRICE_ENV[selectedPlan.id]
      const addonPriceIds = selectedAddons
        .map((id) => PLAN_PRICE_ENV[id])
        .filter(Boolean)

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId,
          addonPriceIds,
          planId: selectedPlan.id,
          planName: selectedPlan.name,
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error ?? "エラーが発生しました")
      }
    } finally {
      setLoading(false)
    }
  }

  const tabs: { key: Tab; label: string; labelEn: string }[] = [
    { key: "skincare", label: "美白・美肌", labelEn: "SKINCARE" },
    { key: "acne", label: "ニキビ", labelEn: "ACNE" },
    { key: "mens", label: "男性・AGA", labelEn: "MENS / AGA" },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-clinic-black text-clinic-offwhite">
        {/* ページヘッダー */}
        <section className="border-b border-white/8 py-16 px-6 text-center">
          <p className="text-[10px] tracking-[0.45em] text-clinic-gold/80 font-sans mb-4">SUBSCRIPTION PLANS</p>
          <h1 className="font-serif font-light text-3xl sm:text-4xl tracking-[0.08em] mb-4">
            サブスクリプションプラン
          </h1>
          <p className="text-xs text-clinic-offwhite/60 tracking-wide max-w-lg mx-auto leading-loose">
            医師が診察・処方し、毎月お届けします。<br />
            お支払い完了後、医師が確認次第発送いたします。
          </p>
        </section>

        <div className="max-w-5xl mx-auto px-6 py-14">
          {/* タブ */}
          <div className="flex gap-0 mb-12 border border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => { setActiveTab(tab.key); setSelectedPlan(null) }}
                className={`flex-1 py-4 text-center transition-colors ${
                  activeTab === tab.key
                    ? "bg-clinic-gold/15 border-b-2 border-clinic-gold"
                    : "hover:bg-white/3"
                }`}
              >
                <span className={`block text-[9px] tracking-[0.4em] font-sans mb-1 ${
                  activeTab === tab.key ? "text-clinic-gold" : "text-clinic-offwhite/40"
                }`}>{tab.labelEn}</span>
                <span className={`text-[11px] tracking-wide ${
                  activeTab === tab.key ? "text-clinic-offwhite" : "text-clinic-offwhite/55"
                }`}>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* プラン一覧 */}
            <div className="space-y-3">
              <p className="text-[9px] tracking-[0.4em] text-clinic-gold/70 font-sans mb-5">PLANS</p>
              {currentPlans.map((plan) => {
                const isSelected = selectedPlan?.id === plan.id
                return (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan)}
                    className={`w-full text-left border p-5 transition-all ${
                      isSelected
                        ? "border-clinic-gold bg-clinic-gold/8"
                        : "border-white/10 hover:border-white/25 hover:bg-white/3"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[9px] text-clinic-gold/60 font-sans tracking-widest">{plan.id}</span>
                          {plan.badge && (
                            <span className="text-[8px] border border-clinic-gold/50 text-clinic-gold/70 px-2 py-0.5 tracking-widest font-sans">
                              {plan.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm tracking-wide mb-2">{plan.name}</p>
                        <p className="text-[10px] text-clinic-offwhite/45 leading-relaxed">
                          {plan.ingredients.join("、")}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-lg font-serif font-light text-clinic-gold">
                          ¥{plan.price.toLocaleString()}
                        </p>
                        <p className="text-[9px] text-clinic-offwhite/40 tracking-widest">/月</p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="mt-3 pt-3 border-t border-clinic-gold/20 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-clinic-gold" />
                        <span className="text-[9px] text-clinic-gold tracking-widest font-sans">選択中</span>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            {/* 右側：アドオン＋サマリー */}
            <div className="space-y-6">
              {/* アドオン */}
              <div>
                <p className="text-[9px] tracking-[0.4em] text-clinic-gold/70 font-sans mb-4">ADD-ONS（オプション）</p>
                <div className="space-y-2">
                  {ADDONS.map((addon) => {
                    const checked = selectedAddons.includes(addon.id)
                    return (
                      <label
                        key={addon.id}
                        className={`flex items-center justify-between border p-4 cursor-pointer transition-all ${
                          checked
                            ? "border-clinic-gold/60 bg-clinic-gold/5"
                            : "border-white/10 hover:border-white/25"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 ${
                            checked ? "border-clinic-gold bg-clinic-gold" : "border-white/30"
                          }`}>
                            {checked && (
                              <svg className="w-2.5 h-2.5 text-clinic-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className="text-[11px] tracking-wide">{addon.name}</span>
                        </div>
                        <span className="text-[11px] text-clinic-gold/80">+¥{addon.price.toLocaleString()}</span>
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={checked}
                          onChange={() => toggleAddon(addon.id)}
                        />
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* 合計・チェックアウト */}
              <div className="border border-white/10 p-6">
                <p className="text-[9px] tracking-[0.4em] text-clinic-gold/70 font-sans mb-5">ORDER SUMMARY</p>

                {selectedPlan ? (
                  <>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-xs">
                        <span className="text-clinic-offwhite/60">[{selectedPlan.id}] {selectedPlan.name}</span>
                        <span>¥{selectedPlan.price.toLocaleString()}</span>
                      </div>
                      {selectedAddons.map((id) => {
                        const addon = ADDONS.find((a) => a.id === id)!
                        return (
                          <div key={id} className="flex justify-between text-xs">
                            <span className="text-clinic-offwhite/60">{addon.name}</span>
                            <span>+¥{addon.price.toLocaleString()}</span>
                          </div>
                        )
                      })}
                    </div>
                    <div className="border-t border-white/10 pt-4 mb-6">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-clinic-offwhite/70 tracking-wide">月額合計</span>
                        <div className="text-right">
                          <span className="text-2xl font-serif font-light text-clinic-gold">
                            ¥{totalPrice.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-clinic-offwhite/40 ml-1">/月</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleCheckout}
                      disabled={loading}
                      className="w-full bg-clinic-gold text-clinic-black py-4 text-[11px] tracking-[0.3em] font-sans hover:opacity-85 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "処理中..." : "お申し込みへ進む"}
                    </button>
                    <p className="text-[9px] text-clinic-offwhite/35 mt-3 text-center leading-relaxed">
                      お支払い完了後、医師が内容を確認して発送いたします。<br />
                      いつでもキャンセル可能です。
                    </p>
                  </>
                ) : (
                  <p className="text-xs text-clinic-offwhite/40 text-center py-6">
                    左からプランを選択してください
                  </p>
                )}
              </div>

              {/* 注意事項 */}
              <div className="border border-white/8 p-5 space-y-2">
                <p className="text-[9px] tracking-[0.4em] text-clinic-gold/60 font-sans mb-3">NOTES</p>
                {[
                  "本サービスは自由診療です。保険適用外となります。",
                  "初回は医師による問診・審査があります。",
                  "処方は医師の判断により変更になる場合があります。",
                  "毎月自動更新。マイページからいつでも解約可能です。",
                ].map((note, i) => (
                  <p key={i} className="text-[10px] text-clinic-offwhite/45 leading-relaxed">
                    ・{note}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
