import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import TranslatedText from '../TranslatedText'

const Breadcrumb = ({ items }) => {
    return (
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            {items.map((item, index) => (
                <div key={index} className="flex items-center">
                    {index > 0 && <ChevronRight size={16} className="mx-2 text-gray-400" />}
                    {index === items.length - 1 ? (
                        <span className="text-[#8B7355] font-medium"><TranslatedText>{item.label}</TranslatedText></span>
                    ) : (
                        <Link
                            to={item.path}
                            className="hover:text-[#8B7355] transition-colors"
                        >
                            <TranslatedText>{item.label}</TranslatedText>
                        </Link>
                    )}
                </div>
            ))}
        </nav>
    )
}

export default Breadcrumb

