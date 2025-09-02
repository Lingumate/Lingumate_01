# Lingumate Deployment Guide

This guide explains how to deploy the frontend and backend separately on Vercel and Render respectively.

## Project Structure

```
├── frontend/          # React + Vite frontend (deploy to Vercel)
│   ├── src/          # Source code
│   ├── package.json  # Frontend dependencies
│   ├── vite.config.ts
│   ├── vercel.json   # Vercel configuration
│   └── .gitignore
│
└── backend/           # Express.js backend (deploy to Render)
    ├── config/        # Configuration files
    ├── routes/        # API routes
    ├── services/      # Business logic
    ├── shared/        # Shared schemas
    ├── uploads/       # File uploads
    ├── package.json   # Backend dependencies
    ├── render.yaml    # Render configuration
    ├── .env          # Environment variables (DO NOT COMMIT)
    └── .gitignore
```

## Frontend Deployment (Vercel)

### 1. Prepare Frontend
```bash
cd frontend
npm install
npm run build
```

### 2. Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect the Vite configuration
4. Set build command: `npm run build`
5. Set output directory: `dist`
6. Deploy!

### 3. Environment Variables (Frontend)
Only set non-sensitive environment variables in Vercel:
- `NODE_ENV=production`
- Any public API endpoints

## Backend Deployment (Render)

### 1. Prepare Backend
```bash
cd backend
npm install
npm run build
```

### 2. Deploy to Render
1. Push your code to GitHub
2. Create a new Web Service on Render
3. Connect your repository
4. Set build command: `npm install && npm run build`
5. Set start command: `npm start`
6. Set environment variables (see below)

### 3. Environment Variables (Backend)
Set these in Render's environment variables section:

**Required:**
- `DATABASE_URL` - Your database connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `SESSION_SECRET` - Secret for session management
- `NODE_ENV` - Set to "production"

**AI Services:**
- `OPENAI_API_KEY` - OpenAI API key
- `GOOGLE_AI_API_KEY` - Google AI API key

**Authentication:**
- `GOOGLE_CLIENT_ID` - Google OAuth client ID

**Payment Gateways:**
- `RAZORPAY_KEY_ID` - Razorpay public key
- `RAZORPAY_KEY_SECRET` - Razorpay secret key
- `STRIPE_SECRET_KEY` - Stripe secret key (if using Stripe)

**Firebase (if using):**
- `FIREBASE_PROJECT_ID` - Firebase project ID
- `FIREBASE_PRIVATE_KEY` - Firebase private key
- `FIREBASE_CLIENT_EMAIL` - Firebase client email

### 4. Database Setup
1. Set up your database (PostgreSQL recommended)
2. Update `DATABASE_URL` in Render environment variables
3. Run migrations: `npm run db:push`

### 5. File Storage
- Render provides persistent disk storage for uploads
- Configure in `render.yaml` or Render dashboard
- Mount point: `/opt/render/project/src/uploads`

## Development vs Production

### Development
```bash
# Frontend
cd frontend
npm run dev

# Backend
cd backend
npm run dev
```

### Production
- Frontend: Automatically deployed on Vercel
- Backend: Automatically deployed on Render
- Both services auto-deploy on git push

## Security Notes

1. **Never commit `.env` files** - They contain sensitive API keys
2. **Use environment variables** for all configuration
3. **Backend .env is gitignored** - Only set in Render dashboard
4. **Frontend should not contain secrets** - Only public configuration

## Troubleshooting

### Frontend Issues
- Check Vercel build logs
- Verify `vite.config.ts` configuration
- Ensure all dependencies are in `package.json`

### Backend Issues
- Check Render build logs
- Verify environment variables are set
- Check database connectivity
- Verify port configuration (Render uses port 10000)

### Common Issues
1. **CORS errors**: Update backend CORS configuration with frontend URL
2. **API 404s**: Check route configuration and base URL
3. **Database errors**: Verify `DATABASE_URL` and database status
4. **File uploads**: Check disk storage configuration in Render

## Monitoring

- **Frontend**: Vercel analytics and performance monitoring
- **Backend**: Render logs and health check endpoint (`/health`)
- **Database**: Monitor connection pool and query performance

## Cost Optimization

- **Vercel**: Free tier for personal projects
- **Render**: Free tier available, upgrade as needed
- **Database**: Use managed services (Neon, Supabase, etc.)

## Support

- Vercel: https://vercel.com/docs
- Render: https://render.com/docs
- Project-specific issues: Check logs and environment configuration
