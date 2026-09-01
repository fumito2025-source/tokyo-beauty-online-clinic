import Link from "next/link"

export default function ReservationCompletePage() {
  return (
    <div className="min-h-screen bg-clinic-black flex items-center justify-center py-20">
      <div className="max-w-xl mx-auto px-4 text-center">
        <div className="w-16 h-16 border border-clinic-gold flex items-center justify-center mx-auto mb-8">
          <span className="text-clinic-gold text-2xl">✓</span>
        </div>
        <div className="w-8 h-px bg-clinic-gold mx-auto mb-8" />
        <h1 className="font-serif text-3xl text-clinic-offwhite tracking-wider mb-6">
          ご予約ありがとうございます
        </h1>
        <p className="text-clinic-offwhite/50 text-sm leading-loose mb-4">
          ご入力いただいたメールアドレスに確認メールをお送りしました。
        </p>
        <p className="text-clinic-offwhite/50 text-sm leading-loose mb-12">
          診察の前日と当日朝にリマインダーをお送りします。<br />
          ご不明な点はLINE公式アカウントよりお問い合わせください。
        </p>
        <Link href="/" className="border border-clinic-gold text-clinic-gold px-10 py-3 text-sm tracking-widest font-serif hover:bg-clinic-gold hover:text-clinic-black transition-all">
          トップページへ戻る
        </Link>
      </div>
    </div>
  )
}
