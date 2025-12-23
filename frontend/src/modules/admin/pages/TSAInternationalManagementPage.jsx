import { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import axios from 'axios'

const TSAInternationalManagementPage = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            setLoading(true)
            const res = await axios.get('http://localhost:5000/api/tsa-international')
            setData(res.data)
            setLoading(false)
        } catch (err) {
            console.error('Error fetching data:', err)
            setError('Failed to load data')
            setLoading(false)
        }
    }

    const handleUpdateSectionImage = async (sectionKey, file) => {
        if (!file) return;
        try {
            setUploading(true);
            // Simulate/Implement upload logic here
            alert(`Image upload for ${sectionKey} simulated. In production, this would upload to Cloudinary.`);
            setUploading(false);
        } catch (err) {
            console.error(err);
            setUploading(false);
        }
    };

    const SectionCard = ({ title, sectionKey, imageData }) => (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3">
                    <img
                        src={imageData?.url}
                        alt={title}
                        className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    />
                </div>
                <div className="w-full md:w-2/3 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Change Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            onChange={(e) => handleUpdateSectionImage(sectionKey, e.target.files[0])}
                        />
                        <p className="text-xs text-gray-500 mt-1">Supported formats: JPG, PNG, WEBP, GIF</p>
                    </div>
                    <div className="text-sm text-gray-500 break-all">
                        Current URL: {imageData?.url}
                    </div>
                </div>
            </div>
        </div>
    );

    if (loading) return <AdminLayout><div>Loading...</div></AdminLayout>;
    if (error) return <AdminLayout><div>{error}</div></AdminLayout>;
    if (!data) return <AdminLayout><div>No data found.</div></AdminLayout>;

    return (
        <AdminLayout>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">TSA International Management</h1>
                <p className="text-gray-600">Manage images and content for the International page.</p>

                <SectionCard
                    title="Hero Section Image"
                    sectionKey="heroSection.image"
                    imageData={data.heroSection?.image}
                />



                <SectionCard
                    title="What Sets Apart (GIF)"
                    sectionKey="whatSetsApartSection.image"
                    imageData={data.whatSetsApartSection?.image}
                />
            </div>
        </AdminLayout>
    )
}

export default TSAInternationalManagementPage
