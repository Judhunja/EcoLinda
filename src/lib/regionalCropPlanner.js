// Regional Crop Planner for Kenya
// Educational system for region-specific sustainable crop planning

export class RegionalCropPlanner {
  constructor() {
    this.regions = this.initializeKenyaRegions()
    this.crops = this.initializeCropLibrary()
    this.educationalContent = this.initializeEducation()
  }

  /**
   * Get all Kenya regions with details
   */
  getRegions() {
    return this.regions
  }

  /**
   * Get crops suitable for a specific region
   * @param {string} regionId - Region identifier
   * @returns {Array} Suitable crops with tips
   */
  getCropsForRegion(regionId) {
    const region = this.regions.find(r => r.id === regionId)
    if (!region) return []

    return this.crops.filter(crop => 
      crop.suitableRegions.includes(regionId)
    ).map(crop => ({
      ...crop,
      regionalTips: this.getRegionalTips(crop.id, regionId),
      expectedYield: this.getRegionalYield(crop.id, regionId),
      challenges: this.getRegionalChallenges(crop.id, regionId)
    }))
  }

  /**
   * Get detailed growing guide for a crop in specific region
   * @param {string} cropId - Crop identifier
   * @param {string} regionId - Region identifier
   * @returns {Object} Comprehensive growing guide
   */
  getCropGuide(cropId, regionId) {
    const crop = this.crops.find(c => c.id === cropId)
    const region = this.regions.find(r => r.id === regionId)
    
    if (!crop || !region) return null

    return {
      crop: crop,
      region: region,
      suitability: this.calculateSuitability(crop, region),
      timing: this.getPlantingCalendar(crop, region),
      preparation: this.getSoilPreparation(crop, region),
      planting: this.getPlantingGuide(crop, region),
      maintenance: this.getMaintenanceGuide(crop, region),
      harvesting: this.getHarvestingGuide(crop, region),
      sustainability: this.getSustainabilityPractices(crop, region),
      education: this.getEducationalContent(crop.id),
      economics: this.getEconomicAnalysis(crop, region),
      troubleshooting: this.getTroubleshooting(crop.id)
    }
  }

