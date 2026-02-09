"use client"

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Play, Check, ChevronRight, ChevronDown,
  Smartphone, Shield, TrendingUp, Zap,
  DollarSign, CreditCard, Users,
  Sparkles, Star, Globe, Lock, Wallet,
  Menu, X, Gift, Bell, BarChart3, Clock, Fuel, Receipt, LayoutDashboard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthDialog } from '@/components/AuthDialog';
import { UserMenu } from '@/components/UserMenu';
import { useAuth } from '@/contexts/AuthContext';

// Modern Logo Component - Emerald & Teal theme
const DrivoPayLogo = ({ className = "w-full h-full" }: { className?: string }) => (
  <svg viewBox="0 0 200 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      <circle cx="24" cy="24" r="22" fill="url(#mainGradient)" opacity="0.15"/>
      <circle cx="24" cy="24" r="20" stroke="url(#mainGradient)" strokeWidth="2.5"/>
      <path
        d="M 14 12 L 14 36 L 24 36 C 31 36 36 31 36 24 C 36 17 31 12 24 12 Z"
        fill="url(#mainGradient)"
      />
      <path
        d="M 26 16 L 22 24 L 26 24 L 24 32 L 30 22 L 26 22 Z"
        fill="white"
        className="drop-shadow-sm"
      />
      <g opacity="0.6">
        <path d="M 40 20 L 46 20" stroke="url(#mainGradient)" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 42 24 L 48 24" stroke="url(#mainGradient)" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 40 28 L 46 28" stroke="url(#mainGradient)" strokeWidth="2" strokeLinecap="round"/>
      </g>
      <circle cx="38" cy="12" r="2" fill="#10B981" opacity="0.7"/>
      <circle cx="42" cy="14" r="1.5" fill="#14B8A6" opacity="0.6"/>
    </g>
    <g>
      <text x="60" y="32" fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif" fontSize="26" fontWeight="800" fill="currentColor" letterSpacing="-0.02em">
        Drivo
      </text>
      <text x="124" y="32" fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif" fontSize="26" fontWeight="800" fill="url(#textGradient)" letterSpacing="-0.02em">
        Pay
      </text>
      <text x="60" y="40" fontFamily="system-ui, -apple-system, sans-serif" fontSize="7" fontWeight="600" fill="currentColor" opacity="0.5" letterSpacing="0.1em">
        INSTANT PAYMENTS
      </text>
    </g>
    <defs>
      <linearGradient id="mainGradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#10B981"/>
        <stop offset="50%" stopColor="#14B8A6"/>
        <stop offset="100%" stopColor="#06B6D4"/>
      </linearGradient>
      <linearGradient id="textGradient" x1="124" y1="12" x2="170" y2="32" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#10B981"/>
        <stop offset="100%" stopColor="#14B8A6"/>
      </linearGradient>
    </defs>
  </svg>
);

// Floating Particles
const ParticleField = () => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    size: number;
    x: number;
    y: number;
    delay: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        size: Math.random() * 3 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 8 + 12
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-emerald-400"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)'
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Feature Card
const FeatureCard = ({
  icon: Icon,
  title,
  description,
  delay = 0
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
    >
      <div className="relative">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
      <motion.div
        className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
        initial={{ x: -10 }}
        whileHover={{ x: 0 }}
      >
        <ArrowRight className="w-5 h-5 text-emerald-500" />
      </motion.div>
    </motion.div>
  );
};

// Animated Counter
const AnimatedCounter = ({ end, duration = 2000, prefix = '', suffix = '' }: {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
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

// FAQ Item
const FAQItem = ({ question, answer, delay = 0 }: { question: string; answer: string; delay?: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-lg font-bold text-gray-900 pr-8">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-6 h-6 text-emerald-600" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-gray-600 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Phone Mockup
const PhoneMockup = () => {
  return (
    <div className="relative" style={{ perspective: '1000px' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-[3rem] blur-3xl opacity-30 animate-pulse" />
        <div className="relative bg-white rounded-[3rem] p-4 shadow-2xl border-8 border-gray-900">
          <div className="rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-gray-50 to-white">
            <div className="flex justify-between items-center px-8 py-4 bg-white">
              <span className="text-sm font-semibold">9:41</span>
              <div className="flex gap-1">
                <div className="w-1 h-3 bg-gray-900 rounded-full" />
                <div className="w-1 h-3 bg-gray-900 rounded-full" />
                <div className="w-1 h-3 bg-gray-900 rounded-full" />
                <div className="w-1 h-3 bg-gray-400 rounded-full" />
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-20">
                  <DrivoPayLogo />
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-200" />
              </div>
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
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

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
    whileHover={{ y: -8 }}
    className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
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
  const { user } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20 md:h-28">
            <div className="flex items-center">
              <div className="relative w-48 h-16 md:w-96 md:h-24 py-2">
                <Image
                  src="/output-onlinepngtools.png"
                  alt="DrivoPay - Instant Payments for Drivers"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">How it works</a>
              <a href="#testimonials" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Reviews</a>
              <a href="#faq" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">FAQ</a>
            </div>

            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  <Button
                    onClick={() => router.push('/dashboard')}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border-0 px-6 shadow-lg"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                  <UserMenu />
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="text-gray-700 hover:text-emerald-600"
                    onClick={() => setAuthDialogOpen(true)}
                  >
                    Sign in
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border-0 px-6 shadow-lg"
                    onClick={() => setAuthDialogOpen(true)}
                  >
                    Get started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 py-4"
            >
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-700 hover:text-emerald-600 font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Features</a>
                <a href="#how-it-works" className="text-gray-700 hover:text-emerald-600 font-medium py-2" onClick={() => setMobileMenuOpen(false)}>How it works</a>
                <a href="#testimonials" className="text-gray-700 hover:text-emerald-600 font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Reviews</a>
                <a href="#faq" className="text-gray-700 hover:text-emerald-600 font-medium py-2" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
                <div className="pt-4 space-y-3 border-t border-gray-200">
                  {user ? (
                    <>
                      <Button
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
                        onClick={() => {
                          router.push('/dashboard');
                          setMobileMenuOpen(false);
                        }}
                      >
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Go to Dashboard
                      </Button>
                      <div className="flex items-center justify-center py-2">
                        <UserMenu />
                      </div>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          setAuthDialogOpen(true);
                          setMobileMenuOpen(false);
                        }}
                      >
                        Sign in
                      </Button>
                      <Button
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
                        onClick={() => {
                          setAuthDialogOpen(true);
                          setMobileMenuOpen(false);
                        }}
                      >
                        Get started
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-20 pb-32 overflow-hidden">
        <ParticleField />
        <div className="absolute top-40 left-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-60 right-10 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

        <motion.div style={{ y: heroY }} className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 bg-white rounded-full px-5 py-2 shadow-lg mb-8 border border-emerald-200"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-gray-700">Trusted by 50,000+ drivers</span>
              </motion.div>

              <h1 className="text-6xl md:text-7xl font-bold text-gray-900 leading-tight mb-6">
                Get paid
                <br />
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-500 bg-clip-text text-transparent">
                  instantly
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
                The payments platform built for drivers. No platform fees.
                No waiting periods. Just instant money in your pocket.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                {user ? (
                  <>
                    <Button
                      size="lg"
                      onClick={() => router.push('/dashboard')}
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-lg px-8 py-7 rounded-2xl shadow-xl border-0"
                    >
                      <LayoutDashboard className="w-5 h-5 mr-2" />
                      Go to Dashboard
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => router.push('/dashboard/wallet')}
                      className="text-lg px-8 py-7 rounded-2xl border-2 border-gray-300 hover:border-emerald-500"
                    >
                      <Wallet className="w-5 h-5 mr-2" />
                      View Wallet
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="lg"
                      onClick={() => setAuthDialogOpen(true)}
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-lg px-8 py-7 rounded-2xl shadow-xl border-0"
                    >
                      Start earning now
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    <Button size="lg" variant="outline" className="text-lg px-8 py-7 rounded-2xl border-2 border-gray-300 hover:border-emerald-500">
                      <Play className="w-5 h-5 mr-2" />
                      Watch demo
                    </Button>
                  </>
                )}
              </div>

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
              <PhoneMockup />
            </motion.div>
          </div>
        </motion.div>
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

      {/* Features Section */}
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

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={Zap}
              title="Instant payouts"
              description="Money hits your wallet in under 3 seconds. No more waiting for weekly settlements."
              delay={0}
            />
            <FeatureCard
              icon={DollarSign}
              title="Zero fees"
              description="Keep 100% of what you earn. No platform cuts, no hidden charges, no surprises."
              delay={0.1}
            />
            <FeatureCard
              icon={Wallet}
              title="Smart wallet"
              description="Track earnings in real-time. Automatic daily, weekly, and monthly reports."
              delay={0.2}
            />
            <FeatureCard
              icon={TrendingUp}
              title="Earnings insights"
              description="AI-powered insights show your best earning hours and optimal routes."
              delay={0.3}
            />
            <FeatureCard
              icon={CreditCard}
              title="Instant loans"
              description="Get micro-loans approved in minutes based on your earning history."
              delay={0.4}
            />
            <FeatureCard
              icon={Fuel}
              title="Fuel discounts"
              description="Save ₹5/liter at partner fuel stations nationwide."
              delay={0.5}
            />
          </div>
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
            {[
              {
                number: "1",
                title: "Download & sign up",
                description: "Create your account with just your phone number and bank details. No paperwork needed."
              },
              {
                number: "2",
                title: "Show your QR code",
                description: "After each ride, open the app and show your unique payment QR code to your customer."
              },
              {
                number: "3",
                title: "Get paid instantly",
                description: "Customer scans and pays via UPI. Money arrives in your wallet within 3 seconds."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center shadow-lg">
                      <span className="text-2xl font-bold text-white">{step.number}</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
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
      <section id="testimonials" className="py-32 bg-white">
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

      {/* FAQ Section */}
      <section id="faq" className="py-32 bg-gradient-to-b from-white to-emerald-50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Frequently asked
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                questions
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about DrivoPay
            </p>
          </motion.div>

          <div className="space-y-4">
            <FAQItem
              question="How do I get started with DrivoPay?"
              answer="Download the DrivoPay app from Google Play Store or Apple App Store. Sign up with your phone number, add your bank details, and you're ready to start receiving instant payments. The entire process takes less than 2 minutes."
              delay={0}
            />
            <FAQItem
              question="Are there really zero fees?"
              answer="Yes! Unlike other payment platforms that charge 2-3% transaction fees, DrivoPay charges absolutely nothing. You keep 100% of what you earn. We believe drivers work hard for their money and shouldn't have to give a cut to payment processors."
              delay={0.1}
            />
            <FAQItem
              question="How fast are the payouts?"
              answer="Our average payout time is under 3 seconds. The moment your customer scans your QR code and completes the payment, the money is instantly credited to your DrivoPay wallet. You can then transfer it to your bank account anytime."
              delay={0.2}
            />
            <FAQItem
              question="Is my money safe with DrivoPay?"
              answer="Absolutely. DrivoPay is regulated by RBI and uses bank-grade encryption to protect your money. All funds are insured and we never store your banking credentials. Your money is as safe as it would be in your bank account."
              delay={0.3}
            />
            <FAQItem
              question="Can I use DrivoPay with any ride-hailing platform?"
              answer="Yes! DrivoPay works with all major platforms including Uber, Ola, Rapido, Zomato, Swiggy, and Dunzo. You can use it alongside your existing platform apps for instant cash settlements."
              delay={0.4}
            />
            <FAQItem
              question="What are the eligibility criteria for instant loans?"
              answer="To qualify for instant loans, you need to have completed at least 50 rides/deliveries on DrivoPay with a minimum earning history of 30 days. Loan amounts range from ₹1,000 to ₹50,000 based on your earning pattern."
              delay={0.5}
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
              <Button size="lg" variant="outline" className="border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-gray-900 text-lg px-10 py-7 rounded-2xl">
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
                <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-emerald-100 flex items-center justify-center transition-colors">
                  <Globe className="w-5 h-5 text-gray-600" />
                </button>
                <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-emerald-100 flex items-center justify-center transition-colors">
                  <Users className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-3">
                <li><a href="#features" className="text-gray-600 hover:text-emerald-600 transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="text-gray-600 hover:text-emerald-600 transition-colors">How it works</a></li>
                <li><a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">Download</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">About</a></li>
                <li><a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © 2026 DrivoPay. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-600 hover:text-emerald-600 text-sm transition-colors">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-emerald-600 text-sm transition-colors">Terms</a>
              <a href="#" className="text-gray-600 hover:text-emerald-600 text-sm transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Dialog */}
      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />

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
      `}</style>
    </div>
  );
}
