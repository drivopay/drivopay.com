# 🚗 DrivoPay - Complete Payment Platform for Gig Economy Workers

<div align="center">

![DrivoPay Logo](public/output-onlinepngtools.png)

**The only payment system designed specifically for drivers, delivery partners, and gig economy workers**

[![Next.js](https://img.shields.io/badge/Next.js-15.1.5-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8)](https://tailwindcss.com/)
[![Razorpay](https://img.shields.io/badge/Razorpay-Integrated-528ff0)](https://razorpay.com/)

[Live Demo](#) | [Documentation](PROJECT_DOCUMENTATION.md) | [Setup Guide](RAZORPAY_SETUP.md)

</div>

---

## ✨ What's New in DrivoPay

**DrivoPay** has evolved from a simple landing page to a **complete financial management platform** for gig economy workers. Version 1.0 includes:

- ✅ **Full Authentication System** (Email + Mobile OTP)
- ✅ **Real Razorpay Payment Integration** (UPI QR Codes)
- ✅ **Complete Dashboard** with earnings tracking
- ✅ **Instant Loans** (₹500 - ₹2,000)
- ✅ **Expense Tracking** (Fuel, maintenance, tolls)
- ✅ **Smart Savings & Investments**
- ✅ **Rewards & Gamification** (₹10 - ₹100 coupons)
- ✅ **AI-Powered Predictions**
- ✅ **Multi-Language Support** (6 Indian languages)
- ✅ **KYC & Document Management**
- ✅ **Withdrawal System** (IMPS/UPI/NEFT)

---

## 🎯 For Whom?

### Target Users
- 🚗 Ride-sharing drivers (Uber, Ola, Rapido)
- 🍔 Food delivery partners (Zomato, Swiggy, Dunzo)
- 🛒 Grocery delivery partners
- 📦 E-commerce delivery partners
- 🏍️ Any gig economy worker

### What We Solve
- ❌ Long payment waiting periods → ✅ Instant payments
- ❌ High platform fees → ✅ Zero transaction fees
- ❌ Complex withdrawal process → ✅ One-click withdrawals
- ❌ No financial insights → ✅ AI-powered predictions
- ❌ Difficulty tracking expenses → ✅ Automatic categorization
- ❌ No access to credit → ✅ Instant micro-loans

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Razorpay account ([Sign up free](https://dashboard.razorpay.com/signup))

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/drivopay.git
cd drivopay

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Add your Razorpay keys to .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Environment Setup

```env
# Get these from https://dashboard.razorpay.com/app/keys
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_SECRET_KEY
RAZORPAY_WEBHOOK_SECRET=YOUR_WEBHOOK_SECRET
RAZORPAYX_ACCOUNT_NUMBER=YOUR_ACCOUNT_NUMBER
```

📖 **Detailed Setup:** [RAZORPAY_SETUP.md](RAZORPAY_SETUP.md)

---

## ✨ Complete Feature List

### 💰 Payment & Wallet Features
- **Real UPI QR Code Generation** (via Razorpay API)
  - Works with PhonePe, Google Pay, Paytm, BHIM
  - Dynamic amount-based QR codes
  - Shareable payment links
  - Quick amount buttons (₹100, ₹200, ₹500, ₹1000)

- **Instant Withdrawals**
  - IMPS (instant, 24x7)
  - UPI (instant, 24x7)
  - NEFT (2-3 hours)
  - RTGS (30 minutes, ₹2L+)

- **Wallet Management**
  - Real-time balance tracking
  - Transaction history
  - Credit/Debit categorization
  - Status tracking (completed/pending)

### 🏦 Financial Services

#### 1. Instant Loans (Micro-lending)
- **4 Loan Tiers:**
  - ₹500 (7 days, 0% interest) - Most Popular
  - ₹1,000 (14 days, 1% interest) - Recommended
  - ₹1,500 (21 days, 2% interest)
  - ₹2,000 (30 days, 2.5% interest) - Unlock at 20 rides

- **Features:**
  - AI-powered credit scoring (780 displayed)
  - Instant approval in seconds
  - Auto-repayment from earnings
  - No paperwork required
  - Eligibility based on ride history

#### 2. Expense Tracker
- **Categories:**
  - Fuel expenses
  - Maintenance & repairs
  - Toll charges
  - Food & beverages
  - Other expenses

- **Analytics:**
  - Category-wise breakdown with visual bars
  - Profit margin calculation
  - Average daily expense
  - Export to CSV

#### 3. Smart Savings & Investments
- **Auto-Save Rules:**
  - Daily ₹50 auto-save
  - Round-up savings
  - Bonus day 10% save

- **Investment Options:**
  - Digital Gold (from ₹10)
  - Mutual Funds SIP (from ₹500/month)

- **Emergency Features:**
  - SOS Fund (instant ₹5,000 access)
  - Health Insurance (₹299/month, ₹5L coverage)
  - Accident Insurance (₹149/month, ₹10L coverage)

### 🎮 Gamification & Rewards

**Unlockable Rewards System:**
- ₹10 Fuel Coupon (5 rides) - Expires 7 days
- ₹25 Food Voucher (10 rides) - Expires 5 days
- ₹50 Bonus Cash (20 rides) - Expires 10 days
- ₹75 Service Discount (30 rides) - Expires 15 days
- ₹100 Super Reward (50 rides) - Expires 30 days

**Features:**
- Visual progress tracking
- Rides remaining indicator
- Total rewards value display
- Claim functionality
- Expiry date tracking

### 🤖 AI-Powered Insights

**Earnings Predictions:**
- Next week forecast (92% confidence)
- Tomorrow's earnings estimate
- Historical trend analysis

**Smart Recommendations:**
- Peak hours analysis (8-10 AM, 6-9 PM)
- Expected earnings per time slot
- Weather impact on demand
- High-demand area hotspots
- Event-based forecasting
- Distance from hotspots

### 🌐 Multi-Language Support

**6 Indian Languages:**
- English (Default)
- Hindi (हिंदी)
- Telugu (తెలుగు)
- Tamil (தமிழ்)
- Kannada (ಕನ್ನಡ)
- Malayalam (മലയാളം)

**Features:**
- 30+ translated strings
- Persistent preference
- Smooth dropdown with flags
- Native script display

### 👤 User Management

**Authentication:**
- Email & Password login
- Mobile OTP authentication
- Session persistence
- Protected routes
- Auto-redirect logic

**Profile & Settings:**
- Edit personal information
- Update contact details
- Profile photo management

**KYC & Documents:**
- Identity docs (Aadhaar, PAN, DL)
- Vehicle docs (RC, Insurance)
- Bank account proof
- Verification status
- Document expiry warnings

**Notifications:**
- Real-time payment alerts
- Transaction notifications
- Loan approval status
- Reward unlock notifications

---

## 🏗️ Technology Stack

### Frontend
- **Framework:** Next.js 15.1.5 (App Router)
- **Language:** TypeScript 5.0
- **React:** 19.0.0
- **Styling:** Tailwind CSS 3.4
- **UI Library:** Radix UI + shadcn/ui
- **Animations:** Framer Motion 11.15
- **Icons:** Lucide React
- **QR Codes:** react-qr-code (fallback)

### Backend
- **Runtime:** Node.js
- **API Routes:** Next.js 15 API Routes
- **Payment Gateway:** Razorpay SDK
- **Authentication:** Context API + localStorage
- **Crypto:** Node.js crypto module

### Integrations
- **Payment Gateway:** Razorpay
  - Payment collection (UPI QR)
  - Payment verification
  - Webhooks
  - Payouts (RazorpayX)

---

## 📂 Project Structure

```
drivopay/
├── app/
│   ├── api/razorpay/
│   │   ├── create-qr/route.ts       # Generate UPI QR
│   │   ├── create-order/route.ts    # Create payment order
│   │   ├── verify-payment/route.ts  # Verify payment
│   │   ├── payout/route.ts          # Process withdrawals
│   │   └── webhook/route.ts         # Handle webhooks
│   ├── dashboard/
│   │   ├── page.tsx                 # Main dashboard
│   │   ├── wallet/page.tsx          # Wallet
│   │   ├── earnings/page.tsx        # Earnings
│   │   ├── expenses/page.tsx        # Expenses
│   │   ├── savings/page.tsx         # Savings
│   │   ├── loans/page.tsx           # Loans
│   │   └── settings/page.tsx        # Settings
│   ├── layout.tsx                   # Root layout
│   ├── page.tsx                     # Landing page
│   └── globals.css                  # Styles
├── components/
│   ├── ui/                          # UI components
│   ├── AuthDialog.tsx               # Auth modal
│   ├── ReceivePaymentDialog.tsx     # QR payment
│   ├── WithdrawDialog.tsx           # Withdrawals
│   ├── LanguageSelector.tsx         # Language switcher
│   ├── AIPredictions.tsx            # AI insights
│   ├── RewardsCoupons.tsx           # Rewards
│   ├── NotificationsDropdown.tsx    # Notifications
│   └── UserMenu.tsx                 # User dropdown
├── contexts/
│   ├── AuthContext.tsx              # Auth state
│   └── LanguageContext.tsx          # Language state
├── public/                          # Static assets
├── .env.example                     # Env template
├── .env.local                       # Your keys (gitignored)
├── PROJECT_DOCUMENTATION.md         # Full docs
├── RAZORPAY_SETUP.md               # Setup guide
└── README.md                        # This file
```

---

## 🎨 Design System

### Colors
```css
Primary: Emerald (#10B981) → Teal (#14B8A6)
Accent: Purple → Pink, Red → Orange, Blue → Indigo
Semantic: Success (Green), Error (Red), Warning (Yellow)
```

### Typography
- **Font:** Inter (Google Fonts)
- **Weights:** 400, 500, 600, 700, 800

### Components
- Fully responsive
- Smooth Framer Motion animations
- Accessibility compliant

---

## 🔐 Security Features

- ✅ Server-side payment processing only
- ✅ Payment signature verification (HMAC SHA256)
- ✅ Webhook signature validation
- ✅ Environment variable protection
- ✅ No sensitive data in frontend
- ✅ Protected API routes
- ✅ HTTPS enforced (production)

---

## 🧪 Testing Guide

### Test Mode (No Real Money)
```bash
# Use Razorpay test keys (rzp_test_xxx)
# All transactions are simulated
```

### Test UPI IDs (Razorpay)
- Success: `success@razorpay`
- Failure: `failure@razorpay`

### Features to Test
- [ ] Signup with email/phone
- [ ] Login with mobile OTP
- [ ] Generate payment QR code
- [ ] View dashboard statistics
- [ ] Apply for instant loan
- [ ] Track expenses by category
- [ ] Unlock rewards (progress)
- [ ] Switch languages
- [ ] View AI predictions
- [ ] KYC document upload
- [ ] Withdraw funds

---

## 📊 API Endpoints

### Payment APIs

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/razorpay/create-qr` | POST | Generate UPI QR code |
| `/api/razorpay/create-order` | POST | Create payment order |
| `/api/razorpay/verify-payment` | POST | Verify payment signature |
| `/api/razorpay/payout` | POST | Process withdrawal |
| `/api/razorpay/webhook` | POST | Handle payment webhooks |

---

## 🚢 Deployment

### Vercel (Recommended)
```bash
# Deploy to Vercel
vercel

# Add environment variables in dashboard
```

### Environment Variables
```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxx
RAZORPAY_KEY_SECRET=xxx
RAZORPAY_WEBHOOK_SECRET=xxx
RAZORPAYX_ACCOUNT_NUMBER=xxx
```

---

## 📚 Documentation

- **[PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md)** - Complete technical documentation
- **[RAZORPAY_SETUP.md](RAZORPAY_SETUP.md)** - Payment gateway setup guide
- **Inline Comments** - Code documentation

---

## 🎯 Roadmap

### Completed ✅
- Full authentication system
- Razorpay payment integration
- Dashboard with real-time stats
- Instant loans feature
- Expense tracking
- Smart savings
- Rewards & gamification
- AI predictions
- Multi-language support
- KYC management

### Coming Soon 🚀
- Real bank integration
- Mobile app (React Native)
- Push notifications
- Referral system
- Advanced analytics
- Biometric auth
- Offline support (PWA)
- Chatbot support

---

## 📊 Project Statistics

- **Version:** 1.0.0
- **Total Files:** 50+
- **Lines of Code:** 15,000+
- **Components:** 25+
- **API Endpoints:** 5
- **Languages:** 6
- **Features:** 12 major features
- **Dependencies:** 40+ packages

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📧 Support

- **Email:** support@drivopay.com
- **GitHub Issues:** [Report a bug](https://github.com/yourusername/drivopay/issues)
- **Documentation:** [Full Docs](PROJECT_DOCUMENTATION.md)

---

## 📝 License

Copyright © 2026 DrivoPay. All rights reserved.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React Framework
- [Razorpay](https://razorpay.com/) - Payment Gateway
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [shadcn/ui](https://ui.shadcn.com/) - UI Components
- [Lucide](https://lucide.dev/) - Icons

---

<div align="center">

**Made with ❤️ for Gig Economy Workers**

⭐ Star this repo if you find it helpful!

[⬆ Back to Top](#-drivopay---complete-payment-platform-for-gig-economy-workers)

</div>
