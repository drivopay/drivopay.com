# EstoSpaces Microservices Migration - Quick Start Guide

> **For**: Development Team
> **Date**: February 13, 2026

---

## Prerequisites

Before starting, ensure you have:

```bash
# 1. Required Tools
- Google Cloud SDK (gcloud)
- kubectl
- Docker
- Go 1.21+
- Node.js 20+
- pnpm

# 2. Access
- GCP Project access (estospaces-prod)
- GitHub repository access
- Supabase credentials (for data export)
```

---

## Quick Start - Step by Step

### Step 1: Clone and Setup (5 minutes)

```bash
# 1. Clone repository
git clone https://github.com/your-org/estospaces-app.git
cd estospaces-app

# 2. Checkout migration branch
git checkout -b feature/microservices-migration

# 3. Install dependencies
pnpm install

# 4. Review migration plan
open MICROSERVICES_MIGRATION_PLAN.md
```

### Step 2: GCP Setup (30 minutes)

```bash
# 1. Authenticate with GCP
gcloud auth login
gcloud config set project estospaces-prod

# 2. Enable required APIs
gcloud services enable \
  container.googleapis.com \
  compute.googleapis.com \
  storage.googleapis.com \
  sqladmin.googleapis.com \
  servicenetworking.googleapis.com

# 3. Create GKE cluster
gcloud container clusters create estospaces-cluster \
  --zone=europe-west2-a \
  --num-nodes=3 \
  --machine-type=e2-standard-4 \
  --enable-autoscaling \
  --min-nodes=3 \
  --max-nodes=10

# 4. Get cluster credentials
gcloud container clusters get-credentials estospaces-cluster --zone=europe-west2-a

# 5. Verify kubectl connection
kubectl cluster-info
kubectl get nodes
```

### Step 3: Create Cloud SQL Instance (20 minutes)

```bash
# 1. Create PostgreSQL instance
gcloud sql instances create estospaces-db \
  --database-version=POSTGRES_15 \
  --tier=db-custom-4-16384 \
  --region=europe-west2 \
  --availability-type=REGIONAL \
  --backup-start-time=03:00

# 2. Set root password
gcloud sql users set-password postgres \
  --instance=estospaces-db \
  --password=YOUR_SECURE_PASSWORD

# 3. Create service databases
gcloud sql databases create auth_service --instance=estospaces-db
gcloud sql databases create user_service --instance=estospaces-db
gcloud sql databases create property_service --instance=estospaces-db
gcloud sql databases create booking_service --instance=estospaces-db
gcloud sql databases create messaging_service --instance=estospaces-db
gcloud sql databases create notification_service --instance=estospaces-db
gcloud sql databases create payment_service --instance=estospaces-db
```

### Step 4: Create Storage Buckets (5 minutes)

```bash
# Create GCS buckets
gsutil mb -c STANDARD -l europe-west2 gs://estospaces-property-images
gsutil mb -c STANDARD -l europe-west2 gs://estospaces-property-videos
gsutil mb -c STANDARD -l europe-west2 gs://estospaces-user-documents

# Enable public access for images
gsutil iam ch allUsers:objectViewer gs://estospaces-property-images
```

### Step 5: Install Kubernetes Components (15 minutes)

```bash
# 1. Install NGINX Ingress Controller
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml

# 2. Install Cert-Manager
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml

# 3. Create production namespace
kubectl create namespace production

# 4. Install Prometheus + Grafana (optional)
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/kube-prometheus-stack -n production

# 5. Wait for deployments
kubectl wait --for=condition=ready pod -l app.kubernetes.io/name=ingress-nginx -n ingress-nginx --timeout=300s
```

### Step 6: Export Supabase Data (30 minutes)

```bash
# 1. Set Supabase credentials
export SUPABASE_URL="https://yydtsteyknbpfpxjtlxe.supabase.co"
export SUPABASE_DB_HOST="db.yydtsteyknbpfpxjtlxe.supabase.co"
export SUPABASE_DB_PASSWORD="your_password"

# 2. Export each table
pg_dump -h $SUPABASE_DB_HOST -U postgres -d postgres \
  -t properties \
  -t profiles \
  -t saved_properties \
  -t applied_properties \
  -t viewings \
  -t notifications \
  -t conversations \
  -t messages \
  -t broker_requests \
  -t user_verification_documents \
  -t manager_verification_documents \
  -t user_preferences \
  -F c -f backup/supabase_backup_$(date +%Y%m%d).dump

# 3. Verify backup
ls -lh backup/
```

### Step 7: Build Auth Service (First Microservice) (1 hour)

