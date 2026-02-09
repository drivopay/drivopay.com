"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ChevronLeft, PiggyBank, TrendingUp, Shield, Zap, Target,
  DollarSign, Clock, Plus, Gift, Award
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { UserMenu } from '@/components/UserMenu';
import Image from 'next/image';

export default function SavingsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'savings' | 'invest' | 'emergency'>('savings');

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

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

  // Mock data
  const totalSavings = 25000;
  const emergencyFund = 5000;
  const investments = 12000;
  const monthlyGoal = 5000;
  const currentMonthSaved = 3500;

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
              <button onClick={() => router.push('/dashboard/savings')} className="text-emerald-600 font-semibold">Savings</button>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Savings & Investment</h1>
          <p className="text-gray-600">Secure your future with smart savings and investments</p>
        </motion.div>

        {/* Total Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl p-8 text-white shadow-2xl mb-8"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <p className="text-emerald-100 mb-2 flex items-center gap-2">
                <PiggyBank className="w-5 h-5" />
                Total Savings
              </p>
              <p className="text-5xl font-bold mb-2">₹{totalSavings.toLocaleString()}</p>
              <div className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 w-fit backdrop-blur-sm">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-semibold">+12% this month</span>
              </div>
            </div>

            <div>
              <p className="text-emerald-100 mb-2">Emergency Fund</p>
              <p className="text-5xl font-bold mb-2">₹{emergencyFund.toLocaleString()}</p>
              <p className="text-sm text-emerald-100">₹10,000 goal • 50% complete</p>
            </div>

            <div>
              <p className="text-emerald-100 mb-2">Investments</p>
              <p className="text-5xl font-bold mb-2">₹{investments.toLocaleString()}</p>
              <p className="text-sm text-emerald-100">Growing at 8% p.a.</p>
            </div>
          </div>
        </motion.div>

        {/* Tab Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-3 mb-8"
        >
          <Button
            variant={activeTab === 'savings' ? 'default' : 'outline'}
            onClick={() => setActiveTab('savings')}
            className={activeTab === 'savings' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
          >
            Auto-Save Goals
          </Button>
          <Button
            variant={activeTab === 'invest' ? 'default' : 'outline'}
            onClick={() => setActiveTab('invest')}
            className={activeTab === 'invest' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
          >
            Investments
          </Button>
          <Button
            variant={activeTab === 'emergency' ? 'default' : 'outline'}
            onClick={() => setActiveTab('emergency')}
            className={activeTab === 'emergency' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
          >
            Emergency SOS
          </Button>
        </motion.div>

        {/* Auto-Save Section */}
        {activeTab === 'savings' && (
          <div className="space-y-6">
            {/* Current Goal Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Monthly Savings Goal</h3>
                  <p className="text-gray-600">Save ₹{monthlyGoal.toLocaleString()} every month</p>
                </div>
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Target className="w-8 h-8 text-emerald-600" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-600">Progress this month</span>
                    <span className="text-sm font-bold text-emerald-600">{Math.round((currentMonthSaved / monthlyGoal) * 100)}%</span>
                  </div>
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(currentMonthSaved / monthlyGoal) * 100}%` }}
                      transition={{ delay: 0.4, duration: 1 }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl">
                  <div>
                    <p className="text-sm text-emerald-700">Saved so far</p>
                    <p className="text-2xl font-bold text-emerald-600">₹{currentMonthSaved.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Remaining</p>
                    <p className="text-2xl font-bold text-gray-900">₹{(monthlyGoal - currentMonthSaved).toLocaleString()}</p>
                  </div>
                </div>

                <Button className="w-full h-14 bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="w-5 h-5 mr-2" />
                  Add Money to Savings
                </Button>
              </div>
            </motion.div>

            {/* Auto-Save Rules */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Smart Auto-Save Rules</h3>
              <div className="space-y-4">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Zap className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Daily Auto-Save</p>
                        <p className="text-sm text-gray-600">Save ₹50 every day automatically</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-blue-800 bg-blue-100 rounded-lg p-3">
                    💡 Saves ₹1,500/month = ₹18,000/year
                  </p>
                </div>

                <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Gift className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Round-Up Savings</p>
                        <p className="text-sm text-gray-600">Save change from every transaction</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-purple-800 bg-purple-100 rounded-lg p-3">
                    💡 Withdrawing ₹147 saves ₹3 (rounds to ₹150)
                  </p>
                </div>

                <div className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl border border-orange-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Bonus Day Savings</p>
                        <p className="text-sm text-gray-600">Save 10% on days you earn ₹2000+</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-orange-800 bg-orange-100 rounded-lg p-3">
                    💡 Helps you save more on good earning days
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Investment Section */}
        {activeTab === 'invest' && (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {/* Digital Gold */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Digital Gold</h3>
                      <p className="text-sm text-gray-600">Start from ₹10</p>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Current Holdings</p>
                  <p className="text-4xl font-bold text-yellow-600 mb-1">2.5g</p>
                  <p className="text-gray-600">Worth ₹15,000</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-sm text-gray-600">Today&apos;s Rate</span>
                    <span className="font-bold text-gray-900">₹6,000/g</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-sm text-gray-600">Returns</span>
                    <span className="font-bold text-green-600">+8.5%</span>
                  </div>
                  <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Buy More Gold
                  </Button>
                </div>
              </div>

              {/* Mutual Funds */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-200">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Mutual Funds</h3>
                      <p className="text-sm text-gray-600">SIP from ₹500/month</p>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Total Investment</p>
                  <p className="text-4xl font-bold text-indigo-600 mb-1">₹12,000</p>
                  <p className="text-gray-600">Current value: ₹12,960</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-sm text-gray-600">Monthly SIP</span>
                    <span className="font-bold text-gray-900">₹1,000</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-sm text-gray-600">Returns (6m)</span>
                    <span className="font-bold text-green-600">+8.0%</span>
                  </div>
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Start New SIP
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Why Invest */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-200"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Why Invest with DrivoPay?</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">100% Secure</p>
                    <p className="text-sm text-gray-600">SEBI regulated & insured</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Start Small</p>
                    <p className="text-sm text-gray-600">Invest from just ₹10</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Beat Inflation</p>
                    <p className="text-sm text-gray-600">8-12% annual returns</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Emergency SOS Section */}
        {activeTab === 'emergency' && (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-red-600 to-orange-600 rounded-3xl p-8 text-white shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">Emergency SOS Fund</h2>
                  <p className="text-red-100">Instant ₹5,000 for accidents or breakdowns</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <p className="text-red-100 mb-2">Available Now</p>
                  <p className="text-5xl font-bold mb-4">₹5,000</p>
                  <Button className="w-full bg-white text-red-600 hover:bg-gray-100 h-12">
                    <Zap className="w-5 h-5 mr-2" />
                    Request Emergency Fund
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-white">
                    <Clock className="w-5 h-5" />
                    <span>Instant approval in 60 seconds</span>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                    <Shield className="w-5 h-5" />
                    <span>No questions asked</span>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                    <DollarSign className="w-5 h-5" />
                    <span>Repay in 30 days from earnings</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* When to Use */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">When to Use Emergency SOS?</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: '🚗', title: 'Vehicle Breakdown', desc: 'Urgent repairs needed' },
                  { icon: '🏥', title: 'Medical Emergency', desc: 'Sudden health expenses' },
                  { icon: '⚙️', title: 'Accident Repairs', desc: 'Vehicle accident damages' },
                  { icon: '💳', title: 'Urgent Bills', desc: 'Cannot be delayed' }
                ].map((item, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <p className="font-bold text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Insurance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Protect Yourself with Insurance</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-3">Health Insurance</h4>
                  <p className="text-3xl font-bold text-blue-600 mb-4">₹299/month</p>
                  <ul className="space-y-2 mb-4">
                    <li className="text-sm text-gray-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      ₹5 lakh coverage
                    </li>
                    <li className="text-sm text-gray-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      Cashless hospitals
                    </li>
                    <li className="text-sm text-gray-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      No waiting period
                    </li>
                  </ul>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Buy Now
                  </Button>
                </div>

                <div className="bg-white rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-3">Accident Insurance</h4>
                  <p className="text-3xl font-bold text-blue-600 mb-4">₹149/month</p>
                  <ul className="space-y-2 mb-4">
                    <li className="text-sm text-gray-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      ₹10 lakh coverage
                    </li>
                    <li className="text-sm text-gray-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      Instant claim support
                    </li>
                    <li className="text-sm text-gray-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      24/7 assistance
                    </li>
                  </ul>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Buy Now
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
