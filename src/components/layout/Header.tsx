"use client"
import Link from "next/link"
import { useState } from "react"
import { useCart } from "@/lib/store/cart"

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const itemCount = useCart((s) => s.itemCount())

  const nav = [
    { href: "/products", label: "商品・診療一覧" },
    { href: "/products?category=consultation", label: "オンライン診療" },
    { href: "/products?category=prescription", label: "処方薬" },
    { href: "/products?category=supplement", label: "サプリ・美容品" },
    { href: "/account", label: "マイページ" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-clinic-black border-b border-clinic-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* ロゴ */}
          <Link href="/" className="flex-shrink-0">
            <span className="font-serif text-lg text-clinic-gold tracking-[0.2em]">
              東京美容オンラインクリニック
            </span>
          </Link>

          {/* デスクトップナビ */}
          <nav className="hidden md:flex items-center gap-8">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs text-clinic-offwhite/70 hover:text-clinic-gold tracking-widest transition-colors duration-300 font-serif"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* カートアイコン */}
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative p-2">
              <svg className="w-5 h-5 text-clinic-offwhite/70 hover:text-clinic-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-clinic-gold text-clinic-black text-xs rounded-full w-4 h-4 flex items-center justify-center font-sans font-bold">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* モバイルメニューボタン */}
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
        <div className="md:hidden border-t border-clinic-gold/20 bg-clinic-gray-dark">
          <nav className="px-4 py-6 space-y-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-xs text-clinic-offwhite/70 py-2 border-b border-clinic-gold/10 tracking-widest hover:text-clinic-gold transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
