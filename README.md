# EcoLinda

A comprehensive digital ecosystem that prevents and reverses land degradation by empowering communities with education, technology, and actionable tools.

## 🌍 Mission

**"How can we take care of the planet's land systems so that they can keep taking care of us?"**

EcoLinda creates a reciprocal relationship between humans and the ecosystems that sustain life, addressing SDG-15: Life on Land.

## ✨ Features

### 🤖 **AI-Powered Intelligence (NEW!)**
- **Live Chat Assistant**: Get instant expert advice on sustainable farming, conservation, and more
- **Personalized Recommendations**: AI-driven crop rotation plans and farming guidance
- **Educational Content Generation**: Auto-generated learning materials
- **Species Identification**: AI-powered plant and animal recognition (coming soon)
- **Smart Analysis**: Soil health assessment from observations

### 🌲 Module 1: Forest Conservation & Reforestation
- **Education Hub**: Interactive learning about carbon sequestration, biodiversity, and forest ecosystems
- **Reforestation Campaigns**: Community-driven tree planting with campaign management tools
- **Deforestation Alerts**: Real-time satellite monitoring and violation reporting
- **Impact Tracking**: Live tree counters and survival rate monitoring

### 🌾 Module 2: Soil Health & Sustainable Farming
- **Personalized Farmer Dashboard**: Land health scores and daily priorities
- **Soil Testing System**: IoT sensor integration and manual testing guides
- **Crop Rotation Planner**: Multi-year planning with AI recommendations
- **Organic Composting Guide**: Sustainable fertilization methods
- **Irrigation Scheduling**: Smart water management based on weather and soil data

### 🦋 Module 3: Species Protection & Biodiversity
- **AI Photo Identification**: Gemini AI-powered species recognition
- **Species Database**: Comprehensive encyclopedia with conservation status
- **Endangered Species Programs**: Adoption and protection campaigns
- **Educational Content**: Interactive learning paths and citizen science

### 💧 Module 4: Wetland Conservation
- **Wetlands Education**: Interactive 3D models and ecosystem services
- **Wetland Mapping**: Global database with Google Earth Engine integration
- **Health Monitoring**: Satellite-based tracking and degradation alerts
- **Community Reporting**: Document threats and changes

## 🎯 Objectives

### Primary Goals (3-Year Timeline)
- ✅ Equip 100,000+ farmers with sustainable agriculture tools
- ✅ Restore 50,000 hectares of degraded land
- ✅ Protect 500+ endangered species
- ✅ Map 1,000+ wetland sites globally
- ✅ Engage 500,000+ users in conservation

### Impact Metrics
- 🌳 2.4M+ trees planted
- 🌱 50K+ hectares restored
- 🐾 500+ species protected
- 🌊 1.2K+ wetlands mapped

## Features

- 🌍 Beautiful onboarding experience
- 🔐 Supabase authentication (Login/Signup)
- 🎨 Consistent theme across the app
- 📱 Responsive design
- 🌙 Dark mode support
- ⚡ Fast development with Vite

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository or navigate to the project directory:

```bash
cd /home/jude/power_learn_project/plp-land-degradation-hackathon/EcoLinda
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then edit `.env` and add your Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API
3. Copy the Project URL and anon public key
4. Paste them into your `.env` file

### Running the Development Server

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
EcoLinda/
├── src/
│   ├── lib/
│   │   └── supabase.js      # Supabase client configuration
│   ├── pages/
│   │   ├── Onboarding.js    # Landing/onboarding page
│   │   ├── Login.js         # Login page
│   │   ├── Signup.js        # Signup page
│   │   └── Dashboard.js     # Dashboard (protected route)
│   ├── main.js              # App entry point
│   ├── router.js            # Client-side routing
│   └── style.css            # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Theme Colors

- **Primary (Green)**: #38a169 - Representing growth and nature
- **Secondary (Soil Brown)**: #a0522d - Representing earth
- **Accent (Terracotta)**: #f59e0b - Adding warmth
- **Background Light**: #f0fdf4
- **Background Dark**: #1a202c

## 🛠 Technologies Used

- **Vite** - Fast build tool and dev server
- **Vanilla JavaScript** - No framework overhead
- **Tailwind CSS** - Utility-first CSS framework
- **Supabase** - Backend as a Service (Authentication, Database, Storage)
- **Material Symbols** - Icon library
- **Gemini AI** - Species identification and personalized recommendations
- **Google Earth Engine** - Satellite imagery and forest/wetland monitoring

## 📁 Project Structure

```
EcoLinda/
├── src/
│   ├── lib/
│   │   └── supabase.js           # Supabase client configuration
│   ├── pages/
│   │   ├── Onboarding.js         # Landing/onboarding page
│   │   ├── Login.js              # Login page
│   │   ├── Signup.js             # Signup page
│   │   ├── Home.js               # Main dashboard
│   │   └── modules/
│   │       ├── ForestConservation.js  # Forest module
│   │       ├── SoilHealth.js          # Soil & farming module
│   │       ├── Biodiversity.js        # Species protection (coming soon)
│   │       └── Wetlands.js            # Wetland conservation (coming soon)
│   ├── main.js                   # App entry point
│   ├── router.js                 # Client-side routing
│   └── style.css                 # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 👥 Target Users

1. **Smallholder Farmers (40%)** - Practical farming advice and soil health monitoring
2. **Community Conservationists (25%)** - Organize events and report violations
3. **Students & Educators (20%)** - Interactive environmental learning
4. **Urban Environmental Advocates (10%)** - Financial contributions and impact tracking
5. **Policymakers & NGO Staff (5%)** - Data-driven decision making

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT
