import { router } from '../router'
import { supabase } from '../lib/supabase'

export function DashboardPage() {
  const page = document.createElement('div')
  page.className = 'min-h-screen bg-background-light dark:bg-background-dark'
  
  page.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 py-8">
      <header class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-text-light dark:text-text-dark mb-2">Dashboard</h1>
          <p class="text-text-light/70 dark:text-text-dark/70">Welcome to EcoLinda</p>
        </div>
        <button id="logout-btn" class="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-colors">
          Logout
        </button>
      </header>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div class="flex items-center gap-4 mb-4">
            <div class="p-3 bg-primary/10 rounded-xl">
              <span class="material-symbols-outlined text-primary text-3xl">eco</span>
            </div>
            <div>
              <h3 class="text-xl font-bold text-text-light dark:text-text-dark">Projects</h3>
              <p class="text-text-light/60 dark:text-text-dark/60 text-sm">Active restoration</p>
            </div>
          </div>
          <p class="text-4xl font-bold text-primary">0</p>
        </div>
        
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div class="flex items-center gap-4 mb-4">
            <div class="p-3 bg-accent/10 rounded-xl">
              <span class="material-symbols-outlined text-accent text-3xl">park</span>
            </div>
            <div>
              <h3 class="text-xl font-bold text-text-light dark:text-text-dark">Land Restored</h3>
              <p class="text-text-light/60 dark:text-text-dark/60 text-sm">Square meters</p>
            </div>
          </div>
          <p class="text-4xl font-bold text-accent">0 m²</p>
        </div>
        
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div class="flex items-center gap-4 mb-4">
            <div class="p-3 bg-secondary/10 rounded-xl">
              <span class="material-symbols-outlined text-secondary text-3xl">groups</span>
            </div>
            <div>
              <h3 class="text-xl font-bold text-text-light dark:text-text-dark">Community</h3>
              <p class="text-text-light/60 dark:text-text-dark/60 text-sm">Members involved</p>
            </div>
          </div>
          <p class="text-4xl font-bold text-secondary">1</p>
        </div>
      </div>
      
      <div class="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 class="text-2xl font-bold text-text-light dark:text-text-dark mb-4">Get Started</h2>
        <p class="text-text-light/70 dark:text-text-dark/70 mb-6">
          Begin your journey to heal the earth. Explore restoration projects, track your impact, and connect with like-minded individuals.
        </p>
        <button class="px-8 py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02]">
          Explore Projects
        </button>
      </div>
    </div>
  `
  
  page.querySelector('#logout-btn').addEventListener('click', async () => {
    try {
      await supabase.auth.signOut()
      router.navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  })
  
  return page
}
