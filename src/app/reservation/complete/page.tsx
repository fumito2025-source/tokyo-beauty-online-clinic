import Link from "next/link"

export default function ReservationCompletePage() {
  return (
    <main className="min-h-screen bg-clinic-black flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">

        {/* チェックマーク */}
        <div className="relative mb-12">
          <div className="w-20 h-20 border border-clinic-gold/30 rounded-full flex items-center justify-center mx-auto">
            <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
              <path d="M7 16l6 6 12-12" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 border border-clinic-gold/10 rounded-full" />
        </div>

        <p className="text-[10px] tracking-[0.5em] text-clinic-gold/60 mb-4 font-sans">RESERVATION COMPLETE</p>
        <div className="w-8 h-px bg-clinic-gold/40 mx-auto mb-8" />
        <h1 className="font-serif font-light text-2xl md:text-3xl tracking-[0.15em] text-clinic-offwhite mb-6">
          ご予約ありがとうございます
        </h1>

        <div className="border border-clinic-gold/15 p-8 mb-10 text-left space-y-4">
          <p className="text-sm text-clinic-offwhite/60 leading-relaxed tracking-wide">
            問診票の内容を確認の上、担当医より順次ご連絡いたします。
          </p>
          <div className="w-full h-px bg-clinic-gold/10" />
          <div className="space-y-3">
            {[
              "LINEにご予約確認メッセージをお送りしました",
              "診察時間になりましたらLINEよりご連絡します",
              "ご不明な点はLINEチャットよりお気軽にどうぞ",
            ].map((text) => (
              <p key={text} className="text-xs text-clinic-offwhite/45 tracking-wide flex items-start gap-2">
                <span className="text-clinic-gold/50 mt-0.5 flex-shrink-0">—</span>
                {text}
              </p>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center border border-clinic-gold/30 text-clinic-gold/70 hover:border-clinic-gold hover:text-clinic-gold px-8 py-3 text-xs tracking-[0.3em] font-sans transition-colors"
          >
            トップページへ
          </Link>
          <Link
            href="/medication"
            className="inline-flex items-center justify-center border border-clinic-gold/30 text-clinic-gold/70 hover:border-clinic-gold hover:text-clinic-gold px-8 py-3 text-xs tracking-[0.3em] font-sans transition-colors"
          >
            薬の説明を見る
          </Link>
        </div>

      </div>
    </main>
  )
}
