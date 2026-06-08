import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createServerSupabaseClient } from "@/lib/supabase/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "ログインが必要です" }, { status: 401 })
    }

    const { items, shippingAddress } = await req.json()

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "カートが空です" }, { status: 400 })
    }

    // 商品の検証
    const productIds = items.map((i: any) => i.productId)
    const { data: products } = await supabase
      .from("products")
      .select("*")
      .in("id", productIds)
      .eq("is_active", true)

    if (!products || products.length !== productIds.length) {
      return NextResponse.json({ error: "商品が見つかりません" }, { status: 400 })
    }

    // 処方薬が含まれる場合は問診確認
    const requiresConsultation = products.some((p) => p.requires_consultation)
    if (requiresConsultation) {
      // 完了済みの問診があるか確認
      const { data: consultations } = await supabase
        .from("consultations")
        .select("id")
        .eq("user_id", user.id)
        .eq("status", "completed")
        .limit(1)

      if (!consultations || consultations.length === 0) {
        return NextResponse.json(
          { error: "処方薬を購入するには問診が必要です", requiresConsultation: true },
          { status: 400 }
        )
      }
    }

    // Stripe Checkout セッション作成
    const lineItems = items.map((item: any) => {
      const product = products.find((p) => p.id === item.productId)!
      return {
        price_data: {
          currency: "jpy",
          product_data: {
            name: product.name,
            description: product.description || undefined,
            images: product.images?.[0] ? [product.images[0]] : undefined,
          },
          unit_amount: product.price,
        },
        quantity: item.quantity,
      }
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
      customer_email: user.email,
      locale: "ja",
      metadata: {
        user_id: user.id,
        items: JSON.stringify(items),
        shipping_address: JSON.stringify(shippingAddress),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error("Checkout error:", error)
    return NextResponse.json(
      { error: "チェックアウトに失敗しました" },
      { status: 500 }
    )
  }
}
