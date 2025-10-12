import { router } from '../../router'
import { RegionalCropPlanner } from '../../lib/regionalCropPlanner'
import { generateSustainableFarmingContent } from '../../lib/gemini'

export function RegionalCropPlannerPage() {
  const page = document.createElement('div')
  page.className = 'min-h-screen bg-background-light dark:bg-background-dark'
  
  // Initialize planner
  const planner = new RegionalCropPlanner()
  
  // State
  let selectedRegion = null
  let selectedCrop = null
  let cropGuide = null
  let showEducation = false
  
  // Add custom styles for formatted content
  const style = document.createElement('style')
  style.textContent = `
    #modal-content ul {
      list-style: none;
      padding-left: 0;
    }
    #modal-content ul li {
      display: flex;
      align-items: flex-start;
      margin-bottom: 0.75rem;
      line-height: 1.6;
    }
    #modal-content h4 {
      font-size: 1.25rem;
      font-weight: 700;
      margin-top: 1.75rem;
      margin-bottom: 1rem;
      color: #111827;
      border-bottom: 3px solid #10b981;
      padding-bottom: 0.5rem;
      display: inline-block;
    }
    .dark #modal-content h4 {
      color: #f9fafb;
      border-bottom-color: #34d399;
    }
    #modal-content strong {
      color: #047857;
      font-weight: 600;
    }
    .dark #modal-content strong {
      color: #34d399;
    }
    #modal-content p {
      margin-bottom: 1rem;
      line-height: 1.7;
    }
    #modal-content p strong {
      font-weight: 700;
    }
    #modal-content ul li span:first-child {
      margin-top: 0.2rem;
    }
    #streaming-content h4:first-child {
      margin-top: 0;
    }
  `
  page.appendChild(style)
  
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
            <span class="text-3xl">🌾</span>
            <span class="text-xl font-bold text-text-light dark:text-text-dark">Regional Crop Planner</span>
          </div>
          <button id="education-toggle-btn" class="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition-colors">
            <span class="material-symbols-outlined">school</span>
            <span class="font-semibold">Education</span>
          </button>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-8 mb-8 text-white">
        <h1 class="text-4xl font-bold mb-4">🌍 Kenya Regional Crop Planner</h1>
        <p class="text-xl mb-2 opacity-90">
          Select your region and discover the best crops to grow sustainably
        </p>
        <p class="text-lg opacity-80">
          Get region-specific guidance, educational resources, and tips for sustainable agriculture aligned with SDG 15
        </p>
      </div>

      <!-- Region Selection -->
      <div id="region-selection" class="mb-8">
        <h2 class="text-2xl font-bold text-text-light dark:text-text-dark mb-4 flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">location_on</span>
          Step 1: Select Your Region
        </h2>
        <div id="regions-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Regions will be populated here -->
        </div>
      </div>

      <!-- Crop Selection -->
      <div id="crop-selection" class="mb-8 hidden">
        <h2 class="text-2xl font-bold text-text-light dark:text-text-dark mb-4 flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">agriculture</span>
          Step 2: Choose Your Crop
        </h2>
        <div id="selected-region-info" class="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 shadow-md">
          <!-- Selected region info will be populated here -->
        </div>
        <div id="crops-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Crops will be populated here -->
        </div>
      </div>

      <!-- Crop Guide -->
      <div id="crop-guide" class="hidden">
        <!-- Comprehensive growing guide will be populated here -->
      </div>

      <!-- Education Panel -->
      <div id="education-panel" class="hidden">
        <!-- Educational content will be populated here -->
      </div>
    </main>

    <!-- Crop Detail Modal -->
    <div id="crop-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden flex items-center justify-center p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div class="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-700 text-white p-6 flex justify-between items-center">
          <h2 id="modal-title" class="text-2xl font-bold"></h2>
          <button id="close-modal" class="text-white hover:text-gray-200">
            <span class="material-symbols-outlined text-3xl">close</span>
          </button>
        </div>
        <div id="modal-content" class="p-6">
          <!-- Modal content will be populated here -->
        </div>
      </div>
    </div>
  `

  // Populate regions
  function displayRegions() {
    const regionsGrid = page.querySelector('#regions-grid')
    const regions = planner.getRegions()
    
    regionsGrid.innerHTML = regions.map(region => `
      <button class="region-card bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 text-left border-2 border-transparent hover:border-primary" data-region="${region.id}">
        <div class="text-5xl mb-3">${region.icon}</div>
        <h3 class="text-xl font-bold text-text-light dark:text-text-dark mb-2">${region.name}</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">${region.description}</p>
        <div class="space-y-1 text-sm">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-sm">thermostat</span>
            <span class="text-gray-700 dark:text-gray-300">${region.temperature}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-sm">water_drop</span>
            <span class="text-gray-700 dark:text-gray-300">${region.rainfall}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-sm">landscape</span>
            <span class="text-gray-700 dark:text-gray-300">${region.elevation}</span>
          </div>
        </div>
        <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p class="text-xs text-gray-500 dark:text-gray-400">
            Counties: ${region.counties.slice(0, 3).join(', ')}${region.counties.length > 3 ? '...' : ''}
          </p>
        </div>
      </button>
    `).join('')

    // Add event listeners
    page.querySelectorAll('.region-card').forEach(card => {
      card.addEventListener('click', () => {
        selectRegion(card.dataset.region)
      })
    })
  }

  // Select region and show crops
  function selectRegion(regionId) {
    selectedRegion = planner.getRegions().find(r => r.id === regionId)
    selectedCrop = null
    cropGuide = null
    
    // Update UI
    page.querySelector('#crop-selection').classList.remove('hidden')
    page.querySelector('#crop-guide').classList.add('hidden')
    
    // Display region info
    displayRegionInfo()
    
    // Display crops
    displayCrops()
    
    // Scroll to crop selection
    page.querySelector('#crop-selection').scrollIntoView({ behavior: 'smooth' })
  }

  // Display selected region info
  function displayRegionInfo() {
    const infoDiv = page.querySelector('#selected-region-info')
    
    infoDiv.innerHTML = `
      <div class="flex items-start gap-6">
        <div class="text-6xl">${selectedRegion.icon}</div>
        <div class="flex-1">
          <h3 class="text-2xl font-bold text-text-light dark:text-text-dark mb-2">${selectedRegion.name}</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">${selectedRegion.description}</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg p-4">
              <h4 class="font-semibold text-green-800 dark:text-green-300 mb-2">Soil Characteristics</h4>
              <ul class="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                <li><strong>Type:</strong> ${selectedRegion.characteristics.soil.type}</li>
                <li><strong>pH:</strong> ${selectedRegion.characteristics.soil.pH}</li>
                <li><strong>Fertility:</strong> ${selectedRegion.characteristics.soil.fertility}</li>
                <li><strong>Organic Matter:</strong> ${selectedRegion.characteristics.soil.organicMatter}</li>
              </ul>
            </div>
            
            <div class="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg p-4">
              <h4 class="font-semibold text-blue-800 dark:text-blue-300 mb-2">Climate Pattern</h4>
              <ul class="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                <li><strong>Pattern:</strong> ${selectedRegion.characteristics.climate.pattern}</li>
                <li><strong>Long Rains:</strong> ${selectedRegion.characteristics.climate.longRains}</li>
                <li><strong>Short Rains:</strong> ${selectedRegion.characteristics.climate.shortRains}</li>
                <li><strong>Reliability:</strong> ${selectedRegion.characteristics.climate.reliability}</li>
              </ul>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 class="font-semibold text-orange-600 dark:text-orange-400 mb-2">⚠️ Challenges</h4>
              <ul class="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                ${selectedRegion.characteristics.challenges.map(c => `<li>• ${c}</li>`).join('')}
              </ul>
            </div>
            <div>
              <h4 class="font-semibold text-green-600 dark:text-green-400 mb-2">✓ Advantages</h4>
              <ul class="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                ${selectedRegion.characteristics.advantages.map(a => `<li>• ${a}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
        
        <button class="change-region-btn text-primary hover:text-primary-dark flex items-center gap-1 text-sm">
          <span class="material-symbols-outlined">change_circle</span>
          <span>Change Region</span>
        </button>
      </div>
    `

    // Change region button
    infoDiv.querySelector('.change-region-btn').addEventListener('click', () => {
      page.querySelector('#crop-selection').classList.add('hidden')
      page.querySelector('#region-selection').scrollIntoView({ behavior: 'smooth' })
    })
  }

  // Display crops for selected region
  function displayCrops() {
    const cropsGrid = page.querySelector('#crops-grid')
    const crops = planner.getCropsForRegion(selectedRegion.id)
    
    if (crops.length === 0) {
      cropsGrid.innerHTML = `
        <div class="col-span-full text-center py-8">
          <p class="text-gray-500 dark:text-gray-400">No crops found for this region. Try another region.</p>
        </div>
      `
      return
    }
    
    cropsGrid.innerHTML = crops.map(crop => `
      <button class="crop-card bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 text-left border-2 border-transparent hover:border-secondary cursor-pointer" data-crop="${crop.id}">
        <div class="flex items-start justify-between mb-3">
          <div class="text-5xl">${crop.icon}</div>
          <span class="px-3 py-1 rounded-full text-xs font-semibold ${
            crop.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
            crop.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-orange-100 text-orange-800'
          }">${crop.difficulty}</span>
        </div>
        
        <h3 class="text-xl font-bold text-text-light dark:text-text-dark mb-1">${crop.name}</h3>
        <p class="text-xs text-gray-500 dark:text-gray-400 italic mb-3">${crop.scientificName}</p>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">${crop.description}</p>
        
        <div class="space-y-2 text-sm">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-sm">schedule</span>
            <span class="text-gray-700 dark:text-gray-300">${crop.duration}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-sm">water_drop</span>
            <span class="text-gray-700 dark:text-gray-300">Water: ${crop.waterNeeds}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-sm">groups</span>
            <span class="text-gray-700 dark:text-gray-300">Labor: ${crop.laborIntensity}</span>
          </div>
        </div>
        
        ${crop.expectedYield ? `
          <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p class="text-xs font-semibold text-green-600 dark:text-green-400 mb-1">Expected Yield</p>
            <p class="text-xs text-gray-600 dark:text-gray-400">
              Good: ${crop.expectedYield.good}
            </p>
          </div>
        ` : ''}
      </button>
    `).join('')

    // Add event listeners
    page.querySelectorAll('.crop-card').forEach(card => {
      card.addEventListener('click', () => {
        selectCrop(card.dataset.crop)
      })
    })
  }

  // Select crop and show guide
  function selectCrop(cropId) {
    selectedCrop = cropId
    cropGuide = planner.getCropGuide(cropId, selectedRegion.id)
    
    displayCropGuide()
    
    // Show guide section
    page.querySelector('#crop-guide').classList.remove('hidden')
    page.querySelector('#crop-guide').scrollIntoView({ behavior: 'smooth' })
  }

  // Display comprehensive crop guide
  function displayCropGuide() {
    const guideDiv = page.querySelector('#crop-guide')
    
    guideDiv.innerHTML = `
      <!-- Guide Header -->
      <div class="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-8 mb-6 text-white">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="text-6xl">${cropGuide.crop.icon}</div>
            <div>
              <h2 class="text-3xl font-bold mb-2">${cropGuide.crop.name}</h2>
              <p class="text-lg opacity-90">${cropGuide.crop.scientificName}</p>
              <p class="text-sm opacity-80 mt-2">Growing in ${cropGuide.region.name}</p>
            </div>
          </div>
          <div class="text-right">
            <div class="bg-white bg-opacity-20 rounded-xl p-4 mb-2">
              <p class="text-sm opacity-80">Suitability Score</p>
              <p class="text-4xl font-bold">${cropGuide.suitability.score}%</p>
              <p class="text-sm font-semibold">${cropGuide.suitability.level}</p>
            </div>
            <button class="change-crop-btn text-white hover:text-gray-200 text-sm flex items-center gap-1 ml-auto">
              <span class="material-symbols-outlined">change_circle</span>
              <span>Change Crop</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md mb-6 overflow-x-auto">
        <div class="flex border-b border-gray-200 dark:border-gray-700">
          <button class="guide-tab active px-6 py-4 font-semibold border-b-2 border-primary text-primary" data-tab="timing">
            <span class="material-symbols-outlined text-sm">event</span>
            Timing
          </button>
          <button class="guide-tab px-6 py-4 font-semibold border-b-2 border-transparent hover:text-primary transition-colors" data-tab="preparation">
            <span class="material-symbols-outlined text-sm">agriculture</span>
            Preparation
          </button>
          <button class="guide-tab px-6 py-4 font-semibold border-b-2 border-transparent hover:text-primary transition-colors" data-tab="planting">
            <span class="material-symbols-outlined text-sm">yard</span>
            Planting
          </button>
          <button class="guide-tab px-6 py-4 font-semibold border-b-2 border-transparent hover:text-primary transition-colors" data-tab="maintenance">
            <span class="material-symbols-outlined text-sm">build</span>
            Maintenance
          </button>
          <button class="guide-tab px-6 py-4 font-semibold border-b-2 border-transparent hover:text-primary transition-colors" data-tab="harvesting">
            <span class="material-symbols-outlined text-sm">shopping_basket</span>
            Harvesting
          </button>
          <button class="guide-tab px-6 py-4 font-semibold border-b-2 border-transparent hover:text-primary transition-colors" data-tab="sustainability">
            <span class="material-symbols-outlined text-sm">eco</span>
            Sustainability
          </button>
          <button class="guide-tab px-6 py-4 font-semibold border-b-2 border-transparent hover:text-primary transition-colors" data-tab="economics">
            <span class="material-symbols-outlined text-sm">payments</span>
            Economics
          </button>
        </div>
      </div>

      <!-- Tab Content -->
      <div id="tab-content" class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <!-- Content will be dynamically loaded based on active tab -->
      </div>

      <!-- Quick Tips Section -->
      <div class="mt-6 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 rounded-xl p-6">
        <h3 class="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-4 flex items-center gap-2">
          <span class="material-symbols-outlined">lightbulb</span>
          Regional Tips for ${cropGuide.region.name}
        </h3>
        <ul class="space-y-2">
          ${cropGuide.preparation.regionalTips.map(tip => `
            <li class="flex items-start gap-2 text-gray-700 dark:text-gray-300">
              <span class="material-symbols-outlined text-yellow-600 text-sm mt-0.5">check_circle</span>
              <span>${tip}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <!-- Troubleshooting Section -->
      <div class="mt-6 bg-red-50 dark:bg-red-900 dark:bg-opacity-20 rounded-xl p-6">
        <h3 class="text-xl font-bold text-red-800 dark:text-red-300 mb-4 flex items-center gap-2">
          <span class="material-symbols-outlined">troubleshoot</span>
          Common Problems & Solutions
        </h3>
        <div class="space-y-4">
          ${cropGuide.troubleshooting.commonProblems.slice(0, 3).map(problem => `
            <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 class="font-semibold text-red-700 dark:text-red-400 mb-2">${problem.issue}</h4>
              <div class="text-sm space-y-2">
                <div>
                  <p class="font-semibold text-gray-600 dark:text-gray-400">Possible Causes:</p>
                  <p class="text-gray-700 dark:text-gray-300">${problem.causes.join(', ')}</p>
                </div>
                <div>
                  <p class="font-semibold text-gray-600 dark:text-gray-400">Solutions:</p>
                  <p class="text-gray-700 dark:text-gray-300">${problem.solutions.join(', ')}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="mt-4 pt-4 border-t border-red-200 dark:border-red-800">
          <p class="text-sm font-semibold text-red-800 dark:text-red-300 mb-2">Need More Help?</p>
          <ul class="text-sm space-y-1 text-gray-700 dark:text-gray-300">
            ${cropGuide.troubleshooting.getHelp.slice(0, 3).map(help => `<li>• ${help}</li>`).join('')}
          </ul>
        </div>
      </div>
    `

    // Change crop button
    guideDiv.querySelector('.change-crop-btn').addEventListener('click', () => {
      page.querySelector('#crop-guide').classList.add('hidden')
      page.querySelector('#crop-selection').scrollIntoView({ behavior: 'smooth' })
    })

    // Tab switching
    setupTabs()
    
    // Load first tab
    loadTabContent('timing')
  }

  // Setup tab navigation
  function setupTabs() {
    const tabs = page.querySelectorAll('.guide-tab')
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs
        tabs.forEach(t => {
          t.classList.remove('active', 'border-primary', 'text-primary')
          t.classList.add('border-transparent')
        })
        
        // Add active class to clicked tab
        tab.classList.add('active', 'border-primary', 'text-primary')
        tab.classList.remove('border-transparent')
        
        // Load tab content
        loadTabContent(tab.dataset.tab)
      })
    })
  }

  // Load tab content dynamically
  function loadTabContent(tabName) {
    const contentDiv = page.querySelector('#tab-content')
    
    const content = {
      timing: generateTimingContent(),
      preparation: generatePreparationContent(),
      planting: generatePlantingContent(),
      maintenance: generateMaintenanceContent(),
      harvesting: generateHarvestingContent(),
      sustainability: generateSustainabilityContent(),
      economics: generateEconomicsContent()
    }
    
    contentDiv.innerHTML = content[tabName] || '<p>Content not available</p>'
  }

  // Generate content for each tab
  function generateTimingContent() {
    return `
      <h3 class="text-2xl font-bold text-text-light dark:text-text-dark mb-4">📅 Planting Calendar</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg p-6">
          <h4 class="font-semibold text-blue-800 dark:text-blue-300 mb-3 flex items-center gap-2">
            <span class="material-symbols-outlined">rainy</span>
            Long Rains Season
          </h4>
          <p class="text-lg font-bold text-blue-700 dark:text-blue-400 mb-2">${cropGuide.timing.longRains || 'N/A'}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Best for most annual crops</p>
        </div>
        
        <div class="bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg p-6">
          <h4 class="font-semibold text-green-800 dark:text-green-300 mb-3 flex items-center gap-2">
            <span class="material-symbols-outlined">rainy</span>
            Short Rains Season
          </h4>
          <p class="text-lg font-bold text-green-700 dark:text-green-400 mb-2">${cropGuide.timing.shortRains || 'N/A'}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Quick-maturing varieties recommended</p>
        </div>
      </div>
      
      <div class="mt-6 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 rounded-lg p-6">
        <h4 class="font-semibold text-yellow-800 dark:text-yellow-300 mb-3">💡 Timing Recommendation</h4>
        <p class="text-gray-700 dark:text-gray-300">${cropGuide.timing.recommendation}</p>
      </div>
      
      <div class="mt-6">
        <h4 class="font-semibold text-text-light dark:text-text-dark mb-3">⏱️ Growth Duration</h4>
        <div class="bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900 dark:to-green-800 dark:bg-opacity-20 rounded-lg p-6">
          <p class="text-3xl font-bold text-green-700 dark:text-green-400 mb-2">${cropGuide.crop.duration}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">From planting to harvest</p>
        </div>
      </div>
    `
  }

  function generatePreparationContent() {
    return `
      <h3 class="text-2xl font-bold text-text-light dark:text-text-dark mb-4">🌱 Soil Preparation</h3>
      <div class="bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg p-6 mb-6">
        <p class="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">Start preparing: ${cropGuide.preparation.timing}</p>
      </div>
      
      <h4 class="font-semibold text-text-light dark:text-text-dark mb-3">Step-by-Step Preparation:</h4>
      <ol class="space-y-3">
        ${cropGuide.preparation.steps.map((step, index) => `
          <li class="flex items-start gap-3 bg-white dark:bg-gray-700 rounded-lg p-4">
            <span class="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">${index + 1}</span>
            <span class="text-gray-700 dark:text-gray-300 mt-1">${step}</span>
          </li>
        `).join('')}
      </ol>
    `
  }

  function generatePlantingContent() {
    return `
      <h3 class="text-2xl font-bold text-text-light dark:text-text-dark mb-4">🌾 Planting Guidelines</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg p-6">
          <h4 class="font-semibold text-blue-800 dark:text-blue-300 mb-3">Planting Method</h4>
          <p class="text-gray-700 dark:text-gray-300">${cropGuide.planting.method}</p>
        </div>
        
        <div class="bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg p-6">
          <h4 class="font-semibold text-green-800 dark:text-green-300 mb-3">Spacing</h4>
          <p class="text-gray-700 dark:text-gray-300">${cropGuide.planting.spacing}</p>
        </div>
        
        <div class="bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-lg p-6">
          <h4 class="font-semibold text-purple-800 dark:text-purple-300 mb-3">Planting Depth</h4>
          <p class="text-gray-700 dark:text-gray-300">${cropGuide.planting.depth}</p>
        </div>
        
        <div class="bg-orange-50 dark:bg-orange-900 dark:bg-opacity-20 rounded-lg p-6">
          <h4 class="font-semibold text-orange-800 dark:text-orange-300 mb-3">Fertilizer Application</h4>
          <p class="text-gray-700 dark:text-gray-300">${cropGuide.planting.fertilizer}</p>
        </div>
      </div>
      
      <div class="mt-6 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 rounded-lg p-6">
        <h4 class="font-semibold text-yellow-800 dark:text-yellow-300 mb-3">💡 Planting Tips</h4>
        <ul class="space-y-2">
          ${cropGuide.planting.tips.map(tip => `
            <li class="flex items-start gap-2 text-gray-700 dark:text-gray-300">
              <span class="material-symbols-outlined text-yellow-600 text-sm mt-0.5">check_circle</span>
              <span>${tip}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `
  }

  function generateMaintenanceContent() {
    return `
      <h3 class="text-2xl font-bold text-text-light dark:text-text-dark mb-6">🔧 Crop Maintenance</h3>
      
      <div class="space-y-6">
        <!-- Weeding -->
        <div class="bg-white dark:bg-gray-700 rounded-lg p-6">
          <h4 class="text-lg font-semibold text-text-light dark:text-text-dark mb-3 flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">grass</span>
            Weeding
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p class="font-semibold text-gray-600 dark:text-gray-400 mb-1">Frequency</p>
              <p class="text-gray-700 dark:text-gray-300">${cropGuide.maintenance.weeding.frequency}</p>
            </div>
            <div>
              <p class="font-semibold text-gray-600 dark:text-gray-400 mb-1">Method</p>
              <p class="text-gray-700 dark:text-gray-300">${cropGuide.maintenance.weeding.method}</p>
            </div>
            <div>
              <p class="font-semibold text-gray-600 dark:text-gray-400 mb-1">Timing</p>
              <p class="text-gray-700 dark:text-gray-300">${cropGuide.maintenance.weeding.timing.join(', ')}</p>
            </div>
          </div>
        </div>
        
        <!-- Fertilization -->
        <div class="bg-white dark:bg-gray-700 rounded-lg p-6">
          <h4 class="text-lg font-semibold text-text-light dark:text-text-dark mb-3 flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">science</span>
            Fertilization
          </h4>
          <div class="space-y-3 text-sm">
            <div>
              <p class="font-semibold text-gray-600 dark:text-gray-400 mb-1">Basal Application</p>
              <p class="text-gray-700 dark:text-gray-300">${cropGuide.maintenance.fertilization.basal}</p>
            </div>
            <div>
              <p class="font-semibold text-gray-600 dark:text-gray-400 mb-1">Top Dressing</p>
              <p class="text-gray-700 dark:text-gray-300">${cropGuide.maintenance.fertilization.topDress}</p>
            </div>
            <div>
              <p class="font-semibold text-gray-600 dark:text-gray-400 mb-1">Organic Options</p>
              <p class="text-gray-700 dark:text-gray-300">${cropGuide.maintenance.fertilization.organic}</p>
            </div>
          </div>
        </div>
        
        <!-- Irrigation -->
        <div class="bg-white dark:bg-gray-700 rounded-lg p-6">
          <h4 class="text-lg font-semibold text-text-light dark:text-text-dark mb-3 flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">water_drop</span>
            Irrigation
          </h4>
          <div class="space-y-3 text-sm">
            <div>
              <p class="font-semibold text-gray-600 dark:text-gray-400 mb-1">Importance</p>
              <p class="text-gray-700 dark:text-gray-300">${cropGuide.maintenance.irrigation.critical}</p>
            </div>
            <div>
              <p class="font-semibold text-gray-600 dark:text-gray-400 mb-1">Method</p>
              <p class="text-gray-700 dark:text-gray-300">${cropGuide.maintenance.irrigation.method}</p>
            </div>
            <div>
              <p class="font-semibold text-gray-600 dark:text-gray-400 mb-1">Frequency</p>
              <p class="text-gray-700 dark:text-gray-300">${cropGuide.maintenance.irrigation.frequency}</p>
            </div>
          </div>
        </div>
        
        <!-- Pest & Disease Management -->
        <div class="bg-white dark:bg-gray-700 rounded-lg p-6">
          <h4 class="text-lg font-semibold text-text-light dark:text-text-dark mb-3 flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">bug_report</span>
            Pest & Disease Management
          </h4>
          <div class="space-y-3 text-sm">
            <div>
              <p class="font-semibold text-gray-600 dark:text-gray-400 mb-1">Monitoring</p>
              <p class="text-gray-700 dark:text-gray-300">${cropGuide.maintenance.pestDisease.monitoring}</p>
            </div>
            <div>
              <p class="font-semibold text-gray-600 dark:text-gray-400 mb-1">Prevention</p>
              <p class="text-gray-700 dark:text-gray-300">${cropGuide.maintenance.pestDisease.prevention}</p>
            </div>
            <div>
              <p class="font-semibold text-gray-600 dark:text-gray-400 mb-1">Control Strategy</p>
              <p class="text-gray-700 dark:text-gray-300">${cropGuide.maintenance.pestDisease.control}</p>
            </div>
          </div>
        </div>
      </div>
    `
  }

  function generateHarvestingContent() {
    return `
      <h3 class="text-2xl font-bold text-text-light dark:text-text-dark mb-6">🌾 Harvesting & Post-Harvest</h3>
      
      <div class="bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg p-6 mb-6">
        <h4 class="font-semibold text-green-800 dark:text-green-300 mb-3">⏱️ Harvest Timing</h4>
        <p class="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">${cropGuide.harvesting.timing}</p>
        <p class="text-sm text-gray-600 dark:text-gray-400">From planting date</p>
      </div>
      
      <div class="space-y-6">
        <div class="bg-white dark:bg-gray-700 rounded-lg p-6">
          <h4 class="font-semibold text-text-light dark:text-text-dark mb-3">🔍 Signs of Maturity</h4>
          <ul class="space-y-2">
            ${cropGuide.harvesting.maturitySigns.map(sign => `
              <li class="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                <span class="material-symbols-outlined text-green-600 text-sm mt-0.5">check_circle</span>
                <span>${sign}</span>
              </li>
            `).join('')}
          </ul>
        </div>
        
        <div class="bg-white dark:bg-gray-700 rounded-lg p-6">
          <h4 class="font-semibold text-text-light dark:text-text-dark mb-3">✂️ Harvesting Method</h4>
          <p class="text-gray-700 dark:text-gray-300">${cropGuide.harvesting.method}</p>
        </div>
        
        <div class="bg-white dark:bg-gray-700 rounded-lg p-6">
          <h4 class="font-semibold text-text-light dark:text-text-dark mb-3">📦 Post-Harvest Handling</h4>
          <ol class="space-y-2">
            ${cropGuide.harvesting.postHarvest.map((step, index) => `
              <li class="flex items-start gap-3">
                <span class="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">${index + 1}</span>
                <span class="text-gray-700 dark:text-gray-300">${step}</span>
              </li>
            `).join('')}
          </ol>
        </div>
      </div>
    `
  }

  function generateSustainabilityContent() {
    return `
      <h3 class="text-2xl font-bold text-text-light dark:text-text-dark mb-6">🌍 Sustainable Growing Practices</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div class="bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg p-6">
          <h4 class="font-semibold text-green-800 dark:text-green-300 mb-3 flex items-center gap-2">
            <span class="material-symbols-outlined">landscape</span>
            Soil Conservation
          </h4>
          <ul class="space-y-2 text-sm">
            ${cropGuide.sustainability.soilConservation.map(practice => `
              <li class="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                <span class="material-symbols-outlined text-green-600 text-sm mt-0.5">check_circle</span>
                <span>${practice}</span>
              </li>
            `).join('')}
          </ul>
        </div>
        
        <div class="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg p-6">
          <h4 class="font-semibold text-blue-800 dark:text-blue-300 mb-3 flex items-center gap-2">
            <span class="material-symbols-outlined">water_drop</span>
            Water Conservation
          </h4>
          <ul class="space-y-2 text-sm">
            ${cropGuide.sustainability.waterConservation.map(practice => `
              <li class="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                <span class="material-symbols-outlined text-blue-600 text-sm mt-0.5">check_circle</span>
                <span>${practice}</span>
              </li>
            `).join('')}
          </ul>
        </div>
        
        <div class="bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-lg p-6">
          <h4 class="font-semibold text-purple-800 dark:text-purple-300 mb-3 flex items-center gap-2">
            <span class="material-symbols-outlined">spa</span>
            Biodiversity
          </h4>
          <ul class="space-y-2 text-sm">
            ${cropGuide.sustainability.biodiversity.map(practice => `
              <li class="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                <span class="material-symbols-outlined text-purple-600 text-sm mt-0.5">check_circle</span>
                <span>${practice}</span>
              </li>
            `).join('')}
          </ul>
        </div>
        
        <div class="bg-orange-50 dark:bg-orange-900 dark:bg-opacity-20 rounded-lg p-6">
          <h4 class="font-semibold text-orange-800 dark:text-orange-300 mb-3 flex items-center gap-2">
            <span class="material-symbols-outlined">wb_sunny</span>
            Climate Action
          </h4>
          <ul class="space-y-2 text-sm">
            ${cropGuide.sustainability.climateAction.map(practice => `
              <li class="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                <span class="material-symbols-outlined text-orange-600 text-sm mt-0.5">check_circle</span>
                <span>${practice}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
      
      <!-- SDG Alignment -->
      <div class="bg-gradient-to-r from-green-600 to-emerald-700 rounded-xl p-6 text-white">
        <h4 class="text-xl font-bold mb-3 flex items-center gap-2">
          <span class="material-symbols-outlined">public</span>
          ${cropGuide.sustainability.sdgAlignment.goal15}
        </h4>
        <p class="mb-4 opacity-90">Your sustainable farming contributes to these global targets:</p>
        <div class="space-y-2">
          ${cropGuide.sustainability.sdgAlignment.targets.map(target => `
            <div class="bg-white bg-opacity-10 rounded-lg p-3">
              <p class="font-semibold">${target.split(' - ')[0]}</p>
              <p class="text-sm opacity-90">${target.split(' - ')[1]}</p>
            </div>
          `).join('')}
        </div>
        <div class="mt-4 pt-4 border-t border-white border-opacity-30">
          <p class="font-semibold mb-2">Measurable Indicators:</p>
          <div class="grid grid-cols-2 gap-2 text-sm">
            ${cropGuide.sustainability.sdgAlignment.indicators.map(indicator => `
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-sm">trending_up</span>
                <span>${indicator}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `
  }

  function generateEconomicsContent() {
    return `
      <h3 class="text-2xl font-bold text-text-light dark:text-text-dark mb-6">💰 Economic Analysis</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <!-- Production Costs -->
        <div class="bg-white dark:bg-gray-700 rounded-lg p-6">
          <h4 class="font-semibold text-text-light dark:text-text-dark mb-4 flex items-center gap-2">
            <span class="material-symbols-outlined text-red-600">payments</span>
            Production Costs (per hectare)
          </h4>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-600">
              <span class="text-gray-600 dark:text-gray-400">Seeds/Planting Material</span>
              <span class="font-semibold text-gray-800 dark:text-gray-200">${cropGuide.economics.costs.seeds}</span>
            </div>
            <div class="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-600">
              <span class="text-gray-600 dark:text-gray-400">Fertilizer</span>
              <span class="font-semibold text-gray-800 dark:text-gray-200">${cropGuide.economics.costs.fertilizer}</span>
            </div>
            <div class="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-600">
              <span class="text-gray-600 dark:text-gray-400">Pesticides</span>
              <span class="font-semibold text-gray-800 dark:text-gray-200">${cropGuide.economics.costs.pesticides}</span>
            </div>
            <div class="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-600">
              <span class="text-gray-600 dark:text-gray-400">Labor</span>
              <span class="font-semibold text-gray-800 dark:text-gray-200">${cropGuide.economics.costs.labor}</span>
            </div>
            <div class="flex justify-between items-center pt-2">
              <span class="font-bold text-gray-800 dark:text-gray-200">Total Estimated Cost</span>
              <span class="font-bold text-lg text-red-600 dark:text-red-400">${cropGuide.economics.costs.total}</span>
            </div>
          </div>
        </div>
        
        <!-- Expected Returns -->
        <div class="bg-white dark:bg-gray-700 rounded-lg p-6">
          <h4 class="font-semibold text-text-light dark:text-text-dark mb-4 flex items-center gap-2">
            <span class="material-symbols-outlined text-green-600">trending_up</span>
            Expected Returns
          </h4>
          <div class="space-y-3 text-sm">
            <div>
              <p class="text-gray-600 dark:text-gray-400 mb-1">Farm Gate Price</p>
              <p class="font-semibold text-gray-800 dark:text-gray-200">${cropGuide.economics.returns.farmGate}</p>
            </div>
            <div>
              <p class="text-gray-600 dark:text-gray-400 mb-1">Market Price</p>
              <p class="font-semibold text-gray-800 dark:text-gray-200">${cropGuide.economics.returns.market}</p>
            </div>
            <div>
              <p class="text-gray-600 dark:text-gray-400 mb-1">Value Addition</p>
              <p class="font-semibold text-gray-800 dark:text-gray-200">${cropGuide.economics.returns.value}</p>
            </div>
            <div class="pt-3 border-t border-gray-200 dark:border-gray-600">
              <p class="text-gray-600 dark:text-gray-400 mb-1">Break-Even Point</p>
              <p class="font-semibold text-gray-800 dark:text-gray-200">${cropGuide.economics.returns.breakEven}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Market Information -->
      <div class="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg p-6 mb-6">
        <h4 class="font-semibold text-blue-800 dark:text-blue-300 mb-4 flex items-center gap-2">
          <span class="material-symbols-outlined">store</span>
          Market Information
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Market Demand</p>
            <p class="text-gray-700 dark:text-gray-300">${cropGuide.economics.marketInfo.demand}</p>
          </div>
          <div>
            <p class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Potential Buyers</p>
            <p class="text-gray-700 dark:text-gray-300">${cropGuide.economics.marketInfo.buyers.join(', ')}</p>
          </div>
          <div>
            <p class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Best Selling Time</p>
            <p class="text-gray-700 dark:text-gray-300">${cropGuide.economics.marketInfo.bestTime}</p>
          </div>
        </div>
      </div>
      
      <!-- Marketing Tips -->
      <div class="bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 rounded-lg p-6">
        <h4 class="font-semibold text-yellow-800 dark:text-yellow-300 mb-3 flex items-center gap-2">
          <span class="material-symbols-outlined">lightbulb</span>
          Marketing Tips
        </h4>
        <ul class="space-y-2">
          ${cropGuide.economics.marketInfo.tips.map(tip => `
            <li class="flex items-start gap-2 text-gray-700 dark:text-gray-300">
              <span class="material-symbols-outlined text-yellow-600 text-sm mt-0.5">check_circle</span>
              <span>${tip}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `
  }

  // Helper function to format content and remove markdown
  function formatContent(text) {
    if (!text) return ''
    
    // Split into lines for processing
    const lines = text.split('\n')
    let formattedHtml = ''
    let inList = false
    let listItems = []
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      // Skip empty lines
      if (!line) {
        if (inList) {
          // Close the list
          formattedHtml += `<ul class="list-none space-y-2 my-4 ml-2">${listItems.join('')}</ul>`
          listItems = []
          inList = false
        }
        continue
      }
      
      // Check if line is a title (starts with ** and ends with ** followed by optional colon)
      // This handles both "**Title:**" and "**Title**:" formats
      const titleMatch = line.match(/^\*\*([^*]+)\*\*:?\s*$/)
      if (titleMatch) {
        if (inList) {
          formattedHtml += `<ul class="list-none space-y-2 my-4 ml-2">${listItems.join('')}</ul>`
          listItems = []
          inList = false
        }
        const titleText = titleMatch[1].trim()
        formattedHtml += `<h4 class="text-lg font-bold text-gray-900 dark:text-gray-100 mt-6 mb-3">${titleText}</h4>`
        continue
      }
      
      // Check if line starts with bold text followed by more content (inline title)
      const inlineTitleMatch = line.match(/^\*\*([^*]+)\*\*:?\s+(.+)$/)
      if (inlineTitleMatch) {
        if (inList) {
          formattedHtml += `<ul class="list-none space-y-2 my-4 ml-2">${listItems.join('')}</ul>`
          listItems = []
          inList = false
        }
        const titleText = inlineTitleMatch[1].trim()
        const restOfLine = inlineTitleMatch[2].trim().replace(/\*/g, '')
        formattedHtml += `<p class="mb-3 text-gray-700 dark:text-gray-300 leading-relaxed"><strong class="font-bold text-gray-900 dark:text-gray-100">${titleText}:</strong> ${restOfLine}</p>`
        continue
      }
      
      // Check if line is a bullet point
      if (line.match(/^[•·-]\s+/) || line.match(/^✓\s+/)) {
        const content = line
          .replace(/^[•·-✓]\s+/, '')
          .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-gray-100">$1</strong>')
          .replace(/\*/g, '')
        listItems.push(`<li class="flex items-start gap-2"><span class="text-green-600 dark:text-green-400 mt-1 flex-shrink-0">✓</span><span>${content}</span></li>`)
        inList = true
        continue
      }
      
      // Check if line is a numbered list
      const numberedMatch = line.match(/^(\d+)\.\s+(.+)$/)
      if (numberedMatch) {
        const content = numberedMatch[2]
          .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-gray-100">$1</strong>')
          .replace(/\*/g, '')
        listItems.push(`<li class="flex items-start gap-3"><span class="text-primary font-semibold flex-shrink-0 min-w-[1.5rem]">${numberedMatch[1]}.</span><span>${content}</span></li>`)
        inList = true
        continue
      }
      
      // Check for dash-based sub-points (like "- Highland regions: ...")
      const dashMatch = line.match(/^-\s+(.+)$/)
      if (dashMatch) {
        const content = dashMatch[1]
          .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-gray-100">$1</strong>')
          .replace(/\*/g, '')
        listItems.push(`<li class="flex items-start gap-2"><span class="text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0">→</span><span>${content}</span></li>`)
        inList = true
        continue
      }
      
      // Regular paragraph with inline bold formatting
      if (inList) {
        formattedHtml += `<ul class="list-none space-y-2 my-4 ml-2">${listItems.join('')}</ul>`
        listItems = []
        inList = false
      }
      
      const formattedLine = line
        .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-gray-100">$1</strong>')
        .replace(/\*/g, '')
      
      formattedHtml += `<p class="mb-3 text-gray-700 dark:text-gray-300 leading-relaxed">${formattedLine}</p>`
    }
    
    // Close any remaining list
    if (inList) {
      formattedHtml += `<ul class="list-none space-y-2 my-4 ml-2">${listItems.join('')}</ul>`
    }
    
    return formattedHtml
  }

  // Helper function to create clean preview text (removes all formatting)
  function getCleanPreview(text, maxLength = 150) {
    if (!text) return ''
    return text
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/^[•·-✓]\s+/gm, '')
      .replace(/^\d+\.\s+/gm, '')
      .split('\n')
      .filter(line => line.trim().length > 0)
      .join(' ')
      .substring(0, maxLength)
      .trim()
  }

  // Display educational panel
  function displayEducation() {
    const educationPanel = page.querySelector('#education-panel')
    const education = planner.educationalContent
    
    educationPanel.innerHTML = `
      <div class="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-8 mb-6 text-white">
        <h2 class="text-3xl font-bold mb-2 flex items-center gap-3">
          <span class="material-symbols-outlined text-4xl">school</span>
          Sustainable Farming Education Center
        </h2>
        <p class="text-lg opacity-90">Learn the principles and practices of sustainable agriculture with AI-powered insights</p>
      </div>

      <!-- Basic Topics -->
      <div class="mb-8">
        <h3 class="text-2xl font-bold text-text-light dark:text-text-dark mb-4">${education.basics.title}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${education.basics.topics.map(topic => `
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow cursor-pointer" data-topic-id="${topic.id}">
              <div class="flex items-start justify-between mb-3">
                <h4 class="text-lg font-bold text-text-light dark:text-text-dark">${topic.title}</h4>
                <span class="px-3 py-1 rounded-full text-xs font-semibold ${
                  topic.importance === 'Critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                  topic.importance === 'High' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                }">${topic.importance}</span>
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">
                ${getCleanPreview(topic.content, 150)}...
              </div>
              <button class="learn-more-btn text-primary hover:text-primary-dark font-semibold text-sm flex items-center gap-1" data-topic="${topic.id}" data-topic-title="${topic.title}">
                <span class="material-symbols-outlined text-sm">auto_awesome</span>
                Learn with AI
                <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Advanced Topics -->
      <div class="mb-8">
        <h3 class="text-2xl font-bold text-text-light dark:text-text-dark mb-4">${education.advanced.title}</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${education.advanced.topics.map(topic => `
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow cursor-pointer" data-topic-id="${topic.id}">
              <h4 class="text-lg font-bold text-text-light dark:text-text-dark mb-3">${topic.title}</h4>
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">
                ${getCleanPreview(topic.content, 120)}...
              </div>
              <button class="learn-more-btn text-secondary hover:text-secondary-dark font-semibold text-sm flex items-center gap-1" data-topic="${topic.id}" data-topic-title="${topic.title}">
                <span class="material-symbols-outlined text-sm">auto_awesome</span>
                Learn with AI
                <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- SDG Information -->
      <div class="bg-gradient-to-r from-green-600 to-emerald-700 rounded-xl p-8 text-white">
        <h3 class="text-2xl font-bold mb-4 flex items-center gap-2">
          <span class="material-symbols-outlined text-3xl">public</span>
          ${education.sdg.title}
        </h3>
        <div class="text-lg opacity-90 prose prose-invert max-w-none">
          ${formatContent(education.sdg.content)}
        </div>
      </div>
    `

    // Learn more buttons - Load AI-generated content
    educationPanel.querySelectorAll('.learn-more-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation()
        const topicId = btn.dataset.topic
        const topicTitle = btn.dataset.topicTitle
        const topic = [...education.basics.topics, ...education.advanced.topics].find(t => t.id === topicId)
        if (topic) {
          await showAIEducationModal(topic, topicTitle)
        }
      })
    })
  }

  // Show AI-enhanced education modal with streaming
  async function showAIEducationModal(topic, topicTitle) {
    const modal = page.querySelector('#crop-modal')
    const title = modal.querySelector('#modal-title')
    const content = modal.querySelector('#modal-content')
    
    title.innerHTML = `${topicTitle} <span class="text-sm opacity-75 ml-2">✨ AI Enhanced</span>`
    
    // Show loading state
    content.innerHTML = `
      <div class="flex flex-col items-center justify-center py-12">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mb-4"></div>
        <p class="text-gray-600 dark:text-gray-400 text-lg">Generating personalized content with AI...</p>
        <p class="text-gray-500 dark:text-gray-500 text-sm mt-2">This may take a moment</p>
      </div>
      <div id="ai-content-stream" class="prose dark:prose-invert max-w-none hidden">
        <div class="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg p-4 mb-6">
          <p class="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2 m-0">
            <span class="material-symbols-outlined text-purple-600 dark:text-purple-400">auto_awesome</span>
            <span>AI-Generated Educational Content</span>
          </p>
        </div>
        <div id="streaming-content" class="text-gray-700 dark:text-gray-300 leading-relaxed"></div>
      </div>
    `
    
    modal.classList.remove('hidden')
    
    // Generate AI content with streaming
    const streamContent = content.querySelector('#streaming-content')
    const aiContentDiv = content.querySelector('#ai-content-stream')
    
    try {
      const context = {
        region: selectedRegion?.name || 'Kenya',
        cropType: selectedCrop || 'general',
        level: 'intermediate',
        focusArea: 'practical'
      }
      
      let isFirstChunk = true
      
      const result = await generateSustainableFarmingContent(
        topicTitle.replace(/[🌱💧🔄🐛🌍✨]/g, '').trim(),
        context,
        (chunk, fullText) => {
          if (isFirstChunk) {
            // Hide loading, show content area
            content.querySelector('.flex.flex-col').classList.add('hidden')
            aiContentDiv.classList.remove('hidden')
            isFirstChunk = false
          }
          
          // Format and display the streaming content
          streamContent.innerHTML = formatContent(fullText)
        }
      )
      
      if (!result.success) {
        throw new Error(result.error)
      }
      
    } catch (error) {
      console.error('Error generating AI content:', error)
      content.innerHTML = `
        <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
          <p class="text-red-800 dark:text-red-300 mb-4">
            <span class="material-symbols-outlined align-middle">error</span>
            Failed to generate AI content. Showing original content instead.
          </p>
        </div>
        <div class="prose dark:prose-invert max-w-none mt-6">
          ${formatContent(topic.content)}
        </div>
      `
    }
  }

  // Show education modal (fallback)
  function showEducationModal(topic) {
    const modal = page.querySelector('#crop-modal')
    const title = modal.querySelector('#modal-title')
    const content = modal.querySelector('#modal-content')
    
    title.textContent = topic.title.replace(/[🌱💧🔄🐛🌍✨]/g, '').trim()
    content.innerHTML = `
      <div class="prose dark:prose-invert max-w-none">
        ${formatContent(topic.content)}
      </div>
    `
    
    modal.classList.remove('hidden')
  }

  // Event listeners
  page.querySelector('#back-btn').addEventListener('click', () => {
    router.navigate('/home')
  })

  page.querySelector('#education-toggle-btn').addEventListener('click', () => {
    showEducation = !showEducation
    
    if (showEducation) {
      page.querySelector('#education-panel').classList.remove('hidden')
      page.querySelector('#region-selection').classList.add('hidden')
      page.querySelector('#crop-selection').classList.add('hidden')
      page.querySelector('#crop-guide').classList.add('hidden')
      displayEducation()
      page.querySelector('#education-panel').scrollIntoView({ behavior: 'smooth' })
    } else {
      page.querySelector('#education-panel').classList.add('hidden')
      page.querySelector('#region-selection').classList.remove('hidden')
      if (selectedRegion) {
        page.querySelector('#crop-selection').classList.remove('hidden')
      }
      if (cropGuide) {
        page.querySelector('#crop-guide').classList.remove('hidden')
      }
      page.querySelector('#region-selection').scrollIntoView({ behavior: 'smooth' })
    }
  })

  page.querySelector('#close-modal').addEventListener('click', () => {
    page.querySelector('#crop-modal').classList.add('hidden')
  })

  // Initialize
  displayRegions()

  return page
}
