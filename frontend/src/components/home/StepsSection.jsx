import icon1 from '../../assets/how it work/icons/icon1.png'
import icon2 from '../../assets/how it work/icons/icon2.png'
import icon3 from '../../assets/how it work/icons/icon3.png'
import icon4 from '../../assets/how it work/icons/icon4.png'
import icon5 from '../../assets/how it work/icons/icon5.png'
import TranslatedText from '../TranslatedText'

const StepsSection = () => {
  return (
    <section className="w-full bg-white py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-3xl lg:text-4xl font-serif text-[#8B7355] italic mb-2 uppercase tracking-tight md:tracking-normal">
            <TranslatedText>Your Dream Temple in 5 Steps</TranslatedText>
          </h2>
          <p className="text-[10px] md:text-lg text-gray-500">
            <TranslatedText>From vision to reality - our seamless process.</TranslatedText>
          </p>
        </div>

        {/* 5 Steps Icons - Clean UI No Borders or Numbers */}
        <div className="flex justify-between items-start gap-1 sm:gap-4 md:gap-8 mt-12 px-1 md:px-2">
          {[
            { icon: icon1, title: 'Let\'s\nConnect' },
            { icon: icon2, title: 'Explore\nCatalog' },
            { icon: icon3, title: 'Place\nOrder' },
            { icon: icon4, title: 'Design\nApproval' },
            { icon: icon5, title: 'Delivery\nInstall' },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group flex-1 min-w-0">
              <div className="relative mb-4 p-1 rounded-full bg-transparent transition-all duration-500">
                <div className="w-12 h-12 xs:w-16 xs:h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-44 lg:h-44 rounded-full overflow-hidden transition-transform duration-500 group-hover:scale-110">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-full h-full object-cover transition-all"
                  />
                </div>
              </div>
              <p className="text-[8px] xs:text-[10px] sm:text-xs md:text-sm text-gray-800 font-bold uppercase tracking-tight md:tracking-widest leading-tight group-hover:text-[#8B7355] transition-colors whitespace-pre-line">
                <TranslatedText>{item.title}</TranslatedText>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StepsSection

