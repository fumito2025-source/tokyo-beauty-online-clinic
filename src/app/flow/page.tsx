import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "險ｺ逋ゅ・豬√ｌ | 譚ｱ莠ｬ鄒主ｮｹ繧ｪ繝ｳ繝ｩ繧､繝ｳ繧ｯ繝ｪ繝九ャ繧ｯ",
}

const steps = [
  {
    n: "01",
    title: "LINE縺ｧ蜿九□縺｡霑ｽ蜉",
    desc: "縺ｾ縺壹・蜈ｬ蠑臭INE繧貞暑縺縺｡霑ｽ蜉縺励※縺上□縺輔＞縲りｿｽ蜉蠕後☆縺舌↓繝｡繝九Η繝ｼ縺瑚｡ｨ遉ｺ縺輔ｌ縺ｾ縺吶ゅい繝励Μ縺ｮ繧､繝ｳ繧ｹ繝医・繝ｫ繧・ｼ壼藤逋ｻ骭ｲ縺ｯ荳崎ｦ√〒縺吶・,
    note: "蜿九□縺｡霑ｽ蜉縺ｯ辟｡譁吶〒縺・,
  },
  {
    n: "02",
    title: "縺比ｺ育ｴ・・蝠剰ｨｺ逾ｨ繧定ｨ伜・",
    desc: "LINE繝｡繝九Η繝ｼ縺ｮ縲後＃莠育ｴ・阪°繧峨＃蟶梧悍縺ｮ譌･譎ゅｒ驕ｸ縺ｳ縲∝撫險ｺ逾ｨ繧偵＃險伜・縺上□縺輔＞縲ら裸迥ｶ繝ｻ縺頑か縺ｿ繝ｻ迴ｾ蝨ｨ譛咲畑荳ｭ縺ｮ縺願脈縺ｪ縺ｩ繧偵＃蜈･蜉帙＞縺溘□縺阪∪縺吶・,
    note: "謇隕∵凾髢難ｼ夂ｴ・蛻・,
  },
  {
    n: "03",
    title: "蛹ｻ蟶ｫ縺瑚ｨｺ蟇溘・蜃ｦ譁ｹ繧貞愛譁ｭ",
    desc: "蝠剰ｨｺ逾ｨ縺ｮ蜀・ｮｹ繧偵ｂ縺ｨ縺ｫ縲∝現蟶ｫ縺鍬INE繝√Ε繝・ヨ縺ｫ縺ｦ險ｺ蟇溘＞縺溘＠縺ｾ縺吶りｿｽ蜉縺ｧ蜀咏悄繧・ｳｪ蝠上ｒ縺企√ｊ縺・◆縺縺丞ｴ蜷医ｂ縺斐＊縺・∪縺吶・,
    note: "蜿嶺ｻ俶凾髢灘・縺ｫ鬆・ｬ｡縺泌ｯｾ蠢・,
  },
  {
    n: "04",
    title: "縺頑髪謇輔＞",
    desc: "蜃ｦ譁ｹ縺檎｢ｺ螳壹＠縺ｾ縺励◆繧峨´INE縺ｫ縺頑髪謇輔＞繝ｪ繝ｳ繧ｯ繧偵♀騾√ｊ縺励∪縺吶ゅけ繝ｬ繧ｸ繝・ヨ繧ｫ繝ｼ繝峨〒縺頑髪謇輔＞縺・◆縺縺代∪縺吶・,
    note: "VISA繝ｻMastercard繝ｻJCB繝ｻAMEX蟇ｾ蠢・,
  },
  {
    n: "05",
    title: "阮ｬ縺瑚・螳・↓螻翫￥",
    desc: "縺頑髪謇輔＞遒ｺ隱榊ｾ後∵怙遏ｭ鄙悟霧讌ｭ譌･縺ｫ逋ｺ騾√＞縺溘＠縺ｾ縺吶ゅ・繝ｩ繧､繝舌す繝ｼ縺ｫ驟肴・縺励◆譴ｱ蛹・〒縺疲欠螳壹・菴乗園縺ｫ縺雁ｱ翫￠縺励∪縺吶・,
    note: "騾壼ｸｸ2縲・蝟ｶ讌ｭ譌･縺ｧ縺雁ｱ翫￠",
  },
  {
    n: "06",
    title: "邨碁℃繝輔か繝ｭ繝ｼ",
    desc: "譛咲畑髢句ｧ句ｾ後・邨碁℃縺ｯLINE縺ｧ縺皮嶌隲・＞縺溘□縺代∪縺吶ょ・逵溘ｄ逞・憾繧偵◎縺ｮ縺ｾ縺ｾ騾∽ｿ｡縺励※縺上□縺輔＞縲ょ現蟶ｫ縺檎｢ｺ隱阪＠縲√＃霑比ｿ｡縺・◆縺励∪縺吶・,
    note: "蜀崎ｨｺ繝ｻ螳壽悄蜃ｦ譁ｹ縺ｫ繧ょｯｾ蠢・,
  },
]

