import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { getToken } from "firebase/messaging"
import { auth, db, messaging } from "../firebase"
import bgVideo from '../assets/Book.mp4'

export default function BookingConfirm() {
  const navigate = useNavigate()
  const location = useLocation()
  const { language, t } = useLanguage()
  const { service, date, time } = location.state || {}
  const locale = language === 'FR' ? 'fr-FR' : 'en-US'

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [error, setError] = useState('')

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(locale, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
  }

  // Cleanup reCAPTCHA on unmount
  useEffect(() => {
    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear()
        window.recaptchaVerifier = null
      }
    }
  }, [])

  // Setup invisible reCAPTCHA
  const setupRecaptcha = () => {
    // Clear any existing verifier
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear()
      window.recaptchaVerifier = null
    }
    
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      { size: "invisible" }
    )
  }
   

  // Send OTP to phone
    // ...existing code...
  const sendOtp = async () => {
    if (!name.trim() || !phone.trim()) {
      setError(language === 'FR' ? 'Veuillez remplir tous les champs' : 'Please fill in all fields')
      return
    }
  
    // Basic E.164 format check
    if (!phone.startsWith('+')) {
      setError(language === 'FR' 
        ? 'Le numéro doit commencer par + et le code pays (ex: +33 ...)' 
        : 'Phone number must start with + and country code (e.g. +33 ...)')
      return
    }
  
    setError('')
    setIsSubmitting(true)
  
    try {
      setupRecaptcha()
      const appVerifier = window.recaptchaVerifier
      const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier)
      window.confirmationResult = confirmationResult
      setIsOtpSent(true)
      setIsSubmitting(false)
    } catch (error) {
      console.error("OTP Error:", error)
      setError(language === 'FR' ? 'Erreur lors de l\'envoi du code. Vérifiez le numéro.' : 'Error sending code. Please check the number.')
      setIsSubmitting(false)
      // Reset reCAPTCHA on error
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear()
        window.recaptchaVerifier = null
      }
    }
  }
  // ...existing code...

  // Save user info to Firestore
  const saveUserInfo = async (userId, userName, userPhone) => {
    await setDoc(doc(db, "users", userId), {
      name: userName,
      phone: userPhone,
      createdAt: new Date().toISOString()
    })
  }

  // Save booking to Firestore
  const saveBooking = async (userId) => {
    const bookingId = `${userId}_${Date.now()}`
    await setDoc(doc(db, "bookings", bookingId), {
      userId,
      service: {
        name: service.name,
        price: service.price,
        duration: service.duration
      },
      date,
      time,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    })
  }

  // Request notification permission and save FCM token
  const requestNotificationPermission = async (userId) => {
    try {
      const permission = await Notification.requestPermission()
      if (permission === "granted") {
        // Replace with your actual VAPID key from Firebase Console
        const token = await getToken(messaging, { 
          vapidKey: "BB1PoFrdQ6L1IzJnV5cAB_0NIVDUPjIcLg8kb7N5breLKUC9s0ZfnY4fCuMTvrC2fFgRFCKnHB7LgCg-qP78JdA" 
        })
        await setDoc(doc(db, "users", userId), { fcmToken: token }, { merge: true })
        console.log("FCM Token saved:", token)
      }
    } catch (error) {
      console.log("Notification permission error:", error)
    }
  }

  // Verify OTP and complete booking
  const verifyOtp = async () => {
    if (!otp.trim()) {
      setError(language === 'FR' ? 'Veuillez entrer le code' : 'Please enter the code')
      return
    }
    
    setError('')
    setIsSubmitting(true)
    
    try {
      const result = await window.confirmationResult.confirm(otp)
      const user = result.user
      console.log("User UID:", user.uid) // Debug: log UID after OTP login
      // Save user info and booking to Firestore
      await saveUserInfo(user.uid, name, phone)
      await saveBooking(user.uid)
      // Request notification permission
      await requestNotificationPermission(user.uid)
      setIsSubmitting(false)
      setIsConfirmed(true)
    } catch (error) {
      console.error("Verification Error:", error)
      setError(language === 'FR' ? 'Code invalide. Réessayez.' : 'Invalid code. Please try again.')
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isOtpSent) {
      await sendOtp()
    } else {
      await verifyOtp()
    }
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

            {!isOtpSent ? (
              <>
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
                    ? (language === 'FR' ? 'Envoi du code...' : 'Sending code...') 
                    : (language === 'FR' ? 'Envoyer le code de vérification' : 'Send verification code')}
                </button>
              </>
            ) : (
              <>
                <div className="text-center mb-4">
                  <p className="text-white/70 text-sm">
                    {language === 'FR' 
                      ? `Code envoyé à ${phone}` 
                      : `Code sent to ${phone}`}
                  </p>
                </div>

                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-white/70 mb-2">
                    {language === 'FR' ? 'Code de vérification' : 'Verification Code'}
                  </label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    maxLength={6}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 focus:border-transparent outline-none transition-all text-center text-2xl tracking-[0.5em]"
                    placeholder="------"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t('confirming') : t('confirmBookingBtn')}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsOtpSent(false)
                    setOtp('')
                    setError('')
                  }}
                  className="w-full py-2 text-white/70 text-sm hover:text-white transition-all"
                >
                  {language === 'FR' ? 'Modifier le numéro' : 'Change phone number'}
                </button>
              </>
            )}

            {/* Invisible reCAPTCHA container */}
            <div id="recaptcha-container"></div>
          </form>
        </div>
      </div>
    </div>
  )
}
