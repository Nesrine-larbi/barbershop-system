import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import bgVideo from '../assets/Book.mp4'
import before0 from '../assets/before0-.JPG'
import after0 from '../assets/after0.PNG'
import before1 from '../assets/Before1.PNG'
import after1 from '../assets/After1 .PNG'
import before2 from '../assets/Before2.PNG'
import after2 from '../assets/After2.PNG'
import before3 from '../assets/Before3.png'
import after3 from '../assets/after3jpg.jpg'
import before4 from '../assets/Before4.png'
import after4 from '../assets/After4.png'

// All gallery images with labels
const galleryItems = [
  { image: before0, type: 'before', name: 'Client 0' },
  { image: after0, type: 'after', name: 'Client 0' },
  { image: before1, type: 'before', name: 'Client 1' },
  { image: after1, type: 'after', name: 'Client 1' },
  { image: before2, type: 'before', name: 'Client 2' },
  { image: after2, type: 'after', name: 'Client 2' },
  { image: before3, type: 'before', name: 'Client 3' },
  { image: after3, type: 'after', name: 'Client 3' },
  { image: before4, type: 'before', name: 'Client 4' },
  { image: after4, type: 'after', name: 'Client 4' },
]

export default function Gallery() {
  const navigate = useNavigate()
  const { language } = useLanguage()

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
      <div className="relative z-10 min-h-screen flex flex-col">
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
              {language === 'fr' ? 'Galerie' : 'Gallery'}
            </h1>
            <div className="w-10" />
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center px-6 py-8">
          {/* Header Section */}
          <div className="mb-8 text-center">
            <p className="text-white/50 text-xs tracking-[0.3em] uppercase mb-3 font-light">
              {language === 'fr' ? 'AVANT / APRÈS' : 'BEFORE / AFTER'}
            </p>
            <h2 className="text-white text-2xl md:text-4xl font-light leading-tight">
              {language === 'fr' ? (
                <>
                  Découvrez la Différence
                  <br />
                  <span className="text-white/70">Nos Résultats</span>
                </>
              ) : (
                <>
                  Witness the Difference
                  <br />
                  <span className="text-white/70">Our Results</span>
                </>
              )}
            </h2>
          </div>

          {/* Swipe hint */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <svg className="w-4 h-4 text-white/50 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <p className="text-white/50 text-xs tracking-widest uppercase">
              {language === 'fr' ? 'Glissez pour voir plus' : 'Swipe to see more'}
            </p>
            <svg className="w-4 h-4 text-white/50 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          {/* Horizontal Scrolling Gallery */}
          <div className="w-full overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="flex gap-6 px-4 min-w-max">
              {galleryItems.map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[280px] md:w-[360px]"
                >
                  {/* Image */}
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                    <img
                      src={item.image}
                      alt={`${item.type} - ${item.name}`}
                      className="w-full h-full object-cover"
                    />
                    {/* Gradient overlay at bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
                    
                    {/* Before/After Label */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                      <span className="inline-block bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs tracking-wider uppercase text-white border border-white/30">
                        {item.type === 'before' 
                          ? (language === 'fr' ? 'Avant' : 'Before')
                          : (language === 'fr' ? 'Après' : 'After')
                        }
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator dots */}
          <div className="flex justify-center gap-1 mt-4">
            {galleryItems.map((_, idx) => (
              <div
                key={idx}
                className="w-1.5 h-1.5 rounded-full bg-white/30"
              />
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-12 flex justify-center px-4">
            <button
              onClick={() => navigate('/booking')}
              className="w-full max-w-lg py-6 bg-white/10 backdrop-blur-md text-white text-lg font-light tracking-[0.3em] uppercase rounded-2xl hover:bg-white/20 active:scale-[0.98] transition-all border border-white/30"
            >
              {language === 'fr' ? 'Réserver Maintenant' : 'Book Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
