// Integrated Data Dashboard API
// Aggregates data from soil, climate, and land use APIs

import { SoilHealthAPI } from './soilHealthAPI'
import { ClimateDataAPI } from './climateDataAPI'
import { LandUseDataAPI } from './landUseDataAPI'

export class DashboardDataAPI {
  constructor() {
    this.soilAPI = new SoilHealthAPI()
    this.climateAPI = new ClimateDataAPI()
    this.landUseAPI = new LandUseDataAPI()
  }

  /**
   * Get comprehensive dashboard data for Kenya
   */
  async getKenyaDashboardData() {
    try {
      // Fetch data from all sources
      const [landUseStats, deforestation, soilHotspots, restoration] = await Promise.all([
        this.landUseAPI.getLandUseStats('Kenya'),
        this.landUseAPI.getDeforestationStats(),
        this.landUseAPI.getSoilDegradationHotspots(),
        this.landUseAPI.getRestorationProgress()
      ])

      // Nairobi coordinates for national climate data
      const climateData = await this.climateAPI.getCurrentWeather(-1.286389, 36.817223)

      return {
        overview: {
          totalArea: landUseStats.totalArea,
          lastUpdated: landUseStats.lastUpdated,
          dataQuality: 'good',
          sources: ['NASA MODIS', 'ESA WorldCover', 'OpenWeather', 'National Data']
        },
        landUse: landUseStats.landCover,
        degradation: {
          ...landUseStats.degradation,
          hotspots: soilHotspots
        },
        deforestation: deforestation,
        climate: {
          temperature: climateData.temperature,
          humidity: climateData.humidity,
          rainfall: climateData.description,
          condition: climateData.description
        },
        vegetation: landUseStats.vegetation,
        restoration: restoration
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      throw error
    }
  }

  /**
   * Get regional dashboard data
   */
  async getRegionalDashboardData(regionName, lat, lon) {
    try {
      const [landUse, climate, soilData] = await Promise.all([
        this.landUseAPI.getLandUseStats(regionName),
        this.climateAPI.getCurrentWeather(lat, lon),
        this.soilAPI.analyzeSoilByLocation(lat, lon)
      ])

      return {
        region: regionName,
        landUse: landUse.landCover,
        climate: {
          temperature: climate.temperature,
          humidity: climate.humidity,
          condition: climate.description
        },
        soil: {
          type: soilData.soilType,
          health: soilData.healthScore,
          ph: soilData.pH,
          organicMatter: soilData.organicMatter
        },
        vegetation: landUse.vegetation
      }
    } catch (error) {
      console.error('Error fetching regional dashboard data:', error)
      throw error
    }
  }

  /**
   * Get key metrics for quick overview
   */
  async getKeyMetrics() {
    const data = await this.getKenyaDashboardData()
    
    return {
      forestCover: {
        value: data.landUse.forest.percentage,
        trend: data.landUse.forest.trend,
        change: data.landUse.forest.change
      },
      landDegradation: {
        value: data.degradation.severity.high + data.degradation.severity.moderate,
        label: 'Land affected by degradation',
        severity: 'warning'
      },
      treesPlanted: {
        value: data.restoration.treesPlanted,
        label: 'Trees planted this year',
        trend: 'increasing'
      },
      carbonSequestered: {
        value: data.restoration.carbonSequestered,
        label: 'CO₂ sequestered (tonnes)',
        trend: 'increasing'
      },
      wetlandsProtected: {
        value: data.restoration.wetlandsProtected,
        label: 'Wetlands protected',
        trend: 'stable'
      },
      deforestation: {
        value: data.deforestation.netLoss,
        label: 'Net forest loss (hectares)',
        trend: 'concerning'
      }
    }
  }

  /**
   * Get alerts and warnings
   */
  async getDataAlerts() {
    const data = await this.getKenyaDashboardData()
    const alerts = []

    // Check for critical degradation
    if (data.degradation.severity.high > 10) {
      alerts.push({
        type: 'critical',
        category: 'Land Degradation',
        message: `${data.degradation.severity.high}% of land experiencing high degradation`,
        action: 'Immediate restoration efforts needed'
      })
    }

    // Check deforestation rate
    if (data.deforestation.netLoss > 4000) {
      alerts.push({
        type: 'warning',
        category: 'Deforestation',
        message: `${data.deforestation.netLoss} hectares net forest loss this year`,
        action: 'Strengthen forest protection measures'
      })
    }

    // Check wetlands decline
    if (data.landUse.wetlands.change < -1) {
      alerts.push({
        type: 'warning',
        category: 'Wetlands',
        message: `Wetlands declining at ${Math.abs(data.landUse.wetlands.change)}% per year`,
        action: 'Implement wetland conservation programs'
      })
    }

    // Positive news
    if (data.restoration.treesPlanted > 2000000) {
      alerts.push({
        type: 'success',
        category: 'Restoration',
        message: `${data.restoration.treesPlanted.toLocaleString()} trees planted!`,
        action: 'Continue community engagement'
      })
    }

    return alerts
  }
}
