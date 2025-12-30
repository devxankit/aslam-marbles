import { useState } from 'react'
import TranslatedText from '../TranslatedText'
import { usePageTranslation } from '../../contexts/PageTranslationContext'

const BookingModal = ({ isOpen, onClose }) => {
  const { getTranslatedText } = usePageTranslation()
  const [bookingData, setBookingData] = useState({
    fullName: '',
    contactNumber: '',
    city: '',
    appointmentType: 'store-tour',
    selectedDate: null,
    selectedTime: null
  })
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  // Time slots based on appointment type
  const storeTourTimeSlots = [
    '10:00 AM',
    '11:30 AM',
    '1:00 PM',
    '2:30 PM',
    '4:00 PM',
    '5:30 PM'
  ]

  const templeCustomizationTimeSlots = [
    '10:00 AM', '10:45 AM', '11:30 AM', '12:15 PM',
    '1:00 PM', '1:45 PM', '2:30 PM', '3:15 PM',
    '4:00 PM', '4:45 PM', '5:30 PM', '6:15 PM',
    '7:00 PM'
  ]

  const timeSlots = bookingData.appointmentType === 'store-tour'
    ? storeTourTimeSlots
    : templeCustomizationTimeSlots

  if (!isOpen) return null

  const handleSubmit = async () => {
    if (bookingData.fullName && bookingData.contactNumber && bookingData.city && bookingData.selectedDate && bookingData.selectedTime) {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
        const response = await fetch(`${API_URL}/appointments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookingData)
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.message || 'Failed to book appointment')
        }

        await response.json()
        alert(getTranslatedText('Appointment booked successfully!'))
        onClose()
        setBookingData({
          fullName: '',
          contactNumber: '',
          city: '',
          appointmentType: 'store-tour',
          selectedDate: null,
          selectedTime: null
        })
        setCurrentMonth(new Date().getMonth())
        setCurrentYear(new Date().getFullYear())
      } catch (error) {
        alert(error.message || getTranslatedText('Failed to book appointment. Please try again.'))
      }
    } else {
      alert(getTranslatedText('Please fill in all required fields, select a date and time.'))
    }
  }

  const firstDay = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const today = new Date()

  const dates = []
  for (let i = 0; i < firstDay; i++) {
    dates.push(<div key={`empty-${i}`} className="h-6 md:h-10"></div>)
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const dateObj = new Date(currentYear, currentMonth, day)
    const isSelected = bookingData.selectedDate === dateStr
    const isPast = dateObj < today && dateObj.toDateString() !== today.toDateString()

    dates.push(
      <button
        key={day}
        onClick={() => !isPast && setBookingData({ ...bookingData, selectedDate: dateStr })}
        disabled={isPast}
        className={`h-6 md:h-10 rounded text-[10px] md:text-sm font-medium transition-colors ${isSelected
          ? 'bg-[#8B7355] text-white shadow-md'
          : isPast
            ? 'text-gray-300 cursor-not-allowed'
            : 'hover:bg-gray-100 text-gray-700'
          }`}
      >
        {day}
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-gray-100 md:bg-white z-[100] flex items-start justify-center px-2 pb-2 md:p-4 overflow-hidden md:overflow-y-auto pt-[4.5rem] md:pt-32 lg:pt-36" onClick={onClose}>
      <div className="bg-white rounded-lg md:rounded-xl max-w-3xl w-full h-[calc(100vh-5rem)] md:h-auto md:min-h-0 md:my-6 shadow-2xl border-2 border-[#8B7355] border-t-[3px] flex flex-col overflow-y-auto md:overflow-visible" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 md:p-5 lg:p-6 flex-1 flex flex-col">
          {/* Form Content */}
          <div className="flex-1">
            <h2 className="text-sm md:text-xl lg:text-2xl font-bold text-black text-center mt-8 md:mt-2 mb-4 md:mb-6">
              <TranslatedText>BOOK AN APPOINTMENT NOW</TranslatedText>
            </h2>

            <div className="grid grid-cols-3 gap-1 md:gap-4 mb-4 md:mb-6">
              <input
                type="text"
                placeholder={getTranslatedText("Full Name *")}
                value={bookingData.fullName}
                onChange={(e) => setBookingData({ ...bookingData, fullName: e.target.value })}
                className="px-2 py-1.5 md:px-4 md:py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8B7355] text-[10px] md:text-base shadow-sm"
              />
              <input
                type="tel"
                placeholder={getTranslatedText("Contact *")}
                value={bookingData.contactNumber}
                onChange={(e) => setBookingData({ ...bookingData, contactNumber: e.target.value })}
                className="px-2 py-1.5 md:px-4 md:py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8B7355] text-[10px] md:text-base shadow-sm"
              />
              <input
                type="text"
                placeholder={getTranslatedText("City *")}
                value={bookingData.city}
                onChange={(e) => setBookingData({ ...bookingData, city: e.target.value })}
                className="px-2 py-1.5 md:px-4 md:py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8B7355] text-[10px] md:text-base shadow-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 md:gap-4 mb-4 md:mb-6">
              <div
                onClick={() => setBookingData({ ...bookingData, appointmentType: 'store-tour', selectedTime: null })}
                className={`border rounded p-2 md:p-5 cursor-pointer transition-all shadow-sm ${bookingData.appointmentType === 'store-tour'
                  ? 'border-[#8B7355] bg-gray-50'
                  : 'border-gray-300 hover:border-gray-400 bg-white'
                  }`}
              >
                <div className="flex items-start gap-1 md:gap-3">
                  <div className={`w-3 h-3 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${bookingData.appointmentType === 'store-tour'
                    ? 'border-[#8B7355] bg-[#8B7355]'
                    : 'border-gray-400'
                    }`}>
                    {bookingData.appointmentType === 'store-tour' && (
                      <div className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full bg-white"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1 md:gap-2 mb-0.5">
                      <div className={`w-4 h-4 md:w-7 md:h-7 rounded-full flex items-center justify-center flex-shrink-0 ${bookingData.appointmentType === 'store-tour' ? 'bg-[#8B7355]' : 'bg-gray-400'
                        }`}>
                        <svg className="w-2 h-2 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <span className="font-semibold text-[10px] md:text-lg"><TranslatedText>Store Tour</TranslatedText></span>
                    </div>
                    <p className="text-[8px] md:text-sm text-gray-600"><TranslatedText>45 min</TranslatedText></p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => setBookingData({ ...bookingData, appointmentType: 'temple-customization', selectedTime: null })}
                className={`border rounded p-2 md:p-5 cursor-pointer transition-all shadow-sm ${bookingData.appointmentType === 'temple-customization'
                  ? 'border-[#8B7355] bg-gray-50'
                  : 'border-gray-300 hover:border-gray-400 bg-white'
                  }`}
              >
                <div className="flex items-start gap-1 md:gap-3">
                  <div className={`w-3 h-3 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${bookingData.appointmentType === 'temple-customization'
                    ? 'border-[#8B7355] bg-[#8B7355]'
                    : 'border-gray-400'
                    }`}>
                    {bookingData.appointmentType === 'temple-customization' && (
                      <div className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full bg-white"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1 md:gap-2 mb-0.5">
                      <div className={`w-4 h-4 md:w-7 md:h-7 rounded-full flex items-center justify-center flex-shrink-0 ${bookingData.appointmentType === 'temple-customization' ? 'bg-[#8B7355]' : 'bg-gray-400'
                        }`}>
                        <svg className="w-2 h-2 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <span className="font-semibold text-[10px] md:text-lg"><TranslatedText>Customization</TranslatedText></span>
                    </div>
                    <p className="text-[8px] md:text-sm text-gray-600"><TranslatedText>1h 30m</TranslatedText></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4 md:mb-6">
              <h3 className="text-xs md:text-base font-bold text-black mb-2 md:mb-3"><TranslatedText>SELECT DATE:</TranslatedText></h3>
              <div className="flex flex-col lg:flex-row gap-2 md:gap-5 items-start">
                {/* Calendar Section */}
                <div className="flex-1 w-full">
                  <div className="border border-gray-300 rounded p-2 md:p-4 shadow-sm bg-white">
                    <div className="flex items-center justify-between mb-2 md:mb-4">
                      <button
                        onClick={() => {
                          if (currentMonth === 0) {
                            setCurrentMonth(11)
                            setCurrentYear(currentYear - 1)
                          } else {
                            setCurrentMonth(currentMonth - 1)
                          }
                        }}
                        className="text-gray-600 hover:text-black p-0.5"
                      >
                        <svg className="w-3 h-3 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <h4 className="text-[10px] md:text-lg font-semibold">
                        {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'short', year: 'numeric' })}
                      </h4>
                      <button
                        onClick={() => {
                          if (currentMonth === 11) {
                            setCurrentMonth(0)
                            setCurrentYear(currentYear + 1)
                          } else {
                            setCurrentMonth(currentMonth + 1)
                          }
                        }}
                        className="text-gray-600 hover:text-black p-0.5"
                      >
                        <svg className="w-3 h-3 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>

                    <div className="grid grid-cols-7 gap-0.5 md:gap-2">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                        <div key={i} className="text-center text-[8px] md:text-sm font-semibold text-gray-600 py-0.5 md:py-2">
                          {day}
                        </div>
                      ))}
                      {dates}
                    </div>
                  </div>
                </div>

                {/* Time Slots Section */}
                <div className="w-full lg:w-auto lg:min-w-[280px] mt-3 md:mt-0">
                  <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-2 gap-2 md:gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setBookingData({ ...bookingData, selectedTime: time })}
                        className={`px-1 py-2 md:px-4 md:py-2.5 rounded text-[9px] md:text-sm font-medium transition-all shadow-sm ${bookingData.selectedTime === time
                          ? 'bg-[#8B7355] text-white shadow-md'
                          : 'bg-white border border-gray-300 text-gray-700 hover:border-[#8B7355] hover:bg-gray-50'
                          }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Book Appointment Button */}
          <div className="flex justify-center pt-4 pb-2 md:pt-6 md:pb-0">
            <button
              onClick={handleSubmit}
              className="bg-[#8B7355] text-white px-8 md:px-10 py-3 md:py-3.5 rounded-lg text-sm md:text-base font-semibold hover:bg-[#7a6348] transition-colors shadow-lg w-full md:w-auto"
            >
              <TranslatedText>Book Appointment</TranslatedText>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingModal

