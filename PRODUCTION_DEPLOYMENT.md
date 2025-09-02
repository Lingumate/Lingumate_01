# Production Deployment Guide

This guide explains how to deploy the Lingumate application to production with:
- **Frontend**: Hosted on Vercel
- **Backend**: Hosted on Render
- **Database**: PostgreSQL on Render

## Prerequisites

1. Vercel account
2. Render account
3. All necessary API keys and environment variables

## Backend Deployment on Render

### 1. Create a new Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select the `backend` folder as the root directory

### 2. Configure the Web Service

- **Name**: `lingumate-backend`
- **Environment**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Plan**: Choose appropriate plan (Starter for testing, Standard for production)

### 3. Set Environment Variables

Add these environment variables in Render:

```bash
# Database (Render PostgreSQL)
DATABASE_URL=postgresql://username:password@host:port/database_name

# JWT & Session
JWT_SECRET=your-super-secret-jwt-key-here
SESSION_SECRET=your-super-secret-session-key-here

# API Keys
OPENAI_API_KEY=your-openai-api-key
GOOGLE_AI_API_KEY=your-google-ai-api-key
GOOGLE_CLIENT_ID=your-google-client-id

# Payment
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret

# Firebase
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY=your-firebase-private-key
FIREBASE_CLIENT_EMAIL=your-firebase-client-email

# Genkit
GENKIT_API_KEY=your-genkit-api-key

# Server
PORT=10000
NODE_ENV=production

# Frontend URLs (Update with your actual Vercel URL)
FRONTEND_URL=https://your-vercel-app.vercel.app
CORS_ORIGIN=https://your-vercel-app.vercel.app
ALLOWED_ORIGINS=https://your-vercel-app.vercel.app
```

### 4. Create PostgreSQL Database on Render

1. Go to Render Dashboard
2. Click "New +" → "PostgreSQL"
3. Choose appropriate plan
4. Copy the `DATABASE_URL` and add it to your environment variables

### 5. Deploy

1. Click "Create Web Service"
2. Render will automatically build and deploy your backend
3. Note the generated URL (e.g., `https://lingumate-backend.onrender.com`)

## Frontend Deployment on Vercel

### 1. Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Set the root directory to `frontend`

### 2. Configure Environment Variables

Add these environment variables in Vercel:

```bash
# Backend API URL (Your Render backend URL)
VITE_API_URL=https://lingumate-backend.onrender.com

# Other frontend-specific variables
VITE_APP_NAME=Lingumate
VITE_APP_VERSION=1.0.0
```

### 3. Update Frontend Configuration

Make sure your frontend code uses the `VITE_API_URL` environment variable to connect to the backend:

```typescript
// In your API configuration files
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:10000';
```

### 4. Deploy

1. Click "Deploy"
2. Vercel will build and deploy your frontend
3. Note the generated URL (e.g., `https://your-app.vercel.app`)

## Update Backend CORS Configuration

After getting your Vercel URL, update the backend environment variables in Render:

1. Go to your Render backend service
2. Update these environment variables:
   - `FRONTEND_URL`: Your Vercel frontend URL
   - `CORS_ORIGIN`: Your Vercel frontend URL
   - `ALLOWED_ORIGINS`: Your Vercel frontend URL

3. Redeploy the backend service

## Health Check

Your backend includes a health check endpoint at `/health` which Render will use to monitor the service.

## Important Notes

1. **Port Configuration**: The backend is configured to use port 10000 (Render's default)
2. **CORS**: Properly configured to allow requests from your Vercel frontend
3. **Environment Variables**: All sensitive data should be stored as environment variables
4. **Database**: Ensure your PostgreSQL database is properly configured and accessible
5. **SSL**: Render provides SSL certificates automatically

## Troubleshooting

### Build Failures
- Check that all dependencies are in `package.json`
- Verify TypeScript compilation passes locally
- Check Render build logs for specific errors

### CORS Issues
- Verify `ALLOWED_ORIGINS` includes your Vercel URL
- Check that CORS middleware is applied before routes
- Ensure frontend is using HTTPS

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check that database is accessible from Render
- Ensure database migrations have been run

## Security Considerations

1. **Environment Variables**: Never commit sensitive data to version control
2. **CORS**: Only allow necessary origins
3. **Rate Limiting**: Consider implementing rate limiting for production
4. **HTTPS**: Always use HTTPS in production
5. **API Keys**: Rotate API keys regularly

## Monitoring

- Use Render's built-in monitoring
- Set up logging for production debugging
- Monitor database performance
- Set up alerts for service failures
