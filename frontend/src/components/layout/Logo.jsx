import logoImage from '../../assets/logo/unnamed.jpg'

const Logo = () => (
  <div className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 flex items-center justify-center mb-4">
    <img 
      src={logoImage} 
      alt="Logo" 
      className="w-full h-full object-contain"
    />
  </div>
)

export default Logo

