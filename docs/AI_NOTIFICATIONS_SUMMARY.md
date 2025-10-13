# AI-Generated Notifications System

## Overview
The EcoLinda notification system has been upgraded to use Google Gemini AI to generate unique, contextually relevant content for every notification. This ensures users never see duplicate messages and receive fresh, actionable advice tailored to their context.

## AI-Powered Notification Types

### 1. Daily Sustainability Tips
- **Frequency**: Generated fresh each time (can be cached for the day)
- **Context-Aware**: Adapts to time of day (morning/afternoon/evening)
- **Topics**: Rotates through 8 categories:
  - Soil health and composting
  - Water conservation techniques
  - Climate adaptation strategies
  - Erosion control methods
  - Biodiversity and pollinators
  - Natural pest management
  - Agroforestry practices
  - Post-harvest handling

### 2. Climate Reminders
- **Heavy Rainfall Alerts**: Generated based on actual rainfall data (>100mm)
  - Flood risk assessment
  - Immediate protective actions
  - Water harvesting opportunities
  - Crop protection strategies
  
- **Drought Warnings**: Triggered by low rainfall (<20mm) and high temp (>28°C)
  - Water conservation urgency
  - Irrigation priorities
  - Mulching recommendations
  - Drought-tolerant crop suggestions

- **Seasonal Reminders**: Context-aware for Kenya's planting seasons
  - Long rains season (March-April)
  - Short rains season (October-November)
  - Month-specific advice
  - Timing recommendations

### 3. SDG Achievement Notifications
- **Land Restoration Milestones**: Celebrates hectares restored
  - References UN SDG 15 (Life on Land)
  - Calculates environmental impact
  - Motivational messaging
  
- **Tree Planting Champions**: Recognizes tree planting efforts
  - CO₂ sequestration calculations
  - Biodiversity benefits
  - Climate impact metrics
  
- **Community Leadership**: Acknowledges member mobilization
  - SDG 17 (Partnerships) references
  - Collective action emphasis
  - Community transformation stories

## Implementation Details

### AI Prompt Strategy
Each notification type has a carefully crafted prompt that includes:
1. **Context**: User data, weather conditions, achievements
2. **Requirements**: Word count, tone, specific elements to include
3. **Format**: Structure for title and message
4. **Local Relevance**: Kenya-specific farming practices and context

### Fallback System
Every AI-generated notification has a high-quality fallback message in case:
- API is unavailable
- Rate limits are exceeded
- Generation fails for any reason

### Caching & Performance
- Daily tips are cached for the day to avoid redundant API calls
- Notifications are stored in localStorage
- AI generation is async and non-blocking
- Users see fallback content immediately while AI generates

## Benefits

✅ **Always Unique**: No duplicate messages, ever
✅ **Contextually Relevant**: Adapts to time, weather, season, achievements
✅ **Actionable**: Every tip includes specific steps farmers can take
✅ **Measurable**: Includes numbers, metrics, and quantifiable outcomes
✅ **Motivational**: Encouraging tone with SDG connections
✅ **Local**: Kenya-specific crops, seasons, and farming practices

## API Usage

### Example: Generate Daily Tip
```javascript
const notificationsAPI = new NotificationsAPI()
const tip = await notificationsAPI.getDailySustainabilityTip()
// Returns unique tip with title and message
```

### Example: Generate Climate Alerts
```javascript
const climateData = {
  rainfall: 120,  // mm
  temperature: 26  // °C
}
const alerts = await notificationsAPI.getClimateReminders(climateData)
// Returns array of relevant alerts
```

### Example: Generate Achievement Notifications
```javascript
const userImpact = {
  hectaresRestored: 2.5,
  treesPlanted: 150,
  communityMembers: 12
}
const achievements = await notificationsAPI.getSDGProgressNotifications(userImpact)
// Returns array of celebration notifications
```

## Future Enhancements

🔮 **Personalization**: Integrate user profile (crops, land size, location)
🔮 **Multi-language**: Generate tips in Swahili and other local languages
🔮 **Voice**: Audio notifications for accessibility
🔮 **Images**: AI-generated illustrations for visual learners
🔮 **Community Feed**: Share successful tips between users
🔮 **Learning**: AI learns from user feedback and preferences

---

**Note**: The system currently has 8 high-quality fallback tips that are used when AI generation is unavailable. These cover the most important farming practices for Kenyan smallholder farmers.
