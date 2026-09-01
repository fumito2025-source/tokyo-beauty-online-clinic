import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"
import { sendReminderEmail } from "@/lib/email"

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
    reservations.map((r: any) =>
      sendReminderEmail({
        full_name: r.full_name,
        email: r.email,
        reserved_at: r.reserved_at,
        plans: r.plans,
        isToday,
      })
    )
  )

  return NextResponse.json({ message: `${reservations.length}件のリマインダーを送信しました` })
}

export async function POST(req: NextRequest) {
  return handleReminder(req)
}

export async function GET(req: NextRequest) {
  return handleReminder(req)
}
