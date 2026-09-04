import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | 東京美容オンラインクリニック",
}

const rows = [
  { label: "販売事業者名", value: "林 清文" },
  { label: "所在地", value: "愛知県名古屋市中川区愛知町2-22" },
  { label: "電話番号", value: "●●●-●●●●-●●●●（追記予定）" },
  { label: "メールアドレス", value: "tokyobeautyonlineclinic@gmail.com" },
  { label: "販売価格", value: "各診療・プランページに記載の価格（税込）" },
  { label: "診療費・薬代以外の費用", value: "配送料：●●円（追記予定）" },
  { label: "お支払い方法", value: "クレジットカード（VISA・Mastercard・JCB・AMEX）※詳細は追記予定" },
  { label: "お支払い時期", value: "ご注文確定時にお支払いが確定します" },
  { label: "薬の引渡し時期", value: "処方確定後、最短翌営業日に発送。通常2〜4営業日でお届けします" },
  {
    label: "返品・キャンセルについて",
    value:
      "医薬品という性質上、お客様都合による返品・返金はお受けできません。ただし、当クリニックの過失による場合はこの限りではありませんので、到着後7日以内にご連絡ください。",
  },
  { label: "動作環境", value: "LINE最新バージョン、各種ブラウザ（Chrome・Safari・Firefox等）最新版" },
]

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-clinic-black text-clinic-offwhite">
      <section className="relative py-24 border-b border-clinic-gold/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_800px_400px_at_50%_0%,rgba(201,168,76,0.06),transparent)]" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.4em] text-clinic-gold/60 mb-6 font-sans uppercase">Legal</p>
          <h1 className="font-serif font-light text-3xl tracking-[0.1em] mb-4">
            特定商取引法に基づく表記
          </h1>
          <div className="w-12 h-px bg-clinic-gold/40 mx-auto" />
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="border border-clinic-gold/10 divide-y divide-clinic-gold/10">
          {rows.map((row) => (
            <div key={row.label} className="flex flex-col sm:flex-row">
              <dt className="w-full sm:w-48 flex-shrink-0 px-6 py-5 text-xs tracking-wider text-clinic-gold/70 bg-clinic-gray-dark/30 font-sans">
                {row.label}
              </dt>
              <dd className="px-6 py-5 text-sm text-clinic-offwhite/70 leading-relaxed tracking-wide">
                {row.value}
              </dd>
            </div>
          ))}
        </div>

        <p className="mt-10 text-xs text-clinic-offwhite/30 leading-relaxed tracking-wide">
          ※ 「●●●」と記載されている項目は準備中です。確定次第更新いたします。<br />
          ※ 本表記は予告なく変更される場合があります。
        </p>
      </section>
    </main>
  )
}
