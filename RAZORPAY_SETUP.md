# Razorpay Payment Gateway Integration Guide

This document provides step-by-step instructions for setting up and using Razorpay payment gateway in the DrivoPay application.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Getting Razorpay API Keys](#getting-razorpay-api-keys)
3. [Environment Setup](#environment-setup)
4. [Features Implemented](#features-implemented)
5. [Testing the Integration](#testing-the-integration)
6. [Webhook Configuration](#webhook-configuration)
7. [Going Live (Production)](#going-live-production)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have:

- A Razorpay account (Sign up at https://dashboard.razorpay.com/signup)
- Node.js and npm installed
- This Next.js application running locally

---

## Getting Razorpay API Keys

### Step 1: Sign Up / Login to Razorpay

1. Go to https://dashboard.razorpay.com
2. Sign up for a new account or login if you already have one
3. Complete the basic registration process

### Step 2: Generate API Keys (Test Mode)

1. Once logged in, you'll land on the dashboard
2. Look for the **"Test Mode"** toggle in the top-right corner - ensure it's ON (blue)
3. Navigate to **Settings** → **API Keys** from the left sidebar
4. Click on **"Generate Test Key"**
5. You'll see two keys:
   - **Key ID** (starts with `rzp_test_`)
   - **Key Secret** (keep this secret!)
6. Click on **"Download Key Details"** to save them securely

### Step 3: Generate Webhook Secret

1. Go to **Settings** → **Webhooks**
2. Click on **"Create New Webhook"** or edit existing webhook
3. Generate a webhook secret (you'll need this for signature verification)

---

## Environment Setup

### Step 1: Copy Environment File

```bash
cp .env.example .env.local
```

### Step 2: Update .env.local with Your Razorpay Credentials

Open `.env.local` and replace the placeholders:

```bash
# Razorpay Configuration - TEST MODE
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_YOUR_ACTUAL_KEY_ID_HERE
RAZORPAY_KEY_SECRET=YOUR_ACTUAL_SECRET_KEY_HERE
RAZORPAY_WEBHOOK_SECRET=YOUR_WEBHOOK_SECRET_HERE

# For RazorpayX Payouts (optional for now)
RAZORPAYX_ACCOUNT_NUMBER=YOUR_RAZORPAYX_ACCOUNT_NUMBER
```

**Important:**
- Never commit `.env.local` to version control
- Keep your secret keys secure
- Use test keys during development

### Step 3: Restart Your Development Server

```bash
npm run dev
```

---

## Features Implemented

### 1. Receive Payments (QR Code)

**Location:** Dashboard → Receive Button

**How it works:**
- Driver enters payment amount
- System generates a Razorpay UPI QR code
- Customer scans QR with any UPI app (PhonePe, Google Pay, Paytm, etc.)
- Payment is instantly credited

**API Endpoint:** `/api/razorpay/create-qr`

### 2. Withdrawals/Payouts

**Location:** Dashboard → Withdraw Button

**How it works:**
- Driver initiates withdrawal
- System creates payout via RazorpayX
- Money is transferred to driver's bank account via IMPS/UPI

**API Endpoint:** `/api/razorpay/payout`

**Note:** Requires RazorpayX activation and KYC completion

### 3. Payment Verification

**API Endpoint:** `/api/razorpay/verify-payment`

Verifies payment signature to ensure authenticity.

### 4. Webhook Handler

**API Endpoint:** `/api/razorpay/webhook`

Receives real-time notifications for:
- Payment captured
- Payment failed
- QR code credited
- Payout processed
- Payout failed

---

## Testing the Integration

### Test QR Code Generation

1. **Login to the application**
2. **Go to Dashboard**
3. **Click "Receive" button**
4. **Enter amount** (e.g., ₹100)
5. **QR code should generate automatically**

### Test Payment (Without Real Money)

Since you're in test mode, you can test payments without real money:

1. Use Razorpay's test UPI IDs:
   - **Success:** `success@razorpay`
   - **Failure:** `failure@razorpay`
2. Scan the generated QR code with your UPI app
3. Enter the test UPI ID when prompted
4. Complete the payment

### Verify in Razorpay Dashboard

1. Go to Razorpay Dashboard
2. Navigate to **Transactions** → **Payments**
3. You should see your test payment listed

---

## Webhook Configuration

Webhooks allow you to receive real-time notifications about payment status.

### Step 1: Setup Ngrok (For Local Testing)

```bash
# Install ngrok
npm install -g ngrok

# Start your Next.js dev server
npm run dev

# In another terminal, expose localhost
ngrok http 3002

# You'll get a URL like: https://abc123.ngrok.io
```

### Step 2: Configure Webhook in Razorpay Dashboard

1. Go to **Settings** → **Webhooks**
2. Click **"Create New Webhook"** or edit existing
3. Enter webhook URL: `https://abc123.ngrok.io/api/razorpay/webhook`
   (Replace with your ngrok URL)
4. Select events to subscribe:
   - ✅ `payment.captured`
   - ✅ `payment.failed`
   - ✅ `qr_code.credited`
   - ✅ `qr_code.closed`
   - ✅ `payout.processed`
   - ✅ `payout.failed`
5. Generate webhook secret and add it to `.env.local`
6. Click **"Create Webhook"** or **"Update"**

### Step 3: Test Webhook

1. Make a test payment
2. Check your terminal logs
3. You should see webhook event logs

---

## Going Live (Production)

### Prerequisites for Going Live

1. **Complete KYC:** Submit required documents
2. **Submit Live Website:** Provide your production URL
3. **Integration Review:** Razorpay reviews your integration
4. **Activation:** Usually takes 2-3 business days

### Step 1: Generate Live API Keys

1. Switch to **Live Mode** in Razorpay Dashboard (toggle in top-right)
2. Go to **Settings** → **API Keys**
3. Generate **Live Keys** (starts with `rzp_live_`)
4. Download and save securely

### Step 2: Update Environment Variables

```bash
# Production .env (on your server)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_LIVE_SECRET_KEY
RAZORPAY_WEBHOOK_SECRET=YOUR_LIVE_WEBHOOK_SECRET
RAZORPAYX_ACCOUNT_NUMBER=YOUR_LIVE_RAZORPAYX_ACCOUNT
```

### Step 3: Update Webhook URL

1. Go to **Settings** → **Webhooks** (in Live Mode)
2. Update webhook URL to production: `https://drivopay.com/api/razorpay/webhook`
3. Save changes

### Step 4: Test in Production

1. Deploy your application
2. Make a small real payment (₹1) to test
3. Verify payment appears in Live Mode dashboard
4. Check webhook logs

---

## RazorpayX Setup (For Payouts/Withdrawals)

### Prerequisites

1. **Complete KYC:** Full business verification
2. **Bank Account Verification:** Link business bank account
3. **Activation:** RazorpayX activation (separate from Payment Gateway)

### Steps to Activate

1. Login to Razorpay Dashboard
2. Navigate to **RazorpayX** section
3. Complete KYC and bank account verification
4. Wait for activation (usually 2-3 business days)
5. Add funds to RazorpayX account
6. Get your RazorpayX account number
7. Add it to `.env.local`:
   ```bash
   RAZORPAYX_ACCOUNT_NUMBER=your_account_number_here
   ```

### Testing Payouts

1. Ensure RazorpayX is activated
2. Add test funds to your account
3. Use the Withdraw feature in the application
4. Check **RazorpayX** → **Payouts** in dashboard

---

## Troubleshooting

### Issue 1: "Invalid API Key" Error

**Solution:**
- Verify API keys in `.env.local`
- Ensure no extra spaces in keys
- Check if you're using test keys in test mode
- Restart dev server after updating `.env.local`

### Issue 2: QR Code Not Generating

**Possible Causes:**
- Invalid or missing API keys
- Amount is 0 or negative
- Razorpay API rate limit reached

**Solution:**
- Check browser console for errors
- Verify `.env.local` configuration
- Check Razorpay dashboard for API status

### Issue 3: Webhook Signature Mismatch

**Solution:**
- Verify webhook secret in `.env.local`
- Ensure no body parsing middleware is interfering
- Check webhook secret matches Razorpay dashboard

### Issue 4: Payout Fails

**Possible Causes:**
- RazorpayX not activated
- Insufficient balance in RazorpayX account
- Invalid bank account details
- KYC not completed

**Solution:**
- Complete RazorpayX KYC
- Add funds to RazorpayX account
- Verify bank details (IFSC, account number)
- Check payout limits

### Issue 5: CORS Errors

**Solution:**
- Never call Razorpay APIs directly from frontend
- Always use Next.js API routes (server-side)
- Check API route paths

---

## Security Best Practices

1. **Never Expose Secret Keys:**
   - Only `NEXT_PUBLIC_RAZORPAY_KEY_ID` can be in frontend
   - Keep `RAZORPAY_KEY_SECRET` server-side only

2. **Always Verify Payments:**
   - Never trust frontend-only verification
   - Use webhook handler for reliable confirmation
   - Verify payment signature on backend

3. **Use HTTPS in Production:**
   - Razorpay requires HTTPS for webhooks
   - Use SSL certificates

4. **Implement Idempotency:**
   - Store webhook event IDs to prevent duplicate processing
   - Handle webhook retries properly

5. **Rate Limiting:**
   - Implement rate limiting on API routes
   - Prevent abuse of QR generation

---

## Support and Resources

- **Razorpay Documentation:** https://razorpay.com/docs/
- **Razorpay Dashboard:** https://dashboard.razorpay.com/
- **Razorpay Support:** support@razorpay.com
- **Razorpay Status Page:** https://status.razorpay.com/

### Useful Links

- [API Documentation](https://razorpay.com/docs/api/)
- [QR Code API](https://razorpay.com/docs/payments/qr-codes/apis/)
- [RazorpayX Payouts](https://razorpay.com/docs/x/payouts/)
- [Webhook Guide](https://razorpay.com/docs/webhooks/)
- [Test Cards & UPI](https://razorpay.com/docs/payments/payments/test-card-upi-details/)

---

## Quick Start Checklist

- [ ] Create Razorpay account
- [ ] Generate test API keys
- [ ] Update `.env.local` with keys
- [ ] Restart development server
- [ ] Test QR code generation
- [ ] Setup ngrok for webhooks (optional)
- [ ] Configure webhooks in dashboard
- [ ] Test payment flow
- [ ] Complete KYC for live mode
- [ ] Activate RazorpayX for payouts
- [ ] Switch to live keys in production
- [ ] Update production webhooks
- [ ] Monitor transactions in dashboard

---

## Need Help?

If you encounter any issues not covered in this guide:

1. Check Razorpay documentation
2. Review API response errors in terminal logs
3. Check Razorpay dashboard for transaction details
4. Contact Razorpay support

---

**Note:** This integration is currently in TEST MODE. All transactions are simulated and no real money is involved. Switch to LIVE MODE only after completing KYC and getting approval from Razorpay.
