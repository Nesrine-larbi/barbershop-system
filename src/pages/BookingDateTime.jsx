import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { supabase } from '../supabaseClient'
import bgVideo from '../assets/Book.mp4'

// Generate all time slots in 30-minute intervals from 10:00 AM to 8:00 PM
const generateTimeSlots = () => {
  const slots = []
  for (let hour = 10; hour <= 20; hour++) {
    for (let minute of [0, 30]) {
      if (hour === 20 && minute === 30) break // Stop at 8:00 PM
      const time24 = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      slots.push(time24)
    }
  }
  return slots
}

const timeSlots24 = generateTimeSlots()

export default function BookingDateTime() {
  const navigate = useNavigate()
  const location = useLocation()
  const { language, t } = useLanguage()
  const service = location.state?.service

  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [bookedSlots, setBookedSlots] = useState([])
  const [isLoadingSlots, setIsLoadingSlots] = useState(false)
  
  const locale = language === 'FR' ? 'fr-FR' : 'en-US'

  // Convert 24h time to 12h format for display
  const format12Hour = (time24) => {
    const [hours, minutes] = time24.split(':').map(Number)
    const period = hours >= 12 ? 'PM' : 'AM'
    const displayHour = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours
    return `${displayHour}:${minutes.toString().padStart(2, '0')} ${period}`
  }

  // Parse duration string to minutes
  const parseDuration = (duration) => {
    const match = duration.match(/(\d+)\s*(h|min)/)
    if (!match) return 30 // default
    const value = parseInt(match[1])
    const unit = match[2]
    return unit === 'h' ? value * 60 : value
  }

  // Fetch booked slots from Supabase when date changes
  useEffect(() => {
    if (selectedDate) {
      fetchBookedSlots(selectedDate)
    }
  }, [selectedDate])

  const fetchBookedSlots = async (date) => {
    setIsLoadingSlots(true)
    try {
      console.log('📅 Fetching booked slots for date:', date)
      const { data, error } = await supabase.rpc('get_booked_slots', { selected_date: date })
      
      if (error) {
        console.error('❌ Error fetching booked slots:', error)
        setBookedSlots([])
      } else {
        console.log('✅ Booked slots:', data)
        // Convert timestamptz to time-only for comparison
        const slotsWithTime = (data || []).map(slot => ({
          start_time: new Date(slot.start_time).toTimeString().slice(0, 5), // "14:30"
          end_time: new Date(slot.end_time).toTimeString().slice(0, 5)
        }))
        setBookedSlots(slotsWithTime)
      }
    } catch (err) {
      console.error('❌ Error:', err)
      setBookedSlots([])
    } finally {
      setIsLoadingSlots(false)
    }
  }

  // Check if a time slot conflicts with booked appointments
  const isSlotDisabled = (timeSlot) => {
    if (!service || bookedSlots.length === 0) return false
    
    const serviceDuration = parseDuration(service.duration)
    const [slotHour, slotMinute] = timeSlot.split(':').map(Number)
    const slotStart = slotHour * 60 + slotMinute
    const slotEnd = slotStart + serviceDuration

    // Check if this slot overlaps with any booked slot
    return bookedSlots.some(booked => {
      const [bookedStartHour, bookedStartMinute] = booked.start_time.split(':').map(Number)
      const [bookedEndHour, bookedEndMinute] = booked.end_time.split(':').map(Number)
      
      const bookedStart = bookedStartHour * 60 + bookedStartMinute
      const bookedEnd = bookedEndHour * 60 + bookedEndMinute

      // Check for any overlap
      return (slotStart < bookedEnd && slotEnd > bookedStart)
    })
  }

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
    // Disable past dates and Mondays (day 1)
    return date < today || date.getDay() === 1
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
      const dateStr = date.toISOString().split('T')[0]
      setSelectedDate(dateStr)
      setSelectedTime('') // Reset time when date changes
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
      <div className="relative z-10 min-h-screen pb-8">
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
            <p className="text-sm text-white/70">{service.duration} • €{service.price}</p>
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
            <h2 className="text-xs font-medium text-white/60 tracking-[0.2em] uppercase mb-4 max-w-md mx-auto">
              {t('selectTime')}
            </h2>
            
            {isLoadingSlots ? (
              <div className="max-w-md mx-auto text-center py-8">
                <div className="inline-block w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                <p className="text-white/60 mt-4 text-sm">
                  {language === 'FR' ? 'Chargement des disponibilités...' : 'Loading availability...'}
                </p>
              </div>
            ) : (
              <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
                {timeSlots24.map((time24) => {
                  const isSelected = selectedTime === time24
                  const isDisabled = isSlotDisabled(time24)
                  
                  return (
                    <button
                      key={time24}
                      onClick={() => !isDisabled && setSelectedTime(time24)}
                      disabled={isDisabled}
                      className={`py-3 px-2 rounded-xl text-sm font-light tracking-wide transition-all border ${
                        isSelected 
                          ? 'bg-linear-to-r from-amber-500 to-yellow-600 text-black border-amber-400 shadow-lg shadow-amber-500/30' 
                          : isDisabled
                          ? 'bg-white/5 text-white/30 border-white/10 cursor-not-allowed line-through'
                          : 'bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-amber-500/50'
                      }`}
                    >
                      {format12Hour(time24)}
                    </button>
                  )
                })}
              </div>
            )}

            {/* Continue Button - Directly below time slots */}
            {selectedTime && (
              <div className="max-w-md mx-auto mt-8">
                <button
                  onClick={handleContinue}
                  className="w-full py-5 bg-linear-to-r from-amber-500 to-yellow-600 text-black text-base font-semibold tracking-[0.15em] uppercase rounded-xl hover:from-amber-400 hover:to-yellow-500 active:scale-[0.98] transition-all shadow-lg shadow-amber-500/30"
                >
                  {t('continue')}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
