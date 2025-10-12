// Crop Recommendation Engine
// ML-based crop recommendations considering soil, climate, and sustainability

export class CropRecommendationEngine {
  constructor() {
    this.cropDatabase = this.initializeCropDatabase()
  }

  /**
   * Recommend crops based on soil and climate data
   * @param {Object} soilData - Soil analysis results
   * @param {Object} climateData - Current and forecast weather
   * @returns {Array} Recommended crops with details
   */
  recommendCrops(soilData, climateData) {
    const crops = []
    
    // Score each crop against conditions
    this.cropDatabase.forEach(crop => {
      const score = this.scoreCrop(crop, soilData, climateData)
      
      if (score.total >= 60) {
        crops.push({
          ...crop,
          suitabilityScore: score.total,
          scoreBreakdown: score.breakdown,
          recommendation: this.getRecommendationLevel(score.total),
          warnings: score.warnings,
          advantages: score.advantages
        })
      }
    })
    
    // Sort by suitability score
    crops.sort((a, b) => b.suitabilityScore - a.suitabilityScore)
    
    return crops.slice(0, 10) // Return top 10
  }

  scoreCrop(crop, soilData, climateData) {
    let totalScore = 0
    const breakdown = {}
    const warnings = []
    const advantages = []
    
    // Soil pH compatibility (20 points)
    const pHScore = this.scorePH(crop.requirements.pH, soilData.analysis.pH.value)
    breakdown.pH = pHScore
    totalScore += pHScore
    
    if (pHScore < 10) {
      warnings.push(`Soil pH (${soilData.analysis.pH.value}) is outside optimal range`)
    } else if (pHScore >= 18) {
      advantages.push('Excellent pH match')
    }
    
    // Nutrient requirements (30 points)
    const nutrientScore = this.scoreNutrients(crop.requirements.nutrients, soilData.analysis)
    breakdown.nutrients = nutrientScore
    totalScore += nutrientScore
    
    if (nutrientScore < 15) {
      warnings.push('Soil nutrients may need amendment')
    } else if (nutrientScore >= 25) {
      advantages.push('Soil nutrients are well-suited')
    }
    
    // Climate compatibility (30 points)
    const climateScore = this.scoreClimate(crop.requirements.climate, climateData)
    breakdown.climate = climateScore
    totalScore += climateScore
    
    if (climateScore < 15) {
      warnings.push('Current climate conditions are not ideal')
    } else if (climateScore >= 25) {
      advantages.push('Excellent climate conditions')
    }
    
    // Water availability (10 points)
    const waterScore = this.scoreWater(crop.requirements.water, soilData, climateData)
    breakdown.water = waterScore
    totalScore += waterScore
    
    // Sustainability bonus (10 points)
    const sustainabilityScore = crop.sustainability.score
    breakdown.sustainability = sustainabilityScore
    totalScore += sustainabilityScore
    
    if (sustainabilityScore >= 8) {
      advantages.push('Highly sustainable crop choice')
    }
    
    return {
      total: Math.round(totalScore),
      breakdown: breakdown,
      warnings: warnings,
      advantages: advantages
    }
  }

  scorePH(cropPH, soilPH) {
    const diff = Math.abs(cropPH.optimal - soilPH)
    
    if (diff <= 0.3) return 20
    if (diff <= 0.5) return 18
    if (diff <= 0.8) return 15
    if (diff <= 1.0) return 12
    if (diff <= 1.5) return 8
    return 3
  }

  scoreNutrients(cropNeeds, soilAnalysis) {
    let score = 0
    
    // Nitrogen (10 points)
    const nLevel = cropNeeds.nitrogen
    const soilN = soilAnalysis.nitrogen.value
    
    if (nLevel === 'high' && soilN >= 0.20) score += 10
    else if (nLevel === 'medium' && soilN >= 0.15 && soilN < 0.25) score += 10
    else if (nLevel === 'low' && soilN >= 0.10) score += 10
    else score += 5
    
    // Phosphorus (10 points)
    const pLevel = cropNeeds.phosphorus
    const soilP = soilAnalysis.phosphorus.value
    
    if (pLevel === 'high' && soilP >= 30) score += 10
    else if (pLevel === 'medium' && soilP >= 20 && soilP < 40) score += 10
    else if (pLevel === 'low' && soilP >= 10) score += 10
    else score += 5
    
    // Potassium (10 points)
    const kLevel = cropNeeds.potassium
    const soilK = soilAnalysis.potassium.value
    
    if (kLevel === 'high' && soilK >= 150) score += 10
    else if (kLevel === 'medium' && soilK >= 100 && soilK < 200) score += 10
    else if (kLevel === 'low' && soilK >= 80) score += 10
    else score += 5
    
    return score
  }

