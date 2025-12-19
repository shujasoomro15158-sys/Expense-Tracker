
import { GoogleGenAI, Type } from "@google/genai";
import { Expense, SpendingInsight } from "../types";

export const getSpendingInsights = async (expenses: Expense[]): Promise<SpendingInsight> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const recentExpenses = expenses.slice(-15);
  const totalSpend = expenses.reduce((sum, e) => sum + e.amount, 0);
  
  const prompt = `
    Analyze the following recent expenses and total budget. 
    Total Spending: $${totalSpend.toFixed(2)}
    Expenses: ${JSON.stringify(recentExpenses.map(e => ({ name: e.name, amount: e.amount, category: e.category })))}
    
    Provide a professional but friendly spending insight. 
    - advice: A 1-2 sentence analysis of their spending habits.
    - savingTip: A practical tip based on their highest category or trends.
    - mood: One of "positive", "neutral", or "caution" based on spending volume.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            advice: { type: Type.STRING },
            savingTip: { type: Type.STRING },
            mood: { type: Type.STRING, enum: ['positive', 'neutral', 'caution'] },
          },
          required: ['advice', 'savingTip', 'mood'],
        },
      },
    });

    const result = JSON.parse(response.text || '{}');
    return result as SpendingInsight;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      advice: "Keep tracking your expenses to see detailed insights here!",
      savingTip: "Consider setting a weekly budget for your most frequent categories.",
      mood: 'neutral'
    };
  }
};
