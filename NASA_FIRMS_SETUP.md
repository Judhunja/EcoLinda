# NASA FIRMS API Setup Guide

## Overview
The Deforestation Alerts feature integrates with NASA FIRMS (Fire Information for Resource Management System) to provide real-time fire detection data using satellite imagery.

## Getting Your Free NASA FIRMS API Key

### Step 1: Register for NASA FIRMS
1. Visit: https://firms.modaps.eosdis.nasa.gov/api/
2. Click on "Request Access" or "Get API Key"
3. Fill out the registration form with:
   - Your name
   - Email address
   - Organization (can be personal/individual)
   - Intended use (e.g., "Forest monitoring in Kenya for environmental protection")

### Step 2: Receive Your API Key
- You'll receive an email with your MAP_KEY (API key)
- This key is free and provides access to:
  - **MODIS** - Moderate Resolution Imaging Spectroradiometer
  - **VIIRS** - Visible Infrared Imaging Radiometer Suite
  - Both provide active fire detection data

### Step 3: Configure EcoLinda

#### Option 1: Update the Code Directly
Open `src/pages/modules/DeforestationAlerts.js` and replace:

```javascript
const MAP_KEY = 'a1b2c3d4e5f6' // Replace with your actual key
```

#### Option 2: Use Environment Variables (Recommended)
1. Add to your `.env` file:
```bash
VITE_NASA_FIRMS_API_KEY=your_actual_key_here
```

2. Update the code to use:
```javascript
const MAP_KEY = import.meta.env.VITE_NASA_FIRMS_API_KEY
```

## API Endpoints Available

### 1. Area CSV/JSON (Current Implementation)
```
https://firms.modaps.eosdis.nasa.gov/api/area/csv/{MAP_KEY}/{source}/{bbox}/{day_range}
```

Parameters:
- `source`: MODIS_NRT, MODIS_SP, VIIRS_SNPP_NRT, VIIRS_SNPP_SP, VIIRS_NOAA20_NRT
- `bbox`: west,south,east,north (e.g., 33.8,-4.8,42.0,5.0 for Kenya)
- `day_range`: Number of days (1-10)

Example for Kenya (last 24 hours):
```
https://firms.modaps.eosdis.nasa.gov/api/area/csv/YOUR_KEY/VIIRS_SNPP_NRT/33.8,-4.8,42.0,5.0/1
```

### 2. Country Data
```
https://firms.modaps.eosdis.nasa.gov/api/country/csv/{MAP_KEY}/{source}/{country}/{day_range}
```

Example for Kenya:
```
https://firms.modaps.eosdis.nasa.gov/api/country/csv/YOUR_KEY/VIIRS_SNPP_NRT/KEN/1
```

## Data Sources

### VIIRS (Recommended)
- **VIIRS_SNPP_NRT**: Near Real-Time, 375m resolution
- **VIIRS_NOAA20_NRT**: Near Real-Time, 375m resolution
- Better for smaller fires
- Updates: Every 3-6 hours

### MODIS
- **MODIS_NRT**: Near Real-Time, 1km resolution
- **MODIS_SP**: Standard Product (more accurate, 1-2 month delay)
- Better global coverage
- Updates: Every 6-12 hours

## Response Data Format

CSV columns include:
- `latitude`: Fire location latitude
- `longitude`: Fire location longitude
- `brightness`: Brightness temperature (Kelvin)
- `scan`: Along-scan pixel size
- `track`: Along-track pixel size
- `acq_date`: Acquisition date (YYYY-MM-DD)
- `acq_time`: Acquisition time (HHMM UTC)
- `satellite`: Satellite identifier
- `confidence`: Detection confidence (low, nominal, high)
- `version`: Version identifying the collection
- `bright_t31`: Brightness temperature (Kelvin) - Channel I-4
- `frp`: Fire Radiative Power (MW)
- `daynight`: Day or night fire detection

## Rate Limits
- 1000 requests per day per key
- 100 requests per hour
- For higher limits, contact NASA FIRMS support

## Global Forest Watch Integration

### GFW API (No Key Required)
Global Forest Watch provides free access to deforestation data:

```javascript
// Example endpoint
https://data-api.globalforestwatch.org/glad-deforestation-alerts/latest
```

Documentation: https://data-api.globalforestwatch.org/

## Current Implementation Status

✅ **Implemented:**
- NASA FIRMS API integration structure
- Mock data generator for testing without API key
- Real-time fire alerts display
- Severity classification
- Location mapping
- Time-based filtering

🔄 **Using Mock Data (Until API Key Added):**
- The app currently generates realistic mock data
- Replace `generateMockFireAlerts()` with real API call once key is configured

📝 **To Enable Real Data:**
1. Get NASA FIRMS API key
2. Add key to `DeforestationAlerts.js`
3. Uncomment the real API fetch code
4. Remove or replace mock data generators

## Example Implementation

```javascript
// Real API call (uncomment after adding your key)
const fetchNASAFIRMS = async () => {
  const MAP_KEY = 'YOUR_KEY_HERE' // Add your key
  const url = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${MAP_KEY}/VIIRS_SNPP_NRT/33.8,-4.8,42.0,5.0/1`
  
  try {
    const response = await fetch(url)
    const csvText = await response.text()
    
    // Parse CSV to JSON
    const lines = csvText.split('\n')
    const headers = lines[0].split(',')
    const alerts = []
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',')
      if (values.length > 1) {
        const alert = {
          id: `fire-${Date.now()}-${i}`,
          type: 'fire',
          title: 'Active Fire Detected',
          location: `${values[0]}, ${values[1]}`,
          coordinates: `${values[0]}, ${values[1]}`,
          lat: parseFloat(values[0]),
          lon: parseFloat(values[1]),
          brightness: values[2],
          confidence: values[9],
          severity: values[9] === 'high' ? 'high' : values[9] === 'nominal' ? 'medium' : 'low',
          date: new Date(`${values[5]}T${values[6]}`).toISOString(),
          source: 'NASA FIRMS (VIIRS)',
          verified: true
        }
        alerts.push(alert)
      }
    }
    
    return alerts
  } catch (error) {
    console.error('NASA FIRMS API error:', error)
    return []
  }
}
```

## Resources
- NASA FIRMS Website: https://firms.modaps.eosdis.nasa.gov/
- API Documentation: https://firms.modaps.eosdis.nasa.gov/api/
- Global Forest Watch: https://www.globalforestwatch.org/
- GFW API Docs: https://data-api.globalforestwatch.org/

## Support
- NASA FIRMS: support@earthdata.nasa.gov
- Global Forest Watch: gfw@wri.org

## Notes
- API keys are free for non-commercial use
- Data is updated in near real-time (3-6 hour delay)
- Consider caching responses to reduce API calls
- Implement error handling for API failures
