import { useState } from 'react'
import TranslatedText from '../TranslatedText'
import { usePageTranslation } from '../../hooks/usePageTranslation'

const BookingForm = ({ onSuccess }) => {
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

    // Define strings that need translation but can't be wrapped in components (placeholders, alerts)
    const DYNAMIC_TEXTS = [
        'Full Name *',
        'Contact Number *',
        'City *',
        'Appointment booked successfully!',
        'Failed to book appointment',
        'Please fill in all required fields.'
    ]

    const { getTranslatedText } = usePageTranslation(DYNAMIC_TEXTS, 'en')

    const storeTourTimeSlots = [
        '10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM'
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
                    throw new Error(errorData.message || getTranslatedText('Failed to book appointment'))
                }

                alert(getTranslatedText('Appointment booked successfully!'))
                setBookingData({
                    fullName: '',
                    contactNumber: '',
                    city: '',
                    appointmentType: 'store-tour',
                    selectedDate: null,
                    selectedTime: null
                })
                if (onSuccess) onSuccess()
            } catch (error) {
                alert(error.message || getTranslatedText('Failed to book appointment'))
            }
        } else {
            alert(getTranslatedText('Please fill in all required fields.'))
        }
    }

    const firstDay = new Date(currentYear, currentMonth, 1).getDay()
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const today = new Date()

    const dates = []
    for (let i = 0; i < firstDay; i++) {
        dates.push(<div key={`empty-${i}`} className="h-8 md:h-10"></div>)
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
                className={`h-8 md:h-10 rounded-lg text-xs md:text-sm font-medium transition-colors ${isSelected ? 'bg-[#8B7355] text-white shadow-md' : isPast ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100 text-gray-700'
                    }`}
            >
                {day}
            </button>
        )
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-[#8B7355]/30">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-8 uppercase tracking-wider"><TranslatedText>Book Your Visit</TranslatedText></h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <input
                    type="text" placeholder={getTranslatedText("Full Name *")}
                    value={bookingData.fullName}
                    onChange={(e) => setBookingData({ ...bookingData, fullName: e.target.value })}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B7355] outline-none transition-all shadow-sm"
                />
                <input
                    type="tel" placeholder={getTranslatedText("Contact Number *")}
                    value={bookingData.contactNumber}
                    onChange={(e) => setBookingData({ ...bookingData, contactNumber: e.target.value })}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B7355] outline-none transition-all shadow-sm"
                />
                <input
                    type="text" placeholder={getTranslatedText("City *")}
                    value={bookingData.city}
                    onChange={(e) => setBookingData({ ...bookingData, city: e.target.value })}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B7355] outline-none transition-all shadow-sm"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <button
                    onClick={() => setBookingData({ ...bookingData, appointmentType: 'store-tour', selectedTime: null })}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${bookingData.appointmentType === 'store-tour' ? 'border-[#8B7355] bg-[#8B7355]/5 shadow-inner' : 'border-gray-100 hover:border-gray-200 bg-white'
                        }`}
                >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${bookingData.appointmentType === 'store-tour' ? 'border-[#8B7355]' : 'border-gray-300'}`}>
                        {bookingData.appointmentType === 'store-tour' && <div className="w-3 h-3 rounded-full bg-[#8B7355]"></div>}
                    </div>
                    <div className="text-left">
                        <p className="font-bold text-gray-800"><TranslatedText>Store Tour</TranslatedText></p>
                        <p className="text-xs text-gray-500 italic">45 <TranslatedText>minutes</TranslatedText></p>
                    </div>
                </button>
                <button
                    onClick={() => setBookingData({ ...bookingData, appointmentType: 'temple-customization', selectedTime: null })}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${bookingData.appointmentType === 'temple-customization' ? 'border-[#8B7355] bg-[#8B7355]/5 shadow-inner' : 'border-gray-100 hover:border-gray-200 bg-white'
                        }`}
                >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${bookingData.appointmentType === 'temple-customization' ? 'border-[#8B7355]' : 'border-gray-300'}`}>
                        {bookingData.appointmentType === 'temple-customization' && <div className="w-3 h-3 rounded-full bg-[#8B7355]"></div>}
                    </div>
                    <div className="text-left">
                        <p className="font-bold text-gray-800"><TranslatedText>Temple Customization</TranslatedText></p>
                        <p className="text-xs text-gray-500 italic">1 <TranslatedText>hr</TranslatedText> 30 <TranslatedText>mins</TranslatedText></p>
                    </div>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <button
                            onClick={() => {
                                if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
                                else { setCurrentMonth(currentMonth - 1); }
                            }}
                            className="p-1 hover:bg-white rounded-full transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <h4 className="font-bold text-gray-700">
                            {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </h4>
                        <button
                            onClick={() => {
                                if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
                                else { setCurrentMonth(currentMonth + 1); }
                            }}
                            className="p-1 hover:bg-white rounded-full transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="text-[10px] uppercase font-bold text-gray-400 py-1">{d}</div>)}
                        {dates}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 content-start">
                    {timeSlots.map(time => (
                        <button
                            key={time}
                            onClick={() => setBookingData({ ...bookingData, selectedTime: time })}
                            className={`py-2.5 rounded-xl text-sm font-medium transition-all ${bookingData.selectedTime === time ? 'bg-[#8B7355] text-white shadow-lg' : 'bg-white border border-gray-200 text-gray-600 hover:border-[#8B7355]'
                                }`}
                        >
                            {time}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex justify-center">
                <button
                    onClick={handleSubmit}
                    className="bg-[#8B7355] text-white px-12 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#6B5A42] transition-all shadow-xl active:scale-95"
                >
                    <TranslatedText>Confirm Appointment</TranslatedText>
                </button>
            </div>
        </div>
    )
}

export default BookingForm
