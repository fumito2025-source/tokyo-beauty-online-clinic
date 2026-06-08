# 東京美容オンラインクリニック — ECサイト

Next.js 15 + Supabase + Stripe で構築されたオンライン自由診療クリニック向けECサイト。

## 機能

- ✅ 商品・サービス一覧（処方薬 / サプリ / 診療 / 美容品）
- ✅ 会員登録・ログイン（Supabase Auth）
- ✅ オンライン問診フォーム
- ✅ カート機能（Zustand、ローカル永続化）
- ✅ Stripe 決済
- ✅ 注文・問診履歴（マイページ）
- ✅ Webhook による自動注文登録
- ✅ 処方薬は問診完了済みユーザーのみ購入可能

## セットアップ手順

### 1. 依存パッケージのインストール

```bash
npm install
```

### 2. 環境変数の設定

```bash
cp .env.example .env.local
```

`.env.local` を開いて以下を設定：

**Supabase:**
1. https://supabase.com でプロジェクト作成
2. Settings > API から URL と anon key を取得
3. Settings > API から service_role key を取得

**Stripe:**
1. https://dashboard.stripe.com でアカウント作成
2. Developers > API keys から Publishable key と Secret key を取得

### 3. データベースのセットアップ

```bash
# Supabase CLI を使う場合
npx supabase init
npx supabase db push

# または Supabase Dashboard の SQL Editor に以下を貼り付け
# supabase/migrations/001_initial_schema.sql の内容をコピー
```

### 4. 開発サーバー起動

```bash
npm run dev
```

http://localhost:3000 で起動します。

### 5. Stripe Webhook の設定（ローカル開発）

```bash
# Stripe CLI をインストール
brew install stripe/stripe-cli/stripe

# Webhook をローカルに転送
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# 表示された whsec_... を .env.local の STRIPE_WEBHOOK_SECRET に設定
```

### 6. 管理者ユーザーの設定

Supabase Dashboard > Authentication > Users で管理者にしたいユーザーを選択し、
User Metadata に以下を追加：

```json
{ "role": "admin" }
```

## ディレクトリ構成

```
src/
├── app/
│   ├── page.tsx              # トップページ
│   ├── products/
│   │   ├── page.tsx          # 商品一覧
│   │   └── [slug]/
│   │       └── page.tsx      # 商品詳細
│   ├── cart/
│   │   └── page.tsx          # カート
│   ├── checkout/
│   │   └── success/page.tsx  # 購入完了
│   ├── account/
│   │   ├── page.tsx          # マイページ
│   │   ├── login/page.tsx    # ログイン・会員登録
│   │   └── consultation/     # 問診フォーム
│   └── api/
│       ├── checkout/         # Stripe チェックアウト
│       ├── webhooks/stripe/  # Stripe Webhook
│       └── auth/signout/     # ログアウト
├── components/
│   └── layout/
│       ├── Header.tsx
│       └── Footer.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts         # ブラウザ用 Supabase
│   │   └── server.ts         # サーバー用 Supabase
│   └── store/
│       └── cart.ts           # カート状態管理
└── types/
    └── index.ts              # 型定義
```

## 本番環境へのデプロイ（Vercel）

```bash
# Vercel CLI
npx vercel

# 環境変数を Vercel Dashboard で設定
# NEXT_PUBLIC_SUPABASE_URL
# NEXT_PUBLIC_SUPABASE_ANON_KEY
# SUPABASE_SERVICE_ROLE_KEY
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
# STRIPE_SECRET_KEY
# STRIPE_WEBHOOK_SECRET
# NEXT_PUBLIC_APP_URL (= https://your-domain.vercel.app)
```

本番用 Webhook は Stripe Dashboard > Developers > Webhooks で設定：
- URL: `https://your-domain.vercel.app/api/webhooks/stripe`
- Event: `checkout.session.completed`

## 法的注意事項

- 医薬品をECサイトで販売する場合は、薬機法・医療法に基づく許可が必要です
- 自由診療でも電子処方箋・診察の要件を満たす必要があります  
- 特定商取引法に基づく表記（/legal/tokusho）を必ず作成してください
- プライバシーポリシー（/legal/privacy）も必須です
