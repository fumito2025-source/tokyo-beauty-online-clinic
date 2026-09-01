"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

const PLANS = [
  { id: "whitening", label: "美白プラン" },
  { id: "aga", label: "AGAプラン" },
  { id: "obesity", label: "肥満プラン" },
]

const TIME_SLOTS = [
  "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30",
]

function getNext14Days() {
  const days = []
  const today = new Date()
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    if (d.getDay() !== 0) days.push(d) // 日曜除外
  }
  return days
}

function formatDate(d: Date) {
  return `${d.getMonth() + 1}月${d.getDate()}日（${"日月火水木金土"[d.getDay()]}）`
}

export default function ReservationPage() {
  const router = useRouter()
  const days = getNext14Days()

  const [step, setStep] = useState<1 | 2>(1)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const [form, setForm] = useState({
    full_name: "",
    date_of_birth: "",
    gender: "",
    phone: "",
    email: "",
    postal_code: "",
    address: "",
    plans: [] as string[],
    follow_up: "",
    concern: "",
    medical_history: "",
    current_medications: "",
    pregnancy: "",
  })

  function toggle(plan: string) {
    setForm(f => ({
      ...f,
      plans: f.plans.includes(plan)
        ? f.plans.filter(p => p !== plan)
        : [...f.plans, plan],
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedDate || !selectedTime) return
    setSubmitting(true)
    setError("")

    const [h, m] = selectedTime.split(":").map(Number)
    const reserved_at = new Date(selectedDate)
    reserved_at.setHours(h, m, 0, 0)

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, reserved_at: reserved_at.toISOString() }),
      })
      if (!res.ok) throw new Error()
      router.push("/reservation/complete")
    } catch {
      setError("送信に失敗しました。お手数ですが再度お試しください。")
      setSubmitting(false)
    }
  }

  const inputClass = "w-full bg-transparent border border-clinic-gold/20 text-clinic-offwhite px-4 py-3 text-sm focus:outline-none focus:border-clinic-gold transition-colors"
  const labelClass = "block text-xs text-clinic-gold tracking-widest mb-2"

  return (
    <div className="min-h-screen bg-clinic-black py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* タイトル */}
        <div className="text-center mb-16">
          <p className="text-clinic-gold text-xs tracking-[0.5em] mb-4">RESERVATION</p>
          <div className="w-8 h-px bg-clinic-gold mx-auto mb-6" />
          <h1 className="font-serif text-3xl text-clinic-offwhite tracking-wider">ご予約・問診票</h1>
        </div>

        {/* ステップ表示 */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[1, 2].map(s => (
            <div key={s} className="flex items-center gap-4">
              <div className={`w-8 h-8 flex items-center justify-center border text-xs font-serif transition-all ${
                step === s ? "border-clinic-gold text-clinic-gold" : "border-clinic-offwhite/20 text-clinic-offwhite/30"
              }`}>
                {s}
              </div>
              {s === 1 && <div className="w-16 h-px bg-clinic-gold/20" />}
            </div>
          ))}
          <div className="flex gap-8 absolute">
          </div>
        </div>
        <div className="flex justify-between text-xs text-clinic-offwhite/40 mb-12 tracking-widest">
          <span className={step === 1 ? "text-clinic-gold" : ""}>日時を選択</span>
          <span className={step === 2 ? "text-clinic-gold" : ""}>問診票を記入</span>
        </div>

        {/* STEP 1: 日時選択 */}
        {step === 1 && (
          <div>
            <h2 className="font-serif text-lg text-clinic-offwhite mb-8 tracking-wider">ご希望の日付を選択</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-12">
              {days.map((d, i) => (
                <button
                  key={i}
                  onClick={() => { setSelectedDate(d); setSelectedTime(null) }}
                  className={`py-3 px-4 text-sm font-serif border transition-all ${
                    selectedDate?.toDateString() === d.toDateString()
                      ? "border-clinic-gold text-clinic-gold bg-clinic-gold/5"
                      : "border-clinic-gold/20 text-clinic-offwhite/60 hover:border-clinic-gold/50"
                  }`}
                >
                  {formatDate(d)}
                </button>
              ))}
            </div>

            {selectedDate && (
              <>
                <h2 className="font-serif text-lg text-clinic-offwhite mb-8 tracking-wider">ご希望の時間を選択</h2>
                <div className="grid grid-cols-4 gap-3 mb-12">
                  {TIME_SLOTS.map(t => (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`py-3 text-sm font-serif border transition-all ${
                        selectedTime === t
                          ? "border-clinic-gold text-clinic-gold bg-clinic-gold/5"
                          : "border-clinic-gold/20 text-clinic-offwhite/60 hover:border-clinic-gold/50"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </>
            )}

            <button
              onClick={() => setStep(2)}
              disabled={!selectedDate || !selectedTime}
              className="w-full border border-clinic-gold text-clinic-gold py-4 text-sm tracking-widest font-serif hover:bg-clinic-gold hover:text-clinic-black transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              次へ：問診票を記入する
            </button>
          </div>
        )}

        {/* STEP 2: 問診票 */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* 選択済み日時の確認 */}
            <div className="border border-clinic-gold/20 p-6 bg-clinic-gold/5 mb-8">
              <p className="text-xs text-clinic-gold tracking-widest mb-2">ご予約日時</p>
              <p className="text-clinic-offwhite font-serif">
                {selectedDate && formatDate(selectedDate)}　{selectedTime}
              </p>
              <button type="button" onClick={() => setStep(1)} className="text-xs text-clinic-offwhite/40 hover:text-clinic-gold mt-2 transition-colors">
                変更する
              </button>
            </div>

            {/* 基本情報 */}
            <div>
              <h2 className="font-serif text-base text-clinic-gold tracking-[0.3em] mb-6 pb-2 border-b border-clinic-gold/20">基本情報</h2>
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>氏名 <span className="text-red-400">*</span></label>
                  <input required value={form.full_name} onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))} className={inputClass} placeholder="山田 太郎" />
                </div>
                <div>
                  <label className={labelClass}>生年月日 <span className="text-red-400">*</span></label>
                  <input required type="date" value={form.date_of_birth} onChange={e => setForm(f => ({ ...f, date_of_birth: e.target.value }))} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>性別 <span className="text-red-400">*</span></label>
                  <div className="flex gap-4">
                    {[["male","男性"],["female","女性"],["other","その他"]].map(([v, l]) => (
                      <label key={v} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" required name="gender" value={v} checked={form.gender === v} onChange={() => setForm(f => ({ ...f, gender: v }))} className="accent-yellow-600" />
                        <span className="text-sm text-clinic-offwhite/70">{l}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelClass}>電話番号 <span className="text-red-400">*</span></label>
                  <input required type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className={inputClass} placeholder="090-0000-0000" />
                </div>
                <div>
                  <label className={labelClass}>メールアドレス <span className="text-red-400">*</span></label>
                  <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={inputClass} placeholder="example@email.com" />
                </div>
                <div>
                  <label className={labelClass}>郵便番号 <span className="text-red-400">*</span></label>
                  <input required value={form.postal_code} onChange={e => setForm(f => ({ ...f, postal_code: e.target.value }))} className={inputClass} placeholder="000-0000" />
                </div>
                <div>
                  <label className={labelClass}>住所 <span className="text-red-400">*</span></label>
                  <input required value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} className={inputClass} placeholder="東京都渋谷区..." />
                </div>
              </div>
            </div>

            {/* 予約情報 */}
            <div>
              <h2 className="font-serif text-base text-clinic-gold tracking-[0.3em] mb-6 pb-2 border-b border-clinic-gold/20">ご希望プラン</h2>
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>希望プラン（複数選択可）<span className="text-red-400">*</span></label>
                  <div className="flex flex-wrap gap-3">
                    {PLANS.map(p => (
                      <label key={p.id} className={`flex items-center gap-2 border px-4 py-2 cursor-pointer transition-all ${
                        form.plans.includes(p.id) ? "border-clinic-gold text-clinic-gold" : "border-clinic-gold/20 text-clinic-offwhite/60"
                      }`}>
                        <input type="checkbox" checked={form.plans.includes(p.id)} onChange={() => toggle(p.id)} className="accent-yellow-600" />
                        <span className="text-sm">{p.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelClass}>写真・体重など経過フォローの希望 <span className="text-red-400">*</span></label>
                  <div className="flex flex-col gap-3">
                    {[["yes","希望する"],["no","希望しない"],["consult","医師と相談して決める"]].map(([v, l]) => (
                      <label key={v} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" required name="follow_up" value={v} checked={form.follow_up === v} onChange={() => setForm(f => ({ ...f, follow_up: v }))} className="accent-yellow-600" />
                        <span className="text-sm text-clinic-offwhite/70">{l}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelClass}>相談内容・お悩み <span className="text-red-400">*</span></label>
                  <textarea required rows={4} value={form.concern} onChange={e => setForm(f => ({ ...f, concern: e.target.value }))} className={inputClass} placeholder="現在のお悩みや相談したいことをご記入ください" />
                </div>
              </div>
            </div>

            {/* 問診内容 */}
            <div>
              <h2 className="font-serif text-base text-clinic-gold tracking-[0.3em] mb-6 pb-2 border-b border-clinic-gold/20">問診内容</h2>
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>既往歴・アレルギー</label>
                  <textarea rows={3} value={form.medical_history} onChange={e => setForm(f => ({ ...f, medical_history: e.target.value }))} className={inputClass} placeholder="特になし / ○○アレルギーあり など" />
                </div>
                <div>
                  <label className={labelClass}>現在服用中のお薬</label>
                  <textarea rows={2} value={form.current_medications} onChange={e => setForm(f => ({ ...f, current_medications: e.target.value }))} className={inputClass} placeholder="特になし / ○○を服用中 など" />
                </div>
                <div>
                  <label className={labelClass}>妊娠・授乳の有無 <span className="text-red-400">*</span></label>
                  <div className="flex gap-6">
                    {[["yes","あり"],["no","なし"],["na","該当しない"]].map(([v, l]) => (
                      <label key={v} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" required name="pregnancy" value={v} checked={form.pregnancy === v} onChange={() => setForm(f => ({ ...f, pregnancy: v }))} className="accent-yellow-600" />
                        <span className="text-sm text-clinic-offwhite/70">{l}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <div className="flex gap-4">
              <button type="button" onClick={() => setStep(1)} className="flex-1 border border-clinic-offwhite/20 text-clinic-offwhite/50 py-4 text-sm tracking-widest font-serif hover:border-clinic-gold/50 transition-all">
                戻る
              </button>
              <button type="submit" disabled={submitting || form.plans.length === 0} className="flex-2 w-full border border-clinic-gold text-clinic-gold py-4 text-sm tracking-widest font-serif hover:bg-clinic-gold hover:text-clinic-black transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                {submitting ? "送信中..." : "予約を確定する"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
