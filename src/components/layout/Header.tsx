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
    <header className="sticky top-0 z-50 bg-clinic-black/95 backdrop-blur-sm border-b border-clinic-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ */}
          <Link href="/" className="flex-shrink-0">
            <span className="font-serif text-sm tracking-[0.22em] text-clinic-offwhite">
              TOKYO BEAUTY ONLINE CLINIC
            </span>
          </Link>

          {/* デスクトップナビ */}
          <nav className="hidden md:flex items-center gap-8">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[11px] text-clinic-offwhite/55 hover:text-clinic-gold tracking-[0.2em] transition-colors duration-300 font-sans"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* ご予約ボタン + モバイルメニュー */}
          <div className="flex items-center gap-3">
            <a
              href="https://line.me/R/ti/p/@555glibw"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 border border-[#06C755]/60 text-[#06C755] hover:bg-[#06C755] hover:text-white transition-colors text-[10px] tracking-[0.18em] font-sans px-3 py-1.5"
            >
              <svg viewBox="0 0 14 14" fill="currentColor" className="w-3 h-3"><path d="M7 1C3.69 1 1 3.29 1 6.11c0 1.55.82 2.94 2.1 3.9V12L5 10.97c.63.18 1.3.27 2 .27 3.31 0 6-2.29 6-5.11S10.31 1 7 1z"/></svg>
              LINEで相談
            </a>
            <Link
              href="/reservation"
              className="hidden md:inline-flex items-center bg-clinic-gold text-clinic-gray-mid hover:opacity-85 transition-opacity px-5 py-2 text-[10px] tracking-[0.22em] font-sans"
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
        <div className="md:hidden border-t border-clinic-gray-light bg-clinic-black">
          <nav className="px-6 py-6 space-y-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-xs text-clinic-offwhite/60 py-3 border-b border-clinic-gray-light tracking-widest hover:text-clinic-gold transition-colors font-sans"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 space-y-3">
              <a
                href="https://line.me/R/ti/p/@555glibw"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center border border-[#06C755]/60 text-[#06C755] py-3 text-xs tracking-[0.25em] font-sans"
                onClick={() => setMenuOpen(false)}
              >
                LINEで相談
              </a>
              <Link
                href="/reservation"
                className="block text-center bg-clinic-gold text-clinic-gray-mid py-3 text-xs tracking-[0.3em] font-sans"
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
