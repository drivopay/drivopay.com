"use client"

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight, Play, Check, ChevronRight,
  Smartphone, Shield, TrendingUp, Zap,
  DollarSign, CreditCard, Users,
  Sparkles, Star, Globe, Lock, Wallet
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Custom Modern Logo Component - Emerald & Teal theme
const DrivoPayLogo = ({ className = "w-full h-full" }: { className?: string }) => (
  <svg viewBox="0 0 200 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main Logo Icon - Combines "D" with forward motion and instant payment bolt */}
    <g>
      {/* Outer circle with gradient - represents coin/payment */}
      <circle cx="24" cy="24" r="22" fill="url(#mainGradient)" opacity="0.15"/>
      <circle cx="24" cy="24" r="20" stroke="url(#mainGradient)" strokeWidth="2.5"/>

      {/* Stylized "D" shape with forward arrow motion */}
      <path
        d="M 14 12 L 14 36 L 24 36 C 31 36 36 31 36 24 C 36 17 31 12 24 12 Z"
        fill="url(#mainGradient)"
      />

      {/* Lightning bolt for "instant" payments - positioned in the D */}
      <path
        d="M 26 16 L 22 24 L 26 24 L 24 32 L 30 22 L 26 22 Z"
        fill="white"
        className="drop-shadow-sm"
      />

      {/* Speed/motion lines extending from the logo */}
      <g opacity="0.6">
        <path d="M 40 20 L 46 20" stroke="url(#mainGradient)" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 42 24 L 48 24" stroke="url(#mainGradient)" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 40 28 L 46 28" stroke="url(#mainGradient)" strokeWidth="2" strokeLinecap="round"/>
      </g>

      {/* Small accent dots for dynamism */}
      <circle cx="38" cy="12" r="2" fill="#10B981" opacity="0.7"/>
      <circle cx="42" cy="14" r="1.5" fill="#14B8A6" opacity="0.6"/>
    </g>

    {/* Brand Text */}
    <g>
      <text
        x="60"
        y="32"
        fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize="26"
        fontWeight="800"
        fill="currentColor"
        letterSpacing="-0.02em"
      >
        Drivo
      </text>
      <text
        x="124"
        y="32"
        fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize="26"
        fontWeight="800"
        fill="url(#textGradient)"
        letterSpacing="-0.02em"
      >
        Pay
      </text>

      {/* Tagline underneath */}
      <text
        x="60"
        y="40"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="7"
        fontWeight="600"
        fill="currentColor"
        opacity="0.5"
        letterSpacing="0.1em"
      >
        INSTANT PAYMENTS
      </text>
    </g>

    <defs>
      {/* Main gradient for the icon - Emerald to Teal */}
      <linearGradient id="mainGradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#10B981"/>
        <stop offset="50%" stopColor="#14B8A6"/>
        <stop offset="100%" stopColor="#06B6D4"/>
      </linearGradient>

      {/* Gradient for "Pay" text - Emerald to Teal */}
      <linearGradient id="textGradient" x1="124" y1="12" x2="170" y2="32" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#10B981"/>
        <stop offset="100%" stopColor="#14B8A6"/>
      </linearGradient>
    </defs>
  </svg>
);

// Animated Number Counter
const AnimatedCounter = ({ end, duration = 2000, prefix = '', suffix = '' }: {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

// Bento Grid Feature Card
const BentoCard = ({
  title,
  description,
  icon: Icon,
  gradient,
  size = "default",
  delay = 0
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  size?: "default" | "large" | "tall";
  delay?: number;
}) => {
  const sizeClasses = {
    default: "md:col-span-1",
    large: "md:col-span-2",
    tall: "md:row-span-2"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className={`group relative overflow-hidden rounded-3xl p-8 bg-white hover:shadow-2xl transition-all duration-500 ${sizeClasses[size]} border-2 border-gray-100`}
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${gradient}`} />

      <div className="relative z-10">
        <div className={`w-14 h-14 rounded-2xl ${gradient} flex items-center justify-center mb-6 shadow-lg`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>

      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ArrowRight className="w-6 h-6 text-gray-400" />
      </div>
    </motion.div>
  );
};

// Video/Demo Section Component
const VideoDemo = () => (
  <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 p-2">
    <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Mock video interface */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-20 h-20 rounded-full bg-white shadow-2xl flex items-center justify-center group"
        >
          <Play className="w-8 h-8 text-emerald-600 ml-1 group-hover:text-emerald-700 transition-colors" />
        </motion.button>
      </div>

      {/* Mock phone UI */}
      <div className="absolute left-8 bottom-8 w-48 bg-white rounded-3xl p-3 shadow-2xl">
        <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-4 text-white">
          <div className="text-xs opacity-80 mb-1">Today&apos;s Earnings</div>
          <div className="text-2xl font-bold">₹2,450</div>
          <div className="flex items-center gap-1 text-xs mt-2">
            <TrendingUp className="w-3 h-3" />
            <span>+18% vs yesterday</span>
          </div>
        </div>
      </div>

      {/* Stats overlay */}
      <div className="absolute right-8 top-8 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <Check className="w-4 h-4 text-green-500" />
          <span>Payment received</span>
        </div>
        <div className="text-2xl font-bold text-gray-900">₹180</div>
      </div>
    </div>
  </div>
);

// Process Step Component
const ProcessStep = ({ number, title, description, delay }: {
  number: string;
  title: string;
  description: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="relative"
  >
    <div className="flex items-start gap-6">
      <div className="flex-shrink-0">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center shadow-lg">
          <span className="text-2xl font-bold text-white">{number}</span>
        </div>
      </div>
      <div className="pt-2">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  </motion.div>
);

// Testimonial Card
const TestimonialCard = ({ name, role, avatar, content, rating, delay }: {
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
  >
    <div className="flex gap-1 mb-4">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
    <p className="text-gray-700 leading-relaxed mb-6 text-lg">&quot;{content}&quot;</p>
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
        {avatar}
      </div>
      <div>
        <div className="font-bold text-gray-900">{name}</div>
        <div className="text-sm text-gray-600">{role}</div>
      </div>
    </div>
  </motion.div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50">

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-24">
            <div className="flex items-center">
              <div className="w-52 text-gray-900">
                <DrivoPayLogo />
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">How it works</a>
              <a href="#pricing" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Pricing</a>
              <a href="#testimonials" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Reviews</a>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
                Sign in
              </Button>
              <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border-0 px-6 shadow-lg">
                Get started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-40 left-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-60 right-10 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-white rounded-full px-5 py-2 shadow-lg mb-8 border border-gray-200">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-gray-700">Trusted by 50,000+ drivers</span>
              </div>

              <h1 className="text-6xl md:text-7xl font-bold text-gray-900 leading-tight mb-6">
                Get paid
                <br />
                <span className="bg-gradient-to-r from-indigo-600 via-teal-600 to-cyan-500 bg-clip-text text-transparent">
                  instantly
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
                The payments platform built for drivers. No platform fees.
                No waiting periods. Just instant money in your pocket.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-lg px-8 py-7 rounded-2xl shadow-xl border-0">
                  Start earning now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-7 rounded-2xl border-2 border-gray-300 hover:border-gray-400">
                  <Play className="w-5 h-5 mr-2" />
                  Watch demo
                </Button>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-8 flex-wrap">
                <div>
                  <div className="text-3xl font-bold text-gray-900">
                    <AnimatedCounter end={50} suffix="k+" />
                  </div>
                  <div className="text-sm text-gray-600">Active drivers</div>
                </div>
                <div className="w-px h-12 bg-gray-300" />
                <div>
                  <div className="text-3xl font-bold text-gray-900">
                    <AnimatedCounter end={10} suffix="M+" prefix="₹" />
                  </div>
                  <div className="text-sm text-gray-600">Processed today</div>
                </div>
                <div className="w-px h-12 bg-gray-300" />
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">4.9/5 rating</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Mock phone with 3D perspective */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-[3rem] blur-3xl opacity-30 transform scale-105" />

                <div className="relative bg-white rounded-[3rem] p-4 shadow-2xl border-8 border-gray-900 transform hover:rotate-1 transition-transform duration-300">
                  <div className="rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-gray-50 to-white">
                    {/* Status bar */}
                    <div className="flex justify-between items-center px-8 py-4 bg-white">
                      <span className="text-sm font-semibold">9:41</span>
                      <div className="flex gap-1">
                        <div className="w-1 h-3 bg-gray-900 rounded-full" />
                        <div className="w-1 h-3 bg-gray-900 rounded-full" />
                        <div className="w-1 h-3 bg-gray-900 rounded-full" />
                        <div className="w-1 h-3 bg-gray-400 rounded-full" />
                      </div>
                    </div>

                    {/* App content */}
                    <div className="p-6 space-y-4">
                      {/* Logo header */}
                      <div className="flex items-center justify-between">
                        <div className="w-20">
                          <DrivoPayLogo />
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gray-200" />
                      </div>

                      {/* Balance card */}
                      <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl p-6 text-white shadow-xl">
                        <div className="text-sm opacity-90 mb-2">Today&apos;s Earnings</div>
                        <div className="text-4xl font-bold mb-4">₹2,450</div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-1">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-sm">+18%</span>
                          </div>
                          <Button size="sm" className="bg-white text-emerald-600 hover:bg-gray-100 rounded-xl">
                            Withdraw
                          </Button>
                        </div>
                      </div>

                      {/* Quick stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
                          <div className="text-2xl font-bold text-green-600">12</div>
                          <div className="text-sm text-green-700">Rides today</div>
                        </div>
                        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                          <div className="text-2xl font-bold text-blue-600">₹204</div>
                          <div className="text-sm text-blue-700">Avg per ride</div>
                        </div>
                      </div>

                      {/* Transaction list */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                              <Check className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <div className="font-semibold text-sm">Payment received</div>
                              <div className="text-xs text-gray-500">2 mins ago</div>
                            </div>
                          </div>
                          <div className="font-bold text-green-600">+₹180</div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                              <Zap className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                              <div className="font-semibold text-sm">Fuel discount</div>
                              <div className="text-xs text-gray-500">Shell Station</div>
                            </div>
                          </div>
                          <div className="font-bold text-emerald-600">-₹50</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Logo Marquee */}
      <section className="py-12 border-y border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm text-gray-500 mb-8">TRUSTED BY DRIVERS FROM</p>
          <div className="flex items-center justify-center gap-12 flex-wrap opacity-60">
            <div className="text-xl font-bold text-gray-400">Uber</div>
            <div className="text-xl font-bold text-gray-400">Ola</div>
            <div className="text-xl font-bold text-gray-400">Rapido</div>
            <div className="text-xl font-bold text-gray-400">Zomato</div>
            <div className="text-xl font-bold text-gray-400">Swiggy</div>
            <div className="text-xl font-bold text-gray-400">Dunzo</div>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section id="features" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Everything you need to
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                earn and grow
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              All the tools you need to take control of your income, in one simple app.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 auto-rows-fr">
            <BentoCard
              icon={Zap}
              title="Instant payouts"
              description="Money hits your wallet in under 3 seconds. No more waiting for weekly settlements."
              gradient="bg-gradient-to-br from-emerald-500 to-teal-500"
              delay={0}
            />
            <BentoCard
              icon={Shield}
              title="Zero fees"
              description="Keep 100% of what you earn. No platform cuts, no hidden charges, no surprises."
              gradient="bg-gradient-to-br from-green-400 to-emerald-500"
              delay={0.1}
            />
            <BentoCard
              icon={Wallet}
              title="Smart wallet"
              description="Track earnings in real-time. Automatic daily, weekly, and monthly reports."
              gradient="bg-gradient-to-br from-blue-400 to-indigo-500"
              delay={0.2}
            />
            <BentoCard
              icon={TrendingUp}
              title="Earnings insights"
              description="AI-powered insights show your best earning hours and optimal routes."
              gradient="bg-gradient-to-br from-emerald-400 to-teal-500"
              size="large"
              delay={0.3}
            />
            <BentoCard
              icon={CreditCard}
              title="Instant loans"
              description="Get micro-loans approved in minutes based on your earning history."
              gradient="bg-gradient-to-br from-emerald-400 to-teal-500"
              delay={0.4}
            />
            <BentoCard
              icon={DollarSign}
              title="Fuel discounts"
              description="Save ₹5/liter at partner fuel stations nationwide."
              gradient="bg-gradient-to-br from-cyan-400 to-blue-500"
              delay={0.5}
            />
            <BentoCard
              icon={Lock}
              title="Bank-grade security"
              description="Your money is protected with encryption and insurance coverage."
              gradient="bg-gradient-to-br from-gray-700 to-gray-900"
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Video Demo Section */}
      <section className="py-32 bg-gradient-to-b from-white to-emerald-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              See DrivoPay in action
            </h2>
            <p className="text-xl text-gray-600">
              Watch how easy it is to get paid instantly after every ride
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <VideoDemo />
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Start earning in
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> 3 steps</span>
            </h2>
            <p className="text-xl text-gray-600">
              Get set up in under 2 minutes. It&apos;s that simple.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <ProcessStep
              number="1"
              title="Download & sign up"
              description="Create your account with just your phone number and bank details. No paperwork needed."
              delay={0}
            />
            <ProcessStep
              number="2"
              title="Show your QR code"
              description="After each ride, open the app and show your unique payment QR code to your customer."
              delay={0.1}
            />
            <ProcessStep
              number="3"
              title="Get paid instantly"
              description="Customer scans and pays via UPI. Money arrives in your wallet within 3 seconds."
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-gradient-to-br from-emerald-600 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
            >
              <div className="text-6xl font-bold mb-3">
                <AnimatedCounter end={50} suffix="k+" />
              </div>
              <div className="text-emerald-100 text-lg">Active drivers</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-6xl font-bold mb-3">
                <AnimatedCounter end={10} suffix="M+" prefix="₹" />
              </div>
              <div className="text-emerald-100 text-lg">Processed daily</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-6xl font-bold mb-3">
                <AnimatedCounter end={3} suffix="s" />
              </div>
              <div className="text-emerald-100 text-lg">Average payout time</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-6xl font-bold mb-3">
                <AnimatedCounter end={0} suffix="%" />
              </div>
              <div className="text-emerald-100 text-lg">Platform fees</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-32 bg-gradient-to-b from-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Loved by drivers
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                across India
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Here&apos;s what real drivers are saying about DrivoPay
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Rajesh Kumar"
              role="Uber Driver, Delhi"
              avatar="RK"
              content="DrivoPay changed my life. I used to wait 7 days for my money. Now it's instant. I can buy fuel the same day I earn."
              rating={5}
              delay={0}
            />
            <TestimonialCard
              name="Priya Sharma"
              role="Rapido Captain, Mumbai"
              avatar="PS"
              content="Best app for drivers! The micro-loan feature saved me during an emergency. Got approved in 5 minutes without any hassle."
              rating={5}
              delay={0.1}
            />
            <TestimonialCard
              name="Mohammed Ali"
              role="Zomato Delivery Partner"
              avatar="MA"
              content="Zero fees means I keep everything I earn. My income increased by 20% just by switching to DrivoPay. Highly recommended!"
              rating={5}
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Ready to take control of
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                your earnings?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join 50,000+ drivers who&apos;ve already made the switch to instant payments and zero fees.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-10 py-7 rounded-2xl shadow-xl border-0">
                <Smartphone className="w-5 h-5 mr-2" />
                Download now
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-gray-900 text-lg px-10 py-7 rounded-2xl font-semibold">
                Learn more
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <p className="text-gray-400 mt-8 text-sm">
              Free to download. No credit card required. Start earning instantly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="w-32 text-gray-900 mb-4">
                <DrivoPayLogo />
              </div>
              <p className="text-gray-600 mb-6 max-w-sm">
                The payments platform built for the driver economy. Get paid instantly, keep 100% of your earnings.
              </p>
              <div className="flex gap-4">
                <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                  <Globe className="w-5 h-5 text-gray-600" />
                </button>
                <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                  <Users className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Download</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">About</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © 2025 DrivoPay. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">Terms</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
