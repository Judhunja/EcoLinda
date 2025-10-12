// Soil Health API Service
// Analyzes soil health and provides recommendations

export class SoilHealthAPI {
  constructor() {
    this.baseURL = 'https://api.example.com/soil' // Replace with actual API
  }

  /**
   * Analyze soil health based on geolocation
   * @param {number} lat - Latitude
   * @param {number} lon - Longitude
   * @returns {Promise<Object>} Soil analysis data
   */
  async analyzeSoilByLocation(lat, lon) {
    try {
      // In production, this would call a real soil API
      // For now, we'll generate realistic data based on Kenya's soil types
      
      return this.generateSoilAnalysis(lat, lon)
    } catch (error) {
      console.error('Soil analysis error:', error)
      throw new Error('Failed to analyze soil health')
    }
  }

  /**
   * Test endpoint for developers
   * @param {Object} soilData - Manual soil test data
   * @returns {Promise<Object>} Analysis results
   */
  async testSoilData(soilData) {
    return this.analyzeSoilData(soilData)
  }

  /**
   * Generate soil analysis based on location (Mock implementation)
   */
  generateSoilAnalysis(lat, lon) {
    // Kenya soil types vary by region
    // Highlands: Volcanic soils (high fertility)
    // Rift Valley: Varied (volcanic to alkaline)
    // Coastal: Sandy, acidic
    // Eastern/Northern: Arid, low organic matter
    
    const region = this.determineRegion(lat, lon)
    const soilType = this.getSoilTypeForRegion(region)
    
    return {
      location: {
        latitude: lat,
        longitude: lon,
        region: region,
        county: this.getCounty(lat, lon)
      },
      soilType: soilType,
      analysis: this.generateAnalysisData(soilType),
      recommendations: this.generateRecommendations(soilType),
      healthScore: this.calculateHealthScore(soilType),
      riskFactors: this.identifyRiskFactors(soilType),
      timestamp: new Date().toISOString()
    }
  }

  determineRegion(lat, lon) {
    // Kenya regions based on coordinates
    if (lat > 0 && lon > 35 && lon < 36) return 'Northwestern Highlands'
    if (lat > -1 && lat < 1 && lon > 36 && lon < 38) return 'Central Highlands'
    if (lat < -1 && lat > -2 && lon > 36 && lon < 37) return 'Southern Rift Valley'
    if (lat > -4 && lat < -2 && lon > 39 && lon < 40) return 'Coastal Region'
    if (lat > 1 && lon > 40) return 'Arid and Semi-Arid'
    return 'Mixed Ecological Zone'
  }

  getCounty(lat, lon) {
    // Simplified county determination
    const counties = [
      { name: 'Nairobi', lat: -1.286, lon: 36.817 },
      { name: 'Kiambu', lat: -1.031, lon: 36.868 },
      { name: 'Nakuru', lat: -0.303, lon: 36.080 },
      { name: 'Mombasa', lat: -4.043, lon: 39.668 },
      { name: 'Kisumu', lat: -0.091, lon: 34.768 },
    ]
    
    // Find nearest county
    let nearest = counties[0]
    let minDist = this.distance(lat, lon, counties[0].lat, counties[0].lon)
    
    counties.forEach(county => {
      const dist = this.distance(lat, lon, county.lat, county.lon)
      if (dist < minDist) {
        minDist = dist
        nearest = county
      }
    })
    
    return nearest.name
  }

