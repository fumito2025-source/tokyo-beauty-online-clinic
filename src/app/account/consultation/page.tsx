"use client"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function ConsultationPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    chief_complaint: "",
    current_medications: "",
    allergies: "",
    medical_history: "",
    pregnancy: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push("/account/login?redirect=/account/consultation")
      return
    }

    const { error } = await supabase.from("consultations").insert({
      user_id: user.id,
      status: "pending",
      questionnaire: form,
    })

    setLoading(false)
    if (!error) {
      setStep(3)
    } else {
      alert("エラーが発生しました: " + error.message)
    }
  }

  if (step === 3) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="text-5xl mb-6">✅</div>
        <h1 className="font-serif text-3xl text-stone-800 mb-4">問診を受け付けました</h1>
        <p className="text-stone-500 mb-8 leading-relaxed">
          医師が内容を確認し、診察日程をご連絡いたします。<br />
          通常1〜2営業日以内にメールでご連絡します。
        </p>
        <button onClick={() => router.push("/account")} className="btn-primary">
          マイページへ戻る
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="section-title mb-2">オンライン診療の申し込み</h1>
      <p className="text-stone-500 text-sm mb-10">問診票にご記入ください</p>

      {/* 警告 */}
      <div className="bg-amber-50 border border-amber-200 p-4 mb-8 text-sm text-amber-800">
        ⚠️ 緊急の場合は本サービスをご利用にならず、救急（119）または最寄りの医療機関にご連絡ください。
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            相談したいお悩み・症状 <span className="text-red-500">*</span>
          </label>
          <textarea
            value={form.chief_complaint}
            onChange={(e) => setForm({ ...form, chief_complaint: e.target.value })}
            required
            rows={4}
            className="w-full border border-stone-300 px-4 py-3 text-sm focus:outline-none focus:border-stone-600"
            placeholder="例：シミが気になる、AGAの治療を始めたい、など"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            現在服用中のお薬
          </label>
          <input
            type="text"
            value={form.current_medications}
            onChange={(e) => setForm({ ...form, current_medications: e.target.value })}
            className="w-full border border-stone-300 px-4 py-3 text-sm focus:outline-none focus:border-stone-600"
            placeholder="なし、または薬品名をご記入ください"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            アレルギー
          </label>
          <input
            type="text"
            value={form.allergies}
            onChange={(e) => setForm({ ...form, allergies: e.target.value })}
            className="w-full border border-stone-300 px-4 py-3 text-sm focus:outline-none focus:border-stone-600"
            placeholder="なし、または内容をご記入ください"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            既往歴（過去の病気・手術など）
          </label>
          <textarea
            value={form.medical_history}
            onChange={(e) => setForm({ ...form, medical_history: e.target.value })}
            rows={3}
            className="w-full border border-stone-300 px-4 py-3 text-sm focus:outline-none focus:border-stone-600"
            placeholder="特になし、または内容をご記入ください"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="pregnancy"
            checked={form.pregnancy}
            onChange={(e) => setForm({ ...form, pregnancy: e.target.checked })}
            className="w-4 h-4"
          />
          <label htmlFor="pregnancy" className="text-sm text-stone-700">
            妊娠中または授乳中である
          </label>
        </div>

        <div className="pt-4 border-t border-stone-200">
          <p className="text-xs text-stone-500 mb-4">
            ※入力いただいた情報は診察・処方のみに使用します。第三者への提供は行いません。
          </p>
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-4 text-base disabled:opacity-50"
          >
            {loading ? "送信中..." : "問診票を送信する"}
          </button>
        </div>
      </form>
    </div>
  )
}
