import { createContext, useContext, useState } from 'react'

const translations = {
  EN: {
    // Home
    barbershop: 'Barbershop',
    menu: 'Menu',
    book: 'Book',
    
    // Menu
    bookAppointment: 'Book Appointment',
    services: 'Services',
    about: 'About',
    gallery: 'Gallery',
    contact: 'Contact',
    
    // Booking - Categories
    selectService: 'Select Service',
    chooseService: 'Choose a service to continue',
    hairServices: 'Hair Services',
    beardServices: 'Beard Services',
    coloringServices: 'Coloring Services',
    facialCare: 'Facial Care',
    
    // Hair Services
    haircut: 'Haircut',
    
    // Beard Services
    fullBeardCut: 'Full Beard Cut',
    beardTrim: 'Beard Trim',
    beardContour: 'Beard Contour',
    
    // Coloring Services
    fullColoring: 'Full Coloring',
    highlights: 'Highlights',
    
    // Facial Care
    facialMask: 'Facial Mask',
    
    // Services Page Column Headers
    service: 'Service',
    duration: 'Duration',
    price: 'Price',
    
    // BookingDateTime
    selectDateTime: 'Select Date & Time',
    selectDate: 'Select Date',
    selectTime: 'Select Time',
    continue: 'Continue',
    
    // BookingConfirm
    confirmBooking: 'Confirm Booking',
    yourName: 'Your Name',
    phoneNumber: 'Phone Number',
    phoneHint: "We'll send booking confirmation to this number",
    confirmBookingBtn: 'Confirm Booking',
    confirming: 'Confirming...',
    
    // Confirmation
    bookingConfirmed: 'Booking Confirmed!',
    reminderMessage: "We'll send you a reminder before your appointment.",
    done: 'Done',
    
    // Days
    sun: 'Sun',
    mon: 'Mon',
    tue: 'Tue',
    wed: 'Wed',
    thu: 'Thu',
    fri: 'Fri',
    sat: 'Sat',
    
    // Months
    jan: 'Jan',
    feb: 'Feb',
    mar: 'Mar',
    apr: 'Apr',
    may: 'May',
    jun: 'Jun',
    jul: 'Jul',
    aug: 'Aug',
    sep: 'Sep',
    oct: 'Oct',
    nov: 'Nov',
    dec: 'Dec',
  },
  FR: {
    // Home
    barbershop: 'Salon de Coiffure',
    menu: 'Menu',
    book: 'Réserver',
    
    // Menu
    bookAppointment: 'Prendre Rendez-vous',
    services: 'Services',
    about: 'À Propos',
    gallery: 'Galerie',
    contact: 'Contact',
    
    // Booking - Categories
    selectService: 'Choisir un Service',
    chooseService: 'Choisissez un service pour continuer',
    hairServices: 'Services Cheveux',
    beardServices: 'Services Barbe',
    coloringServices: 'Services Coloration',
    facialCare: 'Soins du Visage',
    
    // Hair Services
    haircut: 'Coupe de cheveux',
    
    // Beard Services
    fullBeardCut: 'Coupe de barbe complète',
    beardTrim: 'Taille de barbe',
    beardContour: 'Contours de barbe',
    
    // Coloring Services
    fullColoring: 'Coloration complète',
    highlights: 'Coloration des mèches',
    
    // Facial Care
    facialMask: 'Masque pour le visage',
    
    // Services Page Column Headers
    service: 'Service',
    duration: 'Durée',
    price: 'Prix',
    
    // BookingDateTime
    selectDateTime: 'Choisir Date et Heure',
    selectDate: 'Choisir la Date',
    selectTime: 'Choisir l\'Heure',
    continue: 'Continuer',
    
    // BookingConfirm
    confirmBooking: 'Confirmer la Réservation',
    yourName: 'Votre Nom',
    phoneNumber: 'Numéro de Téléphone',
    phoneHint: 'Nous enverrons la confirmation à ce numéro',
    confirmBookingBtn: 'Confirmer la Réservation',
    confirming: 'Confirmation...',
    
    // Confirmation
    bookingConfirmed: 'Réservation Confirmée!',
    reminderMessage: 'Nous vous enverrons un rappel avant votre rendez-vous.',
    done: 'Terminé',
    
    // Days
    sun: 'Dim',
    mon: 'Lun',
    tue: 'Mar',
    wed: 'Mer',
    thu: 'Jeu',
    fri: 'Ven',
    sat: 'Sam',
    
    // Months
    jan: 'Jan',
    feb: 'Fév',
    mar: 'Mar',
    apr: 'Avr',
    may: 'Mai',
    jun: 'Juin',
    jul: 'Juil',
    aug: 'Août',
    sep: 'Sep',
    oct: 'Oct',
    nov: 'Nov',
    dec: 'Déc',
  }
}

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('EN')

  const t = (key) => {
    return translations[language][key] || key
  }

  const toggleLanguage = (lang) => {
    setLanguage(lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
