import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import bgVideo from '../assets/Book.mp4'

export default function Booking() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [selectedService, setSelectedService] = useState(null)

  // Flat list of all services - same as Services page
  const services = [
    { id: 1, name: 'Coupe de cheveux normale', price: 20, duration: '30 min' },
    { id: 2, name: 'Coupe de cheveux spéciale ⭐', price: 30, duration: '40 min' },
    { id: 3, name: 'Coupe de barbe normale', price: 20, duration: '30 min' },
    { id: 4, name: 'Coupe de barbe spéciale ⭐', price: 30, duration: '40 min' },
    { id: 5, name: 'Contours de barbe', price: 10, duration: '15 min' },
    { id: 6, name: 'Coloration complète', price: 80, duration: '1 h' },
    { id: 7, name: 'Mèches / Highlights', price: 50, duration: '1 h' },
    { id: 8, name: 'Masque facial', price: 40, duration: '30 min' },
    { id: 9, name: 'Prestations privées (anniversaires, mariages)', price: 'Sur demande', duration: 'Prix selon le nombre de personnes' },
  ]

  const handleServiceSelect = (service) => {
    setSelectedService(service)
    // Navigate to date/time selection with selected service
    navigate('/booking/datetime', { state: { service } })
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>
      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-black/30 backdrop-blur-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 -ml-2 rounded-full hover:bg-white/10 active:scale-95 transition-all"
              aria-label="Go back"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-lg font-semibold tracking-wide text-white">{t('selectService')}</h1>
            <div className="w-10" />
          </div>
        </header>

        {/* Services List - Editorial 3-Column Layout */}
        <div className="px-6 py-8 md:px-8">
          <div className="max-w-2xl mx-auto">
            {/* Section Header */}
            <div className="mb-8 text-center">
              <p className="text-white/50 text-xs tracking-[0.3em] uppercase mb-2">
                {t('selectService') || 'Select a Service'}
              </p>
              <h2 className="text-white/70 text-sm font-light">
                {t('chooseService') || 'Choose the service you want to book'}
              </h2>
            </div>

            {/* Column Headers */}
            <div className="hidden md:grid grid-cols-[60%_20%_20%] mb-4 pb-3 border-b border-white/10">
              <span className="text-xs font-medium text-white/40 uppercase tracking-wider text-left">
                {t('service') || 'Service'}
              </span>
              <span className="text-xs font-medium text-white/40 uppercase tracking-wider text-center">
                {t('duration') || 'Duration'}
              </span>
              <span className="text-xs font-medium text-white/40 uppercase tracking-wider text-right">
                {t('price') || 'Price'}
              </span>
            </div>

            {/* Service Rows - Clickable */}
            <div className="space-y-8 md:space-y-0">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceSelect(service)}
                  className="w-full hover:bg-white/5 active:bg-white/10 transition-all rounded-lg md:rounded-none"
                >
                  {/* Desktop: 3-Column Grid */}
                  <div className="hidden md:grid grid-cols-[60%_20%_20%] items-center py-4">
                    <span className="text-white font-light text-base tracking-wide text-left">
                      {service.name}
                    </span>
                    <span className="text-white/60 text-sm text-center">
                      {service.duration}
                    </span>
                    <span className="text-white/60 text-sm text-right">
                      €{service.price}
                    </span>
                  </div>
                  
                  {/* Mobile: Stacked Layout */}
                  <div className="md:hidden p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 space-y-1">
                    <p className="text-white font-light text-base tracking-wide text-left">
                      {service.name}
                    </p>
                    <p className="text-white/50 text-sm text-left">
                      {service.duration}
                    </p>
                    <p className="text-white/50 text-sm text-left">
                      €{service.price}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
