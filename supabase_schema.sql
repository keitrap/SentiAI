-- Create a table to store audit results
create table public.audits (
  id uuid default gen_random_uuid() primary key,
  user_id text not null, -- stored from Clerk user.id
  policy_input text not null,
  risk_score integer,
  findings jsonb,
  provider text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.audits enable row level security;

-- Create a policy that allows users to see only their own audits
-- Note: This requires syncing Clerk users to Supabase or passing the user ID via API.
-- For simplicity in this demo, we'll allow insert/select for authenticated users if we use Supabase Auth,
-- but since we use Clerk, we will handle RLS via the backend API or simple "select * where user_id = ?" queries.

-- Allow the backend (service role) to do everything.
create policy "Enable access to all users" on public.audits for all using (true);
