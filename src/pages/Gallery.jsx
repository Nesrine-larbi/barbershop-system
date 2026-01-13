import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import bgVideo from '../assets/Book.mp4'
import before1 from '../assets/Before1.PNG'
import after1 from '../assets/After1 .PNG'

// Before/After transformation pairs
const transformations = [
  {
    before: before1,
    after: after1,
  },
]

export default function Gallery() {
  const navigate = useNavigate()
  const { t, language } = useLanguage()

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

        {/* Transformations */}
        <div className="px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-white/70 text-sm tracking-widest uppercase mb-8">
              {language === 'fr' ? 'Transformations' : 'Transformations'}
            </p>
            
            {/* Before/After Cards */}
            <div className="space-y-8">
              {transformations.map((transformation, index) => (
                <div key={index} className="bg-black/30 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                  <div className="grid grid-cols-2 gap-3">
                    {/* Before */}
                    <div className="space-y-2">
                      <p className="text-center text-white/50 text-xs tracking-widest uppercase">
                        {language === 'fr' ? 'Avant' : 'Before'}
                      </p>
                      <div className="aspect-[3/4] rounded-xl overflow-hidden border border-white/20">
                        <img
                          src={transformation.before}
                          alt="Before transformation"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    {/* After */}
                    <div className="space-y-2">
                      <p className="text-center text-white/50 text-xs tracking-widest uppercase">
                        {language === 'fr' ? 'Après' : 'After'}
                      </p>
                      <div className="aspect-[3/4] rounded-xl overflow-hidden border border-white/20">
                        <img
                          src={transformation.after}
                          alt="After transformation"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
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
