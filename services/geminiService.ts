import { Customer, Order } from "../types";

const toTitle = (value: string) => value.trim() || "Guest";

const getDietaryNote = (dietaryTags: string[] = []) => {
  const normalized = dietaryTags.map(tag => tag.toLowerCase());
  if (normalized.some(tag => tag.includes("jain") || tag.includes("veg"))) {
    return "Mention dedicated Jain / vegetarian offerings prepared in separate cookware.";
  }
  return "Focus on authentic Indian favorites and family dining comfort.";
};

export const getAIGeneratedCampaign = async (
  topic: string,
  customerName: string,
  spicePref: string,
  dietaryTags: string[] = [],
  restaurantName: string = "MasalaCraft"
) => {
  const guestName = toTitle(customerName);
  const spice = spicePref || "Medium";
  const dietaryNote = getDietaryNote(dietaryTags);
  const promoCode = `${restaurantName.replace(/\s+/g, "").slice(0, 4).toUpperCase()}FEST`;

  return `Namaste ${guestName}! 👋\n\nWe are delighted to invite you to ${restaurantName}'s special ${topic}. Our chefs have curated a menu for guests who love ${spice} spice and authentic Indian flavors. ${dietaryNote}\n\nUse code ${promoCode} for a special celebration offer. We look forward to hosting you for a memorable dining experience.`;
};

export const analyzeCustomerTrends = async (
  customers: Customer[],
  orders: Order[] = [],
  restaurantName: string = "MasalaCraft"
) => {
  const totalSpend = customers.reduce((sum, customer) => sum + (customer.totalSpend || 0), 0);
  const vipCount = customers.filter(customer => customer.tier === "Gold" || customer.tier === "Maharaja VIP").length;
  const highSpice = customers.filter(customer => /teekha|spicy|hot/i.test(customer.spicePreference || "")).length;
  const vegOrJain = customers.filter(customer =>
    customer.dietaryTags.some(tag => /jain|veg|vegetarian/i.test(tag))
  ).length;
  const avgOrder = orders.length ? orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0) / orders.length : 0;

  return `### Strategic Intelligence for ${restaurantName}

- **High-spice loyalty**: ${highSpice} guests prefer bold spice profiles, making fiery dishes and chef specials a high-conversion upsell.
- **Premium guest retention**: ${vipCount} high-value patrons should receive personalized offers and loyalty outreach to protect repeat visits.
- **Dining diversity opportunity**: ${vegOrJain} customers prefer Jain or vegetarian-friendly experiences, which can be highlighted in family dining campaigns.
- **Average order performance**: The current basket average is ₹${Math.round(avgOrder || 0)} per order, with strong room for upsell on drinks, breads, and dessert pairings.
- **Action plan**: Promote family thali bundles, premium biryani counters, and dedicated Jain dining offers on weekends to improve table turns and average revenue.`;
};

export const suggestUpsellCombo = async (dishName: string, spicePreference: string = "Medium") => {
  const normalizedDish = (dishName || "").toLowerCase();
  const normalizedSpice = (spicePreference || "Medium").toLowerCase();

  if (normalizedDish.includes("biryani")) {
    return "• Mango Lassi — balances spice and adds a cooling finish\n• Garlic Naan — perfect for soaking up rich gravies";
  }

  if (normalizedDish.includes("butter chicken") || normalizedDish.includes("chicken")) {
    return "• Butter Garlic Naan — pairs well with creamy sauces\n• Mint Cooler — refreshes the palate after rich bites";
  }

  if (normalizedDish.includes("paneer") || normalizedDish.includes("veg") || normalizedDish.includes("dal")) {
    return "• Jeera Rice — complements vegetarian gravies\n• Masala Chai — brings warmth and balance to the meal";
  }

  if (normalizedSpice.includes("teekha") || normalizedSpice.includes("spicy") || normalizedSpice.includes("hot")) {
    return "• Sweet Lassi — cools the palate\n• Crispy Papad — adds crunch without overwhelming heat";
  }

  return "• Tandoori Roti — a classic side for curries\n• Alphonso Mango Lassi — a smooth, balanced pairing";
};
