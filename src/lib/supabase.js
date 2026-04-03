import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vbdwwrtaytbajjtztqbj.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZiZHd3cnRheXRiYWpqdHp0cWJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0MzMyNDMsImV4cCI6MjA4MTAwOTI0M30.oKqYxgyIOHDSJVshWWRHRMCx7XC1oAV1nDzxwpEE2l4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);