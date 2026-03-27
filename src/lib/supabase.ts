import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ??
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL ??
  "";

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ??
  "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase env vars are missing. Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
}

const fallbackUrl = "https://placeholder.supabase.co";
const fallbackAnonKey = "placeholder-anon-key";

export const supabase = createClient(
  supabaseUrl || fallbackUrl,
  supabaseAnonKey || fallbackAnonKey,
);

export function createIsolatedSupabaseClient() {
  return createClient(supabaseUrl || fallbackUrl, supabaseAnonKey || fallbackAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}
