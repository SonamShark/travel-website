-- =============================================================
-- Thubten Travels — Supabase schema
-- Paste into Supabase SQL Editor and run once.
-- Idempotent: safe to re-run.
-- =============================================================

create extension if not exists "pgcrypto";

-- ----- destinations ------------------------------------------
create table if not exists destinations (
  id                uuid primary key default gen_random_uuid(),
  slug              text unique not null,
  name              text not null,
  image             text,
  short_description text,
  long_description  text,
  highlights        text[] default '{}',
  best_time         text,
  sort_order        int default 0,
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);
create index if not exists idx_destinations_sort on destinations (sort_order);

-- ----- holiday_types -----------------------------------------
create table if not exists holiday_types (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  name        text not null,
  image       text,
  description text,
  sort_order  int default 0,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);
create index if not exists idx_holiday_types_sort on holiday_types (sort_order);

-- ----- packages ----------------------------------------------
create table if not exists packages (
  id                uuid primary key default gen_random_uuid(),
  slug              text unique not null,
  title             text not null,
  duration          text,
  price             text,
  image             text,
  short_description text,
  type              text,
  destinations      text[] default '{}',
  itinerary         jsonb  default '[]'::jsonb,
  inclusions        text[] default '{}',
  exclusions        text[] default '{}',
  featured          boolean default false,
  sort_order        int default 0,
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);
create index if not exists idx_packages_sort on packages (sort_order);
create index if not exists idx_packages_featured on packages (featured);

-- ----- blogs -------------------------------------------------
create table if not exists blogs (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  image        text,
  excerpt      text,
  content      text,
  author       text,
  published_at timestamptz default now(),
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);
create index if not exists idx_blogs_published on blogs (published_at desc);

-- ----- enquiries ---------------------------------------------
do $$
begin
  if not exists (select 1 from pg_type where typname = 'enquiry_status') then
    create type enquiry_status as enum ('new', 'in_progress', 'completed');
  end if;
  if not exists (select 1 from pg_type where typname = 'enquiry_source') then
    create type enquiry_source as enum ('enquiry', 'contact');
  end if;
end$$;

create table if not exists enquiries (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  email         text not null,
  phone         text,
  country       text,
  travel_date   date,
  travelers     int,
  destination   text,
  holiday_type  text,
  budget        text,
  message       text,
  source        enquiry_source default 'enquiry',
  status        enquiry_status default 'new',
  ip            text,
  user_agent    text,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);
create index if not exists idx_enquiries_status_created
  on enquiries (status, created_at desc);
create index if not exists idx_enquiries_ip_created
  on enquiries (ip, created_at desc);

-- ----- site_settings (KV) ------------------------------------
create table if not exists site_settings (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz default now()
);

-- =============================================================
-- updated_at trigger
-- =============================================================
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

do $$
declare t text;
begin
  for t in select unnest(array[
    'destinations','holiday_types','packages','blogs','enquiries','site_settings'
  ]) loop
    execute format('drop trigger if exists trg_%I_updated on %I', t, t);
    execute format(
      'create trigger trg_%I_updated before update on %I
       for each row execute function set_updated_at()', t, t);
  end loop;
end$$;

-- =============================================================
-- Row Level Security
-- =============================================================
alter table destinations   enable row level security;
alter table holiday_types  enable row level security;
alter table packages       enable row level security;
alter table blogs          enable row level security;
alter table enquiries      enable row level security;
alter table site_settings  enable row level security;

-- Public can READ all content tables
drop policy if exists "public read" on destinations;
create policy "public read" on destinations for select using (true);

drop policy if exists "public read" on holiday_types;
create policy "public read" on holiday_types for select using (true);

drop policy if exists "public read" on packages;
create policy "public read" on packages for select using (true);

drop policy if exists "public read" on blogs;
create policy "public read" on blogs for select using (true);

drop policy if exists "public read" on site_settings;
create policy "public read" on site_settings for select using (true);

-- Public can INSERT enquiries (form submissions) but cannot read them
drop policy if exists "public submit" on enquiries;
create policy "public submit" on enquiries for insert with check (true);

-- All writes on content + reads on enquiries happen with the service_role
-- key from API routes; service_role bypasses RLS by design.

-- =============================================================
-- Storage bucket for image uploads
-- =============================================================
insert into storage.buckets (id, name, public)
values ('uploads', 'uploads', true)
on conflict (id) do nothing;

-- Allow public read of uploaded images
drop policy if exists "public read uploads" on storage.objects;
create policy "public read uploads" on storage.objects
  for select using (bucket_id = 'uploads');
