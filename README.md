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
2. Add your Firebase config to `src/firebase.js`
3. Deploy Firebase functions:
   ```bash
   cd backend/functions
   npm install
   firebase deploy --only functions
   ```

## 📄 License

MIT