  /**
   * Initialize Kenya's agricultural regions
   */
  initializeKenyaRegions() {
    return [
      {
        id: 'central-highlands',
        name: 'Central Highlands',
        counties: ['Kiambu', 'Murang\'a', 'Nyeri', 'Kirinyaga', 'Embu', 'Meru'],
        coordinates: { lat: -0.5, lon: 37.0 },
        description: 'Fertile volcanic soils, high rainfall, ideal for intensive agriculture',
        elevation: '1,500-2,500m',
        soilType: 'Volcanic (Nitisols)',
        rainfall: '1,000-2,000mm/year',
        temperature: '15-25°C',
        characteristics: {
          soil: {
            type: 'Deep, well-drained volcanic soils',
            pH: '5.5-6.5',
            fertility: 'High',
            organicMatter: 'High (3-5%)'
          },
          climate: {
            pattern: 'Bimodal (Two rainy seasons)',
            longRains: 'March-May',
            shortRains: 'October-December',
            reliability: 'Very reliable'
          },
          challenges: ['Soil erosion on slopes', 'Land fragmentation', 'High input costs'],
          advantages: ['High fertility', 'Reliable rainfall', 'Good market access', 'Strong extension services']
        },
        bestCrops: ['tea', 'coffee', 'maize', 'beans', 'irish-potato', 'vegetables'],
        icon: '⛰️'
      },
      {
        id: 'rift-valley',
        name: 'Rift Valley',
        counties: ['Nakuru', 'Uasin Gishu', 'Narok', 'Kajiado', 'Baringo', 'Elgeyo Marakwet'],
        coordinates: { lat: 0.0, lon: 36.0 },
        description: 'Diverse agro-ecological zones from highlands to semi-arid lowlands',
        elevation: '1,000-3,000m',
        soilType: 'Varied (Volcanic to Alkaline)',
        rainfall: '400-1,500mm/year',
        temperature: '12-28°C',
        characteristics: {
          soil: {
            type: 'Varied - volcanic in highlands, alkaline in lowlands',
            pH: '6.0-8.0',
            fertility: 'Moderate to High',
            organicMatter: 'Moderate (2-4%)'
          },
          climate: {
            pattern: 'Varied - bimodal in highlands, erratic in lowlands',
            longRains: 'March-June',
            shortRains: 'October-November',
            reliability: 'Moderate to high'
          },
          challenges: ['Variable rainfall', 'Soil alkalinity in lowlands', 'Occasional droughts'],
          advantages: ['Large scale farming possible', 'Diverse crop options', 'Good infrastructure']
        },
        bestCrops: ['wheat', 'maize', 'barley', 'pyrethrum', 'dairy', 'horticulture'],
        icon: '🏔️'
      },
      {
        id: 'western',
        name: 'Western Kenya',
        counties: ['Kakamega', 'Bungoma', 'Busia', 'Vihiga', 'Siaya'],
        coordinates: { lat: 0.3, lon: 34.5 },
        description: 'High rainfall, dense population, mixed farming',
        elevation: '1,200-2,000m',
        soilType: 'Ferralsols (Lateritic)',
        rainfall: '1,200-2,000mm/year',
        temperature: '18-28°C',
        characteristics: {
          soil: {
            type: 'Tropical ferralsols with good structure',
            pH: '5.0-6.5',
            fertility: 'Moderate',
            organicMatter: 'Moderate (2-3%)'
          },
          climate: {
            pattern: 'Bimodal with long rainy season',
            longRains: 'March-June',
            shortRains: 'September-November',
            reliability: 'High'
          },
          challenges: ['Land pressure', 'Soil acidity', 'Pests and diseases', 'Post-harvest losses'],
          advantages: ['Reliable rainfall', 'Year-round farming', 'Strong community knowledge']
        },
        bestCrops: ['sugarcane', 'maize', 'beans', 'sweet-potato', 'cassava', 'banana'],
        icon: '🌴'
      },
      {
        id: 'nyanza',
        name: 'Nyanza (Lake Victoria Basin)',
        counties: ['Kisumu', 'Homa Bay', 'Migori', 'Kisii', 'Nyamira'],
        coordinates: { lat: -0.5, lon: 34.5 },
        description: 'Lake influence, high rainfall in highlands, fishing opportunities',
        elevation: '1,100-2,000m',
        soilType: 'Varied (Volcanic in highlands)',
        rainfall: '1,000-2,000mm/year',
        temperature: '18-28°C',
        characteristics: {
          soil: {
            type: 'Volcanic in highlands, lacustrine near lake',
            pH: '5.5-6.8',
            fertility: 'High in highlands',
            organicMatter: 'Moderate to High (2.5-4%)'
          },
          climate: {
            pattern: 'Bimodal with lake influence',
            longRains: 'March-May',
            shortRains: 'September-November',
            reliability: 'High'
          },
          challenges: ['Land fragmentation', 'Soil erosion', 'Climate variability near lake'],
          advantages: ['Diverse farming systems', 'Fish farming integration', 'High fertility in highlands']
        },
        bestCrops: ['tea', 'coffee', 'maize', 'sorghum', 'millet', 'fish-farming'],
        icon: '🌊'
      },
      {
        id: 'coastal',
        name: 'Coastal Region',
        counties: ['Mombasa', 'Kwale', 'Kilifi', 'Tana River', 'Lamu', 'Taita Taveta'],
        coordinates: { lat: -3.5, lon: 39.5 },
        description: 'Tropical climate, sandy soils, coconut and cashew plantations',
        elevation: '0-500m',
        soilType: 'Sandy (Arenosols)',
        rainfall: '500-1,200mm/year',
        temperature: '24-32°C',
        characteristics: {
          soil: {
            type: 'Sandy, acidic, low water retention',
            pH: '4.5-6.0',
            fertility: 'Low to Moderate',
            organicMatter: 'Low (1-2%)'
          },
          climate: {
            pattern: 'Bimodal but erratic',
            longRains: 'April-June',
            shortRains: 'October-December',
            reliability: 'Moderate'
          },
          challenges: ['Sandy soils', 'Low fertility', 'Drought periods', 'Soil acidity', 'Pests'],
          advantages: ['Tropical fruits viable', 'Tourism market', 'Ocean resources', 'Long growing season']
        },
        bestCrops: ['coconut', 'cashew', 'mango', 'cassava', 'green-gram', 'cowpeas'],
        icon: '🏝️'
      },
      {
        id: 'eastern',
        name: 'Eastern (Semi-Arid)',
        counties: ['Machakos', 'Makueni', 'Kitui', 'Tharaka Nithi'],
        coordinates: { lat: -1.5, lon: 38.0 },
        description: 'Semi-arid conditions, drought-tolerant crops essential',
        elevation: '500-1,800m',
        soilType: 'Acrisols/Lixisols',
        rainfall: '300-800mm/year',
        temperature: '20-32°C',
        characteristics: {
          soil: {
            type: 'Sandy to clay loam, moderate drainage',
            pH: '5.5-7.0',
            fertility: 'Low to Moderate',
            organicMatter: 'Low (1-2.5%)'
          },
          climate: {
            pattern: 'Bimodal but unreliable',
            longRains: 'March-May',
            shortRains: 'October-December',
            reliability: 'Low'
          },
          challenges: ['Erratic rainfall', 'Frequent droughts', 'Soil degradation', 'Water scarcity'],
          advantages: ['Adaptation innovations', 'Diverse livelihood systems', 'Drought-tolerant varieties']
        },
        bestCrops: ['sorghum', 'millet', 'green-gram', 'cowpeas', 'pigeon-peas', 'drought-maize'],
        icon: '🏜️'
      },
      {
        id: 'northeastern',
        name: 'Northeastern (Arid)',
        counties: ['Garissa', 'Wajir', 'Mandera', 'Isiolo', 'Marsabit'],
        coordinates: { lat: 2.0, lon: 40.0 },
        description: 'Arid conditions, pastoralism dominant, emerging irrigation',
        elevation: '200-1,000m',
        soilType: 'Arid soils (Lixisols)',
        rainfall: '200-400mm/year',
        temperature: '24-38°C',
        characteristics: {
          soil: {
            type: 'Sandy, low organic matter',
            pH: '6.5-8.0',
            fertility: 'Very Low',
            organicMatter: 'Very Low (<1%)'
          },
          climate: {
            pattern: 'Erratic and unpredictable',
            longRains: 'March-May (unreliable)',
            shortRains: 'October-November (unreliable)',
            reliability: 'Very Low'
          },
          challenges: ['Severe water scarcity', 'High temperatures', 'Poor soils', 'Limited infrastructure'],
          advantages: ['Irrigation potential along rivers', 'Livestock integration', 'Climate-smart innovations']
        },
        bestCrops: ['sorghum', 'millet', 'cowpeas', 'watermelon', 'dates', 'drought-tolerant-varieties'],
        icon: '🌵'
      }
    ]
  }

