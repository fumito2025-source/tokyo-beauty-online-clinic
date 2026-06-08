import { createServerSupabaseClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function AccountPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/account/login")

  const [{ data: orders }, { data: consultations }] = await Promise.all([
    supabase.from("orders").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5),
    supabase.from("consultations").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(3),
  ])

  const STATUS_LABELS: Record<string, string> = {
    pending: "支払い待ち", paid: "支払い完了", reviewing: "医師確認中",
    approved: "承認済み", shipped: "発送済み", delivered: "配達完了", cancelled: "キャンセル"
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="section-title mb-2">マイページ</h1>
      <p className="text-stone-500 text-sm mb-10">{user.email}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {[
          { label: "オンライン診療を予約", href: "/account/consultation", icon: "🏥" },
          { label: "商品・サービス一覧", href: "/products", icon: "🛍️" },
          { label: "カートを見る", href: "/cart", icon: "🛒" },
        ].map((item) => (
          <Link key={item.href} href={item.href}>
            <div className="bg-white border border-stone-200 p-6 hover:border-stone-400 transition-colors text-center">
              <div className="text-3xl mb-2">{item.icon}</div>
              <p className="text-sm text-stone-700">{item.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* 注文履歴 */}
      <section className="mb-12">
        <h2 className="font-serif text-xl text-stone-800 mb-6">注文履歴</h2>
        {!orders || orders.length === 0 ? (
          <div className="bg-stone-50 border border-stone-200 p-8 text-center text-stone-400 text-sm">
            注文履歴はありません
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <div key={order.id} className="bg-white border border-stone-200 p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-stone-800 mb-1">
                    ¥{order.total?.toLocaleString()}（税込）
                  </p>
                  <p className="text-xs text-stone-500">
                    {new Date(order.created_at).toLocaleDateString("ja-JP")}
                  </p>
                </div>
                <span className="text-xs px-3 py-1 bg-stone-100 text-stone-600">
                  {STATUS_LABELS[order.status] || order.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 問診履歴 */}
      <section className="mb-12">
        <h2 className="font-serif text-xl text-stone-800 mb-6">問診・診療履歴</h2>
        {!consultations || consultations.length === 0 ? (
          <div className="bg-stone-50 border border-stone-200 p-8 text-center text-stone-400 text-sm">
            問診履歴はありません
          </div>
        ) : (
          <div className="space-y-3">
            {consultations.map((c) => (
              <div key={c.id} className="bg-white border border-stone-200 p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-stone-800 mb-1">
                    {(c.questionnaire as any)?.chief_complaint || "問診"}
                  </p>
                  <p className="text-xs text-stone-500">
                    {new Date(c.created_at).toLocaleDateString("ja-JP")}
                  </p>
                </div>
                <span className="text-xs px-3 py-1 bg-stone-100 text-stone-600">
                  {{ pending: "待機中", scheduled: "予約確定", completed: "完了", cancelled: "キャンセル" }[c.status as string] || c.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ログアウト */}
      <form action="/api/auth/signout" method="POST">
        <button type="submit" className="text-sm text-stone-500 hover:text-stone-800 underline">
          ログアウト
        </button>
      </form>
    </div>
  )
}
