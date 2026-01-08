import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import FloatingButtons from '../../../components/common/FloatingButtons';
import TranslatedText from '../../../components/TranslatedText';

const SearchResultsPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    useEffect(() => {
        const fetchResults = async () => {
            if (!query) return;
            setLoading(true);
            try {
                const res = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);
                const data = await res.json();
                if (data.success) {
                    setResults(data.results);
                } else {
                    setError('Failed to fetch results');
                }
            } catch (err) {
                console.error('Search error:', err);
                setError('Error connecting to server');
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [query]);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-grow py-12 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                            <TranslatedText>Search Results for</TranslatedText>: "{query}"
                        </h1>
                        <p className="text-gray-600">
                            {loading ? (
                                <TranslatedText>Searching...</TranslatedText>
                            ) : (
                                <>
                                    {results.length} <TranslatedText>items found</TranslatedText>
                                </>
                            )}
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B7355]"></div>
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 text-red-700 p-6 rounded-xl border border-red-100 text-center">
                            {error}
                        </div>
                    ) : results.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                            <div className="text-gray-300 mb-4 text-6xl">🔍</div>
                            <h2 className="text-xl font-medium text-gray-900 mb-2">
                                <TranslatedText>No products found</TranslatedText>
                            </h2>
                            <p className="text-gray-500 max-w-md mx-auto">
                                <TranslatedText>We couldn't find any products matching your search. Please try different keywords or browse our categories.</TranslatedText>
                            </p>
                            <Link
                                to="/murti"
                                className="mt-6 inline-block bg-[#8B7355] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#736044] transition-colors"
                            >
                                <TranslatedText>Browse Collections</TranslatedText>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {results.map((item) => (
                                <Link
                                    key={item._id}
                                    to={item.path}
                                    className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow group"
                                >
                                    <div className="aspect-square overflow-hidden bg-gray-100">
                                        <img
                                            src={item.image || item.images?.[0]?.url || item.imageUrl}
                                            alt={item.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B7355] bg-[#8B7355]/5 px-2 py-0.5 rounded">
                                                {item.type}
                                            </span>
                                            {item.price && (
                                                <span className="font-bold text-gray-900">₹{item.price.toLocaleString('en-IN')}</span>
                                            )}
                                        </div>
                                        <h3 className="font-bold text-gray-900 truncate group-hover:text-[#8B7355] transition-colors">
                                            {item.name}
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                            {item.description}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
            <FloatingButtons />
        </div>
    );
};

export default SearchResultsPage;
