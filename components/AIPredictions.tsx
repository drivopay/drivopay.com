"use client"

import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles, TrendingUp, CloudRain, MapPin, DollarSign,
  Calendar, Clock, Zap, AlertCircle, ThermometerSun, Wind
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export function AIPredictions() {
  const router = useRouter();

  // AI-generated predictions
  const predictions = {
    nextWeekEarnings: 16240,
    confidence: 92,
    peakHours: [
      { time: '8-10 AM', demand: 'High', earnings: '₹280-350/hr' },
      { time: '6-9 PM', demand: 'Very High', earnings: '₹420-500/hr' }
    ],
    weatherImpact: {
      condition: 'Light Rain',
      icon: CloudRain,
      impact: '+35% demand',
      recommendation: 'Great time to drive! Rain increases demand significantly.'
    },
    hotspots: [
      { area: 'Connaught Place', demand: 95, distance: '2.3 km' },
      { area: 'Nehru Place', demand: 88, distance: '4.1 km' },
      { area: 'Gurgaon Cyber City', demand: 92, distance: '8.5 km' }
    ],
    tomorrowPrediction: {
      earnings: 2890,
      rides: 14,
      peakTime: '7:00 PM'
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">AI Insights & Predictions</h3>
            <p className="text-sm text-gray-500">Powered by machine learning</p>
          </div>
        </div>
      </div>

      {/* Main Predictions Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Next Week Earnings Forecast */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-semibold text-purple-100">Next Week Forecast</span>
            </div>
            <p className="text-4xl font-bold mb-2">₹{predictions.nextWeekEarnings.toLocaleString()}</p>
            <div className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 w-fit backdrop-blur-sm">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-semibold">{predictions.confidence}% confidence</span>
            </div>
            <p className="text-sm text-purple-100 mt-4">
              Based on your earning patterns, weather data, and upcoming events
            </p>
          </div>
        </motion.div>

        {/* Tomorrow's Prediction */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-gray-600">Tomorrow's Prediction</span>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Expected Earnings</p>
              <p className="text-3xl font-bold text-gray-900">₹{predictions.tomorrowPrediction.earnings.toLocaleString()}</p>
            </div>
            <div className="flex items-center justify-between py-3 border-t border-gray-100">
              <span className="text-gray-600">Estimated Rides</span>
              <span className="font-bold text-gray-900">{predictions.tomorrowPrediction.rides}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-t border-gray-100">
              <span className="text-gray-600">Best Time</span>
              <span className="font-bold text-emerald-600">{predictions.tomorrowPrediction.peakTime}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Peak Hours */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
      >
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-orange-600" />
          <span className="font-bold text-gray-900">Today's Peak Hours</span>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {predictions.peakHours.map((slot, index) => (
            <div key={index} className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-gray-900">{slot.time}</span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  slot.demand === 'Very High'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-orange-100 text-orange-700'
                }`}>
                  {slot.demand} Demand
                </span>
              </div>
              <p className="text-2xl font-bold text-orange-600">{slot.earnings}</p>
              <p className="text-xs text-gray-600 mt-2">Expected earnings per hour</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Weather Impact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <predictions.weatherImpact.icon className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-gray-900">Weather Impact</span>
          </div>
          <div className="flex items-center gap-2">
            <ThermometerSun className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">28°C</span>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <p className="text-lg font-bold text-gray-900 mb-1">{predictions.weatherImpact.condition}</p>
            <p className="text-2xl font-bold text-blue-600 mb-3">{predictions.weatherImpact.impact}</p>
            <div className="bg-blue-100 rounded-lg p-3 flex items-start gap-2">
              <Zap className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800 font-medium">
                {predictions.weatherImpact.recommendation}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hot Spots */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <span className="font-bold text-gray-900">High Demand Areas Near You</span>
          </div>
          <span className="text-xs text-gray-500">Updated 2m ago</span>
        </div>
        <div className="space-y-3">
          {predictions.hotspots.map((spot, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{spot.area}</p>
                  <p className="text-sm text-gray-500">{spot.distance} away</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                      style={{ width: `${spot.demand}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-emerald-600">{spot.demand}%</span>
                </div>
                <p className="text-xs text-gray-500">Demand</p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => router.push('/dashboard/earnings')}
          className="w-full mt-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          View Detailed Analytics
          <TrendingUp className="w-4 h-4" />
        </button>
      </motion.div>

      {/* AI Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-200"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">AI Recommendation for Today</h4>
            <p className="text-gray-700 mb-3">
              Start your shift at 7:30 PM today. There's a cricket match at Arun Jaitley Stadium ending around 8 PM,
              which historically increases ride demand by 60% in nearby areas.
            </p>
            <p className="text-sm text-amber-800 font-medium">
              💡 Expected bonus earnings: ₹800-1200
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
