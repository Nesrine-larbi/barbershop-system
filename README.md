# 💈 Barbershop Booking System

A mobile-first, minimalistic barbershop booking web application built with React, Vite, and Tailwind CSS.

## ✨ Features

- 📱 **Mobile-First Design** - Optimized for smartphones with QR code/link access
- 📅 **Phone Number Booking** - Simple appointment booking using phone numbers
- ️ **Gallery** - Showcase your work with photo examples
- 💼 **Services** - Display all services with pricing
- 📞 **Contact** - Phone number and social media links (Instagram, TikTok, Facebook)
- 🎨 **Minimal & Elegant** - Clean UI with easy-to-tap buttons

## 🚀 Tech Stack

- **React 18** - Modern functional components with hooks
- **Vite** - Lightning-fast development and build tool
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Firebase** *(Coming soon)* - Database, authentication, and push notifications

## 📦 Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

##  Pages

- **Home** - Background image with centered "Book" and "Menu" buttons
- **Booking** - Appointment form with name, phone, date, and time
- **Services** - List of services with pricing
- **Gallery** - Photo grid of work examples
- **Contact** - Phone number, address, social media links, and business hours

## 🎨 Customization

### Update Background Image
Edit `src/pages/Home.jsx` and replace the `backgroundImage` URL:
```javascript
backgroundImage: `url('YOUR_IMAGE_URL')`,
```

### Update Contact Info
Edit `src/pages/Contact.jsx` to update:
- Phone number
- Address
- Social media links
- Business hours

### Update Services
Edit `src/pages/Services.jsx` to modify the `services` array.

### Update Gallery
Replace image URLs in `src/pages/Gallery.jsx` with your own photos.

## � Future Features

- Firebase Authentication
- Real-time booking management
- Push notifications for promotions
- Admin dashboard
- SMS/Email confirmations

#
