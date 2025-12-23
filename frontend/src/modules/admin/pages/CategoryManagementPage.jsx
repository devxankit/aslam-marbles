import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'

const CategoryManagementPage = () => {
  const { type } = useParams()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
  const token = localStorage.getItem('adminToken')

  useEffect(() => {
    fetchData()
  }, [type])

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/stone-products/categories`)
      const data = await res.json()
      if (res.ok) {
        const filtered = data.filter(cat => {
          if (type === 'stones') return cat.stoneType !== 'home-decor' && cat.stoneType !== 'murti'
          return cat.stoneType === type
        })
        setCategories(filtered)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (categoryData) => {
    try {
      const res = await fetch(`${API_URL}/stone-products/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...categoryData, stoneType: categoryData.stoneType || type })
      })
      if (res.ok) {
        fetchData()
        setShowModal(false)
        setSelectedCategory(null)
      } else {
        const err = await res.json()
        alert(err.message || 'Error saving category')
      }
    } catch (err) {
      console.error('Save error:', err)
      alert('Save failed')
    }
  }

  if (type === 'murti') return <MurtiCategoryManager />

  return (
    <AdminLayout>
      <div className="p-8 space-y-8">
        <div className="flex items-center justify-between border-b border-gray-100 pb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 font-serif tracking-tight">{type?.toUpperCase() || 'Category'} Management</h1>
            <p className="text-gray-500 mt-2 font-medium">Control visual assets and category metadata.</p>
          </div>
          <button
            onClick={() => { setSelectedCategory(null); setShowModal(true); }}
            className="bg-[#8B7355] text-white px-10 py-4 rounded-2xl font-bold hover:bg-[#6B5A42] hover:-translate-y-1 transition-all shadow-xl shadow-[#8B7355]/20"
          >
            + New Category
          </button>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-20 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B7355] mx-auto"></div>
            </div>
          ) : categories.length === 0 ? (
            <div className="p-20 text-center text-gray-400 font-medium">No categories found in this section.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Preview</th>
                    <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Name</th>
                    <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">ID / Slug</th>
                    <th className="px-8 py-5 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {categories.map((cat) => (
                    <tr key={cat._id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-8 py-4 flex justify-center">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 border-2 border-white shadow-sm ring-1 ring-gray-100 group-hover:scale-105 transition-transform">
                          <img src={cat.heroSection?.image?.url || cat.image} className="w-full h-full object-cover" alt={cat.name} onError={(e) => e.target.src = 'https://via.placeholder.com/150'} />
                        </div>
                      </td>
                      <td className="px-8 py-4 font-bold text-gray-800 text-lg">{cat.name}</td>
                      <td className="px-8 py-4"><code className="text-xs bg-gray-100 px-3 py-1.5 rounded-lg text-gray-500 font-mono italic">{cat.id}</code></td>
                      <td className="px-8 py-4 text-right">
                        <button onClick={() => { setSelectedCategory(cat); setShowModal(true); }} className="text-[#8B7355] font-black text-sm hover:underline tracking-tighter">EDIT CONTENT</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <CategoryFormModal
          category={selectedCategory}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setSelectedCategory(null);
          }}
          defaultType={type}
        />
      )}
    </AdminLayout>
  )
}