  /**
   * Initialize comprehensive crop library
   */
  initializeCropLibrary() {
    return [
      // Cereals
      {
        id: 'maize',
        name: 'Maize (Corn)',
        scientificName: 'Zea mays',
        category: 'Cereal',
        icon: '🌽',
        description: 'Staple food crop, high yield potential with proper management',
        suitableRegions: ['central-highlands', 'rift-valley', 'western', 'nyanza', 'eastern'],
        duration: '90-120 days',
        difficulty: 'Moderate',
        waterNeeds: 'High',
        laborIntensity: 'Moderate',
        requirements: {
          pH: { min: 5.5, max: 7.0, optimal: 6.0 },
          rainfall: { min: 500, max: 1200 },
          temperature: { min: 18, max: 30 },
          altitude: { min: 0, max: 2400 }
        },
        varieties: {
          'central-highlands': ['H614', 'H516', 'KH500-24A'],
          'rift-valley': ['H625', 'DH04', 'WE3128'],
          'western': ['H614', 'H516', 'PHB30G19'],
          'nyanza': ['H629', 'H513', 'DK8031'],
          'eastern': ['Katumani', 'Makueni', 'Drought-tolerant hybrids']
        },
        sustainability: {
          soilHealth: 'Depletes nitrogen - requires rotation with legumes',
          waterUse: 'High water consumer - consider drip irrigation',
          biodiversity: 'Monoculture risk - practice intercropping',
          carbonFootprint: 'Moderate - synthetic fertilizer impact',
          climateResilience: 'Moderate - drought-tolerant varieties available'
        }
      },
      {
        id: 'beans',
        name: 'Beans (Common Beans)',
        scientificName: 'Phaseolus vulgaris',
        category: 'Legume',
        icon: '🫘',
        description: 'Protein-rich legume, nitrogen-fixing, excellent for intercropping',
        suitableRegions: ['central-highlands', 'rift-valley', 'western', 'nyanza', 'eastern'],
        duration: '60-90 days',
        difficulty: 'Easy',
        waterNeeds: 'Moderate',
        laborIntensity: 'Low',
        requirements: {
          pH: { min: 5.5, max: 7.0, optimal: 6.5 },
          rainfall: { min: 400, max: 1000 },
          temperature: { min: 15, max: 28 },
          altitude: { min: 0, max: 2100 }
        },
        varieties: {
          'central-highlands': ['Rosecoco', 'Canadian Wonder', 'Wairimu'],
          'rift-valley': ['Nyota', 'Angaza', 'KAT B1'],
          'western': ['Mwitembe', 'GLP2', 'Nyota'],
          'nyanza': ['Rosecoco', 'Wairimu', 'KAT B1'],
          'eastern': ['Katumani', 'KAT B1', 'Drought-tolerant varieties']
        },
        sustainability: {
          soilHealth: 'Excellent - fixes atmospheric nitrogen',
          waterUse: 'Efficient water use',
          biodiversity: 'Promotes soil microorganisms',
          carbonFootprint: 'Low - minimal fertilizer needs',
          climateResilience: 'Good - short duration'
        }
      },
      {
        id: 'sorghum',
        name: 'Sorghum',
        scientificName: 'Sorghum bicolor',
        category: 'Cereal',
        icon: '🌾',
        description: 'Drought-tolerant cereal, ideal for dry areas, nutritious grain',
        suitableRegions: ['rift-valley', 'eastern', 'northeastern', 'nyanza', 'coastal'],
        duration: '90-140 days',
        difficulty: 'Easy',
        waterNeeds: 'Low',
        laborIntensity: 'Low',
        requirements: {
          pH: { min: 5.5, max: 8.5, optimal: 6.5 },
          rainfall: { min: 300, max: 750 },
          temperature: { min: 20, max: 40 },
          altitude: { min: 0, max: 2200 }
        },
        varieties: {
          'rift-valley': ['Gadam', 'Seredo', 'KARI Mtama 1'],
          'eastern': ['Gadam', 'Seredo', 'EARSAM'],
          'northeastern': ['Seredo', 'Serena', 'Local landraces'],
          'nyanza': ['Gadam', 'KARI Mtama 1'],
          'coastal': ['Gadam', 'Seredo', 'EARSAM']
        },
        sustainability: {
          soilHealth: 'Good - extensive root system',
          waterUse: 'Excellent - very efficient',
          biodiversity: 'Supports local bird populations',
          carbonFootprint: 'Very Low - minimal inputs',
          climateResilience: 'Excellent - drought and heat tolerant'
        }
      },
      {
        id: 'irish-potato',
        name: 'Irish Potato',
        scientificName: 'Solanum tuberosum',
        category: 'Tuber',
        icon: '🥔',
        description: 'High-value crop for cooler highlands, good cash crop',
        suitableRegions: ['central-highlands', 'rift-valley'],
        duration: '90-120 days',
        difficulty: 'Moderate',
        waterNeeds: 'High',
        laborIntensity: 'High',
        requirements: {
          pH: { min: 5.0, max: 6.5, optimal: 5.8 },
          rainfall: { min: 800, max: 1200 },
          temperature: { min: 10, max: 25 },
          altitude: { min: 1800, max: 3000 }
        },
        varieties: {
          'central-highlands': ['Shangi', 'Dutch Robjin', 'Tigoni', 'Kenya Baraka'],
          'rift-valley': ['Shangi', 'Sherekea', 'Unica']
        },
        sustainability: {
          soilHealth: 'Moderate - heavy feeder',
          waterUse: 'High water requirement',
          biodiversity: 'Prone to diseases - needs management',
          carbonFootprint: 'Moderate to High - inputs and storage',
          climateResilience: 'Low - sensitive to heat and drought'
        }
      },
      {
        id: 'sweet-potato',
        name: 'Sweet Potato',
        scientificName: 'Ipomoea batatas',
        category: 'Tuber',
        icon: '🍠',
        description: 'Nutritious orange-fleshed varieties, drought-tolerant',
        suitableRegions: ['central-highlands', 'western', 'nyanza', 'eastern', 'coastal'],
        duration: '90-150 days',
        difficulty: 'Easy',
        waterNeeds: 'Moderate',
        laborIntensity: 'Low',
        requirements: {
          pH: { min: 5.5, max: 7.0, optimal: 6.0 },
          rainfall: { min: 500, max: 1000 },
          temperature: { min: 20, max: 30 },
          altitude: { min: 0, max: 2000 }
        },
        varieties: {
          'central-highlands': ['Kabode', 'Ejumula', 'Vita'],
          'western': ['SPK004', 'Ejumula', 'Kabode'],
          'nyanza': ['Vita', 'SPK004', 'Ejumula'],
          'eastern': ['Kabode', 'Local varieties'],
          'coastal': ['SPK004', 'Local varieties']
        },
        sustainability: {
          soilHealth: 'Good - ground cover reduces erosion',
          waterUse: 'Efficient - drought tolerant',
          biodiversity: 'Excellent ground cover',
          carbonFootprint: 'Low - minimal inputs',
          climateResilience: 'Good - adapts to variable conditions'
        }
      },
      {
        id: 'kale',
        name: 'Kale (Sukuma Wiki)',
        scientificName: 'Brassica oleracea',
        category: 'Vegetable',
        icon: '🥬',
        description: 'Popular leafy vegetable, quick-growing, multiple harvests',
        suitableRegions: ['central-highlands', 'rift-valley', 'western', 'nyanza', 'eastern'],
        duration: '45-60 days to first harvest',
        difficulty: 'Easy',
        waterNeeds: 'Moderate',
        laborIntensity: 'Low',
        requirements: {
          pH: { min: 5.5, max: 7.5, optimal: 6.5 },
          rainfall: { min: 400, max: 1000 },
          temperature: { min: 15, max: 25 },
          altitude: { min: 0, max: 2400 }
        },
        varieties: {
          'central-highlands': ['Thousand Headed', 'Tall Scotch', 'Marrow Stem'],
          'rift-valley': ['Thousand Headed', 'Local varieties'],
          'western': ['Local varieties', 'Improved selections'],
          'nyanza': ['Local varieties', 'Thousand Headed'],
          'eastern': ['Local varieties', 'Drought-adapted']
        },
        sustainability: {
          soilHealth: 'Moderate - requires nutrients',
          waterUse: 'Moderate efficiency',
          biodiversity: 'Attracts beneficial insects',
          carbonFootprint: 'Low - quick growth cycle',
          climateResilience: 'Moderate - heat sensitive'
        }
      },
      {
        id: 'tomato',
        name: 'Tomato',
        scientificName: 'Solanum lycopersicum',
        category: 'Vegetable',
        icon: '🍅',
        description: 'High-value cash crop, requires careful management',
        suitableRegions: ['central-highlands', 'rift-valley', 'nyanza', 'eastern'],
        duration: '70-90 days',
        difficulty: 'Moderate to High',
        waterNeeds: 'High',
        laborIntensity: 'High',
        requirements: {
          pH: { min: 6.0, max: 7.0, optimal: 6.5 },
          rainfall: { min: 500, max: 800 },
          temperature: { min: 18, max: 27 },
          altitude: { min: 0, max: 2100 }
        },
        varieties: {
          'central-highlands': ['Anna F1', 'Kilele F1', 'Eden F1'],
          'rift-valley': ['Tylka F1', 'Prostar F1', 'Eden F1'],
          'nyanza': ['Anna F1', 'Local varieties'],
          'eastern': ['Heat-tolerant F1 hybrids']
        },
        sustainability: {
          soilHealth: 'Moderate - heavy feeder',
          waterUse: 'High - drip irrigation recommended',
          biodiversity: 'Disease-prone - integrated pest management needed',
          carbonFootprint: 'Moderate - inputs and transport',
          climateResilience: 'Low - sensitive to extremes'
        }
      },
      {
        id: 'cassava',
        name: 'Cassava',
        scientificName: 'Manihot esculenta',
        category: 'Tuber',
        icon: '🌿',
        description: 'Drought-tolerant staple, long-term food security',
        suitableRegions: ['western', 'nyanza', 'coastal', 'eastern'],
        duration: '8-18 months',
        difficulty: 'Easy',
        waterNeeds: 'Low',
        laborIntensity: 'Low',
        requirements: {
          pH: { min: 5.0, max: 7.5, optimal: 6.0 },
          rainfall: { min: 500, max: 1500 },
          temperature: { min: 20, max: 35 },
          altitude: { min: 0, max: 1500 }
        },
        varieties: {
          'western': ['MM96/4271', 'TME14', 'Local varieties'],
          'nyanza': ['MM96/4271', 'TMS 30572'],
          'coastal': ['TMS 30572', 'Local varieties'],
          'eastern': ['TME14', 'MM96/4271']
        },
        sustainability: {
          soilHealth: 'Moderate - can deplete soils if no rotation',
          waterUse: 'Excellent - very drought tolerant',
          biodiversity: 'Good - provides long-term cover',
          carbonFootprint: 'Very Low - minimal inputs',
          climateResilience: 'Excellent - very resilient'
        }
      },
      {
        id: 'green-gram',
        name: 'Green Gram (Mung Bean)',
        scientificName: 'Vigna radiata',
        category: 'Legume',
        icon: '🫛',
        description: 'Short-duration legume, excellent for dry areas',
        suitableRegions: ['eastern', 'rift-valley', 'coastal', 'northeastern'],
        duration: '60-75 days',
        difficulty: 'Easy',
        waterNeeds: 'Low',
        laborIntensity: 'Low',
        requirements: {
          pH: { min: 6.0, max: 7.5, optimal: 6.8 },
          rainfall: { min: 300, max: 600 },
          temperature: { min: 20, max: 35 },
          altitude: { min: 0, max: 1600 }
        },
        varieties: {
          'eastern': ['N26', 'KS20', 'Local varieties'],
          'rift-valley': ['N26', 'KS20'],
          'coastal': ['N26', 'Local varieties'],
          'northeastern': ['N26', 'Local landraces']
        },
        sustainability: {
          soilHealth: 'Excellent - nitrogen fixation',
          waterUse: 'Excellent - very efficient',
          biodiversity: 'Good - supports soil life',
          carbonFootprint: 'Very Low',
          climateResilience: 'Excellent - drought and heat tolerant'
        }
      },
      {
        id: 'cowpeas',
        name: 'Cowpeas',
        scientificName: 'Vigna unguiculata',
        category: 'Legume',
        icon: '🫘',
        description: 'Multipurpose legume, leaves and seeds edible',
        suitableRegions: ['eastern', 'coastal', 'northeastern', 'western'],
        duration: '60-90 days',
        difficulty: 'Easy',
        waterNeeds: 'Low',
        laborIntensity: 'Low',
        requirements: {
          pH: { min: 5.5, max: 7.5, optimal: 6.5 },
          rainfall: { min: 350, max: 700 },
          temperature: { min: 20, max: 35 },
          altitude: { min: 0, max: 1800 }
        },
        varieties: {
          'eastern': ['M66', 'KVU27-1', 'Local varieties'],
          'coastal': ['M66', 'KVU27-1'],
          'northeastern': ['Local landraces', 'M66'],
          'western': ['KVU27-1', 'Local varieties']
        },
        sustainability: {
          soilHealth: 'Excellent - nitrogen fixation and biomass',
          waterUse: 'Excellent - drought tolerant',
          biodiversity: 'Good - diverse uses',
          carbonFootprint: 'Very Low',
          climateResilience: 'Excellent - very adaptable'
        }
      }
    ]
  }

