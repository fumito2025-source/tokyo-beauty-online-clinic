import type { Metadata } from "next"
import { Noto_Serif_JP, Noto_Sans_JP } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

const notoSerif = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
  display: "swap",
})

const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "東京美容オンラインクリニック",
    template: "%s | 東京美容オンラインクリニック",
  },
  description: "自由診療専門のオンラインクリニック。美白・AGA・美容サプリなど、医師が直接処方・アドバイス。24時間お申し込み受付中。",
  keywords: ["オンラインクリニック", "美容外来", "処方薬", "自由診療", "AGA", "美白", "東京"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={`${notoSerif.variable} ${notoSans.variable}`}>
      <body className="font-serif bg-clinic-black text-clinic-offwhite antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
