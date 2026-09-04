import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "プライバシーポリシー | 東京美容オンラインクリニック",
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-clinic-black text-clinic-offwhite">
      <section className="relative py-24 border-b border-clinic-gold/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_800px_400px_at_50%_0%,rgba(201,168,76,0.06),transparent)]" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.4em] text-clinic-gold/60 mb-6 font-sans uppercase">Privacy Policy</p>
          <h1 className="font-serif font-light text-4xl tracking-[0.15em] mb-4">プライバシーポリシー</h1>
          <div className="w-12 h-px bg-clinic-gold/40 mx-auto" />
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="prose prose-sm max-w-none space-y-12 text-clinic-offwhite/70 leading-relaxed tracking-wide text-sm">

          <div>
            <p>
              林 清文（以下「当クリニック」）は、お客様の個人情報の保護を重要な責務と考え、個人情報の保護に関する法律（個人情報保護法）およびその他関連法令を遵守し、以下のとおりプライバシーポリシーを定めます。
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif font-light text-lg tracking-[0.2em] text-clinic-offwhite border-b border-clinic-gold/20 pb-3">
              1. 収集する個人情報
            </h2>
            <p>当クリニックは、以下の個人情報を収集することがあります。</p>
            <ul className="list-none space-y-2 pl-4">
              {[
                "氏名、生年月日、性別",
                "住所、電話番号、メールアドレス",
                "LINEのユーザーID",
                "問診情報、症状・経過に関する情報",
                "クレジットカード情報（決済代行会社を通じて処理し、当クリニックでは保持しません）",
                "その他、診療に必要な情報",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-clinic-gold/40 mt-1">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif font-light text-lg tracking-[0.2em] text-clinic-offwhite border-b border-clinic-gold/20 pb-3">
              2. 個人情報の利用目的
            </h2>
            <ul className="list-none space-y-2 pl-4">
              {[
                "オンライン診療・処方サービスの提供",
                "薬剤の発送・お届け",
                "診療に関するご連絡・ご返信",
                "ご予約・お問い合わせへの対応",
                "サービス改善および新サービスの開発",
                "法令に基づく対応",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-clinic-gold/40 mt-1">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif font-light text-lg tracking-[0.2em] text-clinic-offwhite border-b border-clinic-gold/20 pb-3">
              3. 第三者提供
            </h2>
            <p>
              当クリニックは、以下の場合を除き、お客様の個人情報を第三者に提供しません。
            </p>
            <ul className="list-none space-y-2 pl-4">
              {[
                "お客様本人の同意がある場合",
                "法令に基づく開示が必要な場合",
                "人の生命・身体・財産の保護のために必要な場合",
                "業務委託先（配送会社・決済代行会社等）に必要な範囲で提供する場合",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-clinic-gold/40 mt-1">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif font-light text-lg tracking-[0.2em] text-clinic-offwhite border-b border-clinic-gold/20 pb-3">
              4. 個人情報の管理
            </h2>
            <p>
              当クリニックは、個人情報への不正アクセス、紛失、改ざん、漏洩等を防ぐため、適切なセキュリティ対策を講じます。個人情報は、利用目的の達成に必要な期間保管し、その後速やかに廃棄します。
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif font-light text-lg tracking-[0.2em] text-clinic-offwhite border-b border-clinic-gold/20 pb-3">
              5. 開示・訂正・削除のご請求
            </h2>
            <p>
              お客様ご自身の個人情報について、開示・訂正・利用停止・削除のご請求は、下記お問い合わせ先までご連絡ください。ご本人確認の上、合理的な期間内に対応いたします。
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif font-light text-lg tracking-[0.2em] text-clinic-offwhite border-b border-clinic-gold/20 pb-3">
              6. Cookie・アクセス解析について
            </h2>
            <p>
              当クリニックのウェブサイトでは、サービス改善のためCookieおよびアクセス解析ツールを使用する場合があります。これらはお客様個人を特定するものではありません。ブラウザの設定によりCookieを無効にすることができますが、一部機能が利用できなくなる場合があります。
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif font-light text-lg tracking-[0.2em] text-clinic-offwhite border-b border-clinic-gold/20 pb-3">
              7. プライバシーポリシーの変更
            </h2>
            <p>
              本ポリシーは、法令の改正やサービス内容の変更に応じて改定する場合があります。重要な変更がある場合はウェブサイト上でお知らせします。
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif font-light text-lg tracking-[0.2em] text-clinic-offwhite border-b border-clinic-gold/20 pb-3">
              8. お問い合わせ
            </h2>
            <div className="space-y-1 pl-4">
              <p>東京美容オンラインクリニック</p>
              <p>運営者：林 清文</p>
              <p>所在地：愛知県名古屋市中川区愛知町2-22</p>
              <p>メール：tokyobeautyonlineclinic@gmail.com</p>
            </div>
          </div>

          <p className="text-clinic-offwhite/30 text-xs pt-8 border-t border-clinic-gold/10">
            制定日：2025年1月　最終改定日：2025年1月
          </p>
        </div>
      </section>
    </main>
  )
}
