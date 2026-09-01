interface ReminderEmailParams {
  full_name: string
  email: string
  reserved_at: string
  plans: string[]
}

export async function sendReminderEmail(params: ReminderEmailParams) {
  const { full_name, email, reserved_at, plans } = params
  const planLabels = plans.map((p: string) => PLAN_LABELS[p] || p).join("・")
  const dateStr = formatDateTime(reserved_at)

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) return

  const nodemailer = await import("nodemailer")
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
  })

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: "【東京美容オンラインクリニック】明日のご予約のリマインド",
    text: `
${full_name} 様

明日のご予約のリマインドです。

■ 予約日時：${dateStr}
■ 希望プラン：${planLabels}

ご不明な点はLINE公式アカウントよりお問い合わせください。

東京美容オンラインクリニック
    `.trim(),
  })
}

const PLAN_LABELS: Record<string, string> = {
  whitening: "美白プラン",
  aga: "AGAプラン",
  obesity: "肥満プラン",
}

function formatDateTime(iso: string) {
  const d = new Date(iso)
  const days = "日月火水木金土"
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日（${days[d.getDay()]}）${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`
}

interface ReservationEmailParams {
  full_name: string
  email: string
  phone: string
  reserved_at: string
  plans: string[]
  concern: string
}

export async function sendReservationEmail(params: ReservationEmailParams) {
  const { full_name, email, phone, reserved_at, plans, concern } = params
  const planLabels = plans.map(p => PLAN_LABELS[p] || p).join("・")
  const dateStr = formatDateTime(reserved_at)
  const notifyEmail = process.env.NOTIFY_EMAIL

  if (!notifyEmail || !process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.log("メール設定未完了のためスキップ")
    return
  }

  const nodemailer = await import("nodemailer")
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })

  // 院長への通知メール
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: notifyEmail,
    subject: `【新規予約】${full_name}様 ${dateStr}`,
    text: `
新規予約が入りました。

■ 予約日時：${dateStr}
■ 氏名：${full_name}
■ 電話：${phone}
■ メール：${email}
■ 希望プラン：${planLabels}
■ 相談内容：${concern}

Supabaseの管理画面で詳細を確認してください。
    `.trim(),
  })

  // 患者への確認メール
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: "【東京美容オンラインクリニック】ご予約を受け付けました",
    text: `
${full_name} 様

ご予約ありがとうございます。
以下の内容でご予約を受け付けました。

■ 予約日時：${dateStr}
■ 希望プラン：${planLabels}

診察の前日と当日朝にリマインダーをお送りします。
ご不明な点はLINE公式アカウントよりお問い合わせください。

東京美容オンラインクリニック
    `.trim(),
  })
}