  /**
   * Initialize educational content library
   */
  initializeEducation() {
    return {
      basics: {
        title: 'Sustainable Farming Basics',
        topics: [
          {
            id: 'soil-health',
            title: '🌱 Understanding Soil Health',
            content: `Soil is the foundation of sustainable agriculture. Healthy soil has:
            
• **Good Structure**: Allows roots to penetrate and water to drain
• **Organic Matter**: 3-5% is ideal for most crops
• **Living Organisms**: Billions of microbes, earthworms, and fungi
• **Balanced Nutrients**: N-P-K plus micronutrients
• **Proper pH**: Most crops thrive at pH 6.0-7.0

**How to Build Soil Health:**
1. Add compost or manure annually (5-10 tons/ha)
2. Practice crop rotation
3. Use cover crops during off-season
4. Minimize tillage
5. Add organic mulch
6. Test soil every 2-3 years`,
            importance: 'Critical'
          },
          {
            id: 'water-management',
            title: '💧 Water Management',
            content: `Smart water use is essential for sustainability:

**Water Conservation Techniques:**
• **Mulching**: Reduces evaporation by 50-70%
• **Drip Irrigation**: 90% efficiency vs 40% for flood
• **Rainwater Harvesting**: Collect during rainy season
• **Timing**: Irrigate early morning or evening
• **Soil Moisture Monitoring**: Water when needed, not on schedule

**For Kenya's Conditions:**
- Highland regions: Focus on water storage during dry spells
- Lowlands: Rainwater harvesting and drought-tolerant crops critical
- All regions: Mulching saves water and suppresses weeds`,
            importance: 'Critical'
          },
          {
            id: 'crop-rotation',
            title: '🔄 Crop Rotation Principles',
            content: `Rotation breaks pest and disease cycles while improving soil:

**Basic Rotation Rules:**
1. **Never follow same family** (e.g., don't plant tomato after potato)
2. **Follow heavy feeders with legumes** (maize → beans)
3. **Include deep-rooted crops** (breaks hardpan)
4. **3-4 year rotations** work best

**Example 4-Year Rotation:**
Year 1: Maize (heavy feeder)
Year 2: Beans (nitrogen fixer)
Year 3: Vegetables (moderate feeder)
Year 4: Small grains or fallow

**Benefits:**
✓ Reduces pests by 60-80%
✓ Improves soil structure
✓ Balances nutrient use
✓ Increases yields 15-30%`,
            importance: 'High'
          },
          {
            id: 'pest-management',
            title: '🐛 Integrated Pest Management',
            content: `Manage pests sustainably without heavy chemicals:

**IPM Strategy:**
1. **Prevention**: Healthy soil, resistant varieties, crop rotation
2. **Monitoring**: Scout regularly, know pest lifecycles
3. **Cultural Control**: Timing, spacing, sanitation
4. **Biological Control**: Beneficial insects, biopesticides
5. **Chemical Control**: Last resort, targeted application

**Natural Pest Controls:**
• Neem oil for many insects
• Tithonia/lantana extracts
• Companion planting (marigolds, basil)
• Encourage predators (birds, ladybugs)
• Crop hygiene (remove diseased plants)

**Economic Impact:**
- IPM reduces pesticide costs by 50-70%
- Protects beneficial insects
- Safer produce, premium prices`,
            importance: 'High'
          },
          {
            id: 'climate-adaptation',
            title: '🌍 Climate-Smart Agriculture',
            content: `Adapt farming to changing climate patterns:

**Climate Challenges in Kenya:**
• Unpredictable rainfall
• Longer dry spells
• Higher temperatures
• Extreme weather events

**Adaptation Strategies:**
1. **Diversify Crops**: Don't rely on single crop
2. **Drought-Tolerant Varieties**: Sorghum, millet, cowpeas
3. **Early-Maturing Varieties**: Escape dry spells
4. **Agroforestry**: Trees moderate microclimate
5. **Weather Information**: Use forecasts to plan
6. **Soil Conservation**: Terracing, cover crops

**Building Resilience:**
• Save seeds from adapted plants
• Maintain soil organic matter (water retention)
• Diversify income sources
• Join farmer cooperatives for support`,
            importance: 'Critical'
          }
        ]
      },
      advanced: {
        title: 'Advanced Techniques',
        topics: [
          {
            id: 'composting',
            title: '♻️ Composting for Soil Fertility',
            content: `Make your own organic fertilizer:

**Simple Compost Recipe:**
Materials Needed:
• 3 parts "brown" (dry leaves, straw)
• 1 part "green" (fresh plant material, manure)
• Water
• Air (turn regularly)

**Steps:**
1. Layer materials in a pile 1m x 1m x 1m
2. Add water until moist (like wrung sponge)
3. Turn every 2 weeks
4. Ready in 2-3 months (dark, crumbly, earthy smell)

**What to Compost:**
✓ Crop residues
✓ Kitchen scraps (vegetables)
✓ Manure (aged)
✓ Grass clippings
✓ Coffee grounds

**What NOT to Compost:**
✗ Diseased plants
✗ Meat/dairy
✗ Pet waste
✗ Synthetic materials

**Benefits:**
• Free fertilizer
• Improves soil structure
• Increases water retention
• Reduces waste`,
            importance: 'High'
          },
          {
            id: 'intercropping',
            title: '🌿 Intercropping Systems',
            content: `Grow multiple crops together for better results:

**Proven Combinations:**

**Three Sisters (Maize-Beans-Squash):**
- Maize provides support for beans
- Beans fix nitrogen for maize
- Squash provides ground cover, reduces weeds
- Result: 20-30% higher total yield

**Maize-Bean Intercrop:**
- Plant 2 rows maize, 1 row beans
- Beans add nitrogen
- Better land use efficiency
- Spreads risk

**Tomato-Onion:**
- Onions repel tomato pests
- Different root depths
- Use space efficiently

**Principles:**
1. Mix tall and short crops
2. Deep and shallow roots
3. Different nutrient needs
4. Pest-repelling combinations

**Benefits:**
✓ Higher total yield per area
✓ Better pest control
✓ Soil improvement
✓ Risk reduction
✓ Continuous harvests`,
            importance: 'Moderate'
          },
          {
            id: 'agroforestry',
            title: '🌳 Agroforestry Integration',
            content: `Integrate trees with crops for multiple benefits:

**Tree Functions on Farms:**
• Nitrogen fixation (legume trees)
• Windbreaks
• Shade for crops/animals
• Timber and fuel
• Fruit and fodder
• Soil conservation

**Recommended Trees for Kenya:**

**Nitrogen-Fixing:**
• Calliandra (fodder, firewood)
• Leucaena (protein-rich leaves)
• Gliricidia (green manure)
• Sesbania (fast-growing)

**Fruit Trees:**
• Mango (lowlands)
• Avocado (highlands)
• Pawpaw (everywhere)
• Citrus (medium altitude)

**Spacing Strategies:**
• Boundary planting (property lines)
• Alley cropping (tree rows with crops between)
• Scattered trees (individual trees in fields)
• Woodlots (separate tree plots)

**Benefits:**
✓ Additional income
✓ Improved microclimate
✓ Reduced erosion
✓ Carbon sequestration
✓ Biodiversity habitat`,
            importance: 'High'
          }
        ]
      },
      sdg: {
        title: 'SDG 15: Life on Land',
        content: `How sustainable farming supports global goals:

**SDG 15 Targets:**
• Combat desertification
• Restore degraded land
• Achieve land degradation neutrality
• Conserve biodiversity
• Protect ecosystems

**Your Farm's Contribution:**

**Target 15.3 - Combat Land Degradation:**
✓ Build soil organic matter
✓ Prevent erosion with cover crops
✓ Practice conservation agriculture
✓ Restore degraded areas

**Target 15.5 - Protect Biodiversity:**
✓ Maintain diverse crop varieties
✓ Create habitat for beneficial species
✓ Avoid monocultures
✓ Use native tree species
✓ Minimize chemical use

**Measuring Impact:**
• Soil organic matter increase
• Erosion reduction
• Species diversity on farm
• Water infiltration improvement
• Crop diversity index

**Economic Benefits:**
- Healthier farms = higher yields
- Diverse systems = reduced risk
- Sustainable practices = premium prices
- Long-term productivity = family security`,
        importance: 'Critical'
      }
    }
  }

