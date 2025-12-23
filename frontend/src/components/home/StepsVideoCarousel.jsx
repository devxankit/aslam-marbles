import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StepInfoItem from '../common/StepInfoItem'
import { THEME_COLORS } from '../../utils/theme'
import gif1 from '../../assets/how it work/5stepvideo/image1.gif'
import gif2 from '../../assets/how it work/5stepvideo/image2.gif'
import gif3 from '../../assets/how it work/5stepvideo/image3.gif'
import gif4 from '../../assets/how it work/5stepvideo/image4.gif'
import gif5 from '../../assets/how it work/5stepvideo/image5.gif'

const StepsVideoCarousel = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      id: 1,
      gifSrc: gif1,
      gifAlt: "Let's Connect One on One",
      title: "LET'S CONNECT ONE ON ONE",
      subtitle: "GET STARTED WITH OUR 5 STEP EASY PROCESS",
      bgColor: 'transparent',
      content: (
        <div className="space-y-4">
          <StepInfoItem
            title="It all Begins with a Form"
            description="Let's get acquainted. The more we learn about you, the better we can design your home."
            buttonText="Fill Form Link"
            onButtonClick={() => navigate('/book-appointment')}
          />
          <StepInfoItem
            title="Connect over a Meet"
            description="Let's get acquainted. The more we learn about you, the better we can design your home."
          />
        </div>
      )
    },
    {
      id: 2,
      gifSrc: gif2,
      gifAlt: "Start with Your Design",
      title: "START WITH YOUR DESIGN",
      bgColor: THEME_COLORS.secondary,
      content: (
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-4">
            Start With Your Design
          </h2>
          <StepInfoItem
            title="Pay the Design Fee"
            description="Once we understand your requirements and we feel we can help you, and you are happy with the session, start with your design by choosing one of the design plans. Don't Worry if you have wrong measurements we also take our own site measurements in one of the plans."
          />
          <StepInfoItem
            title="Finalise your Design"
            description="Once we agree on a Design we will finalise it to start the production."
          />
        </div>
      )
    },
    {
      id: 3,
      gifSrc: gif3,
      gifAlt: "Place The Order",
      title: "PLACE THE ORDER",
      bgColor: 'transparent',
      content: (
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-4">
            Place The Order
          </h2>
          <StepInfoItem
            title="Start the Order Process"
            description="Once you're happy with what we've proposed, pay 50% of the final quote."
          />
          <StepInfoItem
            title="The Work Commences"
            description="Keep a tab on your project status on the portal provided."
          />
        </div>
      )
    },
    {
      id: 4,
      gifSrc: gif4,
      gifAlt: "Approval",
      title: "APPROVAL",
      bgColor: THEME_COLORS.accent,
      content: (
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-4">
            Approval
          </h2>
          <StepInfoItem
            title="Give your Approval"
            description="Once the Order reaches the approval stage, you will be asked to provide your feedback and approve"
          />
          <StepInfoItem
            title="Pay 100% at Execution Milestone"
            description="Once the Order is fully set according to your requirements pay the 100% and the next stage begins."
          />
        </div>
      )
    },
    {
      id: 5,
      gifSrc: gif5,
      gifAlt: "Delivery and Installation",
      title: "DELIVERY AND INSTALLATION",
      bgColor: 'transparent',
      content: (
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-serif text-[#8B7355] italic mb-4">
            Delivery And Installation
          </h2>
          <StepInfoItem
            title="Prepare for Delivery"
            description="Once the 100% of the order value is received we prepare for the Delivery and Installation of the Order"
          />
          <StepInfoItem
            title="Installation"
            description="Our Team reaches your Home and Install it at your space"
          />
        </div>
      )
    }
  ]

  const currentStepData = steps[currentStep]

  const handleNext = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length)
  }

  const handlePrev = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length)
  }

  return (
    <section className="w-full bg-white py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Fixed Heading - Shows for all videos */}
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#8B7355] italic mb-2 tracking-wide">
            GET STARTED WITH OUR 5 STEP EASY PROCESS
          </h2>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-serif text-[#8B7355] italic tracking-wide">
            LET'S CONNECT ONE ON ONE
          </h3>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-6 md:gap-8 max-w-6xl mx-auto relative px-8 lg:px-0">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-0 lg:left-[-60px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 border-2 border-gray-200 hover:border-[#8B7355]"
            aria-label="Previous step"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-[#8B7355]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Left - Video/GIF */}
          <div className="w-full lg:w-1/2 flex justify-center order-1 lg:order-1">
            <div
              className="relative w-full max-w-md rounded-2xl shadow-lg border-2 transition-all duration-500 overflow-hidden"
              style={{
                backgroundColor: currentStepData.bgColor || 'transparent',
                borderColor: THEME_COLORS.primary
              }}
            >
              <img
                src={currentStepData.gifSrc}
                alt={currentStepData.gifAlt}
                className="w-full h-auto rounded-lg relative"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right - Info Box */}
          <div className="w-full lg:w-1/2 bg-white p-5 md:p-6 rounded-xl md:rounded-2xl shadow-xl border border-gray-100 transition-all duration-500 order-2 lg:order-2">
            {currentStepData.content}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 lg:right-[-60px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 border-2 border-gray-200 hover:border-[#8B7355]"
            aria-label="Next step"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-[#8B7355]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center items-center gap-2 mt-6 md:mt-8">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? 'bg-[#8B7355] w-8 md:w-10'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to step ${step.id}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default StepsVideoCarousel

