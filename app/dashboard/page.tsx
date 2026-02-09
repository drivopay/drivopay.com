"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowUpRight, ArrowDownLeft, TrendingUp, Wallet,
  CreditCard, Plus, Download, Settings, Bell,
  Clock, Calendar, DollarSign, Zap, Gift, BarChart3,
  ChevronRight, Check, X as CloseIcon, Receipt, FileText,
  PiggyBank, Shield, ArrowDownToLine
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { UserMenu } from '@/components/UserMenu';
import { WithdrawDialog } from '@/components/WithdrawDialog';
import { ReceivePaymentDialog } from '@/components/ReceivePaymentDialog';
import { NotificationsDropdown } from '@/components/NotificationsDropdown';
import { LanguageSelector } from '@/components/LanguageSelector';
import { AIPredictions } from '@/components/AIPredictions';
import { RewardsCoupons } from '@/components/RewardsCoupons';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';

// Transaction type
interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
}

// Mock data generator
const generateMockTransactions = (): Transaction[] => {
  const descriptions = [
    { type: 'credit' as const, desc: 'Ride payment from customer' },
    { type: 'credit' as const, desc: 'Delivery payment' },
    { type: 'credit' as const, desc: 'Tip received' },
    { type: 'debit' as const, desc: 'Withdrawal to bank' },
    { type: 'debit' as const, desc: 'Fuel purchase' },
  ];

  return Array.from({ length: 8 }, (_, i) => {
    const item = descriptions[Math.floor(Math.random() * descriptions.length)];
    return {
      id: `txn-${i}`,
      type: item.type,
      amount: Math.floor(Math.random() * 500) + 50,
      description: item.desc,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      status: Math.random() > 0.1 ? 'completed' : 'pending'
    };
  });
};

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [receivePaymentOpen, setReceivePaymentOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    setTransactions(generateMockTransactions());
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
  const todayEarnings = 2450;
  const todayRides = 12;

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
              <button onClick={() => router.push('/dashboard')} className="text-emerald-600 font-semibold">{t('dashboard')}</button>
              <button onClick={() => router.push('/dashboard/wallet')} className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">{t('wallet')}</button>
              <button onClick={() => router.push('/dashboard/earnings')} className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">{t('earnings')}</button>
              <button onClick={() => router.push('/dashboard/loans')} className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">{t('loans')}</button>
              <button onClick={() => router.push('/dashboard/settings')} className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">{t('settings')}</button>
            </div>

            <div className="flex items-center gap-4">
              <NotificationsDropdown />
              <LanguageSelector variant="compact" />
              <UserMenu />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {t('welcome')}, {user.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-600">Here's what's happening with your earnings {t('today').toLowerCase()}.</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Balance Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />

            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-emerald-100 mb-2">{t('totalBalance')}</p>
                  <h2 className="text-5xl font-bold">₹{totalBalance.toLocaleString()}</h2>
                </div>
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Wallet className="w-7 h-7" />
                </div>
              </div>

              <div className="flex items-center gap-2 mb-8">
                <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1 backdrop-blur-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-semibold">+18% this week</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setReceivePaymentOpen(true)}
                  className="bg-white text-emerald-600 hover:bg-gray-100 rounded-xl flex-1 font-semibold"
                >
                  <ArrowDownToLine className="w-4 h-4 mr-2" />
                  {t('receive')}
                </Button>
                <Button
                  onClick={() => setWithdrawDialogOpen(true)}
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-xl flex-1 backdrop-blur-sm font-semibold"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t('withdraw')}
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Today's Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  Today
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-1">Earnings</p>
              <p className="text-3xl font-bold text-gray-900">₹{todayEarnings}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  Today
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-1">Completed</p>
              <p className="text-3xl font-bold text-gray-900">{todayRides} rides</p>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">{t('quickActions')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <button
              onClick={() => router.push('/dashboard/loans')}
              className="bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-8 -mt-8" />
              <div className="relative">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3 mx-auto">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-semibold">Get Instant Loan</p>
                <p className="text-xs text-purple-100 mt-1">Up to ₹2,000</p>
              </div>
            </button>

            <button
              onClick={() => router.push('/dashboard/savings')}
              className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-8 -mt-8" />
              <div className="relative">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3 mx-auto">
                  <PiggyBank className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-semibold">Smart Savings</p>
                <p className="text-xs text-emerald-100 mt-1">Auto-save daily</p>
              </div>
            </button>

            <button
              onClick={() => router.push('/dashboard/expenses')}
              className="bg-gradient-to-br from-red-600 to-orange-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-8 -mt-8" />
              <div className="relative">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3 mx-auto">
                  <Receipt className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-semibold">Track Expenses</p>
                <p className="text-xs text-red-100 mt-1">Fuel & Maintenance</p>
              </div>
            </button>

            <button
              onClick={() => router.push('/dashboard/earnings')}
              className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-8 -mt-8" />
              <div className="relative">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3 mx-auto">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-semibold">Analytics</p>
                <p className="text-xs text-blue-100 mt-1">View Reports</p>
              </div>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => router.push('/dashboard/settings')}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-3 mx-auto">
                <CreditCard className="w-6 h-6 text-emerald-600" />
              </div>
              <p className="text-sm font-semibold text-gray-900">Add Bank</p>
            </button>

            <button
              onClick={() => router.push('/dashboard/earnings')}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3 mx-auto">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm font-semibold text-gray-900">View Reports</p>
            </button>

            <button
              onClick={() => router.push('/dashboard/savings')}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-3 mx-auto">
                <Shield className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="text-sm font-semibold text-gray-900">Emergency SOS</p>
            </button>

            <button
              onClick={() => {
                const rewardsSection = document.getElementById('rewards-section');
                rewardsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-lg border-2 border-purple-200 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-3 mx-auto">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-semibold text-gray-900">View Rewards</p>
            </button>
          </div>
        </motion.div>

        {/* AI Predictions Section */}
        <AIPredictions />

        {/* Rewards & Coupons Section */}
        <motion.div
          id="rewards-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <RewardsCoupons />
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">{t('recentTransactions')}</h3>
            <button
              onClick={() => router.push('/dashboard/wallet')}
              className="text-emerald-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
            >
              View all
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 divide-y divide-gray-100">
            {transactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
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
                        <ArrowDownLeft className={`w-5 h-5 ${
                          transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`} />
                      ) : (
                        <ArrowUpRight className={`w-5 h-5 ${
                          transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`} />
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
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                        {transaction.status === 'pending' && (
                          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">
                            Pending
                          </span>
                        )}
                        {transaction.status === 'completed' && (
                          <Check className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-lg ${
                      transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Withdraw Dialog */}
      <WithdrawDialog
        open={withdrawDialogOpen}
        onOpenChange={setWithdrawDialogOpen}
        availableBalance={totalBalance}
      />

      {/* Receive Payment Dialog */}
      <ReceivePaymentDialog
        open={receivePaymentOpen}
        onOpenChange={setReceivePaymentOpen}
      />
    </div>
  );
}
