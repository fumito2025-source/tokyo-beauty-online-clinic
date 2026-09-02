import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"
import { replyLineMessage, textMessage } from "@/lib/line"
import { createHmac } from "crypto"

function verifySignature(body: string, signature: string): boolean {
  const secret = process.env.LINE_CHANNEL_SECRET ?? ""
  const hash = createHmac("sha256", secret).update(body).digest("base64")
  return hash === signature
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text()
  const signature = req.headers.get("x-line-signature") ?? ""

  const parsed = JSON.parse(rawBody)

  const body = parsed
  const events = body.events ?? []

  for (const event of events) {
    const userId = event.source?.userId
    if (!userId) continue

    // User IDをSupabaseに保存（存在しなければ追加）
    const supabase = createAdminClient()
    await supabase
      .from("line_users")
      .upsert({ line_user_id: userId, updated_at: new Date().toISOString() }, { onConflict: "line_user_id" })

    // フォローイベント（友だち追加）
    if (event.type === "follow") {
      await replyLineMessage(event.replyToken, [
        textMessage(
          "東京美容オンラインクリニックの公式LINEへようこそ！🌟\n\n下のメニューから予約・お問い合わせができます。\n\nご不明な点はこのチャットよりお気軽にどうぞ。"
        ),
      ])
    }

    // メッセージイベント（患者からのメッセージ）
    if (event.type === "message" && event.message?.type === "text") {
      const text: string = event.message.text ?? ""

      // 予約コマンド
      if (text.includes("予約")) {
        const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://tokyo-beauty-online-clinic.vercel.app"
        await replyLineMessage(event.replyToken, [
          textMessage(`ご予約はこちらから承ります。\n\n${siteUrl}/reservation\n\nご不明な点はこのチャットよりお問い合わせください。`),
        ])
      }
    }

    // 写真メッセージイベント（経過報告）
    if (event.type === "message" && event.message?.type === "image") {
      await replyLineMessage(event.replyToken, [
        textMessage("写真を受け取りました。担当医が確認後、ご連絡いたします。\n\n東京美容オンラインクリニック"),
      ])
    }
  }

  return NextResponse.json({ ok: true })
}
