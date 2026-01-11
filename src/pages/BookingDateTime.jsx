import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import bgVideo from '../assets/Book.mp4'

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
  const [currentMonth, setCurrentMonth] = useState(new Date())
  
  const locale = language === 'FR' ? 'fr-FR' : 'en-US'

  // Get days in month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    
    const days = []
    
    // Add empty slots for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null)
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    
    return days
  }

  const isDateDisabled = (date) => {
    if (!date) return true
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const formatDate = (date) => {
    return date.toLocaleDateString(locale, { weekday: 'short', month: 'short', day: 'numeric' })
  }

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const handleDateSelect = (date) => {
    if (!isDateDisabled(date)) {
      setSelectedDate(date.toISOString().split('T')[0])
    }
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

  const weekDays = language === 'FR' 
    ? ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  if (!service) {
    navigate('/booking')
    return null
  }

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
            <h1 className="text-lg font-light tracking-[0.2em] uppercase text-white drop-shadow-md">{t('selectDateTime')}</h1>
            <div className="w-10" />
          </div>
        </header>

        {/* Selected Service Summary */}
        <div className="px-4 py-4 bg-white/10 backdrop-blur-md border-b border-white/10">
          <div className="max-w-md mx-auto">
            <p className="font-light text-white tracking-wide">{service.name}</p>
            <p className="text-sm text-white/70">{service.duration} • ${service.price}</p>
          </div>
        </div>

        {/* Calendar */}
        <div className="px-4 py-6">
          <h2 className="text-xs font-medium text-white/60 tracking-[0.2em] uppercase mb-4 max-w-md mx-auto">{t('selectDate')}</h2>
          
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={goToPreviousMonth}
                className="p-2 rounded-full hover:bg-white/10 active:scale-95 transition-all"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h3 className="text-white font-light tracking-wider">
                {currentMonth.toLocaleDateString(locale, { month: 'long', year: 'numeric' })}
              </h3>
              <button
                onClick={goToNextMonth}
                className="p-2 rounded-full hover:bg-white/10 active:scale-95 transition-all"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Week Days Header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map((day) => (
                <div key={day} className="text-center text-xs text-white/50 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth(currentMonth).map((date, index) => {
                if (!date) {
                  return <div key={`empty-${index}`} className="aspect-square" />
                }
                
                const dateStr = date.toISOString().split('T')[0]
                const isSelected = selectedDate === dateStr
                const isDisabled = isDateDisabled(date)
                
                return (
                  <button
                    key={dateStr}
                    onClick={() => handleDateSelect(date)}
                    disabled={isDisabled}
                    className={`aspect-square rounded-lg flex items-center justify-center text-sm transition-all ${
                      isSelected
                        ? 'bg-white text-black font-medium'
                        : isDisabled
                          ? 'text-white/20 cursor-not-allowed'
                          : 'text-white hover:bg-white/20 active:scale-95'
                    }`}
                  >
                    {date.getDate()}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Time Selection */}
        {selectedDate && (
          <div className="px-4 py-6">
            <h2 className="text-xs font-medium text-white/60 tracking-[0.2em] uppercase mb-4 max-w-md mx-auto">{t('selectTime')}</h2>
            <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
              {timeSlots.map((time) => {
                const isSelected = selectedTime === time
                return (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-3 px-2 rounded-xl text-sm font-light tracking-wide transition-all border ${
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
              className="w-full max-w-md mx-auto block py-4 bg-white text-black text-sm font-medium tracking-[0.2em] uppercase rounded-xl hover:bg-gray-100 active:scale-[0.98] transition-all"
            >
              {t('continue')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
