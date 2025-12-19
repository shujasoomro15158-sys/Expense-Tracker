
import React from 'react';
import { Utensils, Home, PartyPopper, Zap, Car, HeartPulse, CreditCard } from 'lucide-react';
import { Category } from './types';

export const CATEGORIES: { value: Category; label: string; icon: React.ReactNode; color: string }[] = [
  { value: 'Food', label: 'Food', icon: <Utensils size={18} />, color: '#ef4444' },
  { value: 'Rent', label: 'Rent', icon: <Home size={18} />, color: '#3b82f6' },
  { value: 'Fun', label: 'Fun', icon: <PartyPopper size={18} />, color: '#f59e0b' },
  { value: 'Utilities', label: 'Utilities', icon: <Zap size={18} />, color: '#10b981' },
  { value: 'Transport', label: 'Transport', icon: <Car size={18} />, color: '#8b5cf6' },
  { value: 'Health', label: 'Health', icon: <HeartPulse size={18} />, color: '#ec4899' },
  { value: 'Other', label: 'Other', icon: <CreditCard size={18} />, color: '#64748b' },
];

export const STORAGE_KEY = 'lumina_expenses_data';
