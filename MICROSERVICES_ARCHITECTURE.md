# DrivoPay Microservices Architecture

## Overview
This document outlines the microservices architecture for DrivoPay, splitting the monolithic application into separate repositories for better scalability, maintainability, and deployment flexibility.

## Repository Structure

### 1. **drivopay-landing** (Current Repo: drivopay.com)
**Purpose:** Public-facing marketing website
**Tech Stack:** Next.js 15, React 19, Tailwind CSS
**URL:** https://drivopay.com

```
drivopay-landing/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── layout.tsx
│   ├── globals.css
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── landing/                 # Landing page specific components
│   │   ├── hero-section.tsx
│   │   ├── features.tsx
│   │   └── pricing.tsx
│   └── ui/                      # Reusable UI components
├── public/
│   ├── images/
│   └── logos/
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── package.json
└── README.md
```

**Dockerfile:**
```dockerfile
FROM node:20-alpine AS base

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Runner
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
EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
```

---

### 2. **drivopay-webapp**
**Purpose:** Driver dashboard and web application
**Tech Stack:** Next.js 15, React 19, Tailwind CSS, Shadcn UI
**URL:** https://app.drivopay.com

```
drivopay-webapp/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   └── verify-otp/
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   ├── earnings/
│   │   ├── expenses/
│   │   ├── wallet/
│   │   ├── savings/
│   │   ├── loans/
│   │   ├── tax/
│   │   └── settings/
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── dashboard/
│   │   ├── earnings-chart.tsx
│   │   ├── expense-tracker.tsx
│   │   ├── wallet-balance.tsx
│   │   └── quick-actions.tsx
│   ├── ui/                      # Shadcn UI components
│   └── shared/
├── lib/
│   ├── api-client.ts            # API client for backend
│   ├── auth.ts
│   └── utils.ts
├── contexts/
│   ├── auth-context.tsx
│   └── wallet-context.tsx
├── hooks/
│   ├── use-auth.ts
│   ├── use-wallet.ts
│   └── use-transactions.ts
├── types/
│   └── index.ts
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── package.json
└── README.md
```

**Environment Variables (.env.example):**
```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws

# Auth
NEXT_PUBLIC_AUTH_PROVIDER=jwt
NEXTAUTH_SECRET=your-nextauth-secret-here
NEXTAUTH_URL=http://localhost:3001

# Feature Flags
NEXT_PUBLIC_ENABLE_SAVINGS=true
NEXT_PUBLIC_ENABLE_LOANS=true
NEXT_PUBLIC_ENABLE_TAX=true

# Analytics (optional)
NEXT_PUBLIC_GA_ID=
```

**Dockerfile:**
```dockerfile
FROM node:20-alpine AS base

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Runner
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

---

### 3. **drivopay-backend**
**Purpose:** Core backend API services
**Tech Stack:** Node.js (Express/Fastify) or Python (FastAPI), PostgreSQL, Redis
**URL:** https://api.drivopay.com

```
drivopay-backend/
├── src/
│   ├── api/
│   │   ├── v1/
│   │   │   ├── routes/
│   │   │   │   ├── auth.routes.ts
│   │   │   │   ├── users.routes.ts
│   │   │   │   ├── earnings.routes.ts
│   │   │   │   ├── expenses.routes.ts
│   │   │   │   ├── wallet.routes.ts
│   │   │   │   ├── savings.routes.ts
│   │   │   │   ├── loans.routes.ts
│   │   │   │   ├── tax.routes.ts
│   │   │   │   └── transactions.routes.ts
│   │   │   ├── controllers/
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── users.controller.ts
│   │   │   │   ├── earnings.controller.ts
│   │   │   │   ├── expenses.controller.ts
│   │   │   │   ├── wallet.controller.ts
│   │   │   │   ├── savings.controller.ts
│   │   │   │   ├── loans.controller.ts
│   │   │   │   └── tax.controller.ts
│   │   │   ├── middlewares/
│   │   │   │   ├── auth.middleware.ts
│   │   │   │   ├── validation.middleware.ts
│   │   │   │   ├── rate-limit.middleware.ts
│   │   │   │   └── error.middleware.ts
│   │   │   └── validators/
│   │   │       ├── auth.validator.ts
│   │   │       └── transaction.validator.ts
│   │   └── index.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── user.service.ts
│   │   ├── earnings.service.ts
│   │   ├── expense.service.ts
│   │   ├── wallet.service.ts
│   │   ├── savings.service.ts
│   │   ├── loan.service.ts
│   │   ├── tax.service.ts
│   │   ├── notification.service.ts
│   │   ├── payment/
│   │   │   ├── razorpay.service.ts
│   │   │   ├── razorpayx.service.ts
│   │   │   └── payment.interface.ts
│   │   └── cache/
│   │       └── redis.service.ts
│   ├── models/
│   │   ├── user.model.ts
│   │   ├── earning.model.ts
│   │   ├── expense.model.ts
│   │   ├── wallet.model.ts
│   │   ├── transaction.model.ts
│   │   ├── savings.model.ts
│   │   ├── loan.model.ts
│   │   └── tax.model.ts
│   ├── database/
│   │   ├── migrations/
│   │   ├── seeders/
│   │   ├── connection.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── crypto.ts
│   │   ├── jwt.ts
│   │   └── helpers.ts
│   ├── config/
│   │   ├── database.ts
│   │   ├── redis.ts
│   │   ├── razorpay.ts
│   │   └── app.ts
│   ├── types/
│   │   └── index.ts
│   └── app.ts
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── scripts/
│   ├── migrate.ts
│   └── seed.ts
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

