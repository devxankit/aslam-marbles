import { Link, useLocation } from 'react-router-dom';
import TranslatedText from '../TranslatedText';

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    if (pathnames.length === 0) return null;

    return (
        <nav className="flex py-4 px-4 md:px-8 max-w-7xl mx-auto text-sm text-gray-500 overflow-x-auto whitespace-nowrap" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <Link to="/" className="inline-flex items-center hover:text-[#8B7355] transition-colors">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        <TranslatedText>Home</TranslatedText>
                    </Link>
                </li>
                {pathnames.map((value, index) => {
                    const last = index === pathnames.length - 1;
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                    // Format the label (capitalize, remove hyphens)
                    const label = value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

                    return (
                        <li key={to}>
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                                {last ? (
                                    <span className="ml-1 md:ml-2 font-medium text-[#8B7355] truncate max-w-[150px] md:max-w-xs">{label}</span>
                                ) : (
                                    <Link to={to} className="ml-1 md:ml-2 hover:text-[#8B7355] transition-colors">{label}</Link>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
