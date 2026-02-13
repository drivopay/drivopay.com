# EstoSpaces - Quick Start Guide

**Last Updated:** February 10, 2026

---

## 📦 Step 1: Clone All Repositories

All repositories will be cloned to: `/Users/puvendhan/Documents/repos/new/`

```bash
# Navigate to the current directory
cd /Users/puvendhan/Documents/repos/new/estospaces-app

# Run the clone script
./clone-all-repos.sh
```

**What this does:**
- Clones all 13 repositories into `/Users/puvendhan/Documents/repos/new/`
- Creates the following structure:

```
/Users/puvendhan/Documents/repos/new/
├── estospaces-app/                    ← You are here
├── estospaces-shared/                 ← NEW
├── estospaces-infrastructure/         ← NEW
├── estospaces-web/                    ← NEW
├── estospaces-mobile/                 ← NEW
├── estospaces-auth-service/           ← NEW
├── estospaces-user-service/           ← NEW
├── estospaces-property-service/       ← NEW
├── estospaces-booking-service/        ← NEW
├── estospaces-payment-service/        ← NEW
├── estospaces-notification-service/   ← NEW
├── estospaces-media-service/          ← NEW
├── estospaces-messaging-service/      ← NEW
└── estospaces-search-service/         ← NEW
```

---

## 🔧 Step 2: Initialize Backend Services

Each backend service needs to be initialized with Go modules:

```bash
# Navigate to base directory
cd /Users/puvendhan/Documents/repos/new

# Initialize auth-service
cd estospaces-auth-service
go mod init github.com/Estospaces-Development/estospaces-auth-service
mkdir -p cmd/server internal/auth/{handlers,services,repository,models} internal/shared/{database,config,middleware}
cd ..

# Initialize user-service
cd estospaces-user-service
go mod init github.com/Estospaces-Development/estospaces-user-service
mkdir -p cmd/server internal/users/{handlers,services,repository,models} internal/shared/{database,config,middleware}
cd ..

# Initialize property-service
cd estospaces-property-service
go mod init github.com/Estospaces-Development/estospaces-property-service
mkdir -p cmd/server internal/properties/{handlers,services,repository,models} internal/shared/{database,config,middleware}
cd ..

# Repeat for other services...
```

**Or use this automated script:**

```bash
#!/bin/bash
cd /Users/puvendhan/Documents/repos/new

# Array of services
services=(
  "auth-service"
  "user-service"
  "property-service"
  "booking-service"
  "payment-service"
  "notification-service"
  "media-service"
  "messaging-service"
  "search-service"
)

# Initialize each service
for service in "${services[@]}"; do
  echo "Initializing estospaces-$service..."
  cd "estospaces-$service"

  # Initialize Go module
  go mod init "github.com/Estospaces-Development/estospaces-$service"

  # Create directory structure
  mkdir -p cmd/server
  mkdir -p internal/shared/{database,config,middleware}
  mkdir -p api
  mkdir -p migrations
  mkdir -p tests/{unit,integration}
  mkdir -p deployments/{docker,kubernetes}
  mkdir -p scripts

  # Create basic main.go
  cat > cmd/server/main.go << 'EOF'
package main

import (
	"log"
	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	app.Get("/health", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"status": "ok",
			"service": "SERVICE_NAME",
		})
	})

	log.Fatal(app.Listen(":8080"))
}
EOF

  cd ..
done

echo "✅ All services initialized!"
```

---

## 🏗️ Step 3: Set Up Infrastructure Repository

```bash
cd /Users/puvendhan/Documents/repos/new/estospaces-infrastructure

# Create directory structure
mkdir -p terraform/environments/{development,staging,production}
mkdir -p terraform/modules/{gke-cluster,cloud-sql,redis,gcs-buckets,networking,iam}
mkdir -p kubernetes/base
mkdir -p kubernetes/apps/{web,auth,user,property,booking,payment,notification,media,messaging,search}
mkdir -p kubernetes/cloudsql-proxies
mkdir -p kubernetes/monitoring/{prometheus,grafana,alertmanager}
mkdir -p kubernetes/overlays/{development,staging,production}
mkdir -p scripts/{setup,deploy,backup}
mkdir -p docs
```

