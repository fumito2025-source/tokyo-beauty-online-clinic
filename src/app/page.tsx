import Link from "next/link"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import type { Product } from "@/types"

async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .limit(6)
  return (data as Product[]) || []
}

export default async function HomePage() {
  const products = await getFeaturedProducts()

  return (
    <>
      {/* ヒーローセクション */}
      <section className="bg-clinic-black py-32 md:py-52 relative overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-clinic-gold/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-clinic-gold/5" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative">
          <p className="text-xs tracking-[0.5em] text-clinic-gold mb-8 font-serif">TOKYO BEAUTY ONLINE CLINIC</p>
          <div className="w-8 h-px bg-clinic-gold mx-auto mb-10" />
          <h1 className="font-serif text-4xl md:text-6xl text-clinic-offwhite leading-tight mb-10 tracking-wider">
            あなたの美しさを<br />医師がオンラインでサポート
          </h1>
          <p className="text-clinic-offwhite/50 text-base md:text-lg max-w-2xl mx-auto mb-16 leading-loose tracking-wide">
            自由診療専門のオンラインクリニック。<br className="hidden md:block" />
            美白・AGA・美容サプリまで、全てスマートフォンで完結します。
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/reservation" className="btn-primary">
              ご予約・問診票はこちら
            </Link>
            <Link href="/products" className="btn-outline">
              商品・サービスを見る
            </Link>
          </div>
        </div>
      </section>

      {/* 特徴 */}
      <section className="py-28 bg-clinic-gray-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-clinic-gold/15">
            {[
              {
                icon: "✦",
                title: "医師が直接対応",
                desc: "全て医師が診察・処方します。看護師やAIへの丸投げはありません。",
              },
              {
                icon: "✦",
                title: "完全オンライン",
                desc: "診察からお薬の受け取りまで全てオンラインで完結。通院不要です。",
              },
              {
                icon: "✦",
                title: "プライバシー配慮",
                desc: "個人情報は暗号化して厳重に管理。処方内容は医師のみが確認します。",
              },
            ].map((item) => (
              <div key={item.title} className="text-center px-12 py-16">
                <div className="text-clinic-gold text-xl mb-6 tracking-widest">{item.icon}</div>
                <h3 className="font-serif text-lg text-clinic-offwhite mb-4 tracking-wider">{item.title}</h3>
                <p className="text-clinic-offwhite/40 text-sm leading-loose">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 商品一覧 */}
      <section className="py-28 bg-clinic-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-clinic-gold text-xs tracking-[0.5em] mb-4">PRODUCTS & SERVICES</p>
            <div className="w-8 h-px bg-clinic-gold mx-auto mb-6" />
            <h2 className="section-title">サービス・商品一覧</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-clinic-gold/10">
            {products.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`}>
                <div className="bg-clinic-black p-10 card-hover h-full border border-transparent transition-all duration-300 hover:border-clinic-gold/30">
                  {/* カテゴリバッジ */}
                  <span className="inline-block text-xs text-clinic-gold border border-clinic-gold/40 px-3 py-1 mb-6 tracking-widest">
                    {product.category === "consultation" && "オンライン診療"}
                    {product.category === "prescription" && "処方薬"}
                    {product.category === "supplement" && "サプリメント"}
                    {product.category === "goods" && "美容品"}
                  </span>

                  {product.requires_consultation && (
                    <span className="ml-2 inline-block text-xs text-clinic-offwhite/40 border border-clinic-offwhite/20 px-3 py-1 mb-6 tracking-widest">
                      問診必須
                    </span>
                  )}

                  <h3 className="font-serif text-lg text-clinic-offwhite mb-4 tracking-wide">{product.name}</h3>
                  <p className="text-clinic-offwhite/35 text-sm leading-loose mb-8 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto border-t border-clinic-gold/10 pt-6">
                    <span className="text-clinic-offwhite font-serif">
                      ¥{product.price.toLocaleString()}
                      <span className="text-xs text-clinic-offwhite/30 ml-1">（税込）</span>
                    </span>
                    <span className="text-xs text-clinic-gold tracking-widest">詳細 →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/products" className="btn-outline">
              全ての商品・サービスを見る
            </Link>
          </div>
        </div>
      </section>

      {/* 診療の流れ */}
      <section className="py-28 bg-clinic-gray-dark">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-clinic-gold text-xs tracking-[0.5em] mb-4">HOW IT WORKS</p>
            <div className="w-8 h-px bg-clinic-gold mx-auto mb-6" />
            <h2 className="section-title">ご利用の流れ</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* 連結ライン */}
            <div className="hidden md:block absolute top-6 left-[calc(12.5%+16px)] right-[calc(12.5%+16px)] h-px bg-clinic-gold/20" />

            {[
              { step: "01", title: "会員登録", desc: "メールアドレスで簡単登録。1分で完了します。" },
              { step: "02", title: "問診・診療予約", desc: "お悩みや症状を入力し、診療を申し込みます。" },
              { step: "03", title: "オンライン診察", desc: "医師がビデオまたはチャットで診察します。" },
              { step: "04", title: "商品・処方薬を受取", desc: "承認後、自宅に発送されます。" },
            ].map((item) => (
              <div key={item.step} className="text-center relative">
                <div className="w-12 h-12 border border-clinic-gold/40 flex items-center justify-center mx-auto mb-6 bg-clinic-gray-dark">
                  <span className="font-serif text-sm text-clinic-gold">{item.step}</span>
                </div>
                <h3 className="text-clinic-offwhite font-serif text-sm mb-3 tracking-wider">{item.title}</h3>
                <p className="text-clinic-offwhite/35 text-xs leading-loose">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-clinic-black border-t border-clinic-gold/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-clinic-gold text-xs tracking-[0.5em] mb-4">GET STARTED</p>
          <div className="w-8 h-px bg-clinic-gold mx-auto mb-8" />
          <h2 className="font-serif text-3xl text-clinic-offwhite mb-6 tracking-wider">まずは会員登録から</h2>
          <p className="text-clinic-offwhite/40 mb-12 leading-loose text-sm tracking-wide">
            登録無料。診療・購入はいつでもキャンセル可能です。
          </p>
          <Link href="/account/signup" className="btn-primary">
            無料で会員登録する
          </Link>
        </div>
      </section>
    </>
  )
}
