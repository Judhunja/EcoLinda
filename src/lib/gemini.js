import { GoogleGenAI } from "@google/genai"

// Get API key from environment variable (Vite requires VITE_ prefix)
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ''

console.log('Gemini API Key loaded:', apiKey ? `YES (${apiKey.length} chars)` : 'NO')

if (!apiKey) {
  console.error('Missing Gemini API key. Please check your .env file.')
}

// The client
const genAI = new GoogleGenAI({
  apiKey: apiKey
})

// Helper function to generate content
async function generateContent(prompt, modelName = 'gemini-2.0-flash-exp') {
  try {
    const result = await genAI.models.generateContent({
      model: modelName,
      contents: prompt
    })
    return result.text
  } catch (error) {
    console.error('Gemini API Error:', error)
    throw error
  }
}

// Helper function to generate content with streaming
async function generateContentStream(prompt, onChunk, modelName = 'gemini-2.0-flash-exp') {
  try {
    const stream = await genAI.models.generateContentStream({
      model: modelName,
      contents: prompt
    })
    
    let fullText = ''
    
    // Listen to streamed events
    for await (const chunk of stream) {
      const chunkText = chunk.text
      if (chunkText) {
        fullText += chunkText
        if (onChunk) {
          onChunk(chunkText, fullText)
        }
      }
    }
    
    return fullText
  } catch (error) {
    console.error('Gemini API Stream Error:', error)
    // Fallback to non-streaming if streaming fails
    console.log('Falling back to non-streaming mode...')
    const content = await generateContent(prompt, modelName)
    if (onChunk) {
      onChunk(content, content)
    }
    return content
  }
}

/**
 * Generate educational content about environmental topics
 */
