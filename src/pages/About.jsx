import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import bgVideo from '../assets/Book.mp4'
import oussama1 from '../assets/oussama1.jpg'
import oussama2 from '../assets/oussma2.PNG'
import logo from '../assets/bee1.png'

export default function About() {
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
        className="fixed inset-0 w-full h-full object-cover blur-sm"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="fixed inset-0 bg-black/70" />

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
              {language === 'FR' ? 'À Propos' : 'About'}
            </h1>
            <div className="w-10" />
          </div>
        </header>

        {/* Main Content */}
        <main className="px-8 py-20 md:py-32">
          <div className="max-w-6xl mx-auto">
            
            {/* Two Column Layout: Image Left, Text Right */}
            <div className="grid md:grid-cols-[400px_1fr] gap-16 md:gap-24 items-center">
              
              {/* Left: Circular Photo */}
              <div className="flex justify-center md:justify-start">
                <div className="relative">
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden ring-1 ring-white/10">
                    <img 
                      src={oussama1} 
                      alt="Ossama"
                      className="w-full h-full object-cover brightness-[0.85] contrast-110"
                    />
                  </div>
                </div>
              </div>

              {/* Right: Text Content - Centered */}
              <div className="space-y-10 text-center">
                
                {/* Logo - Elegant & Subtle */}
                <div className="flex justify-center mb-6 animate-fade-in">
                  <div className="w-24 h-24 md:w-32 md:h-32 opacity-60 hover:opacity-80 transition-opacity duration-500">
                    <img 
                      src={logo} 
                      alt="Bee Logo"
                      className="w-full h-full object-contain filter drop-shadow-lg"
                    />
                  </div>
                </div>

                {/* Story */}
                <div className="space-y-6">
                  <p className="text-white/90 text-xl md:text-2xl font-light leading-relaxed">
                    Ravi de vous accueillir. Je suis Ossama, votre coiffeur.
                  </p>
                  
                  <p className="text-white/60 text-base md:text-lg leading-relaxed">
                    Formé entre la France, l'Italie et l'Algérie, je mélange dans chaque coupe l'élégance européenne et la précision nord-africaine. Avec passion et amour du métier, je ne considère pas la coiffure comme un simple service, mais comme un art qui révèle la personnalité et la confiance de chaque homme.
                  </p>
                  
                  <p className="text-white/60 text-base md:text-lg leading-relaxed">
                    Chaque détail compte pour moi, et chaque client repart plus affûté qu'à son arrivée.
                  </p>
                </div>

                {/* Quote */}
                <div className="space-y-4 pt-4">
                  <p className="text-white/50 text-sm italic">
                    Votre style. Votre moment. Mon savoir-faire.
                  </p>
                  <p className="text-white/90 text-lg md:text-xl font-light">
                    « Je ne me contente pas de couper les cheveux, je façonne la confiance. »
                  </p>
                </div>

                {/* Button */}
                <div className="pt-6">
                  <button
                    onClick={() => navigate('/booking')}
                    className="px-8 py-3 bg-white text-black text-sm font-medium tracking-wider uppercase rounded-full hover:bg-white/90 transition-colors"
                  >
                    {language === 'FR' ? 'Réserver' : 'Book Now'}
                  </button>
                </div>

              </div>

            </div>

            {/* Bottom Right: Second Circular Photo */}
            <div className="flex justify-end mt-16 md:mt-24">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden ring-1 ring-white/10">
                <img 
                  src={oussama2} 
                  alt="Ossama at work"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}
