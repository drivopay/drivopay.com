"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ChevronLeft, Plus, Fuel, Wrench, Receipt, Coffee, Phone,
  DollarSign, TrendingDown, Calendar, Filter, Download,
  PieChart, BarChart3, FileText
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { UserMenu } from '@/components/UserMenu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

interface Expense {
  id: string;
  category: 'fuel' | 'maintenance' | 'toll' | 'food' | 'other';
  amount: number;
  description: string;
  date: Date;
  receipt?: string;
}

export default function ExpensesPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [addExpenseOpen, setAddExpenseOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    // Generate mock expenses
    const mockExpenses: Expense[] = [
      { id: '1', category: 'fuel', amount: 2500, description: 'HP Petrol Pump', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
      { id: '2', category: 'maintenance', amount: 1200, description: 'Oil Change', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
      { id: '3', category: 'toll', amount: 150, description: 'DND Flyway', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
      { id: '4', category: 'food', amount: 250, description: 'Lunch Break', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
      { id: '5', category: 'fuel', amount: 2800, description: 'Indian Oil', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
      { id: '6', category: 'maintenance', amount: 800, description: 'Tire Air & Check', date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      { id: '7', category: 'toll', amount: 200, description: 'Yamuna Expressway', date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) },
      { id: '8', category: 'food', amount: 180, description: 'Dinner', date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000) },
    ];
    setExpenses(mockExpenses);
  }, []);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const categoryTotals = {
    fuel: expenses.filter(e => e.category === 'fuel').reduce((sum, e) => sum + e.amount, 0),
    maintenance: expenses.filter(e => e.category === 'maintenance').reduce((sum, e) => sum + e.amount, 0),
    toll: expenses.filter(e => e.category === 'toll').reduce((sum, e) => sum + e.amount, 0),
    food: expenses.filter(e => e.category === 'food').reduce((sum, e) => sum + e.amount, 0),
    other: expenses.filter(e => e.category === 'other').reduce((sum, e) => sum + e.amount, 0),
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'fuel': return Fuel;
      case 'maintenance': return Wrench;
      case 'toll': return Receipt;
      case 'food': return Coffee;
      default: return DollarSign;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'fuel': return 'bg-red-100 text-red-600';
      case 'maintenance': return 'bg-blue-100 text-blue-600';
      case 'toll': return 'bg-purple-100 text-purple-600';
      case 'food': return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const weeklyEarnings = 14680;
  const profitMargin = ((weeklyEarnings - totalExpenses) / weeklyEarnings * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div
              className="relative w-48 h-16 py-2 cursor-pointer"
              onClick={() => router.push('/')}
            >
              <Image
                src="/output-onlinepngtools.png"
                alt="DrivoPay"
                fill
                className="object-contain object-left"
                priority
              />
            </div>

            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => router.push('/dashboard')} className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Dashboard</button>
              <button onClick={() => router.push('/dashboard/wallet')} className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Wallet</button>
              <button onClick={() => router.push('/dashboard/earnings')} className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Earnings</button>
              <button onClick={() => router.push('/dashboard/expenses')} className="text-emerald-600 font-semibold">Expenses</button>
              <button onClick={() => router.push('/dashboard/savings')} className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Savings</button>
              <button onClick={() => router.push('/dashboard/loans')} className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Loans</button>
              <button onClick={() => router.push('/dashboard/settings')} className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Settings</button>
            </div>

            <UserMenu />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 mb-6 font-medium transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Expense Tracker</h1>
              <p className="text-gray-600">Track and manage your business expenses</p>
            </div>
            <Button
              onClick={() => setAddExpenseOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 h-14 px-6"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Expense
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl p-6 text-white shadow-xl"
          >
            <TrendingDown className="w-8 h-8 mb-4" />
            <p className="text-red-100 mb-1">Total Expenses</p>
            <p className="text-4xl font-bold">₹{totalExpenses.toLocaleString()}</p>
            <p className="text-sm text-red-100 mt-2">This month</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-gray-600 mb-1">Profit Margin</p>
            <p className="text-3xl font-bold text-green-600">{profitMargin}%</p>
            <p className="text-sm text-gray-500 mt-2">After expenses</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-gray-600 mb-1">Avg Daily Expense</p>
            <p className="text-3xl font-bold text-gray-900">₹{Math.round(totalExpenses / 30).toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-2">Per day average</p>
          </motion.div>
        </div>

        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">Expense Breakdown by Category</h3>
          <div className="space-y-4">
            {Object.entries(categoryTotals).map(([category, amount]) => {
              const percentage = totalExpenses > 0 ? (amount / totalExpenses * 100).toFixed(0) : 0;
              const Icon = getCategoryIcon(category);

              return (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getCategoryColor(category)}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 capitalize">{category}</p>
                        <p className="text-sm text-gray-500">{percentage}% of total</p>
                      </div>
                    </div>
                    <p className="text-xl font-bold text-gray-900">₹{amount.toLocaleString()}</p>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Expenses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Recent Expenses</h3>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 divide-y divide-gray-100">
            {expenses.map((expense, index) => {
              const Icon = getCategoryIcon(expense.category);
              return (
                <motion.div
                  key={expense.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getCategoryColor(expense.category)}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{expense.description}</p>
                        <p className="text-sm text-gray-500 capitalize">{expense.category} • {expense.date.toLocaleDateString('en-IN')}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-red-600">-₹{expense.amount}</p>
                      <Button variant="ghost" size="sm" className="text-xs">
                        <FileText className="w-3 h-3 mr-1" />
                        Receipt
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
