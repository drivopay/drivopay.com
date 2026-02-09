"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowUpRight, ArrowDownLeft, Download, Plus,
  CreditCard, Building, ChevronLeft, Search, Filter,
  Clock, Check, AlertCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { UserMenu } from '@/components/UserMenu';
import { WithdrawDialog } from '@/components/WithdrawDialog';
import Image from 'next/image';
import { Input } from '@/components/ui/input';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
  category: string;
}

const generateAllTransactions = (): Transaction[] => {
  const categories = ['Ride', 'Delivery', 'Tip', 'Withdrawal', 'Fuel', 'Bonus'];
  const descriptions = [
    { type: 'credit' as const, desc: 'Ride payment from customer', cat: 'Ride' },
    { type: 'credit' as const, desc: 'Delivery payment', cat: 'Delivery' },
    { type: 'credit' as const, desc: 'Tip received', cat: 'Tip' },
    { type: 'credit' as const, desc: 'Weekly bonus earned', cat: 'Bonus' },
    { type: 'debit' as const, desc: 'Withdrawal to bank', cat: 'Withdrawal' },
    { type: 'debit' as const, desc: 'Fuel purchase at HP', cat: 'Fuel' },
  ];

  return Array.from({ length: 25 }, (_, i) => {
    const item = descriptions[Math.floor(Math.random() * descriptions.length)];
    return {
      id: `txn-${i}`,
      type: item.type,
      amount: Math.floor(Math.random() * 500) + 50,
      description: item.desc,
      timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      status: Math.random() > 0.05 ? 'completed' : (Math.random() > 0.5 ? 'pending' : 'failed'),
      category: item.cat
    };
  }).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export default function WalletPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'credit' | 'debit'>('all');
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    setTransactions(generateAllTransactions());
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

  const totalBalance = 12450;
  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || t.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const totalIncome = transactions.filter(t => t.type === 'credit' && t.status === 'completed').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'debit' && t.status === 'completed').reduce((sum, t) => sum + t.amount, 0);

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
              <button onClick={() => router.push('/dashboard/wallet')} className="text-emerald-600 font-semibold">Wallet</button>
              <button onClick={() => router.push('/dashboard/earnings')} className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Earnings</button>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Wallet</h1>
          <p className="text-gray-600">Manage your earnings and transactions</p>
        </motion.div>

        {/* Balance Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl p-8 text-white shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-emerald-100">Available Balance</p>
              <CreditCard className="w-6 h-6 text-emerald-100" />
            </div>
            <h2 className="text-4xl font-bold mb-6">₹{totalBalance.toLocaleString()}</h2>
            <div className="flex gap-3">
              <Button
                onClick={() => setWithdrawDialogOpen(true)}
                className="bg-white text-emerald-600 hover:bg-gray-100 rounded-xl flex-1 font-semibold"
              >
                <Download className="w-4 h-4 mr-2" />
                Withdraw
              </Button>
              <Button
                onClick={() => router.push('/dashboard/settings')}
                className="bg-white/20 hover:bg-white/30 text-white border-0 rounded-xl backdrop-blur-sm"
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-600">Total Income</p>
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <ArrowDownLeft className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-green-600">₹{totalIncome.toLocaleString()}</h3>
            <p className="text-sm text-gray-500 mt-2">Last 30 days</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-600">Total Expenses</p>
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-red-600">₹{totalExpense.toLocaleString()}</h3>
            <p className="text-sm text-gray-500 mt-2">Last 30 days</p>
          </motion.div>
        </div>

        {/* Linked Banks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Linked Banks</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Building className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">HDFC Bank</p>
                  <p className="text-sm text-gray-500">****4567</p>
                </div>
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                Primary
              </span>
            </div>

            <button
              onClick={() => router.push('/dashboard/settings')}
              className="bg-white rounded-2xl p-6 shadow-lg border-2 border-dashed border-gray-300 hover:border-emerald-500 hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 text-gray-600 hover:text-emerald-600"
            >
              <Plus className="w-5 h-5" />
              <span className="font-semibold">Add Bank Account</span>
            </button>
          </div>
        </motion.div>

        {/* Transactions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Transaction History</h3>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 rounded-xl border-gray-200"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterType === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterType('all')}
                className={filterType === 'all' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
              >
                All
              </Button>
              <Button
                variant={filterType === 'credit' ? 'default' : 'outline'}
                onClick={() => setFilterType('credit')}
                className={filterType === 'credit' ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                Income
              </Button>
              <Button
                variant={filterType === 'debit' ? 'default' : 'outline'}
                onClick={() => setFilterType('debit')}
                className={filterType === 'debit' ? 'bg-red-600 hover:bg-red-700' : ''}
              >
                Expenses
              </Button>
            </div>
          </div>

          {/* Transactions List */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 divide-y divide-gray-100">
            {filteredTransactions.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-gray-500">No transactions found</p>
              </div>
            ) : (
              filteredTransactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        transaction.type === 'credit'
                          ? 'bg-green-100'
                          : 'bg-red-100'
                      }`}>
                        {transaction.type === 'credit' ? (
                          <ArrowDownLeft className="w-5 h-5 text-green-600" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{transaction.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <p className="text-xs text-gray-500">
                            {transaction.timestamp.toLocaleDateString('en-IN', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                            {transaction.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-3">
                      <div>
                        <p className={`font-bold text-lg ${
                          transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                        </p>
                        {transaction.status === 'pending' && (
                          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">
                            Pending
                          </span>
                        )}
                        {transaction.status === 'failed' && (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            Failed
                          </span>
                        )}
                      </div>
                      {transaction.status === 'completed' && (
                        <Check className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Withdraw Dialog */}
      <WithdrawDialog
        open={withdrawDialogOpen}
        onOpenChange={setWithdrawDialogOpen}
        availableBalance={totalBalance}
      />
    </div>
  );
}
