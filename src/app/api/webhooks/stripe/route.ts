import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createAdminClient } from "@/lib/supabase/server"

export const runtime = "nodejs"

async function notifyAdmin(message: string) {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN
  const userId = process.env.ADMIN_LINE_USER_ID
  if (!token || !userId) return

  await fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      to: userId,
      messages: [{ type: "text", text: message }],
    }),
  })
}

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: "Webhook検証失敗" }, { status: 400 })
  }

  const supabase = createAdminClient()

  // サブスクリプション決済完了
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    if (session.mode !== "subscription") return NextResponse.json({ received: true })

    const metadata = session.metadata ?? {}

    await supabase.from("subscriptions").upsert({
      stripe_session_id: session.id,
      stripe_subscription_id: session.subscription as string,
      stripe_customer_id: session.customer as string,
      user_id: metadata.user_id,
      plan_id: metadata.plan_id,
      plan_name: metadata.plan_name,
      status: "pending_review", // 医師確認待ち
      amount: session.amount_total ?? 0,
      created_at: new Date().toISOString(),
    })

    await notifyAdmin(
      `🆕 新規サブスクリプション申込\n` +
        `プラン: ${metadata.plan_name ?? metadata.plan_id}\n` +
        `金額: ¥${(session.amount_total ?? 0).toLocaleString()}/月\n` +
        `ユーザーID: ${metadata.user_id}\n` +
        `セッション: ${session.id}\n\n` +
        `→ 医師確認後に発送処理を行ってください`
    )
  }

  // サブスクリプション更新（毎月の請求成功）
  if (event.type === "invoice.payment_succeeded") {
    const invoice = event.data.object as Stripe.Invoice
    if (!invoice.subscription) return NextResponse.json({ received: true })

    await supabase
      .from("subscriptions")
      .update({ status: "active", last_paid_at: new Date().toISOString() })
      .eq("stripe_subscription_id", invoice.subscription as string)
  }

  // サブスクリプションキャンセル
  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object as Stripe.Subscription
    await supabase
      .from("subscriptions")
      .update({ status: "cancelled", cancelled_at: new Date().toISOString() })
      .eq("stripe_subscription_id", sub.id)

    await notifyAdmin(
      `❌ サブスクリプションキャンセル\n` +
        `プラン: ${sub.metadata?.plan_name ?? sub.metadata?.plan_id}\n` +
        `Subscription ID: ${sub.id}`
    )
  }

  return NextResponse.json({ received: true })
}
