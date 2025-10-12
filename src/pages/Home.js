import { router } from '../router'
import { supabase } from '../lib/supabase'
import { DashboardDataAPI } from '../lib/dashboardDataAPI'

export function HomePage() {
  const page = document.createElement('div')
  page.className = 'min-h-screen bg-background-light dark:bg-background-dark'
  
  // Initialize dashboard API
  const dashboardAPI = new DashboardDataAPI()
  
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

      <!-- Integrated Data Dashboard -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-text-light dark:text-text-dark flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">dashboard</span>
            Kenya Land Data Dashboard
          </h2>
          <button id="refresh-dashboard" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2 text-sm">
            <span class="material-symbols-outlined text-sm">refresh</span>
            Refresh Data
          </button>
        </div>

        <!-- Loading State -->
        <div id="dashboard-loading" class="flex flex-col items-center justify-center py-12">
          <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mb-4"></div>
          <p class="text-gray-600 dark:text-gray-400">Loading integrated data...</p>
        </div>

        <!-- Dashboard Content -->
        <div id="dashboard-content" class="hidden">
          <!-- Alerts Section -->
          <div id="dashboard-alerts" class="mb-6"></div>

          <!-- Key Metrics Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <!-- Forest Cover -->
            <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-5 border border-green-200 dark:border-green-800">
              <div class="flex items-start justify-between mb-3">
                <div class="p-2 bg-green-500/20 rounded-lg">
                  <span class="material-symbols-outlined text-green-600 dark:text-green-400 text-2xl">forest</span>
                </div>
                <span id="forest-trend" class="px-2 py-1 rounded-full text-xs font-semibold"></span>
              </div>
              <div id="forest-value" class="text-3xl font-bold text-green-700 dark:text-green-300 mb-1">--</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Forest Cover</div>
              <div id="forest-change" class="text-xs font-medium"></div>
            </div>

            <!-- Land Degradation -->
            <div class="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-5 border border-orange-200 dark:border-orange-800">
              <div class="flex items-start justify-between mb-3">
                <div class="p-2 bg-orange-500/20 rounded-lg">
                  <span class="material-symbols-outlined text-orange-600 dark:text-orange-400 text-2xl">warning</span>
                </div>
                <span class="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded-full text-xs font-semibold">Warning</span>
              </div>
              <div id="degradation-value" class="text-3xl font-bold text-orange-700 dark:text-orange-300 mb-1">--</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Land Degradation</div>
              <div class="text-xs text-gray-500 dark:text-gray-500">High to moderate severity</div>
            </div>

            <!-- Restoration Progress -->
            <div class="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-5 border border-blue-200 dark:border-blue-800">
              <div class="flex items-start justify-between mb-3">
                <div class="p-2 bg-blue-500/20 rounded-lg">
                  <span class="material-symbols-outlined text-blue-600 dark:text-blue-400 text-2xl">eco</span>
                </div>
                <span class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-xs font-semibold">Growing</span>
              </div>
              <div id="trees-planted-value" class="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-1">--</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Trees Planted (2024)</div>
              <div class="text-xs text-gray-500 dark:text-gray-500">Community restoration</div>
            </div>
          </div>

          <!-- Detailed Data Tabs -->
          <div class="border-b border-gray-200 dark:border-gray-700 mb-4">
            <nav class="-mb-px flex space-x-6">
              <button class="dashboard-tab active border-b-2 border-primary text-primary py-2 px-1 text-sm font-medium" data-tab="land-use">
                Land Use & Cover
              </button>
              <button class="dashboard-tab border-b-2 border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 py-2 px-1 text-sm font-medium" data-tab="soil-climate">
                Soil & Climate
              </button>
              <button class="dashboard-tab border-b-2 border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 py-2 px-1 text-sm font-medium" data-tab="deforestation">
                Deforestation
              </button>
              <button class="dashboard-tab border-b-2 border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 py-2 px-1 text-sm font-medium" data-tab="vegetation">
                Vegetation Health
              </button>
            </nav>
          </div>

          <!-- Tab Content -->
          <div id="tab-content">
            <!-- Land Use Tab -->
            <div id="land-use-tab" class="tab-panel">
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4" id="land-use-grid"></div>
            </div>

            <!-- Soil & Climate Tab -->
            <div id="soil-climate-tab" class="tab-panel hidden">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6">
                  <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <span class="material-symbols-outlined text-amber-600">landscape</span>
                    Soil Degradation Hotspots
                  </h3>
                  <div id="soil-hotspots" class="space-y-3"></div>
                </div>
                <div class="bg-sky-50 dark:bg-sky-900/20 rounded-xl p-6">
                  <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <span class="material-symbols-outlined text-sky-600">thermostat</span>
                    Current Climate
                  </h3>
                  <div id="climate-data"></div>
                </div>
              </div>
            </div>

            <!-- Deforestation Tab -->
            <div id="deforestation-tab" class="tab-panel hidden">
              <div class="bg-red-50 dark:bg-red-900/20 rounded-xl p-6">
                <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Forest Loss Analysis (2024)</h3>
                <div id="deforestation-stats" class="space-y-4"></div>
              </div>
            </div>

            <!-- Vegetation Tab -->
            <div id="vegetation-tab" class="tab-panel hidden">
              <div class="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Vegetation Health Indicators</h3>
                <div id="vegetation-data" class="space-y-4"></div>
              </div>
            </div>
          </div>

          <!-- Data Sources -->
          <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <span class="material-symbols-outlined text-sm">info</span>
              <span>Data sources: NASA MODIS, ESA WorldCover, OpenWeather, National Environmental Data • Last updated: <span id="last-updated">--</span></span>
            </p>
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

  // Dashboard functionality
  async function loadDashboardData() {
    const loadingEl = page.querySelector('#dashboard-loading')
    const contentEl = page.querySelector('#dashboard-content')
    
    try {
      loadingEl.classList.remove('hidden')
      contentEl.classList.add('hidden')

      const [dashboardData, alerts] = await Promise.all([
        dashboardAPI.getKenyaDashboardData(),
        dashboardAPI.getDataAlerts()
      ])

      // Display alerts
      displayAlerts(alerts)

      // Update key metrics
      updateKeyMetrics(dashboardData)

      // Populate tabs
      populateLandUseTab(dashboardData.landUse)
      populateSoilClimateTab(dashboardData.degradation.hotspots, dashboardData.climate)
      populateDeforestationTab(dashboardData.deforestation)
      populateVegetationTab(dashboardData.vegetation)

      // Update last updated time
      page.querySelector('#last-updated').textContent = new Date(dashboardData.overview.lastUpdated).toLocaleString()

      loadingEl.classList.add('hidden')
      contentEl.classList.remove('hidden')
    } catch (error) {
      console.error('Error loading dashboard:', error)
      loadingEl.innerHTML = `
        <div class="text-center text-red-600 dark:text-red-400">
          <span class="material-symbols-outlined text-5xl mb-2">error</span>
          <p>Failed to load dashboard data</p>
          <button id="retry-dashboard" class="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
            Retry
          </button>
        </div>
      `
      page.querySelector('#retry-dashboard')?.addEventListener('click', loadDashboardData)
    }
  }

  function displayAlerts(alerts) {
    const alertsContainer = page.querySelector('#dashboard-alerts')
    if (!alerts || alerts.length === 0) {
      alertsContainer.innerHTML = ''
      return
    }

    alertsContainer.innerHTML = alerts.map(alert => {
      const colors = {
        critical: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300',
        warning: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-300',
        success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300'
      }
      
      const icons = {
        critical: 'error',
        warning: 'warning',
        success: 'check_circle'
      }

      return `
        <div class="flex items-start gap-3 p-4 rounded-lg border ${colors[alert.type]}">
          <span class="material-symbols-outlined mt-0.5">${icons[alert.type]}</span>
          <div class="flex-1">
            <div class="font-semibold">${alert.category}: ${alert.message}</div>
            <div class="text-sm mt-1 opacity-90">${alert.action}</div>
          </div>
        </div>
      `
    }).join('')
  }

  function updateKeyMetrics(data) {
    // Forest cover
    page.querySelector('#forest-value').textContent = `${data.landUse.forest.percentage}%`
    page.querySelector('#forest-change').innerHTML = `
      <span class="text-red-600 dark:text-red-400">↓ ${Math.abs(data.landUse.forest.change)}% per year</span>
    `
    page.querySelector('#forest-trend').innerHTML = `
      <span class="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">Declining</span>
    `

    // Land degradation
    const degradationTotal = data.degradation.severity.high + data.degradation.severity.moderate
    page.querySelector('#degradation-value').textContent = `${degradationTotal.toFixed(1)}%`

    // Trees planted
    const treesPlanted = data.restoration.treesPlanted
    page.querySelector('#trees-planted-value').textContent = (treesPlanted / 1000000).toFixed(1) + 'M'
  }

  function populateLandUseTab(landUse) {
    const grid = page.querySelector('#land-use-grid')
    
    const categories = [
      { key: 'forest', label: 'Forest', icon: 'forest', color: 'green' },
      { key: 'cropland', label: 'Cropland', icon: 'agriculture', color: 'amber' },
      { key: 'grassland', label: 'Grassland', icon: 'grass', color: 'lime' },
      { key: 'urban', label: 'Urban', icon: 'location_city', color: 'gray' },
      { key: 'wetlands', label: 'Wetlands', icon: 'water', color: 'blue' },
      { key: 'water', label: 'Water Bodies', icon: 'waves', color: 'cyan' },
      { key: 'barren', label: 'Barren Land', icon: 'landscape', color: 'orange' }
    ]

    grid.innerHTML = categories.map(cat => {
      const data = landUse[cat.key]
      const trendIcon = data.trend === 'increasing' ? '↑' : data.trend === 'declining' ? '↓' : '→'
      const trendColor = data.trend === 'increasing' ? 'text-green-600' : data.trend === 'declining' ? 'text-red-600' : 'text-gray-600'
      
      return `
        <div class="bg-${cat.color}-50 dark:bg-${cat.color}-900/20 rounded-lg p-4 border border-${cat.color}-200 dark:border-${cat.color}-800">
          <div class="flex items-center gap-2 mb-2">
            <span class="material-symbols-outlined text-${cat.color}-600 dark:text-${cat.color}-400">${cat.icon}</span>
            <span class="text-xs font-medium text-gray-700 dark:text-gray-300">${cat.label}</span>
          </div>
          <div class="text-2xl font-bold text-gray-900 dark:text-gray-100">${data.percentage}%</div>
          <div class="text-xs ${trendColor} font-medium mt-1">${trendIcon} ${Math.abs(data.change)}%/yr</div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">${data.area.toLocaleString()} km²</div>
        </div>
      `
    }).join('')
  }

  function populateSoilClimateTab(hotspots, climate) {
    const hotspotsContainer = page.querySelector('#soil-hotspots')
    hotspotsContainer.innerHTML = hotspots.map(hotspot => `
      <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div class="flex items-start justify-between mb-2">
          <div class="font-semibold text-gray-900 dark:text-gray-100">${hotspot.region}</div>
          <span class="px-2 py-1 rounded-full text-xs font-semibold ${
            hotspot.severity === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
            'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
          }">${hotspot.severity}</span>
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">${hotspot.primaryCause}</div>
        <div class="text-xs text-gray-500 dark:text-gray-500">Soil loss: ${hotspot.soilLossRate}</div>
        <div class="text-xs text-gray-500 dark:text-gray-500 mt-1">Area: ${hotspot.area.toLocaleString()} km²</div>
      </div>
    `).join('')

    const climateContainer = page.querySelector('#climate-data')
    climateContainer.innerHTML = `
      <div class="space-y-4">
        <div class="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
          <span class="text-gray-700 dark:text-gray-300">Temperature</span>
          <span class="font-bold text-gray-900 dark:text-gray-100">${climate.temperature}°C</span>
        </div>
        <div class="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
          <span class="text-gray-700 dark:text-gray-300">Humidity</span>
          <span class="font-bold text-gray-900 dark:text-gray-100">${climate.humidity}%</span>
        </div>
        <div class="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
          <span class="text-gray-700 dark:text-gray-300">Condition</span>
          <span class="font-bold text-gray-900 dark:text-gray-100 capitalize">${climate.condition}</span>
        </div>
      </div>
    `
  }

  function populateDeforestationTab(deforestation) {
    const container = page.querySelector('#deforestation-stats')
    container.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
          <div class="text-3xl font-bold text-red-600 dark:text-red-400">${deforestation.forestLoss.toLocaleString()}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Hectares Lost</div>
        </div>
        <div class="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
          <div class="text-3xl font-bold text-green-600 dark:text-green-400">${deforestation.forestGain.toLocaleString()}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Hectares Restored</div>
        </div>
        <div class="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
          <div class="text-3xl font-bold text-orange-600 dark:text-orange-400">${deforestation.netLoss.toLocaleString()}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Net Loss</div>
        </div>
      </div>

      <h4 class="font-semibold text-gray-900 dark:text-gray-100 mb-3">Most Affected Areas</h4>
      <div class="space-y-2">
        ${deforestation.affectedAreas.map(area => `
          <div class="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
            <span class="text-gray-700 dark:text-gray-300">${area.name}</span>
            <span class="font-bold text-red-600 dark:text-red-400">${area.loss} ha</span>
          </div>
        `).join('')}
      </div>

      <div class="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg">
        <div class="grid grid-cols-2 gap-4 text-center">
          <div>
            <div class="text-2xl font-bold text-gray-900 dark:text-gray-100">${(deforestation.treesCut / 1000000).toFixed(1)}M</div>
            <div class="text-xs text-gray-600 dark:text-gray-400">Trees Cut</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-gray-900 dark:text-gray-100">${(deforestation.carbonEmissions / 1000).toFixed(0)}K</div>
            <div class="text-xs text-gray-600 dark:text-gray-400">Tonnes CO₂ Emissions</div>
          </div>
        </div>
      </div>
    `
  }

  function populateVegetationTab(vegetation) {
    const container = page.querySelector('#vegetation-data')
    
    const ndviStatus = vegetation.ndvi >= 0.6 ? 'Healthy' : vegetation.ndvi >= 0.4 ? 'Moderate' : 'Poor'
    const ndviColor = vegetation.ndvi >= 0.6 ? 'green' : vegetation.ndvi >= 0.4 ? 'yellow' : 'red'
    
    container.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6">
          <h4 class="font-semibold text-gray-900 dark:text-gray-100 mb-4">NDVI (Vegetation Index)</h4>
          <div class="text-center">
            <div class="text-5xl font-bold text-${ndviColor}-600 dark:text-${ndviColor}-400 mb-2">${vegetation.ndvi.toFixed(2)}</div>
            <div class="text-lg text-gray-700 dark:text-gray-300 mb-4">${ndviStatus}</div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div class="bg-${ndviColor}-600 h-3 rounded-full" style="width: ${vegetation.ndvi * 100}%"></div>
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">Scale: 0 (no vegetation) to 1 (dense vegetation)</div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg p-6">
          <h4 class="font-semibold text-gray-900 dark:text-gray-100 mb-4">Trends & Status</h4>
          <div class="space-y-4">
            <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <span class="text-gray-700 dark:text-gray-300">Overall Status</span>
              <span class="font-bold text-gray-900 dark:text-gray-100 capitalize">${vegetation.status}</span>
            </div>
            <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <span class="text-gray-700 dark:text-gray-300">Seasonal Trend</span>
              <span class="font-bold text-green-600 dark:text-green-400 capitalize">${vegetation.seasonalTrend}</span>
            </div>
            <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <span class="text-gray-700 dark:text-gray-300">vs Last Year</span>
              <span class="font-bold text-green-600 dark:text-green-400">${vegetation.comparedToLastYear}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
        <div class="flex items-start gap-3">
          <span class="material-symbols-outlined text-blue-600 dark:text-blue-400">info</span>
          <div class="text-sm text-blue-800 dark:text-blue-300">
            <p class="font-semibold mb-1">Understanding NDVI</p>
            <p>NDVI measures vegetation health using satellite data. Higher values indicate denser, healthier vegetation. This data helps track land degradation, drought impacts, and restoration progress.</p>
          </div>
        </div>
      </div>
    `
  }

  // Tab switching
  page.querySelectorAll('.dashboard-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      page.querySelectorAll('.dashboard-tab').forEach(t => {
        t.classList.remove('active', 'border-primary', 'text-primary')
        t.classList.add('border-transparent', 'text-gray-500')
      })
      tab.classList.add('active', 'border-primary', 'text-primary')
      tab.classList.remove('border-transparent', 'text-gray-500')

      // Show corresponding panel
      const tabName = tab.dataset.tab
      page.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.add('hidden')
      })
      page.querySelector(`#${tabName}-tab`).classList.remove('hidden')
    })
  })

  // Refresh button
  page.querySelector('#refresh-dashboard').addEventListener('click', loadDashboardData)

  // Initial load
  loadDashboardData()
  
  return page
}
