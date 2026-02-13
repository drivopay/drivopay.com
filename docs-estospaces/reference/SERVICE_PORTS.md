# EstoSpaces - Service Ports & Endpoints Reference

Quick reference for all microservices, their ports, and key endpoints.

---

## 🔌 Service Port Mapping

| Service | Port | Database | Cloud SQL Proxy | Replicas |
|---------|------|----------|-----------------|----------|
| **auth-service** | 8080 | estospaces_auth | cloudsql-proxy-auth:5432 | 2 |
| **user-service** | 8081 | estospaces_users | cloudsql-proxy-users:5432 | 2 |
| **property-service** | 8082 | estospaces_properties | cloudsql-proxy-properties:5432 | 2 |
| **booking-service** | 8083 | estospaces_bookings | cloudsql-proxy-bookings:5432 | 2 |
| **payment-service** | 8084 | estospaces_payments | cloudsql-proxy-payments:5432 | 2 |
| **notification-service** | 8085 | estospaces_notifications | cloudsql-proxy-notifications:5432 | 2 |
| **media-service** | 8086 | estospaces_media | cloudsql-proxy-media:5432 | 2 |
| **messaging-service** | 8087 | estospaces_messaging | cloudsql-proxy-messaging:5432 | 2 |
| **search-service** | 8088 | estospaces_search | cloudsql-proxy-search:5432 | 2 |

---

## 🛣️ API Routing (NGINX Ingress)

**Base URL:** `https://api.estospaces.com`

### Authentication Service (8080)
```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
POST   /api/v1/auth/refresh
GET    /api/v1/auth/me
POST   /api/v1/auth/forgot-password
POST   /api/v1/auth/reset-password
```

### User Service (8081)
```
GET    /api/v1/users
GET    /api/v1/users/:id
PUT    /api/v1/users/:id
DELETE /api/v1/users/:id
GET    /api/v1/users/profile
PUT    /api/v1/users/profile
```

### Property Service (8082)
```
GET    /api/v1/properties
POST   /api/v1/properties
GET    /api/v1/properties/:id
PUT    /api/v1/properties/:id
DELETE /api/v1/properties/:id
GET    /api/v1/properties/search
POST   /api/v1/properties/:id/reviews
```

### Booking Service (8083)
```
GET    /api/v1/bookings
POST   /api/v1/bookings
GET    /api/v1/bookings/:id
PUT    /api/v1/bookings/:id
DELETE /api/v1/bookings/:id
GET    /api/v1/viewings
POST   /api/v1/viewings
GET    /api/v1/availability/:property_id
```

### Payment Service (8084)
```
POST   /api/v1/payments
GET    /api/v1/payments/:id
POST   /api/v1/payments/:id/confirm
POST   /api/v1/payments/:id/refund
GET    /api/v1/invoices
POST   /api/v1/webhooks/stripe
```

### Notification Service (8085)
```
POST   /api/v1/notifications/email
POST   /api/v1/notifications/sms
POST   /api/v1/notifications/push
GET    /api/v1/notifications
PUT    /api/v1/notifications/:id/read
```

### Media Service (8086)
```
POST   /api/v1/media/upload
GET    /api/v1/media/:id
DELETE /api/v1/media/:id
POST   /api/v1/media/bulk-upload
```

### Messaging Service (8087)
```
WebSocket: /ws/chat
GET    /api/v1/messages
POST   /api/v1/messages
GET    /api/v1/messages/:id
DELETE /api/v1/messages/:id
```

### Search Service (8088)
```
GET    /api/v1/search
GET    /api/v1/search/autocomplete
GET    /api/v1/search/filters
GET    /api/v1/search/nearby
```

---

## 🗄️ Database Schema Overview

### auth-service (estospaces_auth)
```
Tables:
- users (id, email, password_hash, role, status)
- refresh_tokens
- email_verifications
- password_resets
- oauth_connections
- sessions
```

### user-service (estospaces_users)
```
Tables:
- user_profiles
- user_preferences
- user_verifications
- user_addresses
- user_documents
```

### property-service (estospaces_properties)
```
Tables:
- properties
- property_amenities
- property_images
- property_reviews
- property_locations (PostGIS)
```

### booking-service (estospaces_bookings)
```
Tables:
- bookings
- viewings
- availability_calendar
- booking_history
```

### payment-service (estospaces_payments)
```
Tables:
- payments
- payment_intents
- invoices
- refunds
- subscriptions
```

### notification-service (estospaces_notifications)
```
Tables:
- notifications
- notification_templates
- notification_preferences
- notification_history
```

