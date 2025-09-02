# Lingumate - AI-Powered Language Learning Platform

A comprehensive language learning application with AI translation, voice recognition, and real-time communication features.

## 🚀 Project Structure

This project is organized into two main parts for separate deployment:

```
├── frontend/          # React + Vite frontend (deploy to Vercel)
│   ├── src/          # Source code
│   ├── package.json  # Frontend dependencies
│   └── vercel.json   # Vercel configuration
│
└── backend/           # Express.js backend (deploy to Render)
    ├── config/        # Configuration files
    ├── routes/        # API routes
    ├── services/      # Business logic
    ├── shared/        # Shared schemas
    ├── uploads/       # File uploads
    ├── package.json   # Backend dependencies
    └── render.yaml    # Render configuration
```

## 🛠️ Features

- **AI Translation**: Real-time language translation using OpenAI and Google AI
- **Voice Recognition**: Speech-to-text and text-to-speech capabilities
- **Real-time Communication**: WebSocket-based real-time translation
- **Authentication**: Firebase and Google OAuth integration
- **Payment Integration**: Razorpay and Stripe support
- **File Management**: Custom model uploads and management
- **Responsive Design**: Mobile-first UI with Tailwind CSS

## 🚀 Quick Start

### Development

1. **Frontend Development**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

2. **Backend Development**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

### Production Deployment

- **Frontend**: Deploy to [Vercel](https://vercel.com)
- **Backend**: Deploy to [Render](https://render.com)

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

## 🔧 Configuration

### Frontend
- Vite configuration in `frontend/vite.config.ts`
- Tailwind CSS configuration
- Component library with Radix UI

### Backend
- Environment variables in `backend/.env` (not committed)
- Database configuration with Drizzle ORM
- Express.js server with TypeScript

## 📱 Mobile Features

- Android integration capabilities
- BLE translator support
- QR code handshake system
- Voice recording and playback

## 🔐 Security

- JWT-based authentication
- Environment variable protection
- CORS configuration
- File upload validation

## 📊 Database

- PostgreSQL with Neon
- Drizzle ORM for type-safe queries
- Migration system
- Shared schemas between frontend and backend

## 🌐 API Endpoints

- Authentication routes
- Translation services
- AI conversation endpoints
- File upload management
- Subscription handling
- Emergency contacts

## 📚 Documentation

- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [Android Integration](./ANDROID_INTEGRATION.md)
- [BLE Translator Guide](./BLE_TRANSLATOR_GUIDE.md)
- [Subscription Setup](./SUBSCRIPTION_SETUP.md)
- [QR Handshake Guide](./QR_HANDSHAKE_GUIDE.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For deployment issues, see the [Deployment Guide](./DEPLOYMENT_GUIDE.md).
For technical support, check the documentation files or create an issue.

---

**Note**: This project is configured for separate frontend/backend deployment. The frontend will be deployed on Vercel and the backend on Render, with all sensitive configuration stored securely in environment variables. 