import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-clinic-offwhite border-t border-clinic-offwhite/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-12 pb-12 border-b border-white/10">
          <div>
            <p className="font-serif text-sm tracking-[0.28em] text-white/70 mb-3">
              TOKYO BEAUTY ONLINE CLINIC
            </p>
            <div className="w-8 h-px bg-clinic-gold/60 mb-5" />
            <p className="text-xs text-white/35 leading-loose tracking-wide max-w-xs">
              自由診療専門のオンラインクリニックです。<br />
              美白・AGA・ニキビ・ダイエットなど、<br />
              医師が丁寧にサポートします。
            </p>
            <p className="text-[10px] text-white/20 mt-4 tracking-wide">
              ※本サービスは自由診療のみです。保険診療は行っておりません。
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <p className="text-[10px] tracking-[0.35em] text-clinic-gold/70 mb-5 font-sans">MENU</p>
              <ul className="space-y-3">
                {[
                  ["診療の流れ", "/flow"],
                  ["薬の説明", "/medication"],
                  ["よくある質問", "/faq"],
                  ["お問い合わせ", "/contact"],
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="text-[11px] text-white/35 hover:text-clinic-gold transition-colors tracking-wide">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.35em] text-clinic-gold/70 mb-5 font-sans">LEGAL</p>
              <ul className="space-y-3">
                {[
                  ["特定商取引法に基づく表記", "/legal"],
                  ["プライバシーポリシー", "/privacy"],
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="text-[11px] text-white/35 hover:text-clinic-gold transition-colors tracking-wide">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
          <p className="text-[10px] text-white/20 tracking-wide">
            © {new Date().getFullYear()} Tokyo Beauty Online Clinic. All rights reserved.
          </p>
          <p className="text-[10px] text-white/20 tracking-wide">
            医療機関コード: XXXXXXXX（都道府県知事許可）
          </p>
        </div>
      </div>
    </footer>
  )
}
