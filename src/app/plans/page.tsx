import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "プランと料金 | 東京美容オンラインクリニック",
  description: "東京美容オンラインクリニックの医療ダイエットプログラムのプランと料金をご案内します。",
}

const INCLUDES = [
  "医師による初回診察・定期診察（月1回）",
  "カウンセラーによる週1回面談",
  "医療用製剤の処方・薬代・配送料",
  "体調変化・不安のLINE相談",
  "専用サイトでの体重・食事管理",
]

const PLANS = [
  {
    id: "monthly",
    period: "月払い",
    en: "MONTHLY",
    desc: "1ヶ月ずつ継続。まず試してみたい方に。",
    oral: { price: "¥69,800", unit: "/ 月（税込）" },
    injection: { price: "¥104,800", unit: "/ 月（税込）" },
    note: null,
  },
  {
    id: "bulk",
    period: "3ヶ月一括",
    en: "3-MONTH PROGRAM",
    desc: "本体3ヶ月を一括払い。割引価格で本気で取り組む方に。",
    oral: { price: "¥198,000", unit: "/ 3ヶ月（税込）" },
    injection: { price: "¥298,000", unit: "/ 3ヶ月（税込）" },
    note: null,
    recommended: true,
  },
]

export default function PlansPage() {
  return (
    <div className="min-h-screen bg-clinic-black">
      {/* ─── PAGE HEADER ─── */}
      <div className="border-b border-clinic-gray-light pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.5em] text-clinic-gold mb-4 font-sans">PROGRAM & PRICE</p>
          <div className="w-8 h-px bg-clinic-gold mx-auto mb-6" />
          <h1 className="font-serif font-light text-3xl md:text-4xl tracking-[0.2em] text-clinic-offwhite">
            プランと料金
          </h1>
          <p className="text-xs text-clinic-offwhite/55 mt-6 tracking-wider">
            ※ 金額はすべて税込・薬代・配送料込みです。
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">

        {/* ─── PLAN CARDS ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-clinic-gray-light mb-16">
          {PLANS.map((plan) => (
            <div key={plan.id} className={`relative bg-clinic-gray-dark p-10 md:p-12 ${plan.recommended ? "border border-clinic-gold/50" : ""}`}>
              {plan.recommended && (
                <p className="absolute top-4 right-4 text-[9px] tracking-[0.3em] text-clinic-gold border border-clinic-gold/50 px-3 py-1 font-sans">
                  おすすめ
                </p>
              )}
              <p className="text-[10px] tracking-[0.5em] text-clinic-gold mb-3 font-sans">{plan.en}</p>
              <h2 className="font-serif font-light text-xl tracking-[0.15em] text-clinic-offwhite mb-2">
                {plan.period}
              </h2>
              <p className="text-xs text-clinic-offwhite/55 tracking-wide mb-8 leading-relaxed">{plan.desc}</p>

              <div className="w-full h-px bg-clinic-gray-light mb-8" />

              {/* 内服 */}
              <div className="mb-6">
                <p className="text-[9px] tracking-[0.4em] text-clinic-gold/70 font-sans mb-2">内服コース</p>
                <div className="flex items-end gap-2">
                  <span className="font-serif text-3xl text-clinic-offwhite">{plan.oral.price}</span>
                  <span className="text-xs text-clinic-offwhite/50 mb-1 tracking-wide">{plan.oral.unit}</span>
                </div>
              </div>

              {/* 注射 */}
              <div className="mb-6">
                <p className="text-[9px] tracking-[0.4em] text-clinic-gold/70 font-sans mb-2">注射コース</p>
                <div className="flex items-end gap-2">
                  <span className="font-serif text-3xl text-clinic-offwhite">{plan.injection.price}</span>
                  <span className="text-xs text-clinic-offwhite/50 mb-1 tracking-wide">{plan.injection.unit}</span>
                </div>
              </div>

              {plan.note && (
                <p className="text-[10px] text-clinic-gold/60 tracking-wide mt-2">{plan.note}</p>
              )}
            </div>
          ))}
        </div>

        {/* ─── INCLUDES ─── */}
        <div className="border border-clinic-gray-light bg-clinic-gray-mid p-10 md:p-12 mb-16">
          <p className="text-[10px] tracking-[0.4em] text-clinic-gold mb-6 font-sans">INCLUDES — 両プラン共通</p>
          <ul className="space-y-4">
            {INCLUDES.map((item) => (
              <li key={item} className="flex gap-4 items-start">
                <span className="text-clinic-gold flex-shrink-0 text-sm mt-0.5">✓</span>
                <span className="text-sm text-clinic-offwhite/80 tracking-wide leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-[11px] text-clinic-offwhite/35 mt-8 leading-relaxed tracking-wide">
            ※ 内服・注射の選択および処方する薬の種類・用量は、医師の診察のうえ決定します。<br />
            ※ 効果には個人差があります。特定の結果を保証するものではありません。
          </p>
        </div>

        {/* ─── AFTERCARE ─── */}
        <div className="border border-clinic-gray-light bg-clinic-gray-mid p-10 md:p-12 mb-16">
          <p className="text-[10px] tracking-[0.4em] text-clinic-gold mb-4 font-sans">AFTERCARE</p>
          <h3 className="font-serif font-light text-base tracking-[0.15em] text-clinic-offwhite mb-3">
            アフターケア（任意・別途）
          </h3>
          <p className="text-sm text-clinic-offwhite/75 leading-relaxed tracking-wide">
            3ヶ月プログラム卒業後、希望される方には1ヶ月のアフターケアをご用意しています。<br />
            リバウンド防止のサポートと薬の段階的な減量を行います。
          </p>
          <div className="mt-6 flex gap-8">
            <div>
              <p className="text-[9px] tracking-[0.4em] text-clinic-gold/70 font-sans mb-1">内服コース</p>
              <p className="font-serif text-2xl text-clinic-offwhite">¥39,800</p>
              <p className="text-xs text-clinic-offwhite/50 mt-1">/ 1ヶ月（税込）</p>
            </div>
            <div>
              <p className="text-[9px] tracking-[0.4em] text-clinic-gold/70 font-sans mb-1">注射コース</p>
              <p className="font-serif text-2xl text-clinic-offwhite">¥49,800</p>
              <p className="text-xs text-clinic-offwhite/50 mt-1">/ 1ヶ月・薬別（税込）</p>
            </div>
          </div>
        </div>

        {/* ─── CTA ─── */}
        <div className="text-center">
          <p className="text-xs text-clinic-offwhite/60 tracking-wider mb-8 leading-relaxed">
            内服・注射の選択はカウンセリングと医師の診察を経て決まります。<br />
            まずはLINEでお気軽にご相談ください。初回カウンセリングは無料です。
          </p>
          <Link
            href="https://line.me/R/ti/p/@555glibw"
            className="inline-flex items-center gap-3 text-white px-12 py-4 text-xs tracking-[0.2em] font-sans hover:opacity-85 transition-opacity"
            style={{backgroundColor: "#06C755"}}
          >
            LINEで無料相談 →
          </Link>
          <p className="text-[11px] text-clinic-offwhite/35 mt-8 tracking-wide leading-relaxed">
            ※ 本サービスは自由診療のみです。健康保険は適用されません。<br />
            ※ 医師が必要と判断した場合、対面での診察をお願いすることがございます。
          </p>
        </div>
      </div>
    </div>
  )
}
