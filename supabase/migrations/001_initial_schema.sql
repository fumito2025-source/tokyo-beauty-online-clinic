-- ========================================
-- 東京美容オンラインクリニック
-- データベーススキーマ
-- ========================================
-- 実行方法: supabase db push
-- または Supabase Dashboard の SQL Editor にペーストして実行

-- 拡張機能
create extension if not exists "uuid-ossp";

-- ========================================
-- プロフィールテーブル
-- ========================================
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  full_name text,
  phone text,
  date_of_birth date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS (Row Level Security)
alter table public.profiles enable row level security;
create policy "自分のプロフィールのみ参照可" on public.profiles
  for select using (auth.uid() = id);
create policy "自分のプロフィールのみ更新可" on public.profiles
  for update using (auth.uid() = id);

-- ユーザー登録時に自動でプロフィール作成
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ========================================
-- 商品テーブル
-- ========================================
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  description text,
  long_description text,
  category text not null check (category in ('prescription','supplement','consultation','goods')),
  price integer not null,       -- 円 (税込)
  price_id text,                -- Stripe Price ID
  images text[] default '{}',
  stock integer,                -- null = 無制限
  requires_consultation boolean default false,
  is_active boolean default true,
  is_subscription boolean default false,
  subscription_interval text check (subscription_interval in ('month','year')),
  tags text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 商品は誰でも参照可
alter table public.products enable row level security;
create policy "商品は誰でも参照可" on public.products
  for select using (is_active = true);

-- サンプルデータ
insert into public.products (name, slug, description, category, price, requires_consultation, tags) values
('初回オンライン診療', 'online-consultation-first', '医師によるオンラインビデオ診療。美肌・美容・健康のお悩みをご相談ください。', 'consultation', 3300, false, ARRAY['診療','初診']),
('美白トランサミン処方', 'tranexamic-acid', 'シミ・くすみにアプローチするトランサミン（内服薬）の処方。問診後、医師が判断します。', 'prescription', 4400, true, ARRAY['美白','シミ','処方薬']),
('高濃度ビタミンCサプリ', 'vitamin-c-supplement', 'クリニック監修の高濃度ビタミンC（1000mg）。美肌・免疫サポートに。', 'supplement', 3960, false, ARRAY['ビタミンC','サプリ','美肌']),
('プラセンタエキスセラム', 'placenta-serum', 'ヒト胎盤由来エキス配合の高機能美容液。ハリ・ツヤをサポート。', 'supplement', 8800, false, ARRAY['プラセンタ','美容液','エイジングケア']),
('AGAオンライン診療', 'aga-consultation', '薄毛・AGAのオンライン診療。フィナステリド等の処方も対応（問診必須）。', 'consultation', 3300, false, ARRAY['AGA','薄毛','診療']),
('美容点滴セット（自宅用）', 'beauty-drip-kit', '医師監修のグルタチオン・ビタミン点滴キット。看護師訪問サービス別途。', 'goods', 16500, true, ARRAY['点滴','グルタチオン','ホワイトニング']);

-- ========================================
-- 問診テーブル
-- ========================================
create table public.consultations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  product_id uuid references public.products(id),
  status text not null default 'pending' check (status in ('pending','scheduled','completed','cancelled')),
  scheduled_at timestamptz,
  questionnaire jsonb not null default '{}',
  doctor_notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.consultations enable row level security;
create policy "自分の問診のみ参照可" on public.consultations
  for select using (auth.uid() = user_id);
create policy "自分の問診のみ作成可" on public.consultations
  for insert with check (auth.uid() = user_id);

-- ========================================
-- 注文テーブル
-- ========================================
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  stripe_payment_intent_id text unique,
  stripe_session_id text unique,
  status text not null default 'pending' check (status in ('pending','paid','reviewing','approved','shipped','delivered','cancelled')),
  items jsonb not null default '[]',
  subtotal integer not null,
  tax integer not null default 0,
  total integer not null,
  shipping_address jsonb,
  consultation_id uuid references public.consultations(id),
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.orders enable row level security;
create policy "自分の注文のみ参照可" on public.orders
  for select using (auth.uid() = user_id);
create policy "自分の注文のみ作成可" on public.orders
  for insert with check (auth.uid() = user_id);

-- ========================================
-- 管理者ロール（Supabase Dashboard で設定）
-- ========================================
-- Supabase Dashboard > Authentication > Users でユーザーを確認し、
-- 管理者ユーザーのメタデータに { "role": "admin" } を追加してください。
-- または下記のように直接更新:
-- update auth.users set raw_user_meta_data = raw_user_meta_data || '{"role":"admin"}' where email = 'admin@your-clinic.com';
