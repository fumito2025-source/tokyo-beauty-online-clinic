import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"
import { replyLineMessage, textMessage, LineMessage } from "@/lib/line"

const BASE_URL = "https://tokyo-beauty-online-clinic.vercel.app"

function medicationMenuMessage(): LineMessage[] {
  return [
    {
      type: "template",
      altText: "薬の説明 — カテゴリを選択してください",
      template: {
        type: "carousel",
        columns: [
          {
            title: "AGA治療薬",
            text: "フィナステリド・デュタステリド",
            actions: [
              { type: "uri", label: "詳しく見る", uri: `${BASE_URL}/medication#aga` },
            ],
          },
          {
            title: "美白・肝斑",
            text: "トランサミン・シナール・ハイチオールなど",
            actions: [
              { type: "uri", label: "詳しく見る", uri: `${BASE_URL}/medication#whitening` },
            ],
          },
          {
            title: "ニキビ治療",
            text: "アダパレンゲル・ゼビアックスなど",
            actions: [
              { type: "uri", label: "詳しく見る", uri: `${BASE_URL}/medication#acne` },
            ],
          },
          {
            title: "保湿・外用薬",
            text: "ヒルドイド・ビマトプロストなど",
            actions: [
              { type: "uri", label: "詳しく見る", uri: `${BASE_URL}/medication#moisturizing` },
            ],
          },
        ],
      },
    },
  ]
}

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

        if (text === "薬の説明") {
          await replyLineMessage(event.replyToken, medicationMenuMessage())
        } else if (text.includes("予約")) {
          await replyLineMessage(event.replyToken, [
            textMessage(`ご予約はこちらから承ります。\n\nhttps://tokyo-beauty-online-clinic.vercel.app/reservation\n\nご不明な点はこのチャットよりお問い合わせください。`),
          ])
        } else if (text === "経過・ご相談") {
          // リッチメニューの経過・ご相談ボタンを押した場合
          await replyLineMessage(event.replyToken, [
            textMessage(
              "経過・ご相談を承ります。\n\n📷 経過写真を送る場合\nそのまま写真を送信してください。\n\n💬 症状をご相談される場合\nこのチャットに症状・お悩みをテキストでお送りください。\n\n担当医が確認次第、ご返信いたします。\n\n東京美容オンラインクリニック"
            ),
          ])
        } else if (text.includes("お問い合わせ")) {
          await replyLineMessage(event.replyToken, [
            textMessage(
              "お問い合わせありがとうございます。\n\nご質問・ご不明点はこのチャットにそのままメッセージをお送りください。担当スタッフが確認後、ご返信いたします。\n\n受付時間：10:00〜18:00（土日祝除く）\n\n東京美容オンラインクリニック"
            ),
          ])
        } else {
          // 一般的なテキストメッセージ（症状相談など）→ 受付確認を返す
          await replyLineMessage(event.replyToken, [
            textMessage(
              "メッセージを受け取りました。\n\n担当医が内容を確認し、順次ご返信いたします。\n\n※お急ぎの場合は、お電話にてお問い合わせください。\n\n東京美容オンラインクリニック"
            ),
          ])
        }
      }

      // 写真メッセージイベント（経過報告）
      if (event.type === "message" && event.message?.type === "image") {
        await replyLineMessage(event.replyToken, [
          textMessage("写真を受け取りました。\n\n担当医が確認後、ご連絡いたします。\n\n東京美容オンラインクリニック"),
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
