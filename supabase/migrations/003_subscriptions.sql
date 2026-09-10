-- サブスクリプション管理テーブル
create table if not exists public.subscriptions (
  id                       uuid primary key default gen_random_uuid(),
  stripe_session_id        text unique not null,
  stripe_subscription_id   text unique,
  stripe_customer_id       text,
  user_id                  text,                    -- Supabase auth.users.id (guest可)
  plan_id                  text not null,           -- S1-S7, N1-N4, M1-M5
  plan_name                text not null,
  status                   text not null default 'pending_review',
                           -- pending_review → active → cancelled
  amount                   integer not null default 0,  -- 月額合計 (JPY)
  last_paid_at             timestamptz,
  cancelled_at             timestamptz,
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);

-- updated_at 自動更新
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger subscriptions_updated_at
  before update on public.subscriptions
  for each row execute function public.handle_updated_at();

-- RLS: ユーザーは自分のサブスクを参照可能
alter table public.subscriptions enable row level security;

create policy "users can view own subscriptions"
  on public.subscriptions for select
  using (auth.uid()::text = user_id);

-- Serviceロール（webhook）は全行アクセス可
-- Supabase admin client (service_role) はRLSをバイパスするため追加policy不要