export async function generateEducationalContent(topic, options = {}) {
  try {
    const {
      length = 'medium', // short, medium, long
      audience = 'general', // students, farmers, policymakers, general
      format = 'article' // article, quiz, tips, steps
    } = options

    const prompt = `Create ${format} about "${topic}" for ${audience} audience. 
    Length: ${length}. 
    Focus on practical, actionable information related to land degradation prevention and restoration.
    Make it engaging and easy to understand.`

    const content = await generateContent(prompt)
    return {
      success: true,
      content
    }
  } catch (error) {
    console.error('Error generating educational content:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Get personalized farming advice
 */
export async function getFarmingAdvice(context) {
  try {
    const {
      cropType,
      soilCondition,
      climate,
      issue,
      location
    } = context

    const prompt = `As an agricultural expert, provide practical farming advice for:
    - Crop: ${cropType || 'general farming'}
    - Soil Condition: ${soilCondition || 'unknown'}
    - Climate: ${climate || 'tropical'}
    - Issue: ${issue || 'general best practices'}
    - Location: ${location || 'East Africa'}
    
    Provide actionable, sustainable farming practices that prevent land degradation.
    Focus on organic methods, water conservation, and soil health.`

    const advice = await generateContent(prompt)
    return {
      success: true,
      advice
    }
  } catch (error) {
    console.error('Error getting farming advice:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Generate crop rotation recommendations
 */
export async function getCropRotationPlan(context) {
  try {
    const {
      previousCrops,
      soilType,
      climateZone,
      fieldSize,
      goals
    } = context

    const prompt = `Create a detailed crop rotation plan:
    - Previous Crops: ${previousCrops?.join(', ') || 'none'}
    - Soil Type: ${soilType || 'loam'}
    - Climate Zone: ${climateZone || 'tropical'}
    - Field Size: ${fieldSize || '1 hectare'}
    - Goals: ${goals || 'soil health improvement'}
    
    Provide a 2-3 year rotation plan with:
    1. Recommended crops for each season
    2. Reasons for each choice
    3. Expected soil health benefits
    4. Nitrogen fixing considerations
    5. Market viability`

    const plan = await generateContent(prompt)
    return {
      success: true,
      plan
    }
  } catch (error) {
    console.error('Error generating crop rotation plan:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Identify species from image
 */
export async function identifySpecies(imageData, additionalInfo = '') {
  try {
    const prompt = `Identify this plant or animal species. Provide:
    1. Common name and scientific name
    2. Conservation status (IUCN Red List)
    3. Role in ecosystem
    4. Threats facing the species
    5. How people can help protect it
    ${additionalInfo ? `Additional context: ${additionalInfo}` : ''}
    
    If you cannot identify with high confidence, suggest similar species.`

    const identification = await generateContent([prompt, imageData], 'gemini-pro-vision')
    return {
      success: true,
      identification
    }
  } catch (error) {
    console.error('Error identifying species:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Generate forest conservation content
 */
export async function generateForestContent(topic) {
  try {
    const prompt = `Create detailed educational content about "${topic}" in forest conservation.
    Include:
    1. Why it matters for biodiversity and climate
    2. Current challenges and statistics
    3. Successful case studies from Africa
    4. Actionable steps for communities
    5. How to measure impact
    
    Make it inspiring and solution-focused.`

    const content = await generateContent(prompt)
    return {
      success: true,
      content
    }
  } catch (error) {
    console.error('Error generating forest content:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Generate forest conservation content with streaming
 */
export async function generateForestContentStream(topic, onChunk) {
  try {
    const prompt = `Create detailed educational content about "${topic}" in forest conservation.
    
    Format the content with clear structure:
    - Use ## for main headings
    - Use ### for subheadings
    - Use bullet points with - for lists
    - Use **bold** for emphasis
    - Include relevant statistics and data
    
    Include:
    1. Introduction and why it matters
    2. Current challenges and statistics
    3. Successful case studies from Africa
    4. Actionable steps for communities
    5. How to measure impact
    
    Make it inspiring, well-structured, and solution-focused.`

    const content = await generateContentStream(prompt, onChunk)
    return {
      success: true,
      content
    }
  } catch (error) {
    console.error('Error generating forest content:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Analyze soil health from description
 */
export async function analyzeSoilHealth(soilData) {
  try {
    const {
      color,
      texture,
      moisture,
      vegetation,
      issues
    } = soilData

    const prompt = `Analyze soil health based on these observations:
    - Color: ${color || 'not specified'}
    - Texture: ${texture || 'not specified'}
    - Moisture: ${moisture || 'not specified'}
    - Vegetation: ${vegetation || 'not specified'}
    - Issues: ${issues || 'none reported'}
    
    Provide:
    1. Overall soil health assessment
    2. Likely nutrient status
    3. Potential problems
    4. Recommendations for improvement
    5. Suggested crops that would thrive
    6. Warning signs to watch for`

    const analysis = await generateContent(prompt)
    return {
      success: true,
      analysis
    }
  } catch (error) {
    console.error('Error analyzing soil health:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Generate quiz questions for education
 */
export async function generateQuiz(topic, difficulty = 'medium', questionCount = 5) {
  try {
    const prompt = `Create ${questionCount} multiple-choice quiz questions about "${topic}".
    Difficulty: ${difficulty}
    
    IMPORTANT: Return ONLY a valid JSON array, no markdown formatting, no code blocks, no additional text.
    
    Format:
    [
      {
        "question": "Question text here?",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correct": 0,
        "explanation": "Brief explanation why this answer is correct"
      }
    ]
    
    Focus on practical knowledge about land conservation, environmental protection, and forest ecosystems.
    Make questions clear, educational, and relevant to real-world conservation efforts.`

    const content = await generateContent(prompt)
    
    // Try to parse the JSON response
    let questions
    try {
      // Remove markdown code blocks if present
      let cleanContent = content.trim()
      cleanContent = cleanContent.replace(/```json\n?/g, '').replace(/```\n?/g, '')
      questions = JSON.parse(cleanContent)
    } catch (parseError) {
      console.error('Failed to parse quiz JSON:', parseError)
      console.log('Raw content:', content)
      throw new Error('Failed to parse quiz questions')
    }
    
    return {
      success: true,
      questions
    }
  } catch (error) {
    console.error('Error generating quiz:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Get chatbot response
 */
export async function getChatResponse(userMessage, conversationHistory = []) {
  try {
    const context = `You are an AI assistant for EcoLinda, a platform dedicated to preventing and reversing land degradation.
    You help users with:
    - Sustainable farming practices
    - Forest conservation
    - Species protection
    - Wetland conservation
    - Soil health management
    
    Be helpful, encouraging, and provide actionable advice.`

    const fullPrompt = `${context}\n\nUser: ${userMessage}`
    const message = await generateContent(fullPrompt)
    
    return {
      success: true,
      message
    }
  } catch (error) {
    console.error('Error getting chat response:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Generate campaign description
 */
export async function generateCampaignContent(campaignData) {
  try {
    const {
      type,
      title,
      location,
      goal,
      duration
    } = campaignData

    const typeDescriptions = {
      'reforestation': 'forest restoration and tree planting',
      'urban-greening': 'urban tree planting and green space development',
      'watershed': 'watershed protection and riparian forest restoration',
      'agroforestry': 'agroforestry integration and sustainable land use'
    }

    const prompt = `You are writing a compelling campaign description for "${title}", a ${typeDescriptions[type]} initiative in ${location}.

Campaign Details:
- Goal: Plant ${goal} trees
- Duration: ${duration} months
- Location: ${location}
- Type: ${typeDescriptions[type]}

Write an engaging campaign description that will inspire people to join and support this initiative. The description should be ready to publish as-is.

Include these sections (WITHOUT section headers):

1. Opening paragraph: An inspiring introduction about the campaign and its vision (2-3 sentences)

2. The Challenge: Describe the environmental challenge this campaign addresses in ${location} (2-3 sentences)

3. Our Solution: Explain how planting ${goal} trees over ${duration} months will make a difference (2-3 sentences)

4. Get Involved: A motivating call-to-action inviting people to join the campaign (1-2 sentences)

IMPORTANT FORMATTING RULES:
- Write in a natural, flowing narrative style
- Use simple paragraphs separated by blank lines
- DO NOT use markdown headings (no # symbols)
- DO NOT use bullet points or numbered lists
- DO NOT use bold or italic formatting (no ** or * symbols)
- Write as if speaking directly to potential volunteers
- Keep tone inspiring, positive, and action-oriented
- Make it sound like a real campaign announcement, not a template or guide

Write the complete campaign description now:`

    const content = await generateContent(prompt)
    
    // Clean up any remaining markdown or formatting
    const cleanContent = content
      .replace(/#{1,6}\s+/g, '') // Remove heading markers
      .replace(/\*\*\*(.+?)\*\*\*/g, '$1') // Remove triple asterisks
      .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold markers
      .replace(/\*(.+?)\*/g, '$1') // Remove italic markers
      .replace(/^\d+\.\s+/gm, '') // Remove numbered list markers
      .replace(/^[-•]\s+/gm, '') // Remove bullet points
      .trim()
    
    return {
      success: true,
      content: cleanContent
    }
  } catch (error) {
    console.error('Error generating campaign content:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Generate sustainable farming educational content with streaming
 */
export async function generateSustainableFarmingContent(topic, context = {}, onChunk) {
  try {
    const {
      region = 'Kenya',
      cropType = 'general',
      level = 'intermediate', // beginner, intermediate, advanced
      focusArea = 'practical'
    } = context

    const prompt = `You are an expert in sustainable agriculture and land management in ${region}. 
    
Create comprehensive educational content about "${topic}" for farmers${cropType !== 'general' ? ` growing ${cropType}` : ''}.

Level: ${level}
Focus: ${focusArea} applications

Please provide:
1. A clear introduction explaining why this topic is important
2. Key concepts explained simply
3. Practical, actionable steps farmers can implement
4. Region-specific considerations for ${region}
5. Expected benefits and outcomes
6. Common mistakes to avoid
7. Resources or next steps for learning more

Format your response in clear paragraphs and use simple language. Make it engaging and easy to understand for farmers.
DO NOT use markdown formatting, asterisks, or special characters. Just plain, well-structured text with line breaks between sections.`

    if (onChunk) {
      // Use streaming
      const fullContent = await generateContentStream(prompt, onChunk)
      return {
        success: true,
        content: fullContent
      }
    } else {
      // Non-streaming
      const content = await generateContent(prompt)
      return {
        success: true,
        content
      }
    }
  } catch (error) {
    console.error('Error generating sustainable farming content:', error)
    return {
      success: false,
      error: error.message,
      content: 'Failed to generate content. Please try again.'
    }
  }
}

/**
 * Generate personalized crop guide with streaming
 */
export async function generateCropGuideContent(cropName, regionInfo, onChunk) {
  try {
    const prompt = `Create a detailed growing guide for ${cropName} in ${regionInfo.name || regionInfo}.

Include these sections:
1. Overview - Why grow this crop in this region
2. Climate and soil requirements
3. Land preparation steps
4. Planting guidelines (timing, spacing, depth)
5. Water management specific to this crop
6. Fertilization schedule (organic methods preferred)
7. Pest and disease management
8. Harvesting and post-harvest handling
9. Common challenges and solutions
10. Expected yields and market considerations

Make the content practical and actionable for farmers. Use simple language.
DO NOT use markdown, asterisks, or special formatting. Write in clear paragraphs with proper spacing.`

    if (onChunk) {
      const fullContent = await generateContentStream(prompt, onChunk)
      return {
        success: true,
        content: fullContent
      }
    } else {
      const content = await generateContent(prompt)
      return {
        success: true,
        content
      }
    }
  } catch (error) {
    console.error('Error generating crop guide:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

export default {
  generateEducationalContent,
  getFarmingAdvice,
  getCropRotationPlan,
  identifySpecies,
  generateForestContent,
  analyzeSoilHealth,
  generateQuiz,
  getChatResponse,
  generateCampaignContent,
  generateSustainableFarmingContent,
  generateCropGuideContent
}
