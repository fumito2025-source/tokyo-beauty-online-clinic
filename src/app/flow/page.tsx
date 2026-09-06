import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "診療の流れ | 東京美容オンラインクリニック",
}

const steps = [
  {
    n: "01",
    title: "LINEで友だち追加",
    desc: "まずは公式LINEを友だち追加してください。追加後すぐにメニューが表示されます。アプリのインストールや会員登録は不要です。",
    note: "友だち追加は無料です",
  },
  {
    n: "02",
    title: "ご予約・問診票を記入",
    desc: "LINEメニューの「ご予約」からご希望の日時を選び、問診票をご記入ください。症状・お悩み・現在服用中のお薬などをご入力いただきます。",
    note: "所要時間：約5分",
  },
  {
    n: "03",
    title: "医師が診察・処方を判断",
    desc: "問診票の内容をもとに、医師がLINEチャットにて診察いたします。追加で写真や質問をお送りいただく場合もございます。",
    note: "受付時間内に順次ご対応",
  },
  {
    n: "04",
    title: "お支払い",
    desc: "処方が確定しましたら、LINEにお支払いリンクをお送りします。クレジットカードでお支払いいただけます。",
    note: "VISA・Mastercard・JCB・AMEX対応",
  },
  {
    n: "05",
    title: "薬が自宅に届く",
    desc: "お支払い確認後、最短翌営業日に発送いたします。プライバシーに配慮した梱包でご指定の住所にお届けします。",
    note: "通常2〜4営業日でお届け",
  },
  {
    n: "06",
    title: "経過フォロー",
    desc: "服用開始後の経過はLINEでご相談いただけます。写真や症状をそのまま送信してください。医師が確認し、ご返信いたします。",
    note: "再診・定期処方にも対応",
  },
]

const faqs = [
  { q: "初診でも利用できますか？", a: "はい、初診の方もご利用いただけます。問診票にご記入後、医師が診察いたします。" },
  { q: "保険は使えますか？", a: "当クリニックは自由診療のみとなります。健康保険は適用されません。" },
  { q: "診察はどのくらいかかりますか？", a: "受付時間内（10:00〜18:00）のご予約は原則当日中にご返信いたします。" },
]

export default function FlowPage() {
  return (
    <main className="min-h-screen bg-clinic-black text-clinic-offwhite">
      {/* Hero */}
      <section className="py-24 border-b border-clinic-gray-light">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.55em] text-clinic-gold mb-4 font-sans">HOW IT WORKS</p>
          <div className="w-6 h-px bg-clinic-gold mx-auto mb-8" />
          <h1 className="font-serif font-light text-4xl tracking-[0.15em] mb-5 text-clinic-offwhite">診療の流れ</h1>
          <p className="text-sm text-clinic-offwhite/45 tracking-wider leading-relaxed">
            友だち追加から薬のお届けまで、全てLINEで完結します
          </p>
        </div>
      </section>

      {/* ステップ */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="relative">
          {/* 縦ライン */}
          <div className="absolute left-[27px] top-8 bottom-8 w-px bg-gradient-to-b from-clinic-gold/40 via-clinic-gold/20 to-transparent hidden sm:block" />

          <div className="space-y-0">
            {steps.map((step, i) => (
              <div key={step.n} className="relative flex gap-6 sm:gap-10 pb-12 last:pb-0">
                {/* ステップ番号 */}
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-14 h-14 border border-clinic-gold/30 bg-clinic-black flex flex-col items-center justify-center">
                    <span className="text-[8px] tracking-widest text-clinic-gold/50 font-sans leading-none mb-0.5">STEP</span>
                    <span className="font-serif text-sm text-clinic-gold">{step.n}</span>
                  </div>
                </div>

                {/* コンテンツ */}
                <div className="flex-1 pt-3 pb-2">
                  <h2 className="font-serif font-light text-lg tracking-[0.15em] text-clinic-offwhite mb-3">
                    {step.title}
                  </h2>
                  <p className="text-sm text-clinic-offwhite/55 leading-relaxed tracking-wide mb-3">
                    {step.desc}
                  </p>
                  <span className="text-xs text-clinic-gold/50 tracking-wider border-l border-clinic-gold/25 pl-3">
                    {step.note}
                  </span>

                  {/* STEP01にLINEボタン */}
                  {i === 0 && (
                    <div className="mt-5">
                      <a
                        href="https://line.me/R/ti/p/@555glibw"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#06C755] text-white px-6 py-2.5 text-xs tracking-wider font-sans hover:opacity-90 transition-opacity"
                      >
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M10 2C5.58 2 2 5.13 2 9c0 2.21 1.17 4.18 3 5.54V17l2.67-1.47c.76.21 1.56.47 2.33.47 4.42 0 8-3.13 8-7s-3.58-7-8-7z"/></svg>
                        LINEで友だち追加
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* よくある質問（抜粋） */}
      <section className="border-t border-clinic-gray-light py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif font-light text-lg tracking-[0.2em] text-clinic-gold mb-8 text-center">よくある質問</h2>
          <div className="space-y-px mb-10">
            {faqs.map((item) => (
              <div key={item.q} className="border border-clinic-gray-light px-6 py-5 bg-clinic-gray-dark/50">
                <p className="text-sm text-clinic-offwhite/80 mb-2 flex gap-3">
                  <span className="text-clinic-gold/60 font-serif flex-shrink-0">Q</span>{item.q}
                </p>
                <p className="text-sm text-clinic-offwhite/45 flex gap-3">
                  <span className="text-clinic-gold font-serif flex-shrink-0">A</span>{item.a}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/faq" className="text-xs text-clinic-gold/60 hover:text-clinic-gold tracking-[0.3em] border-b border-clinic-gold/20 hover:border-clinic-gold pb-1 transition-colors">
              よくある質問をもっと見る
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-clinic-gray-light py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm text-clinic-offwhite/40 tracking-wider mb-8">まずはLINEで友だち追加してください</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://line.me/R/ti/p/@555glibw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#06C755] text-white px-8 py-3 text-sm tracking-wider font-sans hover:opacity-90 transition-opacity"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M10 2C5.58 2 2 5.13 2 9c0 2.21 1.17 4.18 3 5.54V17l2.67-1.47c.76.21 1.56.47 2.33.47 4.42 0 8-3.13 8-7s-3.58-7-8-7z"/></svg>
              LINEで友だち追加
            </a>
            <Link
              href="/reservation"
              className="inline-flex items-center justify-center border border-clinic-gold text-clinic-gold px-8 py-3 text-sm tracking-wider font-sans hover:bg-clinic-gold hover:text-clinic-black transition-colors"
            >
              予約・問診票はこちら
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
