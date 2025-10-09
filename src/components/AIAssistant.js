import { getChatResponse } from '../lib/gemini'

export function AIAssistant() {
  const widget = document.createElement('div')
  widget.id = 'ai-assistant'
  widget.className = 'fixed bottom-6 right-6 z-50'
  
  widget.innerHTML = `
    <!-- Floating Button -->
    <button id="ai-toggle" class="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
      <span class="material-symbols-outlined text-3xl">support_agent</span>
    </button>
    
    <!-- Chat Window (Hidden by default) -->
    <div id="ai-chat-window" class="hidden absolute bottom-20 right-0 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden border-2 border-primary/20">
      <!-- Header -->
      <div class="bg-gradient-to-r from-primary to-primary/90 p-4 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <span class="material-symbols-outlined text-white">eco</span>
          </div>
          <div>
            <h3 class="font-bold text-white">EcoLinda AI</h3>
            <p class="text-xs text-white/80">Your sustainability assistant</p>
          </div>
        </div>
        <button id="ai-close" class="text-white/80 hover:text-white transition-colors">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      
      <!-- Messages Container -->
      <div id="ai-messages" class="flex-1 overflow-y-auto p-4 space-y-4">
        <div class="flex gap-2">
          <div class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <span class="material-symbols-outlined text-primary text-sm">eco</span>
          </div>
          <div class="bg-primary/10 rounded-2xl rounded-tl-none p-3 max-w-[80%]">
            <p class="text-sm text-text-light dark:text-text-dark">
              Hello! I'm your EcoLinda AI assistant. I can help you with sustainable farming, forest conservation, species protection, and more. How can I assist you today?
            </p>
          </div>
        </div>
      </div>
      
      <!-- Input Area -->
      <div class="p-4 border-t border-gray-200 dark:border-gray-700">
        <form id="ai-form" class="flex gap-2">
          <input
            type="text"
            id="ai-input"
            placeholder="Ask me anything..."
            class="flex-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            autocomplete="off"
          />
          <button
            type="submit"
            id="ai-send"
            class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white hover:bg-primary/90 transition-colors"
          >
            <span class="material-symbols-outlined">send</span>
          </button>
        </form>
        <div id="ai-typing" class="hidden mt-2 text-xs text-text-light/60 dark:text-text-dark/60 flex items-center gap-2">
          <div class="flex gap-1">
            <div class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 0ms;"></div>
            <div class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 150ms;"></div>
            <div class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 300ms;"></div>
          </div>
          <span>AI is thinking...</span>
        </div>
      </div>
    </div>
  `
  
  // State
  let conversationHistory = []
  let isOpen = false
  
  // Elements
  const toggleBtn = widget.querySelector('#ai-toggle')
  const chatWindow = widget.querySelector('#ai-chat-window')
  const closeBtn = widget.querySelector('#ai-close')
  const form = widget.querySelector('#ai-form')
  const input = widget.querySelector('#ai-input')
  const messagesContainer = widget.querySelector('#ai-messages')
  const typingIndicator = widget.querySelector('#ai-typing')
  
  // Toggle chat window
  function toggleChat() {
    isOpen = !isOpen
    if (isOpen) {
      chatWindow.classList.remove('hidden')
      input.focus()
    } else {
      chatWindow.classList.add('hidden')
    }
  }
  
  // Add message to chat
  function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div')
    messageDiv.className = isUser ? 'flex gap-2 justify-end' : 'flex gap-2'
    
    if (isUser) {
      messageDiv.innerHTML = `
        <div class="bg-primary text-white rounded-2xl rounded-tr-none p-3 max-w-[80%]">
          <p class="text-sm">${text}</p>
        </div>
        <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
          <span class="material-symbols-outlined text-white text-sm">person</span>
        </div>
      `
    } else {
      messageDiv.innerHTML = `
        <div class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
          <span class="material-symbols-outlined text-primary text-sm">eco</span>
        </div>
        <div class="bg-primary/10 rounded-2xl rounded-tl-none p-3 max-w-[80%]">
          <p class="text-sm text-text-light dark:text-text-dark whitespace-pre-line">${text}</p>
        </div>
      `
    }
    
    messagesContainer.appendChild(messageDiv)
    messagesContainer.scrollTop = messagesContainer.scrollHeight
  }
  
  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault()
    
    const message = input.value.trim()
    if (!message) return
    
    // Add user message
    addMessage(message, true)
    input.value = ''
    
    // Show typing indicator
    typingIndicator.classList.remove('hidden')
    
    try {
      // Get AI response
      const result = await getChatResponse(message, conversationHistory)
      
      // Hide typing indicator
      typingIndicator.classList.add('hidden')
      
      if (result.success) {
        addMessage(result.message)
        
        // Update conversation history
        conversationHistory.push(
          { role: 'user', parts: [{ text: message }] },
          { role: 'model', parts: [{ text: result.message }] }
        )
      } else {
        addMessage('Sorry, I encountered an error. Please try again.')
        console.error('AI Error:', result.error)
      }
    } catch (error) {
      typingIndicator.classList.add('hidden')
      addMessage('Sorry, I encountered an error. Please try again.')
      console.error('Chat error:', error)
    }
  }
  
  // Event listeners
  toggleBtn.addEventListener('click', toggleChat)
  closeBtn.addEventListener('click', toggleChat)
  form.addEventListener('submit', handleSubmit)
  
  return widget
}

// Initialize AI Assistant globally
export function initAIAssistant() {
  const assistant = AIAssistant()
  document.body.appendChild(assistant)
}
