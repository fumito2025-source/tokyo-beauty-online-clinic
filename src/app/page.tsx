"use client"
import Link from "next/link"
import { useEffect, useRef } from "react"

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("revealed"); observer.disconnect() } },
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
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

const TREATMENTS = [
  { id: "aga",         label: "AGA治療",       en: "AGA TREATMENT", href: "/medication#aga" },
  { id: "whitening",   label: "美白・肝斑",     en: "WHITENING",     href: "/medication#whitening" },
  { id: "acne",        label: "ニキビ治療",     en: "ACNE",          href: "/medication#acne" },
  { id: "obesity",     label: "肥満・ダイエット", en: "DIET",         href: "/medication#obesity" },
  { id: "moisturizing",label: "保湿・外用薬",   en: "SKIN CARE",     href: "/medication#moisturizing" },
]

const REASONS = [
  { n: "#01", title: "医師が直接担当\nAIへの丸投げなし", body: "全工程を日本の医師免許を持つ医師が担当します。看護師・AIへの転送は一切行いません。" },
  { n: "#02", title: "LINEだけで\n全て完結する",       body: "予約・問診・診察・処方・フォローアップまで、LINEアプリひとつで完全に完結します。" },
  { n: "#03", title: "プライバシーへの\n徹底した配慮", body: "個人情報は暗号化して厳重に管理。薬の配送もプライバシーに配慮した梱包でお届けします。" },
  { n: "#04", title: "初診から\n再診まで対応",         body: "初めての方も、他院からの転院も歓迎。定期処方にも対応し、継続的なケアを提供します。" },
  { n: "#05", title: "全国どこからでも\nご利用可能",   body: "完全オンラインのため通院不要。忙しい毎日を送る方でも、生活を変えずに受診できます。" },
  { n: "#06", title: "迅速な処方と\n最短翌日発送",     body: "診察後は最短翌営業日に発送。経過フォローもLINEで行い、副作用の相談も随時対応します。" },
]

