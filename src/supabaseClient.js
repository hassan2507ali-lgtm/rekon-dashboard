import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rmejdaszlzpjobyxvrer.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtZWpkYXN6bHpwam9ieXh2cmVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI0NzY4ODMsImV4cCI6MjEwODA1Mjg4M30.OQJOshbSZJQcaQsnFduEghheUBJlwZnMZY4-8b5RgXs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)