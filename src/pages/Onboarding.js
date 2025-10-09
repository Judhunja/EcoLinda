import { router } from '../router'

export function OnboardingPage() {
  const page = document.createElement('div')
  page.className = 'relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden'
  
  page.innerHTML = `
    <main class="flex-grow flex flex-col relative">
      <!-- Animated Background Gradient -->
      <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-background-light to-accent/10 dark:from-background-dark dark:via-gray-900 dark:to-primary/10"></div>
      
      <!-- Decorative Elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div class="relative flex-grow flex flex-col justify-center items-center px-6 py-12">
        <!-- Logo/Brand Section -->
        <div class="mb-12 text-center">
          <div class="inline-flex items-center justify-center mb-6">
            <div class="relative">
              <span class="material-symbols-outlined text-primary text-6xl animate-bounce" style="animation-duration: 3s;">
                eco
              </span>
              <div class="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full animate-ping"></div>
            </div>
          </div>
          
          <h1 class="text-6xl md:text-7xl font-extrabold mb-4 tracking-tight">
            <span class="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              EcoLinda
            </span>
          </h1>
          
          <p class="text-2xl md:text-3xl font-light text-primary/90 dark:text-primary mb-2">
            Heal the Earth
          </p>
          <p class="text-lg text-text-light/60 dark:text-text-dark/60 font-medium">
            One Plot at a Time
          </p>
        </div>
        
        <!-- Mission Statement -->
        <div class="max-w-2xl mb-12 text-center">
          <p class="text-lg md:text-xl text-text-light/80 dark:text-text-dark/80 leading-relaxed">
            Join our mission to restore degraded lands and conserve biodiversity for a healthier planet.
          </p>
        </div>
        
        <!-- Feature Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mb-12 w-full">
          <div class="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 text-center transform hover:scale-105 transition-transform duration-300 border border-primary/10">
            <span class="material-symbols-outlined text-primary text-4xl mb-3">
              park
            </span>
            <h3 class="font-bold text-text-light dark:text-text-dark mb-2">Restore Land</h3>
            <p class="text-sm text-text-light/70 dark:text-text-dark/70">Transform degraded areas into thriving ecosystems</p>
          </div>
          
          <div class="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 text-center transform hover:scale-105 transition-transform duration-300 border border-accent/10">
            <span class="material-symbols-outlined text-accent text-4xl mb-3">
              groups
            </span>
            <h3 class="font-bold text-text-light dark:text-text-dark mb-2">Build Community</h3>
            <p class="text-sm text-text-light/70 dark:text-text-dark/70">Connect with passionate environmental stewards</p>
          </div>
          
          <div class="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 text-center transform hover:scale-105 transition-transform duration-300 border border-secondary/10">
            <span class="material-symbols-outlined text-secondary text-4xl mb-3">
              monitoring
            </span>
            <h3 class="font-bold text-text-light dark:text-text-dark mb-2">Track Impact</h3>
            <p class="text-sm text-text-light/70 dark:text-text-dark/70">Measure and celebrate your environmental contributions</p>
          </div>
        </div>
        
        <!-- Progress Indicator -->
        <div class="flex w-full flex-row items-center justify-center gap-2.5 mb-8">
          <div class="h-2.5 w-6 rounded-full bg-primary shadow-lg"></div>
          <div class="h-2.5 w-2.5 rounded-full bg-primary/20 dark:bg-primary/30"></div>
          <div class="h-2.5 w-2.5 rounded-full bg-primary/20 dark:bg-primary/30"></div>
          <div class="h-2.5 w-2.5 rounded-full bg-primary/20 dark:bg-primary/30"></div>
        </div>
        
        <!-- Action Buttons -->
        <div class="w-full max-w-md flex flex-col items-center gap-4">
          <button id="get-started-btn" class="w-full flex items-center justify-center overflow-hidden rounded-xl h-16 px-8 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white text-xl font-bold leading-normal tracking-wide shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <span class="truncate">Get Started</span>
            <span class="material-symbols-outlined ml-2">arrow_forward</span>
          </button>
          
          <button id="login-link" class="text-text-light/70 dark:text-text-dark/70 hover:text-primary text-base font-medium transition-colors">
            Already have an account? <span class="text-primary font-semibold">Log in</span>
          </button>
        </div>
      </div>
    </main>
  `
  
  // Add event listeners
  page.querySelector('#get-started-btn').addEventListener('click', () => {
    router.navigate('/signup')
  })
  
  page.querySelector('#login-link').addEventListener('click', () => {
    router.navigate('/login')
  })
  
  return page
}
