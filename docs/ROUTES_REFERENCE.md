# EcoLinda Routes Reference

## Public Routes (No Authentication Required)
- **`/`** - Onboarding page
- **`/login`** - Login page
- **`/signup`** - Signup page

## Protected Routes (Authentication Required)

### Main Dashboard
- **`/home`** or **`/dashboard`** - Home page with all modules and integrated data dashboard

### Core Modules
- **`/forest`** - Forest Conservation module
- **`/forest/education`** - Forest Education
- **`/forest/campaigns`** - Forest Campaigns
- **`/forest/alerts`** - Deforestation Alerts
- **`/soil`** - Soil Health monitoring
- **`/crops`** - Regional Crop Planner (Kenya regions & crops)

### New Features (Just Integrated!)
- **`/community`** - Community Sharing Platform 🎉
  - Share projects, techniques, practices
  - Vote, comment, tag filtering
  - Location-based posts
  
- **`/ai-degradation`** - AI Land Degradation Prediction 🤖
  - Risk assessment
  - Future predictions
  - AI recommendations
  - Restoration action plans

### Coming Soon
- **`/biodiversity`** - Biodiversity tracking
- **`/wetlands`** - Wetlands conservation

## Navigation Structure

```
Home (/)
│
├── Forest Conservation (/forest)
│   ├── Education (/forest/education)
│   ├── Campaigns (/forest/campaigns)
│   └── Alerts (/forest/alerts)
│
├── Soil Health (/soil)
│
├── Regional Crop Planner (/crops)
│
├── Community Hub (/community) ⭐ NEW
│
└── AI Degradation Prediction (/ai-degradation) ⭐ NEW
```

## Quick Access from Home Page

All modules are accessible via clickable cards on the home page:
1. Forest Conservation (green card)
2. Soil Health (amber card)
3. Biodiversity (orange card)
4. Wetlands (blue card)
5. Regional Crop Planner (lime card)
6. **Community Hub (purple card)** ⭐ NEW
7. **AI Degradation Prediction (indigo card)** ⭐ NEW

## Notification Center

- **Bell Icon** - Available in navigation bar on all protected pages
- Click to view notifications dropdown
- Shows daily tips, climate alerts, SDG progress
- Badge shows unread count

## API Endpoints (Backend Services)

### Community API (`src/lib/communityAPI.js`)
- `getMockPosts()` - Get all community posts
- `getPopularTags()` - Get trending tags
- `createPost(postData)` - Create new post
- `votePost(postId, voteType)` - Upvote/downvote
- `addComment(postId, content)` - Add comment

### Land Degradation AI (`src/lib/landDegradationAI.js`)
- `assessDegradationRisk(soil, climate, landCover)` - Calculate risk
- `generatePredictions(assessment)` - Future predictions
- `getAIRecommendations(location, riskLevel)` - AI guidance
- `getRestorationMeasures(riskLevel)` - Action plans
- `generateHeatmapData()` - Risk visualization

### Notifications API (`src/lib/notificationsAPI.js`)
- `getDailySustainabilityTip()` - AI-generated tip
- `getClimateReminders(location)` - Weather alerts
- `getSDGProgressNotifications()` - Achievement updates
- `getAllNotifications()` - Get all notifications
- `markAsRead(notifId)` - Mark notification read
- `getUnreadCount()` - Get unread count

## Module Features Quick Reference

| Module | Key Features |
|--------|-------------|
| **Community** | Posts, Voting, Comments, Tags, Map View (soon) |
| **AI Prediction** | Risk Analysis, Predictions, AI Recommendations, Restoration Plans |
| **Notifications** | Daily Tips, Climate Alerts, SDG Progress, Bell Icon |
| **Crop Planner** | Kenya Regions, Crop Selection, Growing Guides, AI Education |
| **Soil Health** | Soil Testing, pH Analysis, Nutrient Recommendations |
| **Forest Conservation** | Tree Planting, Deforestation Alerts, Education, Campaigns |

## Data Dashboard (on Home Page)

The integrated data dashboard has 4 tabs:
1. **Land Use & Cover** - Coverage statistics, changes over time
2. **Soil & Climate** - Soil health, weather, air quality
3. **Deforestation** - Forest loss, threats, restoration
4. **Vegetation Health** - NDVI analysis, trends, seasonal patterns

## Back Navigation

All module pages have a "Back" button that navigates to `/home`, not the login page.

## Authentication Flow

1. **Not authenticated** → Redirected to `/` (Onboarding)
2. **Login/Signup** → Navigate to `/home`
3. **Authenticated** → Access all protected routes
4. **Logout** → Redirected to `/` (Onboarding)

## Mobile Responsiveness

All routes are fully responsive:
- Mobile: Single column layout
- Tablet: 2-column layout
- Desktop: 3-4 column layout

## Error Handling

- Invalid routes → Redirect to `/` (Onboarding)
- Unauthorized access → Redirect to `/login`
- API errors → Graceful error messages

## Development Tips

### Testing Routes
```javascript
// In browser console
router.navigate('/community')
router.navigate('/ai-degradation')
```

### Adding New Routes
1. Create page component in `src/pages/`
2. Import in `src/router.js`
3. Add to `routes` object
4. Add to `protectedRoutes` array if auth required
5. Add module card on home page

### Debugging
- Check browser console for navigation logs
- Session status logged on auth state change
- All API calls logged to console
