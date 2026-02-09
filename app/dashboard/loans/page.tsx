"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ChevronLeft, DollarSign, Zap, TrendingUp, Clock,
  CheckCircle, AlertCircle, Calendar, CreditCard, Sparkles,
  ArrowRight, Info, Shield
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { UserMenu } from '@/components/UserMenu';
import Image from 'next/image';

interface LoanOffer {
  id: string;
  amount: number;
  tenure: number; // days
  interestRate: number;
  processingFee: number;
  repaymentAmount: number;
  eligibility: 'eligible' | 'locked';
  badge?: string;
}

export default function LoansPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [selectedLoan, setSelectedLoan] = useState<LoanOffer | null>(null);
  const [applying, setApplying] = useState(false);
  const [success, setSuccess] = useState(false);

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

  // AI-calculated loan offers based on earnings history
  const loanOffers: LoanOffer[] = [
    {
      id: '1',
      amount: 500,
      tenure: 7,
      interestRate: 0,
      processingFee: 0,
      repaymentAmount: 500,
      eligibility: 'eligible',
      badge: 'Most Popular'
    },
    {
      id: '2',
      amount: 1000,
      tenure: 14,
      interestRate: 1,
      processingFee: 20,
      repaymentAmount: 1030,
      eligibility: 'eligible',
      badge: 'Recommended'
    },
    {
      id: '3',
      amount: 1500,
      tenure: 21,
      interestRate: 2,
      processingFee: 30,
      repaymentAmount: 1560,
      eligibility: 'eligible'
    },
    {
      id: '4',
      amount: 2000,
      tenure: 30,
      interestRate: 2.5,
      processingFee: 50,
      repaymentAmount: 2100,
      eligibility: 'locked'
    }
  ];

  const weeklyEarnings = 14680;
  const creditScore = 780;
  const eligibleAmount = 1500;
  const activeLoans = 0;

  const handleApply = async () => {
    if (!selectedLoan) return;

    setApplying(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setApplying(false);
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      setSelectedLoan(null);
    }, 3000);
  };

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
              <button onClick={() => router.push('/dashboard/loans')} className="text-emerald-600 font-semibold">Loans</button>
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
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-8 h-8 text-emerald-600" />
            <h1 className="text-4xl font-bold text-gray-900">Instant Loans</h1>
          </div>
          <p className="text-gray-600">Get instant cash advance based on your earnings. No paperwork required.</p>
        </motion.div>

        {/* Eligibility Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl p-8 text-white shadow-2xl mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />

          <div className="relative grid md:grid-cols-3 gap-8">
            <div>
              <p className="text-emerald-100 mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Your Credit Score
              </p>
              <p className="text-5xl font-bold mb-2">{creditScore}</p>
              <div className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 w-fit backdrop-blur-sm">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-semibold">Excellent</span>
              </div>
            </div>

            <div>
              <p className="text-emerald-100 mb-2">Eligible Loan Amount</p>
              <p className="text-5xl font-bold mb-2">₹{eligibleAmount.toLocaleString()}</p>
              <p className="text-sm text-emerald-100">Based on your weekly earnings of ₹{weeklyEarnings.toLocaleString()}</p>
            </div>

            <div>
              <p className="text-emerald-100 mb-2">Active Loans</p>
              <p className="text-5xl font-bold mb-2">{activeLoans}</p>
              <p className="text-sm text-emerald-100">You have no pending loans</p>
            </div>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { icon: DollarSign, title: 'Choose Amount', desc: 'Select loan amount based on eligibility' },
              { icon: Zap, title: 'Instant Approval', desc: 'AI-powered approval in seconds' },
              { icon: CreditCard, title: 'Get Money', desc: 'Money credited to wallet instantly' },
              { icon: Calendar, title: 'Auto Repayment', desc: 'Deducted from future earnings' }
            ].map((step, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Loan Offers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Loan Offers</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {loanOffers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`relative bg-white rounded-3xl p-8 shadow-lg border-2 transition-all ${
                  offer.eligibility === 'locked'
                    ? 'border-gray-200 opacity-60'
                    : selectedLoan?.id === offer.id
                    ? 'border-emerald-500 shadow-2xl'
                    : 'border-gray-200 hover:border-emerald-300 hover:shadow-xl cursor-pointer'
                }`}
                onClick={() => offer.eligibility === 'eligible' && setSelectedLoan(offer)}
              >
                {offer.badge && (
                  <div className="absolute -top-3 left-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    {offer.badge}
                  </div>
                )}

                {offer.eligibility === 'locked' && (
                  <div className="absolute top-4 right-4 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Locked
                  </div>
                )}

                <div className="mb-6">
                  <p className="text-gray-600 mb-2">Loan Amount</p>
                  <p className="text-5xl font-bold text-gray-900">₹{offer.amount.toLocaleString()}</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Repayment Period</span>
                    <span className="font-bold text-gray-900">{offer.tenure} days</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Interest Rate</span>
                    <span className="font-bold text-gray-900">{offer.interestRate}%</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Processing Fee</span>
                    <span className="font-bold text-gray-900">₹{offer.processingFee}</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-gray-600 font-semibold">Total Repayment</span>
                    <span className="font-bold text-emerald-600 text-xl">₹{offer.repaymentAmount.toLocaleString()}</span>
                  </div>
                </div>

                {offer.eligibility === 'eligible' ? (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLoan(offer);
                    }}
                    className={`w-full h-14 text-lg ${
                      selectedLoan?.id === offer.id
                        ? 'bg-emerald-600 hover:bg-emerald-700'
                        : 'bg-gray-900 hover:bg-gray-800'
                    }`}
                  >
                    {selectedLoan?.id === offer.id ? 'Selected' : 'Select Offer'}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                ) : (
                  <Button disabled className="w-full h-14 text-lg bg-gray-200 text-gray-500">
                    Complete 20 more rides to unlock
                  </Button>
                )}
              </motion.div>
            ))}
          </div>

          {/* Apply Section */}
          {selectedLoan && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 border-2 border-emerald-200"
            >
              {!success ? (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Confirm Your Loan Application</h3>

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-4">
                      <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <p className="text-sm text-gray-600 mb-1">You will receive</p>
                        <p className="text-4xl font-bold text-emerald-600">₹{selectedLoan.amount.toLocaleString()}</p>
                      </div>
                      <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <p className="text-sm text-gray-600 mb-1">Repayment amount</p>
                        <p className="text-4xl font-bold text-gray-900">₹{selectedLoan.repaymentAmount.toLocaleString()}</p>
                        <p className="text-sm text-gray-500 mt-2">Auto-deducted in {selectedLoan.tenure} days</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Info className="w-5 h-5 text-blue-600" />
                        Repayment Terms
                      </h4>
                      <ul className="space-y-3 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Automatic deduction from your daily earnings</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>No penalty for early repayment</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Flexible payment if earnings are low</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Shield className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span>100% secure and RBI compliant</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={handleApply}
                      disabled={applying}
                      className="flex-1 h-16 text-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                    >
                      {applying ? (
                        <>
                          <Clock className="w-5 h-5 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Apply for ₹{selectedLoan.amount.toLocaleString()}
                          <Zap className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={() => setSelectedLoan(null)}
                      variant="outline"
                      className="h-16 px-8"
                    >
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">Loan Approved!</h3>
                  <p className="text-xl text-gray-600 mb-2">
                    ₹{selectedLoan.amount.toLocaleString()} has been credited to your wallet
                  </p>
                  <p className="text-gray-500">
                    Repayment will be auto-deducted starting from tomorrow
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-blue-50 rounded-2xl p-8 border border-blue-200"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose DrivoPay Loans?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-bold text-gray-900 mb-2">⚡ Instant Approval</h4>
              <p className="text-sm text-gray-600">AI-powered approval within seconds. No waiting, no paperwork.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">💰 Low Interest</h4>
              <p className="text-sm text-gray-600">Starting at 0% interest for your first loan. Best rates in the industry.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">🔄 Flexible Repayment</h4>
              <p className="text-sm text-gray-600">Auto-deducted based on your earnings. No stress if you have a slow day.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
