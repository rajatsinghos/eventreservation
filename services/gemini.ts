
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

// Always use named parameter for apiKey and avoid fallbacks as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getPartyConciergeResponse = async (
  prompt: string,
  history: ChatMessage[],
  userLocation?: { latitude: number, longitude: number }
) => {
  try {
    const contents = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // Add current prompt
    contents.push({
      role: 'user',
      parts: [{ text: prompt }]
    });

    /**
     * Maps grounding is only supported in Gemini 2.5 series models.
     * Using 'gemini-2.5-flash' as per documentation examples for the Maps tool.
     */
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents as any,
      config: {
        systemInstruction: `You are 'Luxe', the exclusive AI Party Concierge for the 12th After Party. 
        Event Details: 
        - Title: 12th After Party
        - Date: Saturday, March 28th, 2026
        - Venue: Sky Restaurant, Genesis Mall, Bhiwadi
        - Official Location Link: https://maps.app.goo.gl/fMn4H6jn7R6QCadA8
        
        Exclusive Features:
        - Gorilla Dance Performance: A high-energy performance at Sky Restaurant to hype the crowd.
        - Wristband System: Mandatory wristband for entry. No wristband, no entry.
        - Fun Zone: Full access to games, challenges, and unlimited entertainment at the Genesis Mall venue.
        - Gifts: Special surprise gifts for attendees.
        
        Food Menu:
        - Welcome Drink: Refreshing drink on arrival.
        - Starters: Paneer Tikka, Veg Spring Roll, Noodles, Veg Manchurian (Dry).
        - Main Course: Dal Makhani, Mix Veg, Kadai Paneer, Jeera Rice, Assorted Breads, Green Salad, Boondi Raita, White Sauce Pasta.
        - Dessert: Gulab Jamun with Ice Cream.
        
        Your tone should be sophisticated, helpful, and energetic. If asked about locations (Bhiwadi, Genesis Mall), menu, or entertainment, use this specific data to help guests prepare for the night.
        When providing directions or locations, you can reference the official map link: https://maps.app.goo.gl/fMn4H6jn7R6QCadA8
        Keep the hype high and focus on describing the amazing vibes and memory-making opportunities!`,
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: userLocation ? {
              latitude: userLocation.latitude,
              longitude: userLocation.longitude
            } : undefined
          }
        }
      },
    });

    return {
      text: response.text || "I'm having a bit of a glitch, but the party is still on! What else can I help with?",
      grounding: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return { 
      text: "The vibe is too high for my circuits right now! Let's try again in a moment.", 
      grounding: [] 
    };
  }
};
