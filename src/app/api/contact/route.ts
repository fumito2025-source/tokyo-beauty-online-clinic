import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { name, email, category, message } = await req.json()
    if (!name || !email || !message) {
      return NextResponse.json({ error: "必須項目が未入力です" }, { status: 400 })
    }

    const categoryLabel: Record<string, string> = {
      reservation: "予約について",
      medication: "薬・処方について",
      payment: "お支払いについて",
      delivery: "配送について",
      other: "その他",
    }

    // Gmailで通知
    const { createTransport } = await import("nodemailer")
    const transporter = createTransport({
      service: "gmail",
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
    })

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.NOTIFY_EMAIL,
      subject: `【お問い合わせ】${categoryLabel[category] ?? category} — ${name}様`,
      text: `お名前：${name}\nメール：${email}\n種別：${categoryLabel[category] ?? category}\n\n内容：\n${message}`,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Contact error:", err)
    return NextResponse.json({ error: "エラーが発生しました" }, { status: 500 })
  }
}
