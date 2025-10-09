# Gemini AI Setup Guide

## Package Information

We are using **@google/genai** (NOT @google/generative-ai) for the Gemini AI integration.

### Installation

```bash
npm install @google/genai
```

## Configuration

### 1. Environment Variables

Add your Gemini API key to `.env`:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

**Important:** Vite requires the `VITE_` prefix for environment variables to be exposed to the client.

### 2. Basic Setup

```javascript
import { GoogleGenAI } from "@google/genai"

// Get API key from environment variable
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ''

// Initialize the client
const ai = new GoogleGenAI({ apiKey })

// Generate content
async function generateContent(prompt, model = 'gemini-2.0-flash-exp') {
  const response = await ai.models.generateContent({
    model,
    contents: prompt,
  })
  return response.text
}
```

## Available Models

- **gemini-2.0-flash-exp** - Fast, cost-effective model (default)
- **gemini-pro** - Balanced model for general use
- **gemini-pro-vision** - For image analysis and vision tasks

## Usage Examples

### Text Generation

```javascript
const response = await ai.models.generateContent({
  model: 'gemini-2.0-flash-exp',
  contents: 'Explain sustainable farming practices',
})
console.log(response.text)
```

### Vision/Image Analysis

```javascript
const response = await ai.models.generateContent({
  model: 'gemini-pro-vision',
  contents: ['Identify this plant species', imageData],
})
console.log(response.text)
```

## EcoLinda Integration

The `src/lib/gemini.js` file provides 9 helper functions:

1. **generateEducationalContent(topic, options)** - Creates educational articles
2. **getFarmingAdvice(context)** - Provides personalized farming guidance
3. **getCropRotationPlan(context)** - Generates crop rotation strategies
4. **identifySpecies(imageData, info)** - Identifies plants/animals from images
5. **generateForestContent(topic)** - Creates forest conservation content
6. **analyzeSoilHealth(soilData)** - Analyzes soil conditions
7. **generateQuiz(topic, difficulty, count)** - Creates quiz questions
8. **getChatResponse(message, history)** - Powers the AI chat assistant
9. **generateCampaignContent(data)** - Creates campaign descriptions

## Troubleshooting

### "Failed to resolve import" Error

If you see this error:
```
Failed to resolve import "@google/genai" from "src/lib/gemini.js"
```

**Solution:**
1. Ensure `@google/genai` is in package.json dependencies (NOT @google/generative-ai)
2. Remove any conflicting packages: `npm uninstall @google/generative-ai`
3. Clear Vite cache: `rm -rf node_modules/.vite`
4. Reinstall: `npm install`
5. Restart dev server: `npm run dev`

### API Key Not Loading

If API key shows as "NO":
1. Check `.env` file has `VITE_GEMINI_API_KEY=...`
2. Restart the dev server (Vite needs restart to pick up .env changes)
3. Hard refresh browser (Ctrl+Shift+R)

### Rate Limits

Gemini API has rate limits. If you hit them:
- Wait a few seconds between requests
- Implement request throttling for production
- Consider caching responses for common queries

## Best Practices

1. **Error Handling**: All functions return `{ success: boolean, content/error }` format
2. **Loading States**: Show loading indicators while waiting for AI responses
3. **Fallbacks**: Provide default content if AI fails
4. **Caching**: Cache frequently requested content to reduce API calls
5. **Security**: Never expose API key in client code (use environment variables)

## Resources

- [Google AI SDK Documentation](https://ai.google.dev/)
- [Gemini API Reference](https://ai.google.dev/api/rest)
- [Model Comparison](https://ai.google.dev/models/gemini)
