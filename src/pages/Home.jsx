import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import Menu from '../components/Menu'
import bgImage from '../assets/barbershop.webp'
import logo from '../assets/bee1.png'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen w-full">
      {/* Full Screen Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      />

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
          <img 
            src={logo} 
            alt="L'Abeille Logo" 
            className="w-64 h-64 mix-blend-multiply drop-shadow-lg"
          />
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
