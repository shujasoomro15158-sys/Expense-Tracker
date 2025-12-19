
export type Category = 'Food' | 'Rent' | 'Fun' | 'Utilities' | 'Transport' | 'Health' | 'Other';

export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: Category;
  date: string;
}

export interface SpendingInsight {
  advice: string;
  savingTip: string;
  mood: 'positive' | 'neutral' | 'caution';
}
