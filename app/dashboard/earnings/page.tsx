"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  TrendingUp, TrendingDown, Calendar, ChevronLeft,
  DollarSign, Zap, Clock, MapPin, Star, Award
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { UserMenu } from '@/components/UserMenu';
import Image from 'next/image';

export default function EarningsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('week');

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

  const earningsData = {
    today: { amount: 2450, rides: 12, hours: 6.5, avgPerRide: 204 },
    week: { amount: 14680, rides: 68, hours: 42, avgPerRide: 216 },
    month: { amount: 58420, rides: 287, hours: 168, avgPerRide: 204 }
  };

  const current = earningsData[selectedPeriod];

  const weeklyData = [
    { day: 'Mon', amount: 2100, rides: 10 },
    { day: 'Tue', amount: 2450, rides: 12 },
    { day: 'Wed', amount: 1890, rides: 9 },
    { day: 'Thu', amount: 2280, rides: 11 },
    { day: 'Fri', amount: 2650, rides: 13 },
    { day: 'Sat', amount: 1910, rides: 8 },
    { day: 'Sun', amount: 1400, rides: 5 },
  ];

  const maxAmount = Math.max(...weeklyData.map(d => d.amount));

  const peakHours = [
    { time: '8-10 AM', earnings: '₹3,240', percentage: 85 },
    { time: '12-2 PM', earnings: '₹2,890', percentage: 75 },
    { time: '6-9 PM', earnings: '₹4,120', percentage: 100 },
  ];

  const topRoutes = [
    { from: 'Connaught Place', to: 'Airport', count: 15, earnings: '₹4,250' },
    { from: 'Nehru Place', to: 'Gurgaon', count: 12, earnings: '₹3,840' },
    { from: 'Karol Bagh', to: 'Noida', count: 10, earnings: '₹3,200' },
  ];

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
              <button onClick={() => router.push('/dashboard/earnings')} className="text-emerald-600 font-semibold">Earnings</button>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Earnings Analytics</h1>
          <p className="text-gray-600">Track your performance and optimize your earnings</p>
        </motion.div>

        {/* Period Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3 mb-8"
        >
          <Button
            variant={selectedPeriod === 'today' ? 'default' : 'outline'}
            onClick={() => setSelectedPeriod('today')}
            className={selectedPeriod === 'today' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
          >
            Today
          </Button>
          <Button
            variant={selectedPeriod === 'week' ? 'default' : 'outline'}
            onClick={() => setSelectedPeriod('week')}
            className={selectedPeriod === 'week' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
          >
            This Week
          </Button>
          <Button
            variant={selectedPeriod === 'month' ? 'default' : 'outline'}
            onClick={() => setSelectedPeriod('month')}
            className={selectedPeriod === 'month' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
          >
            This Month
          </Button>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-6 text-white shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8" />
              <div className="flex items-center gap-1 bg-white/20 rounded-full px-2 py-1 text-sm backdrop-blur-sm">
                <TrendingUp className="w-4 h-4" />
                +18%
              </div>
            </div>
            <p className="text-emerald-100 mb-1">Total Earnings</p>
            <p className="text-3xl font-bold">₹{current.amount.toLocaleString()}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-gray-600 mb-1">Completed</p>
            <p className="text-3xl font-bold text-gray-900">{current.rides}</p>
            <p className="text-sm text-gray-500 mt-1">rides</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <p className="text-gray-600 mb-1">Online Hours</p>
            <p className="text-3xl font-bold text-gray-900">{current.hours}</p>
            <p className="text-sm text-gray-500 mt-1">hours</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <Award className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <p className="text-gray-600 mb-1">Avg per Ride</p>
            <p className="text-3xl font-bold text-gray-900">₹{current.avgPerRide}</p>
            <p className="text-sm text-gray-500 mt-1">average</p>
          </motion.div>
        </div>

        {/* Weekly Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">Daily Earnings (This Week)</h3>
          <div className="flex items-end justify-between gap-4 h-64">
            {weeklyData.map((day, index) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-3">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(day.amount / maxAmount) * 100}%` }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  className="w-full bg-gradient-to-t from-emerald-600 to-teal-500 rounded-t-xl relative group cursor-pointer hover:from-emerald-700 hover:to-teal-600 transition-all"
                >
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-sm font-semibold">
                    ₹{day.amount.toLocaleString()}
                    <div className="text-xs text-gray-300">{day.rides} rides</div>
                  </div>
                </motion.div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-900">{day.day}</p>
                  <p className="text-xs text-gray-500">{day.rides} rides</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Peak Hours and Top Routes */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Peak Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Peak Earning Hours</h3>
            <div className="space-y-6">
              {peakHours.map((hour, index) => (
                <div key={hour.time}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-emerald-600" />
                      <span className="font-semibold text-gray-900">{hour.time}</span>
                    </div>
                    <span className="font-bold text-emerald-600">{hour.earnings}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${hour.percentage}%` }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-emerald-50 rounded-xl">
              <p className="text-sm text-emerald-800">
                💡 <strong>Tip:</strong> Your peak earning time is 6-9 PM. Try to be online during these hours for maximum earnings.
              </p>
            </div>
          </motion.div>

          {/* Top Routes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Top Earning Routes</h3>
            <div className="space-y-4">
              {topRoutes.map((route, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-2 flex-1">
                      <MapPin className="w-5 h-5 text-emerald-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900">{route.from}</p>
                        <p className="text-sm text-gray-500">to {route.to}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-emerald-600">{route.earnings}</p>
                      <p className="text-xs text-gray-500">{route.count} trips</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-800">
                📍 <strong>Suggestion:</strong> Focus on routes with airport connections for higher fares and tips.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Performance Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Your Performance Rating</h3>
              <p className="text-gray-600 mb-4">Keep up the great work!</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-2xl font-bold text-gray-900">4.9</span>
              </div>
            </div>
            <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-white">
              <Award className="w-16 h-16" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