const CategoryFormModal = ({ category, onSave, onClose, defaultType }) => {
  const [formData, setFormData] = useState({
    id: category?.id || '',
    name: category?.name || '',
    stoneType: category?.stoneType || defaultType || '',
    heroSection: {
      title: category?.heroSection?.title || '',
      subtitle: category?.heroSection?.subtitle || '',
      description: category?.heroSection?.description || '',
      image: {
        url: category?.heroSection?.image?.url || '',
        alt: category?.heroSection?.image?.alt || ''
      }
    }
  })

  const [preview, setPreview] = useState(category?.heroSection?.image?.url || '')

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
        setFormData({
          ...formData,
          heroSection: {
            ...formData.heroSection,
            image: { ...formData.heroSection.image, url: reader.result }
          }
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const finalData = { ...formData }
    if (!finalData.id && finalData.name) {
      finalData.id = finalCategorySlug(finalData.name)
    }
    onSave(finalData)
  }

  const finalCategorySlug = (name) => name.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/40 flex items-center justify-center z-50 p-6 animate-fadeIn">
      <div className="bg-white rounded-[3rem] shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-4 border-white">
        <div className="p-10">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-gray-900 font-serif">
              {category ? 'Update Category' : 'Create New Category'}
            </h2>
            <button onClick={onClose} className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors text-gray-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">INTERNAL IDENTIFIER (Slug)</label>
                <input
                  type="text"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  placeholder="e.g. jain-temples (Leave blank to auto-generate)"
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#8B7355] outline-none font-mono text-sm"
                  disabled={!!category}
                />
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">DISPLAY NAME</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#8B7355] outline-none text-xl font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">CATEGORY GROUP</label>
                <select
                  value={formData.stoneType}
                  onChange={(e) => setFormData({ ...formData, stoneType: e.target.value })}
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#8B7355] outline-none font-bold"
                >
                  <option value="stones">Stones</option>
                  <option value="home-decor">Home Decor</option>
                  <option value="murti">Murti</option>
                  <option value="live">Live Inventory</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">HERO SUBTITLE</label>
                <textarea
                  value={formData.heroSection.subtitle}
                  onChange={(e) => setFormData({
                    ...formData,
                    heroSection: { ...formData.heroSection, subtitle: e.target.value, title: formData.name }
                  })}
                  rows="3"
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#8B7355] outline-none resize-none"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">HERO IMAGE / THUMBNAIL</label>
                <div className="relative group aspect-square rounded-[2rem] overflow-hidden bg-gray-50 border-4 border-dashed border-gray-100 hover:border-[#8B7355] transition-all cursor-pointer">
                  {preview ? (
                    <img src={preview} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Preview" />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300 gap-4">
                      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      <span className="font-bold uppercase tracking-widest text-[10px]">Upload Visual</span>
                    </div>
                  )}
                  <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer backdrop-blur-sm">
                    <span className="font-black">SELECT FILE</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#8B7355] text-white py-5 rounded-3xl font-black uppercase tracking-widest hover:bg-[#6B5A42] hover:-translate-y-1 transition-all shadow-2xl shadow-[#8B7355]/30"
                >
                  {category ? 'Update Database' : 'Seal the Deal'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-10 py-5 bg-gray-100 text-gray-500 rounded-3xl font-bold hover:bg-gray-200 transition-colors"
                >
                  CANCEL
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}


export default CategoryManagementPage

// --- Murti Category Manager (Clean Integrated Version) ---
const MurtiCategoryManager = () => {
  const [selectedDeity, setSelectedDeity] = useState(null)
  const [loading, setLoading] = useState(false)
  const [categoryData, setCategoryData] = useState(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5100/api'
  const token = localStorage.getItem('adminToken')

  const groups = {
    GODS: [
      { name: 'Krishna ji', id: 'krishna' }, { name: 'Natraja', id: 'natraja' }, { name: 'Shiva', id: 'shiva' },
      { name: 'Ganesha', id: 'ganesha' }, { name: 'Buddha', id: 'buddha' }, { name: 'Sai Baba', id: 'sai-baba' },
      { name: 'Balaji', id: 'balaji' }, { name: 'Hanuman ji', id: 'hanuman' }, { name: 'Vishnu ji', id: 'vishnu' },
      { name: 'Nandi', id: 'nandi' }, { name: 'Jain Gods', id: 'jain-gods' }, { name: 'Laddu Gopal', id: 'laddu-gopal' }
    ],
    GODDESSES: [
      { name: 'Durga', id: 'durga' }, { name: 'Kali', id: 'kali' }, { name: 'Laxmi', id: 'laxmi' },
      { name: 'Saraswati', id: 'saraswati' }, { name: 'Radha', id: 'radha' }
    ],
    PAIRS: [
      { name: 'Ram Darbar', id: 'ram-darbar' }, { name: 'Shiv Parivar', id: 'shiv-parivar' },
      { name: 'Ganesh Laxmi', id: 'ganesh-laxmi' }, { name: 'Radha Krishna', id: 'radha-krishna' },
      { name: 'Vishnu Laxmi', id: 'vishnu-laxmi' }
    ]
  }

  const fetchCategoryData = async (catId) => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/stone-products/categories/${catId}`)
      if (res.ok) setCategoryData(await res.json())
      else setCategoryData(null)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    const reader = new FileReader()
    reader.onloadend = async () => {
      const payload = {
        id: selectedDeity.id,
        name: selectedDeity.name,
        heroSection: { image: { url: reader.result }, title: selectedDeity.name },
        stoneType: 'murti'
      }
      try {
        const res = await fetch(`${API_URL}/stone-products/categories`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(payload)
        })
        if (res.ok) setCategoryData(await res.json())
        else alert('Upload failed')
      } catch (error) {
        console.error(error)
      } finally {
        setUploading(false)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-12 pb-20 px-4">
        <div className="border-b border-gray-100 pb-8">
          <h1 className="text-4xl font-bold text-gray-900 font-serif tracking-tight">Murti Universe</h1>
          <p className="text-gray-500 mt-2">Connecting sacred icons with Cloudinary visual assets.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {Object.entries(groups).map(([groupName, deities]) => (
            <div key={groupName} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 space-y-6">
              <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">{groupName}</h2>
              <div className="flex flex-col gap-2">
                {deities.map((deity) => (
                  <button
                    key={deity.id}
                    onClick={() => { setSelectedDeity(deity); fetchCategoryData(deity.id); }}
                    className={`text-left px-6 py-4 rounded-2xl font-bold transition-all ${selectedDeity?.id === deity.id ? 'bg-[#8B7355] text-white shadow-lg' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                  >
                    {deity.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {selectedDeity && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-[3rem] shadow-2xl max-w-2xl w-full overflow-hidden">
              <div className="p-8 border-b flex justify-between items-center">
                <h3 className="text-2xl font-serif font-bold text-gray-800">{selectedDeity.name} Visuals</h3>
                <button onClick={() => setSelectedDeity(null)} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="p-10 text-center">
                <div
                  className="relative aspect-video bg-gray-50 rounded-[2rem] border-4 border-dashed border-gray-100 flex items-center justify-center overflow-hidden group cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {loading ? <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#8B7355] border-t-transparent"></div> :
                    categoryData?.heroSection?.image?.url ? <img src={categoryData.heroSection.image.url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" /> :
                      <span className="text-gray-300 font-bold uppercase tracking-widest text-xs">NO ASSET FOUND</span>
                  }
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white font-black text-xs">
                    <span>{uploading ? 'UPLOADING...' : 'REPLACE FROM CLOUDINARY'}</span>
                  </div>
                </div>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

