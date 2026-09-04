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
      { threshold: 0.15 }
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
  {
    id: "aga",
    label: "AGA治療",
    en: "HAIR LOSS",
    desc: "フィナステリド・デュタステリドによる男性型脱毛症の進行抑制",
    href: "/medication#aga",
  },
  {
    id: "whitening",
    label: "美白・肝斑",
    en: "WHITENING",
    desc: "トラネキサム酸・ビタミンC・L-システインによるシミ・肝斑改善",
    href: "/medication#whitening",
  },
  {
    id: "acne",
    label: "ニキビ治療",
    en: "ACNE",
    desc: "アダパレン・ベピオゲルによるコメド・炎症性ニキビへのアプローチ",
    href: "/medication#acne",
  },
  {
    id: "obesity",
    label: "肥満・ダイエット",
    en: "DIET",
    desc: "マンジャロ・リベルサスなどGLP-1製剤による医学的肥満治療",
    href: "/medication#obesity",
  },
  {
    id: "moisturizing",
    label: "保湿・外用薬",
    en: "SKIN CARE",
    desc: "ヒルドイド・ビマトプロストなど皮膚科医が処方する外用薬",
    href: "/medication#moisturizing",
  },
]

const STEPS = [
  { n: "01", title: "LINEから予約", desc: "友だち追加後、メニューの「ご予約」からお申し込みください。" },
  { n: "02", title: "問診票を記入", desc: "症状・お悩み・現在の服薬などをご入力いただきます。" },
  { n: "03", title: "医師が診察", desc: "LINEチャットにて医師が直接診察・処方を判断します。" },
  { n: "04", title: "薬が届く", desc: "処方確定後、最短翌日発送。プライバシー配慮の梱包でお届け。" },
]

