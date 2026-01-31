import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { supabase } from '../supabaseClient'
import bgVideo from '../assets/Book.mp4'

export default function BookingConfirm() {
  const navigate = useNavigate()
  const location = useLocation()
  const { language, t } = useLanguage()
  const { service, date, time } = location.state || {}
  const locale = language === 'FR' ? 'fr-FR' : 'en-US'

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [error, setError] = useState('')

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(locale, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
  }

  // Parse duration string to minutes
  const parseDuration = (duration) => {
    const match = duration.match(/(\d+)\s*(h|min)/)
    if (!match) return 30
    const value = parseInt(match[1])
    const unit = match[2]
    return unit === 'h' ? value * 60 : value
  }

  // Calculate end_time based on start time and duration
  const calculateEndTime = (startTime, durationMinutes) => {
    const [hours, minutes] = startTime.split(':').map(Number)
    const totalMinutes = hours * 60 + minutes + durationMinutes
    const endHours = Math.floor(totalMinutes / 60)
    const endMinutes = totalMinutes % 60
    return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`
  }

  const createDateTime = (dateStr, timeStr) => {
    // dateStr = "2023-10-30", timeStr = "14:30"
    // We create a date object for that specific time
    const d = new Date(dateStr);
    const [hours, minutes] = timeStr.split(':');
    d.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    return d;
  }

  // Get service name based on language
  const getServiceName = () => {
    return language === 'FR' ? service.nameFR : service.nameEN
  }
   

  // Save booking to Supabase
  const saveBooking = async () => {
    if (!name.trim() || !phone.trim()) {
      setError(language === 'FR' ? 'Veuillez remplir tous les champs obligatoires' : 'Please fill in all required fields')
      return
    }

    // Basic phone format check
    if (!phone.startsWith('+')) {
      setError(language === 'FR' 
        ? 'Le numéro doit commencer par + et le code pays (ex: +33...)' 
        : 'Phone number must start with + and country code (e.g. +33...)')
      return
    }



    setError('')
    setIsSubmitting(true)

    try {
      const durationMinutes = parseDuration(service.duration)
      const endTime = calculateEndTime(time, durationMinutes)

      const startDateObj = createDateTime(date, time) 
      const isoStartTime = startDateObj.toISOString() // "2023-10-30T14:00:00.000Z"

      // 4. Calculate End Time (Full Timestamp)
      // Clone the start date so we don't modify it
      const endDateObj = new Date(startDateObj.getTime()) 
      endDateObj.setMinutes(endDateObj.getMinutes() + durationMinutes)
      const isoEndTime = endDateObj.toISOString() // "2023-10-30T14:30:00.000Z"
      
      const bookingData = {
        customer_name: name.trim(),
        customer_phone: phone.trim(),
        service_type: getServiceName(),
        price: typeof service.price === 'number' ? service.price : null,
        duration_minutes: durationMinutes,
        start_time: isoStartTime,
        end_time: isoEndTime
      }
      
      console.log('📤 Attempting to insert booking:', bookingData)
      
      // Insert booking into Supabase (SMS will be sent via Database Webhook)
      const { data, error } = await supabase
        .from('appointments')
        .insert([bookingData])
        // .select()
      
      if (error) {
        console.error('❌ Supabase Insert Error:', error)
        // Handle double booking error (PostgreSQL exclusion constraint)
        if (error.code === '23P01' || error.message?.includes('no_double_booking')) {
          setError(language === 'FR' 
            ? 'Ce créneau horaire n\'est plus disponible. Veuillez choisir un autre horaire.' 
            : 'This time slot is no longer available. Please choose another time.')
        } else {
          setError(language === 'FR' ? 'Erreur lors de la réservation. Réessayez.' : 'Error making booking. Please try again.')
        }
        setIsSubmitting(false)
        return
      }
      
      console.log('✅ Booking created successfully:', data)
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
          <div className="bg-black/60 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
            <div className="w-20 h-20 bg-linear-to-br from-amber-500/20 to-yellow-600/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-500/30">
              <svg className="w-10 h-10 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-serif text-amber-400 mb-3 tracking-wide">
              {t('bookingConfirmed')}
            </h1>
            <p className="text-white/60 mb-8 text-sm leading-relaxed">
              {language === 'FR' 
                ? 'Vous recevrez un SMS de confirmation à ' + phone 
                : 'You will receive a confirmation SMS at ' + phone}
            </p>
            
            <div className="bg-white/5 rounded-xl p-5 mb-8 text-left border border-white/10">
              <div className="mb-4 pb-4 border-b border-white/10">
                <p className="font-light text-white tracking-wide text-lg">{getServiceName()}</p>
                <p className="text-amber-400 font-semibold mt-1">€{service.price}</p>
              </div>
              <div className="text-sm text-white/70 space-y-2.5">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-amber-400/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{formatDate(date)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-amber-400/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-amber-400/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-amber-400/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{phone}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => navigate('/')}
              className="w-full py-4 bg-linear-to-r from-amber-500 to-yellow-600 text-black font-semibold tracking-widest uppercase rounded-xl hover:from-amber-400 hover:to-yellow-500 active:scale-[0.98] transition-all shadow-lg shadow-amber-500/30"
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
            <p className="font-light text-white tracking-wide">{getServiceName()}</p>
            <p className="text-sm text-white/70 mb-2">{service.duration} • €{service.price}</p>
            <div className="flex gap-4 text-sm text-white/60">
              <span>{formatDate(date)}</span>
              <span>{time}</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="px-4 py-6">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-5">
            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-200 text-sm backdrop-blur-md">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-xs font-light text-amber-400 tracking-[0.15em] uppercase mb-2">
                {t('yourName')} *
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg text-white placeholder-white/30 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all"
                placeholder="Jean Dupont"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs font-light text-amber-400 tracking-[0.15em] uppercase mb-2">
                {t('phoneNumber')} *
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full px-4 py-3.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg text-white placeholder-white/30 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all"
                placeholder="+33 6 12 34 56 78"
              />
              <p className="text-xs text-white/40 mt-1.5 italic">
                {language === 'FR' ? 'Format: +33 (France) ou +213 (Algérie)' : 'Format: +33 (France) or +213 (Algeria)'}
              </p>
            </div>


            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 bg-linear-to-r from-amber-500 to-yellow-600 text-black text-base font-semibold tracking-[0.15em] uppercase rounded-xl hover:from-amber-400 hover:to-yellow-500 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-500/30 mt-6"
            >
              {isSubmitting 
                ? (language === 'FR' ? '⏳ Réservation en cours...' : '⏳ Booking...') 
                : (language === 'FR' ? '✓ Confirmer la réservation' : '✓ Confirm Booking')}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
