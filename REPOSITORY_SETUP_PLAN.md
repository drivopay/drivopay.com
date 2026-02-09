# DrivoPay Repository Setup Plan

## Repositories You Need to Create NOW

Based on the microservices architecture, here are the repositories you need:

---

## 📦 Repository List

### 1. **drivopay-landing** ⭐ (Current Repo - Cleanup)
- **Purpose:** Public marketing website
- **Tech:** Next.js 15, React 19, Tailwind CSS
- **URL:** https://drivopay.com
- **Status:** ✅ Already exists (this repo - needs cleanup)
- **Action:** Remove dashboard and API code, keep only landing page

### 2. **drivopay-backend** 🔥 (CREATE FIRST)
- **Purpose:** Core backend API services
- **Tech:** Go (Golang) + Gin framework
- **URL:** https://api.drivopay.com
- **Status:** ❌ Need to create
- **Priority:** HIGH - Create this first

### 3. **drivopay-webapp** 💼 (CREATE SECOND)
- **Purpose:** Driver dashboard web application
- **Tech:** Next.js 15, React 19, Shadcn UI
- **URL:** https://app.drivopay.com
- **Status:** ❌ Need to create
- **Priority:** HIGH - Create after backend

### 4. **drivopay-app** 📱 (Already Exists)
- **Purpose:** Mobile application
- **Tech:** React Native / Flutter
- **Status:** ✅ You mentioned this already exists
- **Action:** No action needed now

### 5. **drivopay-ml-service** 🤖 (CREATE LATER)
- **Purpose:** AI/ML services (fraud detection, credit scoring)
- **Tech:** Python (FastAPI) + scikit-learn
- **Status:** ❌ Optional - can add later
- **Priority:** LOW - Add when you need ML features

### 6. **drivopay-infrastructure** ⚙️ (CREATE LATER)
- **Purpose:** Infrastructure as Code (Terraform, K8s configs)
- **Tech:** Terraform, Docker Compose, Kubernetes manifests
- **Status:** ❌ Optional - for production deployment
- **Priority:** MEDIUM - Add when deploying to GCP

---

## 🎯 Creation Order (Step by Step)

### Phase 1: Core Repositories (THIS WEEK)

```
Week 1:
1. ✅ drivopay-landing (cleanup current repo)
2. 🔥 drivopay-backend (create new)
3. 💼 drivopay-webapp (create new)
```

### Phase 2: Advanced Services (LATER)

```
Week 2-3:
4. 🤖 drivopay-ml-service (optional)
5. ⚙️ drivopay-infrastructure (when deploying)
```

---

## 📋 Detailed Setup Instructions

### Step 1: Cleanup Current Repo (drivopay-landing)

**Current branch:** `architecture/microservices-split`

**Actions:**
```bash
# You're already on the branch
git checkout architecture/microservices-split

# Remove webapp and API code
git rm -r app/dashboard
git rm -r app/api

# Commit changes
git commit -m "refactor: Remove webapp and API code, keep only landing page"

# Merge to main
git checkout main
git merge architecture/microservices-split
git push origin main
```

**What to keep:**
- ✅ `app/page.tsx` (landing page)
- ✅ `app/layout.tsx`
- ✅ `app/globals.css`
- ✅ `components/` (landing page components only)
- ✅ `public/`
- ✅ All documentation files we created

**What to remove:**
- ❌ `app/dashboard/*`
- ❌ `app/api/*`
- ❌ Dashboard-specific components
- ❌ `contexts/` (move to webapp)

---

### Step 2: Create drivopay-backend 🔥

**On GitHub:**
1. Go to https://github.com/drivopay (or your organization)
2. Click "New repository"
3. Repository name: `drivopay-backend`
4. Description: `DrivoPay Backend API - Go microservices for payment processing`
5. Visibility: Private (recommended for backend)
6. ❌ Don't initialize with README (we'll create it)
7. Click "Create repository"

