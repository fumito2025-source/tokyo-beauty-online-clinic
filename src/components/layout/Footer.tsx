import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-clinic-gray-dark border-t border-clinic-gold/20 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <p className="font-serif text-clinic-gold text-lg tracking-[0.2em] mb-2">
              東京美容オンラインクリニック
            </p>
            <div className="w-12 h-px bg-clinic-gold/50 mb-6" />
            <p className="text-sm leading-relaxed mb-4 text-clinic-offwhite/60">
              自由診療専門のオンラインクリニックです。<br />
              美白・美肌・AGA・健康管理など、<br />
              医師が丁寧にサポートします。
            </p>
            <p className="text-xs text-clinic-offwhite/30">
              ※本サービスは自由診療のみです。保険診療は行っておりません。
            </p>
          </div>

          <div>
            <p className="text-clinic-gold text-xs mb-6 tracking-[0.3em]">SERVICE</p>
            <ul className="space-y-3 text-sm">
              {[
                ["オンライン診療", "/products?category=consultation"],
                ["処方薬", "/products?category=prescription"],
                ["サプリメント", "/products?category=supplement"],
                ["美容品", "/products?category=goods"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-clinic-offwhite/50 hover:text-clinic-gold transition-colors tracking-wide text-xs">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-clinic-gold text-xs mb-6 tracking-[0.3em]">GUIDE</p>
            <ul className="space-y-3 text-sm">
              {[
                ["特定商取引法に基づく表記", "/legal/tokusho"],
                ["プライバシーポリシー", "/legal/privacy"],
                ["利用規約", "/legal/terms"],
                ["お問い合わせ", "/contact"],
                ["よくある質問", "/faq"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-clinic-offwhite/50 hover:text-clinic-gold transition-colors tracking-wide text-xs">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-clinic-gold/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-xs text-clinic-offwhite/25 tracking-wide">
            © {new Date().getFullYear()} 東京美容オンラインクリニック. All rights reserved.
          </p>
          <p className="text-xs text-clinic-offwhite/25 tracking-wide">
            医療機関コード: XXXXXXXX（都道府県知事許可）
          </p>
        </div>
      </div>
    </footer>
  )
}
