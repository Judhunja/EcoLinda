// Sustainability Tips & Notifications Service
import { generateContent } from './gemini.js'

export class NotificationsAPI {
  constructor() {
    this.tipsCache = []
    this.lastTipDate = null
  }

  async getDailySustainabilityTip() {
    try {
      const tip = this.getDefaultTip()
      this.storeNotification(tip)
      return tip
    } catch (error) {
      console.error('Error generating tip:', error)
      return this.getDefaultTip()
    }
  }

  getDefaultTips() {
    const now = new Date().toISOString()
    return [
      {
        id: 1,
        type: 'soil_health',
        title: 'Rotate Your Crops for Healthier Soil',
        message: 'Switch between legumes and cereals each season. Beans and peas naturally fix nitrogen, reducing fertilizer needs by 30-40% while breaking pest cycles.',
        icon: 'agriculture',
        timestamp: now,
        priority: 'normal',
        read: false
      },
      {
        id: 2,
        type: 'water_conservation',
        title: 'Harvest Rainwater This Season',
        message: 'Install simple rain gutters and storage drums. Every 25mm of rain on 100m² roof gives 2,500 liters of water—enough for your vegetable garden during dry spells.',
        icon: 'water_drop',
        timestamp: now,
        priority: 'normal',
        read: false
      },
      {
        id: 3,
        type: 'climate_adaptation',
        title: 'Agroforestry Beats Climate Extremes',
        message: 'Integrate fruit trees like mango or avocado with your crops. They provide shade, reduce temperature by 5°C, and create multiple income streams for your family.',
        icon: 'park',
        timestamp: now,
        priority: 'normal',
        read: false
      },
      {
        id: 4,
        type: 'erosion_control',
        title: 'Build Living Barriers with Vetiver',
        message: 'Plant vetiver grass strips every 10 meters downslope. Its deep roots (3+ meters) hold soil firmly while slowing water runoff by 70%.',
        icon: 'grass',
        timestamp: now,
        priority: 'normal',
        read: false
      },
      {
        id: 5,
        type: 'biodiversity',
        title: 'Create a Pollinator Garden Corner',
        message: 'Dedicate just 5% of your land to wildflowers and native shrubs. Boost pollination rates by 40%, directly increasing yields of tomatoes, beans, and fruits.',
        icon: 'local_florist',
        timestamp: now,
        priority: 'normal',
        read: false
      },
      {
        id: 6,
        type: 'waste_management',
        title: 'Turn Farm Waste into Black Gold',
        message: 'Start composting crop residues, livestock manure, and kitchen scraps. In 3 months, create nutrient-rich organic fertilizer worth 10,000 KES per ton if purchased.',
        icon: 'recycling',
        timestamp: now,
        priority: 'normal',
        read: false
      },
      {
        id: 7,
        type: 'pest_management',
        title: 'Natural Pest Control Works Better',
        message: 'Mix neem leaves, garlic, and chili peppers in water for an organic pesticide. Spray weekly to repel aphids and caterpillars without harming beneficial insects.',
        icon: 'bug_report',
        timestamp: now,
        priority: 'normal',
        read: false
      },
      {
        id: 8,
        type: 'energy_efficiency',
        title: 'Solar Drying Saves Energy & Money',
        message: 'Build a simple solar dryer with black paint and clear plastic. Preserve your harvest without electricity, reducing post-harvest losses from 40% to under 10%.',
        icon: 'wb_sunny',
        timestamp: now,
        priority: 'normal',
        read: false
      }
    ]
  }

  getDefaultTip() {
    const tips = this.getDefaultTips()
    return tips[Math.floor(Math.random() * tips.length)]
  }

  async getClimateReminders(climateData = null) {
    return []
  }

  async getSDGProgressNotifications(userImpact) {
    return []
  }

  storeNotification(notification) {
    try {
      const stored = JSON.parse(localStorage.getItem('ecolinda_notifications') || '[]')
      stored.unshift(notification)
      const limited = stored.slice(0, 50)
      localStorage.setItem('ecolinda_notifications', JSON.stringify(limited))
    } catch (error) {
      console.error('Error storing notification:', error)
    }
  }

  getAllNotifications() {
    try {
      return JSON.parse(localStorage.getItem('ecolinda_notifications') || '[]')
    } catch (error) {
      console.error('Error retrieving notifications:', error)
      return []
    }
  }

  markAsRead(notificationId) {
    try {
      const notifications = this.getAllNotifications()
      const updated = notifications.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
      localStorage.setItem('ecolinda_notifications', JSON.stringify(updated))
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  markAllAsRead() {
    try {
      const notifications = this.getAllNotifications()
      const updated = notifications.map(notif => ({ ...notif, read: true }))
      localStorage.setItem('ecolinda_notifications', JSON.stringify(updated))
    } catch (error) {
      console.error('Error marking all as read:', error)
    }
  }

  clearAllNotifications() {
    try {
      localStorage.removeItem('ecolinda_notifications')
    } catch (error) {
      console.error('Error clearing notifications:', error)
    }
  }

  getUnreadCount() {
    try {
      const notifications = this.getAllNotifications()
      return notifications.filter(notif => !notif.read).length
    } catch (error) {
      console.error('Error getting unread count:', error)
      return 0
    }
  }
}

export default new NotificationsAPI()
