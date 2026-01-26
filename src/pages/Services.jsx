import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import bgVideo from '../assets/Book.mp4'

export default function Services() {
  const navigate = useNavigate()
  const { t, language } = useLanguage()

  // Flat list of all services with translations
  const services = [
    { 
      id: 1, 
      nameFR: 'Coupe de cheveux normale', 
      nameEN: 'Regular Haircut',
      price: 20, 
      duration: '30 min' 
    },
    { 
      id: 2, 
      nameFR: 'Coupe de cheveux spéciale ⭐', 
      nameEN: 'Special Haircut ⭐',
      price: 30, 
      duration: '40 min' 
    },
    { 
      id: 3, 
      nameFR: 'Coupe de barbe normale', 
      nameEN: 'Regular Beard Trim',
      price: 20, 
      duration: '30 min' 
    },
    { 
      id: 4, 
      nameFR: 'Coupe de barbe spéciale ⭐', 
      nameEN: 'Special Beard Trim ⭐',
      price: 30, 
      duration: '40 min' 
    },
    { 
      id: 5, 
      nameFR: 'Contours de barbe', 
      nameEN: 'Beard Contour',
      price: 10, 
      duration: '15 min' 
    },
    { 
      id: 6, 
      nameFR: 'Coloration complète', 
      nameEN: 'Full Coloring',
      price: 80, 
      duration: '1 h' 
    },
    { 
      id: 7, 
      nameFR: 'Mèches / Highlights', 
      nameEN: 'Highlights',
      price: 50, 
      duration: '1 h' 
    },
    { 
      id: 8, 
      nameFR: 'Masque facial', 
      nameEN: 'Facial Mask',
      price: 40, 
      duration: '30 min' 
    },
    { 
      id: 9, 
      nameFR: 'Prestations privées (anniversaires, mariages)', 
      nameEN: 'Private Events (birthdays, weddings)',
      price: language === 'FR' ? 'Sur demande' : 'On request', 
      duration: language === 'FR' ? 'Prix selon le nombre de personnes' : 'Price based on number of people' 
    },
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
            <h1 className="text-lg font-light tracking-[0.2em] uppercase text-white">
              {t('services')}
            </h1>
            <div className="w-10" />
          </div>
        </header>

        {/* Services List - Editorial 3-Column Layout */}
        <div className="px-6 py-8 md:px-8">
          <div className="max-w-2xl mx-auto">
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

            {/* Service Rows */}
            <div className="space-y-8 md:space-y-0">
              {services.map((service) => (
                <div key={service.id}>
                  {/* Desktop: 3-Column Grid */}
                  <div className="hidden md:grid grid-cols-[60%_20%_20%] items-center py-4">
                    <span className="text-white font-light text-base tracking-wide text-left">
                      {language === 'FR' ? service.nameFR : service.nameEN}
                    </span>
                    <span className="text-white/60 text-sm text-center">
                      {service.duration}
                    </span>
                    <span className="text-white/60 text-sm text-right">
                      €{service.price}
                    </span>
                  </div>
                  
                  {/* Mobile: Stacked Layout */}
                  <div className="md:hidden space-y-1">
                    <p className="text-white font-light text-base tracking-wide text-left">
                      {language === 'FR' ? service.nameFR : service.nameEN}
                    </p>
                    <p className="text-white/50 text-sm text-left">
                      {service.duration}
                    </p>
                    <p className="text-white/50 text-sm text-left">
                      €{service.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-16 pb-8">
              <button
                onClick={() => navigate('/booking')}
                className="w-full py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white text-sm font-light tracking-[0.2em] uppercase rounded-xl hover:bg-white/20 active:scale-[0.98] transition-all"
              >
                {t('book')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
