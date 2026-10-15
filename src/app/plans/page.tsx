import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "プログラム・料金 | 東京美容オンラインクリニック",
  description: "東京美容オンラインクリニックの医療ダイエットプログラムの内容と料金をご案内します。",
}

const INCLUDES = [
  { label: "医師の初回診察", detail: "現在の体重・健康状態・服薬歴を確認し、治療方針を決定します。" },
  { label: "医師の定期診察（月2回）", detail: "2週間に1回、同じ医師が経過を確認。薬の用量調整も行います。" },
  { label: "女性カウンセラーによる週1回面談", detail: "食事内容・体重推移・生活習慣をもとに次週の目標を設定します。" },
  { label: "毎日LINEフォロー", detail: "専用フォーマットで体重・食事・薬を毎日記録。カウンセラーが確認します。" },
  { label: "医療用痩身薬の処方・配送", detail: "マンジャロ（チルゼパチド）等、医師の判断により処方。薬代は別途。" },
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

        {/* Price card */}
        <div className="border border-clinic-gold/50 bg-clinic-gray-dark p-10 md:p-14 mb-14">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <p className="text-[10px] tracking-[0.5em] text-clinic-gold mb-3 font-sans">MONTHLY PROGRAM</p>
              <h2 className="font-serif font-light text-2xl tracking-[0.15em] text-clinic-offwhite mb-2">
                医療ダイエット月額プログラム
              </h2>
              <p className="text-xs text-clinic-offwhite/60 tracking-wide">月額制（1ヶ月単位で継続）</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] tracking-[0.3em] text-clinic-gold/70 font-sans mb-1">月額（税込）</p>
              <p className="font-serif text-4xl md:text-5xl text-clinic-offwhite tracking-tight">¥198,000</p>
              <p className="text-xs text-clinic-offwhite/50 mt-1 tracking-wide">※ 薬代・配送料は別途</p>
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

        {/* Drug cost note */}
        <div className="border border-clinic-gray-light bg-clinic-gray-mid p-8 mb-14">
          <p className="text-[10px] tracking-[0.4em] text-clinic-gold mb-4 font-sans">MEDICATION COST</p>
          <p className="text-sm text-clinic-offwhite/80 leading-relaxed tracking-wide">
            薬代は使用する製剤・用量により異なります。代表的な目安は以下の通りです（税込・1ヶ月あたり）。<br />
            実際の処方内容は医師の診察後に決定します。
          </p>
          <div className="mt-5 space-y-2">
            {[
              ["マンジャロ®（チルゼパチド）", "約 ¥30,000〜¥60,000"],
              ["リベルサス®（セマグルチド経口）", "約 ¥15,000〜¥25,000"],
              ["その他補助薬（サプリ等）", "任意追加"],
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
