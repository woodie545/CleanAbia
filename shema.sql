-- =========================================================
-- CLEANABIA DATABASE
-- INITIAL DATABASE SCHEMA
-- =========================================================

-- =========================================================
-- 1. ENUM TYPES
-- =========================================================

create type public.user_role as enum (
  'reporter',
  'agent',
  'admin'
);

create type public.agent_verification_status as enum (
  'pending',
  'verified',
  'rejected',
  'suspended'
);

create type public.report_category as enum (
  'overflowing_bin',
  'illegal_dumping',
  'blocked_drainage',
  'drainage_clearance',
  'waste_collection',
  'other'
);

create type public.report_priority as enum (
  'low',
  'medium',
  'high',
  'urgent'
);

create type public.report_status as enum (
  'pending_review',
  'confirmed',
  'rejected',
  'assigned',
  'in_progress',
  'completed',
  'cancelled'
);

create type public.job_status as enum (
  'open',
  'assigned',
  'accepted',
  'in_progress',
  'completed',
  'confirmed',
  'cancelled'
);

create type public.transaction_type as enum (
  'job_reward',
  'report_reward',
  'adjustment',
  'withdrawal',
  'refund'
);

create type public.transaction_status as enum (
  'pending',
  'completed',
  'failed',
  'cancelled'
);

create type public.withdrawal_status as enum (
  'pending',
  'approved',
  'rejected',
  'processing',
  'paid',
  'failed'
);

create type public.notification_type as enum (
  'report',
  'job',
  'payment',
  'withdrawal',
  'system'
);


-- =========================================================
-- 2. GENERIC UPDATED_AT FUNCTION
-- =========================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;


-- =========================================================
-- 3. PROFILES
-- =========================================================

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,

  full_name text,
  phone text,
  role public.user_role not null default 'reporter',
  location text,
  avatar_url text,

  points_balance integer not null default 0
    check (points_balance >= 0),

  is_active boolean not null default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index profiles_role_idx
  on public.profiles(role);

create index profiles_location_idx
  on public.profiles(location);

create trigger profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();


-- =========================================================
-- 4. AGENT PROFILES
-- =========================================================

