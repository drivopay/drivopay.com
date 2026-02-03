# DrivoPay - Production-Grade App Development Specification

> **Version**: 1.0.0
> **Last Updated**: February 2026
> **Status**: Production Ready Specification

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Repository Structure Strategy](#2-repository-structure-strategy)
3. [System Architecture](#3-system-architecture)
4. [Backend Architecture](#4-backend-architecture)
5. [Mobile App Architecture](#5-mobile-app-architecture)
6. [Database Design](#6-database-design)
7. [API Specification](#7-api-specification)
8. [Security Architecture](#8-security-architecture)
9. [Payment Integration](#9-payment-integration)
10. [DevOps & Infrastructure](#10-devops--infrastructure)
11. [Monitoring & Observability](#11-monitoring--observability)
12. [Testing Strategy](#12-testing-strategy)
13. [Implementation Roadmap](#13-implementation-roadmap)

---

## 1. Executive Summary

### 1.1 Product Vision

DrivoPay is an instant payments platform for gig economy drivers, enabling 3-second payouts with zero platform fees. The platform integrates with major ride-sharing and delivery services (Uber, Ola, Rapido, Zomato, Swiggy, Dunzo).

### 1.2 Core Features

| Feature | Description | Priority |
|---------|-------------|----------|
| Instant Payouts | 3-second money transfer via UPI | P0 |
| Smart Wallet | Real-time earnings tracking | P0 |
| Multi-Platform Integration | Connect Uber, Ola, Rapido, etc. | P0 |
| QR Code Payments | Customer-to-driver instant payments | P0 |
| AI Insights | Earnings optimization recommendations | P1 |
| Micro-Loans | Quick credit based on earning history | P1 |
| Fuel Discounts | Partner station discounts | P2 |

### 1.3 Technical Requirements

- **Availability**: 99.99% uptime (< 52 minutes downtime/year)
- **Latency**: < 100ms API response time (P95)
- **Transaction Speed**: < 3 seconds end-to-end
- **Scale**: Support 1M+ concurrent users
- **Security**: PCI-DSS Level 1 compliant

---

## 2. Repository Structure Strategy

### 2.1 Recommended Repository Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    DRIVOPAY REPOSITORIES                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │  drivopay.com   │  │ drivopay-backend│  │ drivopay-mobile │ │
│  │   (Web Client)  │  │    (Backend)    │  │  (iOS/Android)  │ │
│  │                 │  │                 │  │                 │ │
│  │ • Landing Page  │  │ • API Services  │  │ • React Native  │ │
│  │ • Web Dashboard │  │ • Database      │  │ • Shared Code   │ │
│  │ • Admin Portal  │  │ • Workers       │  │ • iOS Native    │ │
│  │                 │  │ • Integrations  │  │ • Android Native│ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │drivopay-infra   │  │ drivopay-shared │  │ drivopay-docs   │ │
│  │ (Infrastructure)│  │    (Shared)     │  │ (Documentation) │ │
│  │                 │  │                 │  │                 │ │
│  │ • Terraform     │  │ • Proto files   │  │ • API Docs      │ │
│  │ • K8s manifests │  │ • Types/Models  │  │ • Architecture  │ │
│  │ • CI/CD configs │  │ • Validators    │  │ • Runbooks      │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Repository Decision Matrix

| Repository | Purpose | Recommended? | Reasoning |
|------------|---------|--------------|-----------|
| `drivopay.com` | Web client (existing) | YES (exists) | Landing page, web dashboard |
| `drivopay-backend` | Backend services | **YES - Create** | Separate deployment cycle, different team skills |
| `drivopay-mobile` | React Native app | **YES - Create** | Single codebase for iOS & Android |
| `drivopay-infra` | Infrastructure as Code | **YES - Create** | Terraform, K8s, sensitive configs |
| `drivopay-shared` | Shared types/protos | OPTIONAL | Useful if teams grow, can start in backend |
| `drivopay-docs` | Documentation | OPTIONAL | Can use wiki or Notion instead |

### 2.3 Why This Structure?

**Separate Backend Repository:**
- Independent deployment cycles
- Different security requirements (secrets, credentials)
- Backend scaling independent of mobile releases
- Cleaner CI/CD pipelines
- Team specialization (backend vs mobile)

**Single Mobile Repository (React Native):**
- 90%+ code sharing between iOS and Android
- Unified testing and deployment
- Faster feature development
- Smaller team requirement
- Easier maintenance

**Alternative: Native Apps (Separate Repos)**
If you prefer native development:
- `drivopay-ios` - Swift/SwiftUI
- `drivopay-android` - Kotlin/Jetpack Compose
- Trade-off: Better performance, 2x development effort

---

## 3. System Architecture

### 3.1 High-Level Architecture

```mermaid
flowchart TB
    subgraph Clients["Client Applications"]
        WEB["Web App<br/>(Next.js)"]
        IOS["iOS App<br/>(React Native)"]
        ANDROID["Android App<br/>(React Native)"]
    end

    subgraph Gateway["API Gateway Layer"]
        KONG["Kong API Gateway"]
        RATE["Rate Limiter"]
        AUTH["Auth Middleware"]
    end

    subgraph Services["Microservices"]
        USER["User Service"]
        WALLET["Wallet Service"]
        PAYMENT["Payment Service"]
        TXN["Transaction Service"]
        NOTIFY["Notification Service"]
        AI["AI/ML Service"]
        LOAN["Loan Service"]
    end

    subgraph Data["Data Layer"]
        PG[(PostgreSQL<br/>Primary DB)]
        REDIS[(Redis<br/>Cache/Sessions)]
        KAFKA[("Kafka<br/>Event Streaming")]
        ES[(Elasticsearch<br/>Search/Logs)]
        S3[("S3<br/>File Storage")]
    end

    subgraph External["External Integrations"]
        UPI["UPI/NPCI"]
        UBER["Uber API"]
        OLA["Ola API"]
        ZOMATO["Zomato API"]
        SMS["SMS Gateway"]
        PUSH["FCM/APNS"]
    end

    subgraph Infra["Infrastructure"]
        K8S["Kubernetes<br/>(EKS)"]
        CDN["CloudFront CDN"]
        WAF["AWS WAF"]
    end

    WEB --> CDN
    IOS --> KONG
    ANDROID --> KONG
    CDN --> KONG

    KONG --> RATE
    RATE --> AUTH
    AUTH --> Services

    USER --> PG
    USER --> REDIS
    WALLET --> PG
    WALLET --> REDIS
    PAYMENT --> PG
    PAYMENT --> KAFKA
    TXN --> PG
    TXN --> ES
    NOTIFY --> KAFKA
    AI --> PG
    LOAN --> PG

    PAYMENT --> UPI
    USER --> UBER
    USER --> OLA
    USER --> ZOMATO
    NOTIFY --> SMS
    NOTIFY --> PUSH

    Services --> K8S
```

### 3.2 Data Flow Architecture

```mermaid
sequenceDiagram
    participant D as Driver App
    participant C as Customer
    participant G as API Gateway
    participant PS as Payment Service
    participant WS as Wallet Service
    participant UPI as UPI/NPCI
    participant NS as Notification Service
    participant K as Kafka

    D->>G: Generate Payment QR
    G->>PS: Create Payment Request
    PS->>PS: Generate QR Code
    PS-->>D: Return QR Code

    C->>UPI: Scan & Pay via UPI
    UPI->>PS: Payment Callback
    PS->>WS: Credit Wallet
    PS->>K: Publish PaymentCompleted Event
    WS->>WS: Update Balance
    K->>NS: Consume Event
    NS->>D: Push Notification
    NS->>D: SMS Confirmation

    Note over D,NS: Total Time: < 3 seconds
```

### 3.3 Microservices Communication

```mermaid
flowchart LR
    subgraph Sync["Synchronous (REST/gRPC)"]
        US[User Service]
        WS[Wallet Service]
        PS[Payment Service]
    end

    subgraph Async["Asynchronous (Kafka)"]
        TS[Transaction Service]
        NS[Notification Service]
        AS[Analytics Service]
        LS[Loan Service]
    end

    US <-->|gRPC| WS
    WS <-->|gRPC| PS
    PS -->|Events| TS
    PS -->|Events| NS
    TS -->|Events| AS
    WS -->|Events| LS
```

---

## 4. Backend Architecture

### 4.1 Technology Stack

| Component | Technology | Justification |
|-----------|------------|---------------|
| Language | **Node.js (TypeScript)** or **Go** | High performance, type safety |
| Framework | **NestJS** (Node) or **Gin** (Go) | Enterprise patterns, maintainability |
| Database | **PostgreSQL 16** | ACID, JSON support, performance |
| Cache | **Redis 7** | Sub-ms latency, pub/sub |
| Message Queue | **Apache Kafka** | High throughput, event sourcing |
| Search | **Elasticsearch 8** | Full-text search, analytics |
| API Protocol | **REST + gRPC** | REST for mobile, gRPC internal |

### 4.2 Service Architecture (NestJS)

```mermaid
flowchart TB
    subgraph UserService["User Service"]
        UC[User Controller]
        US[User Service]
        UR[User Repository]
        UE[User Entity]
        UC --> US --> UR --> UE
    end

    subgraph WalletService["Wallet Service"]
        WC[Wallet Controller]
        WS[Wallet Service]
        WR[Wallet Repository]
        WE[Wallet Entity]
        WC --> WS --> WR --> WE
    end

    subgraph PaymentService["Payment Service"]
        PC[Payment Controller]
        PS[Payment Service]
        PR[Payment Repository]
        PE[Payment Entity]
        UPI[UPI Provider]
        PC --> PS --> PR --> PE
        PS --> UPI
    end

    subgraph Shared["Shared Modules"]
        AUTH[Auth Module]
        LOG[Logger Module]
        CONFIG[Config Module]
        HEALTH[Health Module]
    end

    UC -.-> AUTH
    WC -.-> AUTH
    PC -.-> AUTH
```

### 4.3 Backend Directory Structure

```
drivopay-backend/
├── apps/
│   ├── api-gateway/              # Main API entry point
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── app.module.ts
│   │   │   └── filters/
│   │   └── test/
│   │
│   ├── user-service/             # User management
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── repositories/
│   │   │   ├── entities/
│   │   │   ├── dto/
│   │   │   └── events/
│   │   └── test/
│   │
│   ├── wallet-service/           # Wallet & balance
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── repositories/
│   │   │   └── entities/
│   │   └── test/
│   │
│   ├── payment-service/          # Payment processing
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── providers/        # UPI, Bank integrations
│   │   │   │   ├── upi.provider.ts
│   │   │   │   ├── razorpay.provider.ts
│   │   │   │   └── paytm.provider.ts
│   │   │   └── entities/
│   │   └── test/
│   │
│   ├── transaction-service/      # Transaction history
│   ├── notification-service/     # Push, SMS, Email
│   ├── loan-service/            # Micro-loans
│   └── analytics-service/        # AI/ML insights
│
├── libs/
│   ├── common/                   # Shared utilities
│   │   ├── decorators/
│   │   ├── filters/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── pipes/
│   │
│   ├── database/                 # Database module
│   │   ├── migrations/
│   │   ├── seeds/
│   │   └── database.module.ts
│   │
│   ├── auth/                     # Authentication
│   │   ├── jwt.strategy.ts
│   │   ├── auth.guard.ts
│   │   └── auth.module.ts
│   │
│   └── shared/                   # Shared types
│       ├── interfaces/
│       ├── constants/
│       └── enums/
│
├── proto/                        # gRPC definitions
│   ├── user.proto
│   ├── wallet.proto
│   └── payment.proto
│
├── docker/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── docker-compose.dev.yml
│
├── k8s/
│   ├── base/
│   ├── overlays/
│   │   ├── dev/
│   │   ├── staging/
│   │   └── production/
│   └── kustomization.yaml
│
├── scripts/
│   ├── migrate.sh
│   ├── seed.sh
│   └── deploy.sh
│
├── nest-cli.json
├── tsconfig.json
├── package.json
└── README.md
```

---

## 5. Mobile App Architecture

### 5.1 Technology Stack

| Component | Technology | Justification |
|-----------|------------|---------------|
| Framework | **React Native 0.73+** | Cross-platform, code sharing |
| Language | **TypeScript** | Type safety, maintainability |
| State | **Zustand + React Query** | Simple, performant |
| Navigation | **React Navigation 6** | Native navigation |
| UI | **Tamagui** or **NativeWind** | Performant styling |
| Forms | **React Hook Form + Zod** | Validation |
| Storage | **MMKV** | Fast key-value storage |

### 5.2 Mobile Architecture Diagram

```mermaid
flowchart TB
    subgraph Presentation["Presentation Layer"]
        SCREENS[Screens]
        COMPONENTS[Components]
        HOOKS[Custom Hooks]
    end

    subgraph State["State Management"]
        ZUSTAND[Zustand Store]
        RQ[React Query]
        CACHE[Query Cache]
    end

    subgraph Domain["Domain Layer"]
        USECASES[Use Cases]
        ENTITIES[Entities]
        REPOS[Repository Interfaces]
    end

    subgraph Data["Data Layer"]
        API[API Client]
        STORAGE[Local Storage]
        KEYCHAIN[Secure Keychain]
    end

    subgraph Native["Native Modules"]
        BIOMETRIC[Biometrics]
        CAMERA[Camera/QR]
        PUSH[Push Notifications]
        LOCATION[Location]
    end

    SCREENS --> HOOKS
    SCREENS --> COMPONENTS
    HOOKS --> ZUSTAND
    HOOKS --> RQ
    RQ --> CACHE
    RQ --> USECASES
    USECASES --> REPOS
    REPOS --> API
    REPOS --> STORAGE
    STORAGE --> KEYCHAIN

    SCREENS --> Native
```

### 5.3 Mobile Directory Structure

```
drivopay-mobile/
├── src/
│   ├── app/                      # App entry & navigation
│   │   ├── App.tsx
│   │   ├── navigation/
│   │   │   ├── RootNavigator.tsx
│   │   │   ├── AuthNavigator.tsx
│   │   │   ├── MainNavigator.tsx
│   │   │   └── types.ts
│   │   └── providers/
│   │       ├── AuthProvider.tsx
│   │       └── ThemeProvider.tsx
│   │
│   ├── screens/                  # Screen components
│   │   ├── auth/
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── OTPScreen.tsx
│   │   │   └── OnboardingScreen.tsx
│   │   ├── home/
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── EarningsCard.tsx
│   │   │   └── QuickActions.tsx
│   │   ├── wallet/
│   │   │   ├── WalletScreen.tsx
│   │   │   ├── TransactionList.tsx
│   │   │   └── WithdrawScreen.tsx
│   │   ├── payment/
│   │   │   ├── QRCodeScreen.tsx
│   │   │   ├── PaymentSuccessScreen.tsx
│   │   │   └── PaymentHistoryScreen.tsx
│   │   ├── insights/
│   │   │   ├── InsightsScreen.tsx
│   │   │   └── EarningsChart.tsx
│   │   ├── loans/
│   │   │   ├── LoansScreen.tsx
│   │   │   └── LoanApplicationScreen.tsx
│   │   └── profile/
│   │       ├── ProfileScreen.tsx
│   │       ├── SettingsScreen.tsx
│   │       └── DocumentsScreen.tsx
│   │
│   ├── components/               # Reusable components
│   │   ├── ui/                   # Base UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Text.tsx
│   │   │   └── index.ts
│   │   ├── forms/                # Form components
│   │   │   ├── OTPInput.tsx
│   │   │   ├── BankAccountForm.tsx
│   │   │   └── AmountInput.tsx
│   │   └── shared/               # Shared components
│   │       ├── Header.tsx
│   │       ├── LoadingOverlay.tsx
│   │       ├── ErrorBoundary.tsx
│   │       └── AnimatedNumber.tsx
│   │
│   ├── features/                 # Feature modules
│   │   ├── auth/
│   │   │   ├── hooks/
│   │   │   │   ├── useAuth.ts
│   │   │   │   └── useOTP.ts
│   │   │   ├── services/
│   │   │   │   └── authService.ts
│   │   │   └── store/
│   │   │       └── authStore.ts
│   │   ├── wallet/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   └── store/
│   │   ├── payment/
│   │   │   ├── hooks/
│   │   │   │   ├── useQRCode.ts
│   │   │   │   └── usePaymentStatus.ts
│   │   │   └── services/
│   │   └── insights/
│   │       ├── hooks/
│   │       └── services/
│   │
│   ├── api/                      # API layer
│   │   ├── client.ts             # Axios instance
│   │   ├── interceptors.ts
│   │   ├── endpoints/
│   │   │   ├── auth.ts
│   │   │   ├── wallet.ts
│   │   │   ├── payment.ts
│   │   │   └── user.ts
│   │   └── types/
│   │       ├── requests.ts
│   │       └── responses.ts
│   │
│   ├── store/                    # Global state
│   │   ├── index.ts
│   │   ├── authStore.ts
│   │   ├── walletStore.ts
│   │   └── settingsStore.ts
│   │
│   ├── hooks/                    # Global hooks
│   │   ├── useNotifications.ts
│   │   ├── useBiometrics.ts
│   │   └── useDeepLinks.ts
│   │
│   ├── utils/                    # Utilities
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   ├── storage.ts
│   │   └── constants.ts
│   │
│   ├── theme/                    # Theme configuration
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   └── index.ts
│   │
│   └── types/                    # TypeScript types
│       ├── navigation.ts
│       ├── api.ts
│       └── models.ts
│
├── ios/                          # iOS native code
│   ├── DrivoPay/
│   ├── Podfile
│   └── Podfile.lock
│
├── android/                      # Android native code
│   ├── app/
│   ├── build.gradle
│   └── gradle.properties
│
├── __tests__/                    # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── ios-release.yml
│       └── android-release.yml
│
├── app.json
├── metro.config.js
├── babel.config.js
├── tsconfig.json
├── package.json
└── README.md
```

### 5.4 Screen Flow Diagram

```mermaid
flowchart TB
    subgraph Onboarding["Onboarding Flow"]
        SPLASH[Splash Screen]
        ONBOARD[Onboarding Slides]
        LOGIN[Phone Login]
        OTP[OTP Verification]
        KYC[KYC Upload]
        BANK[Bank Account Setup]
    end

    subgraph Main["Main App"]
        HOME[Home Dashboard]
        WALLET[Wallet]
        QR[Payment QR]
        HISTORY[Transaction History]
        INSIGHTS[Earnings Insights]
        LOANS[Micro Loans]
        PROFILE[Profile]
    end

    SPLASH --> ONBOARD
    ONBOARD --> LOGIN
    LOGIN --> OTP
    OTP --> KYC
    KYC --> BANK
    BANK --> HOME

    HOME <--> WALLET
    HOME <--> QR
    HOME <--> HISTORY
    HOME <--> INSIGHTS
    HOME <--> LOANS
    HOME <--> PROFILE

    QR --> |Payment Received| HOME
```

---

## 6. Database Design

### 6.1 Entity Relationship Diagram

```mermaid
erDiagram
    USERS ||--o{ WALLETS : has
    USERS ||--o{ BANK_ACCOUNTS : has
    USERS ||--o{ KYC_DOCUMENTS : has
    USERS ||--o{ PLATFORM_CONNECTIONS : has
    USERS ||--o{ DEVICES : has

    WALLETS ||--o{ TRANSACTIONS : has
    WALLETS ||--o{ WALLET_HISTORY : has

    TRANSACTIONS ||--|| PAYMENT_REQUESTS : fulfills
    TRANSACTIONS ||--o| REFUNDS : may_have

    USERS ||--o{ LOANS : has
    LOANS ||--o{ LOAN_REPAYMENTS : has

    USERS ||--o{ NOTIFICATIONS : receives

    USERS {
        uuid id PK
        string phone UK
        string email
        string full_name
        string avatar_url
        enum status
        jsonb preferences
        timestamp created_at
        timestamp updated_at
    }

    WALLETS {
        uuid id PK
        uuid user_id FK
        decimal balance
        decimal pending_balance
        string currency
        boolean is_active
        timestamp last_activity
        timestamp created_at
    }

    BANK_ACCOUNTS {
        uuid id PK
        uuid user_id FK
        string account_number
        string ifsc_code
        string account_holder_name
        string bank_name
        boolean is_primary
        boolean is_verified
        timestamp verified_at
    }

    TRANSACTIONS {
        uuid id PK
        uuid wallet_id FK
        uuid payment_request_id FK
        enum type
        decimal amount
        decimal fee
        string currency
        enum status
        string reference_id UK
        jsonb metadata
        timestamp created_at
    }

    PAYMENT_REQUESTS {
        uuid id PK
        uuid user_id FK
        decimal amount
        string qr_code
        string upi_id
        enum status
        timestamp expires_at
        timestamp paid_at
        timestamp created_at
    }

    PLATFORM_CONNECTIONS {
        uuid id PK
        uuid user_id FK
        enum platform
        string external_id
        jsonb credentials
        boolean is_active
        timestamp connected_at
    }

    KYC_DOCUMENTS {
        uuid id PK
        uuid user_id FK
        enum document_type
        string document_number
        string document_url
        enum verification_status
        string rejection_reason
        timestamp verified_at
    }

    LOANS {
        uuid id PK
        uuid user_id FK
        decimal principal_amount
        decimal interest_rate
        decimal total_amount
        integer tenure_days
        enum status
        timestamp disbursed_at
        timestamp due_date
    }

    LOAN_REPAYMENTS {
        uuid id PK
        uuid loan_id FK
        decimal amount
        enum status
        timestamp paid_at
    }

    NOTIFICATIONS {
        uuid id PK
        uuid user_id FK
        enum type
        string title
        string body
        jsonb data
        boolean is_read
        timestamp created_at
    }

    DEVICES {
        uuid id PK
        uuid user_id FK
        string device_token
        enum platform
        string device_model
        string os_version
        timestamp last_active
    }
```

### 6.2 Database Tables DDL

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone VARCHAR(15) UNIQUE NOT NULL,
    email VARCHAR(255),
    full_name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    status VARCHAR(20) DEFAULT 'pending_kyc',
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Wallets table
CREATE TABLE wallets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    balance DECIMAL(15,2) DEFAULT 0.00,
    pending_balance DECIMAL(15,2) DEFAULT 0.00,
    currency VARCHAR(3) DEFAULT 'INR',
    is_active BOOLEAN DEFAULT true,
    last_activity TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT positive_balance CHECK (balance >= 0)
);

-- Transactions table
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wallet_id UUID REFERENCES wallets(id),
    payment_request_id UUID,
    type VARCHAR(20) NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    fee DECIMAL(15,2) DEFAULT 0.00,
    currency VARCHAR(3) DEFAULT 'INR',
    status VARCHAR(20) DEFAULT 'pending',
    reference_id VARCHAR(100) UNIQUE,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payment requests table
CREATE TABLE payment_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    amount DECIMAL(15,2) NOT NULL,
    qr_code TEXT,
    upi_id VARCHAR(100),
    status VARCHAR(20) DEFAULT 'pending',
    expires_at TIMESTAMP WITH TIME ZONE,
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_transactions_wallet_id ON transactions(wallet_id);
CREATE INDEX idx_transactions_created_at ON transactions(created_at DESC);
CREATE INDEX idx_payment_requests_user_id ON payment_requests(user_id);
CREATE INDEX idx_payment_requests_status ON payment_requests(status);
CREATE INDEX idx_users_phone ON users(phone);

-- Partitioning for transactions (by month)
CREATE TABLE transactions_partitioned (
    LIKE transactions INCLUDING ALL
) PARTITION BY RANGE (created_at);

-- Create monthly partitions
CREATE TABLE transactions_y2026m01 PARTITION OF transactions_partitioned
    FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');
CREATE TABLE transactions_y2026m02 PARTITION OF transactions_partitioned
    FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');
```

---

## 7. API Specification

### 7.1 API Endpoints Overview

```mermaid
flowchart LR
    subgraph Auth["Authentication"]
        A1[POST /auth/otp/send]
        A2[POST /auth/otp/verify]
        A3[POST /auth/refresh]
        A4[POST /auth/logout]
    end

    subgraph User["User Management"]
        U1[GET /users/me]
        U2[PATCH /users/me]
        U3[POST /users/kyc]
        U4[GET /users/platforms]
        U5[POST /users/platforms/connect]
    end

    subgraph Wallet["Wallet"]
        W1[GET /wallet]
        W2[GET /wallet/transactions]
        W3[POST /wallet/withdraw]
        W4[GET /wallet/banks]
        W5[POST /wallet/banks]
    end

    subgraph Payment["Payments"]
        P1[POST /payments/qr/generate]
        P2[GET /payments/qr/:id]
        P3[POST /payments/callback]
        P4[GET /payments/:id]
    end

    subgraph Loans["Loans"]
        L1[GET /loans/eligibility]
        L2[POST /loans/apply]
        L3[GET /loans]
        L4[POST /loans/:id/repay]
    end

    subgraph Insights["Insights"]
        I1[GET /insights/earnings]
        I2[GET /insights/recommendations]
        I3[GET /insights/trends]
    end
```

### 7.2 API Documentation

#### Authentication

```yaml
# POST /api/v1/auth/otp/send
Request:
  body:
    phone: "+919876543210"
    device_id: "device-uuid"
Response:
  status: 200
  body:
    message: "OTP sent successfully"
    expires_in: 300

# POST /api/v1/auth/otp/verify
Request:
  body:
    phone: "+919876543210"
    otp: "123456"
    device_id: "device-uuid"
Response:
  status: 200
  body:
    access_token: "eyJhbG..."
    refresh_token: "eyJhbG..."
    expires_in: 3600
    user:
      id: "uuid"
      phone: "+919876543210"
      status: "active"
```

#### Wallet Operations

```yaml
# GET /api/v1/wallet
Headers:
  Authorization: "Bearer {token}"
Response:
  status: 200
  body:
    id: "wallet-uuid"
    balance: 2450.00
    pending_balance: 150.00
    currency: "INR"
    last_activity: "2026-02-03T10:30:00Z"

# POST /api/v1/wallet/withdraw
Headers:
  Authorization: "Bearer {token}"
Request:
  body:
    amount: 1000.00
    bank_account_id: "bank-uuid"
Response:
  status: 200
  body:
    transaction_id: "txn-uuid"
    amount: 1000.00
    status: "processing"
    estimated_completion: "2026-02-03T10:35:00Z"
```

#### Payment QR Generation

```yaml
# POST /api/v1/payments/qr/generate
Headers:
  Authorization: "Bearer {token}"
Request:
  body:
    amount: 250.00
    description: "Ride from HSR to Koramangala"
Response:
  status: 201
  body:
    id: "payment-uuid"
    qr_code: "data:image/png;base64,..."
    upi_deep_link: "upi://pay?pa=drivopay@ybl&pn=DrivoPay&am=250.00&tr=payment-uuid"
    expires_at: "2026-02-03T11:00:00Z"
    status: "pending"

# Webhook: POST /api/v1/payments/callback (from UPI provider)
Request:
  body:
    payment_id: "payment-uuid"
    status: "SUCCESS"
    upi_transaction_id: "upi-txn-123"
    amount: 250.00
    payer_vpa: "customer@upi"
Response:
  status: 200
```

### 7.3 Error Response Format

```json
{
  "error": {
    "code": "INSUFFICIENT_BALANCE",
    "message": "Insufficient wallet balance for withdrawal",
    "details": {
      "available_balance": 500.00,
      "requested_amount": 1000.00
    },
    "request_id": "req-uuid-123"
  }
}
```

---

## 8. Security Architecture

### 8.1 Security Layers

```mermaid
flowchart TB
    subgraph Edge["Edge Security"]
        WAF[AWS WAF]
        DDOS[DDoS Protection]
        GEO[Geo Blocking]
    end

    subgraph Gateway["API Gateway Security"]
        RATE[Rate Limiting]
        AUTH[JWT Authentication]
        MTLS[mTLS for Internal]
    end

    subgraph App["Application Security"]
        INPUT[Input Validation]
        SANITIZE[Output Sanitization]
        ENCRYPT[Field Encryption]
    end

    subgraph Data["Data Security"]
        TDE[Transparent Data Encryption]
        MASK[Data Masking]
        BACKUP[Encrypted Backups]
    end

    subgraph Secrets["Secrets Management"]
        VAULT[HashiCorp Vault]
        KMS[AWS KMS]
        ROTATE[Key Rotation]
    end

    Edge --> Gateway --> App --> Data
    Secrets -.-> Gateway
    Secrets -.-> App
    Secrets -.-> Data
```

### 8.2 Authentication Flow

```mermaid
sequenceDiagram
    participant App as Mobile App
    participant GW as API Gateway
    participant Auth as Auth Service
    participant Redis as Redis
    participant SMS as SMS Gateway

    App->>GW: POST /auth/otp/send {phone}
    GW->>Auth: Validate & Generate OTP
    Auth->>Redis: Store OTP (TTL: 5min)
    Auth->>SMS: Send OTP
    Auth-->>App: OTP Sent

    App->>GW: POST /auth/otp/verify {phone, otp}
    GW->>Auth: Verify OTP
    Auth->>Redis: Check OTP
    Redis-->>Auth: OTP Valid
    Auth->>Auth: Generate JWT + Refresh Token
    Auth->>Redis: Store Refresh Token
    Auth-->>App: {access_token, refresh_token}

    Note over App,Auth: Access Token: 1 hour<br/>Refresh Token: 30 days
```

### 8.3 Security Checklist

| Category | Requirement | Implementation |
|----------|-------------|----------------|
| Authentication | Phone OTP | Twilio/MSG91 integration |
| Authorization | JWT tokens | RS256 signed, 1hr expiry |
| Encryption | Data at rest | AES-256 via AWS KMS |
| Encryption | Data in transit | TLS 1.3 |
| PII Protection | Masking | Account numbers masked |
| Rate Limiting | Per user | 100 req/min |
| Audit Logging | All actions | Elasticsearch + Kibana |
| Vulnerability Scanning | Regular scans | Snyk, OWASP ZAP |

---

## 9. Payment Integration

### 9.1 UPI Integration Architecture

```mermaid
flowchart TB
    subgraph DrivoPay["DrivoPay System"]
        PS[Payment Service]
        WS[Wallet Service]
        NS[Notification Service]
    end

    subgraph PSP["Payment Service Provider"]
        RAZORPAY[Razorpay]
        PAYTM[Paytm PSP]
        CASHFREE[Cashfree]
    end

    subgraph NPCI["NPCI Infrastructure"]
        UPI[UPI Switch]
        IMPS[IMPS]
    end

    subgraph Banks["Banking Partners"]
        YES[YES Bank]
        ICICI[ICICI Bank]
        AXIS[Axis Bank]
    end

    PS <--> RAZORPAY
    PS <--> PAYTM
    PS <--> CASHFREE

    RAZORPAY <--> UPI
    PAYTM <--> UPI
    CASHFREE <--> UPI

    UPI <--> YES
    UPI <--> ICICI
    UPI <--> AXIS

    PS --> WS
    PS --> NS
```

### 9.2 Payment Flow States

```mermaid
stateDiagram-v2
    [*] --> QR_Generated
    QR_Generated --> Payment_Initiated: Customer scans QR
    QR_Generated --> Expired: Timeout (15 min)
    Payment_Initiated --> Processing: UPI request sent
    Processing --> Success: Payment confirmed
    Processing --> Failed: Payment rejected
    Success --> Settled: Wallet credited
    Failed --> [*]
    Expired --> [*]
    Settled --> [*]
```

### 9.3 PSP Integration Code Example

```typescript
// payment.service.ts
import { Injectable } from '@nestjs/common';
import { RazorpayProvider } from './providers/razorpay.provider';
import { PaymentRepository } from './payment.repository';

@Injectable()
export class PaymentService {
  constructor(
    private readonly razorpay: RazorpayProvider,
    private readonly paymentRepo: PaymentRepository,
    private readonly walletService: WalletService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async generateQRCode(userId: string, amount: number): Promise<PaymentQR> {
    // Create payment request
    const paymentRequest = await this.paymentRepo.create({
      userId,
      amount,
      status: 'pending',
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 min
    });

    // Generate UPI QR via Razorpay
    const qrData = await this.razorpay.createQRCode({
      amount: amount * 100, // Paise
      description: `Payment to Driver`,
      customer_id: userId,
      close_by: paymentRequest.expiresAt.getTime() / 1000,
      notes: {
        payment_request_id: paymentRequest.id,
      },
    });

    // Update with QR code
    await this.paymentRepo.update(paymentRequest.id, {
      qrCode: qrData.image_url,
      upiId: qrData.vpa,
    });

    return {
      id: paymentRequest.id,
      qrCode: qrData.image_url,
      upiDeepLink: this.generateUPIDeepLink(qrData.vpa, amount),
      expiresAt: paymentRequest.expiresAt,
    };
  }

  async handleWebhook(payload: RazorpayWebhookPayload): Promise<void> {
    const paymentRequestId = payload.notes.payment_request_id;

    if (payload.event === 'qr_code.credited') {
      // Credit wallet
      await this.walletService.credit(
        paymentRequestId,
        payload.amount / 100,
      );

      // Update status
      await this.paymentRepo.update(paymentRequestId, {
        status: 'success',
        paidAt: new Date(),
        upiTransactionId: payload.utr,
      });

      // Emit event for notifications
      this.eventEmitter.emit('payment.success', {
        paymentRequestId,
        amount: payload.amount / 100,
      });
    }
  }
}
```

---

## 10. DevOps & Infrastructure

### 10.1 Infrastructure Architecture

```mermaid
flowchart TB
    subgraph AWS["AWS Cloud"]
        subgraph VPC["VPC (10.0.0.0/16)"]
            subgraph Public["Public Subnets"]
                ALB[Application Load Balancer]
                NAT[NAT Gateway]
            end

            subgraph Private["Private Subnets"]
                subgraph EKS["EKS Cluster"]
                    API[API Pods]
                    WORKER[Worker Pods]
                end

                subgraph Data["Data Tier"]
                    RDS[(RDS PostgreSQL)]
                    REDIS[(ElastiCache Redis)]
                    MSK[Amazon MSK<br/>Kafka]
                end
            end
        end

        subgraph Global["Global Services"]
            CF[CloudFront CDN]
            R53[Route 53]
            WAF[AWS WAF]
            S3[(S3 Bucket)]
        end

        subgraph Monitoring["Monitoring"]
            CW[CloudWatch]
            XR[X-Ray]
        end
    end

    Users((Users)) --> CF
    CF --> WAF
    WAF --> ALB
    ALB --> API
    API --> REDIS
    API --> RDS
    API --> MSK
    WORKER --> MSK
    API --> S3

    API --> CW
    API --> XR
```

### 10.2 Kubernetes Deployment

```yaml
# k8s/base/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: drivopay-api
  labels:
    app: drivopay-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: drivopay-api
  template:
    metadata:
      labels:
        app: drivopay-api
    spec:
      containers:
        - name: api
          image: drivopay/api:latest
          ports:
            - containerPort: 3000
          env:
            - name: NODE_ENV
              value: production
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: drivopay-secrets
                  key: database-url
          resources:
            requests:
              memory: "256Mi"
              cpu: "250m"
            limits:
              memory: "512Mi"
              cpu: "500m"
          livenessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /ready
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 5
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: drivopay-api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: drivopay-api
  minReplicas: 3
  maxReplicas: 20
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```

### 10.3 CI/CD Pipeline

```mermaid
flowchart LR
    subgraph Dev["Development"]
        CODE[Code Push]
        PR[Pull Request]
    end

    subgraph CI["CI Pipeline"]
        LINT[Lint & Format]
        TEST[Unit Tests]
        BUILD[Docker Build]
        SCAN[Security Scan]
        INT[Integration Tests]
    end

    subgraph CD["CD Pipeline"]
        STAGE[Deploy Staging]
        E2E[E2E Tests]
        APPROVE[Manual Approval]
        PROD[Deploy Production]
        VERIFY[Smoke Tests]
    end

    CODE --> PR
    PR --> LINT --> TEST --> BUILD --> SCAN --> INT
    INT --> STAGE --> E2E --> APPROVE --> PROD --> VERIFY
```

### 10.4 Terraform Structure

```
drivopay-infra/
├── terraform/
│   ├── modules/
│   │   ├── vpc/
│   │   ├── eks/
│   │   ├── rds/
│   │   ├── redis/
│   │   ├── msk/
│   │   └── s3/
│   │
│   ├── environments/
│   │   ├── dev/
│   │   │   ├── main.tf
│   │   │   ├── variables.tf
│   │   │   └── terraform.tfvars
│   │   ├── staging/
│   │   └── production/
│   │
│   └── backend.tf
│
├── helm/
│   └── drivopay/
│       ├── Chart.yaml
│       ├── values.yaml
│       ├── values-dev.yaml
│       ├── values-staging.yaml
│       ├── values-production.yaml
│       └── templates/
│
└── scripts/
    ├── setup-cluster.sh
    └── rotate-secrets.sh
```

---

## 11. Monitoring & Observability

### 11.1 Observability Stack

```mermaid
flowchart TB
    subgraph Apps["Applications"]
        API[API Services]
        MOBILE[Mobile Apps]
    end

    subgraph Collection["Data Collection"]
        OTEL[OpenTelemetry Collector]
        PROM[Prometheus]
        FLUENTBIT[Fluent Bit]
    end

    subgraph Storage["Storage"]
        TEMPO[Grafana Tempo<br/>Traces]
        MIMIR[Grafana Mimir<br/>Metrics]
        LOKI[Grafana Loki<br/>Logs]
    end

    subgraph Visualization["Visualization"]
        GRAFANA[Grafana Dashboards]
        ALERT[Alertmanager]
    end

    subgraph Notification["Notifications"]
        SLACK[Slack]
        PD[PagerDuty]
    end

    API --> OTEL
    API --> FLUENTBIT
    MOBILE --> OTEL

    OTEL --> TEMPO
    OTEL --> MIMIR
    PROM --> MIMIR
    FLUENTBIT --> LOKI

    TEMPO --> GRAFANA
    MIMIR --> GRAFANA
    LOKI --> GRAFANA

    MIMIR --> ALERT
    ALERT --> SLACK
    ALERT --> PD
```

### 11.2 Key Metrics Dashboard

| Category | Metric | Alert Threshold |
|----------|--------|-----------------|
| **Business** | Transactions/sec | < 10 TPS |
| **Business** | Payment success rate | < 99% |
| **Business** | Average payout time | > 5 seconds |
| **API** | Request latency (P95) | > 200ms |
| **API** | Error rate (5xx) | > 0.1% |
| **API** | Request rate | Anomaly detection |
| **Database** | Connection pool usage | > 80% |
| **Database** | Query latency (P95) | > 100ms |
| **Infrastructure** | CPU utilization | > 80% |
| **Infrastructure** | Memory utilization | > 85% |
| **Infrastructure** | Pod restart count | > 5/hour |

### 11.3 Alerting Rules

```yaml
# prometheus-rules.yaml
groups:
  - name: drivopay-critical
    rules:
      - alert: HighPaymentFailureRate
        expr: |
          sum(rate(payment_transactions_total{status="failed"}[5m])) /
          sum(rate(payment_transactions_total[5m])) > 0.01
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "Payment failure rate above 1%"

      - alert: SlowPayoutTime
        expr: |
          histogram_quantile(0.95,
            rate(payout_duration_seconds_bucket[5m])
          ) > 5
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "P95 payout time exceeds 5 seconds"

      - alert: WalletServiceDown
        expr: up{job="wallet-service"} == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Wallet service is down"
```

---

## 12. Testing Strategy

### 12.1 Testing Pyramid

```mermaid
flowchart TB
    subgraph E2E["E2E Tests (10%)"]
        E1[User Journeys]
        E2[Payment Flows]
    end

    subgraph Integration["Integration Tests (30%)"]
        I1[API Tests]
        I2[Database Tests]
        I3[External Services]
    end

    subgraph Unit["Unit Tests (60%)"]
        U1[Services]
        U2[Controllers]
        U3[Utils]
    end

    E2E --> Integration --> Unit
```

### 12.2 Test Coverage Requirements

| Component | Min Coverage | Critical Paths |
|-----------|--------------|----------------|
| Payment Service | 90% | Payment flow, refunds |
| Wallet Service | 85% | Credit/debit, balance |
| Auth Service | 85% | OTP, JWT |
| User Service | 80% | KYC, profiles |
| API Controllers | 80% | All endpoints |

### 12.3 E2E Test Scenarios

```typescript
// e2e/payment-flow.spec.ts
describe('Payment Flow', () => {
  it('should complete full payment cycle in under 3 seconds', async () => {
    // 1. Driver generates QR
    const qr = await driverApp.generatePaymentQR(250);
    expect(qr.status).toBe('pending');

    // 2. Customer pays via UPI
    const payment = await simulateUPIPayment(qr.upiDeepLink);

    // 3. Verify webhook processing
    await waitForWebhook(qr.id);

    // 4. Verify wallet credit
    const wallet = await driverApp.getWallet();
    expect(wallet.balance).toBeGreaterThanOrEqual(250);

    // 5. Verify notification
    const notifications = await driverApp.getNotifications();
    expect(notifications[0].title).toContain('Payment received');

    // 6. Verify timing
    const duration = payment.completedAt - qr.createdAt;
    expect(duration).toBeLessThan(3000); // 3 seconds
  });
});
```

---

## 13. Implementation Roadmap

### 13.1 Phase Overview

```mermaid
gantt
    title DrivoPay Implementation Roadmap
    dateFormat  YYYY-MM-DD
    section Phase 1: Foundation
    Backend Setup & Auth          :p1a, 2026-02-10, 3w
    Database Schema               :p1b, 2026-02-10, 2w
    Mobile App Scaffold           :p1c, 2026-02-17, 2w
    CI/CD Pipeline                :p1d, 2026-02-24, 1w

    section Phase 2: Core Features
    User Service                  :p2a, 2026-03-03, 2w
    Wallet Service                :p2b, 2026-03-03, 3w
    Payment Integration           :p2c, 2026-03-17, 3w
    Mobile UI Screens             :p2d, 2026-03-10, 4w

    section Phase 3: Integration
    UPI Integration               :p3a, 2026-04-07, 3w
    Platform Connections          :p3b, 2026-04-14, 3w
    Push Notifications            :p3c, 2026-04-21, 2w

    section Phase 4: Polish
    Security Audit                :p4a, 2026-05-05, 2w
    Performance Optimization      :p4b, 2026-05-05, 2w
    Beta Testing                  :p4c, 2026-05-19, 3w

    section Phase 5: Launch
    Production Deployment         :p5a, 2026-06-09, 1w
    Monitoring Setup              :p5b, 2026-06-09, 1w
    Public Launch                 :milestone, 2026-06-16, 0d
```

### 13.2 Phase Details

#### Phase 1: Foundation (Weeks 1-4)

| Task | Deliverables |
|------|-------------|
| Backend Setup | NestJS project structure, Docker setup |
| Database Schema | PostgreSQL schema, migrations |
| Mobile Scaffold | React Native project, navigation |
| CI/CD Pipeline | GitHub Actions, automated testing |

#### Phase 2: Core Features (Weeks 5-8)

| Task | Deliverables |
|------|-------------|
| User Service | Registration, KYC, profile management |
| Wallet Service | Balance management, transaction history |
| Payment Service | QR generation, payment processing |
| Mobile UI | All core screens implemented |

#### Phase 3: Integration (Weeks 9-12)

| Task | Deliverables |
|------|-------------|
| UPI Integration | Razorpay/Paytm integration |
| Platform Connections | Uber, Ola API integrations |
| Notifications | Push notifications, SMS |

#### Phase 4: Polish (Weeks 13-16)

| Task | Deliverables |
|------|-------------|
| Security Audit | Penetration testing, vulnerability fixes |
| Performance | Load testing, optimization |
| Beta Testing | User feedback, bug fixes |

#### Phase 5: Launch (Weeks 17-18)

| Task | Deliverables |
|------|-------------|
| Production Deployment | Infrastructure, monitoring |
| Public Launch | App store releases |

### 13.3 Team Requirements

| Role | Count | Responsibility |
|------|-------|----------------|
| Backend Engineer | 2-3 | API development, integrations |
| Mobile Engineer | 2 | React Native development |
| DevOps Engineer | 1 | Infrastructure, CI/CD |
| QA Engineer | 1 | Testing, automation |
| Product Manager | 1 | Requirements, prioritization |
| Designer | 1 | UI/UX design |

---

## Appendix

### A. Environment Variables

```bash
# Backend (.env)
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:pass@host:5432/drivopay
REDIS_URL=redis://host:6379
KAFKA_BROKERS=broker1:9092,broker2:9092

# Auth
JWT_SECRET=your-jwt-secret
JWT_EXPIRY=3600
OTP_EXPIRY=300

# Payment Providers
RAZORPAY_KEY_ID=rzp_live_xxx
RAZORPAY_KEY_SECRET=xxx
RAZORPAY_WEBHOOK_SECRET=xxx

# SMS
MSG91_AUTH_KEY=xxx
MSG91_SENDER_ID=DRIVOP

# Push Notifications
FCM_SERVER_KEY=xxx
APNS_KEY_ID=xxx
APNS_TEAM_ID=xxx
```

### B. API Rate Limits

| Endpoint Category | Rate Limit | Window |
|-------------------|------------|--------|
| Authentication | 10 req | 1 min |
| Payment QR Generation | 30 req | 1 min |
| Wallet Operations | 60 req | 1 min |
| General API | 100 req | 1 min |

### C. Compliance Requirements

- **PCI-DSS**: Level 1 compliance for payment processing
- **RBI Guidelines**: Compliance with prepaid payment instrument regulations
- **NPCI**: UPI merchant onboarding requirements
- **Data Privacy**: DPDP Act 2023 compliance

---

## Quick Start Commands

```bash
# Create repositories
gh repo create drivopay-backend --private
gh repo create drivopay-mobile --private
gh repo create drivopay-infra --private

# Clone and setup backend
git clone https://github.com/your-org/drivopay-backend.git
cd drivopay-backend
npm init -y
npx @nestjs/cli new . --skip-git

# Clone and setup mobile
git clone https://github.com/your-org/drivopay-mobile.git
cd drivopay-mobile
npx react-native init DrivoPay --template react-native-template-typescript
```

---

**Document Version**: 1.0.0
**Last Updated**: February 3, 2026
**Author**: DrivoPay Engineering Team
