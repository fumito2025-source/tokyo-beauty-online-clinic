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

const HEADERS = [
  "予約日時", "氏名", "生年月日", "性別", "電話番号", "メール",
  "郵便番号", "住所", "希望プラン", "フォローアップ", "相談内容",
  "既往歴", "服用中の薬", "妊娠", "登録日",
]

function formatDateTime(iso: string) {
  const d = new Date(iso)
  const days = "日月火水木金土"
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}（${days[d.getDay()]}）${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`
}

function getMonthTabName(iso: string) {
  const d = new Date(iso)
  return `${d.getFullYear()}年${d.getMonth() + 1}月`
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

  const pemBody = privateKey
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s+/g, "")

  const keyBuffer = Buffer.from(pemBody, "base64")
  const cryptoKey = await globalThis.crypto.subtle.importKey(
    "pkcs8",
    keyBuffer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  )

  const signatureBuffer = await globalThis.crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(signingInput)
  )

  const signature = Buffer.from(signatureBuffer).toString("base64url")
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
  if (!data.access_token) {
    console.error("アクセストークン取得失敗:", JSON.stringify(data))
  }
  return data.access_token
}

async function sheetsRequest(url: string, accessToken: string, body?: object) {
  const res = await fetch(url, {
    method: body ? "POST" : "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  })
  return res.json()
}

// シートが存在しない場合は作成してヘッダーを追加、存在する場合はsheetIdを返す
async function getOrCreateSheet(
  sheetId: string,
  accessToken: string,
  title: string
): Promise<number> {
  const info = await sheetsRequest(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?fields=sheets.properties`,
    accessToken
  )

  const existing = info.sheets?.find((s: any) => s.properties.title === title)
  if (existing) return existing.properties.sheetId

  // 新規作成
  const created = await sheetsRequest(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}:batchUpdate`,
    accessToken,
    { requests: [{ addSheet: { properties: { title } } }] }
  )
  const newSheetId = created.replies?.[0]?.addSheet?.properties?.sheetId

  // ヘッダー行を追加
  const range = encodeURIComponent(`${title}!A1:O1`)
  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?valueInputOption=USER_ENTERED`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [HEADERS] }),
    }
  )

  return newSheetId
}

// シートを列Aで昇順ソート（1行目はヘッダーなのでスキップ）
async function sortSheet(sheetId: string, accessToken: string, tabSheetId: number) {
  await sheetsRequest(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}:batchUpdate`,
    accessToken,
    {
      requests: [{
        sortRange: {
          range: {
            sheetId: tabSheetId,
            startRowIndex: 1,
            startColumnIndex: 0,
            endColumnIndex: 15,
          },
          sortSpecs: [{ dimensionIndex: 0, sortOrder: "ASCENDING" }],
        },
      }],
    }
  )
}

async function appendToTab(
  sheetId: string,
  accessToken: string,
  tabName: string,
  row: string[]
) {
  const range = encodeURIComponent(`${tabName}!A:O`)
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: [row] }),
  })
  return res.json()
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

    // 予約一覧に追加（全履歴）
    const listRes = await appendToTab(sheetId, accessToken, "予約一覧", row)
    if (!listRes.updates) {
      console.error("予約一覧への書き込みエラー:", JSON.stringify(listRes))
    } else {
      console.log("予約一覧への書き込み完了:", listRes.updates.updatedRange)
    }

    // 月別タブに追加してソート
    const monthTab = getMonthTabName(data.reserved_at)
    const tabSheetId = await getOrCreateSheet(sheetId, accessToken, monthTab)
    await appendToTab(sheetId, accessToken, monthTab, row)
    await sortSheet(sheetId, accessToken, tabSheetId)
    console.log(`${monthTab}タブへの書き込み・ソート完了`)
  } catch (err) {
    console.error("スプレッドシートエラー:", err)
  }
}

export async function updateTodaySchedule(accessToken: string, sheetId: string) {
  // 本日のスケジュールタブ: 予約一覧から今日以降の行を抽出して上書き
  const range = encodeURIComponent("予約一覧!A2:O")
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  )
  const data = await res.json()
  const rows: string[][] = data.values ?? []

  const todayStr = new Date().toLocaleDateString("ja-JP").replace(/\//g, "/")
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const upcoming = rows.filter((row) => {
    // 列A: "2026/9/2（水）2:00" 形式
    const match = row[0]?.match(/(\d+)\/(\d+)\/(\d+)/)
    if (!match) return false
    const d = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
    return d >= today
  })

  const tabSheetId = await getOrCreateSheet(sheetId, accessToken, "本日のスケジュール")

  // 既存データを全消去してから書き込み
  const clearRange = encodeURIComponent("本日のスケジュール!A2:O")
  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${clearRange}:clear`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    }
  )

  if (upcoming.length > 0) {
    const writeRange = encodeURIComponent("本日のスケジュール!A2:O")
    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${writeRange}?valueInputOption=USER_ENTERED`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values: upcoming }),
      }
    )
    await sortSheet(sheetId, accessToken, tabSheetId)
  }

  console.log(`本日のスケジュール更新完了: ${upcoming.length}件`)
}

export { getAccessToken }
