import icon1 from '../../assets/how it work/icons/icon1.png'
import icon2 from '../../assets/how it work/icons/icon2.png'
import icon3 from '../../assets/how it work/icons/icon3.png'
import icon4 from '../../assets/how it work/icons/icon4.png'
import icon5 from '../../assets/how it work/icons/icon5.png'

const StepsSection = () => {
  return (
    <section className="w-full bg-white py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#8B7355] italic mb-3">
            YOUR DREAM TEMPLE IN 5 STEPS
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-600">
            Looking to design your Dream Temple? Here's how you can get started.
          </p>
        </div>

        {/* 5 Steps Icons */}
        <div className="flex justify-center items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-5 mt-10 md:mt-12">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center flex-shrink-0 w-[100px] sm:w-[130px] md:w-[160px] lg:w-[180px]">
            <div className="relative mb-3 rounded-full">
              <img
                src={icon1}
                alt="Step 1 - Let's Connect"
                className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full object-contain"
              />
            </div>
            <p className="text-[10px] sm:text-xs md:text-sm text-gray-700 font-medium leading-tight">
              Let's Connect One on One
            </p>
          </div>

          {/* Arrow 1 */}
          <div className="hidden sm:flex items-center justify-center mx-0.5 md:mx-1 flex-shrink-0">
            <svg className="w-6 h-4 md:w-7 md:h-5 lg:w-8 lg:h-5 xl:w-10 xl:h-6" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 12L35 12M35 12L26 3M35 12L26 21" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center flex-shrink-0 w-[100px] sm:w-[130px] md:w-[160px] lg:w-[180px]">
            <div className="relative mb-3 rounded-full">
              <img
                src={icon2}
                alt="Step 2 - Explore Catalog"
                className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full object-contain"
              />
            </div>
            <p className="text-[10px] sm:text-xs md:text-sm text-gray-700 font-medium leading-tight">
              Explore our Catalog
            </p>
          </div>

          {/* Arrow 2 */}
          <div className="hidden sm:flex items-center justify-center mx-0.5 md:mx-1 flex-shrink-0">
            <svg className="w-6 h-4 md:w-7 md:h-5 lg:w-8 lg:h-5 xl:w-10 xl:h-6" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 12L35 12M35 12L26 3M35 12L26 21" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center flex-shrink-0 w-[100px] sm:w-[130px] md:w-[160px] lg:w-[180px]">
            <div className="relative mb-3 rounded-full">
              <img
                src={icon3}
                alt="Step 3 - Place Order"
                className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full object-contain"
              />
            </div>
            <p className="text-[10px] sm:text-xs md:text-sm text-gray-700 font-medium leading-tight">
              Place The Order
            </p>
          </div>

          {/* Arrow 3 */}
          <div className="hidden sm:flex items-center justify-center mx-0.5 md:mx-1 flex-shrink-0">
            <svg className="w-6 h-4 md:w-7 md:h-5 lg:w-8 lg:h-5 xl:w-10 xl:h-6" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 12L35 12M35 12L26 3M35 12L26 21" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center text-center flex-shrink-0 w-[100px] sm:w-[130px] md:w-[160px] lg:w-[180px]">
            <div className="relative mb-3 rounded-full">
              <img
                src={icon4}
                alt="Step 4 - Approval"
                className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full object-contain"
              />
            </div>
            <p className="text-[10px] sm:text-xs md:text-sm text-gray-700 font-medium leading-tight">
              Approval
            </p>
          </div>

          {/* Arrow 4 */}
          <div className="hidden sm:flex items-center justify-center mx-0.5 md:mx-1 flex-shrink-0">
            <svg className="w-6 h-4 md:w-7 md:h-5 lg:w-8 lg:h-5 xl:w-10 xl:h-6" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 12L35 12M35 12L26 3M35 12L26 21" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Step 5 */}
          <div className="flex flex-col items-center text-center flex-shrink-0 w-[100px] sm:w-[130px] md:w-[160px] lg:w-[180px]">
            <div className="relative mb-3 rounded-full">
              <img
                src={icon5}
                alt="Step 5 - Delivery and Installation"
                className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full object-contain"
              />
            </div>
            <p className="text-[10px] sm:text-xs md:text-sm text-gray-700 font-medium leading-tight">
              Delivery and Installation
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StepsSection

