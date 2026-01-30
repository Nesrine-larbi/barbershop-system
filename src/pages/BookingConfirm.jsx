import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { doc, setDoc } from "firebase/firestore"
import { db } from "../firebase"
import bgVideo from '../assets/Book.mp4'

export default function BookingConfirm() {
  const navigate = useNavigate()
  const location = useLocation()
  const { language, t } = useLanguage()
  const { service, date, time } = location.state || {}
  const locale = language === 'FR' ? 'fr-FR' : 'en-US'

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [error, setError] = useState('')

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(locale, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
  }

  // Generate simple booking ID
  const generateBookingId = () => {
    return `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
   

  // Save booking directly without authentication
  const saveBooking = async () => {
    if (!name.trim() || !phone.trim()) {
      setError(language === 'FR' ? 'Veuillez remplir tous les champs' : 'Please fill in all fields')
      return
    }

    // Basic phone format check
    if (!phone.startsWith('+')) {
      setError(language === 'FR' 
        ? 'Le numéro doit commencer par + et le code pays (ex: +33 ...)' 
        : 'Phone number must start with + and country code (e.g. +33 ...)')
      return
    }

    setError('')
    setIsSubmitting(true)

    try {
      const bookingId = generateBookingId()
      
      // Save booking to Firestore
      await setDoc(doc(db, "bookings", bookingId), {
        name: name.trim(),
        phone: phone.trim(),
        service: {
          name: service.name,
          price: service.price,
          duration: service.duration
        },
        date,
        time,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        bookingId
      })
      
      setIsSubmitting(false)
      setIsConfirmed(true)
    } catch (error) {
      console.error("Booking Error:", error)
      setError(language === 'FR' ? 'Erreur lors de la réservation. Réessayez.' : 'Error making booking. Please try again.')
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await saveBooking()
  }

  if (!service || !date || !time) {
    navigate('/booking')
    return null
  }

  if (isConfirmed) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="fixed inset-0 w-full h-full object-cover"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="fixed inset-0 bg-black/60" />
        
        <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">{t('bookingConfirmed')}</h1>
            <p className="text-white/70 mb-6">{t('reminderMessage')}</p>
            
            <div className="bg-white/10 rounded-xl p-4 mb-6 text-left">
              <div className="mb-3">
                <p className="font-light text-white tracking-wide">{service.name}</p>
                <p className="text-sm text-white/70">€{service.price}</p>
              </div>
              <div className="text-sm text-white/80 space-y-1">
                <p>{formatDate(date)}</p>
                <p>{time}</p>
                <p>{name}</p>
                <p>{phone}</p>
              </div>
            </div>
            
            <button
              onClick={() => navigate('/')}
              className="w-full py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 active:scale-[0.98] transition-all"
            >
              {t('done')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="fixed inset-0 bg-black/60" />

      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-black/30 backdrop-blur-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 rounded-full hover:bg-white/10 active:scale-95 transition-all"
              aria-label="Go back"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-lg font-semibold tracking-wide text-white">{t('confirmBooking')}</h1>
            <div className="w-10" />
          </div>
        </header>

        {/* Booking Summary */}
        <div className="px-4 py-4 bg-white/10 backdrop-blur-md border-b border-white/10">
          <div className="max-w-md mx-auto">
            <p className="font-light text-white tracking-wide">{service.name}</p>
            <p className="text-sm text-white/70 mb-2">{service.duration} • €{service.price}</p>
            <div className="flex gap-4 text-sm text-white/60">
              <span>{formatDate(date)}</span>
              <span>{time}</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="px-4 py-6">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">
                {t('yourName')}
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 focus:border-transparent outline-none transition-all"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-white/70 mb-2">
                {t('phoneNumber')}
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 focus:border-transparent outline-none transition-all"
                placeholder="+213 612 345 678"
              />
              <p className="text-xs text-white/50 mt-1">{t('phoneHint')}</p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting 
                ? (language === 'FR' ? 'Réservation en cours...' : 'Booking...') 
                : (language === 'FR' ? 'Confirmer la réservation' : 'Confirm Booking')}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
