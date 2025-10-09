import { router } from '../router'
import { supabase } from '../lib/supabase'

export function SignupPage() {
  const page = document.createElement('div')
  page.className = 'min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/10 to-background-light dark:from-background-dark dark:to-background-dark'
  
  page.innerHTML = `
    <div class="w-full max-w-md">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-text-light dark:text-text-dark mb-2">Join the Mission</h1>
          <p class="text-text-light/70 dark:text-text-dark/70">Create your account to start healing the earth</p>
        </div>
        
        <form id="signup-form" class="space-y-6">
          <div>
            <label for="fullname" class="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              required
              class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="John Doe"
            />
          </div>
          
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
              minlength="6"
              class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="At least 6 characters"
            />
          </div>
          
          <div id="error-message" class="hidden p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm"></div>
          <div id="success-message" class="hidden p-4 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm"></div>
          
          <button
            type="submit"
            id="signup-btn"
            class="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
          >
            Create Account
          </button>
        </form>
        
        <div class="mt-6 text-center">
          <button id="login-link" class="text-text-light/60 dark:text-text-dark/60 hover:text-primary text-sm">
            Already have an account? <span class="text-primary font-semibold">Log in</span>
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
  
  const form = page.querySelector('#signup-form')
  const errorMessage = page.querySelector('#error-message')
  const successMessage = page.querySelector('#success-message')
  const signupBtn = page.querySelector('#signup-btn')
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    const fullname = page.querySelector('#fullname').value
    const email = page.querySelector('#email').value
    const password = page.querySelector('#password').value
    
    // Show loading state
    signupBtn.disabled = true
    signupBtn.textContent = 'Creating account...'
    errorMessage.classList.add('hidden')
    successMessage.classList.add('hidden')
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullname,
          }
        }
      })
      
      if (error) throw error
      
      // Show success message
      successMessage.textContent = 'Account created successfully! Please check your email to verify your account.'
      successMessage.classList.remove('hidden')
      
      // Clear form
      form.reset()
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.navigate('/login')
      }, 3000)
      
    } catch (error) {
      console.error('Signup error:', error)
      errorMessage.textContent = error.message || 'An error occurred during signup'
      errorMessage.classList.remove('hidden')
    } finally {
      signupBtn.disabled = false
      signupBtn.textContent = 'Create Account'
    }
  })
  
  page.querySelector('#login-link').addEventListener('click', () => {
    router.navigate('/login')
  })
  
  page.querySelector('#back-link').addEventListener('click', () => {
    router.navigate('/')
  })
  
  return page
}
