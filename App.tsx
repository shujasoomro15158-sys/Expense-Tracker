
import React, { useState, useEffect } from 'react';
import { Expense } from './types';
import { STORAGE_KEY } from './constants';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Dashboard from './components/Dashboard';
import SmartAdvice from './components/SmartAdvice';
import { LayoutDashboard, ReceiptText, PieChart } from 'lucide-react';

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setExpenses(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse expenses from localStorage", e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever expenses change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    }
  }, [expenses, isInitialized]);

  const handleAddExpense = (newExpense: Expense) => {
    setExpenses(prev => [...prev, newExpense]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <ReceiptText size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Lumina <span className="text-blue-600">Finance</span></h1>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
              <a href="#" className="flex items-center gap-2 text-blue-600"><LayoutDashboard size={18} /> Dashboard</a>
              <a href="#" className="flex items-center gap-2 hover:text-slate-900 transition-colors"><ReceiptText size={18} /> Transactions</a>
              <a href="#" className="flex items-center gap-2 hover:text-slate-900 transition-colors"><PieChart size={18} /> Reports</a>
            </nav>
            <div className="h-8 w-8 bg-slate-100 rounded-full border border-slate-200"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 mt-8">
        <Dashboard expenses={expenses} />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <ExpenseForm onAddExpense={handleAddExpense} />
              <SmartAdvice expenses={expenses} />
            </div>
          </div>
          
          <div className="lg:col-span-8">
            <ExpenseList 
              expenses={expenses} 
              onDeleteExpense={handleDeleteExpense} 
            />
          </div>
        </div>
      </main>

      {/* Footer / Mobile Nav (Simplified) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 flex justify-around p-4 z-50">
        <button className="text-blue-600"><LayoutDashboard size={24} /></button>
        <button className="text-slate-400"><ReceiptText size={24} /></button>
        <button className="text-slate-400"><PieChart size={24} /></button>
      </div>
    </div>
  );
};

export default App;
