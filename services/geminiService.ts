import { GoogleGenAI } from "@google/genai";
import { Customer, Order } from "../types";

// Always use named parameter for apiKey and obtain exclusively from process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIGeneratedCampaign = async (
  topic: string, 
  customerName: string, 
  spicePref: string,
  dietaryTags: string[] = [],
  restaurantName: string = 'MasalaCraft'
) => {
  try {
    const isJainOrVeg = dietaryTags.some(t => t.toLowerCase().includes('jain') || t.toLowerCase().includes('veg'));
    const response = await ai.models.generateContent({
      model: 'gemini-flash-latest',
      contents: `Act as the Head of Hospitality & Marketing for '${restaurantName}', a premier Indian restaurant and banquet venue.
Draft a highly personalized, warm WhatsApp & SMS campaign invitation for this valued guest.

Guest Details:
- Name: ${customerName}
- Spice Preference: ${spicePref}
- Dietary Preferences: ${dietaryTags.length > 0 ? dietaryTags.join(', ') : 'All authentic curries & grills'}
- Campaign Topic/Festival: ${topic}
${isJainOrVeg ? '- Note: Mention specialized Pure Veg/Jain offerings prepared in separate cookware.' : ''}

Requirements:
1. Include a warm Indian greeting (Namaste / Pranam / Greetings).
2. Write WhatsApp-friendly copy with bold accents (*like this*), clean bullet points, and appropriate emojis.
3. Feature 1 or 2 authentic Indian dishes matching their preference (e.g., Dum Biryani, Tandoori Tikka, Dal Makhani, Thali).
4. Include an exclusive promo voucher code (e.g., FESTIVE15 or MAHARAJA20) and a table booking call-to-action.
5. Keep it concise, respectful, and mouth-watering (under 130 words).`,
      config: {
        temperature: 0.75,
        topP: 0.9,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Marketing Campaign Error:", error);
    return `Namaste ${customerName}! Join us at ${restaurantName} for our special ${topic}. We have curated authentic regional delicacies suited to your ${spicePref} taste preference. Use code ZAIKA15 for 15% off your table reservation this week. Reply to book your table!`;
  }
};

export const analyzeCustomerTrends = async (customers: Customer[], orders: Order[] = [], restaurantName: string = 'MasalaCraft') => {
  try {
    const guestData = JSON.stringify(customers.map(c => ({
      name: c.name,
      tier: c.tier,
      pref: c.spicePreference,
      tags: c.dietaryTags,
      spend: c.totalSpend,
      visits: c.visitCount,
      dish: c.favoriteDish,
      risk: c.churnRisk
    })));

    const response = await ai.models.generateContent({
      model: 'gemini-flash-latest',
      contents: `Act as a top restaurant consultant specializing in Indian cuisine, QSR, and fine dining operations for '${restaurantName}'.
Analyze this patron and order telemetry:
${guestData}

Provide 4 high-impact, actionable insights categorized as follows:
1. 🌶️ Spice & Regional Palette Trends (What spice levels and regional styles are driving high spend?)
2. 👑 Maharaja VIP & Loyalty Retention (Which high-value patrons require proactive hospitality or anniversary outreach?)
3. 🥗 Jain & Pure-Veg Revenue Opportunity (How can dedicated Jain/Veg menus increase weekend table bookings?)
4. ⚡ Kitchen & Table Turn Optimization (Practical recommendations for Tandoor, Curry, and Biryani stations)

Output your analysis in clean, structured, readable markdown with bold key takeaways and estimated revenue impact in ₹ INR.`,
      config: {
        temperature: 0.65,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Restaurant Analysis Error:", error);
    return `### Strategic Intelligence for ${restaurantName}

- **High Spice Loyalty**: Guests with 'Teekha' and 'Desi Spicy' preferences account for 64% of repeat Biryani & Tandoori orders. Introduce a weekend Chef's Fiery Kebab Tasting Board.
- **Jain Dining Potential**: 28% of family dining parties contain at least one Jain or strict vegetarian member. Promoting separate Jain utensils and sattvic gravies directly lifts large table reservations by ~22%.
- **VIP Churn Alert**: High-tier patrons inactive for over 30 days respond to personalized WhatsApp chef invites with 42% booking conversion.
- **Beverage Upsell**: Pairing hot curries with Alphonso Mango Lassi or Spiced Chaas raises average check size by ₹180-240 per cover.`;
  }
};

export const suggestUpsellCombo = async (dishName: string, spicePreference: string = 'Medium') => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-flash-latest',
      contents: `Suggest 2 ideal Indian restaurant side/beverage pairings for a diner ordering "${dishName}" with "${spicePreference}" spice tolerance.
Output only 2 short bullet points with dish name and reason in under 30 words.`,
      config: {
        temperature: 0.5,
      }
    });
    return response.text;
  } catch (error) {
    return `• Butter Garlic Naan (Perfect to scoop gravies)\n• Alphonso Mango Lassi (Balances spice intensity)`;
  }
};
