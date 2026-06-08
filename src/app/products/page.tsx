import { createServerSupabaseClient } from "@/lib/supabase/server"
import Link from "next/link"
import type { Product, ProductCategory } from "@/types"

const CATEGORIES: { value: ProductCategory | "all"; label: string }[] = [
  { value: "all", label: "すべて" },
  { value: "consultation", label: "オンライン診療" },
  { value: "prescription", label: "処方薬" },
  { value: "supplement", label: "サプリメント" },
  { value: "goods", label: "美容品・グッズ" },
]

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  consultation: "オンライン診療",
  prescription: "処方薬",
  supplement: "サプリメント",
  goods: "美容品・グッズ",
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const supabase = await createServerSupabaseClient()

  let query = supabase.from("products").select("*").eq("is_active", true).order("created_at")
  if (category && category !== "all") {
    query = query.eq("category", category)
  }
  const { data } = await query
  const products = (data as Product[]) || []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <h1 className="section-title mb-2">商品・サービス一覧</h1>
        <p className="text-stone-500 text-sm tracking-widest">PRODUCTS & SERVICES</p>
      </div>

      {/* カテゴリフィルター */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.value}
            href={cat.value === "all" ? "/products" : `/products?category=${cat.value}`}
            className={`px-4 py-2 text-sm tracking-wide border transition-colors ${
              (cat.value === "all" && !category) || cat.value === category
                ? "bg-stone-800 text-white border-stone-800"
                : "border-stone-300 text-stone-600 hover:border-stone-600"
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      {/* 処方薬の注意書き */}
      {(category === "prescription" || !category) && (
        <div className="bg-amber-50 border border-amber-200 p-4 mb-8 text-sm text-amber-800">
          ⚠️ 処方薬は医師の問診・診察が必要です。購入時に問診が完了していない場合、医師が処方を行えない場合があります。
        </div>
      )}

      {products.length === 0 ? (
        <div className="text-center py-20 text-stone-400">
          <p>この条件の商品はまだありません。</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`}>
              <div className="bg-white border border-stone-200 p-6 card-hover h-full flex flex-col">
                {/* 画像プレースホルダー */}
                <div className="bg-stone-100 h-48 mb-4 flex items-center justify-center">
                  {product.images?.[0] ? (
                    <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-stone-400 text-sm">画像なし</span>
                  )}
                </div>

                <div className="flex gap-2 mb-3 flex-wrap">
                  <span className="text-xs text-amber-700 border border-amber-300 px-2 py-0.5 tracking-wide">
                    {CATEGORY_LABELS[product.category]}
                  </span>
                  {product.requires_consultation && (
                    <span className="text-xs text-rose-600 border border-rose-300 px-2 py-0.5 tracking-wide">
                      問診必須
                    </span>
                  )}
                </div>

                <h2 className="font-serif text-lg text-stone-800 mb-2">{product.name}</h2>
                <p className="text-stone-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-stone-800 font-medium">
                    ¥{product.price.toLocaleString()}
                    <span className="text-xs text-stone-500 ml-1">（税込）</span>
                  </span>
                  <span className="text-xs text-stone-400 tracking-widest">詳細 →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
