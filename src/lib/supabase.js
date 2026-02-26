import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Only initialize if credentials exist to prevent production crash
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      from: () => ({
        select: () => ({ order: () => ({ data: [], error: null }), count: 'exact', head: true, data: [], error: null }),
        insert: () => ({ data: null, error: { message: 'Supabase not configured' } }),
      }),
      channel: () => ({ on: () => ({ subscribe: () => ({}) }) }),
      removeChannel: () => {},
      functions: { invoke: () => ({ data: null, error: { message: 'Supabase not configured' } }) }
    };

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Mock client initialized to prevent crash.');
}