  distance(lat1, lon1, lat2, lon2) {
    return Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lon1 - lon2, 2))
  }

  getSoilTypeForRegion(region) {
    const soilTypes = {
      'Northwestern Highlands': {
        type: 'Volcanic (Nitisols)',
        fertility: 'High',
        texture: 'Clay loam',
        color: 'Dark reddish brown'
      },
      'Central Highlands': {
        type: 'Volcanic (Andosols)',
        fertility: 'Very High',
        texture: 'Loamy',
        color: 'Dark brown to black'
      },
      'Southern Rift Valley': {
        type: 'Alkaline (Vertisols)',
        fertility: 'Moderate',
        texture: 'Heavy clay',
        color: 'Dark grey'
      },
      'Coastal Region': {
        type: 'Sandy (Arenosols)',
        fertility: 'Low',
        texture: 'Sandy',
        color: 'Light brown'
      },
      'Arid and Semi-Arid': {
        type: 'Arid (Lixisols)',
        fertility: 'Low',
        texture: 'Sandy loam',
        color: 'Reddish brown'
      },
      'Mixed Ecological Zone': {
        type: 'Mixed',
        fertility: 'Moderate',
        texture: 'Loam',
        color: 'Brown'
      }
    }
    
    return soilTypes[region] || soilTypes['Mixed Ecological Zone']
  }

  generateAnalysisData(soilType) {
    // Generate realistic soil parameters based on soil type
    const baseValues = {
      'Volcanic (Nitisols)': { ph: 6.0, n: 0.25, p: 35, k: 180, om: 4.5 },
      'Volcanic (Andosols)': { ph: 6.5, n: 0.30, p: 40, k: 200, om: 5.2 },
      'Alkaline (Vertisols)': { ph: 7.8, n: 0.15, p: 20, k: 250, om: 2.5 },
      'Sandy (Arenosols)': { ph: 5.5, n: 0.08, p: 10, k: 80, om: 1.2 },
      'Arid (Lixisols)': { ph: 7.2, n: 0.10, p: 15, k: 100, om: 1.8 },
      'Mixed': { ph: 6.5, n: 0.18, p: 25, k: 150, om: 3.0 }
    }
    
    const base = baseValues[soilType.type] || baseValues['Mixed']
    
    // Add some variation
    const variation = () => (Math.random() - 0.5) * 0.2
    
    return {
      pH: {
        value: +(base.ph + variation()).toFixed(1),
        status: this.getPHStatus(base.ph),
        optimal: '6.0 - 7.0',
        unit: 'pH scale'
      },
      nitrogen: {
        value: +(base.n + variation() * 0.05).toFixed(2),
        status: this.getNitrogenStatus(base.n),
        optimal: '0.20 - 0.30',
        unit: '% by weight',
        description: 'Essential for leaf growth and green color'
      },
      phosphorus: {
        value: Math.round(base.p + variation() * 10),
        status: this.getPhosphorusStatus(base.p),
        optimal: '30 - 50',
        unit: 'ppm (parts per million)',
        description: 'Critical for root development and flowering'
      },
      potassium: {
        value: Math.round(base.k + variation() * 30),
        status: this.getPotassiumStatus(base.k),
        optimal: '150 - 250',
        unit: 'ppm',
        description: 'Important for disease resistance and fruit quality'
      },
      organicMatter: {
        value: +(base.om + variation() * 0.5).toFixed(1),
        status: this.getOrganicMatterStatus(base.om),
        optimal: '3.0 - 5.0',
        unit: '% by weight',
        description: 'Improves soil structure and water retention'
      },
      texture: soilType.texture,
      color: soilType.color,
      drainage: this.getDrainage(soilType.texture),
      waterHoldingCapacity: this.getWaterCapacity(soilType.texture),
      cationExchangeCapacity: this.getCEC(soilType.type)
    }
  }

  getPHStatus(ph) {
    if (ph < 5.5) return { level: 'Very Acidic', color: 'red', action: 'Add lime' }
    if (ph < 6.0) return { level: 'Acidic', color: 'orange', action: 'Consider liming' }
    if (ph <= 7.0) return { level: 'Optimal', color: 'green', action: 'Maintain' }
    if (ph <= 7.5) return { level: 'Slightly Alkaline', color: 'yellow', action: 'Monitor' }
    return { level: 'Alkaline', color: 'orange', action: 'Add sulfur or organic matter' }
  }

  getNitrogenStatus(n) {
    if (n < 0.10) return { level: 'Very Low', color: 'red', action: 'Apply nitrogen fertilizer' }
    if (n < 0.20) return { level: 'Low', color: 'orange', action: 'Add compost or manure' }
    if (n <= 0.30) return { level: 'Good', color: 'green', action: 'Maintain' }
    return { level: 'High', color: 'green', action: 'No action needed' }
  }

  getPhosphorusStatus(p) {
    if (p < 15) return { level: 'Very Low', color: 'red', action: 'Apply phosphate fertilizer' }
    if (p < 30) return { level: 'Low', color: 'orange', action: 'Add bone meal or rock phosphate' }
    if (p <= 50) return { level: 'Good', color: 'green', action: 'Maintain' }
    return { level: 'High', color: 'green', action: 'No action needed' }
  }

  getPotassiumStatus(k) {
    if (k < 100) return { level: 'Very Low', color: 'red', action: 'Apply potash fertilizer' }
    if (k < 150) return { level: 'Low', color: 'orange', action: 'Add wood ash or compost' }
    if (k <= 250) return { level: 'Good', color: 'green', action: 'Maintain' }
    return { level: 'High', color: 'green', action: 'No action needed' }
  }

  getOrganicMatterStatus(om) {
    if (om < 2.0) return { level: 'Very Low', color: 'red', action: 'Urgent: Add compost' }
    if (om < 3.0) return { level: 'Low', color: 'orange', action: 'Add organic matter regularly' }
    if (om <= 5.0) return { level: 'Good', color: 'green', action: 'Maintain with cover crops' }
    return { level: 'Excellent', color: 'green', action: 'Keep up good practices' }
  }

  getDrainage(texture) {
    if (texture.includes('Sand')) return 'Excellent - May need frequent irrigation'
    if (texture.includes('Clay')) return 'Poor - May need drainage improvement'
    return 'Good - Well balanced'
  }

  getWaterCapacity(texture) {
    if (texture.includes('Sand')) return 'Low (10-15%)'
    if (texture.includes('Clay')) return 'High (35-40%)'
    return 'Medium (20-30%)'
  }

  getCEC(soilType) {
    // Cation Exchange Capacity
    if (soilType.includes('Volcanic')) return { value: '25-35', level: 'High' }
    if (soilType.includes('Clay')) return { value: '30-40', level: 'Very High' }
    if (soilType.includes('Sandy')) return { value: '5-10', level: 'Low' }
    return { value: '15-25', level: 'Medium' }
  }

  generateRecommendations(soilType) {
    const recommendations = {
      immediate: [],
      shortTerm: [],
      longTerm: [],
      seasonal: []
    }

    // Immediate actions based on soil type
    if (soilType.fertility === 'Low') {
      recommendations.immediate.push({
        action: 'Soil Amendment',
        description: 'Add 2-3 tons of well-decomposed compost per acre',
        priority: 'High',
        cost: 'Low',
        impact: 'Increases organic matter and fertility'
      })
    }

    if (soilType.texture.includes('Sand')) {
      recommendations.immediate.push({
        action: 'Improve Water Retention',
        description: 'Apply organic mulch (4-6 inches thick)',
        priority: 'High',
        cost: 'Low',
        impact: 'Reduces water loss and erosion'
      })
    }

    if (soilType.texture.includes('Clay')) {
      recommendations.immediate.push({
        action: 'Improve Drainage',
        description: 'Create raised beds or add gypsum',
        priority: 'Medium',
        cost: 'Medium',
        impact: 'Prevents waterlogging'
      })
    }

    // Short-term (1-3 months)
    recommendations.shortTerm.push({
      action: 'Cover Cropping',
      description: 'Plant legumes (beans, peas) to fix nitrogen',
      priority: 'High',
      cost: 'Low',
      impact: 'Improves soil fertility naturally'
    })

    recommendations.shortTerm.push({
      action: 'Composting System',
      description: 'Start a composting pit for farm waste',
      priority: 'Medium',
      cost: 'Very Low',
      impact: 'Continuous source of organic matter'
    })

    // Long-term (6-12 months)
    recommendations.longTerm.push({
      action: 'Agroforestry',
      description: 'Plant trees alongside crops (e.g., Grevillea, Leucaena)',
      priority: 'Medium',
      cost: 'Medium',
      impact: 'Improves soil structure, reduces erosion, diversifies income'
    })

    recommendations.longTerm.push({
      action: 'Crop Rotation',
      description: 'Rotate crops to prevent nutrient depletion',
      priority: 'High',
      cost: 'None',
      impact: 'Maintains soil health and breaks pest cycles'
    })

    // Seasonal
    recommendations.seasonal.push({
      action: 'Pre-Planting Preparation',
      description: 'Test soil pH and adjust 2 weeks before planting',
      priority: 'High',
      season: 'Before each planting season'
    })

    return recommendations
  }

  calculateHealthScore(soilType) {
    // Score out of 100
    let score = 50 // Base score
    
    if (soilType.fertility === 'Very High') score += 30
    else if (soilType.fertility === 'High') score += 20
    else if (soilType.fertility === 'Moderate') score += 10
    else if (soilType.fertility === 'Low') score -= 10
    
    if (soilType.texture === 'Loamy' || soilType.texture === 'Clay loam') score += 15
    else if (soilType.texture.includes('Sand')) score -= 10
    else if (soilType.texture.includes('Clay')) score -= 5
    
    // Random variation
    score += Math.floor(Math.random() * 10) - 5
    
    return Math.min(Math.max(score, 0), 100)
  }

  identifyRiskFactors(soilType) {
    const risks = []
    
    if (soilType.fertility === 'Low') {
      risks.push({
        risk: 'Nutrient Depletion',
        severity: 'High',
        description: 'Soil lacks essential nutrients for healthy crop growth',
        mitigation: 'Apply organic fertilizers and practice crop rotation'
      })
    }
    
    if (soilType.texture.includes('Sand')) {
      risks.push({
        risk: 'Water Stress',
        severity: 'High',
        description: 'Sandy soil drains quickly, crops may suffer in dry periods',
        mitigation: 'Use mulching and drip irrigation'
      })
      
      risks.push({
        risk: 'Erosion',
        severity: 'Medium',
        description: 'Light soil easily eroded by wind and water',
        mitigation: 'Plant cover crops and maintain vegetation cover'
      })
    }
    
    if (soilType.texture.includes('Clay')) {
      risks.push({
        risk: 'Waterlogging',
        severity: 'Medium',
        description: 'Heavy soil retains too much water',
        mitigation: 'Improve drainage with raised beds'
      })
    }
    
    if (soilType.fertility !== 'Very High') {
      risks.push({
        risk: 'Declining Productivity',
        severity: 'Medium',
        description: 'Continuous farming without adequate inputs',
        mitigation: 'Regular addition of organic matter'
      })
    }
    
    return risks
  }

  /**
   * Analyze manual soil test data
   */
  analyzeSoilData(data) {
    return {
      analysis: {
        pH: {
          value: data.pH,
          status: this.getPHStatus(data.pH)
        },
        nitrogen: {
          value: data.nitrogen,
          status: this.getNitrogenStatus(data.nitrogen)
        },
        phosphorus: {
          value: data.phosphorus,
          status: this.getPhosphorusStatus(data.phosphorus)
        },
        potassium: {
          value: data.potassium,
          status: this.getPotassiumStatus(data.potassium)
        },
        organicMatter: {
          value: data.organicMatter,
          status: this.getOrganicMatterStatus(data.organicMatter)
        }
      },
      healthScore: this.calculateScoreFromData(data),
      recommendations: this.generateRecommendationsFromData(data),
      timestamp: new Date().toISOString()
    }
  }

  calculateScoreFromData(data) {
    let score = 0
    let count = 0
    
    // pH score (optimal 6.0-7.0)
    if (data.pH >= 6.0 && data.pH <= 7.0) score += 20
    else if (data.pH >= 5.5 && data.pH <= 7.5) score += 15
    else score += 5
    count++
    
    // Nitrogen score
    if (data.nitrogen >= 0.20 && data.nitrogen <= 0.30) score += 20
    else if (data.nitrogen >= 0.15) score += 15
    else score += 5
    count++
    
    // Phosphorus score
    if (data.phosphorus >= 30 && data.phosphorus <= 50) score += 20
    else if (data.phosphorus >= 20) score += 15
    else score += 5
    count++
    
    // Potassium score
    if (data.potassium >= 150 && data.potassium <= 250) score += 20
    else if (data.potassium >= 100) score += 15
    else score += 5
    count++
    
    // Organic matter score
    if (data.organicMatter >= 3.0 && data.organicMatter <= 5.0) score += 20
    else if (data.organicMatter >= 2.0) score += 15
    else score += 5
    count++
    
    return Math.round(score)
  }

  generateRecommendationsFromData(data) {
    const recs = []
    
    if (data.pH < 6.0) recs.push('Apply agricultural lime to raise pH')
    if (data.pH > 7.5) recs.push('Add sulfur or organic matter to lower pH')
    if (data.nitrogen < 0.15) recs.push('Apply nitrogen-rich fertilizer or compost')
    if (data.phosphorus < 20) recs.push('Apply phosphate fertilizer or bone meal')
    if (data.potassium < 100) recs.push('Apply potash fertilizer or wood ash')
    if (data.organicMatter < 2.0) recs.push('Urgently add compost or manure')
    
    return recs
  }
}
