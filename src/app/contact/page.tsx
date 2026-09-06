"use client"
import { useState } from "react"

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", category: "", message: "" })
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("sending")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus("done")
    } catch {
      setStatus("error")
    }
  }

  const inputClass = "w-full bg-transparent border border-clinic-gray-light text-clinic-offwhite px-4 py-3 text-sm focus:outline-none focus:border-clinic-gold transition-colors placeholder:text-clinic-offwhite/25 tracking-wide"
  const labelClass = "block text-[10px] text-clinic-offwhite/60 tracking-[0.3em] mb-2 font-sans"

  return (
    <main className="min-h-screen bg-clinic-black text-clinic-offwhite">
      {/* Hero */}
      <section className="py-24 border-b border-clinic-gray-light">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.55em] text-clinic-gold mb-4 font-sans">CONTACT</p>
          <div className="w-6 h-px bg-clinic-gold mx-auto mb-8" />
          <h1 className="font-serif font-light text-4xl tracking-[0.15em] mb-5 text-clinic-offwhite">お問い合わせ</h1>
          <p className="text-sm text-clinic-offwhite/45 tracking-wider leading-relaxed">
            お急ぎの場合はLINEよりご相談ください
          </p>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-20">

        {/* LINEバナー */}
        <a
          href="https://line.me/R/ti/p/@555glibw"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-5 border border-[#06C755]/30 bg-[#06C755]/5 hover:bg-[#06C755]/10 transition-colors p-5 mb-12 group"
        >
          <div className="w-10 h-10 bg-[#06C755]/20 rounded-full flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 14 14" fill="#06C755" className="w-5 h-5"><path d="M7 1C3.69 1 1 3.29 1 6.11c0 1.55.82 2.94 2.1 3.9V12L5 10.97c.63.18 1.3.27 2 .27 3.31 0 6-2.29 6-5.11S10.31 1 7 1z"/></svg>
          </div>
          <div className="flex-1">
            <p className="text-sm text-clinic-offwhite/75 tracking-wide mb-0.5">LINEでのご相談が最も早くご対応できます</p>
            <p className="text-xs text-clinic-offwhite/35 tracking-wider">友だち追加 → そのままチャット</p>
          </div>
          <span className="text-[#06C755]/50 group-hover:text-[#06C755] transition-colors">→</span>
        </a>

        {status === "done" ? (
          <div className="border border-clinic-gray-light p-10 text-center bg-clinic-gray-mid">
            <div className="w-12 h-12 border border-clinic-gold/40 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5"><path d="M5 12l4 4 10-10" stroke="#B89050" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <p className="font-serif font-light text-lg tracking-wider text-clinic-offwhite mb-3">送信完了しました</p>
            <p className="text-xs text-clinic-offwhite/40 tracking-wider leading-relaxed">
              内容を確認の上、2営業日以内にご返信いたします。<br />
              お急ぎの場合はLINEよりご連絡ください。
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={labelClass}>お名前 <span className="text-red-400">*</span></label>
              <input
                required
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className={inputClass}
                placeholder="山田 太郎"
              />
            </div>

            <div>
              <label className={labelClass}>メールアドレス <span className="text-red-400">*</span></label>
              <input
                required
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className={inputClass}
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label className={labelClass}>お問い合わせ種別 <span className="text-red-400">*</span></label>
              <select
                required
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className={`${inputClass} bg-clinic-black appearance-none`}
              >
                <option value="">選択してください</option>
                <option value="reservation">予約について</option>
                <option value="medication">薬・処方について</option>
                <option value="payment">お支払いについて</option>
                <option value="delivery">配送について</option>
                <option value="other">その他</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>お問い合わせ内容 <span className="text-red-400">*</span></label>
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                className={inputClass}
                placeholder="お問い合わせ内容をご記入ください"
              />
            </div>

            {status === "error" && (
              <p className="text-red-400 text-xs text-center tracking-wider">
                送信に失敗しました。LINEよりお問い合わせください。
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-clinic-gold text-white py-4 text-xs tracking-[0.3em] font-sans hover:opacity-85 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "送信中..." : "送信する"}
            </button>

            <p className="text-[10px] text-clinic-offwhite/30 text-center tracking-wider leading-relaxed">
              受付時間：10:00〜18:00（土日祝除く）<br />
              通常2営業日以内にご返信いたします
            </p>
          </form>
        )}
      </section>
    </main>
  )
}
