-- Create the waitlist table
CREATE TABLE IF NOT EXISTS public.waitlist (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    location TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert (for the signup form)
CREATE POLICY "Enable insert for anonymous users" 
ON public.waitlist 
FOR INSERT 
WITH CHECK (true);

-- Allow authenticated users (admin) to read all entries
CREATE POLICY "Enable read for authenticated users only" 
ON public.waitlist 
FOR SELECT 
USING (auth.role() = 'authenticated');

-- Enable Realtime for the waitlist table
ALTER PUBLICATION supabase_realtime ADD TABLE waitlist;
