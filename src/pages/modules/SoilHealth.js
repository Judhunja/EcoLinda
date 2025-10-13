import { router } from '../../router'
import { SoilHealthAPI } from '../../lib/soilHealthAPI'
import { ClimateDataAPI } from '../../lib/climateDataAPI'
import { CropRecommendationEngine } from '../../lib/cropRecommendationEngine'

export function SoilHealthPage() {
  const page = document.createElement('div')
  page.className = 'min-h-screen bg-background-light dark:bg-background-dark'
  
  // Initialize APIs
  const soilAPI = new SoilHealthAPI()
  const climateAPI = new ClimateDataAPI()
  const cropEngine = new CropRecommendationEngine()
  
  // State
  let currentLocation = null
  let soilData = null
  let climateData = null
  let cropRecommendations = null
  let selectedCrop = null
  let selectedRegion = null
  
  // Region data with representative coordinates and characteristics
  const regionData = {
    'central-highlands': {
      name: 'Central Highlands',
      counties: ['Kiambu', 'Nyeri', 'Murang\'a', 'Kirinyaga', 'Embu'],
      coordinates: { lat: -0.7833, lon: 36.9500 },
      characteristics: {
        soilType: 'Volcanic (Andosols)',
        fertility: 'Very High',
        rainfall: 'High (1000-2000mm)',
        temperature: 'Cool to Moderate (15-25°C)',
        bestCrops: ['Tea', 'Coffee', 'Vegetables', 'Potatoes', 'Maize'],
        advantages: [
          'Rich volcanic soils with high organic matter',
          'Excellent water retention capacity',
          'Favorable altitude for high-value crops',
          'Good rainfall distribution'
        ]
      }
    },
    'western-highlands': {
      name: 'Western Highlands',
      counties: ['Kisii', 'Kericho', 'Nandi', 'Bomet', 'Kakamega'],
      coordinates: { lat: -0.6833, lon: 35.2833 },
      characteristics: {
        soilType: 'Volcanic with Clay',
        fertility: 'High',
        rainfall: 'Very High (1500-2500mm)',
        temperature: 'Cool (12-22°C)',
        bestCrops: ['Tea', 'Bananas', 'Avocado', 'Maize', 'Beans'],
        advantages: [
          'Abundant rainfall throughout the year',
          'Excellent for tea cultivation',
          'Deep fertile soils',
          'Good for agroforestry'
        ]
      }
    },
    'rift-valley': {
      name: 'Rift Valley',
      counties: ['Nakuru', 'Narok', 'Kajiado', 'Baringo', 'Laikipia'],
      coordinates: { lat: -0.3031, lon: 36.0800 },
      characteristics: {
        soilType: 'Alkaline (Vertisols)',
        fertility: 'Moderate to High',
        rainfall: 'Moderate (600-1200mm)',
        temperature: 'Warm (18-28°C)',
        bestCrops: ['Wheat', 'Maize', 'Pyrethrum', 'Barley', 'Sunflower'],
        advantages: [
          'Large-scale farming potential',
          'Good for cereals and wheat',
          'Suitable for mechanized farming',
          'Diverse agro-ecological zones'
        ]
      }
    },
    'eastern': {
      name: 'Eastern',
      counties: ['Machakos', 'Makueni', 'Kitui', 'Embu', 'Meru'],
      coordinates: { lat: -1.5177, lon: 37.2634 },
      characteristics: {
        soilType: 'Sandy Loam',
        fertility: 'Low to Moderate',
        rainfall: 'Low to Moderate (500-1000mm)',
        temperature: 'Warm (20-30°C)',
        bestCrops: ['Sorghum', 'Millet', 'Pigeon Peas', 'Green Grams', 'Mangoes'],
        advantages: [
          'Good for drought-resistant crops',
          'Suitable for fruit trees',
          'Potential for irrigation farming',
          'Growing organic farming sector'
        ]
      }
    },
    'nyanza': {
      name: 'Nyanza',
      counties: ['Kisumu', 'Siaya', 'Migori', 'Homa Bay', 'Kisii'],
      coordinates: { lat: -0.0917, lon: 34.7680 },
      characteristics: {
        soilType: 'Clay Loam',
        fertility: 'Moderate to High',
        rainfall: 'High (1200-1800mm)',
        temperature: 'Warm (20-28°C)',
        bestCrops: ['Sugarcane', 'Rice', 'Cotton', 'Maize', 'Sorghum'],
        advantages: [
          'Proximity to Lake Victoria',
          'Good for rice cultivation',
          'Favorable for sugarcane',
          'Rich fishing and irrigation potential'
        ]
      }
    },
    'coast': {
      name: 'Coast',
      counties: ['Mombasa', 'Kilifi', 'Kwale', 'Lamu', 'Tana River'],
      coordinates: { lat: -4.0435, lon: 39.6682 },
      characteristics: {
        soilType: 'Sandy (Arenosols)',
        fertility: 'Low',
        rainfall: 'Moderate (800-1200mm)',
        temperature: 'Hot & Humid (24-32°C)',
        bestCrops: ['Coconut', 'Cashew Nuts', 'Cassava', 'Mangoes', 'Pineapples'],
        advantages: [
          'Excellent for coconut plantations',
          'Good for cashew nuts',
          'Suitable for tropical fruits',
          'Growing tourism-linked markets'
        ]
      }
    },
    'northeastern': {
      name: 'North Eastern',
      counties: ['Garissa', 'Wajir', 'Mandera', 'Isiolo'],
      coordinates: { lat: 1.5870, lon: 39.6460 },
      characteristics: {
        soilType: 'Arid Sandy',
        fertility: 'Very Low',
        rainfall: 'Very Low (200-500mm)',
        temperature: 'Very Hot (25-40°C)',
        bestCrops: ['Sorghum', 'Millet', 'Cowpeas', 'Drought-tolerant varieties'],
        advantages: [
          'Suitable for pastoralism',
          'Growing potential for drought-resistant crops',
          'Opportunities for irrigation projects',
          'Focus on climate-smart agriculture'
        ]
      }
    },
    'northwestern': {
      name: 'North Western',
      counties: ['Turkana', 'West Pokot', 'Samburu', 'Marsabit'],
      coordinates: { lat: 2.5206, lon: 35.8986 },
      characteristics: {
        soilType: 'Arid Rocky',
        fertility: 'Very Low',
        rainfall: 'Very Low (200-600mm)',
        temperature: 'Hot (22-38°C)',
        bestCrops: ['Sorghum', 'Cassava', 'Indigenous Vegetables', 'Millet'],
        advantages: [
          'Potential for indigenous crops',
          'Growing irrigation schemes',
          'Suitable for hardy livestock',
          'Emerging solar-powered irrigation'
        ]
      }
    }
  }
  
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
          <button id="refresh-btn" class="flex items-center gap-2 text-text-light dark:text-text-dark hover:text-primary transition-colors">
            <span class="material-symbols-outlined">refresh</span>
            <span class="font-semibold">Refresh</span>
          </button>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Hero Section with CTA -->
      <div id="hero-section" class="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-8 mb-8 text-white">
        <h1 class="text-4xl font-bold mb-4">🌾 Smart Farming Assistant</h1>
        <p class="text-xl mb-6 opacity-90">
          Get AI-powered soil analysis, weather insights, and personalized crop recommendations for sustainable agriculture.
        </p>
        
        <!-- Region Selector -->
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
          <label class="block text-white font-semibold mb-3 text-lg">Select Your Region</label>
          <select id="region-selector" class="w-full md:w-2/3 px-4 py-3 rounded-lg text-gray-800 font-semibold text-base focus:ring-2 focus:ring-white focus:outline-none">
            <option value="">-- Choose your region --</option>
            <option value="central-highlands">Central Highlands (Kiambu, Nyeri, Murang'a)</option>
            <option value="western-highlands">Western Highlands (Kisii, Kericho, Nandi)</option>
            <option value="rift-valley">Rift Valley (Nakuru, Narok, Kajiado)</option>
            <option value="eastern">Eastern (Machakos, Makueni, Kitui)</option>
            <option value="nyanza">Nyanza (Kisumu, Siaya, Migori)</option>
            <option value="coast">Coast (Mombasa, Kilifi, Kwale)</option>
            <option value="northeastern">North Eastern (Garissa, Wajir, Mandera)</option>
            <option value="northwestern">North Western (Turkana, West Pokot, Samburu)</option>
          </select>
          <p class="text-white/80 text-sm mt-2">Or use the buttons below to detect your location automatically</p>
        </div>
        
        <div class="flex flex-wrap gap-4">
          <button id="analyze-region-btn" class="bg-white text-green-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition-all shadow-lg flex items-center gap-2">
            <span class="material-symbols-outlined">analytics</span>
            Analyze Selected Region
          </button>
          <button id="analyze-btn" class="bg-white/20 backdrop-blur-sm text-white px-6 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all flex items-center gap-2">
            <span class="material-symbols-outlined">my_location</span>
            Use My Location
          </button>
          <button id="manual-location-btn" class="bg-white/20 backdrop-blur-sm text-white px-6 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all flex items-center gap-2">
            <span class="material-symbols-outlined">location_on</span>
            Enter Coordinates
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div id="loading-section" class="hidden">
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center">
          <div class="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mb-4"></div>
          <h3 class="text-2xl font-bold text-text-light dark:text-text-dark mb-2">Analyzing Your Farm Data...</h3>
          <p class="text-text-light/70 dark:text-text-dark/70">
            Fetching soil analysis, climate data, and generating crop recommendations
          </p>
        </div>
      </div>

      <!-- Dashboard Content (Hidden Initially) -->
      <div id="dashboard-content" class="hidden space-y-8">
        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div class="flex items-center justify-between mb-2">
              <span class="text-text-light/70 dark:text-text-dark/70 text-sm font-semibold">SOIL HEALTH</span>
              <span class="material-symbols-outlined text-green-600">grass</span>
            </div>
            <div class="text-3xl font-bold text-text-light dark:text-text-dark" id="health-score">--</div>
            <div class="text-sm text-text-light/70 dark:text-text-dark/70 mt-1" id="health-status">Loading...</div>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div class="flex items-center justify-between mb-2">
              <span class="text-text-light/70 dark:text-text-dark/70 text-sm font-semibold">TEMPERATURE</span>
              <span class="material-symbols-outlined text-orange-600">thermostat</span>
            </div>
            <div class="text-3xl font-bold text-text-light dark:text-text-dark" id="temperature">--</div>
            <div class="text-sm text-text-light/70 dark:text-text-dark/70 mt-1" id="temp-description">Loading...</div>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div class="flex items-center justify-between mb-2">
              <span class="text-text-light/70 dark:text-text-dark/70 text-sm font-semibold">RAINFALL</span>
              <span class="material-symbols-outlined text-blue-600">water_drop</span>
            </div>
            <div class="text-3xl font-bold text-text-light dark:text-text-dark" id="rainfall">--</div>
            <div class="text-sm text-text-light/70 dark:text-text-dark/70 mt-1">Expected this week</div>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div class="flex items-center justify-between mb-2">
              <span class="text-text-light/70 dark:text-text-dark/70 text-sm font-semibold">BEST CROPS</span>
              <span class="material-symbols-outlined text-amber-600">crops</span>
            </div>
            <div class="text-3xl font-bold text-text-light dark:text-text-dark" id="crop-count">--</div>
            <div class="text-sm text-text-light/70 dark:text-text-dark/70 mt-1">Recommended for you</div>
          </div>
        </div>

        <!-- Soil Analysis Card -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-text-light dark:text-text-dark flex items-center gap-2">
              <span class="material-symbols-outlined text-3xl text-secondary">layers</span>
              Soil Analysis
            </h2>
            <span id="soil-location" class="text-sm text-text-light/70 dark:text-text-dark/70"></span>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Left: Soil Metrics -->
            <div>
              <div class="space-y-4" id="soil-metrics">
                <!-- Will be populated dynamically -->
              </div>

              <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <h4 class="font-semibold text-text-light dark:text-text-dark mb-2 flex items-center gap-2">
                  <span class="material-symbols-outlined text-blue-600">info</span>
                  Soil Type
                </h4>
                <p id="soil-type-info" class="text-text-light/80 dark:text-text-dark/80 text-sm">Loading...</p>
              </div>
            </div>

            <!-- Right: Recommendations -->
            <div>
              <h3 class="text-xl font-bold text-text-light dark:text-text-dark mb-4">Recommendations</h3>
              <div class="space-y-3" id="soil-recommendations">
                <!-- Will be populated dynamically -->
              </div>

              <!-- Risk Factors -->
              <div id="risk-factors-container" class="mt-6">
                <!-- Will be populated if risks exist -->
              </div>
            </div>
          </div>
        </div>

        <!-- Weather & Climate Card -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h2 class="text-2xl font-bold text-text-light dark:text-text-dark mb-6 flex items-center gap-2">
            <span class="material-symbols-outlined text-3xl text-blue-600">cloud</span>
            Weather & Climate Insights
          </h2>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Current Weather -->
            <div class="lg:col-span-1">
              <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                <div class="text-sm font-semibold mb-2 opacity-90">CURRENT WEATHER</div>
                <div class="text-5xl font-bold mb-2" id="current-temp">--°C</div>
                <div class="text-lg mb-4" id="current-desc">Loading...</div>
                <div class="space-y-2 text-sm">
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-lg">water_drop</span>
                    <span id="current-humidity">--%</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-lg">air</span>
                    <span id="current-wind">-- km/h</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 7-Day Forecast -->
            <div class="lg:col-span-2">
              <h3 class="text-lg font-bold text-text-light dark:text-text-dark mb-4">7-Day Forecast</h3>
              <div class="grid grid-cols-7 gap-2" id="forecast-grid">
                <!-- Will be populated dynamically -->
              </div>
            </div>
          </div>

          <!-- Farming Recommendations -->
          <div class="mt-6 p-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
            <h3 class="text-lg font-bold text-text-light dark:text-text-dark mb-4 flex items-center gap-2">
              <span class="material-symbols-outlined text-amber-600">wb_sunny</span>
              Farming Recommendations Based on Weather
            </h3>
            <div id="weather-recommendations" class="space-y-2">
              <!-- Will be populated dynamically -->
            </div>
          </div>
        </div>

        <!-- Crop Recommendations -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-text-light dark:text-text-dark flex items-center gap-2">
              <span class="material-symbols-outlined text-3xl text-amber-600">agriculture</span>
              Recommended Crops for Your Farm
            </h2>
            <div class="flex gap-2">
              <button id="filter-all" class="px-4 py-2 rounded-lg bg-primary text-white font-semibold text-sm">All</button>
              <button id="filter-resilient" class="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark font-semibold text-sm hover:bg-gray-300 dark:hover:bg-gray-600">Climate Resilient</button>
              <button id="filter-drought" class="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark font-semibold text-sm hover:bg-gray-300 dark:hover:bg-gray-600">Drought Tolerant</button>
            </div>
          </div>

          <div id="crops-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Will be populated dynamically -->
          </div>
        </div>

        <!-- SDG 15 Impact -->
        <div class="bg-gradient-to-r from-green-700 to-emerald-800 rounded-2xl p-8 text-white">
          <div class="flex items-center gap-3 mb-6">
            <div class="bg-white/20 p-3 rounded-xl">
              <span class="material-symbols-outlined text-4xl">public</span>
            </div>
            <div>
              <h2 class="text-2xl font-bold">Supporting SDG 15: Life on Land</h2>
              <p class="opacity-90">Your farming practices contribute to sustainable land management</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div class="text-3xl font-bold mb-2">🌱</div>
              <h3 class="font-semibold mb-2">Soil Conservation</h3>
              <p class="text-sm opacity-90">Prevent erosion and degradation through sustainable practices</p>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div class="text-3xl font-bold mb-2">💧</div>
              <h3 class="font-semibold mb-2">Water Management</h3>
              <p class="text-sm opacity-90">Optimize irrigation and protect water resources</p>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div class="text-3xl font-bold mb-2">🌾</div>
              <h3 class="font-semibold mb-2">Biodiversity</h3>
              <p class="text-sm opacity-90">Support diverse ecosystems and sustainable agriculture</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Manual Location Modal -->
      <div id="location-modal" class="hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full">
          <h3 class="text-2xl font-bold text-text-light dark:text-text-dark mb-4">Enter Your Location</h3>
          <p class="text-text-light/70 dark:text-text-dark/70 mb-6">Provide your farm's coordinates for accurate analysis</p>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">Latitude</label>
              <input type="number" id="manual-lat" step="0.0001" placeholder="-1.2921" class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">Longitude</label>
              <input type="number" id="manual-lon" step="0.0001" placeholder="36.8219" class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary" />
            </div>
          </div>

          <div class="flex gap-3 mt-6">
            <button id="confirm-location-btn" class="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all">
              Analyze
            </button>
            <button id="cancel-location-btn" class="px-6 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
              Cancel
            </button>
          </div>
        </div>
      </div>

      <!-- Crop Detail Modal -->
      <div id="crop-modal" class="hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-4xl w-full my-8">
          <div class="flex items-center justify-between mb-6">
            <h3 id="crop-modal-title" class="text-3xl font-bold text-text-light dark:text-text-dark">Crop Details</h3>
            <button id="close-crop-modal" class="text-text-light/70 dark:text-text-dark/70 hover:text-text-light dark:hover:text-text-dark">
              <span class="material-symbols-outlined text-3xl">close</span>
            </button>
          </div>
          
          <div id="crop-modal-content" class="space-y-6">
            <!-- Will be populated dynamically -->
          </div>
        </div>
      </div>
    </main>
  `
  
  // Event Listeners
  page.querySelector('#back-btn').addEventListener('click', () => {
    router.navigate('/home')
  })

  page.querySelector('#refresh-btn').addEventListener('click', () => {
    if (currentLocation) {
      analyzeLocation(currentLocation.latitude, currentLocation.longitude)
    }
  })

  // Region selector change handler
  page.querySelector('#region-selector').addEventListener('change', (e) => {
    selectedRegion = e.target.value
  })

  // Analyze selected region
  page.querySelector('#analyze-region-btn').addEventListener('click', () => {
    const regionSelect = page.querySelector('#region-selector')
    const region = regionSelect.value
    
    if (!region) {
      alert('Please select a region first')
      return
    }
    
    selectedRegion = region
    const data = regionData[region]
    analyzeLocation(data.coordinates.lat, data.coordinates.lon, data)
  })

  page.querySelector('#analyze-btn').addEventListener('click', async () => {
    if (navigator.geolocation) {
      page.querySelector('#analyze-btn').disabled = true
      page.querySelector('#analyze-btn').innerHTML = '<span class="material-symbols-outlined animate-spin">refresh</span> Getting Location...'
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          analyzeLocation(position.coords.latitude, position.coords.longitude)
        },
        (error) => {
          console.error('Geolocation error:', error)
          alert('Could not get your location. Please select a region or enter coordinates manually.')
          page.querySelector('#analyze-btn').disabled = false
          page.querySelector('#analyze-btn').innerHTML = '<span class="material-symbols-outlined">my_location</span> Use My Location'
        }
      )
    } else {
      alert('Geolocation is not supported by your browser. Please select a region or enter coordinates manually.')
    }
  })

  page.querySelector('#manual-location-btn').addEventListener('click', () => {
    page.querySelector('#location-modal').classList.remove('hidden')
  })

  page.querySelector('#cancel-location-btn').addEventListener('click', () => {
    page.querySelector('#location-modal').classList.add('hidden')
  })

  page.querySelector('#confirm-location-btn').addEventListener('click', () => {
    const lat = parseFloat(page.querySelector('#manual-lat').value)
    const lon = parseFloat(page.querySelector('#manual-lon').value)
    
    if (isNaN(lat) || isNaN(lon)) {
      alert('Please enter valid coordinates')
      return
    }
    
    page.querySelector('#location-modal').classList.add('hidden')
    analyzeLocation(lat, lon)
  })

  page.querySelector('#close-crop-modal').addEventListener('click', () => {
    page.querySelector('#crop-modal').classList.add('hidden')
  })

  // Filter buttons
  page.querySelector('#filter-all').addEventListener('click', () => {
    setActiveFilter('all')
    displayCrops(cropRecommendations)
  })

  page.querySelector('#filter-resilient').addEventListener('click', () => {
    setActiveFilter('resilient')
    const resilient = cropEngine.getClimateResilientCrops()
    displayCrops(cropRecommendations.filter(c => resilient.some(r => r.id === c.id)))
  })

  page.querySelector('#filter-drought').addEventListener('click', () => {
    setActiveFilter('drought')
    const drought = cropEngine.getDroughtTolerantCrops()
    displayCrops(cropRecommendations.filter(c => drought.some(d => d.id === c.id)))
  })

  function setActiveFilter(filter) {
    const buttons = ['filter-all', 'filter-resilient', 'filter-drought']
    buttons.forEach(btn => {
      const el = page.querySelector(`#${btn}`)
      if (btn === `filter-${filter}`) {
        el.className = 'px-4 py-2 rounded-lg bg-primary text-white font-semibold text-sm'
      } else {
        el.className = 'px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark font-semibold text-sm hover:bg-gray-300 dark:hover:bg-gray-600'
      }
    })
  }

  async function analyzeLocation(latitude, longitude, regionInfo = null) {
    currentLocation = { latitude, longitude, regionInfo }
    
    // Show loading
    page.querySelector('#hero-section').classList.add('hidden')
    page.querySelector('#loading-section').classList.remove('hidden')
    page.querySelector('#dashboard-content').classList.add('hidden')
    
    try {
      // Fetch all data in parallel
      const [soil, currentWeather] = await Promise.all([
        soilAPI.analyzeSoilByLocation(latitude, longitude),
        climateAPI.getCurrentWeather(latitude, longitude)
      ])
      
      soilData = soil
      
      // If region info is provided, enhance soil data with region-specific information
      if (regionInfo) {
        soilData.regionName = regionInfo.name
        soilData.regionCounties = regionInfo.counties
        soilData.regionCharacteristics = regionInfo.characteristics
      }
      
      // Structure climate data properly
      climateData = {
        current: currentWeather,
        forecast: { daily: [] }
      }
      
      // Get forecast
      const forecast = await climateAPI.getForecast(latitude, longitude)
      climateData.forecast.daily = forecast
      
      // Get crop recommendations
      cropRecommendations = cropEngine.recommendCrops(soilData, climateData)
      
      // Display everything
      displayDashboard()
      
    } catch (error) {
      console.error('Analysis error:', error)
      alert('Error analyzing farm data. Please try again.')
      page.querySelector('#loading-section').classList.add('hidden')
      page.querySelector('#hero-section').classList.remove('hidden')
      
      // Reset analyze buttons
      const analyzeBtn = page.querySelector('#analyze-btn')
      analyzeBtn.disabled = false
      analyzeBtn.innerHTML = '<span class="material-symbols-outlined">my_location</span> Use My Location'
    }
  }

  function displayDashboard() {
    // Hide loading, show dashboard
    page.querySelector('#loading-section').classList.add('hidden')
    page.querySelector('#dashboard-content').classList.remove('hidden')
    
    // Update quick stats
    page.querySelector('#health-score').textContent = soilData.healthScore
    page.querySelector('#health-status').textContent = getHealthStatus(soilData.healthScore)
    page.querySelector('#temperature').textContent = `${Math.round(climateData.current.temperature)}°C`
    page.querySelector('#temp-description').textContent = climateData.current.description
    
    const totalRain = climateData.forecast.daily.reduce((sum, day) => sum + (day.rainfall || 0), 0)
    page.querySelector('#rainfall').textContent = `${Math.round(totalRain)} mm`
    page.querySelector('#crop-count').textContent = cropRecommendations.length
    
    // Display soil analysis
    displaySoilAnalysis()
    
    // Display weather
    displayWeather()
    
    // Display crops
    displayCrops(cropRecommendations)
    
    // Reset analyze buttons
    const analyzeBtn = page.querySelector('#analyze-btn')
    analyzeBtn.disabled = false
    analyzeBtn.innerHTML = '<span class="material-symbols-outlined">my_location</span> Use My Location'
  }

  function getHealthStatus(score) {
    if (score >= 80) return 'Excellent Condition'
    if (score >= 70) return 'Good Condition'
    if (score >= 60) return 'Fair Condition'
    if (score >= 50) return 'Needs Attention'
    return 'Poor Condition'
  }

  function displaySoilAnalysis() {
    // Show location and region info
    let locationText = `${currentLocation.latitude.toFixed(4)}°, ${currentLocation.longitude.toFixed(4)}`
    if (soilData.regionName) {
      locationText = `${soilData.regionName} - ${locationText}`
    }
    page.querySelector('#soil-location').textContent = locationText
    
    page.querySelector('#soil-type-info').textContent = `${soilData.soilType.type} - ${soilData.soilType.texture}`
    
    // Display metrics
    const metricsHTML = `
      ${createMetricBar('pH Level', soilData.analysis.pH.value, 5, 8, soilData.analysis.pH.status.level.toLowerCase())}
      ${createMetricBar('Nitrogen (N)', soilData.analysis.nitrogen.value * 100, 0, 100, soilData.analysis.nitrogen.status.level.toLowerCase())}
      ${createMetricBar('Phosphorus (P)', soilData.analysis.phosphorus.value, 0, 100, soilData.analysis.phosphorus.status.level.toLowerCase())}
      ${createMetricBar('Potassium (K)', soilData.analysis.potassium.value, 0, 300, soilData.analysis.potassium.status.level.toLowerCase())}
      ${createMetricBar('Organic Matter', soilData.analysis.organicMatter.value, 0, 10, soilData.analysis.organicMatter.status.level.toLowerCase())}
    `
    page.querySelector('#soil-metrics').innerHTML = metricsHTML
    
    // Display recommendations (immediate and short-term)
    let recsHTML = ''
    
    // Add region-specific recommendations if available
    if (soilData.regionCharacteristics) {
      recsHTML += `
        <div class="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border-2 border-green-300 dark:border-green-700 mb-3">
          <h4 class="font-bold text-green-800 dark:text-green-300 mb-2 flex items-center gap-2">
            <span class="material-symbols-outlined">location_on</span>
            ${soilData.regionName} Region Insights
          </h4>
          <div class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <div><span class="font-semibold">Counties:</span> ${soilData.regionCounties.join(', ')}</div>
            <div><span class="font-semibold">Soil Type:</span> ${soilData.regionCharacteristics.soilType}</div>
            <div><span class="font-semibold">Fertility:</span> ${soilData.regionCharacteristics.fertility}</div>
            <div><span class="font-semibold">Rainfall:</span> ${soilData.regionCharacteristics.rainfall}</div>
            <div><span class="font-semibold">Temperature:</span> ${soilData.regionCharacteristics.temperature}</div>
            <div><span class="font-semibold">Best Crops:</span> ${soilData.regionCharacteristics.bestCrops.join(', ')}</div>
          </div>
          <div class="mt-3">
            <div class="font-semibold text-sm mb-2 text-green-800 dark:text-green-300">Regional Advantages:</div>
            <ul class="space-y-1">
              ${soilData.regionCharacteristics.advantages.map(adv => `
                <li class="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span class="text-green-600">✓</span>
                  <span>${adv}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      `
    }
    
    // Add soil-specific recommendations
    if (soilData.recommendations.immediate && soilData.recommendations.immediate.length > 0) {
      recsHTML += soilData.recommendations.immediate.map(rec => `
        <div class="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
          <span class="material-symbols-outlined text-amber-600 mt-1">priority_high</span>
          <div>
            <div class="font-semibold text-text-light dark:text-text-dark text-sm">IMMEDIATE ACTION</div>
            <div class="text-text-light/80 dark:text-text-dark/80 text-sm">${typeof rec === 'string' ? rec : rec.description}</div>
          </div>
        </div>
      `).join('')
    }
    
    if (soilData.recommendations.shortTerm && soilData.recommendations.shortTerm.length > 0) {
      recsHTML += soilData.recommendations.shortTerm.map(rec => `
        <div class="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <span class="material-symbols-outlined text-blue-600 mt-1">schedule</span>
          <div>
            <div class="font-semibold text-text-light dark:text-text-dark text-sm">SHORT TERM (1-3 months)</div>
            <div class="text-text-light/80 dark:text-text-dark/80 text-sm">${typeof rec === 'string' ? rec : rec.description}</div>
          </div>
        </div>
      `).join('')
    }
    
    page.querySelector('#soil-recommendations').innerHTML = recsHTML
    
    // Display risk factors if any
    if (soilData.riskFactors && soilData.riskFactors.length > 0) {
      const risksHTML = `
        <div class="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border-2 border-red-200 dark:border-red-800">
          <h4 class="font-semibold text-text-light dark:text-text-dark mb-3 flex items-center gap-2">
            <span class="material-symbols-outlined text-red-600">warning</span>
            Risk Factors
          </h4>
          <ul class="space-y-2">
            ${soilData.riskFactors.map(risk => `
              <li class="flex items-start gap-2 text-text-light/80 dark:text-text-dark/80 text-sm">
                <span class="text-red-600">•</span>
                <span>${typeof risk === 'string' ? risk : risk.description}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      `
      page.querySelector('#risk-factors-container').innerHTML = risksHTML
    }
  }

  function createMetricBar(label, value, min, max, status) {
    const percentage = ((value - min) / (max - min)) * 100
    
    // Normalize status to lowercase for comparison
    const normalizedStatus = (status || '').toLowerCase()
    
    const colors = {
      'very low': 'bg-red-600',
      'low': 'bg-orange-500',
      'medium': 'bg-yellow-500',
      'moderate': 'bg-yellow-500',
      'good': 'bg-green-500',
      'optimal': 'bg-green-600',
      'high': 'bg-green-500',
      'very high': 'bg-green-600',
      'excellent': 'bg-green-700',
      'very acidic': 'bg-red-600',
      'acidic': 'bg-orange-500',
      'slightly alkaline': 'bg-yellow-500',
      'alkaline': 'bg-orange-500'
    }
    const color = colors[normalizedStatus] || 'bg-gray-500'
    
    // Format value based on label
    let displayValue = value.toFixed(label.includes('pH') ? 1 : 0)
    let unit = ''
    if (label.includes('pH')) {
      unit = ''
    } else if (label.includes('Nitrogen')) {
      unit = '%'
      displayValue = (value / 100).toFixed(2) + '%'
    } else if (label.includes('Organic')) {
      unit = '%'
      displayValue = value.toFixed(1) + '%'
    } else {
      unit = ' ppm'
    }
    
    return `
      <div>
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-semibold text-text-light dark:text-text-dark">${label}</span>
          <span class="text-sm font-bold text-text-light dark:text-text-dark">${displayValue}${label.includes('Nitrogen') || label.includes('Organic') ? '' : unit}</span>
        </div>
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div class="${color} h-3 rounded-full transition-all" style="width: ${Math.min(Math.max(percentage, 0), 100)}%"></div>
        </div>
        <div class="text-xs text-text-light/70 dark:text-text-dark/70 mt-1 capitalize">${status}</div>
      </div>
    `
  }

  function displayWeather() {
    // Current weather (already in quick stats, but let's update the card)
    page.querySelector('#current-temp').textContent = `${Math.round(climateData.current.temperature)}°C`
    page.querySelector('#current-desc').textContent = climateData.current.description || 'Clear'
    page.querySelector('#current-humidity').textContent = `Humidity: ${climateData.current.humidity}%`
    page.querySelector('#current-wind').textContent = `Wind: ${Math.round(climateData.current.windSpeed)} km/h`
    
    // 7-day forecast
    const forecastHTML = climateData.forecast.daily.map(day => `
      <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
        <div class="text-xs font-semibold text-text-light/70 dark:text-text-dark/70 mb-1">
          ${new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
        </div>
        <div class="text-2xl mb-1">${getWeatherEmoji(day.description)}</div>
        <div class="text-sm font-bold text-text-light dark:text-text-dark">${Math.round(day.tempMax)}°</div>
        <div class="text-xs text-text-light/70 dark:text-text-dark/70">${Math.round(day.tempMin)}°</div>
        ${day.rainfall > 0 ? `<div class="text-xs text-blue-600 mt-1">${Math.round(day.rainfall)}mm</div>` : ''}
      </div>
    `).join('')
    
    page.querySelector('#forecast-grid').innerHTML = forecastHTML
    
    // Farming recommendations
    const farmingRecs = climateAPI.getFarmingRecommendations(climateData.current, climateData.forecast.daily)
    const recsHTML = farmingRecs.map(rec => `
      <div class="flex items-start gap-2 text-text-light/80 dark:text-text-dark/80 text-sm">
        <span class="text-amber-600">•</span>
        <span><strong>${rec.title}:</strong> ${rec.action}</span>
      </div>
    `).join('')
    
    page.querySelector('#weather-recommendations').innerHTML = recsHTML || '<div class="text-sm text-text-light/70 dark:text-text-dark/70">Weather conditions are favorable for farming activities.</div>'
  }

  function getWeatherEmoji(description) {
    const lower = description.toLowerCase()
    if (lower.includes('rain')) return '🌧️'
    if (lower.includes('cloud')) return '☁️'
    if (lower.includes('sun') || lower.includes('clear')) return '☀️'
    if (lower.includes('storm')) return '⛈️'
    return '🌤️'
  }

  function displayCrops(crops) {
    const cropsHTML = crops.slice(0, 9).map(crop => {
      // The crop object already has all properties spread from the recommendation
      const score = crop.suitabilityScore
      
      return `
        <div class="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all cursor-pointer crop-card" data-crop-id="${crop.id}">
          <div class="flex items-center justify-between mb-4">
            <div class="text-4xl">${crop.image}</div>
            <div class="text-right">
              <div class="text-2xl font-bold text-text-light dark:text-text-dark">${score}</div>
              <div class="text-xs text-text-light/70 dark:text-text-dark/70">Score</div>
            </div>
          </div>
          
          <h3 class="text-xl font-bold text-text-light dark:text-text-dark mb-1">${crop.name}</h3>
          <p class="text-sm text-text-light/70 dark:text-text-dark/70 mb-4">${crop.scientificName}</p>
          
          <div class="space-y-2 mb-4">
            <div class="flex items-center gap-2 text-sm">
              <span class="material-symbols-outlined text-green-600 text-lg">schedule</span>
              <span class="text-text-light/80 dark:text-text-dark/80">${crop.growing.duration} days</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <span class="material-symbols-outlined text-blue-600 text-lg">water_drop</span>
              <span class="text-text-light/80 dark:text-text-dark/80">${crop.requirements.water}</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <span class="material-symbols-outlined text-amber-600 text-lg">trending_up</span>
              <span class="text-text-light/80 dark:text-text-dark/80">${crop.yield.average} tons/ha</span>
            </div>
          </div>
          
          ${crop.advantages && crop.advantages.length > 0 ? `
            <div class="mb-4">
              <div class="text-xs font-semibold text-green-600 mb-1">ADVANTAGES</div>
              <div class="text-xs text-text-light/80 dark:text-text-dark/80">${crop.advantages[0]}</div>
            </div>
          ` : ''}
          
          <button class="w-full bg-primary/10 text-primary px-4 py-2 rounded-lg font-semibold text-sm hover:bg-primary/20 transition-all">
            View Growing Guide
          </button>
        </div>
      `
    }).join('')
    
    page.querySelector('#crops-grid').innerHTML = cropsHTML
    
    // Add click handlers to crop cards
    page.querySelectorAll('.crop-card').forEach(card => {
      card.addEventListener('click', () => {
        const cropId = card.dataset.cropId
        showCropDetails(cropId)
      })
    })
  }

  function showCropDetails(cropId) {
    const crop = cropRecommendations.find(c => c.id === cropId)
    if (!crop) return
    
    page.querySelector('#crop-modal-title').textContent = `${crop.image} ${crop.name}`
    
    const contentHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Left Column -->
        <div class="space-y-6">
          <!-- Overview -->
          <div>
            <h4 class="text-lg font-bold text-text-light dark:text-text-dark mb-3">Overview</h4>
            <div class="space-y-2 text-sm">
              <div><span class="font-semibold">Scientific Name:</span> ${crop.scientificName}</div>
              <div><span class="font-semibold">Category:</span> ${crop.category}</div>
              <div><span class="font-semibold">Duration:</span> ${crop.growing.duration} days</div>
              <div><span class="font-semibold">Season:</span> ${crop.growing.season}</div>
            </div>
          </div>

          <!-- Suitability Score -->
          <div class="bg-primary/10 rounded-xl p-4">
            <h4 class="text-lg font-bold text-text-light dark:text-text-dark mb-3">Suitability Score</h4>
            <div class="text-4xl font-bold text-primary mb-2">${crop.suitabilityScore}/100</div>
            <div class="space-y-1 text-sm">
              <div class="flex justify-between">
                <span>pH Compatibility:</span>
                <span class="font-semibold">${crop.scoreBreakdown.pH}/20</span>
              </div>
              <div class="flex justify-between">
                <span>Nutrient Match:</span>
                <span class="font-semibold">${crop.scoreBreakdown.nutrients}/30</span>
              </div>
              <div class="flex justify-between">
                <span>Climate Suitability:</span>
                <span class="font-semibold">${crop.scoreBreakdown.climate}/30</span>
              </div>
              <div class="flex justify-between">
                <span>Water Availability:</span>
                <span class="font-semibold">${crop.scoreBreakdown.water}/10</span>
              </div>
              <div class="flex justify-between">
                <span>Sustainability:</span>
                <span class="font-semibold">${crop.scoreBreakdown.sustainability}/10</span>
              </div>
            </div>
          </div>

          <!-- Requirements -->
          <div>
            <h4 class="text-lg font-bold text-text-light dark:text-text-dark mb-3">Growing Requirements</h4>
            <div class="space-y-3">
              <div class="flex items-start gap-2">
                <span class="material-symbols-outlined text-green-600">science</span>
                <div class="flex-1">
                  <div class="font-semibold text-sm">Soil pH</div>
                  <div class="text-sm text-text-light/70 dark:text-text-dark/70">${crop.requirements.ph.min} - ${crop.requirements.ph.max}</div>
                </div>
              </div>
              <div class="flex items-start gap-2">
                <span class="material-symbols-outlined text-blue-600">thermostat</span>
                <div class="flex-1">
                  <div class="font-semibold text-sm">Temperature</div>
                  <div class="text-sm text-text-light/70 dark:text-text-dark/70">${crop.requirements.climate.tempMin}°C - ${crop.requirements.climate.tempMax}°C</div>
                </div>
              </div>
              <div class="flex items-start gap-2">
                <span class="material-symbols-outlined text-purple-600">water_drop</span>
                <div class="flex-1">
                  <div class="font-semibold text-sm">Rainfall</div>
                  <div class="text-sm text-text-light/70 dark:text-text-dark/70">${crop.requirements.climate.rainfall}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Yield & Economics -->
          <div>
            <h4 class="text-lg font-bold text-text-light dark:text-text-dark mb-3">Yield & Economics</h4>
            <div class="space-y-2 text-sm">
              <div><span class="font-semibold">Expected Yield:</span> ${crop.yield.average} - ${crop.yield.good} tons/ha</div>
              <div><span class="font-semibold">Market Price:</span> KES ${crop.economics.priceRange}</div>
              <div><span class="font-semibold">Market Demand:</span> ${crop.economics.demand}</div>
              <div><span class="font-semibold">Storage Life:</span> ${crop.economics.storageLife}</div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-6">
          <!-- Growth Stages -->
          <div>
            <h4 class="text-lg font-bold text-text-light dark:text-text-dark mb-3">Growth Stages</h4>
            <div class="space-y-3">
              ${crop.growthStages.map((stage, idx) => `
                <div class="relative pl-6 pb-4 ${idx < crop.growthStages.length - 1 ? 'border-l-2 border-gray-300 dark:border-gray-600' : ''}">
                  <div class="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>
                  <div class="font-semibold text-sm">${stage.stage}</div>
                  <div class="text-xs text-text-light/70 dark:text-text-dark/70 mb-1">${stage.duration}</div>
                  <div class="text-sm text-text-light/80 dark:text-text-dark/80">${stage.description}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Management Practices -->
          <div>
            <h4 class="text-lg font-bold text-text-light dark:text-text-dark mb-3">Management</h4>
            <div class="space-y-3">
              <div>
                <div class="font-semibold text-sm mb-1 flex items-center gap-2">
                  <span class="material-symbols-outlined text-blue-600 text-lg">water_drop</span>
                  Watering
                </div>
                <div class="text-sm text-text-light/70 dark:text-text-dark/70">${crop.management.watering}</div>
              </div>
              <div>
                <div class="font-semibold text-sm mb-1 flex items-center gap-2">
                  <span class="material-symbols-outlined text-green-600 text-lg">compost</span>
                  Fertilization
                </div>
                <div class="text-sm text-text-light/70 dark:text-text-dark/70">${crop.management.fertilization}</div>
              </div>
              <div>
                <div class="font-semibold text-sm mb-1 flex items-center gap-2">
                  <span class="material-symbols-outlined text-amber-600 text-lg">grass</span>
                  Weeding
                </div>
                <div class="text-sm text-text-light/70 dark:text-text-dark/70">${crop.management.weeding}</div>
              </div>
              <div>
                <div class="font-semibold text-sm mb-1 flex items-center gap-2">
                  <span class="material-symbols-outlined text-red-600 text-lg">bug_report</span>
                  Pest Control
                </div>
                <div class="text-sm text-text-light/70 dark:text-text-dark/70">${crop.management.pestControl}</div>
              </div>
            </div>
          </div>

          <!-- Sustainability -->
          <div class="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
            <h4 class="text-lg font-bold text-text-light dark:text-text-dark mb-3">Sustainability</h4>
            <div class="flex items-center gap-2 mb-3">
              <span class="text-2xl font-bold text-green-600">${crop.sustainability.score}/10</span>
              <span class="text-sm text-text-light/70 dark:text-text-dark/70">Environmental Score</span>
            </div>
            <div class="space-y-2">
              ${crop.sustainability.benefits.map(benefit => `
                <div class="flex items-start gap-2 text-sm text-text-light/80 dark:text-text-dark/80">
                  <span class="text-green-600">✓</span>
                  <span>${benefit}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Companion Plants -->
          ${crop.management.companionPlants.length > 0 ? `
            <div>
              <h4 class="text-lg font-bold text-text-light dark:text-text-dark mb-3">Companion Plants</h4>
              <div class="flex flex-wrap gap-2">
                ${crop.management.companionPlants.map(plant => `
                  <span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold">${plant}</span>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>

      <!-- Advantages & Warnings -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        ${crop.advantages && crop.advantages.length > 0 ? `
          <div class="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
            <h4 class="font-bold text-green-700 dark:text-green-300 mb-2 flex items-center gap-2">
              <span class="material-symbols-outlined">check_circle</span>
              Advantages
            </h4>
            <ul class="space-y-1">
              ${crop.advantages.map(adv => `
                <li class="text-sm text-text-light/80 dark:text-text-dark/80 flex items-start gap-2">
                  <span class="text-green-600">•</span>
                  <span>${adv}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        ` : ''}
        
        ${crop.warnings && crop.warnings.length > 0 ? `
          <div class="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4">
            <h4 class="font-bold text-amber-700 dark:text-amber-300 mb-2 flex items-center gap-2">
              <span class="material-symbols-outlined">warning</span>
              Considerations
            </h4>
            <ul class="space-y-1">
              ${crop.warnings.map(warn => `
                <li class="text-sm text-text-light/80 dark:text-text-dark/80 flex items-start gap-2">
                  <span class="text-amber-600">•</span>
                  <span>${warn}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        ` : ''}
      </div>
    `
    
    page.querySelector('#crop-modal-content').innerHTML = contentHTML
    page.querySelector('#crop-modal').classList.remove('hidden')
  }
  
  return page
}
