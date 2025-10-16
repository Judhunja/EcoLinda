import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.')
  console.log('VITE_SUPABASE_URL:', supabaseUrl ? 'Set' : 'Missing')
  console.log('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Set' : 'Missing')
} else {
  console.log('Supabase configured successfully:', supabaseUrl)
}

// Get the site URL based on environment
const getSiteUrl = () => {
  // Check if we're in production (Vercel deployment)
  if (import.meta.env.PROD) {
    return 'https://eco-linda.vercel.app'
  }
  // Development environment
  return 'http://localhost:3001'
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
      redirectTo: getSiteUrl()
    }
  }
)
