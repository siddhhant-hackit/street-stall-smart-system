/*
  Supabase database schema for the restaurant SaaS product.
  Run this in the Supabase SQL editor after creating the project.
*/

create extension if not exists "pgcrypto";

create table if not exists public.restaurants (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid,
  name text not null,
  slug text unique not null,
  currency text not null default 'INR',
  phone text,
  email text,
  address text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key,
  full_name text,
  role text not null default 'admin',
  restaurant_id uuid references public.restaurants(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid references public.restaurants(id) on delete cascade,
  name text not null,
  email text,
  phone text,
  tier text not null default 'standard',
  spice_preference text default 'Medium',
  dietary_tags text[] default '{}',
  favorite_dish text,
  total_spend numeric default 0,
  visit_count integer default 0,
  churn_risk numeric default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid references public.restaurants(id) on delete cascade,
  customer_id uuid references public.customers(id) on delete set null,
  guest_name text not null,
  party_size integer not null default 2,
  reservation_time timestamptz not null,
  status text not null default 'pending',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid references public.restaurants(id) on delete cascade,
  name text not null,
  category text not null,
  price numeric not null default 0,
  available boolean not null default true,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid references public.restaurants(id) on delete cascade,
  customer_id uuid references public.customers(id) on delete set null,
  order_number text not null,
  status text not null default 'pending',
  total numeric not null default 0,
  items jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid references public.restaurants(id) on delete cascade,
  name text not null,
  channel text not null default 'whatsapp',
  template text not null,
  scheduled_for timestamptz,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid references public.restaurants(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text not null default 'inactive',
  plan text not null default 'starter',
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_restaurants_owner_id on public.restaurants(owner_id);
create index if not exists idx_customers_restaurant_id on public.customers(restaurant_id);
create index if not exists idx_reservations_restaurant_id on public.reservations(restaurant_id);
create index if not exists idx_orders_restaurant_id on public.orders(restaurant_id);
create index if not exists idx_subscriptions_restaurant_id on public.subscriptions(restaurant_id);

alter table public.restaurants enable row level security;
alter table public.profiles enable row level security;
alter table public.customers enable row level security;
alter table public.reservations enable row level security;
alter table public.menu_items enable row level security;
alter table public.orders enable row level security;
alter table public.campaigns enable row level security;
alter table public.subscriptions enable row level security;

create policy if not exists "restaurants_isolation" on public.restaurants
  for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

create policy if not exists "profiles_isolation" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

create policy if not exists "customers_isolation" on public.customers
  for all using (
    restaurant_id in (
      select id from public.restaurants where owner_id = auth.uid()
    )
  )
  with check (
    restaurant_id in (
      select id from public.restaurants where owner_id = auth.uid()
    )
  );

create policy if not exists "reservations_isolation" on public.reservations
  for all using (
    restaurant_id in (
      select id from public.restaurants where owner_id = auth.uid()
    )
  )
  with check (
    restaurant_id in (
      select id from public.restaurants where owner_id = auth.uid()
    )
  );

create policy if not exists "menu_items_isolation" on public.menu_items
  for all using (
    restaurant_id in (
      select id from public.restaurants where owner_id = auth.uid()
    )
  )
  with check (
    restaurant_id in (
      select id from public.restaurants where owner_id = auth.uid()
    )
  );

create policy if not exists "orders_isolation" on public.orders
  for all using (
    restaurant_id in (
      select id from public.restaurants where owner_id = auth.uid()
    )
  )
  with check (
    restaurant_id in (
      select id from public.restaurants where owner_id = auth.uid()
    )
  );

create policy if not exists "campaigns_isolation" on public.campaigns
  for all using (
    restaurant_id in (
      select id from public.restaurants where owner_id = auth.uid()
    )
  )
  with check (
    restaurant_id in (
      select id from public.restaurants where owner_id = auth.uid()
    )
  );

create policy if not exists "subscriptions_isolation" on public.subscriptions
  for all using (
    restaurant_id in (
      select id from public.restaurants where owner_id = auth.uid()
    )
  )
  with check (
    restaurant_id in (
      select id from public.restaurants where owner_id = auth.uid()
    )
  );