**Environment Variables (.env.example):**
```env
# Application
NODE_ENV=development
PORT=8000
API_VERSION=v1

# Database
DATABASE_URL=postgresql://drivopay:password@localhost:5432/drivopay_db
DB_HOST=localhost
DB_PORT=5432
DB_NAME=drivopay_db
DB_USER=drivopay
DB_PASSWORD=password
DB_SSL=false
DB_POOL_MIN=2
DB_POOL_MAX=10

# Redis
REDIS_URL=redis://localhost:6379
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0
REDIS_TTL=3600

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-refresh-token-secret
JWT_REFRESH_EXPIRES_IN=30d

# Razorpay
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_test_secret_key_here
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret_here

# RazorpayX (Payouts)
RAZORPAYX_ACCOUNT_NUMBER=your_account_number
RAZORPAYX_KEY_ID=rzp_test_xxxxxxxxxxxxxxxx
RAZORPAYX_KEY_SECRET=your_razorpayx_secret

# CORS
CORS_ORIGIN=http://localhost:3001,http://localhost:3000
CORS_CREDENTIALS=true

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_DIR=./uploads

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
EMAIL_FROM=noreply@drivopay.com

# SMS (optional)
SMS_PROVIDER=twilio
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

# Logging
LOG_LEVEL=info
LOG_FORMAT=json
```

**Dockerfile:**
```dockerfile
FROM node:20-alpine AS base

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

RUN mkdir -p /app/uploads && chown -R nodejs:nodejs /app

USER nodejs
EXPOSE 8000

CMD ["node", "dist/app.js"]
```

