"use client"
import { useEffect, useState } from "react"

const PLAN_LABELS: Record<string, string> = {
  whitening: "美白",
  aga: "AGA",
  obesity: "肥満",
}

const FOLLOW_LABELS: Record<string, string> = {
  yes: "希望する",
  no: "希望しない",
  consult: "医師と相談",
}

function formatDateTime(iso: string) {
  const d = new Date(iso)
  const days = "日月火水木金土"
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}（${days[d.getDay()]}）${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`
}

export default function AdminPage() {
  const [reservations, setReservations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<any | null>(null)

  useEffect(() => {
    fetch("/api/admin/reservations")
      .then(r => r.json())
      .then(data => { setReservations(data); setLoading(false) })
  }, [])

  return (
    <div className="min-h-screen bg-clinic-black py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-10">
          <p className="text-clinic-gold text-xs tracking-[0.5em] mb-2">ADMIN</p>
          <div className="w-8 h-px bg-clinic-gold mb-4" />
          <h1 className="font-serif text-2xl text-clinic-offwhite tracking-wider">予約管理</h1>
        </div>

        {loading ? (
          <p className="text-clinic-offwhite/40 text-sm">読み込み中...</p>
        ) : reservations.length === 0 ? (
          <p className="text-clinic-offwhite/40 text-sm">予約はまだありません</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-clinic-gold/20 text-clinic-gold text-xs tracking-widest">
                  <th className="text-left py-3 pr-6">予約日時</th>
                  <th className="text-left py-3 pr-6">氏名</th>
                  <th className="text-left py-3 pr-6">電話</th>
                  <th className="text-left py-3 pr-6">プラン</th>
                  <th className="text-left py-3 pr-6">フォロー</th>
                  <th className="text-left py-3">登録日</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((r) => (
                  <tr
                    key={r.id}
                    onClick={() => setSelected(r)}
                    className="border-b border-clinic-gold/10 hover:bg-clinic-gold/5 cursor-pointer transition-colors"
                  >
                    <td className="py-4 pr-6 text-clinic-offwhite font-serif">{formatDateTime(r.reserved_at)}</td>
                    <td className="py-4 pr-6 text-clinic-offwhite">{r.full_name}</td>
                    <td className="py-4 pr-6 text-clinic-offwhite/60">{r.phone}</td>
                    <td className="py-4 pr-6">
                      {r.plans?.map((p: string) => (
                        <span key={p} className="inline-block text-xs border border-clinic-gold/40 text-clinic-gold px-2 py-0.5 mr-1">
                          {PLAN_LABELS[p] || p}
                        </span>
                      ))}
                    </td>
                    <td className="py-4 pr-6 text-clinic-offwhite/60 text-xs">{FOLLOW_LABELS[r.follow_up] || r.follow_up}</td>
                    <td className="py-4 text-clinic-offwhite/40 text-xs">{new Date(r.created_at).toLocaleDateString("ja-JP")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 詳細モーダル */}
      {selected && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setSelected(null)}>
          <div className="bg-clinic-gray-dark border border-clinic-gold/20 max-w-lg w-full p-8 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <h2 className="font-serif text-lg text-clinic-offwhite">{selected.full_name} 様</h2>
              <button onClick={() => setSelected(null)} className="text-clinic-offwhite/40 hover:text-clinic-gold text-xl">×</button>
            </div>
            <div className="space-y-3 text-sm">
              {[
                ["予約日時", formatDateTime(selected.reserved_at)],
                ["生年月日", selected.date_of_birth],
                ["性別", selected.gender === "male" ? "男性" : selected.gender === "female" ? "女性" : "その他"],
                ["電話", selected.phone],
                ["メール", selected.email],
                ["郵便番号", selected.postal_code],
                ["住所", selected.address],
                ["希望プラン", selected.plans?.map((p: string) => PLAN_LABELS[p] || p).join("・")],
                ["フォロー希望", FOLLOW_LABELS[selected.follow_up] || selected.follow_up],
                ["相談内容", selected.concern],
                ["既往歴", selected.medical_history || "なし"],
                ["服用中の薬", selected.current_medications || "なし"],
                ["妊娠・授乳", selected.pregnancy === "yes" ? "あり" : selected.pregnancy === "no" ? "なし" : "該当しない"],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-4">
                  <span className="text-clinic-gold text-xs tracking-widest w-24 shrink-0 pt-0.5">{label}</span>
                  <span className="text-clinic-offwhite/80">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