**On Your Machine:**
```bash
# Navigate to your workspace
cd ~/Documents/repos/new
# or wherever you want to keep all DrivoPay repos

# Create directory
mkdir drivopay-backend
cd drivopay-backend

# Initialize Go module
go mod init github.com/drivopay/drivopay-backend

# Create directory structure
mkdir -p cmd/api
mkdir -p internal/{api/{handlers,middlewares,routes,validators},services,models,repository,database,cache,config,utils}
mkdir -p pkg/{errors,constants}
mkdir -p scripts
mkdir -p tests/{unit,integration,e2e}
mkdir -p migrations
mkdir -p docs

# Create main.go
touch cmd/api/main.go

# Create config files
touch .env.example
touch .gitignore
touch README.md
touch Dockerfile
touch docker-compose.yml
touch Makefile

# Initialize git
git init
git remote add origin https://github.com/drivopay/drivopay-backend.git

# Create .gitignore
cat > .gitignore << 'EOF'
# Binaries
bin/
*.exe
*.exe~
*.dll
*.so
*.dylib

# Test binary, built with `go test -c`
*.test

# Output of the go coverage tool
*.out
coverage.html

# Dependency directories
vendor/

# Go workspace file
go.work

# Environment files
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
*.log
logs/
EOF

# Initial commit
git add .
git commit -m "feat: Initial Go backend structure"
git branch -M main
git push -u origin main
```

**Next Steps for Backend:**
- Follow `GOLANG_BACKEND_SETUP.md` to implement core files
- Copy code examples from the documentation
- Install dependencies: `go mod tidy`

---

### Step 3: Create drivopay-webapp 💼

**On GitHub:**
1. Go to https://github.com/drivopay
2. Click "New repository"
3. Repository name: `drivopay-webapp`
4. Description: `DrivoPay Web Dashboard - Driver financial management platform`
5. Visibility: Private
6. ❌ Don't initialize with README
7. Click "Create repository"

**On Your Machine:**
```bash
# Navigate to workspace
cd ~/Documents/repos/new

# Create Next.js app
npx create-next-app@latest drivopay-webapp
# Choose:
# ✅ TypeScript: Yes
# ✅ ESLint: Yes
# ✅ Tailwind CSS: Yes
# ✅ src/ directory: No
# ✅ App Router: Yes
# ✅ Import alias: Yes (@/*)

cd drivopay-webapp

# Set remote
git remote add origin https://github.com/drivopay/drivopay-webapp.git

# Copy dashboard code from old repo
cd ../drivopay.com
cp -r app/dashboard ../drivopay-webapp/app/
cp -r components/dashboard ../drivopay-webapp/components/
cp -r contexts ../drivopay-webapp/
cp -r hooks ../drivopay-webapp/
cp -r lib ../drivopay-webapp/

# Go back to webapp
cd ../drivopay-webapp

# Create .env.example
cat > .env.example << 'EOF'
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws

# Auth
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-nextauth-secret-here

# Feature Flags
NEXT_PUBLIC_ENABLE_SAVINGS=true
NEXT_PUBLIC_ENABLE_LOANS=true
NEXT_PUBLIC_ENABLE_TAX=true
EOF

# Update package.json scripts to use port 3001
# (Landing page uses 3000, webapp uses 3001)
cat > package.json << 'EOF'
{
  "name": "drivopay-webapp",
  "version": "1.0.0",
  "private": true,
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
    "@radix-ui/react-accordion": "^1.2.2",
    "@radix-ui/react-dialog": "^1.1.4",
    "@radix-ui/react-dropdown-menu": "^2.1.4",
    "@radix-ui/react-label": "^2.1.1",
    "@radix-ui/react-select": "^2.1.4",
    "@radix-ui/react-toast": "^1.2.4",
    "axios": "^1.6.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "framer-motion": "^11.15.0",
    "lucide-react": "^0.468.0",
    "next-themes": "^0.4.4",
    "recharts": "^2.15.0",
    "tailwind-merge": "^2.5.5",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "autoprefixer": "^10.4.23",
    "eslint": "^9",
    "eslint-config-next": "15.1.4",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
EOF

# Install dependencies
npm install

# Create README
cat > README.md << 'EOF'
# DrivoPay Web Dashboard

Driver financial management platform - Web application

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Shadcn UI

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Run development server
npm run dev
```

Open http://localhost:3001

## Environment Variables

See `.env.example` for required environment variables.

## API Integration

This app connects to `drivopay-backend` API at the URL specified in `NEXT_PUBLIC_API_BASE_URL`.
EOF

# Commit and push
git add .
git commit -m "feat: Initial webapp setup with Next.js and dashboard components"
git push -u origin main
```

---

### Step 4: Create drivopay-ml-service (OPTIONAL - Later)

**Only create this when you need ML features (fraud detection, etc.)**

```bash
cd ~/Documents/repos/new
mkdir drivopay-ml-service
cd drivopay-ml-service

# Create Python virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Create requirements.txt
cat > requirements.txt << 'EOF'
fastapi==0.109.0
uvicorn[standard]==0.27.0
scikit-learn==1.4.0
pandas==2.2.0
numpy==1.26.3
pydantic==2.5.3
python-multipart==0.0.6
redis==5.0.1
sqlalchemy==2.0.25
psycopg2-binary==2.9.9
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
EOF