**Alternative: Python FastAPI Dockerfile**
```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Create non-root user
RUN useradd -m -u 1001 appuser && chown -R appuser:appuser /app
USER appuser

EXPOSE 8000

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

### 4. **drivopay-app** (Already Exists)
**Purpose:** Mobile application (iOS & Android)
**Tech Stack:** React Native / Flutter
**Repositories:** Separate iOS and Android builds

---

## Docker Compose Configuration

### Local Development Setup

**docker-compose.yml** (Root - for running all services)

```yaml
version: '3.9'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:16-alpine
    container_name: drivopay-postgres
    environment:
      POSTGRES_DB: drivopay_db
      POSTGRES_USER: drivopay
      POSTGRES_PASSWORD: password
      POSTGRES_INITDB_ARGS: "-E UTF8"
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./scripts/init-db.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - drivopay-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U drivopay"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis Cache
  redis:
    image: redis:7-alpine
    container_name: drivopay-redis
    command: redis-server --requirepass redispassword
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - drivopay-network
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Backend API
  backend:
    build:
      context: ./drivopay-backend
      dockerfile: Dockerfile
    container_name: drivopay-backend
    environment:
      NODE_ENV: development
      PORT: 8000
      DATABASE_URL: postgresql://drivopay:password@postgres:5432/drivopay_db
      REDIS_URL: redis://:redispassword@redis:6379
      JWT_SECRET: dev-secret-key-change-in-prod
      RAZORPAY_KEY_ID: ${RAZORPAY_KEY_ID}
      RAZORPAY_KEY_SECRET: ${RAZORPAY_KEY_SECRET}
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
      redis:
        condition: service_healthy
    restart: unless-stopped

  # Web Application (Dashboard)
  webapp:
    build:
      context: ./drivopay-webapp
      dockerfile: Dockerfile
    container_name: drivopay-webapp
    environment:
      NODE_ENV: development
      NEXT_PUBLIC_API_BASE_URL: http://localhost:8000/api/v1
      NEXTAUTH_URL: http://localhost:3001
      NEXTAUTH_SECRET: dev-nextauth-secret
    ports:
      - "3001:3001"
    volumes:
      - ./drivopay-webapp:/app
      - /app/node_modules
      - /app/.next
    networks:
      - drivopay-network
    depends_on:
      - backend
    restart: unless-stopped

  # Landing Page
  landing:
    build:
      context: ./drivopay-landing
      dockerfile: Dockerfile
    container_name: drivopay-landing
    environment:
      NODE_ENV: development
    ports:
      - "3000:3000"
    volumes:
      - ./drivopay-landing:/app
      - /app/node_modules
      - /app/.next
    networks:
      - drivopay-network
    restart: unless-stopped

  # pgAdmin (Optional - for database management)
  pgadmin:
    image: dpage/pgadmin4:latest
    container_name: drivopay-pgadmin
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@drivopay.com
      PGADMIN_DEFAULT_PASSWORD: admin
      PGADMIN_CONFIG_SERVER_MODE: 'False'
    ports:
      - "5050:80"
    volumes:
      - pgadmin_data:/var/lib/pgadmin
    networks:
      - drivopay-network
    depends_on:
      - postgres

  # Redis Commander (Optional - for Redis management)
  redis-commander:
    image: rediscommander/redis-commander:latest
    container_name: drivopay-redis-commander
    environment:
      REDIS_HOSTS: local:redis:6379:0:redispassword
    ports:
      - "8081:8081"
    networks:
      - drivopay-network
    depends_on:
      - redis

networks:
  drivopay-network:
    driver: bridge

volumes:
  postgres_data:
  redis_data:
  pgadmin_data:
```

---

## Database Schema

### Core Tables

```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    profile_image VARCHAR(500),
    status VARCHAR(50) DEFAULT 'active',
    kyc_status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Wallets table
CREATE TABLE wallets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    balance DECIMAL(15, 2) DEFAULT 0.00,
    currency VARCHAR(3) DEFAULT 'INR',
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transactions table
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    wallet_id UUID REFERENCES wallets(id),
    type VARCHAR(50) NOT NULL, -- 'earning', 'expense', 'withdrawal', 'deposit'
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

-- Earnings table
CREATE TABLE earnings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    transaction_id UUID REFERENCES transactions(id),
    source VARCHAR(100) NOT NULL, -- 'uber', 'ola', 'rapido', etc.
    amount DECIMAL(15, 2) NOT NULL,
    date DATE NOT NULL,
    time TIME,
    trip_details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Expenses table
CREATE TABLE expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    transaction_id UUID REFERENCES transactions(id),
    category VARCHAR(100) NOT NULL, -- 'fuel', 'maintenance', 'food', etc.
    amount DECIMAL(15, 2) NOT NULL,
    date DATE NOT NULL,
    description TEXT,
    receipt_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Savings goals table
CREATE TABLE savings_goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    target_amount DECIMAL(15, 2) NOT NULL,
    current_amount DECIMAL(15, 2) DEFAULT 0.00,
    deadline DATE,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Loans table
CREATE TABLE loans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(15, 2) NOT NULL,
    interest_rate DECIMAL(5, 2) NOT NULL,
    tenure_months INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    disbursed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tax records table
CREATE TABLE tax_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    financial_year VARCHAR(10) NOT NULL,
    total_income DECIMAL(15, 2) DEFAULT 0.00,
    deductions DECIMAL(15, 2) DEFAULT 0.00,
    tax_payable DECIMAL(15, 2) DEFAULT 0.00,
    tax_paid DECIMAL(15, 2) DEFAULT 0.00,
    status VARCHAR(50) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_wallets_user_id ON wallets(user_id);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);
