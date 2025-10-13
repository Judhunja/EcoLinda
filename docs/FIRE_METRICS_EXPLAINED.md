# Fire Alert Metrics Explained

## Understanding Fire Data from NASA FIRMS

### 1. Fire Power (FRP - Fire Radiative Power)

**What is it?**
Fire Radiative Power measures the rate of heat energy release from a fire, measured in Megawatts (MW).

**What does it mean for users?**

| FRP Value | Classification | What it means |
|-----------|---------------|---------------|
| **< 5 MW** | Low | Small fire, possibly controlled burn or agricultural clearing |
| **5-20 MW** | Low-Medium | Small to moderate wildfire or larger controlled burn |
| **20-50 MW** | Medium | Moderate wildfire, cause for concern |
| **50-100 MW** | High | Large active wildfire, immediate attention needed |
| **100-1000 MW** | Very High | Major wildfire event, emergency response required |
| **> 1000 MW** | Extreme | Catastrophic fire event, massive emergency |

**Real-world examples:**
- **5 MW** ≈ Controlled agricultural burn (few hectares)
- **50 MW** ≈ Forest fire burning several hectares actively
- **200 MW** ≈ Major wildfire threatening communities
- **500+ MW** ≈ Massive wildfire disaster

### 2. Fire Intensity Levels

Based on FRP, we classify fires into easy-to-understand categories:

- 🟡 **Low**: Small fires, often controlled
- 🟠 **Low-Medium**: Moderate fires requiring monitoring
- 🟠 **Medium**: Active fires needing attention
- 🔴 **High**: Dangerous fires requiring emergency response
- 🔴 **Very High**: Major fire events
- ⚫ **Extreme**: Catastrophic situations

### 3. Temperature (Brightness Temperature)

**What is it?**
The brightness temperature (in Kelvin) detected by the satellite sensor.

**Why might it be missing?**
- Cloud cover blocking the sensor
- Smoke obscuring the fire
- Edge of satellite scan area
- Data processing limitations

**When shown:**
- Displayed in both Kelvin (K) and Celsius (°C)
- Example: 350K = 77°C

**What it indicates:**
- **300-400K**: Smoldering or low-intensity fire
- **400-500K**: Active burning
- **500K+**: Intense combustion

### 4. Detection Confidence

**Levels:**
- **Low**: Possible fire, may need verification
- **Nominal**: Likely fire detection
- **High**: Confirmed fire with high certainty

**Mapped to Severity:**
- Low confidence → Yellow alert (Low severity)
- Nominal → Orange alert (Medium severity)
- High → Red alert (High severity)

### 5. Detection Time

**Day vs Night:**
- **Day (D)**: Fire detected during daylight
- **Night (N)**: Fire detected at night

**Why it matters:**
- Night detections often indicate larger/more intense fires
- Day fires easier to verify visually
- Night fires may be more dangerous (limited visibility for response)

## How to Read an Alert

### Example Alert:
```
Location: Mau Forest
Coordinates: -0.5234, 35.8123
Fire Power: 85 MW (High)
Temperature: 425K (152°C)
Intensity: High
Confidence: High
Detection: Night
```

**What this means:**
- A significant wildfire is actively burning
- Located in Mau Forest
- High heat output (85 MW) indicates serious fire
- Very hot (152°C surface temperature)
- Detected at night (may be harder to fight)
- High confidence (definitely a fire, not a false positive)
- **Action needed**: Emergency response required

## Fire Power Context

### Energy Comparison
To help understand FRP values:

- **10 MW** = Energy output of ~140 average cars running
- **50 MW** = Small power plant output
- **100 MW** = Enough to power ~80,000 homes
- **500 MW** = Large power station

### Area Burned
Rough estimates (varies by vegetation):
- **5 MW** ≈ 1-2 hectares actively burning
- **50 MW** ≈ 10-20 hectares
- **200 MW** ≈ 50-100 hectares
- **500 MW** ≈ 100+ hectares

## Response Guidelines

### Based on Fire Power:

**< 20 MW (Low-Medium)**
- Monitor situation
- Check if controlled burn
- Verify with local authorities
- Report if unexpected

**20-100 MW (Medium-High)**
- Alert emergency services
- Warn nearby communities
- Prepare evacuation routes
- Monitor spread direction

**> 100 MW (Very High)**
- Emergency response activation
- Community evacuations
- Request additional resources
- Coordinate with national services

## Data Sources

All fire data comes from:
- **NASA FIRMS**: Fire Information for Resource Management System
- **Satellites**: MODIS (Terra/Aqua) and VIIRS (Suomi NPP/NOAA-20)
- **Update Frequency**: Every 3-6 hours
- **Latency**: Near real-time (within 3 hours of detection)

## Limitations to Understand

1. **Clouds & Smoke**: Can block satellite view
2. **Small Fires**: May not be detected (<0.5 hectare)
3. **Timing**: Only captures moment satellite passes over
4. **Resolution**: VIIRS = 375m, MODIS = 1km
5. **False Positives**: Industrial heat sources might be detected

## How to Use This Information

### For Communities:
1. **Check regularly** for alerts in your area
2. **Report** if you see fire not in system
3. **Share** alerts with neighbors
4. **Prepare** based on fire intensity levels
5. **Evacuate** when authorities advise

### For Response Teams:
1. **Prioritize** high FRP fires first
2. **Track** multiple alerts for spread patterns
3. **Coordinate** using location data
4. **Monitor** power changes (increasing FRP = spreading fire)
5. **Document** for post-event analysis

### For Policy Makers:
1. **Analyze trends** over time
2. **Identify hotspots** for prevention efforts
3. **Allocate resources** based on fire patterns
4. **Plan** fire management strategies
5. **Engage** communities in high-risk areas

## Additional Resources

- NASA FIRMS Website: https://firms.modaps.eosdis.nasa.gov/
- Fire Science: https://earthobservatory.nasa.gov/
- Emergency Contacts: Kenya Forest Service, County Fire Departments

---

**Remember**: These are satellite detections. Always verify with local observations and coordinate with official emergency services before taking action.
