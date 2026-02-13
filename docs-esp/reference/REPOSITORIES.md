# EstoSpaces - Complete Repository List

**Organization:** `Estospaces-Development`
**Total Active Repositories:** 13
**Architecture:** Granular Microservices
**Last Updated:** February 10, 2026

---

## 📋 Active Repositories for Production

### **Infrastructure (2 repos)**

| Repository | URL | Purpose | Status |
|------------|-----|---------|--------|
| **estospaces-shared** | [github.com/Estospaces-Development/estospaces-shared](https://github.com/Estospaces-Development/estospaces-shared) | Shared monorepo - Types, UI components, utilities, API contracts | ✅ Active |
| **estospaces-infrastructure** | [github.com/Estospaces-Development/estospaces-infrastructure](https://github.com/Estospaces-Development/estospaces-infrastructure) | Infrastructure as Code - Terraform, Kubernetes manifests, deployment scripts | ✅ Active |

---

### **Frontend (2 repos)**

| Repository | URL | Purpose | Status |
|------------|-----|---------|--------|
| **estospaces-web** | [github.com/Estospaces-Development/estospaces-web](https://github.com/Estospaces-Development/estospaces-web) | Next.js 15 frontend - All 3 dashboards (User/Agent/Admin) | ✅ Active |
| **estospaces-mobile** | [github.com/Estospaces-Development/estospaces-mobile](https://github.com/Estospaces-Development/estospaces-mobile) | Mobile application - React Native (Expo) for iOS and Android | ✅ Active |

---

### **Backend Microservices (9 repos)**

Each service runs as **independent pods** in GKE with separate databases.

| # | Repository | URL | Port | Purpose | Status |
|---|------------|-----|------|---------|--------|
| 1 | **estospaces-auth-service** | [github.com/Estospaces-Development/estospaces-auth-service](https://github.com/Estospaces-Development/estospaces-auth-service) | 8080 | Authentication - Login, JWT, OAuth2, MFA | ✅ Active |
| 2 | **estospaces-user-service** | [github.com/Estospaces-Development/estospaces-user-service](https://github.com/Estospaces-Development/estospaces-user-service) | 8081 | User management - Profiles, Settings, Verification | ✅ Active |
| 3 | **estospaces-property-service** | [github.com/Estospaces-Development/estospaces-property-service](https://github.com/Estospaces-Development/estospaces-property-service) | 8082 | Property management - Listings, Search, Reviews | ✅ Active |
| 4 | **estospaces-booking-service** | [github.com/Estospaces-Development/estospaces-booking-service](https://github.com/Estospaces-Development/estospaces-booking-service) | 8083 | Bookings - Bookings, Viewings, Availability | ✅ Active |
| 5 | **estospaces-payment-service** | [github.com/Estospaces-Development/estospaces-payment-service](https://github.com/Estospaces-Development/estospaces-payment-service) | 8084 | Payments - Stripe integration, Billing, Invoices | ✅ Active |
| 6 | **estospaces-notification-service** | [github.com/Estospaces-Development/estospaces-notification-service](https://github.com/Estospaces-Development/estospaces-notification-service) | 8085 | Notifications - Email, SMS, Push (SendGrid, Twilio) | ✅ Active |
| 7 | **estospaces-media-service** | [github.com/Estospaces-Development/estospaces-media-service](https://github.com/Estospaces-Development/estospaces-media-service) | 8086 | Media - Image/Video upload, Storage, CDN (GCS) | ✅ Active |
| 8 | **estospaces-messaging-service** | [github.com/Estospaces-Development/estospaces-messaging-service](https://github.com/Estospaces-Development/estospaces-messaging-service) | 8087 | Messaging - Real-time chat, WebSocket | ✅ Active |
| 9 | **estospaces-search-service** | [github.com/Estospaces-Development/estospaces-search-service](https://github.com/Estospaces-Development/estospaces-search-service) | 8088 | Search - Full-text search, Autocomplete, Filters | ✅ Active |

---

## 🗄️ Legacy/Deprecated Repositories

These repositories contain old code and should be archived or migrated:

| Repository | Status | Action Required |
|------------|--------|-----------------|
| **estospaces-core-service** | ⚠️ Legacy | Migrate code to `auth-service`, `user-service`, `property-service` |
| **estospaces-platform-service** | ⚠️ Legacy | Migrate code to `notification-service`, `media-service`, `messaging-service`, `search-service` |
| **estospaces-app** | ⚠️ Old monolith | Archive after migration complete |
| **estospaces-deployment** | ⚠️ Old deployment | Use `estospaces-infrastructure` instead |
| **estospaces-project** | ⚠️ Unknown | Review and archive if not needed |
| **estospaces_backend** | ⚠️ Old backend | Archive |
| **mobile_application_backend_api** | ⚠️ Old API | Archive |

---

## 🏗️ GKE Deployment Architecture

### **Pod Distribution**

```
Production Namespace (production):

Frontend:
├── web-1, web-2, web-3                     (3 pods)

Backend Microservices (2 replicas each):
├── auth-service-1, auth-service-2          (2 pods)
├── user-service-1, user-service-2          (2 pods)
├── property-service-1, property-service-2  (2 pods)
├── booking-service-1, booking-service-2    (2 pods)
├── payment-service-1, payment-service-2    (2 pods)
├── notification-service-1, notification-2  (2 pods)
├── media-service-1, media-service-2        (2 pods)
├── messaging-service-1, messaging-service-2 (2 pods)
├── search-service-1, search-service-2      (2 pods)

Cloud SQL Proxies (2 replicas each):
├── cloudsql-proxy-auth-1, -2               (2 pods)
├── cloudsql-proxy-users-1, -2              (2 pods)
├── cloudsql-proxy-properties-1, -2         (2 pods)
├── cloudsql-proxy-bookings-1, -2           (2 pods)
├── cloudsql-proxy-payments-1, -2           (2 pods)
├── cloudsql-proxy-notifications-1, -2      (2 pods)
├── cloudsql-proxy-media-1, -2              (2 pods)
├── cloudsql-proxy-messaging-1, -2          (2 pods)
├── cloudsql-proxy-search-1, -2             (2 pods)

Infrastructure:
├── redis-1, redis-2                        (2 pods)
├── nats-1                                  (1 pod)

Monitoring:
├── prometheus-1                            (1 pod)
├── grafana-1                               (1 pod)
├── alertmanager-1                          (1 pod)

Total Application Pods: ~48 pods
```

---

## 🗃️ Database Architecture

Each microservice has its own **dedicated Cloud SQL PostgreSQL database**:

```
Cloud SQL Instances:

1.  estospaces-auth-db          → auth-service
2.  estospaces-users-db         → user-service
3.  estospaces-properties-db    → property-service
4.  estospaces-bookings-db      → booking-service
5.  estospaces-payments-db      → payment-service
6.  estospaces-notifications-db → notification-service
7.  estospaces-media-db         → media-service
8.  estospaces-messaging-db     → messaging-service
9.  estospaces-search-db        → search-service (or Elasticsearch)

Total: 9 separate databases
```

---

## 🔌 API Gateway Routing

**NGINX Ingress Controller** routes traffic:

```
Domain: api.estospaces.com

/api/v1/auth/*           → auth-service:8080
/api/v1/users/*          → user-service:8081
/api/v1/properties/*     → property-service:8082
/api/v1/bookings/*       → booking-service:8083
/api/v1/viewings/*       → booking-service:8083
/api/v1/payments/*       → payment-service:8084
/api/v1/invoices/*       → payment-service:8084
/api/v1/notifications/*  → notification-service:8085
/api/v1/media/*          → media-service:8086
/api/v1/messages/*       → messaging-service:8087
/ws/chat                 → messaging-service:8087 (WebSocket)
/api/v1/search/*         → search-service:8088
```

---

## 🚀 Getting Started

### **Clone All Repositories**

```bash
# Navigate to workspace
cd /Users/puvendhan/Documents/repos/new

# Infrastructure
git clone git@github.com:Estospaces-Development/estospaces-shared.git
git clone git@github.com:Estospaces-Development/estospaces-infrastructure.git

# Frontend
git clone git@github.com:Estospaces-Development/estospaces-web.git
git clone git@github.com:Estospaces-Development/estospaces-mobile.git

# Backend Microservices
git clone git@github.com:Estospaces-Development/estospaces-auth-service.git
git clone git@github.com:Estospaces-Development/estospaces-user-service.git
git clone git@github.com:Estospaces-Development/estospaces-property-service.git
git clone git@github.com:Estospaces-Development/estospaces-booking-service.git
git clone git@github.com:Estospaces-Development/estospaces-payment-service.git
git clone git@github.com:Estospaces-Development/estospaces-notification-service.git
git clone git@github.com:Estospaces-Development/estospaces-media-service.git
git clone git@github.com:Estospaces-Development/estospaces-messaging-service.git
git clone git@github.com:Estospaces-Development/estospaces-search-service.git
```

### **Directory Structure**

```
/Users/puvendhan/Documents/repos/new/
├── estospaces-shared/
├── estospaces-infrastructure/
├── estospaces-web/
├── estospaces-mobile/
├── estospaces-auth-service/
├── estospaces-user-service/
├── estospaces-property-service/
├── estospaces-booking-service/
├── estospaces-payment-service/
├── estospaces-notification-service/
├── estospaces-media-service/
├── estospaces-messaging-service/
└── estospaces-search-service/
```

---

## 📝 Repository Naming Convention

All repositories follow the pattern: `estospaces-{component}-{type}`

- `estospaces-{name}-service` → Backend microservice
- `estospaces-{name}` → Frontend/Infrastructure/Shared

---

## 🔐 Access Control

**All repositories are PRIVATE**

Access levels:
- **Admin:** CTO, Tech Lead
- **Write:** All developers (with branch protection on main)
- **Read:** QA, Product team

---

## 📊 Repository Statistics

```
Total Active Repositories: 13
├── Infrastructure: 2
├── Frontend: 2
└── Backend: 9

Total Legacy Repositories: 7
(To be archived after migration)

Total Pods in GKE: ~48 pods
Total Databases: 9 Cloud SQL instances
Monthly Infrastructure Cost: $800-1000
```

---

## 📅 Migration Plan

### **Phase 1: Setup New Services (Weeks 1-2)**
- ✅ Create all 13 repositories
- ⏳ Initialize Go projects in each service
- ⏳ Set up CI/CD pipelines
- ⏳ Create Kubernetes manifests

### **Phase 2: Migrate Auth & Users (Weeks 3-4)**
- ⏳ Migrate auth code from core-service → auth-service
- ⏳ Migrate user code from core-service → user-service
- ⏳ Deploy to GKE dev environment
- ⏳ Test end-to-end

### **Phase 3: Migrate Properties & Booking (Weeks 5-6)**
- ⏳ Migrate property code → property-service
- ⏳ Keep booking-service as-is (already separate)
- ⏳ Deploy to GKE dev environment

### **Phase 4: Migrate Platform Services (Weeks 7-8)**
- ⏳ Split platform-service into 4 services:
  - notification-service
  - media-service
  - messaging-service
  - search-service
- ⏳ Deploy to GKE dev environment

### **Phase 5: Production Deployment (Weeks 9-10)**
- ⏳ Deploy all services to GKE production
- ⏳ Configure NGINX Ingress
- ⏳ Set up monitoring
- ⏳ Production testing
- ⏳ Archive legacy repositories

---

## 🔗 Quick Links

- **Organization:** https://github.com/Estospaces-Development
- **Documentation:** See each repository's README.md
- **Architecture Diagrams:** `estospaces-infrastructure/docs/`
- **API Documentation:** `estospaces-shared/packages/api-contracts/`

---

**Last Updated:** February 10, 2026
**Maintained By:** EstoSpaces Development Team
