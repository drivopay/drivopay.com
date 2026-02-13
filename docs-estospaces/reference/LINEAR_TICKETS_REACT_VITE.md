# EstoSpaces - Linear Tickets (React + Vite)

> **Project**: EstoSpaces Property Management Platform
> **Tech Stack**: React 19 + Vite + TypeScript
> **Strategy**: Keep existing React + Vite, migrate backend to microservices
> **Document Version**: 2.0
> **Last Updated**: February 13, 2026

---

## Table of Contents

1. [Epic 1: Architecture & Infrastructure](#epic-1-architecture--infrastructure)
2. [Epic 2: Backend Microservices Migration](#epic-2-backend-microservices-migration)
3. [Epic 3: Frontend Refactoring & Integration](#epic-3-frontend-refactoring--integration)
4. [Epic 4: Database & Data Layer](#epic-4-database--data-layer)
5. [Epic 5: Mobile App Development](#epic-5-mobile-app-development)
6. [Epic 6: Current System Bug Fixes](#epic-6-current-system-bug-fixes)
7. [Epic 7: Feature Enhancements](#epic-7-feature-enhancements)
8. [Epic 8: DevOps & Deployment](#epic-8-devops--deployment)
9. [Epic 9: Testing & Quality Assurance](#epic-9-testing--quality-assurance)
10. [Epic 10: Documentation & Knowledge Transfer](#epic-10-documentation--knowledge-transfer)

---

## Epic 1: Architecture & Infrastructure

### 🎯 EST-001: Set up monorepo structure with workspaces
**Priority**: 🔴 Critical
**Status**: To Do
**Assignee**: Backend Team Lead
**Story Points**: 8
**Labels**: `architecture`, `setup`, `foundation`

**Description**:
Create a monorepo structure to house all microservices and applications using pnpm workspaces. This is the foundation for the entire migration.

**Acceptance Criteria**:
- [ ] Set up pnpm workspaces in root directory
- [ ] Create workspace directories: `services/`, `apps/`, `packages/`, `infra/`
- [ ] Configure workspace dependencies
- [ ] Set up shared TypeScript config
- [ ] Set up shared ESLint/Prettier configs
- [ ] Document workspace structure in README
- [ ] Create initial package.json scripts for workspace management

**Technical Details**:
```
estospaces-monorepo/
├── apps/
│   ├── web/              # Existing React + Vite app
│   ├── mobile/           # React Native app
│   └── admin-portal/     # Admin dashboard (can be separate or same as web)
├── services/
│   ├── auth-service/
│   ├── user-service/
│   ├── property-service/
│   ├── media-service/
│   ├── messaging-service/
│   ├── notification-service/
│   ├── search-service/
│   └── payment-service/
├── packages/
│   ├── ui/              # Shared UI components
│   ├── utils/           # Shared utilities
│   ├── types/           # Shared TypeScript types
│   └── api-client/      # Shared API client library
└── infra/
    ├── docker/
    └── kubernetes/
```

**Dependencies**: None
**Blocks**: EST-002, EST-003, EST-004

---

### 🎯 EST-002: Docker containerization setup
**Priority**: 🔴 Critical
**Status**: To Do
**Assignee**: DevOps Engineer
**Story Points**: 5
**Labels**: `infrastructure`, `docker`, `devops`

**Description**:
Create Dockerfiles and docker-compose configuration for all services and applications.

**Acceptance Criteria**:
- [ ] Create multi-stage Dockerfile for each Go service
- [ ] Create Dockerfile for React + Vite app (nginx)
- [ ] Create Dockerfile for mobile app build
- [ ] Create docker-compose.yml for local development
- [ ] Create docker-compose.prod.yml for production
- [ ] Include PostgreSQL, Redis, and NATS containers
- [ ] Configure health checks for all services
- [ ] Document Docker setup in README

**Technical Details**:
- Use Alpine-based images for smaller size
- Multi-stage builds for Go services (builder + runtime)
- Vite build output served via nginx
- Include hot-reload for development

**Dependencies**: EST-001
**Blocks**: EST-008, EST-015

---

### 🎯 EST-003: Kubernetes cluster setup and configuration
**Priority**: 🟠 High
**Status**: To Do
**Assignee**: DevOps Engineer
**Story Points**: 13
**Labels**: `infrastructure`, `kubernetes`, `devops`

**Description**:
Set up Kubernetes cluster with all necessary configurations for running microservices in production.

**Acceptance Criteria**:
- [ ] Create Kubernetes manifests for all services (Deployment, Service, ConfigMap, Secret)
- [ ] Set up Ingress controller (NGINX)
- [ ] Configure HPA (Horizontal Pod Autoscaler) for each service
- [ ] Set up persistent volumes for databases
- [ ] Configure service mesh (Istio) for service-to-service communication
- [ ] Set up monitoring with Prometheus + Grafana
- [ ] Configure logging with ELK stack
- [ ] Document K8s architecture and deployment process

**Technical Details**:
- Use Helm charts for service deployment
- Implement rolling updates with zero downtime
- Configure resource limits and requests for each pod
- Set up network policies for security

**Dependencies**: EST-001, EST-002
**Blocks**: EST-050

---

### 🎯 EST-004: API Gateway setup with Kong or NGINX
**Priority**: 🔴 Critical
**Status**: To Do
**Assignee**: Backend Team Lead
**Story Points**: 8
**Labels**: `infrastructure`, `api-gateway`, `backend`

**Description**:
Set up API Gateway as the single entry point for all microservices with routing, authentication, rate limiting, and monitoring.

**Acceptance Criteria**:
- [ ] Install and configure Kong or NGINX as API Gateway
- [ ] Set up service routing to microservices
- [ ] Implement JWT authentication middleware
- [ ] Configure rate limiting per endpoint
- [ ] Set up CORS policies
- [ ] Implement request/response logging
- [ ] Configure health check endpoints
- [ ] Document API Gateway architecture and configuration

**Technical Details**:
- Routes: `/api/v1/auth/*`, `/api/v1/users/*`, `/api/v1/properties/*`, etc.
- Rate limiting: 100 requests/minute per user
- JWT validation on protected routes
- Automatic service discovery

**Dependencies**: EST-001
**Blocks**: EST-010, EST-011, EST-012

---

### 🎯 EST-005: Set up PostgreSQL with connection pooling
**Priority**: 🔴 Critical
**Status**: To Do
**Assignee**: Database Engineer
**Story Points**: 5
**Labels**: `database`, `infrastructure`, `postgresql`

**Description**:
Set up PostgreSQL database with pgBouncer for connection pooling and replication for high availability.

**Acceptance Criteria**:
- [ ] Deploy PostgreSQL 16+ instance
- [ ] Configure pgBouncer for connection pooling
- [ ] Set up read replicas for scalability
- [ ] Configure automated backups (daily)
- [ ] Set up point-in-time recovery (PITR)
- [ ] Implement database monitoring
- [ ] Create database migration strategy
- [ ] Document database architecture

**Technical Details**:
- Connection pool size: 100 connections
- Read replica lag: <100ms
- Backup retention: 30 days
- Use separate databases for each service (optional)

**Dependencies**: EST-001, EST-002
**Blocks**: EST-010, EST-011, EST-012

---

### 🎯 EST-006: Redis cluster setup for caching and sessions
**Priority**: 🟠 High
**Status**: To Do
**Assignee**: DevOps Engineer
**Story Points**: 5
**Labels**: `infrastructure`, `redis`, `caching`

**Description**:
Set up Redis cluster for distributed caching, session management, and rate limiting.

**Acceptance Criteria**:
- [ ] Deploy Redis 7+ cluster with 3 master + 3 replica nodes
- [ ] Configure Redis persistence (AOF + RDB)
- [ ] Set up Redis Sentinel for high availability
- [ ] Configure eviction policies (LRU)
- [ ] Implement connection pooling
- [ ] Set up monitoring and alerting
- [ ] Document caching strategy

**Technical Details**:
- Cache TTL: 5 minutes for API responses, 24 hours for user sessions
- Max memory: 2GB per node
- Eviction policy: allkeys-lru

**Dependencies**: EST-001, EST-002
**Blocks**: EST-010, EST-011, EST-012

---

### 🎯 EST-007: NATS message queue setup
**Priority**: 🟠 High
**Status**: To Do
**Assignee**: Backend Team Lead
**Story Points**: 5
**Labels**: `infrastructure`, `messaging`, `nats`

**Description**:
Set up NATS messaging system for inter-service communication and event-driven architecture.

**Acceptance Criteria**:
- [ ] Deploy NATS cluster
- [ ] Configure JetStream for persistence
- [ ] Set up topics/subjects for each event type
- [ ] Implement dead letter queue
- [ ] Configure monitoring and logging
- [ ] Create event schema documentation
- [ ] Implement retry logic for failed messages

**Event Topics**:
- `user.created`, `user.updated`, `user.deleted`
- `property.created`, `property.updated`, `property.deleted`
- `booking.created`, `booking.confirmed`, `booking.cancelled`
- `notification.email`, `notification.push`, `notification.sms`

**Dependencies**: EST-001, EST-002
**Blocks**: EST-013, EST-014, EST-016

---

### 🎯 EST-008: S3-compatible storage setup (AWS S3 or MinIO)
**Priority**: 🟠 High
**Status**: To Do
**Assignee**: DevOps Engineer
**Story Points**: 3
**Labels**: `infrastructure`, `storage`, `s3`

**Description**:
Set up S3-compatible object storage for property images, videos, documents, and user uploads.

**Acceptance Criteria**:
- [ ] Deploy MinIO or configure AWS S3
- [ ] Create buckets: `property-images`, `property-videos`, `user-documents`, `user-avatars`
- [ ] Configure bucket policies and CORS
- [ ] Set up CDN (CloudFront or similar)
- [ ] Implement presigned URL generation
- [ ] Configure automatic image optimization
- [ ] Document storage architecture

**Technical Details**:
- Image optimization: WebP format, multiple sizes (thumbnail, medium, large)
- Video transcoding: HLS streaming format
- CDN caching: 1 year for images, 7 days for videos

**Dependencies**: EST-002
**Blocks**: EST-013

---

---

## Epic 2: Backend Microservices Migration

### 🎯 EST-010: Auth Service (Go + Fiber)
**Priority**: 🔴 Critical
**Status**: To Do
**Assignee**: Backend Developer 1
**Story Points**: 13
**Labels**: `backend`, `microservice`, `auth`, `go`

**Description**:
Build authentication and authorization service in Go using Fiber framework. Handles user registration, login, JWT tokens, and password management.

**Acceptance Criteria**:
- [ ] Initialize Go project with Fiber framework
- [ ] Implement user registration endpoint
- [ ] Implement login endpoint with JWT generation
- [ ] Implement password reset flow
- [ ] Implement email verification
- [ ] Implement refresh token mechanism
- [ ] Implement role-based access control (RBAC)
- [ ] Add input validation with validator
- [ ] Write unit tests (80%+ coverage)
- [ ] Create API documentation (OpenAPI/Swagger)

**API Endpoints**:
```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh
POST   /api/v1/auth/logout
POST   /api/v1/auth/forgot-password
POST   /api/v1/auth/reset-password
POST   /api/v1/auth/verify-email
GET    /api/v1/auth/me
```

**Technical Details**:
- JWT expiry: 15 minutes (access token), 7 days (refresh token)
- Password hashing: bcrypt with cost 12
- Rate limiting: 5 login attempts per 15 minutes

**Dependencies**: EST-004, EST-005, EST-006
**Blocks**: EST-011, EST-012

---

### 🎯 EST-011: User Service (Go + Fiber)
**Priority**: 🔴 Critical
**Status**: To Do
**Assignee**: Backend Developer 1
**Story Points**: 13
**Labels**: `backend`, `microservice`, `user`, `go`

**Description**:
Build user management service for user profiles, preferences, verification status, and user-related operations.

**Acceptance Criteria**:
- [ ] Initialize Go project with Fiber framework
- [ ] Implement user CRUD operations
- [ ] Implement user profile management
- [ ] Implement user verification system (email, phone, identity, address)
- [ ] Implement user preferences management
- [ ] Implement saved properties management
- [ ] Implement user search and filtering
- [ ] Add database migrations
- [ ] Write unit tests (80%+ coverage)
- [ ] Create API documentation

**API Endpoints**:
```
GET    /api/v1/users/:id
PUT    /api/v1/users/:id
DELETE /api/v1/users/:id
GET    /api/v1/users/:id/profile
PUT    /api/v1/users/:id/profile
GET    /api/v1/users/:id/saved-properties
POST   /api/v1/users/:id/saved-properties
DELETE /api/v1/users/:id/saved-properties/:propertyId
POST   /api/v1/users/:id/verify-email
POST   /api/v1/users/:id/verify-phone
POST   /api/v1/users/:id/verify-identity
```

**Dependencies**: EST-004, EST-005, EST-010
**Blocks**: EST-012, EST-014

---

### 🎯 EST-012: Property Service (Go + Fiber)
**Priority**: 🔴 Critical
**Status**: To Do
**Assignee**: Backend Developer 2
**Story Points**: 21
**Labels**: `backend`, `microservice`, `property`, `go`

**Description**:
Build property management service for property listings, CRUD operations, search, filtering, and property analytics.

**Acceptance Criteria**:
- [ ] Initialize Go project with Fiber framework
- [ ] Implement property CRUD operations
- [ ] Implement property search with filters (location, price, beds, baths, type)
- [ ] Implement property discovery sections (most viewed, trending, recently added, high demand)
- [ ] Implement property analytics (views, saves, applications)
- [ ] Implement property status management (available, pending, sold/rented)
- [ ] Implement pagination for property lists
- [ ] Add database migrations
- [ ] Write unit tests (80%+ coverage)
- [ ] Create API documentation

**API Endpoints**:
```
GET    /api/v1/properties
POST   /api/v1/properties
GET    /api/v1/properties/:id
PUT    /api/v1/properties/:id
DELETE /api/v1/properties/:id
GET    /api/v1/properties/search
GET    /api/v1/properties/sections/:section
GET    /api/v1/properties/:id/analytics
POST   /api/v1/properties/:id/view
GET    /api/v1/properties/agent/:agentId
```

**Technical Details**:
- Search indexing: Elasticsearch integration (Phase 2)
- Property images: Store in S3, return CDN URLs
- Default pagination: 20 properties per page

**Dependencies**: EST-004, EST-005, EST-008, EST-010
**Blocks**: EST-013, EST-014

---

### 🎯 EST-013: Media Service (Go + Fiber)
**Priority**: 🟠 High
**Status**: To Do
**Assignee**: Backend Developer 2
**Story Points**: 13
**Labels**: `backend`, `microservice`, `media`, `go`

**Description**:
Build media management service for handling property images, videos, documents, and user uploads with optimization and CDN delivery.

**Acceptance Criteria**:
- [ ] Initialize Go project with Fiber framework
- [ ] Implement image upload with automatic optimization (WebP conversion, resizing)
- [ ] Implement video upload with transcoding (HLS)
- [ ] Implement document upload (PDF, DOCX)
- [ ] Generate presigned URLs for secure uploads
- [ ] Implement CDN URL generation
- [ ] Implement media deletion
- [ ] Add virus scanning for uploads
- [ ] Write unit tests (80%+ coverage)
- [ ] Create API documentation

**API Endpoints**:
```
POST   /api/v1/media/upload/image
POST   /api/v1/media/upload/video
POST   /api/v1/media/upload/document
GET    /api/v1/media/:id
DELETE /api/v1/media/:id
POST   /api/v1/media/presigned-url
```

**Technical Details**:
- Image sizes: thumbnail (200x150), medium (800x600), large (1600x1200)
- Video transcoding: HLS with multiple bitrates (360p, 720p, 1080p)
- Max file sizes: Images 10MB, Videos 100MB, Documents 5MB

**Dependencies**: EST-004, EST-005, EST-008, EST-012

---

### 🎯 EST-014: Messaging Service (Go + Fiber)
**Priority**: 🟠 High
**Status**: To Do
**Assignee**: Backend Developer 3
**Story Points**: 13
**Labels**: `backend`, `microservice`, `messaging`, `go`

**Description**:
Build real-time messaging service for user-to-manager, user-to-broker, and user-to-support communication with WebSocket support.

**Acceptance Criteria**:
- [ ] Initialize Go project with Fiber framework
- [ ] Implement WebSocket connection handling
- [ ] Implement message CRUD operations
- [ ] Implement conversation threads
- [ ] Implement unread message count
- [ ] Implement message search
- [ ] Implement typing indicators
- [ ] Implement online/offline status
- [ ] Publish events to NATS for notifications
- [ ] Write unit tests (80%+ coverage)
- [ ] Create API documentation

**API Endpoints**:
```
GET    /api/v1/messages/conversations
GET    /api/v1/messages/conversations/:id
POST   /api/v1/messages/conversations/:id/messages
GET    /api/v1/messages/conversations/:id/messages
DELETE /api/v1/messages/:id
PUT    /api/v1/messages/:id/read
WS     /api/v1/messages/ws
```

**Technical Details**:
- WebSocket authentication via JWT
- Message history: Load last 50 messages, paginate for older
- Typing indicator timeout: 3 seconds

**Dependencies**: EST-004, EST-005, EST-007, EST-011

---

### 🎯 EST-015: Notification Service (Go + Fiber)
**Priority**: 🟠 High
**Status**: To Do
**Assignee**: Backend Developer 3
**Story Points**: 13
**Labels**: `backend`, `microservice`, `notification`, `go`

**Description**:
Build notification service for email, SMS, push notifications, and in-app notifications. Listens to NATS events and sends notifications.

**Acceptance Criteria**:
- [ ] Initialize Go project with Fiber framework
- [ ] Implement email notifications (SendGrid or AWS SES)
- [ ] Implement SMS notifications (Twilio)
- [ ] Implement push notifications (Firebase Cloud Messaging)
- [ ] Implement in-app notification storage
- [ ] Subscribe to NATS topics for event-driven notifications
- [ ] Implement notification preferences
- [ ] Implement notification templates
- [ ] Add retry logic for failed notifications
- [ ] Write unit tests (80%+ coverage)
- [ ] Create API documentation

**API Endpoints**:
```
GET    /api/v1/notifications
PUT    /api/v1/notifications/:id/read
PUT    /api/v1/notifications/mark-all-read
GET    /api/v1/notifications/preferences
PUT    /api/v1/notifications/preferences
```

**Notification Types**:
- `appointment_approved`, `appointment_rejected`
- `application_update`, `document_verified`
- `message_received`, `property_match`
- `payment_due`, `payment_received`

**Dependencies**: EST-004, EST-005, EST-007, EST-011

---

### 🎯 EST-016: Search Service (Elasticsearch)
**Priority**: 🟡 Medium
**Status**: To Do
**Assignee**: Backend Developer 2
**Story Points**: 13
**Labels**: `backend`, `microservice`, `search`, `elasticsearch`

**Description**:
Build search service using Elasticsearch for full-text property search, faceted search, and location-based search.

**Acceptance Criteria**:
- [ ] Set up Elasticsearch cluster
- [ ] Create property index with mappings
- [ ] Implement property indexing on create/update (via NATS)
- [ ] Implement full-text search
- [ ] Implement faceted search (filters)
- [ ] Implement location-based search (geo queries)
- [ ] Implement autocomplete/suggestions
- [ ] Implement search analytics
- [ ] Write unit tests (80%+ coverage)
- [ ] Create API documentation

**API Endpoints**:
```
GET    /api/v1/search/properties
GET    /api/v1/search/suggestions
GET    /api/v1/search/facets
```

**Technical Details**:
- Index properties on creation/update via NATS events
- Geo search radius: 5km default
- Autocomplete: Based on property title, address, postcode

**Dependencies**: EST-004, EST-005, EST-007, EST-012

---

### 🎯 EST-017: Payment Service (Go + Fiber + Stripe)
**Priority**: 🟡 Medium
**Status**: To Do
**Assignee**: Backend Developer 4
**Story Points**: 21
**Labels**: `backend`, `microservice`, `payment`, `go`, `stripe`

**Description**:
Build payment service for handling rent payments, deposits, utility payments, and payment history with Stripe integration.

**Acceptance Criteria**:
- [ ] Initialize Go project with Fiber framework
- [ ] Integrate Stripe SDK
- [ ] Implement payment intent creation
- [ ] Implement payment confirmation
- [ ] Implement refund processing
- [ ] Implement payment history
- [ ] Implement webhook handling for Stripe events
- [ ] Implement subscription management (for manager plans)
- [ ] Implement invoice generation
- [ ] Write unit tests (80%+ coverage)
- [ ] Create API documentation

**API Endpoints**:
```
POST   /api/v1/payments/create-intent
POST   /api/v1/payments/confirm
POST   /api/v1/payments/refund
GET    /api/v1/payments/history
GET    /api/v1/payments/invoices
POST   /api/v1/payments/subscriptions
POST   /api/v1/payments/webhook
```

**Dependencies**: EST-004, EST-005, EST-011

---

### 🎯 EST-018: Booking Service (Go + Fiber)
**Priority**: 🟠 High
**Status**: To Do
**Assignee**: Backend Developer 4
**Story Points**: 13
**Labels**: `backend`, `microservice`, `booking`, `go`

**Description**:
Build booking service for property viewings, appointments, and application management.

**Acceptance Criteria**:
- [ ] Initialize Go project with Fiber framework
- [ ] Implement viewing/appointment creation
- [ ] Implement viewing/appointment management (update status, reschedule, cancel)
- [ ] Implement viewing availability check
- [ ] Implement application submission
- [ ] Implement application status tracking
- [ ] Implement manager approval/rejection workflow
- [ ] Publish events to NATS for notifications
- [ ] Write unit tests (80%+ coverage)
- [ ] Create API documentation

**API Endpoints**:
```
POST   /api/v1/bookings/viewings
GET    /api/v1/bookings/viewings/:id
PUT    /api/v1/bookings/viewings/:id
DELETE /api/v1/bookings/viewings/:id
POST   /api/v1/bookings/applications
GET    /api/v1/bookings/applications/:id
PUT    /api/v1/bookings/applications/:id/status
GET    /api/v1/bookings/availability
```

**Dependencies**: EST-004, EST-005, EST-007, EST-011, EST-012

---

---

## Epic 3: Frontend Refactoring & Integration

### 🎯 EST-020: Shared API Client Library with Axios + React Query
**Priority**: 🔴 Critical
**Status**: To Do
**Assignee**: Frontend Team Lead
**Story Points**: 8
**Labels**: `frontend`, `api-client`, `react-query`

**Description**:
Create a shared API client library with Axios and React Query for type-safe API calls to microservices from the React app.

**Acceptance Criteria**:
- [ ] Create `packages/api-client` workspace
- [ ] Set up Axios with base configuration (base URL, interceptors)
- [ ] Set up React Query (QueryClient, default options)
- [ ] Create type-safe API client functions for each service
- [ ] Implement JWT token management in Axios interceptors
- [ ] Implement automatic token refresh
- [ ] Implement error handling and retry logic
- [ ] Create custom React Query hooks for each API endpoint
- [ ] Write unit tests for API client
- [ ] Document API client usage

**Technical Details**:
```typescript
// packages/api-client/src/clients/auth.ts
export const authClient = {
  login: (credentials: LoginDto) => axios.post('/api/v1/auth/login', credentials),
  register: (data: RegisterDto) => axios.post('/api/v1/auth/register', data),
  // ...
};

// packages/api-client/src/hooks/useAuth.ts
export const useLogin = () => {
  return useMutation({
    mutationFn: authClient.login,
    onSuccess: (data) => {
      // Store tokens
    }
  });
};
```

**Dependencies**: EST-001
**Blocks**: EST-021, EST-022, EST-023, EST-024, EST-025

---

### 🎯 EST-021: Migrate to 100% TypeScript (from mixed JS/TS)
**Priority**: 🔴 Critical
**Status**: To Do
**Assignee**: Frontend Developer 1
**Story Points**: 13
**Labels**: `frontend`, `typescript`, `refactoring`

**Description**:
Convert all JavaScript (.js, .jsx) files to TypeScript (.ts, .tsx) for type safety and better developer experience.

**Acceptance Criteria**:
- [ ] Convert all ~45 JSX files to TSX
- [ ] Convert all ~20 JS utility files to TS
- [ ] Add proper TypeScript types for all components
- [ ] Add proper TypeScript types for all contexts
- [ ] Add proper TypeScript types for all services
- [ ] Create shared types in `packages/types`
- [ ] Fix all TypeScript errors
- [ ] Enable strict mode in tsconfig.json
- [ ] Update build pipeline to use TypeScript
- [ ] Document migration process

**Current Files to Convert**:
- `src/components/Dashboard/*.jsx` → `.tsx`
- `src/pages/Dashboard*.jsx` → `.tsx`
- `src/contexts/*.jsx` → `.tsx`
- `src/services/*.js` → `.ts`
- `src/utils/*.js` → `.ts`

**Dependencies**: EST-001, EST-020
**Blocks**: EST-022, EST-023, EST-024

---

### 🎯 EST-022: Replace Context API with Zustand for client state
**Priority**: 🟠 High
**Status**: To Do
**Assignee**: Frontend Developer 1
**Story Points**: 8
**Labels**: `frontend`, `state-management`, `zustand`

**Description**:
Replace React Context API with Zustand for better performance and simpler client-side state management.

**Acceptance Criteria**:
- [ ] Install Zustand
- [ ] Create Zustand store for auth state
- [ ] Create Zustand store for theme state
- [ ] Create Zustand store for UI state (modals, drawers)
- [ ] Migrate AuthContext to Zustand
- [ ] Migrate ThemeContext to Zustand
- [ ] Remove old Context providers
- [ ] Update all components to use Zustand stores
- [ ] Test all state management functionality
- [ ] Document Zustand stores

**Example**:
```typescript
// stores/authStore.ts
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
```

**Dependencies**: EST-021
**Related**: EST-023

---

### 🎯 EST-023: Integrate React Query for server state management
**Priority**: 🔴 Critical
**Status**: To Do
**Assignee**: Frontend Developer 1
**Story Points**: 13
**Labels**: `frontend`, `react-query`, `server-state`

**Description**:
Replace manual data fetching and caching with React Query for automatic caching, background refetching, and optimistic updates.

**Acceptance Criteria**:
- [ ] Install TanStack Query (React Query)
- [ ] Set up QueryClientProvider with default options
- [ ] Migrate PropertyContext to React Query hooks
- [ ] Migrate SavedPropertiesContext to React Query hooks
- [ ] Migrate ApplicationsContext to React Query hooks
- [ ] Migrate NotificationsContext to React Query hooks
- [ ] Implement optimistic updates for mutations
- [ ] Implement cache invalidation strategies
- [ ] Remove old context providers
- [ ] Test all data fetching and mutations
- [ ] Document React Query usage

**Example**:
```typescript
// hooks/useProperties.ts
export const useProperties = (filters: PropertyFilters) => {
  return useQuery({
    queryKey: ['properties', filters],
    queryFn: () => propertyClient.getProperties(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateProperty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: propertyClient.createProperty,
    onSuccess: () => {
      queryClient.invalidateQueries(['properties']);
    },
  });
};
```

**Dependencies**: EST-020, EST-021, EST-010, EST-011, EST-012
**Blocks**: EST-024, EST-025

---

### 🎯 EST-024: Connect User Dashboard to new microservices
**Priority**: 🔴 Critical
**Status**: To Do
**Assignee**: Frontend Developer 2
**Story Points**: 13
**Labels**: `frontend`, `integration`, `user-dashboard`

**Description**:
Update all User Dashboard pages to use the new API client and microservices instead of Supabase.

**Acceptance Criteria**:
- [ ] Update Property Discovery page to use Property Service API
- [ ] Update Property Detail page to use Property Service API
- [ ] Update Saved Properties page to use User Service API
- [ ] Update Applications page to use Booking Service API
- [ ] Update Viewings page to use Booking Service API
- [ ] Update Messages page to use Messaging Service API (WebSocket)
- [ ] Update Notifications to use Notification Service API
- [ ] Update Profile page to use User Service API
- [ ] Remove all Supabase client usage from User Dashboard
- [ ] Test all User Dashboard functionality
- [ ] Document API integration

**Pages to Update**:
- `src/pages/DashboardDiscover.jsx`
- `src/pages/DashboardLocationBased.jsx`
- `src/pages/DashboardSavedProperties.jsx`
- `src/pages/DashboardApplications.jsx`
- `src/pages/DashboardViewings.jsx`
- `src/pages/DashboardMessages.jsx`
- `src/pages/DashboardProfile.jsx`
- `src/pages/DashboardPayments.jsx`

**Dependencies**: EST-020, EST-023, EST-010, EST-011, EST-012, EST-014, EST-015, EST-018
**Related**: EST-025

---

### 🎯 EST-025: Connect Manager Dashboard to new microservices
**Priority**: 🔴 Critical
**Status**: To Do
**Assignee**: Frontend Developer 3
**Story Points**: 13
**Labels**: `frontend`, `integration`, `manager-dashboard`

**Description**:
Update all Manager Dashboard pages to use the new API client and microservices instead of Supabase.

**Acceptance Criteria**:
- [ ] Update Main Dashboard to use Property Service and Analytics APIs
- [ ] Update Properties List to use Property Service API
- [ ] Update Add/Edit Property to use Property Service and Media Service APIs
- [ ] Update Leads & Clients to use User Service API
- [ ] Update Applications to use Booking Service API
- [ ] Update Appointments to use Booking Service API
- [ ] Update Messages to use Messaging Service API
- [ ] Update Analytics to use Property Service API
- [ ] Update Billing to use Payment Service API
- [ ] Remove all Supabase client usage from Manager Dashboard
- [ ] Test all Manager Dashboard functionality
- [ ] Document API integration

**Pages to Update**:
- `src/pages/Dashboard.tsx`
- `src/pages/PropertiesList.tsx`
- `src/pages/AddProperty.tsx`
- `src/pages/PropertyView.tsx`
- `src/pages/LeadsClients.tsx`
- `src/pages/Application.tsx`
- `src/pages/Appointment.tsx`
- `src/pages/Messages.tsx`
- `src/pages/Analytics.tsx`
- `src/pages/Billing.tsx`

**Dependencies**: EST-020, EST-023, EST-010, EST-011, EST-012, EST-013, EST-014, EST-018
**Related**: EST-024

---

### 🎯 EST-026: Connect Admin Dashboard to new microservices
**Priority**: 🟠 High
**Status**: To Do
**Assignee**: Frontend Developer 4
**Story Points**: 8
**Labels**: `frontend`, `integration`, `admin-dashboard`

**Description**:
Update Admin Dashboard pages to use the new API client and microservices instead of Supabase.

**Acceptance Criteria**:
- [ ] Update Verification Dashboard to use User Service API
- [ ] Update Chat Dashboard to use Messaging Service API
- [ ] Update Property Management to use Property Service API
- [ ] Update Analytics to use aggregated APIs
- [ ] Remove all Supabase client usage from Admin Dashboard
- [ ] Test all Admin Dashboard functionality
- [ ] Document API integration

**Pages to Update**:
- `src/pages/AdminVerificationDashboard.tsx`
- `src/pages/AdminChatDashboard.jsx`
- `src/pages/AdminPropertyManagement.jsx`
- `src/pages/UserAnalytics.jsx`

**Dependencies**: EST-020, EST-023, EST-011, EST-012, EST-014

---

### 🎯 EST-027: Implement real-time WebSocket for messaging
**Priority**: 🟠 High
**Status**: To Do
**Assignee**: Frontend Developer 2
**Story Points**: 8
**Labels**: `frontend`, `websocket`, `real-time`

**Description**:
Implement WebSocket connection to Messaging Service for real-time messaging across all dashboards.

**Acceptance Criteria**:
- [ ] Create WebSocket client with reconnection logic
- [ ] Implement JWT authentication for WebSocket
- [ ] Implement message sending via WebSocket
- [ ] Implement message receiving via WebSocket
- [ ] Implement typing indicators
- [ ] Implement online/offline status
- [ ] Handle WebSocket errors and reconnection
- [ ] Update Messages component to use WebSocket
- [ ] Test real-time messaging functionality
- [ ] Document WebSocket integration

**Technical Details**:
```typescript
// lib/websocket/messagingClient.ts
export class MessagingWebSocketClient {
  connect(token: string): void;
  disconnect(): void;
  sendMessage(conversationId: string, message: string): void;
  onMessage(callback: (message: Message) => void): void;
  onTyping(callback: (userId: string) => void): void;
}
```

**Dependencies**: EST-020, EST-014, EST-024, EST-025

---

### 🎯 EST-028: Implement code splitting and lazy loading
**Priority**: 🟡 Medium
**Status**: To Do
**Assignee**: Frontend Developer 1
**Story Points**: 5
**Labels**: `frontend`, `performance`, `optimization`

**Description**:
Implement code splitting and lazy loading for routes and heavy components to improve initial load time.

**Acceptance Criteria**:
- [ ] Implement lazy loading for all routes
- [ ] Implement lazy loading for heavy components (Map, Chart, VirtualTour)
- [ ] Add loading fallbacks (Suspense with skeleton)
- [ ] Analyze bundle size with rollup-plugin-visualizer
- [ ] Reduce initial bundle size by 30%+
- [ ] Test lazy loading functionality
- [ ] Document code splitting strategy

**Example**:
```typescript
// App.tsx
const DashboardDiscover = lazy(() => import('./pages/DashboardDiscover'));
const PropertyDetail = lazy(() => import('./pages/PropertyDetail'));

// Usage
<Suspense fallback={<LoadingSkeleton />}>
  <DashboardDiscover />
</Suspense>
```

**Dependencies**: EST-021

---

### 🎯 EST-029: Add React Hook Form for all forms
**Priority**: 🟠 High
**Status**: To Do
**Assignee**: Frontend Developer 3
**Story Points**: 8
**Labels**: `frontend`, `forms`, `validation`

**Description**:
Replace manual form handling with React Hook Form and Zod for better form validation and error handling.

**Acceptance Criteria**:
- [ ] Install React Hook Form and Zod
- [ ] Create Zod schemas for all forms
- [ ] Update Login/Register forms to use React Hook Form
- [ ] Update Add/Edit Property forms to use React Hook Form
- [ ] Update Profile form to use React Hook Form
- [ ] Update Application form to use React Hook Form
- [ ] Update all other forms to use React Hook Form
- [ ] Implement proper error messages
- [ ] Test all form validation
- [ ] Document form patterns

**Example**:
```typescript
// schemas/auth.ts
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// components/LoginForm.tsx
const form = useForm<LoginFormData>({
  resolver: zodResolver(loginSchema),
});
```

**Dependencies**: EST-021

---

### 🎯 EST-030: Optimize Vite build configuration
**Priority**: 🟡 Medium
**Status**: To Do
**Assignee**: Frontend Team Lead
**Story Points**: 3
**Labels**: `frontend`, `vite`, `optimization`

**Description**:
Optimize Vite build configuration for better production build performance and smaller bundle size.

**Acceptance Criteria**:
- [ ] Enable tree-shaking
- [ ] Configure chunk splitting strategy
- [ ] Optimize CSS (PostCSS, PurgeCSS)
- [ ] Enable Brotli compression
- [ ] Configure asset optimization (images, fonts)
- [ ] Set up source maps for production debugging
- [ ] Test production build performance
- [ ] Document build optimizations

**vite.config.ts**:
```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react', 'framer-motion'],
          maps: ['leaflet', 'react-leaflet'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
```

**Dependencies**: EST-001, EST-021

---

### 🎯 EST-031: Remove Supabase dependencies completely
**Priority**: 🟠 High
**Status**: To Do
**Assignee**: Frontend Team Lead
**Story Points**: 5
**Labels**: `frontend`, `cleanup`, `supabase`

**Description**:
Remove all Supabase client code, dependencies, and environment variables after migration to microservices is complete.

**Acceptance Criteria**:
- [ ] Remove `@supabase/supabase-js` package
- [ ] Remove `src/lib/supabase.ts` file
- [ ] Remove all Supabase client usage
- [ ] Remove Supabase environment variables
- [ ] Remove all Supabase-related code comments
- [ ] Update documentation to remove Supabase references
- [ ] Test that app works without Supabase
- [ ] Clean up unused code

**Dependencies**: EST-024, EST-025, EST-026
**Blocks**: EST-041

---

---

## Epic 4: Database & Data Layer

### 🎯 EST-040: Database schema design for microservices
**Priority**: 🔴 Critical
**Status**: To Do
**Assignee**: Database Engineer
**Story Points**: 13
**Labels**: `database`, `schema`, `postgresql`

**Description**:
Design and document database schemas for all microservices with tables, relationships, indexes, and constraints.

**Acceptance Criteria**:
- [ ] Design auth service schema (users, tokens, roles, permissions)
- [ ] Design user service schema (profiles, preferences, verification, saved_properties)
- [ ] Design property service schema (properties, images, videos, analytics)
- [ ] Design booking service schema (viewings, applications, appointments)
- [ ] Design messaging service schema (conversations, messages, participants)
- [ ] Design notification service schema (notifications, preferences, templates)
- [ ] Design payment service schema (payments, invoices, subscriptions)
- [ ] Document all schemas with ER diagrams
- [ ] Define indexes for performance
- [ ] Define foreign key relationships

**Deliverables**:
- ER diagrams for each service
- SQL schema files
- Database migration files

**Dependencies**: EST-005
**Blocks**: EST-010, EST-011, EST-012, EST-014, EST-015, EST-017, EST-018

---

### 🎯 EST-041: Database migration from Supabase to PostgreSQL
**Priority**: 🟠 High
**Status**: To Do
**Assignee**: Database Engineer
**Story Points**: 13
**Labels**: `database`, `migration`, `postgresql`

**Description**:
Migrate existing data from Supabase PostgreSQL to new PostgreSQL instance with new schema structure.

**Acceptance Criteria**:
- [ ] Export existing data from Supabase
- [ ] Transform data to match new schema structure
- [ ] Import data to new PostgreSQL instance
- [ ] Verify data integrity
- [ ] Create rollback plan
- [ ] Test with production data dump
- [ ] Document migration process
- [ ] Create migration scripts

**Data to Migrate**:
- Users and profiles (50,000+ records)
- Properties (10,000+ records)
- Applications and viewings (100,000+ records)
- Messages (500,000+ records)
- Notifications (1,000,000+ records)

**Dependencies**: EST-040, EST-005, EST-024, EST-025, EST-026, EST-031
**Blocks**: EST-050

---

### 🎯 EST-042: Row Level Security (RLS) implementation
**Priority**: 🟠 High
**Status**: To Do
**Assignee**: Database Engineer
**Story Points**: 8
**Labels**: `database`, `security`, `postgresql`

**Description**:
Implement Row Level Security policies for data access control at the database level.

**Acceptance Criteria**:
- [ ] Enable RLS on all tables
- [ ] Create RLS policies for user data (users can only access their own data)
- [ ] Create RLS policies for property data (managers can only access their properties)
- [ ] Create RLS policies for messaging (users can only access their conversations)
- [ ] Create RLS policies for admin access (admins can access all data)
- [ ] Test RLS policies with different user roles
- [ ] Document all RLS policies

**Dependencies**: EST-040, EST-005

---

### 🎯 EST-043: Database indexing and optimization
**Priority**: 🟡 Medium
**Status**: To Do
**Assignee**: Database Engineer
**Story Points**: 5
**Labels**: `database`, `performance`, `postgresql`

**Description**:
Create indexes on frequently queried columns and optimize slow queries for better performance.

**Acceptance Criteria**:
- [ ] Analyze slow queries using EXPLAIN
- [ ] Create indexes on foreign keys
- [ ] Create indexes on search fields (title, address, postcode)
- [ ] Create composite indexes for common filter combinations
- [ ] Create GIN indexes for full-text search
- [ ] Create GiST indexes for geospatial queries
- [ ] Optimize property search query
- [ ] Test query performance improvements
- [ ] Document all indexes

**Dependencies**: EST-040, EST-005

---

### 🎯 EST-044: Database backup and disaster recovery setup
**Priority**: 🟠 High
**Status**: To Do
**Assignee**: DevOps Engineer
**Story Points**: 5
**Labels**: `database`, `backup`, `disaster-recovery`

**Description**:
Set up automated database backups, point-in-time recovery, and disaster recovery procedures.

**Acceptance Criteria**:
- [ ] Configure automated daily backups
- [ ] Configure point-in-time recovery (PITR)
- [ ] Set up backup retention policy (30 days)
- [ ] Test backup restoration process
- [ ] Create disaster recovery runbook
- [ ] Set up backup monitoring and alerting
- [ ] Configure cross-region backup replication

**Dependencies**: EST-005

---

---

## Epic 5: Mobile App Development

### 🎯 EST-050: React Native + Expo project setup
**Priority**: 🟡 Medium
**Status**: To Do
**Assignee**: Mobile Team Lead
**Story Points**: 8
**Labels**: `mobile`, `react-native`, `expo`, `setup`

**Description**:
Initialize React Native project with Expo, TypeScript, navigation, state management, and styling setup.

**Acceptance Criteria**:
- [ ] Initialize Expo project with TypeScript
- [ ] Set up React Navigation (stack + tab navigation)
- [ ] Set up Zustand for client state
- [ ] Set up TanStack Query for server state
- [ ] Set up React Native Paper for UI components
- [ ] Configure environment variables
- [ ] Set up AsyncStorage for local storage
- [ ] Configure push notifications (Firebase)
- [ ] Use shared `packages/api-client` from monorepo
- [ ] Document project structure
- [ ] Test on iOS and Android emulators

**Dependencies**: EST-001, EST-020, EST-010, EST-011, EST-012

---

### 🎯 EST-051: Mobile App - Authentication Screens
**Priority**: 🟡 Medium
**Status**: To Do
**Assignee**: Mobile Developer 1
**Story Points**: 8
**Labels**: `mobile`, `react-native`, `auth`

**Description**:
Build mobile authentication screens for login, register, forgot password, and email verification.

**Acceptance Criteria**:
- [ ] Create login screen
- [ ] Create register screen with multi-step form
- [ ] Create forgot password screen
- [ ] Create reset password screen
- [ ] Create email verification screen
- [ ] Implement biometric authentication (Face ID / Touch ID)
- [ ] Implement JWT token storage
- [ ] Connect to Auth Service API
- [ ] Write component tests

**Dependencies**: EST-050, EST-010

---

### 🎯 EST-052: Mobile App - Property Discovery Screens
**Priority**: 🟡 Medium
**Status**: To Do
**Assignee**: Mobile Developer 1
**Story Points**: 13
**Labels**: `mobile`, `react-native`

**Description**:
Build property discovery screens with search, filters, map view, and property detail.

**Acceptance Criteria**:
- [ ] Create property discovery screen with list/map toggle
- [ ] Implement Buy/Rent tabs
- [ ] Implement search by postcode, address
- [ ] Implement filters (location, price, beds, baths)
- [ ] Create property detail screen
- [ ] Implement image gallery with zoom
- [ ] Implement save/unsave property
- [ ] Implement "Book a Viewing" flow
- [ ] Connect to Property Service API
- [ ] Write component tests

**Dependencies**: EST-050, EST-012, EST-018

---

### 🎯 EST-053: Mobile App - Profile & Settings Screens
**Priority**: 🟡 Medium
**Status**: To Do
**Assignee**: Mobile Developer 2
**Story Points**: 8
**Labels**: `mobile`, `react-native`

**Description**:
Build user profile screen with photo upload, verification steps, document uploads, and settings.

**Acceptance Criteria**:
- [ ] Create profile screen
- [ ] Implement photo upload with camera/gallery
- [ ] Implement verification steps section
- [ ] Implement document upload (ID, Proof of Address)
- [ ] Create settings screen with preferences
- [ ] Implement notification preferences
- [ ] Implement theme toggle (light/dark)
- [ ] Connect to User Service API
- [ ] Write component tests

**Dependencies**: EST-050, EST-011

---

### 🎯 EST-054: Mobile App - Messaging Screens
**Priority**: 🟡 Medium
**Status**: To Do
**Assignee**: Mobile Developer 2
**Story Points**: 13
**Labels**: `mobile`, `react-native`, `websocket`

**Description**:
Build real-time messaging screens with conversation list, chat interface, and push notifications.

**Acceptance Criteria**:
- [ ] Create conversation list screen
- [ ] Create chat screen with message bubbles
- [ ] Implement real-time messaging via WebSocket
- [ ] Implement typing indicators
- [ ] Implement image/file sharing
- [ ] Implement push notifications for new messages
- [ ] Implement unread badge
- [ ] Connect to Messaging Service API
- [ ] Write component tests

**Dependencies**: EST-050, EST-014, EST-015

---

---

## Epic 6: Current System Bug Fixes

### 🎯 EST-060: Fix navigation tab conflicts in user dashboard
**Priority**: 🟠 High
**Status**: To Do
**Assignee**: Frontend Developer
**Story Points**: 3
**Labels**: `bug`, `frontend`, `navigation`

**Description**:
Fix issue where clicking Messages, Saved Properties, or other tabs redirects to the Buy page instead of the intended page.

**Current Issue**:
- Clicking on navigation tabs causes unexpected redirects
- `useLocation` conflicts with React Router's `useLocation`
- `setActiveTab` triggers unwanted navigation

**Acceptance Criteria**:
- [ ] Fix navigation conflicts in PropertyFilterContext
- [ ] Ensure all navigation tabs work independently
- [ ] Test all navigation paths
- [ ] Verify no unexpected redirects occur

**Files to Fix**:
- `src/contexts/PropertyFilterContext.jsx`
- `src/contexts/LocationContext.jsx`
- `src/components/Dashboard/Header.jsx`

**Dependencies**: None
**Can be done in parallel with other work**

---

### 🎯 EST-061: Fix loading states on property discovery pages
**Priority**: 🟡 Medium
**Status**: To Do
**Assignee**: Frontend Developer
**Story Points**: 2
**Labels**: `bug`, `frontend`, `loading`

**Description**:
Fix infinite loading issues on property discovery pages and improve loading UX.

**Acceptance Criteria**:
- [ ] Fix timeout protection for property fetching
- [ ] Add proper error handling for failed requests
- [ ] Show loading skeletons instead of spinners
- [ ] Implement retry mechanism for failed requests
- [ ] Add empty state when no properties found

**Files to Fix**:
- `src/pages/DashboardDiscover.jsx`
- `src/services/propertyService.ts`

**Dependencies**: None
**Can be done in parallel with other work**

---

### 🎯 EST-062: Fix Supabase client initialization across browsers
**Priority**: 🟠 High
**Status**: To Do
**Assignee**: Backend Developer
**Story Points**: 3
**Labels**: `bug`, `backend`, `supabase`

**Description**:
Fix Supabase client initialization issues that cause connection failures in some browsers.

**Acceptance Criteria**:
- [ ] Add fallback credentials for Supabase client
- [ ] Test Supabase connection in Chrome, Safari, Firefox, Edge
- [ ] Improve error handling for auth failures
- [ ] Add timeout protection for session checks
- [ ] Document browser-specific issues

**Files to Fix**:
- `src/lib/supabase.ts`
- `src/contexts/AuthContext.tsx`

**Note**: This bug fix is temporary and will be removed after EST-031 (Remove Supabase)

**Dependencies**: None
**Will be obsolete after**: EST-031

---

### 🎯 EST-063: Fix property filter state synchronization
**Priority**: 🟡 Medium
**Status**: To Do
**Assignee**: Frontend Developer
**Story Points**: 3
**Labels**: `bug`, `frontend`, `filters`

**Description**:
Fix issues where property filters don't properly sync with URL parameters and query state.

**Acceptance Criteria**:
- [ ] Synchronize filter state with URL parameters
- [ ] Persist filters when navigating back
- [ ] Clear filters when switching tabs (Buy/Rent)
- [ ] Test all filter combinations
- [ ] Ensure filters work with pagination

**Files to Fix**:
- `src/contexts/PropertyFilterContext.jsx`
- `src/pages/DashboardDiscover.jsx`

**Dependencies**: None
**Can be done in parallel with other work**

---

### 🎯 EST-064: Fix memory leaks in real-time subscriptions
**Priority**: 🟠 High
**Status**: To Do
**Assignee**: Frontend Developer
**Story Points**: 3
**Labels**: `bug`, `frontend`, `performance`

**Description**:
Fix memory leaks caused by Supabase real-time subscriptions not being properly cleaned up.

**Acceptance Criteria**:
- [ ] Add cleanup functions for all Supabase subscriptions
- [ ] Test subscription cleanup on component unmount
- [ ] Verify no memory leaks with Chrome DevTools
- [ ] Add subscription error handling
- [ ] Document subscription lifecycle

**Files to Fix**:
- `src/contexts/NotificationsContext.jsx`
- `src/contexts/SavedPropertiesContext.jsx`
- `src/contexts/ApplicationsContext.jsx`

**Note**: This bug fix is temporary and will be removed after EST-023 (React Query migration)

**Dependencies**: None
**Will be obsolete after**: EST-023

---

---

## Epic 7: Feature Enhancements

### 🎯 EST-070: Implement AI-powered property recommendations
**Priority**: 🟡 Medium
**Status**: To Do
**Assignee**: Backend Developer + ML Engineer
**Story Points**: 21
**Labels**: `feature`, `ai`, `recommendations`

**Description**:
Build AI-powered recommendation engine that suggests properties based on user preferences, search history, and saved properties.

**Acceptance Criteria**:
- [ ] Train recommendation model on user behavior data
- [ ] Build recommendation API endpoint
- [ ] Integrate with Property Service
- [ ] Show "Recommended for You" section on dashboard
- [ ] Track recommendation click-through rate
- [ ] Implement A/B testing for recommendation algorithms
- [ ] Document recommendation logic

**Dependencies**: EST-012, EST-024

---

### 🎯 EST-071: Implement virtual property tour with 360° images
**Priority**: 🟡 Medium
**Status**: To Do
**Assignee**: Frontend Developer
**Story Points**: 13
**Labels**: `feature`, `virtual-tour`, `frontend`

**Description**:
Implement 360° virtual property tour viewer using Three.js or similar library for immersive property viewing.

**Acceptance Criteria**:
- [ ] Integrate 360° image viewer (Three.js or A-Frame)
- [ ] Support multiple rooms per property
- [ ] Implement room navigation (clickable hotspots)
- [ ] Add fullscreen mode
- [ ] Add VR mode for headsets
- [ ] Optimize for mobile performance
- [ ] Connect to Media Service API

**Dependencies**: EST-013, EST-024

---

### 🎯 EST-072: Implement property comparison tool
**Priority**: 🟡 Medium
**Status**: To Do
**Assignee**: Frontend Developer
**Story Points**: 8
**Labels**: `feature`, `comparison`, `frontend`

**Description**:
Build property comparison tool that allows users to compare up to 4 properties side-by-side.

**Acceptance Criteria**:
- [ ] Add "Compare" button to property cards
- [ ] Show comparison bar with selected properties
- [ ] Create comparison page with side-by-side view
- [ ] Compare features: price, beds, baths, size, location, amenities
- [ ] Add export comparison as PDF
- [ ] Persist comparison selections in localStorage
- [ ] Connect to Property Service API

**Dependencies**: EST-012, EST-024

---

### 🎯 EST-073: Implement mortgage calculator
**Priority**: 🟡 Medium
**Status**: To Do
**Assignee**: Frontend Developer
**Story Points**: 5
**Labels**: `feature`, `calculator`, `frontend`

**Description**:
Build mortgage calculator widget that shows monthly payments based on property price, deposit, interest rate, and term.

**Acceptance Criteria**:
- [ ] Create mortgage calculator component
- [ ] Calculate monthly payments
- [ ] Show amortization schedule
- [ ] Show total interest paid
- [ ] Allow adjustment of deposit, interest rate, term
- [ ] Integrate with property detail page
- [ ] Show affordability estimate
- [ ] Add stamp duty calculator (UK)

**Dependencies**: EST-024

---

### 🎯 EST-074: Implement property alerts and saved searches
**Priority**: 🟡 Medium
**Status**: To Do
**Assignee**: Backend Developer
**Story Points**: 8
**Labels**: `feature`, `alerts`, `backend`

**Description**:
Build saved search functionality that sends email/push notifications when new properties match user criteria.

**Acceptance Criteria**:
- [ ] Create saved search API endpoints
- [ ] Store search criteria (location, price range, beds, etc.)
- [ ] Create background job to check for new matching properties
- [ ] Send email notifications for new matches
- [ ] Send push notifications for new matches
- [ ] Allow users to manage saved searches
- [ ] Implement daily digest email option
- [ ] Connect to Notification Service

**Dependencies**: EST-012, EST-015

---

### 🎯 EST-075: Implement property analytics for managers
**Priority**: 🟡 Medium
**Status**: To Do
**Assignee**: Backend Developer
**Story Points**: 13
**Labels**: `feature`, `analytics`, `backend`

**Description**:
Build analytics system for managers to track property performance, views, inquiries, and conversion rates.

**Acceptance Criteria**:
- [ ] Track property views, saves, and applications
- [ ] Calculate conversion rates (view → inquiry → application)
- [ ] Show trending properties
- [ ] Show competitor analysis (similar properties in area)
- [ ] Generate weekly performance reports
- [ ] Export analytics data as CSV/PDF
- [ ] Create analytics API endpoints
- [ ] Integrate with Manager Dashboard

**Dependencies**: EST-012, EST-025

---

### 🎯 EST-076: Implement broker matching algorithm
**Priority**: 🟡 Medium
**Status**: To Do
**Assignee**: Backend Developer
**Story Points**: 13
**Labels**: `feature`, `broker-matching`, `backend`

**Description**:
Build intelligent broker matching algorithm that connects users with the best-matched brokers based on location, specialty, and availability.

**Acceptance Criteria**:
- [ ] Create broker profile system with specialties
- [ ] Implement location-based matching (geospatial queries)
- [ ] Implement availability tracking
- [ ] Calculate match score based on multiple factors
- [ ] Show top 3 matched brokers to user
- [ ] Implement "10-Minute Broker Response" guarantee
- [ ] Track broker response times
- [ ] Integrate with User Dashboard

**Dependencies**: EST-011, EST-012

---

### 🎯 EST-077: Implement document verification with AI (OCR)
**Priority**: 🟡 Medium
**Status**: To Do
**Assignee**: Backend Developer + ML Engineer
**Story Points**: 21
**Labels**: `feature`, `ai`, `ocr`, `verification`

**Description**:
Implement AI-powered document verification using OCR to automatically extract and verify information from uploaded documents (ID, proof of address, etc.).

**Acceptance Criteria**:
- [ ] Integrate OCR library (Tesseract or cloud service)
- [ ] Extract text from ID documents
- [ ] Verify document authenticity (basic checks)
- [ ] Extract key information (name, DOB, address)
- [ ] Auto-populate user profile from extracted data
- [ ] Flag suspicious documents for manual review
- [ ] Create verification API endpoints
- [ ] Integrate with Admin Dashboard

**Dependencies**: EST-011, EST-026

---

---

## Epic 8: DevOps & Deployment

### 🎯 EST-080: Set up CI/CD pipeline with GitHub Actions
**Priority**: 🔴 Critical
**Status**: To Do
**Assignee**: DevOps Engineer
**Story Points**: 8
**Labels**: `devops`, `ci-cd`, `github-actions`

**Description**:
Set up CI/CD pipeline for automated testing, building, and deployment of all services and applications.

**Acceptance Criteria**:
- [ ] Create GitHub Actions workflows for each service
- [ ] Set up automated testing on PR
- [ ] Set up automated linting and formatting checks
- [ ] Build Docker images on merge to main
- [ ] Push Docker images to container registry
- [ ] Deploy to staging environment automatically
- [ ] Deploy to production with manual approval
- [ ] Set up deployment notifications (Slack/Discord)

**Workflows**:
- `.github/workflows/test.yml`
- `.github/workflows/build.yml`
- `.github/workflows/deploy-staging.yml`
- `.github/workflows/deploy-production.yml`

**Dependencies**: EST-002, EST-003
**Blocks**: EST-050

---

### 🎯 EST-081: Set up monitoring with Prometheus and Grafana
**Priority**: 🟠 High
**Status**: To Do
**Assignee**: DevOps Engineer
**Story Points**: 8
**Labels**: `devops`, `monitoring`, `observability`

**Description**:
Set up monitoring stack with Prometheus for metrics collection and Grafana for visualization.

**Acceptance Criteria**:
- [ ] Deploy Prometheus server
- [ ] Configure service discovery for microservices
- [ ] Set up metrics exporters for each service
- [ ] Deploy Grafana
- [ ] Create dashboards for each service
- [ ] Create system overview dashboard
- [ ] Set up alerting rules
- [ ] Integrate with PagerDuty or similar

**Metrics to Track**:
- Request rate, error rate, duration (RED metrics)
- CPU, memory, disk usage
- Database connection pool usage
- Cache hit rate
- Queue length

**Dependencies**: EST-003

---

### 🎯 EST-082: Set up centralized logging with ELK stack
**Priority**: 🟠 High
**Status**: To Do
**Assignee**: DevOps Engineer
**Story Points**: 8
**Labels**: `devops`, `logging`, `observability`

**Description**:
Set up centralized logging with Elasticsearch, Logstash, and Kibana (ELK stack) for log aggregation and analysis.

**Acceptance Criteria**:
- [ ] Deploy Elasticsearch cluster
- [ ] Deploy Logstash for log processing
- [ ] Deploy Kibana for log visualization
- [ ] Configure all services to send logs to Logstash
- [ ] Create log parsing rules
- [ ] Create Kibana dashboards for each service
- [ ] Set up log retention policy (30 days)
- [ ] Set up log-based alerts

**Dependencies**: EST-003

---

### 🎯 EST-083: Set up distributed tracing with Jaeger
**Priority**: 🟡 Medium
**Status**: To Do
**Assignee**: DevOps Engineer
**Story Points**: 5
**Labels**: `devops`, `tracing`, `observability`

**Description**:
Set up distributed tracing with Jaeger to track requests across microservices and identify performance bottlenecks.

**Acceptance Criteria**:
- [ ] Deploy Jaeger
- [ ] Instrument all Go services with OpenTelemetry
- [ ] Instrument React app with OpenTelemetry
- [ ] Create service dependency graph
- [ ] Set up trace sampling (10%)
- [ ] Create Jaeger UI dashboards
- [ ] Document tracing setup

**Dependencies**: EST-003, EST-010, EST-011, EST-012

---

### 🎯 EST-084: Set up secrets management with HashiCorp Vault
**Priority**: 🟠 High
**Status**: To Do
**Assignee**: DevOps Engineer
**Story Points**: 5
**Labels**: `devops`, `security`, `secrets`

**Description**:
Set up HashiCorp Vault for secure secrets management (API keys, database credentials, etc.).

**Acceptance Criteria**:
- [ ] Deploy HashiCorp Vault
- [ ] Configure authentication methods (Kubernetes, JWT)
- [ ] Store database credentials in Vault
- [ ] Store API keys in Vault
- [ ] Configure services to fetch secrets from Vault
- [ ] Set up secret rotation policies
- [ ] Document secrets management process

**Dependencies**: EST-003

---

### 🎯 EST-085: Set up auto-scaling policies
**Priority**: 🟡 Medium
**Status**: To Do
**Assignee**: DevOps Engineer
**Story Points**: 5
**Labels**: `devops`, `scaling`, `kubernetes`

**Description**:
Configure Horizontal Pod Autoscaler (HPA) and Vertical Pod Autoscaler (VPA) for automatic scaling based on load.

**Acceptance Criteria**:
- [ ] Configure HPA for each service
- [ ] Set CPU and memory thresholds for scaling
- [ ] Set min and max replicas
- [ ] Configure VPA for resource optimization
- [ ] Test auto-scaling with load tests
- [ ] Set up cluster autoscaler
- [ ] Document scaling policies

**Dependencies**: EST-003

---

---

## Epic 9: Testing & Quality Assurance

### 🎯 EST-090: Write unit tests for auth service
**Priority**: 🟠 High
**Status**: To Do
**Assignee**: Backend Developer 1
**Story Points**: 5
**Labels**: `testing`, `unit-tests`, `backend`

**Description**:
Write comprehensive unit tests for auth service with 80%+ code coverage.

**Acceptance Criteria**:
- [ ] Write tests for registration endpoint
- [ ] Write tests for login endpoint
- [ ] Write tests for password reset flow
- [ ] Write tests for JWT generation and validation
- [ ] Write tests for role-based access control
- [ ] Achieve 80%+ code coverage
- [ ] Run tests in CI pipeline

**Dependencies**: EST-010

---

### 🎯 EST-091: Write unit tests for user service
**Priority**: 🟠 High
**Status**: To Do
**Assignee**: Backend Developer 1
**Story Points**: 5
**Labels**: `testing`, `unit-tests`, `backend`

**Description**:
Write comprehensive unit tests for user service with 80%+ code coverage.

**Acceptance Criteria**:
- [ ] Write tests for user CRUD operations
- [ ] Write tests for profile management
- [ ] Write tests for verification system
- [ ] Write tests for saved properties
- [ ] Achieve 80%+ code coverage
- [ ] Run tests in CI pipeline

**Dependencies**: EST-011

---

### 🎯 EST-092: Write unit tests for property service
**Priority**: 🟠 High
**Status**: To Do
**Assignee**: Backend Developer 2
**Story Points**: 8
**Labels**: `testing`, `unit-tests`, `backend`

**Description**:
Write comprehensive unit tests for property service with 80%+ code coverage.

**Acceptance Criteria**:
- [ ] Write tests for property CRUD operations
- [ ] Write tests for property search and filters
- [ ] Write tests for property analytics
- [ ] Write tests for discovery sections
- [ ] Achieve 80%+ code coverage
- [ ] Run tests in CI pipeline

**Dependencies**: EST-012

---

### 🎯 EST-093: Write integration tests for API endpoints
**Priority**: 🟠 High
**Status**: To Do
**Assignee**: QA Engineer
**Story Points**: 13
**Labels**: `testing`, `integration-tests`, `backend`

**Description**:
Write integration tests for all API endpoints that test end-to-end flows with real database.

**Acceptance Criteria**:
- [ ] Set up test database
- [ ] Write integration tests for auth flow
- [ ] Write integration tests for user management
- [ ] Write integration tests for property management
- [ ] Write integration tests for booking flow
- [ ] Write integration tests for messaging
- [ ] Run tests in CI pipeline
- [ ] Document test cases

**Dependencies**: EST-010, EST-011, EST-012, EST-014, EST-018

---

### 🎯 EST-094: Write E2E tests for user dashboard (Playwright)
**Priority**: 🟡 Medium
**Status**: To Do
**Assignee**: QA Engineer
**Story Points**: 13
**Labels**: `testing`, `e2e-tests`, `frontend`

**Description**:
Write end-to-end tests for user dashboard using Playwright to test critical user flows.

**Acceptance Criteria**:
- [ ] Set up Playwright
- [ ] Write E2E test for login flow
- [ ] Write E2E test for property search
- [ ] Write E2E test for property detail view
- [ ] Write E2E test for booking a viewing
- [ ] Write E2E test for submitting an application
- [ ] Write E2E test for messaging
- [ ] Run tests in CI pipeline

**Dependencies**: EST-024

---

### 🎯 EST-095: Write E2E tests for manager dashboard (Playwright)
**Priority**: 🟡 Medium
**Status**: To Do
**Assignee**: QA Engineer
**Story Points**: 13
**Labels**: `testing`, `e2e-tests`, `frontend`

**Description**:
Write end-to-end tests for manager dashboard using Playwright to test critical manager flows.

**Acceptance Criteria**:
- [ ] Write E2E test for manager login
- [ ] Write E2E test for adding a property
- [ ] Write E2E test for editing a property
- [ ] Write E2E test for viewing property analytics
- [ ] Write E2E test for approving an application
- [ ] Write E2E test for managing leads
- [ ] Run tests in CI pipeline

**Dependencies**: EST-025

---

### 🎯 EST-096: Load testing with k6 or JMeter
**Priority**: 🟡 Medium
**Status**: To Do
**Assignee**: QA Engineer
**Story Points**: 8
**Labels**: `testing`, `load-tests`, `performance`

**Description**:
Perform load testing on all API endpoints to ensure system can handle expected traffic.

**Acceptance Criteria**:
- [ ] Set up k6 or JMeter
- [ ] Create load test scenarios for property search
- [ ] Create load test scenarios for authentication
- [ ] Create load test scenarios for messaging
- [ ] Test with 100 concurrent users
- [ ] Test with 1000 concurrent users
- [ ] Identify performance bottlenecks
- [ ] Document load test results

**Target Performance**:
- Property search: <200ms response time
- Authentication: <100ms response time
- Messaging: <50ms response time
- 99th percentile: <1s

**Dependencies**: EST-010, EST-011, EST-012, EST-014

---

---

## Epic 10: Documentation & Knowledge Transfer

### 🎯 EST-100: API documentation with OpenAPI/Swagger
**Priority**: 🟠 High
**Status**: To Do
**Assignee**: Backend Team Lead
**Story Points**: 8
**Labels**: `documentation`, `api`, `swagger`

**Description**:
Create comprehensive API documentation for all microservices using OpenAPI/Swagger specification.

**Acceptance Criteria**:
- [ ] Generate OpenAPI spec for each service
- [ ] Add detailed descriptions for all endpoints
- [ ] Add request/response examples
- [ ] Add authentication documentation
- [ ] Add error code documentation
- [ ] Deploy Swagger UI for interactive documentation
- [ ] Version API documentation

**Deliverables**:
- OpenAPI YAML files for each service
- Hosted Swagger UI at `/api/docs`

**Dependencies**: EST-010, EST-011, EST-012, EST-013, EST-014, EST-015, EST-017, EST-018

---

### 🎯 EST-101: Architecture documentation
**Priority**: 🟠 High
**Status**: To Do
**Assignee**: Solutions Architect
**Story Points**: 8
**Labels**: `documentation`, `architecture`

**Description**:
Create comprehensive architecture documentation covering system design, microservices architecture, data flow, and deployment architecture.

**Acceptance Criteria**:
- [ ] Document high-level system architecture
- [ ] Document microservices architecture with diagrams
- [ ] Document data flow and event-driven architecture
- [ ] Document deployment architecture (K8s)
- [ ] Document API Gateway routing
- [ ] Document database schema with ER diagrams
- [ ] Document security architecture
- [ ] Create architecture decision records (ADRs)

**Deliverables**:
- `docs/ARCHITECTURE.md`
- Architecture diagrams (C4 model)
- ADRs in `docs/adr/`

**Dependencies**: EST-001, EST-003, EST-004

---

### 🎯 EST-102: Development setup guide
**Priority**: 🟠 High
**Status**: To Do
**Assignee**: DevOps Engineer
**Story Points**: 5
**Labels**: `documentation`, `setup`

**Description**:
Create comprehensive development setup guide for new developers to get started quickly.

**Acceptance Criteria**:
- [ ] Document prerequisites (Go, Node.js, Docker, etc.)
- [ ] Document monorepo setup
- [ ] Document environment variable setup
- [ ] Document database setup
- [ ] Document running services locally
- [ ] Document debugging setup (VSCode, GoLand)
- [ ] Document testing locally
- [ ] Create troubleshooting guide

**Deliverables**:
- `docs/DEVELOPMENT.md`
- `docs/TROUBLESHOOTING.md`

**Dependencies**: EST-001, EST-002

---

### 🎯 EST-103: Deployment guide
**Priority**: 🟠 High
**Status**: To Do
**Assignee**: DevOps Engineer
**Story Points**: 5
**Labels**: `documentation`, `deployment`

**Description**:
Create deployment guide covering staging and production deployments, rollback procedures, and disaster recovery.

**Acceptance Criteria**:
- [ ] Document staging deployment process
- [ ] Document production deployment process
- [ ] Document rollback procedures
- [ ] Document disaster recovery procedures
- [ ] Document monitoring and alerting setup
- [ ] Document scaling procedures
- [ ] Create deployment checklist

**Deliverables**:
- `docs/DEPLOYMENT.md`
- `docs/DISASTER_RECOVERY.md`
- Deployment runbooks

**Dependencies**: EST-003, EST-080

---

### 🎯 EST-104: User guide for user dashboard
**Priority**: 🟡 Medium
**Status**: To Do
**Assignee**: Technical Writer
**Story Points**: 8
**Labels**: `documentation`, `user-guide`

**Description**:
Create user guide for user dashboard covering all features and common workflows.

**Acceptance Criteria**:
- [ ] Document property search and discovery
- [ ] Document booking viewings
- [ ] Document submitting applications
- [ ] Document messaging with brokers
- [ ] Document profile and verification
- [ ] Document payments and contracts
- [ ] Add screenshots and GIFs
- [ ] Create video tutorials

**Deliverables**:
- `docs/USER_GUIDE.md`
- Video tutorials

**Dependencies**: EST-024

---

### 🎯 EST-105: Manager guide for manager dashboard
**Priority**: 🟡 Medium
**Status**: To Do
**Assignee**: Technical Writer
**Story Points**: 8
**Labels**: `documentation`, `user-guide`

**Description**:
Create manager guide for manager dashboard covering property management, lead management, and analytics.

**Acceptance Criteria**:
- [ ] Document adding and managing properties
- [ ] Document lead management
- [ ] Document application management
- [ ] Document analytics and reporting
- [ ] Document billing and payments
- [ ] Add screenshots and GIFs
- [ ] Create video tutorials

**Deliverables**:
- `docs/MANAGER_GUIDE.md`
- Video tutorials

**Dependencies**: EST-025

---

### 🎯 EST-106: Knowledge transfer sessions
**Priority**: 🟠 High
**Status**: To Do
**Assignee**: Project Manager
**Story Points**: 5
**Labels**: `knowledge-transfer`, `training`

**Description**:
Conduct knowledge transfer sessions for all teams covering architecture, codebase, deployment, and operations.

**Acceptance Criteria**:
- [ ] Schedule knowledge transfer sessions
- [ ] Conduct session on system architecture
- [ ] Conduct session on backend microservices
- [ ] Conduct session on frontend architecture (React + Vite)
- [ ] Conduct session on DevOps and deployment
- [ ] Conduct session on monitoring and operations
- [ ] Record all sessions
- [ ] Share session recordings and slides

**Deliverables**:
- Recorded sessions
- Presentation slides

**Dependencies**: EST-101, EST-102, EST-103

---

---

## Summary Statistics

### By Epic

| Epic | Total Tickets | Critical | High | Medium | Low | Total Story Points |
|------|---------------|----------|------|--------|-----|--------------------|
| Epic 1: Architecture & Infrastructure | 9 | 5 | 3 | 1 | 0 | 63 |
| Epic 2: Backend Microservices | 9 | 4 | 4 | 1 | 0 | 139 |
| Epic 3: Frontend Refactoring & Integration | 12 | 5 | 4 | 3 | 0 | 99 |
| Epic 4: Database & Data Layer | 5 | 1 | 3 | 1 | 0 | 44 |
| Epic 5: Mobile App Development | 5 | 0 | 0 | 5 | 0 | 50 |
| Epic 6: Current System Bug Fixes | 5 | 0 | 3 | 2 | 0 | 14 |
| Epic 7: Feature Enhancements | 8 | 0 | 0 | 8 | 0 | 98 |
| Epic 8: DevOps & Deployment | 6 | 1 | 3 | 2 | 0 | 39 |
| Epic 9: Testing & QA | 7 | 0 | 5 | 2 | 0 | 57 |
| Epic 10: Documentation | 7 | 0 | 5 | 2 | 0 | 47 |
| **TOTAL** | **73** | **16** | **30** | **27** | **0** | **650** |

### Key Changes from Next.js Version:
- ✅ **Removed**: 4 Next.js-specific tickets (EST-020 Next.js setup, EST-021-023 Next.js pages)
- ✅ **Added**: 12 React + Vite refactoring tickets (TypeScript migration, React Query, Zustand, API client)
- ✅ **Reduced Story Points**: From 722 → 650 (72 points saved)
- ✅ **Faster Timeline**: Can start connecting frontend to microservices immediately

---

## Recommended Phases (React + Vite Approach)

#### **Phase 1: Foundation (Weeks 1-4)**
**Focus**: Infrastructure setup
- EST-001: Monorepo setup ✅
- EST-002: Docker setup ✅
- EST-004: API Gateway ✅
- EST-005: PostgreSQL setup ✅
- EST-006: Redis setup ✅
- EST-007: NATS setup ✅
- EST-040: Database schema design ✅

**Sprint Goal**: Have infrastructure ready for microservices development

---

#### **Phase 2: Core Backend Services (Weeks 5-10)**
**Focus**: Critical microservices
- EST-010: Auth Service (13 SP)
- EST-011: User Service (13 SP)
- EST-012: Property Service (21 SP)
- EST-018: Booking Service (13 SP)
- EST-060-064: Bug fixes (14 SP)

**Parallel Track - Frontend Prep**:
- EST-020: Shared API Client Library (8 SP)
- EST-021: Migrate to 100% TypeScript (13 SP)
- EST-022: Replace Context with Zustand (8 SP)

**Sprint Goal**: Core services operational + frontend ready for integration

---

#### **Phase 3: Frontend Integration (Weeks 11-16)**
**Focus**: Connect React app to microservices
- EST-023: Integrate React Query (13 SP)
- EST-024: Connect User Dashboard (13 SP)
- EST-025: Connect Manager Dashboard (13 SP)
- EST-026: Connect Admin Dashboard (8 SP)
- EST-027: Implement WebSocket for messaging (8 SP)

**Sprint Goal**: Full frontend connected to new backend

---

#### **Phase 4: Additional Services (Weeks 17-22)**
**Focus**: Complete remaining microservices
- EST-013: Media Service (13 SP)
- EST-014: Messaging Service (13 SP)
- EST-015: Notification Service (13 SP)
- EST-017: Payment Service (21 SP)
- EST-016: Search Service (13 SP)

**Parallel Track - Optimization**:
- EST-028: Code splitting (5 SP)
- EST-029: React Hook Form (8 SP)
- EST-030: Vite optimization (3 SP)

**Sprint Goal**: All microservices complete + optimized frontend

---

#### **Phase 5: Infrastructure & DevOps (Weeks 23-28)**
**Focus**: Production-ready infrastructure
- EST-003: Kubernetes setup (13 SP)
- EST-080: CI/CD pipeline (8 SP)
- EST-081: Monitoring (8 SP)
- EST-082: Logging (8 SP)
- EST-083: Distributed tracing (5 SP)
- EST-084: Secrets management (5 SP)
- EST-031: Remove Supabase (5 SP)
- EST-041: Database migration (13 SP)

**Sprint Goal**: Production-ready deployment

---

#### **Phase 6: Testing & Quality (Weeks 25-30)**
**Focus**: Comprehensive testing
- EST-090-092: Backend unit tests (18 SP)
- EST-093: Integration tests (13 SP)
- EST-094-095: E2E tests (26 SP)
- EST-096: Load testing (8 SP)

**Sprint Goal**: 80%+ test coverage across stack

---

#### **Phase 7: Mobile & Enhancements (Weeks 31-36)**
**Focus**: Mobile app and new features
- EST-050-054: Mobile app (50 SP)
- EST-070-077: Feature enhancements (98 SP - selective)

**Sprint Goal**: Mobile app MVP + priority features

---

#### **Phase 8: Documentation & Launch (Weeks 37-40)**
**Focus**: Documentation and knowledge transfer
- EST-100-106: Documentation (47 SP)
- Final QA and bug fixes
- Production launch

**Sprint Goal**: Launch to production

---

## Advantages of React + Vite Approach

### 🚀 **Faster Time to Market**
- No need to rewrite entire frontend
- Can start backend migration immediately
- Parallel frontend and backend work

### 💰 **Lower Cost**
- 72 story points saved (722 → 650)
- ~6-8 weeks faster overall timeline
- Smaller team can handle it

### 📉 **Lower Risk**
- Frontend is already working and tested
- Incremental migration (service by service)
- Can rollback easily if issues arise

### 👥 **Team Efficiency**
- Team already knows React + Vite
- No learning curve for Next.js
- Focus on backend migration

### 🔄 **Future Flexibility**
- Can still migrate to Next.js later (Phase 2)
- Not locked into current stack
- Cleaner architecture for future changes

---

## Import to Linear

To import these tickets to Linear:

1. **Use Linear CSV Import**:
   - Convert this document to CSV format with columns: `Title`, `Description`, `Priority`, `Status`, `Assignee`, `Story Points`, `Labels`, `Epic`
   - Go to Linear → Settings → Import → CSV Import

2. **Use Linear API**:
   - Script the ticket creation using Linear's GraphQL API
   - Automate the creation of all 73 tickets with proper relationships

3. **Manual Creation** (Not recommended for 73 tickets):
   - Copy each ticket manually into Linear
   - Set up proper epics, labels, and relationships

---

**End of Document**
