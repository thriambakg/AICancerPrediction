import { Session } from '@supabase/supabase-js';
import { Supabase } from '$lib/types';

declare global {
    namespace App {
        interface Locals {
            supabase: Supabase
            getSession(): Promise<Session | null>
        }
        interface PageData {
            session: Session | null
        }
    }
}

export {};
