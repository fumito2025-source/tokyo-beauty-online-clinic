export const metadata = {
  title: "使用する薬について | 東京美容オンラインクリニック",
  description: "当クリニックの医療ダイエットプログラムで使用する薬の種類・特徴・注意点をご説明します。",
}

const DRUGS = [
  {
    id: "glp1",
    label: "GLP-1受容体作動薬（注射製剤）",
    en: "GLP-1 INJECTION",
    description: "食欲抑制・血糖値コントロールの両面に作用する医療用製剤です。医師の診察のもと、状態に応じた用量で処方します。",
    drugs: [
      {
        name: "マンジャロ®（チルゼパチド）",
        maker: "日本イーライリリー",
        detail: "GIP/GLP-1デュアル受容体作動薬。週1回の自己注射。食欲抑制と血糖コントロールに作用します。",
        note: "当プログラムで主に使用する製剤です。",
      },
    ],
    caution: "自己注射が必要です。注射方法は医師・スタッフが丁寧にご説明します。",
  },
  {
    id: "oral",
    label: "内服薬（経口製剤）",
    en: "ORAL MEDICATION",
    description: "注射が難しい方や、補助的な治療として内服タイプの製剤を処方する場合があります。",
    drugs: [
      {
        name: "リベルサス®（セマグルチド経口）",
        maker: "ノボノルディスクファーマ",
        detail: "GLP-1受容体作動薬の経口製剤。毎日服用タイプ。注射に比べ効果は緩やかですが、内服のみで継続できます。",
        note: "注射が難しい方の選択肢として処方します。",
      },
    ],
    caution: "空腹時に少量の水（120mL以下）で服用する必要があります。",
  },
]

export default function MedicationPage() {
  return (
    <div className="min-h-screen bg-clinic-black">
      {/* ─── PAGE HEADER ─── */}
      <div className="border-b border-clinic-gray-light pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.5em] text-clinic-gold mb-4 font-sans">MEDICATION</p>
          <div className="w-8 h-px bg-clinic-gold mx-auto mb-6" />
          <h1 className="font-serif font-light text-3xl md:text-4xl tracking-[0.2em] text-clinic-offwhite">
            使用する薬について
          </h1>
          <p className="text-sm text-clinic-offwhite/60 mt-6 tracking-wide leading-relaxed max-w-xl mx-auto">
            当プログラムで使用する薬はすべて医療用医薬品です。<br />
            処方は医師の診察・判断のもとに行います。
          </p>
        </div>
      </div>

      {/* ─── DRUG LIST ─── */}
      <div className="max-w-3xl mx-auto px-6 py-20 md:py-28 space-y-16">
        {DRUGS.map((cat) => (
          <section key={cat.id} id={cat.id}>
            <p className="text-[9px] tracking-[0.4em] text-clinic-gold mb-2 font-sans">{cat.en}</p>
            <h2 className="font-serif font-light text-xl tracking-[0.15em] text-clinic-offwhite mb-4">{cat.label}</h2>
            <p className="text-sm text-clinic-offwhite/70 leading-relaxed tracking-wide mb-8">{cat.description}</p>

            <div className="space-y-px bg-clinic-gray-light">
              {cat.drugs.map((d) => (
                <div key={d.name} className="bg-clinic-gray-mid px-8 py-7">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                    <h3 className="font-serif text-base text-clinic-offwhite tracking-wide">{d.name}</h3>
                    <span className="text-[11px] text-clinic-offwhite/40 tracking-wider flex-shrink-0">{d.maker}</span>
                  </div>
                  <p className="text-sm text-clinic-offwhite/70 leading-relaxed tracking-wide mb-3">{d.detail}</p>
                  {d.note && (
                    <p className="text-xs text-clinic-gold/80 tracking-wide">{d.note}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-3 items-start">
              <span className="text-clinic-gold/60 text-xs mt-0.5 flex-shrink-0">⚠</span>
              <p className="text-xs text-clinic-offwhite/50 leading-relaxed tracking-wide">{cat.caution}</p>
            </div>
          </section>
        ))}

        {/* General notes */}
        <div className="border-t border-clinic-gray-light pt-12">
          <p className="text-[10px] tracking-[0.4em] text-clinic-gold mb-6 font-sans">IMPORTANT NOTES</p>
          <ul className="space-y-4">
            {[
              "本ページに記載の薬はすべて医療用医薬品です。医師の処方なしに購入・使用することはできません。",
              "処方する薬・用量は医師の診察結果により決定します。必ずしも希望の薬が処方されるとは限りません。",
              "副作用（悪心・嘔吐・下痢等）が現れる場合があります。気になる症状はすぐにLINEでご連絡ください。",
              "妊娠中・授乳中の方、重篤な疾患をお持ちの方は処方できない場合があります。",
              "効果には個人差があります。特定の体重減少を保証するものではありません。",
              "本サービスは自由診療です。健康保険は適用されません。",
            ].map((note, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="text-clinic-gold/40 flex-shrink-0 text-xs mt-0.5">※</span>
                <p className="text-xs text-clinic-offwhite/55 leading-relaxed tracking-wide">{note}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
