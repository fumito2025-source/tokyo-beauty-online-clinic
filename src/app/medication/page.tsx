export const metadata = {
  title: "薬の説明 | 東京美容オンラインクリニック",
  description: "当クリニックで処方する薬剤の効能・用法・注意事項をご案内します。",
}

const categories = [
  {
    id: "aga",
    label: "AGA治療薬",
    en: "AGA TREATMENT",
    description: "男性型脱毛症（AGA）の進行を抑制・改善する内服薬です。",
    drugs: [
      {
        name: "フィナステリド錠 1mg",
        maker: "沢井製薬",
        effect: "5αリダクターゼ阻害薬。DHT（ジヒドロテストステロン）の産生を抑制し、AGA の進行を止めます。",
        usage: "1日1錠、食事に関係なく服用。効果が現れるまで3〜6ヶ月かかります。",
        caution: "女性（特に妊娠中・妊娠の可能性のある方）は服用・接触厳禁。PSA値に影響するため、前立腺がん検査前に医師へ申告してください。",
        icon: "💊",
      },
      {
        name: "デュタステリドカプセル 0.5mg",
        maker: "沢井製薬",
        effect: "5αリダクターゼ1型・2型の両方を阻害。フィナステリドより広範囲のDHT抑制効果が期待できます。",
        usage: "1日1カプセル。カプセルを噛まずにそのまま服用してください。",
        caution: "女性（特に妊娠中・妊娠の可能性のある方）は服用・接触厳禁。献血は服用終了後6ヶ月間お控えください。",
        icon: "💊",
      },
    ],
  },
  {
    id: "whitening",
    label: "美容内服（美白・肝斑）",
    en: "WHITENING",
    description: "シミ・肝斑の改善、美白・美肌効果を目的とした内服薬です。",
    drugs: [
      {
        name: "トランサミン錠 250mg（トラネキサム酸）",
        maker: "第一三共",
        effect: "メラニン生成を促すプラスミンの働きを抑制。肝斑・シミの改善、炎症を抑える効果があります。",
        usage: "1日2〜3回、1回1〜2錠を食後に服用。",
        caution: "血栓のある方、血栓症の既往がある方は服用前にご相談ください。",
        icon: "✨",
      },
      {
        name: "シナール配合錠（ビタミンC・パントテン酸）",
        maker: "塩野義製薬",
        effect: "ビタミンCがメラニン生成を抑制し、コラーゲンの合成を促進。パントテン酸との配合で吸収率が向上します。",
        usage: "1日2〜3回、1回1〜2錠を食後に服用。",
        caution: "腎結石の既往がある方はご相談ください。大量摂取で下痢になることがあります。",
        icon: "✨",
      },
      {
        name: "ハイチオール錠 80（L-システイン）",
        maker: "久光製薬",
        effect: "メラニン生成を抑制し、シミ・そばかすを改善。皮膚のターンオーバーを促進します。",
        usage: "1日3回、1回2錠を食後に服用。",
        caution: "特になし。長期服用可能です。",
        icon: "✨",
      },
      {
        name: "ユベラ錠 50mg（ビタミンE）",
        maker: "エーザイ",
        effect: "抗酸化作用により老化を抑制。血行を促進し、くすみ・冷え性の改善にも効果的です。",
        usage: "1日3回、1回1錠を食後に服用。",
        caution: "ワルファリンを服用中の方はご相談ください。",
        icon: "✨",
      },
      {
        name: "ノイロビタン配合錠（ビタミンB群）",
        maker: "LTLファーマ",
        effect: "ビタミンB1・B2・B6・B12を配合。皮膚や粘膜の健康を維持し、肌荒れ・口内炎を改善します。",
        usage: "1日1〜3回、1回1錠を服用。",
        caution: "尿が黄色くなることがありますが、ビタミンB2の影響で異常ではありません。",
        icon: "✨",
      },
      {
        name: "ハイボン錠（リボフラビン・ビタミンB2）",
        maker: "",
        effect: "皮膚・粘膜の保護、脂質代謝の促進。肌荒れ・口角炎・舌炎の改善に効果があります。",
        usage: "1日3回、1回1錠を食後に服用。",
        caution: "尿が黄色くなることがありますが、正常な反応です。",
        icon: "✨",
      },
      {
        name: "ビフロキシン配合錠",
        maker: "",
        effect: "ビタミンB群の複合製剤。神経機能の維持、皮膚・粘膜の健康保持に働きます。",
        usage: "1日1〜3回、1回1錠を服用。",
        caution: "尿が黄色くなることがありますが、ビタミンの影響です。",
        icon: "✨",
      },
    ],
  },
  {
    id: "acne",
    label: "ニキビ治療",
    en: "ACNE TREATMENT",
    description: "ニキビ（尋常性痤瘡）の治療・予防に用いる外用薬・内服薬です。",
    drugs: [
      {
        name: "アダパレンゲル 0.1%",
        maker: "ニプロファーマ",
        effect: "レチノイド系外用薬。毛穴の詰まりを解消し、コメド（白ニキビ・黒ニキビ）を改善します。",
        usage: "1日1回、就寝前に患部へ薄く塗布。",
        caution: "使用初期に赤み・乾燥・ピリピリ感が出ることがあります。日焼けに注意し、日中は日焼け止めを使用してください。妊娠中は使用不可。",
        icon: "🌿",
      },
      {
        name: "ゼビアックスローション 2%（オゼノキサシン）",
        maker: "マルホ",
        effect: "ニキビ菌（アクネ菌）に対する抗菌外用薬。炎症性ニキビ（赤ニキビ）を改善します。",
        usage: "1日1回、患部へ適量を塗布。",
        caution: "目・口・鼻の周囲への使用を避けてください。",
        icon: "🌿",
      },
      {
        name: "ベピオゲル 2.5%（過酸化ベンゾイル）",
        maker: "マルホ",
        effect: "強力な抗菌・殺菌作用。アクネ菌への耐性が生じにくく、コメドから炎症性ニキビまで幅広く対応します。",
        usage: "1日1回、洗顔後に患部へ薄く塗布。",
        caution: "漂白作用があるため、衣類・タオルへの付着に注意。使用初期に乾燥・刺激感が出ることがあります。",
        icon: "🌿",
      },
      {
        name: "ビブラマイシン錠 100mg（ドキシサイクリン）",
        maker: "ファイザー",
        effect: "テトラサイクリン系抗生物質。アクネ菌への抗菌作用と抗炎症作用を持ちます。",
        usage: "1日1〜2回、食後に服用（牛乳との同時服用は避ける）。",
        caution: "8歳未満の小児・妊婦への投与不可。日光過敏症が起こることがあるため、日焼けに注意してください。",
        icon: "🌿",
      },
      {
        name: "ミヤBM錠（酪酸菌）",
        maker: "ミヤリサン製薬",
        effect: "腸内環境を整える整腸薬。抗生物質服用時の下痢・軟便を予防します。",
        usage: "1日3回、1回1錠を食後に服用。",
        caution: "特になし。抗生物質と同時に服用しても効果が減少しません。",
        icon: "🌿",
      },
    ],
  },
  {
    id: "moisturizing",
    label: "保湿・外用薬",
    en: "MOISTURIZING",
    description: "皮膚の保湿・保護を目的とした外用薬です。",
    drugs: [
      {
        name: "ヒルドイドクリーム / ソフト軟膏 / ローション 0.3%（ヘパリン類似物質）",
        maker: "マルホ",
        effect: "高い保湿・血行促進作用。乾燥肌・肌荒れの改善、傷跡・妊娠線の予防にも効果的です。",
        usage: "1日1〜数回、患部へ適量を塗布。クリーム・軟膏・ローションは使用感で選択できます。",
        caution: "出血している部位への使用不可。抗凝固薬を服用中の方はご相談ください。",
        icon: "💧",
      },
      {
        name: "ビマトプロスト点眼液 0.03%",
        maker: "日東メディック",
        effect: "プロスタグランジン誘導体。まつ毛の成長を促進し、長さ・密度・濃さを改善します。",
        usage: "1日1回就寝前、まつ毛の生え際（上まぶたのみ）に細いブラシで塗布。",
        caution: "目の中への直接点眼は避けてください。虹彩色素沈着（目の色が変わる）が生じることがあります。コンタクトレンズは塗布後15分後に装着してください。",
        icon: "💧",
      },
    ],
  },
]

