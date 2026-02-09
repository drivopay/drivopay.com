# DrivoPay Backend - Go (Golang) Implementation Guide

## Why Go for DrivoPay?

Based on research of PhonePe, Paytm, and Razorpay, combined with 2026 fintech trends:
- ✅ **Cloud-Native:** Built for microservices and containerization
- ✅ **Performance:** Near C++ performance with Go's efficiency
- ✅ **Scalability:** Built-in concurrency with goroutines
- ✅ **Cost-Effective:** Lower infrastructure costs vs Java/Node.js
- ✅ **Simple Deployment:** Single binary executable
- ✅ **Future-Proof:** Growing adoption in fintech (Score: 99/120)

---

## Repository Structure

```
drivopay-backend/
├── cmd/
│   └── api/
│       └── main.go                    # Application entry point
├── internal/
│   ├── api/
│   │   ├── handlers/                  # HTTP handlers (controllers)
│   │   │   ├── auth_handler.go
│   │   │   ├── user_handler.go
│   │   │   ├── wallet_handler.go
│   │   │   ├── earning_handler.go
│   │   │   ├── expense_handler.go
│   │   │   ├── savings_handler.go
│   │   │   ├── loan_handler.go
│   │   │   ├── tax_handler.go
│   │   │   └── payment_handler.go
│   │   ├── middlewares/               # HTTP middlewares
│   │   │   ├── auth.go
│   │   │   ├── cors.go
│   │   │   ├── logger.go
│   │   │   ├── rate_limit.go
│   │   │   ├── recovery.go
│   │   │   └── validation.go
│   │   ├── routes/                    # Route definitions
│   │   │   ├── routes.go
│   │   │   └── v1.go
│   │   └── validators/                # Request validation
│   │       ├── auth_validator.go
│   │       └── transaction_validator.go
│   ├── services/                      # Business logic
│   │   ├── auth_service.go
│   │   ├── user_service.go
│   │   ├── wallet_service.go
│   │   ├── earning_service.go
│   │   ├── expense_service.go
│   │   ├── savings_service.go
│   │   ├── loan_service.go
│   │   ├── tax_service.go
│   │   ├── notification_service.go
│   │   └── payment/
│   │       ├── razorpay_service.go
│   │       ├── razorpayx_service.go
│   │       └── payment_interface.go
│   ├── models/                        # Data models
│   │   ├── user.go
│   │   ├── wallet.go
│   │   ├── transaction.go
│   │   ├── earning.go
│   │   ├── expense.go
│   │   ├── savings.go
│   │   ├── loan.go
│   │   └── tax.go
│   ├── repository/                    # Data access layer
│   │   ├── user_repository.go
│   │   ├── wallet_repository.go
│   │   ├── transaction_repository.go
│   │   ├── earning_repository.go
│   │   ├── expense_repository.go
│   │   ├── savings_repository.go
│   │   ├── loan_repository.go
│   │   └── tax_repository.go
│   ├── database/                      # Database setup
│   │   ├── postgres.go
│   │   ├── migrations.go
│   │   └── seeds.go
│   ├── cache/                         # Caching layer
│   │   └── redis.go
│   ├── config/                        # Configuration
│   │   ├── config.go
│   │   └── env.go
│   └── utils/                         # Utility functions
│       ├── logger.go
│       ├── jwt.go
│       ├── hash.go
│       ├── validator.go
│       └── response.go
├── pkg/                               # Public packages
│   ├── errors/
│   │   └── errors.go
│   └── constants/
│       └── constants.go
├── scripts/                           # Utility scripts
│   ├── migrate.sh
│   └── seed.sh
├── tests/                             # Tests
│   ├── integration/
│   ├── unit/
│   └── e2e/
├── migrations/                        # SQL migrations
│   ├── 001_create_users_table.up.sql
│   ├── 001_create_users_table.down.sql
│   ├── 002_create_wallets_table.up.sql
│   └── 002_create_wallets_table.down.sql
├── docs/                              # API documentation
│   └── swagger.yaml
├── .env.example
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── go.mod
├── go.sum
├── Makefile
└── README.md
```

---

## Core Files Implementation

### 1. `go.mod`

