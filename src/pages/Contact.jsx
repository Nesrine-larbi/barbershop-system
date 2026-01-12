import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import bgVideo from '../assets/Book.mp4'

const socialLinks = [
  {
    name: 'Instagram',
    initial: 'IG',
    url: 'https://instagram.com/yourbarbershop',
  },
  {
    name: 'TikTok',
    initial: 'TK',
    url: 'https://tiktok.com/@yourbarbershop',
  },
  {
    name: 'Facebook',
    initial: 'FB',
    url: 'https://facebook.com/yourbarbershop',
  },
]

export default function Contact() {
  const navigate = useNavigate()
  const { language, t } = useLanguage()
  const phoneNumber = '07 53 75 70 53'
  const address = '118 Rue Saint Dizier, Nancy'
  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=118+Rue+Saint+Dizier+Nancy+France'
  const googleMapsEmbed = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2635.8!2d6.1833!3d48.6928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s118+Rue+Saint+Dizier%2C+Nancy!5e0!3m2!1sfr!2sfr!4v1234567890'

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
              {t('contact')}
            </h1>
            <div className="w-10" />
          </div>
        </header>

        {/* Contact Info */}
        <div className="px-4 py-8">
          <div className="max-w-md mx-auto space-y-4">
            {/* Phone */}
            <a
              href={`tel:${phoneNumber.replace(/\D/g, '')}`}
              className="block bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 hover:bg-white/15 active:scale-[0.98] transition-all"
            >
              <p className="text-xs text-white/60 tracking-widest uppercase mb-1">
                {language === 'FR' ? 'Appelez-nous' : 'Call us'}
              </p>
              <p className="text-white font-light tracking-wide text-lg">{phoneNumber}</p>
            </a>

            {/* Address with Google Maps link */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 hover:bg-white/15 active:scale-[0.98] transition-all"
            >
              <p className="text-xs text-white/60 tracking-widest uppercase mb-1">
                {language === 'FR' ? 'Nous rendre visite' : 'Visit us'}
              </p>
              <p className="text-white font-light tracking-wide text-lg">{address}</p>
              <p className="text-xs text-white/50 mt-2 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {language === 'FR' ? 'Ouvrir dans Google Maps' : 'Open in Google Maps'}
              </p>
            </a>

            {/* Google Maps Embed */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2635.5!2d6.1797!3d48.6928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4794980876b5c6d9%3A0x40d01289e2d9c50!2s118%20Rue%20Saint-Dizier%2C%2054000%20Nancy%2C%20France!5e0!3m2!1sen!2sus!4v1704931200000!5m2!1sen!2sus"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-80"
              />
            </div>

            {/* Social Media */}
            <div className="pt-4">
              <h2 className="text-center text-xs text-white/60 tracking-[0.3em] uppercase mb-4">
                {language === 'FR' ? 'Suivez-nous' : 'Follow Us'}
              </h2>
              <div className="flex justify-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-xs font-light tracking-wider text-white hover:bg-white/20 active:scale-95 transition-all"
                    aria-label={social.name}
                  >
                    {social.initial}
                  </a>
                ))}
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 mt-6">
              <h3 className="text-xs text-white/60 tracking-[0.3em] uppercase mb-4 text-center">
                {language === 'FR' ? 'Horaires' : 'Hours'}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/50 font-light">{language === 'FR' ? 'Lundi' : 'Monday'}</span>
                  <span className="text-white/50 font-light">{language === 'FR' ? 'Fermé' : 'Closed'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70 font-light">{language === 'FR' ? 'Mardi - Dimanche' : 'Tuesday - Sunday'}</span>
                  <span className="text-white font-light">10:00 - 20:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
