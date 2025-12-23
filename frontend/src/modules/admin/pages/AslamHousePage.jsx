import { useEffect, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import { buildImageUrl } from '../../../utils/aslamHouseUtils'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const GROUP = 'aslam-house'

const emptyForm = {
  name: '',
  key: '',
  displayOrder: 0,
  image: null
}

const slugify = (str = '') =>
  str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '')

const AslamHousePage = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)

  const adminToken = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null

  const fetchItems = async () => {
    try {
      setLoading(true)
      setError('')
      const res = await fetch(`${API_URL}/nav-items?group=${GROUP}`)
      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to fetch items')
      }
      setItems((data.data || []).sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)))
    } catch (err) {
      console.error('Error fetching nav items:', err)
      setError(err.message || 'Failed to fetch items')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const openEditModal = (item) => {
    setFormData({
      name: item.name || '',
      key: item.key || item.id || '',
      displayOrder: item.displayOrder ?? 0,
      image: null
    })
    setEditingId(item._id || item.id)
    setShowModal(true)
  }

  const handleDelete = async (item) => {
    if (!adminToken) {
      setError('Admin token missing. Please log in again.')
      return
    }
    const confirm = window.confirm(`Delete "${item.name}"?`)
    if (!confirm) return
    try {
      const res = await fetch(`${API_URL}/nav-items/${item._id || item.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${adminToken}`
        }
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to delete item')
      }
      setSuccess('Item deleted')
      fetchItems()
    } catch (err) {
      console.error('Delete failed:', err)
      setError(err.message || 'Failed to delete item')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!adminToken) {
      setError('Admin token missing. Please log in again.')
      return
    }

    try {
      setError('')
      setSuccess('')

      const fd = new FormData()
      fd.append('group', GROUP)
      const effectiveKey = editingId
        ? (formData.key || slugify(formData.name))
        : (formData.key || slugify(formData.name))

      fd.append('name', formData.name)
      fd.append('key', effectiveKey)
      fd.append('path', '#')
      fd.append('displayOrder', formData.displayOrder ?? 0)
      fd.append('isActive', true)
      if (formData.image) {
        fd.append('image', formData.image)
      }

      const url = editingId
        ? `${API_URL}/nav-items/${editingId}`
        : `${API_URL}/nav-items`

      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        body: fd
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to save item')
      }

      setSuccess(editingId ? 'Item updated' : 'Item created')
      setShowModal(false)
      setFormData(emptyForm)
      setEditingId(null)
      fetchItems()
    } catch (err) {
      console.error('Save failed:', err)
      setError(err.message || 'Failed to save item')
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Aslam House (Nav Hover)</h1>
            <p className="text-sm text-gray-600">Manage images and labels for the ASLAM MARBLE SUPPLIERS dropdown.</p>
          </div>
        </div>

        {error && <div className="p-3 rounded bg-red-100 text-red-700">{error}</div>}
        {success && <div className="p-3 rounded bg-green-100 text-green-700">{success}</div>}

        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: '#8B7355' }}>
                <tr className="text-left text-white uppercase text-xs">
                  <th className="px-4 py-3">Preview</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr><td className="px-4 py-4" colSpan="7">Loading...</td></tr>
                ) : items.length === 0 ? (
                  <tr><td className="px-4 py-4" colSpan="7">No items found</td></tr>
                ) : (
                  items.map((item) => (
                    <tr key={item._id || item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        {item.imagePath && (
                          <img
                            src={buildImageUrl(item.imagePath)}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded border"
                          />
                        )}
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-800">{item.name}</td>
                      <td className="px-4 py-3 text-gray-600">{item.displayOrder ?? 0}</td>
                      <td className="px-4 py-3 text-right space-x-3">
                        <button onClick={() => openEditModal(item)} className="text-[#8B7355] hover:underline font-medium">Edit</button>
                        <button onClick={() => handleDelete(item)} className="text-red-600 hover:underline font-medium">Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4">
              <div className="flex items-center justify-between border-b px-6 py-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{editingId ? 'Edit Item' : 'Add Item'}</h2>
                  <p className="text-sm text-gray-600">Update the hover card image and labels.</p>
                </div>
                <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-800 text-2xl font-bold">×</button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Name / Heading</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-[#8B7355]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Display Order</label>
                    <input
                      type="number"
                      value={formData.displayOrder}
                      onChange={(e) => setFormData({ ...formData, displayOrder: Number(e.target.value) })}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-[#8B7355]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFormData({ ...formData, image: e.target.files[0] || null })}
                      className="w-full text-sm"
                    />
                  </div>
                  {editingId && (
                    <div className="col-span-1 md:col-span-2">
                      <p className="text-sm text-gray-600 mb-2">Current Image</p>
                      <div className="w-32 h-32 rounded border overflow-hidden">
                        {items.find(it => (it._id || it.id) === editingId)?.imagePath ? (
                          <img
                            src={buildImageUrl(items.find(it => (it._id || it.id) === editingId)?.imagePath)}
                            alt="Current"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">No image</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white rounded font-medium"
                    style={{ backgroundColor: '#8B7355' }}
                  >
                    {editingId ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default AslamHousePage

