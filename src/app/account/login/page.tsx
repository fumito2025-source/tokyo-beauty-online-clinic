"use client"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    if (isSignup) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      })
      if (error) {
        setMessage("エラー: " + error.message)
      } else {
        setMessage("確認メールを送信しました。メールをご確認ください。")
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setMessage("ログインに失敗しました。メールアドレスとパスワードを確認してください。")
      } else {
        router.push("/account")
        router.refresh()
      }
    }
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="font-serif text-3xl text-stone-800 text-center mb-2">
        {isSignup ? "会員登録" : "ログイン"}
      </h1>
      <p className="text-stone-500 text-sm text-center mb-10">
        東京美容オンラインクリニック
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignup && (
          <div>
            <label className="block text-sm text-stone-600 mb-1">お名前</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={isSignup}
              className="w-full border border-stone-300 px-4 py-3 text-sm focus:outline-none focus:border-stone-600"
              placeholder="山田 花子"
            />
          </div>
        )}

        <div>
          <label className="block text-sm text-stone-600 mb-1">メールアドレス</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-stone-300 px-4 py-3 text-sm focus:outline-none focus:border-stone-600"
            placeholder="example@email.com"
          />
        </div>

        <div>
          <label className="block text-sm text-stone-600 mb-1">パスワード</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="w-full border border-stone-300 px-4 py-3 text-sm focus:outline-none focus:border-stone-600"
            placeholder="8文字以上"
          />
        </div>

        {message && (
          <div className={`p-4 text-sm ${message.includes("エラー") || message.includes("失敗") ? "bg-red-50 text-red-700 border border-red-200" : "bg-green-50 text-green-700 border border-green-200"}`}>
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary py-4 disabled:opacity-50"
        >
          {loading ? "処理中..." : isSignup ? "会員登録する" : "ログイン"}
        </button>
      </form>

      <div className="text-center mt-6">
        <button
          onClick={() => { setIsSignup(!isSignup); setMessage("") }}
          className="text-sm text-stone-500 hover:text-stone-800 underline"
        >
          {isSignup ? "既にアカウントをお持ちの方はこちら" : "新規会員登録はこちら"}
        </button>
      </div>
    </div>
  )
}