CREATE INDEX idx_earnings_user_id ON earnings(user_id);
CREATE INDEX idx_earnings_date ON earnings(date);
CREATE INDEX idx_expenses_user_id ON expenses(user_id);
CREATE INDEX idx_expenses_date ON expenses(date);
CREATE INDEX idx_savings_user_id ON savings_goals(user_id);
CREATE INDEX idx_loans_user_id ON loans(user_id);
CREATE INDEX idx_tax_records_user_id ON tax_records(user_id);
```

---

## API Structure

### Authentication Endpoints
```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh-token
POST   /api/v1/auth/logout
POST   /api/v1/auth/verify-otp
POST   /api/v1/auth/resend-otp
POST   /api/v1/auth/forgot-password
POST   /api/v1/auth/reset-password
```

### User Endpoints
```
GET    /api/v1/users/me
PUT    /api/v1/users/me
PATCH  /api/v1/users/me/password
POST   /api/v1/users/me/avatar
DELETE /api/v1/users/me
```

### Wallet Endpoints
```
GET    /api/v1/wallets
GET    /api/v1/wallets/:id
GET    /api/v1/wallets/:id/balance
POST   /api/v1/wallets/deposit
POST   /api/v1/wallets/withdraw
GET    /api/v1/wallets/:id/transactions
```

### Earnings Endpoints
```
GET    /api/v1/earnings
POST   /api/v1/earnings
GET    /api/v1/earnings/:id
PUT    /api/v1/earnings/:id
DELETE /api/v1/earnings/:id
GET    /api/v1/earnings/stats
GET    /api/v1/earnings/by-source
```

### Expenses Endpoints
```
GET    /api/v1/expenses
POST   /api/v1/expenses
GET    /api/v1/expenses/:id
PUT    /api/v1/expenses/:id
DELETE /api/v1/expenses/:id
GET    /api/v1/expenses/stats
GET    /api/v1/expenses/by-category
```

### Savings Endpoints
```
GET    /api/v1/savings
POST   /api/v1/savings
GET    /api/v1/savings/:id
PUT    /api/v1/savings/:id
DELETE /api/v1/savings/:id
POST   /api/v1/savings/:id/deposit
```

### Loans Endpoints
```
GET    /api/v1/loans
POST   /api/v1/loans/apply
GET    /api/v1/loans/:id
GET    /api/v1/loans/:id/repayment-schedule
POST   /api/v1/loans/:id/repay
```

### Tax Endpoints
```
GET    /api/v1/tax/records
POST   /api/v1/tax/records
GET    /api/v1/tax/records/:id
GET    /api/v1/tax/calculate
POST   /api/v1/tax/file
```

### Payment Endpoints (Razorpay Integration)
```
POST   /api/v1/payments/create-order
POST   /api/v1/payments/verify
POST   /api/v1/payments/webhook
POST   /api/v1/payments/create-qr
POST   /api/v1/payments/payout
GET    /api/v1/payments/status/:id
```

---

## Local Development Setup

### Prerequisites
- Docker & Docker Compose
- Git
- Node.js 20+ (for local development without Docker)

### Step 1: Clone Repositories
```bash
# Create workspace directory
mkdir drivopay && cd drivopay

# Clone repositories
git clone https://github.com/drivopay/drivopay-landing.git
git clone https://github.com/drivopay/drivopay-webapp.git
git clone https://github.com/drivopay/drivopay-backend.git
git clone https://github.com/drivopay/drivopay-app.git
```

### Step 2: Setup Environment Variables
```bash
# Copy .env.example to .env in each repository
cd drivopay-backend && cp .env.example .env
cd ../drivopay-webapp && cp .env.example .env
cd ../drivopay-landing && cp .env.example .env
```

### Step 3: Start Services with Docker Compose
```bash
# From the root drivopay directory
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Step 4: Access Services
- Landing Page: http://localhost:3000
- Web App: http://localhost:3001
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/api/docs
- pgAdmin: http://localhost:5050
- Redis Commander: http://localhost:8081

