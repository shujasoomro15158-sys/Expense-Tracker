
import React from 'react';
import { Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { Expense } from '../types';
import { CATEGORIES } from '../constants';

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDeleteExpense }) => {
  const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-50 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-800">Transaction History</h3>
        <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-full">
          {expenses.length} Total
        </span>
      </div>
      <div className="max-h-[500px] overflow-y-auto">
        {sortedExpenses.length > 0 ? (
          <div className="divide-y divide-slate-50">
            {sortedExpenses.map((expense) => {
              const categoryInfo = CATEGORIES.find(c => c.value === expense.category);
              return (
                <div key={expense.id} className="p-4 hover:bg-slate-50 transition-colors group flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div 
                      className="p-3 rounded-xl flex items-center justify-center text-white"
                      style={{ backgroundColor: categoryInfo?.color || '#64748b' }}
                    >
                      {categoryInfo?.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">{expense.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <CalendarIcon size={12} />
                        {new Date(expense.date).toLocaleDateString()}
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        {expense.category}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold text-slate-900">
                      -${expense.amount.toFixed(2)}
                    </span>
                    <button
                      onClick={() => onDeleteExpense(expense.id)}
                      className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center text-slate-400">
            <div className="mb-4 flex justify-center">
              <div className="p-4 bg-slate-50 rounded-full">
                <CalendarIcon size={48} className="text-slate-200" />
              </div>
            </div>
            <p className="text-sm font-medium">No transactions found</p>
            <p className="text-xs">Start adding some expenses to see them here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
