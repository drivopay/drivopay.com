# DrivoPay Migration Guide

## Quick Start: Splitting the Monolith

This guide will help you migrate from the current monolithic repository to a microservices architecture.

---

## Current Status

**Branch:** `architecture/microservices-split`

**Current Repository (drivopay.com)** contains:
- Landing page (app/page.tsx)
- Dashboard webapp (app/dashboard/*)
- API routes (app/api/razorpay/*)

**Target Architecture:**
- `drivopay-landing` - Landing page only
- `drivopay-webapp` - Dashboard web application
- `drivopay-backend` - Backend API services
- `drivopay-app` - Mobile apps (already exists)

---

## Step-by-Step Migration

### Step 1: Prepare Current Repository (drivopay-landing)

This repository will only contain the landing page.

**Files to Keep:**
```
drivopay-landing/
├── app/
│   ├── page.tsx              ✅ Keep (landing page)
│   ├── layout.tsx            ✅ Keep
│   ├── globals.css           ✅ Keep
│   ├── robots.ts             ✅ Keep
│   └── sitemap.ts            ✅ Keep
├── components/
│   └── (landing-related)     ✅ Keep only landing page components
├── public/                   ✅ Keep
└── package.json              ✅ Update dependencies
```

**Files to Remove/Move:**
```
❌ Remove: app/dashboard/*
❌ Remove: app/api/*
❌ Remove: contexts/auth-context.tsx (move to webapp)
❌ Remove: Dashboard-related components
```

**Commands:**
```bash
# On the architecture/microservices-split branch
git rm -r app/dashboard
git rm -r app/api
git rm -r contexts
git commit -m "refactor: Remove webapp and API code from landing repo"
```

---

### Step 2: Create drivopay-backend Repository

Create a new repository for the backend API.

```bash
# Create new repository on GitHub first, then:
mkdir ../drivopay-backend
cd ../drivopay-backend
git init
git remote add origin https://github.com/drivopay/drivopay-backend.git

# Create initial structure
mkdir -p src/{api/v1/{routes,controllers,middlewares,validators},services,models,database,utils,config,types}
mkdir -p tests/{unit,integration,e2e}
mkdir -p scripts

# Copy API routes from old repo
# (You'll need to refactor Next.js API routes to Express/Fastify)
```

**Create package.json:**
```json
{
  "name": "drivopay-backend",
  "version": "1.0.0",
  "description": "DrivoPay Backend API",
  "main": "dist/app.js",
  "scripts": {
    "dev": "tsx watch src/app.ts",
    "build": "tsc",
    "start": "node dist/app.js",
    "migrate": "node dist/scripts/migrate.js",
    "seed": "node dist/scripts/seed.js",
    "test": "jest",
    "lint": "eslint src/**/*.ts"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "dotenv": "^16.3.1",
    "pg": "^8.11.3",
    "redis": "^4.6.10",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3",
    "zod": "^3.22.4",
    "razorpay": "^2.9.6"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@types/express": "^4.17.21",
    "typescript": "^5.3.0",
    "tsx": "^4.6.2",
    "jest": "^29.7.0"
  }
}
```

**Create src/app.ts:**
```typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/v1', apiRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
```

**Create Dockerfile:**
```dockerfile
FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nodejs
EXPOSE 8000

CMD ["node", "dist/app.js"]
```

**Create .env.example:**
```env
NODE_ENV=development
PORT=8000

DATABASE_URL=postgresql://drivopay:password@localhost:5432/drivopay_db
REDIS_URL=redis://localhost:6379

JWT_SECRET=your-jwt-secret-here
JWT_EXPIRES_IN=7d

RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_secret_here

CORS_ORIGIN=http://localhost:3001,http://localhost:3000
```

**Initial commit:**
```bash
git add .
git commit -m "feat: Initial backend API setup"
git push -u origin main
```

---

### Step 3: Create drivopay-webapp Repository

Create a new repository for the dashboard webapp.

```bash
# Create new repository on GitHub first, then:
mkdir ../drivopay-webapp
cd ../drivopay-webapp

# Initialize Next.js app
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir

# Copy dashboard code from old repo
cd ../drivopay.com
cp -r app/dashboard ../drivopay-webapp/app/
cp -r components/dashboard ../drivopay-webapp/components/
cp -r contexts ../drivopay-webapp/
cp -r hooks ../drivopay-webapp/
cp -r lib ../drivopay-webapp/
```

**Update package.json:**
```json
{
  "name": "drivopay-webapp",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev -p 3001",
    "build": "next build",
    "start": "next start -p 3001",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^15.1.5",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@radix-ui/react-*": "latest",
    "axios": "^1.6.0",
    "next-auth": "^4.24.5",
    "swr": "^2.2.4"
  }
}
```

**Create lib/api-client.ts:**
```typescript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

**Create .env.example:**
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-nextauth-secret
```

**Create Dockerfile:**
```dockerfile
FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3001
ENV PORT=3001

CMD ["node", "server.js"]
```

**Commit and push:**
```bash
git add .
git commit -m "feat: Initial webapp setup with dashboard"
git push -u origin main
```

---

### Step 4: Setup Docker Compose for Local Development

Create a workspace directory to hold all repositories.

```bash
mkdir ~/drivopay-workspace
cd ~/drivopay-workspace