```bash
# 1. Create service directory
cd estospaces-auth-service

# 2. Initialize Go module
go mod init github.com/estospaces/auth-service

# 3. Install Fiber framework
go get github.com/gofiber/fiber/v2
go get github.com/golang-jwt/jwt/v5
go get github.com/lib/pq
go get github.com/redis/go-redis/v9

# 4. Create main.go
cat > main.go << 'EOF'
package main

import (
    "github.com/gofiber/fiber/v2"
    "github.com/gofiber/fiber/v2/middleware/cors"
    "github.com/gofiber/fiber/v2/middleware/logger"
    "log"
    "os"
)

func main() {
    app := fiber.New(fiber.Config{
        AppName: "EstoSpaces Auth Service v1.0",
    })

    // Middleware
    app.Use(logger.New())
    app.Use(cors.New())

    // Health check
    app.Get("/health", func(c *fiber.Ctx) error {
        return c.JSON(fiber.Map{
            "status": "ok",
            "service": "auth-service",
        })
    })

    // API routes
    api := app.Group("/api/v1/auth")
    api.Post("/register", handleRegister)
    api.Post("/login", handleLogin)
    api.Post("/refresh", handleRefresh)
    api.Get("/me", authMiddleware, handleMe)

    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }

    log.Printf("Auth service starting on port %s", port)
    log.Fatal(app.Listen(":" + port))
}

func handleRegister(c *fiber.Ctx) error {
    // TODO: Implement registration
    return c.JSON(fiber.Map{"message": "Register endpoint"})
}

func handleLogin(c *fiber.Ctx) error {
    // TODO: Implement login
    return c.JSON(fiber.Map{"message": "Login endpoint"})
}

func handleRefresh(c *fiber.Ctx) error {
    // TODO: Implement token refresh
    return c.JSON(fiber.Map{"message": "Refresh endpoint"})
}

func handleMe(c *fiber.Ctx) error {
    // TODO: Get current user
    return c.JSON(fiber.Map{"message": "Current user endpoint"})
}

func authMiddleware(c *fiber.Ctx) error {
    // TODO: Implement JWT validation
    return c.Next()
}
EOF

# 5. Build service
go build -o bin/auth-service

# 6. Run locally
./bin/auth-service

# Test in another terminal:
# curl http://localhost:8080/health
```

### Step 8: Dockerize Auth Service (15 minutes)

```bash
# 1. Create Dockerfile
cd estospaces-auth-service

cat > Dockerfile << 'EOF'
# Build stage
FROM golang:1.21-alpine AS builder

WORKDIR /app

# Copy go mod files
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Build
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# Runtime stage
FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /root/

# Copy binary from builder
COPY --from=builder /app/main .

EXPOSE 8080

CMD ["./main"]
EOF

# 2. Build Docker image
docker build -t gcr.io/estospaces-prod/auth-service:latest .

# 3. Test Docker image
docker run -p 8080:8080 gcr.io/estospaces-prod/auth-service:latest

# 4. Push to GCR
docker push gcr.io/estospaces-prod/auth-service:latest
```

### Step 9: Deploy Auth Service to GKE (10 minutes)

```bash
# 1. Apply Kubernetes manifests
kubectl apply -f infra/kubernetes/deployments/auth-service.yaml

# 2. Check deployment status
kubectl get pods -n production
kubectl get services -n production

# 3. Check logs
kubectl logs -f deployment/auth-service -n production

# 4. Test service internally
kubectl run -it --rm debug --image=curlimages/curl --restart=Never -- \
  curl http://auth-service.production.svc.cluster.local/health
```

### Step 10: Configure Ingress (10 minutes)

```bash
# 1. Apply Ingress
kubectl apply -f infra/kubernetes/ingress/ingress.yaml

# 2. Get Ingress IP
kubectl get ingress -n production

# 3. Configure DNS (example with Cloud DNS)
gcloud dns record-sets create api.estospaces.com. \
  --rrdatas="INGRESS_IP_HERE" \
  --type=A \
  --ttl=300 \
  --zone=estospaces-zone

# 4. Wait for SSL certificate (5-10 minutes)
kubectl describe certificate api-tls-cert -n production

# 5. Test external access
curl https://api.estospaces.com/api/v1/auth/health
```

---

## Next Steps

### Week 1-2: Complete Auth Service
- [ ] Implement user registration
- [ ] Implement login with JWT
- [ ] Implement token refresh
- [ ] Add password reset flow
- [ ] Write unit tests
- [ ] Deploy to production

### Week 3-4: User Service
- [ ] Create user-service repository
- [ ] Implement user profile CRUD
- [ ] Implement verification system
- [ ] Implement saved properties
- [ ] Deploy to production

### Week 5-6: Property Service
- [ ] Create property-service repository
- [ ] Implement property CRUD
- [ ] Implement search and filters
- [ ] Implement analytics
- [ ] Deploy to production