create table public.agent_profiles (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null unique
    references public.profiles(id)
    on delete cascade,

  agent_code text unique,

  verification_status public.agent_verification_status
    not null default 'pending',

  address text,
  lga text,

  -- Sensitive verification information.
  -- RLS will protect this table.
  abssin text,
  nin text,

  is_available boolean not null default false,
  is_verified boolean not null default false,

  verified_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index agent_profiles_user_id_idx
  on public.agent_profiles(user_id);

create index agent_profiles_lga_idx
  on public.agent_profiles(lga);

create index agent_profiles_status_idx
  on public.agent_profiles(verification_status);

create trigger agent_profiles_updated_at
before update on public.agent_profiles
for each row
execute function public.set_updated_at();


-- =========================================================
-- 5. REPORTS
-- =========================================================

create table public.reports (
  id uuid primary key default gen_random_uuid(),

  report_code text unique,

  reporter_id uuid not null
    references public.profiles(id)
    on delete restrict,

  title text not null,
  description text,

  category public.report_category not null,

  priority public.report_priority
    not null default 'medium',

  status public.report_status
    not null default 'pending_review',

  address text not null,
  lga text,

  latitude double precision,
  longitude double precision,

  points_awarded integer not null default 0
    check (points_awarded >= 0),

  reviewed_by uuid
    references public.profiles(id)
    on delete set null,

  reviewed_at timestamptz,
  confirmed_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint reports_coordinates_check
    check (
      (latitude is null and longitude is null)
      or
      (
        latitude between -90 and 90
        and longitude between -180 and 180
      )
    )
);

create index reports_reporter_id_idx
  on public.reports(reporter_id);

create index reports_status_idx
  on public.reports(status);

create index reports_category_idx
  on public.reports(category);

create index reports_lga_idx
  on public.reports(lga);

create index reports_created_at_idx
  on public.reports(created_at desc);

create trigger reports_updated_at
before update on public.reports
for each row
execute function public.set_updated_at();


-- =========================================================
-- 6. REPORT IMAGES
-- =========================================================

create table public.report_images (
  id uuid primary key default gen_random_uuid(),

  report_id uuid not null
    references public.reports(id)
    on delete cascade,

  storage_path text not null,
  public_url text,

  created_at timestamptz not null default now()
);

create index report_images_report_id_idx
  on public.report_images(report_id);


-- =========================================================
-- 7. JOBS
-- =========================================================

create table public.jobs (
  id uuid primary key default gen_random_uuid(),

  job_code text unique,

  report_id uuid not null unique
    references public.reports(id)
    on delete restrict,

  agent_id uuid
    references public.profiles(id)
    on delete set null,

  status public.job_status
    not null default 'open',

  payout_amount numeric(12,2) not null default 0
    check (payout_amount >= 0),

  estimated_minutes integer
    check (estimated_minutes is null or estimated_minutes > 0),

  accepted_at timestamptz,
  started_at timestamptz,
  completed_at timestamptz,
  confirmed_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index jobs_agent_id_idx
  on public.jobs(agent_id);

create index jobs_status_idx
  on public.jobs(status);

create index jobs_created_at_idx
  on public.jobs(created_at desc);

create trigger jobs_updated_at
before update on public.jobs
for each row
execute function public.set_updated_at();


-- =========================================================
-- 8. JOB EVENTS
-- =========================================================

create table public.job_events (
  id uuid primary key default gen_random_uuid(),

  job_id uuid not null
    references public.jobs(id)
    on delete cascade,

  event_type text not null,

  note text,

  created_by uuid
    references public.profiles(id)
    on delete set null,

  created_at timestamptz not null default now()
);

create index job_events_job_id_idx
  on public.job_events(job_id);

create index job_events_created_at_idx
  on public.job_events(created_at);


-- =========================================================
-- 9. TRANSACTIONS
-- =========================================================

create table public.transactions (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references public.profiles(id)
    on delete restrict,

  job_id uuid
    references public.jobs(id)
    on delete set null,

  report_id uuid
    references public.reports(id)
    on delete set null,

  type public.transaction_type not null,

  amount numeric(12,2) not null
    check (amount >= 0),

  status public.transaction_status
    not null default 'pending',

  description text,

  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create index transactions_user_id_idx
  on public.transactions(user_id);

create index transactions_job_id_idx
  on public.transactions(job_id);

create index transactions_type_idx
  on public.transactions(type);

create index transactions_status_idx
  on public.transactions(status);

create index transactions_created_at_idx
  on public.transactions(created_at desc);


-- =========================================================
-- 10. WITHDRAWAL REQUESTS
-- =========================================================

create table public.withdrawal_requests (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references public.profiles(id)
    on delete restrict,

  amount numeric(12,2) not null
    check (amount > 0),

  bank_name text not null,
  account_name text not null,
  account_number text not null,

  status public.withdrawal_status
    not null default 'pending',

  admin_note text,

  requested_at timestamptz not null default now(),

  processed_at timestamptz,

  processed_by uuid
    references public.profiles(id)
    on delete set null
);

create index withdrawal_requests_user_id_idx
  on public.withdrawal_requests(user_id);

create index withdrawal_requests_status_idx
  on public.withdrawal_requests(status);

create index withdrawal_requests_requested_at_idx
  on public.withdrawal_requests(requested_at desc);


-- =========================================================
-- 11. NOTIFICATIONS
-- =========================================================

create table public.notifications (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references public.profiles(id)
    on delete cascade,

  title text not null,
  message text not null,

  type public.notification_type
    not null default 'system',

  is_read boolean not null default false,

  created_at timestamptz not null default now(),
  read_at timestamptz
);

create index notifications_user_id_idx
  on public.notifications(user_id);

create index notifications_unread_idx
  on public.notifications(user_id, is_read);

create index notifications_created_at_idx
  on public.notifications(created_at desc);


-- =========================================================
-- 12. RECYCLING CENTRES
-- =========================================================

create table public.recycling_centres (
  id uuid primary key default gen_random_uuid(),

  name text not null,
  description text,

  address text not null,
  lga text,

  phone text,

  latitude double precision,
  longitude double precision,

  accepted_materials text[] not null default '{}',

  opening_time time,
  closing_time time,

  is_active boolean not null default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint recycling_centres_coordinates_check
    check (
      (latitude is null and longitude is null)
      or
      (
        latitude between -90 and 90
        and longitude between -180 and 180
      )
    )
);

create index recycling_centres_lga_idx
  on public.recycling_centres(lga);

create index recycling_centres_active_idx
  on public.recycling_centres(is_active);

create trigger recycling_centres_updated_at
before update on public.recycling_centres
for each row
execute function public.set_updated_at();


-- =========================================================
-- 13. AUTO-CREATE PROFILE WHEN AUTH USER SIGNS UP
-- =========================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin

  insert into public.profiles (
    id,
    full_name,
    role
  )
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      ''
    ),
    'reporter'
  );

  return new;

end;
$$;


create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();


-- =========================================================
-- 14. GENERATE AGENT CODE
-- =========================================================

create or replace function public.generate_agent_code()
returns trigger
language plpgsql
as $$
begin

  if new.agent_code is null then

    new.agent_code :=
      'AGT-' ||
      lpad(
        (
          select count(*) + 1
          from public.agent_profiles
        )::text,
        6,
        '0'
      );

  end if;

  return new;

end;
$$;


create trigger agent_code_trigger
before insert on public.agent_profiles
for each row
execute function public.generate_agent_code();

-- =========================================================
-- CLEANABIA
-- ROW LEVEL SECURITY
-- =========================================================

alter table public.profiles
enable row level security;

alter table public.agent_profiles
enable row level security;

alter table public.reports
enable row level security;

alter table public.report_images
enable row level security;

alter table public.jobs
enable row level security;

alter table public.job_events
enable row level security;

alter table public.transactions
enable row level security;

alter table public.withdrawal_requests
enable row level security;

alter table public.notifications
enable row level security;

alter table public.recycling_centres
enable row level security;

-- =========================================================
-- HELPER FUNCTIONS
-- =========================================================

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
      and is_active = true
  );
