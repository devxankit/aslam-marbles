import CreationsNavBar from '../../../components/layout/CreationsNavBar'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import homeDecorImg from '../../../assets/ourcreation/homedecor.jpeg'

const HomeDecorPage = ({ onShowCart, onShowLikes }) => {
  return (
    <div className="w-full min-h-screen bg-white">
      <CreationsNavBar onShowCart={onShowCart} onShowLikes={onShowLikes} />

      {/* Horizontal Image */}
      <div className="w-full">
        <img 
          src={homeDecorImg} 
          alt="Home Decor" 
          className="w-full h-auto object-cover"
        />
      </div>

      <Footer />
      <FloatingButtons />
    </div>
  )
}

export default HomeDecorPage