const faqs = [
  { q: "蛻晁ｨｺ縺ｧ繧ょ茜逕ｨ縺ｧ縺阪∪縺吶°・・, a: "縺ｯ縺・∝・險ｺ縺ｮ譁ｹ繧ゅ＃蛻ｩ逕ｨ縺・◆縺縺代∪縺吶ょ撫險ｺ逾ｨ縺ｫ縺碑ｨ伜・蠕後∝現蟶ｫ縺瑚ｨｺ蟇溘＞縺溘＠縺ｾ縺吶・ },
  { q: "菫晞匱縺ｯ菴ｿ縺医∪縺吶°・・, a: "蠖薙け繝ｪ繝九ャ繧ｯ縺ｯ閾ｪ逕ｱ險ｺ逋ゅ・縺ｿ縺ｨ縺ｪ繧翫∪縺吶ょ▼蠎ｷ菫晞匱縺ｯ驕ｩ逕ｨ縺輔ｌ縺ｾ縺帙ｓ縲・ },
  { q: "險ｺ蟇溘・縺ｩ縺ｮ縺上ｉ縺・°縺九ｊ縺ｾ縺吶°・・, a: "蜿嶺ｻ俶凾髢灘・・・0:00縲・8:00・峨・縺比ｺ育ｴ・・蜴溷援蠖捺律荳ｭ縺ｫ縺碑ｿ比ｿ｡縺・◆縺励∪縺吶・ },
]

