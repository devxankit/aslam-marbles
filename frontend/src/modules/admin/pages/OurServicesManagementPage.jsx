import { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { services } from '../../../data/services'

const OurServicesManagementPage = () => {
  const [servicesList, setServicesList] = useState([...services])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [selectedService, setSelectedService] = useState(null)
  const [serviceToDelete, setServiceToDelete] = useState(null)
  const [sectionHeading, setSectionHeading] = useState('OUR SERVICES')

  useEffect(() => {
    // In production, fetch from API
  }, [])

  const handleAddService = (newService) => {
    const newId = `service-${Date.now()}`
    const serviceWithId = {
      ...newService,
      id: newId
    }
    setServicesList([...servicesList, serviceWithId])
    setShowAddModal(false)
  }

  const handleEditService = (updatedService) => {
    setServicesList(servicesList.map(s =>
      s.id === updatedService.id ? updatedService : s
    ))
    setShowEditModal(false)
    setSelectedService(null)
  }

  const handleDeleteService = (service) => {
    setServiceToDelete(service)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = () => {
    if (serviceToDelete) {
      setServicesList(servicesList.filter(s => s.id !== serviceToDelete.id))
      setShowDeleteConfirm(false)
      setServiceToDelete(null)
    }
  }

  const handleSaveHeading = () => {
    // In production, save to API
    console.log('Saving section heading:', sectionHeading)
    alert('Section heading updated successfully!')
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Our Services Management</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 text-white rounded-lg font-medium transition-colors hover:opacity-90"
            style={{ backgroundColor: '#8B7355' }}
          >
            Add New Service
          </button>
        </div>

        {/* Section Heading */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Section Heading
              </label>
              <input
                type="text"
                value={sectionHeading}
                onChange={(e) => setSectionHeading(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
              />
            </div>
            <button
              onClick={handleSaveHeading}
              className="ml-4 px-4 py-2 text-white rounded-lg font-medium transition-colors hover:opacity-90"
              style={{ backgroundColor: '#8B7355' }}
            >
              Save Heading
            </button>
          </div>
        </div>

        {/* Services List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: '#8B7355' }}>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase">Path</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {servicesList.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {service.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {service.path}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => {
                          setSelectedService(service)
                          setShowEditModal(true)
                        }}
                        className="text-[#8B7355] hover:underline font-medium mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteService(service)}
                        className="text-red-600 hover:underline font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Modal */}
        {showAddModal && (
          <ServiceEditModal
            service={null}
            onSave={handleAddService}
            onClose={() => setShowAddModal(false)}
            isAdd={true}
          />
        )}

        {/* Edit Modal */}
        {showEditModal && selectedService && (
          <ServiceEditModal
            service={selectedService}
            onSave={handleEditService}
            onClose={() => {
              setShowEditModal(false)
              setSelectedService(null)
            }}
            isAdd={false}
          />
        )}

        {/* Delete Confirmation */}
        {showDeleteConfirm && serviceToDelete && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Confirm Delete</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{serviceToDelete.name}"? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false)
                    setServiceToDelete(null)
                  }}
                  className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

// Service Edit Modal Component
const ServiceEditModal = ({ service, onSave, onClose, isAdd }) => {
  const [formData, setFormData] = useState({
    name: service?.name || '',
    path: service?.path || '',
    image: service?.image || '',
    imageFile: null
  })
  const [previewImage, setPreviewImage] = useState(service?.image || null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        imageFile: file
      }))
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const serviceData = {
      ...formData,
      id: service?.id || `service-${Date.now()}`,
      image: previewImage || formData.image
    }
    onSave(serviceData)
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {isAdd ? 'Add New Service' : 'Edit Service'}
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Service Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Service Path (URL)
              </label>
              <input
                type="text"
                value={formData.path}
                onChange={(e) => setFormData({ ...formData, path: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                placeholder="/services/example"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
              />
              {previewImage && (
                <div className="mt-4">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full max-w-md h-48 object-cover rounded-lg"
                  />
                </div>
              )}
              {!previewImage && formData.image && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                  <img
                    src={formData.image}
                    alt="Current"
                    className="w-full max-w-md h-48 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 px-4 py-2 text-white rounded-lg font-medium transition-colors hover:opacity-90"
                style={{ backgroundColor: '#8B7355' }}
              >
                {isAdd ? 'Add Service' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default OurServicesManagementPage