```go
module github.com/drivopay/drivopay-backend

go 1.22

require (
    github.com/gin-gonic/gin v1.10.0
    github.com/lib/pq v1.10.9
    github.com/go-redis/redis/v8 v8.11.5
    github.com/golang-jwt/jwt/v5 v5.2.0
    github.com/joho/godotenv v1.5.1
    github.com/google/uuid v1.6.0
    golang.org/x/crypto v0.19.0
    github.com/go-playground/validator/v10 v10.18.0
    github.com/swaggo/swag v1.16.3
    github.com/swaggo/gin-swagger v1.6.0
    gorm.io/gorm v1.25.7
    gorm.io/driver/postgres v1.5.6
)
```

### 2. `cmd/api/main.go`

```go
package main

import (
    "context"
    "fmt"
    "log"
    "net/http"
    "os"
    "os/signal"
    "syscall"
    "time"

    "github.com/drivopay/drivopay-backend/internal/api/routes"
    "github.com/drivopay/drivopay-backend/internal/cache"
    "github.com/drivopay/drivopay-backend/internal/config"
    "github.com/drivopay/drivopay-backend/internal/database"
    "github.com/drivopay/drivopay-backend/internal/utils"
    "github.com/gin-gonic/gin"
)

// @title DrivoPay API
// @version 1.0
// @description Driver financial management platform API
// @contact.name DrivoPay Support
// @contact.email support@drivopay.com
// @host localhost:8000
// @BasePath /api/v1
func main() {
    // Load configuration
    cfg, err := config.Load()
    if err != nil {
        log.Fatalf("Failed to load config: %v", err)
    }

    // Initialize logger
    logger := utils.NewLogger(cfg.Environment)

    // Connect to PostgreSQL
    db, err := database.NewPostgresDB(cfg)
    if err != nil {
        logger.Fatal("Failed to connect to database", err)
    }
    defer database.Close()

    // Run migrations
    if err := database.RunMigrations(db); err != nil {
        logger.Fatal("Failed to run migrations", err)
    }

    // Connect to Redis
    redisClient, err := cache.NewRedisClient(cfg)
    if err != nil {
        logger.Fatal("Failed to connect to Redis", err)
    }
    defer redisClient.Close()

    // Setup Gin
    if cfg.Environment == "production" {
        gin.SetMode(gin.ReleaseMode)
    }

    router := gin.New()
    router.Use(gin.Recovery())

    // Setup routes
    routes.SetupRoutes(router, db, redisClient, cfg, logger)

    // Create HTTP server
    srv := &http.Server{
        Addr:           fmt.Sprintf(":%s", cfg.Port),
        Handler:        router,
        ReadTimeout:    10 * time.Second,
        WriteTimeout:   10 * time.Second,
        MaxHeaderBytes: 1 << 20, // 1 MB
    }

    // Start server in goroutine
    go func() {
        logger.Info(fmt.Sprintf("🚀 Server starting on port %s", cfg.Port))
        if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
            logger.Fatal("Failed to start server", err)
        }
    }()

    // Graceful shutdown
    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
    <-quit

    logger.Info("Shutting down server...")

    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()

    if err := srv.Shutdown(ctx); err != nil {
        logger.Fatal("Server forced to shutdown", err)
    }

    logger.Info("Server exited")
}
```

### 3. `internal/config/config.go`

