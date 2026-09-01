import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"
import { sendReservationEmail } from "@/lib/email"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      full_name, date_of_birth, gender, phone, email,
      postal_code, address, reserved_at, plans,
      follow_up, concern, medical_history,
      current_medications, pregnancy,
    } = body

    // 必須項目チェック
    if (!full_name || !email || !phone || !reserved_at || !plans?.length) {
      return NextResponse.json({ error: "必須項目が未入力です" }, { status: 400 })
    }

    // Supabaseに保存
    const supabase = createAdminClient()
    const { error: dbError } = await supabase
      .from("reservations")
      .insert({
        full_name, date_of_birth, gender, phone, email,
        postal_code, address, reserved_at, plans,
        follow_up, concern, medical_history,
        current_medications, pregnancy,
      })

    if (dbError) {
      console.error("DB error:", dbError)
      return NextResponse.json({ error: "保存に失敗しました" }, { status: 500 })
    }

    // Gmail通知を送信
    await sendReservationEmail({ full_name, email, phone, reserved_at, plans, concern })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Reservation error:", error)
    return NextResponse.json({ error: "エラーが発生しました" }, { status: 500 })
  }
}
