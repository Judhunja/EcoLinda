import './style.css'
import { router } from './router'
import { supabase } from './lib/supabase'
import { initAIAssistant } from './components/AIAssistant'
import { initNotificationCenter } from './components/NotificationCenter'

// Check authentication state
async function checkAuth() {
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
    
    // Check if user is authenticated
    const session = await checkAuth()
    console.log('Session:', session ? 'Authenticated' : 'Not authenticated')
    
    // Listen to auth changes
    supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session)
      router.navigate(session ? '/home' : '/')
      
      // Initialize AI Assistant and Notification Center for authenticated users
      if (session && event === 'SIGNED_IN') {
        setTimeout(() => {
          initAIAssistant()
          initNotificationCenter()
        }, 500)
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