$$;


create or replace function public.is_agent()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'agent'
      and is_active = true
  );
$$;

-- =========================================================
-- PROFILES
-- =========================================================

create policy "Users can view their own profile"
on public.profiles
for select
to authenticated
using (
  id = auth.uid()
);


create policy "Admins can view all profiles"
on public.profiles
for select
to authenticated
using (
  public.is_admin()
);


create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using (
  id = auth.uid()
)
with check (
  id = auth.uid()
);


create policy "Admins can update all profiles"
on public.profiles
for update
to authenticated
using (
  public.is_admin()
)
with check (
  public.is_admin()
);

-- =========================================================
-- AGENT PROFILES
-- =========================================================

create policy "Agents can view their own agent profile"
on public.agent_profiles
for select
to authenticated
using (
  user_id = auth.uid()
);


create policy "Admins can view all agent profiles"
on public.agent_profiles
for select
to authenticated
using (
  public.is_admin()
);


create policy "Agents can update their own agent profile"
on public.agent_profiles
for update
to authenticated
using (
  user_id = auth.uid()
)
with check (
  user_id = auth.uid()
);


create policy "Admins can update agent profiles"
on public.agent_profiles
for update
to authenticated
using (
  public.is_admin()
)
with check (
  public.is_admin()
);


create policy "Agents can create their own agent profile"
on public.agent_profiles
for insert
to authenticated
with check (
  user_id = auth.uid()
);

