"use client"
import Link from "next/link"
import Image from "next/image"
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
  { id: "glp1",     label: "GLP-1受容体作動薬",  en: "GLP-1",       desc: "マンジャロ（チルゼパチド）など、医師が状態に合わせて処方する注射製剤", href: "/medication#glp1" },
  { id: "oral",     label: "内服薬",              en: "ORAL MED",    desc: "リベルサス（セマグルチド経口）など、内服タイプの医療用製剤", href: "/medication#oral" },
  { id: "diet",     label: "食事・栄養管理",       en: "NUTRITION",   desc: "カウンセラーによる週1回の面談で食事内容・カロリーを継続サポート", href: "/flow" },
  { id: "follow",   label: "体重・進捗管理",       en: "TRACKING",    desc: "毎日LINEで体重・食事・体調を記録。専用フォーマットで見える化", href: "/flow" },
]

const STEPS = [
  { n: "01", title: "LINEで無料相談",    desc: "まずはLINEから気軽にご相談ください。担当スタッフが対応します。" },
  { n: "02", title: "医師の初回診察",    desc: "現在の体重・健康状態・ご希望を確認し、治療方針を決定します。" },
  { n: "03", title: "プログラム開始",    desc: "薬の処方＋カウンセラーによる週1回面談＋毎日LINEフォローがスタート。" },
  { n: "04", title: "医師が定期診察",    desc: "2週間に1回、同じ医師が経過を確認。必要に応じて処方を調整します。" },
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
        .arch { border-radius: 200px 200px 0 0; position: relative; overflow: hidden; }
        .arch::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(255,255,255,.06) 0%, rgba(0,0,0,.12) 100%);
        }
        .arch-stripe {
          position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
          width: 3px; height: 55%; background: #B89050; opacity: .5; z-index: 1;
        }
      `}</style>

      {/* ─── HERO ─────────────────────────────────────── */}

      {/* モバイル: 画像上 + テキスト下の縦積みレイアウト */}
      <div className="md:hidden flex flex-col">
        {/* 画像エリア */}
        <div className="relative w-full overflow-hidden" style={{ height: "52vw", minHeight: 220 }}>
          <Image
            src="/hero2.png"
            alt="hero"
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover object-[50%_22%] hero-kenburns"
          />
          {/* 下端フェード */}
          <div className="absolute inset-x-0 bottom-0 h-10" style={{
            background: "linear-gradient(to top, #FAF7F2, transparent)"
          }} />
        </div>
        {/* テキストエリア */}
        <div className="bg-clinic-black px-6 py-10">
          <p className="text-[10px] tracking-[0.5em] text-clinic-gold mb-4 font-sans">MEDICAL DIET, BACKED BY DOCTOR.</p>
          <div className="w-8 h-px bg-clinic-gold mb-6" />
          <h1 className="font-serif font-medium text-4xl leading-tight tracking-[0.03em] text-clinic-offwhite mb-5">
            本気の人だけに。
          </h1>
          <p className="text-sm text-clinic-offwhite/80 font-medium leading-[1.9] tracking-wide mb-8">
            医師とカウンセラーが二人三脚でサポートする、<br />
            医師とカウンセラーによる、完全オンライン医療ダイエット。
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/reservation" className="inline-flex items-center justify-center gap-2 bg-clinic-offwhite text-white px-8 py-4 text-sm tracking-[0.15em] font-sans">
              オンライン診療を予約 <span className="text-clinic-gold">›</span>
            </Link>
            <Link href="/plans" className="inline-flex items-center justify-center gap-2 border border-clinic-offwhite/40 text-clinic-offwhite px-8 py-4 text-sm tracking-[0.15em] font-sans">
              プランを見る <span>›</span>
            </Link>
          </div>
          <div className="flex items-center gap-5 mt-8">
            {["医師が継続担当", "週1回カウンセラー", "完全オンライン"].map((item, i) => (
              <span key={item} className="flex items-center gap-2 text-[11px] text-clinic-offwhite/55 tracking-wider font-sans">
                {i > 0 && <span className="text-clinic-gold/40">|</span>}
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* PC: フルブリード背景レイアウト（変更なし） */}
      <section className="relative hidden md:flex min-h-[82vh] items-center overflow-hidden">
        <Image
          src="/hero2.png"
          alt="hero"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-[75%_15%] hero-kenburns"
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to right, rgba(250,247,242,0.97) 0%, rgba(250,247,242,0.92) 30%, rgba(250,247,242,0.55) 55%, rgba(250,247,242,0.10) 78%, transparent 100%)"
        }} />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-14 py-24">
          <div className="max-w-xl">
            <p className="text-[11px] tracking-[0.5em] text-clinic-gold mb-5 font-sans">MEDICAL DIET, BACKED BY DOCTOR.</p>
            <div className="w-10 h-px bg-clinic-gold mb-8" />
            <h1 className="font-serif font-medium text-7xl leading-tight tracking-[0.03em] text-clinic-offwhite mb-7">
              本気の人だけに。
            </h1>
            <p className="text-xl text-clinic-offwhite/90 font-medium leading-[1.9] tracking-wide mb-10">
              医師とカウンセラーが二人三脚でサポートする、<br />
              医師とカウンセラーによる、完全オンライン医療ダイエット。
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/reservation" className="inline-flex items-center gap-2 bg-clinic-offwhite text-white px-10 py-4 text-sm tracking-[0.15em] font-sans hover:opacity-85 transition-opacity">
                オンライン診療を予約 <span className="text-clinic-gold">›</span>
              </Link>
              <Link href="/plans" className="inline-flex items-center gap-2 border border-clinic-offwhite/40 text-clinic-offwhite px-10 py-4 text-sm tracking-[0.15em] font-sans hover:border-clinic-gold hover:text-clinic-gold transition-colors">
                プランを見る <span>›</span>
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-10">
              {["医師が継続担当", "週1回カウンセラー", "完全オンライン"].map((item, i) => (
                <span key={item} className="flex items-center gap-2 text-xs text-clinic-offwhite/65 tracking-wider font-sans">
                  {i > 0 && <span className="text-clinic-gold/40">|</span>}
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3つの特徴 ─────────────────────────────────── */}
      <section className="py-28 md:py-36 bg-clinic-gray-mid border-b border-clinic-gray-light">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <p className="text-[10px] tracking-[0.5em] text-clinic-gold mb-3 font-sans">FEATURES</p>
            <div className="w-6 h-px bg-clinic-gold mx-auto mb-6" />
            <h2 className="font-serif font-light text-2xl md:text-3xl tracking-[0.2em] text-clinic-offwhite">
              選ばれる理由
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-clinic-gray-light">
            {[
              {
                icon: (
                  <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8"><circle cx="20" cy="14" r="7" stroke="#B89050" strokeWidth="1"/><path d="M8 36c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="#B89050" strokeWidth="1"/></svg>
                ),
                title: "同じ医師が最後まで",
                desc: "初回から担当医が変わりません。2週間に1回の定期診察で体調・経過を継続管理します。",
              },
              {
                icon: (
                  <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8"><rect x="8" y="6" width="24" height="28" rx="2" stroke="#B89050" strokeWidth="1"/><line x1="13" y1="14" x2="27" y2="14" stroke="#B89050" strokeWidth="1"/><line x1="13" y1="20" x2="27" y2="20" stroke="#B89050" strokeWidth="1"/><line x1="13" y1="26" x2="20" y2="26" stroke="#B89050" strokeWidth="1"/></svg>
                ),
                title: "毎日LINEでフォロー",
                desc: "専用フォーマットで体重・食事・薬を毎日記録。女性カウンセラーが週1回の面談でサポートします。",
              },
              {
                icon: (
                  <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8"><path d="M20 6l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z" stroke="#B89050" strokeWidth="1"/></svg>
                ),
                title: "プライバシーへの配慮",
                desc: "診察・面談・薬の配送まで完全オンライン。来院不要で、周囲に知られることなく継続できます。",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 100} className="bg-clinic-gray-mid">
                <div className="text-center px-10 py-14">
                  <div className="flex justify-center mb-7 opacity-80">{item.icon}</div>
                  <div className="w-6 h-px bg-clinic-gold/40 mx-auto mb-5" />
                  <h3 className="font-serif font-light text-base tracking-[0.2em] text-clinic-offwhite mb-4">{item.title}</h3>
                  <p className="text-clinic-offwhite/75 text-xs leading-relaxed tracking-wide">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 診療カテゴリ ─────────────────────────────── */}
      <section className="py-28 md:py-36 bg-clinic-black border-b border-clinic-gray-light">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <p className="text-[10px] tracking-[0.5em] text-clinic-gold mb-3 font-sans">TREATMENTS</p>
            <div className="w-6 h-px bg-clinic-gold mx-auto mb-6" />
            <h2 className="font-serif font-light text-2xl md:text-3xl tracking-[0.2em] text-clinic-offwhite">
              プログラムの内容
            </h2>
          </Reveal>

          <div className="space-y-px">
            {TREATMENTS.map((t, i) => (
              <Reveal key={t.id} delay={i * 60}>
                <Link href={t.href} className="group flex items-center gap-6 md:gap-10 px-6 md:px-10 py-7 bg-clinic-gray-mid border border-clinic-gray-light hover:border-clinic-gold hover:bg-clinic-gray-dark transition-all duration-300 block">
                  <span className="font-serif text-2xl text-clinic-offwhite/20 tracking-wider w-8 flex-shrink-0 text-right group-hover:text-clinic-gold/50 transition-colors">
                    {String(i+1).padStart(2,"0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] tracking-[0.4em] text-clinic-gold mb-1 font-sans">{t.en}</p>
                    <h3 className="font-serif font-light text-base md:text-lg tracking-[0.15em] text-clinic-offwhite group-hover:text-clinic-gold transition-colors duration-300">
                      {t.label}
                    </h3>
                    <p className="text-xs text-clinic-offwhite/72 mt-1.5 tracking-wide leading-relaxed hidden md:block">{t.desc}</p>
                  </div>
                  <span className="text-clinic-gold/30 group-hover:text-clinic-gold transition-colors duration-300 text-lg flex-shrink-0">→</span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-12">
            <Link href="/medication" className="inline-flex items-center gap-2 text-xs text-clinic-gold/70 hover:text-clinic-gold tracking-[0.3em] transition-colors border-b border-clinic-gold/30 hover:border-clinic-gold pb-1">
              使用する薬の詳しい説明を見る
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ─── LINEで完結 ──────────────────────────────── */}
      <section className="py-20 md:py-28 bg-clinic-gray-dark border-b border-clinic-gray-light">
        <Reveal className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-[#06C755]/15 border border-[#06C755]/40 flex items-center justify-center">
                <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
                  <path d="M20 4C11.163 4 4 10.268 4 18c0 4.418 2.343 8.372 6 11.07V34l5.333-2.933C16.82 31.68 18.38 32 20 32c8.837 0 16-6.268 16-14S28.837 4 20 4z" fill="#06C755" opacity=".25"/>
                  <path d="M20 4C11.163 4 4 10.268 4 18c0 4.418 2.343 8.372 6 11.07V34l5.333-2.933C16.82 31.68 18.38 32 20 32c8.837 0 16-6.268 16-14S28.837 4 20 4z" stroke="#06C755" strokeWidth="1.5"/>
                  <circle cx="13" cy="18" r="1.5" fill="#06C755"/>
                  <circle cx="20" cy="18" r="1.5" fill="#06C755"/>
                  <circle cx="27" cy="18" r="1.5" fill="#06C755"/>
                </svg>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <p className="text-[10px] tracking-[0.4em] text-clinic-gold mb-3 font-sans">DAILY LINE SUPPORT</p>
              <h2 className="font-serif font-light text-2xl md:text-3xl tracking-[0.15em] text-clinic-offwhite mb-4">
                毎日のフォローも、LINEで。
              </h2>
              <p className="text-clinic-offwhite/80 text-sm leading-relaxed tracking-wide mb-6">
                専用フォーマットで体重・食事・薬の服用を毎日LINE報告。<br />
                カウンセラーが確認し、週1回の面談で軌道修正します。<br className="hidden md:block" />
                アプリ不要、登録不要。LINEだけで全て完結します。
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {["体重・食事の記録", "カウンセラー面談", "医師の定期診察", "薬の処方・配送"].map(tag => (
                  <span key={tag} className="text-xs text-clinic-offwhite/82 border border-clinic-gray-light px-3 py-1.5 tracking-wider">
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ─── ご利用の流れ ─────────────────────────────── */}
      <section className="py-28 md:py-36 bg-clinic-black border-b border-clinic-gray-light">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <p className="text-[10px] tracking-[0.5em] text-clinic-gold mb-3 font-sans">HOW IT WORKS</p>
            <div className="w-6 h-px bg-clinic-gold mx-auto mb-6" />
            <h2 className="font-serif font-light text-2xl md:text-3xl tracking-[0.2em] text-clinic-offwhite">
              ご利用の流れ
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <div className="relative flex md:flex-col items-start md:items-center gap-5 md:gap-0 p-6 md:px-6 md:py-0 md:text-center">
                  {i < STEPS.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-[calc(50%+28px)] right-0 h-px bg-gradient-to-r from-clinic-gold/25 to-transparent" />
                  )}
                  {i < STEPS.length - 1 && (
                    <div className="md:hidden absolute left-11 top-16 bottom-0 w-px bg-gradient-to-b from-clinic-gold/25 to-transparent" />
                  )}
                  <div className="w-12 h-12 border border-clinic-gold/40 bg-clinic-black flex items-center justify-center flex-shrink-0 relative z-10 md:mx-auto md:mb-6">
                    <span className="font-serif text-xs text-clinic-gold tracking-wider">{s.n}</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-sm text-clinic-offwhite tracking-wider mb-2 md:mb-3">{s.title}</h3>
                    <p className="text-xs text-clinic-offwhite/75 leading-relaxed tracking-wide">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────── */}
      <section className="py-28 md:py-40 bg-clinic-gray-dark">
        <Reveal className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.5em] text-clinic-gold mb-6 font-sans">GET STARTED</p>
          <div className="w-6 h-px bg-clinic-gold mx-auto mb-8" />
          <h2 className="font-serif font-light text-3xl md:text-4xl tracking-[0.15em] text-clinic-offwhite mb-4">
            まずは、無料相談から。
          </h2>
          <p className="text-clinic-offwhite/78 text-sm tracking-wider leading-relaxed mb-12">
            プログラムへの参加はご本人の意思と適応の確認が必要です。<br />
            気になることはLINEでお気軽にご相談ください。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/reservation"
              className="inline-flex items-center justify-center gap-3 bg-clinic-gold text-white px-10 py-4 text-xs tracking-[0.2em] font-sans hover:opacity-85 transition-opacity"
            >
              LINEで無料相談 →
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center justify-center border border-clinic-gold/50 text-clinic-gold px-8 py-4 text-xs tracking-[0.2em] font-sans hover:border-clinic-gold hover:bg-clinic-gold/10 transition-colors"
            >
              よくある質問
            </Link>
          </div>

          <div className="mt-16 pt-10 border-t border-clinic-gray-light">
            <p className="text-xs text-clinic-offwhite/55 tracking-wider leading-relaxed">
              ※ 本サービスは自由診療のみです。健康保険は適用されません。<br />
              ※ 処方は医師の診察・判断のもとに行います。<br />
              ※ 効果には個人差があります。特定の結果を保証するものではありません。
            </p>
          </div>
        </Reveal>
      </section>
    </>
  )
}