  // Helper methods for getting region-specific information

  getRegionalTips(cropId, regionId) {
    const tipDatabase = {
      'maize': {
        'central-highlands': [
          'Plant at onset of long rains (March) for best yields',
          'Use hybrid varieties like H614 for altitudes above 1800m',
          'Top-dress with CAN fertilizer at knee-high stage',
          'Watch for maize lethal necrosis disease - use certified seeds'
        ],
        'rift-valley': [
          'Valley bottoms excellent for irrigation maize',
          'Highland areas: plant October-November for short rains',
          'Control striga weed with resistant varieties and hand-pulling',
          'Storage: ensure moisture below 13.5% to prevent aflatoxin'
        ],
        'western': [
          'High disease pressure - use resistant varieties',
          'Excellent rainfall - can get two seasons per year',
          'Control stalk borers with biological control or ash',
          'Good market in local urban centers'
        ],
        'eastern': [
          'Use drought-tolerant varieties like Katumani or Drought Tolerant hybrids',
          'Plant early with first rains - critical timing',
          'Mulch heavily to conserve moisture',
          'Consider micro-dosing fertilizer for better efficiency'
        ]
      },
      'beans': {
        'central-highlands': [
          'Bush beans work well at high altitudes',
          'Can intercrop with maize for better land use',
          'Watch for halo blight in humid conditions',
          'Good prices when sold dry'
        ],
        'western': [
          'Excellent conditions for multiple harvests',
          'Rosecoco variety very popular in local markets',
          'Control root rot with crop rotation',
          'Green beans viable for export market'
        ]
      },
      'sorghum': {
        'eastern': [
          'Excellent drought tolerance - ideal crop for this region',
          'Gadam variety matures in 90-110 days',
          'Can be intercropped with cowpeas or green gram',
          'Good brewing market available'
        ],
        'northeastern': [
          'One of few grain crops reliable in this climate',
          'Local varieties very adapted to heat',
          'Bird damage can be issue - traditional scarecrows work',
          'Minimal input requirements'
        ]
      }
    }

    return tipDatabase[cropId]?.[regionId] || []
  }