export default function FlowPage() {
  return (
    <main className="min-h-screen bg-clinic-black text-clinic-offwhite">
      {/* Hero */}
      <section className="py-24 border-b border-clinic-gray-light">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.55em] text-clinic-gold mb-4 font-sans">HOW IT WORKS</p>
          <div className="w-6 h-px bg-clinic-gold mx-auto mb-8" />
          <h1 className="font-serif font-light text-4xl tracking-[0.15em] mb-5 text-clinic-offwhite">險ｺ逋ゅ・豬√ｌ</h1>
          <p className="text-sm text-clinic-offwhite/65 tracking-wider leading-relaxed">
            蜿九□縺｡霑ｽ蜉縺九ｉ阮ｬ縺ｮ縺雁ｱ翫￠縺ｾ縺ｧ縲∝・縺ｦLINE縺ｧ螳檎ｵ舌＠縺ｾ縺・          </p>
        </div>
      </section>

      {/* 繧ｹ繝・ャ繝・*/}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="relative">
          {/* 邵ｦ繝ｩ繧､繝ｳ */}
          <div className="absolute left-[27px] top-8 bottom-8 w-px bg-gradient-to-b from-clinic-gold/40 via-clinic-gold/20 to-transparent hidden sm:block" />

          <div className="space-y-0">
            {steps.map((step, i) => (
              <div key={step.n} className="relative flex gap-6 sm:gap-10 pb-12 last:pb-0">
                {/* 繧ｹ繝・ャ繝礼分蜿ｷ */}
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-14 h-14 border border-clinic-gold/30 bg-clinic-black flex flex-col items-center justify-center">
                    <span className="text-[8px] tracking-widest text-clinic-gold/50 font-sans leading-none mb-0.5">STEP</span>
                    <span className="font-serif text-sm text-clinic-gold">{step.n}</span>
                  </div>
                </div>

                {/* 繧ｳ繝ｳ繝・Φ繝・*/}
                <div className="flex-1 pt-3 pb-2">
                  <h2 className="font-serif font-light text-lg tracking-[0.15em] text-clinic-offwhite mb-3">
                    {step.title}
                  </h2>
                  <p className="text-sm text-clinic-offwhite/70 leading-relaxed tracking-wide mb-3">
                    {step.desc}
                  </p>
                  <span className="text-xs text-clinic-gold/50 tracking-wider border-l border-clinic-gold/25 pl-3">
                    {step.note}
                  </span>

                  {/* STEP01縺ｫLINE繝懊ち繝ｳ */}
                  {i === 0 && (
                    <div className="mt-5">
                      <a
                        href="https://line.me/R/ti/p/@555glibw"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#06C755] text-white px-6 py-2.5 text-xs tracking-wider font-sans hover:opacity-90 transition-opacity"
                      >
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M10 2C5.58 2 2 5.13 2 9c0 2.21 1.17 4.18 3 5.54V17l2.67-1.47c.76.21 1.56.47 2.33.47 4.42 0 8-3.13 8-7s-3.58-7-8-7z"/></svg>
                        LINE縺ｧ蜿九□縺｡霑ｽ蜉
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 繧医￥縺ゅｋ雉ｪ蝠擾ｼ域栢邊具ｼ・*/}
      <section className="border-t border-clinic-gray-light py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif font-light text-lg tracking-[0.2em] text-clinic-gold mb-8 text-center">繧医￥縺ゅｋ雉ｪ蝠・/h2>
          <div className="space-y-px mb-10">
            {faqs.map((item) => (
              <div key={item.q} className="border border-clinic-gray-light px-6 py-5 bg-clinic-gray-dark/50">
                <p className="text-sm text-clinic-offwhite/80 mb-2 flex gap-3">
                  <span className="text-clinic-gold/60 font-serif flex-shrink-0">Q</span>{item.q}
                </p>
                <p className="text-sm text-clinic-offwhite/65 flex gap-3">
                  <span className="text-clinic-gold font-serif flex-shrink-0">A</span>{item.a}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/faq" className="text-xs text-clinic-gold/60 hover:text-clinic-gold tracking-[0.3em] border-b border-clinic-gold/20 hover:border-clinic-gold pb-1 transition-colors">
              繧医￥縺ゅｋ雉ｪ蝠上ｒ繧ゅ▲縺ｨ隕九ｋ
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-clinic-gray-light py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm text-clinic-offwhite/40 tracking-wider mb-8">縺ｾ縺壹・LINE縺ｧ蜿九□縺｡霑ｽ蜉縺励※縺上□縺輔＞</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://line.me/R/ti/p/@555glibw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#06C755] text-white px-8 py-3 text-sm tracking-wider font-sans hover:opacity-90 transition-opacity"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M10 2C5.58 2 2 5.13 2 9c0 2.21 1.17 4.18 3 5.54V17l2.67-1.47c.76.21 1.56.47 2.33.47 4.42 0 8-3.13 8-7s-3.58-7-8-7z"/></svg>
              LINE縺ｧ蜿九□縺｡霑ｽ蜉
            </a>
            <Link
              href="/reservation"
              className="inline-flex items-center justify-center border border-clinic-gold text-clinic-gold px-8 py-3 text-sm tracking-wider font-sans hover:bg-clinic-gold hover:text-clinic-black transition-colors"
            >
              莠育ｴ・・蝠剰ｨｺ逾ｨ縺ｯ縺薙■繧・            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
