// Notification Center Component
import { NotificationsAPI } from '../lib/notificationsAPI'
import { router } from '../router'

let notificationAPI = null
let isInitialized = false

export function initNotificationCenter() {
  if (isInitialized) return
  
  notificationAPI = new NotificationsAPI()
  isInitialized = true
  
  // Add notification bell to navbar
  addNotificationBell()
  
  // Load initial notifications
  loadNotifications()
  
  // Check for new notifications periodically
  setInterval(loadNotifications, 300000) // Every 5 minutes
}

function addNotificationBell() {
  // Find navigation in all pages
  const checkAndAddBell = () => {
    const nav = document.querySelector('nav')
    if (!nav || nav.querySelector('#notification-bell')) return
    
    const navContent = nav.querySelector('.max-w-7xl')
    if (!navContent) return
    
    const rightSection = navContent.querySelector('.flex.items-center.gap-3') || 
                         navContent.querySelector('.flex.justify-between.items-center.h-16 > div:last-child')
    
    if (rightSection && !rightSection.querySelector('#notification-bell')) {
      const bellContainer = document.createElement('div')
      bellContainer.className = 'relative'
      bellContainer.innerHTML = `
        <button id="notification-bell" class="relative p-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
          <span class="material-symbols-outlined text-2xl">notifications</span>
          <span id="notification-badge" class="absolute top-0 right-0 hidden w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">0</span>
        </button>
      `
      
      rightSection.prepend(bellContainer)
      
      // Add click handler
      bellContainer.querySelector('#notification-bell').addEventListener('click', toggleNotificationPanel)
    }
  }
  
  // Check now and on navigation
  checkAndAddBell()
  setInterval(checkAndAddBell, 1000) // Check every second for new pages
}

