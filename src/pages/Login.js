import { router } from '../router'
import { supabase } from '../lib/supabase'

export function LoginPage() {
  const page = document.createElement('div')
  page.className = 'min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/10 to-background-light dark:from-background-dark dark:to-background-dark'
  
  page.innerHTML = `
    <div class="w-full max-w-md">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-text-light dark:text-text-dark mb-2">Welcome Back</h1>
          <p class="text-text-light/70 dark:text-text-dark/70">Log in to continue your mission</p>
        </div>
        
        <form id="login-form" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="you@example.com"
            />
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Enter your password"
            />
          </div>
          
          <div id="error-message" class="hidden p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm"></div>
          
          <button
            type="submit"
            id="login-btn"
            class="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
          >
            Log In
          </button>
        </form>
        
        <div class="mt-6 text-center">
          <button id="signup-link" class="text-text-light/60 dark:text-text-dark/60 hover:text-primary text-sm">
            Don't have an account? <span class="text-primary font-semibold">Sign up</span>
          </button>
        </div>
        
        <div class="mt-4 text-center">
          <button id="back-link" class="text-text-light/60 dark:text-text-dark/60 hover:text-primary text-sm inline-flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">arrow_back</span>
            Back to home
          </button>
        </div>
      </div>
    </div>
  `
  
  const form = page.querySelector('#login-form')
  const errorMessage = page.querySelector('#error-message')
  const loginBtn = page.querySelector('#login-btn')
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    const email = page.querySelector('#email').value
    const password = page.querySelector('#password').value
    
    // Show loading state
    loginBtn.disabled = true
    loginBtn.textContent = 'Logging in...'
    errorMessage.classList.add('hidden')
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) throw error
      
      // Success - router will handle navigation via auth state change
      console.log('Login successful:', data)
    } catch (error) {
      console.error('Login error:', error)
      errorMessage.textContent = error.message || 'An error occurred during login'
      errorMessage.classList.remove('hidden')
    } finally {
      loginBtn.disabled = false
      loginBtn.textContent = 'Log In'
    }
  })
  
  page.querySelector('#signup-link').addEventListener('click', () => {
    router.navigate('/signup')
  })
  
  page.querySelector('#back-link').addEventListener('click', () => {
    router.navigate('/')
  })
  
  return page
}
