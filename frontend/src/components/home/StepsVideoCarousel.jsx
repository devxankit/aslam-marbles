import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StepInfoItem from '../common/StepInfoItem'
import { THEME_COLORS } from '../../utils/theme'
import gif1 from '../../assets/how it work/5stepvideo/image1.gif'
import gif2 from '../../assets/how it work/5stepvideo/image2.gif'
import gif3 from '../../assets/how it work/5stepvideo/image3.gif'
import gif4 from '../../assets/how it work/5stepvideo/image4.gif'
import gif5 from '../../assets/how it work/5stepvideo/image5.gif'
import TranslatedText from '../TranslatedText'

const StepsVideoCarousel = () => {
    const navigate = useNavigate()
    const [currentStep, setCurrentStep] = useState(0)

    const steps = [
        {
            id: 1,
            gifSrc: gif1,
            gifAlt: "Let's Connect One on One",
            title: "LET'S CONNECT ONE ON ONE",
            bgColor: 'transparent',
            content: (
                <div className="space-y-4">
                    <StepInfoItem
                        title={<TranslatedText>It all Begins with a Form</TranslatedText>}
                        description={<TranslatedText>Let's get acquainted. The more we learn about you, the better we can design your home.</TranslatedText>}
                        buttonText={<TranslatedText>Fill Form Link</TranslatedText>}
                        onButtonClick={() => navigate('/book-appointment')}
                    />
                    <StepInfoItem
                        title={<TranslatedText>Connect over a Meet</TranslatedText>}
                        description={<TranslatedText>Let's get acquainted. The more we learn about you, the better we can design your home.</TranslatedText>}
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
                    <h4 className="text-base md:text-xl font-bold text-[#8B7355] uppercase mb-4"><TranslatedText>Start With Your Design</TranslatedText></h4>
                    <StepInfoItem
                        title={<TranslatedText>Pay the Design Fee</TranslatedText>}
                        description={<TranslatedText>Once we understand your requirements and we feel we can help you, start with your design by choosing one of the design plans.</TranslatedText>}
                        buttonText={<TranslatedText>Pay Design Fee</TranslatedText>}
                        onButtonClick={() => navigate('/checkout', {
                            state: {
                                items: [{
                                    id: 'design-fee',
                                    name: 'Design Consultation Fee',
                                    price: 5000,
                                    quantity: 1,
                                    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200'
                                }]
                            }
                        })}
                    />
                    <StepInfoItem
                        title={<TranslatedText>Finalise your Design</TranslatedText>}
                        description={<TranslatedText>Once we agree on a Design we will finalise it to start the production.</TranslatedText>}
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
                    <h4 className="text-base md:text-xl font-bold text-[#8B7355] uppercase mb-4"><TranslatedText>Place The Order</TranslatedText></h4>
                    <StepInfoItem
                        title={<TranslatedText>Start the Order Process</TranslatedText>}
                        description={<TranslatedText>Once you're happy with what we've proposed, pay 50% of the final quote.</TranslatedText>}
                    />
                    <StepInfoItem
                        title={<TranslatedText>The Work Commences</TranslatedText>}
                        description={<TranslatedText>Keep a tab on your project status on the portal provided.</TranslatedText>}
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
                    <h4 className="text-base md:text-xl font-bold text-[#8B7355] uppercase mb-4"><TranslatedText>Approval</TranslatedText></h4>
                    <StepInfoItem
                        title={<TranslatedText>Give your Approval</TranslatedText>}
                        description={<TranslatedText>Once the Order reaches the approval stage, you will be asked to provide your feedback and approve</TranslatedText>}
                    />
                    <StepInfoItem
                        title={<TranslatedText>Pay 100% at Execution Milestone</TranslatedText>}
                        description={<TranslatedText>Once the Order is fully set according to your requirements pay the 100% and the next stage begins.</TranslatedText>}
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
                    <h4 className="text-base md:text-xl font-bold text-[#8B7355] uppercase mb-4"><TranslatedText>Delivery And Installation</TranslatedText></h4>
                    <StepInfoItem
                        title={<TranslatedText>Prepare for Delivery</TranslatedText>}
                        description={<TranslatedText>Once the 100% of the order value is received we prepare for the Delivery and Installation of the Order</TranslatedText>}
                    />
                    <StepInfoItem
                        title={<TranslatedText>Installation</TranslatedText>}
                        description={<TranslatedText>Our Team reaches your Home and Install it at your space</TranslatedText>}
                    />
                </div>
            )
        }
    ]

    const currentStepData = steps[currentStep]

    const handleNext = () => setCurrentStep((prev) => (prev + 1) % steps.length)
    const handlePrev = () => setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length)

    return (
        <section className="w-full bg-white py-6 md:py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-4 md:mb-10">
                    <h2 className="text-lg md:text-4xl font-serif text-[#8B7355] italic mb-1 md:mb-2 uppercase tracking-wide leading-tight">
                        <TranslatedText>GET STARTED WITH OUR 5 STEP EASY PROCESS</TranslatedText>
                    </h2>
                    <h3 className="text-xs md:text-2xl font-serif text-[#8B7355] italic uppercase tracking-wider">
                        <TranslatedText>{currentStepData.title}</TranslatedText>
                    </h3>
                </div>

                <div className="relative flex flex-col lg:flex-row items-center justify-center gap-4 md:gap-8 max-w-5xl mx-auto">
                    {/* Controls */}
                    <div className="flex items-center justify-between w-full md:w-auto md:absolute md:inset-x-[-100px] md:top-1/2 md:-translate-y-1/2 z-20 mb-2 md:mb-0">
                        <button
                            onClick={handlePrev}
                            className="w-8 h-8 md:w-14 md:h-14 rounded-full bg-white shadow-xl flex items-center justify-center border border-gray-100 hover:border-[#8B7355] transition-all active:scale-95"
                        >
                            <svg className="w-4 h-4 md:w-6 md:h-6 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        </button>

                        <div className="flex gap-1 lg:hidden">
                            {steps.map((_, i) => (
                                <div key={i} className={`h-1 rounded-full transition-all ${i === currentStep ? 'w-5 bg-[#8B7355]' : 'w-1.5 bg-gray-200'}`}></div>
                            ))}
                        </div>

                        <button
                            onClick={handleNext}
                            className="w-8 h-8 md:w-14 md:h-14 rounded-full bg-white shadow-xl flex items-center justify-center border border-gray-100 hover:border-[#8B7355] transition-all active:scale-95"
                        >
                            <svg className="w-4 h-4 md:w-6 md:h-6 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </div>

                    {/* Media */}
                    <div className="w-full lg:w-1/2">
                        <div className="relative aspect-video rounded-xl md:rounded-3xl overflow-hidden shadow-2xl border-2 md:border-4 border-white">
                            <img src={currentStepData.gifSrc} alt={currentStepData.gifAlt} className="w-full h-full object-cover" />
                            <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-[#8B7355] text-white w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-base font-bold shadow-lg">
                                {currentStepData.id}
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="w-full lg:w-1/2 h-full">
                        <div className="bg-gray-50/50 p-4 md:p-10 rounded-xl md:rounded-3xl border border-gray-100 shadow-sm relative h-full flex flex-col justify-center">
                            <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 w-8 h-8 md:w-12 md:h-12 bg-[#8B7355]/10 rounded-full"></div>
                            {currentStepData.content}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default StepsVideoCarousel