### Step 5: Database Migrations
```bash
# Run migrations
docker-compose exec backend npm run migrate

# Seed database
docker-compose exec backend npm run seed

# Rollback
docker-compose exec backend npm run migrate:rollback
```

---

## GCP Deployment Architecture

### Infrastructure Components

1. **Cloud Run** - For containerized services
   - drivopay-landing (Landing page)
   - drivopay-webapp (Dashboard)
   - drivopay-backend (API)

2. **Cloud SQL** - PostgreSQL database
   - Automated backups
   - High availability
   - Private IP for security

3. **Cloud Memorystore** - Redis cache
   - In-memory caching
   - Session storage

4. **Cloud Storage** - File uploads
   - User documents
   - Receipts
   - Profile images

5. **Cloud Load Balancing** - Traffic distribution
   - SSL/TLS termination
   - Global load balancing

6. **Cloud CDN** - Static asset delivery
   - Landing page assets
   - Web app assets

7. **Cloud Build** - CI/CD pipeline
   - Automated builds
   - Docker image creation
   - Deployment automation

8. **Secret Manager** - Secure secrets
   - API keys
   - Database credentials
   - JWT secrets

### Deployment Commands

```bash
# Build and push Docker images
gcloud builds submit --tag gcr.io/[PROJECT_ID]/drivopay-backend
gcloud builds submit --tag gcr.io/[PROJECT_ID]/drivopay-webapp
gcloud builds submit --tag gcr.io/[PROJECT_ID]/drivopay-landing

# Deploy to Cloud Run
gcloud run deploy drivopay-backend \
  --image gcr.io/[PROJECT_ID]/drivopay-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated

gcloud run deploy drivopay-webapp \
  --image gcr.io/[PROJECT_ID]/drivopay-webapp \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated

gcloud run deploy drivopay-landing \
  --image gcr.io/[PROJECT_ID]/drivopay-landing \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

---

## Migration Plan

### Phase 1: Repository Setup (Week 1)
1. Create new repositories
   - drivopay-webapp
   - drivopay-backend
2. Setup repository structure
3. Add Docker configurations
4. Setup CI/CD pipelines

### Phase 2: Code Migration (Week 2-3)
1. Move dashboard code to drivopay-webapp
2. Extract API routes to drivopay-backend
3. Refactor authentication
4. Update imports and configurations

### Phase 3: Database Setup (Week 3)
1. Design and create database schema
2. Setup migrations
3. Create seeders for test data
4. Setup Redis cache

### Phase 4: Local Testing (Week 4)
1. Test with Docker Compose
2. Verify all services communication
3. Fix bugs and issues
4. Performance testing

### Phase 5: GCP Deployment (Week 5)
1. Setup GCP infrastructure
2. Deploy services to Cloud Run
3. Configure Cloud SQL and Memorystore
4. Setup monitoring and logging

### Phase 6: Go Live (Week 6)
1. Update DNS records
2. SSL/TLS configuration
3. Final testing
4. Monitor and optimize

---

## Additional Considerations

### Security
- Implement rate limiting
- Use CORS properly
- Validate all inputs
- Encrypt sensitive data
- Use HTTPS everywhere
- Implement proper authentication
- Regular security audits

### Monitoring & Logging
- Use Cloud Logging
- Setup alerts for errors
- Monitor performance metrics
- Track API usage
- User analytics

### Backup & Recovery
- Automated database backups
- Point-in-time recovery
- Disaster recovery plan
- Data retention policies

### Scaling
- Horizontal scaling with Cloud Run
- Database read replicas
- Cache optimization
- CDN for static assets

---

## Cost Estimation (GCP)

### Monthly Costs (Approximate)
- Cloud Run: $20-50
- Cloud SQL (PostgreSQL): $25-100
- Cloud Memorystore (Redis): $40-80
- Cloud Storage: $5-20
- Cloud Load Balancer: $20-40
- Cloud CDN: $10-30
- Cloud Build: $5-15
- **Total: $125-335/month** (varies with traffic)

---

## Support & Documentation

- Backend API Docs: OpenAPI/Swagger at `/api/docs`
- Webapp Docs: README in repo
- Database Docs: Schema documentation
- Deployment Guide: DEPLOYMENT.md in each repo

---

**Generated by:** DrivoPay Architecture Team
**Last Updated:** 2026-02-09
**Version:** 1.0
