import { useNavigate } from 'react-router-dom'

const socialLinks = [
  {
    name: 'Instagram',
    icon: '📷',
    url: 'https://instagram.com/yourbarbershop',
    color: 'bg-gradient-to-br from-purple-500 to-pink-500'
  },
  {
    name: 'TikTok',
    icon: '🎵',
    url: 'https://tiktok.com/@yourbarbershop',
    color: 'bg-black'
  },
  {
    name: 'Facebook',
    icon: '👥',
    url: 'https://facebook.com/yourbarbershop',
    color: 'bg-blue-600'
  },
]

export default function Contact() {
  const navigate = useNavigate()
  const phoneNumber = '+1 (555) 123-4567'
  const address = '123 Main Street, Your City'

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="sticky top-0 bg-white shadow-sm z-20">
        <div className="flex items-center justify-between px-6 py-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-full hover:bg-gray-100 active:scale-95 transition-all tap-highlight-transparent"
            aria-label="Go back"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold">Contact</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Contact Info */}
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto space-y-6">
          {/* Phone */}
          <a
            href={`tel:${phoneNumber.replace(/\D/g, '')}`}
            className="block bg-white rounded-2xl shadow-md p-6 hover:shadow-lg active:scale-95 transition-all tap-highlight-transparent"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-2xl">
                📞
              </div>
              <div>
                <p className="text-sm text-gray-500">Call us</p>
                <p className="text-lg font-semibold">{phoneNumber}</p>
              </div>
            </div>
          </a>

          {/* Address */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center text-2xl">
                📍
              </div>
              <div>
                <p className="text-sm text-gray-500">Visit us</p>
                <p className="text-lg font-semibold">{address}</p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h2 className="text-center text-lg font-semibold text-gray-700">Follow Us</h2>
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block ${social.color} text-white rounded-2xl shadow-md p-6 hover:shadow-lg active:scale-95 transition-all tap-highlight-transparent`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{social.icon}</div>
                  <div>
                    <p className="text-lg font-semibold">{social.name}</p>
                    <p className="text-sm opacity-90">@yourbarbershop</p>
                  </div>
                  <svg className="w-6 h-6 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            ))}
          </div>

          {/* Hours */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="font-semibold text-lg mb-3">Business Hours</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Monday - Friday</span>
                <span className="font-medium">9:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Saturday</span>
                <span className="font-medium">10:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sunday</span>
                <span className="font-medium">Closed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