```go
package config

import (
    "fmt"
    "os"

    "github.com/joho/godotenv"
)

type Config struct {
    Environment string
    Port        string

    // Database
    DatabaseURL  string
    DBHost       string
    DBPort       string
    DBName       string
    DBUser       string
    DBPassword   string
    DBSSL        string

    // Redis
    RedisURL      string
    RedisHost     string
    RedisPort     string
    RedisPassword string
    RedisDB       string

    // JWT
    JWTSecret           string
    JWTExpiresIn        string
    JWTRefreshSecret    string
    JWTRefreshExpiresIn string

    // Razorpay
    RazorpayKeyID        string
    RazorpayKeySecret    string
    RazorpayWebhookSecret string
    RazorpayXAccountNumber string

    // CORS
    CORSOrigin      string
    CORSCredentials bool

    // Rate Limiting
    RateLimitWindowMS      int
    RateLimitMaxRequests   int
}

func Load() (*Config, error) {
    // Load .env file in development
    if os.Getenv("GO_ENV") != "production" {
        if err := godotenv.Load(); err != nil {
            fmt.Println("Warning: .env file not found")
        }
    }

    cfg := &Config{
        Environment: getEnv("NODE_ENV", "development"),
        Port:        getEnv("PORT", "8000"),

        DatabaseURL: getEnv("DATABASE_URL", ""),
        DBHost:      getEnv("DB_HOST", "localhost"),
        DBPort:      getEnv("DB_PORT", "5432"),
        DBName:      getEnv("DB_NAME", "drivopay_db"),
        DBUser:      getEnv("DB_USER", "drivopay"),
        DBPassword:  getEnv("DB_PASSWORD", "password"),
        DBSSL:       getEnv("DB_SSL", "disable"),

        RedisURL:      getEnv("REDIS_URL", ""),
        RedisHost:     getEnv("REDIS_HOST", "localhost"),
        RedisPort:     getEnv("REDIS_PORT", "6379"),
        RedisPassword: getEnv("REDIS_PASSWORD", ""),
        RedisDB:       getEnv("REDIS_DB", "0"),

        JWTSecret:           getEnv("JWT_SECRET", "your-secret-key"),
        JWTExpiresIn:        getEnv("JWT_EXPIRES_IN", "7d"),
        JWTRefreshSecret:    getEnv("JWT_REFRESH_SECRET", "your-refresh-secret"),
        JWTRefreshExpiresIn: getEnv("JWT_REFRESH_EXPIRES_IN", "30d"),

        RazorpayKeyID:        getEnv("RAZORPAY_KEY_ID", ""),
        RazorpayKeySecret:    getEnv("RAZORPAY_KEY_SECRET", ""),
        RazorpayWebhookSecret: getEnv("RAZORPAY_WEBHOOK_SECRET", ""),
        RazorpayXAccountNumber: getEnv("RAZORPAYX_ACCOUNT_NUMBER", ""),

        CORSOrigin:      getEnv("CORS_ORIGIN", "*"),
        CORSCredentials: getEnvBool("CORS_CREDENTIALS", true),

        RateLimitWindowMS:    getEnvInt("RATE_LIMIT_WINDOW_MS", 900000),
        RateLimitMaxRequests: getEnvInt("RATE_LIMIT_MAX_REQUESTS", 100),
    }

    return cfg, nil
}

func getEnv(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}

func getEnvBool(key string, defaultValue bool) bool {
    if value := os.Getenv(key); value != "" {
        return value == "true"
    }
    return defaultValue
}

func getEnvInt(key string, defaultValue int) int {
    if value := os.Getenv(key); value != "" {
        var intVal int
        fmt.Sscanf(value, "%d", &intVal)
        return intVal
    }
    return defaultValue
}
```

### 4. `internal/models/user.go`

```go
package models

import (
    "time"

    "github.com/google/uuid"
)

type User struct {
    ID            uuid.UUID  `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"id"`
    Email         string     `gorm:"uniqueIndex;not null" json:"email"`
    Phone         string     `gorm:"uniqueIndex;not null" json:"phone"`
    PasswordHash  string     `gorm:"not null" json:"-"`
    FullName      string     `gorm:"not null" json:"full_name"`
    ProfileImage  *string    `json:"profile_image,omitempty"`
    Status        string     `gorm:"default:'active'" json:"status"`
    KYCStatus     string     `gorm:"default:'pending'" json:"kyc_status"`
    CreatedAt     time.Time  `gorm:"autoCreateTime" json:"created_at"`
    UpdatedAt     time.Time  `gorm:"autoUpdateTime" json:"updated_at"`

    // Relations
    Wallets       []Wallet       `gorm:"foreignKey:UserID" json:"wallets,omitempty"`
    Transactions  []Transaction  `gorm:"foreignKey:UserID" json:"transactions,omitempty"`
}

type UserResponse struct {
    ID           uuid.UUID  `json:"id"`
    Email        string     `json:"email"`
    Phone        string     `json:"phone"`
    FullName     string     `json:"full_name"`
    ProfileImage *string    `json:"profile_image,omitempty"`
    Status       string     `json:"status"`
    KYCStatus    string     `json:"kyc_status"`
    CreatedAt    time.Time  `json:"created_at"`
}

func (u *User) ToResponse() UserResponse {
    return UserResponse{
        ID:           u.ID,
        Email:        u.Email,
        Phone:        u.Phone,
        FullName:     u.FullName,
        ProfileImage: u.ProfileImage,
        Status:       u.Status,
        KYCStatus:    u.KYCStatus,
        CreatedAt:    u.CreatedAt,
    }
}
```

