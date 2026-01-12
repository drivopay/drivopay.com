# DrivoPay - Instant Payments Platform for Drivers

<div align="center">

![DrivoPay Logo](public/output-onlinepngtools.png)

**Get paid instantly. No platform fees. No waiting periods.**

[🌐 Visit Website](https://drivopay.com) • [📖 Documentation](#documentation) • [🚀 Deployment](DEPLOYMENT.md)

</div>

---

## 📱 About DrivoPay

**DrivoPay** is a revolutionary payments platform built specifically for gig economy drivers. Whether you drive for Uber, Ola, Rapido, or deliver for Zomato, Swiggy, or Dunzo, DrivoPay puts money in your pocket instantly.

### The Problem We Solve

Traditional payment platforms make drivers wait days or weeks for their earnings. Hidden fees eat into profits. Complicated withdrawal processes create frustration. **DrivoPay changes everything.**

### Our Solution

- **⚡ Instant Payouts**: Get paid the moment you complete a ride or delivery
- **💰 Zero Fees**: Keep 100% of what you earn - no platform cuts or hidden charges
- **🎯 Smart Wallet**: Track all your earnings across platforms in one place
- **🤖 AI Insights**: Get personalized recommendations to maximize your income
- **🏦 Micro-Loans**: Access instant credit based on your earning patterns
- **⛽ Fuel Discounts**: Save money at partner fuel stations
- **🔒 Bank-Grade Security**: Your money is protected with enterprise-level encryption

### Key Features

| Feature | Description |
|---------|-------------|
| **Multi-Platform Integration** | Works with Uber, Ola, Rapido, Zomato, Swiggy, Dunzo, and more |
| **Real-Time Dashboard** | View earnings, rides, and analytics in real-time |
| **Instant Withdrawals** | Transfer money to your bank account or UPI instantly |
| **Smart Analytics** | AI-powered insights to help you earn more |
| **24/7 Support** | Round-the-clock customer support in your language |
| **Referral Bonuses** | Earn extra by referring other drivers |

### Trusted by 50,000+ Drivers

Join thousands of drivers who have already made the switch to instant payments and increased their earnings by an average of 20%.

---

## 🛠️ Technical Stack

This landing page is a high-performance, fully responsive website built with modern web technologies:

- **Framework**: [Next.js](https://nextjs.org/) 15.1.5 (React 19)
- **Language**: [TypeScript](https://www.typescriptlang.org/) 5.x
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 3.4
- **Animations**: [Framer Motion](https://www.framer.com/motion/) 11.15
- **UI Components**: [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: GitHub Pages with automated CI/CD
- **Build**: Static Site Generation (SSG)

### Key Technical Features

- ✅ **Mobile-First Design**: Responsive hamburger menu and optimized layouts
- ✅ **SEO Optimized**: Meta tags, Open Graph, and Twitter cards
- ✅ **Lightning Fast**: Static generation with CDN delivery
- ✅ **Type-Safe**: Full TypeScript for robust development
- ✅ **Accessible**: WCAG compliant components
- ✅ **Performance**: 90+ Lighthouse score
- ✅ **Modern**: React 19 with latest Next.js features

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20 or higher
- npm or yarn package manager
- Git

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/drivopay/drivopay.com.git
   cd drivopay.com
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

Create an optimized production build:

```bash
npm run build
```

The static site will be generated in the `out/` directory.

### Preview Production Build

Test the production build locally:

```bash
npm run build && npx serve out
```

---

## 📁 Project Structure

```
drivopay.com/
├── app/
│   ├── globals.css              # Global styles and CSS variables
│   ├── layout.tsx               # Root layout with metadata & SEO
│   ├── page.tsx                 # Main landing page component
│   └── favicon.ico              # Site favicon
│
├── components/
│   └── ui/                      # shadcn/ui component library
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── ...                  # 20+ pre-built components
│
├── lib/
│   └── utils.ts                 # Utility functions (cn helper)
│
├── hooks/
│   └── use-mobile.ts            # Mobile device detection hook
│
├── public/
│   └── output-onlinepngtools.png # DrivoPay logo (optimized)
│
├── .github/
│   └── workflows/
│       └── deploy.yml           # CI/CD pipeline configuration
│
├── DEPLOYMENT.md                # Comprehensive deployment guide
├── LOGO_DESIGN.md              # Logo design documentation
├── next.config.js              # Next.js configuration (SSG)
├── tailwind.config.ts          # Tailwind CSS customization
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

---

## 🚀 Deployment

This project is deployed to **GitHub Pages** using an automated CI/CD pipeline.

### Live URLs

- **Primary**: https://drivopay.com
- **WWW**: https://www.drivopay.com (redirects to primary)
- **GitHub Pages**: https://drivopay.github.io/drivopay.com (redirects to primary)

### Deployment Triggers

The site automatically deploys when:

1. ✅ **Direct push** to `main` branch
2. ✅ **Pull Request merge** to `main` branch
3. ✅ **Manual trigger** via GitHub Actions UI

### Quick Deployment

```bash
# Make changes to the code
git add .
git commit -m "Your commit message"
git push origin main

# GitHub Actions automatically:
# 1. Builds the Next.js application
# 2. Generates static files
# 3. Deploys to gh-pages branch
# 4. Updates live site
```

### Comprehensive Deployment Guide

For detailed deployment instructions, troubleshooting, and configuration, see [DEPLOYMENT.md](DEPLOYMENT.md).

---

## 🎨 Design & Branding

### Color Palette

**Emerald & Teal Theme** - Money-focused, trustworthy, modern:

- **Primary Emerald**: `#10B981` - Money, growth, prosperity
- **Primary Teal**: `#14B8A6` - Trust, professionalism, reliability
- **Accent Cyan**: `#06B6D4` - Technology, clarity, instant transactions

### Logo

The DrivoPay logo combines multiple symbolic elements:

- **Circular Payment Symbol**: Represents coin/currency
- **Stylized "D" Shape**: Brand initial with forward motion
- **Lightning Bolt**: Instant payments (hero element)
- **Motion Lines**: Speed and driving motion
- **Gradient**: Modern fintech aesthetic

For detailed logo design rationale, see [LOGO_DESIGN.md](LOGO_DESIGN.md).

### Typography

- **Font Family**: System UI fonts (sans-serif)
- **Weights**: 400 (regular), 600 (semibold), 700 (bold), 800 (extrabold)
- **Responsive Sizing**: Mobile-first with breakpoints at md, lg, xl

---

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server (port 3000) |
| `npm run build` | Build production-ready static site |
| `npm start` | Start Next.js production server |
| `npm run lint` | Run ESLint to check code quality |

---

## 🎯 Key Features Implemented

### 🖥️ Landing Page Sections

1. **Hero Section**
   - Attention-grabbing headline
   - Primary and secondary CTAs
   - Trust indicators (50,000+ drivers)
   - Animated background gradients

2. **Platform Integrations**
   - Logos of partner platforms
   - Visual credibility boost

3. **Features Grid**
   - 6 core features with icons
   - Bento-style card layout
   - Hover animations

4. **Stats Section**
   - Animated counters
   - Social proof metrics
   - Gradient background

5. **Testimonials**
   - Real driver reviews
   - Star ratings
   - Platform badges

6. **Final CTA**
   - Compelling call-to-action
   - Email signup form
   - Social proof reinforcement

### 📱 Mobile Responsiveness

- **Hamburger Menu**: Smooth slide-in mobile navigation
- **Responsive Images**: Logo scales appropriately on mobile
- **Touch-Friendly**: All buttons and links optimized for touch
- **Fluid Typography**: Text scales based on viewport
- **Adaptive Layout**: Grid columns collapse on mobile

### ⚡ Performance Optimizations

- **Static Site Generation**: Pre-rendered HTML for instant loading
- **Image Optimization**: Next.js Image component with priority loading
- **Code Splitting**: Automatic by Next.js
- **CSS Optimization**: Tailwind CSS purged and minified
- **Lazy Loading**: Components load as needed
- **CDN Delivery**: Served via GitHub Pages CDN

---

## 🎨 Customization Guide

### Update Colors

Edit `app/globals.css` to change the color scheme:

```css
:root {
  --primary: 160 84% 39%;      /* Emerald-600 */
  --primary-foreground: 0 0% 100%;
  /* ... other variables */
}
```

### Modify Content

Edit `app/page.tsx` to update:
- Hero section headline and copy
- Feature descriptions
- Testimonials
- CTA text
- Partner logos

### Add New Components

Use shadcn/ui to add more components:

```bash
npx shadcn@latest add <component-name>
```

Available components: button, card, input, dialog, dropdown-menu, and 20+ more.

### Update Metadata

Edit SEO and social sharing info in `app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  title: "Your Title",
  description: "Your description",
  // ... more metadata
}
```

---

## 📖 Documentation

- **[DEPLOYMENT.md](DEPLOYMENT.md)**: Complete deployment guide with troubleshooting
- **[LOGO_DESIGN.md](LOGO_DESIGN.md)**: Logo design rationale and usage guidelines
- **[Next.js Docs](https://nextjs.org/docs)**: Framework documentation
- **[Tailwind CSS Docs](https://tailwindcss.com/docs)**: Styling documentation
- **[shadcn/ui Docs](https://ui.shadcn.com)**: Component library documentation

---

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `next.config.js` | Next.js configuration (static export, images) |
| `tailwind.config.ts` | Tailwind CSS theme customization |
| `tsconfig.json` | TypeScript compiler options |
| `eslint.config.mjs` | ESLint rules and plugins |
| `.github/workflows/deploy.yml` | CI/CD pipeline configuration |

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Write clear commit messages
- Test your changes locally before submitting
- Update documentation if needed
- Ensure builds pass before submitting PR

---

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature idea? [Open an issue](https://github.com/drivopay/drivopay.com/issues) on GitHub.

Please include:
- **Bug Reports**: Steps to reproduce, expected vs actual behavior, screenshots
- **Feature Requests**: Clear description, use cases, mockups if applicable

---

## 📧 Support & Contact

- **Website**: [drivopay.com](https://drivopay.com)
- **Email**: support@drivopay.com
- **GitHub**: [github.com/drivopay/drivopay.com](https://github.com/drivopay/drivopay.com)
- **Issues**: [Report a problem](https://github.com/drivopay/drivopay.com/issues)

---

## 📄 License

This project is proprietary and confidential. All rights reserved by DrivoPay.

---

## 🌟 Acknowledgments

Built with love using:

- [**Next.js**](https://nextjs.org/) - The React Framework for Production
- [**React**](https://react.dev/) - JavaScript library for building user interfaces
- [**Tailwind CSS**](https://tailwindcss.com/) - Utility-first CSS framework
- [**Framer Motion**](https://www.framer.com/motion/) - Animation library for React
- [**shadcn/ui**](https://ui.shadcn.com/) - Re-usable component library
- [**Radix UI**](https://www.radix-ui.com/) - Unstyled, accessible components
- [**Lucide**](https://lucide.dev/) - Beautiful & consistent icon pack
- [**TypeScript**](https://www.typescriptlang.org/) - Typed JavaScript

Special thanks to the open-source community for making this possible.

---

## 📊 Project Stats

- **Version**: 1.0.0
- **Last Updated**: January 2026
- **Dependencies**: 40+ npm packages
- **Components**: 20+ UI components
- **Lines of Code**: 1,500+
- **Lighthouse Score**: 90+

---

<div align="center">

**Made with ❤️ for drivers by DrivoPay**

[⬆ Back to top](#drivopay---instant-payments-platform-for-drivers)

</div>
