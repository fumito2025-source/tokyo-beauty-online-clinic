import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createAdminClient } from "@/lib/supabase/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    return NextResponse.json({ error: "Webhook検証失敗" }, { status: 400 })
  }

  const supabase = createAdminClient()

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    const metadata = session.metadata!

    // 注文を DB に保存
    const items = JSON.parse(metadata.items || "[]")
    const productIds = items.map((i: any) => i.productId)
    const { data: products } = await supabase
      .from("products")
      .select("id, name, price")
      .in("id", productIds)

    const orderItems = items.map((item: any) => {
      const product = products?.find((p) => p.id === item.productId)
      return {
        product_id: item.productId,
        product_name: product?.name || "",
        price: product?.price || 0,
        quantity: item.quantity,
      }
    })

    const subtotal = orderItems.reduce(
      (sum: number, i: any) => sum + i.price * i.quantity, 0
    )

    await supabase.from("orders").insert({
      user_id: metadata.user_id,
      stripe_session_id: session.id,
      stripe_payment_intent_id: session.payment_intent as string,
      status: "paid",
      items: orderItems,
      subtotal,
      tax: 0,
      total: session.amount_total || subtotal,
      shipping_address: metadata.shipping_address
        ? JSON.parse(metadata.shipping_address)
        : null,
    })
  }

  return NextResponse.json({ received: true })
}