  getRegionalYield(cropId, regionId) {
    const yieldDatabase = {
      'maize': {
        'central-highlands': { average: '3-5 tons/ha', good: '6-8 tons/ha', excellent: '9-12 tons/ha' },
        'rift-valley': { average: '3-5 tons/ha', good: '6-9 tons/ha', excellent: '10-14 tons/ha' },
        'western': { average: '2-4 tons/ha', good: '5-7 tons/ha', excellent: '8-10 tons/ha' },
        'eastern': { average: '1-2 tons/ha', good: '2.5-4 tons/ha', excellent: '5-6 tons/ha' }
      },
      'beans': {
        'central-highlands': { average: '0.8-1.2 tons/ha', good: '1.5-2 tons/ha', excellent: '2.5-3 tons/ha' },
        'western': { average: '0.6-1 ton/ha', good: '1.2-1.8 tons/ha', excellent: '2-2.5 tons/ha' }
      },
      'sorghum': {
        'eastern': { average: '0.8-1.2 tons/ha', good: '1.5-2.5 tons/ha', excellent: '3-4 tons/ha' },
        'northeastern': { average: '0.5-0.8 tons/ha', good: '1-1.5 tons/ha', excellent: '2-2.5 tons/ha' }
      }
    }

    return yieldDatabase[cropId]?.[regionId] || { average: 'Variable', good: 'Consult extension', excellent: 'Depends on management' }
  }

