import { router } from '../../router'

export function ForestConservationPage() {
  const page = document.createElement('div')
  page.className = 'min-h-screen bg-background-light dark:bg-background-dark'
  
  // Get campaigns from localStorage
  let activeCampaigns = JSON.parse(localStorage.getItem('activeCampaigns') || '[]')
  
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
            <span class="material-symbols-outlined text-primary text-3xl">forest</span>
            <span class="text-xl font-bold text-text-light dark:text-text-dark">Forest Conservation</span>
          </div>
          <div class="w-20"></div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 mb-8 text-white">
        <h1 class="text-4xl font-bold mb-4">Protect and Restore Our Forests</h1>
        <p class="text-xl mb-6 opacity-90">
          Forests are the lungs of our planet. Join the movement to plant, protect, and preserve them.
        </p>
        <div class="flex flex-wrap gap-4">
          <div class="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <div class="text-3xl font-bold">2.4M+</div>
            <div class="text-sm opacity-90">Trees Planted</div>
          </div>
          <div class="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <div class="text-3xl font-bold">30K+</div>
            <div class="text-sm opacity-90">Hectares Reforested</div>
          </div>
          <div class="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <div class="text-3xl font-bold">50K+</div>
            <div class="text-sm opacity-90">Active Volunteers</div>
          </div>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Education Hub -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all cursor-pointer" id="education-hub">
          <div class="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <span class="material-symbols-outlined text-primary text-3xl">school</span>
          </div>
          <h3 class="text-xl font-bold text-text-light dark:text-text-dark mb-3">Education Hub</h3>
          <p class="text-text-light/70 dark:text-text-dark/70 mb-4">
            Learn about forest ecosystems, carbon sequestration, and biodiversity through interactive content.
          </p>
          <ul class="space-y-2 text-sm">
            <li class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-sm">check_circle</span>
              <span>Carbon Calculator</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-sm">check_circle</span>
              <span>3D Forest Explorer</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-sm">check_circle</span>
              <span>Video Library</span>
            </li>
          </ul>
        </div>

        <!-- Reforestation Campaigns -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all cursor-pointer" id="campaigns">
          <div class="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <span class="material-symbols-outlined text-accent text-3xl">campaign</span>
          </div>
          <h3 class="text-xl font-bold text-text-light dark:text-text-dark mb-3">Start Campaign</h3>
          <p class="text-text-light/70 dark:text-text-dark/70 mb-4">
            Launch or join tree planting campaigns in your community with tools and resources.
          </p>
          <ul class="space-y-2 text-sm">
            <li class="flex items-center gap-2">
              <span class="material-symbols-outlined text-accent text-sm">check_circle</span>
              <span>Campaign Wizard</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="material-symbols-outlined text-accent text-sm">check_circle</span>
              <span>Tree Species Selector</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="material-symbols-outlined text-accent text-sm">check_circle</span>
              <span>Event Management</span>
            </li>
          </ul>
        </div>

        <!-- Deforestation Alerts -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all cursor-pointer" id="alerts">
          <div class="bg-red-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <span class="material-symbols-outlined text-red-500 text-3xl">report</span>
          </div>
          <h3 class="text-xl font-bold text-text-light dark:text-text-dark mb-3">Deforestation Alerts</h3>
          <p class="text-text-light/70 dark:text-text-dark/70 mb-4">
            Monitor and report illegal logging and forest destruction with satellite tracking.
          </p>
          <ul class="space-y-2 text-sm">
            <li class="flex items-center gap-2">
              <span class="material-symbols-outlined text-red-500 text-sm">check_circle</span>
              <span>Real-time Monitoring</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="material-symbols-outlined text-red-500 text-sm">check_circle</span>
              <span>Quick Report System</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="material-symbols-outlined text-red-500 text-sm">check_circle</span>
              <span>Heat Maps</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Active Campaigns -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 class="text-2xl font-bold text-text-light dark:text-text-dark mb-6">
          ${activeCampaigns.length > 0 ? 'Active Campaigns' : 'No Active Campaigns'}
        </h2>
        ${activeCampaigns.length === 0 ? `
          <div class="text-center py-8">
            <span class="material-symbols-outlined text-gray-400 text-6xl mb-4 block">campaign</span>
            <p class="text-text-light/70 dark:text-text-dark/70 mb-4">
              No campaigns yet. Be the first to create one!
            </p>
            <button id="create-campaign-btn" class="px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors">
              Create Campaign
            </button>
          </div>
        ` : `
          <div id="campaigns-grid" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Campaigns will be rendered here -->
          </div>
        `}
      </div>
    </main>
  `
  
  // Render campaigns dynamically
  const renderCampaigns = () => {
    const campaignsGrid = page.querySelector('#campaigns-grid')
    if (!campaignsGrid) return
    
    campaignsGrid.innerHTML = ''
    
    const typeIcons = {
      'reforestation': 'park',
      'urban-greening': 'location_city',
      'watershed': 'water_drop',
      'agroforestry': 'agriculture'
    }
    
    activeCampaigns.forEach((campaign) => {
      const progress = campaign.progress || 0
      const progressPercent = (progress / campaign.goal) * 100
      const icon = typeIcons[campaign.type] || 'park'
      
      const campaignCard = document.createElement('div')
      campaignCard.className = 'border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:border-primary transition-colors'
      campaignCard.innerHTML = `
        <div class="flex justify-between items-start mb-3">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">${icon}</span>
            <h3 class="font-bold text-lg text-text-light dark:text-text-dark">${campaign.title}</h3>
          </div>
          <span class="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">Active</span>
        </div>
        <p class="text-sm text-text-light/70 dark:text-text-dark/70 mb-2">
          <span class="material-symbols-outlined text-xs align-middle">location_on</span>
          ${campaign.location}
        </p>
        <p class="text-sm text-text-light/70 dark:text-text-dark/70 mb-4 line-clamp-2">
          ${campaign.description.substring(0, 120)}...
        </p>
        <div class="space-y-2 mb-4">
          <div class="flex justify-between text-sm">
            <span class="text-text-light/60 dark:text-text-dark/60">Progress</span>
            <span class="font-semibold text-primary">${progress.toLocaleString()} / ${campaign.goal.toLocaleString()} trees</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div class="bg-primary h-2 rounded-full" style="width: ${progressPercent}%"></div>
          </div>
        </div>
        <button class="w-full py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors view-campaign-btn">
          View Campaign
        </button>
      `
      
      // Add click handler to view campaign
      campaignCard.querySelector('.view-campaign-btn').addEventListener('click', () => {
        router.navigate('/forest/campaigns')
      })
      
      campaignsGrid.appendChild(campaignCard)
    })
  }
  
  // Event listeners
  page.querySelector('#back-btn').addEventListener('click', () => {
    router.navigate('/home')
  })
  
  page.querySelector('#education-hub').addEventListener('click', () => {
    router.navigate('/forest/education')
  })
  
  page.querySelector('#campaigns').addEventListener('click', () => {
    router.navigate('/forest/campaigns')
  })
  
  page.querySelector('#alerts').addEventListener('click', () => {
    router.navigate('/forest/alerts')
  })
  
  // Handle create campaign button if no campaigns exist
  const createCampaignBtn = page.querySelector('#create-campaign-btn')
  if (createCampaignBtn) {
    createCampaignBtn.addEventListener('click', () => {
      router.navigate('/forest/campaigns')
    })
  }
  
  // Render campaigns if they exist
  if (activeCampaigns.length > 0) {
    renderCampaigns()
  }
  
  return page
}
