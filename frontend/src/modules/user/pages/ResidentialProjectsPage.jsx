import { useState, useEffect } from 'react';
import ProjectDrawer from '../../../components/common/ProjectDrawer';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import FloatingButtons from '../../../components/common/FloatingButtons';
import { fetchResidentialProjectsData } from '../../../utils/residentialProjectsUtils';
import ExpertFormOverlay from '../../../components/common/ExpertFormOverlay';

const ResidentialProjectsPage = ({
  onShowSidebar,
  onShowProjects,
  onShowCreations,
  onShowServices,
  onShowHowItWorks,
  onShowLocation,
  onShowBooking,
}) => {
  const [showMobileForm, setShowMobileForm] = useState(false);
  const [residentialData, setResidentialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchResidentialProjectsData();
        if (data) setResidentialData(data);
      } catch (error) {
        console.error('Error loading residential projects data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const residentialImages = residentialData?.galleryImages || [];

  const handleImageClick = (image) => {
    setSelectedProject({
      image: image.url,
      title: image.title,
      description: image.description,
      location: image.location,
      address: image.address,
      client: image.client,
      duration: image.duration,
    });
    setIsDrawerOpen(true);
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <Header
        variant="default"
        onShowSidebar={onShowSidebar}
        onShowProjects={onShowProjects}
        onShowCreations={onShowCreations}
        onShowServices={onShowServices}
        onShowHowItWorks={onShowHowItWorks}
        onShowLocation={onShowLocation}
        onShowBooking={onShowBooking}
      />

      {/* Hero Image Container with Form Overlay */}
      <div className="relative w-full overflow-hidden h-[40vh] min-h-[300px] md:h-[60vh] md:min-h-[500px] lg:h-[75vh] lg:min-h-[600px]">
        {/* Background Image */}
        {loading ? (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : residentialData?.heroImage?.url ? (
          <img
            src={residentialData.heroImage.url}
            alt={residentialData.heroImage.alt || 'Residential Projects'}
            className="w-full h-full object-cover"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            <p className="text-gray-600">No hero image available</p>
          </div>
        )}

        {/* Hero Text Overlay - Left Side */}
        <div className="absolute top-10 md:top-24 lg:top-32 left-4 md:left-6 lg:left-8 xl:left-12 z-10 max-w-[60%] md:max-w-2xl">
          <h1 className="text-lg md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 md:mb-4 leading-tight uppercase tracking-wide drop-shadow-lg">
            {residentialData?.title || 'RESIDENTIAL PROJECTS'}
          </h1>
          <p className="text-xs md:text-base lg:text-lg text-white font-light mb-1.5 md:mb-2 drop-shadow-md">
            {residentialData?.subtitle || 'Creating Sacred Spaces in Your Home'}
          </p>
          <p className="text-[10px] md:text-sm text-white/90 font-light leading-relaxed drop-shadow-md hidden sm:block">
            {residentialData?.description || 'Crafting beautiful residential pooja rooms and mandirs that bring divine energy into homes through exquisite design.'}
          </p>
          <button
            onClick={() => setShowMobileForm(true)}
            className="md:hidden mt-4 bg-[#8B7355] text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wide shadow-lg border border-[#8B7355]/50 animate-pulse hover:animate-none"
          >
            Talk to Our Expert
          </button>
        </div>

        {/* Desktop Form Overlay */}
        <ExpertFormOverlay className="hidden md:flex absolute right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 w-[85%] sm:w-[320px] md:w-[340px] max-w-[calc(100%-32px)] bg-white rounded-xl md:rounded-2xl shadow-2xl z-20 flex-col backdrop-blur-sm bg-white/95 scale-90 md:scale-100 origin-right" />
      </div>

      {/* Images Gallery Section */}
      <section className="w-full -mt-12 pt-0 pb-6 md:mt-0 md:py-16 lg:py-20 px-2 md:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-0 md:mb-14 lg:mb-16">
            <h2 className="text-xl md:text-4xl lg:text-5xl font-serif text-[#8B7355] italic mb-2 md:mb-5 tracking-wide">
              {residentialData?.sectionTitle || 'Our Residential Projects'}
            </h2>
            <p className="text-[10px] md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
              {residentialData?.sectionDescription || 'Showcasing our beautiful residential pooja rooms and mandirs that bring divine energy into homes.'}
            </p>
            <div className="w-12 md:w-24 h-0.5 md:h-1 mx-auto mt-3 md:mt-6 rounded-full" style={{ backgroundColor: '#8B7355' }}></div>
          </div>

          {/* Images Grid */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Loading gallery...</p>
            </div>
          ) : residentialImages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No projects available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 md:gap-8">
              {residentialImages.map((image, index) => (
                <div
                  key={image._id || index}
                  onClick={() => handleImageClick(image)}
                  className="group cursor-pointer bg-white border border-gray-200 overflow-hidden hover:border-[#8B7355] transition-all duration-500 hover:shadow-2xl rounded-sm md:rounded-none"
                >
                  <div className="relative w-full h-36 md:h-96 overflow-hidden bg-gray-100">
                    <img
                      src={image.url}
                      alt={image.alt || image.title || `Residential Project ${index + 1}`}
                      className="w-full h-full !h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2 md:p-6 text-white">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <h3 className="text-[10px] md:text-xl font-serif leading-none md:leading-tight mb-0.5 md:mb-1 truncate">
                          {image.title || 'Modern Home'}
                        </h3>
                        <p className="text-[8px] md:text-lg mb-1 md:mb-0 truncate">{image.location || 'Location'}</p>
                        <p className="text-[8px] md:text-xs text-gray-300 mb-1 md:mb-3 font-light leading-relaxed line-clamp-1 hidden sm:block">{image.address || ''}</p>
                        <div className="w-full h-[1px] bg-white/30 my-1 md:my-3 hidden sm:block"></div>
                        <p className="text-[8px] md:text-sm font-medium tracking-wide truncate hidden sm:block">{image.client || ''}</p>
                        <div className="w-full h-[1px] bg-white/30 my-1 md:my-3 hidden sm:block"></div>
                        <p className="text-[8px] md:text-sm font-light hidden sm:block">{image.duration || ''}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Mobile Form Modal */}
      {showMobileForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm md:hidden">
          <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-sm font-bold uppercase tracking-wide text-[#8B7355]">Talk to Expert</h3>
              <button onClick={() => setShowMobileForm(false)} className="p-1 rounded-full hover:bg-gray-200 transition-colors" aria-label="Close modal">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
              <ExpertFormOverlay className="w-full flex flex-col max-h-[85vh]" />
            </div>
          </div>
        </div>
      )}

      <ProjectDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} project={selectedProject} />

      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default ResidentialProjectsPage;
