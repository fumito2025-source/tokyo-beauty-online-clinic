"use client"
import Link from "next/link"
import { useEffect, useRef } from "react"
import type { Metadata } from "next"

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("revealed"); observer.disconnect() } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return ref
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`reveal-block ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

function StepLine() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("flow-line-revealed"); observer.disconnect() } },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className="flow-line absolute left-5 top-12 w-px"
      style={{
        bottom: 0,
        background: "linear-gradient(to bottom, rgba(184,144,80,0.4) 0%, rgba(184,144,80,0.05) 100%)",
      }}
    />
  )
}

const STEPS = [
  {
    n: "01",
    en: "CONSULT",
    title: "LINEで無料相談",
    desc: "公式LINEを友だち追加後、「無料相談」を選択してください。担当スタッフがプログラムの内容・料金・適応について丁寧にご説明します。",
    note: "相談は無料です",
  },
  {
    n: "02",
    en: "COUNSELING",
    title: "カウンセリング面談",
    desc: "現在の生活習慣・目標・お悩みをじっくりヒアリング。プログラムの詳細とスケジュールをご確認いただきます。",
    note: "初回カウンセリングは無料",
  },
  {
    n: "03",
    en: "DIAGNOSIS",
    title: "医師の初回診察",
    desc: "LINEビデオ通話またはチャットにて、担当医師が現在の体重・健康状態・既往歴・服薬状況を確認します。診察のうえ、お一人お一人に合った治療方針と使用する薬を決定します。",
    note: "所要時間：約15〜30分",
  },
  {
    n: "04",
    en: "START",
    title: "プログラム開始・薬の配送",
    desc: "処方が確定後、薬を発送します（最短翌日）。開始日より週1回のカウンセラー面談がスタート。体調の変化や不安はいつでもLINEでご相談いただけます。",
    note: "薬代・配送料の追加費用なし",
  },
  {
    n: "05",
    en: "FOLLOW",
    title: "定期サポート・診察",
    desc: "2週間に1回、同じ担当医師が体重推移・体調変化・副作用の有無を確認。必要に応じて用量調整や処方変更を行います。毎日の記録は専用サイトで管理します。",
    note: "2週間に1回・担当医師が継続対応",
  },
  {
    n: "06",
    en: "GRADUATE",
    title: "継続・卒業",
    desc: "目標達成後の継続や、ご希望に応じた調整も担当医師と相談しながら進めます。卒業後も必要に応じてアフターケアプログラムをご用意しています。",
    note: "1ヶ月単位で継続可能",
  },
]

const DAILY = [
  { time: "朝", action: "体重を専用サイトに記録" },
  { time: "食事", action: "食事内容を専用サイトに記録（写真可）" },
  { time: "薬", action: "処方薬の服用を記録" },
  { time: "いつでも", action: "体調・不安はLINEで相談" },
  { time: "週1回", action: "カウンセラーとオンライン面談（30分）" },
  { time: "2週に1回", action: "担当医師とオンライン診察（15〜30分）" },
]

export default function FlowPage() {
  return (
    <div className="min-h-screen bg-clinic-black">
      {/* ─── PAGE HEADER ─── */}
      <div className="border-b border-clinic-gray-light pt-28 pb-16">
        <Reveal className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.5em] text-clinic-gold mb-4 font-sans">HOW IT WORKS</p>
          <div className="w-8 h-px bg-clinic-gold mx-auto mb-6" />
          <h1 className="font-serif font-light text-3xl md:text-4xl tracking-[0.2em] text-clinic-offwhite">
            プログラムの流れ
          </h1>
          <p className="text-xs text-clinic-offwhite/50 mt-6 tracking-wider leading-relaxed">
            LINEで相談してから、わずか数日でプログラムが始まります。
          </p>
        </Reveal>
      </div>

      {/* ─── STEPS ─── */}
      <div className="max-w-2xl mx-auto px-6 py-20 md:py-28">
        <div className="space-y-0">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 80} className="flex gap-8 pb-14 last:pb-0 relative">
              {i < STEPS.length - 1 && <StepLine />}
              {/* Number circle */}
              <div className="flex-shrink-0 relative z-10">
                <div className="w-10 h-10 border border-clinic-gold/50 bg-clinic-black flex items-center justify-center">
                  <span className="font-serif text-[11px] text-clinic-gold tracking-wider">{s.n}</span>
                </div>
              </div>
              {/* Content */}
              <div className="flex-1 pt-1">
                <p className="text-[9px] tracking-[0.4em] text-clinic-gold/60 font-sans mb-2">{s.en}</p>
                <h3 className="font-serif text-base text-clinic-offwhite tracking-[0.15em] mb-3">{s.title}</h3>
                <p className="text-sm text-clinic-offwhite/70 leading-relaxed tracking-wide mb-3">{s.desc}</p>
                <span className="inline-block text-[10px] text-clinic-gold/60 tracking-[0.2em] font-sans border-b border-clinic-gold/20 pb-px">{s.note}</span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ─── DAILY ROUTINE ─── */}
        <div className="mt-20 border-t border-clinic-gray-light pt-16">
          <Reveal className="text-center mb-10">
            <p className="text-[10px] tracking-[0.5em] text-clinic-gold mb-4 font-sans">DAILY ROUTINE</p>
            <div className="w-6 h-px bg-clinic-gold mx-auto mb-8" />
            <h2 className="font-serif font-light text-xl md:text-2xl tracking-[0.2em] text-clinic-offwhite">
              プログラム中のサポート
            </h2>
          </Reveal>
          <div className="space-y-px bg-clinic-gray-light">
            {DAILY.map((d, i) => (
              <Reveal key={d.time} delay={i * 60}>
                <div className="flex items-center gap-6 px-8 py-5 bg-clinic-gray-mid">
                  <span className="text-xs text-clinic-gold tracking-[0.3em] font-sans w-20 flex-shrink-0">{d.time}</span>
                  <span className="text-sm text-clinic-offwhite/80 tracking-wide">{d.action}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ─── CTA ─── */}
        <Reveal className="text-center mt-16">
          <p className="text-xs text-clinic-offwhite/60 tracking-wider mb-8 leading-relaxed">
            まずはLINEでお気軽にご相談ください。<br />
            初回カウンセリングは無料です。
          </p>
          <Link
            href="https://line.me/R/ti/p/@555glibw"
            className="inline-flex items-center gap-3 text-white px-12 py-4 text-xs tracking-[0.2em] font-sans hover:opacity-85 transition-opacity"
            style={{ backgroundColor: "#06C755" }}
          >
            LINEで無料相談 →
          </Link>
        </Reveal>
      </div>
    </div>
  )
}
