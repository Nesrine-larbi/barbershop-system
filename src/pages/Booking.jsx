import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import bgVideo from '../assets/Book.mp4'

export default function Booking() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [selectedService, setSelectedService] = useState(null)

  const services = [
    { id: 1, name: t('classicHaircut'), price: 30, duration: '30 min' },
    { id: 2, name: t('beardTrim'), price: 20, duration: '20 min' },
    { id: 3, name: t('haircutBeard'), price: 45, duration: '45 min' },
    { id: 4, name: t('hotTowelShave'), price: 35, duration: '30 min' },
    { id: 5, name: t('kidsHaircut'), price: 25, duration: '25 min' },
    { id: 6, name: t('hairDesign'), price: 40, duration: '40 min' },
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

        {/* Services List */}
        <div className="px-4 py-6">
          <p className="text-white/70 text-sm text-center mb-6">{t('chooseService')}</p>
          
          <div className="space-y-3 max-w-md mx-auto">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => handleServiceSelect(service)}
                className="w-full bg-white/10 backdrop-blur-md rounded-xl p-5 flex items-center gap-4 hover:bg-white/20 active:scale-[0.98] transition-all text-left border border-white/20"
              >
                <div className="flex-1">
                  <h3 className="font-light text-white tracking-wide">{service.name}</h3>
                  <p className="text-sm text-white/60">{service.duration}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">${service.price}</p>
                </div>
                <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