export default function HomePage() {
  return (
    <>
      <style>{`
        .reveal-block {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.75s cubic-bezier(.22,1,.36,1), transform 0.75s cubic-bezier(.22,1,.36,1);
        }
        .reveal-block.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        .gold-text {
          background: linear-gradient(135deg, #C9A84C 0%, #E8D08A 50%, #C9A84C 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-glow {
          background: radial-gradient(ellipse 900px 600px at 50% 40%, rgba(201,168,76,0.10) 0%, transparent 70%);
        }
        .section-glow-left {
          background: radial-gradient(ellipse 600px 400px at 0% 50%, rgba(201,168,76,0.06) 0%, transparent 70%);
        }
        .section-glow-right {
          background: radial-gradient(ellipse 600px 400px at 100% 50%, rgba(201,168,76,0.06) 0%, transparent 70%);
        }
        .treatment-card:hover .treatment-num {
          color: #C9A84C;
          opacity: 1;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .ring-float { animation: float 6s ease-in-out infinite; }
        .ring-float-slow { animation: float 9s ease-in-out infinite reverse; }
      `}</style>

      {/* ─── HERO ─────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-clinic-black px-6">
        {/* 背景グラデーション */}
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-clinic-gold/8 ring-float" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full border border-clinic-gold/5 ring-float-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full border border-clinic-gold/3" />
        </div>

        {/* コーナー装飾 */}
        <div className="absolute top-8 left-8 w-10 h-10 border-t border-l border-clinic-gold/25 hidden md:block" />
        <div className="absolute top-8 right-8 w-10 h-10 border-t border-r border-clinic-gold/25 hidden md:block" />
        <div className="absolute bottom-8 left-8 w-10 h-10 border-b border-l border-clinic-gold/25 hidden md:block" />
        <div className="absolute bottom-8 right-8 w-10 h-10 border-b border-r border-clinic-gold/25 hidden md:block" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-[10px] md:text-xs tracking-[0.5em] text-clinic-gold/70 mb-6 font-sans animate-[fadeIn_1s_ease_0.2s_both]">
            TOKYO BEAUTY ONLINE CLINIC
          </p>
          <div className="w-8 h-px bg-clinic-gold/50 mx-auto mb-8" />

          <h1 className="font-serif font-light text-4xl md:text-6xl lg:text-7xl tracking-[0.12em] leading-tight mb-8">
            <span className="block text-clinic-offwhite mb-2">美しさと、</span>
            <span className="block gold-text">健康を。</span>
          </h1>

          <p className="text-clinic-offwhite/45 text-sm md:text-base leading-relaxed tracking-wider mb-12 max-w-xl mx-auto">
            自由診療専門のオンラインクリニック。<br />
            スマートフォン一つで、医師が直接診察・処方します。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/reservation"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-clinic-gold text-clinic-black px-8 py-4 text-sm tracking-[0.2em] font-sans hover:bg-clinic-gold-light transition-colors"
            >
              <span>無料で予約する</span>
              <span>→</span>
            </Link>
            <Link
              href="/medication"
              className="w-full sm:w-auto inline-flex items-center justify-center border border-clinic-gold/40 text-clinic-gold px-8 py-4 text-sm tracking-[0.2em] font-sans hover:bg-clinic-gold/10 transition-colors"
            >
              薬の説明を見る
            </Link>
          </div>
        </div>

        {/* スクロールヒント */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-[9px] tracking-[0.4em] text-clinic-offwhite font-sans">SCROLL</span>
          <div className="w-px h-10 bg-gradient-to-b from-clinic-gold to-transparent" />
        </div>
      </section>

      {/* ─── 3つの特徴 ─────────────────────────────────── */}
      <section className="py-28 md:py-36 bg-clinic-gray-dark relative overflow-hidden">
        <div className="absolute inset-0 section-glow-left pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <p className="text-[10px] tracking-[0.5em] text-clinic-gold/60 mb-4 font-sans">FEATURES</p>
            <div className="w-8 h-px bg-clinic-gold/40 mx-auto mb-6" />
            <h2 className="font-serif font-light text-2xl md:text-3xl tracking-[0.2em] text-clinic-offwhite">
              選ばれる理由
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-clinic-gold/10">
            {[
              {
                icon: (
                  <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8"><circle cx="20" cy="14" r="7" stroke="#C9A84C" strokeWidth="1"/><path d="M8 36c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="#C9A84C" strokeWidth="1"/></svg>
                ),
                title: "医師が直接対応",
                desc: "全工程を医師が担当。AIや看護師への丸投げは一切ありません。",
              },
              {
                icon: (
                  <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8"><rect x="8" y="6" width="24" height="28" rx="2" stroke="#C9A84C" strokeWidth="1"/><line x1="13" y1="14" x2="27" y2="14" stroke="#C9A84C" strokeWidth="1"/><line x1="13" y1="20" x2="27" y2="20" stroke="#C9A84C" strokeWidth="1"/><line x1="13" y1="26" x2="20" y2="26" stroke="#C9A84C" strokeWidth="1"/></svg>
                ),
                title: "完全オンライン完結",
                desc: "予約・診察・処方・配送まで全てスマートフォンで完結します。",
              },
              {
                icon: (
                  <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8"><path d="M20 6l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z" stroke="#C9A84C" strokeWidth="1"/></svg>
                ),
                title: "高級感ある処方体験",
                desc: "大手クリニックより丁寧に。プライバシー配慮の梱包でお届けします。",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 100} className="bg-clinic-gray-dark">
                <div className="text-center px-10 py-14">
                  <div className="flex justify-center mb-7 opacity-80">{item.icon}</div>
                  <div className="w-6 h-px bg-clinic-gold/30 mx-auto mb-5" />
                  <h3 className="font-serif font-light text-base tracking-[0.2em] text-clinic-offwhite mb-4">{item.title}</h3>
                  <p className="text-clinic-offwhite/40 text-xs leading-relaxed tracking-wide">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 診療カテゴリ ─────────────────────────────── */}
      <section className="py-28 md:py-36 bg-clinic-black relative overflow-hidden">
        <div className="absolute inset-0 section-glow-right pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <p className="text-[10px] tracking-[0.5em] text-clinic-gold/60 mb-4 font-sans">TREATMENTS</p>
            <div className="w-8 h-px bg-clinic-gold/40 mx-auto mb-6" />
            <h2 className="font-serif font-light text-2xl md:text-3xl tracking-[0.2em] text-clinic-offwhite">
              診療カテゴリ
            </h2>
          </Reveal>

          <div className="space-y-px">
            {TREATMENTS.map((t, i) => (
              <Reveal key={t.id} delay={i * 60}>
                <Link href={t.href} className="treatment-card group flex items-center gap-6 md:gap-10 px-6 md:px-10 py-7 bg-clinic-gray-dark/30 border border-clinic-gold/8 hover:border-clinic-gold/30 hover:bg-clinic-gray-dark/60 transition-all duration-300 block">
                  <span className="treatment-num font-serif text-2xl text-clinic-offwhite/10 tracking-wider transition-colors duration-300 w-8 flex-shrink-0 text-right">
                    {String(i+1).padStart(2,"0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] tracking-[0.4em] text-clinic-gold/50 mb-1 font-sans">{t.en}</p>
                    <h3 className="font-serif font-light text-base md:text-lg tracking-[0.15em] text-clinic-offwhite group-hover:text-clinic-gold transition-colors duration-300">
                      {t.label}
                    </h3>
                    <p className="text-xs text-clinic-offwhite/35 mt-1.5 tracking-wide leading-relaxed hidden md:block">{t.desc}</p>
                  </div>
                  <span className="text-clinic-gold/30 group-hover:text-clinic-gold transition-colors duration-300 text-lg flex-shrink-0">→</span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-12">
            <Link href="/medication" className="inline-flex items-center gap-2 text-xs text-clinic-gold/60 hover:text-clinic-gold tracking-[0.3em] transition-colors border-b border-clinic-gold/20 hover:border-clinic-gold pb-1">
              薬の詳しい説明を見る
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ─── LINEで完結 ──────────────────────────────── */}
      <section className="py-20 md:py-28 bg-clinic-black border-y border-clinic-gold/10 relative overflow-hidden">
        <div className="absolute inset-0 hero-glow pointer-events-none opacity-60" />
        <Reveal className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* LINEアイコン風 */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-[#06C755]/10 border border-[#06C755]/30 flex items-center justify-center">
                <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
                  <path d="M20 4C11.163 4 4 10.268 4 18c0 4.418 2.343 8.372 6 11.07V34l5.333-2.933C16.82 31.68 18.38 32 20 32c8.837 0 16-6.268 16-14S28.837 4 20 4z" fill="#06C755" opacity=".2"/>
                  <path d="M20 4C11.163 4 4 10.268 4 18c0 4.418 2.343 8.372 6 11.07V34l5.333-2.933C16.82 31.68 18.38 32 20 32c8.837 0 16-6.268 16-14S28.837 4 20 4z" stroke="#06C755" strokeWidth="1.5"/>
                  <circle cx="13" cy="18" r="1.5" fill="#06C755"/>
                  <circle cx="20" cy="18" r="1.5" fill="#06C755"/>
                  <circle cx="27" cy="18" r="1.5" fill="#06C755"/>
                </svg>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <p className="text-[10px] tracking-[0.4em] text-clinic-gold/60 mb-3 font-sans">LINE ONLY</p>
              <h2 className="font-serif font-light text-2xl md:text-3xl tracking-[0.15em] text-clinic-offwhite mb-4">
                全て、LINEで完結します。
              </h2>
              <p className="text-clinic-offwhite/45 text-sm leading-relaxed tracking-wide mb-6">
                アプリのインストールも、会員登録も不要。<br />
                LINEの友だち追加だけで、予約・診察・処方・相談まで<br className="hidden md:block" />
                すべてそのままチャットで完結します。
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {["予約・問診", "医師との相談", "経過フォロー", "薬の説明"].map(tag => (
                  <span key={tag} className="text-xs text-clinic-gold/70 border border-clinic-gold/25 px-3 py-1.5 tracking-wider">
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ─── ご利用の流れ ─────────────────────────────── */}
      <section className="py-28 md:py-36 bg-clinic-gray-dark relative overflow-hidden">
        <div className="absolute inset-0 section-glow-left pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <p className="text-[10px] tracking-[0.5em] text-clinic-gold/60 mb-4 font-sans">HOW IT WORKS</p>
            <div className="w-8 h-px bg-clinic-gold/40 mx-auto mb-6" />
            <h2 className="font-serif font-light text-2xl md:text-3xl tracking-[0.2em] text-clinic-offwhite">
              ご利用の流れ
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <div className="relative flex md:flex-col items-start md:items-center gap-5 md:gap-0 p-6 md:px-6 md:py-0 md:text-center">
                  {/* 横ライン（md以上） */}
                  {i < STEPS.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-[calc(50%+28px)] right-0 h-px bg-gradient-to-r from-clinic-gold/20 to-transparent" />
                  )}
                  {/* 縦ライン（モバイル） */}
                  {i < STEPS.length - 1 && (
                    <div className="md:hidden absolute left-11 top-16 bottom-0 w-px bg-gradient-to-b from-clinic-gold/20 to-transparent" />
                  )}

                  <div className="w-12 h-12 border border-clinic-gold/30 flex items-center justify-center flex-shrink-0 bg-clinic-gray-dark relative z-10 md:mx-auto md:mb-6">
                    <span className="font-serif text-xs text-clinic-gold tracking-wider">{s.n}</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-sm text-clinic-offwhite tracking-wider mb-2 md:mb-3">{s.title}</h3>
                    <p className="text-xs text-clinic-offwhite/35 leading-relaxed tracking-wide">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────── */}
      <section className="py-28 md:py-40 bg-clinic-black relative overflow-hidden">
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-clinic-gold/8 pointer-events-none" />

        <Reveal className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.5em] text-clinic-gold/60 mb-6 font-sans">GET STARTED</p>
          <div className="w-8 h-px bg-clinic-gold/40 mx-auto mb-8" />
          <h2 className="font-serif font-light text-3xl md:text-4xl tracking-[0.15em] text-clinic-offwhite mb-4">
            まずは、ご予約から。
          </h2>
          <p className="text-clinic-offwhite/35 text-sm tracking-wider leading-relaxed mb-12">
            初診・再診どちらも対応しています。<br />
            気になることはLINEでお気軽にご相談ください。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/reservation"
              className="inline-flex items-center justify-center gap-3 bg-clinic-gold text-clinic-black px-10 py-4 text-sm tracking-[0.2em] font-sans hover:bg-clinic-gold-light transition-colors"
            >
              予約・問診票はこちら →
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center justify-center border border-clinic-gold/30 text-clinic-gold/70 px-8 py-4 text-sm tracking-[0.2em] font-sans hover:border-clinic-gold hover:text-clinic-gold transition-colors"
            >
              よくある質問
            </Link>
          </div>

          <div className="mt-16 pt-10 border-t border-clinic-gold/10">
            <p className="text-xs text-clinic-offwhite/25 tracking-wider leading-relaxed">
              ※ 本サービスは自由診療のみです。健康保険は適用されません。<br />
              ※ 処方は医師の診察・判断のもとに行います。
            </p>
          </div>
        </Reveal>
      </section>
    </>
  )
}
