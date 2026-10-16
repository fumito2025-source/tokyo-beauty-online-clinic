import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "プログラム・料金 | 東京美容オンラインクリニック",
  description: "東京美容オンラインクリニックの医療ダイエットプログラムの内容と料金をご案内します。",
}

const INCLUDES = [
  { label: "カウンセリング面談（初回）", detail: "生活習慣・目標・お悩みをじっくりヒアリング。プログラム内容をご説明します。" },
  { label: "医師の初回診察", detail: "体重・健康状態・服薬歴を確認し、個人目標BMIと治療方針を決定します。" },
  { label: "医師の定期診察（月2回）", detail: "2週間に1回、同じ医師が経過を確認。薬の用量調整も行います。" },
  { label: "女性カウンセラーによる週1回面談", detail: "食事内容・体重推移・生活習慣をもとに次週の目標を設定します。" },
  { label: "毎日LINEフォロー", detail: "専用フォーマットで体重・食事・薬を毎日記録。カウンセラーが確認します。" },
  { label: "医療用製剤の処方・配送（薬代込み）", detail: "マンジャロ・リベルサス・補助薬など、医師の判断により処方。薬代・配送料込み。" },
  { label: "24時間LINEでの体調相談", detail: "急な体調変化や不安点はいつでもチャットでご連絡ください。" },
]

