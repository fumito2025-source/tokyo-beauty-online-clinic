import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "よくある質問 | 東京美容オンラインクリニック",
  description: "医療ダイエットプログラムに関するよくある質問をまとめました。",
}

const faqs = [
  {
    category: "プログラムについて",
    items: [
      { q: "どんな人が対象ですか？", a: "本気で体重を改善したいとお考えの35〜50代女性を主なターゲットとしています。BMIや健康状態を踏まえて医師が適応を判断します。まずはLINEでご相談ください。" },
      { q: "定員10名とはどういう意味ですか？", a: "一人ひとりに丁寧に向き合うため、同時受け入れ人数を10名に制限しています。定員に達している場合はキャンセル待ちのご案内になる場合があります。" },
      { q: "いつでも退会できますか？", a: "プログラムは月額制で、1ヶ月単位での継続です。翌月の更新前にご連絡いただければ、いつでも退会できます。" },
      { q: "完全オンラインですか？", a: "はい、診察・面談・相談・処方・配送まですべてオンラインで完結します。来院の必要はありません。" },
    ],
  },
  {
    category: "料金・支払いについて",
    items: [
      { q: "月額198,000円に含まれるものは？", a: "医師の初回診察・月2回の定期診察、週1回のカウンセラー面談、毎日のLINEフォロー、24時間相談対応が含まれます。薬代・配送料は別途となります。" },
      { q: "薬代はどれくらいかかりますか？", a: "使用する製剤・用量により異なります。マンジャロ（チルゼパチド）の場合、月あたりの目安は約30,000〜60,000円です。詳細はプランページをご確認ください。" },
      { q: "健康保険は使えますか？", a: "本サービスは自由診療のため、健康保険は適用されません。全額自己負担となります。" },
      { q: "支払い方法は？", a: "クレジットカード払いに対応しています。詳細は相談時にご案内します。" },
    ],
  },
  {
    category: "薬・治療について",
    items: [
      { q: "マンジャロとはどんな薬ですか？", a: "チルゼパチドを有効成分とするGIP/GLP-1デュアル受容体作動薬です。週1回の自己注射で、食欲抑制・血糖コントロールに作用します。処方は医師の判断のもとに行います。" },
      { q: "注射が苦手でも大丈夫ですか？", a: "注射が難しい方には経口薬（リベルサス等）をご提案する場合があります。医師の診察時にご相談ください。" },
      { q: "副作用はありますか？", a: "悪心・嘔吐・下痢・便秘などの消化器症状が現れる場合があります。通常は投与開始直後に多く、時間とともに軽減することが一般的です。気になる症状はすぐにLINEでご連絡ください。" },
      { q: "効果はいつ頃から感じられますか？", a: "個人差がありますので、特定の時期や結果についてお伝えすることはできません。医師とカウンセラーが継続的にサポートし、経過をともに確認していきます。" },
    ],
  },
  {
    category: "サポート・フォローについて",
    items: [
      { q: "カウンセラーはどんな人ですか？", a: "女性カウンセラーが担当します。食事管理・体重管理を中心に、週1回のオンライン面談で生活習慣の改善をサポートします。" },
      { q: "毎日LINEで報告するのは大変ですか？", a: "専用の報告フォーマットをご用意していますので、体重・食事・薬の3項目を入力するだけです。慣れると1〜2分で完了します。" },
      { q: "仕事で忙しくても続けられますか？", a: "診察・面談はオンラインで、隙間時間に対応可能です。毎日の報告もスマートフォンから短時間で完了します。忙しい方こそ、プロにサポートを任せることをお勧めします。" },
    ],
  },
]

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-clinic-black">
      <div className="border-b border-clinic-gray-light pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.5em] text-clinic-gold mb-4 font-sans">FAQ</p>
          <div className="w-8 h-px bg-clinic-gold mx-auto mb-6" />
          <h1 className="font-serif font-light text-3xl md:text-4xl tracking-[0.2em] text-clinic-offwhite">
            よくある質問
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-20 md:py-28 space-y-16">
        {faqs.map((section) => (
          <section key={section.category}>
            <p className="text-[9px] tracking-[0.4em] text-clinic-gold mb-2 font-sans">CATEGORY</p>
            <h2 className="font-serif font-light text-lg tracking-[0.2em] text-clinic-offwhite mb-8 border-b border-clinic-gray-light pb-4">
              {section.category}
            </h2>
            <div className="space-y-0">
              {section.items.map((item, i) => (
                <div key={i} className="border-b border-clinic-gray-light py-7 last:border-b-0">
                  <div className="flex gap-4 mb-3">
                    <span className="font-serif text-clinic-gold text-sm flex-shrink-0 mt-0.5">Q.</span>
                    <p className="text-sm text-clinic-offwhite tracking-wide font-medium leading-relaxed">{item.q}</p>
                  </div>
                  <div className="flex gap-4">
                    <span className="font-serif text-clinic-offwhite/30 text-sm flex-shrink-0 mt-0.5">A.</span>
                    <p className="text-sm text-clinic-offwhite/70 leading-relaxed tracking-wide">{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <div className="text-center pt-4">
          <p className="text-xs text-clinic-offwhite/55 tracking-wide mb-8 leading-relaxed">
            他にご不明な点はLINEでお気軽にご相談ください。
          </p>
          <Link
            href="/reservation"
            className="inline-flex items-center gap-3 bg-clinic-gold text-white px-12 py-4 text-xs tracking-[0.2em] font-sans hover:opacity-85 transition-opacity"
          >
            LINEで無料相談 →
          </Link>
        </div>
      </div>
    </div>
  )
}