function toggleNotificationPanel() {
  let panel = document.querySelector('#notification-panel')
  
  if (panel) {
    panel.remove()
    return
  }
  
  // Create panel
  panel = document.createElement('div')
  panel.id = 'notification-panel'
  panel.className = 'fixed top-16 right-4 w-96 max-h-[600px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden'
  
  const notifications = notificationAPI.getAllNotifications()
  const unreadCount = notificationAPI.getUnreadCount()
  
  panel.innerHTML = `
    <div class="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-700 text-white p-4">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-bold">Notifications</h3>
        <button id="close-notifications" class="hover:text-gray-200">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      ${unreadCount > 0 ? `
        <div class="mt-2 flex items-center justify-between">
          <span class="text-sm">${unreadCount} unread</span>
          <button id="mark-all-read" class="text-sm underline hover:no-underline">Mark all as read</button>
        </div>
      ` : ''}
    </div>
    
    <div class="overflow-y-auto max-h-[500px]">
      ${notifications.length === 0 ? `
        <div class="p-8 text-center text-gray-500 dark:text-gray-400">
          <span class="material-symbols-outlined text-5xl mb-2">notifications_off</span>
          <p>No notifications yet</p>
        </div>
      ` : notifications.map(notif => `
        <div class="notification-item p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer ${!notif.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}" data-notif-id="${notif.id}">
          <div class="flex items-start gap-3">
            <div class="p-2 ${getNotificationIconBg(notif.type)} rounded-full">
              <span class="material-symbols-outlined ${getNotificationIconColor(notif.type)}">${getNotificationIcon(notif.type)}</span>
            </div>
            <div class="flex-1">
              <div class="flex items-start justify-between">
                <h4 class="font-semibold text-gray-900 dark:text-gray-100 text-sm">${notif.title}</h4>
                ${!notif.read ? '<span class="w-2 h-2 bg-blue-600 rounded-full"></span>' : ''}
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">${notif.message}</p>
              <div class="text-xs text-gray-500 dark:text-gray-500 mt-2">${formatNotificationDate(notif.timestamp)}</div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
    
    <div class="sticky bottom-0 bg-gray-50 dark:bg-gray-900 p-3 border-t border-gray-200 dark:border-gray-700">
      <button id="view-all-notifications" class="w-full py-2 text-primary hover:text-primary-dark font-medium text-sm">
        View All Notifications
      </button>
    </div>
  `
  
  document.body.appendChild(panel)
  
  // Add event listeners
  panel.querySelector('#close-notifications').addEventListener('click', () => panel.remove())
  
  if (panel.querySelector('#mark-all-read')) {
    panel.querySelector('#mark-all-read').addEventListener('click', () => {
      notificationAPI.markAllAsRead()
      panel.remove()
      updateBadge()
    })
  }
  
  panel.querySelectorAll('.notification-item').forEach(item => {
    item.addEventListener('click', () => {
      const notifId = parseInt(item.dataset.notifId)
      handleNotificationClick(notifId)
    })
  })
  
  // Close when clicking outside
  setTimeout(() => {
    document.addEventListener('click', function closePanel(e) {
      if (!panel.contains(e.target) && !e.target.closest('#notification-bell')) {
        panel.remove()
        document.removeEventListener('click', closePanel)
      }
    })
  }, 100)
}

function handleNotificationClick(notifId) {
  notificationAPI.markAsRead(notifId)
  updateBadge()
  
  // Navigate based on notification type
  const notification = notificationAPI.getAllNotifications().find(n => n.id === notifId)
  if (!notification) return
  
  const panel = document.querySelector('#notification-panel')
  if (panel) panel.remove()
  
  // Route to relevant pages
  switch (notification.type) {
    case 'climate':
      router.navigate('/home') // Dashboard with climate data
      break
    case 'sdg':
      router.navigate('/home')
      break
    case 'tip':
      // Could navigate to education page if we had one
      break
  }
}

async function loadNotifications() {
  if (!notificationAPI) return
  
  try {
    // Get daily tip if needed
    const lastTipDate = localStorage.getItem('lastTipDate')
    const today = new Date().toDateString()
    
    if (lastTipDate !== today) {
      await notificationAPI.getDailySustainabilityTip()
      localStorage.setItem('lastTipDate', today)
    }
    
    // Get climate reminders
    await notificationAPI.getClimateReminders()
    
    // Update badge
    updateBadge()
  } catch (error) {
    console.error('Error loading notifications:', error)
  }
}

function updateBadge() {
  const badge = document.querySelector('#notification-badge')
  if (!badge) return
  
  const count = notificationAPI.getUnreadCount()
  
  if (count > 0) {
    badge.textContent = count > 9 ? '9+' : count
    badge.classList.remove('hidden')
  } else {
    badge.classList.add('hidden')
  }
}

function getNotificationIcon(type) {
  const icons = {
    tip: 'lightbulb',
    climate: 'cloud',
    sdg: 'eco',
    alert: 'warning',
    community: 'groups'
  }
  return icons[type] || 'notifications'
}

function getNotificationIconBg(type) {
  const bgs = {
    tip: 'bg-yellow-100 dark:bg-yellow-900/30',
    climate: 'bg-blue-100 dark:bg-blue-900/30',
    sdg: 'bg-green-100 dark:bg-green-900/30',
    alert: 'bg-red-100 dark:bg-red-900/30',
    community: 'bg-purple-100 dark:bg-purple-900/30'
  }
  return bgs[type] || 'bg-gray-100 dark:bg-gray-900/30'
}

function getNotificationIconColor(type) {
  const colors = {
    tip: 'text-yellow-600 dark:text-yellow-400',
    climate: 'text-blue-600 dark:text-blue-400',
    sdg: 'text-green-600 dark:text-green-400',
    alert: 'text-red-600 dark:text-red-400',
    community: 'text-purple-600 dark:text-purple-400'
  }
  return colors[type] || 'text-gray-600 dark:text-gray-400'
}

function formatNotificationDate(timestamp) {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  
  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
  return date.toLocaleDateString()
}

export function showNotificationToast(title, message, type = 'info') {
  const toast = document.createElement('div')
  toast.className = 'fixed top-20 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-4 z-50 max-w-sm animate-slide-in'
  
  toast.innerHTML = `
    <div class="flex items-start gap-3">
      <div class="p-2 ${getNotificationIconBg(type)} rounded-full">
        <span class="material-symbols-outlined ${getNotificationIconColor(type)}">${getNotificationIcon(type)}</span>
      </div>
      <div class="flex-1">
        <h4 class="font-semibold text-gray-900 dark:text-gray-100">${title}</h4>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">${message}</p>
      </div>
      <button class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
  `
  
  document.body.appendChild(toast)
  
  toast.querySelector('button').addEventListener('click', () => toast.remove())
  
  setTimeout(() => {
    toast.style.animation = 'slide-out 0.3s ease-out'
    setTimeout(() => toast.remove(), 300)
  }, 5000)
}
