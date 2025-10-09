import { router } from '../../router'
import { generateCampaignContent } from '../../lib/gemini'

export function ForestCampaignsPage() {
  const page = document.createElement('div')
  page.className = 'min-h-screen bg-background-light dark:bg-background-dark'
  
  // Initialize campaigns from localStorage
  let activeCampaigns = JSON.parse(localStorage.getItem('activeCampaigns') || '[]')
  
  const renderCampaigns = () => {
    const campaignsGrid = page.querySelector('#campaigns-grid')
    if (!campaignsGrid) return
    
    // Clear existing campaigns except the create button
    campaignsGrid.innerHTML = ''
    
    // Render user-created campaigns
    activeCampaigns.forEach((campaign, index) => {
      const campaignCard = createCampaignCard(campaign, index)
      campaignsGrid.appendChild(campaignCard)
    })
    
    // Add create new campaign card
    const createCard = document.createElement('div')
    createCard.className = 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center hover:shadow-2xl transition-all cursor-pointer'
    createCard.id = 'create-new-campaign'
    createCard.innerHTML = `
      <span class="material-symbols-outlined text-accent text-6xl mb-4">add_circle</span>
      <h3 class="text-xl font-bold text-text-light dark:text-text-dark mb-2">Create New Campaign</h3>
      <p class="text-text-light/70 dark:text-text-dark/70 text-sm text-center mb-4">
        Launch your own reforestation initiative
      </p>
      <button class="px-6 py-2 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors">
        Get Started
      </button>
    `
    createCard.addEventListener('click', () => showCampaignWizard(page, activeCampaigns, renderCampaigns))
    campaignsGrid.appendChild(createCard)
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
            <span class="material-symbols-outlined text-accent text-3xl">campaign</span>
            <span class="text-xl font-bold text-text-light dark:text-text-dark">Forest Campaigns</span>
          </div>
          <div class="w-20"></div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 mb-8 text-white">
        <h1 class="text-4xl font-bold mb-4">Launch a Reforestation Campaign</h1>
        <p class="text-xl opacity-90">
          Create and manage community-driven tree planting campaigns with AI-powered tools.
        </p>
      </div>

      <!-- Active Campaigns -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-text-light dark:text-text-dark mb-6">
          ${activeCampaigns.length > 0 ? 'Active Campaigns' : 'No Active Campaigns Yet'}
        </h2>
        ${activeCampaigns.length === 0 ? `
          <p class="text-text-light/70 dark:text-text-dark/70 mb-6">
            Be the first to create a reforestation campaign in your community!
          </p>
        ` : ''}
        <div id="campaigns-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Campaigns will be rendered here -->
        </div>
      </div>

      <!-- Campaign Wizard Modal -->
      <div id="campaign-modal" class="hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
        <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
          <div class="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-700 dark:to-gray-800">
            <h2 class="text-2xl font-bold text-text-light dark:text-text-dark flex items-center gap-2">
              <span class="material-symbols-outlined text-accent">campaign</span>
              <span>Campaign Wizard</span>
            </h2>
            <button id="close-modal" class="text-text-light/60 dark:text-text-dark/60 hover:text-text-light dark:hover:text-text-dark transition-colors">
              <span class="material-symbols-outlined text-3xl">close</span>
            </button>
          </div>
          <div id="modal-content" class="p-8 overflow-y-auto max-h-[70vh]">
            <!-- Wizard content loaded here -->
          </div>
        </div>
      </div>
    </main>
  `
  
  // Event Listeners
  page.querySelector('#back-btn').addEventListener('click', () => {
    router.navigate('/forest')
  })
  
  // Initial render of campaigns
  setTimeout(() => renderCampaigns(), 0)
  
  return page
}

// Helper function to create campaign card
function createCampaignCard(campaign, index) {
  const card = document.createElement('div')
  card.className = 'bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all'
  
  const typeIcons = {
    'reforestation': 'park',
    'urban-greening': 'location_city',
    'watershed': 'water_drop',
    'agroforestry': 'agriculture'
  }
  
  const typeColors = {
    'reforestation': 'from-green-400 to-green-600',
    'urban-greening': 'from-blue-400 to-blue-600',
    'watershed': 'from-cyan-400 to-cyan-600',
    'agroforestry': 'from-amber-400 to-amber-600'
  }
  
  const icon = typeIcons[campaign.type] || 'park'
  const colorGradient = typeColors[campaign.type] || 'from-green-400 to-green-600'
  const progress = campaign.progress || 0
  const progressPercent = (progress / campaign.goal) * 100
  
  card.innerHTML = `
    <div class="h-48 bg-gradient-to-br ${colorGradient} flex items-center justify-center">
      <span class="material-symbols-outlined text-white text-6xl">${icon}</span>
    </div>
    <div class="p-6">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-xl font-bold text-text-light dark:text-text-dark">${campaign.title}</h3>
      </div>
      <p class="text-text-light/70 dark:text-text-dark/70 text-sm mb-2">
        <span class="material-symbols-outlined text-xs align-middle">location_on</span>
        ${campaign.location}
      </p>
      <p class="text-text-light/70 dark:text-text-dark/70 text-sm mb-4 line-clamp-2">
        ${campaign.description.substring(0, 100)}...
      </p>
      <div class="mb-4">
        <div class="flex justify-between text-sm mb-2">
          <span class="text-text-light/70 dark:text-text-dark/70">Progress</span>
          <span class="font-semibold text-primary">${progress.toLocaleString()} / ${campaign.goal.toLocaleString()}</span>
        </div>
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div class="bg-primary h-2 rounded-full transition-all" style="width: ${progressPercent}%"></div>
        </div>
      </div>
      <div class="flex gap-2">
        <button class="flex-1 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm">
          View Details
        </button>
        <button class="px-4 py-2 border-2 border-red-500 text-red-500 rounded-lg font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" onclick="deleteCampaign(${index})">
          <span class="material-symbols-outlined text-sm">delete</span>
        </button>
      </div>
    </div>
  `
  
  return card
}

// Global function to delete campaign
window.deleteCampaign = (index) => {
  if (confirm('Are you sure you want to delete this campaign?')) {
    const campaigns = JSON.parse(localStorage.getItem('activeCampaigns') || '[]')
    campaigns.splice(index, 1)
    localStorage.setItem('activeCampaigns', JSON.stringify(campaigns))
    // Reload the page to refresh the list
    window.location.reload()
  }
}

function showCampaignWizard(page, activeCampaigns, renderCampaigns) {
  const modal = page.querySelector('#campaign-modal')
  const modalContent = page.querySelector('#modal-content')
  const closeBtn = page.querySelector('#close-modal')
  
  let currentStep = 1
  const campaignData = {
    type: '',
    title: '',
    location: '',
    goal: '',
    duration: '',
    description: ''
  }
  
  const renderWizard = () => {
    if (currentStep === 1) {
      // Step 1: Campaign Type
      modalContent.innerHTML = `
        <div class="space-y-6">
          <div class="text-center mb-8">
            <div class="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
              Step 1 of 4
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">Choose Campaign Type</h3>
            <p class="text-gray-600 dark:text-gray-400">What kind of reforestation project do you want to create?</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button class="campaign-type-btn p-6 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-primary transition-all text-left" data-type="reforestation">
              <span class="material-symbols-outlined text-primary text-4xl mb-3">forest</span>
              <h4 class="font-bold text-lg text-gray-900 dark:text-gray-50 mb-2">Reforestation</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">Plant trees in degraded or deforested areas</p>
            </button>
            
            <button class="campaign-type-btn p-6 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-primary transition-all text-left" data-type="urban-greening">
              <span class="material-symbols-outlined text-primary text-4xl mb-3">location_city</span>
              <h4 class="font-bold text-lg text-gray-900 dark:text-gray-50 mb-2">Urban Greening</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">Increase tree cover in urban areas</p>
            </button>
            
            <button class="campaign-type-btn p-6 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-primary transition-all text-left" data-type="watershed">
              <span class="material-symbols-outlined text-primary text-4xl mb-3">water_drop</span>
              <h4 class="font-bold text-lg text-gray-900 dark:text-gray-50 mb-2">Watershed Protection</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">Protect water sources with riparian forests</p>
            </button>
            
            <button class="campaign-type-btn p-6 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-primary transition-all text-left" data-type="agroforestry">
              <span class="material-symbols-outlined text-primary text-4xl mb-3">agriculture</span>
              <h4 class="font-bold text-lg text-gray-900 dark:text-gray-50 mb-2">Agroforestry</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">Integrate trees with agricultural land</p>
            </button>
          </div>
        </div>
      `
      
      modalContent.querySelectorAll('.campaign-type-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          campaignData.type = btn.dataset.type
          currentStep = 2
          renderWizard()
        })
      })
      
    } else if (currentStep === 2) {
      // Step 2: Basic Information
      modalContent.innerHTML = `
        <div class="space-y-6">
          <div class="text-center mb-8">
            <div class="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
              Step 2 of 4
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">Campaign Details</h3>
            <p class="text-gray-600 dark:text-gray-400">Tell us about your ${formatCampaignType(campaignData.type)} project</p>
          </div>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Campaign Title</label>
              <input type="text" id="campaign-title" class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50" placeholder="e.g., Restore Maple Valley Forest" value="${campaignData.title}">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
              <input type="text" id="campaign-location" class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50" placeholder="e.g., Nairobi, Kenya" value="${campaignData.location}">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tree Planting Goal</label>
              <input type="number" id="campaign-goal" class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50" placeholder="e.g., 5000" value="${campaignData.goal}">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Duration (months)</label>
              <input type="number" id="campaign-duration" class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50" placeholder="e.g., 6" value="${campaignData.duration}">
            </div>
          </div>
          
          <div class="flex gap-4">
            <button id="back-step" class="flex-1 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Back
            </button>
            <button id="next-step" class="flex-1 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors">
              Continue
            </button>
          </div>
        </div>
      `
      
      modalContent.querySelector('#back-step').addEventListener('click', () => {
        currentStep = 1
        renderWizard()
      })
      
      modalContent.querySelector('#next-step').addEventListener('click', () => {
        campaignData.title = modalContent.querySelector('#campaign-title').value
        campaignData.location = modalContent.querySelector('#campaign-location').value
        campaignData.goal = modalContent.querySelector('#campaign-goal').value
        campaignData.duration = modalContent.querySelector('#campaign-duration').value
        
        if (campaignData.title && campaignData.location && campaignData.goal && campaignData.duration) {
          currentStep = 3
          renderWizard()
        } else {
          alert('Please fill in all fields')
        }
      })
      
    } else if (currentStep === 3) {
      // Step 3: AI Generation
      modalContent.innerHTML = `
        <div class="space-y-6">
          <div class="text-center mb-8">
            <div class="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
              Step 3 of 4
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">Generate Campaign Content</h3>
            <p class="text-gray-600 dark:text-gray-400">Let AI create compelling descriptions for your campaign</p>
          </div>
          
          <div class="flex items-center justify-center py-12">
            <div class="flex flex-col items-center gap-4">
              <div class="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
              <p class="text-gray-600 dark:text-gray-400">Generating campaign content with AI...</p>
            </div>
          </div>
        </div>
      `
      
      // Generate content with AI
      generateCampaignContent(campaignData).then(result => {
        if (result.success) {
          campaignData.description = result.content
          currentStep = 4
          renderWizard()
        } else {
          alert('Failed to generate content. Please try again.')
          currentStep = 2
          renderWizard()
        }
      }).catch(error => {
        console.error('Error:', error)
        alert('An error occurred. Please try again.')
        currentStep = 2
        renderWizard()
      })
      
    } else if (currentStep === 4) {
      // Step 4: Review and Launch
      modalContent.innerHTML = `
        <div class="space-y-6">
          <div class="text-center mb-8">
            <div class="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
              Step 4 of 4
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">Review Your Campaign</h3>
            <p class="text-gray-600 dark:text-gray-400">Review and edit before launching</p>
          </div>
          
          <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6">
            <h4 class="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">${campaignData.title}</h4>
            
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400">Type</p>
                <p class="font-semibold text-gray-900 dark:text-gray-50">${formatCampaignType(campaignData.type)}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400">Location</p>
                <p class="font-semibold text-gray-900 dark:text-gray-50">${campaignData.location}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400">Goal</p>
                <p class="font-semibold text-gray-900 dark:text-gray-50">${campaignData.goal} trees</p>
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400">Duration</p>
                <p class="font-semibold text-gray-900 dark:text-gray-50">${campaignData.duration} months</p>
              </div>
            </div>
            
            <div class="mt-4">
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Campaign Description</p>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-h-64 overflow-y-auto">
                <div class="prose prose-sm dark:prose-invert max-w-none">
                  ${formatCampaignDescription(campaignData.description)}
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div class="flex gap-2">
              <span class="material-symbols-outlined text-blue-600 dark:text-blue-400">info</span>
              <div>
                <p class="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-1">Ready to launch?</p>
                <p class="text-sm text-blue-800 dark:text-blue-300">Your campaign will be visible to the community and you can start inviting participants.</p>
              </div>
            </div>
          </div>
          
          <div class="flex gap-4">
            <button id="back-step" class="flex-1 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Back
            </button>
            <button id="launch-campaign" class="flex-1 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors flex items-center justify-center gap-2">
              <span class="material-symbols-outlined">rocket_launch</span>
              Launch Campaign
            </button>
          </div>
        </div>
      `
      
      modalContent.querySelector('#back-step').addEventListener('click', () => {
        currentStep = 2
        renderWizard()
      })
      
      modalContent.querySelector('#launch-campaign').addEventListener('click', () => {
        // Create campaign object
        const newCampaign = {
          type: campaignData.type,
          title: campaignData.title,
          location: campaignData.location,
          goal: parseInt(campaignData.goal),
          duration: parseInt(campaignData.duration),
          description: campaignData.description,
          progress: 0,
          createdAt: new Date().toISOString()
        }
        
        // Save to localStorage
        activeCampaigns.push(newCampaign)
        localStorage.setItem('activeCampaigns', JSON.stringify(activeCampaigns))
        
        // Re-render campaigns
        renderCampaigns()
        
        // Show success message
        modalContent.innerHTML = `
          <div class="text-center py-12">
            <div class="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="material-symbols-outlined text-green-600 dark:text-green-400 text-5xl">check_circle</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">Campaign Launched! 🎉</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              Your ${formatCampaignType(campaignData.type)} campaign "${campaignData.title}" is now live!
            </p>
            <button id="close-success" class="px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors">
              View Campaign
            </button>
          </div>
        `
        
        modalContent.querySelector('#close-success').addEventListener('click', () => {
          modal.classList.add('hidden')
          // In a real app, navigate to the campaign page
        })
      })
    }
  }
  
  modal.classList.remove('hidden')
  renderWizard()
  
  closeBtn.onclick = () => {
    modal.classList.add('hidden')
    currentStep = 1
  }
}

function formatCampaignType(type) {
  return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

function formatCampaignDescription(description) {
  // Split into paragraphs and format
  const paragraphs = description
    .split('\n\n')
    .filter(p => p.trim())
    .map(p => `<p class="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed text-base">${p.trim()}</p>`)
    .join('')
  
  return paragraphs || `<p class="text-gray-700 dark:text-gray-300 leading-relaxed text-base">${description}</p>`
}
