import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import bgVideo from '../assets/Book.mp4'

// Sample gallery images - replace with your actual images
const galleryImages = [
  'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800',
  'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800',
  'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800',
  'https://images.unsplash.com/photo-1599351431613-90b0fa5d1e74?w=800',
  'https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=800',
  'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800',
]

export default function Gallery() {
  const navigate = useNavigate()
  const { t } = useLanguage()

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
              {t('gallery')}
            </h1>
            <div className="w-10" />
          </div>
        </header>

        {/* Gallery Grid */}
        <div className="px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-white/70 text-sm tracking-widest uppercase mb-8">
              Our Work
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-xl overflow-hidden border border-white/20 hover:border-white/40 transition-all cursor-pointer active:scale-95"
                >
                  <img
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="max-w-4xl mx-auto mt-10 px-2">
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
