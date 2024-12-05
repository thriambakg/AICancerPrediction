import type { SupabaseClient, Session as SessionSB } from '@supabase/supabase-js';
import type { Database } from './supabase.ts';

export type Session = SessionSB | null;
export type Supabase = SupabaseClient<Database>;
