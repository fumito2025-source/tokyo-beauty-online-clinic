-- ========================================
-- 予約テーブル
-- ========================================
create table public.reservations (
  id uuid default uuid_generate_v4() primary key,

  -- 基本情報
  full_name text not null,
  date_of_birth date not null,
  gender text not null check (gender in ('male','female','other')),
  phone text not null,
  email text not null,
  postal_code text not null,
  address text not null,

  -- 予約情報
  reserved_at timestamptz not null,
  plans text[] not null default '{}',        -- 美白・AGA・肥満
  follow_up text not null check (follow_up in ('yes','no','consult')),
  concern text not null,

  -- 問診内容
  medical_history text,
  current_medications text,
  pregnancy text not null check (pregnancy in ('yes','no','na')),

  -- 管理
  status text not null default 'pending' check (status in ('pending','confirmed','completed','cancelled')),
  doctor_notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 誰でも予約を作成可能（ログイン不要）
alter table public.reservations enable row level security;
create policy "予約は誰でも作成可" on public.reservations
  for insert with check (true);

-- 管理者のみ全件参照可
create policy "管理者は全件参照可" on public.reservations
  for select using (
    auth.jwt() ->> 'role' = 'admin'
    or (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );

create policy "管理者は更新可" on public.reservations
  for update using (
    auth.jwt() ->> 'role' = 'admin'
    or (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );
