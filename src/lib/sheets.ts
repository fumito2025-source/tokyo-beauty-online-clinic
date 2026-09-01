const PLAN_LABELS: Record<string, string> = {
  whitening: "美白プラン",
  aga: "AGAプラン",
  obesity: "肥満プラン",
}

const FOLLOW_LABELS: Record<string, string> = {
  yes: "希望する",
  no: "希望しない",
  consult: "医師と相談して決める",
}

function formatDateTime(iso: string) {
  const d = new Date(iso)
  const days = "日月火水木金土"
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}（${days[d.getDay()]}）${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`
}

export async function appendReservationToSheet(data: any) {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n")
  const sheetId = process.env.GOOGLE_SHEET_ID

  if (!clientEmail || !privateKey || !sheetId) {
    console.log("Google Sheets設定未完了のためスキップ")
    return
  }

  const { GoogleAuth } = await import("google-auth-library")
  const { google } = await import("googleapis")

  const auth = new GoogleAuth({
    credentials: { client_email: clientEmail, private_key: privateKey },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  })

  const sheets = google.sheets({ version: "v4", auth })

  const row = [
    formatDateTime(data.reserved_at),
    data.full_name,
    data.date_of_birth,
    data.gender === "male" ? "男性" : data.gender === "female" ? "女性" : "その他",
    data.phone,
    data.email,
    data.postal_code,
    data.address,
    data.plans?.map((p: string) => PLAN_LABELS[p] || p).join("・"),
    FOLLOW_LABELS[data.follow_up] || data.follow_up,
    data.concern,
    data.medical_history || "",
    data.current_medications || "",
    data.pregnancy === "yes" ? "あり" : data.pregnancy === "no" ? "なし" : "該当しない",
    new Date().toLocaleDateString("ja-JP"),
  ]

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "予約一覧!A:O",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  })
}
