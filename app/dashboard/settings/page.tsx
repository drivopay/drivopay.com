"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  User, Bell, Lock, CreditCard,
  ChevronLeft, ChevronRight, Shield, Smartphone, Mail, Phone,
  FileText, Upload, CheckCircle, Clock, Camera
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { UserMenu } from '@/components/UserMenu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

export default function SettingsPage() {
  const { user, isLoading, signOut } = useAuth();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<'profile' | 'notifications' | 'security' | 'payment' | 'kyc'>('profile');

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

  const menuItems = [
    { id: 'profile', icon: User, label: 'Profile Information' },
    { id: 'kyc', icon: FileText, label: 'KYC & Documents' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'security', icon: Lock, label: 'Security & Privacy' },
    { id: 'payment', icon: CreditCard, label: 'Payment Methods' },
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
              <button onClick={() => router.push('/dashboard/earnings')} className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Earnings</button>
              <button onClick={() => router.push('/dashboard/loans')} className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Loans</button>
              <button onClick={() => router.push('/dashboard/settings')} className="text-emerald-600 font-semibold">Settings</button>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </motion.div>

        {/* Settings Layout */}
        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-1"
          >
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 sticky top-24">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as 'profile' | 'notifications' | 'security' | 'payment' | 'kyc')}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all mb-2 ${
                    activeSection === item.id
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  <ChevronRight className={`w-4 h-4 ml-auto ${activeSection === item.id ? 'opacity-100' : 'opacity-0'}`} />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Content Area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-3"
          >
            {/* Profile Section */}
            {activeSection === 'profile' && (
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>

                <div className="flex items-center gap-6 mb-8">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                  </div>
                  <div>
                    <Button variant="outline" className="mb-2">Change Photo</Button>
                    <p className="text-sm text-gray-500">JPG, PNG or GIF. Max size 2MB</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        defaultValue={user.name.split(' ')[0]}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        defaultValue={user.name.split(' ')[1] || ''}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative mt-2">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        defaultValue={user.email}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative mt-2">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        defaultValue={user.phone || '+91 98765 43210'}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="language">Language</Label>
                    <select
                      id="language"
                      className="w-full mt-2 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option>English</option>
                      <option>हिंदी (Hindi)</option>
                      <option>தமிழ் (Tamil)</option>
                      <option>తెలుగు (Telugu)</option>
                    </select>
                  </div>

                  <div className="pt-4 border-t border-gray-200 flex gap-3">
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                      Save Changes
                    </Button>
                    <Button variant="outline">Cancel</Button>
                  </div>
                </div>
              </div>
            )}

            {/* KYC Section */}
            {activeSection === 'kyc' && (
              <div className="space-y-6">
                {/* KYC Status Card */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <Shield className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">KYC Status</h2>
                        <p className="text-sm text-gray-600">Complete your verification to unlock all features</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">Verified</span>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">Verification Level</p>
                      <p className="text-2xl font-bold text-green-600">Level 3</p>
                      <p className="text-xs text-gray-500 mt-1">Full Access</p>
                    </div>
                    <div className="bg-white rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">Verified On</p>
                      <p className="text-2xl font-bold text-gray-900">Jan 15, 2026</p>
                      <p className="text-xs text-gray-500 mt-1">All documents approved</p>
                    </div>
                    <div className="bg-white rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">Valid Until</p>
                      <p className="text-2xl font-bold text-gray-900">Jan 15, 2027</p>
                      <p className="text-xs text-gray-500 mt-1">Annual renewal</p>
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Identity Documents</h3>
                  <div className="space-y-4">
                    {/* Aadhaar Card */}
                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">Aadhaar Card</p>
                            <p className="text-sm text-gray-500">XXXX XXXX 4567</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            Verified
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Camera className="w-4 h-4 mr-2" />
                          View Document
                        </Button>
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4 mr-2" />
                          Re-upload
                        </Button>
                      </div>
                    </div>

                    {/* PAN Card */}
                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">PAN Card</p>
                            <p className="text-sm text-gray-500">ABCDE1234F</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            Verified
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Camera className="w-4 h-4 mr-2" />
                          View Document
                        </Button>
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4 mr-2" />
                          Re-upload
                        </Button>
                      </div>
                    </div>

                    {/* Driving License */}
                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">Driving License</p>
                            <p className="text-sm text-gray-500">DL-1420110012345</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            Verified
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Camera className="w-4 h-4 mr-2" />
                          View Document
                        </Button>
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4 mr-2" />
                          Re-upload
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vehicle Documents */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Vehicle Documents</h3>
                  <div className="space-y-4">
                    {/* RC Book */}
                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">RC Book (Registration Certificate)</p>
                            <p className="text-sm text-gray-500">DL01AB1234</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            Verified
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Camera className="w-4 h-4 mr-2" />
                          View Document
                        </Button>
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4 mr-2" />
                          Re-upload
                        </Button>
                      </div>
                    </div>

                    {/* Vehicle Insurance */}
                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-yellow-600" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">Vehicle Insurance</p>
                            <p className="text-sm text-gray-500">Expires: Dec 31, 2026</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            Expiring Soon
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Camera className="w-4 h-4 mr-2" />
                          View Document
                        </Button>
                        <Button className="bg-yellow-600 hover:bg-yellow-700" size="sm">
                          <Upload className="w-4 h-4 mr-2" />
                          Renew Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Other Documents */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Additional Documents</h3>
                  <div className="space-y-4">
                    {/* Profile Photo */}
                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                            {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">Profile Photo</p>
                            <p className="text-sm text-gray-500">Clear face photo required</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            Verified
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Camera className="w-4 h-4 mr-2" />
                          View Photo
                        </Button>
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4 mr-2" />
                          Update Photo
                        </Button>
                      </div>
                    </div>

                    {/* Bank Account Proof */}
                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">Bank Account Proof</p>
                            <p className="text-sm text-gray-500">Cancelled cheque or passbook</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            Verified
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Camera className="w-4 h-4 mr-2" />
                          View Document
                        </Button>
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4 mr-2" />
                          Re-upload
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upload New Document */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Upload className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Need to Update Documents?</h3>
                      <p className="text-gray-600 mb-4">
                        If any of your documents have expired or you need to update them, you can re-upload them here.
                        Our team will verify them within 24 hours.
                      </p>
                      <Button className="bg-emerald-600 hover:bg-emerald-700">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload New Document
                      </Button>
                    </div>
                  </div>
                </div>

                {/* KYC Benefits */}
                <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">KYC Verification Benefits</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900">Higher Loan Limits</p>
                        <p className="text-sm text-gray-600">Access loans up to ₹50,000</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900">Instant Withdrawals</p>
                        <p className="text-sm text-gray-600">Transfer money anytime to bank</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900">Priority Support</p>
                        <p className="text-sm text-gray-600">24/7 dedicated customer care</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900">Insurance Coverage</p>
                        <p className="text-sm text-gray-600">Accident insurance up to ₹5 lakhs</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Section */}
            {activeSection === 'notifications' && (
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Preferences</h2>

                <div className="space-y-6">
                  {[
                    { title: 'Ride Notifications', desc: 'Get notified about new ride requests and updates' },
                    { title: 'Payment Alerts', desc: 'Receive alerts when payments are received' },
                    { title: 'Weekly Reports', desc: 'Get weekly earnings and performance reports' },
                    { title: 'Promotional Offers', desc: 'Receive updates about bonuses and promotions' },
                    { title: 'System Updates', desc: 'Important app updates and maintenance notices' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-semibold text-gray-900">{item.title}</p>
                        <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security Section */}
            {activeSection === 'security' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Security & Privacy</h2>

                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative mt-2">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="currentPassword"
                          type="password"
                          placeholder="Enter current password"
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative mt-2">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="newPassword"
                          type="password"
                          placeholder="Enter new password"
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <div className="relative mt-2">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm new password"
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                      Update Password
                    </Button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Two-Factor Authentication</h3>
                  <p className="text-gray-600 mb-6">Add an extra layer of security to your account</p>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                        <Smartphone className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">SMS Authentication</p>
                        <p className="text-sm text-gray-600">Not enabled</p>
                      </div>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>
                </div>

                <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
                  <h3 className="text-lg font-bold text-red-900 mb-2">Danger Zone</h3>
                  <p className="text-sm text-red-700 mb-4">Permanently delete your account and all associated data</p>
                  <Button
                    variant="outline"
                    className="border-red-500 text-red-600 hover:bg-red-50"
                    onClick={() => {
                      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                        signOut();
                        router.push('/');
                      }
                    }}
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            )}

            {/* Payment Methods Section */}
            {activeSection === 'payment' && (
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Methods</h2>

                <div className="space-y-4 mb-6">
                  <div className="p-6 border-2 border-emerald-500 rounded-2xl bg-emerald-50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">HDFC Bank</p>
                          <p className="text-sm text-gray-600">Account ****4567</p>
                        </div>
                      </div>
                      <span className="text-xs bg-emerald-600 text-white px-3 py-1 rounded-full font-semibold">
                        Primary
                      </span>
                    </div>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>

                  <div className="p-6 border-2 border-gray-200 rounded-2xl hover:border-gray-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">ICICI Bank</p>
                          <p className="text-sm text-gray-600">Account ****8901</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Make Primary</Button>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Add New Bank Account
                </Button>

                <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-blue-900 mb-1">Your payment information is secure</p>
                      <p className="text-sm text-blue-700">
                        We use bank-grade encryption to protect your financial data. Your banking credentials are never stored on our servers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
