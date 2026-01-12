# DrivoPay - Instant Payments Platform for Drivers

A modern, high-performance landing page for DrivoPay built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Modern Design**: Beautiful, responsive UI with gradient backgrounds and smooth animations
- **High Performance**: Built with Next.js 15 and static site generation for lightning-fast load times
- **Type-Safe**: Full TypeScript support for better development experience
- **Animations**: Smooth scroll animations and interactive components using Framer Motion
- **SEO Optimized**: Meta tags, Open Graph, and Twitter cards configured
- **Component Library**: Extensive shadcn/ui component library pre-configured
- **Responsive**: Mobile-first design that works perfectly on all devices

## 🛠️ Tech Stack

- **Framework**: Next.js 15.1.4
- **React**: 19.0.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion 11.15
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Deployment**: GitHub Pages with GitHub Actions

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/drivopay.com.git
cd drivopay.com
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build

To create a production build:

```bash
npm run build
```

The static site will be generated in the `out` directory.

## 🚀 Deployment

### GitHub Pages (Automatic)

This project is configured to automatically deploy to GitHub Pages when you push to the `main` branch.

#### Setup Steps:

1. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Under "Build and deployment", select "GitHub Actions" as the source

2. **Configure Custom Domain** (for drivopay.com):
   - In repository settings → Pages → Custom domain
   - Enter `drivopay.com`
   - Click "Save"

3. **Update DNS Settings**:
   Add these DNS records at your domain registrar:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153

   Type: A
   Name: @
   Value: 185.199.109.153

   Type: A
   Name: @
   Value: 185.199.110.153

   Type: A
   Name: @
   Value: 185.199.111.153

   Type: CNAME
   Name: www
   Value: yourusername.github.io
   ```

4. **Push to main branch**:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

The GitHub Actions workflow will automatically:
- Install dependencies
- Build the Next.js application
- Add the CNAME file for custom domain
- Deploy to GitHub Pages

### Alternative Deployment Options

#### Vercel (Recommended for Next.js)
```bash
npm i -g vercel
vercel
```

#### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod
```

## 📁 Project Structure

```
drivopay.com/
├── app/
│   ├── globals.css          # Global styles and CSS variables
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main landing page
├── components/
│   ├── ui/                  # shadcn/ui components
│   └── UserNotRegisteredError.tsx
├── hooks/
│   └── use-mobile.ts        # Mobile detection hook
├── lib/
│   └── utils.ts             # Utility functions
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions workflow
├── public/                  # Static assets
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## 🎨 Customization

### Colors
Edit the color scheme in `app/globals.css`:
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* ... more color variables */
}
```

### Components
All UI components are in `components/ui/` and can be customized individually.

### Content
Main landing page content is in `app/page.tsx`. Edit the text, images, and sections as needed.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Configuration Files

- `next.config.js` - Next.js configuration (static export enabled)
- `tailwind.config.ts` - Tailwind CSS configuration with custom theme
- `tsconfig.json` - TypeScript compiler options
- `eslint.config.mjs` - ESLint configuration

## 📄 License

See the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, email support@drivopay.com or open an issue in the GitHub repository.

## 🌟 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
