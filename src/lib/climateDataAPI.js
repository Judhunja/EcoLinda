// Climate Data API Service
// Fetches real-time and forecasted weather data

export class ClimateDataAPI {
  constructor() {
    // Get API key from environment or use demo key
    this.apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY || 'demo_key'
    this.baseURL = 'https://api.openweathermap.org/data/2.5'
  }

  /**
   * Fetch current weather data
   * @param {number} lat - Latitude
   * @param {number} lon - Longitude
   * @returns {Promise<Object>} Current weather data
   */
  async getCurrentWeather(lat, lon) {
    try {
      if (this.apiKey === 'demo_key') {
        return this.generateMockCurrentWeather(lat, lon)
      }
      
      const url = `${this.baseURL}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error('Weather API request failed')
      }
      
      const data = await response.json()
      return this.formatCurrentWeather(data)
    } catch (error) {
      console.error('Climate data error:', error)
      return this.generateMockCurrentWeather(lat, lon)
    }
  }

  /**
   * Fetch 5-day weather forecast
   * @param {number} lat - Latitude
   * @param {number} lon - Longitude
   * @returns {Promise<Object>} Forecast data
   */
  async getForecast(lat, lon) {
    try {
      if (this.apiKey === 'demo_key') {
        return this.generateMockForecast(lat, lon)
      }
      
      const url = `${this.baseURL}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error('Forecast API request failed')
      }
      
      const data = await response.json()
      return this.formatForecast(data)
    } catch (error) {
      console.error('Forecast error:', error)
      return this.generateMockForecast(lat, lon)
    }
  }

  formatCurrentWeather(data) {
    return {
      location: data.name,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: data.wind.speed,
      windDirection: data.wind.deg,
      cloudCover: data.clouds.all,
      visibility: data.visibility / 1000, // Convert to km
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      sunrise: new Date(data.sys.sunrise * 1000),
      sunset: new Date(data.sys.sunset * 1000),
      timestamp: new Date(data.dt * 1000)
    }
  }

  formatForecast(data) {
    const dailyForecasts = []
    
    // Group by day
    const days = {}
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString()
      if (!days[date]) {
        days[date] = []
      }
      days[date].push(item)
    })
    
    // Process each day
    Object.keys(days).slice(0, 5).forEach(date => {
      const dayData = days[date]
      const temps = dayData.map(d => d.main.temp)
      const rainfall = dayData.reduce((sum, d) => sum + (d.rain?.['3h'] || 0), 0)
      
      dailyForecasts.push({
        date: new Date(date),
        tempMin: Math.round(Math.min(...temps)),
        tempMax: Math.round(Math.max(...temps)),
        humidity: Math.round(dayData.reduce((sum, d) => sum + d.main.humidity, 0) / dayData.length),
        rainfall: rainfall,
        windSpeed: Math.round(dayData.reduce((sum, d) => sum + d.wind.speed, 0) / dayData.length),
        description: dayData[Math.floor(dayData.length / 2)].weather[0].description,
        icon: dayData[Math.floor(dayData.length / 2)].weather[0].icon
      })
    })
    
    return dailyForecasts
  }

  generateMockCurrentWeather(lat, lon) {
    // Generate realistic weather for Kenya
    const isCoastal = lon > 39
    const isHighland = lat > -1 && lat < 1
    
    let temp = 25
    let humidity = 65
    let rainfall = 0
    
    if (isCoastal) {
      temp = 28 + Math.random() * 4
      humidity = 75 + Math.random() * 10
    } else if (isHighland) {
      temp = 18 + Math.random() * 8
      humidity = 60 + Math.random() * 15
    } else {
      temp = 30 + Math.random() * 5
      humidity = 40 + Math.random() * 20
    }
    
    // Simulate seasons (Kenya has two rainy seasons)
    const month = new Date().getMonth()
    const isRainySeason = (month >= 2 && month <= 4) || (month >= 9 && month <= 11)
    
    if (isRainySeason && Math.random() > 0.3) {
      rainfall = Math.random() * 50
      humidity = Math.min(95, humidity + 15)
      temp -= 3
    }
    
    const conditions = rainfall > 10 ? 'rainy' : 
                      humidity > 80 ? 'cloudy' : 
                      temp > 28 ? 'sunny' : 'partly_cloudy'
    
    return {
      location: this.getLocationName(lat, lon),
      temperature: Math.round(temp),
      feelsLike: Math.round(temp + (humidity > 70 ? 2 : -1)),
      humidity: Math.round(humidity),
      pressure: 1013 + Math.floor(Math.random() * 20) - 10,
      windSpeed: Math.round(5 + Math.random() * 15),
      windDirection: Math.floor(Math.random() * 360),
      cloudCover: rainfall > 0 ? 80 + Math.floor(Math.random() * 20) : 20 + Math.floor(Math.random() * 40),
      visibility: rainfall > 10 ? 5 + Math.random() * 5 : 10,
      description: conditions,
      icon: this.getWeatherIcon(conditions),
      sunrise: new Date(new Date().setHours(6, 30, 0)),
      sunset: new Date(new Date().setHours(18, 45, 0)),
      timestamp: new Date(),
      rainfall: Math.round(rainfall)
    }
  }

  generateMockForecast(lat, lon) {
    const forecast = []
    const baseWeather = this.generateMockCurrentWeather(lat, lon)
    
    for (let i = 1; i <= 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      
      // Add some variation
      const tempVariation = (Math.random() - 0.5) * 6
      const humidityVariation = (Math.random() - 0.5) * 20
      
      // Simulate weather patterns
      const isRainy = Math.random() > 0.6
      
      forecast.push({
        date: date,
        tempMin: Math.round(baseWeather.temperature - 5 + tempVariation),
        tempMax: Math.round(baseWeather.temperature + 5 + tempVariation),
        humidity: Math.round(Math.max(30, Math.min(95, baseWeather.humidity + humidityVariation))),
        rainfall: isRainy ? Math.round(Math.random() * 50) : 0,
        windSpeed: Math.round(baseWeather.windSpeed + (Math.random() - 0.5) * 10),
        description: isRainy ? 'rainy' : (Math.random() > 0.5 ? 'partly_cloudy' : 'sunny'),
        icon: isRainy ? '10d' : (Math.random() > 0.5 ? '02d' : '01d')
      })
    }
    
    return forecast
  }

  getLocationName(lat, lon) {
    const locations = [
      { name: 'Nairobi', lat: -1.286, lon: 36.817 },
      { name: 'Mombasa', lat: -4.043, lon: 39.668 },
      { name: 'Kisumu', lat: -0.091, lon: 34.768 },
      { name: 'Nakuru', lat: -0.303, lon: 36.080 },
    ]
    
    let nearest = locations[0]
    let minDist = Math.sqrt(Math.pow(lat - locations[0].lat, 2) + Math.pow(lon - locations[0].lon, 2))
    
    locations.forEach(loc => {
      const dist = Math.sqrt(Math.pow(lat - loc.lat, 2) + Math.pow(lon - loc.lon, 2))
      if (dist < minDist) {
        minDist = dist
        nearest = loc
      }
    })
    
    return nearest.name
  }

  getWeatherIcon(condition) {
    const icons = {
      'sunny': '01d',
      'partly_cloudy': '02d',
      'cloudy': '03d',
      'rainy': '10d',
      'stormy': '11d'
    }
    return icons[condition] || '01d'
  }

  /**
   * Generate adaptive farming recommendations based on weather
   */
  getFarmingRecommendations(currentWeather, forecast) {
    const recommendations = []
    
    // Current weather recommendations
    if (currentWeather.temperature > 30) {
      recommendations.push({
        type: 'immediate',
        priority: 'high',
        title: 'High Temperature Alert',
        description: 'Increase irrigation frequency',
        action: 'Water crops early morning or late evening',
        icon: 'wb_sunny'
      })
    }
    
    if (currentWeather.humidity < 40) {
      recommendations.push({
        type: 'immediate',
        priority: 'medium',
        title: 'Low Humidity',
        description: 'Risk of water stress',
        action: 'Apply mulch to retain soil moisture',
        icon: 'water_drop'
      })
    }
    
    if (currentWeather.rainfall > 20) {
      recommendations.push({
        type: 'immediate',
        priority: 'high',
        title: 'Heavy Rainfall',
        description: 'Risk of waterlogging and erosion',
        action: 'Ensure proper drainage, avoid field work',
        icon: 'rainy'
      })
    }
    
    // Forecast-based recommendations
    const upcomingRain = forecast.filter(d => d.rainfall > 5).length
    const avgTemp = forecast.reduce((sum, d) => sum + (d.tempMax + d.tempMin) / 2, 0) / forecast.length
    
    if (upcomingRain === 0 && forecast.length >= 5) {
      recommendations.push({
        type: 'planning',
        priority: 'high',
        title: 'Dry Period Expected',
        description: `No significant rain forecast for next ${forecast.length} days`,
        action: 'Plan irrigation schedule, consider drought-resistant crops',
        icon: 'wb_sunny'
      })
    }
    
    if (upcomingRain >= 4) {
      recommendations.push({
        type: 'planning',
        priority: 'medium',
        title: 'Rainy Period Ahead',
        description: `${upcomingRain} rainy days expected`,
        action: 'Good time for planting, ensure seedbed preparation',
        icon: 'rainy'
      })
    }
    
    if (avgTemp < 15) {
      recommendations.push({
        type: 'planning',
        priority: 'medium',
        title: 'Cool Weather Expected',
        description: 'Temperatures below optimal for most crops',
        action: 'Consider cold-tolerant crops, protect seedlings',
        icon: 'ac_unit'
      })
    }
    
    if (avgTemp > 28) {
      recommendations.push({
        type: 'planning',
        priority: 'medium',
        title: 'Warm Weather Period',
        description: 'Higher than average temperatures',
        action: 'Increase irrigation, provide shade for sensitive crops',
        icon: 'sunny'
      })
    }
    
    return recommendations
  }

  /**
   * Determine best planting window
   */
  getPlantingWindow(forecast, cropRequirements) {
    const windows = []
    
    // Look for sequences of favorable conditions
    for (let i = 0; i < forecast.length - 2; i++) {
      const period = forecast.slice(i, i + 3)
      
      const avgTemp = period.reduce((sum, d) => sum + (d.tempMax + d.tempMin) / 2, 0) / 3
      const totalRain = period.reduce((sum, d) => sum + d.rainfall, 0)
      const avgHumidity = period.reduce((sum, d) => sum + d.humidity, 0) / 3
      
      let score = 0
      let reasons = []
      
      // Temperature check
      if (avgTemp >= cropRequirements.minTemp && avgTemp <= cropRequirements.maxTemp) {
        score += 40
        reasons.push('✓ Optimal temperature')
      } else if (avgTemp >= cropRequirements.minTemp - 5 && avgTemp <= cropRequirements.maxTemp + 5) {
        score += 20
        reasons.push('~ Acceptable temperature')
      }
      
      // Rainfall check
      if (totalRain >= cropRequirements.minRainfall && totalRain <= cropRequirements.maxRainfall) {
        score += 40
        reasons.push('✓ Good rainfall')
      } else if (totalRain > 0) {
        score += 20
        reasons.push('~ Some rainfall')
      }
      
      // Humidity check
      if (avgHumidity >= 50 && avgHumidity <= 70) {
        score += 20
        reasons.push('✓ Optimal humidity')
      }
      
      if (score >= 60) {
        windows.push({
          startDate: period[0].date,
          endDate: period[2].date,
          score: score,
          conditions: {
            avgTemp: Math.round(avgTemp),
            totalRain: Math.round(totalRain),
            avgHumidity: Math.round(avgHumidity)
          },
          reasons: reasons,
          recommendation: score >= 80 ? 'Excellent' : score >= 70 ? 'Very Good' : 'Good'
        })
      }
    }
    
    return windows
  }
}