### media-service (estospaces_media)
```
Tables:
- media_files
- media_metadata
- media_processing_queue
```

### messaging-service (estospaces_messaging)
```
Tables:
- conversations
- messages
- message_participants
- message_read_status
```

### search-service (estospaces_search)
```
Tables:
- search_indices
- search_analytics
- popular_searches
```

---

## 🔗 Service Dependencies

```
auth-service
  └── (no dependencies)

user-service
  └── auth-service (JWT validation)

property-service
  └── auth-service (JWT validation)
  └── user-service (owner info)

booking-service
  └── auth-service (JWT validation)
  └── property-service (property info)
  └── notification-service (via NATS event)

payment-service
  └── auth-service (JWT validation)
  └── booking-service (booking info)
  └── notification-service (via NATS event)

notification-service
  └── (listens to NATS events)
  └── External: SendGrid, Twilio, Firebase

media-service
  └── auth-service (JWT validation)
  └── External: Google Cloud Storage

messaging-service
  └── auth-service (JWT validation)
  └── user-service (user info)

search-service
  └── auth-service (JWT validation)
  └── property-service (listens to NATS events)
```

---

## 🚦 Local Development Ports

When running locally without Docker:

```
Frontend:
- Next.js web:     http://localhost:3000

Backend Services:
- auth-service:    http://localhost:8080
- user-service:    http://localhost:8081
- property-service: http://localhost:8082
- booking-service:  http://localhost:8083
- payment-service:  http://localhost:8084
- notification-service: http://localhost:8085
- media-service:    http://localhost:8086
- messaging-service: http://localhost:8087
- search-service:   http://localhost:8088

Infrastructure:
- PostgreSQL (auth): localhost:5432
- PostgreSQL (users): localhost:5433
- PostgreSQL (properties): localhost:5434
- PostgreSQL (bookings): localhost:5435
- PostgreSQL (payments): localhost:5436
- PostgreSQL (notifications): localhost:5437
- PostgreSQL (media): localhost:5438
- PostgreSQL (messaging): localhost:5439
- PostgreSQL (search): localhost:5440
- Redis:            localhost:6379
- NATS:             localhost:4222
```

---

## 📊 Health Check Endpoints

All services expose these endpoints:

```
GET /health          - Basic health check
GET /ready           - Readiness probe
GET /metrics         - Prometheus metrics
GET /version         - Service version info
```

Example:
```bash
curl http://localhost:8080/health
# Response: {"status":"ok","service":"auth-service","version":"1.0.0"}
```

---

## 🔐 Environment Variables

### Common to all services:
```bash
PORT=8080
DB_HOST=cloudsql-proxy-auth
DB_PORT=5432
DB_USER=estospaces
DB_PASSWORD=<secret>
DB_NAME=estospaces_auth
DB_SSL_MODE=disable
REDIS_URL=redis:6379
NATS_URL=nats://nats:4222
LOG_LEVEL=info
ENVIRONMENT=production
```

### Service-specific:
```bash
# auth-service
JWT_SECRET=<secret>
JWT_EXPIRY=24h
ALLOWED_ORIGINS=https://app.estospaces.com

# notification-service
SENDGRID_API_KEY=<secret>
TWILIO_ACCOUNT_SID=<secret>
TWILIO_AUTH_TOKEN=<secret>
FIREBASE_CREDENTIALS=<secret>

# payment-service
STRIPE_SECRET_KEY=<secret>
STRIPE_WEBHOOK_SECRET=<secret>

# media-service
GCS_BUCKET_NAME=estospaces-media
GCS_PROJECT_ID=estospaces-prod
CDN_URL=https://cdn.estospaces.com
```

---

## 🧪 Testing Endpoints

### Test auth flow:
```bash
# 1. Register
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# 2. Login
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# 3. Get profile (use token from login)
curl -X GET http://localhost:8080/api/v1/auth/me \
  -H "Authorization: Bearer <token>"
```

---

## 📱 WebSocket Connections

### Messaging Service
```javascript
// Connect to chat WebSocket
const ws = new WebSocket('wss://api.estospaces.com/ws/chat?token=<jwt_token>');

ws.onopen = () => {
  console.log('Connected to chat');
};

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log('New message:', message);
};

// Send message
ws.send(JSON.stringify({
  type: 'message',
  conversation_id: '123',
  content: 'Hello!'
}));
```

---

**Last Updated:** February 10, 2026
**Reference:** Use this document for quick port and endpoint lookups during development
