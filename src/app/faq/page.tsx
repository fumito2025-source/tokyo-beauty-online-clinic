import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "よくある質問 | 東京美容オンラインクリニック",
  description: "東京美容オンラインクリニックへのよくある質問をまとめました。",
}

const faqs = [
  {
    category: "診療について",
    items: [
      {
        q: "どのような診療を行っていますか？",
        a: "AGA治療、美白・肝斑治療、ニキビ治療、肥満・ダイエット治療、保湿・外用薬の処方など、美容・予防医療を中心としたオンライン診療を行っております。",
      },
      {
        q: "対応エリアはどこですか？",
        a: "全国どこからでもご利用いただけます。オンラインで完結するため、ご来院は不要です。",
      },
      {
        q: "診察はどのように行われますか？",
        a: "LINEを通じてご予約・問診・医師との相談を行います。写真や症状をお送りいただき、医師が確認後に処方いたします。",
      },
      {
        q: "担当医師について教えてください。",
        a: "日本の医師免許を持つ医師が診察を担当します。詳細はお問い合わせください。",
      },
      {
        q: "診察時間を教えてください。",
        a: "10:00〜18:00（土日祝除く）。LINEでのメッセージは24時間受け付けており、診察時間内に順次ご返信いたします。",
      },
    ],
  },
  {
    category: "予約・キャンセルについて",
    items: [
      {
        q: "予約方法を教えてください。",
        a: "LINEの公式アカウントから「ご予約」ボタンを押し、予約フォームよりお申し込みください。",
      },
      {
        q: "初診でも利用できますか？",
        a: "はい、初診の方もご利用いただけます。問診票にご記入いただいた後、医師が診察いたします。",
      },
      {
        q: "キャンセル・変更はできますか？",
        a: "予約日の前日までにLINEよりご連絡ください。当日キャンセルはキャンセル料が発生する場合があります。",
      },
    ],
  },
  {
    category: "費用・お支払いについて",
    items: [
      {
        q: "保険は適用されますか？",
        a: "当クリニックは自由診療となり、健康保険は適用されません。",
      },
      {
        q: "支払い方法を教えてください。",
        a: "クレジットカード（VISA・Mastercard・JCB・AMEX）がご利用いただけます。詳細は特定商取引法に基づく表記をご確認ください。",
      },
      {
        q: "料金はどのくらいですか？",
        a: "診療内容・処方薬によって異なります。各プランページをご確認いただくか、LINEよりお気軽にお問い合わせください。",
      },
    ],
  },
  {
    category: "薬・処方について",
    items: [
      {
        q: "処方までどのくらいかかりますか？",
        a: "診察後、最短翌営業日に発送いたします。お届けまで通常2〜4営業日かかります。",
      },
      {
        q: "薬はどこに届きますか？",
        a: "ご指定の住所に郵送いたします。プライバシーに配慮した梱包でお届けします。",
      },
      {
        q: "副作用が心配です。",
        a: "各薬剤の副作用については薬の説明ページをご確認ください。副作用が疑われる場合はすぐにLINEよりご連絡ください。医師が対応いたします。",
      },
      {
        q: "薬の返品・返金はできますか？",
        a: "医薬品という性質上、お客様都合による返品・返金はお受けできません。ただし、医師の判断により処方に問題があった場合はご相談ください。",
      },
      {
        q: "継続して処方してもらえますか？",
        a: "はい、定期処方に対応しています。LINEにて「再診希望」とお送りください。",
      },
    ],
  },
  {
    category: "LINEでのご相談について",
    items: [
      {
        q: "経過写真はどのように送ればいいですか？",
        a: "LINEの「経過・ご相談」ボタンを押した後、そのままチャットに写真を送信してください。医師が確認いたします。",
      },
      {
        q: "返信にどのくらいかかりますか？",
        a: "受付時間内（10:00〜18:00、土日祝除く）のメッセージは原則当日中にご返信いたします。",
      },
      {
        q: "個人情報は安全ですか？",
        a: "お客様の個人情報は個人情報保護法に基づき厳重に管理いたします。詳細はプライバシーポリシーをご確認ください。",
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-clinic-black text-clinic-offwhite">
      {/* Hero */}
      <section className="relative py-24 border-b border-clinic-gold/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_800px_400px_at_50%_0%,rgba(201,168,76,0.06),transparent)]" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.4em] text-clinic-gold/60 mb-6 font-sans uppercase">FAQ</p>
          <h1 className="font-serif font-light text-4xl tracking-[0.15em] mb-4">よくある質問</h1>
          <div className="w-12 h-px bg-clinic-gold/40 mx-auto mb-6" />
          <p className="text-sm text-clinic-offwhite/50 tracking-wider leading-relaxed">
            ご不明な点はLINEよりお気軽にお問い合わせください
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-20 space-y-16">
        {faqs.map((section) => (
          <div key={section.category}>
            <h2 className="font-serif font-light text-lg tracking-[0.2em] text-clinic-gold mb-8 flex items-center gap-4">
              <span className="w-8 h-px bg-clinic-gold/40 flex-shrink-0" />
              {section.category}
            </h2>
            <div className="space-y-px">
              {section.items.map((item, i) => (
                <details
                  key={i}
                  className="group border border-clinic-gold/10 bg-clinic-gray-dark/30 open:bg-clinic-gray-dark/50"
                >
                  <summary className="flex items-start justify-between gap-4 px-6 py-5 cursor-pointer list-none select-none">
                    <span className="flex items-start gap-3">
                      <span className="text-clinic-gold/60 font-serif text-sm mt-0.5 flex-shrink-0">Q</span>
                      <span className="text-sm tracking-wide text-clinic-offwhite/80 leading-relaxed group-open:text-clinic-offwhite">
                        {item.q}
                      </span>
                    </span>
                    <span className="text-clinic-gold/40 flex-shrink-0 mt-0.5 transition-transform group-open:rotate-45 text-lg leading-none">+</span>
                  </summary>
                  <div className="px-6 pb-6 flex gap-3">
                    <span className="text-clinic-gold font-serif text-sm flex-shrink-0">A</span>
                    <p className="text-sm text-clinic-offwhite/60 leading-relaxed tracking-wide">{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="border-t border-clinic-gold/10 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm text-clinic-offwhite/50 tracking-wider mb-8">
            解決しなかった場合はLINEよりご相談ください
          </p>
          <a
            href="https://line.me/R/ti/p/@555glibw"
            className="inline-flex items-center gap-3 border border-clinic-gold/40 text-clinic-gold hover:bg-clinic-gold/10 transition-colors px-8 py-3 text-sm tracking-[0.2em] font-sans"
          >
            LINEで相談する
          </a>
        </div>
      </section>
    </main>
  )
}