-- Function to check if the current user is active
create or replace function public.is_active_user()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 
    from public.profiles 
    where id = auth.uid() 
      and is_active = true -- Adjust 'is_active' to match your actual column name
  );
$$;

-- Function to check if the current user is an admin
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 
    from public.profiles 
    where id = auth.uid() 
      and role = 'admin' -- Adjust 'role' and value to match your setup
  );
$$;

-- =========================================================
-- REPORTS
-- =========================================================

create policy "Reporters can view their own reports"
on public.reports
for select
to authenticated
using (
  reporter_id = auth.uid()
);


create policy "Reporters can create reports"
on public.reports
for insert
to authenticated
with check (
  reporter_id = auth.uid()
  and public.is_active_user()
);


create policy "Admins can view all reports"
on public.reports
for select
to authenticated
using (
  public.is_admin()
);


create policy "Admins can create reports"
on public.reports
for insert
to authenticated
with check (
  public.is_admin()
);


create policy "Admins can update reports"
on public.reports
for update
to authenticated
using (
  public.is_admin()
)
with check (
  public.is_admin()
);

-- =========================================================
-- REPORT IMAGES
-- =========================================================

-- Drop existing policies if they already exist
drop policy if exists "Reporters can view their report images" on public.report_images;
drop policy if exists "Reporters can add images to their reports" on public.report_images;
drop policy if exists "Admins can manage report images" on public.report_images;

-- Re-create policies
create policy "Reporters can view their report images"
on public.report_images
for select
to authenticated
using (
  exists (
    select 1
    from public.reports
    where reports.id = report_images.report_id
      and reports.reporter_id = auth.uid()
  )
);

create policy "Reporters can add images to their reports"
on public.report_images
for insert
to authenticated
with check (
  exists (
    select 1
    from public.reports
    where reports.id = report_images.report_id
      and reports.reporter_id = auth.uid()
  )
);

create policy "Admins can manage report images"
on public.report_images
for all
to authenticated
using (
  public.is_admin()
)
with check (
  public.is_admin()
);

-- =========================================================
-- JOBS
-- =========================================================

create policy "Agents can view open jobs"
on public.jobs
for select
to authenticated
using (
  public.is_agent()
  and (
    status = 'open'
    or agent_id = auth.uid()
  )
);


create policy "Admins can view all jobs"
on public.jobs
for select
to authenticated
using (
  public.is_admin()
);


create policy "Admins can create jobs"
on public.jobs
for insert
to authenticated
with check (
  public.is_admin()
);


create policy "Admins can update jobs"
on public.jobs
for update
to authenticated
using (
  public.is_admin()
)
with check (
  public.is_admin()
);

-- =========================================================
-- JOB EVENTS
-- =========================================================

create policy "Agents can view events for their jobs"
on public.job_events
for select
to authenticated
using (
  exists (
    select 1
    from public.jobs
    where jobs.id = job_events.job_id
      and jobs.agent_id = auth.uid()
  )
);


create policy "Admins can manage job events"
on public.job_events
for all
to authenticated
using (
  public.is_admin()
)
with check (
  public.is_admin()
);

-- =========================================================
-- TRANSACTIONS
-- =========================================================

create policy "Users can view their own transactions"
on public.transactions
for select
to authenticated
using (
  user_id = auth.uid()
);


create policy "Admins can view all transactions"
on public.transactions
for select
to authenticated
using (
  public.is_admin()
);


create policy "Admins can create transactions"
on public.transactions
for insert
to authenticated
with check (
  public.is_admin()
);

-- =========================================================
-- WITHDRAWALS
-- =========================================================

create policy "Users can view their own withdrawals"
on public.withdrawal_requests
for select
to authenticated
using (
  user_id = auth.uid()
);


create policy "Users can request withdrawals"
on public.withdrawal_requests
for insert
to authenticated
with check (
  user_id = auth.uid()
  and public.is_active_user()
);


