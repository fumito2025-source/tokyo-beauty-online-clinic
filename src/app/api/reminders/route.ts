import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"
import { sendReminderEmail } from "@/lib/email"

export async function POST(req: NextRequest) {
  // 簡単なAPIキー認証
  const authHeader = req.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const supabase = createAdminClient()
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const dateStr = tomorrow.toISOString().slice(0, 10)

  const { data: reservations, error } = await supabase
    .from("reservations")
    .select("*")
    .gte("reserved_at", `${dateStr}T00:00:00`)
    .lt("reserved_at", `${dateStr}T23:59:59`)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!reservations || reservations.length === 0) {
    return NextResponse.json({ message: "明日の予約なし" })
  }

  await Promise.all(
    reservations.map((r: any) =>
      sendReminderEmail({
        full_name: r.full_name,
        email: r.email,
        reserved_at: r.reserved_at,
        plans: r.plans,
      })
    )
  )

  return NextResponse.json({ message: `${reservations.length}件のリマインダーを送信しました` })
}
