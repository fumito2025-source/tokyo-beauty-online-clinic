"use client"
import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"

const PLANS = [
  { id: "aga", label: "AGA治療" },
  { id: "whitening", label: "美白・肝斑" },
  { id: "acne", label: "ニキビ治療" },
  { id: "obesity", label: "肥満・ダイエット" },
  { id: "moisturizing", label: "保湿・外用薬" },
  { id: "other", label: "その他・相談" },
]

const TIME_SLOTS = [
  "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30",
]

// 日本の祝日 2025-2026
const HOLIDAYS = new Set([
  "2025-01-01","2025-01-13","2025-02-11","2025-02-23","2025-02-24",
  "2025-03-20","2025-04-29","2025-05-03","2025-05-04","2025-05-05",
  "2025-05-06","2025-07-21","2025-08-11","2025-09-15","2025-09-23",
  "2025-10-13","2025-11-03","2025-11-23","2025-11-24","2025-12-23",
  "2026-01-01","2026-01-12","2026-02-11","2026-02-23","2026-03-20",
  "2026-04-29","2026-05-03","2026-05-04","2026-05-05","2026-05-06",
  "2026-07-20","2026-08-11","2026-09-21","2026-09-22","2026-09-23",
  "2026-10-12","2026-11-03","2026-11-23","2026-12-23",
])

function toDateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`
}

function isAvailable(d: Date) {
  const day = d.getDay()
  if (day === 0) return false // 日曜
  if (HOLIDAYS.has(toDateKey(d))) return false
  return true
}

function formatDate(d: Date) {
  return `${d.getMonth()+1}月${d.getDate()}日（${"日月火水木金土"[d.getDay()]}）`
}

const WEEKDAYS = ["日","月","火","水","木","金","土"]

function Calendar({ selected, onSelect }: { selected: Date | null; onSelect: (d: Date) => void }) {
  const today = new Date()
  today.setHours(0,0,0,0)
  const maxDate = new Date(today)
  maxDate.setDate(today.getDate() + 60)

  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const firstDay = new Date(viewYear, viewMonth, 1)
  const lastDay = new Date(viewYear, viewMonth + 1, 0)
  const startPad = firstDay.getDay()

  const cells: (Date | null)[] = Array(startPad).fill(null)
  for (let d = 1; d <= lastDay.getDate(); d++) {
    cells.push(new Date(viewYear, viewMonth, d))
  }

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y-1); setViewMonth(11) }
    else setViewMonth(m => m-1)
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y+1); setViewMonth(0) }
    else setViewMonth(m => m+1)
  }

  const canPrev = new Date(viewYear, viewMonth, 1) > new Date(today.getFullYear(), today.getMonth(), 1)
  const canNext = new Date(viewYear, viewMonth + 1, 1) <= new Date(maxDate.getFullYear(), maxDate.getMonth() + 1, 1)

  return (
    <div className="border border-clinic-gold/20 p-6 bg-clinic-gray-dark/20">
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={prevMonth} disabled={!canPrev} className="w-8 h-8 flex items-center justify-center text-clinic-gold/60 hover:text-clinic-gold disabled:opacity-20 transition-colors text-lg">
          ‹
        </button>
        <span className="font-serif text-clinic-offwhite tracking-widest">
          {viewYear}年 {viewMonth+1}月
        </span>
        <button onClick={nextMonth} disabled={!canNext} className="w-8 h-8 flex items-center justify-center text-clinic-gold/60 hover:text-clinic-gold disabled:opacity-20 transition-colors text-lg">
          ›
        </button>
      </div>

      {/* 曜日ヘッダー */}
      <div className="grid grid-cols-7 mb-2">
        {WEEKDAYS.map((w, i) => (
          <div key={w} className={`text-center text-xs py-1 tracking-wider ${
            i === 0 ? "text-red-400/60" : i === 6 ? "text-blue-400/60" : "text-clinic-offwhite/30"
          }`}>{w}</div>
        ))}
      </div>

      {/* 日付グリッド */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (!d) return <div key={i} />
          const key = toDateKey(d)
          const past = d < today
          const tooFar = d > maxDate
          const holiday = HOLIDAYS.has(key)
          const sunday = d.getDay() === 0
          const disabled = past || tooFar || !isAvailable(d)
          const isSelected = selected ? toDateKey(selected) === key : false
          const isToday = toDateKey(d) === toDateKey(today)

          return (
            <button
              key={key}
              disabled={disabled}
              onClick={() => onSelect(d)}
              className={`
                relative h-10 w-full flex items-center justify-center text-sm transition-all
                ${isSelected ? "bg-clinic-gold text-clinic-black font-serif" :
                  disabled ? "text-clinic-offwhite/15 cursor-not-allowed" :
                  "hover:bg-clinic-gold/10 text-clinic-offwhite/80 hover:text-clinic-gold"}
                ${sunday || holiday ? "text-red-400/50" : ""}
                ${!disabled && !isSelected && d.getDay() === 6 ? "text-blue-400/70" : ""}
              `}
            >
              {d.getDate()}
              {isToday && !isSelected && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-clinic-gold rounded-full" />
              )}
            </button>
          )
        })}
      </div>

      {/* 凡例 */}
      <div className="flex gap-4 mt-4 pt-4 border-t border-clinic-gold/10">
        <span className="text-xs text-clinic-offwhite/30 flex items-center gap-1">
          <span className="w-2 h-2 bg-clinic-gold rounded-full inline-block" /> 選択中
        </span>
        <span className="text-xs text-red-400/50">日・祝 休診</span>
      </div>
    </div>
  )
}

// 生年月日セレクト
function BirthDateSelect({ value, onChange }: {
  value: { year: string; month: string; day: string }
  onChange: (v: { year: string; month: string; day: string }) => void
}) {
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 80 }, (_, i) => currentYear - 18 - i)
  const months = Array.from({ length: 12 }, (_, i) => i + 1)
  const daysInMonth = value.year && value.month
    ? new Date(Number(value.year), Number(value.month), 0).getDate()
    : 31
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const selectClass = "bg-clinic-gray-dark border border-clinic-gold/20 text-clinic-offwhite px-3 py-3 text-sm focus:outline-none focus:border-clinic-gold transition-colors appearance-none"

  return (
    <div className="flex gap-2 items-center">
      <select value={value.year} onChange={e => onChange({ ...value, year: e.target.value })} className={`${selectClass} flex-1`} required>
        <option value="">年</option>
        {years.map(y => <option key={y} value={y}>{y}年</option>)}
      </select>
      <select value={value.month} onChange={e => onChange({ ...value, month: e.target.value })} className={`${selectClass} w-24`} required>
        <option value="">月</option>
        {months.map(m => <option key={m} value={m}>{m}月</option>)}
      </select>
      <select value={value.day} onChange={e => onChange({ ...value, day: e.target.value })} className={`${selectClass} w-24`} required>
        <option value="">日</option>
        {days.map(d => <option key={d} value={d}>{d}日</option>)}
      </select>
    </div>
  )
}

export default function ReservationPage() {
  const router = useRouter()

  const [step, setStep] = useState<1 | 2>(1)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [postalLoading, setPostalLoading] = useState(false)

  const [birthDate, setBirthDate] = useState({ year: "", month: "", day: "" })

  const [form, setForm] = useState({
    full_name: "",
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
      plans: f.plans.includes(plan) ? f.plans.filter(p => p !== plan) : [...f.plans, plan],
    }))
  }

  const fetchAddress = useCallback(async (code: string) => {
    const clean = code.replace(/-/g, "")
    if (clean.length !== 7) return
    setPostalLoading(true)
    try {
      const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${clean}`)
      const data = await res.json()
      if (data.results?.[0]) {
        const r = data.results[0]
        const addr = `${r.address1}${r.address2}${r.address3}`
        setForm(f => ({ ...f, address: addr }))
      }
    } catch {}
    finally { setPostalLoading(false) }
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedDate || !selectedTime) return
    if (!birthDate.year || !birthDate.month || !birthDate.day) return

    setSubmitting(true)
    setError("")

    const [h, m] = selectedTime.split(":").map(Number)
    const reserved_at = new Date(selectedDate)
    reserved_at.setHours(h, m, 0, 0)

    const date_of_birth = `${birthDate.year}-${String(birthDate.month).padStart(2,"0")}-${String(birthDate.day).padStart(2,"0")}`

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, date_of_birth, reserved_at: reserved_at.toISOString() }),
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
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* タイトル */}
        <div className="text-center mb-16">
          <p className="text-clinic-gold text-xs tracking-[0.5em] mb-4">RESERVATION</p>
          <div className="w-8 h-px bg-clinic-gold mx-auto mb-6" />
          <h1 className="font-serif text-3xl text-clinic-offwhite tracking-wider">ご予約・問診票</h1>
        </div>

        {/* ステップバー */}
        <div className="flex items-center mb-14">
          {[
            { n: 1, label: "日時を選択" },
            { n: 2, label: "問診票を記入" },
          ].map(({ n, label }, i) => (
            <div key={n} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <div className={`w-8 h-8 flex items-center justify-center border text-xs font-serif transition-all ${
                  step === n ? "border-clinic-gold text-clinic-gold bg-clinic-gold/5" :
                  step > n ? "border-clinic-gold/40 text-clinic-gold/40" :
                  "border-clinic-offwhite/20 text-clinic-offwhite/30"
                }`}>{n}</div>
                <span className={`text-xs tracking-wider whitespace-nowrap ${step === n ? "text-clinic-gold" : "text-clinic-offwhite/30"}`}>{label}</span>
              </div>
              {i === 0 && <div className="flex-1 h-px bg-clinic-gold/20 mx-3 mb-5" />}
            </div>
          ))}
        </div>

        {/* STEP 1: カレンダー */}
        {step === 1 && (
          <div className="space-y-10">
            <div>
              <h2 className="font-serif text-base text-clinic-offwhite mb-6 tracking-wider">ご希望の日付を選択</h2>
              <Calendar selected={selectedDate} onSelect={(d) => { setSelectedDate(d); setSelectedTime(null) }} />
            </div>

            {selectedDate && (
              <div>
                <h2 className="font-serif text-base text-clinic-offwhite mb-6 tracking-wider">
                  {formatDate(selectedDate)}　時間を選択
                </h2>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {TIME_SLOTS.map(t => (
                    <button key={t} onClick={() => setSelectedTime(t)} className={`py-3 text-sm font-serif border transition-all ${
                      selectedTime === t
                        ? "border-clinic-gold text-clinic-gold bg-clinic-gold/5"
                        : "border-clinic-gold/20 text-clinic-offwhite/60 hover:border-clinic-gold/50 hover:text-clinic-gold"
                    }`}>{t}</button>
                  ))}
                </div>
              </div>
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
          <form onSubmit={handleSubmit} className="space-y-10">

            {/* 選択済み日時 */}
            <div className="border border-clinic-gold/20 p-5 bg-clinic-gold/5">
              <p className="text-xs text-clinic-gold tracking-widest mb-1">ご予約日時</p>
              <p className="text-clinic-offwhite font-serif text-lg">
                {selectedDate && formatDate(selectedDate)}　{selectedTime}
              </p>
              <button type="button" onClick={() => setStep(1)} className="text-xs text-clinic-offwhite/40 hover:text-clinic-gold mt-2 transition-colors underline underline-offset-2">
                変更する
              </button>
            </div>

            {/* 基本情報 */}
            <div>
              <h2 className="font-serif text-base text-clinic-gold tracking-[0.3em] mb-6 pb-2 border-b border-clinic-gold/20">基本情報</h2>
              <div className="space-y-6">
                <div>
                  <label className={labelClass}>氏名 <span className="text-red-400">*</span></label>
                  <input required value={form.full_name} onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))} className={inputClass} placeholder="山田 太郎" />
                </div>

                <div>
                  <label className={labelClass}>生年月日 <span className="text-red-400">*</span></label>
                  <BirthDateSelect value={birthDate} onChange={setBirthDate} />
                </div>

                <div>
                  <label className={labelClass}>性別 <span className="text-red-400">*</span></label>
                  <div className="flex gap-6">
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
                  <div className="flex gap-3">
                    <input
                      required
                      value={form.postal_code}
                      onChange={e => setForm(f => ({ ...f, postal_code: e.target.value }))}
                      onBlur={e => fetchAddress(e.target.value)}
                      className={`${inputClass} flex-1`}
                      placeholder="000-0000"
                      maxLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => fetchAddress(form.postal_code)}
                      disabled={postalLoading}
                      className="border border-clinic-gold/30 text-clinic-gold/70 hover:border-clinic-gold hover:text-clinic-gold px-4 text-xs tracking-wider transition-colors disabled:opacity-40 whitespace-nowrap"
                    >
                      {postalLoading ? "検索中..." : "住所を検索"}
                    </button>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>住所 <span className="text-red-400">*</span></label>
                  <input required value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} className={inputClass} placeholder="郵便番号から自動入力 / または手入力" />
                </div>
              </div>
            </div>

            {/* ご希望プラン */}
            <div>
              <h2 className="font-serif text-base text-clinic-gold tracking-[0.3em] mb-6 pb-2 border-b border-clinic-gold/20">ご希望プラン</h2>
              <div className="space-y-6">
                <div>
                  <label className={labelClass}>希望プラン（複数選択可）<span className="text-red-400">*</span></label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {PLANS.map(p => (
                      <label key={p.id} className={`flex items-center gap-2 border px-4 py-3 cursor-pointer transition-all ${
                        form.plans.includes(p.id) ? "border-clinic-gold text-clinic-gold bg-clinic-gold/5" : "border-clinic-gold/20 text-clinic-offwhite/60 hover:border-clinic-gold/40"
                      }`}>
                        <input type="checkbox" checked={form.plans.includes(p.id)} onChange={() => toggle(p.id)} className="accent-yellow-600" />
                        <span className="text-sm">{p.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={labelClass}>経過フォローの希望 <span className="text-red-400">*</span></label>
                  <div className="flex flex-col gap-3">
                    {[["yes","希望する（写真・体重など）"],["no","希望しない"],["consult","医師と相談して決める"]].map(([v, l]) => (
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
              <div className="space-y-6">
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

            <div className="flex gap-4 pb-10">
              <button type="button" onClick={() => setStep(1)} className="flex-1 border border-clinic-offwhite/20 text-clinic-offwhite/50 py-4 text-sm tracking-widest font-serif hover:border-clinic-gold/50 transition-all">
                戻る
              </button>
              <button type="submit" disabled={submitting || form.plans.length === 0} className="flex-[2] border border-clinic-gold text-clinic-gold py-4 text-sm tracking-widest font-serif hover:bg-clinic-gold hover:text-clinic-black transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                {submitting ? "送信中..." : "予約を確定する"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