### Continue with remaining services...

---

## Development Workflow

### Daily Development
```bash
# 1. Create feature branch
git checkout -b feature/auth-service-registration

# 2. Make changes
# ... code changes ...

# 3. Test locally
go test ./...
docker build -t auth-service:dev .
docker run -p 8080:8080 auth-service:dev

# 4. Commit and push
git add .
git commit -m "feat(auth): implement user registration"
git push origin feature/auth-service-registration

# 5. Create PR
gh pr create --title "feat(auth): implement user registration"

# 6. After PR merge, Cloud Build automatically deploys
```

### Debugging in GKE
```bash
# View logs
kubectl logs -f deployment/auth-service -n production

# Execute commands in pod
kubectl exec -it deployment/auth-service -n production -- /bin/sh

# Port forward for local debugging
kubectl port-forward deployment/auth-service 8080:8080 -n production

# View pod details
kubectl describe pod POD_NAME -n production

# View events
kubectl get events -n production --sort-by='.lastTimestamp'
```

---

## Useful Commands

### GCP Commands
```bash
# List GKE clusters
gcloud container clusters list

# Get cluster credentials
gcloud container clusters get-credentials estospaces-cluster --zone=europe-west2-a

# List Cloud SQL instances
gcloud sql instances list

# Connect to Cloud SQL
gcloud sql connect estospaces-db --user=postgres

# List GCS buckets
gsutil ls

# View Cloud Build history
gcloud builds list --limit=10
```

### Kubectl Commands
```bash
# Get all resources
kubectl get all -n production

# Scale deployment
kubectl scale deployment auth-service --replicas=5 -n production

# Restart deployment
kubectl rollout restart deployment/auth-service -n production

# View rollout status
kubectl rollout status deployment/auth-service -n production

# Rollback deployment
kubectl rollout undo deployment/auth-service -n production

# Get pod metrics
kubectl top pods -n production

# Get node metrics
kubectl top nodes
```

---

## Troubleshooting

### Common Issues

#### 1. Pod Won't Start
```bash
# Check events
kubectl describe pod POD_NAME -n production

# Check logs
kubectl logs POD_NAME -n production

# Common causes:
# - Image pull errors (check GCR access)
# - Resource limits (increase CPU/memory)
# - Database connection (check secrets)
```

#### 2. Ingress Not Working
```bash
# Check ingress
kubectl describe ingress api-ingress -n production

# Check nginx controller
kubectl logs -l app.kubernetes.io/name=ingress-nginx -n ingress-nginx

# Common causes:
# - DNS not configured
# - SSL certificate not ready
# - Service not found
```

#### 3. Database Connection Issues
```bash
# Check if Cloud SQL proxy is needed
kubectl run -it --rm sql-proxy --image=gcr.io/cloudsql-docker/gce-proxy:latest --restart=Never -- \
  /cloud_sql_proxy -instances=estospaces-prod:europe-west2:estospaces-db=tcp:5432

# Test connection
kubectl run -it --rm psql --image=postgres:15 --restart=Never -- \
  psql -h 10.x.x.x -U postgres -d auth_service
```

---

## Monitoring

### Grafana Dashboards

```bash
# Get Grafana admin password
kubectl get secret prometheus-grafana -n production -o jsonpath="{.data.admin-password}" | base64 --decode

# Port forward Grafana
kubectl port-forward svc/prometheus-grafana 3000:80 -n production

# Access Grafana
open http://localhost:3000
# Login: admin / PASSWORD_FROM_ABOVE
```

### Prometheus Queries

```promql
# Request rate per service
rate(http_requests_total[5m])

# Error rate
rate(http_requests_total{status=~"5.."}[5m])

# Response time (p99)
histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m]))

# Pod CPU usage
rate(container_cpu_usage_seconds_total[5m])

# Pod memory usage
container_memory_usage_bytes
```

---

## Team Responsibilities

### Backend Team
- Build Go microservices
- Write unit tests
- Create Dockerfiles
- Write Kubernetes manifests

### Frontend Team
- Create shared API client library
- Migrate React app to use new APIs
- Update routing and state management
- Test frontend integration

### DevOps Team
- Manage GCP infrastructure
- Configure Kubernetes cluster
- Set up CI/CD pipelines
- Monitor and maintain production

### QA Team
- Write integration tests
- Perform load testing
- Test end-to-end flows
- Verify data migration

---

## Success Criteria

- [ ] All microservices deployed to GKE
- [ ] Frontend successfully integrated
- [ ] Data migrated from Supabase
- [ ] Monitoring and alerts configured
- [ ] Load tests passing (1000 concurrent users)
- [ ] End-to-end tests passing
- [ ] Documentation complete
- [ ] Team trained

---

**Happy Coding! 🚀**
