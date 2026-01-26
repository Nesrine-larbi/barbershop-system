import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import bgVideo from '../assets/Book.mp4'

export default function Contact() {
  const navigate = useNavigate()
  const { language, t } = useLanguage()
  const phoneNumber = '07 53 75 70 53'
  const address = '118 Rue Saint Dizier, Nancy'
  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=118+Rue+Saint+Dizier+Nancy+France'

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
        <header className="bg-transparent">
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
            <div className="w-10" />
          </div>
          
          <div className="px-6 pb-8 pt-4 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-light tracking-wide text-white mb-3">
              {language === 'FR' ? 'Contactez-nous' : 'Contact Us'}
            </h1>
            <p className="text-sm text-white/50 tracking-wider">
              <span 
                onClick={() => navigate('/')} 
                className="hover:text-white cursor-pointer transition-colors"
              >
                {language === 'FR' ? 'Accueil' : 'Home'}
              </span>
              <span className="mx-2">/</span>
              <span>{language === 'FR' ? 'Contact' : 'Contact Us'}</span>
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-6 py-8">
          <div className="max-w-6xl mx-auto">
            
            {/* Two Column Layout */}
            <div className="grid md:grid-cols-[1fr_55%] gap-12 md:gap-8">
              
              {/* Left Column - Content (Transparent) */}
              <div className="space-y-10 order-2 md:order-1">
                
                {/* Title */}
                <div>
                  <h2 className="text-2xl md:text-3xl font-serif font-light text-white mb-4">
                    {language === 'FR' ? 'Rendez-nous visite' : 'Visit Us'}
                  </h2>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {language === 'FR' 
                      ? 'Nous serions ravis de vous accueillir. Passez nous voir ou contactez-nous pour prendre rendez-vous.'
                      : 'We would love to welcome you. Stop by or contact us to book an appointment.'}
                  </p>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-white/20" />

                {/* Address */}
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest mb-3">
                    {language === 'FR' ? 'Adresse' : 'Address'}
                  </p>
                  <a 
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-lg font-light hover:text-white/70 transition-colors"
                  >
                    {address}
                  </a>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-white/20" />

                {/* Phone */}
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest mb-3">
                    {language === 'FR' ? 'Téléphone' : 'Phone'}
                  </p>
                  <a 
                    href={`tel:${phoneNumber.replace(/\D/g, '')}`}
                    className="text-white text-lg font-light hover:text-white/70 transition-colors"
                  >
                    {phoneNumber}
                  </a>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-white/20" />

                {/* Hours */}
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest mb-4">
                    {language === 'FR' ? 'Horaires' : 'Hours'}
                  </p>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/50">{language === 'FR' ? 'Lundi' : 'Monday'}</span>
                      <span className="text-white/50">{language === 'FR' ? 'Fermé' : 'Closed'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">{language === 'FR' ? 'Mardi - Dimanche' : 'Tuesday - Sunday'}</span>
                      <span className="text-white">10am - 8pm</span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-white/20" />

                {/* Social */}
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest mb-4">
                    {language === 'FR' ? 'Réseaux sociaux' : 'Social'}
                  </p>
                  <div className="flex gap-8">
                    <a
                      href="https://www.instagram.com/labeillebarber_/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-sm hover:text-white/60 transition-colors"
                    >
                      Instagram
                    </a>
                  </div>
                </div>

              </div>

              {/* Right Column - Map (pushed to the right) */}
              <div className="h-80 md:h-[500px] rounded-xl overflow-hidden shadow-2xl order-1 md:order-2 md:ml-auto md:w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2635.5!2d6.1797!3d48.6928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4794980876b5c6d9%3A0x40d01289e2d9c50!2s118%20Rue%20Saint-Dizier%2C%2054000%20Nancy%2C%20France!5e0!3m2!1sen!2sus!4v1704931200000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

            </div>

          </div>
        </main>

      </div>
    </div>
  )
}