### 5. `internal/models/wallet.go`

```go
package models

import (
    "time"

    "github.com/google/uuid"
)

type Wallet struct {
    ID        uuid.UUID `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"id"`
    UserID    uuid.UUID `gorm:"type:uuid;not null" json:"user_id"`
    Balance   float64   `gorm:"type:decimal(15,2);default:0.00" json:"balance"`
    Currency  string    `gorm:"default:'INR'" json:"currency"`
    Status    string    `gorm:"default:'active'" json:"status"`
    CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`
    UpdatedAt time.Time `gorm:"autoUpdateTime" json:"updated_at"`

    // Relations
    User         User          `gorm:"foreignKey:UserID" json:"user,omitempty"`
    Transactions []Transaction `gorm:"foreignKey:WalletID" json:"transactions,omitempty"`
}
```

### 6. `internal/api/handlers/auth_handler.go`

```go
package handlers

import (
    "net/http"

    "github.com/drivopay/drivopay-backend/internal/models"
    "github.com/drivopay/drivopay-backend/internal/services"
    "github.com/drivopay/drivopay-backend/internal/utils"
    "github.com/gin-gonic/gin"
)

type AuthHandler struct {
    authService *services.AuthService
    logger      *utils.Logger
}

func NewAuthHandler(authService *services.AuthService, logger *utils.Logger) *AuthHandler {
    return &AuthHandler{
        authService: authService,
        logger:      logger,
    }
}

type RegisterRequest struct {
    Email    string `json:"email" binding:"required,email"`
    Phone    string `json:"phone" binding:"required"`
    Password string `json:"password" binding:"required,min=8"`
    FullName string `json:"full_name" binding:"required"`
}

type LoginRequest struct {
    Email    string `json:"email" binding:"required,email"`
    Password string `json:"password" binding:"required"`
}

type AuthResponse struct {
    User         models.UserResponse `json:"user"`
    AccessToken  string              `json:"access_token"`
    RefreshToken string              `json:"refresh_token"`
}

// Register godoc
// @Summary Register a new user
// @Description Create a new user account
// @Tags auth
// @Accept json
// @Produce json
// @Param request body RegisterRequest true "Register Request"
// @Success 201 {object} AuthResponse
// @Failure 400 {object} utils.ErrorResponse
// @Router /auth/register [post]
func (h *AuthHandler) Register(c *gin.Context) {
    var req RegisterRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request", err)
        return
    }

    user, accessToken, refreshToken, err := h.authService.Register(
        c.Request.Context(),
        req.Email,
        req.Phone,
        req.Password,
        req.FullName,
    )
    if err != nil {
        utils.ErrorResponse(c, http.StatusBadRequest, "Registration failed", err)
        return
    }

    utils.SuccessResponse(c, http.StatusCreated, "User registered successfully", AuthResponse{
        User:         user.ToResponse(),
        AccessToken:  accessToken,
        RefreshToken: refreshToken,
    })
}

// Login godoc
// @Summary User login
// @Description Authenticate user and return tokens
// @Tags auth
// @Accept json
// @Produce json
// @Param request body LoginRequest true "Login Request"
// @Success 200 {object} AuthResponse
// @Failure 401 {object} utils.ErrorResponse
// @Router /auth/login [post]
func (h *AuthHandler) Login(c *gin.Context) {
    var req LoginRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request", err)
        return
    }

    user, accessToken, refreshToken, err := h.authService.Login(
        c.Request.Context(),
        req.Email,
        req.Password,
    )
    if err != nil {
        utils.ErrorResponse(c, http.StatusUnauthorized, "Invalid credentials", err)
        return
    }

    utils.SuccessResponse(c, http.StatusOK, "Login successful", AuthResponse{
        User:         user.ToResponse(),
        AccessToken:  accessToken,
        RefreshToken: refreshToken,
    })
}
```

### 7. `internal/api/routes/routes.go`

```go
package routes