create policy "Admins can view all withdrawals"
on public.withdrawal_requests
for select
to authenticated
using (
  public.is_admin()
);


create policy "Admins can update withdrawals"
on public.withdrawal_requests
for update
to authenticated
using (
  public.is_admin()
)
with check (
  public.is_admin()
);

-- =========================================================
-- NOTIFICATIONS
-- =========================================================

create policy "Users can view their own notifications"
on public.notifications
for select
to authenticated
using (
  user_id = auth.uid()
);


create policy "Users can mark their notifications as read"
on public.notifications
for update
to authenticated
using (
  user_id = auth.uid()
)
with check (
  user_id = auth.uid()
);


create policy "Admins can manage notifications"
on public.notifications
for all
to authenticated
using (
  public.is_admin()
)
with check (
  public.is_admin()
);

-- =========================================================
-- RECYCLING CENTRES
-- =========================================================

create policy "Anyone can view active recycling centres"
on public.recycling_centres
for select
to anon, authenticated
using (
  is_active = true
);


create policy "Admins can manage recycling centres"
on public.recycling_centres
for all
to authenticated
using (
  public.is_admin()
)
with check (
  public.is_admin()
);

-- =========================================================
-- AVATAR STORAGE
-- =========================================================

create policy "Users can upload their own avatars"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);


create policy "Users can view their own avatars"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);


create policy "Users can update their own avatars"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);


create policy "Users can delete their own avatars"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- =========================================================
-- REPORT IMAGE STORAGE
-- =========================================================

create policy "Reporters can upload report images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'report-images'
  and exists (
    select 1
    from public.reports
    where reports.id::text = (storage.foldername(name))[1]
      and reports.reporter_id = auth.uid()
  )
);


create policy "Reporters can view their report images"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'report-images'
  and exists (
    select 1
    from public.reports
    where reports.id::text = (storage.foldername(name))[1]
      and reports.reporter_id = auth.uid()
  )
);


create policy "Reporters can delete their report images"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'report-images'
  and exists (
    select 1
    from public.reports
    where reports.id::text = (storage.foldername(name))[1]
      and reports.reporter_id = auth.uid()
  )
);


create policy "Admins can manage report images"
on storage.objects
for all
to authenticated
using (
  bucket_id = 'report-images'
  and public.is_admin()
)
with check (
  bucket_id = 'report-images'
  and public.is_admin()
);

-- =========================================================
-- PROTECT PRIVILEGED PROFILE FIELDS
-- =========================================================

create or replace function public.protect_profile_privileges()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin

  -- Normal users cannot change their own role.
  if auth.uid() = old.id
     and not public.is_admin()
  then

    new.role := old.role;
    new.is_active := old.is_active;
    new.points_balance := old.points_balance;

  end if;

  return new;

end;
$$;


create trigger protect_profile_privileges_trigger
before update on public.profiles
for each row
execute function public.protect_profile_privileges();

-- =========================================================
-- PROTECT AGENT VERIFICATION
-- =========================================================

create or replace function public.protect_agent_verification()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin

  if auth.uid() = old.user_id
     and not public.is_admin()
  then

    new.verification_status := old.verification_status;
    new.is_verified := old.is_verified;
    new.verified_at := old.verified_at;

  end if;

  return new;

end;
$$;


create trigger protect_agent_verification_trigger
before update on public.agent_profiles
for each row
execute function public.protect_agent_verification();

-- =========================================================
-- ACCEPT JOB
-- =========================================================

create or replace function public.accept_job(
  p_job_id uuid
)
returns public.jobs
language plpgsql
security definer
set search_path = public
as $$
declare
  v_job public.jobs;
