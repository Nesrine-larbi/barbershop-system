# 💈 Luxury Barber Shop Booking System

A prestigious, mobile-first barber shop booking application built with React, Vite, Tailwind CSS, and Supabase. Features real-time availability checking, SMS confirmations via Twilio, and a luxury black & gold UI theme.

## ✨ Features

### Guest Booking Experience
- 🎯 **No Login Required** - Guests book instantly without creating accounts
- 📅 **Real-time Availability** - See only available time slots
- 🚫 **Double Booking Prevention** - PostgreSQL exclusion constraints
- 📱 **SMS Confirmations** - Automatic SMS via Twilio with alphanumeric sender ID
- 🌍 **Multi-language** - French & English support
- 📱 **Mobile-first** - Fully responsive luxury design

### Admin Dashboard
- 🔐 **Protected Routes** - Supabase Auth for admins only
- 📊 **Appointment Management** - View, filter, and cancel bookings
- 🎨 **Luxury Interface** - Matte black background with gold accents
- ⏰ **Smart Status** - Visual trick shows past appointments as "Completed"
- 🔄 **Real-time Updates** - Instant availability when appointments cancelled

### Technical Highlights
- ⚡ **Supabase Backend** - PostgreSQL + Edge Functions
- 🎨 **Premium UI/UX** - Negative space, serif headings, high contrast
- 🔒 **Database-level Validation** - Exclusion constraints prevent conflicts
- 📞 **Twilio Integration** - SMS via Supabase Edge Functions
- 🚀 **Serverless Architecture** - Scalable and cost-effective

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- Supabase account (https://supabase.com)
- Twilio account for SMS (https://www.twilio.com)

### Installation

```bash
# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Start development server
npm run dev
```

Visit: http://localhost:5173

**📖 Full setup guide**: See [QUICK_START.md](QUICK_START.md)

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite 7, Tailwind CSS 4
- **Backend**: Supabase (PostgreSQL, Edge Functions, Auth)
- **SMS**: Twilio with alphanumeric sender ID
- **Routing**: React Router v7
- **Languages**: TypeScript/JavaScript

## 📱 App Structure


### Guest Pages
- `/` - Homepage with hero video
- `/booking` - Service selection
- `/booking/datetime` - Date & time picker with real-time availability
- `/booking/confirm` - Customer details & booking confirmation
- `/services` - Full service list with pricing
- `/gallery` - Before/after photos
- `/contact` - Contact information
- `/about` - About the barbershop

### Admin Pages
- `/admin/login` - Admin authentication (Supabase Auth)
- `/admin/dashboard` - Protected admin dashboard

## 🔧 Configuration

### Environment Variables

Create a `.env` file with your credentials:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbG...
```

### Supabase Edge Function Secrets

For SMS functionality, set these in Supabase:

```bash
supabase secrets set TWILIO_ACCOUNT_SID=your_sid
supabase secrets set TWILIO_AUTH_TOKEN=your_token
supabase secrets set TWILIO_SENDER_ID=BARBER
```

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [QUICK_START.md](QUICK_START.md) | Get running in 10 minutes |
| [SUPABASE_SETUP.md](SUPABASE_SETUP.md) | Complete Supabase configuration |
| [IMPLEMENTATION_CHECKLIST.md](IMPLEMENTATION_CHECKLIST.md) | Step-by-step implementation guide |
| [SQL_REFERENCE.md](SQL_REFERENCE.md) | Database schema and queries |

## 🚀 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Configure Environment Variables in Vercel

1. Go to Vercel Dashboard > Your Project > Settings > Environment Variables
2. Add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### Deploy Supabase Edge Function

```bash
# Install Supabase CLI
npm install -g supabase

# Link project
supabase link --project-ref YOUR_PROJECT_REF

# Deploy
supabase functions deploy send-sms
```

### Configure Database Webhook

See [SUPABASE_SETUP.md](SUPABASE_SETUP.md) for webhook configuration.

## 🎨 Design System

### Visual Identity
- **Theme**: Prestigious, luxury barbershop
- **Colors**: Matte black (#1a1a1a) background, gold/amber accents
- **Typography**: Serif headings (Playfair Display), sans-serif body
- **Principles**: Negative space, high contrast, minimal UI

### Key UI Elements
- Video backgrounds with dark overlays
- Glass morphism cards (backdrop-blur)
- Gold gradient buttons for primary actions
- Disabled states with line-through for unavailable slots
- Smooth animations and transitions

## 🔒 Security Features

- ✅ **Admin-only Authentication** - Supabase Auth for admin dashboard
- ✅ **Guest Booking** - No login required for customers
- ✅ **Database Constraints** - Exclusion constraints prevent double booking
- ✅ **Row Level Security** - Optional RLS policies (see SQL_REFERENCE.md)
- ✅ **Environment Variables** - Sensitive data in .env (never committed)
- ✅ **Input Validation** - Phone number format checking
- ✅ **Error Handling** - User-friendly error messages

## 🧪 Testing

### Test Guest Booking
1. Select a service
2. Choose date and time
3. Submit with phone: `+33612345678` (for France)
4. Verify SMS received (if Twilio configured)

### Test Double Booking Prevention
1. Create a booking
2. Try booking the same slot
3. Should see error: "Ce créneau horaire n'est plus disponible"

### Test Admin Dashboard
1. Login at `/admin/login`
2. View all appointments
3. Filter by status
4. Cancel an appointment
5. Verify slot becomes available

## 📞 SMS Configuration

### France (Recommended)
- Use alphanumeric sender ID: `BARBER`
- Works in France without special approval
- Appears as "BARBER" on customer's phone

### Other Countries
- Check Twilio's supported sender ID formats
- May need to purchase a phone number
- Update `TWILIO_SENDER_ID` accordingly

## 🐛 Troubleshooting

### SMS Not Sending
- Check Edge Function logs in Supabase Dashboard
- Verify Twilio credentials
- Test phone number format (+country_code)

### Double Booking Still Occurs
- Verify exclusion constraint exists on appointments table
- Check `get_booked_slots` RPC function
- Test in incognito mode (clear cache)

### Admin Can't Login
- Verify user exists in Supabase Auth
- Check browser console for errors
- Ensure .env is loaded correctly

## 📈 Future Enhancements

- [ ] Email confirmations (in addition to SMS)
- [ ] SMS reminders 24h before appointment
- [ ] Customer loyalty program
- [ ] Multiple barbers/chairs support
- [ ] Payment integration (Stripe)
- [ ] Recurring appointments
- [ ] Customer reviews/ratings

## 🤝 Contributing

This is a private project, but if you'd like to suggest improvements:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

Private/Proprietary - All rights reserved

## 👨‍💻 Developer

Built with ❤️ for a luxury barber shop experience

---

**Need help?** Check the documentation files or contact support.

**Ready to deploy?** Follow [IMPLEMENTATION_CHECKLIST.md](IMPLEMENTATION_CHECKLIST.md)

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

