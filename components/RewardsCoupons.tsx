"use client"

import React from 'react';
import { motion } from 'framer-motion';
import {
  Gift, Zap, Fuel, Coffee, Wrench, Lock, CheckCircle,
  TrendingUp, Star, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Coupon {
  id: string;
  title: string;
  discount: number;
  description: string;
  icon: React.ElementType;
  color: string;
  bgGradient: string;
  unlockRequirement: number; // rides needed
  isUnlocked: boolean;
  expiryDays?: number;
  category: 'fuel' | 'food' | 'maintenance' | 'bonus' | 'special';
}

export function RewardsCoupons() {
  // Mock user rides completed
  const ridesCompleted = 12;

  const coupons: Coupon[] = [
    {
      id: '1',
      title: '₹10 Fuel Coupon',
      discount: 10,
      description: 'Get ₹10 off on fuel purchases',
      icon: Fuel,
      color: 'text-red-600',
      bgGradient: 'from-red-50 to-orange-50',
      unlockRequirement: 5,
      isUnlocked: ridesCompleted >= 5,
      expiryDays: 7,
      category: 'fuel'
    },
    {
      id: '2',
      title: '₹25 Food Voucher',
      discount: 25,
      description: 'Food delivery discount coupon',
      icon: Coffee,
      color: 'text-orange-600',
      bgGradient: 'from-orange-50 to-yellow-50',
      unlockRequirement: 10,
      isUnlocked: ridesCompleted >= 10,
      expiryDays: 5,
      category: 'food'
    },
    {
      id: '3',
      title: '₹50 Bonus Cash',
      discount: 50,
      description: 'Direct wallet credit bonus',
      icon: Zap,
      color: 'text-purple-600',
      bgGradient: 'from-purple-50 to-pink-50',
      unlockRequirement: 20,
      isUnlocked: ridesCompleted >= 20,
      expiryDays: 10,
      category: 'bonus'
    },
    {
      id: '4',
      title: '₹75 Service Discount',
      discount: 75,
      description: 'Vehicle maintenance & service',
      icon: Wrench,
      color: 'text-blue-600',
      bgGradient: 'from-blue-50 to-cyan-50',
      unlockRequirement: 30,
      isUnlocked: ridesCompleted >= 30,
      expiryDays: 15,
      category: 'maintenance'
    },
    {
      id: '5',
      title: '₹100 Super Reward',
      discount: 100,
      description: 'Premium reward for top performers',
      icon: Star,
      color: 'text-emerald-600',
      bgGradient: 'from-emerald-50 to-teal-50',
      unlockRequirement: 50,
      isUnlocked: ridesCompleted >= 50,
      expiryDays: 30,
      category: 'special'
    }
  ];

  const unlockedCount = coupons.filter(c => c.isUnlocked).length;
  const totalValue = coupons.filter(c => c.isUnlocked).reduce((sum, c) => sum + c.discount, 0);

  const getProgressPercentage = (requirement: number) => {
    return Math.min((ridesCompleted / requirement) * 100, 100);
  };

  const getRidesNeeded = (requirement: number) => {
    const needed = requirement - ridesCompleted;
    return needed > 0 ? needed : 0;
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Gift className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Rewards & Coupons</h2>
            <p className="text-sm text-gray-600">Complete rides to unlock amazing rewards</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-lg">
            <Sparkles className="w-5 h-5" />
            <span>{ridesCompleted} Rides</span>
          </div>
          <p className="text-xs text-gray-500">Completed</p>
        </div>
      </div>

      {/* Stats Banner */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-6 text-white shadow-xl">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-emerald-100 text-sm mb-1">Unlocked</p>
            <p className="text-3xl font-bold">{unlockedCount}/{coupons.length}</p>
          </div>
          <div className="border-l border-white/20 pl-4">
            <p className="text-emerald-100 text-sm mb-1">Total Value</p>
            <p className="text-3xl font-bold">₹{totalValue}</p>
          </div>
          <div className="border-l border-white/20 pl-4">
            <p className="text-emerald-100 text-sm mb-1">Next Reward</p>
            <p className="text-3xl font-bold">
              {getRidesNeeded(coupons.find(c => !c.isUnlocked)?.unlockRequirement || 0)}
            </p>
            <p className="text-xs text-emerald-100">rides away</p>
          </div>
        </div>
      </div>

      {/* Coupons Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.map((coupon, index) => {
          const progress = getProgressPercentage(coupon.unlockRequirement);
          const ridesNeeded = getRidesNeeded(coupon.unlockRequirement);
          const Icon = coupon.icon;

          return (
            <motion.div
              key={coupon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl p-6 border-2 transition-all ${
                coupon.isUnlocked
                  ? 'bg-white border-emerald-200 shadow-lg hover:shadow-xl hover:-translate-y-1'
                  : 'bg-gray-50 border-gray-200 opacity-75'
              }`}
            >
              {/* Unlocked Badge */}
              {coupon.isUnlocked && (
                <div className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Unlocked
                </div>
              )}

              {/* Locked Badge */}
              {!coupon.isUnlocked && (
                <div className="absolute -top-2 -right-2 bg-gray-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  Locked
                </div>
              )}

              {/* Coupon Content */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${coupon.bgGradient} flex items-center justify-center mb-4 ${
                coupon.isUnlocked ? 'shadow-md' : ''
              }`}>
                <Icon className={`w-7 h-7 ${coupon.color}`} />
              </div>

              <h3 className="font-bold text-gray-900 text-lg mb-1">{coupon.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{coupon.description}</p>

              {/* Progress Section */}
              {!coupon.isUnlocked ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold text-gray-900">{ridesCompleted}/{coupon.unlockRequirement} rides</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                    />
                  </div>
                  <p className="text-xs text-gray-500 font-medium">
                    {ridesNeeded} more {ridesNeeded === 1 ? 'ride' : 'rides'} to unlock
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white">
                    Claim Reward
                  </Button>
                  {coupon.expiryDays && (
                    <p className="text-xs text-center text-gray-500">
                      Expires in {coupon.expiryDays} days
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Motivation Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />

        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-6 h-6" />
              <h3 className="text-xl font-bold">Keep Going!</h3>
            </div>
            <p className="text-purple-100 mb-4">
              Complete {getRidesNeeded(coupons.find(c => !c.isUnlocked)?.unlockRequirement || 0)} more rides to unlock your next reward
            </p>
            <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 w-fit backdrop-blur-sm">
              <Star className="w-4 h-4" />
              <span className="text-sm font-semibold">You&apos;re doing great!</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Gift className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