import (
    "github.com/drivopay/drivopay-backend/internal/api/handlers"
    "github.com/drivopay/drivopay-backend/internal/api/middlewares"
    "github.com/drivopay/drivopay-backend/internal/cache"
    "github.com/drivopay/drivopay-backend/internal/config"
    "github.com/drivopay/drivopay-backend/internal/repository"
    "github.com/drivopay/drivopay-backend/internal/services"
    "github.com/drivopay/drivopay-backend/internal/utils"
    "github.com/gin-gonic/gin"
    swaggerFiles "github.com/swaggo/files"
    ginSwagger "github.com/swaggo/gin-swagger"
    "gorm.io/gorm"
)

func SetupRoutes(
    router *gin.Engine,
    db *gorm.DB,
    redis *cache.RedisClient,
    cfg *config.Config,
    logger *utils.Logger,
) {
    // Middlewares
    router.Use(middlewares.CORS(cfg))
    router.Use(middlewares.Logger(logger))
    router.Use(middlewares.RateLimit(redis, cfg))

    // Health check
    router.GET("/health", func(c *gin.Context) {
        c.JSON(200, gin.H{
            "status":    "ok",
            "timestamp": utils.NowISO(),
        })
    })

    // Swagger docs
    router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

    // API v1
    v1 := router.Group("/api/v1")
    {
        // Initialize repositories
        userRepo := repository.NewUserRepository(db)
        walletRepo := repository.NewWalletRepository(db)
        transactionRepo := repository.NewTransactionRepository(db)

        // Initialize services
        authService := services.NewAuthService(userRepo, cfg, logger)
        userService := services.NewUserService(userRepo, logger)
        walletService := services.NewWalletService(walletRepo, transactionRepo, logger)

        // Initialize handlers
        authHandler := handlers.NewAuthHandler(authService, logger)
        userHandler := handlers.NewUserHandler(userService, logger)
        walletHandler := handlers.NewWalletHandler(walletService, logger)

        // Auth routes (public)
        authRoutes := v1.Group("/auth")
        {
            authRoutes.POST("/register", authHandler.Register)
            authRoutes.POST("/login", authHandler.Login)
            authRoutes.POST("/refresh", authHandler.RefreshToken)
            authRoutes.POST("/forgot-password", authHandler.ForgotPassword)
            authRoutes.POST("/reset-password", authHandler.ResetPassword)
        }

        // Protected routes
        protected := v1.Group("")
        protected.Use(middlewares.AuthMiddleware(cfg, logger))
        {
            // User routes
            users := protected.Group("/users")
            {
                users.GET("/me", userHandler.GetMe)
                users.PUT("/me", userHandler.UpdateMe)
                users.PATCH("/me/password", userHandler.ChangePassword)
            }

            // Wallet routes
            wallets := protected.Group("/wallets")
            {
                wallets.GET("", walletHandler.GetWallets)
                wallets.GET("/:id", walletHandler.GetWallet)
                wallets.GET("/:id/balance", walletHandler.GetBalance)
                wallets.POST("/deposit", walletHandler.Deposit)
                wallets.POST("/withdraw", walletHandler.Withdraw)
                wallets.GET("/:id/transactions", walletHandler.GetTransactions)
            }

            // Additional routes...
        }
    }
}
```

---

## Dockerfile

```dockerfile
# Build stage
FROM golang:1.22-alpine AS builder

WORKDIR /app

# Install git and ca-certificates
RUN apk add --no-cache git ca-certificates

# Copy go mod files
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main ./cmd/api

# Final stage
FROM alpine:latest

RUN apk --no-cache add ca-certificates tzdata

WORKDIR /root/

# Copy binary from builder
COPY --from=builder /app/main .
COPY --from=builder /app/.env.example .env

# Create non-root user
RUN addgroup -g 1001 -S appuser && \
    adduser -u 1001 -S appuser -G appuser && \
    chown -R appuser:appuser /root

