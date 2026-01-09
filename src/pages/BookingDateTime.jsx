import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import bgImage from '../assets/barbershop.webp'

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
  '6:00 PM', '6:30 PM', '7:00 PM'
]

export default function BookingDateTime() {
  const navigate = useNavigate()
  const location = useLocation()
  const { language, t } = useLanguage()
  const service = location.state?.service

  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  
  const locale = language === 'FR' ? 'fr-FR' : 'en-US'

  // Generate next 14 days
  const getDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 0; i < 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const formatDate = (date) => {
    return date.toLocaleDateString(locale, { weekday: 'short', month: 'short', day: 'numeric' })
  }

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      navigate('/booking/confirm', { 
        state: { 
          service, 
          date: selectedDate, 
          time: selectedTime 
        } 
      })
    }
  }

  if (!service) {
    navigate('/booking')
    return null
  }

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="fixed inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 min-h-screen pb-24">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-black/30 backdrop-blur-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => navigate('/booking')}
              className="p-2 -ml-2 rounded-full hover:bg-white/10 active:scale-95 transition-all"
              aria-label="Go back"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-lg font-semibold tracking-wide text-white">{t('selectDateTime')}</h1>
            <div className="w-10" />
          </div>
        </header>

        {/* Selected Service Summary */}
        <div className="px-4 py-4 bg-white/10 backdrop-blur-md border-b border-white/10">
          <div className="max-w-md mx-auto flex items-center gap-3">
            <span className="text-2xl">{service.icon}</span>
            <div>
              <p className="font-medium text-white">{service.name}</p>
              <p className="text-sm text-white/70">{service.duration} • ${service.price}</p>
            </div>
          </div>
        </div>

        {/* Date Selection */}
        <div className="px-4 py-6">
          <h2 className="text-sm font-medium text-white/70 mb-3 max-w-md mx-auto">{t('selectDate')}</h2>
          <div className="max-w-md mx-auto overflow-x-auto pb-2">
            <div className="flex gap-2">
              {getDates().map((date, index) => {
                const dateStr = date.toISOString().split('T')[0]
                const isSelected = selectedDate === dateStr
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`flex-shrink-0 px-4 py-3 rounded-xl text-center transition-all border ${
                      isSelected 
                        ? 'bg-white text-black border-white' 
                        : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                    }`}
                  >
                    <p className="text-xs opacity-70">{date.toLocaleDateString(locale, { weekday: 'short' })}</p>
                    <p className="text-lg font-semibold">{date.getDate()}</p>
                    <p className="text-xs opacity-70">{date.toLocaleDateString(locale, { month: 'short' })}</p>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Time Selection */}
        {selectedDate && (
          <div className="px-4 py-6">
            <h2 className="text-sm font-medium text-white/70 mb-3 max-w-md mx-auto">{t('selectTime')}</h2>
            <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
              {timeSlots.map((time) => {
                const isSelected = selectedTime === time
                return (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-3 px-2 rounded-xl text-sm font-medium transition-all border ${
                      isSelected 
                        ? 'bg-white text-black border-white' 
                        : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                    }`}
                  >
                    {time}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Continue Button */}
        {selectedDate && selectedTime && (
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/50 backdrop-blur-md border-t border-white/10">
            <button
              onClick={handleContinue}
              className="w-full max-w-md mx-auto block py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 active:scale-[0.98] transition-all"
            >
              {t('continue')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