---

## 🌐 Step 4: Set Up Frontend

### Web (Next.js)

```bash
cd /Users/puvendhan/Documents/repos/new/estospaces-web

# If starting fresh:
npx create-next-app@latest . --typescript --tailwind --app --use-pnpm

# Install dependencies
pnpm add axios zustand @tanstack/react-query
pnpm add -D @types/node
```

### Mobile (React Native)

```bash
cd /Users/puvendhan/Documents/repos/new/estospaces-mobile

# If starting fresh:
npx create-expo-app . --template blank-typescript
```

---

## 📊 Step 5: View Documentation

```bash
# Repository guide
cat /Users/puvendhan/Documents/repos/new/estospaces-app/REPOSITORIES.md

# Service ports reference
cat /Users/puvendhan/Documents/repos/new/estospaces-app/SERVICE_PORTS.md

# This quick start
cat /Users/puvendhan/Documents/repos/new/estospaces-app/QUICK_START.md
```

---

## 🐳 Step 6: Create Dockerfiles

Each backend service needs a Dockerfile:

```bash
cd /Users/puvendhan/Documents/repos/new/estospaces-auth-service

# Create Dockerfile
cat > Dockerfile << 'EOF'
# Build stage
FROM golang:1.23-alpine AS builder

WORKDIR /app

# Copy go mod files
COPY go.mod go.sum ./
RUN go mod download

# Copy source
COPY . .

# Build
RUN CGO_ENABLED=0 GOOS=linux go build -o server ./cmd/server

# Runtime stage
FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /root/

COPY --from=builder /app/server .

EXPOSE 8080

CMD ["./server"]
EOF
```

---

## 🚀 Step 7: Test Locally

```bash
# Terminal 1: Start auth-service
cd /Users/puvendhan/Documents/repos/new/estospaces-auth-service
go run cmd/server/main.go

# Terminal 2: Test
curl http://localhost:8080/health
```

---

## ☁️ Step 8: Deploy to GKE

```bash
# 1. Create GKE cluster
gcloud container clusters create estospaces-cluster \
  --region=europe-west2 \
  --num-nodes=3 \
  --machine-type=e2-standard-4

# 2. Get credentials
gcloud container clusters get-credentials estospaces-cluster --region=europe-west2

# 3. Deploy services
cd /Users/puvendhan/Documents/repos/new/estospaces-infrastructure
kubectl apply -f kubernetes/
```

---

## 📋 Useful Commands

```bash
# List all cloned repos
ls -la /Users/puvendhan/Documents/repos/new/

# Check git status of all repos
cd /Users/puvendhan/Documents/repos/new
for dir in estospaces-*/; do
  echo "=== $dir ==="
  cd "$dir"
  git status -s
  cd ..
done

# Pull latest changes from all repos
for dir in estospaces-*/; do
  echo "Updating $dir..."
  cd "$dir"
  git pull
  cd ..
done
```

---

## 🔗 Quick Links

- **GitHub Organization:** https://github.com/Estospaces-Development
- **Current Directory:** `/Users/puvendhan/Documents/repos/new/estospaces-app`
- **All Repos:** `/Users/puvendhan/Documents/repos/new/`

---

## 🆘 Troubleshooting

**Problem: Clone script fails with "Permission denied"**
```bash
chmod +x /Users/puvendhan/Documents/repos/new/estospaces-app/clone-all-repos.sh
```

**Problem: Git authentication fails**
```bash
# Use SSH (recommended)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set up SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"
cat ~/.ssh/id_ed25519.pub
# Add to GitHub: https://github.com/settings/keys
```

**Problem: Repository already exists**
```bash
# The script will skip existing repositories automatically
# To re-clone:
cd /Users/puvendhan/Documents/repos/new
rm -rf estospaces-auth-service
./estospaces-app/clone-all-repos.sh
```

---

**Need Help?**
- Review: `REPOSITORIES.md` for complete architecture
- Review: `SERVICE_PORTS.md` for API endpoints
- Check GitHub: https://github.com/Estospaces-Development

---

**Last Updated:** February 10, 2026
