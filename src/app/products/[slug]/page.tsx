import { createServerSupabaseClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import type { Product } from "@/types"
import { AddToCartButton } from "./AddToCartButton"

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single()

  if (!data) notFound()
  const product = data as Product

  const CATEGORY_LABELS = {
    consultation: "オンライン診療",
    prescription: "処方薬",
    supplement: "サプリメント",
    goods: "美容品・グッズ",
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* 画像 */}
        <div className="bg-stone-100 aspect-square flex items-center justify-center">
          {product.images?.[0] ? (
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-stone-400">画像なし</span>
          )}
        </div>

        {/* 詳細 */}
        <div>
          <div className="flex gap-2 mb-4">
            <span className="text-xs text-amber-700 border border-amber-300 px-2 py-0.5 tracking-wide">
              {CATEGORY_LABELS[product.category]}
            </span>
            {product.requires_consultation && (
              <span className="text-xs text-rose-600 border border-rose-300 px-2 py-0.5 tracking-wide">
                問診必須
              </span>
            )}
          </div>

          <h1 className="font-serif text-3xl text-stone-800 mb-4">{product.name}</h1>

          <p className="text-stone-500 leading-relaxed mb-6">
            {product.long_description || product.description}
          </p>

          <div className="border-t border-stone-200 pt-6 mb-8">
            <p className="text-3xl text-stone-800 font-medium">
              ¥{product.price.toLocaleString()}
              <span className="text-base text-stone-500 ml-2">（税込）</span>
            </p>
          </div>

          {product.requires_consultation && (
            <div className="bg-amber-50 border border-amber-200 p-4 mb-6 text-sm text-amber-800">
              ⚠️ この商品は医師の問診・診察が必要です。<br />
              購入前にオンライン診療をご予約ください。
            </div>
          )}

          <AddToCartButton product={product} />

          {/* タグ */}
          {product.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {product.tags.map((tag) => (
                <span key={tag} className="text-xs text-stone-500 bg-stone-100 px-3 py-1">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* 注意事項 */}
          <div className="mt-8 p-4 border border-stone-200 text-xs text-stone-500 space-y-1">
            <p>・本商品は自由診療です。保険は適用されません。</p>
            <p>・医薬品は法律に基づき適切に管理・販売しております。</p>
            <p>・返品・キャンセルについては利用規約をご確認ください。</p>
          </div>
        </div>
      </div>
    </div>
  )
}
