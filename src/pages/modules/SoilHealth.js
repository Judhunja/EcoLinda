import { router } from '../../router'

export function SoilHealthPage() {
  const page = document.createElement('div')
  page.className = 'min-h-screen bg-background-light dark:bg-background-dark'
  
  page.innerHTML = `
    <!-- Navigation -->
    <nav class="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <button id="back-btn" class="flex items-center gap-2 text-text-light dark:text-text-dark hover:text-primary transition-colors">
            <span class="material-symbols-outlined">arrow_back</span>
            <span class="font-semibold">Back</span>
          </button>
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-secondary text-3xl">agriculture</span>
            <span class="text-xl font-bold text-text-light dark:text-text-dark">Soil Health & Sustainable Farming</span>
          </div>
          <div class="w-20"></div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Farmer Dashboard Card -->
      <div class="bg-gradient-to-r from-amber-600 to-amber-700 rounded-2xl p-8 mb-8 text-white">
        <h1 class="text-4xl font-bold mb-4">Your Farm Dashboard</h1>
        <p class="text-xl mb-6 opacity-90">
          Manage your land health, optimize crops, and practice sustainable agriculture.
        </p>
        
        <!-- Land Health Score -->
        <div class="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
          <h3 class="text-xl font-semibold mb-4">Land Health Score</h3>
          <div class="flex items-center gap-6">
            <div class="relative w-32 h-32">
              <svg class="transform -rotate-90 w-32 h-32">
                <circle cx="64" cy="64" r="56" stroke="currentColor" stroke-width="8" fill="none" class="text-white/20" />
                <circle cx="64" cy="64" r="56" stroke="currentColor" stroke-width="8" fill="none" class="text-green-300" stroke-dasharray="352" stroke-dashoffset="105.6" />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-4xl font-bold">72</span>
              </div>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-2">
                <span class="material-symbols-outlined text-green-300">trending_up</span>
                <span class="font-semibold">Improving</span>
              </div>
              <p class="text-sm opacity-90">
                Your land health is improving! Continue with current practices and focus on Zone B irrigation.
              </p>
            </div>
          </div>
        </div>

        <!-- Today's Priorities -->
        <div class="bg-white/20 backdrop-blur-sm rounded-xl p-6">
          <h3 class="text-xl font-semibold mb-4">Today's Priorities</h3>
          <div class="space-y-3">
            <div class="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
              <span class="material-symbols-outlined text-yellow-300">priority_high</span>
              <span>Water Zone B today—no rain forecast for 3 days</span>
            </div>
            <div class="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
              <span class="material-symbols-outlined text-blue-300">info</span>
              <span>Apply compost to Field A this week</span>
            </div>
            <div class="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
              <span class="material-symbols-outlined text-green-300">schedule</span>
              <span>Begin fallow period for Field C next month</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tools Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <!-- Soil Testing -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all cursor-pointer" id="soil-testing">
          <div class="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <span class="material-symbols-outlined text-secondary text-3xl">science</span>
          </div>
          <h3 class="text-xl font-bold text-text-light dark:text-text-dark mb-3">Soil Testing</h3>
          <p class="text-text-light/70 dark:text-text-dark/70 mb-4">
            Monitor NPK, pH, moisture, and detect degradation with IoT sensors or manual testing.
          </p>
          <button class="text-primary font-semibold flex items-center gap-1">
            Start Testing <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <!-- Crop Rotation Planner -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all cursor-pointer" id="crop-rotation">
          <div class="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <span class="material-symbols-outlined text-primary text-3xl">calendar_month</span>
          </div>
          <h3 class="text-xl font-bold text-text-light dark:text-text-dark mb-3">Crop Rotation</h3>
          <p class="text-text-light/70 dark:text-text-dark/70 mb-4">
            Plan multi-year rotations with AI recommendations for optimal soil health and yields.
          </p>
          <button class="text-primary font-semibold flex items-center gap-1">
            Plan Rotation <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <!-- Composting Guide -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all cursor-pointer" id="composting">
          <div class="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <span class="material-symbols-outlined text-accent text-3xl">compost</span>
          </div>
          <h3 class="text-xl font-bold text-text-light dark:text-text-dark mb-3">Composting</h3>
          <p class="text-text-light/70 dark:text-text-dark/70 mb-4">
            Learn organic fertilization methods and create custom compost recipes.
          </p>
          <button class="text-primary font-semibold flex items-center gap-1">
            Learn More <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <!-- Irrigation Scheduler -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all cursor-pointer" id="irrigation">
          <div class="bg-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <span class="material-symbols-outlined text-blue-600 dark:text-blue-400 text-3xl">water_drop</span>
          </div>
          <h3 class="text-xl font-bold text-text-light dark:text-text-dark mb-3">Irrigation</h3>
          <p class="text-text-light/70 dark:text-text-dark/70 mb-4">
            Smart watering schedules based on weather, soil moisture, and crop needs.
          </p>
          <button class="text-primary font-semibold flex items-center gap-1">
            View Schedule <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <!-- Weather Integration -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all cursor-pointer">
          <div class="bg-purple-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <span class="material-symbols-outlined text-purple-600 dark:text-purple-400 text-3xl">cloud</span>
          </div>
          <h3 class="text-xl font-bold text-text-light dark:text-text-dark mb-3">Weather Forecast</h3>
          <p class="text-text-light/70 dark:text-text-dark/70 mb-4">
            7-day hyper-local forecasts with farming-specific insights and alerts.
          </p>
          <button class="text-primary font-semibold flex items-center gap-1">
            Check Weather <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <!-- AI Assistant -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all cursor-pointer">
          <div class="bg-pink-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <span class="material-symbols-outlined text-pink-600 dark:text-pink-400 text-3xl">support_agent</span>
          </div>
          <h3 class="text-xl font-bold text-text-light dark:text-text-dark mb-3">AI Advisor</h3>
          <p class="text-text-light/70 dark:text-text-dark/70 mb-4">
            Get personalized farming advice powered by Gemini AI for your specific situation.
          </p>
          <button class="text-primary font-semibold flex items-center gap-1">
            Ask Question <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    </main>
  `
  
  // Event listeners
  page.querySelector('#back-btn').addEventListener('click', () => {
    router.navigate('/home')
  })
  
  page.querySelector('#soil-testing').addEventListener('click', () => {
    router.navigate('/soil/testing')
  })
  
  page.querySelector('#crop-rotation').addEventListener('click', () => {
    router.navigate('/soil/rotation')
  })
  
  page.querySelector('#composting').addEventListener('click', () => {
    router.navigate('/soil/composting')
  })
  
  page.querySelector('#irrigation').addEventListener('click', () => {
    router.navigate('/soil/irrigation')
  })
  
  return page
}
