import { router } from '../router'
import { supabase } from '../lib/supabase'

export function HomePage() {
  const page = document.createElement('div')
  page.className = 'min-h-screen bg-background-light dark:bg-background-dark'
  
  page.innerHTML = `
    <!-- Navigation -->
    <nav class="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-primary text-3xl">eco</span>
            <span class="text-2xl font-bold gradient-text">EcoLinda</span>
          </div>
          <div class="flex items-center gap-4">
            <button id="logout-btn" class="px-4 py-2 text-sm font-medium text-text-light dark:text-text-dark hover:text-primary transition-colors">
              <span class="material-symbols-outlined">logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Welcome Section -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-text-light dark:text-text-dark mb-2">Welcome to EcoLinda</h1>
        <p class="text-text-light/70 dark:text-text-dark/70">
          How can we take care of the planet's land systems so that they can keep taking care of us?
        </p>
      </div>

      <!-- Core Modules Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Forest Conservation -->
        <div class="module-card bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <div class="flex items-center gap-3 mb-4">
            <div class="p-3 bg-primary/20 rounded-xl">
              <span class="material-symbols-outlined text-primary text-3xl">forest</span>
            </div>
            <div>
              <h3 class="font-bold text-lg text-text-light dark:text-text-dark">Forest Conservation</h3>
              <p class="text-xs text-text-light/60 dark:text-text-dark/60">Plant & Protect</p>
            </div>
          </div>
          <p class="text-sm text-text-light/70 dark:text-text-dark/70 mb-4">
            Join reforestation campaigns, report deforestation, and learn about forest ecosystems.
          </p>
          <button class="module-btn" data-module="forest">
            Explore <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <!-- Soil Health -->
        <div class="module-card bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20">
          <div class="flex items-center gap-3 mb-4">
            <div class="p-3 bg-secondary/20 rounded-xl">
              <span class="material-symbols-outlined text-secondary text-3xl">agriculture</span>
            </div>
            <div>
              <h3 class="font-bold text-lg text-text-light dark:text-text-dark">Soil Health</h3>
              <p class="text-xs text-text-light/60 dark:text-text-dark/60">Sustainable Farming</p>
            </div>
          </div>
          <p class="text-sm text-text-light/70 dark:text-text-dark/70 mb-4">
            Monitor soil health, plan crop rotations, and optimize irrigation for sustainable agriculture.
          </p>
          <button class="module-btn" data-module="soil">
            Explore <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <!-- Biodiversity -->
        <div class="module-card bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
          <div class="flex items-center gap-3 mb-4">
            <div class="p-3 bg-accent/20 rounded-xl">
              <span class="material-symbols-outlined text-accent text-3xl">pets</span>
            </div>
            <div>
              <h3 class="font-bold text-lg text-text-light dark:text-text-dark">Biodiversity</h3>
              <p class="text-xs text-text-light/60 dark:text-text-dark/60">Species Protection</p>
            </div>
          </div>
          <p class="text-sm text-text-light/70 dark:text-text-dark/70 mb-4">
            Identify species with AI, adopt endangered animals, and contribute to conservation efforts.
          </p>
          <button class="module-btn" data-module="biodiversity">
            Explore <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <!-- Wetlands -->
        <div class="module-card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <div class="flex items-center gap-3 mb-4">
            <div class="p-3 bg-blue-500/20 rounded-xl">
              <span class="material-symbols-outlined text-blue-600 dark:text-blue-400 text-3xl">water</span>
            </div>
            <div>
              <h3 class="font-bold text-lg text-text-light dark:text-text-dark">Wetlands</h3>
              <p class="text-xs text-text-light/60 dark:text-text-dark/60">Conservation</p>
            </div>
          </div>
          <p class="text-sm text-text-light/70 dark:text-text-dark/70 mb-4">
            Map wetlands, monitor health, and protect these critical ecosystems from degradation.
          </p>
          <button class="module-btn" data-module="wetlands">
            Explore <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
          <!-- Regional Crop Planner -->
          <div class="module-card bg-gradient-to-br from-lime-50 to-lime-100 dark:from-lime-900/20 dark:to-lime-800/20">
            <div class="flex items-center gap-3 mb-4">
              <div class="p-3 bg-lime-500/20 rounded-xl">
                <span class="material-symbols-outlined text-lime-600 dark:text-lime-400 text-3xl">local_florist</span>
              </div>
              <div>
                <h3 class="font-bold text-lg text-text-light dark:text-text-dark">Regional Crop Planner</h3>
                <p class="text-xs text-text-light/60 dark:text-text-dark/60">Kenya Regions & Crops</p>
              </div>
            </div>
            <p class="text-sm text-text-light/70 dark:text-text-dark/70 mb-4">
              Select your region in Kenya, choose crops, and get sustainable growing tips and educational content.
            </p>
            <button class="module-btn" data-module="crops">
              Explore <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
      </div>

      <!-- Impact Dashboard -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
        <h2 class="text-2xl font-bold text-text-light dark:text-text-dark mb-6 flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">trending_up</span>
          Global Impact
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="text-4xl font-bold text-primary mb-2">2.4M+</div>
            <div class="text-sm text-text-light/60 dark:text-text-dark/60">Trees Planted</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-secondary mb-2">50K+</div>
            <div class="text-sm text-text-light/60 dark:text-text-dark/60">Hectares Restored</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-accent mb-2">500+</div>
            <div class="text-sm text-text-light/60 dark:text-text-dark/60">Species Protected</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">1.2K+</div>
            <div class="text-sm text-text-light/60 dark:text-text-dark/60">Wetlands Mapped</div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow cursor-pointer" id="report-violation">
          <div class="flex items-center gap-4 mb-3">
            <span class="material-symbols-outlined text-red-500 text-4xl">report</span>
            <h3 class="font-bold text-lg text-text-light dark:text-text-dark">Report Violation</h3>
          </div>
          <p class="text-sm text-text-light/70 dark:text-text-dark/70">
            Report deforestation, pollution, or environmental violations in your area.
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow cursor-pointer" id="identify-species">
          <div class="flex items-center gap-4 mb-3">
            <span class="material-symbols-outlined text-primary text-4xl">photo_camera</span>
            <h3 class="font-bold text-lg text-text-light dark:text-text-dark">Identify Species</h3>
          </div>
          <p class="text-sm text-text-light/70 dark:text-text-dark/70">
            Use AI to identify plants and animals instantly with your camera.
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow cursor-pointer" id="start-campaign">
          <div class="flex items-center gap-4 mb-3">
            <span class="material-symbols-outlined text-accent text-4xl">campaign</span>
            <h3 class="font-bold text-lg text-text-light dark:text-text-dark">Start Campaign</h3>
          </div>
          <p class="text-sm text-text-light/70 dark:text-text-dark/70">
            Launch a reforestation or conservation campaign in your community.
          </p>
        </div>
      </div>
    </main>
  `
  
  // Event listeners
  page.querySelector('#logout-btn').addEventListener('click', async () => {
    await supabase.auth.signOut()
    router.navigate('/')
  })
  
  // Module navigation
  page.querySelectorAll('.module-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const module = e.currentTarget.dataset.module
      router.navigate(`/${module}`)
    })
  })
  
  // Quick actions
  page.querySelector('#report-violation').addEventListener('click', () => {
    router.navigate('/report')
  })
  
  page.querySelector('#identify-species').addEventListener('click', () => {
    router.navigate('/identify')
  })
  
  page.querySelector('#start-campaign').addEventListener('click', () => {
    router.navigate('/campaigns/new')
  })
  
  return page
}