USER appuser

EXPOSE 8000

CMD ["./main"]
```

---

## Makefile

```makefile
.PHONY: help build run test docker-build docker-up docker-down migrate seed clean

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build: ## Build the Go application
	go build -o bin/api cmd/api/main.go

run: ## Run the application
	go run cmd/api/main.go

test: ## Run tests
	go test -v ./...

test-coverage: ## Run tests with coverage
	go test -v -coverprofile=coverage.out ./...
	go tool cover -html=coverage.out

docker-build: ## Build Docker image
	docker build -t drivopay-backend:latest .

docker-up: ## Start Docker containers
	docker-compose up -d

docker-down: ## Stop Docker containers
	docker-compose down

docker-logs: ## View Docker logs
	docker-compose logs -f

migrate: ## Run database migrations
	go run cmd/migrate/main.go

seed: ## Seed database with test data
	go run cmd/seed/main.go

lint: ## Run linter
	golangci-lint run

swagger: ## Generate Swagger documentation
	swag init -g cmd/api/main.go

clean: ## Clean build artifacts
	rm -rf bin/ coverage.out

deps: ## Download dependencies
	go mod download
	go mod tidy

dev: ## Run with hot reload (requires air)
	air
```

---

## `.env.example`

```env
# Application
NODE_ENV=development
PORT=8000
GO_ENV=development

# Database
DATABASE_URL=postgresql://drivopay:password@localhost:5432/drivopay_db?sslmode=disable
DB_HOST=localhost
DB_PORT=5432
DB_NAME=drivopay_db
DB_USER=drivopay
DB_PASSWORD=password
DB_SSL=disable

# Redis
REDIS_URL=redis://localhost:6379
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-refresh-secret
JWT_REFRESH_EXPIRES_IN=30d

# Razorpay
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_secret_here
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
RAZORPAYX_ACCOUNT_NUMBER=your_account_number

# CORS
CORS_ORIGIN=http://localhost:3001,http://localhost:3000
CORS_CREDENTIALS=true

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

---

## Quick Start

### 1. Initialize Go Module
```bash
mkdir drivopay-backend && cd drivopay-backend
go mod init github.com/drivopay/drivopay-backend
```

### 2. Install Dependencies
```bash
go get github.com/gin-gonic/gin
go get gorm.io/gorm
go get gorm.io/driver/postgres
go get github.com/go-redis/redis/v8
go get github.com/golang-jwt/jwt/v5
go get github.com/google/uuid
go get golang.org/x/crypto
go get github.com/joho/godotenv
```

### 3. Run Locally
```bash
# Copy env file
cp .env.example .env

# Run PostgreSQL & Redis
docker-compose up -d postgres redis

# Run the app
make run
# or
go run cmd/api/main.go
```

### 4. Access API
- **API:** http://localhost:8000
- **Health:** http://localhost:8000/health
- **Swagger Docs:** http://localhost:8000/swagger/index.html

---

## Performance Benefits

### Go vs Node.js vs Java

| Metric | Go | Node.js | Java |
|--------|-----|---------|------|
| **Startup Time** | ~10ms | ~200ms | ~2s |
| **Memory Usage** | 25MB | 60MB | 150MB |
| **Requests/sec** | 45K | 15K | 35K |
| **Container Size** | 15MB | 150MB | 250MB |
| **Build Time** | 5s | N/A | 30s |

---

## Next Steps

1. ✅ Setup repository structure
2. ✅ Implement core models
3. ⬜ Implement all handlers
4. ⬜ Add comprehensive tests
5. ⬜ Setup CI/CD pipeline
6. ⬜ Add monitoring (Prometheus metrics)
7. ⬜ Deploy to GCP Cloud Run

---

## Useful Resources

- [Go Documentation](https://go.dev/doc/)
- [Gin Framework](https://gin-gonic.com/)
- [GORM](https://gorm.io/)
- [Go Redis](https://redis.uptrace.dev/)
- [Go Best Practices](https://github.com/golang-standards/project-layout)

---

**Created:** 2026-02-09
**Recommended by:** Backend Technology Analysis (Score: 99/120)
