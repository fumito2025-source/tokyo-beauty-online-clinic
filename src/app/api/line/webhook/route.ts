import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"
import { replyLineMessage, textMessage } from "@/lib/line"

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()
    const parsed = JSON.parse(rawBody)
    const events = parsed.events ?? []

    for (const event of events) {
      const userId = event.source?.userId
      if (!userId) continue

      // フォローイベント（友だち追加）- リプライを最初に送る
      if (event.type === "follow") {
        await replyLineMessage(event.replyToken, [
          textMessage(
            "東京美容オンラインクリニックの公式LINEへようこそ！🌟\n\n下のメニューから予約・お問い合わせができます。\n\nご不明な点はこのチャットよりお気軽にどうぞ。"
          ),
        ])
      }

      // メッセージイベント
      if (event.type === "message" && event.message?.type === "text") {
        const text: string = event.message.text ?? ""
        if (text.includes("予約")) {
          await replyLineMessage(event.replyToken, [
            textMessage(`ご予約はこちらから承ります。\n\nhttps://tokyo-beauty-online-clinic.vercel.app/reservation\n\nご不明な点はこのチャットよりお問い合わせください。`),
          ])
        }
      }

      // 写真メッセージイベント（経過報告）
      if (event.type === "message" && event.message?.type === "image") {
        await replyLineMessage(event.replyToken, [
          textMessage("写真を受け取りました。担当医が確認後、ご連絡いたします。\n\n東京美容オンラインクリニック"),
        ])
      }

      // User IDをSupabaseに保存（リプライ後に実行）
      try {
        const supabase = createAdminClient()
        await supabase
          .from("line_users")
          .upsert({ line_user_id: userId, updated_at: new Date().toISOString() }, { onConflict: "line_user_id" })
      } catch (dbErr) {
        console.error("LINE User ID保存エラー:", dbErr)
      }
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("LINE Webhookエラー:", err)
    return NextResponse.json({ ok: true }) // LINEには常に200を返す
  }
}