export default function PlansPage() {
  return (
    <div className="min-h-screen bg-clinic-black">
      {/* ─── PAGE HEADER ─── */}
      <div className="border-b border-clinic-gray-light pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.5em] text-clinic-gold mb-4 font-sans">PROGRAM & PRICE</p>
          <div className="w-8 h-px bg-clinic-gold mx-auto mb-6" />
          <h1 className="font-serif font-light text-3xl md:text-4xl tracking-[0.2em] text-clinic-offwhite">
            プログラムと料金
          </h1>
        </div>
      </div>

      {/* ─── MAIN PLAN ─── */}
      <div className="max-w-3xl mx-auto px-6 py-20 md:py-28">

        {/* Monitor price banner */}
        <div className="bg-clinic-gold/10 border border-clinic-gold/60 px-8 py-5 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <p className="text-[10px] tracking-[0.4em] text-clinic-gold font-sans mb-1">MONITOR PRICE — 現在受付中</p>
            <p className="text-sm text-clinic-offwhite/90 tracking-wide">モニター特別価格でご参加いただける方を若干名募集しています。</p>
          </div>
          <Link href="/reservation" className="flex-shrink-0 inline-flex items-center gap-2 bg-clinic-gold text-white px-6 py-2.5 text-xs tracking-[0.15em] font-sans hover:opacity-85 transition-opacity">
            LINEで相談する →
          </Link>
        </div>

        {/* Price card */}
        <div className="border border-clinic-gold/50 bg-clinic-gray-dark p-10 md:p-14 mb-14">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <p className="text-[10px] tracking-[0.5em] text-clinic-gold mb-3 font-sans">MONTHLY PROGRAM</p>
              <h2 className="font-serif font-light text-2xl tracking-[0.15em] text-clinic-offwhite mb-2">
                医療ダイエット月額プログラム
              </h2>
              <p className="text-xs text-clinic-offwhite/60 tracking-wide">月額制（1ヶ月単位で継続）・薬代・配送料込み</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] tracking-[0.3em] text-clinic-gold/70 font-sans mb-1">モニター価格（税込）</p>
              <p className="font-serif text-4xl md:text-5xl text-clinic-offwhite tracking-tight">¥99,000</p>
              <p className="text-xs text-clinic-offwhite/50 mt-1 tracking-wide line-through">通常 ¥198,000</p>
              <p className="text-[10px] text-clinic-gold/70 mt-1 tracking-wide">薬代・配送料込み</p>
            </div>
          </div>

          <div className="w-full h-px bg-clinic-gray-light mb-10" />

          {/* Includes */}
          <p className="text-[10px] tracking-[0.4em] text-clinic-gold mb-6 font-sans">INCLUDES</p>
          <ul className="space-y-5">
            {INCLUDES.map((item) => (
              <li key={item.label} className="flex gap-4">
                <span className="text-clinic-gold mt-0.5 flex-shrink-0 text-sm">✓</span>
                <div>
                  <p className="text-sm text-clinic-offwhite tracking-wide font-medium">{item.label}</p>
                  <p className="text-xs text-clinic-offwhite/60 mt-1 leading-relaxed tracking-wide">{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Medication included note */}
        <div className="border border-clinic-gray-light bg-clinic-gray-mid p-8 mb-14">
          <p className="text-[10px] tracking-[0.4em] text-clinic-gold mb-4 font-sans">INCLUDED MEDICATION</p>
          <p className="text-sm text-clinic-offwhite/80 leading-relaxed tracking-wide">
            月額には以下の医療用製剤の薬代・配送料が含まれます。<br />
            使用する製剤・用量は医師の診察後に決定します。
          </p>
          <div className="mt-5 space-y-2">
            {[
              ["マンジャロ®（チルゼパチド）", "月額に含む"],
              ["リベルサス®（セマグルチド経口）", "月額に含む"],
              ["大建中湯・便秘系補助薬", "月額に含む（必要時）"],
              ["体調不良時の追加内服", "月額に含む（医師判断）"],
            ].map(([name, price]) => (
              <div key={name} className="flex justify-between items-center border-b border-clinic-gray-light pb-2 last:border-0">
                <span className="text-xs text-clinic-offwhite/80 tracking-wide">{name}</span>
                <span className="text-xs text-clinic-gold tracking-wide">{price}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-clinic-offwhite/40 mt-4 leading-relaxed">
            ※ 薬価は仕入れ状況により変動することがあります。<br />
            ※ 効果には個人差があります。特定の結果を保証するものではありません。
          </p>
        </div>

        {/* Graduation & re-enrollment */}
        <div className="border border-clinic-gray-light bg-clinic-gray-mid p-8 mb-14 space-y-8">
          <div>
            <p className="text-[10px] tracking-[0.4em] text-clinic-gold mb-4 font-sans">PROGRAM COMPLETION</p>
            <h3 className="font-serif font-light text-base tracking-[0.15em] text-clinic-offwhite mb-3">プログラム卒業の基準</h3>
            <p className="text-sm text-clinic-offwhite/75 leading-relaxed tracking-wide">
              医師と相談して設定した個人目標BMIに達した時点で、プログラムを卒業となります。<br />
              なお、BMI 18.5以下は健康上の理由からプログラムを終了します。
            </p>
          </div>
          <div className="w-full h-px bg-clinic-gray-light" />
          <div>
            <p className="text-[10px] tracking-[0.4em] text-clinic-gold mb-4 font-sans">MONITOR PERIOD</p>
            <h3 className="font-serif font-light text-base tracking-[0.15em] text-clinic-offwhite mb-3">モニター価格について</h3>
            <p className="text-sm text-clinic-offwhite/75 leading-relaxed tracking-wide">
              モニター価格（¥99,000/月）は、ご契約日から<strong className="text-clinic-offwhite font-medium">3ヶ月間</strong>適用されます。<br />
              4ヶ月目以降は通常価格（¥198,000/月）となります。
            </p>
          </div>
          <div className="w-full h-px bg-clinic-gray-light" />
          <div>
            <p className="text-[10px] tracking-[0.4em] text-clinic-gold mb-4 font-sans">RE-ENROLLMENT</p>
            <h3 className="font-serif font-light text-base tracking-[0.15em] text-clinic-offwhite mb-3">卒業後のリバウンド対応</h3>
            <p className="text-sm text-clinic-offwhite/75 leading-relaxed tracking-wide">
              プログラム卒業後にリバウンドを感じた際は、いつでもLINEよりご連絡ください。<br />
              再入会は通常価格（¥198,000/月・薬代込み）でお受けします。
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-xs text-clinic-offwhite/60 tracking-wider mb-8 leading-relaxed">
            まずはLINEで無料相談をお申し込みください。<br />
            担当スタッフが詳しくご説明します。
          </p>
          <Link
            href="/reservation"
            className="inline-flex items-center gap-3 bg-clinic-gold text-white px-12 py-4 text-xs tracking-[0.2em] font-sans hover:opacity-85 transition-opacity"
          >
            LINEで無料相談 →
          </Link>
          <p className="text-[11px] text-clinic-offwhite/35 mt-6 tracking-wide">
            ※ 本サービスは自由診療のみです。健康保険は適用されません。
          </p>
        </div>
      </div>
    </div>
  )
}
