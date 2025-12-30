import { usePageTranslation } from '../../../contexts/PageTranslationContext'
import MurtiCategoryTemplate from '../components/MurtiCategoryTemplate'

const DurgaCategoryPage = (props) => {
  const { getTranslatedText } = usePageTranslation()
  return (
    <MurtiCategoryTemplate
      categoryId="durga"
      title={getTranslatedText("Discover Goddess Durga")}
      {...props}
    />
  )
}

export default DurgaCategoryPage
