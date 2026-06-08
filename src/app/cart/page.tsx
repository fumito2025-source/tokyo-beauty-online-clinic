"use client"
import { useCart } from "@/lib/store/cart"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const cartItems = items.map((i) => ({ productId: i.product.id, quantity: i.quantity }))
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems }),
      })
      const data = await res.json()

      if (data.requiresConsultation) {
        alert("処方薬が含まれています。先に問診をお申し込みください。")
        router.push("/account/consultation")
        return
      }
      if (data.error === "ログインが必要です") {
        router.push("/account/login?redirect=/cart")
        return
      }
      if (data.url) {
        window.location.href = data.url
      }
    } catch {
      alert("エラーが発生しました。")
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <p className="font-serif text-2xl text-stone-600 mb-8">カートは空です</p>
        <Link href="/products" className="btn-primary">商品を見る</Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="section-title mb-10">カート</h1>

      <div className="space-y-4 mb-10">
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="bg-white border border-stone-200 p-6 flex gap-4 items-start">
            <div className="bg-stone-100 w-20 h-20 flex-shrink-0 flex items-center justify-center">
              {product.images?.[0] ? (
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-stone-400 text-xs">画像なし</span>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-stone-800 mb-1">{product.name}</h3>
              <p className="text-stone-500 text-sm mb-3">¥{product.price.toLocaleString()}（税込）</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-stone-300">
                  <button onClick={() => updateQuantity(product.id, quantity - 1)} className="px-2 py-1 text-stone-600 hover:bg-stone-50 text-sm">−</button>
                  <span className="px-3 py-1 text-sm">{quantity}</span>
                  <button onClick={() => updateQuantity(product.id, quantity + 1)} className="px-2 py-1 text-stone-600 hover:bg-stone-50 text-sm">＋</button>
                </div>
                <button onClick={() => removeItem(product.id)} className="text-xs text-stone-400 hover:text-red-500 transition-colors">削除</button>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-stone-800">¥{(product.price * quantity).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-stone-100 p-6">
        <div className="flex justify-between items-center mb-2 text-sm text-stone-600">
          <span>小計</span>
          <span>¥{total().toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center mb-2 text-sm text-stone-600">
          <span>送料</span>
          <span className="text-stone-400">別途計算</span>
        </div>
        <div className="border-t border-stone-300 mt-4 pt-4 flex justify-between items-center">
          <span className="font-medium text-stone-800">合計（税込）</span>
          <span className="text-2xl font-medium text-stone-800">¥{total().toLocaleString()}</span>
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full btn-primary py-4 mt-6 text-base disabled:opacity-50"
        >
          {loading ? "処理中..." : "購入手続きへ（Stripe決済）"}
        </button>

        <p className="text-xs text-stone-500 text-center mt-3">
          決済はStripeによる安全な処理で行われます
        </p>
      </div>
    </div>
  )
}
