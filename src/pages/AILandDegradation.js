// AI Land Degradation Prediction & Restoration Guidance Page
import { router } from '../router'
import { LandDegradationAI } from '../lib/landDegradationAI'

export function AILandDegradationPage() {
  const page = document.createElement('div')
  page.className = 'min-h-screen bg-background-light dark:bg-background-dark'
  
  const aiService = new LandDegradationAI()
  let currentAnalysis = null

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
            <span class="material-symbols-outlined text-primary text-3xl">insights</span>
            <span class="text-xl font-bold text-text-light dark:text-text-dark">AI Land Degradation Analysis</span>
          </div>
          <div class="w-20"></div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 mb-8 text-white">
        <h1 class="text-4xl font-bold mb-4">🤖 AI-Powered Land Health Prediction</h1>
        <p class="text-xl opacity-90">
          Advanced machine learning analysis to predict degradation risk and guide restoration efforts
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Analysis Form -->
        <div class="lg:col-span-1 space-y-6">
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h3 class="text-lg font-bold text-text-light dark:text-text-dark mb-4 flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">tune</span>
              Analysis Parameters
            </h3>
            
            <form id="analysis-form" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                <input type="text" id="location-input" placeholder="e.g., Meru County" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700" required>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Soil pH</label>
                <input type="number" id="soil-ph" step="0.1" min="3" max="10" placeholder="6.5" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700" required>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Organic Matter (%)</label>
                <input type="number" id="organic-matter" step="0.1" min="0" max="100" placeholder="2.5" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700" required>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nitrogen (ppm)</label>
                <input type="number" id="nitrogen" step="1" min="0" placeholder="30" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700" required>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Temperature (°C)</label>
                <input type="number" id="temperature" step="0.1" placeholder="24.5" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700" required>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rainfall (mm/year)</label>
                <input type="number" id="rainfall" step="1" min="0" placeholder="800" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700" required>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Land Cover Type</label>
                <select id="land-cover" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700" required>
                  <option value="cropland">Cropland</option>
                  <option value="forest">Forest</option>
                  <option value="grassland">Grassland</option>
                  <option value="shrubland">Shrubland</option>
                  <option value="bare">Bare Ground</option>
                  <option value="urban">Urban</option>
                </select>
              </div>

              <button type="submit" class="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark font-semibold flex items-center justify-center gap-2">
                <span class="material-symbols-outlined">analytics</span>
                Analyze Land Health
              </button>
            </form>
          </div>

          <!-- Quick Tips -->
          <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
            <div class="flex items-start gap-3">
              <span class="material-symbols-outlined text-blue-600 dark:text-blue-400">info</span>
              <div class="text-sm text-gray-700 dark:text-gray-300">
                <p class="font-semibold mb-2">How it works:</p>
                <ul class="space-y-1 list-disc list-inside">
                  <li>AI analyzes multiple risk factors</li>
                  <li>Predicts future degradation trends</li>
                  <li>Provides tailored restoration plans</li>
                  <li>Tracks progress over time</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Results Area -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Empty State -->
          <div id="empty-state" class="bg-white dark:bg-gray-800 rounded-xl p-12 shadow-md text-center">
            <span class="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4">psychology</span>
            <h3 class="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">No Analysis Yet</h3>
            <p class="text-gray-500 dark:text-gray-400">Fill in the parameters and click "Analyze Land Health" to get started</p>
          </div>

          <!-- Loading State -->
          <div id="loading-state" class="bg-white dark:bg-gray-800 rounded-xl p-12 shadow-md hidden">
            <div class="flex flex-col items-center gap-4">
              <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
              <p class="text-gray-600 dark:text-gray-400">AI is analyzing your land data...</p>
            </div>
          </div>

          <!-- Results Container -->
          <div id="results-container" class="hidden space-y-6">
            <!-- Risk Assessment -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <h3 class="text-xl font-bold text-text-light dark:text-text-dark mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">warning</span>
                Risk Assessment
              </h3>
              
              <div id="risk-overview" class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <!-- Risk cards will be inserted here -->
              </div>

              <div id="overall-risk" class="p-4 rounded-lg">
                <!-- Overall risk will be inserted here -->
              </div>
            </div>

            <!-- Predictions -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <h3 class="text-xl font-bold text-text-light dark:text-text-dark mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">trending_down</span>
                Future Predictions
              </h3>
              <div id="predictions-content">
                <!-- Predictions will be inserted here -->
              </div>
            </div>

            <!-- AI Recommendations -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <h3 class="text-xl font-bold text-text-light dark:text-text-dark mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">lightbulb</span>
                AI-Powered Recommendations
              </h3>
              <div id="recommendations-content" class="prose dark:prose-invert max-w-none">
                <!-- AI recommendations will be streamed here -->
              </div>
            </div>

            <!-- Restoration Measures -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <h3 class="text-xl font-bold text-text-light dark:text-text-dark mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">eco</span>
                Restoration Action Plan
              </h3>
              <div id="restoration-measures">
                <!-- Restoration measures will be inserted here -->
              </div>
            </div>

            <!-- Heatmap Preview -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <h3 class="text-xl font-bold text-text-light dark:text-text-dark mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">map</span>
                Risk Heatmap
              </h3>
              <div id="heatmap-preview" class="bg-gray-100 dark:bg-gray-900 rounded-lg p-8 text-center">
                <span class="material-symbols-outlined text-6xl text-gray-400 mb-2">map</span>
                <p class="text-gray-600 dark:text-gray-400">Heatmap visualization coming soon</p>
                <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">Will display spatial risk distribution across the region</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  `

  // Helper functions
  function getRiskColor(level) {
    const colors = {
      low: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      moderate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      high: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      critical: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
    }
    return colors[level] || colors.moderate
  }

  function getRiskIcon(level) {
    const icons = {
      low: '✅',
      moderate: '⚠️',
      high: '🔴',
      critical: '🚨'
    }
    return icons[level] || '⚠️'
  }

  function displayRiskAssessment(assessment) {
    const riskOverview = page.querySelector('#risk-overview')
    const overallRisk = page.querySelector('#overall-risk')

    // Get the factors (could be .factors or .riskFactors depending on source)
    const factors = assessment.factors || assessment.riskFactors || {}

    // Display individual risk factors
    if (Object.keys(factors).length > 0) {
      riskOverview.innerHTML = Object.entries(factors).map(([factor, data]) => {
        // Handle different data structures
        const score = data.score !== undefined ? data.score : 0.5
        const scoreDisplay = (score * 10).toFixed(1)
        
        // Determine level from indicators or score
        let level = 'moderate'
        if (data.indicators) {
          const indicatorValues = Object.values(data.indicators)
          if (indicatorValues.includes('critical')) level = 'critical'
          else if (indicatorValues.includes('high')) level = 'high'
          else if (indicatorValues.every(v => v === 'good' || v === 'low')) level = 'low'
        } else if (score > 0.75) level = 'critical'
        else if (score > 0.5) level = 'high'
        else if (score < 0.3) level = 'low'
        
        // Create details from indicators
        let details = 'Risk assessment complete'
        if (data.indicators) {
          const indicatorsList = Object.entries(data.indicators)
            .map(([key, value]) => `${key.replace(/([A-Z])/g, ' $1')}: ${value}`)
            .slice(0, 2)
            .join(', ')
          details = indicatorsList || details
        }
        
        return `
          <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div class="flex items-center justify-between mb-2">
              <span class="font-semibold text-gray-700 dark:text-gray-300 capitalize">${factor.replace(/([A-Z])/g, ' $1')}</span>
              <span class="px-2 py-1 rounded text-xs font-semibold ${getRiskColor(level)}">${level}</span>
            </div>
            <div class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">${scoreDisplay}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">${details}</div>
          </div>
        `
      }).join('')
    } else {
      riskOverview.innerHTML = '<div class="text-gray-600 dark:text-gray-400 p-4">No risk factors data available</div>'
    }

    // Display overall risk
    const overallRiskData = assessment.overallRisk || { level: 'moderate', score: 5 }
    const overallColor = getRiskColor(overallRiskData.level)
    overallRisk.className = `p-4 rounded-lg ${overallColor}`
    overallRisk.innerHTML = `
      <div class="flex items-center justify-between">
        <div>
          <div class="text-sm font-medium mb-1">Overall Degradation Risk</div>
          <div class="text-3xl font-bold">${getRiskIcon(overallRiskData.level)} ${overallRiskData.level.toUpperCase()}</div>
          <div class="text-sm mt-1">Score: ${overallRiskData.score ? overallRiskData.score.toFixed(1) : '5.0'}/10</div>
        </div>
        <span class="material-symbols-outlined text-5xl opacity-50">analytics</span>
      </div>
    `
  }

  function displayPredictions(predictions) {
    const container = page.querySelector('#predictions-content')
    
    if (!predictions) {
      container.innerHTML = '<div class="text-gray-600 dark:text-gray-400 p-4">No predictions available</div>'
      return
    }

    // Handle both array and object formats
    let predictionsHTML = ''
    
    if (Array.isArray(predictions)) {
      // Array format - iterate through predictions
      predictionsHTML = predictions.map((pred, index) => `
        <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <div class="flex items-start justify-between mb-2">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 dark:text-blue-400">calendar_month</span>
              <span class="font-semibold text-gray-900 dark:text-gray-100">${pred.timeframe || 'Future'}</span>
            </div>
            <span class="px-2 py-1 rounded text-xs font-semibold ${getRiskColor(pred.projectedRisk || pred.riskLevel || 'moderate')}">${pred.projectedRisk || pred.riskLevel || 'moderate'}</span>
          </div>
          <p class="text-gray-700 dark:text-gray-300 mb-2">${pred.prediction || pred.description || 'Prediction data'}</p>
          <div class="text-sm text-gray-600 dark:text-gray-400">
            <strong>Impact:</strong> ${pred.impact || pred.expectedImpact || 'Assessment pending'}
          </div>
        </div>
      `).join('')
    } else if (predictions.shortTerm || predictions.longTerm) {
      // Object format with shortTerm/longTerm arrays
      const shortTermItems = predictions.shortTerm || []
      const longTermItems = predictions.longTerm || []
      
      predictionsHTML = `
        ${shortTermItems.length > 0 ? `
          <div class="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
            <div class="flex items-center gap-2 mb-3">
              <span class="material-symbols-outlined text-amber-600 dark:text-amber-400">schedule</span>
              <h4 class="font-semibold text-gray-900 dark:text-gray-100">Short-term Predictions (1-2 years)</h4>
            </div>
            <ul class="space-y-2">
              ${shortTermItems.map(item => `
                <li class="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <span class="material-symbols-outlined text-amber-600 dark:text-amber-400 text-sm mt-0.5">arrow_right</span>
                  <span>${item}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        ` : ''}
        
        ${longTermItems.length > 0 ? `
          <div class="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <div class="flex items-center gap-2 mb-3">
              <span class="material-symbols-outlined text-red-600 dark:text-red-400">event</span>
              <h4 class="font-semibold text-gray-900 dark:text-gray-100">Long-term Predictions (${predictions.timeline || '5-10 years'})</h4>
            </div>
            <ul class="space-y-2">
              ${longTermItems.map(item => `
                <li class="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <span class="material-symbols-outlined text-red-600 dark:text-red-400 text-sm mt-0.5">arrow_right</span>
                  <span>${item}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        ` : ''}
        
        ${predictions.timeline ? `
          <div class="text-sm text-gray-600 dark:text-gray-400 p-3 bg-gray-50 dark:bg-gray-900 rounded">
            <span class="material-symbols-outlined text-xs">info</span>
            <strong>Timeline:</strong> ${predictions.timeline}
          </div>
        ` : ''}
      `
    } else {
      predictionsHTML = '<div class="text-gray-600 dark:text-gray-400 p-4">No predictions available</div>'
    }
    
    container.innerHTML = `<div class="space-y-4">${predictionsHTML}</div>`
  }

  async function displayRecommendations(location, riskLevel) {
    const container = page.querySelector('#recommendations-content')
    container.innerHTML = '<div class="animate-pulse">AI is generating personalized recommendations...</div>'

    try {
      await aiService.getAIRecommendations(
        location,
        riskLevel,
        (chunk) => {
          if (container.firstChild && container.firstChild.className === 'animate-pulse') {
            container.innerHTML = ''
          }
          container.innerHTML += chunk
        }
      )
    } catch (error) {
      console.error('Error getting recommendations:', error)
      container.innerHTML = '<div class="text-red-600 dark:text-red-400">Failed to load AI recommendations</div>'
    }
  }

  function displayRecommendationsFromResult(recommendations) {
    const container = page.querySelector('#recommendations-content')
    if (!recommendations) {
      container.innerHTML = '<div class="text-gray-600 dark:text-gray-400">No AI recommendations available at this time.</div>'
      return
    }

    // Check if it's the structured format
    if (recommendations.immediate || recommendations.shortTerm || recommendations.longTerm) {
      let html = '<div class="space-y-6">'
      
      if (recommendations.immediate && recommendations.immediate.length > 0) {
        html += `
          <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
            <h4 class="text-lg font-bold text-red-800 dark:text-red-300 mb-3 flex items-center gap-2">
              <span class="material-symbols-outlined">priority_high</span>
              Immediate Actions (0-6 months)
            </h4>
            <ul class="space-y-2">
              ${recommendations.immediate.map(action => `
                <li class="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <span class="text-red-600 mt-1">•</span>
                  <span>${action}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        `
      }
      
      if (recommendations.shortTerm && recommendations.shortTerm.length > 0) {
        html += `
          <div class="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
            <h4 class="text-lg font-bold text-yellow-800 dark:text-yellow-300 mb-3 flex items-center gap-2">
              <span class="material-symbols-outlined">schedule</span>
              Short-term Interventions (6-24 months)
            </h4>
            <ul class="space-y-2">
              ${recommendations.shortTerm.map(action => `
                <li class="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <span class="text-yellow-600 mt-1">•</span>
                  <span>${action}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        `
      }
      
      if (recommendations.longTerm && recommendations.longTerm.length > 0) {
        html += `
          <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
            <h4 class="text-lg font-bold text-green-800 dark:text-green-300 mb-3 flex items-center gap-2">
              <span class="material-symbols-outlined">trending_up</span>
              Long-term Strategies (2-5 years)
            </h4>
            <ul class="space-y-2">
              ${recommendations.longTerm.map(action => `
                <li class="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <span class="text-green-600 mt-1">•</span>
                  <span>${action}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        `
      }
      
      html += '</div>'
      container.innerHTML = html
    } else if (recommendations.rawResponse) {
      // Display raw response
      container.innerHTML = `<div class="prose dark:prose-invert max-w-none">${recommendations.rawResponse.replace(/\n/g, '<br>')}</div>`
    } else if (typeof recommendations === 'string') {
      container.innerHTML = recommendations
    } else {
      container.innerHTML = '<div class="text-gray-600 dark:text-gray-400">No AI recommendations available at this time.</div>'
    }
  }

  function displayRestorationMeasures(measures) {
    const container = page.querySelector('#restoration-measures')
    
    if (!measures) {
      container.innerHTML = '<div class="text-gray-600 dark:text-gray-400 p-4">No restoration measures available</div>'
      return
    }

    // Convert object to array if needed
    const measuresArray = Array.isArray(measures) 
      ? measures 
      : Object.values(measures)

    if (measuresArray.length === 0) {
      container.innerHTML = '<div class="text-gray-600 dark:text-gray-400 p-4">No restoration measures available</div>'
      return
    }

    // Icon mapping for different measure types
    const iconMap = {
      'Reforestation & Tree Planting': '🌲',
      'Cover Cropping': '🌾',
      'Soil Enrichment': '🌱',
      'Water Retention Structures': '💧',
      'Erosion Control Measures': '🛡️',
      'Agroforestry Systems': '🌳'
    }

    // Cost-based priority (can be adjusted based on actual priority field)
    const getPriority = (cost) => {
      if (cost && cost.includes('high')) return 'high'
      if (cost && cost.includes('moderate')) return 'medium'
      return 'low'
    }
    
    container.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${measuresArray.map(measure => {
          const priority = measure.priority || getPriority(measure.cost)
          const icon = measure.icon || iconMap[measure.name] || '🌿'
          
          return `
            <div class="p-4 border-2 ${priority === 'high' ? 'border-red-400 dark:border-red-600' : priority === 'medium' ? 'border-yellow-400 dark:border-yellow-600' : 'border-green-400 dark:border-green-600'} rounded-lg hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3 mb-2">
                <span class="text-2xl">${icon}</span>
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-1">
                    <h4 class="font-bold text-gray-900 dark:text-gray-100">${measure.name}</h4>
                    <span class="px-2 py-1 rounded text-xs font-semibold ${priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' : priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'}">
                      ${priority} priority
                    </span>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">${measure.description}</p>
                  <div class="text-xs text-gray-500 dark:text-gray-500 space-y-1">
                    <div><strong>Timeframe:</strong> ${measure.timeframe}</div>
                    <div><strong>Cost:</strong> ${measure.cost}</div>
                    ${measure.expectedImpact ? `<div><strong>Impact:</strong> ${measure.expectedImpact}</div>` : ''}
                    ${measure.benefits && measure.benefits.length > 0 ? `
                      <div class="mt-2">
                        <strong>Benefits:</strong>
                        <ul class="list-disc list-inside ml-2 mt-1">
                          ${measure.benefits.map(benefit => `<li class="text-gray-600 dark:text-gray-400">${benefit}</li>`).join('')}
                        </ul>
                      </div>
                    ` : ''}
                    ${measure.suitability && measure.suitability.length > 0 ? `
                      <div class="mt-2">
                        <strong>Best for:</strong> ${measure.suitability.join(', ')}
                      </div>
                    ` : ''}
                  </div>
                </div>
              </div>
            </div>
          `
        }).join('')}
      </div>
    `
  }

  // Form submission handler
  page.querySelector('#analysis-form').addEventListener('submit', async (e) => {
    e.preventDefault()

    // Collect form data
    const formData = {
      location: page.querySelector('#location-input').value,
      soilHealth: {
        pH: parseFloat(page.querySelector('#soil-ph').value),
        organicMatter: parseFloat(page.querySelector('#organic-matter').value),
        nitrogen: parseFloat(page.querySelector('#nitrogen').value)
      },
      climateData: {
        temperature: parseFloat(page.querySelector('#temperature').value),
        rainfall: parseFloat(page.querySelector('#rainfall').value)
      },
      landCoverData: {
        coverType: page.querySelector('#land-cover').value
      }
    }

    // Show loading state
    page.querySelector('#empty-state').classList.add('hidden')
    page.querySelector('#results-container').classList.add('hidden')
    page.querySelector('#loading-state').classList.remove('hidden')

    try {
      // Get risk assessment using the async analyzeDegradationRisk method
      const result = await aiService.analyzeDegradationRisk(
        formData.location,
        formData.soilHealth,
        formData.climateData,
        formData.landCoverData
      )

      if (!result.success) {
        throw new Error(result.error || 'Analysis failed')
      }

      // Get restoration measures
      const measures = aiService.getRestorationMeasures()

      // Store current analysis
      currentAnalysis = {
        assessment: {
          overallRisk: {
            level: result.riskLevel,
            score: result.riskScore
          },
          factors: result.factors
        },
        predictions: result.predictions,
        measures,
        formData
      }

      // Hide loading, show results
      setTimeout(async () => {
        page.querySelector('#loading-state').classList.add('hidden')
        page.querySelector('#results-container').classList.remove('hidden')

        // Display results
        displayRiskAssessment(currentAnalysis.assessment)
        displayPredictions(result.predictions)
        displayRestorationMeasures(measures)
        
        // Display AI recommendations (already included in the result)
        if (result.recommendations) {
          displayRecommendationsFromResult(result.recommendations)
        }
      }, 2000)

    } catch (error) {
      console.error('Analysis error:', error)
      page.querySelector('#loading-state').classList.add('hidden')
      page.querySelector('#empty-state').classList.remove('hidden')
      alert(`Analysis failed: ${error.message}. Please try again.`)
    }
  })

  // Back button
  page.querySelector('#back-btn').addEventListener('click', () => {
    router.navigate('/home')
  })

  return page
}
