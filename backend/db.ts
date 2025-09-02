import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "./shared/schema";
import { env } from './config/env.js';

// Debug: Log environment variables
console.log('Environment variables check:');
console.log('DATABASE_URL:', env.DATABASE_URL ? 'SET' : 'NOT SET');
console.log('NODE_ENV:', env.NODE_ENV);

if (!env.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Please check your .env file.');
  console.error('Expected format: DATABASE_URL=postgresql://username:password@localhost:5432/lingumate');
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Production-ready database connection with SSL and connection pooling
export const pool = new Pool({ 
  connectionString: env.DATABASE_URL,
  // Production connection pooling settings
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
  // SSL configuration for Render PostgreSQL
  ssl: env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false // Required for Render PostgreSQL
  } : false
});

export const db = drizzle({ client: pool, schema });

// Test database connection
pool.on('connect', () => {
  console.log('✅ Database connected successfully');
});

pool.on('error', (err) => {
  console.error('❌ Database connection error:', err);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🔄 Shutting down database connections...');
  await pool.end();
  process.exit(0);
});