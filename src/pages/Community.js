// Community Sharing Platform Page
import { router } from '../router'
import { CommunityAPI } from '../lib/communityAPI'

export function CommunityPage() {
  const page = document.createElement('div')
  page.className = 'min-h-screen bg-background-light dark:bg-background-dark'
  
  const communityAPI = new CommunityAPI()
  let currentFilter = 'all'
  let posts = []

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
            <span class="material-symbols-outlined text-primary text-3xl">groups</span>
            <span class="text-xl font-bold text-text-light dark:text-text-dark">Community Hub</span>
          </div>
          <button id="create-post-btn" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2">
            <span class="material-symbols-outlined">add</span>
            <span>Share</span>
          </button>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-8 mb-8 text-white">
        <h1 class="text-4xl font-bold mb-4">🌱 Community Knowledge Sharing</h1>
        <p class="text-xl opacity-90">
          Share your success stories, learn from others, and build a sustainable future together
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Sidebar -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Popular Tags -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h3 class="text-lg font-bold text-text-light dark:text-text-dark mb-4 flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">tag</span>
              Popular Tags
            </h3>
            <div id="tags-container" class="flex flex-wrap gap-2"></div>
          </div>

          <!-- Quick Stats -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h3 class="text-lg font-bold text-text-light dark:text-text-dark mb-4">Community Impact</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Active Posts</span>
                <span class="font-bold text-primary">156</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Members</span>
                <span class="font-bold text-secondary">2,340</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Success Stories</span>
                <span class="font-bold text-accent">89</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content Area -->
        <div class="lg:col-span-3 space-y-6">
          <!-- Filters -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
            <div class="flex flex-wrap gap-3">
              <button class="filter-btn active px-4 py-2 rounded-lg font-medium" data-filter="all">
                All Posts
              </button>
              <button class="filter-btn px-4 py-2 rounded-lg font-medium" data-filter="project">
                🏗️ Projects
              </button>
              <button class="filter-btn px-4 py-2 rounded-lg font-medium" data-filter="technique">
                🔧 Techniques
              </button>
              <button class="filter-btn px-4 py-2 rounded-lg font-medium" data-filter="practice">
                ✅ Practices
              </button>
              <button class="filter-btn px-4 py-2 rounded-lg font-medium" data-filter="idea">
                💡 Ideas
              </button>
              <button id="map-view-btn" class="px-4 py-2 rounded-lg font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 ml-auto">
                <span class="material-symbols-outlined align-middle">map</span>
                Map View
              </button>
            </div>
          </div>

          <!-- Posts Container -->
          <div id="posts-container" class="space-y-4">
            <!-- Posts will be loaded here -->
          </div>

          <!-- Loading State -->
          <div id="loading" class="flex justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    </main>

    <!-- Create Post Modal -->
    <div id="create-post-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden flex items-center justify-center p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div class="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-700 text-white p-6 flex justify-between items-center">
          <h2 class="text-2xl font-bold">Share Your Story</h2>
          <button id="close-create-modal" class="text-white hover:text-gray-200">
            <span class="material-symbols-outlined text-3xl">close</span>
          </button>
        </div>
        <div class="p-6">
          <form id="create-post-form" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type</label>
              <select id="post-type" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700">
                <option value="project">Project - Successful rehabilitation</option>
                <option value="technique">Technique - How-to guide</option>
                <option value="practice">Practice - Climate-smart farming</option>
                <option value="idea">Idea - Innovative solution</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
              <input type="text" id="post-title" placeholder="Give your post a clear title" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700" required>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
              <textarea id="post-content" rows="6" placeholder="Share your story, technique, or idea in detail..." class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700" required></textarea>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location (Optional)</label>
              <input type="text" id="post-location" placeholder="e.g., Meru County" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags (comma-separated)</label>
              <input type="text" id="post-tags" placeholder="agroforestry, soilrestoration, organicfarming" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700">
            </div>
            
            <button type="submit" class="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark font-semibold">
              Share with Community
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Post Detail Modal -->
    <div id="post-detail-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden flex items-center justify-center p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div class="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-700 text-white p-6 flex justify-between items-center">
          <h2 id="detail-title" class="text-2xl font-bold"></h2>
          <button id="close-detail-modal" class="text-white hover:text-gray-200">
            <span class="material-symbols-outlined text-3xl">close</span>
          </button>
        </div>
        <div id="detail-content" class="p-6">
          <!-- Post details will be loaded here -->
        </div>
      </div>
    </div>
  `

  // Load popular tags
  function loadTags() {
    const tagsContainer = page.querySelector('#tags-container')
    const tags = communityAPI.getPopularTags()
    
    tagsContainer.innerHTML = tags.slice(0, 8).map(tag => `
      <button class="tag-btn px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors">
        #${tag.name}
      </button>
    `).join('')

    // Tag click handlers
    page.querySelectorAll('.tag-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tag = btn.textContent.replace('#', '').trim()
        filterPostsByTag(tag)
      })
    })
  }

  // Load posts
  async function loadPosts(filter = 'all') {
    const container = page.querySelector('#posts-container')
    const loading = page.querySelector('#loading')
    
    loading.classList.remove('hidden')
    container.innerHTML = ''

    try {
      // Use mock data for now
      const result = communityAPI.getMockPosts()
      posts = result.posts

      // Apply filter
      const filteredPosts = filter === 'all' 
        ? posts 
        : posts.filter(p => p.type === filter)

      loading.classList.add('hidden')
      displayPosts(filteredPosts)
    } catch (error) {
      console.error('Error loading posts:', error)
      loading.classList.add('hidden')
      container.innerHTML = `
        <div class="text-center py-12 text-red-600 dark:text-red-400">
          <span class="material-symbols-outlined text-5xl mb-2">error</span>
          <p>Failed to load posts</p>
        </div>
      `
    }
  }

  // Display posts
  function displayPosts(postsToDisplay) {
    const container = page.querySelector('#posts-container')
    
    if (postsToDisplay.length === 0) {
      container.innerHTML = `
        <div class="text-center py-12 text-gray-500 dark:text-gray-400">
          <span class="material-symbols-outlined text-5xl mb-2">search_off</span>
          <p>No posts found</p>
        </div>
      `
      return
    }

    container.innerHTML = postsToDisplay.map(post => `
      <div class="post-card bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow cursor-pointer" data-post-id="${post.id}">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <span class="material-symbols-outlined text-primary">person</span>
            </div>
            <div>
              <div class="font-semibold text-gray-900 dark:text-gray-100">${post.user.email.split('@')[0]}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">${formatDate(post.created_at)}</div>
            </div>
          </div>
          <span class="px-3 py-1 rounded-full text-xs font-semibold ${getTypeBadgeClass(post.type)}">${post.type}</span>
        </div>

        <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">${post.title}</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">${post.content}</p>

        ${post.location ? `
          <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <span class="material-symbols-outlined text-sm">location_on</span>
            <span>${post.location}</span>
          </div>
        ` : ''}

        <div class="flex flex-wrap gap-2 mb-4">
          ${post.tags.slice(0, 3).map(tag => `
            <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">#${tag}</span>
          `).join('')}
        </div>

        <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center gap-4">
            <button class="vote-btn flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors" data-post-id="${post.id}" data-vote="up">
              <span class="material-symbols-outlined">thumb_up</span>
              <span>${post.upvotes}</span>
            </button>
            <button class="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-secondary transition-colors">
              <span class="material-symbols-outlined">comment</span>
              <span>${post.commentCount}</span>
            </button>
          </div>
          <button class="text-primary hover:text-primary-dark font-medium text-sm">
            Read More →
          </button>
        </div>
      </div>
    `).join('')

    // Add click handlers
    page.querySelectorAll('.post-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.vote-btn')) {
          const postId = parseInt(card.dataset.postId)
          showPostDetail(postId)
        }
      })
    })

    // Vote handlers
    page.querySelectorAll('.vote-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation()
        const postId = parseInt(btn.dataset.postId)
        handleVote(postId, btn)
      })
    })
  }

  // Show post detail
  function showPostDetail(postId) {
    const post = posts.find(p => p.id === postId)
    if (!post) return

    const modal = page.querySelector('#post-detail-modal')
    const title = page.querySelector('#detail-title')
    const content = page.querySelector('#detail-content')

    title.textContent = post.title

    content.innerHTML = `
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <span class="material-symbols-outlined text-primary text-xl">person</span>
            </div>
            <div>
              <div class="font-semibold text-gray-900 dark:text-gray-100">${post.user.email.split('@')[0]}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">${formatDate(post.created_at)}</div>
            </div>
          </div>
          <span class="px-3 py-1 rounded-full text-sm font-semibold ${getTypeBadgeClass(post.type)}">${post.type}</span>
        </div>

        <div class="prose dark:prose-invert max-w-none">
          <p class="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">${post.content}</p>
        </div>

        ${post.location ? `
          <div class="flex items-center gap-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <span class="material-symbols-outlined text-blue-600 dark:text-blue-400">location_on</span>
            <span class="text-gray-700 dark:text-gray-300">${post.location}</span>
          </div>
        ` : ''}

        <div class="flex flex-wrap gap-2">
          ${post.tags.map(tag => `
            <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">#${tag}</span>
          `).join('')}
        </div>

        <div class="flex items-center gap-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center gap-2">
            <button class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
              <span class="material-symbols-outlined text-primary">thumb_up</span>
            </button>
            <span class="font-semibold">${post.upvotes}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-gray-600 dark:text-gray-400">comment</span>
            <span class="font-semibold">${post.commentCount} comments</span>
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <h4 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">Add Comment</h4>
          <textarea placeholder="Share your thoughts..." class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700 mb-2" rows="3"></textarea>
          <button class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">Post Comment</button>
        </div>
      </div>
    `

    modal.classList.remove('hidden')
  }

  // Helper functions
  function formatDate(dateString) {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  function getTypeBadgeClass(type) {
    const classes = {
      project: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      technique: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      practice: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      idea: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
    }
    return classes[type] || classes.idea
  }

  function filterPostsByTag(tag) {
    const filtered = posts.filter(p => p.tags.includes(tag))
    displayPosts(filtered)
  }

  function handleVote(postId, button) {
    // Optimistic UI update
    const countSpan = button.querySelector('span:last-child')
    const currentCount = parseInt(countSpan.textContent)
    countSpan.textContent = currentCount + 1
    button.classList.add('text-primary')
  }

  // Event listeners
  page.querySelector('#back-btn').addEventListener('click', () => {
    router.navigate('/home')
  })

  page.querySelector('#create-post-btn').addEventListener('click', () => {
    page.querySelector('#create-post-modal').classList.remove('hidden')
  })

  page.querySelector('#close-create-modal').addEventListener('click', () => {
    page.querySelector('#create-post-modal').classList.add('hidden')
  })

  page.querySelector('#close-detail-modal').addEventListener('click', () => {
    page.querySelector('#post-detail-modal').classList.add('hidden')
  })

  page.querySelector('#map-view-btn').addEventListener('click', () => {
    alert('Map view coming soon! Will show posts plotted on Kenya map by location.')
  })

  // Filter buttons
  page.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      page.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'))
      btn.classList.add('active')
      currentFilter = btn.dataset.filter
      loadPosts(currentFilter)
    })
  })

  // Create post form
  page.querySelector('#create-post-form').addEventListener('submit', async (e) => {
    e.preventDefault()
    
    const postData = {
      type: page.querySelector('#post-type').value,
      title: page.querySelector('#post-title').value,
      content: page.querySelector('#post-content').value,
      location: page.querySelector('#post-location').value,
      tags: page.querySelector('#post-tags').value.split(',').map(t => t.trim()).filter(t => t)
    }

    // Would call API here
    console.log('Creating post:', postData)
    
    page.querySelector('#create-post-modal').classList.add('hidden')
    page.querySelector('#create-post-form').reset()
    
    // Show success message
    alert('Post shared successfully! 🎉')
    
    // Reload posts
    loadPosts(currentFilter)
  })

  // Initialize
  loadTags()
  loadPosts()

  return page
}
