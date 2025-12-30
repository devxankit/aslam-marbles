import { useState } from 'react'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import BookingModal from '../../../components/modals/BookingModal'
import { useNavigate } from 'react-router-dom'
import TranslatedText from '../../../components/TranslatedText'

const BookAppointmentPage = ({
  onShowSidebar,
  onShowProjects,
  onShowCreations,
  onShowServices,
  onShowHowItWorks,
  onShowLocation
}) => {
  const navigate = useNavigate()
  const [showBookingModal, setShowBookingModal] = useState(true)

  return (
    <div className="w-full min-h-screen bg-white">
      <Header
        variant="default"
        onShowSidebar={onShowSidebar}
        onShowProjects={onShowProjects}
        onShowCreations={onShowCreations}
        onShowServices={onShowServices}
        onShowHowItWorks={onShowHowItWorks}
        onShowLocation={() => navigate('/location')}
        onShowBooking={() => setShowBookingModal(true)}
      />

      <section className="w-full py-6 md:py-8 px-4 md:px-8 flex items-center justify-center">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4 md:mb-6">
            <TranslatedText>BOOK AN APPOINTMENT</TranslatedText>
          </h1>
          <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6">
            <TranslatedText>Schedule your appointment with our experts</TranslatedText>
          </p>
        </div>
      </section>

      <BookingModal
        isOpen={showBookingModal}
        onClose={() => {
          setShowBookingModal(false)
          navigate('/')
        }}
      />

      <Footer />
      <FloatingButtons />
    </div>
  )
}

export default BookAppointmentPage

