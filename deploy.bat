@echo off
echo 🚀 Lingumate Deployment Script
echo ================================

REM Check prerequisites
echo 📋 Checking prerequisites...

where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed

REM Frontend setup
echo.
echo 🎨 Setting up Frontend...
cd frontend

if not exist "node_modules" (
    echo 📦 Installing frontend dependencies...
    npm install
) else (
    echo 📦 Frontend dependencies already installed
)

echo 🔨 Building frontend...
npm run build

if %errorlevel% equ 0 (
    echo ✅ Frontend build successful
) else (
    echo ❌ Frontend build failed
    pause
    exit /b 1
)

cd ..

REM Backend setup
echo.
echo ⚙️  Setting up Backend...
cd backend

if not exist "node_modules" (
    echo 📦 Installing backend dependencies...
    npm install
) else (
    echo 📦 Backend dependencies already installed
)

echo 🔨 Building backend...
npm run build

if %errorlevel% equ 0 (
    echo ✅ Backend build successful
) else (
    echo ❌ Backend build failed
    pause
    exit /b 1
)

cd ..

echo.
echo 🎉 Setup complete!
echo.
echo 📋 Next steps:
echo 1. Frontend: Deploy to Vercel (push to GitHub and connect)
echo 2. Backend: Deploy to Render (push to GitHub and create service)
echo 3. Set environment variables in Render dashboard
echo 4. Configure database and run migrations
echo.
echo 📚 See DEPLOYMENT_GUIDE.md for detailed instructions
echo.
echo 🔐 Remember: Never commit .env files!
pause
