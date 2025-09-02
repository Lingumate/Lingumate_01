# Razorpay Setup Guide

## Current Issue
The server is failing to start because Razorpay API keys are not configured. You need to add the following environment variables to your `.env` file:

## Required Environment Variables

Add these to your `.env` file:

```env
# Razorpay API Keys (Required for subscription system)
RAZORPAY_KEY_ID="your-razorpay-key-id"
RAZORPAY_KEY_SECRET="your-razorpay-key-secret"

# Frontend Razorpay Key (for client-side checkout)
VITE_RAZORPAY_KEY_ID="your-razorpay-key-id"
```

## How to Get Razorpay API Keys

1. **Sign up for Razorpay**: Go to [razorpay.com](https://razorpay.com) and create an account
2. **Access Dashboard**: Log in to your Razorpay dashboard
3. **Get API Keys**: 
   - Go to Settings → API Keys
   - Generate a new key pair
   - Copy the Key ID and Key Secret

## Testing Setup

For testing purposes, you can use Razorpay's test mode:
- Use test API keys (they start with `rzp_test_`)
- Test card numbers are available in the Razorpay documentation

## After Adding Environment Variables

1. Restart your development server:
   ```bash
   npm run dev:restart
   ```

2. The dashboard should now load properly

## Note
The subscription system will only work when these environment variables are properly configured. Without them, the server will fail to start.
