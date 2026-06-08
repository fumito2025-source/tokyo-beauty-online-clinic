// ========================================
// 型定義
// ========================================

export type ProductCategory =
  | "prescription"   // 処方薬・医薬品
  | "supplement"     // サプリメント・美容品
  | "consultation"   // オンライン診療・問診
  | "goods"          // その他グッズ

export type OrderStatus =
  | "pending"        // 支払い待ち
  | "paid"           // 支払い完了
  | "reviewing"      // 医師確認中
  | "approved"       // 承認済み
  | "shipped"        // 発送済み
  | "delivered"      // 配達完了
  | "cancelled"      // キャンセル

export type ConsultationStatus =
  | "pending"        // 問診待ち
  | "scheduled"      // 予約確定
  | "completed"      // 完了
  | "cancelled"      // キャンセル

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  long_description?: string
  category: ProductCategory
  price: number              // 円 (税込)
  price_id: string           // Stripe Price ID
  images: string[]
  stock: number | null       // null = 在庫無制限
  requires_consultation: boolean  // 処方薬など問診必要
  is_active: boolean
  is_subscription: boolean   // 定期購入可能か
  subscription_interval?: "month" | "year"
  tags: string[]
  created_at: string
  updated_at: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  user_id: string
  stripe_payment_intent_id: string
  status: OrderStatus
  items: OrderItem[]
  subtotal: number
  tax: number
  total: number
  shipping_address: ShippingAddress
  consultation_id?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  product_id: string
  product_name: string
  price: number
  quantity: number
}

export interface ShippingAddress {
  name: string
  postal_code: string
  prefecture: string
  city: string
  address: string
  phone: string
}

export interface Consultation {
  id: string
  user_id: string
  product_id?: string
  status: ConsultationStatus
  scheduled_at?: string
  questionnaire: ConsultationQuestionnaire
  doctor_notes?: string
  created_at: string
}

export interface ConsultationQuestionnaire {
  chief_complaint: string    // 主訴・相談内容
  current_medications: string // 現在服用中の薬
  allergies: string          // アレルギー
  medical_history: string    // 既往歴
  pregnancy: boolean         // 妊娠・授乳中
}

export interface Profile {
  id: string
  email: string
  full_name: string
  phone?: string
  date_of_birth?: string
  created_at: string
}
