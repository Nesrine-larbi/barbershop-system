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
  const { t } = useLanguage()
  const phoneNumber = '+1 (555) 123-4567'
  const address = '123 Main Street, Your City'

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
              <p className="text-xs text-white/60 tracking-widest uppercase mb-1">Call us</p>
              <p className="text-white font-light tracking-wide text-lg">{phoneNumber}</p>
            </a>

            {/* Address */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5">
              <p className="text-xs text-white/60 tracking-widest uppercase mb-1">Visit us</p>
              <p className="text-white font-light tracking-wide text-lg">{address}</p>
            </div>

            {/* Social Media */}
            <div className="pt-4">
              <h2 className="text-center text-xs text-white/60 tracking-[0.3em] uppercase mb-4">
                Follow Us
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
                Business Hours
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/70 font-light">Monday - Friday</span>
                  <span className="text-white font-light">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70 font-light">Saturday</span>
                  <span className="text-white font-light">10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70 font-light">Sunday</span>
                  <span className="text-white font-light">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
