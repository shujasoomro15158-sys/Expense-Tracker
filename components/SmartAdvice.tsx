
import React, { useState, useEffect } from 'react';
import { Sparkles, BrainCircuit, RefreshCw } from 'lucide-react';
import { Expense, SpendingInsight } from '../types';
import { getSpendingInsights } from '../services/geminiService';

interface SmartAdviceProps {
  expenses: Expense[];
}

const SmartAdvice: React.FC<SmartAdviceProps> = ({ expenses }) => {
  const [insight, setInsight] = useState<SpendingInsight | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchInsights = async () => {
    if (expenses.length < 3) return;
    setLoading(true);
    const data = await getSpendingInsights(expenses);
    setInsight(data);
    setLoading(false);
  };

  useEffect(() => {
    if (expenses.length >= 3 && !insight) {
      fetchInsights();
    }
  }, [expenses.length]);

  if (expenses.length < 3) {
    return (
      <div className="bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-slate-200 text-center mb-8">
        <Sparkles className="mx-auto mb-3 text-slate-300" size={32} />
        <p className="text-slate-500 text-sm font-medium">Add at least 3 expenses for Lumina AI to analyze your spending.</p>
      </div>
    );
  }

  const moodColors = {
    positive: 'bg-green-50 text-green-700 border-green-100',
    neutral: 'bg-blue-50 text-blue-700 border-blue-100',
    caution: 'bg-amber-50 text-amber-700 border-amber-100'
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8 overflow-hidden relative">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <BrainCircuit size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">Lumina AI Insights</h3>
            <p className="text-xs text-slate-400">Powered by Gemini Flash</p>
          </div>
        </div>
        <button 
          onClick={fetchInsights} 
          disabled={loading}
          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {loading ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-4 bg-slate-100 rounded w-3/4"></div>
          <div className="h-4 bg-slate-100 rounded w-full"></div>
          <div className="h-12 bg-slate-50 rounded w-full mt-4"></div>
        </div>
      ) : insight ? (
        <div className="space-y-4">
          <div className={`p-4 rounded-xl border ${moodColors[insight.mood]}`}>
            <p className="text-sm font-medium leading-relaxed">
              {insight.advice}
            </p>
          </div>
          <div className="bg-indigo-50/50 p-4 rounded-xl flex gap-3">
            <div className="text-indigo-600 shrink-0">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="text-xs uppercase font-bold text-indigo-400 tracking-wider mb-1">Saving Tip</p>
              <p className="text-sm text-slate-700">{insight.savingTip}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-slate-400 text-sm">Click the refresh button to generate insights.</p>
      )}
    </div>
  );
};

export default SmartAdvice;
