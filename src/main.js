import './style.css'
import { router } from './router'
import { supabase } from './lib/supabase'
import { initAIAssistant } from './components/AIAssistant'
import { initNotificationCenter } from './components/NotificationCenter'

// Check authentication state
async function checkAuth() {
  // First, check if there's a hash fragment (email confirmation callback)
  const hashParams = new URLSearchParams(window.location.hash.substring(1))
  const accessToken = hashParams.get('access_token')
  const refreshToken = hashParams.get('refresh_token')
  
  if (accessToken) {
    console.log('Found auth tokens in URL, processing confirmation...')
    // Supabase client will automatically handle this
    // Just wait a moment for it to process
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

// Initialize app
async function init() {
  try {
    const app = document.querySelector('#app')
    
    if (!app) {
      console.error('App container not found!')
      return
    }
    
    console.log('Initializing EcoLinda app...')
    
    // Check if we're processing an email confirmation
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    const isEmailConfirmation = hashParams.get('access_token') && hashParams.get('type') === 'signup'
    
    if (isEmailConfirmation) {
      console.log('Processing email confirmation...')
      // Show a loading message
      app.innerHTML = `
        <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
          <div class="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
            <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
            <h2 class="text-2xl font-bold text-gray-800 mb-2">Confirming Your Email</h2>
            <p class="text-gray-600">Please wait while we verify your account...</p>
          </div>
        </div>
      `
    }
    
    // Check if user is authenticated
    const session = await checkAuth()
    console.log('Session:', session ? 'Authenticated' : 'Not authenticated')
    
    // Listen to auth changes
    supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session)
      
      // Handle different auth events
      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        console.log('User signed in or updated, redirecting to home...')
        
        // Show success message for email confirmation
        if (isEmailConfirmation) {
          app.innerHTML = `
            <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
              <div class="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
                <div class="text-green-600 mb-4">
                  <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h2 class="text-2xl font-bold text-gray-800 mb-2">Email Confirmed!</h2>
                <p class="text-gray-600 mb-4">Your account has been verified successfully.</p>
                <p class="text-sm text-gray-500">Redirecting to your dashboard...</p>
              </div>
            </div>
          `
          await new Promise(resolve => setTimeout(resolve, 2000))
        }
        
        // Navigate to home for authenticated users
        router.navigate('/home')
        
        // Initialize AI Assistant and Notification Center
        setTimeout(() => {
          initAIAssistant()
          initNotificationCenter()
        }, 500)
      } else if (event === 'SIGNED_OUT') {
        console.log('User signed out, redirecting to landing...')
        router.navigate('/')
      } else if (event === 'TOKEN_REFRESHED') {
        console.log('Token refreshed successfully')
      }
    })
    
    // Initialize router
    router.init(app)
    console.log('Router initialized successfully')
    
    // Initialize AI Assistant if already authenticated
    if (session) {
      initAIAssistant()
      initNotificationCenter()
      console.log('AI Assistant and Notification Center initialized')
    }
  } catch (error) {
    console.error('Error initializing app:', error)
    document.querySelector('#app').innerHTML = `
      <div class="min-h-screen flex items-center justify-center bg-red-50">
        <div class="bg-white p-8 rounded-xl shadow-lg max-w-md">
          <h1 class="text-2xl font-bold text-red-600 mb-4">Initialization Error</h1>
          <p class="text-gray-700">${error.message}</p>
        </div>
      </div>
    `
  }
}

// Start the app
init()
