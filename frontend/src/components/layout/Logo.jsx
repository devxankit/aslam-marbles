import logoImage from '../../assets/logo/unnamed-removebg-preview.png'

const Logo = () => (
  <div className="w-28 h-28 md:w-36 md:h-36 flex items-center justify-center mb-0">
    <img
      src={logoImage}
      alt="Logo"
      className="w-full h-full object-contain"
    />
  </div>
)

export default Logo