begin

  -- Make sure user is logged in.
  if auth.uid() is null then
    raise exception 'You must be logged in.';
  end if;

  -- Make sure user is an active agent.
  if not public.is_agent() then
    raise exception 'Only active agents can accept jobs.';
  end if;

  -- Lock the job row.
  select *
  into v_job
  from public.jobs
  where id = p_job_id
  for update;

  -- Job doesn't exist.
  if v_job.id is null then
    raise exception 'Job not found.';
  end if;

  -- Someone already accepted it.
  if v_job.status <> 'open' then
    raise exception 'This job is no longer available.';
  end if;

  -- Assign the job.
  update public.jobs
  set
    agent_id = auth.uid(),
    status = 'accepted',
    accepted_at = now(),
    updated_at = now()
  where id = p_job_id
  returning *
  into v_job;

  -- Create timeline event.
  insert into public.job_events (
    job_id,
    event_type,
    note,
    created_by
  )
  values (
    p_job_id,
    'accepted',
    'Job accepted by agent.',
    auth.uid()
  );

  return v_job;

end;
$$;

-- =========================================================
-- COMPLETE JOB
-- =========================================================

create or replace function public.complete_job(
  p_job_id uuid,
  p_note text default null
)
returns public.jobs
language plpgsql
security definer
set search_path = public
as $$
declare
  v_job public.jobs;
begin

  if auth.uid() is null then
    raise exception 'You must be logged in.';
  end if;

  if not public.is_agent() then
    raise exception 'Only agents can complete jobs.';
  end if;

  select *
  into v_job
  from public.jobs
  where id = p_job_id
  for update;

  if v_job.id is null then
    raise exception 'Job not found.';
  end if;

  if v_job.agent_id <> auth.uid() then
    raise exception 'You are not assigned to this job.';
  end if;

  if v_job.status not in ('accepted', 'in_progress') then
    raise exception 'This job cannot be completed.';
  end if;

  update public.jobs
  set
    status = 'completed',
    completed_at = now(),
    updated_at = now()
  where id = p_job_id
  returning *
  into v_job;

  insert into public.job_events (
    job_id,
    event_type,
    note,
    created_by
  )
  values (
    p_job_id,
    'completed',
    p_note,
    auth.uid()
  );

  return v_job;

end;
$$;

-- =========================================================
-- ADMIN FUNCTIONS
-- =========================================================

create or replace function public.confirm_report(
  p_report_id uuid,
  p_points integer default 10,
  p_payout_amount numeric default 0
)
returns public.reports
language plpgsql
security definer
set search_path = public
as $$
declare
  v_report public.reports;
begin

  if auth.uid() is null then
    raise exception 'You must be logged in.';
  end if;

  if not public.is_admin() then
    raise exception 'Only admins can confirm reports.';
  end if;

  select *
  into v_report
  from public.reports
  where id = p_report_id
  for update;

  if v_report.id is null then
    raise exception 'Report not found.';
  end if;

  if v_report.status not in (
    'pending_review',
    'rejected'
  ) then
    raise exception 'This report cannot be confirmed.';
  end if;

  update public.reports
  set
    status = 'confirmed',
    points_awarded = p_points,
    reviewed_by = auth.uid(),
    reviewed_at = now(),
    confirmed_at = now(),
    updated_at = now()
  where id = p_report_id
  returning *
  into v_report;

  -- Award reporter points.
  update public.profiles
  set
    points_balance =
      points_balance + p_points,
    updated_at = now()
  where id = v_report.reporter_id;

  -- Record the reward.
  if p_points > 0 then
    insert into public.transactions (
      user_id,
      report_id,
      type,
      amount,
      status,
      description,
      completed_at
    )
    values (
      v_report.reporter_id,
      v_report.id,
      'report_reward',
      0,
      'completed',
      'Points awarded for confirmed report.',
      now()
    );
  end if;

  -- Create a job.
  insert into public.jobs (
    report_id,
    status,
    payout_amount
  )
  values (
    v_report.id,
    'open',
    p_payout_amount
  )
  on conflict (report_id)
  do nothing;

  return v_report;

end;
$$;
