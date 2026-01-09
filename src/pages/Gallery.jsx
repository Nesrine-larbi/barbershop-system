import { useNavigate } from 'react-router-dom'

// Sample gallery images - replace with your actual images
const galleryImages = [
  'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800',
  'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800',
  'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800',
  'https://images.unsplash.com/photo-1599351431613-90b0fa5d1e74?w=800',
  'https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=800',
  'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800',
  'https://images.unsplash.com/photo-1621607512214-68297480165e?w=800',
  'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800',
]

export default function Gallery() {
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
          <h1 className="text-xl font-bold">Gallery</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Gallery Grid */}
      <div className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-gray-600 mb-6">Our Work & Examples</p>
          
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer active:scale-95 transition-transform"
              >
                <img
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="max-w-4xl mx-auto mt-8 px-2">
          <button
            onClick={() => navigate('/booking')}
            className="w-full py-4 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 active:scale-95 transition-all tap-highlight-transparent shadow-lg"
          >
            Book Your Appointment
          </button>
        </div>
      </div>
    </div>
  )
}