# Clone all repositories
git clone https://github.com/drivopay/drivopay-landing.git
git clone https://github.com/drivopay/drivopay-webapp.git
git clone https://github.com/drivopay/drivopay-backend.git
```

**Create docker-compose.yml in workspace root:**
```yaml
version: '3.9'

services:
  postgres:
    image: postgres:16-alpine
    container_name: drivopay-postgres
    environment:
      POSTGRES_DB: drivopay_db
      POSTGRES_USER: drivopay
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - drivopay-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U drivopay"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: drivopay-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - drivopay-network

  backend:
    build:
      context: ./drivopay-backend
      dockerfile: Dockerfile
    container_name: drivopay-backend
    environment:
      NODE_ENV: development
      PORT: 8000
      DATABASE_URL: postgresql://drivopay:password@postgres:5432/drivopay_db
      REDIS_URL: redis://redis:6379
      JWT_SECRET: dev-secret-key
      CORS_ORIGIN: http://localhost:3001,http://localhost:3000
    ports:
      - "8000:8000"
    volumes:
      - ./drivopay-backend:/app
      - /app/node_modules
    networks:
      - drivopay-network
    depends_on:
      postgres:
        condition: service_healthy

  webapp:
    build:
      context: ./drivopay-webapp
      dockerfile: Dockerfile
    container_name: drivopay-webapp
    environment:
      NEXT_PUBLIC_API_BASE_URL: http://localhost:8000/api/v1
      NEXTAUTH_URL: http://localhost:3001
    ports:
      - "3001:3001"
    volumes:
      - ./drivopay-webapp:/app
      - /app/node_modules
    networks:
      - drivopay-network
    depends_on:
      - backend

  landing:
    build:
      context: ./drivopay-landing
      dockerfile: Dockerfile
    container_name: drivopay-landing
    ports:
      - "3000:3000"
    volumes:
      - ./drivopay-landing:/app
      - /app/node_modules
    networks:
      - drivopay-network

networks:
  drivopay-network:
    driver: bridge

volumes:
  postgres_data:
  redis_data:
```

**Start all services:**
```bash
docker-compose up -d

# View logs
docker-compose logs -f

# Access services:
# - Landing: http://localhost:3000
# - Webapp: http://localhost:3001
# - Backend: http://localhost:8000
```

---

### Step 5: Database Setup

**Create init-db.sql:**
```sql
-- Create database
CREATE DATABASE drivopay_db;

-- Connect to database
\c drivopay_db;

-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create wallets table
CREATE TABLE wallets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    balance DECIMAL(15, 2) DEFAULT 0.00,
    currency VARCHAR(3) DEFAULT 'INR',
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create transactions table
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    wallet_id UUID REFERENCES wallets(id),
    type VARCHAR(50) NOT NULL,
    category VARCHAR(100),
    amount DECIMAL(15, 2) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    payment_method VARCHAR(50),
    reference_id VARCHAR(255),
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_wallets_user_id ON wallets(user_id);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);
```

**Run migrations:**
```bash
# Copy SQL file to postgres container
docker cp init-db.sql drivopay-postgres:/init-db.sql

# Execute SQL
docker exec -it drivopay-postgres psql -U drivopay -d drivopay_db -f /init-db.sql
```

---

## Testing the Setup

### 1. Test Backend Health
```bash
curl http://localhost:8000/health
# Expected: {"status":"ok","timestamp":"2026-02-09T..."}
```

### 2. Test Database Connection
```bash
docker exec -it drivopay-postgres psql -U drivopay -d drivopay_db -c "SELECT version();"
```

### 3. Test Redis Connection
```bash
docker exec -it drivopay-redis redis-cli ping
# Expected: PONG
```

### 4. Test Webapp
Open browser: http://localhost:3001

### 5. Test Landing Page
Open browser: http://localhost:3000

---

## Troubleshooting

### Issue: Port already in use
```bash
# Find and kill process using port
lsof -ti:3000 | xargs kill -9
lsof -ti:3001 | xargs kill -9
lsof -ti:8000 | xargs kill -9
```

### Issue: Database connection failed
```bash
# Check postgres logs
docker logs drivopay-postgres

# Restart postgres
docker-compose restart postgres
```

### Issue: Docker build fails
```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache
```

---

## Next Steps

1. ✅ Create GitHub repositories
2. ✅ Setup local Docker environment
3. ⬜ Migrate authentication logic to backend
4. ⬜ Refactor API routes from Next.js to Express
5. ⬜ Update webapp to use backend API
6. ⬜ Setup CI/CD pipelines
7. ⬜ Deploy to GCP

---

## Commands Cheat Sheet

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# Rebuild specific service
docker-compose build backend

# View logs
docker-compose logs -f backend

# Execute command in container
docker-compose exec backend npm run migrate

# Clean everything
docker-compose down -v
docker system prune -a
```

---

**Need Help?** Refer to MICROSERVICES_ARCHITECTURE.md for detailed architecture documentation.
