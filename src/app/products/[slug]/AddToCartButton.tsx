"use client"
import { useState } from "react"
import { useCart } from "@/lib/store/cart"
import type { Product } from "@/types"
import { useRouter } from "next/navigation"

export function AddToCartButton({ product }: { product: Product }) {
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const addItem = useCart((s) => s.addItem)
  const router = useRouter()

  const handleAdd = () => {
    addItem(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (product.category === "consultation") {
    return (
      <button
        onClick={() => router.push("/account/consultation")}
        className="w-full btn-primary py-4 text-base"
      >
        診療を予約する
      </button>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-stone-600">数量</span>
        <div className="flex items-center border border-stone-300">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="px-3 py-2 text-stone-600 hover:bg-stone-50"
          >
            −
          </button>
          <span className="px-4 py-2 text-stone-800">{qty}</span>
          <button
            onClick={() => setQty(qty + 1)}
            className="px-3 py-2 text-stone-600 hover:bg-stone-50"
          >
            ＋
          </button>
        </div>
      </div>

      <button
        onClick={handleAdd}
        className={`w-full py-4 text-base tracking-widest transition-all ${
          added
            ? "bg-green-700 text-white"
            : "btn-primary"
        }`}
      >
        {added ? "✓ カートに追加しました" : "カートに追加する"}
      </button>
    </div>
  )
}
