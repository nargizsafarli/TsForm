
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ubicpfyzreproxzfxpxw.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViaWNwZnl6cmVwcm94emZ4cHh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1OTMxOTgsImV4cCI6MjA2MzE2OTE5OH0.b9fbjfzrPY2EvtqF45hoSGvUSakGL3LXDBnWwCfZpvs"
export const supabase =createClient(supabaseUrl, supabaseKey)