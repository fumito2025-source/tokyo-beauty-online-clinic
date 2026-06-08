"use client"
import Link from "next/link"
import { useEffect } from "react"
import { useCart } from "@/lib/store/cart"

export default function CheckoutSuccessPage() {
  const clearCart = useCart((s) => s.clearCart)

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="text-5xl mb-6">🎉</div>
      <h1 className="font-serif text-3xl text-stone-800 mb-4">ご注文ありがとうございます</h1>
      <p className="text-stone-500 mb-8 leading-relaxed">
        ご注文を受け付けました。<br />
        処方薬が含まれる場合は医師が内容を確認後、発送いたします。<br />
        通常1〜3営業日以内に発送いたします。
      </p>
      <div className="flex gap-4 justify-center">
        <Link href="/account" className="btn-primary">マイページへ</Link>
        <Link href="/products" className="btn-outline">お買い物を続ける</Link>
      </div>
    </div>
  )
}
