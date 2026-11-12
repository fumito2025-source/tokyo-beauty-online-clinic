import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "お問い合わせ | 東京美容オンラインクリニック",
  description: "東京美容オンラインクリニックへのお問い合わせはLINEにて承っております。",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-clinic-black flex items-center justify-center">
      <div className="max-w-xl mx-auto px-6 py-28 text-center">
        <p className="text-[10px] tracking-[0.5em] text-clinic-gold mb-4 font-sans">CONTACT</p>
        <div className="w-8 h-px bg-clinic-gold mx-auto mb-8" />
        <h1 className="font-serif font-light text-2xl md:text-3xl tracking-[0.2em] text-clinic-offwhite mb-6">
          お問い合わせ
        </h1>
        <p className="text-sm text-clinic-offwhite/65 leading-relaxed tracking-wide mb-12">
          ご質問・ご相談はすべてLINEにて承っております。<br />
          お気軽にメッセージをお送りください。
        </p>
        <a
          href="https://line.me/R/ti/p/@555glibw"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 text-white px-12 py-4 text-xs tracking-[0.2em] font-sans hover:opacity-85 transition-opacity"
          style={{ backgroundColor: "#06C755" }}
        >
          LINEで相談する →
        </a>
      </div>
    </div>
  )
}
