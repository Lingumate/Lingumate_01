import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
// Go up one level: config -> backend root
const envPath = resolve(__dirname, '..', '.env');
console.log('Loading .env file from:', envPath);
config({ path: envPath });

// Export environment variables
export const env = {
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET || 'your-jwt-secret-key',
  SESSION_SECRET: process.env.SESSION_SECRET || 'your-session-secret',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  GOOGLE_AI_API_KEY: process.env.GOOGLE_AI_API_KEY,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
  PORT: parseInt(process.env.PORT || '10000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  GENKIT_API_KEY: process.env.GENKIT_API_KEY,
  // Production deployment settings
  FRONTEND_URL: process.env.FRONTEND_URL || 'https://your-vercel-app.vercel.app',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'https://your-vercel-app.vercel.app',
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['https://your-vercel-app.vercel.app'],
}; 