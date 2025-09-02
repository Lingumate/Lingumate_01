// API Configuration for production deployment
export const API_CONFIG = {
  // Base URL for API calls - will be set via environment variables
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:10000',
  
  // API endpoints
  ENDPOINTS: {
    // Auth endpoints
    SIGNUP: '/api/auth/signup',
    LOGIN: '/api/auth/login',
    GOOGLE_AUTH: '/api/auth/google',
    
    // Translation endpoints
    TRANSLATE: '/api/translate',
    TRANSCRIBE: '/api/transcribe',
    
    // AI endpoints
    AI_CHAT: '/api/ai/chat',
    AI_TRAVEL: '/api/ai/travel',
    
    // Model management
    MODELS: '/api/models',
    
    // Subscription
    SUBSCRIPTION: '/api/subscription',
    
    // Emergency contacts
    EMERGENCY: '/api/emergency',
    
    // Health check
    HEALTH: '/health',
  },
  
  // Request configuration
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
  
  // Timeout configuration
  TIMEOUT: 30000, // 30 seconds
};

// Helper function to get full API URL
export function getApiUrl(endpoint: string): string {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
}

// Helper function to get API endpoint
export function getEndpoint(key: keyof typeof API_CONFIG.ENDPOINTS): string {
  return API_CONFIG.ENDPOINTS[key];
}

// Helper function to get full API endpoint URL
export function getFullApiUrl(key: keyof typeof API_CONFIG.ENDPOINTS): string {
  return getApiUrl(getEndpoint(key));
}
