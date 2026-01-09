import { useNavigate } from 'react-router-dom'

const services = [
  { id: 1, name: 'Classic Haircut', price: '$30', duration: '30 min' },
  { id: 2, name: 'Beard Trim', price: '$20', duration: '20 min' },
  { id: 3, name: 'Haircut + Beard', price: '$45', duration: '45 min' },
  { id: 4, name: 'Hot Towel Shave', price: '$35', duration: '30 min' },
  { id: 5, name: 'Kids Haircut', price: '$25', duration: '25 min' },
  { id: 6, name: 'Hair Design', price: '$40', duration: '40 min' },
]

export default function Services() {
  const navigate = useNavigate()

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
          <h1 className="text-xl font-bold">Services</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Services List */}
      <div className="px-6 py-8">
        <div className="max-w-2xl mx-auto space-y-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{service.duration}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-black">{service.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="max-w-2xl mx-auto mt-8">
          <button
            onClick={() => navigate('/booking')}
            className="w-full py-4 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 active:scale-95 transition-all tap-highlight-transparent shadow-lg"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}