# Install dependencies
pip install -r requirements.txt

# Initialize git
git init
git remote add origin https://github.com/drivopay/drivopay-ml-service.git
```

---

## 🗂️ Final Repository Structure

After creating all repositories, your workspace will look like:

```
~/Documents/repos/new/  (or your workspace)
├── drivopay-landing/          # Landing page (current repo)
├── drivopay-backend/          # Go API backend
├── drivopay-webapp/           # Next.js dashboard
├── drivopay-app/              # Mobile app (already exists)
├── drivopay-ml-service/       # Python ML services (optional)
└── drivopay-infrastructure/   # Terraform, K8s (optional)
```

---

## 🐳 Docker Compose for Local Development

Create a `docker-compose.yml` in your workspace root (not in any repo):

```bash
cd ~/Documents/repos/new
touch docker-compose.yml
```

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
      DATABASE_URL: postgresql://drivopay:password@postgres:5432/drivopay_db
      REDIS_URL: redis://redis:6379
      PORT: 8000
    ports:
      - "8000:8000"
    volumes:
      - ./drivopay-backend:/app
    networks:
      - drivopay-network
    depends_on:
      - postgres
      - redis

  webapp:
    build:
      context: ./drivopay-webapp
      dockerfile: Dockerfile
    container_name: drivopay-webapp
    environment:
      NEXT_PUBLIC_API_BASE_URL: http://localhost:8000/api/v1
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

---

## ✅ Quick Start Checklist

### This Week (Core Setup):

- [ ] **Day 1:** Cleanup drivopay-landing repo
  - [ ] Remove `app/dashboard/*`
  - [ ] Remove `app/api/*`
  - [ ] Keep only landing page code
  - [ ] Commit and push to main

- [ ] **Day 2:** Create drivopay-backend
  - [ ] Create GitHub repo
  - [ ] Initialize Go project
  - [ ] Create directory structure
  - [ ] Follow GOLANG_BACKEND_SETUP.md
  - [ ] Implement basic health check endpoint
  - [ ] Test with `go run cmd/api/main.go`

- [ ] **Day 3:** Create drivopay-webapp
  - [ ] Create GitHub repo
  - [ ] Initialize Next.js project
  - [ ] Copy dashboard code from old repo
  - [ ] Setup API client for backend
  - [ ] Test with `npm run dev`

- [ ] **Day 4-5:** Connect webapp to backend
  - [ ] Implement authentication flow
  - [ ] Test login/register
  - [ ] Verify API communication

- [ ] **Day 6-7:** Docker Compose setup
  - [ ] Create docker-compose.yml
  - [ ] Add Dockerfiles to each repo
  - [ ] Test full stack with `docker-compose up`

### Next Week (Database & Features):

- [ ] Setup PostgreSQL database schema
- [ ] Implement wallet service
- [ ] Implement transactions API
- [ ] Connect Razorpay integration
- [ ] Add authentication to webapp

---

## 🎯 Immediate Next Steps (RIGHT NOW)

### Step 1: Create GitHub Repositories
Go to https://github.com/drivopay and create:

1. **drivopay-backend** (Private)
2. **drivopay-webapp** (Private)

### Step 2: Initialize Backend
```bash
cd ~/Documents/repos/new
mkdir drivopay-backend
cd drivopay-backend
go mod init github.com/drivopay/drivopay-backend

# Copy the structure from GOLANG_BACKEND_SETUP.md
```

### Step 3: Initialize Webapp
```bash
cd ~/Documents/repos/new
npx create-next-app@latest drivopay-webapp

# Follow the prompts as shown above
```

---

## 📚 Documentation Reference

For each repository, refer to these docs:

| Repository | Documentation |
|------------|---------------|
| drivopay-landing | `MIGRATION_GUIDE.md` - Step 1 |
| drivopay-backend | `GOLANG_BACKEND_SETUP.md` |
| drivopay-webapp | `MIGRATION_GUIDE.md` - Step 3 |
| All repos | `MICROSERVICES_ARCHITECTURE.md` |

---

## 🆘 Need Help?

If you get stuck:
1. Check the documentation files in this repo
2. Review `MIGRATION_GUIDE.md` for step-by-step instructions
3. Review `GOLANG_BACKEND_SETUP.md` for backend implementation
4. Check `PYTHON_VS_GO_COMPARISON.md` if reconsidering tech stack

---

**Created:** 2026-02-09
**Status:** Ready to execute
**Next Action:** Create GitHub repositories for backend and webapp
