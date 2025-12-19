
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Wallet, TrendingUp, Calendar } from 'lucide-react';
import { Expense } from '../types';
import { CATEGORIES } from '../constants';

interface DashboardProps {
  expenses: Expense[];
}

const Dashboard: React.FC<DashboardProps> = ({ expenses }) => {
  const totalBalance = expenses.reduce((sum, e) => sum + e.amount, 0);
  
  const categoryTotals = CATEGORIES.map(cat => {
    const total = expenses
      .filter(e => e.category === cat.value)
      .reduce((sum, e) => sum + e.amount, 0);
    return { name: cat.label, value: total, color: cat.color };
  }).filter(item => item.value > 0);

  const monthSpend = expenses
    .filter(e => new Date(e.date).getMonth() === new Date().getMonth())
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Stats Cards */}
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-2xl shadow-lg text-white">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <Wallet size={24} />
            </div>
            <span className="text-xs font-medium px-2 py-1 bg-white/20 rounded-full">Overall</span>
          </div>
          <p className="text-blue-100 text-sm font-medium">Total Balance</p>
          <h3 className="text-3xl font-bold mt-1">${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-xl">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-sm">Monthly Spend</p>
              <h4 className="text-xl font-bold text-slate-800">${monthSpend.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h4>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-sm">Avg. Transaction</p>
              <h4 className="text-xl font-bold text-slate-800">
                ${expenses.length > 0 ? (totalBalance / expenses.length).toFixed(2) : '0.00'}
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 min-h-[300px]">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Spending by Category</h3>
        <div className="w-full h-[250px]">
          {categoryTotals.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryTotals}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryTotals.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => `$${value.toFixed(2)}`}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400">
              No data to display yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