  scoreClimate(cropClimate, currentClimate) {
    let score = 0
    
    // Temperature (15 points)
    const temp = currentClimate.temperature
    if (temp >= cropClimate.temperature.min && temp <= cropClimate.temperature.max) {
      score += 15
    } else if (temp >= cropClimate.temperature.min - 3 && temp <= cropClimate.temperature.max + 3) {
      score += 10
    } else {
      score += 3
    }
    
    // Humidity (8 points)
    const humidity = currentClimate.humidity
    if (humidity >= cropClimate.humidity.min && humidity <= cropClimate.humidity.max) {
      score += 8
    } else if (humidity >= cropClimate.humidity.min - 10 && humidity <= cropClimate.humidity.max + 10) {
      score += 5
    } else {
      score += 2
    }
    
    // Rainfall pattern (7 points)
    const rainfall = currentClimate.rainfall || 0
    if (rainfall >= cropClimate.rainfall.min && rainfall <= cropClimate.rainfall.max) {
      score += 7
    } else if (rainfall > 0) {
      score += 4
    } else {
      score += 1
    }
    
    return score
  }

  scoreWater(waterNeeds, soilData, climateData) {
    let score = 0
    
    // Match water needs with availability
    const rainfall = climateData.rainfall || 0
    const hasIrrigation = true // Assume irrigation available
    
    if (waterNeeds === 'high' && (rainfall > 30 || hasIrrigation)) score += 10
    else if (waterNeeds === 'medium' && (rainfall > 10 || hasIrrigation)) score += 10
    else if (waterNeeds === 'low') score += 10
    else score += 5
    
    return score
  }

  getRecommendationLevel(score) {
    if (score >= 85) return { level: 'Excellent', color: 'green', description: 'Highly recommended' }
    if (score >= 75) return { level: 'Very Good', color: 'blue', description: 'Strongly recommended' }
    if (score >= 65) return { level: 'Good', color: 'teal', description: 'Recommended' }
    return { level: 'Fair', color: 'yellow', description: 'Consider with care' }
  }

