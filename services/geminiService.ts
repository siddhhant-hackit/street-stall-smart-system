
import { GoogleGenAI, Type } from "@google/genai";
import { Customer } from "../types";

// Always use the named parameter for apiKey and obtain it exclusively from process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIGeneratedCampaign = async (topic: string, customerName: string, spicePref: string) => {
  try {
    // Correctly usage of ai.models.generateContent with model name and prompt.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, inviting marketing email or SMS for a street-style Indian food stall named 'Street Stall'.
      Topic: ${topic}
      Customer: ${customerName}
      Their spice preference: ${spicePref}
      Make it energetic, friendly, and 'Street Smart'. Mention one relevant Indian street dish.`,
      config: {
        temperature: 0.8,
        topP: 0.9,
      }
    });
    // Accessing the .text property directly (not calling it as a method).
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Could not generate campaign at this moment. Please try again.";
  }
};

export const analyzeCustomerTrends = async (customers: Customer[]) => {
  try {
    const customerData = JSON.stringify(customers.map(c => ({
      name: c.name,
      pref: c.spicePreference,
      spend: c.totalSpend,
      dish: c.favoriteDish
    })));

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Act as a senior restaurant consultant. Analyze this customer data for an Indian street food business named 'Street Stall': ${customerData}.
      Provide 3 brief, actionable 'Street Smart' insights to improve loyalty and revenue. 
      Focus on fast-moving items, spice level popularity, or high-value stall visitors.
      Return the output in a clear bulleted format.`,
      config: {
        temperature: 0.7,
      }
    });
    // Accessing the .text property directly (not calling it as a method).
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Analyze error: Unable to process trends.";
  }
};
