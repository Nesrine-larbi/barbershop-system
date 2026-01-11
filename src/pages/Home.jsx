import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import Menu from '../components/Menu'
import bgVideo from '../assets/3998516-uhd_4096_2160_25fps.mp4'
import logo from '../assets/bee1.png'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Full Screen Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>
      
      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-between py-12 px-6">
        
        {/* Top - L'Abeille Barbershop text */}
        <div className="text-center">
          <h1 className="text-white text-2xl font-light tracking-[0.3em] uppercase drop-shadow-md">
            L'Abeille
          </h1>
          <p className="text-white text-xs font-light tracking-[0.4em] uppercase mt-1 drop-shadow-md">
            {t('barbershop')}
          </p>
        </div>

        {/* Center - Large Logo */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-96 h-96 overflow-hidden flex items-center justify-center">
            <img 
              src={logo} 
              alt="L'Abeille Logo" 
              className="w-[150%] h-[150%] object-contain mix-blend-multiply drop-shadow-lg"
              style={{ clipPath: 'circle(32% at center)' }}
            />
          </div>
        </div>

        {/* Bottom Section - Menu | Book */}
        <div className="flex flex-col items-center gap-6">
          {/* Menu | Book */}
          <nav className="flex items-center justify-center">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="text-white text-sm font-medium tracking-widest uppercase px-3 hover:text-gray-200 transition-colors drop-shadow-md"
            >
              {t('menu')}
            </button>
            <span className="text-white/70 mx-2">|</span>
            <button 
              onClick={() => navigate('/booking')}
              className="text-white text-sm font-medium tracking-widest uppercase px-3 hover:text-gray-200 transition-colors drop-shadow-md"
            >
              {t('book')}
            </button>
          </nav>

          {/* Language Switcher - EN | FR */}
          <div className="flex items-center justify-center">
            <button 
              onClick={() => setLanguage('EN')}
              className={`text-xs font-medium tracking-widest uppercase px-2 transition-colors drop-shadow-md ${
                language === 'EN' ? 'text-white' : 'text-white/60 hover:text-white/80'
              }`}
            >
              EN
            </button>
            <span className="text-white/50 mx-1">|</span>
            <button 
              onClick={() => setLanguage('FR')}
              className={`text-xs font-medium tracking-widest uppercase px-2 transition-colors drop-shadow-md ${
                language === 'FR' ? 'text-white' : 'text-white/60 hover:text-white/80'
              }`}
            >
              FR
            </button>
          </div>
        </div>
      </div>

      {/* Menu Component */}
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  )
}
