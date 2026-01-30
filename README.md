# 💈 Barbershop Booking System

A mobile-first barbershop booking web application built with React, Vite, Tailwind CSS, and Firebase.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The app will run at `http://localhost:5173`

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

## 🛠️ Tech Stack

- React 19
- Vite 7
- Tailwind CSS 4
- Firebase
- React Router

## 📱 Features

- Mobile-first responsive design
- Booking system with phone number
- Service listings with pricing
- Photo gallery
- Contact information
- Multi-language support (English/French)

## 🔥 Firebase Setup

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Firebase config is already configured in `src/firebase.js`
3. Deploy Firebase functions:
   ```bash
   cd backend/functions
   npm install
   firebase deploy --only functions
   ```

## 🚀 Deployment to Vercel

### Automatic Deployment (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your GitHub repository
3. Vercel will automatically detect Vite and configure the build
4. Click "Deploy" - Done! ✅

### Configuration

The project is pre-configured with `vercel.json` for:
- ✅ Vite build settings
- ✅ SPA routing (all routes redirect to index.html)
- ✅ Proper 404 handling

### Firebase Functions

Firebase Functions run separately from Vercel:
```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase
firebase login

# Deploy functions
firebase deploy --only functions
```

### Environment Variables (Optional)

If you want to use environment variables for Firebase config:
1. Create `.env` file (see `.env.example`)
2. Add variables to Vercel dashboard under "Environment Variables"

## 🧪 Local Testing

```bash
# Install all dependencies
npm install
cd backend/functions && npm install && cd ../..

# Terminal 1: Start frontend
npm run dev

# Terminal 2: Start Firebase emulator (optional)
cd backend/functions
npm run serve
```

Frontend: http://localhost:5173
Functions Emulator: http://localhost:5001

