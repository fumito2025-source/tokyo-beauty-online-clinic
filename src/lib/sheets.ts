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

async function getAccessToken(clientEmail: string, privateKey: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  const header = { alg: "RS256", typ: "JWT" }
  const payload = {
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  }

  const encode = (obj: object) =>
    Buffer.from(JSON.stringify(obj)).toString("base64url")

  const signingInput = `${encode(header)}.${encode(payload)}`

  const crypto = await import("crypto")
  const sign = crypto.createSign("RSA-SHA256")
  sign.update(signingInput)
  const signature = sign.sign(privateKey, "base64url")

  const jwt = `${signingInput}.${signature}`

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  })

  const data = await res.json()
  return data.access_token
}

export async function appendReservationToSheet(data: any) {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n")
  const sheetId = process.env.GOOGLE_SHEET_ID

  if (!clientEmail || !privateKey || !sheetId) {
    console.log("Google Sheets設定未完了のためスキップ")
    return
  }

  try {
    const accessToken = await getAccessToken(clientEmail, privateKey)

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

    const range = encodeURIComponent("予約一覧!A:O")
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`

    const sheetsRes = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [row] }),
    })

    const sheetsData = await sheetsRes.json()
    if (!sheetsRes.ok) {
      console.error("Sheets APIエラー:", JSON.stringify(sheetsData))
    } else {
      console.log("スプレッドシートへの書き込み完了:", sheetsData.updates?.updatedRange)
    }
  } catch (err) {
    console.error("スプレッドシートエラー:", err)
  }
}