export default function MedicationPage() {
  return (
    <main className="bg-clinic-black min-h-screen text-clinic-cream">
      {/* ヘッダー */}
      <section className="py-24 md:py-36 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-clinic-gold/5" />
        </div>
        <div className="relative">
          <p className="text-xs tracking-[0.5em] text-clinic-gold mb-6 font-serif">MEDICATION GUIDE</p>
          <div className="w-8 h-px bg-clinic-gold mx-auto mb-8" />
          <h1 className="font-serif text-3xl md:text-4xl tracking-widest text-clinic-cream mb-6">薬の説明</h1>
          <p className="text-clinic-cream/50 text-sm tracking-wider max-w-lg mx-auto leading-relaxed">
            当クリニックで処方する薬剤の効能・用法・注意事項をご案内します。<br />
            ご不明な点はLINEまたはお問い合わせよりお気軽にご相談ください。
          </p>
        </div>
      </section>

      {/* カテゴリ別薬一覧 */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-32 space-y-20">
        {categories.map((cat) => (
          <div key={cat.id}>
            {/* カテゴリヘッダー */}
            <div className="flex items-center gap-6 mb-10">
              <div className="flex-1 h-px bg-clinic-gold/20" />
              <div className="text-center">
                <p className="text-[10px] tracking-[0.4em] text-clinic-gold/60 mb-1">{cat.en}</p>
                <h2 className="font-serif text-xl tracking-widest text-clinic-cream">{cat.label}</h2>
              </div>
              <div className="flex-1 h-px bg-clinic-gold/20" />
            </div>
            <p className="text-center text-clinic-cream/40 text-sm tracking-wider mb-10">{cat.description}</p>

            {/* 薬カード */}
            <div className="space-y-6">
              {cat.drugs.map((drug) => (
                <div
                  key={drug.name}
                  className="border border-clinic-gold/15 p-6 md:p-8 relative"
                >
                  {/* コーナー装飾 */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-clinic-gold/30" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-clinic-gold/30" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-clinic-gold/30" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-clinic-gold/30" />

                  <div className="flex items-start gap-4 mb-5">
                    <span className="text-2xl mt-0.5">{drug.icon}</span>
                    <div>
                      <h3 className="font-serif text-base md:text-lg text-clinic-cream tracking-wide leading-snug">{drug.name}</h3>
                      {drug.maker && (
                        <p className="text-xs text-clinic-gold/50 mt-1 tracking-wider">{drug.maker}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4 ml-10">
                    <div>
                      <p className="text-[10px] tracking-[0.3em] text-clinic-gold/60 mb-1.5">効能・効果</p>
                      <p className="text-sm text-clinic-cream/70 leading-relaxed">{drug.effect}</p>
                    </div>
                    <div className="w-full h-px bg-clinic-gold/10" />
                    <div>
                      <p className="text-[10px] tracking-[0.3em] text-clinic-gold/60 mb-1.5">用法・用量</p>
                      <p className="text-sm text-clinic-cream/70 leading-relaxed">{drug.usage}</p>
                    </div>
                    <div className="w-full h-px bg-clinic-gold/10" />
                    <div>
                      <p className="text-[10px] tracking-[0.3em] text-clinic-gold/60 mb-1.5">注意事項</p>
                      <p className="text-sm text-clinic-cream/70 leading-relaxed">{drug.caution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* 注意書き */}
        <div className="border border-clinic-gold/10 p-6 text-center">
          <p className="text-xs text-clinic-cream/30 leading-relaxed tracking-wider">
            ※ 処方は医師の診察・判断のもとに行います。自己判断での服用・使用はお控えください。<br />
            ※ 副作用・体調変化があった場合は、LINEまたはお問い合わせよりご相談ください。<br />
            ※ 掲載内容は一般的な情報であり、個々の症状により異なります。
          </p>
        </div>
      </section>
    </main>
  )
}