  getRegionalChallenges(cropId, regionId) {
    const challengeDatabase = {
      'maize': {
        'central-highlands': ['Maize lethal necrosis disease', 'Fall armyworm', 'Stalk borers'],
        'western': ['High disease pressure', 'Striga weed', 'Aflatoxin in storage'],
        'eastern': ['Drought stress', 'Unreliable rainfall', 'Striga weed']
      },
      'irish-potato': {
        'central-highlands': ['Late blight disease', 'High input costs', 'Market price fluctuations'],
        'rift-valley': ['Potato cyst nematodes', 'Storage losses', 'Quality requirements for processing']
      }
    }

    return challengeDatabase[cropId]?.[regionId] || []
  }

  calculateSuitability(crop, region) {
    // Calculate suitability score based on multiple factors
    let score = 50 // Base score

    // Check if region is in suitable list
    if (!crop.suitableRegions.includes(region.id)) {
      return {
        score: 30,
        level: 'Not Recommended',
        reason: 'Climate and soil conditions not suitable'
      }
    }

    // Region-specific adjustments
    score += 20 // In suitable list

    // Climate match
    if (region.temperature.includes(crop.requirements.temperature.optimal)) score += 10

    // Rainfall match
    const regionRainfall = parseInt(region.rainfall)
    if (regionRainfall >= crop.requirements.rainfall.min && 
        regionRainfall <= crop.requirements.rainfall.max) {
      score += 10
    }

    // Soil match
    score += 10

    if (score >= 80) return { score, level: 'Highly Suitable', color: 'green' }
    if (score >= 70) return { score, level: 'Suitable', color: 'blue' }
    if (score >= 60) return { score, level: 'Moderately Suitable', color: 'yellow' }
    return { score, level: 'Marginally Suitable', color: 'orange' }
  }

  getPlantingCalendar(crop, region) {
    // Return planting windows based on region's rainfall pattern
    const calendar = {
      'central-highlands': {
        longRains: 'March - April',
        shortRains: 'October - November',
        recommendation: 'Plant at start of rains for best results'
      },
      'rift-valley': {
        longRains: 'March - May',
        shortRains: 'October - November',
        recommendation: 'Timing varies with elevation - consult local extension'
      },
      'western': {
        longRains: 'March - June',
        shortRains: 'September - November',
        recommendation: 'Long rainy season allows extended planting window'
      }
    }

    return calendar[region.id] || {
      recommendation: 'Consult local agricultural extension for planting calendar'
    }
  }

  getSoilPreparation(crop, region) {
    return {
      timing: '2-4 weeks before planting',
      steps: [
        'Clear land of weeds and residues',
        'Test soil pH and nutrients',
        `Add lime if pH below ${crop.requirements.pH.min}`,
        'Incorporate organic matter (compost/manure) at 5-10 tons/ha',
        'Deep tillage for root crops, minimal for conservation',
        'Create raised beds in heavy rainfall areas',
        'Prepare drainage channels if needed'
      ],
      regionalTips: this.getRegionalTips(crop.id, region.id)
    }
  }

  getPlantingGuide(crop, region) {
    return {
      method: crop.category === 'Tuber' ? 'Vegetative (cuttings/tubers)' : 'Seeds',
      spacing: '75cm between rows, 25cm within rows (adjust for crop)',
      depth: crop.category === 'Tuber' ? '10-15cm' : '3-5cm',
      seedRate: 'Varies by variety - see seed packet',
      fertilizer: 'Apply DAP or NPK 23-23-0 at planting',
      tips: [
        'Plant at onset of rains',
        'Ensure good seed-soil contact',
        'Do not plant too deep',
        'Consider seed treatment for pest protection'
      ]
    }
  }

