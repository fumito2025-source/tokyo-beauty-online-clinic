import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "プログラムの流れ | 東京美容オンラインクリニック",
  description: "医療ダイエットプログラムの開始から継続までの流れをご説明します。",
}

const STEPS = [
  {
    n: "01",
    title: "LINEで無料相談",
    desc: "公式LINEを友だち追加後、メニューから「無料相談」をお選びください。担当スタッフがプログラムの内容・料金・適応についてご説明します。",
    note: "友だち追加・相談は無料です",
  },
  {
    n: "02",
    title: "医師の初回診察",
    desc: "LINEビデオ通話またはチャットにて、担当医師が現在の体重・健康状態・既往歴・服薬状況を確認します。治療方針と使用する薬を決定します。",
    note: "所要時間：約15〜30分",
  },
  {
    n: "03",
    title: "プログラム開始・薬の配送",
    desc: "処方が確定後、薬を発送します（最短翌日）。プログラム開始日より毎日LINEフォロー、週1回のカウンセラー面談がスタートします。",
    note: "薬代は別途",
  },
  {
    n: "04",
    title: "毎日のLINE記録",
    desc: "専用フォーマットで体重・食事内容・薬の服用状況を毎日LINEで報告します。女性カウンセラーが確認し、週1回の面談で振り返りと次の目標を設定します。",
    note: "週1回・女性カウンセラーによる面談",
  },
  {
    n: "05",
    title: "医師の定期診察（2週間に1回）",
    desc: "同じ担当医師が体重推移・体調変化・副作用の有無を確認します。必要に応じて薬の用量調整や処方変更を行います。",
    note: "2週間に1回・担当医師が継続対応",
  },
  {
    n: "06",
    title: "継続・卒業",
    desc: "プログラムは月額制です。目標達成後の継続や、ご希望に応じた調整も担当医師と相談しながら進めます。卒業後も必要に応じて経過観察が可能です。",
    note: "1ヶ月単位で継続可能",
  },
]

const DAILY = [
  { time: "朝", action: "体重を計測してLINEで報告" },
  { time: "食事", action: "食事内容をLINE記録（写真可）" },
  { time: "薬", action: "処方薬の服用を記録" },
  { time: "週1回", action: "カウンセラーとオンライン面談（30分）" },
  { time: "2週に1回", action: "担当医師とオンライン診察（15〜30分）" },
]

export default function FlowPage() {
  return (
    <div className="min-h-screen bg-clinic-black">
      {/* ─── PAGE HEADER ─── */}
      <div className="border-b border-clinic-gray-light pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.5em] text-clinic-gold mb-4 font-sans">HOW IT WORKS</p>
          <div className="w-8 h-px bg-clinic-gold mx-auto mb-6" />
          <h1 className="font-serif font-light text-3xl md:text-4xl tracking-[0.2em] text-clinic-offwhite">
            プログラムの流れ
          </h1>
        </div>
      </div>

      {/* ─── STEPS ─── */}
      <div className="max-w-3xl mx-auto px-6 py-20 md:py-28">
        <div className="space-y-0">
          {STEPS.map((s, i) => (
            <div key={s.n} className="flex gap-8 pb-12 last:pb-0 relative">
              {i < STEPS.length - 1 && (
                <div className="absolute left-5 top-12 bottom-0 w-px bg-clinic-gold/20" />
              )}
              <div className="flex-shrink-0 w-10 h-10 border border-clinic-gold/50 flex items-center justify-center relative z-10 bg-clinic-black">
                <span className="font-serif text-[11px] text-clinic-gold tracking-wider">{s.n}</span>
              </div>
              <div className="flex-1 pt-1">
                <h3 className="font-serif text-base text-clinic-offwhite tracking-[0.15em] mb-3">{s.title}</h3>
                <p className="text-sm text-clinic-offwhite/70 leading-relaxed tracking-wide mb-3">{s.desc}</p>
                <span className="text-[11px] text-clinic-gold/70 tracking-[0.2em] font-sans">{s.note}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Daily rhythm */}
        <div className="mt-20 border-t border-clinic-gray-light pt-16">
          <p className="text-[10px] tracking-[0.5em] text-clinic-gold mb-4 font-sans text-center">DAILY ROUTINE</p>
          <div className="w-6 h-px bg-clinic-gold mx-auto mb-10" />
          <h2 className="font-serif font-light text-xl md:text-2xl tracking-[0.2em] text-clinic-offwhite text-center mb-10">
            プログラム中の1日の流れ
          </h2>
          <div className="space-y-px bg-clinic-gray-light">
            {DAILY.map((d) => (
              <div key={d.time} className="flex items-center gap-6 px-8 py-5 bg-clinic-gray-mid">
                <span className="text-xs text-clinic-gold tracking-[0.3em] font-sans w-16 flex-shrink-0">{d.time}</span>
                <span className="text-sm text-clinic-offwhite/80 tracking-wide">{d.action}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
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
