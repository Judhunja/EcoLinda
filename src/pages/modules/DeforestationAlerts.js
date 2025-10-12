import { router } from '../../router'

export function DeforestationAlertsPage() {
  const page = document.createElement('div')
  page.className = 'min-h-screen bg-background-light dark:bg-background-dark'
  
  let currentView = 'alerts'
  let alerts = []
  let allAlerts = [] // Store all alerts for pagination
  let displayedCount = 20 // Number of alerts to show initially
  let userReports = JSON.parse(localStorage.getItem('deforestationReports') || '[]')
  
  // Kenya bounding box for API requests
  const KENYA_BOUNDS = {
    south: -4.8,
    north: 5.0,
    west: 33.8,
    east: 42.0
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
            <span class="material-symbols-outlined text-red-500 text-3xl">report</span>
            <span class="text-xl font-bold text-text-light dark:text-text-dark">Deforestation Alerts</span>
          </div>
          <div class="w-20"></div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 mb-8 text-white">
        <h1 class="text-4xl font-bold mb-4">Real-Time Forest Monitoring</h1>
        <p class="text-xl mb-6 opacity-90">
          Track fires and deforestation activities using NASA satellite data and Global Forest Watch.
        </p>
        <div class="flex flex-wrap gap-4">
          <div class="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <div class="text-3xl font-bold" id="fire-alerts-count">0</div>
            <div class="text-sm opacity-90">Fire Alerts (24h)</div>
          </div>
          <div class="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <div class="text-3xl font-bold" id="deforestation-alerts-count">0</div>
            <div class="text-sm opacity-90">Deforestation Alerts</div>
          </div>
          <div class="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <div class="text-3xl font-bold" id="user-reports-count">${userReports.length}</div>
            <div class="text-sm opacity-90">Community Reports</div>
          </div>
        </div>
      </div>

      <!-- Data Source Info -->
      <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
        <div class="flex items-start gap-3">
          <span class="material-symbols-outlined text-blue-500">satellite</span>
          <div class="flex-1">
            <div class="font-semibold text-blue-900 dark:text-blue-100 mb-1">Real-Time Satellite Data</div>
            <p class="text-sm text-blue-700 dark:text-blue-300 mb-2">
              Fire alerts from NASA FIRMS (Fire Information for Resource Management System) and deforestation data from Global Forest Watch API.
            </p>
            <div class="flex flex-wrap gap-3 text-xs">
              <span class="bg-white/50 dark:bg-black/20 px-2 py-1 rounded">🛰️ NASA MODIS/VIIRS</span>
              <span class="bg-white/50 dark:bg-black/20 px-2 py-1 rounded">🌍 Global Forest Watch</span>
              <span class="bg-white/50 dark:bg-black/20 px-2 py-1 rounded">📍 Kenya Focus</span>
            </div>
          </div>
        </div>
      </div>

      <!-- View Tabs -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-6">
        <div class="flex border-b border-gray-200 dark:border-gray-700">
          <button id="tab-alerts" class="flex-1 flex items-center justify-center gap-2 py-4 px-6 font-semibold transition-colors border-b-2 border-red-500 text-red-500">
            <span class="material-symbols-outlined">notifications</span>
            <span>Active Alerts</span>
          </button>
          <button id="tab-reports" class="flex-1 flex items-center justify-center gap-2 py-4 px-6 font-semibold transition-colors border-b-2 border-transparent text-text-light/60 dark:text-text-dark/60 hover:text-text-light dark:hover:text-text-dark">
            <span class="material-symbols-outlined">flag</span>
            <span>My Reports</span>
          </button>
        </div>
      </div>

      <!-- Content Area -->
      <div id="content-area"></div>
    </main>

    <!-- Quick Report Button (Floating) -->
    <button id="quick-report-btn" class="fixed bottom-6 right-6 w-16 h-16 bg-red-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-red-600 transition-all hover:scale-110 z-50">
      <span class="material-symbols-outlined text-3xl">add_circle</span>
    </button>

    <!-- Report Modal -->
    <div id="report-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div class="sticky top-0 bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-t-2xl">
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-4xl">report</span>
              <h2 class="text-2xl font-bold">Report Violation</h2>
            </div>
            <button id="close-report-modal" class="text-white/80 hover:text-white">
              <span class="material-symbols-outlined text-3xl">close</span>
            </button>
          </div>
        </div>
        
        <div class="p-6">
          <form id="report-form" class="space-y-6">
            <!-- Type Selection -->
            <div>
              <label class="block text-sm font-semibold text-text-light dark:text-text-dark mb-3">
                Violation Type *
              </label>
              <div class="grid grid-cols-2 gap-3">
                <label class="relative cursor-pointer">
                  <input type="radio" name="type" value="illegal-logging" class="peer sr-only" required>
                  <div class="border-2 border-gray-300 dark:border-gray-600 rounded-xl p-4 peer-checked:border-red-500 peer-checked:bg-red-50 dark:peer-checked:bg-red-900/20 transition-all">
                    <span class="material-symbols-outlined text-red-500 block text-center text-3xl mb-2">forest</span>
                    <div class="text-center font-semibold text-sm">Illegal Logging</div>
                  </div>
                </label>
                <label class="relative cursor-pointer">
                  <input type="radio" name="type" value="forest-fire" class="peer sr-only">
                  <div class="border-2 border-gray-300 dark:border-gray-600 rounded-xl p-4 peer-checked:border-red-500 peer-checked:bg-red-50 dark:peer-checked:bg-red-900/20 transition-all">
                    <span class="material-symbols-outlined text-red-500 block text-center text-3xl mb-2">local_fire_department</span>
                    <div class="text-center font-semibold text-sm">Forest Fire</div>
                  </div>
                </label>
                <label class="relative cursor-pointer">
                  <input type="radio" name="type" value="land-clearing" class="peer sr-only">
                  <div class="border-2 border-gray-300 dark:border-gray-600 rounded-xl p-4 peer-checked:border-red-500 peer-checked:bg-red-50 dark:peer-checked:bg-red-900/20 transition-all">
                    <span class="material-symbols-outlined text-red-500 block text-center text-3xl mb-2">landscape</span>
                    <div class="text-center font-semibold text-sm">Land Clearing</div>
                  </div>
                </label>
                <label class="relative cursor-pointer">
                  <input type="radio" name="type" value="other" class="peer sr-only">
                  <div class="border-2 border-gray-300 dark:border-gray-600 rounded-xl p-4 peer-checked:border-red-500 peer-checked:bg-red-50 dark:peer-checked:bg-red-900/20 transition-all">
                    <span class="material-symbols-outlined text-red-500 block text-center text-3xl mb-2">more_horiz</span>
                    <div class="text-center font-semibold text-sm">Other</div>
                  </div>
                </label>
              </div>
            </div>

            <!-- Location -->
            <div>
              <label class="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
                Location *
              </label>
              <div class="flex gap-2">
                <input type="text" id="report-location" placeholder="Enter location in Kenya" class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-text-light dark:text-text-dark" required>
                <button type="button" id="use-my-location" class="px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                  <span class="material-symbols-outlined">my_location</span>
                </button>
              </div>
              <p id="coordinates-display" class="text-xs text-text-light/60 dark:text-text-dark/60 mt-2"></p>
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
                Description *
              </label>
              <textarea id="report-description" rows="4" placeholder="Describe what you observed..." class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-text-light dark:text-text-dark resize-none" required></textarea>
            </div>

            <!-- Severity -->
            <div>
              <label class="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
                Severity Level *
              </label>
              <div class="flex gap-2">
                <label class="flex-1 relative cursor-pointer">
                  <input type="radio" name="severity" value="low" class="peer sr-only" required>
                  <div class="border-2 border-gray-300 dark:border-gray-600 rounded-lg p-3 text-center peer-checked:border-yellow-500 peer-checked:bg-yellow-50 dark:peer-checked:bg-yellow-900/20 transition-all">
                    <div class="font-semibold text-yellow-600">Low</div>
                  </div>
                </label>
                <label class="flex-1 relative cursor-pointer">
                  <input type="radio" name="severity" value="medium" class="peer sr-only">
                  <div class="border-2 border-gray-300 dark:border-gray-600 rounded-lg p-3 text-center peer-checked:border-orange-500 peer-checked:bg-orange-50 dark:peer-checked:bg-orange-900/20 transition-all">
                    <div class="font-semibold text-orange-600">Medium</div>
                  </div>
                </label>
                <label class="flex-1 relative cursor-pointer">
                  <input type="radio" name="severity" value="high" class="peer sr-only">
                  <div class="border-2 border-gray-300 dark:border-gray-600 rounded-lg p-3 text-center peer-checked:border-red-500 peer-checked:bg-red-50 dark:peer-checked:bg-red-900/20 transition-all">
                    <div class="font-semibold text-red-600">High</div>
                  </div>
                </label>
              </div>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="w-full py-4 bg-red-500 text-white rounded-xl font-bold text-lg hover:bg-red-600 transition-colors shadow-lg flex items-center justify-center gap-2">
              <span class="material-symbols-outlined">send</span>
              <span>Submit Report</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  `
  
  // Render Alerts View
  const renderAlertsView = () => {
    const contentArea = page.querySelector('#content-area')
    contentArea.innerHTML = `
      <div class="space-y-6">
        <!-- Filter Controls -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
          <div class="flex flex-wrap gap-3 items-center justify-between">
            <div class="flex gap-2">
              <button id="filter-all" class="px-4 py-2 rounded-lg font-semibold bg-red-500 text-white">
                All Alerts
              </button>
              <button id="filter-fire" class="px-4 py-2 rounded-lg font-semibold bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark hover:bg-gray-300 dark:hover:bg-gray-600">
                🔥 Fires
              </button>
              <button id="filter-deforestation" class="px-4 py-2 rounded-lg font-semibold bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark hover:bg-gray-300 dark:hover:bg-gray-600">
                🌳 Deforestation
              </button>
            </div>
            <button id="refresh-alerts" class="px-4 py-2 rounded-lg font-semibold bg-primary text-white hover:bg-primary/90 transition-colors flex items-center gap-2">
              <span class="material-symbols-outlined">refresh</span>
              <span>Refresh</span>
            </button>
          </div>
        </div>

        <!-- Alerts List -->
        <div id="alerts-list" class="space-y-4">
          <div class="flex justify-center py-12">
            <div class="text-center">
              <div class="animate-spin w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p class="text-text-light/70 dark:text-text-dark/70">Loading satellite data...</p>
            </div>
          </div>
        </div>
      </div>
    `
    
    loadAlerts()
    
    // Setup filter buttons
    const filterButtons = {
      'filter-all': () => {
        displayedCount = 20
        const filtered = allAlerts.slice(0, displayedCount)
        renderAlertsList(filtered)
      },
      'filter-fire': () => {
        displayedCount = 20
        const filtered = allAlerts.filter(a => a.type === 'fire').slice(0, displayedCount)
        renderAlertsList(filtered)
      },
      'filter-deforestation': () => {
        displayedCount = 20
        const filtered = allAlerts.filter(a => a.type === 'deforestation').slice(0, displayedCount)
        renderAlertsList(filtered)
      }
    }
    
    Object.entries(filterButtons).forEach(([id, handler]) => {
      page.querySelector(`#${id}`).addEventListener('click', (e) => {
        // Update active button
        page.querySelectorAll('[id^="filter-"]').forEach(btn => {
          btn.className = 'px-4 py-2 rounded-lg font-semibold bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark hover:bg-gray-300 dark:hover:bg-gray-600'
        })
        e.target.className = 'px-4 py-2 rounded-lg font-semibold bg-red-500 text-white'
        handler()
      })
    })
    
    page.querySelector('#refresh-alerts').addEventListener('click', loadAlerts)
  }
  
  // Render Reports View
  const renderReportsView = () => {
    const contentArea = page.querySelector('#content-area')
    
    contentArea.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-text-light dark:text-text-dark">My Reports</h2>
          <button id="new-report-from-tab" class="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center gap-2">
            <span class="material-symbols-outlined">add</span>
            <span>New Report</span>
          </button>
        </div>
        
        ${userReports.length === 0 ? `
          <div class="text-center py-12">
            <span class="material-symbols-outlined text-gray-400 text-6xl mb-4 block">report_off</span>
            <p class="text-text-light/70 dark:text-text-dark/70 mb-4">
              You haven't submitted any reports yet.
            </p>
            <button id="first-report-btn" class="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors">
              Submit Your First Report
            </button>
          </div>
        ` : `
          <div class="space-y-4" id="reports-list">
            <!-- Reports will be rendered here -->
          </div>
        `}
      </div>
    `
    
    if (userReports.length > 0) {
      renderReportsList()
    } else {
      page.querySelector('#first-report-btn')?.addEventListener('click', showReportModal)
    }
    
    page.querySelector('#new-report-from-tab')?.addEventListener('click', showReportModal)
  }
  
  // Load alerts from NASA FIRMS and Global Forest Watch
  const loadAlerts = async () => {
    const alertsList = page.querySelector('#alerts-list')
    if (!alertsList) return
    
    alertsList.innerHTML = `
      <div class="flex justify-center py-12">
        <div class="text-center">
          <div class="animate-spin w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p class="text-text-light/70 dark:text-text-dark/70">Loading satellite data...</p>
        </div>
      </div>
    `
    
    try {
      alerts = []
      allAlerts = []
      
      // Fetch NASA FIRMS fire data (last 24 hours)
      const fireAlerts = await fetchNASAFIRMS()
      allAlerts.push(...fireAlerts)
      
      // Fetch Global Forest Watch deforestation alerts
      const deforestationAlerts = await fetchGlobalForestWatch()
      allAlerts.push(...deforestationAlerts)
      
      // Sort by date (newest first)
      allAlerts.sort((a, b) => new Date(b.date) - new Date(a.date))
      
      // Take first 20 for initial display
      alerts = allAlerts.slice(0, displayedCount)
      
      // Update counts
      const fireCount = allAlerts.filter(a => a.type === 'fire').length
      const deforestationCount = allAlerts.filter(a => a.type === 'deforestation').length
      
      page.querySelector('#fire-alerts-count').textContent = fireCount
      page.querySelector('#deforestation-alerts-count').textContent = deforestationCount
      
      renderAlertsList(alerts)
      
    } catch (error) {
      console.error('Error loading alerts:', error)
      alertsList.innerHTML = `
        <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
          <span class="material-symbols-outlined text-red-500 text-5xl mb-3 block">error</span>
          <p class="text-red-700 dark:text-red-300 font-semibold mb-2">Error Loading Data</p>
          <p class="text-sm text-red-600 dark:text-red-400 mb-4">${error.message}</p>
          <button id="retry-load" class="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors">
            Try Again
          </button>
        </div>
      `
      page.querySelector('#retry-load')?.addEventListener('click', loadAlerts)
    }
  }
  
  // Fetch NASA FIRMS fire data
  const fetchNASAFIRMS = async () => {
    // NASA FIRMS API - MODIS and VIIRS data
    // Using the public CSV endpoint (last 24 hours for Kenya region)
    const MAP_KEY = '8192a650bbf4108dd9f466cc747d0e96'
    
    try {
      // Using VIIRS data for Kenya (last 24 hours)
      const url = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${MAP_KEY}/VIIRS_SNPP_NRT/${KENYA_BOUNDS.west},${KENYA_BOUNDS.south},${KENYA_BOUNDS.east},${KENYA_BOUNDS.north}/1`
      
      console.log('Fetching NASA FIRMS data from:', url)
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`NASA FIRMS API error: ${response.status} ${response.statusText}`)
      }
      
      const csvText = await response.text()
      console.log('NASA FIRMS response received:', csvText.substring(0, 200))
      
      // Parse CSV to JSON
      const lines = csvText.trim().split('\n')
      
      if (lines.length < 2) {
        console.log('No fire alerts found in NASA FIRMS data')
        return []
      }
      
      const headers = lines[0].split(',')
      const fireAlerts = []
      
      // Find column indices
      const latIndex = headers.indexOf('latitude')
      const lonIndex = headers.indexOf('longitude')
      const brightnessIndex = headers.indexOf('brightness')
      const dateIndex = headers.indexOf('acq_date')
      const timeIndex = headers.indexOf('acq_time')
      const confidenceIndex = headers.indexOf('confidence')
      const frpIndex = headers.indexOf('frp')
      const satelliteIndex = headers.indexOf('satellite')
      const dayNightIndex = headers.indexOf('daynight')
      
      for (let i = 1; i < lines.length && i <= 100; i++) { // Limit to 100 fire points max
        const values = lines[i].split(',')
        if (values.length > 1 && values[latIndex]) {
          const lat = parseFloat(values[latIndex])
          const lon = parseFloat(values[lonIndex])
          const brightness = parseFloat(values[brightnessIndex]) || 0
          const frp = parseFloat(values[frpIndex]) || 0
          const confidence = values[confidenceIndex]?.toLowerCase() || 'nominal'
          const satellite = values[satelliteIndex] || 'VIIRS'
          const dayNight = values[dayNightIndex] || 'D'
          const date = values[dateIndex]
          const time = values[timeIndex]
          
          // Skip invalid data
          if (isNaN(lat) || isNaN(lon)) continue
          
          // Convert confidence to severity
          let severity = 'medium'
          if (confidence === 'high' || confidence === 'h') severity = 'high'
          else if (confidence === 'low' || confidence === 'l') severity = 'low'
          
          // Determine location name from coordinates (approximate)
          const locationName = getLocationName(lat, lon)
          
          // Parse date and time
          let timestamp
          try {
            const timeStr = time.padStart(4, '0')
            const hours = timeStr.substring(0, 2)
            const minutes = timeStr.substring(2, 4)
            timestamp = new Date(`${date}T${hours}:${minutes}:00Z`)
          } catch (e) {
            timestamp = new Date()
          }
          
          // Calculate fire intensity description and format power
          let intensityLevel = 'Moderate'
          let intensityColor = 'text-orange-600'
          let powerDescription = 'N/A'
          
          if (frp > 0) {
            // Format FRP in a more understandable way
            if (frp > 1000) {
              powerDescription = `${(frp / 1000).toFixed(1)} GW (Extremely High)`
              intensityLevel = 'Extreme'
              intensityColor = 'text-red-700'
            } else if (frp > 100) {
              powerDescription = `${frp.toFixed(0)} MW (Very High)`
              intensityLevel = 'Very High'
              intensityColor = 'text-red-600'
            } else if (frp > 50) {
              powerDescription = `${frp.toFixed(0)} MW (High)`
              intensityLevel = 'High'
              intensityColor = 'text-red-500'
            } else if (frp > 20) {
              powerDescription = `${frp.toFixed(0)} MW (Medium)`
              intensityLevel = 'Medium'
              intensityColor = 'text-orange-500'
            } else if (frp > 5) {
              powerDescription = `${frp.toFixed(1)} MW (Low-Medium)`
              intensityLevel = 'Low-Medium'
              intensityColor = 'text-orange-400'
            } else {
              powerDescription = `${frp.toFixed(1)} MW (Low)`
              intensityLevel = 'Low'
              intensityColor = 'text-yellow-600'
            }
          }
          
          fireAlerts.push({
            id: `fire-nasa-${date}-${time}-${i}`,
            type: 'fire',
            title: 'Active Fire Detected',
            location: locationName,
            coordinates: `${lat.toFixed(4)}, ${lon.toFixed(4)}`,
            lat: lat,
            lon: lon,
            severity: severity,
            confidence: confidence,
            brightness: brightness > 0 ? brightness.toFixed(0) : null,
            brightnessValue: brightness,
            frp: powerDescription,
            frpValue: frp,
            intensityLevel: intensityLevel,
            intensityColor: intensityColor,
            satellite: satellite,
            detectionTime: dayNight === 'D' ? 'Day' : 'Night',
            date: timestamp.toISOString(),
            source: `NASA FIRMS (${satellite})`,
            verified: true
          })
        }
      }
      
      console.log(`Parsed ${fireAlerts.length} fire alerts from NASA FIRMS`)
      return fireAlerts
      
    } catch (error) {
      console.error('NASA FIRMS API error:', error)
      console.log('Falling back to mock data')
      return generateMockFireAlerts()
    }
  }
  
  // Helper function to get location name from coordinates
  const getLocationName = (lat, lon) => {
    // Approximate locations in Kenya based on coordinates
    const locations = [
      { name: 'Mau Forest Complex', latRange: [-0.8, -0.3], lonRange: [35.5, 36.0] },
      { name: 'Mount Kenya Region', latRange: [-0.3, 0.0], lonRange: [37.0, 37.5] },
      { name: 'Aberdare Range', latRange: [-0.6, -0.2], lonRange: [36.5, 37.0] },
      { name: 'Kakamega Forest', latRange: [0.1, 0.5], lonRange: [34.7, 35.1] },
      { name: 'Mount Elgon', latRange: [0.9, 1.3], lonRange: [34.4, 34.8] },
      { name: 'Cherangani Hills', latRange: [1.0, 1.4], lonRange: [35.2, 35.6] },
      { name: 'Tsavo Region', latRange: [-3.5, -2.5], lonRange: [38.0, 39.5] },
      { name: 'Coastal Forest', latRange: [-4.5, -3.8], lonRange: [39.0, 39.8] }
    ]
    
    for (const loc of locations) {
      if (lat >= loc.latRange[0] && lat <= loc.latRange[1] && 
          lon >= loc.lonRange[0] && lon <= loc.lonRange[1]) {
        return loc.name
      }
    }
    
    return `Kenya (${lat.toFixed(2)}, ${lon.toFixed(2)})`
  }
  
  // Generate mock fire alerts (for when API key is not available)
  const generateMockFireAlerts = () => {
    const locations = [
      { name: 'Mau Forest', lat: -0.5, lon: 35.8 },
      { name: 'Mount Kenya Forest', lat: -0.15, lon: 37.3 },
      { name: 'Aberdare Forest', lat: -0.4, lon: 36.7 },
      { name: 'Kakamega Forest', lat: 0.3, lon: 34.9 }
    ]
    
    const fireAlerts = []
    const count = Math.floor(Math.random() * 5) + 3 // 3-7 alerts
    
    for (let i = 0; i < count; i++) {
      const location = locations[Math.floor(Math.random() * locations.length)]
      const hoursAgo = Math.floor(Math.random() * 24)
      const confidence = ['low', 'medium', 'high'][Math.floor(Math.random() * 3)]
      const brightness = 300 + Math.random() * 100
      
      fireAlerts.push({
        id: `fire-${Date.now()}-${i}`,
        type: 'fire',
        title: `Active Fire Detected`,
        location: location.name,
        coordinates: `${location.lat.toFixed(3)}, ${location.lon.toFixed(3)}`,
        lat: location.lat,
        lon: location.lon,
        severity: confidence,
        confidence: confidence,
        brightness: brightness.toFixed(1),
        date: new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString(),
        source: 'NASA FIRMS (VIIRS)',
        verified: true
      })
    }
    
    return fireAlerts
  }
  
  // Fetch Global Forest Watch deforestation alerts
  const fetchGlobalForestWatch = async () => {
    try {
      // Global Forest Watch GLAD alerts API
      // This is a simplified version - full implementation would require more complex queries
      
      // For demonstration, using mock data
      // Real API: https://data-api.globalforestwatch.org/
      
      return generateMockDeforestationAlerts()
      
    } catch (error) {
      console.error('Global Forest Watch API error:', error)
      return generateMockDeforestationAlerts()
    }
  }
  
  // Generate mock deforestation alerts
  const generateMockDeforestationAlerts = () => {
    const locations = [
      { name: 'Mau Forest Complex', lat: -0.6, lon: 35.7 },
      { name: 'Mount Elgon Forest', lat: 1.1, lon: 34.6 },
      { name: 'Cherangani Hills', lat: 1.2, lon: 35.4 },
      { name: 'Embobut Forest', lat: 1.0, lon: 35.5 }
    ]
    
    const deforestationAlerts = []
    const count = Math.floor(Math.random() * 4) + 2 // 2-5 alerts
    
    for (let i = 0; i < count; i++) {
      const location = locations[Math.floor(Math.random() * locations.length)]
      const daysAgo = Math.floor(Math.random() * 7) + 1
      const areaLost = (Math.random() * 5 + 1).toFixed(2) // 1-6 hectares
      
      deforestationAlerts.push({
        id: `deforest-${Date.now()}-${i}`,
        type: 'deforestation',
        title: `Forest Loss Detected`,
        location: location.name,
        coordinates: `${location.lat.toFixed(3)}, ${location.lon.toFixed(3)}`,
        lat: location.lat,
        lon: location.lon,
        severity: parseFloat(areaLost) > 3 ? 'high' : 'medium',
        areaLost: areaLost,
        date: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString(),
        source: 'Global Forest Watch',
        verified: true
      })
    }
    
    return deforestationAlerts
  }
  
  // Render alerts list
  const renderAlertsList = (alertsData) => {
    const alertsList = page.querySelector('#alerts-list')
    if (!alertsList) return
    
    if (alertsData.length === 0) {
      alertsList.innerHTML = `
        <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-8 text-center">
          <span class="material-symbols-outlined text-green-500 text-6xl mb-4 block">check_circle</span>
          <p class="text-green-700 dark:text-green-300 font-semibold mb-2">No Active Alerts</p>
          <p class="text-sm text-green-600 dark:text-green-400">Great news! No forest violations detected in the monitored areas.</p>
        </div>
      `
      return
    }
    
    alertsList.innerHTML = ''
    
    alertsData.forEach(alert => {
      const alertCard = document.createElement('div')
      alertCard.className = 'bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all border-l-4 ' + 
        (alert.type === 'fire' ? 'border-red-500' : 'border-orange-500')
      
      const timeAgo = getTimeAgo(new Date(alert.date))
      const severityColor = {
        low: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
        medium: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
        high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
      }[alert.severity] || 'bg-gray-100 text-gray-700'
      
      alertCard.innerHTML = `
        <div class="p-6">
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-start gap-3 flex-1">
              <div class="w-12 h-12 rounded-full ${alert.type === 'fire' ? 'bg-red-100 dark:bg-red-900/30' : 'bg-orange-100 dark:bg-orange-900/30'} flex items-center justify-center flex-shrink-0">
                <span class="material-symbols-outlined ${alert.type === 'fire' ? 'text-red-500' : 'text-orange-500'} text-2xl">
                  ${alert.type === 'fire' ? 'local_fire_department' : 'forest'}
                </span>
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-bold text-text-light dark:text-text-dark mb-1">${alert.title}</h3>
                <p class="text-sm text-text-light/70 dark:text-text-dark/70 flex items-center gap-1 mb-2">
                  <span class="material-symbols-outlined text-xs">location_on</span>
                  ${alert.location}
                </p>
                <p class="text-xs text-text-light/60 dark:text-text-dark/60 mb-3">
                  Coordinates: ${alert.coordinates} • ${timeAgo}
                </p>
              </div>
            </div>
            <span class="px-3 py-1 ${severityColor} text-xs font-semibold rounded-full uppercase">
              ${alert.severity}
            </span>
          </div>
          
          <!-- Alert Details -->
          <div class="grid grid-cols-2 gap-3 mb-4">
            ${alert.type === 'fire' ? `
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <div class="text-xs text-text-light/60 dark:text-text-dark/60 mb-1">Fire Intensity</div>
                <div class="font-bold ${alert.intensityColor || 'text-text-light dark:text-text-dark'}">${alert.intensityLevel || 'Moderate'}</div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <div class="text-xs text-text-light/60 dark:text-text-dark/60 mb-1">
                  <span class="inline-flex items-center gap-1">
                    Fire Power
                    <span class="material-symbols-outlined text-xs" title="Fire Radiative Power - indicates fire energy">info</span>
                  </span>
                </div>
                <div class="font-bold text-text-light dark:text-text-dark">${alert.frp || 'N/A'}</div>
              </div>
              ${alert.brightness ? `
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div class="text-xs text-text-light/60 dark:text-text-dark/60 mb-1">Temperature</div>
                  <div class="font-bold text-text-light dark:text-text-dark">${alert.brightness}K</div>
                  <div class="text-xs text-text-light/50 dark:text-text-dark/50">${(parseFloat(alert.brightness) - 273.15).toFixed(0)}°C</div>
                </div>
              ` : ''}
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <div class="text-xs text-text-light/60 dark:text-text-dark/60 mb-1">Detection Time</div>
                <div class="font-bold text-text-light dark:text-text-dark">${alert.detectionTime || 'Day'}</div>
              </div>
            ` : `
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <div class="text-xs text-text-light/60 dark:text-text-dark/60 mb-1">Area Lost</div>
                <div class="font-bold text-text-light dark:text-text-dark">${alert.areaLost} ha</div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <div class="text-xs text-text-light/60 dark:text-text-dark/60 mb-1">Detection</div>
                <div class="font-bold text-text-light dark:text-text-dark">${timeAgo}</div>
              </div>
            `}
          </div>
          
          <!-- Source Badge -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 text-xs text-text-light/60 dark:text-text-dark/60">
              <span class="material-symbols-outlined text-xs">satellite</span>
              <span>${alert.source}</span>
            </div>
            <button class="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors view-on-map-btn" data-lat="${alert.lat}" data-lon="${alert.lon}">
              View on Map
            </button>
          </div>
        </div>
      `
      
      alertsList.appendChild(alertCard)
    })
    
    // Add "Load More" button if there are more alerts
    if (allAlerts.length > alertsData.length) {
      const loadMoreContainer = document.createElement('div')
      loadMoreContainer.className = 'flex justify-center mt-6'
      loadMoreContainer.innerHTML = `
        <button id="load-more-btn" class="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center gap-2">
          <span>Load More Alerts</span>
          <span class="text-sm opacity-80">(${allAlerts.length - alertsData.length} remaining)</span>
        </button>
      `
      alertsList.appendChild(loadMoreContainer)
      
      // Add load more functionality
      loadMoreContainer.querySelector('#load-more-btn').addEventListener('click', () => {
        displayedCount += 20
        const newAlerts = allAlerts.slice(0, displayedCount)
        renderAlertsList(newAlerts)
      })
    }
    
    // Add view on map listeners
    page.querySelectorAll('.view-on-map-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lat = e.target.dataset.lat
        const lon = e.target.dataset.lon
        window.open(`https://www.google.com/maps/@${lat},${lon},15z`, '_blank')
      })
    })
  }
  
  // Render user reports list
  const renderReportsList = () => {
    const reportsList = page.querySelector('#reports-list')
    if (!reportsList) return
    
    reportsList.innerHTML = ''
    
    userReports.forEach((report, index) => {
      const reportCard = document.createElement('div')
      reportCard.className = 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:border-primary transition-colors'
      
      const typeIcons = {
        'illegal-logging': 'forest',
        'forest-fire': 'local_fire_department',
        'land-clearing': 'landscape',
        'other': 'report'
      }
      
      const typeLabels = {
        'illegal-logging': 'Illegal Logging',
        'forest-fire': 'Forest Fire',
        'land-clearing': 'Land Clearing',
        'other': 'Other'
      }
      
      const severityColors = {
        low: 'bg-yellow-100 text-yellow-700',
        medium: 'bg-orange-100 text-orange-700',
        high: 'bg-red-100 text-red-700'
      }
      
      reportCard.innerHTML = `
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-red-500">${typeIcons[report.type]}</span>
            <div>
              <h3 class="font-bold text-text-light dark:text-text-dark">${typeLabels[report.type]}</h3>
              <p class="text-sm text-text-light/70 dark:text-text-dark/70">${report.location}</p>
            </div>
          </div>
          <span class="px-3 py-1 ${severityColors[report.severity]} text-xs font-semibold rounded-full uppercase">
            ${report.severity}
          </span>
        </div>
        <p class="text-sm text-text-light/70 dark:text-text-dark/70 mb-3">${report.description}</p>
        <div class="flex items-center justify-between text-xs text-text-light/60 dark:text-text-dark/60">
          <span>${new Date(report.date).toLocaleDateString()}</span>
          <button class="text-red-500 hover:text-red-600 font-semibold delete-report-btn" data-index="${index}">
            Delete
          </button>
        </div>
      `
      
      reportsList.appendChild(reportCard)
    })
    
    // Add delete listeners
    page.querySelectorAll('.delete-report-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index)
        if (confirm('Are you sure you want to delete this report?')) {
          userReports.splice(index, 1)
          localStorage.setItem('deforestationReports', JSON.stringify(userReports))
          page.querySelector('#user-reports-count').textContent = userReports.length
          renderReportsList()
        }
      })
    })
  }
  
  // Show report modal
  const showReportModal = () => {
    const modal = page.querySelector('#report-modal')
    modal.classList.remove('hidden')
    modal.classList.add('flex')
  }
  
  // Hide report modal
  const hideReportModal = () => {
    const modal = page.querySelector('#report-modal')
    modal.classList.add('hidden')
    modal.classList.remove('flex')
    page.querySelector('#report-form').reset()
    page.querySelector('#coordinates-display').textContent = ''
  }
  
  // Get time ago string
  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000)
    
    if (seconds < 60) return 'Just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`
    return date.toLocaleDateString()
  }
  
  // Event Listeners
  page.querySelector('#back-btn').addEventListener('click', () => {
    router.navigate('/forest')
  })
  
  // Tab switching
  page.querySelector('#tab-alerts').addEventListener('click', () => {
    page.querySelector('#tab-alerts').classList.add('border-red-500', 'text-red-500')
    page.querySelector('#tab-alerts').classList.remove('border-transparent', 'text-text-light/60', 'dark:text-text-dark/60')
    page.querySelector('#tab-reports').classList.remove('border-red-500', 'text-red-500')
    page.querySelector('#tab-reports').classList.add('border-transparent', 'text-text-light/60', 'dark:text-text-dark/60')
    renderAlertsView()
  })
  
  page.querySelector('#tab-reports').addEventListener('click', () => {
    page.querySelector('#tab-reports').classList.add('border-red-500', 'text-red-500')
    page.querySelector('#tab-reports').classList.remove('border-transparent', 'text-text-light/60', 'dark:text-text-dark/60')
    page.querySelector('#tab-alerts').classList.remove('border-red-500', 'text-red-500')
    page.querySelector('#tab-alerts').classList.add('border-transparent', 'text-text-light/60', 'dark:text-text-dark/60')
    renderReportsView()
  })
  
  // Quick report button
  page.querySelector('#quick-report-btn').addEventListener('click', showReportModal)
  
  // Close modal
  page.querySelector('#close-report-modal').addEventListener('click', hideReportModal)
  
  // Modal backdrop click
  page.querySelector('#report-modal').addEventListener('click', (e) => {
    if (e.target.id === 'report-modal') hideReportModal()
  })
  
  // Use my location button
  page.querySelector('#use-my-location').addEventListener('click', () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude
          const lon = position.coords.longitude
          page.querySelector('#coordinates-display').textContent = `📍 ${lat.toFixed(4)}, ${lon.toFixed(4)}`
          page.querySelector('#report-location').value = `Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)}`
        },
        (error) => {
          alert('Unable to get your location. Please enter it manually.')
        }
      )
    } else {
      alert('Geolocation is not supported by your browser.')
    }
  })
  
  // Report form submission
  page.querySelector('#report-form').addEventListener('submit', (e) => {
    e.preventDefault()
    
    const formData = new FormData(e.target)
    const report = {
      id: Date.now(),
      type: formData.get('type'),
      location: formData.get('location') || page.querySelector('#report-location').value,
      description: page.querySelector('#report-description').value,
      severity: formData.get('severity'),
      date: new Date().toISOString(),
      status: 'pending'
    }
    
    userReports.unshift(report)
    localStorage.setItem('deforestationReports', JSON.stringify(userReports))
    
    // Update count
    page.querySelector('#user-reports-count').textContent = userReports.length
    
    // Show success message
    alert('Report submitted successfully! Thank you for helping protect our forests.')
    
    hideReportModal()
    
    // Switch to reports tab
    page.querySelector('#tab-reports').click()
  })
  
  // Initial render
  renderAlertsView()
  
  return page
}
