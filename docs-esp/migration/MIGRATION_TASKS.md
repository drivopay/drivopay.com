# EstoSpaces - Migration Tasks (Monolith → Microservices)

**Source:** `/Users/puvendhan/Documents/repos/new/estospaces-app/` (Monolithic App)
**Target:** 13 separate repositories (Microservices)
**Last Updated:** February 10, 2026

---

## 📋 Table of Contents

1. [Pre-Migration Analysis](#pre-migration-analysis)
2. [Phase 1: Infrastructure Setup](#phase-1-infrastructure-setup)
3. [Phase 2: Extract Auth & User Services](#phase-2-extract-auth--user-services)
4. [Phase 3: Extract Property Service](#phase-3-extract-property-service)
5. [Phase 4: Extract Booking & Payment Services](#phase-4-extract-booking--payment-services)
6. [Phase 5: Extract Platform Services](#phase-5-extract-platform-services)
7. [Phase 6: Migrate Frontend](#phase-6-migrate-frontend)
8. [Phase 7: Testing & Validation](#phase-7-testing--validation)
9. [Phase 8: Production Deployment](#phase-8-production-deployment)
10. [Phase 9: Decommission Monolith](#phase-9-decommission-monolith)

---

## Pre-Migration Analysis

### Current Monolith Structure Analysis

**Source Location:** `/Users/puvendhan/Documents/repos/new/estospaces-app/`

#### Frontend Structure (React)
```
src/
├── contexts/                    → Extract auth context
│   ├── AuthContext.tsx         → Move to auth-service integration
│   ├── PropertyContext.tsx     → Move to property-service integration
│   ├── LeadContext.tsx         → Move to booking-service integration
│   └── ThemeContext.tsx        → Keep in web
├── components/
│   ├── admin/                  → Move to estospaces-web (admin dashboard)
│   ├── manager/                → Move to estospaces-web (manager dashboard)
│   ├── user/                   → Move to estospaces-web (user dashboard)
│   └── shared/                 → Move to estospaces-shared
├── services/
│   ├── supabase.ts            → Replace with API clients
│   └── api.ts                 → Extract to service-specific clients
└── pages/
    ├── admin/                  → Move to estospaces-web
    ├── manager/                → Move to estospaces-web
    └── user/                   → Move to estospaces-web
```

#### Backend Structure (Supabase)
```
Current (Supabase):
- Database tables              → Map to separate Cloud SQL databases
- Auth (Supabase Auth)        → Extract to auth-service
- Storage (Supabase Storage)  → Extract to media-service
- Realtime                    → Extract to messaging-service
```

### Tasks Checklist

- [ ] Document all current API endpoints
- [ ] Document all database tables and relationships
- [ ] List all Supabase features used
- [ ] Identify shared components
- [ ] Map current features to target services
- [ ] Create migration timeline

---

## Phase 1: Infrastructure Setup

**Duration:** 2 weeks
**Goal:** Set up all 13 repositories and infrastructure

### 1.1 Repository Setup

- [x] Create 7 new microservice repositories (DONE)
- [ ] Clone all 13 repositories to local
  ```bash
  cd /Users/puvendhan/Documents/repos/new/estospaces-app
  ./clone-all-repos.sh
  ```
- [ ] Initialize Go modules in each service
- [ ] Set up Git workflows (.github/workflows/)
- [ ] Configure branch protection rules

### 1.2 Shared Repository Setup

- [ ] **estospaces-shared** repository
  - [ ] Create packages/ directory structure
  - [ ] Extract shared types from monolith
    - [ ] User types
    - [ ] Property types
    - [ ] Booking types
    - [ ] Payment types
  - [ ] Create shared UI components
  - [ ] Set up Turborepo/pnpm workspaces
  - [ ] Publish shared types as npm package (private)

### 1.3 Infrastructure Repository Setup

- [ ] **estospaces-infrastructure** repository
  - [ ] Create Terraform modules
    - [ ] GKE cluster configuration
    - [ ] Cloud SQL instances (9 databases)
    - [ ] Redis instance
    - [ ] VPC networking
    - [ ] IAM roles and service accounts
  - [ ] Create Kubernetes manifests
    - [ ] Namespace: production
    - [ ] ConfigMaps for each service
    - [ ] Secrets (database, API keys)
    - [ ] Service accounts with Workload Identity
  - [ ] Create deployment scripts

### 1.4 GCP Infrastructure

- [ ] Create GCP project (if not exists)
- [ ] Enable required APIs
  - [ ] Kubernetes Engine API
  - [ ] Cloud SQL Admin API
  - [ ] Cloud Storage API
  - [ ] Container Registry API
- [ ] Create GKE cluster
  ```bash
  gcloud container clusters create estospaces-cluster \
    --region=europe-west2 \
    --num-nodes=3 \
    --machine-type=e2-standard-4 \
    --enable-autoscaling \
    --min-nodes=3 \
    --max-nodes=10
  ```
- [ ] Create 9 Cloud SQL PostgreSQL instances
  - [ ] estospaces-auth-db
  - [ ] estospaces-users-db
  - [ ] estospaces-properties-db
  - [ ] estospaces-bookings-db
  - [ ] estospaces-payments-db
  - [ ] estospaces-notifications-db
  - [ ] estospaces-media-db
  - [ ] estospaces-messaging-db
  - [ ] estospaces-search-db
- [ ] Create Redis instance
- [ ] Create GCS buckets for media storage
- [ ] Set up Cloud SQL Proxy service accounts

---

## Phase 2: Extract Auth & User Services

**Duration:** 3 weeks
**Priority:** HIGH (Foundation for all other services)

### 2.1 Auth Service Migration

**Target:** `estospaces-auth-service`

#### 2.1.1 Analyze Current Auth (Supabase Auth)

- [ ] Document all auth flows in monolith
  - [ ] Registration
  - [ ] Login (email/password)
  - [ ] OAuth providers (if any)
  - [ ] Password reset
  - [ ] Email verification
  - [ ] Session management

#### 2.1.2 Create Auth Service Structure

- [ ] Initialize Go project
  ```bash
  cd /Users/puvendhan/Documents/repos/new/estospaces-auth-service
  go mod init github.com/Estospaces-Development/estospaces-auth-service
  ```
- [ ] Create directory structure
  ```
  estospaces-auth-service/
  ├── cmd/server/main.go
  ├── internal/
  │   ├── auth/
  │   │   ├── handlers/
  │   │   │   ├── register.go
  │   │   │   ├── login.go
  │   │   │   ├── refresh.go
  │   │   │   └── validate.go
  │   │   ├── services/
  │   │   │   └── auth_service.go
  │   │   ├── repository/
  │   │   │   └── user_repository.go
  │   │   └── models/
  │   │       └── user.go
  │   ├── jwt/
  │   │   └── jwt.go
  │   └── shared/
  │       ├── database/
  │       ├── config/
  │       └── middleware/
  ├── migrations/
  └── deployments/
  ```

#### 2.1.3 Implement Auth Service

- [ ] Install dependencies
  ```bash
  go get github.com/gofiber/fiber/v2
  go get gorm.io/gorm
  go get gorm.io/driver/postgres
  go get github.com/golang-jwt/jwt/v5
  go get golang.org/x/crypto/bcrypt
  ```
- [ ] Implement database models
  - [ ] Users table
  - [ ] Sessions table
  - [ ] Refresh tokens table
  - [ ] Email verifications table
  - [ ] Password resets table
- [ ] Create database migrations
- [ ] Implement JWT token generation
- [ ] Implement JWT token validation
- [ ] Implement password hashing (bcrypt)
- [ ] Create API endpoints
  ```go
  POST   /api/v1/auth/register
  POST   /api/v1/auth/login
  POST   /api/v1/auth/logout
  POST   /api/v1/auth/refresh
  GET    /api/v1/auth/me
  POST   /api/v1/auth/verify-email
  POST   /api/v1/auth/forgot-password
  POST   /api/v1/auth/reset-password
  POST   /api/v1/auth/validate-token (internal)
  GET    /health
  GET    /metrics
  ```
- [ ] Add CORS middleware
- [ ] Add rate limiting
- [ ] Add logging
- [ ] Write unit tests

#### 2.1.4 Migrate Auth Data from Supabase

- [ ] Export user data from Supabase
  ```sql
  -- Export users from Supabase
  SELECT * FROM auth.users;
  ```
- [ ] Create data migration script
- [ ] Import users to auth-service database
- [ ] **IMPORTANT:** Inform users to reset passwords (cannot migrate hashed passwords between systems)
- [ ] Verify data migration

#### 2.1.5 Deploy Auth Service

- [ ] Create Dockerfile
- [ ] Build and push Docker image
  ```bash
  docker build -t gcr.io/PROJECT_ID/estospaces-auth-service:v1.0.0 .
  docker push gcr.io/PROJECT_ID/estospaces-auth-service:v1.0.0
  ```
- [ ] Create Kubernetes manifests
  - [ ] Deployment (2 replicas)
  - [ ] Service (ClusterIP)
  - [ ] HPA (Horizontal Pod Autoscaler)
  - [ ] Cloud SQL Proxy deployment
- [ ] Deploy to GKE dev environment
- [ ] Test all auth endpoints
- [ ] Monitor logs and metrics

### 2.2 User Service Migration

**Target:** `estospaces-user-service`

#### 2.2.1 Analyze Current User Features

- [ ] Document user profile features
  - [ ] Profile CRUD
  - [ ] Profile picture upload
  - [ ] User preferences
  - [ ] User verification (KYC)
  - [ ] User roles (user, agent, admin)

#### 2.2.2 Extract User Code from Monolith

**Source:** `estospaces-app/src/contexts/AuthContext.tsx`
**Source:** `estospaces-app/src/components/*/Profile*.tsx`

- [ ] Identify all user-related components
  ```
  src/components/manager/Profile.tsx
  src/components/user/UserProfile.tsx
  src/components/admin/UserManagement.tsx
  ```
- [ ] Identify user-related API calls
- [ ] Document user database schema

#### 2.2.3 Create User Service

- [ ] Initialize Go project
- [ ] Create directory structure
- [ ] Implement database models
  - [ ] User profiles table
  - [ ] User preferences table
  - [ ] User verifications table
  - [ ] User addresses table
  - [ ] User documents table
- [ ] Create API endpoints
  ```go
  GET    /api/v1/users           (admin only)
  GET    /api/v1/users/:id
  PUT    /api/v1/users/:id
  DELETE /api/v1/users/:id
  GET    /api/v1/users/profile   (current user)
  PUT    /api/v1/users/profile
  POST   /api/v1/users/verify
  GET    /health
  ```
- [ ] Integrate with auth-service (JWT validation)
- [ ] Write unit tests

#### 2.2.4 Migrate User Data

- [ ] Export user profile data from Supabase
- [ ] Import to user-service database
- [ ] Verify data integrity

#### 2.2.5 Deploy User Service

- [ ] Create Dockerfile
- [ ] Build and push image
- [ ] Create Kubernetes manifests
- [ ] Deploy to GKE
- [ ] Test endpoints

---

## Phase 3: Extract Property Service

**Duration:** 2 weeks
**Priority:** HIGH

### 3.1 Analyze Current Property Features

**Source:** `estospaces-app/src/contexts/PropertyContext.tsx`
**Source:** `estospaces-app/src/components/manager/Properties.tsx`
**Source:** `estospaces-app/src/components/user/DiscoverProperties.tsx`

- [ ] Document property features
  - [ ] Property listings (manager)
  - [ ] Property search (user)
  - [ ] Property details
  - [ ] Property images
  - [ ] Property reviews
  - [ ] Property amenities
  - [ ] Geospatial search

### 3.2 Extract Property Code

- [ ] Identify property-related components
  ```
  src/components/manager/Properties.tsx
  src/components/manager/PropertyForm.tsx
  src/components/user/DiscoverProperties.tsx
  src/components/user/PropertyDetails.tsx
  src/components/shared/PropertyCard.tsx
  ```
- [ ] Document property database schema
  ```sql
  -- Current Supabase tables
  properties
  property_images
  property_amenities
  property_reviews
  ```

### 3.3 Create Property Service

**Target:** `estospaces-property-service`

- [ ] Initialize Go project
- [ ] Create directory structure
- [ ] Implement models
  - [ ] Properties table
  - [ ] Property amenities table
  - [ ] Property images table (metadata, actual images in media-service)
  - [ ] Property reviews table
  - [ ] Property locations table (PostGIS extension)
- [ ] Create API endpoints
  ```go
  GET    /api/v1/properties
  POST   /api/v1/properties           (agent only)
  GET    /api/v1/properties/:id
  PUT    /api/v1/properties/:id       (agent only)
  DELETE /api/v1/properties/:id       (agent only)
  GET    /api/v1/properties/search    (with filters)
  GET    /api/v1/properties/nearby    (geospatial)
  POST   /api/v1/properties/:id/reviews
  GET    /api/v1/properties/:id/reviews
  GET    /health
  ```
- [ ] Add full-text search (PostgreSQL)
- [ ] Add Redis caching for popular properties
- [ ] Write unit tests

### 3.4 Migrate Property Data

- [ ] Export properties from Supabase
- [ ] Export property images URLs
- [ ] Import to property-service database
- [ ] Verify data

### 3.5 Deploy Property Service

- [ ] Create Dockerfile
- [ ] Build and push image
- [ ] Create Kubernetes manifests
- [ ] Deploy to GKE
- [ ] Test endpoints
- [ ] Test search functionality

---

## Phase 4: Extract Booking & Payment Services

**Duration:** 3 weeks

### 4.1 Booking Service Migration

**Target:** `estospaces-booking-service`
**Source:** `estospaces-app/src/components/user/Bookings.tsx`
**Source:** `estospaces-app/src/components/manager/Appointments.tsx`

#### Tasks

- [ ] Analyze current booking features
  - [ ] Create booking
  - [ ] View bookings
  - [ ] Schedule viewing
  - [ ] Cancel booking
  - [ ] Availability calendar
- [ ] Extract booking code from monolith
- [ ] Create booking service
  - [ ] Bookings table
  - [ ] Viewings table
  - [ ] Availability calendar table
  - [ ] Booking history table
- [ ] Implement API endpoints
  ```go
  GET    /api/v1/bookings
  POST   /api/v1/bookings
  GET    /api/v1/bookings/:id
  PUT    /api/v1/bookings/:id
  DELETE /api/v1/bookings/:id
  GET    /api/v1/viewings
  POST   /api/v1/viewings
  GET    /api/v1/availability/:property_id
  POST   /api/v1/availability/block
  ```
- [ ] Integrate with property-service (check property exists)
- [ ] Integrate with user-service (get user info)
- [ ] Publish events to NATS
  - [ ] `booking.created`
  - [ ] `booking.cancelled`
  - [ ] `viewing.scheduled`
- [ ] Migrate booking data
- [ ] Deploy to GKE

### 4.2 Payment Service Migration

**Target:** `estospaces-payment-service`
**Source:** `estospaces-app/src/components/manager/Billing.tsx`

#### Tasks

- [ ] Analyze current payment features (if any)
- [ ] Set up Stripe account (if not done)
- [ ] Create payment service
  - [ ] Payments table
  - [ ] Payment intents table
  - [ ] Invoices table
  - [ ] Refunds table
  - [ ] Subscriptions table (if needed)
- [ ] Implement Stripe integration
- [ ] Implement API endpoints
  ```go
  POST   /api/v1/payments                 (create payment intent)
  POST   /api/v1/payments/:id/confirm
  GET    /api/v1/payments/:id
  POST   /api/v1/payments/:id/refund
  GET    /api/v1/invoices
  GET    /api/v1/invoices/:id
  POST   /api/v1/invoices/:id/send
  POST   /api/v1/webhooks/stripe          (Stripe webhook)
  ```
- [ ] Implement webhook handler for Stripe events
- [ ] Publish events to NATS
  - [ ] `payment.succeeded`
  - [ ] `payment.failed`
- [ ] Deploy to GKE
- [ ] Test payment flow with Stripe test mode

---

## Phase 5: Extract Platform Services

**Duration:** 4 weeks

### 5.1 Notification Service

**Target:** `estospaces-notification-service`
**Source:** `estospaces-app/src/contexts/NotificationsContext.tsx`

#### Tasks

- [ ] Analyze current notification features
- [ ] Set up SendGrid account (email)
- [ ] Set up Twilio account (SMS) - optional
- [ ] Set up Firebase account (push) - optional
- [ ] Create notification service
  - [ ] Notifications table
  - [ ] Notification templates table
  - [ ] Notification preferences table
  - [ ] Notification history table
- [ ] Implement API endpoints
  ```go
  POST   /api/v1/notifications/email
  POST   /api/v1/notifications/sms
  POST   /api/v1/notifications/push
  GET    /api/v1/notifications
  PUT    /api/v1/notifications/:id/read
  GET    /api/v1/notifications/preferences
  PUT    /api/v1/notifications/preferences
  ```
- [ ] Subscribe to NATS events
  - [ ] `booking.created` → Send confirmation email
  - [ ] `payment.succeeded` → Send receipt email
  - [ ] `property.approved` → Send notification to agent
- [ ] Create email templates
- [ ] Deploy to GKE

### 5.2 Media Service

**Target:** `estospaces-media-service`
**Source:** Property image uploads in monolith

#### Tasks

- [ ] Analyze current media features
  - [ ] Property images
  - [ ] User profile pictures
  - [ ] Document uploads (KYC)
- [ ] Create GCS bucket for media storage
- [ ] Create media service
  - [ ] Media files table (metadata)
  - [ ] Media processing queue table
- [ ] Implement API endpoints
  ```go
  POST   /api/v1/media/upload
  GET    /api/v1/media/:id
  DELETE /api/v1/media/:id
  POST   /api/v1/media/bulk-upload
  POST   /api/v1/media/:id/optimize
  ```
- [ ] Implement image optimization (resize, compress)
- [ ] Implement thumbnail generation
- [ ] Migrate existing images from Supabase Storage to GCS
- [ ] Deploy to GKE

### 5.3 Messaging Service

**Target:** `estospaces-messaging-service`
**Source:** `estospaces-app/src/components/manager/Messages.tsx`
**Source:** `estospaces-app/src/components/user/Messages.tsx`

#### Tasks

- [ ] Analyze current messaging features
  - [ ] Real-time chat (if exists)
  - [ ] Message history
  - [ ] Unread counts
- [ ] Create messaging service
  - [ ] Conversations table
  - [ ] Messages table
  - [ ] Message participants table
  - [ ] Message read status table
- [ ] Implement WebSocket support
- [ ] Implement API endpoints
  ```go
  WebSocket /ws/chat
  GET    /api/v1/messages                 (list conversations)
  POST   /api/v1/messages                 (send message)
  GET    /api/v1/messages/:id             (conversation thread)
  DELETE /api/v1/messages/:id
  PUT    /api/v1/messages/:id/read
  ```
- [ ] Migrate message history (if any)
- [ ] Deploy to GKE

### 5.4 Search Service

**Target:** `estospaces-search-service`
**Source:** Property search functionality

#### Tasks

- [ ] Analyze current search features
- [ ] Decide: PostgreSQL full-text OR Elasticsearch
  - [ ] Phase 1: Use PostgreSQL full-text (simpler)
  - [ ] Phase 2: Migrate to Elasticsearch (better performance)
- [ ] Create search service
  - [ ] Search indices table
  - [ ] Search analytics table
  - [ ] Popular searches table
- [ ] Implement API endpoints
  ```go
  GET    /api/v1/search                   (full-text search)
  GET    /api/v1/search/autocomplete
  GET    /api/v1/search/filters
  GET    /api/v1/search/nearby            (geospatial)
  ```
- [ ] Subscribe to NATS events
  - [ ] `property.created` → Index property
  - [ ] `property.updated` → Update index
  - [ ] `property.deleted` → Remove from index
- [ ] Index all existing properties
- [ ] Deploy to GKE

---

## Phase 6: Migrate Frontend

**Duration:** 3 weeks
**Priority:** HIGH

### 6.1 Set Up New Frontend Repository

**Target:** `estospaces-web`
**Source:** `estospaces-app/src/`

#### Tasks

- [ ] Initialize Next.js 15 project
  ```bash
  cd /Users/puvendhan/Documents/repos/new/estospaces-web
  npx create-next-app@latest . --typescript --tailwind --app
  ```
- [ ] Install dependencies
  ```bash
  pnpm add axios @tanstack/react-query zustand
  pnpm add lucide-react
  pnpm add -D @types/node
  ```

### 6.2 Migrate Shared Components

- [ ] **Copy from monolith:**
  ```
  estospaces-app/src/components/shared/
  ```
- [ ] **Move to:**
  ```
  estospaces-shared/packages/ui-components/
  ```
- [ ] Publish as npm package
- [ ] Install in estospaces-web

### 6.3 Migrate Dashboards

#### 6.3.1 User Dashboard

**Source:** `estospaces-app/src/components/user/`

- [ ] Create Next.js app routes
  ```
  estospaces-web/src/app/(user)/dashboard/
  ```
- [ ] Migrate components
  - [ ] DiscoverProperties.tsx → Discover page
  - [ ] UserApplications.tsx → Applications page
  - [ ] UserBookings.tsx → Bookings page
  - [ ] UserProfile.tsx → Profile page
  - [ ] Messages.tsx → Messages page
- [ ] Update API calls
  - [ ] Replace Supabase calls with REST API calls
  - [ ] Use axios with auth interceptor
- [ ] Test all user flows

#### 6.3.2 Manager/Agent Dashboard

**Source:** `estospaces-app/src/components/manager/`

- [ ] Create Next.js app routes
  ```
  estospaces-web/src/app/(manager)/manager/
  ```
- [ ] Migrate components
  - [ ] Properties.tsx → Properties management
  - [ ] Leads.tsx → Leads management
  - [ ] Appointments.tsx → Appointments
  - [ ] Analytics.tsx → Analytics dashboard
  - [ ] Billing.tsx → Billing/Invoices
  - [ ] Messages.tsx → Messages
- [ ] Update API calls
- [ ] Test all manager flows

#### 6.3.3 Admin Dashboard

**Source:** `estospaces-app/src/components/admin/`

- [ ] Create Next.js app routes
  ```
  estospaces-web/src/app/(admin)/admin/
  ```
- [ ] Migrate components
  - [ ] UserManagement.tsx → User management
  - [ ] PropertyApproval.tsx → Property approval
  - [ ] Reports.tsx → Reports
  - [ ] Settings.tsx → System settings
- [ ] Update API calls
- [ ] Test all admin flows

### 6.4 Update Authentication

- [ ] Remove Supabase Auth
- [ ] Implement JWT-based auth
  - [ ] Login flow → auth-service
  - [ ] Store JWT in localStorage/cookies
  - [ ] Add auth interceptor to axios
  - [ ] Implement token refresh logic
- [ ] Update AuthContext
- [ ] Update protected routes

### 6.5 Create API Client Layer

- [ ] Create API clients for each service
  ```typescript
  // src/lib/api/auth-service.ts
  // src/lib/api/user-service.ts
  // src/lib/api/property-service.ts
  // src/lib/api/booking-service.ts
  // src/lib/api/payment-service.ts
  ```
- [ ] Use React Query for server state
- [ ] Use Zustand for client state

### 6.6 Deploy New Frontend

- [ ] Create Dockerfile
- [ ] Build and push image
- [ ] Create Kubernetes manifest
- [ ] Deploy to GKE
- [ ] Configure NGINX Ingress
  - [ ] `app.estospaces.com` → web service
  - [ ] `api.estospaces.com` → backend services

---

## Phase 7: Testing & Validation

**Duration:** 2 weeks

### 7.1 Service Testing

- [ ] **Auth Service**
  - [ ] Unit tests (80%+ coverage)
  - [ ] Integration tests
  - [ ] API endpoint tests
  - [ ] Load testing (locust/k6)
- [ ] **User Service**
  - [ ] Unit tests
  - [ ] Integration tests
  - [ ] API tests
- [ ] **Property Service**
  - [ ] Unit tests
  - [ ] Integration tests
  - [ ] Search functionality tests
- [ ] **Booking Service**
  - [ ] Unit tests
  - [ ] Booking flow tests
  - [ ] Calendar tests
- [ ] **Payment Service**
  - [ ] Unit tests
  - [ ] Stripe integration tests
  - [ ] Webhook tests
- [ ] **Notification Service**
  - [ ] Event subscriber tests
  - [ ] Email sending tests (test mode)
- [ ] **Media Service**
  - [ ] Upload tests
  - [ ] GCS integration tests
- [ ] **Messaging Service**
  - [ ] WebSocket tests
  - [ ] Message delivery tests
- [ ] **Search Service**
  - [ ] Search accuracy tests
  - [ ] Performance tests

### 7.2 Frontend Testing

- [ ] Component tests (Vitest)
- [ ] E2E tests (Playwright)
  - [ ] User registration flow
  - [ ] Login flow
  - [ ] Property search flow
  - [ ] Booking flow
  - [ ] Manager property creation flow
  - [ ] Admin approval flow

### 7.3 Integration Testing

- [ ] End-to-end user journey tests
  - [ ] User registers → searches property → books viewing → receives email
  - [ ] Agent creates property → admin approves → user sees property
  - [ ] User makes payment → invoice generated → email sent

### 7.4 Performance Testing

- [ ] Load test each service
  - [ ] Target: 100 req/s per service
  - [ ] P95 latency < 100ms
- [ ] Load test frontend
  - [ ] Target: 1000 concurrent users
  - [ ] Page load time < 2s
- [ ] Database query optimization
- [ ] Redis cache hit rate > 80%

### 7.5 Security Testing

- [ ] JWT token security
- [ ] SQL injection prevention
- [ ] XSS prevention
- [ ] CSRF protection
- [ ] Rate limiting verification
- [ ] Secret management verification

---

## Phase 8: Production Deployment

**Duration:** 2 weeks

### 8.1 Pre-Production Checklist

- [ ] All services deployed to staging
- [ ] All tests passing
- [ ] Performance benchmarks met
- [ ] Security audit completed
- [ ] Documentation complete
- [ ] Monitoring configured
- [ ] Alerts configured
- [ ] Backup strategy in place
- [ ] Rollback plan documented

### 8.2 Database Migration

- [ ] Schedule maintenance window
- [ ] Notify users
- [ ] Export final data from Supabase
- [ ] Import to Cloud SQL databases
- [ ] Verify data integrity
- [ ] Run data validation queries

### 8.3 DNS Configuration

- [ ] Configure DNS records
  ```
  app.estospaces.com  → GKE Load Balancer IP
  api.estospaces.com  → GKE Load Balancer IP
  ```
- [ ] Set up SSL certificates (cert-manager)
- [ ] Test SSL/TLS

### 8.4 Production Deployment

- [ ] Deploy infrastructure services
  - [ ] Redis
  - [ ] NATS
  - [ ] Prometheus
  - [ ] Grafana
- [ ] Deploy Cloud SQL Proxies
- [ ] Deploy backend services (rolling update)
  - [ ] auth-service
  - [ ] user-service
  - [ ] property-service
  - [ ] booking-service
  - [ ] payment-service
  - [ ] notification-service
  - [ ] media-service
  - [ ] messaging-service
  - [ ] search-service
- [ ] Deploy frontend
- [ ] Configure NGINX Ingress
- [ ] Verify all services healthy
- [ ] Run smoke tests

### 8.5 Go-Live

- [ ] Switch DNS to new infrastructure
- [ ] Monitor all services closely
- [ ] Watch error logs
- [ ] Watch performance metrics
- [ ] Have rollback ready
- [ ] Support team on standby

### 8.6 Post-Deployment

- [ ] Monitor for 24 hours
- [ ] Fix any critical issues
- [ ] Collect user feedback
- [ ] Performance tuning
- [ ] Document lessons learned

---

## Phase 9: Decommission Monolith

**Duration:** 1 week

### 9.1 Verify New System

- [ ] All features working in new system
- [ ] No data loss
- [ ] All users migrated
- [ ] All API calls migrated
- [ ] Performance equal or better

### 9.2 Archive Monolith

- [ ] Export final Supabase data (backup)
- [ ] Archive monolith codebase
  ```bash
  cd /Users/puvendhan/Documents/repos/new
  mv estospaces-app estospaces-app-archived
  ```
- [ ] Create GitHub release with tag `v1.0.0-monolith`
- [ ] Update README with deprecation notice
- [ ] Archive repository on GitHub

### 9.3 Cleanup

- [ ] Cancel Supabase subscription (after data archived)
- [ ] Remove old infrastructure (if any)
- [ ] Update documentation
- [ ] Celebrate! 🎉

---

## Summary Statistics

### Migration Scope

**From:**
- 1 Monolithic React app with 3 dashboards
- 1 Supabase backend
- 1 Express API server
- 1 PostgreSQL database (Supabase)

**To:**
- 1 Next.js 15 frontend (all dashboards)
- 9 Go microservices
- 9 Cloud SQL PostgreSQL databases
- ~45 pods running in GKE
- 13 total repositories

### Estimated Timeline

| Phase | Duration | Tasks |
|-------|----------|-------|
| Phase 1: Infrastructure | 2 weeks | Repository setup, GCP setup |
| Phase 2: Auth & User | 3 weeks | Extract auth and user services |
| Phase 3: Property | 2 weeks | Extract property service |
| Phase 4: Booking & Payment | 3 weeks | Extract booking and payment |
| Phase 5: Platform Services | 4 weeks | Notification, media, messaging, search |
| Phase 6: Frontend Migration | 3 weeks | Migrate all dashboards |
| Phase 7: Testing | 2 weeks | Comprehensive testing |
| Phase 8: Production | 2 weeks | Go-live |
| Phase 9: Decommission | 1 week | Archive monolith |
| **Total** | **22 weeks** | **~5-6 months** |

### Resources Required

**Team:**
- 1 Tech Lead / Architect
- 2 Backend Developers (Go)
- 1 Frontend Developer (Next.js)
- 1 DevOps Engineer
- 1 QA Engineer

**Total:** 6 people

---

## Progress Tracking

Use this checklist to track overall progress:

```
[ ] Phase 1: Infrastructure Setup (0/X tasks)
[ ] Phase 2: Auth & User Services (0/X tasks)
[ ] Phase 3: Property Service (0/X tasks)
[ ] Phase 4: Booking & Payment (0/X tasks)
[ ] Phase 5: Platform Services (0/X tasks)
[ ] Phase 6: Frontend Migration (0/X tasks)
[ ] Phase 7: Testing (0/X tasks)
[ ] Phase 8: Production Deployment (0/X tasks)
[ ] Phase 9: Decommission Monolith (0/X tasks)
```

**Current Status:** 📋 Ready to start Phase 1

---

**Last Updated:** February 10, 2026
**Next Steps:** Review tasks and begin Phase 1 - Infrastructure Setup
