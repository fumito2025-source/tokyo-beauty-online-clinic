import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"
import { sendReminderEmail } from "@/lib/email"
import { getAccessToken, updateTodaySchedule } from "@/lib/sheets"
import { sendLineMessage, reminderLineMessage } from "@/lib/line"

async function handleReminder(req: NextRequest) {
  const authHeader = req.headers.get("authorization")
  const params = req.nextUrl?.searchParams
  const cronSecret = params?.get("secret")
  if (
    authHeader !== `Bearer ${process.env.CRON_SECRET}` &&
    cronSecret !== process.env.CRON_SECRET
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // typeパラメータ: "today"=当日8:30リマインド, "tomorrow"=前日22時リマインド
  const type = params?.get("type") ?? "tomorrow"
  const isToday = type === "today"

  const supabase = createAdminClient()
  const target = new Date()
  // JSTに変換（UTC+9）
  target.setHours(target.getHours() + 9)
  if (!isToday) target.setDate(target.getDate() + 1)
  const dateStr = target.toISOString().slice(0, 10)

  const { data: reservations, error } = await supabase
    .from("reservations")
    .select("*")
    .gte("reserved_at", `${dateStr}T00:00:00`)
    .lt("reserved_at", `${dateStr}T23:59:59`)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!reservations || reservations.length === 0) {
    return NextResponse.json({ message: `${isToday ? "本日" : "明日"}の予約なし` })
  }

  await Promise.all(
    reservations.map(async (r: any) => {
      // メールリマインダー
      await sendReminderEmail({
        full_name: r.full_name,
        email: r.email,
        reserved_at: r.reserved_at,
        plans: r.plans,
        isToday,
      })

      // LINEリマインダー（LINE連携済みの患者のみ）
      if (r.line_user_id) {
        await sendLineMessage(
          r.line_user_id,
          reminderLineMessage({ full_name: r.full_name, reserved_at: r.reserved_at, plans: r.plans, isToday })
        )
      }
    })
  )

  // 本日のスケジュールシートを更新（8:30・22時どちらのcronでも実行）
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n")
  const sheetId = process.env.GOOGLE_SHEET_ID
  if (clientEmail && privateKey && sheetId) {
    try {
      const accessToken = await getAccessToken(clientEmail, privateKey)
      await updateTodaySchedule(accessToken, sheetId)
    } catch (e) {
      console.error("スケジュールシート更新エラー:", e)
    }
  }

  return NextResponse.json({ message: `${reservations.length}件のリマインダーを送信しました` })
}

export async function POST(req: NextRequest) {
  return handleReminder(req)
}

export async function GET(req: NextRequest) {
  return handleReminder(req)
}
