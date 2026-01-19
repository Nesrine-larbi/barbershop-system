import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export default function Menu({ isOpen, onClose }) {
  const { t } = useLanguage()
  
  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/80 z-40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Menu */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-sm p-8 relative animate-fade-in">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors tap-highlight-transparent"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Menu Items */}
          <nav className="flex flex-col gap-4 mt-8">
            <MenuLink to="/booking" onClick={onClose}>
              {t('bookAppointment')}
            </MenuLink>
            <MenuLink to="/services" onClick={onClose}>
              {t('services')}
            </MenuLink>
            <MenuLink to="/gallery" onClick={onClose}>
              {t('gallery')}
            </MenuLink>
            <MenuLink to="/contact" onClick={onClose}>
              {t('contact')}
            </MenuLink>
          </nav>
        </div>
      </div>
    </>
  )
}

function MenuLink({ to, onClick, children }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block text-center text-xl font-medium py-4 px-6 rounded-xl bg-gray-50 hover:bg-black hover:text-white transition-all active:scale-95 tap-highlight-transparent"
    >
      {children}
    </Link>
  )
}
