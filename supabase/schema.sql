
-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
    telegram_id BIGINT PRIMARY KEY,
    username TEXT,
    total_snips BIGINT DEFAULT 0 CHECK (total_snips >= 0),
    all_time_snips BIGINT DEFAULT 0 CHECK (all_time_snips >= 0),
    energy_current INTEGER DEFAULT 1000 CHECK (energy_current >= 0),
    last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    referred_by BIGINT REFERENCES public.users(telegram_id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_upgrades table
CREATE TABLE IF NOT EXISTS public.user_upgrades (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id BIGINT REFERENCES public.users(telegram_id) ON DELETE CASCADE,
    upgrade_type TEXT NOT NULL, -- 'tap_power', 'passive_income', 'energy_max'
    current_level INTEGER DEFAULT 0 CHECK (current_level >= 0),
    UNIQUE(user_id, upgrade_type)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_all_time_snips ON public.users(all_time_snips DESC);
CREATE INDEX IF NOT EXISTS idx_users_referred_by ON public.users(referred_by);
CREATE INDEX IF NOT EXISTS idx_user_upgrades_user_id ON public.user_upgrades(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_upgrades ENABLE ROW LEVEL SECURITY;

-- Policies (Adjust based on auth implementation, assuming standard anon/service_role for now)
-- For development, allow full access to authenticated users or service role
CREATE POLICY "Enable read access for all users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON public.users FOR INSERT WITH CHECK (auth.uid() IS NOT NULL); -- Requires Supabase Auth linked to Telegram ID
-- Alternatively, for a simple TWA start without strict RLS first:
-- CREATE POLICY "Enable all access for now" ON public.users FOR ALL USING (true);

-- Set up Realtime
alter publication supabase_realtime add table users;
alter publication supabase_realtime add table user_upgrades;
