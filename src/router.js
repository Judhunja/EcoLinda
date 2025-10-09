import { OnboardingPage } from './pages/Onboarding'
import { LoginPage } from './pages/Login'
import { SignupPage } from './pages/Signup'
import { HomePage } from './pages/Home'
import { ForestConservationPage } from './pages/modules/ForestConservation'
import { ForestEducationPage } from './pages/modules/ForestEducation'
import { ForestCampaignsPage } from './pages/modules/ForestCampaigns'
import { SoilHealthPage } from './pages/modules/SoilHealth'
import { supabase } from './lib/supabase'

class Router {
  constructor() {
    this.routes = {
      '/': OnboardingPage,
      '/login': LoginPage,
      '/signup': SignupPage,
      '/home': HomePage,
      '/dashboard': HomePage, // Alias for backward compatibility
      '/forest': ForestConservationPage,
      '/forest/education': ForestEducationPage,
      '/forest/campaigns': ForestCampaignsPage,
      '/soil': SoilHealthPage,
    }
    this.currentPath = window.location.pathname
    this.container = null
  }

  init(container) {
    this.container = container
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
      this.navigate(window.location.pathname, false)
    })
    
    // Initial render
    this.navigate(this.currentPath, false)
  }

  async navigate(path, pushState = true) {
    // Check authentication for protected routes
    const protectedRoutes = ['/home', '/dashboard', '/forest', '/soil', '/biodiversity', '/wetlands']
    const isProtected = protectedRoutes.some(route => path.startsWith(route))
    
    if (isProtected) {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        path = '/login'
      }
    }

    const page = this.routes[path] || this.routes['/']
    this.currentPath = path
    
    if (pushState) {
      window.history.pushState({}, '', path)
    }
    
    if (this.container) {
      this.container.innerHTML = ''
      this.container.appendChild(page())
    }
  }
}

export const router = new Router()
