"use client"
import Link from "next/link"
import { useState } from "react"

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const nav = [
    { href: "/flow", label: "診療の流れ" },
    { href: "/medication", label: "薬の説明" },
    { href: "/faq", label: "よくある質問" },
    { href: "/contact", label: "お問い合わせ" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-clinic-black/95 backdrop-blur-sm border-b border-clinic-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-18 py-4">
          {/* ロゴ */}
          <Link href="/" className="flex-shrink-0">
            <span className="font-serif text-base md:text-lg text-clinic-gold tracking-[0.15em]">
              東京美容オンラインクリニック
            </span>
          </Link>

          {/* デスクトップナビ */}
          <nav className="hidden md:flex items-center gap-8">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs text-clinic-offwhite/55 hover:text-clinic-offwhite tracking-widest transition-colors duration-300 font-sans"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* ご予約ボタン + モバイルメニュー */}
          <div className="flex items-center gap-4">
            <a
              href="https://line.me/R/ti/p/@555glibw"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 text-[#06C755]/70 hover:text-[#06C755] transition-colors text-xs tracking-widest font-sans"
            >
              <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5"><path d="M8 1.5C4.41 1.5 1.5 4.02 1.5 7.13c0 1.77.94 3.35 2.4 4.43V14l2.13-1.17c.61.17 1.25.3 1.97.3 3.59 0 6.5-2.52 6.5-5.63s-2.91-5.5-6.5-5.5z"/></svg>
              LINE相談
            </a>
            <Link
              href="/reservation"
              className="hidden md:inline-flex items-center border border-clinic-gold text-clinic-gold hover:bg-clinic-gold hover:text-clinic-black transition-colors px-5 py-2 text-xs tracking-[0.25em] font-sans"
            >
              ご予約
            </Link>

            <button
              className="md:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="メニュー"
            >
              <svg className="w-5 h-5 text-clinic-offwhite/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* モバイルメニュー */}
      {menuOpen && (
        <div className="md:hidden border-t border-clinic-gold/20 bg-clinic-black">
          <nav className="px-6 py-6 space-y-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-xs text-clinic-offwhite/60 py-3 border-b border-clinic-gold/10 tracking-widest hover:text-clinic-gold transition-colors font-sans"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4">
              <Link
                href="/reservation"
                className="block text-center border border-clinic-gold text-clinic-gold py-3 text-xs tracking-[0.3em] font-sans hover:bg-clinic-gold hover:text-clinic-black transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                ご予約
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
