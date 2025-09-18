
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bvefihcnixucsvdhgmtg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2ZWZpaGNuaXh1Y3N2ZGhnbXRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNjA2MjAsImV4cCI6MjA3MzczNjYyMH0.jXSGY_7DdMeG3z-GU8PDqGE09W-Mo2XeoG6CcnobgtY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types (you can generate these from Supabase CLI)
export type Database = {
  public: {
    Tables: {
      // Define your table types here
    }
  }
}