  /**
   * Initialize comprehensive crop database
   */
  initializeCropDatabase() {
    return [
      // Cereals
      {
        id: 'maize',
        name: 'Maize (Corn)',
        scientificName: 'Zea mays',
        category: 'Cereal',
        image: '🌽',
        requirements: {
          pH: { optimal: 6.0, min: 5.5, max: 7.0 },
          nutrients: { nitrogen: 'high', phosphorus: 'medium', potassium: 'medium' },
          climate: {
            temperature: { min: 18, max: 30, optimal: 25 },
            humidity: { min: 50, max: 80 },
            rainfall: { min: 500, max: 1200 }
          },
          water: 'high'
        },
        growing: {
          season: 'Long rains (March-May) or Short rains (October-December)',
          duration: '90-120 days',
          spacing: '75cm x 25cm',
          plantingDepth: '5cm',
          seedRate: '20-25 kg/ha'
        },
        stages: [
          { stage: 'Germination', duration: '7-10 days', description: 'Seed emergence' },
          { stage: 'Vegetative', duration: '30-40 days', description: 'Leaf and stem growth' },
          { stage: 'Tasseling', duration: '50-60 days', description: 'Flowering begins' },
          { stage: 'Grain Filling', duration: '70-90 days', description: 'Cobs develop' },
          { stage: 'Maturity', duration: '90-120 days', description: 'Ready for harvest' }
        ],
        management: {
          watering: 'Regular watering especially during tasseling and grain filling',
          fertilizer: 'Apply DAP at planting, top-dress with CAN at knee-high',
          weeding: 'First weeding at 3 weeks, second at 6 weeks',
          pestManagement: 'Watch for fall armyworm, stalk borers',
          companion: 'Beans, pumpkins (Three Sisters method)'
        },
        yield: {
          average: '2-4 tons/ha',
          good: '5-7 tons/ha',
          excellent: '8-10 tons/ha'
        },
        sustainability: {
          score: 7,
          benefits: [
            'Excellent for crop rotation',
            'Stalks can be used as mulch or animal feed',
            'Nitrogen fixing when intercropped with legumes'
          ],
          considerations: [
            'High water requirements',
            'Requires adequate fertilization'
          ]
        },
        economics: {
          marketDemand: 'Very High',
          priceRange: '25-40 KES/kg',
          storageLife: '6-12 months with proper drying'
        }
      },
      // Legumes
      {
        id: 'beans',
        name: 'Common Beans',
        scientificName: 'Phaseolus vulgaris',
        category: 'Legume',
        image: '🫘',
        requirements: {
          pH: { optimal: 6.5, min: 6.0, max: 7.5 },
          nutrients: { nitrogen: 'low', phosphorus: 'medium', potassium: 'medium' },
          climate: {
            temperature: { min: 15, max: 27, optimal: 20 },
            humidity: { min: 40, max: 70 },
            rainfall: { min: 400, max: 600 }
          },
          water: 'medium'
        },
        growing: {
          season: 'Both rainy seasons',
          duration: '60-90 days',
          spacing: '50cm x 10cm',
          plantingDepth: '3-5cm',
          seedRate: '40-60 kg/ha'
        },
        stages: [
          { stage: 'Germination', duration: '5-7 days', description: 'Seed emergence' },
          { stage: 'Vegetative', duration: '20-30 days', description: 'Leaf development' },
          { stage: 'Flowering', duration: '30-45 days', description: 'Flowers appear' },
          { stage: 'Pod Formation', duration: '45-60 days', description: 'Pods develop' },
          { stage: 'Maturity', duration: '60-90 days', description: 'Pods ready to harvest' }
        ],
        management: {
          watering: 'Moderate water needed, especially during flowering',
          fertilizer: 'Minimal nitrogen needed (fixes own), phosphorus at planting',
          weeding: 'Keep weed-free in first 4 weeks',
          pestManagement: 'Monitor for bean fly, aphids',
          companion: 'Maize, potatoes, carrots'
        },
        yield: {
          average: '0.5-1 ton/ha',
          good: '1-1.5 tons/ha',
          excellent: '1.5-2 tons/ha'
        },
        sustainability: {
          score: 9,
          benefits: [
            'Fixes atmospheric nitrogen (60-100 kg/ha)',
            'Improves soil fertility for next crop',
            'Low input requirements',
            'Short growing season allows multiple crops',
            'Excellent for soil health'
          ],
          considerations: [
            'Sensitive to waterlogging'
          ]
        },
        economics: {
          marketDemand: 'Very High',
          priceRange: '80-150 KES/kg',
          storageLife: '12 months if properly dried'
        }
      },
      // Root crops
      {
        id: 'sweetpotato',
        name: 'Sweet Potato',
        scientificName: 'Ipomoea batatas',
        category: 'Root Crop',
        image: '🍠',
        requirements: {
          pH: { optimal: 5.8, min: 5.0, max: 6.5 },
          nutrients: { nitrogen: 'medium', phosphorus: 'medium', potassium: 'high' },
          climate: {
            temperature: { min: 20, max: 30, optimal: 25 },
            humidity: { min: 60, max: 90 },
            rainfall: { min: 750, max: 1500 }
          },
          water: 'medium'
        },
        growing: {
          season: 'Both rainy seasons',
          duration: '90-150 days',
          spacing: '90cm x 30cm (ridges)',
          plantingDepth: '10-15cm vine cuttings',
          seedRate: '50,000 vines/ha'
        },
        stages: [
          { stage: 'Establishment', duration: '10-14 days', description: 'Vine rooting' },
          { stage: 'Vegetative', duration: '30-60 days', description: 'Vine spreading' },
          { stage: 'Root Initiation', duration: '60-90 days', description: 'Tubers begin forming' },
          { stage: 'Bulking', duration: '90-120 days', description: 'Tubers enlarge' },
          { stage: 'Maturity', duration: '120-150 days', description: 'Ready for harvest' }
        ],
        management: {
          watering: 'Regular water first 60 days, reduce before harvest',
          fertilizer: 'Apply compost or manure, top-dress with potassium',
          weeding: 'Weed first 2 months, then vines suppress weeds',
          pestManagement: 'Monitor for sweet potato weevil, viruses',
          companion: 'Beans, maize'
        },
        yield: {
          average: '8-12 tons/ha',
          good: '15-20 tons/ha',
          excellent: '25-30 tons/ha'
        },
        sustainability: {
          score: 8,
          benefits: [
            'Excellent ground cover prevents erosion',
            'Tolerates poor soils',
            'Vines can be used as animal feed',
            'Orange varieties rich in Vitamin A',
            'Drought tolerant once established'
          ],
          considerations: [
            'Needs clean planting material to avoid disease'
          ]
        },
        economics: {
          marketDemand: 'High',
          priceRange: '30-60 KES/kg',
          storageLife: '3-6 months in cool, dry place'
        }
      },
      // Vegetables
      {
        id: 'kale',
        name: 'Kale (Sukuma Wiki)',
        scientificName: 'Brassica oleracea',
        category: 'Vegetable',
        image: '🥬',
        requirements: {
          pH: { optimal: 6.5, min: 6.0, max: 7.5 },
          nutrients: { nitrogen: 'high', phosphorus: 'medium', potassium: 'medium' },
          climate: {
            temperature: { min: 15, max: 25, optimal: 18 },
            humidity: { min: 50, max: 80 },
            rainfall: { min: 500, max: 1000 }
          },
          water: 'high'
        },
        growing: {
          season: 'Year-round with irrigation',
          duration: '60-90 days',
          spacing: '45cm x 30cm',
          plantingDepth: '1cm',
          seedRate: '1-2 kg/ha'
        },
        stages: [
          { stage: 'Germination', duration: '5-7 days', description: 'Seedling emergence' },
          { stage: 'Vegetative', duration: '14-30 days', description: 'Leaf growth' },
          { stage: 'Harvesting', duration: '45-90 days', description: 'Continuous leaf harvest' }
        ],
        management: {
          watering: 'Regular watering to keep soil moist',
          fertilizer: 'Side-dress with nitrogen every 3 weeks',
          weeding: 'Regular weeding or use mulch',
          pestManagement: 'Monitor for aphids, caterpillars, diamondback moth',
          companion: 'Onions, aromatic herbs (deter pests)'
        },
        yield: {
          average: '15-20 tons/ha',
          good: '25-30 tons/ha',
          excellent: '35-40 tons/ha'
        },
        sustainability: {
          score: 7,
          benefits: [
            'Can be harvested multiple times',
            'Fast growing (quick returns)',
            'Nutritionally dense',
            'Tolerates various soils'
          ],
          considerations: [
            'Susceptible to pests without proper management',
            'High water requirements'
          ]
        },
        economics: {
          marketDemand: 'Very High',
          priceRange: '20-50 KES/bunch',
          storageLife: '3-5 days fresh'
        }
      },
      // Fruits
      {
        id: 'tomato',
        name: 'Tomato',
        scientificName: 'Solanum lycopersicum',
        category: 'Fruit/Vegetable',
        image: '🍅',
        requirements: {
          pH: { optimal: 6.5, min: 6.0, max: 7.0 },
          nutrients: { nitrogen: 'medium', phosphorus: 'high', potassium: 'high' },
          climate: {
            temperature: { min: 18, max: 27, optimal: 22 },
            humidity: { min: 40, max: 70 },
            rainfall: { min: 500, max: 800 }
          },
          water: 'high'
        },
        growing: {
          season: 'Best in cool season or with irrigation',
          duration: '70-120 days',
          spacing: '60cm x 45cm',
          plantingDepth: 'Transplant seedlings',
          seedRate: '100g seeds/ha (nursery)'
        },
        stages: [
          { stage: 'Nursery', duration: '21-28 days', description: 'Seedling growth' },
          { stage: 'Transplanting', duration: '28 days', description: 'Move to field' },
          { stage: 'Vegetative', duration: '30-50 days', description: 'Plant establishment' },
          { stage: 'Flowering', duration: '50-65 days', description: 'Flowers appear' },
          { stage: 'Fruiting', duration: '70-120 days', description: 'Continuous harvest' }
        ],
        management: {
          watering: 'Consistent watering, avoid water stress',
          fertilizer: 'Apply balanced fertilizer, increase potassium during fruiting',
          weeding: 'Mulch to suppress weeds and conserve moisture',
          pestManagement: 'Monitor for blight, whiteflies, tomato hornworm',
          companion: 'Basil, marigolds, carrots'
        },
        yield: {
          average: '15-25 tons/ha',
          good: '30-40 tons/ha',
          excellent: '50-70 tons/ha'
        },
        sustainability: {
          score: 6,
          benefits: [
            'High value crop',
            'Long harvesting period',
            'Can be grown in greenhouses'
          ],
          considerations: [
            'Disease prone (needs management)',
            'High input requirements',
            'Needs staking/support'
          ]
        },
        economics: {
          marketDemand: 'Very High',
          priceRange: '40-100 KES/kg (seasonal variation)',
          storageLife: '7-14 days fresh'
        }
      },
      // Add more crops...
      {
        id: 'sorghum',
        name: 'Sorghum',
        scientificName: 'Sorghum bicolor',
        category: 'Cereal',
        image: '🌾',
        requirements: {
          pH: { optimal: 6.5, min: 5.5, max: 8.5 },
          nutrients: { nitrogen: 'medium', phosphorus: 'medium', potassium: 'low' },
          climate: {
            temperature: { min: 20, max: 35, optimal: 27 },
            humidity: { min: 30, max: 70 },
            rainfall: { min: 400, max: 800 }
          },
          water: 'low'
        },
        growing: {
          season: 'Suitable for drier areas',
          duration: '90-130 days',
          spacing: '75cm x 15cm',
          plantingDepth: '3-5cm',
          seedRate: '8-12 kg/ha'
        },
        stages: [
          { stage: 'Germination', duration: '7-10 days', description: 'Emergence' },
          { stage: 'Vegetative', duration: '30-50 days', description: 'Growth' },
          { stage: 'Boot Stage', duration: '50-70 days', description: 'Head formation' },
          { stage: 'Flowering', duration: '70-90 days', description: 'Pollination' },
          { stage: 'Maturity', duration: '90-130 days', description: 'Grain ripening' }
        ],
        management: {
          watering: 'Drought tolerant, minimal irrigation needed',
          fertilizer: 'Moderate fertilizer requirements',
          weeding: 'Two weedings sufficient',
          pestManagement: 'Relatively pest resistant, watch for birds',
          companion: 'Cowpeas, groundnuts'
        },
        yield: {
          average: '1-2 tons/ha',
          good: '2-3.5 tons/ha',
          excellent: '4-5 tons/ha'
        },
        sustainability: {
          score: 9,
          benefits: [
            'Excellent drought tolerance',
            'Low input requirements',
            'Tolerates wide pH range',
            'Stalks good for animal feed',
            'Climate-resilient crop',
            'Ideal for arid/semi-arid areas'
          ],
          considerations: [
            'Lower market price than maize'
          ]
        },
        economics: {
          marketDemand: 'Medium-High',
          priceRange: '30-50 KES/kg',
          storageLife: '12+ months'
        }
      }
    ]
  }

  /**
   * Get detailed crop information
   */
  getCropDetails(cropId) {
    return this.cropDatabase.find(crop => crop.id === cropId)
  }

  /**
   * Get crops by category
   */
  getCropsByCategory(category) {
    return this.cropDatabase.filter(crop => crop.category === category)
  }

  /**
   * Get climate-resilient crops
   */
  getClimateResilientCrops() {
    return this.cropDatabase
      .filter(crop => crop.sustainability.score >= 8)
      .sort((a, b) => b.sustainability.score - a.sustainability.score)
  }

  /**
   * Get drought-tolerant crops
   */
  getDroughtTolerantCrops() {
    return this.cropDatabase.filter(crop => crop.requirements.water === 'low')
  }
}
