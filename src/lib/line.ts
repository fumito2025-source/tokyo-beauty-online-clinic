const LINE_API = "https://api.line.me/v2/bot"

function getHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
  }
}

// プッシュメッセージ送信（こちらから送る）
export async function sendLineMessage(userId: string, messages: LineMessage[]) {
  const res = await fetch(`${LINE_API}/message/push`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ to: userId, messages }),
  })
  if (!res.ok) {
    const err = await res.json()
    console.error("LINE送信エラー:", JSON.stringify(err))
  }
  return res.ok
}

// リプライメッセージ（Webhookで受信したreplyTokenで返す）
export async function replyLineMessage(replyToken: string, messages: LineMessage[]) {
  const res = await fetch(`${LINE_API}/message/reply`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ replyToken, messages }),
  })
  if (!res.ok) {
    const err = await res.json()
    console.error("LINEリプライエラー:", JSON.stringify(err))
  }
  return res.ok
}

// テキストメッセージ
export function textMessage(text: string): LineMessage {
  return { type: "text", text }
}

// 予約確認メッセージ
export function reservationConfirmMessage(params: {
  full_name: string
  reserved_at: string
  plans: string[]
}): LineMessage[] {
  const PLAN_LABELS: Record<string, string> = {
    whitening: "美白プラン",
    aga: "AGAプラン",
    obesity: "肥満プラン",
  }
  const d = new Date(params.reserved_at)
  const days = "日月火水木金土"
  const dateStr = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日（${days[d.getDay()]}）${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`
  const planStr = params.plans.map((p) => PLAN_LABELS[p] || p).join("・")

  return [
    {
      type: "text",
      text: `${params.full_name} 様\n\nご予約ありがとうございます。\n\n📅 予約日時：${dateStr}\n💊 希望プラン：${planStr}\n\nご不明な点はこちらのチャットよりお気軽にお問い合わせください。\n\n東京美容オンラインクリニック`,
    },
  ]
}

// リマインダーメッセージ
export function reminderLineMessage(params: {
  full_name: string
  reserved_at: string
  plans: string[]
  isToday: boolean
}): LineMessage[] {
  const PLAN_LABELS: Record<string, string> = {
    whitening: "美白プラン",
    aga: "AGAプラン",
    obesity: "肥満プラン",
  }
  const d = new Date(params.reserved_at)
  const days = "日月火水木金土"
  const dateStr = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日（${days[d.getDay()]}）${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`
  const planStr = params.plans.map((p) => PLAN_LABELS[p] || p).join("・")
  const timing = params.isToday ? "本日" : "明日"

  return [
    {
      type: "text",
      text: `${params.full_name} 様\n\n${timing}のご予約のリマインドです。\n\n📅 予約日時：${dateStr}\n💊 希望プラン：${planStr}\n\nご不明な点はこちらのチャットよりお問い合わせください。\n\n東京美容オンラインクリニック`,
    },
  ]
}

export interface LineMessage {
  type: string
  text?: string
  [key: string]: unknown
}