export default function HomePage() {
  return (
    <>
      <style>{`
        .reveal-block {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1);
        }
        .reveal-block.revealed { opacity: 1; transform: translateY(0); }

        /* Hero arch shapes */
        .arch {
          border-radius: 200px 200px 0 0;
          position: relative; overflow: hidden;
        }
        .arch::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(255,255,255,.06) 0%, rgba(0,0,0,.15) 100%);
        }
        .arch-stripe {
          position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
          width: 3px; height: 55%; background: #B89050; opacity: .55; z-index: 1;
        }

        /* treatment card hover */
        .t-card:hover .t-label { color: #B89050; }
        .t-card:hover .t-arrow { opacity: 1; color: #B89050; }
      `}</style>

      {/* ─── HERO ─────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-end overflow-hidden">
        {/* warm beige gradient background */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(145deg, #D8CEBC 0%, #C9BFA8 35%, #B8AE98 65%, #A89E88 100%)"
        }} />

        {/* arch decorations */}
        <div className="absolute inset-0 flex items-start justify-center gap-5 pt-14 pointer-events-none hidden md:flex">
          <div className="arch w-36 h-96 mt-20" style={{background:"linear-gradient(180deg,#C8BEA8,#B0A692)"}}>
            <div className="arch-stripe" />
          </div>
          <div className="arch w-36 h-[28rem]" style={{background:"linear-gradient(180deg,#CEC4B0,#B8AE98)"}}>
            <div className="arch-stripe" />
          </div>
          <div className="arch w-36 h-80 mt-28" style={{background:"linear-gradient(180deg,#C4BAA4,#ACA28C)"}}>
            <div className="arch-stripe" />
          </div>
        </div>

        {/* overlay */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to top, rgba(42,37,32,.6) 0%, rgba(42,37,32,.12) 55%, transparent 100%)"
        }} />

        {/* content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-20">
          <p className="text-[10px] tracking-[0.55em] text-white/55 mb-5 font-sans">
            TOKYO BEAUTY ONLINE CLINIC
          </p>
          <h1 className="font-serif font-extralight text-5xl md:text-7xl leading-tight tracking-[0.07em] text-white mb-4">
            私らしく、<br />美しくいる。
          </h1>
          <span className="block font-serif italic text-sm tracking-[0.22em] text-white/45 mb-8">
            My health, my beauty, my life.
          </span>
          <p className="text-sm text-white/65 leading-loose tracking-wide mb-10 max-w-sm">
            オンラインで完結する自由診療クリニック。<br />
            スマートフォン一つで、医師が直接診察・処方いたします。
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link
              href="/reservation"
              className="inline-flex items-center gap-3 bg-clinic-gold text-white px-8 py-3.5 text-xs tracking-[0.25em] font-sans hover:opacity-85 transition-opacity"
            >
              無料で予約する
            </Link>
            <a
              href="https://line.me/R/ti/p/@555glibw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 border border-white/30 bg-white/10 text-white px-6 py-3.5 text-xs tracking-[0.2em] font-sans hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              <svg viewBox="0 0 14 14" fill="currentColor" className="w-3.5 h-3.5"><path d="M7 1C3.69 1 1 3.29 1 6.11c0 1.55.82 2.94 2.1 3.9V12L5 10.97c.63.18 1.3.27 2 .27 3.31 0 6-2.29 6-5.11S10.31 1 7 1z"/></svg>
              LINEで友だち追加
            </a>
          </div>
        </div>
      </section>

      {/* ─── MISSION ─────────────────────────────────── */}
      <section className="bg-clinic-gray-mid py-24 md:py-32 border-b border-clinic-gray-light">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid md:grid-cols-[1fr_1.5fr] gap-16 md:gap-24 items-start">
            <Reveal>
              <p className="text-[10px] tracking-[0.55em] text-clinic-gold mb-2 font-sans">OUR MISSION</p>
              <div className="w-6 h-px bg-clinic-gold mt-4 mb-6" />
              <p className="text-[10px] tracking-[0.35em] text-clinic-offwhite/40 font-sans">当院について</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-serif font-light text-3xl md:text-4xl tracking-[0.1em] text-clinic-offwhite leading-snug mb-7">
                判断に価値を置く、<br />美容医療。
              </h2>
              <p className="text-sm text-clinic-offwhite/55 leading-loose tracking-wide mb-5">
                オンライン診療は便利なだけではありません。<br />
                医師が直接あなたと向き合い、今どうするかだけでなく、<br />
                これからどう在りたいかという視点でご提案いたします。
              </p>
              <p className="text-sm text-clinic-offwhite/55 leading-loose tracking-wide mb-8">
                LINEで予約・問診・処方・フォローアップまで完全に完結。<br />
                通院不要で、あなたのペースに合わせた医療を届けます。
              </p>
              <Link
                href="/flow"
                className="inline-flex items-center gap-3 text-xs tracking-[0.3em] text-clinic-gold font-sans hover:gap-4 transition-all border-b border-clinic-gold/30 hover:border-clinic-gold pb-0.5"
              >
                診療の流れを見る →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── PICK UP MENU ────────────────────────────── */}
      <section className="bg-clinic-black py-24 md:py-32 border-b border-clinic-gray-light">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <Reveal className="mb-12">
            <p className="text-[10px] tracking-[0.55em] text-clinic-gold mb-2 font-sans">PICK UP MENU</p>
            <div className="w-6 h-px bg-clinic-gold mt-4" />
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-clinic-gray-light">
            {TREATMENTS.map((t, i) => (
              <Reveal key={t.id} delay={i * 60}>
                <Link
                  href={t.href}
                  className="t-card group block bg-clinic-black hover:bg-clinic-gray-mid transition-colors"
                >
                  {/* placeholder image */}
                  <div
                    className="aspect-[3/4] relative overflow-hidden"
                    style={{background: `linear-gradient(160deg, hsl(${35 + i*5},20%,${72 - i*3}%), hsl(${30 + i*5},18%,${60 - i*3}%))`}}
                  >
                    {/* arch ornament */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-4/5 rounded-t-full bg-white/10" />
                  </div>
                  <div className="p-5">
                    <p className="text-[9px] tracking-[0.4em] text-clinic-gold/70 mb-1.5 font-sans">{t.en}</p>
                    <p className="t-label font-serif font-light text-sm tracking-[0.15em] text-clinic-offwhite transition-colors">
                      {t.label}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8 text-right">
            <Link href="/medication" className="text-[10px] tracking-[0.3em] text-clinic-gold/60 hover:text-clinic-gold font-sans transition-colors">
              薬の説明を見る →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ─── REASON ──────────────────────────────────── */}
      <section className="bg-clinic-gray-dark py-24 md:py-32 border-b border-clinic-gray-light">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <Reveal className="mb-14">
            <p className="text-[10px] tracking-[0.55em] text-clinic-gold mb-2 font-sans">REASON</p>
            <div className="w-6 h-px bg-clinic-gold mt-4 mb-4" />
            <p className="text-[10px] tracking-[0.35em] text-clinic-offwhite/40 font-sans">選ばれる理由</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-clinic-gray-light">
            {REASONS.map((r, i) => (
              <Reveal key={r.n} delay={i * 80}>
                <div className="bg-clinic-gray-mid p-10 h-full">
                  <span className="block font-serif italic text-[10px] tracking-[0.4em] text-clinic-gold mb-5">{r.n}</span>
                  <h3 className="font-serif font-light text-base tracking-[0.16em] text-clinic-offwhite leading-snug mb-4 whitespace-pre-line">
                    {r.title}
                  </h3>
                  <p className="text-xs text-clinic-offwhite/50 leading-loose tracking-wide">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LINE COMPLETE ────────────────────────────── */}
      <section className="bg-clinic-gray-mid py-24 md:py-32 border-b border-clinic-gray-light">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            <Reveal>
              <p className="text-[10px] tracking-[0.55em] text-clinic-gold mb-2 font-sans">LINE COMPLETE</p>
              <div className="w-6 h-px bg-clinic-gold mt-4 mb-8" />
              <h2 className="font-serif font-extralight text-4xl md:text-5xl tracking-[0.08em] text-clinic-offwhite leading-tight mb-6">
                全て、<br />LINEで<br />完結します。
              </h2>
              <p className="text-sm text-clinic-offwhite/55 leading-loose tracking-wide mb-8">
                アプリのインストールも会員登録も不要。<br />
                友だち追加だけで、今日から始められます。
              </p>
              <div className="grid grid-cols-2 gap-3 mb-10">
                {["予約・問診票", "医師との相談", "処方・配送", "経過フォロー", "薬の説明", "副作用の相談"].map(f => (
                  <div key={f} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-clinic-gold flex-shrink-0" />
                    <span className="text-xs text-clinic-offwhite/60 tracking-wide">{f}</span>
                  </div>
                ))}
              </div>
              <a
                href="https://line.me/R/ti/p/@555glibw"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#06C755] text-white px-7 py-3.5 text-xs tracking-[0.2em] font-sans hover:opacity-85 transition-opacity"
              >
                <svg viewBox="0 0 14 14" fill="currentColor" className="w-3.5 h-3.5"><path d="M7 1C3.69 1 1 3.29 1 6.11c0 1.55.82 2.94 2.1 3.9V12L5 10.97c.63.18 1.3.27 2 .27 3.31 0 6-2.29 6-5.11S10.31 1 7 1z"/></svg>
                友だち追加はこちら
              </a>
            </Reveal>

            {/* Phone mockup */}
            <Reveal delay={100}>
              <div className="flex justify-center">
                <div className="w-64 border-2 border-clinic-gray-light rounded-3xl overflow-hidden shadow-2xl">
                  {/* chat header */}
                  <div className="bg-white px-4 py-3 flex items-center gap-3 border-b border-clinic-gray-light">
                    <div className="w-8 h-8 rounded-full bg-clinic-gold flex items-center justify-center flex-shrink-0">
                      <svg viewBox="0 0 14 14" fill="white" className="w-4 h-4"><path d="M7 1C3.69 1 1 3.29 1 6.11c0 1.55.82 2.94 2.1 3.9V12L5 10.97c.63.18 1.3.27 2 .27 3.31 0 6-2.29 6-5.11S10.31 1 7 1z"/></svg>
                    </div>
                    <span className="text-xs text-clinic-offwhite tracking-wide">東京美容オンラインクリニック</span>
                  </div>
                  {/* chat body */}
                  <div className="bg-[#E5DDD5] px-3 py-4 min-h-28">
                    <div className="bg-white rounded-tr-xl rounded-b-xl px-3 py-2.5 max-w-[80%] shadow-sm">
                      <p className="text-xs text-gray-700 leading-relaxed">ようこそ。下のメニューからご利用ください。</p>
                      <p className="text-[9px] text-gray-400 mt-1">16:42</p>
                    </div>
                  </div>
                  {/* rich menu */}
                  <div className="grid grid-cols-3 bg-clinic-gray-mid border-t border-clinic-gray-light">
                    {[
                      { label: "ご予約", gold: true, icon: <path d="M8 2H6a2 2 0 00-2 2v14a2 2 0 002 2h8a2 2 0 002-2V8z"/>, icon2: <polyline points="14 2 14 8 20 8"/> },
                      { label: "プラン・料金", gold: false },
                      { label: "薬の説明", gold: false },
                      { label: "経過・相談", gold: false },
                      { label: "よくある質問", gold: false },
                      { label: "お問い合わせ", gold: false },
                    ].map((cell, i) => (
                      <div
                        key={i}
                        className={`flex flex-col items-center justify-center gap-1.5 py-3 border-r border-b border-clinic-gray-light ${cell.gold ? "bg-clinic-gold" : ""}`}
                        style={{borderRight: (i+1)%3===0 ? "none" : undefined, borderBottom: i>=3 ? "none" : undefined}}
                      >
                        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5"
                          stroke={cell.gold ? "#fff" : "#B89050"} strokeWidth="1.2" strokeLinecap="round">
                          {i===0 && <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>}
                          {i===1 && <><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></>}
                          {i===2 && <><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></>}
                          {i===3 && <><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></>}
                          {i===4 && <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>}
                          {i===5 && <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>}
                        </svg>
                        <span className={`text-[8px] leading-tight text-center ${cell.gold ? "text-white" : "text-clinic-offwhite/70"}`}>
                          {cell.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ────────────────────────────── */}
      <section className="bg-clinic-black py-24 md:py-32 border-b border-clinic-gray-light">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <Reveal className="mb-14">
            <p className="text-[10px] tracking-[0.55em] text-clinic-gold mb-2 font-sans">HOW IT WORKS</p>
            <div className="w-6 h-px bg-clinic-gold mt-4 mb-4" />
            <p className="text-[10px] tracking-[0.35em] text-clinic-offwhite/40 font-sans">ご利用の流れ</p>
          </Reveal>
          <div>
            {[
              { n: "01", title: "LINE友だち追加",         body: "公式LINEを追加するだけ。アプリ・会員登録不要で今すぐ始められます。" },
              { n: "02", title: "予約・問診票の記入",       body: "希望日時を選び、症状や現在の服薬状況をご入力ください。約5分で完了します。" },
              { n: "03", title: "医師によるオンライン診察",  body: "LINEチャットにて医師が直接診察・処方を判断いたします。写真や症状の詳細もここで共有できます。" },
              { n: "04", title: "お薬が届く",              body: "処方確定後、最短翌営業日に発送。プライバシーに配慮した梱包でご自宅にお届けします。" },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 60}>
                <div className={`grid grid-cols-[64px_1fr] gap-6 md:gap-10 py-8 ${i < 3 ? "border-b border-clinic-gray-light" : ""}`}>
                  <div className="font-serif italic text-3xl text-clinic-gold/40 tracking-tight pt-1">{s.n}</div>
                  <div>
                    <h3 className="font-serif font-light text-base tracking-[0.16em] text-clinic-offwhite mb-2">{s.title}</h3>
                    <p className="text-xs text-clinic-offwhite/50 leading-loose tracking-wide">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────── */}
      <section className="bg-clinic-gray-dark py-28 md:py-36 text-center">
        <Reveal className="max-w-2xl mx-auto px-6">
          <h2 className="font-serif font-extralight text-4xl md:text-5xl tracking-[0.1em] text-clinic-offwhite leading-snug mb-5">
            まずは、<br />ご予約から。
          </h2>
          <p className="text-sm text-clinic-offwhite/50 leading-loose tracking-wide mb-12">
            初診・再診どちらも対応。<br />
            気になることはLINEでお気軽にご相談ください。
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/reservation"
              className="inline-flex items-center gap-3 bg-clinic-gold text-white px-10 py-4 text-xs tracking-[0.25em] font-sans hover:opacity-85 transition-opacity"
            >
              予約・問診票はこちら →
            </Link>
            <a
              href="https://line.me/R/ti/p/@555glibw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#06C755] text-white px-7 py-4 text-xs tracking-[0.2em] font-sans hover:opacity-85 transition-opacity"
            >
              <svg viewBox="0 0 14 14" fill="currentColor" className="w-3.5 h-3.5"><path d="M7 1C3.69 1 1 3.29 1 6.11c0 1.55.82 2.94 2.1 3.9V12L5 10.97c.63.18 1.3.27 2 .27 3.31 0 6-2.29 6-5.11S10.31 1 7 1z"/></svg>
              LINEで友だち追加
            </a>
          </div>
          <p className="mt-14 text-[10px] text-clinic-offwhite/30 tracking-wide leading-loose">
            ※ 本サービスは自由診療のみです。健康保険は適用されません。<br />
            ※ 処方は医師の診察・判断のもとに行います。
          </p>
        </Reveal>
      </section>
    </>
  )
}