  getMaintenanceGuide(crop, region) {
    return {
      weeding: {
        frequency: '2-3 times per season',
        timing: ['3 weeks after planting', '6 weeks after planting', 'As needed'],
        method: 'Hand weeding, mulching, or careful herbicide use'
      },
      fertilization: {
        basal: 'DAP or NPK at planting',
        topDress: 'CAN at 3-4 weeks for cereals',
        organic: 'Compost tea or manure tea every 2 weeks for vegetables'
      },
      irrigation: {
        critical: crop.waterNeeds === 'High' ? 'Very important' : 'Supplementary',
        method: 'Drip irrigation most efficient, furrow acceptable',
        frequency: 'Keep soil moist but not waterlogged'
      },
      pestDisease: {
        monitoring: 'Scout weekly for pests and diseases',
        prevention: 'Use resistant varieties, crop rotation, field hygiene',
        control: 'IPM approach - biological first, chemical last resort'
      }
    }
  }

  getHarvestingGuide(crop, region) {
    return {
      maturitySigns: [
        crop.category === 'Cereal' ? 'Grain hard, moisture below 20%' : '',
        crop.category === 'Legume' ? 'Pods dry, beans rattle' : '',
        crop.category === 'Vegetable' ? 'Reached marketable size' : '',
        crop.category === 'Tuber' ? 'Leaves yellowing, stems drying' : ''
      ].filter(Boolean),
      method: 'Manual harvesting for most smallholder crops',
      timing: `${crop.duration} after planting`,
      postHarvest: [
        'Dry grain crops to 12-13% moisture',
        'Store in clean, dry, ventilated structures',
        'Use hermetic storage bags to prevent pest damage',
        'Sort and grade for better prices',
        'Consider value addition (processing)'
      ]
    }
  }

  getSustainabilityPractices(crop, region) {
    return {
      soilConservation: [
        'Mulch with crop residues',
        'Contour plowing on slopes',
        'Plant cover crops in off-season',
        'Maintain soil organic matter above 3%'
      ],
      waterConservation: [
        'Drip irrigation where possible',
        'Mulching reduces evaporation',
        'Harvest rainwater during rainy season',
        'Plant early to maximize rainfall use'
      ],
      biodiversity: [
        'Rotate with different crop families',
        'Leave field margins for beneficial insects',
        'Integrate trees on farm boundaries',
        'Maintain diverse cropping systems'
      ],
      climateAction: [
        'Build soil carbon through organic matter',
        'Use improved varieties adapted to changing climate',
        'Diversify crops to spread risk',
        'Join farmer groups for climate information'
      ],
      sdgAlignment: {
        goal15: 'Life on Land - Sustainable land management',
        targets: [
          '15.3 - Combat desertification and restore degraded land',
          '15.5 - Protect biodiversity',
          '15.a - Mobilize resources for sustainable forestry'
        ],
        indicators: [
          'Soil organic carbon increase',
          'Reduction in soil erosion',
          'Crop diversity on farm',
          'Tree cover percentage'
        ]
      }
    }
  }

  getEducationalContent(cropId) {
    return {
      videos: [
        'Sustainable ' + cropId + ' farming techniques',
        'Organic pest management for ' + cropId,
        'Water-wise ' + cropId + ' cultivation'
      ],
      resources: [
        'Ministry of Agriculture extension materials',
        'KALRO research bulletins',
        'FAO good agricultural practices guides',
        'Local farmer field school materials'
      ],
      localExperts: [
        'County agricultural extension officers',
        'KALRO research stations',
        'Farmer cooperative advisors',
        'Agro-dealer technical support'
      ]
    }
  }

  getEconomicAnalysis(crop, region) {
    return {
      costs: {
        seeds: 'Variable - KES 3,000-10,000 per ha',
        fertilizer: 'KES 8,000-15,000 per ha',
        pesticides: 'KES 2,000-8,000 per ha',
        labor: 'KES 10,000-30,000 per ha',
        total: 'KES 25,000-60,000 per ha (varies widely)'
      },
      returns: {
        farmGate: 'Depends on season and quality',
        market: 'Urban markets pay premium for quality',
        value: 'Processing adds 50-200% value',
        breakEven: 'Typically need 60-70% of good yield to break even'
      },
      marketInfo: {
        demand: crop.difficulty === 'Easy' ? 'Stable - staple food' : 'Variable - depends on quality',
        buyers: ['Local markets', 'Cooperatives', 'Processors', 'Export (for some crops)'],
        bestTime: 'Off-season prices 30-50% higher',
        tips: [
          'Join farmer groups for bulk marketing',
          'Invest in quality - premium prices',
          'Consider contracts with processors',
          'Store properly to sell off-season'
        ]
      }
    }
  }

  getTroubleshooting(cropId) {
    return {
      commonProblems: [
        {
          issue: 'Poor germination',
          causes: ['Old seeds', 'Too deep planting', 'Dry soil', 'Seed treatment damage'],
          solutions: ['Use certified seeds', 'Plant shallow', 'Ensure moisture', 'Treat seeds properly']
        },
        {
          issue: 'Yellowing leaves',
          causes: ['Nitrogen deficiency', 'Waterlogging', 'Root damage', 'Disease'],
          solutions: ['Apply nitrogen fertilizer', 'Improve drainage', 'Check for pests', 'Scout for disease']
        },
        {
          issue: 'Poor flowering/fruiting',
          causes: ['Nutrient imbalance', 'Water stress', 'Extreme temperatures', 'Poor pollination'],
          solutions: ['Balance fertilization', 'Regular watering', 'Choose adapted varieties', 'Encourage pollinators']
        },
        {
          issue: 'Low yields',
          causes: ['Poor soil fertility', 'Pest/disease damage', 'Wrong variety', 'Poor management'],
          solutions: ['Soil test and amend', 'Implement IPM', 'Use recommended varieties', 'Follow best practices']
        }
      ],
      getHelp: [
        'Contact county agricultural extension officer',
        'Visit nearest KALRO research station',
        'Consult experienced farmers in your area',
        'Join farmer WhatsApp groups for peer support',
        'Contact agro-dealer technical representatives'
      ]
    }
  }
}
