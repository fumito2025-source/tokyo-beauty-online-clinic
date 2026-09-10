import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

  try {
    const supabase = await createServerSupabaseClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { priceId, addonPriceIds = [], planId, planName } = await req.json()

    if (!priceId) {
      return NextResponse.json({ error: "プランを選択してください" }, { status: 400 })
    }

    // サブスクリプションラインアイテム（メインプラン + アドオン）
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      { price: priceId, quantity: 1 },
      ...addonPriceIds.map((id: string) => ({ price: id, quantity: 1 })),
    ]

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "https://tokyo-beauty-online-clinic.vercel.app"}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "https://tokyo-beauty-online-clinic.vercel.app"}/plans`,
      locale: "ja",
      ...(user?.email ? { customer_email: user.email } : {}),
      metadata: {
        user_id: user?.id ?? "guest",
        plan_id: planId,
        plan_name: planName,
        addon_price_ids: JSON.stringify(addonPriceIds),
      },
      subscription_data: {
        metadata: {
          user_id: user?.id ?? "guest",
          plan_id: planId,
          plan_name: planName,
        },
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error("Checkout error:", error)
    return NextResponse.json({ error: "チェックアウトに失敗しました" }, { status: 500 })
  }
}
