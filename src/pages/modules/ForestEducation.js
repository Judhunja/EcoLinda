import { router } from '../../router'
import { generateEducationalContent, generateForestContent, generateForestContentStream, generateQuiz } from '../../lib/gemini'

export function ForestEducationPage() {
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
            <span class="material-symbols-outlined text-primary text-3xl">school</span>
            <span class="text-xl font-bold text-text-light dark:text-text-dark">Forest Education Hub</span>
          </div>
          <div class="w-20"></div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 mb-8 text-white">
        <h1 class="text-4xl font-bold mb-4">Learn About Forests</h1>
        <p class="text-xl opacity-90">
          Discover why forests are the lungs of our planet and how you can help protect them.
        </p>
      </div>

      <!-- Learning Topics -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <!-- Carbon Sequestration -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all cursor-pointer topic-card" data-topic="carbon-sequestration">
          <div class="bg-green-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <span class="material-symbols-outlined text-green-600 text-3xl">co2</span>
          </div>
          <h3 class="text-xl font-bold text-text-light dark:text-text-dark mb-2">Carbon Sequestration</h3>
          <p class="text-text-light/70 dark:text-text-dark/70 text-sm mb-4">
            Learn how forests capture and store carbon dioxide from the atmosphere.
          </p>
          <button class="text-primary font-semibold flex items-center gap-1">
            Learn More <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <!-- Biodiversity -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all cursor-pointer topic-card" data-topic="forest-biodiversity">
          <div class="bg-orange-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <span class="material-symbols-outlined text-orange-600 text-3xl">diversity_3</span>
          </div>
          <h3 class="text-xl font-bold text-text-light dark:text-text-dark mb-2">Forest Biodiversity</h3>
          <p class="text-text-light/70 dark:text-text-dark/70 text-sm mb-4">
            Explore the incredible variety of life that forests support.
          </p>
          <button class="text-primary font-semibold flex items-center gap-1">
            Learn More <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <!-- Climate Regulation -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all cursor-pointer topic-card" data-topic="climate-regulation">
          <div class="bg-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <span class="material-symbols-outlined text-blue-600 text-3xl">thermostat</span>
          </div>
          <h3 class="text-xl font-bold text-text-light dark:text-text-dark mb-2">Climate Regulation</h3>
          <p class="text-text-light/70 dark:text-text-dark/70 text-sm mb-4">
            Understand how forests regulate temperature and rainfall patterns.
          </p>
          <button class="text-primary font-semibold flex items-center gap-1">
            Learn More <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <!-- Deforestation Impacts -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all cursor-pointer topic-card" data-topic="deforestation-impacts">
          <div class="bg-red-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <span class="material-symbols-outlined text-red-600 text-3xl">warning</span>
          </div>
          <h3 class="text-xl font-bold text-text-light dark:text-text-dark mb-2">Deforestation Impacts</h3>
          <p class="text-text-light/70 dark:text-text-dark/70 text-sm mb-4">
            Discover the consequences of forest loss on our planet.
          </p>
          <button class="text-primary font-semibold flex items-center gap-1">
            Learn More <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <!-- Reforestation -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all cursor-pointer topic-card" data-topic="reforestation-techniques">
          <div class="bg-green-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <span class="material-symbols-outlined text-green-600 text-3xl">nature_people</span>
          </div>
          <h3 class="text-xl font-bold text-text-light dark:text-text-dark mb-2">Reforestation</h3>
          <p class="text-text-light/70 dark:text-text-dark/70 text-sm mb-4">
            Learn effective techniques for restoring degraded forests.
          </p>
          <button class="text-primary font-semibold flex items-center gap-1">
            Learn More <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <!-- Forest Layers -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all cursor-pointer topic-card" data-topic="forest-layers">
          <div class="bg-purple-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <span class="material-symbols-outlined text-purple-600 text-3xl">layers</span>
          </div>
          <h3 class="text-xl font-bold text-text-light dark:text-text-dark mb-2">Forest Structure</h3>
          <p class="text-text-light/70 dark:text-text-dark/70 text-sm mb-4">
            Explore the different layers of a forest ecosystem.
          </p>
          <button class="text-primary font-semibold flex items-center gap-1">
            Learn More <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>

      <!-- Interactive Tools -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Carbon Calculator -->
        <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6">
          <div class="flex items-center gap-3 mb-4">
            <span class="material-symbols-outlined text-primary text-4xl">calculate</span>
            <h3 class="text-2xl font-bold text-text-light dark:text-text-dark">Carbon Calculator</h3>
          </div>
          <p class="text-text-light/70 dark:text-text-dark/70 mb-4">
            Calculate how many trees you need to offset your carbon footprint.
          </p>
          <div class="space-y-4 mb-4">
            <div>
              <label class="block text-sm font-medium mb-2">Your annual carbon footprint (tons CO₂)</label>
              <input type="number" id="carbon-input" class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" placeholder="e.g., 5" value="5">
            </div>
            <button id="calculate-btn" class="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              Calculate Trees Needed
            </button>
          </div>
          <div id="carbon-result" class="hidden bg-white dark:bg-gray-800 rounded-lg p-4">
            <p class="text-center text-2xl font-bold text-primary mb-2" id="trees-needed"></p>
            <p class="text-center text-sm text-text-light/70 dark:text-text-dark/70" id="carbon-explanation"></p>
          </div>
        </div>

        <!-- Quiz Section -->
        <div class="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-6">
          <div class="flex items-center gap-3 mb-4">
            <span class="material-symbols-outlined text-accent text-4xl">quiz</span>
            <h3 class="text-2xl font-bold text-text-light dark:text-text-dark">Test Your Knowledge</h3>
          </div>
          <p class="text-text-light/70 dark:text-text-dark/70 mb-4">
            Take a quiz to test what you've learned about forests!
          </p>
          <button id="start-quiz-btn" class="w-full py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors">
            Start Quiz
          </button>
        </div>
      </div>
    </main>

    <!-- Content Modal -->
    <div id="content-modal" class="hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden shadow-2xl">
        <div class="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-800">
          <h2 id="modal-title" class="text-2xl font-bold text-text-light dark:text-text-dark flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">auto_stories</span>
            <span></span>
          </h2>
          <button id="close-modal" class="text-text-light/60 dark:text-text-dark/60 hover:text-text-light dark:hover:text-text-dark transition-colors">
            <span class="material-symbols-outlined text-3xl">close</span>
          </button>
        </div>
        <div id="modal-content" class="p-8 overflow-y-auto max-h-[70vh] prose-content">
          <!-- Content loaded here -->
        </div>
      </div>
    </div>
    
    <style>
      .content-typography {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Segoe UI Symbol', system-ui, sans-serif;
        line-height: 1.8;
        color: #374151;
        font-size: 1.0625rem;
      }
      
      .dark .content-typography {
        color: #d1d5db;
      }
      
      .content-typography h1,
      .content-typography h2,
      .content-typography h3 {
        font-family: 'Poppins', 'Inter', sans-serif;
        font-weight: 700;
        letter-spacing: -0.02em;
        scroll-margin-top: 2rem;
      }
      
      .content-typography h2 {
        font-size: 1.75rem;
        color: #111827;
      }
      
      .dark .content-typography h2 {
        color: #f9fafb;
      }
      
      .content-typography h3 {
        font-size: 1.375rem;
        color: #1f2937;
      }
      
      .dark .content-typography h3 {
        color: #f3f4f6;
      }
      
      .content-typography p {
        font-size: 1.0625rem;
        line-height: 1.8;
        margin-bottom: 1rem;
        color: #4b5563;
      }
      
      .dark .content-typography p {
        color: #d1d5db;
      }
      
      .content-typography strong {
        font-weight: 600;
        color: #111827;
      }
      
      .dark .content-typography strong {
        color: #f9fafb;
      }
      
      .content-typography ul {
        list-style: none;
        padding-left: 0;
      }
      
      .content-typography li {
        padding-left: 0;
      }
      
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(8px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .content-typography > * {
        animation: fadeIn 0.4s ease-out;
      }
      
      /* Smooth scrolling */
      #modal-content {
        scroll-behavior: smooth;
      }
      
      /* Custom scrollbar */
      #modal-content::-webkit-scrollbar {
        width: 8px;
      }
      
      #modal-content::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.05);
        border-radius: 10px;
      }
      
      #modal-content::-webkit-scrollbar-thumb {
        background: rgba(56, 161, 105, 0.5);
        border-radius: 10px;
      }
      
      #modal-content::-webkit-scrollbar-thumb:hover {
        background: rgba(56, 161, 105, 0.7);
      }
    </style>
  `
  
  // Event listeners
  page.querySelector('#back-btn').addEventListener('click', () => {
    router.navigate('/forest')
  })
  
  // Topic cards
  const topicCards = page.querySelectorAll('.topic-card')
  topicCards.forEach(card => {
    card.addEventListener('click', async () => {
      const topic = card.dataset.topic
      await showTopicContent(topic, page)
    })
  })
  
  // Carbon calculator
  page.querySelector('#calculate-btn').addEventListener('click', () => {
    const carbonTons = parseFloat(page.querySelector('#carbon-input').value) || 5
    const treesNeeded = Math.ceil(carbonTons * 40) // Roughly 40 trees per ton CO2/year
    const result = page.querySelector('#carbon-result')
    const treesEl = page.querySelector('#trees-needed')
    const explanationEl = page.querySelector('#carbon-explanation')
    
    treesEl.textContent = `${treesNeeded} trees`
    explanationEl.textContent = `You would need approximately ${treesNeeded} mature trees to offset ${carbonTons} tons of CO₂ per year. Each tree absorbs about 25kg of CO₂ annually.`
    result.classList.remove('hidden')
  })
  
  // Quiz button
  page.querySelector('#start-quiz-btn').addEventListener('click', async () => {
    await startQuiz(page)
  })
  
  return page
}

async function showTopicContent(topic, page) {
  const modal = page.querySelector('#content-modal')
  const modalTitle = page.querySelector('#modal-title')
  const modalContent = page.querySelector('#modal-content')
  const closeBtn = page.querySelector('#close-modal')
  
  // Show modal with loading state
  modal.classList.remove('hidden')
  modalTitle.textContent = formatTopicTitle(topic)
  modalContent.innerHTML = `
    <div class="flex items-center justify-center py-12">
      <div class="flex flex-col items-center gap-4">
        <div class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p class="text-text-light/60 dark:text-text-dark/60">Generating content with AI...</p>
      </div>
    </div>
  `
  
  try {
    // Create the content container with loading state
    modalContent.innerHTML = `
      <div id="streaming-content" class="content-typography">
        <div class="flex items-center gap-3 text-primary mb-4">
          <div class="animate-spin">
            <span class="material-symbols-outlined">autorenew</span>
          </div>
          <span class="text-sm font-medium">Generating content...</span>
        </div>
      </div>
      <div class="mt-6 p-4 bg-primary/10 rounded-xl">
        <div class="flex items-center gap-2 text-primary">
          <span class="material-symbols-outlined">psychology</span>
          <span class="font-semibold">AI-Generated Educational Content</span>
        </div>
      </div>
    `
    
    const streamingContent = modalContent.querySelector('#streaming-content')
    let accumulatedContent = ''
    let updateTimeout = null
    
    // Smooth streaming with debounced updates
    const updateContent = (content) => {
      if (updateTimeout) clearTimeout(updateTimeout)
      updateTimeout = setTimeout(() => {
        streamingContent.innerHTML = formatContent(content)
        // Smooth auto-scroll to bottom
        modalContent.scrollTo({
          top: modalContent.scrollHeight,
          behavior: 'smooth'
        })
      }, 50) // 50ms debounce for smooth updates
    }
    
    // Generate content using Gemini AI with streaming
    const result = await generateForestContentStream(
      formatTopicTitle(topic),
      (chunk, fullText) => {
        // Update the displayed content as chunks arrive
        accumulatedContent = fullText
        updateContent(accumulatedContent)
      }
    )
    
    if (result.success) {
      // Final update with complete formatted content
      streamingContent.innerHTML = formatContent(result.content)
    } else {
      modalContent.innerHTML = `
        <div class="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
          <p class="text-red-600 dark:text-red-400">Failed to generate content. Please try again.</p>
        </div>
      `
    }
  } catch (error) {
    console.error('Error loading content:', error)
    modalContent.innerHTML = `
      <div class="text-center py-12">
        <span class="material-symbols-outlined text-red-500 text-6xl mb-4">error</span>
        <p class="text-text-light dark:text-text-dark">An error occurred while loading content.</p>
      </div>
    `
  }
  
  closeBtn.onclick = () => modal.classList.add('hidden')
}

async function startQuiz(page) {
  const modal = page.querySelector('#content-modal')
  const modalTitle = page.querySelector('#modal-title')
  const modalContent = page.querySelector('#modal-content')
  const closeBtn = page.querySelector('#close-modal')
  
  modal.classList.remove('hidden')
  modalTitle.textContent = 'Forest Conservation Quiz'
  modalContent.innerHTML = `
    <div class="flex items-center justify-center py-12">
      <div class="flex flex-col items-center gap-4">
        <div class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p class="text-text-light/60 dark:text-text-dark/60">Generating quiz questions...</p>
      </div>
    </div>
  `
  
  try {
    const result = await generateQuiz('Forest Conservation and Biodiversity', 'medium', 5)
    
    if (result.success) {
      modalContent.innerHTML = `
        <div class="space-y-6">
          <div class="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
            <p class="text-text-light dark:text-text-dark">
              Test your knowledge with these AI-generated questions about forest conservation!
            </p>
          </div>
          <div class="prose prose-lg dark:prose-invert max-w-none whitespace-pre-line">
            ${result.quiz}
          </div>
          <div class="flex gap-4">
            <button class="flex-1 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              Submit Answers
            </button>
          </div>
        </div>
      `
    } else {
      modalContent.innerHTML = `
        <div class="text-center py-12">
          <span class="material-symbols-outlined text-red-500 text-6xl mb-4">error</span>
          <p class="text-text-light dark:text-text-dark">Failed to generate quiz</p>
        </div>
      `
    }
  } catch (error) {
    console.error('Error generating quiz:', error)
  }
  
  closeBtn.onclick = () => modal.classList.add('hidden')
}

function formatTopicTitle(topic) {
  return topic.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

function formatContent(content) {
  // Convert markdown-style content to HTML with better formatting
  let formatted = content
    // Convert headers (must be done before bold to avoid conflicts)
    .replace(/#{3,}\s+(.*?)(\n|$)/g, '\n<h3 class="text-xl font-bold mt-6 mb-3 text-gray-800 dark:text-gray-100">$1</h3>\n')
    .replace(/#{2}\s+(.*?)(\n|$)/g, '\n<h2 class="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-gray-50">$1</h2>\n')
    .replace(/#{1}\s+(.*?)(\n|$)/g, '\n<h1 class="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-gray-50">$1</h1>\n')
    // Convert bold text (remove asterisks completely)
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong class="font-bold text-gray-900 dark:text-gray-50">$1</strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-gray-50">$1</strong>')
    // Convert italic text
    .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
    // Convert bullet points and numbered lists - each on new line
    .replace(/^\d+\.\s+(.+)$/gm, '<div class="flex gap-3 mb-3 items-start"><span class="text-primary font-semibold mt-1">•</span><span class="flex-1">$1</span></div>')
    .replace(/^[-•]\s+(.+)$/gm, '<div class="flex gap-3 mb-3 items-start"><span class="text-primary mt-1">•</span><span class="flex-1">$1</span></div>')
    // Convert double line breaks to paragraphs
    .replace(/\n\n+/g, '</p><p class="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">')
    // Convert single line breaks to <br> for proper line separation
    .replace(/\n/g, '<br>')
    // Clean up any remaining single asterisks
    .replace(/\*/g, '')
  
  return `<div class="space-y-3"><p class="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">${formatted}</p></div>`
}
