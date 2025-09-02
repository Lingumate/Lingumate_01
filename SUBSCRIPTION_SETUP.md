# Subscription System Setup Guide

## Overview
This guide will help you set up the premium subscription system with Razorpay integration for Lingumate.

## Environment Variables Required

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL=your_database_url_here

# JWT and Session
JWT_SECRET=your-jwt-secret-key
SESSION_SECRET=your-session-secret

# API Keys
OPENAI_API_KEY=your_openai_api_key_here
GOOGLE_AI_API_KEY=your_google_ai_api_key_here
GOOGLE_CLIENT_ID=your_google_client_id_here

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend Environment Variables (for Vite)
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id_here
```

## Razorpay Setup

1. **Create a Razorpay Account**
   - Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
   - Sign up for a new account
   - Complete the verification process

2. **Get API Keys**
   - Navigate to Settings > API Keys in your Razorpay dashboard
   - Generate a new key pair
   - Copy the Key ID and Key Secret
   - Add them to your `.env` file

3. **Test Mode vs Live Mode**
   - Use test keys for development
   - Switch to live keys for production
   - Test cards are available in the Razorpay documentation

## Database Setup

Run the database migration to create the subscriptions table:

```bash
npm run db:push
```

## Features Implemented

### Subscription Plans
1. **Individual Plan** - $50/month or $500/year
2. **Group Plan** - $150/month or $1500/year (up to 4 users)
3. **Business Plan** - $500/month or $5000/year (unlimited users)
4. **Day Pass** - $10 for 24 hours

### Frontend Components
- Premium button in header/navigation
- Subscription page with pricing plans
- Monthly/yearly billing toggle
- Razorpay payment integration
- Responsive design with modern UI

### Backend API
- `/api/subscription/create-order` - Create Razorpay order
- `/api/subscription/verify-payment` - Verify payment and create subscription
- `/api/subscription/current` - Get user's current subscription
- `/api/subscription/cancel` - Cancel subscription
- `/api/subscription/plans` - Get available plans

### Database Schema
- `subscriptions` table with all necessary fields
- Relations to users table
- Support for multiple billing cycles
- Payment tracking with Razorpay IDs

## Usage

### For Users
1. Click the "Premium" button in the header
2. Choose a subscription plan
3. Toggle between monthly and yearly billing
4. Click "Subscribe" to proceed to payment
5. Complete payment through Razorpay
6. Access premium features immediately

### For Developers
1. Set up environment variables
2. Run database migrations
3. Test with Razorpay test keys
4. Deploy with live keys for production

## Security Features
- Payment signature verification
- User authentication required for all subscription operations
- Secure API endpoints with proper validation
- Database-level constraints and relations

## Testing
- Use Razorpay test cards for development
- Test all subscription flows
- Verify payment webhooks
- Test subscription cancellation

## Support
For issues or questions about the subscription system, refer to:
- Razorpay documentation
- Database schema in `shared/schema.ts`
- API routes in `server/routes/subscriptionRoutes.ts`
- Frontend components in `client/src/pages/subscription.tsx`
