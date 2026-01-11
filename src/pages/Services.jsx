import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import bgVideo from '../assets/Book.mp4'

export default function Services() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  const services = [
    { id: 1, name: t('classicHaircut'), price: 30, duration: '30 min' },
    { id: 2, name: t('beardTrim'), price: 20, duration: '20 min' },
    { id: 3, name: t('haircutBeard'), price: 45, duration: '45 min' },
    { id: 4, name: t('hotTowelShave'), price: 35, duration: '30 min' },
    { id: 5, name: t('kidsHaircut'), price: 25, duration: '25 min' },
    { id: 6, name: t('hairDesign'), price: 40, duration: '40 min' },
  ]

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
      <div className="fixed inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-black/20 backdrop-blur-sm">
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
            <h1 className="text-lg font-light tracking-[0.2em] uppercase text-white drop-shadow-md">
              {t('services')}
            </h1>
            <div className="w-10" />
          </div>
        </header>

        {/* Services List */}
        <div className="px-4 py-8">
          <div className="max-w-md mx-auto space-y-3">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 hover:bg-white/15 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-light text-white tracking-wide">{service.name}</h3>
                    <p className="text-sm text-white/60 tracking-wider">{service.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-light text-white">${service.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="max-w-md mx-auto mt-10">
            <button
              onClick={() => navigate('/booking')}
              className="w-full py-4 bg-white text-black text-sm font-medium tracking-[0.2em] uppercase rounded-xl hover:bg-white/90 active:scale-[0.98] transition-all"
            >
              {t('book')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
