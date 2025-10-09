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
      <div class="grid grid-cols-1 gap-6">
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
    
    if (result.success && result.questions) {
      renderInteractiveQuiz(modalContent, result.questions)
    } else {
      modalContent.innerHTML = `
        <div class="text-center py-12">
          <span class="material-symbols-outlined text-red-500 text-6xl mb-4">error</span>
          <p class="text-text-light dark:text-text-dark mb-4">Failed to generate quiz</p>
          <p class="text-sm text-gray-500">${result.error || 'Unknown error'}</p>
        </div>
      `
    }
  } catch (error) {
    console.error('Error generating quiz:', error)
    modalContent.innerHTML = `
      <div class="text-center py-12">
        <span class="material-symbols-outlined text-red-500 text-6xl mb-4">error</span>
        <p class="text-text-light dark:text-text-dark">An error occurred while generating the quiz.</p>
      </div>
    `
  }
  
  closeBtn.onclick = () => modal.classList.add('hidden')
}

function renderInteractiveQuiz(container, questions) {
  const userAnswers = new Array(questions.length).fill(null)
  let showingResults = false
  
  const render = () => {
    const questionsHTML = questions.map((q, qIndex) => {
      const optionsHTML = q.options.map((option, oIndex) => {
        const isSelected = userAnswers[qIndex] === oIndex
        const isCorrect = oIndex === q.correct
        const showCorrect = showingResults && isCorrect
        const showWrong = showingResults && isSelected && !isCorrect
        
        let buttonClass = 'w-full text-left p-4 rounded-lg border-2 transition-all '
        if (showCorrect) {
          buttonClass += 'border-green-500 bg-green-50 dark:bg-green-900/20'
        } else if (showWrong) {
          buttonClass += 'border-red-500 bg-red-50 dark:bg-red-900/20'
        } else if (isSelected) {
          buttonClass += 'border-primary bg-primary/5'
        } else {
          buttonClass += 'border-gray-200 dark:border-gray-600 hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-700/50'
        }
        
        let radioClass = 'flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center '
        if (showCorrect) {
          radioClass += 'border-green-500 bg-green-500'
        } else if (showWrong) {
          radioClass += 'border-red-500 bg-red-500'
        } else if (isSelected) {
          radioClass += 'border-primary bg-primary'
        } else {
          radioClass += 'border-gray-300 dark:border-gray-600'
        }
        
        let radioIcon = ''
        if (showCorrect) {
          radioIcon = '<span class="material-symbols-outlined text-white text-sm">check</span>'
        } else if (showWrong) {
          radioIcon = '<span class="material-symbols-outlined text-white text-sm">close</span>'
        } else if (isSelected && !showingResults) {
          radioIcon = '<span class="w-3 h-3 bg-white rounded-full"></span>'
        }
        
        return `
          <button 
            class="${buttonClass}"
            data-question="${qIndex}" 
            data-option="${oIndex}"
            ${showingResults ? 'disabled' : ''}
          >
            <div class="flex items-center gap-3">
              <div class="${radioClass}">
                ${radioIcon}
              </div>
              <span class="flex-1 text-gray-700 dark:text-gray-300">
                ${option}
              </span>
            </div>
          </button>
        `
      }).join('')
      
      const explanationHTML = showingResults ? `
        <div class="mt-4 ml-11 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div class="flex gap-2">
            <span class="material-symbols-outlined text-blue-600 dark:text-blue-400 text-sm">info</span>
            <div>
              <p class="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-1">Explanation:</p>
              <p class="text-sm text-blue-800 dark:text-blue-300">${q.explanation}</p>
            </div>
          </div>
        </div>
      ` : ''
      
      const questionBorderClass = showingResults 
        ? (userAnswers[qIndex] === q.correct ? 'border-green-500' : 'border-red-500')
        : 'border-gray-200 dark:border-gray-700'
      
      return `
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border ${questionBorderClass}">
          <div class="flex gap-3 mb-4">
            <span class="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold">
              ${qIndex + 1}
            </span>
            <h4 class="text-lg font-semibold text-gray-900 dark:text-gray-50 pt-1">
              ${q.question}
            </h4>
          </div>
          <div class="space-y-3 ml-11">
            ${optionsHTML}
          </div>
          ${explanationHTML}
        </div>
      `
    }).join('')
    
    const score = userAnswers.filter((a, i) => a === questions[i].correct).length
    const percentage = Math.round((score / questions.length) * 100)
    
    const resultsHTML = showingResults ? `
      <div class="bg-gradient-to-r from-primary/10 to-green-500/10 rounded-xl p-6">
        <div class="text-center">
          <div class="text-5xl font-bold text-primary mb-2">
            ${score}/${questions.length}
          </div>
          <p class="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-1">
            ${score === questions.length ? 'Perfect Score! 🎉' : score >= questions.length * 0.7 ? 'Great Job! 👏' : 'Keep Learning! 📚'}
          </p>
          <p class="text-gray-600 dark:text-gray-400">
            You answered ${percentage}% correctly
          </p>
        </div>
      </div>
    ` : ''
    
    const buttonHTML = !showingResults ? `
      <button 
        id="submit-quiz" 
        class="flex-1 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        ${userAnswers.includes(null) ? 'disabled' : ''}
      >
        <span class="material-symbols-outlined">check_circle</span>
        Submit Answers
      </button>
    ` : `
      <button 
        id="retry-quiz" 
        class="flex-1 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
      >
        <span class="material-symbols-outlined">refresh</span>
        Try Again
      </button>
    `
    
    container.innerHTML = `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6">
          <div class="flex items-center gap-3 mb-2">
            <span class="material-symbols-outlined text-primary text-3xl">quiz</span>
            <h3 class="text-xl font-bold text-gray-900 dark:text-gray-50">Test Your Knowledge</h3>
          </div>
          <p class="text-gray-700 dark:text-gray-300">
            ${questions.length} questions about forest conservation and biodiversity
          </p>
        </div>
        
        <div class="space-y-8">
          ${questionsHTML}
        </div>
        
        ${resultsHTML}
        
        <div class="flex gap-4">
          ${buttonHTML}
        </div>
      </div>
    `
    
    if (!showingResults) {
      container.querySelectorAll('button[data-option]').forEach(btn => {
        btn.addEventListener('click', () => {
          const qIndex = parseInt(btn.dataset.question)
          const oIndex = parseInt(btn.dataset.option)
          userAnswers[qIndex] = oIndex
          render()
        })
      })
      
      const submitBtn = container.querySelector('#submit-quiz')
      if (submitBtn) {
        submitBtn.addEventListener('click', () => {
          showingResults = true
          render()
          container.scrollTo({ top: 0, behavior: 'smooth' })
        })
      }
    } else {
      const retryBtn = container.querySelector('#retry-quiz')
      if (retryBtn) {
        retryBtn.addEventListener('click', () => {
          userAnswers.fill(null)
          showingResults = false
          render()
          container.scrollTo({ top: 0, behavior: 'smooth' })
        })
      }
    }
  }
  
  render()
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
